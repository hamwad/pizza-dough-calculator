module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_slate_grey: {
          DEFAULT: "#335c67",
          100: "#0a1215",
          200: "#142429",
          300: "#1e373e",
          400: "#284952",
          500: "#335c67",
          600: "#4a8696",
          700: "#6fa9b8",
          800: "#9fc5d0",
          900: "#cfe2e7",
        },
        vanilla_custard: {
          DEFAULT: "#fff3b0",
          100: "#574a00",
          200: "#ad9300",
          300: "#ffda05",
          400: "#ffe75c",
          500: "#fff3b0",
          600: "#fff6c2",
          700: "#fff8d1",
          800: "#fffae0",
          900: "#fffdf0",
        },
        honey_bronze: {
          DEFAULT: "#e09f3e",
          100: "#312108",
          200: "#624110",
          300: "#936218",
          400: "#c48320",
          500: "#e09f3e",
          600: "#e6b265",
          700: "#ecc58b",
          800: "#f2d9b2",
          900: "#f9ecd8",
        },
        brown_red: {
          DEFAULT: "#9e2a2b",
          100: "#1f0809",
          200: "#3f1111",
          300: "#5e191a",
          400: "#7e2123",
          500: "#9e2a2b",
          600: "#cb3a3d",
          700: "#d86c6d",
          800: "#e59d9e",
          900: "#f2cece",
        },
        night_bordeaux: {
          DEFAULT: "#540b0e",
          100: "#110203",
          200: "#220405",
          300: "#330708",
          400: "#45090b",
          500: "#540b0e",
          600: "#9f1519",
          700: "#e2242a",
          800: "#ec6d71",
          900: "#f5b6b8",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        pizzaTheme: {
          primary: "#335c67", // dark_slate_grey DEFAULT
          secondary: "#fff3b0", // vanilla_custard DEFAULT
          accent: "#e09f3e", // honey_bronze DEFAULT
          neutral: "#1e373e",
          "base-100": "#fffdf0",
          info: "#4a8696",
          success: "#6fa9b8",
          warning: "#f2d9b2",
          error: "#9e2a2b",
        },
      },
      "dark",
    ],
  },
};
