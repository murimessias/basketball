import type { PropertyValue, ScaleValue } from './stitches.config'

export const stitchesUtils = {
  p: (value: PropertyValue<'padding'>) => ({
    padding: value,
  }),
  pt: (value: PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
  }),
  pr: (value: PropertyValue<'paddingRight'>) => ({
    paddingRight: value,
  }),
  pb: (value: PropertyValue<'paddingBottom'>) => ({
    paddingBottom: value,
  }),
  pl: (value: PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
  }),
  px: (value: PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  m: (value: PropertyValue<'margin'>) => ({
    margin: value,
  }),
  mt: (value: PropertyValue<'marginTop'>) => ({
    marginTop: value,
  }),
  mr: (value: PropertyValue<'marginRight'>) => ({
    marginRight: value,
  }),
  mb: (value: PropertyValue<'marginBottom'>) => ({
    marginBottom: value,
  }),
  ml: (value: PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
  }),
  mx: (value: PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: PropertyValue<'marginTop'>) => ({
    marginBottom: value,
    marginTop: value,
  }),

  size: (value: ScaleValue<'space'>) => ({
    height: `$space${value}`,
    width: `$space${value}`,
  }),
}
