module.exports = {
  plugins:{
   "autoprefixer": {},
   "postcss-px-to-viewport": {
      unitToConvert: 'px',
      viewportWidth: 750,
      viewportHeight: 1334, // not now used; TODO: need for different units and math for different properties
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',  // vmin is more suitable.
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
 }