import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import {
  dehydrate,
  useQuery,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import { styled } from 'libs/stitches'
import PlayersTemplate from 'templates'
import { fetchPlayers } from 'utils/fetchers/players'

const Button = styled('button', {
  all: 'unset',
  // Styles
  alignItems: 'center',
  backgroundColor: '$slate8',
  borderRadius: '0.25rem',
  color: '$slate12',
  cursor: 'pointer',
  display: 'inline-flex',
  fontWeight: 'bold',
  fontSize: '0.875rem',
  justifyContent: 'center',
  lineHeight: '1',
  minWidth: '10ch',
  padding: '0.5rem 0.75rem',
  transition: 'background-color 250ms ease-in',
  '&:hover:not(:disabled)': {
    backgroundColor: '$slate6',
  },
  '&:active:not(:disabled)': {
    backgroundColor: '$slate7',
  },
  '&:disabled': {
    backgroundColor: '$slate5',
    color: '$slate11',
    cursor: 'not-allowed',
  },
})

const IconButton = styled(Button, {
  minWidth: 'unset',
  p: '0.5rem',
})

const CurrentPage = styled('span', {
  alignItems: 'center',
  display: 'inline-flex',
  fontSize: '0.875rem',
})

const Flex = styled('div', {
  alignItmes: 'center',
  display: 'flex',
  gap: '0.5rem',
})

const PlayersPage: NextPage = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    setMounted(true)
  }, [])

  const playersQuery = useQuery(
    ['players', { page, pageSize }],
    () => fetchPlayers(page, pageSize),
    { keepPreviousData: true },
  )

  useEffect(() => {
    queryClient.prefetchQuery(['players', { page: page + 1, pageSize }], () =>
      fetchPlayers(page + 1, pageSize),
    )
  }, [page, pageSize, queryClient])

  if (!mounted) return null
  if (playersQuery.isError) return <div>Erro...</div>

  const handlePreviousPage = () => setPage((page) => page - 1)
  const handleNextPage = () => setPage((page) => page + 1)

  return playersQuery.isLoading ? (
    <div>Carregando...</div>
  ) : (
    playersQuery.isSuccess && (
      <div>
        <IconButton
          css={{ mr: '0.5rem' }}
          disabled={theme === 'light'}
          onClick={() => setTheme('light')}
        >
          <SunIcon />
        </IconButton>

        <IconButton
          disabled={theme === 'dark'}
          onClick={() => setTheme('dark')}
        >
          <MoonIcon />
        </IconButton>

        <PlayersTemplate data={playersQuery.data.data} />
        <Flex>
          <Button disabled={page === 1} onClick={handlePreviousPage}>
            Previous
          </Button>
          <Button
            disabled={
              !playersQuery.data ||
              playersQuery.data.data.length === 0 ||
              playersQuery.isPreviousData
            }
            onClick={handleNextPage}
          >
            Next
          </Button>
          <Button onClick={() => setPageSize(25)}>Limit to 25 players</Button>
          <CurrentPage>
            Current page: {page} {playersQuery.isFetching && '...'}
          </CurrentPage>
        </Flex>
      </div>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['players', { page: 1, pageSize: 10 }], () =>
    fetchPlayers(1, 10),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default PlayersPage
