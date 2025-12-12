export default (sequalize, DataTypes) => {
    const User = sequalize.define("User", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(256), allowNull: false, unique: true, validate: { isEmail: true }
        },
        password_hash: {
            type: DataTypes.STRING(256), allowNull: false
        },
        wallet_points: {
            type: DataTypes.INTEGER, allowNull: false, defaultValue: 0
        }
    }, {
        tableName: 'users'
    });
    return User;
}