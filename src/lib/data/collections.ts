"use server"

import { HttpTypes } from "@medusajs/types"

/**
 * Mocked function to simulate retrieving a collection.
 * Returns null as collections are not part of the Fake Store API.
 */
export const retrieveCollection = async (
  id: string
): Promise<HttpTypes.StoreCollection | null> => {
  return null
}

/**
 * Fetches categories from the Fake Store API and maps them to the Medusa collection format.
 * This is used by the FeaturedProducts component on the homepage.
 */
export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const response = await fetch("https://fakestoreapi.com/products/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories from Fake Store API")
  }
  const fakeStoreCategories: string[] = await response.json()

  const collections: HttpTypes.StoreCollection[] = fakeStoreCategories.map(
    (name: string, index: number) => ({
      id: `category-${index}`,
      title: name,
      handle: name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  )

  return { collections, count: collections.length }
}

/**
 * Mocked function to simulate retrieving a collection by its handle.
 * Returns null as collections are not part of the Fake Store API.
 */
export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection | null> => {
  const collections = await listCollections()
  return collections.collections.find((c) => c.handle === handle) || null
}
