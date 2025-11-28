import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface StepFourProps {
  nome: string;
  onDashboard: () => void;
  onClose: () => void;
}

export function StepFour({ nome, onDashboard, onClose }: StepFourProps) {
  const primeiroNome = nome.split(' ')[0] || 'Usuário';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-xl shadow-amber-100/50 p-8 md:p-12"
    >
      {/* Ilustração */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative"
        >
          {/* Abelha ilustrada */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Corpo */}
            <ellipse cx="60" cy="60" rx="30" ry="35" fill="#FCD34D" />
            
            {/* Listras */}
            <rect x="30" y="45" width="60" height="8" rx="4" fill="#78350F" opacity="0.7" />
            <rect x="30" y="60" width="60" height="8" rx="4" fill="#78350F" opacity="0.7" />
            <rect x="30" y="75" width="60" height="8" rx="4" fill="#78350F" opacity="0.7" />
            
            {/* Cabeça */}
            <circle cx="60" cy="35" r="18" fill="#FDE68A" />
            
            {/* Olhos */}
            <circle cx="54" cy="32" r="4" fill="#78350F" />
            <circle cx="66" cy="32" r="4" fill="#78350F" />
            <circle cx="55" cy="31" r="1.5" fill="white" />
            <circle cx="67" cy="31" r="1.5" fill="white" />
            
            {/* Sorriso */}
            <path
              d="M 52 40 Q 60 44 68 40"
              stroke="#78350F"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Antenas */}
            <path
              d="M 52 20 Q 48 12 46 8"
              stroke="#78350F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 68 20 Q 72 12 74 8"
              stroke="#78350F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="46" cy="8" r="3" fill="#F59E0B" />
            <circle cx="74" cy="8" r="3" fill="#F59E0B" />
            
            {/* Asas */}
            <ellipse
              cx="40"
              cy="50"
              rx="18"
              ry="25"
              fill="white"
              opacity="0.7"
              transform="rotate(-20 40 50)"
            />
            <ellipse
              cx="80"
              cy="50"
              rx="18"
              ry="25"
              fill="white"
              opacity="0.7"
              transform="rotate(20 80 50)"
            />
            <ellipse
              cx="40"
              cy="50"
              rx="14"
              ry="20"
              fill="none"
              stroke="#FCD34D"
              strokeWidth="1"
              opacity="0.5"
              transform="rotate(-20 40 50)"
            />
            <ellipse
              cx="80"
              cy="50"
              rx="14"
              ry="20"
              fill="none"
              stroke="#FCD34D"
              strokeWidth="1"
              opacity="0.5"
              transform="rotate(20 80 50)"
            />
            
            {/* Pernas */}
            <path d="M 45 90 L 42 102" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 55 92 L 54 104" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 65 92 L 66 104" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 75 90 L 78 102" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Sparkles ao redor */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0"
          >
            <Sparkles className="absolute -top-2 left-1/2 w-5 h-5 text-amber-400" />
            <Sparkles className="absolute top-1/2 -right-2 w-4 h-4 text-yellow-400" />
            <Sparkles className="absolute -bottom-2 left-1/4 w-5 h-5 text-amber-300" />
          </motion.div>
        </motion.div>
      </div>

      {/* Mensagem */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-8"
      >
        <h1 className="text-amber-900 mb-2">Boas vindas!</h1>
        <p className="text-gray-600 text-lg">
          Olá, <span className="text-amber-700">{primeiroNome}</span>! 🎉
        </p>
        <p className="text-gray-500 mt-2">
          Seu cadastro foi concluído com sucesso. Você será redirecionado para a página principal.
        </p>
      </motion.div>

      {/* Botões */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col gap-3"
      >
        <Button
          onClick={onDashboard}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full h-12 transition-all hover:shadow-lg hover:shadow-amber-500/30"
        >
          Acessar painel
        </Button>
        <Button
          variant="ghost"
          onClick={onClose}
          className="w-full rounded-full h-12 text-gray-600 hover:bg-gray-50"
        >
          Fechar
        </Button>
      </motion.div>
    </motion.div>
  );
}
