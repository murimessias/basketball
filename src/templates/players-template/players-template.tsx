import type { Player } from 'types'

type PlayersTemplateProps = {
  data: Player[]
}

const PlayersTemplate = ({ data }: PlayersTemplateProps) => {
  return (
    <ul>
      {data.map(({ first_name, id, last_name, team }) => (
        <li key={id}>
          {first_name} {last_name} - {team.full_name}
        </li>
      ))}
    </ul>
  )
}

export default PlayersTemplate
