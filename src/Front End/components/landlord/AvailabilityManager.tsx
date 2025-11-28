import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Calendar, Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilityManagerProps {
  onBack: () => void;
}

interface BlockedPeriod {
  id: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
}

export function AvailabilityManager({ onBack }: AvailabilityManagerProps) {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedPeriods, setBlockedPeriods] = useState<BlockedPeriod[]>([
    {
      id: '1',
      propertyId: '1',
      startDate: new Date(2025, 11, 10),
      endDate: new Date(2025, 11, 15)
    }
  ]);

  // Mock data de propriedades
  const properties = [
    { id: '1', name: 'Apartamento Centro' },
    { id: '2', name: 'Casa Jardim Europa' },
    { id: '3', name: 'Loft Vila Mariana' },
  ];

  const handleBlockPeriod = () => {
    if (!selectedProperty || !startDate || !endDate) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert('A data inicial deve ser anterior à data final');
      return;
    }

    const newPeriod: BlockedPeriod = {
      id: Date.now().toString(),
      propertyId: selectedProperty,
      startDate: start,
      endDate: end
    };

    setBlockedPeriods([...blockedPeriods, newPeriod]);
    setStartDate('');
    setEndDate('');
  };

  const handleUnblockPeriod = (id: string) => {
    setBlockedPeriods(blockedPeriods.filter(period => period.id !== id));
  };

  // Funções do calendário
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isDateBlocked = (date: Date) => {
    if (!selectedProperty) return false;
    
    return blockedPeriods.some(period => {
      if (period.propertyId !== selectedProperty) return false;
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      const start = new Date(period.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(period.endDate);
      end.setHours(0, 0, 0, 0);
      return checkDate >= start && checkDate <= end;
    });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);
  const filteredBlockedPeriods = selectedProperty 
    ? blockedPeriods.filter(p => p.propertyId === selectedProperty)
    : blockedPeriods;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-amber-700 hover:text-amber-800 hover:bg-amber-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-amber-900 mb-1">Controlar Disponibilidades</h1>
            <p className="text-amber-700/70">Bloqueie ou desbloqueie períodos de seus locais</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Formulário */}
          <div className="space-y-6">
            {/* Seleção de Local */}
            <div>
              <label className="block text-amber-900 mb-2">
                Local <span className="text-amber-600">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Selecione um local</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Data Inicial */}
            <div>
              <label className="block text-amber-900 mb-2">
                Data Inicial <span className="text-amber-600">*</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Data Final */}
            <div>
              <label className="block text-amber-900 mb-2">
                Data Final <span className="text-amber-600">*</span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3">
              <Button
                onClick={handleBlockPeriod}
                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Lock className="w-4 h-4 mr-2" />
                Bloquear Período
              </Button>
            </div>

            {/* Lista de Períodos Bloqueados */}
            <div>
              <h3 className="text-amber-900 mb-3">
                Períodos Bloqueados {selectedPropertyData && `- ${selectedPropertyData.name}`}
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredBlockedPeriods.length === 0 ? (
                  <p className="text-amber-700/70 text-sm text-center py-4">
                    Nenhum período bloqueado
                  </p>
                ) : (
                  filteredBlockedPeriods.map(period => {
                    const property = properties.find(p => p.id === period.propertyId);
                    return (
                      <Card key={period.id} className="bg-amber-50/50 border-amber-200 p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            {!selectedProperty && (
                              <p className="text-amber-900 text-sm mb-1">{property?.name}</p>
                            )}
                            <p className="text-amber-700/70 text-sm">
                              {period.startDate.toLocaleDateString('pt-BR')} até{' '}
                              {period.endDate.toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnblockPeriod(period.id)}
                            className="text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                          >
                            <Unlock className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Coluna Direita - Calendário */}
          <div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
              {/* Header do Calendário */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={previousMonth}
                  className="text-amber-700 hover:text-amber-800 hover:bg-amber-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h3 className="text-amber-900 capitalize">{monthName}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextMonth}
                  className="text-amber-700 hover:text-amber-800 hover:bg-amber-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Dias da Semana */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="text-center text-amber-700/70 text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid de Dias */}
              <div className="grid grid-cols-7 gap-2">
                {/* Espaços vazios antes do primeiro dia */}
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {/* Dias do mês */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const isBlocked = isDateBlocked(date);
                  const isToday = 
                    date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={day}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-sm
                        transition-all duration-200 cursor-pointer
                        ${isBlocked 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-white text-amber-900 hover:bg-amber-100'
                        }
                        ${isToday ? 'ring-2 ring-amber-400' : ''}
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Legenda */}
              <div className="mt-6 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
                  <span className="text-amber-700/70">Bloqueado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white border border-amber-300" />
                  <span className="text-amber-700/70">Disponível</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
