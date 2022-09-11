import { styled } from 'libs/stitches'

export const Container = styled('div', {
  '$$container-default': '60ch',
  '$$container-sm': '640px',
  '$$container-md': '768px',
  '$$container-lg': '1024px',
  '$$container-xl': '1280px',
  '$$container-full': 'none',

  boxSizing: 'border-box',
  flexShrink: 0,
  width: '100%',

  variants: {
    size: {
      default: { maxWidth: '$$container-default' },
      sm: { maxWidth: '$$container-sm' },
      md: { maxWidth: '$$container-md' },
      lg: { maxWidth: '$$container-lg' },
      xl: { maxWidth: '$$container-xl' },
      full: { maxWidth: '$$container-full' },
    },
  },
  defaultVariants: {
    size: 'default',
  },
})
