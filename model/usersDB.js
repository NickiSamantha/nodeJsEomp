import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'

config()

const pool =createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getUsersDb = async()=>{
    const [data] = await pool.query('SELECT * FROM users')
    return data
}

const getUserDb = async(id) =>{
    const [[data]] = await pool.query('SELECT * FROM users WHERE userID = ?', [id])
    return data
}

const loginUserDB = async(userAdd) =>{
    const [[data]] = await pool.query('SELECT * FROM users WHERE userAdd = ?', [userAdd])
    return data
}

const insertUserDb = async(firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile) =>{
    await pool.query(`
        INSERT INTO users (firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile )
        VALUES (?,?,?,?,?,?,?,?)
        `, [firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile])
}

const deleteUserDb = async(id) =>{
    await pool.query(`DELETE FROM users WHERE userID = ?`, [id])
}

const updateUserDb = async(firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile, id) =>{
    await pool.query(`
        UPDATE users
        SET firstName = ? ,
        lastName = ?, 
        userAge = ? ,
        Gender = ? ,
        userRole = ? ,
        userAdd = ? ,
        userPass = ?, 
        userProfile = ?
        WHERE userID = ?`,
    [firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile, id])
}

// console.log(await getUsersDb());

export {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb, loginUserDB}
