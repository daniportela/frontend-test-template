// Components
import Card from "@/components/card"

// Types
import { Game } from "@/utils/endpoint"

type SearchParams = {
  [key: string]: string | string[] | undefined
}

type ApiResponse = {
  games: Game[],
  availableFilters: string[]
}

export default async function Home({searchParams}: { searchParams: SearchParams }) {
  const queryString = searchParams.genre ? `?genre=${searchParams.genre}` : ""
  const response = await fetch(`http://localhost:3000/api/games${queryString}`)
  const data: ApiResponse = await response.json()

  console.log("searchParams", searchParams)

  return (
    <main className='flex flex-col min-h-screen p-24 font-bold'>
      <h1 className="text-3xl">Top Sellers</h1>

      <div className="self-end mt-5 mb-10">
        Genre |
        <select>
          <option value="All">All</option>

          {data.availableFilters.map((filter, idx) => (
            <option key={idx} value={filter}>{filter}</option>
          ))}
        </select>
      </div>

      <section className="grid grid-cols-catalog-grid auto-rows-catalog-rows grid-flow-dense gap-[30px]">
        {data.games.map(game => (
          <Card key={game.id} game={game} />
        ))}
      </section>
    </main>
  )
}
