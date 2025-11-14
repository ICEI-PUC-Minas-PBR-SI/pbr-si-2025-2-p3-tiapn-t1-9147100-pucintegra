import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Hexagon, Lock, Mail, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onCreateAccount: () => void;
  onCancel: () => void;
}

export function Login({ onLogin, onCreateAccount, onCancel }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 8) {
      newErrors.password = 'Senha deve ter no mínimo 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await onLogin(email, password);
      } catch (error) {
        // Error is already handled in App.tsx
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-8 md:p-10">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <Hexagon className="w-16 h-16 text-amber-500 fill-amber-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="6" cy="5" rx="3" ry="3.5" fill="#f59e0b" />
                  <ellipse cx="4" cy="4" rx="0.8" ry="1" fill="#fbbf24" />
                  <circle cx="3.5" cy="3.5" r="0.5" fill="white" />
                  <path
                    d="M3 3L1.5 2M9 3L10.5 2M3 6.5L1.5 7.5M9 6.5L10.5 7.5"
                    stroke="#f59e0b"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-amber-900 mb-2">Bem-vindo de volta</h1>
          <p className="text-amber-700/70">Acesse sua conta Colmeia</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* E-mail */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-amber-900">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                  errors.email ? 'border-red-400' : ''
                }`}
                placeholder="seu@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-amber-900">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                  errors.password ? 'border-red-400' : ''
                }`}
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Botões */}
          <div className="space-y-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
            >
              Cancelar
            </Button>
          </div>

          {/* Link para criar conta */}
          <div className="text-center pt-4 border-t border-amber-100">
            <button
              type="button"
              onClick={onCreateAccount}
              className="text-amber-600 hover:text-amber-700 transition-colors duration-200"
            >
              Criar novo usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}