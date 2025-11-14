import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

interface StepThreeProps {
  codigoVerificacao: string;
  aceitoTermos: boolean;
  onBack: () => void;
  onConfirm: (data: { codigoVerificacao: string; aceitoTermos: boolean }) => Promise<void>;
  isSubmitting?: boolean;
}

export function StepThree({
  codigoVerificacao: initialCodigo,
  aceitoTermos: initialAceito,
  onBack,
  onConfirm,
  isSubmitting = false,
}: StepThreeProps) {
  const [codigoVerificacao, setCodigoVerificacao] = useState(initialCodigo);
  const [aceitoTermos, setAceitoTermos] = useState(initialAceito);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCodigoChange = (value: string) => {
    // Apenas números
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 6) {
      setCodigoVerificacao(numbers);
      if (errors.codigoVerificacao) {
        setErrors(prev => ({ ...prev, codigoVerificacao: '' }));
      }
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (codigoVerificacao.length !== 6) {
      newErrors.codigoVerificacao = 'O código deve ter 6 dígitos';
    }

    if (!aceitoTermos) {
      newErrors.aceitoTermos = 'Você deve aceitar os termos de uso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (validate()) {
      await onConfirm({ codigoVerificacao, aceitoTermos });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl shadow-amber-100/50 p-8 md:p-12"
    >
      {/* Ícone */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
          <Shield className="w-10 h-10 text-amber-500" />
        </div>
      </div>

      {/* Título */}
      <div className="text-center mb-8">
        <h1 className="text-amber-900 mb-2">Confirmar cadastro</h1>
        <p className="text-gray-600">
          Enviamos um código de 6 dígitos para o seu e-mail para confirmar o cadastro.
        </p>
      </div>

      {/* Formulário */}
      <div className="space-y-6">
        <div>
          <Label htmlFor="codigo" className="text-gray-700">
            Código de verificação *
          </Label>
          <Input
            id="codigo"
            value={codigoVerificacao}
            onChange={(e) => handleCodigoChange(e.target.value)}
            placeholder="000000"
            className={`mt-1.5 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400 text-center text-2xl tracking-widest ${
              errors.codigoVerificacao ? 'border-red-300' : ''
            }`}
            maxLength={6}
          />
          {errors.codigoVerificacao && (
            <p className="text-red-500 text-sm mt-1">{errors.codigoVerificacao}</p>
          )}
          <p className="text-gray-500 text-sm mt-2 text-center">
            Não recebeu o código?{' '}
            <button className="text-amber-600 hover:text-amber-700">
              Reenviar
            </button>
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <Checkbox
              id="termos"
              checked={aceitoTermos}
              onCheckedChange={(checked) => {
                setAceitoTermos(checked as boolean);
                if (errors.aceitoTermos) {
                  setErrors(prev => ({ ...prev, aceitoTermos: '' }));
                }
              }}
              className={`mt-0.5 ${
                errors.aceitoTermos ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            <Label
              htmlFor="termos"
              className="cursor-pointer text-gray-700 leading-relaxed"
            >
              Aceito os{' '}
              <a href="#" className="text-amber-600 hover:text-amber-700 underline">
                termos de uso
              </a>{' '}
              e{' '}
              <a href="#" className="text-amber-600 hover:text-amber-700 underline">
                política de privacidade
              </a>
            </Label>
          </div>
          {errors.aceitoTermos && (
            <p className="text-red-500 text-sm mt-2 ml-7">{errors.aceitoTermos}</p>
          )}
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-full h-12 border-gray-300 hover:bg-gray-50"
        >
          Voltar
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full h-12 transition-all hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Cadastrando...' : 'Confirmar'}
        </Button>
      </div>
    </motion.div>
  );
}
