import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import ApiVisualizer from "@modules/api-visualizer/components"

export default async function ApiVisualizerPage({
  params,
}: {
  params: { countryCode: string }
}) {
  const {
    response: { products },
  } = await listProducts({ countryCode: params.countryCode })
  const categories = await listCategories()
  const { collections } = await listCollections()

  return (
    <div className="py-12">
      <div className="content-container">
        <ApiVisualizer
          products={products}
          categories={categories}
          collections={collections}
        />
      </div>
    </div>
  )
}