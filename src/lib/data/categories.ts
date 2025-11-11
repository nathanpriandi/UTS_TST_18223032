"use server"

import { HttpTypes } from "@medusajs/types"

const FAKE_STORE_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
]

/**
 * Returns a hardcoded list of categories and maps them to the Medusa category format.
 * This prevents build failures if the Fake Store API is unavailable.
 */
export const listCategories = async (
  query?: Record<string, any>
): Promise<HttpTypes.StoreProductCategory[]> => {
  const fakeStoreCategories: string[] = FAKE_STORE_CATEGORIES

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
 * Fetches a single category by its handle (name) from the hardcoded list.
 */
export const getCategoryByHandle = async (
  categoryHandle: string[]
): Promise<HttpTypes.StoreProductCategory | undefined> => {
  const handle = categoryHandle.join("/")
  const categories = await listCategories()
  return categories.find((c) => c.handle === handle)
}
