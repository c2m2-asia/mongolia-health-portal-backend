import express from 'express';
var router = express.Router();
import queryGeoBoundary from 'query-geo-boundary';
import config from '../config/config';

const geo_name = config.city;

async function bboxCalculation(){
    return queryGeoBoundary(`${geo_name}`, {source: 'overpass'}).then(boundaries => {
        // console.log(JSON.stringify(boundaries[0].boundingbox));
        return boundaries[0].boundingbox;
    }).catch(err => {
        console.log(err);
        return err;
    });
}
    
    
export { bboxCalculation };