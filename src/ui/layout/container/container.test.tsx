import { render, screen } from '@testing-library/react'
import { Container } from '.'

describe('<Container />', () => {
  it('should render a container component', () => {
    render(<Container data-testid='container' />)

    const container = screen.getByTestId('container')

    expect(container).toBeInTheDocument()
  })
})
