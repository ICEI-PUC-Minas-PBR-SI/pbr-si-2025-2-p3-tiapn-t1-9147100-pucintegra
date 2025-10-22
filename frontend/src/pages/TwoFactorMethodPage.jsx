import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseButton from '../components/CloseButton';

/**
 * TwoFactorMethodPage prompts the user to select their preferred
 * 2FA method (e‑mail or celular) after registration. The selected
 * method is highlighted and confirmed via a button click. On submit,
 * the user is directed to the code verification page.
 */
export default function TwoFactorMethodPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('email');

  const handleSelect = (value) => {
    setMethod(value);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const usuarioId = localStorage.getItem('auth_usuario_id');
    if (!usuarioId) {
      alert('Registro não encontrado. Faça o cadastro novamente.');
      navigate('/register');
      return;
    }
    const m = method === 'celular' ? 'CELULAR' : 'EMAIL';
    try {
      const res = await fetch('/api/auth/2fa/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId: Number(usuarioId), method: m }),
      });
      if (!res.ok) throw new Error('Falha ao enviar código');
      navigate('/verify-code', { state: { method } });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container" style={{ position: 'relative' }}>
      <CloseButton onClick={() => navigate('/register')} />
      <h1>
        Método de verificação
        <br />2 fatores
      </h1>
      <form onSubmit={handleSubmit2}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => handleSelect('email')}
            className="button"
            style={{
              flex: 1,
              backgroundColor: method === 'email' ? 'var(--primary-color)' : '#e0e0e0',
              color: method === 'email' ? '#fff' : '#000',
            }}
          >
            E‑mail
          </button>
          <button
            type="button"
            onClick={() => handleSelect('celular')}
            className="button"
            style={{
              flex: 1,
              backgroundColor: method === 'celular' ? 'var(--primary-color)' : '#e0e0e0',
              color: method === 'celular' ? '#fff' : '#000',
            }}
          >
            Celular
          </button>
        </div>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Será enviado um código para o método selecionado acima
        </p>
        <button type="submit" className="button">
          Enviar código
        </button>
      </form>
      <div className="small-link">
        Ao assinar, você concorda com os <a href="#">termos de serviço</a> e
        <br />
        <a href="#">política de privacidade</a>
      </div>
    </div>
  );
}
