

const signupcheck=async(req,res,next)=>{

try{

    var{name,mobile,email,password}=req.body

    if(Object.keys(req.body).length===0)
    {
        res.status(400).json(
            {message:"Name or Mobile Number or Email or Password is Missing"}
            )
    }
    else if(!name)
    {
        res.status(400).json({message:"Name Must Be Provided"})
    }
    else if(!mobile)
    {
        res.status(400).json({message:"Mobile Number Is Missing"})
    }
    else if(!email)
    {
        res.status(400).json({message:"Email Must Be Provided"})
    }
    else if(!password)
    {
        res.status(400).json({message:"Password Is Missing"})
    }
    else {
        next()
    }

    

}
catch(err)
{
    res.status(500).json("Something Went Wrong")
}
}

const signinvalidator=async(req,res,next)=>{

    try {
        
        var{email,password}=req.body

        if(Object.keys(req.body).length===0)
    {
        res.status(400).json({Message:"Email or Password is Missing"})
    }
    else if(!email)
    {
        res.status(400).json({Message:"Email Must Be Provided"})
    }
    else if(!password)
    {
        res.status(400).json({Message:"Password Is Missing"})
    }
    else {
        next()
    }




    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong"})
    }

}

module.exports={
    signupcheck,
    signinvalidator
}