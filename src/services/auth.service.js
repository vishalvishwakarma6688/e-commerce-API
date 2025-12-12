import bcrypt from "bcrypt"
import { sequelize, WalletTransaction, User } from "../models/index.js"

export const createUserWithWalletCredit = async ({name, email, password})=> {
    const saltRounds = 10;
    const pasword_hash = await bcrypt.hash(password, saltRounds)
    const walletCredit = parseInt(process.env.WALLET_SIGNUP_CREDIT || '0', 10)
    return await sequelize.transaction(async (t)=> {
        const user = await User.create({
            name, email, pasword_hash, walletCredit
        }, {transaction: t});
        if(walletCredit > 0){
            await WalletTransaction.create({user_id: user.id, type: 'CREDIT', points: walletCredit, reason: 'SIGNUP_BONUS'}, {transaction: t})
        }
        return user;
    })
}