import { render, screen } from '@testing-library/react'
import { Box } from '.'

describe('<Box />', () => {
  it('should render a div', () => {
    render(
      <Box>
        <h1>Test</h1>
      </Box>,
    )

    const box = screen.getByRole('heading', {
      name: /test/i,
    })
    expect(box).toBeInTheDocument()
  })
})
