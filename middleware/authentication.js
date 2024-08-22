import { compare } from "bcrypt"
import { loginUserDB } from "../model/usersDB.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
// const hashedPassword = 'password'
const checkUser = async(req,res,next)=>{
    const {userAdd,userPass} = req.body
    let hashedPassword = (await loginUserDB(userAdd)).userPass
    
    console.log(hashedPassword);

    compare(userPass, hashedPassword, (err,result)=> {
        if(result==true){
            let token = jwt.sign({userAdd:userAdd},process.env.SECRET_KEY,{expiresIn:'1h'})
            console.log(token);
            req.body.token = token
            next()
            return
        }
        res.send('Your password is incorrect bud')
    })
}
export {checkUser}