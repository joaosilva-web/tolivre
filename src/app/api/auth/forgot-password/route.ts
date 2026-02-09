import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@/generated/prisma";
import * as api from "@/app/libs/apiResponse";
import { Resend } from "resend";
import crypto from "crypto";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

const ForgotPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = ForgotPasswordSchema.parse(body);

    // Busca usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // Por segurança, sempre retorna sucesso mesmo se email não existir
    // Isso evita que alguém descubra emails cadastrados
    if (!user) {
      return api.ok({
        message:
          "Se o email existir, você receberá instruções para redefinir sua senha.",
      });
    }

    // Gera token aleatório seguro (32 bytes = 64 caracteres hex)
    const token = crypto.randomBytes(32).toString("hex");

    // Expira em 1 hora
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Salva token no banco
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // URL de reset
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/resetar-senha/${token}`;

    // Envia email
    try {
      await resend.emails.send({
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: user.email,
        subject: "Recuperação de Senha - TôLivre",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #0d542b 0%, #0a3d1f 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">TôLivre</h1>
              </div>
              
              <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #0d542b; margin-top: 0;">Olá, ${user.name}!</h2>
                
                <p>Recebemos uma solicitação para redefinir a senha da sua conta no TôLivre.</p>
                
                <p>Clique no botão abaixo para criar uma nova senha:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" 
                     style="background-color: #0d542b; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                    Redefinir Senha
                  </a>
                </div>
                
                <p style="color: #666; font-size: 14px;">
                  Ou copie e cole este link no seu navegador:<br>
                  <a href="${resetUrl}" style="color: #0d542b; word-break: break-all;">${resetUrl}</a>
                </p>
                
                <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                  <p style="margin: 0; color: #856404; font-size: 14px;">
                    <strong>⚠️ Importante:</strong> Este link é válido por apenas 1 hora e só pode ser usado uma vez.
                  </p>
                </div>
                
                <p style="color: #666; font-size: 14px;">
                  Se você não solicitou a redefinição de senha, ignore este email. Sua senha permanecerá inalterada.
                </p>
                
                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                
                <p style="color: #999; font-size: 12px; text-align: center;">
                  Este é um email automático, por favor não responda.<br>
                  © ${new Date().getFullYear()} TôLivre. Todos os direitos reservados.
                </p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Erro ao enviar email de recuperação:", emailError);
      // Mesmo com erro no email, retorna sucesso para não expor se o usuário existe
      return api.ok({
        message:
          "Se o email existir, você receberá instruções para redefinir sua senha.",
      });
    }

    return api.ok({
      message:
        "Se o email existir, você receberá instruções para redefinir sua senha.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return api.badRequest(
        "Dados inválidos",
        error.issues.map((e) => e.message),
      );
    }

    console.error("Erro em forgot-password:", error);
    return api.serverError("Erro ao processar solicitação");
  }
}
