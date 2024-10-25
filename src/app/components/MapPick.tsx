'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Badge from './Badge';
import DateFormator from '../ultilities/DateFormater';

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

export default function MapPick({ data, setState, key, unit }: any) {
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
                    center: [100.5518, 13.8063],
                    zoom: 11
                });


                // new mapboxgl.Marker(markerRef.current)
                //     .setLngLat([100.5018, 13.7563])
                //     .setPopup(popup)
                //     .addTo(mapRef.current);

                // for (const marker of data || geojson.features) {
                var setCentered = false;
                for (const marker of data) {
                    if (marker.LastUpdated?.lat && !setCentered) {
                        setCentered = true;
                        mapRef.current.setCenter([parseFloat(marker.LastUpdated?.long), parseFloat(marker.LastUpdated?.lat)])
                    }
               

                    const el = document.createElement('div');
                    const elChild = document.createElement('div');
                    const elChild1 = document.createElement('div');

                    el.className = 'marker ';
                    el.style.cursor = 'pointer';


                    elChild1.className = "w-12 h-12 rounded-full flex justify-center items-center animate-pulse bg-[#2970FF]/40 absolute top-[-4px] right-[-4px] duration-50"
                    elChild.className = "w-10 h-10 rounded-full flex justify-center items-center text-white bg-[#2970FF]/60 relative z-10";
                    elChild.innerHTML =  marker.LastUpdate?.AQI?.aqi ||  marker.LastUpdate?.COD ||  marker.LastUpdate?.NOx_7p || "N/A";


                    el.appendChild(elChild1)
                    el.appendChild(elChild)


                    el.addEventListener('click', () => {
                        // console.log(marker.LastUpdate?.COD);
                        //call back function

                        marker && setState && setState(marker)
                    });
                    
                    const colorMap = [
                        '',
                        '<div style="background:#EFF4FF;border:1px solid #155EEF;border-radius:20px;padding:2px 10px;color:#155EEF;">คุณภาพดีมาก</div>',
                        '<div style="background:#ECFDF3;border:1px solid #067647;border-radius:20px;padding:2px 10px;color:#067647;">คุณภาพดี</div>',
                        '<div style="background:#FFFAEB;border:1px solid #B54708;border-radius:20px;padding:2px 10px;color:#B54708;">คุณภาพปานกลาง</div>',
                        '<div style="background:#FEF6EE;border:1px solid #B93815;border-radius:20px;padding:2px 10px;color:#B93815;">เริ่มมีผลกระทบ</div>',
                        '<div style="background:#FEF3F2;border:1px solid #ef4444;border-radius:20px;padding:2px 10px;color:#ef4444;">มีผลกระทบ</div>'
                    ]

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<div style="display: grid;">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="font-size: 1.25rem; font-weight:bold;">
                                ${ marker.LastUpdate?.AQI?.aqi ||  marker.LastUpdate?.COD ||  marker.LastUpdate?.NOx_7p  || "N/A"} <span style="font-size: 1.125rem;font-weight:normal;">${unit}</span>
                            </div>
                            ${colorMap[(marker.LastUpdate?.AQI?.color_id)]}
                        </div>
                        <div style="height:2px;margin:10px;background:#EAECF0;border-radius:10px;"></div>
                        <div style="display: grid;justify-items:center;">
                            <div style="font-size: 1.125rem; font-weight: bold;">${marker?.nameTH}</div>
                            <div style="color: #6b7280;text-align: center;">อัปเดตล่าสุด : ${marker?.LastUpdate?.date && DateFormator(new Date(`${marker?.LastUpdate.date}T${marker?.LastUpdate.time}`))}</div>
                        </div>
                    </div>`
                    );


                    new mapboxgl.Marker(el)
                        .setLngLat([100.5018 + Math.random() * 0.1, 13.7563 + Math.random() * 0.1])
                        .setPopup(popup)
                        .addTo(mapRef.current)
                }


            }


        }

        // Cleanup map instance on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, [data]);

    return (
        <div className="w-full h-full rounded-xl bg-slate-100 overflow-hidden">
            {/* Map container */}
            <div ref={mapContainerRef} id="map" style={{ height: '100%' }} />
        </div>
    );
}


