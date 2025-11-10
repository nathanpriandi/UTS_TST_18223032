import { NextPage } from "next"
import { useEffect, useState } from "react"
import { sdk } from "@lib/config"
import { Product, Order } from "@medusajs/medusa"

interface ExchangeRates {
  [key: string]: number
}

const ApiVisualizer: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({})

  useEffect(() => {
    sdk.products
      .list({
        fields: "id,title,variants,variants.inventory_quantity",
      })
      .then(({ products }) => {
        setProducts(products)
      })

    sdk.orders.list().then(({ orders }) => {
      setOrders(orders)
    })

    fetch("https://api.frankfurter.app/latest")
      .then((res) => res.json())
      .then((data) => {
        setExchangeRates(data.rates)
      })
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Visualizer</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.title} - Inventory:{" "}
                {product.variants[0]?.inventory_quantity ?? "N/A"}
              </li>
            ))}
          </ul>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                Order #{order.display_id} - Status: {order.status}
              </li>
            ))}
          </ul>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Exchange Rates (vs EUR)</h2>
          <ul>
            {Object.entries(exchangeRates).map(([currency, rate]) => (
              <li key={currency}>
                {currency}: {rate}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ApiVisualizer
