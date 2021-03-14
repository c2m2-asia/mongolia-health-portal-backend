'use strict';
module.exports = (sequelize, Sequelize) => {
  const Homepage = sequelize.define('homepage', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    header: {
        type: Sequelize.TEXT
    },
    sub_header: {
        type: Sequelize.TEXT
    },
    description: {
        type: Sequelize.TEXT
    },
    collaborator_1_name: {
        type: Sequelize.TEXT
    },
    collaborator_1_logo: {
        type: Sequelize.STRING
    },
    collaborator_1_detail: {
        type: Sequelize.TEXT
    },
    collaborator_1_website: {
        type: Sequelize.TEXT
    },
    collaborator_2_name: {
        type: Sequelize.TEXT
    },
    collaborator_2_logo: {
        type: Sequelize.STRING
    },
    collaborator_2_detail: {
        type: Sequelize.TEXT
    },
    collaborator_2_website: {
        type: Sequelize.TEXT
    },
    },
    {
      freezeTableName: true,
    }
  );

  Homepage.associate = (models) => {
   // define association here
  };

  return Homepage;
}