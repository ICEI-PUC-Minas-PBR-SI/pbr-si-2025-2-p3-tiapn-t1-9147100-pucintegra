import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, BarChart3, Download, Calendar, DollarSign, TrendingUp, Home } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ReportsManagerProps {
  onBack: () => void;
}

type ReportType = 'revenue' | 'occupancy';

export function ReportsManager({ onBack }: ReportsManagerProps) {
  const [reportType, setReportType] = useState<ReportType>('revenue');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');

  // Mock data para faturamento
  const revenueData = [
    { month: 'Jan', value: 45000, bookings: 18 },
    { month: 'Fev', value: 42000, bookings: 16 },
    { month: 'Mar', value: 48000, bookings: 19 },
    { month: 'Abr', value: 51000, bookings: 21 },
    { month: 'Mai', value: 49000, bookings: 20 },
    { month: 'Jun', value: 53000, bookings: 22 },
    { month: 'Jul', value: 55000, bookings: 23 },
    { month: 'Ago', value: 52000, bookings: 21 },
    { month: 'Set', value: 50000, bookings: 20 },
    { month: 'Out', value: 54000, bookings: 22 },
    { month: 'Nov', value: 48750, bookings: 20 },
    { month: 'Dez', value: 0, bookings: 0 },
  ];

  // Mock data para ocupação
  const occupancyData = [
    { month: 'Jan', occupied: 85, available: 15 },
    { month: 'Fev', occupied: 78, available: 22 },
    { month: 'Mar', occupied: 88, available: 12 },
    { month: 'Abr', occupied: 92, available: 8 },
    { month: 'Mai', occupied: 87, available: 13 },
    { month: 'Jun', occupied: 90, available: 10 },
    { month: 'Jul', occupied: 95, available: 5 },
    { month: 'Ago', occupied: 91, available: 9 },
    { month: 'Set', occupied: 86, available: 14 },
    { month: 'Out', occupied: 93, available: 7 },
    { month: 'Nov', occupied: 84, available: 16 },
    { month: 'Dez', occupied: 0, available: 0 },
  ];

  const handleGenerateReport = () => {
    console.log('Generating report:', { reportType, startDate, endDate });
    alert('Relatório gerado com sucesso!');
  };

  const handleExportReport = () => {
    console.log('Exporting report');
    alert('Relatório exportado para CSV!');
  };

  // Calcular estatísticas
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
  const totalBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0);
  const avgOccupancy = occupancyData.reduce((sum, item) => sum + item.occupied, 0) / occupancyData.filter(d => d.occupied > 0).length;
  const avgRevenue = totalRevenue / revenueData.filter(d => d.value > 0).length;

  return (
    <div className="w-full max-w-6xl mx-auto">
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
          <div className="flex-1">
            <h1 className="text-amber-900 mb-1">Acessar Relatórios</h1>
            <p className="text-amber-700/70">Análise de desempenho e dados financeiros</p>
          </div>
          <Button
            onClick={handleExportReport}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        {/* Filtros */}
        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Período */}
            <div className="md:col-span-2">
              <label className="block text-amber-900 mb-2 text-sm">Período</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 text-sm"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 bg-white border border-amber-200 rounded-xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Tipo de Relatório */}
            <div className="md:col-span-2">
              <label className="block text-amber-900 mb-2 text-sm">Tipo de Relatório</label>
              <div className="flex gap-2">
                <Button
                  variant={reportType === 'revenue' ? 'default' : 'outline'}
                  onClick={() => setReportType('revenue')}
                  className={`flex-1 ${
                    reportType === 'revenue'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
                      : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Faturamento
                </Button>
                <Button
                  variant={reportType === 'occupancy' ? 'default' : 'outline'}
                  onClick={() => setReportType('occupancy')}
                  className={`flex-1 ${
                    reportType === 'occupancy'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
                      : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ocupação
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-amber-700/70 text-sm mb-1">Faturamento Total</p>
                <p className="text-amber-900">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-700/70 text-sm mb-1">Total Reservas</p>
                <p className="text-blue-900">{totalBookings}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-green-700/70 text-sm mb-1">Taxa Ocupação Média</p>
                <p className="text-green-900">{avgOccupancy.toFixed(1)}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-purple-700/70 text-sm mb-1">Faturamento Médio</p>
                <p className="text-purple-900">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(avgRevenue)}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-amber-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-600" />
              {reportType === 'revenue' ? 'Faturamento Mensal' : 'Taxa de Ocupação'}
            </h2>
            <Button
              onClick={handleGenerateReport}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Gerar Relatório
            </Button>
          </div>

          {reportType === 'revenue' ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f59e0b" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  stroke="#d97706"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#d97706"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #fbbf24',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value),
                    'Faturamento'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Faturamento"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f59e0b" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  stroke="#d97706"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#d97706"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #fbbf24',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Legend />
                <Bar 
                  dataKey="occupied" 
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]}
                  name="Ocupado"
                />
                <Bar 
                  dataKey="available" 
                  fill="#f59e0b" 
                  radius={[8, 8, 0, 0]}
                  name="Disponível"
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* Insights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white border-amber-200 p-4">
              <h3 className="text-amber-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Melhor Mês
              </h3>
              <p className="text-amber-700/70 text-sm">
                {reportType === 'revenue' 
                  ? 'Julho - R$ 55.000,00 (23 reservas)'
                  : 'Julho - 95% de ocupação'
                }
              </p>
            </Card>

            <Card className="bg-white border-amber-200 p-4">
              <h3 className="text-amber-900 mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                Tendência
              </h3>
              <p className="text-amber-700/70 text-sm">
                {reportType === 'revenue'
                  ? 'Crescimento constante de 8-12% ao mês'
                  : 'Taxa média de 88% de ocupação'
                }
              </p>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
