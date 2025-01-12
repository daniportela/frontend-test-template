import { Game } from "@/utils/endpoint";

export default function OrderSummary({ products }: { products: Game[] }) {
    const totalCartPrice = products.reduce((total, product) => {
        return total + product.price
    }, 0)

    return (
        <section>
            <aside className="border-2 rounded-lg p-6 h-fit">
                <h2 className="text-xl font-bold">Order summary</h2>
                <span>{products.length} items</span>
    
                <ul className="w-full mt-4">
                    {products.map(product => (
                        <li key={product.id} className="flex justify-between">
                            <span>{product.name}</span>
                            <span>$ {product.price}</span>
                        </li>
                    ))}
                </ul>
    
                <hr className="my-4" />
    
                <span className="text-xl font-bold flex justify-between">
                    Order Total
                    <span>$ {totalCartPrice}</span>
                </span>
            </aside>
    
            <button className="text-center py-3 w-full border-2 rounded-lg mt-4 font-bold bg-gray-dark text-white">Checkout</button>
        </section>
    )
}