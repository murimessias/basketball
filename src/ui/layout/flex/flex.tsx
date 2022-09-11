import { styled } from 'libs/stitches'

export const Flex = styled('div', {
  boxSizing: 'border-box',
  display: 'flex',

  variants: {
    direction: {
      column: { flexDirection: 'column' },
      columnReverse: { flexDirection: 'column-reverse' },
      row: { flexDirection: 'row' },
      rowReverse: { flexDirection: 'row-reverse' },
    },
    align: {
      baseline: { alignItems: 'baseline' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      start: { alignItems: 'flex-start' },
      stretch: { alignItems: 'stretch' },
    },
    justify: {
      between: { justifyContent: 'space-between' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      start: { justifyContent: 'flex-start' },
    },
    wrap: {
      noWrap: { flexWrap: 'nowrap' },
      wrap: { flexWrap: 'wrap' },
      wrapReverse: { flexWrap: 'wrap-reverse' },
    },
    spacing: {
      1: { gap: '$1' },
      2: { gap: '$2' },
      3: { gap: '$3' },
      4: { gap: '$4' },
      5: { gap: '$5' },
      6: { gap: '$6' },
      7: { gap: '$7' },
      8: { gap: '$8' },
      9: { gap: '$9' },
    },
  },
  defaultVariants: {
    align: 'stretch',
    direction: 'row',
    justify: 'start',
    wrap: 'noWrap',
  },
})
