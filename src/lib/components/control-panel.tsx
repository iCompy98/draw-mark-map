import * as React from "react";
import area from "@turf/area";

function ControlPanel(props: any) {

    let polygonArea = 0;
    for (const polygon of props.polygons) {
        console.log("Hey")
        polygonArea += area(polygon);
    }

    return (
        <div className="control-panel">
            <h3>{polygonArea === 0 ? props.title : "Area:"}</h3>
            {polygonArea > 0 && (
                <p>
                    {Math.round(polygonArea * 100) / 100} <br />
                    metros cuadrados
                </p>
            )}
        </div>
    );
}

export default React.memo(ControlPanel);
