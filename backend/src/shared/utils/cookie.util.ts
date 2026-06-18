import { Response } from "express";

export function setAccessTokenCookie(accessToken: string, res: Response) {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });
}

export function clearAccessTokenCookie(res: Response) {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
}
