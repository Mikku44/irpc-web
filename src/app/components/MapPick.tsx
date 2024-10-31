'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Badge from './Badge';
import DateFormator from '../ultilities/DateFormater';


export default function MapPick({ data, setState, key, unit, name }: any) {
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
                    const effectAirColor = {

                    }


                    const getPinColor = (name: string, colorId: number | undefined, effect: number | undefined): string[] => {
                        // Define color mappings for 'air', 'sound', and a fallback for all other cases
                        const pinColorMap: any = {
                            'air': [
                                ["", ""],
                                ["bg-[#2970FF]/40", 'bg-[#2970FF]/60'],
                                ["bg-[#92d050]/40", 'bg-[#92d050]/60'],
                                ["bg-[#ffff00]/40", 'bg-[#ffff00]/60'],
                                ["bg-[#ffa200]/40", 'bg-[#ffa200]/60'],
                                ["bg-[#f04646]/40", 'bg-[#f04646]/60'],
                            ],
                            'sound': [
                                ["", ""],
                                ["bg-[#2970FF]/40", 'bg-[#2970FF]/60'],
                                ["bg-[#ffff00]/40", 'bg-[#ffff00]/60'],
                                ["bg-[#f04646]/40", 'bg-[#f04646]/60'],
                            ],
                            'default': [
                                ["", ""],
                                ["bg-[#2970FF]/40", 'bg-[#2970FF]/60'],
                                ["bg-[#f04646]/40", 'bg-[#f04646]/60'],
                            ],
                        };

                        // Use 'air' or 'sound' specific colors; otherwise, use 'default'
                        const selectedMap = pinColorMap[name] || pinColorMap['default'];

                        // Return color classes based on colorId or effect
                        return selectedMap[colorId ?? effect ?? 0] || ["bg-[--tertiary]/40", "bg-[--tertiary]/60"];
                    };

                    const colorClasses = getPinColor(name || 'air', marker.LastUpdate?.AQI?.color_id, marker.LastUpdate?.effect);


                    elChild1.className = `w-12 h-12 rounded-full flex justify-center items-center animate-pulse  ${colorClasses[0]} absolute top-[-4px] right-[-4px] duration-50`
                    elChild.className = `w-10 h-10 rounded-full flex justify-center items-center text-white  ${colorClasses[0]} relative z-10`;
                    elChild.innerHTML = (marker.LastUpdate?.AQI?.aqi || marker.LastUpdate?.COD || marker.LastUpdate?.NOx_7p || marker.LastUpdate?.Leq || "N/A");


                    el.appendChild(elChild1)
                    el.appendChild(elChild)


                    el.addEventListener('click', () => {
                        // console.log(marker.LastUpdate?.COD);
                        //call back function

                        marker && setState && setState(marker)
                    });

                    // Define the color maps
                    const colorMap = [
                        '',
                        '<div style="background:#3bccff;border:1px solid #155EEF;border-radius:20px;padding:2px 10px;color:#155EEF;">ดีมาก</div>',
                        '<div style="background:#92d050;border:1px solid #067647;border-radius:20px;padding:2px 10px;color:#067647;">ดี</div>',
                        '<div style="background:#ffff00;border:1px solid #B54708;border-radius:20px;padding:2px 10px;color:#B54708;">ปานกลาง</div>',
                        '<div style="background:#ffa200;border:1px solid #B93815;border-radius:20px;padding:2px 10px;color:#B93815;">เริ่มมีผลกระทบ</div>',
                        '<div style="background:#f04646;border:1px solid #881208;border-radius:20px;padding:2px 10px;color:#881208;">มีผลกระทบ</div>'
                    ];
                    const colorMapSound = [
                        '',
                        '<div style="background:#3bccff;border:1px solid #155EEF;border-radius:20px;padding:2px 10px;color:#155EEF;">ปกติ</div>',
                        '<div style="background:#ffa200;border:1px solid #B93815;border-radius:20px;padding:2px 10px;color:#B93815;">เฝ้าระวัง</div>',
                        '<div style="background:#f04646;border:1px solid #881208;border-radius:20px;padding:2px 10px;color:#881208;">มีผลกระทบ</div>'
                    ];
                    const colorOtherMap = [
                        '',
                        '<div style="background:#3bccff;border:1px solid #155EEF;border-radius:20px;padding:2px 10px;color:#155EEF;">ปกติ</div>',
                        '<div style="background:#f04646;border:1px solid #881208;border-radius:20px;padding:2px 10px;color:#881208;">มีผลกระทบ</div>'
                    ];

                    // Function to get the color map based on name
                    const getColorMap = (name: string) => {
                        if (name === 'sound') return colorMapSound;
                        if (name === 'air') return colorMap;
                        return colorOtherMap;
                    };

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<div style="display: grid;">
        <div style="display: flex; justify-content: space-between;">
            <div style="font-size: 1.25rem; font-weight:bold;">
                ${marker.LastUpdate?.AQI?.aqi || marker.LastUpdate?.COD || marker.LastUpdate?.NOx_7p ||marker.LastUpdate?.Leq || "N/A"} 
                <span style="font-size: 1.125rem;font-weight:normal;">${unit}</span>
            </div>
            ${getColorMap(name)[marker.LastUpdate?.AQI?.color_id || marker.LastUpdate?.effect || 1]}
        </div>
        <div style="height:2px;margin:10px;background:#EAECF0;border-radius:10px;"></div>
        <div style="display: grid;justify-items:center;">
            <div style="font-size: 1.125rem; font-weight: bold;">${marker?.nameTH}</div>
            <div style="color: #6b7280;text-align: center;">
                อัปเดตล่าสุด : ${marker?.LastUpdate?.date && DateFormator(new Date(`${marker?.LastUpdate.date}T${marker?.LastUpdate.time}`))}
            </div>
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


