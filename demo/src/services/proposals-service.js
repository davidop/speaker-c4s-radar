export async function createProposal(payload) {
  const response = await fetch('/api/proposals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('No se pudo crear propuesta');
  }

  return response.json();
}

export async function updateProposal(id, payload) {
  const response = await fetch(`/api/proposals/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('No se pudo actualizar propuesta');
  }

  return response.json();
}

export async function deleteProposalById(id) {
  const response = await fetch(`/api/proposals/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('No se pudo borrar propuesta');
  }

  return response.json();
}
