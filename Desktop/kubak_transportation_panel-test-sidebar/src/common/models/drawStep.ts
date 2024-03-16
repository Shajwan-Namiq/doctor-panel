import type { LineString, MultiLineString } from "@turf/turf";
import type { Polyline } from "leaflet";

export interface Step {
  drawRoute: any[];
  matchedRoute: Polyline<LineString | MultiLineString, any>[];
  latLngs: number[];
}
