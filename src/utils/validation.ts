// Helpers puros de validação de formulário (sem UI/DB) — testáveis com Jest. FR-5.1.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

// True quando o texto tem conteúdo não-vazio após trim.
export function requiredText(value: string): boolean {
  return value.trim().length > 0;
}

export function minLength(value: string, length: number): boolean {
  return value.trim().length >= length;
}

// Aceita "12", "12,5" e "12.5"; rejeita vazio, zero, negativo e não-numérico.
export function isPositiveNumber(value: string): boolean {
  const normalized = value.trim().replace(',', '.');
  if (normalized === '') return false;
  const n = Number(normalized);
  return Number.isFinite(n) && n > 0;
}

// Converte um valor de volume digitado ("12,5") em número, ou null se inválido.
export function parseVolume(value: string): number | null {
  if (!isPositiveNumber(value)) return null;
  return Number(value.trim().replace(',', '.'));
}
