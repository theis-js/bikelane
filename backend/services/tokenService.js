import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { SignJWT, jwtVerify } from "jose";
import env from "dotenv";
env.config();
const secret = new TextEncoder().encode(process.env.SECRET_KEY);

export async function generateToken(payload) {
  const newToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h") // Token valid for 2 hours
    .sign(secret);
  console.log("Generated token: ", newToken);
  return newToken;
}

export async function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null) return res.sendStatus(401); // No token present

  const { payload } = await jwtVerify(token, secret);
  req.user = payload;

  next();
}
