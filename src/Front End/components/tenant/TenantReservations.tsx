import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Calendar, MapPin, Star, CheckCircle, Clock } from 'lucide-react';

export interface CompletedReservation {
  id: number;
  propertyId: number;
  propertyName: string;
  propertyAddress: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'completed' | 'rated';
  rating?: number;
}

interface TenantReservationsProps {
  userName: string;
  onBack: () => void;
  onRateProperty: (reservation: CompletedReservation) => void;
}

export function TenantReservations({ userName, onBack, onRateProperty }: TenantReservationsProps) {
  const [reservations] = useState<CompletedReservation[]>([
    {
      id: 1,
      propertyId: 1,
      propertyName: 'Apartamento Moderno Centro',
      propertyAddress: 'Rua Augusta, 1234 - São Paulo, SP',
      checkInDate: '2025-11-15',
      checkOutDate: '2025-11-17',
      status: 'completed'
    },
    {
      id: 2,
      propertyId: 2,
      propertyName: 'Casa Luxuosa Jardim Europa',
      propertyAddress: 'Av. Europa, 456 - São Paulo, SP',
      checkInDate: '2025-11-01',
      checkOutDate: '2025-11-03',
      status: 'rated',
      rating: 10
    },
    {
      id: 3,
      propertyId: 3,
      propertyName: 'Studio Aconchegante Vila Madalena',
      propertyAddress: 'Rua Harmonia, 789 - São Paulo, SP',
      checkInDate: '2025-10-20',
      checkOutDate: '2025-10-22',
      status: 'completed'
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const completedReservations = reservations.filter(r => r.status === 'completed');
  const ratedReservations = reservations.filter(r => r.status === 'rated');

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-xl p-6 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel
        </button>
        <div>
          <h1 className="text-amber-900 mb-2">Minhas Reservas na Colmeia</h1>
          <p className="text-amber-700/70">Gerencie suas reservas e avalie suas experiências</p>
        </div>
      </Card>

      {/* Reservas Concluídas - Prontas para Avaliar */}
      {completedReservations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-amber-900 mb-4">Prontas para Avaliar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedReservations.map((reservation) => (
              <Card
                key={reservation.id}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Concluída
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full text-sm flex items-center gap-2 animate-pulse">
                      <Star className="w-4 h-4" />
                      Avaliar
                    </span>
                  </div>

                  {/* Nome do Local */}
                  <h3 className="text-amber-900 mb-2">{reservation.propertyName}</h3>

                  {/* Endereço */}
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-amber-700/70 text-sm">{reservation.propertyAddress}</p>
                  </div>

                  {/* Período da Reserva */}
                  <div className="flex items-center gap-2 mb-6 text-amber-700/70 text-sm">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>
                      {formatDate(reservation.checkInDate)} - {formatDate(reservation.checkOutDate)}
                    </span>
                  </div>

                  {/* Botão de Avaliação */}
                  <Button
                    onClick={() => onRateProperty(reservation)}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-auto"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Avaliar Experiência
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Reservas Já Avaliadas */}
      {ratedReservations.length > 0 && (
        <div>
          <h2 className="text-amber-900 mb-4">Avaliações Enviadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ratedReservations.map((reservation) => (
              <Card
                key={reservation.id}
                className="bg-white/80 border-green-200 p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col h-full">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Avaliada
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= (reservation.rating || 0) / 2
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-amber-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Nome do Local */}
                  <h3 className="text-amber-900 mb-2">{reservation.propertyName}</h3>

                  {/* Endereço */}
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-amber-700/70 text-sm">{reservation.propertyAddress}</p>
                  </div>

                  {/* Período da Reserva */}
                  <div className="flex items-center gap-2 text-amber-700/70 text-sm">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>
                      {formatDate(reservation.checkInDate)} - {formatDate(reservation.checkOutDate)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Estado Vazio */}
      {reservations.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-amber-900 mb-3">Nenhuma reserva concluída</h2>
          <p className="text-amber-700/70">
            Suas reservas concluídas aparecerão aqui para você avaliar sua experiência.
          </p>
        </Card>
      )}
    </div>
  );
}
