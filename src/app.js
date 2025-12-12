import express from "express";
import morgan from "morgan"

import authRoutes from "./routes/auth.route.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import cartRoutes from "./routes/cart.route.js"
import orderRoutes from "./routes/orders.route.js"
import paymentRoutes from "./routes/payments.route.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res)=> {
    res.json({ok: true, message: "e-commerce-api"})
})

app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payments", paymentRoutes)

app.use(errorMiddleware)

export default app