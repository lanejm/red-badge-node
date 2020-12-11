module.exports = (sequelize, DataTypes) => {
    const Holidays = sequelize.define('holidays', {
        holiday: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Holidays;
}