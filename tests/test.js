import express from 'express';
var router = express.Router();
import { bboxCalculation } from '../src/apicontroller/geo-boundary';
import fetch from 'node-fetch';
import OverpassFrontend from 'overpass-frontend';
import fs from 'fs';
// import {stringify} from 'flatted';
import osmtogeojson from 'osmtogeojson';

router.get('/', async (req, res, next) => {
   // you may specify an OSM file as url, e.g. 'test/data.osm.bz2'
const overpassFrontend = new OverpassFrontend('//overpass-api.de/api/interpreter')
const amenity = ["baby_hatch", "dentist", "clinic", "doctors", "hospital", "nursing_home", "social_facility", "pharmacy"];
const bbox = await bboxCalculation();
const apiresponse = []
Object.keys(amenity).forEach(async (tag) => {
    overpassFrontend.BBoxQuery(
        'nwr[amenity=dentist]',
        { minlat: bbox[0], maxlat: bbox[1], minlon: bbox[2], maxlon: bbox[3] },
        {
            properties: OverpassFrontend.ALL
        },
        function (err, result) {
            // console.log(stringify(result));
            // // apiresponse.push(stringify(osmtogeojson(result)));
            // fs.writeFile(`./snapshots/test/${amenity[tag]}.json`, stringify((result)), "utf8", (err, response) => {
            //     if (err) console.log(err);
            //   });
            console.log('* ' + result.tags.name + ' (' + result.id + ')')
        },
        function (err) {
            if (err) { console.log(err) }
        }
    )
})

    const response = {
        success:1,
        message: 'fetched',
        data: apiresponse
    }


// Object.keys(amenity).forEach(async (tag) => {
//     // request restaurants in the specified bounding box
//     overpassFrontend.BBoxQuery(
//         `nwr[amenity=${amenity[tag]}]`,
//         { minlat: bbox[0], maxlat: bbox[2], minlon: bbox[1], maxlon: bbox[3] },
//         {
//             properties: OverpassFrontend.ALL
//         },
//         function (err, result) {
//             console.log(bbox);
//             console.log('* ' + result.tags.name + ' (' + result.id + ')')
//         },
//         function (err) {
//             if (err) { console.log(err) }
//         }
//     )
// })


  res.send({response})

})

// router.get('/', async (req, res, next) => {
//     let baseUrl = "http://overpass-api.de/api/interpreter";
//     const bbox = await bboxCalculation();
//     let response = {}
//     const amenity = ["baby_hatch", "dentist", "clinic", "doctors", "hospital", "nursing_home", "social_facility", "pharmacy"];
//     Object.keys(amenity).forEach(async (tag) => {
//         let nodequery = `[out:json];node(${bbox[0]},${bbox[2]},${bbox[1]},${bbox[3]})[amenity=${amenity[tag]}];out;`;
//         let wayquery = `[out:json];way(${bbox[0]},${bbox[2]},${bbox[1]},${bbox[3]})[amenity=${amenity[tag]}];out;`;
//         let relationquery = `[out:json];relation(${bbox[0]},${bbox[2]},${bbox[1]},${bbox[3]})[amenity=${amenity[tag]}];out;`;
        
//         const body = { 
//             data: wayquery
//         };
 
//         fetch(baseUrl, {
//             method: 'post',
//             body:    JSON.stringify(body),
//             headers: { 'Content-Type': 'application/json' },
//         })
//         .then(res => {
//             response[amenity[tag]] = res.json;
//             console.log(response)
//         })
//         // response[amenity[tag]] = await fetch(url+'?data=' + nodequery);
//     })
    
//     res.send(JSON.stringify(response));

// })

export default router;