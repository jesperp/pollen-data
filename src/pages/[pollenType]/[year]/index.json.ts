import { getCollection, getEntry } from "astro:content"
import { pollenYears } from "~/globals"

export async function GET({ params, request }) {
  const { year, pollenType } = params
  const region = await getEntry("region", "goeteborg")
  console.log("[index.astro] region:", region)
  const pt = await getEntry("pollenType", pollenType)
  console.log("[index.astro] pt:", pt)

  const searchParams = new URLSearchParams({
    region_id: region!.data.nrmId,
    pollen_id: pt!.data.nrmId,
    limit: "365",
    start_date: `${year}-01-01`,
    end_date: `${year}-12-31`,
  })
  const response = await fetch(
    `https://api.pollenrapporten.se/v1/pollen-count?${searchParams}`,
  )
  const json = await response.json()
  const pollenCounts = json.items
  return new Response(JSON.stringify(pollenCounts), {
    headers: {
      "Cache-Control": "max-age=31536000, immutable",
    },
  })
}

export const getStaticPaths = async () => {
  const pollenTypes = await getCollection("pollenType")
  return pollenTypes.flatMap((pollenType) =>
    pollenYears.map((year) => ({
      params: { year, pollenType: pollenType.data.id },
    })),
  )
}
