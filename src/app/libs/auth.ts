// app/libs/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const EXPIRES_IN = "1d"; // 1 dia

export type Role = "OWNER" | "MANAGER" | "EMPLOYEE";

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string | null;
}

export function signToken(payload: JWTPayload) {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error(
      "JWT_SECRET is not defined in environment variables. Please set JWT_SECRET in your .env file or deployment environment."
    );
  }
  
  return jwt.sign(payload as object, secret, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error(
        "JWT_SECRET is not defined in environment variables. Please set JWT_SECRET in your .env file or deployment environment."
      );
    }
    
    const decoded = jwt.verify(token, secret) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function getUserFromCookie(): Promise<JWTPayload | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  if (!token) return null;

  const user = verifyToken(token);
  if (!user) return null;

  return user;
}
