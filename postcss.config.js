// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };



module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
            './pages/**/*.{js,jsx}',
            './components/**/*.{js,jsx}',
            // "./node_modules/react-multi-carousel/**/*.js"
        ],
        // css: ['./node_modules/react-multi-carousel/li/styles.css'],
        
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        // safelist: ["html", "body"]
        safelist:{
          standard: ["html", "body"],
          // standard: [/^react-/],
          // deep: [/^react-/],
          // greedy: [/^react-/]

          // content:[
          //   "./node_modules/react-multi-carousel/**/*.js",
          // ]
        }
        // deep: [
        //   /^react-multi/
        // ]
      }
    ],
  ]
};



// module.exports = {
//   "plugins": [
//     "postcss-flexbugs-fixes",
//     [
//       "postcss-preset-env",
//       {
//         "autoprefixer": {
//           "flexbox": "no-2009"
//         },
//         "stage": 3,
//         "features": {
//           "custom-properties": false
//         }
//       }
//     ],
//     [
//       '@fullhuman/postcss-purgecss',
//       {
//         content: [
//             './pages/**/*.{js,jsx,ts,tsx}',
//             './components/**/*.{js,jsx,ts,tsx}'
//         ],
//         defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
//         safelist: ["html", "body"]
//       }
//     ],
//   ]
// }
