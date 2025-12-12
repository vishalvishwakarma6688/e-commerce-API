export default (sequalize, DataTypes) => {
    const Order = sequalize.define("Order", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED, allowNull: false,
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2), allowNull: false,
        },
        wallet_points_used: {
            type: DataTypes.INTEGER, allowNull: false, defaultValue: 0
        },
        payment_status: {
            type: DataTypes.ENUM('PENDING','SUCCESS','FAILED'), defaultValue: "PENDING",
        },
        status: {
            type: DataTypes.ENUM('PLACED', 'CANCELLED', 'COMPLETED'), defaultValue: "PLACED"
        }
    }, {
        tableName: 'orders'
    });
    return Order;
}