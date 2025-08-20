const {Router}=require("express")
const {getOneAmal, addAmal, updateAmal, deleteAmal, getAllAmallar } = require("../controller/amallar.ctr")
const userChecker = require("../midleware/userChecker")
const AmallarRouter=Router()




AmallarRouter.get("/get_all_amallar",getAllAmallar)
AmallarRouter.get("/get_one_amal/:id",getOneAmal)
AmallarRouter.post("/add_amal",userChecker,addAmal)
AmallarRouter.put("/update_amal/:id",userChecker,updateAmal)
AmallarRouter.delete("/delete_amal/:id",userChecker,deleteAmal)
module.exports = AmallarRouter