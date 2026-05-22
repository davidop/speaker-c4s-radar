import { describe, expect, it } from 'vitest';
import { buildNewCall, nextCallId, validateCreatePayload } from '../src/server/calls-api-logic.js';

describe('calls api logic', () => {
  const baseCalls = [
    { id: 'cfs-001' },
    { id: 'cfs-009' },
    { id: 'cfs-010' }
  ];

  it('generates next incremental id', () => {
    expect(nextCallId(baseCalls)).toBe('cfs-011');
  });

  it('validates missing required fields', () => {
    const error = validateCreatePayload({ status: 'Ready' });
    expect(error).toBe('Missing field: name');
  });

  it('validates invalid status', () => {
    const error = validateCreatePayload({
      name: 'Demo',
      community: 'Community',
      deadline: '2026-08-01',
      city: 'Online',
      format: 'Remote',
      status: 'Unknown'
    });
    expect(error).toBe('Invalid status value');
  });

  it('builds new call with defaults', () => {
    const payload = {
      name: 'Evento test',
      community: 'GitHub',
      deadline: '2026-08-01',
      city: 'Online',
      format: 'Remote',
      status: 'Ready'
    };

    const call = buildNewCall(payload, baseCalls);
    expect(call.id).toBe('cfs-011');
    expect(call.deadlineConfidence).toBe('exact');
    expect(call.proposalId).toBeNull();
    expect(call.tags).toEqual([]);
    expect(call.audience).toBe('Comunidad técnica');
  });
});
