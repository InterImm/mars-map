# mars-map

InterImm's map of Mars in 2200, live at https://interimm.org/mars-map/ (English: https://interimm.org/mars-map/en/).

A static page, served by GitHub Pages from the `gh-pages` branch; nothing to build.

* Look: the shared InterImm kit from https://interimm.org/kit/ (colours, fonts, header, footer). `css/map.css` only adds the map's own panels and dresses Leaflet in the kit's style. See the [kit README](https://github.com/InterImm/interimm.github.io/blob/hugo/kit/README.md).
* Places and the elevation key: `js/map.js`, used by both language pages.
* Data: [Mars basemap by nmanaud](https://github.com/nmanaud/whereonmars/wiki/Basemaps) (NASA MOLA colour shaded relief).
* Tools: [Leaflet](https://leafletjs.com) 1.9.4, in `vendor/leaflet/`.
