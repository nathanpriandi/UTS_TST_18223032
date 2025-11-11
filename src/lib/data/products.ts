"use server"

import { HttpTypes } from "@medusajs/types"
import { sortProducts } from "@lib/util/sort-products"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

/**
 * Fetches a list of products from the Fake Store API and maps them to the Medusa product format.
 */
export const listProducts = async ({
  pageParam = 1,
  queryParams,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
}> => {
  const limit = queryParams?.limit || 12
  const offset = (pageParam - 1) * limit

  // Fetch products from Fake Store API
  const response = await fetch("https://fakestoreapi.com/products")
  if (!response.ok) {
    throw new Error("Failed to fetch products from Fake Store API")
  }
  const fakeStoreProducts = await response.json()

  // Map Fake Store API products to Medusa's HttpTypes.StoreProduct format
  const products: HttpTypes.StoreProduct[] = fakeStoreProducts.map((p: any) => ({
    id: p.id.toString(),
    title: p.title,
    handle: p.id.toString(),
    description: p.description,
    thumbnail: p.image,
    images: [{ id: p.id.toString(), url: p.image }],
    collection: { id: p.category, title: p.category },
    variants: [
      {
        id: `variant-${p.id}`,
        title: "Default",
        calculated_price: {
          calculated_amount: (p.price * 100).toString(), // Convert to cents
          original_amount: (p.price * 100).toString(),
          currency_code: "usd",
        },
        inventory_quantity: 100, // Fake inventory
        prices: [
          {
            amount: (p.price * 100).toString(),
            currency_code: "usd",
          },
        ],
      },
    ],
    options: [],
    tags: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  const paginatedProducts = products.slice(offset, offset + limit)
  const count = products.length

  const nextPage = count > offset + limit ? pageParam + 1 : null

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}

/**
 * This will fetch all products from the Fake Store API, sort them, and then paginate them.
 */
export const listProductsWithSort = async ({
  page = 1,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  // Fetch all products
  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 1,
    queryParams: { ...queryParams, limit: 9999 }, // Fetch all to sort
    countryCode,
  })

  // Sort products
  const sortedProducts = sortProducts(products, sortBy)

  // Paginate sorted products
  const offset = (page - 1) * limit
  const paginatedProducts = sortedProducts.slice(offset, offset + limit)

  const nextPage = count > offset + limit ? page + 1 : null

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}
