'use strict';
module.exports = (sequelize, Sequelize) => {
  const UserReview = sequelize.define('userreview', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    osm_username: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.INTEGER
    },
    comments: {
      type: Sequelize.TEXT
    },
    service_id: {
      type: Sequelize.STRING
    },
    service: {
      type: Sequelize.TEXT
    },
    health_expertise: {
      type: Sequelize.TEXT
    }
    },
    {
      freezeTableName: true,
    }
  );

  UserReview.associate = (models) => {
   // define association here
  };

  return UserReview;
}