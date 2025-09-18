import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
	const expiredToken = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "7d" });

	res.cookie("jwt-movie_app", expiredToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: ENV_VARS.NODE_ENV !== "development",
	});

	return expiredToken;
};
