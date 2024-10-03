'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapPick() {
    // Explicitly type the map container ref
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null); // Type for Mapbox map

    useEffect(() => {
        // Ensure Mapbox access token is set
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API || '';

        // Check for Mapbox support
        if (!mapboxgl.supported()) {
            alert('Your browser does not support Mapbox GL');
        } else {
            if (mapContainerRef.current) {
                // Initialize map only once
                mapRef.current = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [100.5018, 13.7563],
                    zoom: 14
                });
            }
        }

        // Cleanup map instance on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    return (
        <div className="w-full h-full rounded-xl bg-slate-100 overflow-hidden">
            {/* Map container */}
            <div ref={mapContainerRef} id="map" style={{ height: '100%' }} />
        </div>
    );
}
