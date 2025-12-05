import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Property } from './PropertyCard';
import { Calendar, Clock, Users, Phone, ArrowLeft } from 'lucide-react';

export interface BookingData {
  propertyId: number;
  propertyName: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
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
    checkInDate: '',
    checkInTime: '',
    checkOutDate: '',
    checkOutTime: '',
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

    // Validação Data de Entrada
    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Data de entrada é obrigatória';
    }

    // Validação Hora de Entrada
    if (!formData.checkInTime) {
      newErrors.checkInTime = 'Hora de entrada é obrigatória';
    }

    // Validação Data de Saída
    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Data de saída é obrigatória';
    } else if (formData.checkInDate && formData.checkOutDate < formData.checkInDate) {
      newErrors.checkOutDate = 'Data de saída deve ser igual ou posterior à data de entrada';
    }

    // Validação Hora de Saída
    if (!formData.checkOutTime) {
      newErrors.checkOutTime = 'Hora de saída é obrigatória';
    }

    // Validação de horário no mesmo dia
    if (formData.checkInDate && formData.checkOutDate && 
        formData.checkInDate === formData.checkOutDate &&
        formData.checkInTime && formData.checkOutTime &&
        formData.checkInTime >= formData.checkOutTime) {
      newErrors.checkOutTime = 'Hora de saída deve ser após a hora de entrada';
    }

    // Validação de convidados
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'Número de convidados é obrigatório';
    }

    if (formData.guests > maxGuests) {
      newErrors.guests = `Número máximo de convidados é ${maxGuests}`;
    }

    // Validação de telefone
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
        checkInDate: formData.checkInDate,
        checkInTime: formData.checkInTime,
        checkOutDate: formData.checkOutDate,
        checkOutTime: formData.checkOutTime,
        guests: formData.guests,
        phone: formData.phone,
      };
      onSubmit(bookingData);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
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
          {/* Seção: Entrada da Reserva */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-200">
            <h3 className="text-amber-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              Entrada da Reserva
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Data de Entrada */}
              <div className="space-y-2">
                <Label htmlFor="checkInDate" className="text-amber-900">
                  Data de Entrada *
                </Label>
                <Input
                  id="checkInDate"
                  type="date"
                  value={formData.checkInDate}
                  onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className={`bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                    errors.checkInDate ? 'border-red-400' : ''
                  }`}
                />
                {errors.checkInDate && <p className="text-red-500 text-sm">{errors.checkInDate}</p>}
              </div>

              {/* Hora de Entrada */}
              <div className="space-y-2">
                <Label htmlFor="checkInTime" className="text-amber-900">
                  Hora de Entrada *
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                  <Input
                    id="checkInTime"
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
                    className={`pl-10 bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                      errors.checkInTime ? 'border-red-400' : ''
                    }`}
                  />
                </div>
                {errors.checkInTime && <p className="text-red-500 text-sm">{errors.checkInTime}</p>}
              </div>
            </div>
          </div>

          {/* Seção: Saída da Reserva */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
            <h3 className="text-blue-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Saída da Reserva
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Data de Saída */}
              <div className="space-y-2">
                <Label htmlFor="checkOutDate" className="text-blue-900">
                  Data de Saída *
                </Label>
                <Input
                  id="checkOutDate"
                  type="date"
                  value={formData.checkOutDate}
                  onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                  min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                  className={`bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl ${
                    errors.checkOutDate ? 'border-red-400' : ''
                  }`}
                />
                {errors.checkOutDate && <p className="text-red-500 text-sm">{errors.checkOutDate}</p>}
              </div>

              {/* Hora de Saída */}
              <div className="space-y-2">
                <Label htmlFor="checkOutTime" className="text-blue-900">
                  Hora de Saída *
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <Input
                    id="checkOutTime"
                    type="time"
                    value={formData.checkOutTime}
                    onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
                    className={`pl-10 bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl ${
                      errors.checkOutTime ? 'border-red-400' : ''
                    }`}
                  />
                </div>
                {errors.checkOutTime && <p className="text-red-500 text-sm">{errors.checkOutTime}</p>}
              </div>
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