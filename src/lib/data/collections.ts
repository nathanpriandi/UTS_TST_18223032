"use server"

import { HttpTypes } from "@medusajs/types"

const FAKE_STORE_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
]

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
 * Returns a hardcoded list of categories mapped to the Medusa collection format.
 * This prevents build failures if the Fake Store API is unavailable.
 */
export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const fakeStoreCategories: string[] = FAKE_STORE_CATEGORIES

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
 * Returns a collection from the hardcoded list.
 */
export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection | null> => {
  const { collections } = await listCollections()
  return collections.find((c) => c.handle === handle) || null
}
