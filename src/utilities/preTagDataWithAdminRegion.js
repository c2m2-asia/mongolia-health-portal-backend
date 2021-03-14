import { booleanPointInPolygon } from "@turf/turf";
import config from '../config/config';

const districts = config.admindivisions;

function preTagDataWithAdminRegion(geojson) {
    districts.forEach((district) => {
        const boundary = require(`../adminboundaries/UB/adminLevel2/${district}.json`)
        geojson.features.forEach((feature) => {
            feature.city = config.city;
            if (booleanPointInPolygon(feature.geometry, boundary)) {
                feature.district = district;
                const boundaryInner = require(`../adminboundaries/UB/adminLevel3/${district}.json`)
                boundaryInner.features.forEach((bIner) => {
                    if (booleanPointInPolygon(feature.geometry, bIner)) {
                        feature.khoroo = bIner.properties.code;
                    }
                })

            }
        })
    })
    return geojson;
}

export default preTagDataWithAdminRegion;