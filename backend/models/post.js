module.exports = (sequelize, Sequelize) => {
  const post = sequelize.define("post", {
    content: {
      type: Sequelize.STRING,
    },
    medialink: {
      type: Sequelize.STRING,
    },
    like: {
      type: Sequelize.INTEGER,
      allowNull: true,
  },
});

  return post;
};

