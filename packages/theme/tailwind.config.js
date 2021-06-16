module.exports = {
  purge: [],
  important: true,
  theme: {
    extend: {
      fontSize: {
        'sf-xs': 'var(--font-size--xs)', // 12px
        'sf-sm': 'var(--font-size--sm)', // 14px
        'sf-base': 'var(--font-size--base)', // 16px
        'sf-lg': 'var(--font-size--lg)' // 18px
      },
      fontWeight: {
        'sf-light': 'var(--font-weight--light)', // 300
        'sf-normal': 'var(--font-weight--normal)', // 400
        'sf-medium': 'var(--font-weight--medium)', // 500
        'sf-semibold': 'var(--font-weight--semibold)', // 600
        'sf-bold': 'var(--font-weight--bold)' // 700
      },
      colors: {
        'sf-c-black': 'var(--c-black)', // #1d1f22
        'sf-c-black-base': 'var(--c-black-base)', // #1d1f22
        'sf-c-black-lighten': 'var(--c-black-lighten)', // #292c30
        'sf-c-black-darken': 'var( --c-black-darken)', // #111214
        'sf-c-white': 'var(--c-white)', // #ffffff
        'sf-c-body': 'var(--c-body)', // #ffffff
        'sf-c-text': 'var(--c-text)', // #1d1f22
        'sf-c-text-muted': 'var(--c-text-muted)', // #72757E
        'sf-c-text-disabled': 'var(--c-text-disabled)', // #e0e0e1
        'sf-c-link': 'var(--c-link)', // #43464E
        'sf-c-link-hover': 'var(--c-link-hover)', // // #1d1f22
        'sf-c-primary': 'var(--c-primary)', // #5ece7b
        'sf-c-primary-base': 'var(--c-primary-base)', // #5ece7b
        'sf-c-primary-lighten': 'var(--c-primary-lighten)', // #72d48b
        'sf-c-primary-darken': 'var(--c-primary-darken)', // #4ac86b
        'sf-c-primary-variant': 'var(--c-primary-variant)', // #9ee2b0
        'sf-c-on-primary': 'var(--c-on-primary)', // #ffffff
        'sf-c-secondary': 'var( --c-secondary)', // #1d1f22
        'sf-c-secondary-base': 'var(--c-secondary-base)', // #1d1f22
        'sf-c-secondary-lighten': 'var(--c-secondary-lighten)', // #292c30
        'sf-c-secondary-darken': 'var(--c-secondary-darken)', // #111214
        'sf-c-secondary-variant': 'var(--c-secondary-variant)', // #43464E
        'sf-c-on-secondary': 'var(--c-on-secondary)', //  #ffffff
        'sf-c-light': 'var(--c-light)', // #f1f2f3
        'sf-c-light-base': 'var(--c-light-base)', // #f1f2f3
        'sf-c-light-lighten': 'var(--c-light-lighten)', // #ffffff
        'sf-c-light-darken': 'var(--c-light-darken)', // #e3e5e7
        'sf-c-light-variant': 'var(--c-light-variant)', //  #ffffff
        'sf-c-on-light': 'var(--c-on-light)', // #1d1f22
        'sf-c-gray': 'var(--c-gray)', // #72757E
        'sf-c-gray-base': 'var(--c-gray-base)', // #72757E
        'sf-c-gray-lighten': 'var(--c-gray-lighten)', // #7f828b
        'sf-c-gray-darken': 'var(--c-gray-darken)', // #666971
        'sf-c-gray-variant': 'var(--c-gray-variant)', // #8D8F9A
        'sf-c-on-gray': 'var(--c-on-gray)', // #1d1f22
        'sf-c-dark': 'var(--c-dark)', // #1d1f22
        'sf-c-dark-base': 'var(--c-dark-base)', // #1d1f22
        'sf-c-dark-lighten': 'var(--c-dark-lighten)', // #292c30
        'sf-c-dark-darken': 'var(--c-dark-darken)', // #111214
        'sf-c-dark-variant': 'var(--c-dark-variant)', // #43464E
        'sf-c-on-dark': 'var(--c-on-dark)', //  #ffffff
        'sf-c-info': 'var(--c-info)', //  #0468DB
        'sf-c-info-base': 'var(--c-info-base)', //  #0468DB
        'sf-c-info-lighten': 'var(--c-info-lighten)', // #0474f4
        'sf-c-info-darken': 'var(--c-info-darken)', // #045cc2
        'sf-c-info-variant': 'var(--c-info-variant)', // #e1f4fe
        'sf-c-on-info': 'var(--c-on-info)', //  #ffffff
        'sf-c-success': 'var(--c-success)', // #5ece7b
        'sf-c-success-base': 'var(--c-success-base)', // #5ece7b
        'sf-c-success-lighten': 'var(--c-success-lighten)', // #72d48b
        'sf-c-success-darken': 'var(--c-success-darken)', // #4ac86b
        'sf-c-success-variant': 'var(--c-success-variant)', // #9ee2b0
        'sf-c-on-success': 'var(--c-on-success)', //  #ffffff
        'sf-c-warning': 'var(--c-warning)', // #ecc713
        'sf-c-warning-base': 'var(--c-warning-base)', // #ecc713
        'sf-c-warning-lighten': 'var(--c-warning-lighten)', //  #eecd2b
        'sf-c-warning-darken': 'var(--c-warning-darken)', // #d4b311
        'sf-c-warning-variant': 'var(--c-warning-variant)', // #f6e389
        'sf-c-on-warning': 'var(--c-on-warning)', //  #ffffff
        'sf-c-danger': 'var(--c-danger)', //  #d12727
        'sf-c-danger-base': 'var(--c-danger-base)', //  #d12727
        'sf-c-danger-lighten': 'var(--c-danger-lighten)', // #da3838
        'sf-c-danger-darken': 'var(--c-danger-darken)', //  #bc2323
        'sf-c-danger-variant': 'var(--c-danger-variant)', // #fcede8
        'sf-c-on-danger': 'var(--c-on-danger)' // #ffffff
      },
      spacing: {
        'sf-2xs': 'var(--spacer-2xs)', // 4px
        'sf-xs': 'var( --spacer-xs)', // 8px
        'sf-sm': 'var(--spacer-sm)', // 16px
        'sf-base': 'var(--spacer-base)', // 24px
        'sf-lg': 'var(--spacer-lg)', // 32px
        'sf-xl': 'var(--spacer-xl)', // 40px
        'sf-2xl': 'var(--spacer-2xl)', // 80px
        'sf-3xl': 'var(--spacer-3xl)' // 160px
      },
      fontFamily: {
        'sf-primary': 'var(--font-family--primary)', // "Roboto", serif
        'sf-secondary': 'var(--font-family--secondary)' // "Raleway", sans-serif
      }
    }
  },
  variants: {},
  plugins: []
};
