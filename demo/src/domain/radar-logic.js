export function daysLeftFrom(deadline, today) {
  const base = new Date(today);
  base.setHours(0, 0, 0, 0);
  const target = new Date(`${deadline}T00:00:00`);
  const diff = target - base;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function urgencyFromDays(days) {
  if (days <= 7) return 'critical';
  if (days <= 14) return 'soon';
  return 'safe';
}

export function riskFromCall(call, today) {
  const days = daysLeftFrom(call.deadline, today);
  return days <= 7 && !call.proposalId ? 'Riesgo alto' : 'Controlado';
}

export function nextActionFromCall(call, today) {
  const days = daysLeftFrom(call.deadline, today);
  if (!call.proposalId && days <= 7) {
    return 'Crear propuesta hoy';
  }
  if (!call.proposalId) {
    return 'Definir idea de charla';
  }
  if (call.status === 'Draft') {
    return 'Revisar abstract';
  }
  if (call.status === 'Ready') {
    return 'Enviar candidatura';
  }
  if (call.status === 'Submitted') {
    return 'Hacer seguimiento';
  }
  if (call.status === 'Accepted') {
    return 'Preparar sesión';
  }
  if (call.status === 'Rejected') {
    return 'Guardar aprendizajes';
  }
  return 'Revisar oportunidad';
}
