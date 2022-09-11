import { render, screen } from '@testing-library/react'
import { Box } from '.'

describe('<Box />', () => {
  it('should render a box component', () => {
    render(<Box data-testid='box' />)

    const box = screen.getByTestId('box')

    expect(box).toBeInTheDocument()
  })
})
