"use client";

import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface BookingQRCodeProps {
  bookingUrl: string;
  professionalName: string;
}

export function BookingQRCode({ bookingUrl, professionalName }: BookingQRCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bookingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = document.getElementById("qrcode-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `qrcode-agendamento-${professionalName.replace(/\s+/g, "-")}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Agendar com ${professionalName}`,
          text: `Escaneie o QR Code ou acesse o link para agendar`,
          url: bookingUrl,
        });
      } catch (err) {
        console.log("Erro ao compartilhar:", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code de Agendamento</CardTitle>
        <CardDescription>
          Compartilhe este QR Code para que clientes possam agendar diretamente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <QRCodeSVG
            id="qrcode-svg"
            value={bookingUrl}
            size={200}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "/favicon.ico",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>

        <div className="text-sm text-center text-muted-foreground max-w-md break-all">
          {bookingUrl}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Baixar PNG
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copiar Link
              </>
            )}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center max-w-md">
          💡 Dica: Imprima este QR Code e coloque em sua recepção, cartões de visita ou redes sociais
        </div>
      </CardContent>
    </Card>
  );
}
