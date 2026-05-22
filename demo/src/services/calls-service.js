export async function createCall(payload) {
  const response = await fetch('/api/calls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('No se pudo guardar.');
  }

  return response.json();
}

export async function updateCall(id, payload) {
  const response = await fetch(`/api/calls/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('No se pudo actualizar.');
  }

  return response.json();
}

export async function deleteCallById(id) {
  const response = await fetch(`/api/calls/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('No se pudo borrar.');
  }

  return response.json();
}
