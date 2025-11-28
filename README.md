# Pollen data

Display pollen data (currently for Göteborg, Sweden) using Astro and Chart.js. The underlying pollen API that
powers the chart is statically generated from Nordiska Riksmuseet's pollen data. Prefetching (on form change)
and caching should result in minimal lag when loading different pollen data.

## TODO

This is currently a work in progress, areas of improvement include:

- Support location switching (Currently only showing data för Göteborg)
- Auto-detect location
- Better styling
- Responsive and mobile friendly
