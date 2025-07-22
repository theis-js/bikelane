import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { SignJWT, jwtVerify } from "jose";
import env from "dotenv";
env.config();
const secret = new TextEncoder().encode(process.env.SECRET_KEY);

export async function generateToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h") // Token valid for 2 hours
    .sign(secret);
}

export async function authenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).send("No token provided");

  try {
    const { payload } = await jwtVerify(token, secret);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(403).send("Invalid or expired token");
  }
}
