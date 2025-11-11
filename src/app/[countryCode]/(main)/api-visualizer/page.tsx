import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ApiVisualizerPage({
  params,
}: {
  params: { countryCode: string }
}) {
  const {
    response: { products },
  } = await listProducts({ countryCode: params.countryCode })

  return (
    <div className="py-12">
      <div className="content-container">
        <h1 className="text-2xl-semi mb-8">API Visualizer</h1>
        <h2 className="text-xl-semi">Products</h2>
        <pre className="bg-ui-bg-subtle p-4 mt-4 rounded-lg">
          {JSON.stringify(products, null, 2)}
        </pre>
      </div>
    </div>
  )
}
