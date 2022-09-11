import { Meta, Player } from 'types'
import { api } from 'libs/axios'

type FetchPlayersResponse = { data: Player[]; meta: Meta }

export async function fetchPlayers(
  page?: number,
  per_page?: number,
): Promise<FetchPlayersResponse> {
  const pageString = page ? `&page=${page}` : ''
  const perPageString = per_page ? `&per_page=${per_page}` : ''

  const res = await api.get<FetchPlayersResponse>(
    `/players?${pageString}${perPageString}`,
  )
  return res.data
}
