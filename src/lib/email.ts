// src/lib/email.ts
import { Resend } from "resend";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Inicializar Resend
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    // Verificar se Resend está configurado
    if (!resend || !process.env.RESEND_API_KEY) {
      console.warn(
        "[Email] RESEND_API_KEY não configurado. Email não será enviado."
      );
      console.log("[Email] To:", to);
      console.log("[Email] Subject:", subject);
      console.log("[Email] Link de verificação:");

      // Extrair o link do HTML para facilitar o teste
      const linkMatch = html.match(/href="([^"]*verificar-email[^"]*)"/);
      if (linkMatch) {
        console.log("[Email] 🔗", linkMatch[1]);
      }

      return { success: false, error: "RESEND_API_KEY não configurado" };
    }

    const { data, error } = await resend.emails.send({
      from: `${process.env.SMTP_FROM_NAME || "TôLivre"} <${
        process.env.SMTP_FROM_EMAIL || "onboarding@resend.dev"
      }>`,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[Email] Erro ao enviar:", error);
      return { success: false, error: String(error) };
    }

    console.log("[Email] ✅ Enviado com sucesso:", data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error("[Email] Erro ao enviar email:", error);
    return { success: false, error: String(error) };
  }
}

export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string
) {
  const verificationUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/verificar-email?token=${token}`;

  const svgString = `<svg width="120" height="124" viewBox="0 0 694 717" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TôLivre"><g clip-path="url(#clip0_57_29)"><path d="M163.293 644.682V625.273H240.409V644.682H213.722V714H189.98V644.682H163.293ZM272.23 715.213C265.01 715.213 258.829 713.783 253.688 710.924C248.547 708.036 244.604 704.021 241.86 698.88C239.117 693.71 237.745 687.717 237.745 680.901C237.745 674.084 239.117 668.106 241.86 662.964C244.604 657.795 248.547 653.78 253.688 650.92C258.829 648.032 265.01 646.588 272.23 646.588C279.451 646.588 285.632 648.032 290.773 650.92C295.914 653.78 299.857 657.795 302.601 662.964C305.344 668.106 306.716 674.084 306.716 680.901C306.716 687.717 305.344 693.71 302.601 698.88C299.857 704.021 295.914 708.036 290.773 710.924C285.632 713.783 279.451 715.213 272.23 715.213ZM272.404 697.537C274.426 697.537 276.173 696.858 277.646 695.501C279.119 694.143 280.26 692.208 281.069 689.695C281.877 687.183 282.282 684.193 282.282 680.727C282.282 677.232 281.877 674.243 281.069 671.759C280.26 669.246 279.119 667.311 277.646 665.954C276.173 664.596 274.426 663.918 272.404 663.918C270.266 663.918 268.432 664.596 266.902 665.954C265.371 667.311 264.201 669.246 263.392 671.759C262.584 674.243 262.179 677.232 262.179 680.727C262.179 684.193 262.584 687.183 263.392 689.695C264.201 692.208 265.371 694.143 266.902 695.501C268.432 696.858 270.266 697.537 272.404 697.537ZM280.722 639.483L272.23 629.952L263.739 639.483H243.983V638.963L263.912 619.207H280.549L300.478 638.963V639.483H280.722ZM316.074 714V625.273H340.162V694.591H376.034V714H316.074ZM386.118 714V647.455H410.033V714H386.118ZM398.075 640.523C394.841 640.523 392.068 639.454 389.757 637.317C387.447 635.179 386.291 632.609 386.291 629.605C386.291 626.601 387.447 624.031 389.757 621.893C392.068 619.756 394.841 618.688 398.075 618.688C401.339 618.688 404.112 619.756 406.394 621.893C408.704 624.031 409.86 626.601 409.86 629.605C409.86 632.609 408.704 635.179 406.394 637.317C404.112 639.454 401.339 640.523 398.075 640.523ZM489.283 647.455L466.928 714H439.201L416.846 647.455H441.973L452.718 691.472H453.411L464.155 647.455H489.283ZM496.085 714V647.455H519.306V660.105H520C521.213 655.426 523.133 652.004 525.762 649.837C528.419 647.671 531.524 646.588 535.076 646.588C536.116 646.588 537.141 646.675 538.152 646.848C539.192 646.992 540.189 647.209 541.142 647.498V667.903C539.958 667.499 538.499 667.196 536.766 666.994C535.033 666.791 533.546 666.69 532.304 666.69C529.964 666.69 527.856 667.225 525.978 668.293C524.13 669.333 522.671 670.806 521.603 672.712C520.534 674.59 520 676.799 520 679.341V714H496.085ZM577.057 715.213C569.952 715.213 563.829 713.856 558.688 711.141C553.576 708.397 549.633 704.469 546.86 699.357C544.117 694.215 542.745 688.063 542.745 680.901C542.745 674.027 544.131 668.019 546.904 662.878C549.676 657.737 553.59 653.737 558.645 650.877C563.699 648.018 569.663 646.588 576.537 646.588C581.563 646.588 586.112 647.368 590.184 648.928C594.257 650.487 597.737 652.754 600.625 655.729C603.514 658.675 605.738 662.257 607.297 666.474C608.857 670.691 609.637 675.442 609.637 680.727V686.273H550.196V673.102H587.628C587.599 671.196 587.108 669.521 586.155 668.077C585.231 666.604 583.975 665.463 582.386 664.654C580.826 663.817 579.05 663.398 577.057 663.398C575.122 663.398 573.346 663.817 571.728 664.654C570.111 665.463 568.811 666.589 567.829 668.033C566.876 669.478 566.371 671.167 566.313 673.102V687.312C566.313 689.45 566.761 691.356 567.656 693.031C568.551 694.706 569.837 696.021 571.512 696.974C573.187 697.927 575.209 698.403 577.577 698.403C579.223 698.403 580.725 698.172 582.083 697.71C583.469 697.248 584.653 696.584 585.635 695.717C586.617 694.822 587.339 693.753 587.801 692.511H609.637C608.886 697.133 607.109 701.147 604.308 704.555C601.506 707.935 597.795 710.563 593.174 712.44C588.581 714.289 583.209 715.213 577.057 715.213Z" fill="white"/></g><defs><clipPath id="clip0_57_29"><rect width="694" height="717" fill="white"/></clipPath></defs></svg>`;

  const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

  const hostedLogoUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || "https://tolivre.app"
  }/full-logo-white.png`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifique seu email - TôLivre</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1AC897 0%, #1892C9 100%); padding: 28px 20px; text-align: center;">
              <span style="display:none; font-size:1px; color:#ffffff; max-height:0; max-width:0; opacity:0; overflow:hidden;">Confirme seu email para ativar sua conta no TôLivre ✨</span>
              <div style="text-align:center;">
                <img src="${hostedLogoUrl}" alt="TôLivre" style="width:120px; height:auto; display:block; margin:0 auto; border:0;" />
              </div>
              <p style="color: #ffffff; margin: 8px 0 0 0; font-size: 15px;">Liberte Sua Agenda 🕊️</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 36px 30px;">
              <h2 style="color: #333333; margin: 0 0 12px 0; font-size: 22px;">Olá, ${name} 👋</h2>
              <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                Obrigado por se cadastrar no <strong>TôLivre</strong>! Estamos felizes em ter você por aqui.
              </p>
              <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 22px 0;">
                Para começar a liberar sua agenda e receber reservas, confirme seu email clicando no botão abaixo ✨
              </p>
              
              <!-- Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 18px 0;">
                    <a href="${verificationUrl}" aria-label="Verificar email" style="display: inline-block; background: linear-gradient(135deg, #1AC897 0%, #1892C9 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: 700;">
                      Confirmar email
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 24px 0 0 0;">
                Se o botão não funcionar, copie e cole este link no seu navegador:
              </p>
              <p style="color: #667eea; font-size: 13px; word-break: break-all; margin: 8px 0 0 0;">
                ${verificationUrl}
              </p>
              
              <hr style="border: none; border-top: 1px solid #eeeeee; margin: 28px 0;">
              
              <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 0;">
                <strong>Este link expira em 24 horas.</strong><br>
                Se você não criou uma conta no TôLivre, por favor ignore este email. 💬
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f8f8; padding: 18px 30px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="color: #999999; font-size: 12px; margin: 0;">
                © 2025 TôLivre. Todos os direitos reservados.
              </p>
              <p style="color: #999999; font-size: 12px; margin: 8px 0 0 0;">
                <a href="${
                  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
                }" style="color: #667eea; text-decoration: none;">tolivre.com.br</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
Olá, ${name}!

Obrigado por se cadastrar no TôLivre!

Para começar a usar nossa plataforma, verifique seu email clicando no link abaixo:

${verificationUrl}

Este link expira em 24 horas.

Se você não criou uma conta no TôLivre, por favor ignore este email.

© 2025 TôLivre
  `;

  return sendEmail({
    to: email,
    subject: "Verifique seu email - TôLivre",
    html,
    text,
  });
}
