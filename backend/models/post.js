module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("article", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      contenue: {
        type: Sequelize.STRING,
      },
      datePublication: {
        type: Sequelize.DATE,
      },
      dateModification: {
          type: Sequelize.DATE,
      },
    },
    );

    return Post;
  };