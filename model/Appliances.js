const mongoose=require("mongoose")

var appliance=new mongoose.Schema(
    {
        createdAt: { type: Date, default: Date.now },
        applianceName: { type: String, require: true },
        nodeIndex:{type:Number},
        isAssigned: { type: Boolean, default: false },
        switchStatus:{type:Boolean,default:false},
        nodeStatus:{type:Boolean,default:false},
        onTime:{type:String, default:null},
        dimmer:{type:Number,default:0},
        userMail:{type:String},
        controller_id:{type:String}

        
    }
)

module.exports=mongoose.model("Appliances",appliance)