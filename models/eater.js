module.exports = function(sequelize, DataTypes){
    var Eater = sequelize.define("Eater", {
        eater_name: {
            type: DataTypes.STRING,
            allowNull: false
            /*validate:{
                isAlpha: true,    // will only allow letters
                len: [1,20]      // only allow values with length between 1 and 20
            }*/
        }
    }, 
    {
        timestamps: false,
        classMethods: {
            associate: function(models){
                Eater.hasOne(models.Burger, {
                     onDelete: "cascade"
                });
            }
        }
    });
    return Eater;
};