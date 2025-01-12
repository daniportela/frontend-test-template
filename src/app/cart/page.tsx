"use client"

// Components
import Card from "@/components/card"
import OrderSummary from "@/components/order-summary"

// Hooks
import { useLocalStorageCtx } from "@/lib/LocalStorageProvider"
import Link from "next/link"

export default function CartPage() {
    const { gameCollection } = useLocalStorageCtx()

    return (
        !!gameCollection.length ? (
            <main className="px-24">
                <h1 className="text-3xl font-bold mt-10">Your Cart</h1>
                <span className="block mt-2 mb-10">{gameCollection.length} items</span>

                <section className="grid grid-cols-2 gap-[30px] text-gray-text">
                    <section>
                        {gameCollection.map(game => (
                            <Card key={game.id} game={game} />
                        ))}
                    </section>

                    <OrderSummary products={gameCollection} />
                </section>
            </main>
        ) : (
            <>
                <h1>Your cart is empty</h1>
                <p>Browse our products and add them to the cart</p>

                <Link href="/">&#8592; Back to shop</Link>
            </>
        )
    )
}