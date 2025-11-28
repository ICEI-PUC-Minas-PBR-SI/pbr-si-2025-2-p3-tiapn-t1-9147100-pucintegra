import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CheckCircle2, Hexagon, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface RatingSuccessProps {
  rating: number;
  type: 'property' | 'tenant';
  onContinue: () => void;
}

export function RatingSuccess({ rating, type, onContinue }: RatingSuccessProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-8 md:p-10">
        {/* Ícone de Sucesso com Hexágono Dourado */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="inline-flex items-center justify-center mb-6 relative"
          >
            {/* Hexágono Dourado com animação */}
            <div className="relative animate-[pulse_2s_ease-in-out_infinite]">
              <Hexagon className="w-24 h-24 text-amber-500 fill-amber-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-amber-600 animate-[scale-in_0.5s_ease-out]" />
              </div>
            </div>

            {/* Partículas de celebração */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.5],
                    x: Math.cos(i * 45 * Math.PI / 180) * 60,
                    y: Math.sin(i * 45 * Math.PI / 180) * 60
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute left-1/2 top-1/2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <h1 className="text-amber-900 mb-3">
            Avaliação enviada com sucesso!
          </h1>
          
          {/* Mostrar a avaliação em estrelas */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: star * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating / 2
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-amber-200'
                  }`}
                />
              </motion.div>
            ))}
          </div>
          
          <p className="text-amber-600 mb-4">
            Nota: {rating}/10
          </p>

          <p className="text-amber-700/70 mb-6">
            {type === 'property'
              ? 'Sua avaliação ajuda outros usuários da Colmeia a tomar melhores decisões!'
              : 'Sua avaliação contribui para a reputação da comunidade Colmeia!'
            }
          </p>

          {/* Informação sobre reputação */}
          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <p className="text-amber-800">Reputação é um ativo valioso</p>
            </div>
            <p className="text-amber-700/70 text-sm">
              Avaliações honestas e construtivas fortalecem a confiança na Colmeia
            </p>
          </div>

          {/* Redirecionamento Automático */}
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-amber-700 text-sm">
              Redirecionando em{' '}
              <span className="font-semibold">{countdown}</span> segundo{countdown !== 1 ? 's' : ''}...
            </p>
          </div>

          {/* Botão de Ação */}
          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Continuar
          </Button>
        </div>

        {/* Ilustração decorativa de abelhinha */}
        <div className="flex justify-center">
          <div className="relative animate-[float_3s_ease-in-out_infinite]">
            <svg
              width="60"
              height="60"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-60"
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

      <style>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
