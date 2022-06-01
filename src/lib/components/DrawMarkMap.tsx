import * as React from "react";
import { useState, useCallback } from "react";
import Map from "react-map-gl";
import "./styles/style.css";

import DrawControl from "./draw-control";
import ControlPanel from "./control-panel";

const TOKEN =
    "pk.eyJ1IjoiaWNvbXB5OTgiLCJhIjoiY2wzbmVpdmhqMGRvZTNidXZ6d3N4eW1hZCJ9.7jxFM2JHEnAczLE_7YJ5ww"; // Set your mapbox token here

export default function DrawMarkMap({
    title = "Marque el area a tratar:",
    ...props
}) {
    const [features, setFeatures] = useState({});

    const onUpdate = useCallback((e: any) => {
        setFeatures((currFeatures: any) => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);

    const onDelete = useCallback((e: any) => {
        setFeatures((currFeatures: any) => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);

    return (
        <>
            <Map
                initialViewState={{
                    latitude: 31.87,
                    longitude: -116.60,
                    zoom: 13,
                }}
                mapStyle="mapbox://styles/mapbox/satellite-v9"
                {...props}
                mapboxAccessToken={TOKEN}
            >
                <DrawControl
                    position="top-left"
                    displayControlsDefault={false}
                    controls={{
                        polygon: true,
                        trash: true,
                    }}
                    defaultMode="draw_polygon"
                    onCreate={onUpdate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
                <ControlPanel
                    title={title}
                    polygons={Object.values(features)}
                />
            </Map>
        </>
    );
}

