'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Badge from './Badge';

const geojson: any = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Point',
            properties: {
                message: '20',
                imageId: 1011,
                iconSize: [60, 60]
            },
            geometry: {
                type: 'Point',
                coordinates: [100.5118, 13.7463]
            }
        },
        {
            type: 'Point',
            properties: {
                message: '50.5',
                imageId: 870,
                iconSize: [50, 50]
            },
            geometry: {
                type: 'Point',
                coordinates: [100.4918, 13.7583]
            }
        },
        {
            type: 'Point',
            properties: {
                message: '56.6',
                imageId: 837,
                iconSize: [40, 40]
            },
            geometry: {
                type: 'Point',
                coordinates: [100.5118, 13.7523]
            }
        }
    ]
};

export default function MapPick() {
    // Explicitly type the map container ref
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null); // Type for Mapbox map
    const markerRef = useRef();

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


                // new mapboxgl.Marker(markerRef.current)
                //     .setLngLat([100.5018, 13.7563])
                //     .setPopup(popup)
                //     .addTo(mapRef.current);

                for (const marker of geojson.features) {
                    const el = document.createElement('div');
                    const elChild = document.createElement('div');
                    const elChild1 = document.createElement('div');

                    el.className = 'marker ';
                    el.style.cursor = 'pointer';


                    elChild1.className = "w-12 h-12 rounded-full flex justify-center items-center animate-pulse bg-blue-400 absolute top-[-4px] right-[-4px] duration-50"
                    elChild.className = "w-10 h-10 rounded-full flex justify-center items-center text-white bg-[--primary] relative z-10";
                    elChild.innerHTML = marker.properties.message;


                    el.appendChild(elChild1)
                    el.appendChild(elChild)


                    el.addEventListener('click', () => {
                        console.log(marker.properties.message);
                    });


                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                     `<div style="display: grid;">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="font-size: 1.25rem;">
                                208 <span style="font-size: 1.125rem;">AQI</span>
                            </div>
                            <div>มีผลกระทบ</div>
                        </div>
                        <div style="display: grid;">
                            <div style="font-size: 1.125rem; font-weight: bold;">วัดปลวกเกตุ</div>
                            <div style="color: #6b7280;">อัปเดตล่าสุด : 19 ส.ค. 2564 19:00 น.</div>
                        </div>
                    </div>`
                    );

                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(popup)
                        .addTo(mapRef.current);
                }


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


