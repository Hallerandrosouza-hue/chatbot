import React, { useState } from 'react'
import { BarChart3, Download, RefreshCw, Calendar, FileText, CheckCircle, TrendingUp } from 'lucide-react'
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts'

// Mock Data for Reports
const revenueReport = [
  { name: '01/06', faturamento: 1200, custo: 400 },
  { name: '05/06', faturamento: 2400, custo: 800 },
  { name: '10/06', faturamento: 1800, custo: 600 },
  { name: '15/06', faturamento: 3100, custo: 1000 },
  { name: '20/06', faturamento: 4500, custo: 1500 },
  { name: '25/06', faturamento: 3800, custo: 1200 },
]

const categoryShares = [
  { name: 'Sorvetes Premium', value: 4500 },
  { name: 'Açaí', value: 3200 },
  { name: 'Picolés', value: 1800 },
  { name: 'Combos / Planos', value: 2500 }
]

const aiResolutionData = [
  { name: 'Resolvido pela IA', value: 920 },
  { name: 'Transf. p/ Humano', value: 260 }
]

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
const AI_COLORS = ['#3B82F6', '#E5E7EB']

const RelatoriosPage = () => {
  const [loading, setLoading] = useState(false)
  const [exportType, setExportType] = useState(null)
  const [period, setPeriod] = useState('30d')

  const handleExport = (type) => {
    setLoading(true)
    setExportType(type)
    
    setTimeout(() => {
      setLoading(false)
      setExportType(null)
      alert(`Relatório exportado em ${type.toUpperCase()} com sucesso! O download foi iniciado.`)
    }, 1800)
  }

  return (
    <div className="space-y-6">
      
      {/* Title & Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-gray-500 text-sm">Analise métricas avançadas de faturamento, canais de vendas e taxa de resolução da inteligência artificial</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 3 meses</option>
          </select>
          
          <button 
            onClick={() => handleExport('pdf')}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            <Download size={13} />
            {loading && exportType === 'pdf' ? 'Gerando PDF...' : 'Exportar PDF'}
          </button>
          
          <button 
            onClick={() => handleExport('csv')}
            disabled={loading}
            className="border border-gray-200 hover:bg-gray-50 text-gray-600 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 bg-white"
          >
            <FileText size={13} />
            {loading && exportType === 'csv' ? 'Gerando CSV...' : 'Exportar CSV'}
          </button>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main report: line chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-semibold text-sm text-gray-800">Histórico de Fluxo de Caixa</h3>
              <p className="text-xs text-gray-400">Faturamento vs Custos Operacionais</p>
            </div>
            <div className="flex gap-4 text-xs font-medium">
              <span className="flex items-center gap-1 text-gray-600">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> Faturamento
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span> Custos
              </span>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueReport} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="faturamento" stroke="#3B82F6" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="custo" stroke="#EF4444" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category distribution report */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-semibold text-sm text-gray-800">Distribuição por Categoria</h3>
            <p className="text-xs text-gray-400">Porcentagem de vendas por linha de produto</p>
          </div>

          <div className="h-[200px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryShares}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryShares.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center label */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-gray-800">R$ 12k</span>
              <span className="text-[9px] text-gray-400 font-semibold uppercase">Total Geral</span>
            </div>
          </div>

          {/* Legend list */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            {categoryShares.map((share, idx) => (
              <div key={share.name} className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                  {share.name}
                </span>
                <span className="font-semibold text-gray-800">
                  R$ {share.value.toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Bot and Message traffic reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* IA Assistant Performance */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div className="border-b border-gray-100 pb-3 mb-4">
            <h3 className="font-semibold text-sm text-gray-800">Taxa de Resolução do Atendente IA</h3>
            <p className="text-xs text-gray-400">Atendimentos finalizados sem intervenção humana</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 flex items-center justify-center relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aiResolutionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={58}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {aiResolutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={AI_COLORS[index % AI_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-lg font-bold text-gray-800">78%</span>
                <span className="text-[8px] text-green-600 font-bold uppercase">Sucesso</span>
              </div>
            </div>

            <div className="space-y-3 flex-1 w-full">
              <div className="bg-gray-50 border border-gray-150 p-3 rounded-lg">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Total de Conversas IA</p>
                <p className="text-lg font-bold text-gray-800">1.180</p>
              </div>
              <div className="text-[11px] text-gray-500 space-y-1.5">
                <div className="flex justify-between">
                  <span>Resolvidas p/ Bot:</span>
                  <span className="font-bold text-gray-700">920 (78%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Transf. p/ Equipe:</span>
                  <span className="font-bold text-gray-700">260 (22%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead conversion source report */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="border-b border-gray-100 pb-3 mb-4">
            <h3 className="font-semibold text-sm text-gray-800">Conversão de Leads</h3>
            <p className="text-xs text-gray-400">Total de agendamentos fechados por operador</p>
          </div>

          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'IA Bot', valor: 68 },
                { name: 'Juliana', valor: 24 },
                { name: 'Carlos', valor: 18 }
              ]} layout="vertical" margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="valor" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  )
}

export default RelatoriosPage
