import { Player } from '@types'

type PlayersTemplateProps = {
  data: Player[]
}

const PlayersTemplate = ({ data }: PlayersTemplateProps) => {
  return (
    <>
      {data.map(({ first_name, id, last_name }) => (
        <span key={id}>
          {first_name} {last_name}
        </span>
      ))}
    </>
  )
}

export default PlayersTemplate
