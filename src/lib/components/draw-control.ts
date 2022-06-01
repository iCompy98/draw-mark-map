import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";

import type { MapRef, ControlPosition } from "react-map-gl";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
    position?: ControlPosition;

    onCreate?: (evt: { features: object[] }) => void;
    onUpdate?: (evt: { features: object[]; action: string }) => void;
    onDelete?: (evt: { features: object[] }) => void;
};

interface Objeto {
    key: string;
    function: Function | any;
}

export default function DrawControl(props: DrawControlProps) {
    useControl<MapboxDraw>(
        ({ map }: { map: MapRef }) => {
            let objects: Objeto[] = [
                {
                    key: "draw.create",
                    function: props.onCreate,
                },
                {
                    key: "draw.create",
                    function: props.onCreate,
                },
                {
                    key: "draw.create",
                    function: props.onCreate,
                },
            ];
            for (let item of objects) {
                map.on(item.key, item.function);
            }

            return new MapboxDraw(props);
        },
        ({ map }: { map: MapRef }) => {
            let objects: Objeto[] = [
                {
                    key: "draw.create",
                    function: props.onCreate,
                },
                {
                    key: "draw.create",
                    function: props.onCreate,
                },
                {
                    key: "draw.create",
                    function: props.onCreate,
                },
            ];
            for (let item of objects) {
                map.off(item.key, item.function);
            }
        },
        {
            position: props.position,
        }
    );

    return null;
}

DrawControl.defaultProps = {
    onCreate: () => {},
    onUpdate: () => {},
    onDelete: () => {},
};

