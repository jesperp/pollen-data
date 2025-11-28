import slugify from "@sindresorhus/slugify"
import { defineCollection, z } from "astro:content"

const region = defineCollection({
  loader: async () => {
    const response = await fetch("https://api.pollenrapporten.se/v1/regions")
    const json = await response.json()
    return json.items.map((item: { id: string; name: string }) => ({
      id: slugify(item.name),
      name: item.name,
      nrmId: item.id,
    }))
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
    nrmId: z.string(),
  }),
})
const pollenLevel = defineCollection({
  loader: async () => {
    const response = await fetch(
      "https://api.pollenrapporten.se/v1/pollen-level-definitions",
    )
    const json = await response.json()
    const items = json.items
    return items.map((item: { level: number; name: string }) => ({
      id: item.level.toString(),
      name: item.name,
    }))
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
  }),
})

const pollenType = defineCollection({
  loader: async () => {
    const response = await fetch(
      "https://api.pollenrapporten.se/v1/pollen-types",
    )
    const json = await response.json()
    const items = json.items
    return items.map(({ id, name, ...rest }: { id: string; name: string }) => ({
      name,
      ...rest,
      id: slugify(name),
      nrmId: id,
    }))
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
    nrmId: z.string(),
    thresholdLow: z.number(),
    thresholdMedium: z.number(),
    thresholdHigh: z.number(),
    thresholdVeryHigh: z.number(),
  }),
})

export const collections = { pollenType, pollenLevel, region }
