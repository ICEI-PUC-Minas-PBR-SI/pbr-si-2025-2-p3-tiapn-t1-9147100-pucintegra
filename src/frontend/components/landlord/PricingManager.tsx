import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, DollarSign, Tag, Percent, Calendar, Save, TrendingUp } from 'lucide-react';

interface PricingManagerProps {
  onBack: () => void;
}

interface Promotion {
  id: string;
  propertyId: string;
  propertyName: string;
  basePrice: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  finalPrice: number;
}

export function PricingManager({ onBack }: PricingManagerProps) {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      propertyId: '1',
      propertyName: 'Apartamento Centro',
      basePrice: 2500,
      discountType: 'percentage',
      discountValue: 10,
      startDate: '2025-12-01',
      endDate: '2025-12-31',
      finalPrice: 2250
    }
  ]);

  // Mock data de propriedades
  const properties = [
    { id: '1', name: 'Apartamento Centro', currentPrice: 2500 },
    { id: '2', name: 'Casa Jardim Europa', currentPrice: 3800 },
    { id: '3', name: 'Loft Vila Mariana', currentPrice: 1800 },
  ];

  const calculateFinalPrice = () => {
    const base = parseFloat(basePrice) || 0;
    const discount = parseFloat(discountValue) || 0;

    if (discountType === 'percentage') {
      return base - (base * discount / 100);
    } else {
      return base - discount;
    }
  };

  const handleSavePromotion = () => {
    if (!selectedProperty || !basePrice || !startDate || !endDate) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const property = properties.find(p => p.id === selectedProperty);
    if (!property) return;

    const finalPrice = calculateFinalPrice();
    
    const newPromotion: Promotion = {
      id: Date.now().toString(),
      propertyId: selectedProperty,
      propertyName: property.name,
      basePrice: parseFloat(basePrice),
      discountType,
      discountValue: parseFloat(discountValue) || 0,
      startDate,
      endDate,
      finalPrice
    };

    setPromotions([...promotions, newPromotion]);
    
    // Reset form
    setSelectedProperty('');
    setBasePrice('');
    setDiscountValue('');
    setStartDate('');
    setEndDate('');
  };

  const handleRemovePromotion = (id: string) => {
    setPromotions(promotions.filter(promo => promo.id !== id));
  };

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);
  const finalPrice = calculateFinalPrice();

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
            <h1 className="text-amber-900 mb-1">Gerenciar Preços e Promoções</h1>
            <p className="text-amber-700/70">Configure valores base e crie promoções especiais</p>
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
                  onChange={(e) => {
                    setSelectedProperty(e.target.value);
                    const property = properties.find(p => p.id === e.target.value);
                    if (property) {
                      setBasePrice(property.currentPrice.toString());
                    }
                  }}
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Selecione um local</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name} - R$ {property.currentPrice.toLocaleString('pt-BR')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Valor Base */}
            <div>
              <label className="block text-amber-900 mb-2">
                Valor Base do Aluguel <span className="text-amber-600">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  placeholder="0,00"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <p className="text-amber-700/70 text-sm mt-1">
                Preço padrão por período de locação
              </p>
            </div>

            {/* Seção de Promoção */}
            <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-amber-600" />
                <h3 className="text-amber-900">Criar Promoção (Opcional)</h3>
              </div>

              {/* Tipo de Desconto */}
              <div className="mb-4">
                <label className="block text-amber-900 mb-2 text-sm">Tipo de Desconto</label>
                <div className="flex gap-2">
                  <Button
                    variant={discountType === 'percentage' ? 'default' : 'outline'}
                    onClick={() => setDiscountType('percentage')}
                    className={`flex-1 ${
                      discountType === 'percentage'
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
                        : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    <Percent className="w-4 h-4 mr-2" />
                    Percentual
                  </Button>
                  <Button
                    variant={discountType === 'fixed' ? 'default' : 'outline'}
                    onClick={() => setDiscountType('fixed')}
                    className={`flex-1 ${
                      discountType === 'fixed'
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
                        : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Valor Fixo
                  </Button>
                </div>
              </div>

              {/* Valor do Desconto */}
              <div className="mb-4">
                <label className="block text-amber-900 mb-2 text-sm">
                  Desconto ({discountType === 'percentage' ? '%' : 'R$'})
                </label>
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-2 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Período da Promoção */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-900 mb-2 text-sm">Data Início</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-amber-900 mb-2 text-sm">Data Fim</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Preview do Preço */}
            {basePrice && parseFloat(basePrice) > 0 && (
              <Card className="bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-300 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-amber-800 text-sm">Preço Base:</span>
                  <span className="text-amber-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(basePrice))}
                  </span>
                </div>
                {discountValue && parseFloat(discountValue) > 0 && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-800 text-sm">Desconto:</span>
                      <span className="text-amber-700">
                        - {discountType === 'percentage' 
                          ? `${discountValue}%` 
                          : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(discountValue))
                        }
                      </span>
                    </div>
                    <div className="border-t border-amber-300 pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-900">Preço Final:</span>
                        <span className="text-amber-900">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(finalPrice)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            )}

            {/* Botão Salvar */}
            <Button
              onClick={handleSavePromotion}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>

          {/* Coluna Direita - Promoções Ativas */}
          <div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-amber-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                Promoções Ativas
              </h3>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {promotions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                      <Tag className="w-8 h-8 text-amber-400" />
                    </div>
                    <p className="text-amber-700/70">Nenhuma promoção ativa</p>
                  </div>
                ) : (
                  promotions.map(promo => (
                    <Card key={promo.id} className="bg-white border-amber-200 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-amber-900">{promo.propertyName}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemovePromotion(promo.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 -mt-2 -mr-2"
                        >
                          Remover
                        </Button>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-amber-700/70">Preço Base:</span>
                          <span className="text-amber-900">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(promo.basePrice)}
                          </span>
                        </div>
                        
                        {promo.discountValue > 0 && (
                          <div className="flex justify-between">
                            <span className="text-amber-700/70">Desconto:</span>
                            <span className="text-amber-700">
                              {promo.discountType === 'percentage' 
                                ? `${promo.discountValue}%` 
                                : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(promo.discountValue)
                              }
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between border-t border-amber-200 pt-2">
                          <span className="text-amber-900">Preço Final:</span>
                          <span className="text-amber-900">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(promo.finalPrice)}
                          </span>
                        </div>
                        
                        {promo.startDate && promo.endDate && (
                          <div className="flex items-center gap-2 text-amber-700/70 pt-2 border-t border-amber-200">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(promo.startDate).toLocaleDateString('pt-BR')} até{' '}
                              {new Date(promo.endDate).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
