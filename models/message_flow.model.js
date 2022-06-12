module.exports = (database, Sequelize) => {
    return database.define("message_flow", {
      template_name: {
        type: Sequelize.STRING,
        validation: {
          notNull: true,
          is: /^[a-z]+$/i
        }
      },     
      position: {
        type: Sequelize.INTEGER,
        validation:{
          notNull: true,
          isInt: true,
          min: 1
        }
      }
    });
  };
  