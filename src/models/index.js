import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Import all models
import UserModel from "./user.model.js";
import ProductModel from "./product.model.js";
import WalletTransactionModel from "./walletTransaction.model.js";
import CartModel from "./cart.model.js";
import CartItemModel from "./cartItem.model.js";
import OrderModel from "./order.model.js";
import OrderItemModel from "./orderitem.model.js";

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const WalletTransaction = WalletTransactionModel(sequelize, DataTypes);
const Cart = CartModel(sequelize, DataTypes);
const CartItem = CartItemModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const OrderItem = OrderItemModel(sequelize, DataTypes);

/* ============================
   🔗 DEFINE ALL ASSOCIATIONS
============================ */

// USER → WALLET TRANSACTIONS
User.hasMany(WalletTransaction, { foreignKey: "user_id", as: "wallet_transactions" });
WalletTransaction.belongsTo(User, { foreignKey: "user_id", as: "user" });

// USER → CART
User.hasOne(Cart, { foreignKey: "user_id", as: "cart" });
Cart.belongsTo(User, { foreignKey: "user_id", as: "user" });

// CART → CART ITEMS
Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id", as: "cart" });

// PRODUCT → CART ITEMS
Product.hasMany(CartItem, { foreignKey: "product_id", as: "cart_items" });
CartItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// USER → ORDERS
User.hasMany(Order, { foreignKey: "user_id", as: "orders" });
Order.belongsTo(User, { foreignKey: "user_id", as: "user" });

// ORDER → ORDER ITEMS
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

// PRODUCT → ORDER ITEMS
Product.hasMany(OrderItem, { foreignKey: "product_id", as: "order_items" });
OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

/* ============================
   EXPORT
============================ */

export {
  sequelize,
  User,
  Product,
  WalletTransaction,
  Cart,
  CartItem,
  Order,
  OrderItem
};
