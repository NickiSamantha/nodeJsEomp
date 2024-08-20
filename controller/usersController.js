import {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb} from '../model/usersDB.js'
import { hash } from 'bcrypt'

const fetchUsers = async(req,res) =>{
    res.json(await getUsersDb())
}

const fetchUser = async(req,res)=>{
    res.json(await getUserDb(req.params.id))
}

const insertUser = async(req,res)=>{
    let {firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile} = req.body
    
    hash(userPass, 10, async (err,hashedP)=>{
        await insertUserDb(firstName, lastName, userAge, Gender, userRole, userAdd, hashedP, userProfile )
        res.send('User was inserted successfully')
    })
}

const deleteUser = async(req,res)=>{
    await deleteUserDb(req.params.id)
    res.send('User was deleted successfully')
}

const updateUser = async(req,res)=>{
    let {firstName,lastName,userAge,Gender,userRole,userAdd,userPass,userProfile} = req.body
    let users = await getUserDb(req.params.id)
    firstName?firstName=firstName:firstName = users.firstName
    lastName?lastName=lastName:lastName = users.lastName
    userAge?userAge=userAge:userAge = users.userAge
    Gender?Gender=Gender:Gender = users.Gender
    userRole?userRole=userRole:userRole = users.userRole
    userAdd?userAdd=userAdd:userAdd = users.userAdd
    userPass?userPass=userPass:userPass = users.userPass
    userProfile?userProfile=userProfile:userProfile = users.userProfile
    await updateUserDb(firstName,lastName,userAge,Gender,userRole,userAdd,userPass,userProfile,req.params.id)

    // firstName ? firstName : firstName  = users.firstName
    // lastName ? lastName :  lastName  = users.lastName
    // userAge ? userAge :  userAge  = users.userAge
    // Gender ? Gender :  Gender  = users.Gender
    // userRole ? userRole :  userRole  = users.userRole
    // userAdd ? userAdd :  userAdd = users.userAdd
    // userPass ? userPass : userPass = users.userPass
    // userProfile ? userProfile :  userProfile = users.userProfile

    // await updateUserDb(firstName,lastName,userAge,Gender,userRole,userAdd,userPass,userProfile,+req.params.id)



    res.send('User was updated successfully')
}

export{fetchUsers,fetchUser,insertUser,deleteUser,updateUser}