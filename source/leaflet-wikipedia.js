/*global L, jsonp*/

'use strict';

/**
    Initialises a new instance of the L.Icon.WikipediaIcon class.
    The image is taken from here:
    {@link http://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Tango_style_Wikipedia_Icon.svg/40px-Tango_style_Wikipedia_Icon.svg.png }
    @class WikipediaIcon
*/
L.Icon.WikipediaIcon = L.Icon.extend({
    options: {
        iconUrl: 'images/wikipedia-icon.png',
        iconRetinaUrl: 'images/wikipedia-icon-2x.png',
        iconSize:     [40, 40],
        popupAnchor:  [0, -20]
    }
});

/**
    Creates a new Wikipedia icon.
    @method wikipediaIcon
    @returns {module:wikipedia-layer~WikipediaIcon} A new Wikipedia icon.
*/
L.icon.wikipediaIcon = function () {
    return new L.Icon.WikipediaIcon();
};

/**
    A Wikipedia layer group for leaflet.
    @class WikipediaLayer
    @param {Object} [options] - These layer options are merged with the default options
    @param {string} [options.api='https://en.wikipedia.org/w/api.php'] - The URL for the Wikipedia API
    @param {number} [options.limit=100] - The maximum number of search results to return
    @param {Boolean} [options.popupOnMouseover=false] - If true then the popup will open on mouse over; otherwise it won't
    @param {Boolean} [options.clearOutsideBounds=false] - If true then markers outside the current map bounds will be removed; otherwise they won't
    @param {string} [options.target='_self'] - specifies where to open the linked Wikipedia page
*/
L.LayerGroup.WikipediaLayer = L.LayerGroup.extend(
    /** @lends module:wikipedia-layer~WikipediaLayer */
    {
        /**
            Query string fragment to use when linking to a Wikipedia page.
            @constant 
            @default
            @private
        */
        PAGE: '?curid=',
        /**
            Default layer options. 
            @default
            @private
        */
        options: {
            api: 'https://en.wikipedia.org/w/api.php',
            limit: 100,
            popupOnMouseover: false,
            clearOutsideBounds: false,
            target: '_self'
        },
        /**
            Create the layer group using the passed options.
            @param {Object} options
            @private
        */
        initialize: function (options) {
            options = options || {};
            L.Util.setOptions(this, options);
            this._layers = {};
        },
        /**
            Store a reference to the map and call the requestData() method.
            @private
        */
        onAdd: function (map) {
            map.on('moveend', this.requestData, this);
            this._map = map;
            this.requestData();
        },
        /**
            Remove the 'moveend' event listener and clear all the markers.
            @private
        */
        onRemove: function (map) {
            map.off('moveend', this.requestData, this);
            this.clearMarkers();
        },
        /**
            Send a query request for JSONP data.
            @private
        */
        requestData: function () {
            var origin = this._map.getCenter(),
                parameters = {
                    format: 'json',
                    action: 'query',
                    list: 'geosearch',
                    gslimit: this.options.limit,
                    gsradius: this.getRadius(),
                    gscoord: origin.lat + '|' + origin.lng
                },
                self = this;

            jsonp.get(this.options.api, parameters, function (response) {
                self.parseData(response);
            });
        },
        /**
            Create a new marker.
            @param {Object} result - JSON data
            @return {L.marker} The new marker.
            @private
        */
        getMarker: function (result) {
            var marker = L.marker([result.lat, result.lon], { icon: L.icon.wikipediaIcon() }),
                href = this.url + this.PAGE + result.pageid,
                popup = '<a href="' + href + '" target="' + this.options.target + '">' + result.title + '</a>';

            marker.bindPopup(popup);

            if (this.options.popupOnMouseover) {
                marker.on('mouseover', function (event) {
                    event.target.openPopup();
                });
            }

            return marker;
        },
        /**
            Add a marker by calling the addMarker() method.
            @param {Object} result - JSON data
            @private
        */
        addMarker: function (result) {
            var marker = this.getMarker(result),
                key = result.pageid;

            if (!this._layers[key]) {
                this._layers[key] = marker;
                this._map.addLayer(marker);
            }
        },
        /**
            Parse the response data and call the addMarker() method for each result.
            @param {Object} response - JSON data
            @private
        */
        parseData: function (response) {
            var results = response.query.geosearch,
                index = 0,
                length = results.length;

            for (index; index < length; index += 1) {
                this.addMarker(results[index]);
            }

            if (this.options.clearOutsideBounds) {
                this.clearOutsideBounds();
            }
        },
        /**
            Get the radius for the Wikipedia search based on the current map bounds.
            This is limited to the maximum supported by the API, which is 10000.
            @return {number} The radius to search.
            @private
        */
        getRadius: function () {
            var bounds = this._map.getBounds(),
                northWest = bounds.getNorthWest(),
                southEast = bounds.getSouthEast(),
                radius = northWest.distanceTo(southEast) / 2;

            return radius > 10000 ? 10000 : radius;
        },
        /**
            Clear all markers currently outside the map bounds.
            @private
        */
        clearOutsideBounds: function () {
            var bounds = this._map.getBounds(),
                latLng,
                key;

            for (key in this._layers) {
                if (this._layers.hasOwnProperty(key)) {
                    latLng = this._layers[key].getLatLng();

                    if (!bounds.contains(latLng)) {
                        this._map.removeLayer(this._layers[key]);
                        delete this._layers[key];
                    }
                }
            }
        }
    }
);

/**
    Creates a new Wikipedia layer.
    @method wikipediaLayer
    @returns {module:wikipedia-layer~WikipediaLayer} A new Wikipedia layer.
*/
L.layerGroup.wikipediaLayer = function (options) {
    return new L.LayerGroup.WikipediaLayer(options);
};