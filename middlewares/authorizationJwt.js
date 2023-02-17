import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as service from "../service/users.js";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

const params = {
	secretOrKey: secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
	new Strategy(params, async (payload, done) => {
		try {
			const user = await service.getUserById(payload.id);
			if (!user) return done(new Error("Invalid user"));
			return done(null, user);
		} catch (e) {
			return done(e);
		}
	}),
);

export const auth = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user) => {
		if (!req.headers.authorization)
			return res.status(400).json({ message: "No token provided" });
		const token = req.headers.authorization.slice(7);
		if (!user) return res.status(404).json({ message: "Invalid user" });
		if (token !== user.accessToken || err)
			return res
				.status(401)
				.json({ message: "Unauthorized (invalid access token)" });
		req.user = user;
		next();
	})(req, res, next);
};
