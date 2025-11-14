import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Home, Plus, User, LogOut, Building2, Calendar } from 'lucide-react';

interface DashboardProps {
  userName: string;
  onCreateProperty: () => void;
  onManageBookings: () => void;
  onLogout: () => void;
}

export function Dashboard({ userName, onCreateProperty, onManageBookings, onLogout }: DashboardProps) {
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

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header do Dashboard */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-amber-900 mb-1">Olá, {userName}! 👋</h1>
            <p className="text-amber-700/70">Gerencie seus imóveis e reservas</p>
          </div>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-amber-700 hover:text-amber-800 hover:bg-amber-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Menu de Navegação */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
              <Building2 className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-amber-900">Meus Locais</h3>
              <p className="text-amber-700/70 text-sm">2 imóveis</p>
            </div>
          </div>
        </Card>

        <Card
          onClick={onManageBookings}
          className="bg-white/80 backdrop-blur-sm border-amber-100 p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-amber-900">Reservas</h3>
              <p className="text-amber-700/70 text-sm">3 solicitações</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
              <User className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-amber-900">Perfil</h3>
              <p className="text-amber-700/70 text-sm">Configurações</p>
            </div>
          </div>
        </Card>
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