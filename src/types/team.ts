type Conference = 'East' | 'West'
type Division =
  | 'Atlantic'
  | 'Central'
  | 'Northwest'
  | 'Pacific'
  | 'Southeast'
  | 'Southwest'

export interface Team {
  abbreviation: string
  city: string
  conference: Conference
  division: Division
  full_name: string
  id: number
  name: string
}
