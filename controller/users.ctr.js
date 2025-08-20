const { read_file, write_file } = require("../fs/fileSystem");
const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try{
        const {username, email, password} = req.body

        const users = read_file("users.json")

        const foundedUser = users.find((item) => item.email === email)
        if (foundedUser) {
            return res.status(400).json({message: "User alredy exists"})
        }

        const hashPassword = await bcrypt.hash(password, 8)
        users.push({
            id: uuid.v4(),
            username,
            email,
            role: "user",
            password: hashPassword
        })

        write_file("users.json", users)
        res.status(201).json({message: "Registered"})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body

           const users = read_file("users.json")

        const foundedUser = users.find((item) => item.email === email)
        if (!foundedUser) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const decode = await bcrypt.compare(password, foundedUser.password)

        if (decode) {
            const payload = {id: foundedUser.id, email: foundedUser.email, role: foundedUser.role}
            const token = jwt.sign(payload, process.env.SEKRET_KEY, {expiresIn: "10h"})

            res.status(201).json({
                message: "Success", 
                token
            })

        }else{
            return res.status(401).json({
                message: "Invalid password"
            })
        }

    }catch(error){
        res.status(500).json({message: error.message})
    }
}


module.exports={
    register,
    login
}
