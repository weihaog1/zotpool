import React, { useEffect, useRef, useState } from 'react';
import Map, { Source, Layer, Marker, NavigationControl } from 'react-map-gl/mapbox';
import { MapPin, Navigation } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// UCI Main Campus coordinates
const UCI_COORDS = {
  lng: -117.8443,
  lat: 33.6405
};

interface RouteMapProps {
  origin: string;
  originCoords?: { lng: number; lat: number };
  destination?: string;
  destinationCoords?: { lng: number; lat: number };
  height?: string;
  showRoute?: boolean;
  interactive?: boolean;
}

interface RouteData {
  type: 'Feature';
  geometry: {
    type: 'LineString';
    coordinates: number[][];
  };
  properties: Record<string, unknown>;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  origin,
  originCoords,
  destination = 'UCI Main Campus',
  destinationCoords,
  height = '300px',
  showRoute = true,
  interactive = true
}) => {
  const [route, setRoute] = useState<RouteData | null>(null);
  const [startCoords, setStartCoords] = useState<{ lng: number; lat: number } | null>(originCoords || null);
  const [endCoords, setEndCoords] = useState<{ lng: number; lat: number } | null>(destinationCoords || null);
  const [duration, setDuration] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<any>(null);

  // Geocode origin address if no coordinates provided
  useEffect(() => {
    if (originCoords) {
      setStartCoords(originCoords);
      return;
    }

    if (!origin) return;

    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(origin)}.json?access_token=${MAPBOX_TOKEN}&country=US&proximity=-117.8443,33.6405`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          setStartCoords({ lng, lat });
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    geocodeAddress();
  }, [origin, originCoords]);

  // Geocode destination address if no coordinates provided
  useEffect(() => {
    if (destinationCoords) {
      setEndCoords(destinationCoords);
      return;
    }

    if (!destination) {
      setEndCoords(UCI_COORDS);
      return;
    }

    // Check if destination is UCI-related
    const isUCI = destination.toLowerCase().includes('uci') ||
                  destination.toLowerCase().includes('irvine') ||
                  destination.toLowerCase() === 'uc irvine';

    if (isUCI) {
      setEndCoords(UCI_COORDS);
      return;
    }

    const geocodeDestination = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destination)}.json?access_token=${MAPBOX_TOKEN}&country=US&proximity=-117.8443,33.6405`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          setEndCoords({ lng, lat });
        } else {
          setEndCoords(UCI_COORDS);
        }
      } catch (error) {
        console.error('Destination geocoding error:', error);
        setEndCoords(UCI_COORDS);
      }
    };

    geocodeDestination();
  }, [destination, destinationCoords]);

  // Fetch route when we have both coordinates
  useEffect(() => {
    if (!startCoords || !endCoords || !showRoute) return;

    const fetchRoute = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const routeData: RouteData = {
            type: 'Feature',
            geometry: data.routes[0].geometry,
            properties: {}
          };
          setRoute(routeData);
          setDuration(Math.round(data.routes[0].duration / 60)); // Convert to minutes
          setDistance(Math.round(data.routes[0].distance / 1609.34 * 10) / 10); // Convert to miles

          // Fit map to route bounds
          if (mapRef.current) {
            const coordinates = data.routes[0].geometry.coordinates;
            const bounds = coordinates.reduce(
              (bounds: any, coord: number[]) => {
                return bounds.extend(coord);
              },
              new (window as any).mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
            );

            mapRef.current.fitBounds(bounds, {
              padding: 50,
              duration: 1000
            });
          }
        }
      } catch (error) {
        console.error('Route fetching error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoute();
  }, [startCoords, endCoords, showRoute]);

  const initialViewState = {
    longitude: startCoords?.lng || endCoords?.lng || UCI_COORDS.lng,
    latitude: startCoords?.lat || endCoords?.lat || UCI_COORDS.lat,
    zoom: 10
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        interactive={interactive}
      >
        {interactive && <NavigationControl position="top-right" />}

        {/* Route line */}
        {route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                'line-color': '#0064A4',
                'line-width': 4,
                'line-opacity': 0.8
              }}
            />
          </Source>
        )}

        {/* Origin marker */}
        {startCoords && (
          <Marker longitude={startCoords.lng} latitude={startCoords.lat} anchor="bottom">
            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                <MapPin size={20} />
              </div>
            </div>
          </Marker>
        )}

        {/* Destination marker */}
        {endCoords && (
          <Marker longitude={endCoords.lng} latitude={endCoords.lat} anchor="bottom">
            <div className="flex flex-col items-center">
              <div className="bg-uci-blue text-white p-2 rounded-full shadow-lg">
                <Navigation size={20} />
              </div>
            </div>
          </Marker>
        )}
      </Map>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-uci-blue border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Route info overlay */}
      {duration && distance && (
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-slate-100">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-uci-blue rounded-full"></div>
              <span className="font-bold text-slate-900">{duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-slate-600">{distance} mi</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
