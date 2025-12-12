import dotenv from "dotenv"

dotenv.config()
import app from "./app.js"

const PORT = process.env.PORT || 3000

(async ()=> {
    try {
        await sequelize.authenticate();
        console.log("DB connection success")

        await sequelize.sync({alter: true})
        console.log("Model synced")

        app.listen(PORT, ()=> console.log("Server is running on port", PORT))
    } catch (error) {
        console.log("failed to start ", error)   
        process.exit(1)
    }
})();