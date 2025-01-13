"use client"

// Components
import Card from "@/components/card"

// Hooks
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Types
import { Game } from "@/utils/endpoint"

type SearchParams = {
  [key: string]: string | string[] | undefined
}

type ApiResponse = {
  games: Game[],
  availableFilters: string[]
}

export default function Home({searchParams}: { searchParams: SearchParams }) {
  const [gameData, setGameData] = useState<ApiResponse>({ games: [], availableFilters: [] })
  const router = useRouter()

  useEffect(() => {
    const queryString = searchParams.genre ? `?genre=${searchParams.genre}` : ""

    async function fetchGames(queryString: string) {
      const response = await fetch(`http://localhost:3000/api/games${queryString}`)
      const data: ApiResponse = await response.json()

      setGameData(data)
    }

    fetchGames(queryString)
  }, [searchParams])

  return (
    <main className='flex flex-col min-h-screen p-24 font-bold'>
      <h1 className="text-3xl">Top Sellers</h1>

      <div className="self-end mt-5 mb-10">
        Genre |
        <select onChange={(e) => {
          const { value } = e.target
          router.push(value === "All" ? "/" : `?genre=${e.target.value}`)
        }}>
          <option value="All">All</option>

          {gameData.availableFilters.map((filter, idx) => (
            <option key={idx} value={filter}>{filter}</option>
          ))}
        </select>
      </div>

      <section className="grid grid-cols-catalog-grid auto-rows-catalog-rows grid-flow-dense gap-[30px]">
        {gameData.games.map(game => (
          <Card key={game.id} game={game} />
        ))}
      </section>
    </main>
  )
}
