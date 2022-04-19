module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("commentaire", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      contenue: {
        type: Sequelize.STRING
      },
      datePublication: {
        type: Sequelize.DATE
      },
      dateModification: {
        type: Sequelize.STRING
      },
    },
    );
    return Comment;
  };