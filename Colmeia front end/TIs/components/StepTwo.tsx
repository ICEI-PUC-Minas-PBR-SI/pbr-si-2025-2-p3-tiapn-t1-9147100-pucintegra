import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { motion } from 'motion/react';
import { Upload, Eye, EyeOff, User } from 'lucide-react';
import type { UserData } from '../App';

interface StepTwoProps {
  userData: UserData;
  onBack: () => void;
  onNext: (data: Partial<UserData>) => void;
}

export function StepTwo({ userData, onBack, onNext }: StepTwoProps) {
  const [formData, setFormData] = useState({
    nome: userData.nome,
    email: userData.email,
    telefone: userData.telefone,
    cpfCnpj: userData.cpfCnpj,
    endereco: userData.endereco,
    senha: userData.senha,
    confirmarSenha: userData.confirmarSenha,
    foto: userData.foto,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return formData.telefone;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return formData.cpfCnpj;
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return formData.cpfCnpj;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, foto: 'A foto deve ter no máximo 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, foto: reader.result as string }));
        setErrors(prev => ({ ...prev, foto: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.nome.length < 3) {
      newErrors.nome = 'Nome deve ter no mínimo 3 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    const telefoneNumbers = formData.telefone.replace(/\D/g, '');
    if (telefoneNumbers.length !== 11) {
      newErrors.telefone = 'Telefone deve ter 11 dígitos';
    }

    const cpfCnpjNumbers = formData.cpfCnpj.replace(/\D/g, '');
    if (userData.userType === 'locador') {
      if (cpfCnpjNumbers.length !== 14) {
        newErrors.cpfCnpj = 'CNPJ deve ter 14 dígitos';
      }
    } else {
      if (cpfCnpjNumbers.length !== 11) {
        newErrors.cpfCnpj = 'CPF deve ter 11 dígitos';
      }
    }

    if (formData.senha.length < 8) {
      newErrors.senha = 'Senha deve ter no mínimo 8 caracteres';
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  const getPasswordStrength = () => {
    const senha = formData.senha;
    let strength = 0;
    if (senha.length >= 8) strength++;
    if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) strength++;
    if (/[0-9]/.test(senha)) strength++;
    if (/[^a-zA-Z0-9]/.test(senha)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl shadow-amber-100/50 p-8 md:p-12"
    >
      {/* Título */}
      <div className="text-center mb-8">
        <h1 className="text-amber-900 mb-2">Dados pessoais</h1>
        <p className="text-gray-600">Preencha suas informações</p>
      </div>

      {/* Upload de foto */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 border-4 border-amber-200 flex items-center justify-center overflow-hidden">
            {formData.foto ? (
              <img src={formData.foto} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-amber-400" />
            )}
          </div>
          <label
            htmlFor="foto-upload"
            className="absolute bottom-0 right-0 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full cursor-pointer transition-all hover:scale-110"
          >
            <Upload className="w-4 h-4" />
          </label>
          <input
            id="foto-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
      {errors.foto && <p className="text-red-500 text-sm text-center mb-4">{errors.foto}</p>}

      {/* Formulário */}
      <div className="space-y-5">
        <div>
          <Label htmlFor="nome" className="text-gray-700">Nome completo *</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            placeholder="Digite seu nome completo"
            className={`mt-1.5 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400 ${
              errors.nome ? 'border-red-300' : ''
            }`}
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-700">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="seu@email.com"
            className={`mt-1.5 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400 ${
              errors.email ? 'border-red-300' : ''
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="telefone" className="text-gray-700">Telefone *</Label>
          <Input
            id="telefone"
            value={formData.telefone}
            onChange={(e) => handleChange('telefone', formatTelefone(e.target.value))}
            placeholder="(00) 00000-0000"
            className={`mt-1.5 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400 ${
              errors.telefone ? 'border-red-300' : ''
            }`}
          />
          {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
        </div>

        <div>
          <Label htmlFor="cpfCnpj" className="text-gray-700">
            {userData.userType === 'locador' ? 'CNPJ *' : 'CPF *'}
          </Label>
          <Input
            id="cpfCnpj"
            value={formData.cpfCnpj}
            onChange={(e) =>
              handleChange(
                'cpfCnpj',
                userData.userType === 'locador'
                  ? formatCNPJ(e.target.value)
                  : formatCPF(e.target.value)
              )
            }
            placeholder={userData.userType === 'locador' ? '00.000.000/0000-00' : '000.000.000-00'}
            className={`mt-1.5 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400 ${
              errors.cpfCnpj ? 'border-red-300' : ''
            }`}
          />
          {errors.cpfCnpj && <p className="text-red-500 text-sm mt-1">{errors.cpfCnpj}</p>}
        </div>

        <div>
          <Label htmlFor="endereco" className="text-gray-700">Endereço</Label>
          <Textarea
            id="endereco"
            value={formData.endereco}
            onChange={(e) => handleChange('endereco', e.target.value)}
            placeholder="Digite seu endereço completo"
            className="mt-1.5 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400 min-h-[80px]"
          />
        </div>

        <div>
          <Label htmlFor="senha" className="text-gray-700">Senha *</Label>
          <div className="relative">
            <Input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              value={formData.senha}
              onChange={(e) => handleChange('senha', e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className={`mt-1.5 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400 pr-10 ${
                errors.senha ? 'border-red-300' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 mt-0.75"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formData.senha && (
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    level <= passwordStrength
                      ? passwordStrength <= 2
                        ? 'bg-red-400'
                        : passwordStrength === 3
                        ? 'bg-yellow-400'
                        : 'bg-green-400'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
          {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
        </div>

        <div>
          <Label htmlFor="confirmarSenha" className="text-gray-700">Confirmar senha *</Label>
          <div className="relative">
            <Input
              id="confirmarSenha"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmarSenha}
              onChange={(e) => handleChange('confirmarSenha', e.target.value)}
              placeholder="Digite a senha novamente"
              className={`mt-1.5 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400 pr-10 ${
                errors.confirmarSenha ? 'border-red-300' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 mt-0.75"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmarSenha && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>
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
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full h-12 transition-all hover:shadow-lg hover:shadow-amber-500/30"
        >
          Cadastrar
        </Button>
      </div>
    </motion.div>
  );
}
