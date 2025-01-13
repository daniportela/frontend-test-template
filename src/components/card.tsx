"use client"

// Components
import Image from "next/image";

// Hooks
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";

// Types
import { Game } from "@/utils/endpoint";
import { cn } from "@/utils/cn";


export default function Card({ game }: { game: Game }) {
    const { addGame, isInCart, removeGame } = useLocalStorageCtx()

    const isGameInCart = isInCart(game.id)
    const gameInCartBtnClassNames = isGameInCart ? "bg-gray-dark text-white" : ""

    function handleAddOrRemove() {
        if (!isGameInCart) {
            addGame(game)
        } else {
            removeGame(game.id)
        }
    }

    return (
        <article className="border-2 text-gray-text p-4 rounded-lg row-span-3 grid grid-rows-subgrid gap-[20px]">
            <div className="overflow-clip">
                <Image
                    src={game.image}
                    width={200}
                    height={120}
                    alt={`${game.name} cover art`}
                    className="w-full h-full object-cover rounded-lg rounded-bl-none rounded-br-none hover:scale-110 transition ease-in-out duration-300"
                />
            </div>

            <div>
                <span className="block text-gray-border">{game.genre.toUpperCase()}</span>

                <div className="flex justify-between">
                    <span>{game.name}</span>
                    <span>$ {game.price}</span>
                </div>
            </div>

            <button onClick={handleAddOrRemove} className={cn("block border-2 rounded-lg py-3 hover:bg-gray-dark hover:text-white transition ease-in-out duration-200", gameInCartBtnClassNames)}>
                {isGameInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
        </article>
    )
}