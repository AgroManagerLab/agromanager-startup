const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MONTH_NAMES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];
const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Nome do mês corrente por extenso (ex.: "junho") para rótulos das telas. FR-4.5.
export function currentMonthName(): string {
  return MONTH_NAMES[new Date().getMonth()];
}

export function todayDate(): string {
  const d = new Date();
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function nowTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function thisMonth(): string {
  return MONTHS[new Date().getMonth()];
}

// Data no formato "DD mmm" para N dias atrás (0 = hoje). Usado pelo seed para
// gerar coletas relativas à data atual, evitando métricas zeradas no mês corrente.
export function dateDaysAgo(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function formatDate(d: Date): string {
  return `${DAYS[d.getDay()]} · ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}
