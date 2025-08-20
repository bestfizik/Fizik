const {Router}=require("express")
const {register,login}=require("../controller/users.ctr")
const UsersRouter=Router()



UsersRouter.post("/register",register)
UsersRouter.post("/login",login)

module.exports = UsersRouter