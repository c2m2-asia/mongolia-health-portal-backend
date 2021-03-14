'use strict';
module.exports = (sequelize, Sequelize) => {
  const AdminUser = sequelize.define('adminuser', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
    },
    {
      freezeTableName: true,
    }
  );

  AdminUser.associate = (models) => {
   // define association here
  };

  return AdminUser;
}