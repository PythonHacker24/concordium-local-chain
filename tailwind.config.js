/** @type {import('tailwindcss').Config} */
export default {
     content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
          fontSize: {
               sm: '0.8rem',
               base: '1rem',
               normal: '18px',
               xl: '1.25rem',
               '2xl': '1.563rem',
               '3xl': '1.953rem',
               '4xl': '2.441rem',
               '5xl': '3.52rem',
          },
          screens: {
               'sm': '640px',
               // => @media (min-width: 640px) { ... }

               'md': '768px',
               // => @media (min-width: 768px) { ... }

               'lg': '1024px',
               // => @media (min-width: 1024px) { ... }

               'xl': '1280px',
               // => @media (min-width: 1280px) { ... }

               '2xl': '1536px',
               // => @media (min-width: 1536px) { ... }
          },
          extend: {
               width: {
                    '62': '62em',
                    '34': '34em',
                    '44': '40em',
               }
          },
     },
     plugins: [
          require("@catppuccin/tailwindcss")({
               defaultFlavour: "mocha",
               prefix: "ctp",
          })

     ],
}

