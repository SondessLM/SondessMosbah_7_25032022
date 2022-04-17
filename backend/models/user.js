
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("utilisateur", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
          type: Sequelize.STRING
      },
      admin: {
          type: Sequelize.BOOLEAN
      }
    },
    );

    return User;
  };