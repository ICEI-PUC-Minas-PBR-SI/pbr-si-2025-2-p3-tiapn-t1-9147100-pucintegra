import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CheckCircle2, Hexagon } from 'lucide-react';

interface BookingSuccessProps {
  onBackToListing: () => void;
}

export function BookingSuccess({ onBackToListing }: BookingSuccessProps) {
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
          <div className="inline-flex items-center justify-center mb-6 relative">
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
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400 rounded-full animate-[particle_1.5s_ease-out_forwards]"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-40px)`,
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0,
                  }}
                />
              ))}
            </div>
          </div>

          <h1 className="text-amber-900 mb-3">
            Solicitação enviada com sucesso!
          </h1>
          <p className="text-amber-700/70 mb-6">
            Aguarde a resposta do locador da Colmeia. Você será notificado em breve.
          </p>

          {/* Informação sobre o próximo passo */}
          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
            <p className="text-amber-800 text-sm">
              O locador irá analisar sua solicitação e entrará em contato pelo WhatsApp
              para confirmar e negociar os detalhes do pagamento.
            </p>
          </div>

          {/* Redirecionamento Automático */}
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-amber-700 text-sm">
              Redirecionando para a lista de locais em{' '}
              <span className="font-semibold">{countdown}</span> segundo{countdown !== 1 ? 's' : ''}...
            </p>
          </div>

          {/* Botão de Ação */}
          <Button
            onClick={onBackToListing}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Voltar para lista de locais
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

        @keyframes particle {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation, 0deg)) translateY(0);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation, 0deg)) translateY(-60px);
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
