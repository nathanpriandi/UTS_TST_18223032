"use server"

import { HttpTypes } from "@medusajs/types"

/**
 * Mocked function to simulate listing regions.
 * Returns an empty array as regions are not part of the Fake Store API.
 */
export const listRegions = async (): Promise<
  HttpTypes.StoreRegion[] | undefined
> => {
  return []
}

/**
 * Mocked function to simulate retrieving a region.
 * Returns null as regions are not part of the Fake Store API.
 */
export const retrieveRegion = async (
  id: string
): Promise<HttpTypes.StoreRegion | null> => {
  return null
}

/**
 * Mocked function to simulate getting a region by country code.
 * Returns a default mock region to ensure the application can function.
 */
export const getRegion = async (
  countryCode: string
): Promise<HttpTypes.StoreRegion | null> => {
  // Return a mock region to avoid breaking components that expect a region object
  return {
    id: "mock-region",
    name: "Mock Region",
    currency_code: "usd",
    tax_rate: 0,
    countries: [
      {
        id: "us",
        iso_2: "us",
        iso_3: "usa",
        name: "United States",
        display_name: "United States",
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
