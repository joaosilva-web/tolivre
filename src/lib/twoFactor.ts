import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";

export interface TwoFactorSetup {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

// Gerar segredo para TOTP
export function generateTOTPSecret(userEmail: string, appName: string = "ToLivre"): {
  secret: string;
  otpauthUrl: string;
} {
  const secret = speakeasy.generateSecret({
    name: `${appName} (${userEmail})`,
    issuer: appName,
    length: 32,
  });

  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url || "",
  };
}

// Gerar QR Code a partir do otpauth URL
export async function generateQRCode(otpauthUrl: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);
    return qrCodeDataUrl;
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw new Error("Failed to generate QR code");
  }
}

// Verificar código TOTP
export function verifyTOTPToken(token: string, secret: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 2, // Permite 2 códigos antes/depois (tolerância de 60 segundos)
  });
}

// Gerar códigos de backup
export function generateBackupCodes(count: number = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = randomBytes(4).toString("hex").toUpperCase(); // 8 caracteres
    codes.push(code);
  }
  return codes;
}

// Hashear códigos de backup para armazenamento seguro
export async function hashBackupCodes(codes: string[]): Promise<string[]> {
  const hashedCodes = await Promise.all(
    codes.map((code) => bcrypt.hash(code, 10))
  );
  return hashedCodes;
}

// Verificar se um código de backup é válido
export async function verifyBackupCode(
  code: string,
  hashedCodes: string[]
): Promise<{ valid: boolean; usedIndex: number }> {
  for (let i = 0; i < hashedCodes.length; i++) {
    const isValid = await bcrypt.compare(code, hashedCodes[i]);
    if (isValid) {
      return { valid: true, usedIndex: i };
    }
  }
  return { valid: false, usedIndex: -1 };
}

// Setup completo do 2FA
export async function setupTwoFactor(
  userEmail: string
): Promise<TwoFactorSetup> {
  const { secret, otpauthUrl } = generateTOTPSecret(userEmail);
  const qrCodeUrl = await generateQRCode(otpauthUrl);
  const backupCodes = generateBackupCodes();

  return {
    secret,
    qrCodeUrl,
    backupCodes,
  };
}
