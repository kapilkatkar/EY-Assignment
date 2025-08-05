import { useEffect, useState } from 'react'
import { characterRoute } from '../router'

export default function CharacterDetail() {
  const { id } = characterRoute.useParams()
  const [character, setCharacter] = useState<any>(null)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data))
  }, [id])

  if (!character) return <p>Loading...</p>

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',gap: '20px', padding: '20px'}}>
      <img src={character.image} alt={character.name} style={{  width: '200px', height: 'auto' }} />
      <div>
        <h1>{character.name}</h1>
        <p>{character.status}: {character.species}</p>
        <p>{character.gender}</p>
        <p>{character.location.name}</p>
      </div>
    </div>
  )
}
