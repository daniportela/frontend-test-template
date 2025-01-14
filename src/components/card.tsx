"use client"

// Components
import Image from "next/image";

// Hooks
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider";

// Types
import { Game } from "@/utils/endpoint";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";


export default function Card({ game, variant = "default" }: { game: Game, variant?: "default" | "horizontal" }) {
    const { addGame, isInCart, removeGame } = useLocalStorageCtx()

    const isGameInCart = isInCart(game.id)
    const gameInCartBtnClassNames = variant === "default" ? (!isGameInCart ? "block border-2 rounded-lg py-3 hover:bg-gray-dark hover:text-white transition ease-in-out duration-200" : "bg-gray-dark text-white") : ""
    const layoutClassNames = variant === "default" ? "grid grid-rows-subgrid gap-[20px] row-span-3" : "flex gap-[20px] sm:flex-col"
    const imageClassNames = variant === "default" ? "rounded-lg rounded-bl-none rounded-br-none" : ""

    function handleAddOrRemove() {
        if (!isGameInCart) {
            addGame(game)
        } else {
            removeGame(game.id)
        }
    }

    return (
        <article className={cn("border-2 text-gray-text p-4 rounded-lg", layoutClassNames)}>
            <div className="overflow-clip">
                <Image
                    src={game.image}
                    width={200}
                    height={120}
                    alt={`${game.name} cover art`}
                    className={cn("w-full h-full object-cover hover:scale-110 transition ease-in-out duration-300", imageClassNames)}
                />
            </div>

            <div>
                <span className="block text-gray-border">{game.genre.toUpperCase()}</span>

                <div className="flex justify-between">
                    <span className="font-bold text-xl">{game.name}</span>
                    <span>$ {game.price}</span>
                </div>
            </div>

            <button onClick={handleAddOrRemove} className={cn(gameInCartBtnClassNames)}>
                {
                    variant === "horizontal" ? (
                        <X />
                    ) : (
                        isGameInCart ? "Remove from Cart" : "Add to Cart"
                    )
                }
            </button>
        </article>
    )
}