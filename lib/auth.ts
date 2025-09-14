//path:lib/auth.ts
//JWT_SECRET=14fbd6d0406d318b5d60ef6e77e2e8c9a0b995a6cf34a13c40581023bd49b963a72db090ceb287384159a3a264b1acaf9e437f0355be9ca674dace1a84853462
import jwt,{JwtPayload} from 'jsonwebtoken'
const JWT_SECRET=process.env.JWT_SECRET || "default_secret"
interface tokenPayload extends JwtPayload{
    userId:string,
    role:"entrepreneur"|"investor"|"admin",
}
export function getCurrentUser(token:string|undefined):tokenPayload|null{
    if(!token) return null
    try{
        const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload;
        console.log('Decoded token payload:',decoded)
        if (typeof decoded==="object"&& "userId" in decoded && "role" in decoded)
        return decoded as tokenPayload
        return null
    }catch(error){
        return null
    }
}
//JWT_SECRET=>TO GENERATE JWT OPEN TERMINAL AND PRINT THIS COMMEND --->node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"