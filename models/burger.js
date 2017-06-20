module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false
      /*validate:{
                isAlpha: true,    // will only allow letters
                notEmpty: true,   // don't allow empty strings
                len: [1,20]      // only allow values with length between 1 and 20
            }*/
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }

  },
    {
      timestamps: false,
      classMethods: {
        associate: function(models){
          Burger.belongsTo(models.Eater, {  //will add a EaterId attribute to Burger to hold the primary key value of for Eater
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
  });
  return Burger;
};
