module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("utilisateur", {
      // id: {
      //   type: Sequelize.INTEGER,
      //   primaryKey: true,
      //   autoIncrement :true
      // },
      nom: {
        type: Sequelize.STRING
      },
      prenoms: {
        type: Sequelize.STRING
      },
      nomUtilisateur: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: { isEmail: true }
      },
      sexe: {
        type: Sequelize.STRING
      },
      post: {
        type: Sequelize.STRING
      },
      profil: {
        type: Sequelize.STRING
      },
      password: {
          type: Sequelize.STRING,
          notEmpty: true
      },
      admin: {
          type: Sequelize.BOOLEAN,
          allowNull: false
      },    
      statut: {
        type: Sequelize.STRING
      },
    });

    return User;
  };