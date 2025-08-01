const { sequelize } = require("@/models");

const sequelizeAuthenticate = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    next();
  }
};

module.exports = sequelizeAuthenticate;
