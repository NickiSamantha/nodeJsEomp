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
    const [data] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    return data
}

const insertUserDb = async(name, surname, age, gender, role, email, password, profile) =>{
    let [data] = await pool.query(`
        INSERT INTO users (firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile )
        VALUES (?,?,?,?,?,?,?)
        `, [name, surname, age, gender, role, email, password, profile])
}

const deleteUserDb = async(id) =>{
    await pool.query(`DELETE FROM users WHERE id = ?`, [id])
}

const updateUserDb = async(id) =>{
    await pool.query(`
        UPDATE users
        SET firstName = ? lastName = ? userAge = ? Gender = ? userRole = ? userAdd = ? userPass, userProfile
        WHERE userID = ?`, 
    [name, surname, age, gender, role, email, password, profile, id])
}

console.log(await getUsersDb());

export {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb}
