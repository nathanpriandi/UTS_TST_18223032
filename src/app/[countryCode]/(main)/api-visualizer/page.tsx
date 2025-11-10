import { medusaClient } from "@lib/config"
import { Product } from "@medusajs/medusa"
import { notFound } from "next/navigation"

async function getProducts() {
  const { products } = await medusaClient.products.list({ limit: 10 })
  return products
}

async function getExchangeRate() {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
    const data = await response.json()
    return data.rates
  } catch (error) {
    console.error("Error fetching exchange rate:", error)
    return null
  }
}

export default async function ApiVisualizerPage({
  params,
}: {
  params: { countryCode: string }
}) {
  const products = await getProducts()
  const exchangeRates = await getExchangeRate()

  if (!products) {
    return notFound()
  }

  return (
    <div className="py-12">
      <div className="content-container">
        <h1 className="text-2xl-semi">API Visualizer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-xl-semi">Products</h2>
            <ul className="mt-4">
              {products.map((product: Product) => (
                <li key={product.id} className="border-b py-2">
                  {product.title}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl-semi">Exchange Rates (USD)</h2>
            {exchangeRates ? (
              <ul className="mt-4">
                {Object.entries(exchangeRates).map(([currency, rate]) => (
                  <li key={currency} className="border-b py-2">
                    {currency}: {rate}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Could not fetch exchange rates.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}