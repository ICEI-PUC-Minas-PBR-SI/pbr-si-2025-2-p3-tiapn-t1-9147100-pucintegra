import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Property } from './PropertyCard';
import { Calendar, Clock, Users, Phone, ArrowLeft } from 'lucide-react';

export interface BookingData {
  propertyId: number;
  propertyName: string;
  date: string;
  startTime: string;
  endTime: string;
  guests: number;
  phone: string;
}

interface BookingFormProps {
  property: Property;
  onSubmit: (data: BookingData) => void;
  onBack: () => void;
}

export function BookingForm({ property, onSubmit, onBack }: BookingFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    guests: 1,
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const maxGuests = 10; // Capacidade máxima padrão

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setFormData({ ...formData, phone: formatted });
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Hora de início é obrigatória';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'Hora de término é obrigatória';
    }

    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'Hora de término deve ser após a hora de início';
    }

    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'Número de convidados é obrigatório';
    }

    if (formData.guests > maxGuests) {
      newErrors.guests = `Número máximo de convidados é ${maxGuests}`;
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone para contato é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 11) {
      newErrors.phone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const bookingData: BookingData = {
        propertyId: property.id,
        propertyName: property.name,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        guests: formData.guests,
        phone: formData.phone,
      };
      onSubmit(bookingData);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-8">
        {/* Botão Voltar */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para listagem
        </button>

        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-amber-900 mb-2">Preencher dados da reserva na Colmeia</h1>
          <p className="text-amber-700/70">Reserve: {property.name}</p>
          <p className="text-amber-600 mt-1">{property.price} / mês</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data da Reserva */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-amber-900">
              Data da Reserva *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className={`pl-10 bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                  errors.date ? 'border-red-400' : ''
                }`}
              />
            </div>
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          {/* Horários */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hora de Início */}
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-amber-900">
                Hora de Início *
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className={`pl-10 bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                    errors.startTime ? 'border-red-400' : ''
                  }`}
                />
              </div>
              {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime}</p>}
            </div>

            {/* Hora de Término */}
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-amber-900">
                Hora de Término *
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className={`pl-10 bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                    errors.endTime ? 'border-red-400' : ''
                  }`}
                />
              </div>
              {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime}</p>}
            </div>
          </div>

          {/* Número de Convidados */}
          <div className="space-y-2">
            <Label htmlFor="guests" className="text-amber-900">
              Número de Convidados *
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <Input
                id="guests"
                type="number"
                min="1"
                max={maxGuests}
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                className={`pl-10 bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                  errors.guests ? 'border-red-400' : ''
                }`}
              />
            </div>
            {errors.guests ? (
              <p className="text-red-500 text-sm">{errors.guests}</p>
            ) : (
              <p className="text-amber-700/70 text-sm">Capacidade máxima: {maxGuests} pessoas</p>
            )}
          </div>

          {/* Telefone para Contato (WhatsApp) */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-amber-900">
              Telefone para Contato (WhatsApp) *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`pl-10 bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                  errors.phone ? 'border-red-400' : ''
                }`}
                placeholder="(11) 98765-4321"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Enviar Solicitação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}