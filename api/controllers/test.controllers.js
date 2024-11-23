import jwt from 'jsonwebtoken';

export const shouldBeLoggedIn = async(req,res) => {
    console.log(req.userId);
    return res.status(200).json({message:"Congrats!!"})     
}
export const shouldBeAdmin = async(req,res) => {
    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({message : "Please Log-in "})
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload) => {
        if(err) return res.status(403).json({message:"Not Valid!!"})
        if(!payload.isAdmin){
            return res.status(403).json({message : "NotAuthorized!"});
        }
    })
    return res.status(200).json({message:"Congrats!!"}) 
}