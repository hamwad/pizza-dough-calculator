// Core calculation utilities for the dough calculator

export type DoughInput = {
  pizzas: number;
  diameterCm?: number;
  doughWeightPerPizza?: number;
  hydrationPct: number;
  saltPct: number;
  yeastPct: number;
  yeastType?: string;
};

export function calcPizzaArea(diameterCm: number) {
  const r = diameterCm / 2 / 100;
  return Math.PI * r * r;
}

export function estimateDoughWeightPerPizza(diameterCm: number) {
  // heuristic: small pizza uses less dough per cm^2; this gives a reasonable estimate
  const area = calcPizzaArea(diameterCm);
  // grams per m^2 scaled down: use 3000 g/m^2 as base
  return area * 3000;
}

export function yeastConversion(yeastPct: number, from: string, to: string) {
  // naive conversions — these are approximations
  const mapping: Record<string, number> = {
    instant: 1,
    active: 0.75,
    fresh: 3,
  };
  const fromFactor = mapping[from] ?? 1;
  const toFactor = mapping[to] ?? 1;
  return (yeastPct * fromFactor) / toFactor;
}

export function calculateDough(input: DoughInput) {
  // Determine per-pizza dough weight
  const doughWeightPerPizza =
    input.doughWeightPerPizza ??
    estimateDoughWeightPerPizza(input.diameterCm ?? 30);
  const totalDough = doughWeightPerPizza * input.pizzas;

  // Baker's math — flour is baseline (100%)
  // Let flourMass = F
  // water = hydration% * F
  // salt = salt% * F
  // yeast = yeast% * F
  // total = F + water + salt + yeast -> solve for F

  const h = input.hydrationPct / 100;
  const s = input.saltPct / 100;
  const y = input.yeastPct / 100;

  // total = F * (1 + h + s + y)
  const flour = totalDough / (1 + h + s + y);
  const water = flour * h;
  const salt = flour * s;
  const yeast = flour * y;

  const ingredients = [
    { name: "Flour", weight: flour, pct: 100 },
    { name: "Water", weight: water, pct: input.hydrationPct },
    { name: "Salt", weight: salt, pct: input.saltPct },
    { name: "Yeast", weight: yeast, pct: input.yeastPct },
  ];

  const summary = `Total dough: ${totalDough.toFixed(
    0
  )} g — Flour: ${flour.toFixed(0)} g`;

  return {
    doughWeightPerPizza,
    totalDough,
    flour,
    water,
    salt,
    yeast,
    ingredients,
    summary,
  };
}

export function planFermentation(opts: {
  ambientTempC: number;
  fridgeTempC: number;
  totalHours: number;
}) {
  // Simple model: higher temp => faster proof
  const { ambientTempC, fridgeTempC, totalHours } = opts;
  // base yeast % suggestion formula (naive): 0.1% per 24h at 4°C, scaled by temp
  const instantBasePer24hAt4C = 0.1;
  const tempFactor = (ambientTempC - fridgeTempC) / 20; // rough scaling
  const yeastPct = Math.max(
    0.05,
    Math.round(
      instantBasePer24hAt4C *
        (24 / Math.max(1, totalHours)) *
        (1 + tempFactor) *
        100
    ) / 100
  );

  const bulkHours = Math.min(6, Math.round(totalHours * 0.25));
  const coldHours = Math.max(0, Math.round(totalHours - bulkHours));
  const warmMinutes = 60;

  return { yeastPct, bulkHours, coldHours, warmMinutes };
}

export function calculateWaterTemp(
  targetDoughTempC: number,
  flourTempC: number,
  roomTempC: number,
  frictionFactor = 2
) {
  // Target Dough Temp (T_d) = (FlourTemp + WaterTemp + RoomTemp + Friction) / 4
  // -> WaterTemp = 4*T_d - FlourTemp - RoomTemp - Friction
  const waterTemp =
    4 * targetDoughTempC - flourTempC - roomTempC - frictionFactor;
  return waterTemp;
}
