module.exports = (sequelize, DataTypes) => {
    const Holidays = sequelize.define('holidays', {
        holiday: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        received: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Holidays;
}