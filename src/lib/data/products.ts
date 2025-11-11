"use server"

import { HttpTypes } from "@medusajs/types"
import { sortProducts } from "@lib/util/sort-products"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

// Hardcoded product data from Fake Store API to prevent build/runtime failures
const FAKE_STORE_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  },
]

/**
 * Returns a hardcoded list of products mapped to the Medusa product format.
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

  const fakeStoreProducts = FAKE_STORE_PRODUCTS

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
  }))

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
 * This will use the hardcoded products, sort them, and then paginate them.
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
