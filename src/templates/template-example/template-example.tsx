import { SharedComponent } from 'shared/shared-component'
import { Box } from 'ui/layout'
import { EXAMPLE_CONSTANT } from 'constants/example-constants'
import { formatToUppercase } from 'utils/formatters'
import mock from './template-exemple.mock'

const TemplateExample = () => {
  const formattedConstant = formatToUppercase(EXAMPLE_CONSTANT)

  return (
    <Box>
      <SharedComponent />
      {mock.map((item) => (
        <Box key={item}>
          {formattedConstant} {item}
        </Box>
      ))}
    </Box>
  )
}

export default TemplateExample
