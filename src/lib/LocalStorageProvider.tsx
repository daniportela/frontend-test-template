"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

// Types
import { Game } from "../utils/endpoint"

type LocalStorageCtxValue = {
    gameCollection: Game[]
    addGame: (game: Game) => void
    removeGame: (id: string) => void
    isInCart: (id: string) => boolean
}

const LocalStorageCtx = createContext({} as LocalStorageCtxValue)

export default function LocalStorageProvider({ children }: { children: React.ReactNode }) {
    const [gameCollection, setGameCollection] = useState<LocalStorageCtxValue["gameCollection"]>(() => {
        if (typeof window !== "undefined") {
            const localStorageCollection = localStorage.getItem("gameCollection");
            return localStorageCollection ? JSON.parse(localStorageCollection) : []
        }

        return []
    });

    useEffect(() => {
        localStorage.setItem("gameCollection", JSON.stringify(gameCollection));
    }, [gameCollection]);

    // Methods to manage cart items
    function addGame(game: Game) {
        setGameCollection([...gameCollection, game])
    }

    function removeGame(id: string) {
        setGameCollection(currentCollection => currentCollection.filter(game => game.id !== id))
    }

    function isInCart(id: string) {
        return gameCollection.some(game => game.id === id)
    }

    const localStorageCtxValue: LocalStorageCtxValue = {
        gameCollection,
        addGame,
        removeGame,
        isInCart
    }

    return (
        <LocalStorageCtx.Provider value={localStorageCtxValue}>
            {children}
        </LocalStorageCtx.Provider>
    )
}

export function useLocalStorageCtx() {
    const context = useContext(LocalStorageCtx)

    if (!context) {
        throw new Error("useLocalStorageCtx must be used within a LocalStorageProvider");
    }

    return context;
}