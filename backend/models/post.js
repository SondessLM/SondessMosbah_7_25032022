module.exports = (sequelize, Sequelize) => {
  const post = sequelize.define("post", {
    content: {
      type: Sequelize.STRING,
    },
    medialink: {
      type: Sequelize.STRING,
    }
  },
  );

  return post;
};