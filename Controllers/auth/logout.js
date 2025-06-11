exports.logout = async (req,res)=>{
    try{
        res.status(200).clearCookie("convoHub").json({ message: "Logged out successfully" });
    }
    catch(e){
        res.status(500).json({message:"server error"});
    }
}