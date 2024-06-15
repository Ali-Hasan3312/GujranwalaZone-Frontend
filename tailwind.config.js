/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'max':'600px'},
      // => @media (max-width: 600px) { Targets most smartphones. }

      'md': {'max':'1100px'},
      // => @media (max-width: 1100px) {Targets medium-sized tablets like iPad.  }

      'lg': {'min':'1200px'} 
       // => @media (max-width: 1200px) {Targets large tablets. }

      
    },
    extend: {},
  },
  plugins: [],
}

