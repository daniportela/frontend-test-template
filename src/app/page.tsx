// Components
import Card from "@/components/card"

// Types
import { Game } from "@/utils/endpoint"

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/games")
  const data = await response.json()

  console.log(data)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 font-bold text-blue-600'>
      <section className="grid grid-cols-3 gap-[30px]">
        {data.games.map((game: Game) => (
          <Card key={game.id} game={game} />
        ))}
      </section>
    </main>
  )
}
