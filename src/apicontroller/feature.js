import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import fs from 'fs';
import googleCaja from 'google-caja';
let sanitize = googleCaja.sanitize;
const { parse } = require('json2csv');
import { path as appRootPath } from "app-root-path";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

export default {
    collectFilters: (req, res, next) => {
      req.collects = {}
      const params = ["type", "filters", "city", "district", "khoroo"];
      params.forEach((filter) => {
        console.log("for each filter:", req.body[filter]);
          if(typeof req.body[filter] !== "undefined" || typeof req.query[filter] !== "undefined"){
            req.collects[filter] = JSON.parse(sanitize(JSON.stringify(req.body[filter] || req.query[filter])));
          }
      });
      return next();
    },

    gettags: (req, res, next) => {
      const editTags = fs.readFileSync('./src/config/editTags.json', 'utf8');
      const filterTags = fs.readFileSync('./src/config/filters.json', 'utf8');
      let response = {};
      if(req.query.tags === "edit"){
        response = {
          status: 200,
          message: "Edit tags fetched successfully!",
          data: JSON.parse(editTags)
        }
      } else if (req.query.tags === "filter"){
        response = {
          status: 200,
          message: "Filter tags fetched successfully!",
          data: JSON.parse(filterTags)
        }
      } else {
        response = {
          status: 200,
          message: "Invalid query!"
        }
      }
      res.send(response);
    },

    fetch: (req, res, next) => {
      const type = req.collects.type;
      const filters = req.collects.filters
      const healthservicetag = config.tags.healthServices;
      const pharmacytag = config.tags.pharmacies
      
      const filedata = [];
      let filteredData = [];
      let unfiltereddata = [];
      if(type.includes('healthServices')) {
        healthservicetag.forEach((tag)=>{
          let jsonfileresponse = fs.readFileSync(`./src/snapshots/${tag}.json`, 'utf8');
          filedata[tag] = JSON.parse(jsonfileresponse);
          filedata[tag].features.forEach((feature) => {
            unfiltereddata.push(feature);
          })
        });
        if(filters && filters.length !== 0){
          healthservicetag.forEach((tag) => {
            filedata[tag].features.forEach((feature)=>{
              let andCondition = 1;
              if(filters.filter((label) => feature.properties.tags.hasOwnProperty(label.osmTag) && feature.properties.tags[label.osmTag])){
                let andCondition2 = 1;
                filters.filter((label)=>{
                  label.osmValue.forEach((osmvalue)=>{
                    let orCondition = 0;
                    if(feature.properties.tags[label.osmTag] && feature.properties.tags[label.osmTag].includes(osmvalue)){
                      orCondition = 1;
                    }
                    andCondition2 = andCondition2 & orCondition
                  })  
                  andCondition = andCondition & andCondition2
                })
              }
              if(andCondition){
                filteredData.push(feature);
                req.filteredData = filteredData;
              } else {
                console.log("filtered data", filteredData);
              }
            }) 
          })
        }
         else {
          filteredData = unfiltereddata
          req.filteredData = unfiltereddata
        }

      } else if(type.includes('pharmacies')) {
        const jsonfileresponse = fs.readFileSync(`./src/snapshots/${pharmacytag}.json`, 'utf8');
        filedata[0] = JSON.parse(jsonfileresponse);
        filedata[0].features.forEach((feature) =>  {
          unfiltereddata.push(feature);
        })
        if(filters && filters.length !== 0){
          filedata[0].features.forEach((feature) => {
            let andCondition = 1;
              if(filters.filter((label) => feature.properties.tags.hasOwnProperty(label.osmTag) && feature.properties.tags[label.osmTag])){
                filters.filter((label)=>{
                  let orCondition = 0;
                  label.osmValue.forEach((osmvalue)=>{
                    if(feature.properties.tags[label.osmTag] && feature.properties.tags[label.osmTag].includes(osmvalue)){
                      orCondition = 1;
                    }
                  })  
                  andCondition = andCondition & orCondition
                })
              }
              if(andCondition){
                filteredData.push(feature);
                req.filteredData = filteredData;
              } else {
                console.log("filtered data", filteredData);
              }
          })
      } else {
        filteredData = unfiltereddata
        req.filteredData = unfiltereddata
      } 
    }
      return next();
    },

    adminboundary: (req, res, next) => {
      const city_query = req.collects.city;
      const district_query =  req.collects.district;
      const khoroo_query = req.collects.khoroo;
      let boundarygeojson = [];

      if(city_query == config.city){
        const city = JSON.parse(fs.readFileSync(`./src/adminboundaries/UB/${config.city}.geojson`, 'utf8'));
      if(district_query && district_query != null){
        const district = JSON.parse(fs.readFileSync(`./src/adminboundaries/UB/adminLevel2/${district_query}.json`, 'utf8'));
        if(khoroo_query && khoroo_query != null){
          const khoroo = JSON.parse(fs.readFileSync(`./src/adminboundaries/UB/adminLevel3/${district_query}.json`, 'utf8'));
          khoroo.features.forEach(feature => {
            if(feature.properties.code === khoroo_query) {
              boundarygeojson.push(feature);
            }
          })
        } else {
          boundarygeojson.push(district);
        }
      } else {
        boundarygeojson.push(city);
      }
      req.boundarygeojson = Object.assign({}, boundarygeojson);
    }
      return next();
    },

    boundaryfilter: (req, res, next) => {
      const city =  req.collects.city;
      const district = req.collects.district;
      const khoroo = req.collects.khoroo;
      let boundaryfilter = [];

      if(req.filteredData){
      req.filteredData.filter((selector) => {
        if(city && city != null){
          if(district && district != null){
            if(khoroo && khoroo != null){
              if(selector.khoroo === khoroo && district === selector.district){
                boundaryfilter.push(selector);
              }
            } else{
              if(selector.district === district){
                boundaryfilter.push(selector);
              }
            }
          } else {
            if(selector.city === city){
              boundaryfilter.push(selector);
            }
          }
        }
      });
      req.boundaryfilter = boundaryfilter;
      req.response = {
        status: 200,
        message: "Features fetched successfully!",
        boundary: req.boundarygeojson[0],
        geometries: {
          "type": "FeatureCollection",
          "features": boundaryfilter
        }
      };
    } else {
      req.response = {
        status: 200,
        message: "Requested data not found!",
        boundary: req.boundarygeojson[0],
        geometries: {
          "type": "FeatureCollection",
          "features": []
        }
      };
    }
      return next();
    }, 

    download: (req, res, next) => {
      const filename = new Date().getTime();
      const jsonObj = JSON.stringify(req.boundaryfilter);
      const fields = Array.from(req.boundaryfilter.reduce((set, obj)=>{
        Object.keys(obj).forEach((key)=>{
          set.add(key);
        })
        return set;
      },new Set([])));
      const opts = { fields };
      const csv = parse(req.boundaryfilter, opts);
      fs.writeFile(`${appRootPath}/extracts/` + filename + ".csv", csv, (err)=>{
        if(err){
          req.response = {
            status: 500,
            message: err
          };
          return next();
        }
        fs.writeFile(`${appRootPath}/extracts/`+ filename + ".json", jsonObj, "utf8",(err, jsonResponse)=> {
          if(err){
            req.response = {
              status: 500,
              message: err
            };
          }else{
            req.response = {
              status: 200,
              csvlink: "extracts/" + filename + ".csv",
              geojsonlink: "extracts/" + filename + ".json"
            };
          }
          return next();
        });
      });
     
    },

    respond: (req, res, next) => {
      const response = req.response;
      res.end(JSON.stringify(response));
    }
  }