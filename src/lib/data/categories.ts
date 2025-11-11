"use server"

import { HttpTypes } from "@medusajs/types"

/**
 * Fetches a list of categories from the Fake Store API and maps them to the Medusa category format.
 */
export const listCategories = async (
  query?: Record<string, any>
): Promise<HttpTypes.StoreProductCategory[]> => {
  const response = await fetch("https://fakestoreapi.com/products/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories from Fake Store API")
  }
  const fakeStoreCategories: string[] = await response.json()

  // Map Fake Store API categories to Medusa's HttpTypes.StoreProductCategory format
  const categories: HttpTypes.StoreProductCategory[] = fakeStoreCategories.map(
    (name: string, index: number) => ({
      id: `category-${index}`,
      name: name,
      handle: name,
      parent_category: null,
      category_children: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  )

  return categories
}

/**
 * Fetches a single category by its handle (name) from the Fake Store API.
 * Since the API doesn't support fetching by handle, we fetch all and find the match.
 */
export const getCategoryByHandle = async (
  categoryHandle: string[]
): Promise<HttpTypes.StoreProductCategory | undefined> => {
  const handle = categoryHandle.join("/")
  const categories = await listCategories()
  return categories.find((c) => c.handle === handle)
}
