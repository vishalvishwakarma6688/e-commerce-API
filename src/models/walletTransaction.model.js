export default (sequalize, DataTypes) => {
    const WallerTransaction = sequalize.define("WallerTransaction", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED, allowNull: false
        },
        type: {
            type: DataTypes.ENUM('CREDIT', 'DEBIT'), allowNull: false
        },
        points: {
            type: DataTypes.INTEGER(10, 2), allowNull: false,
        },
        reason: {
            type: DataTypes.STRING(256), allowNull: true,
        },
        reference_id: {
            type: DataTypes.STRING(128), allowNull: true
        }
    }, {
        tableName: 'wallet_transactions'
    });
    return WallerTransaction;
}