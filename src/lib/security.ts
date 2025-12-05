// Utility para extrair informações do User-Agent
export interface DeviceInfo {
  device: string; // Mobile, Desktop, Tablet
  browser: string; // Chrome, Firefox, Safari, Edge, etc
  os: string; // Windows, macOS, Linux, iOS, Android
  userAgent: string;
}

export function parseUserAgent(userAgent: string): DeviceInfo {
  const ua = userAgent.toLowerCase();
  
  // Detectar dispositivo
  let device = "Desktop";
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    device = "Tablet";
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    device = "Mobile";
  }
  
  // Detectar navegador
  let browser = "Unknown";
  if (ua.includes("edg/")) {
    browser = "Edge";
  } else if (ua.includes("chrome/") && !ua.includes("edg/")) {
    browser = "Chrome";
  } else if (ua.includes("firefox/")) {
    browser = "Firefox";
  } else if (ua.includes("safari/") && !ua.includes("chrome/")) {
    browser = "Safari";
  } else if (ua.includes("opera/") || ua.includes("opr/")) {
    browser = "Opera";
  } else if (ua.includes("trident/")) {
    browser = "Internet Explorer";
  }
  
  // Detectar sistema operacional
  let os = "Unknown";
  if (ua.includes("win")) {
    os = "Windows";
  } else if (ua.includes("mac")) {
    os = "macOS";
  } else if (ua.includes("linux")) {
    os = "Linux";
  } else if (ua.includes("android")) {
    os = "Android";
  } else if (ua.includes("iphone") || ua.includes("ipad")) {
    os = "iOS";
  }
  
  return { device, browser, os, userAgent };
}

// Gerar um token único para sessão (além do JWT)
export function generateSessionToken(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomStr}`;
}

// Verificar se IP mudou drasticamente (possível indicador de fraude)
export function isIpSuspicious(currentIp: string, previousIp: string): boolean {
  // Simplificado: verifica se os dois primeiros octetos são diferentes
  // Em produção, use geolocalização para verificar mudança de país/continente
  const currentOctets = currentIp.split('.');
  const previousOctets = previousIp.split('.');
  
  if (currentOctets.length !== 4 || previousOctets.length !== 4) {
    return false; // IPs inválidos
  }
  
  // Se mudou de rede classe A ou B, pode ser suspeito
  return currentOctets[0] !== previousOctets[0] || 
         currentOctets[1] !== previousOctets[1];
}

// Verificar se dispositivo é novo
export function isNewDevice(
  currentDevice: DeviceInfo,
  previousDevices: { device: string; browser: string; os: string }[]
): boolean {
  return !previousDevices.some(
    (prev) =>
      prev.device === currentDevice.device &&
      prev.browser === currentDevice.browser &&
      prev.os === currentDevice.os
  );
}

// Calcular score de risco do login (0-100, onde 100 é mais arriscado)
export function calculateLoginRiskScore(factors: {
  isNewDevice: boolean;
  isNewIp: boolean;
  isSuspiciousIp: boolean;
  failedAttemptsLast24h: number;
  timeSinceLastLogin: number; // em horas
}): number {
  let score = 0;
  
  if (factors.isNewDevice) score += 20;
  if (factors.isNewIp) score += 15;
  if (factors.isSuspiciousIp) score += 30;
  if (factors.failedAttemptsLast24h > 0) score += Math.min(factors.failedAttemptsLast24h * 5, 25);
  if (factors.timeSinceLastLogin > 720) score += 10; // Mais de 30 dias
  
  return Math.min(score, 100);
}
