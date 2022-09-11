import { render, screen } from '@testing-library/react'
import { Grid } from '.'

describe('<Grid />', () => {
  it('should render a div with grid properties', () => {
    render(<Grid data-testid='grid' />)

    const grid = screen.getByTestId('grid')
    expect(grid).toBeInTheDocument()
  })
})
