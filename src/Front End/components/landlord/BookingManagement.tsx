import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Calendar, Clock, Users, Phone, CheckCircle, XCircle, MessageCircle, ArrowLeft } from 'lucide-react';

export interface BookingRequest {
  id: number;
  propertyId: number;
  propertyName: string;
  tenantName: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  guests: number;
  phone: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface BookingManagementProps {
  onBack: () => void;
}

export function BookingManagement({ onBack }: BookingManagementProps) {
  // Mock data de solicitações
  const [bookings, setBookings] = useState<BookingRequest[]>([
    {
      id: 1,
      propertyId: 1,
      propertyName: 'Apartamento Moderno Centro',
      tenantName: 'Maria Silva',
      checkInDate: '2025-12-20',
      checkInTime: '14:00',
      checkOutDate: '2025-12-22',
      checkOutTime: '12:00',
      guests: 4,
      phone: '(11) 98765-4321',
      status: 'pending',
    },
    {
      id: 2,
      propertyId: 2,
      propertyName: 'Casa Luxuosa Jardim Europa',
      tenantName: 'João Santos',
      checkInDate: '2025-12-25',
      checkInTime: '10:00',
      checkOutDate: '2025-12-27',
      checkOutTime: '18:00',
      guests: 8,
      phone: '(11) 91234-5678',
      status: 'accepted',
    },
    {
      id: 3,
      propertyId: 3,
      propertyName: 'Studio Aconchegante Vila Madalena',
      tenantName: 'Ana Costa',
      checkInDate: '2025-12-18',
      checkInTime: '15:00',
      checkOutDate: '2025-12-18',
      checkOutTime: '19:00',
      guests: 2,
      phone: '(11) 99876-5432',
      status: 'rejected',
    },
  ]);

  const handleAccept = (bookingId: number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'accepted' as const } : booking
      )
    );
  };

  const handleReject = (bookingId: number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'rejected' as const } : booking
      )
    );
  };

  const handleWhatsAppNegotiation = (booking: BookingRequest) => {
    const message = encodeURIComponent(
      `Olá ${booking.tenantName}! Sua reserva para ${booking.propertyName} de ${formatDate(booking.checkInDate)} a ${formatDate(booking.checkOutDate)} foi aceita na Colmeia. Vamos negociar os detalhes do pagamento!`
    );
    const whatsappUrl = `https://wa.me/55${booking.phone.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const acceptedBookings = bookings.filter((b) => b.status === 'accepted');
  const rejectedBookings = bookings.filter((b) => b.status === 'rejected');

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6 mb-6">
        {/* Botão Voltar */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel
        </button>

        {/* Cabeçalho */}
        <div>
          <h1 className="text-amber-900 mb-2">Solicitações de Reserva na Colmeia</h1>
          <p className="text-amber-700/70">
            Gerencie as solicitações de reserva dos seus imóveis
          </p>
        </div>
      </div>

      {/* Solicitações Pendentes */}
      {pendingBookings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-amber-900 mb-4">Solicitações Pendentes</h2>
          <div className="space-y-4">
            {pendingBookings.map((booking) => (
              <Card
                key={booking.id}
                className="bg-white/80 backdrop-blur-sm border-amber-200 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Informações da Reserva */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-amber-900 mb-1">{booking.propertyName}</h3>
                      <p className="text-amber-700/70">
                        Solicitação de: <span className="text-amber-900">{booking.tenantName}</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Data */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-amber-700/70 text-sm">Data</p>
                          <p className="text-amber-900">{formatDate(booking.checkInDate)}</p>
                        </div>
                      </div>

                      {/* Horário */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-amber-700/70 text-sm">Horário</p>
                          <p className="text-amber-900">
                            {booking.checkInTime} - {booking.checkOutTime}
                          </p>
                        </div>
                      </div>

                      {/* Convidados */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-amber-700/70 text-sm">Convidados</p>
                          <p className="text-amber-900">{booking.guests} pessoa{booking.guests > 1 ? 's' : ''}</p>
                        </div>
                      </div>

                      {/* Telefone */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-amber-700/70 text-sm">Contato</p>
                          <p className="text-amber-900">{booking.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex md:flex-col gap-3 min-w-[200px]">
                    <Button
                      onClick={() => handleAccept(booking.id)}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aceitar
                    </Button>
                    <Button
                      onClick={() => handleReject(booking.id)}
                      variant="outline"
                      className="flex-1 border-red-300 text-red-700 hover:bg-red-50 rounded-xl"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Solicitações Aceitas */}
      {acceptedBookings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-amber-900 mb-4">Solicitações Aceitas</h2>
          <div className="space-y-4">
            {acceptedBookings.map((booking) => (
              <Card
                key={booking.id}
                className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-green-200 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Informações da Reserva */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-amber-900 mb-1">{booking.propertyName}</h3>
                        <p className="text-amber-700/70">
                          Reserva de: <span className="text-amber-900">{booking.tenantName}</span>
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Aceita
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Data */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-amber-700/70 text-sm">Data</p>
                          <p className="text-amber-900">{formatDate(booking.checkInDate)}</p>
                        </div>
                      </div>

                      {/* Horário */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-amber-700/70 text-sm">Horário</p>
                          <p className="text-amber-900">
                            {booking.checkInTime} - {booking.checkOutTime}
                          </p>
                        </div>
                      </div>

                      {/* Convidados */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-amber-700/70 text-sm">Convidados</p>
                          <p className="text-amber-900">{booking.guests} pessoa{booking.guests > 1 ? 's' : ''}</p>
                        </div>
                      </div>

                      {/* Telefone */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-amber-700/70 text-sm">Contato</p>
                          <p className="text-amber-900">{booking.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ação de Negociação WhatsApp */}
                  <div className="min-w-[200px]">
                    <Button
                      onClick={() => handleWhatsAppNegotiation(booking)}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Negociar via WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Solicitações Rejeitadas */}
      {rejectedBookings.length > 0 && (
        <div>
          <h2 className="text-amber-900 mb-4">Solicitações Rejeitadas</h2>
          <div className="space-y-4">
            {rejectedBookings.map((booking) => (
              <Card
                key={booking.id}
                className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 p-6 opacity-75"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Informações da Reserva */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-gray-700 mb-1">{booking.propertyName}</h3>
                        <p className="text-gray-600">
                          Solicitação de: <span className="text-gray-800">{booking.tenantName}</span>
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Rejeitada
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Data */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Data</p>
                          <p className="text-gray-700">{formatDate(booking.checkInDate)}</p>
                        </div>
                      </div>

                      {/* Horário */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Horário</p>
                          <p className="text-gray-700">
                            {booking.checkInTime} - {booking.checkOutTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mensagem de Recusa */}
                  <div className="min-w-[200px] flex items-center justify-center">
                    <p className="text-gray-600 text-sm text-center">
                      Mensagem de recusa enviada
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {bookings.length === 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-amber-900 mb-3">Nenhuma solicitação de reserva</h2>
          <p className="text-amber-700/70">
            Quando você receber solicitações de reserva, elas aparecerão aqui.
          </p>
        </div>
      )}
    </div>
  );
}