module.exports = (database, Sequelize) => {
    return database.define("subscription", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          max: 20,
          is: /^[a-z]+$/i,
        }
      },     
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate:{
          isEmail: true
        }
      },
      subscription_date:  {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      last_message: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isInt: true,
        min: 1
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  };
  