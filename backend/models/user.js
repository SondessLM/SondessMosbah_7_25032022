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
      prenom: {
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
      poste: {
        type: Sequelize.STRING
      },
      profil: {
        type: Sequelize.STRING
      },
      password: {
          type: Sequelize.STRING,
          notEmpty: true
      },
      statut: {
        type: Sequelize.STRING
      },            
      });

    return User;
  };