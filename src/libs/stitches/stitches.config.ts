import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'
import { darkColors, lightColors, media, typography } from 'styles/tokens'
import { stitchesUtils } from './stitches.utils'

export const {
  css,
  createTheme,
  globalCss,
  getCssText,
  keyframes,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: lightColors,
    ...typography,
  },
  media,
  utils: stitchesUtils,
})

export const darkTheme = createTheme('dark-theme', {
  colors: darkColors,
})

// Types
export type CSS = Stitches.CSS
export type { PropertyValue, ScaleValue } from '@stitches/react'
