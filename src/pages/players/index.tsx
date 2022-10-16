import { useCallback, useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { dehydrate, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryClient } from 'libs/react-query'
import { styled } from 'libs/stitches'
import PlayersTemplate from 'templates'
import { fetchPlayers } from 'utils/fetchers/players'

const Button = styled('button', {
  all: 'unset',
  // Styles
  alignItems: 'center',
  backgroundColor: '$slate8',
  borderRadius: '4px',
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
  const router = useRouter()

  const page = Number(router.query.page)
  const per_page = Number(router.query.per_page)

  const firstLoad = useCallback(() => {
    if (!page && !per_page) {
      router.push({
        query: {
          page: 1,
          per_page: 25,
        },
      })
    }

    if (!page && per_page) {
      router.push({
        query: {
          page: 1,
          ...router.query,
        },
      })
    }

    if (!per_page && page) {
      router.push({
        query: {
          ...router.query,
          per_page: 25,
        },
      })
    }
  }, [page, per_page, router])

  useEffect(() => {
    setMounted(true)
    firstLoad()
  }, [firstLoad])

  const playersQuery = useQuery(
    ['players', { page, per_page }],
    () => fetchPlayers(page, per_page),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  )

  useEffect(() => {
    queryClient.prefetchQuery(['players', { page: page + 1, per_page }], () =>
      fetchPlayers(page + 1, per_page),
    )
  }, [page, per_page, queryClient])

  if (!mounted) return null
  if (playersQuery.isError) return <div>Erro...</div>

  const handleFirstPage = () => {
    router.push({
      query: { ...router.query, page: 1 },
    })
  }

  const handleLastPage = () => {
    router.push({
      query: { ...router.query, page: playersQuery.data?.meta.total_pages },
    })
  }

  const handleNextPage = () => {
    router.push({
      query: { ...router.query, page: page + 1 },
    })
  }

  const handlePreviousPage = () => {
    router.push({
      query: { ...router.query, page: page - 1 },
    })
  }

  const handleper_page = () => {
    router.push({
      query: { ...router.query, per_page: 50 },
    })
  }

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
          <Button disabled={page === 1} onClick={handleFirstPage}>
            First Page
          </Button>
          <Button disabled={page === 1} onClick={handlePreviousPage}>
            Previous
          </Button>
          <Button
            disabled={
              !playersQuery.data ||
              !playersQuery.data.meta.next_page ||
              playersQuery.isPreviousData
            }
            onClick={handleNextPage}
          >
            Next
          </Button>
          <Button
            disabled={
              !playersQuery.data ||
              !playersQuery.data.meta.next_page ||
              playersQuery.isPreviousData
            }
            onClick={handleLastPage}
          >
            Last Page
          </Button>
          <Button onClick={handleper_page}>Limit to 50 players</Button>
          <CurrentPage>
            Page {page} of {playersQuery.data.meta.total_pages}{' '}
            {playersQuery.isFetching && '...'}
          </CurrentPage>
        </Flex>
      </div>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = !!context.params ? Number(context.params.page) : 1
  const per_page = !!context.params ? Number(context.params.per_page) : 25

  await queryClient.prefetchQuery(['players', { page, per_page }], () =>
    fetchPlayers(page, per_page),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default PlayersPage
