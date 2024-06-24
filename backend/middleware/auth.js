import jwt from "jsonwebtoken";

// const authMiddleware = async (req,res,next) =>{
//     const {token} = req.headers;
//     if(!token){
//         return res.json({success:false,message:"Unauthorized, Login again"});
//     }
//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.json({success:false,message:"Unauthorized, Login again"});
//     }
// }

const authMiddleware = async (req, res, next) => {
    console.log('authMiddleware called');
    console.log('req.headers:', req.headers);
  
    const { token } = req.headers;
    if (!token) {
      console.log('No token found in request headers');
      return res.json({ success: false, message: "Unauthorized, Login again" });
    }
  
    try {
      console.log('Verifying token...');
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified successfully');
      req.body.userId = token_decode.id;
      next();
    } catch (error) {
      console.log('Error verifying token:', error);
      return res.json({ success: false, message: "Unauthorized, Login again" });
    }
  }

export default authMiddleware;
