module.exports = (sequelize, DataTypes) => {
    const Gifts = sequelize.define('gifts', {
        giftName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        purchasedFrom: {
            type: DataTypes.STRING,
            allowNull: true
        },
        person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Gifts;
};