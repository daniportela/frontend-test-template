"use client"

// Components
import Image from "next/image";

// Hooks
import { useLocalStorageCtx } from "@/utils/LocalStorageProvider";

// Types
import { Game } from "@/utils/endpoint";


export default function Card({ game }: { game: Game }) {
    const { addGame, isInCart, removeGame } = useLocalStorageCtx()

    const isGameInCart = isInCart(game.id)

    function handleAddOrRemove() {
        if (!isGameInCart) {
            addGame(game)
        } else {
            removeGame(game.id)
        }
    }

    return (
        <article className="border-2">
            <Image src={game.image} width={50} height={50} alt={`${game.name} cover`} />
            <span>{game.genre}</span>
            <span>{game.price}</span>
            <span>{game.name}</span>
            <button onClick={handleAddOrRemove} className="block">
                {isGameInCart ? "Remove game" : "Add game"}
            </button>
        </article>
    )
}