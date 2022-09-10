import { opinionated } from 'stitches-normalize-css'
import { CSS, globalCss } from 'libs/stitches'

const customGlobalStyles: Record<string, CSS> = {
  body: {
    backgroundColor: '$slate1',
    color: '$slate12',
    fontFamily: '$sans',
  },
}

export const globalStyles = globalCss(...opinionated, customGlobalStyles)
