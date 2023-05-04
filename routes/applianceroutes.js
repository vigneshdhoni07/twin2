var appliancecontroller=require("../controller/appliancecontroller")
var appliancemiddleware=require("../middleware/appliancemiddleware")
var authmiddleware=require("../middleware/authvalidator")


module.exports=(app)=>{
    app.post("/addappliance",[appliancemiddleware.appliancemiddleware,authmiddleware.tokenvalidator],appliancecontroller.createappliance)
    app.patch("/editappliancename",appliancecontroller.editappliancename)
    app.delete("/deleteappliance",appliancecontroller.deleteAppliance)
    app.post("/toggleState",appliancecontroller.toggle)
}