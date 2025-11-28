import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { X, Star, Hexagon, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, description: string) => void;
  targetName: string;
  type: 'property' | 'tenant';
}

export function RatingModal({ isOpen, onClose, onSubmit, targetName, type }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      setError('Por favor, selecione uma avaliação');
      return;
    }

    if (description.trim().length < 10) {
      setError('Por favor, escreva uma descrição mais detalhada (mínimo 10 caracteres)');
      return;
    }

    onSubmit(rating, description);
    handleClose();
  };

  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setDescription('');
    setError('');
    onClose();
  };

  const getRatingLabel = (value: number) => {
    if (value <= 2) return 'Muito Ruim';
    if (value <= 4) return 'Ruim';
    if (value <= 6) return 'Regular';
    if (value <= 8) return 'Bom';
    if (value <= 9) return 'Muito Bom';
    return 'Excepcional';
  };

  const getRatingColor = (value: number) => {
    if (value <= 4) return 'text-red-600';
    if (value <= 6) return 'text-orange-600';
    if (value <= 8) return 'text-amber-600';
    return 'text-amber-500';
  };

  if (!isOpen) return null;

  const currentRating = hoveredRating || rating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/95 backdrop-blur-sm border-amber-200 shadow-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Textura de fundo hexagonal */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23f59e0b' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Conteúdo */}
          <div className="relative">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-amber-900 mb-2">
                  {type === 'property' ? 'Avalie sua experiência na Colmeia' : `Avalie o Locatário`}
                </h2>
                <p className="text-amber-700/70">
                  {type === 'property' 
                    ? `Como foi sua estadia em ${targetName}?`
                    : `Como foi a experiência com ${targetName}?`
                  }
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg p-2 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sistema de Avaliação com Estrelas Hexagonais */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <label className="text-amber-900">
                  Experiência Geral (Nota 1 a 10)
                </label>
              </div>

              {/* Estrelas Hexagonais */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {[1, 2, 3, 4, 5].map((star) => {
                  const starValue = star * 2; // Cada estrela vale 2 pontos
                  const isHalfFilled = currentRating === starValue - 1;
                  const isFilled = currentRating >= starValue;

                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(starValue)}
                      className="relative group transition-transform duration-200 hover:scale-110 focus:outline-none"
                    >
                      {/* Hexágono de fundo */}
                      <Hexagon
                        className={`w-16 h-16 transition-all duration-200 ${
                          isFilled || isHalfFilled
                            ? 'fill-amber-400 text-amber-500'
                            : 'fill-amber-100 text-amber-200 group-hover:fill-amber-200 group-hover:text-amber-300'
                        }`}
                      />
                      {/* Estrela sobreposta */}
                      <Star
                        className={`w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                          isFilled || isHalfFilled
                            ? 'fill-white text-white'
                            : 'text-amber-400 group-hover:text-amber-500'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Seletor de Nota Intermediária */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                      rating === value
                        ? 'bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-md scale-110'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              {/* Label da Avaliação */}
              {currentRating > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className={`text-lg ${getRatingColor(currentRating)}`}>
                    {getRatingLabel(currentRating)} ({currentRating}/10)
                  </p>
                </motion.div>
              )}
            </div>

            {/* Campo de Descrição */}
            <div className="mb-6">
              <label className="block text-amber-900 mb-2">
                Descrição <span className="text-amber-600">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError('');
                }}
                placeholder={
                  type === 'property'
                    ? 'Conte-nos sobre sua experiência: o local estava limpo? A localização era boa? O anfitrião foi atencioso?'
                    : 'Como o locatário cuidou do seu imóvel? O local foi devolvido em boas condições?'
                }
                maxLength={5000}
                rows={5}
                className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl text-amber-900 placeholder:text-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-amber-700/70 text-sm">
                  Mínimo 10 caracteres
                </p>
                <p className="text-amber-700/70 text-sm">
                  {description.length}/5000
                </p>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Botões */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Star className="w-4 h-4 mr-2" />
                Enviar Avaliação
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
