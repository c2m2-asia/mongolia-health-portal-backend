import cron from 'node-cron';
import { bboxCalculation } from './geo-boundary';
import queryOverpass from 'query-overpass';
import config from '../config/config';
import fs from 'fs';
import preTagDataWithAdminRegion from "../utilities/preTagDataWithAdminRegion"

const callRate = 10000;
const scheduleTime = '*/1 * * * *'; // Run cron every 23 hours 59 minutes

module.exports = new cron.schedule(scheduleTime, async function() {
        const bbox = await bboxCalculation();
        const amenity = config.amenities;
        const response = {};
        
        try{
            Object.keys(amenity).forEach((tag) => {
                setTimeout(() =>{
                    queryOverpass(`[out:json];
                    node(${bbox[0]},${bbox[2]},${bbox[1]},${bbox[3]})[amenity = ${amenity[tag]}];out;`, function (err, geojson) {
                        if (err) {
                        console.log(err);
                        }
                        else {
                        response[tag] = geojson;
                        const adminRegionTaggedData = preTagDataWithAdminRegion(geojson);
                        fs.writeFile(`./src/snapshots/${amenity[tag]}.json`, JSON.stringify(adminRegionTaggedData), "utf8", (err, response) => {
                            if (err) console.log(err);
                        });
                        }
                    }, { flatproperties: false });
                }, callRate);  
            })
            console.log("Data fetched successfully!")
        } catch(err) {
            console.log(err)
        }
      
      });
