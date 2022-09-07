import { api } from 'libs/axios'
import { Meta, Player } from '@types'

type FetchPlayersRequest = { page?: number; per_page?: number; search?: string }
type FetchPlayersResponse = { data: Player[]; meta: Meta }

export async function fetchPlayers({
  page = 0,
  per_page = 25,
}: FetchPlayersRequest): Promise<FetchPlayersResponse> {
  const res = await api.get<FetchPlayersResponse>(
    `/players?page=${page}&per_page=${per_page}`,
  )
  return res.data
}
