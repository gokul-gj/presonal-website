"use client";

import React, { useState, useMemo } from "react";
// @ts-ignore
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Compass, Plus, Minus, MapPin } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
// Official India map with complete J&K from DataMeet India (Open data initiative)
const indiaGeoUrl = "https://raw.githubusercontent.com/datameet/maps/master/Country/india-composite.geojson";

// Matching tailwind.config.ts accents
const THEME = {
    primary: "#7d5fff", // Purple
    secondary: "#ccff00", // Lime
    bg: "#050505",
    ocean: "#0a0a0a",
    land: "#141414",
    landHover: "#1a1a1a",
    border: "#262626"
};

type LocationType = "country" | "state" | "city";

interface LocationData {
    id: string;
    name: string;
    coordinates: [number, number];
    type: LocationType;
    description: string;
    parent?: string;
}

// Country Level Data (Zoomed Out)
const COUNTRIES_DATA: LocationData[] = [
    { id: "IN", name: "India", coordinates: [78.9629, 20.5937], type: "country", description: "Home" },
    { id: "AE", name: "UAE", coordinates: [54.3707, 24.4539], type: "country", description: "Emirates" },
    { id: "BH", name: "Bahrain", coordinates: [50.5577, 26.0667], type: "country", description: "Island Kingdom" },
    { id: "MV", name: "Maldives", coordinates: [73.2207, 3.2028], type: "country", description: "Paradise" },
];

// India State Level Data
const INDIA_STATES_DATA: LocationData[] = [
    { id: "IN-KA", name: "Karnataka", coordinates: [76.5, 14.5], type: "state", description: "Bengaluru", parent: "IN" },
    { id: "IN-KL", name: "Kerala", coordinates: [76.5, 10.0], type: "state", description: "Backwaters", parent: "IN" },
    { id: "IN-TN", name: "Tamil Nadu", coordinates: [78.5, 11.0], type: "state", description: "Chennai", parent: "IN" },
    { id: "IN-MH", name: "Maharashtra", coordinates: [75.0, 19.0], type: "state", description: "Mumbai", parent: "IN" },
    { id: "IN-GA", name: "Goa", coordinates: [74.12, 15.3], type: "state", description: "Beaches", parent: "IN" },
    { id: "IN-RJ", name: "Rajasthan", coordinates: [74.0, 26.5], type: "state", description: "Jaipur", parent: "IN" },
    { id: "IN-DL", name: "Delhi", coordinates: [77.1, 28.7], type: "state", description: "Capital", parent: "IN" },
    { id: "IN-HP", name: "Himachal", coordinates: [77.1, 31.5], type: "state", description: "Mountains", parent: "IN" },
    { id: "IN-GJ", name: "Gujarat", coordinates: [71.5, 22.5], type: "state", description: "Ahmedabad", parent: "IN" },
    { id: "IN-AP", name: "Andhra Pradesh", coordinates: [79.5, 15.5], type: "state", description: "Visakhapatnam", parent: "IN" },
    { id: "IN-TG", name: "Telangana", coordinates: [79.0, 18.0], type: "state", description: "Tech Hub", parent: "IN" },
];

// UAE Cities Data
const UAE_CITIES_DATA: LocationData[] = [
    { id: "AE-DXB", name: "Dubai", coordinates: [55.2708, 25.2048], type: "city", description: "Burj Khalifa", parent: "AE" },
    { id: "AE-AUH", name: "Abu Dhabi", coordinates: [54.3707, 24.4539], type: "city", description: "Capital", parent: "AE" },
];

// Maldives Cities Data - Coordinates spread out for better visibility
const MALDIVES_CITIES_DATA: LocationData[] = [
    { id: "MV-MLE", name: "Malé", coordinates: [73.5093, 4.4], type: "city", description: "Capital", parent: "MV" },
    { id: "MV-MAF", name: "Maafushi", coordinates: [73.2, 3.7], type: "city", description: "Island", parent: "MV" },
    { id: "MV-FUL", name: "Fulidhoo", coordinates: [73.6, 3.3], type: "city", description: "Atoll", parent: "MV" },
    { id: "MV-VAS", name: "Vashugiri", coordinates: [73.9, 3.9], type: "city", description: "Resort", parent: "MV" },
];

export default function TravelSection() {
    const [position, setPosition] = useState({ coordinates: [70, 20] as [number, number], zoom: 1.5 });

    const handleMoveEnd = (newPosition: { coordinates: [number, number]; zoom: number }) => {
        setPosition(newPosition);
    };

    // Multiple zoom thresholds
    const COUNTRY_ZOOM_THRESHOLD = 3.0;
    const CITY_ZOOM_THRESHOLD = 5.5;

    const isCountryLevel = position.zoom < COUNTRY_ZOOM_THRESHOLD;
    const isRegionLevel = position.zoom >= COUNTRY_ZOOM_THRESHOLD && position.zoom < CITY_ZOOM_THRESHOLD;
    const isCityLevel = position.zoom >= CITY_ZOOM_THRESHOLD;

    function handleZoomIn() {
        if (position.zoom >= 80) return;
        setPosition((pos) => ({
            coordinates: pos.coordinates,
            zoom: Math.min(pos.zoom * 1.5, 80)
        }));
    }

    function handleZoomOut() {
        if (position.zoom <= 1) return;
        setPosition((pos) => ({
            coordinates: pos.coordinates,
            zoom: Math.max(pos.zoom / 1.5, 1)
        }));
    }

    const allMarkers = useMemo(() => {
        const markers: (LocationData & { visible: boolean })[] = [];

        if (isCountryLevel) {
            markers.push(...COUNTRIES_DATA.map(c => ({ ...c, visible: true })));
        }
        else if (isRegionLevel) {
            markers.push(
                ...INDIA_STATES_DATA.map(s => ({ ...s, visible: true })),
                ...COUNTRIES_DATA.filter(c => c.id !== "IN").map(c => ({ ...c, visible: true }))
            );
        }
        else {
            markers.push(
                ...INDIA_STATES_DATA.map(s => ({ ...s, visible: true })),
                ...UAE_CITIES_DATA.map(c => ({ ...c, visible: true })),
                ...MALDIVES_CITIES_DATA.map(c => ({ ...c, visible: true })),
                ...COUNTRIES_DATA.filter(c => c.id === "BH").map(c => ({ ...c, visible: true }))
            );
        }

        return markers;
    }, [isCountryLevel, isRegionLevel, isCityLevel]);

    return (
        <section className="py-24 bg-black relative" id="travel">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-lime-400 font-medium tracking-wider uppercase">
                        <MapPin className="w-3 h-3" />
                        Travel Log
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
                        Global <span className="text-[#7d5fff]">Footprint</span>
                    </h2>
                    <p className="text-white/60 max-w-lg">
                        Exploring cultures and landscapes.
                        {isCityLevel ? " Viewing city-level detail." : isRegionLevel ? " Viewing regional detail." : " Global overview."}
                    </p>
                </div>

                <div className="flex gap-8 border-t border-white/10 pt-6 md:border-t-0 md:pt-0">
                    <div>
                        <span className="block text-2xl font-bold text-white">4</span>
                        <span className="text-xs text-white/40 uppercase tracking-widest">Countries</span>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold text-white">{allMarkers.length}</span>
                        <span className="text-xs text-white/40 uppercase tracking-widest">Locations</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="w-full h-[600px] md:h-[700px] bg-[#0a0a0a] relative border-y border-white/5 overflow-hidden rounded-xl">

                    <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
                        <button
                            onClick={handleZoomIn}
                            className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 backdrop-blur-sm transition-all active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleZoomOut}
                            className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 backdrop-blur-sm transition-all active:scale-95"
                        >
                            <Minus className="w-5 h-5" />
                        </button>
                    </div>

                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 200,
                            // Removed center here - it conflicts with ZoomableGroup center
                        }}
                        className="w-full h-full"
                        style={{ background: "#050505" }}
                    >
                        <ZoomableGroup
                            zoom={position.zoom}
                            center={position.coordinates}
                            onMoveEnd={handleMoveEnd}
                            maxZoom={80}
                            minZoom={1}
                        >
                            {/* World Map - excluding India to avoid overlap */}
                            <Geographies geography={geoUrl}>
                                {({ geographies }: { geographies: any[] }) =>
                                    geographies.map((geo: any) => {
                                        // Skip India from world map, we'll render it separately
                                        if (geo.properties.name === "India") return null;

                                        const isVisited = ["United Arab Emirates", "Bahrain", "Maldives"].includes(geo.properties.name);
                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill={isVisited ? "#2a2a2a" : "#141414"}
                                                stroke="#333"
                                                strokeWidth={0.5 / position.zoom}
                                                style={{
                                                    default: { outline: "none", transition: "all 0.3s" },
                                                    hover: { fill: isVisited ? "#333" : "#1a1a1a", outline: "none" },
                                                    pressed: { outline: "none" },
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Geographies>

                            {/* Official India Map with complete J&K */}
                            <Geographies geography={indiaGeoUrl}>
                                {({ geographies }: { geographies: any[] }) =>
                                    geographies.map((geo: any) => (
                                        <Geography
                                            key={geo.rsmKey || `india-${geo.properties.st_nm}`}
                                            geography={geo}
                                            fill="#2a2a2a"
                                            stroke="#444"
                                            strokeWidth={0.3 / position.zoom}
                                            style={{
                                                default: { outline: "none", transition: "all 0.3s" },
                                                hover: { fill: "#333", outline: "none" },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>

                            {allMarkers.map((loc) => {
                                if (!loc.visible) return null;

                                // Marker size must counteract the map's zoom scaling
                                // Divide by zoom to make markers visually smaller as we zoom in
                                let r = 6 / position.zoom; // Inversely proportional to zoom
                                // No minimum floor - let it scale naturally at all zoom levels

                                // Different colors for different types
                                let markerColor = THEME.primary; // Default purple for countries
                                if (loc.type === "state") markerColor = THEME.secondary; // Lime for states
                                if (loc.type === "city") markerColor = "#f97316"; // Orange for cities

                                return (
                                    <Marker key={loc.id} coordinates={loc.coordinates}>
                                        <g
                                            style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
                                            data-tooltip-id="map-tooltip"
                                            data-tooltip-content={JSON.stringify(loc)}
                                        >
                                            <circle
                                                r={r * 3}
                                                fill={markerColor}
                                                opacity={0.15}
                                                className={loc.type === "country" ? "animate-pulse" : ""}
                                            />

                                            <circle
                                                r={r}
                                                fill="white"
                                                stroke={markerColor}
                                                strokeWidth={1.5 / position.zoom}
                                            />

                                            <text
                                                textAnchor="middle"
                                                y={-1 * (r * 2.5)}
                                                style={{
                                                    fontFamily: "var(--font-sans)",
                                                    fill: "white",
                                                    fontSize: 12 / position.zoom, // No floor - scales continuously
                                                    fontWeight: 500,
                                                    opacity: 0.9,
                                                    pointerEvents: "none",
                                                    textShadow: "0 2px 4px rgba(0,0,0,0.8)"
                                                }}
                                            >
                                                {loc.name}
                                            </text>
                                        </g>
                                    </Marker>
                                );
                            })}

                        </ZoomableGroup>
                    </ComposableMap>

                    <Tooltip
                        id="map-tooltip"
                        className="z-50 !bg-black/90 !backdrop-blur-md !border !border-white/10 !rounded-xl !px-4 !py-3 !shadow-2xl"
                        render={({ content }) => {
                            if (!content) return null;
                            const data = JSON.parse(content) as LocationData;
                            const typeColors: Record<LocationType, string> = {
                                country: THEME.primary,
                                state: THEME.secondary,
                                city: "#f97316"
                            };
                            return (
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-sm mb-1">{data.name}</span>
                                    <div className="flex items-center gap-2 text-xs text-white/60">
                                        <span style={{ color: typeColors[data.type] }}>●</span>
                                        {data.description}
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7d5fff]/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[128px] pointer-events-none" />
        </section>
    );
}
