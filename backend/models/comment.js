module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define("comment", {
    content: {
      type: Sequelize.STRING
    }
  },
  );
  return comment;
};