'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tags = ["baby_hatch", "dentist", "clinic", "doctors", "hospital", "nursing_home", "social_facility", "pharmacy"];
    let filedata = [];
    let data = [];
    await tags.forEach(tag => {
      let jsonfileresponse = fs.readFileSync(`./snapshots/${tag}.json`, 'utf8');
      filedata[tag] = JSON.parse(jsonfileresponse);
      filedata[tag].features.forEach((feature) => {
        data.push({
          osm_id: feature.properties.id,
          osm_type: feature.properties.type,
          name: feature.properties.tags.name,
          name_en:feature.properties.tags["name:en"],
          healthcare_speciality: feature.properties.tags["healthcare:speciality"],
          healthcare_category: feature.properties.tags["healthcare_facility:type"],
          healthcare_services: feature.properties.tags["facility:services"],
          tags: JSON.stringify(feature.properties.tags),
          geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(feature.geometry)),
          city: feature.city,
          district: feature.district,
          khoroo: feature.khoroo,
          createdAt: new Date(), 
          updatedAt: new Date()
        });
      })
    })

    await queryInterface.bulkInsert('searchkeywords', data, {});
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
