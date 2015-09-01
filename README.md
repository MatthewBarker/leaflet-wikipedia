# Leaflet-Wikipedia

[![NPM](https://nodei.co/npm/leaflet-wikipedia.png)](https://nodei.co/npm/leaflet-wikipedia/)

A leaflet plugin module to display Wikipedia entries on a map layer

## Example
http://matthewbarker.github.io/leaflet-wikipedia/

## Dependencies

- [leaflet](https://github.com/Leaflet/Leaflet)
- [browser-jsonp](https://github.com/larryosborn/JSONP)

## Installation instructions

- **npm:**`npm install leaflet-wikipedia`
- **Bower:**`bower install leaflet-wikipedia`

## Simple example

```javascript
var map = L.map('map').setView([52.4235064, -1.7134741999999998], 14);

// Add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a Wikipedia layer
L.layerGroup.wikipediaLayer().addTo(map);
```

## Advanced options

```javascript
L.layerGroup.wikipediaLayer({ target: '_blank' }).addTo(map);
```

### url
- The URL for Wikipedia
- **type:** string
- **default:** https://en.wikipedia.org/

### limit
- The maximum number of search results to return
- **type:** number
- **default:** 100

### popupOnMouseover
- If true then the popup will open on mouse over; otherwise it won't
- **type:** Boolean
- **default:** false

### clearOutsideBounds
- If true then markers outside the current map bounds will be removed; otherwise they won't
- **type:** Boolean
- **default:** false

### target
- Specifies where to open the linked Wikipedia page
- **type:** string
- **default:** \_self

### images
- Specifies the folder that contains the Wikipedia icon images
- **type:** string
- **default:** images/

### minZoom
- Specifies the minimum zoom number
- **type:** number
- **default:** 0

### maxZoom
- Specifies the maximum zoom number
- **type:** number
- **default:** 18
