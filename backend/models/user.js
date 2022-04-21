module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    lastName: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    userName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: { isEmail: true }
    },
    sex: {
      type: Sequelize.STRING
    },
    job: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    profile: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return user;
};