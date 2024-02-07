import {JwtPayload} from "jwt-decode";

export type EnhancedJwtPayload = JwtPayload & {
    userProfileId:number,
    firstName:string,
    role:string,
    ucId:number
}