/** @type {import('postcss-load-config').Config} */
const config = {
  
  // plugins:{
  //   tailwindcss: {},
  //   // autoprefixer: {},
  //   // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : { cssnano: {} })
  // }
  
  plugins: [
    
    // {
    //   tailwindcss: {}
    // },
    
      // restore the Next.js default behavior
      "postcss-flexbugs-fixes",
      [
        "postcss-preset-env",
        {
          autoprefixer: {
            flexbox: "no-2009",
          },
          stage: 3,
          features: {
            "custom-properties": false,
          },
        },
      ],
      [
        // configure PurgeCSS
        "@fullhuman/postcss-purgecss",
        {
          content: ["./pages/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
          safelist: {
            standard: ["html", "body"],
          },
        },
      ],
    
  
  
  ],
};

export default config;
