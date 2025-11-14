import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { PropertyData } from './PropertyForm';
import { AlertCircle, MapPin, Home, DollarSign, FileText, Image } from 'lucide-react';

interface PropertyConfirmationProps {
  propertyData: PropertyData;
  onConfirm: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function PropertyConfirmation({
  propertyData,
  onConfirm,
  onBack,
  isSubmitting = false,
}: PropertyConfirmationProps) {
  const propertyTypeLabels: Record<string, string> = {
    apartamento: 'Apartamento',
    casa: 'Casa',
    kitnet: 'Kitnet',
    studio: 'Studio',
    cobertura: 'Cobertura',
    comercial: 'Comercial',
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-amber-900 mb-2">Confirme os Dados</h1>
          <p className="text-amber-700/70">
            Revise as informações do seu imóvel antes de finalizar
          </p>
        </div>

        {/* Aviso */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm">
            Certifique-se de que todas as informações estão corretas. Você poderá
            editar estes dados posteriormente no painel de controle.
          </p>
        </div>

        {/* Dados do Local */}
        <div className="space-y-4 mb-8">
          {/* Nome do Local */}
          <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-200 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="text-amber-700/70 text-sm mb-1">Nome do Local</p>
                <p className="text-amber-900">{propertyData.name}</p>
              </div>
            </div>
          </Card>

          {/* Endereço */}
          <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-200 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="text-amber-700/70 text-sm mb-1">Endereço</p>
                <p className="text-amber-900">{propertyData.address}</p>
              </div>
            </div>
          </Card>

          {/* Grid de 2 Colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo de Propriedade */}
            <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-200 p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-700/70 text-sm mb-1">Tipo</p>
                  <p className="text-amber-900">
                    {propertyTypeLabels[propertyData.propertyType] || propertyData.propertyType}
                  </p>
                </div>
              </div>
            </Card>

            {/* Valor do Aluguel */}
            <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-200 p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-700/70 text-sm mb-1">Valor do Aluguel</p>
                  <p className="text-amber-900">{propertyData.rentPrice}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Descrição */}
          {propertyData.description && (
            <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-200 p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-700/70 text-sm mb-1">Descrição</p>
                  <p className="text-amber-900 whitespace-pre-wrap">
                    {propertyData.description}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Fotos */}
          {propertyData.photos.length > 0 && (
            <Card className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-200 p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                  <Image className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-700/70 text-sm mb-3">
                    Fotos ({propertyData.photos.length})
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {propertyData.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden border-2 border-amber-200"
                      >
                        <img
                          src={photo}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Voltar
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Salvando...' : 'Concluir'}
          </Button>
        </div>
      </div>
    </div>
  );
}
