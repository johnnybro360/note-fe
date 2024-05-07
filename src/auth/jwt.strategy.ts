import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtSecret} from "../utils/constants";
import {PassportStrategy} from "@nestjs/passport";
import {Request} from "express";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJwt,
            ]),
            secretOrKey: jwtSecret
        })
    }

    private static extractJwt(req: Request): string | null {
        if(req.cookies && 'token' in req.cookies){
            return req.cookies.token;
        }
        return null;
    }

    async validate(payload: {id: string, email: string}){
        return payload;
    }


}