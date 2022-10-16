import type { Team } from './team'

type Position = 'C' | 'PF' | 'PG' | 'SF' | 'SG'

export interface Player {
  first_name: string
  height_feet: number | null
  height_inches: number | null
  id: number
  last_name: string
  position: Position
  team: Team
  weight_pounds: number | null
}
