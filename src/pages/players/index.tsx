import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import {
  dehydrate,
  useQuery,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import PlayersTemplate from 'templates'
import { fetchPlayers } from 'utils/fetchers/players'

const PlayersPage: NextPage = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

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

  if (playersQuery.isError) return <div>Erro...</div>

  return playersQuery.isLoading ? (
    <div>Carregando...</div>
  ) : (
    playersQuery.isSuccess && (
      <div>
        <PlayersTemplate data={playersQuery.data.data} />
        <button
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          Previous
        </button>
        <button
          disabled={
            !playersQuery.data ||
            playersQuery.data.data.length === 0 ||
            playersQuery.isPreviousData
          }
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
        <button onClick={() => setPageSize(25)}>Limit to 25 players</button>
        <span>
          Current page: {page} {playersQuery.isFetching && '...'}
        </span>
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
