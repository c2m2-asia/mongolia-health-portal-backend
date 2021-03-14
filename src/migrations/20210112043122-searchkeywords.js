'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('searchkeywords', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('searchkeywords');
  }
};
