'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('homepage', {
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
  }
};
