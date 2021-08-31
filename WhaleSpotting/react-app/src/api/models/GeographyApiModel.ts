import { AttractionType } from "../ApiEnums"

export interface GeographyApiModel {
    id: number;
    longitude: number;
    latitude: number;
    type: AttractionType;
}