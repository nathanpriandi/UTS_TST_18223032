"use client"

import { Button, Heading, Spinner } from "@medusajs/ui"
import { useState } from "react"

interface ApiVisualizerProps {
  products: any
  categories: any
  collections: any
}

const ApiVisualizer = ({
  products,
  categories,
  collections,
}: ApiVisualizerProps) => {
  const apis = [
    {
      name: "Products",
      response: products,
    },
    {
      name: "Categories",
      response: categories,
    },
    {
      name: "Collections",
      response: collections,
    },
  ]

  const [selectedApi, setSelectedApi] = useState(apis[0])
  const [response, setResponse] = useState(apis[0].response)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Heading className="text-2xl-semi">API Visualizer</Heading>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
        <div className="flex flex-col gap-y-4">
          {apis.map((api) => {
            return (
              <Button
                key={api.name}
                variant={selectedApi.name === api.name ? "primary" : "secondary"}
                onClick={() => {
                  setSelectedApi(api)
                  setResponse(api.response)
                }}
              >
                {api.name}
              </Button>
            )
          })}
        </div>
        <div className="col-span-2">
          <pre className="bg-ui-bg-subtle p-4 rounded-lg h-full">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default ApiVisualizer
