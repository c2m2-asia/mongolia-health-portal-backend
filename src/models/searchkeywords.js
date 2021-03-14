'use strict';
module.exports = (sequelize, Sequelize) => {
  const SearchKeywords = sequelize.define('searchkeywords', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    osm_id: {
      type: Sequelize.STRING
    },
    osm_type: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    name_en: {
      type: Sequelize.STRING
    },
    healthcare_speciality: {
      type: Sequelize.STRING
    },
    healthcare_category: {
      type: Sequelize.STRING
    },
    healthcare_services: {
      type: Sequelize.STRING
    },
    tags: {
      type: Sequelize.JSONB
    },
    geometry: {
      type: Sequelize.GEOMETRY('POINT')
    },
    city: {
      type: Sequelize.STRING
    },
    district: {
      type: Sequelize.STRING
    },
    khoroo: {
      type: Sequelize.STRING
    },
    },
    {
      freezeTableName: true,
    }
  );

  SearchKeywords.associate = (models) => {
   // define association here
  };

  return SearchKeywords;
}