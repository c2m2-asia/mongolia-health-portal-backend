'use-strict';
module.exports = (sequelize, Sequelize) => {
    const Resources = sequelize.define('resources', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.TEXT
        },
        description: {
            type: Sequelize.TEXT
        },
        link: {
            type: Sequelize.STRING
        }
    },
    {
      freezeTableName: true,
    });

    Resources.associate = (models) => {
        // define association here
       };
     
    return Resources;
}