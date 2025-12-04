import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Converte uma string em dois inteiros para usar com advisory locks do PostgreSQL
 */
export function hashToTwoInts(key: string): [number, number] {
  let h = 5381;
  for (let i = 0; i < key.length; i++) h = (h * 33) ^ key.charCodeAt(i);
  const a = h | 0;
  const b = ~h | 0;
  return [a, b];
}
