import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MOCK_FRIENDS = [
  { id: 1, name: 'Fulano' },
  { id: 2, name: 'Ciclano' },
  { id: 3, name: 'Beltrano' },
];

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Zm6-3a6 6 0 1 1-12 0M12 17v4m-3 0h6"
            fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default function InviteMembersPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const draft = state?.draft || JSON.parse(sessionStorage.getItem('groupDraft') || 'null');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState([]);

  const filtered = useMemo(
    () => MOCK_FRIENDS.filter(f => f.name.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  const add = (f) => {
    if (!selected.some(s => s.id === f.id)) setSelected([...selected, f]);
  };

  const copyInvite = async () => {
    const link = 'https://passa-regua.app/invite/ABC123'; // mock
    try {
      await navigator.clipboard.writeText(link);
      alert('Link copiado para a área de transferência.');
    } catch {
      prompt('Copie o link:', link);
    }
  };

  const finish = () => {
    const groupId = 1; // mock
    navigate(`/groups/manage/${groupId}`, { state: { draft, invited: selected } });
  };

  const goBack = () => {
    if (draft) sessionStorage.setItem('groupDraft', JSON.stringify(draft));
    navigate('/groups/create');
  };

  return (
    <div className="auth-container">
      {/* faixa cinza topo (igual wireframe) */}
      <div className="section-bar flush">
        <button className="icon-btn" onClick={goBack} aria-label="Voltar">←</button>
        <div className="section-title">Convidar</div>
        <div style={{ width: 34 }} />
      </div>

      {/* campo de busca com ícones dentro */}
      <div className="input-field">
        <div className="search-bar">
          <span className="search-icon-left"><SearchIcon /></span>
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="procurar amigo"
            aria-label="procurar amigo"
          />
          <button
            type="button"
            className="search-icon-right"
            title="Buscar por voz (mock)"
            onClick={() => alert('Busca por voz (mock)')}
          >
            <MicIcon />
          </button>
        </div>
      </div>

      {/* lista */}
      {filtered.map(f => (
        <div
          key={f.id}
          className="row line"
          style={{ alignItems:'center', padding:'12px 0' }}
        >
          <div className="avatar" aria-hidden />
          <div style={{ flex: 1 }}>{f.name}</div>
          <button
            className="icon-btn icon-btn--primary"
            onClick={() => add(f)}
            title="Adicionar"
          >
            +
          </button>
        </div>
      ))}

      <div className="small-link" style={{textAlign:'left'}}>
        <a href="#" onClick={(e)=>{e.preventDefault(); copyInvite();}}>Convidar por link</a>
      </div>

      {selected.length>0 && (
        <div className="small-link" style={{textAlign:'left', marginTop:'12px'}}>
          <strong>Selecionados:</strong> {selected.map(s=>s.name).join(', ')}
        </div>
      )}

      <button className="button" onClick={finish} style={{marginTop:'16px'}}>Continuar</button>
    </div>
  );
}
