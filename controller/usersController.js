import {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb} from '../model/usersDB.js'
import { hash } from 'bcrypt'

const fetchUsers = async(req,res) =>{
    res.json(await getUsersDb())
}

const fetchUser = async(req,res)=>{
    res.json(await getUserDb(req.params.id))
}

const insertUser = async (req, res) => {
    try {
        let { firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile } = req.body;

        hash(userPass, 10, async (err, hashedP) => {
            if (err) {
                return res.status(404).send('Error with password');
            }
            try {
                await insertUserDb(firstName, lastName, userAge, Gender, userRole, userAdd, hashedP, userProfile);
                res.status(200).send('User was registered successfully');
            } catch (dbError) {
                res.status(404).send('Error while registering user');
            }
        });
    } catch (error) {
        res.status(500).send('An error occurred while processing your request');
    }
};

const deleteUser = async(req,res)=>{
    await deleteUserDb(req.params.id)
    res.status(200).send('User was deleted successfully')
}

const updateUser = async (req, res) => {
    try {
        let { firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile } = req.body;
        let users = await getUserDb(req.params.id);
        firstName?firstName=firstName:firstName = users.firstName
        lastName?lastName=lastName:lastName = users.lastName
        userAge?userAge=userAge:userAge = users.userAge
        Gender?Gender=Gender:Gender = users.Gender
        userRole?userRole=userRole:userRole = users.userRole
        userAdd?userAdd=userAdd:userAdd = users.userAdd
        userPass?userPass=userPass:userPass = users.userPass
        userProfile?userProfile=userProfile:userProfile = users.userProfile
        await updateUserDb(firstName, lastName, userAge, Gender, userRole, userAdd, userPass, userProfile, req.params.id);
        res.status(200).send('User was updated successfully');
    } catch (error) {
        res.status(404).send('An error occurred while updating the user');
    }
};

const loginUser = async(req,res)=>{
    res.json({message:"You have logged in successfully", token:req.body.token})
};




export{fetchUsers,fetchUser,insertUser,deleteUser,updateUser,loginUser}
