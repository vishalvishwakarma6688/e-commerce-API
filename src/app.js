import express from "express";
import morgan from "morgan"

import authRoutes from "./routes/auth.route.js"
import errorMiddleware from "./middlewares/error.middleware.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res)=> {
    res.json({ok: true, message: "e-commerce-api"})
})

app.use("/api/auht", authRoutes)

app.use(errorMiddleware)

export default app