const controller=require("../controller/devicecontroller")
const middlewareauth=require("../middleware/authvalidator")
const middlewaredevice=require("../middleware/devicemiddleware")
module.exports=(app)=>{
    app.post("/adddevice",[middlewareauth.tokenvalidator,middlewaredevice.createdevicemiddleware],controller.setupdevice);
    app.get("/getdevicebyid",[middlewareauth.tokenvalidator],controller.getAlldevicesofUser)
    // app.patch("/editdevice",[middlewareauth.tokenvalidator,middlewaredevice.editdevicemiddleware],controller.editDevicename)
    app.delete("/deletedevice",[middlewareauth.tokenvalidator,middlewaredevice.deletedevicemiddleware],controller.deleteDevice)
    app.get("/getAllApplianceById",controller.allapplianceindevice)
}