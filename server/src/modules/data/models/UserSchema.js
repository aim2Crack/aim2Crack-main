const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

const defineUserModel = async () => {
    const User = sequelize.define('User', {
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

    await User.sync();

    return User;
};

module.exports = defineUserModel;
