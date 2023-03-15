import authenticationService, { SignInParams } from '../services/AuthService';
import { Request, Response } from "express";

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body as SignInParams;
    
    try {
        const result = await authenticationService.signIn({ email, password });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}