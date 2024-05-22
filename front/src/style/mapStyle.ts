import type { ThemeMode } from "@/types";

const getMapStyle = (mode: ThemeMode) => {
    return mapStyle[mode];
};

const mapStyle = {
    light: [
        {
            "featureType": "poi.attraction",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.school",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "transit.station.bus",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        }
    ],
    dark: [
        {
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#242f3e"
            }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#746855"
            }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#242f3e"
            }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#d59563"
            }
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#263c3f"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#6b9a76"
            }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.school",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#38414e"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
            {
                "color": "#212a37"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#9ca5b3"
            }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#746855"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
            {
                "color": "#1f2835"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#f3d19c"
            }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#2f3948"
            }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#17263c"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#515c6d"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#17263c"
            }
            ]
        }
    ]
};

export default getMapStyle;