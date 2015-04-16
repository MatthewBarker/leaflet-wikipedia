# Leaflet-Wikipedia

A leaflet plugin module to display Wikipedia entries on a map layer

## Dependencies

- [leaflet](git://github.com/Leaflet/Leaflet.git)
- [jsonp](https://github.com/nispero/Lightweight-JSONP)

## Installation instructions

- **npm:**`npm install --save leaflet-wikipedia`
- **Bower:**`bower install --save leaflet-wikipedia`

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

### api
- The URL for the Wikipedia API
- **type:** string
- **default:** https://en.wikipedia.org/w/api.php

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