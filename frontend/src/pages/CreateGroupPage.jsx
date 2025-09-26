import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateGroupPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState(null);
  const [inviteText, setInviteText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('Informe o nome do grupo.'); return; }

    const draft = {
      name: name.trim(),
      description: description.trim(),
      coverName: cover?.name || null,
      invitePreset: inviteText.trim() || null,
    };

    // Guarda um rascunho local (mock). Depois troque por chamada à API.
    sessionStorage.setItem('groupDraft', JSON.stringify(draft));

    // Vai para a etapa de convites
    navigate('/groups/invite', { state: { draft } });
  };

  const goInviteNow = (e) => {
    e.preventDefault();
    const draft = {
      name: name.trim(),
      description: description.trim(),
      coverName: cover?.name || null,
      invitePreset: inviteText.trim() || null,
    };
    sessionStorage.setItem('groupDraft', JSON.stringify(draft));
    navigate('/groups/invite', { state: { draft } });
  };

  return (
    <div className="auth-container">
      <h1>Novo Grupo</h1>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Nome do Grupo</label>
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Ex.: Viagem a Capitólio"
          />
        </div>

        <div className="input-field">
          <label>Descrição</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Opcional"
          />
        </div>

        <div className="input-field">
          <label>Imagem de capa</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e)=>setCover(e.target.files?.[0] || null)}
          />
        </div>

        {/* Convidar participantes (campo + botão +) */}
        <div className="input-field">
          <label>Convidar participantes</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={inviteText}
              onChange={(e)=>setInviteText(e.target.value)}
              placeholder="Digite nome, e-mail, @usuário…"
            />
            <button
              type="button"
              className="button"
              style={{ width: 'auto', padding: '0 14px' }}
              title="Adicionar / Ir para convites"
              onClick={goInviteNow}
            >
              +
            </button>
          </div>
          <div className="small-link" style={{ textAlign: 'left' }}>
            <a href="#" onClick={goInviteNow}>Convidar por link</a>
          </div>
        </div>

        <button className="button" type="submit">Criar grupo</button>
      </form>
    </div>
  );
}
