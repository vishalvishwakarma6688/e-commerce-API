export default (sequalize, DataTypes) => {
    const Product = sequalize.define("Product", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(200), allowNull: false
        },
        description: {
            type: DataTypes.TEXT(256), allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER, allowNull: false, defafaultValue: 0
        },
        sku: {
            type: DataTypes.STRING(100), allowNull: true
        }
    }, {
        tableName: 'products'
    });
    return Product;
}