const {sq} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'Kashish-16', {
    host: 'localhost',
    dialect: 'mysql',
});


    const User = sq.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_type: {
            type: DataTypes.ENUM('student', 'faculty'),
            allowNull: false,
        },
        rollNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        institute: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        brand_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'none',
        },
        brand_logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        brand_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
    });

    // await User.sync();
    User.sync().then(() => {
        console.log("User Model synced");
      });
    return User;


module.exports = defineUserModel;
module.exports = User;