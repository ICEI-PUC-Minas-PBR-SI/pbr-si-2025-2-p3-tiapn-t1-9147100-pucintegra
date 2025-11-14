import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { motion } from 'motion/react';

interface StepOneProps {
  userType: 'locatario' | 'locador';
  onNext: (userType: 'locatario' | 'locador') => void;
}

export function StepOne({ userType: initialUserType, onNext }: StepOneProps) {
  const [userType, setUserType] = useState<'locatario' | 'locador'>(initialUserType);

  const handleNext = () => {
    onNext(userType);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-xl shadow-amber-100/50 p-8 md:p-12"
    >
      {/* Título */}
      <div className="text-center mb-8">
        <h1 className="text-amber-900 mb-2">Crie sua conta</h1>
        <p className="text-gray-600">Escolha o tipo de cadastro</p>
      </div>

      {/* Opções de tipo de usuário */}
      <RadioGroup
        value={userType}
        onValueChange={(value) => setUserType(value as 'locatario' | 'locador')}
        className="space-y-4 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative flex items-center space-x-3 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            userType === 'locatario'
              ? 'border-amber-400 bg-amber-50/50'
              : 'border-gray-200 hover:border-amber-200'
          }`}
          onClick={() => setUserType('locatario')}
        >
          <RadioGroupItem value="locatario" id="locatario" />
          <Label
            htmlFor="locatario"
            className="flex-1 cursor-pointer"
          >
            <div>
              <div className="text-gray-900 mb-1">Locatário</div>
              <div className="text-sm text-gray-500">
                Estou procurando um imóvel para alugar
              </div>
            </div>
          </Label>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative flex items-center space-x-3 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            userType === 'locador'
              ? 'border-amber-400 bg-amber-50/50'
              : 'border-gray-200 hover:border-amber-200'
          }`}
          onClick={() => setUserType('locador')}
        >
          <RadioGroupItem value="locador" id="locador" />
          <Label
            htmlFor="locador"
            className="flex-1 cursor-pointer"
          >
            <div>
              <div className="text-gray-900 mb-1">Locador</div>
              <div className="text-sm text-gray-500">
                Tenho imóveis para alugar
              </div>
            </div>
          </Label>
        </motion.div>
      </RadioGroup>

      {/* Botão Próximo */}
      <Button
        onClick={handleNext}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full h-12 transition-all hover:shadow-lg hover:shadow-amber-500/30"
      >
        Próximo
      </Button>
    </motion.div>
  );
}
