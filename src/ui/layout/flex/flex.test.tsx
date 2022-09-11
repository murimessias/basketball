import { render, screen } from '@testing-library/react'
import { Flex } from '.'

describe('<Flex />', () => {
  it('should render a div with flex properties', () => {
    render(<Flex data-testid='flex' />)

    const flex = screen.getByTestId('flex')
    expect(flex).toBeInTheDocument()
  })
})
