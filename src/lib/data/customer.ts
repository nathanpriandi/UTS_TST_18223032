"use server"

import { HttpTypes } from "@medusajs/types"
import { redirect } from "next/navigation"

/**
 * Mocked function to simulate retrieving a customer.
 * Returns null as customer accounts are not part of the Fake Store API.
 */
export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    return null
  }

/**
 * Mocked function to simulate updating a customer.
 */
export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  return
}

/**
 * Mocked function to simulate customer signup.
 */
export async function signup(_currentState: unknown, formData: FormData) {
  return "Signup is not available."
}

/**
 * Mocked function to simulate customer login.
 */
export async function login(_currentState: unknown, formData: FormData) {
  return "Login is not available."
}

/**
 * Mocked function to simulate customer signout.
 */
export async function signout(countryCode: string) {
  redirect(`/${countryCode}/account`)
}

/**
 * Mocked function to simulate transferring a cart.
 */
export async function transferCart() {
  return
}

/**
 * Mocked function to simulate adding a customer address.
 */
export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  return { success: false, error: "Address management is not available." }
}

/**
 * Mocked function to simulate deleting a customer address.
 */
export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  return
}

/**
 * Mocked function to simulate updating a customer address.
 */
export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  return { success: false, error: "Address management is not available." }
}
