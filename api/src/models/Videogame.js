const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON({type:DataTypes.JSON(DataTypes.STRING)})),
      allowNull: false
    }, 
    released: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  });
};