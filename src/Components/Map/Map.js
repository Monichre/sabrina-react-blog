

export const mapConfig = {
    "type": "map",
    "theme": "black",

    "dataProvider": {
        "map": "worldLow",
        "areas": [
            { "id": "AU", "color": "rgb(51, 174, 170)" },
            { "id": "US", "color": "rgb(51, 174, 170)" },
            { "id": "FR", "color": "rgb(51, 174, 170)" }
        ],
        "zoomLevel": 1,
        "zoomLongitude": -20.1341,
        "zoomLatitude": 49.1712
    },

    "areasSettings": {
        "selectedColor": "rgb(51, 174, 170)",
        "unlistedAreasColor": "#eee",
        "rollOverOutlineColor": "#889ca4",
        "autoZoom": "true",

        "outlineColor": "#BFDBE3"
            // "unlistedAreasAlpha": 0.9
    },

    "imagesSettings": {
        "rollOverColor": "#fff",
        "selectedColor": "#000000"
    },

    "linesSettings": {
        "arc": -0.7, // this makes lines curved. Use value from -1 to 1
        "arrow": "middle",
        "color": "#d2f0f9",
        "lineColor": "#d2f0f9",
        "alpha": 0.4,
        "arrowAlpha": 1,
        "arrowSize": 4
    },
    "zoomControl": {
        "zoomControlEnabled": false,
        "gridHeight": 100,
        "draggerAlpha": 1,
        "gridAlpha": 0.2
    },

    "backgroundZoomsToTop": true,
    "linesAboveImages": true,

    "export": {
        "enabled": true
    }
}
