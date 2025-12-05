import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ProfileDropdown } from '../shared/ProfileDropdown';
import { Home, Plus, User, LogOut, Building2, Calendar, DollarSign, Clock, TrendingUp, BarChart3, Settings, Star, MessageSquare } from 'lucide-react';

interface DashboardProps {
  userName: string;
  onCreateProperty: () => void;
  onManageBookings: () => void;
  onManageAvailability: () => void;
  onManagePricing: () => void;
  onViewReports: () => void;
  onViewRatings: () => void;
  onViewPropertyReviews?: () => void;
  onLogout: () => void;
}

export function Dashboard({ 
  userName, 
  onCreateProperty, 
  onManageBookings, 
  onManageAvailability,
  onManagePricing,
  onViewReports,
  onViewRatings,
  onViewPropertyReviews,
  onLogout 
}: DashboardProps) {
  // Mock data para demonstração
  const properties = [
    {
      id: 1,
      name: 'Apartamento Centro',
      address: 'Rua das Flores, 123',
      price: 'R$ 2.500,00',
      status: 'Disponível',
    },
    {
      id: 2,
      name: 'Casa Jardim Europa',
      address: 'Av. Principal, 456',
      price: 'R$ 3.800,00',
      status: 'Ocupado',
    },
  ];

  // KPIs Mock Data
  const kpis = {
    activeProperties: 12,
    pendingBookings: 5,
    monthlyRevenue: 48750.00
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header do Dashboard */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-amber-900 mb-1">Olá, {userName}! 👋</h1>
            <p className="text-amber-700/70">Gerencie seus imóveis e reservas</p>
          </div>
          <ProfileDropdown
            userName={userName}
            userType="locador"
            onLogout={onLogout}
            onViewRatings={onViewRatings}
            onViewReservations={onViewPropertyReviews}
          />
        </div>
      </div>

      {/* KPIs - Indicadores Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total de Locais Ativos */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-700/70 text-sm mb-2">Total de Locais Ativos</p>
              <h2 className="text-blue-900 mb-1">{kpis.activeProperties}</h2>
              <p className="text-blue-600 text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +2 este mês
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Reservas Pendentes */}
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200/50 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-amber-700/70 text-sm mb-2">Reservas Pendentes</p>
              <h2 className="text-amber-900 mb-1">{kpis.pendingBookings}</h2>
              <p className="text-amber-600 text-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Aguardando resposta
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>

        {/* Faturamento do Mês */}
        <Card className="bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-300/50 p-6 hover:shadow-lg transition-all duration-300 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-amber-800/70 text-sm mb-2">Faturamento do Mês</p>
              <h2 className="text-amber-900 mb-1">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(kpis.monthlyRevenue)}
              </h2>
              <p className="text-amber-700 text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +15% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-md">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Módulos de Gerenciamento */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6 mb-6">
        <h2 className="text-amber-900 mb-4">Gerenciamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Controlar Disponibilidades */}
          <Card
            onClick={onManageAvailability}
            className="bg-white border-amber-100 p-5 hover:shadow-md transition-all duration-300 cursor-pointer group hover:border-amber-300"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-amber-900 mb-1">Disponibilidades</h3>
                <p className="text-amber-700/70 text-sm">Controlar datas</p>
              </div>
            </div>
          </Card>

          {/* Gerenciar Preços */}
          <Card
            onClick={onManagePricing}
            className="bg-white border-amber-100 p-5 hover:shadow-md transition-all duration-300 cursor-pointer group hover:border-amber-300"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-amber-900 mb-1">Preços</h3>
                <p className="text-amber-700/70 text-sm">Valores e promoções</p>
              </div>
            </div>
          </Card>

          {/* Aceitar/Recusar Pedidos */}
          <Card
            onClick={onManageBookings}
            className="bg-white border-amber-100 p-5 hover:shadow-md transition-all duration-300 cursor-pointer group hover:border-amber-300"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-amber-900 mb-1">Solicitações</h3>
                <p className="text-amber-700/70 text-sm">Aceitar ou recusar</p>
              </div>
            </div>
          </Card>

          {/* Acessar Relatórios */}
          <Card
            onClick={onViewReports}
            className="bg-white border-amber-100 p-5 hover:shadow-md transition-all duration-300 cursor-pointer group hover:border-amber-300"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-amber-900 mb-1">Relatórios</h3>
                <p className="text-amber-700/70 text-sm">Análises e dados</p>
              </div>
            </div>
          </Card>

          {/* Ver Avaliações */}
          <Card
            onClick={onViewRatings}
            className="bg-white border-amber-100 p-5 hover:shadow-md transition-all duration-300 cursor-pointer group hover:border-amber-300"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-amber-900 mb-1">Avaliações</h3>
                <p className="text-amber-700/70 text-sm">Feedback dos hóspedes</p>
              </div>
            </div>
          </Card>

          {/* Ver Comentários */}
          {onViewPropertyReviews && (
            <Card
              onClick={onViewPropertyReviews}
              className="bg-white border-amber-100 p-5 hover:shadow-md transition-all duration-300 cursor-pointer group hover:border-amber-300"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-amber-900 mb-1">Comentários</h3>
                  <p className="text-amber-700/70 text-sm">Mensagens dos hóspedes</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Seção de Imóveis */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-amber-900 mb-1">Meus Imóveis</h2>
            <p className="text-amber-700/70">Gerencie suas propriedades</p>
          </div>
          <Button
            onClick={onCreateProperty}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Cadastrar Novo Local
          </Button>
        </div>

        {/* Lista de Imóveis */}
        <div className="space-y-4">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-200 p-5 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md">
                    <Home className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-amber-900 mb-1">{property.name}</h3>
                    <p className="text-amber-700/70 text-sm mb-2">{property.address}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-amber-800">{property.price}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          property.status === 'Disponível'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  Ver detalhes
                </Button>
              </div>
            </Card>
          ))}

          {properties.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-amber-900 mb-2">Nenhum imóvel cadastrado</h3>
              <p className="text-amber-700/70 mb-6">
                Comece cadastrando seu primeiro imóvel
              </p>
              <Button
                onClick={onCreateProperty}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Imóvel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}