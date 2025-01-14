"use client"

// Components
import Card from "@/components/card"

// Hooks
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Types
import { Game } from "@/utils/endpoint"
import { LoaderCircle } from "lucide-react"

type SearchParams = {
  [key: string]: string | undefined
}

type ApiResponse = {
  games: Game[],
  availableFilters: string[]
}

export default function Home({searchParams}: { searchParams: SearchParams }) {
  const [gameData, setGameData] = useState<ApiResponse>({ games: [], availableFilters: [] })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const baseUrl = process.env.NODE_ENV === "production" ? `${process.env.API_URL}/api/games` : "http://localhost:3000/api/games"

  useEffect(() => {
    const url = new URL(baseUrl)

    if (searchParams.genre) {
      url.searchParams.append("genre", searchParams.genre);
    }
    url.searchParams.append("page", page.toString())

    async function fetchGames(url: URL) {
      const response = await fetch(url)
      const data: ApiResponse = await response.json()

      setGameData(prevData => {
        if (page > 1) {
          return {
            ...data,
            games: [...prevData.games, ...data.games]
          }
        } else {
          return data
        }
      })
    }

    try {
      // Cheap way for loading state. Ideally would use 'loading.tsx' provided by Next,
      // and keep this a server component, but was unable to insert Links inside <select>
      setLoading(true)
      fetchGames(url).finally(() => setLoading(false))
      
    } catch (error) {
      console.log(error)
    }
  }, [searchParams, page])

  function handleSeeMore() {
    setPage(prevPage => prevPage + 1)
  }

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
        {loading ? (
          <LoaderCircle className="animate-spin place-self-center" size={64} />
        ) : (
          gameData.games.map(game => (
            <Card key={game.id} game={game} />
          ))
        )}
      </section>

      <button className="bg-gray-dark text-white self-start rounded-lg py-3 px-6 mt-10" onClick={handleSeeMore}>See more</button>
    </main>
  )
}
