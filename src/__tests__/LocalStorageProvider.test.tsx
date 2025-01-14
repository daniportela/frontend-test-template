import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { act } from "react";
import LocalStorageProvider, { useLocalStorageCtx } from "../lib/LocalStorageProvider";

// Helper component for testing
const TestComponent = () => {
  const { gameCollection, addGame, removeGame, isInCart } = useLocalStorageCtx();

  return (
    <div>
      <button
        data-testid="add-game"
        onClick={() => addGame({ id: "1", name: "Test Game", description: "Test desc", isNew: false, image: "src", genre: "Action", price: 50 })}
      >
        Add Game
      </button>
      <button data-testid="remove-game" onClick={() => removeGame("1")}>
        Remove Game
      </button>
      <div data-testid="game-in-cart">
        {isInCart("1") ? "Game is in cart" : "Game is not in cart"}
      </div>
      <div data-testid="game-collection">
        {JSON.stringify(gameCollection)}
      </div>
    </div>
  );
};

describe("LocalStorageProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add a game to the collection", () => {
    render(
      <LocalStorageProvider>
        <TestComponent />
      </LocalStorageProvider>
    );

    const addButton = screen.getByTestId("add-game");

    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId("game-collection")).toHaveTextContent(
      '[{"id":"1","name":"Test Game","description":"Test desc","isNew":false,"image":"src","genre":"Action","price":50}]'
    );
    expect(screen.getByTestId("game-in-cart")).toHaveTextContent("Game is in cart");
  });

  it("should remove a game from the collection", () => {
    render(
      <LocalStorageProvider>
        <TestComponent />
      </LocalStorageProvider>
    );

    const addButton = screen.getByTestId("add-game");
    const removeButton = screen.getByTestId("remove-game");

    act(() => {
      addButton.click();
    });

    act(() => {
      removeButton.click();
    });

    expect(screen.getByTestId("game-collection")).toHaveTextContent("[]");
    expect(screen.getByTestId("game-in-cart")).toHaveTextContent("Game is not in cart");
  });

  it("should check if a game is in the collection", () => {
    render(
      <LocalStorageProvider>
        <TestComponent />
      </LocalStorageProvider>
    );

    const addButton = screen.getByTestId("add-game");

    expect(screen.getByTestId("game-in-cart")).toHaveTextContent("Game is not in cart");

    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId("game-in-cart")).toHaveTextContent("Game is in cart");
  });

  it("should persist collection in localStorage", () => {
    render(
      <LocalStorageProvider>
        <TestComponent />
      </LocalStorageProvider>
    );

    const addButton = screen.getByTestId("add-game");

    act(() => {
      addButton.click();
    });

    expect(localStorage.getItem("gameCollection")).toBe(
      JSON.stringify([{ id: "1", name: "Test Game", description: "Test desc", isNew: false, image: "src", genre: "Action", price: 50 }])
    );
  });
});
