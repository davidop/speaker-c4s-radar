import { describe, expect, it } from 'vitest';
import { daysLeftFrom, urgencyFromDays, riskFromCall, nextActionFromCall } from '../src/domain/radar-logic.js';

describe('radar domain logic', () => {
  const today = new Date('2026-05-22T00:00:00');

  it('computes days left correctly', () => {
    expect(daysLeftFrom('2026-05-29', today)).toBe(7);
    expect(daysLeftFrom('2026-05-22', today)).toBe(0);
  });

  it('maps urgency by days', () => {
    expect(urgencyFromDays(3)).toBe('critical');
    expect(urgencyFromDays(10)).toBe('soon');
    expect(urgencyFromDays(30)).toBe('safe');
  });

  it('returns high risk when deadline is close and no proposal', () => {
    const call = { deadline: '2026-05-28', proposalId: null };
    expect(riskFromCall(call, today)).toBe('Riesgo alto');
  });

  it('returns controlled risk when proposal exists', () => {
    const call = { deadline: '2026-05-28', proposalId: 'p-001' };
    expect(riskFromCall(call, today)).toBe('Controlado');
  });

  it('selects next action by status and proposal state', () => {
    expect(nextActionFromCall({ deadline: '2026-05-28', proposalId: null, status: 'Idea' }, today)).toBe('Crear propuesta hoy');
    expect(nextActionFromCall({ deadline: '2026-06-15', proposalId: null, status: 'Idea' }, today)).toBe('Definir idea de charla');
    expect(nextActionFromCall({ deadline: '2026-06-15', proposalId: 'p-001', status: 'Ready' }, today)).toBe('Enviar candidatura');
    expect(nextActionFromCall({ deadline: '2026-06-15', proposalId: 'p-001', status: 'Rejected' }, today)).toBe('Guardar aprendizajes');
  });
});
