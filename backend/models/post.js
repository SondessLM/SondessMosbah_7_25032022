module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("article", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      content: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      imageUrl: {
          type: Sequelize.STRING,
      },
    },
    );

    return Post;
  };