import type { GetServerSideProps, NextPage } from 'next'
import PlayersTemplate from 'templates'
import { fetchPlayers } from 'utils/fetchers/players'
import type { Player } from '@types'

const PlayersPage: NextPage<{ players: Player[] }> = ({ players }) => (
  <PlayersTemplate data={players} />
)

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetchPlayers({ page: 2, per_page: 5 })

  if (!response.data) {
    return {
      props: {},
    }
  }

  return {
    props: {
      players: response.data,
    },
  }
}

export default PlayersPage
