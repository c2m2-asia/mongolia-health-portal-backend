import googleCaja from 'google-caja';
let sanitize = googleCaja.sanitize;
import amenityTags from '../config/editTags';
import db from '../models';
const SearchKeywords = db.searchkeywords;
const Op = db.Sequelize.Op;
export default {

  collectFilters: (req, res, next) => {
    req.collects = {}
    const params = ["type", "city", "district", "khoroo"];
    params.forEach((filter) => {
      console.log("for each filter:", req.body[filter]);
        if(typeof req.body[filter] !== "undefined" || typeof req.query[filter] !== "undefined"){
          req.collects[filter] = JSON.parse(sanitize(JSON.stringify(req.body[filter] || req.query[filter])));
        }
    });
    return next();
  }, 

  test: (req, res, next) => {
    const type = req.collects.type;
    const city = req.collects.city;
    const district = req.collects.district;
    const khoroo = req.collects.khoroo;
    const searchkey = req.params.keywords;
    let condition = city ? { city: city } : null || district ? { district: district}: null || khoroo ? { khoroo: khoroo } : null;
    

    SearchKeywords.findAll({ where: {
      [Op.and]: [condition, 
        {[Op.or]: [{
          name: {[Op.iLike]: `${searchkey}%`}
        },
        {
          healthcare_type: {[Op.iLike]: `%${searchkey}%`}
        },
        {
          healthcare_speciality: {[Op.iLike]: `%${searchkey}%`}
        },
        ]}]
      
      
    } })
      .then(data => {
        let response = [];
        for (const key in data) {
          response.push({ 
            success: true,
            id: data[key].id,
            geometries: {
              "type": "Feature",
              "properties": {
                "type": data[key].osm_type,
                "id": data[key].osm_id,
                "tags": data[key].tags,
              },
              "geometry": {
                "type": data[key].geometry.type,
                "coordinates": data[key].geometry.coordinates,
              },
              "city": data[key].city,
              "district": data[key].district,
              "khoroo": data[key].khoroo
            }
          })
        }
        
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving search for" + searchkey
        });
      });
  },

  search: (req, res, next) => {
    const searchkey = req.params.keywords;
    const type = req.query.type;
    let response = [];
    
    SearchKeywords.findAll({ where:
        {[Op.or]: [{
          name: {[Op.iLike]: `${searchkey}%`}
        },
        {
          name_en: {[Op.iLike]: `${searchkey}%`}
        },
        {
          healthcare_services: {[Op.iLike]: `%${searchkey}%`}
        },
        {
          healthcare_category: {[Op.iLike]: `%${searchkey}%`}
        },
        {
          healthcare_speciality: {[Op.iLike]: `%${searchkey}%`}
        },
        ]  
    } })
    .then(data => {
      let filterdata = [];
      if(type === "pharmacies") {
        filterdata = data.filter(key => {
          if(key.tags["amenity"] === "pharmacy"){
            return key;
          } 
        });
      } else if(type === "healthServices"){
        filterdata = data.filter(key => {
          if(key.tags["amenity"] !== "pharmacy"){
            return key;
          } 
        });
      }
      
      for (const key in filterdata) {
        const service = [];
        const category = [];
        const speciality = [];

        amenityTags[0].editTags.forEach((tag) => {
          if(tag.label === "Speciality" || tag.label === "Category" || tag.label === "Services"){
            const osmvalues = filterdata[key].tags[tag.osm_tag];
            if(typeof osmvalues !== "undefined"){
              const values = osmvalues.split(";");
              values.forEach((value) => {
                if(value.includes(searchkey)){
                  tag.selectors.forEach((descriptor) => {
                    if(descriptor.osm_value === value){
                      if (tag.label === "Speciality") speciality.push(descriptor.label);
                      else if (tag.label === "Category") category.push(descriptor.label);
                      else if (tag.label === "Services") service.push(descriptor.label);
                    }
                  })
                }
              })
            }
          }
        })

        response.push({ 
          id: filterdata[key].id,
          service: service,
          category: category,
          speciality: speciality,
          geometries: {
            "type": "Feature",
            "properties": {
              "type": filterdata[key].osm_type,
              "id": filterdata[key].osm_id,
              "tags": filterdata[key].tags,
            },
            "geometry": {
              "type": filterdata[key].geometry.type,
              "coordinates": filterdata[key].geometry.coordinates,
            },
            "city": filterdata[key].city,
            "district": filterdata[key].district,
            "khoroo": filterdata[key].khoroo
          }
        })
      } 
      res.status(200).send({
        status:200,
        message: "Data fetched successfully!",
        data: response
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving search for" + searchkey
      });
    });
      
  }

}