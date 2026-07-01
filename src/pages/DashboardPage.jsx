import React, { useState } from 'react'
import { 
  TrendingUp, Users, Calendar, CreditCard, MessageSquare, 
  ArrowUpRight, ArrowDownRight, RefreshCw, Clock
} from 'lucide-react'
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, BarChart, Bar
} from 'recharts'

// Mock Data for charts
const salesData = [
  { name: 'Seg', faturamento: 1200, agendamentos: 8 },
  { name: 'Ter', faturamento: 1900, agendamentos: 12 },
  { name: 'Qua', faturamento: 1500, agendamentos: 10 },
  { name: 'Qui', faturamento: 2800, agendamentos: 18 },
  { name: 'Sex', faturamento: 3200, agendamentos: 22 },
  { name: 'Sáb', faturamento: 4100, agendamentos: 28 },
  { name: 'Dom', faturamento: 2300, agendamentos: 15 },
]

const recentActivities = [
  { id: 1, type: 'agendamento', user: 'Maria Silva', details: 'Agendou Sorvete de Chocolate', time: 'Há 5 min', status: 'confirmado' },
  { id: 2, type: 'pagamento', user: 'João Souza', details: 'Pagou R$ 45,00 via Pix', time: 'Há 12 min', status: 'sucesso' },
  { id: 3, type: 'whatsapp', user: 'WhatsApp Bot', details: 'Lead novo detectado: +55 11 99999-8888', time: 'Há 20 min', status: 'info' },
  { id: 4, type: 'atendimento', user: 'Atendente IA', details: 'Respondeu dúvida sobre horário de funcionamento', time: 'Há 30 min', status: 'ia' },
]

const StatCard = ({ icon: Icon, title, value, change, isPositive, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={20} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-gray-800">{value}</span>
      <span className={`text-xs font-semibold flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </span>
    </div>
    <p className="text-xs text-gray-400 mt-1">Comparado ao mesmo período anterior</p>
  </div>
)

const DashboardPage = () => {
  const [period, setPeriod] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Title & Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Painel Principal</h1>
          <p className="text-xs text-gray-500">Veja o resumo do seu negócio em tempo real</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            <option value="today">Hoje</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
          </select>
          <button className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 bg-white transition-colors">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={CreditCard} 
          title="Faturamento Semanal" 
          value="R$ 17.000,00" 
          change="+12.5%" 
          isPositive={true} 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={Calendar} 
          title="Total Agendamentos" 
          value="110" 
          change="+8.3%" 
          isPositive={true} 
          color="bg-green-500" 
        />
        <StatCard 
          icon={Users} 
          title="Novos Leads (WhatsApp)" 
          value="342" 
          change="+24.1%" 
          isPositive={true} 
          color="bg-purple-500" 
        />
        <StatCard 
          icon={MessageSquare} 
          title="Respostas da IA" 
          value="1.240" 
          change="-2.1%" 
          isPositive={false} 
          color="bg-amber-500" 
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Faturamento e Agendamentos */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-sm text-gray-800">Evolução Comercial</h2>
              <p className="text-xs text-gray-400">Faturamento vs Quantidade de agendamentos diários</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> Faturamento
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span> Agendamentos
              </span>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAgendamentos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="faturamento" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorFaturamento)" />
                <Area type="monotone" dataKey="agendamentos" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorAgendamentos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Leads por dia ou Atendimento da IA */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-sm text-gray-800">Canais de Entrada</h2>
              <p className="text-xs text-gray-400">Leads por canal esta semana</p>
            </div>
          </div>
          <div className="h-[280px] flex flex-col justify-between">
            <ResponsiveContainer width="100%" height="70%">
              <BarChart data={[
                { name: 'Whats', value: 240 },
                { name: 'Web', value: 120 },
                { name: 'Insta', value: 85 },
                { name: 'Outro', value: 43 },
              ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>WhatsApp principal</span>
                <span className="font-semibold text-gray-800">54%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '54%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-gray-800">Atividade Recente</h2>
            <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">Ver tudo</button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map(activity => (
              <div key={activity.id} className="py-3 flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-50 text-gray-600 mt-0.5">
                  <Clock size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">{activity.user}</span>
                    <span className="text-[10px] text-gray-400">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status / Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-sm text-gray-800 mb-4">Status da Automação</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
                <span className="text-gray-500">Integração WhatsApp</span>
                <span className="font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Ativa</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
                <span className="text-gray-500">Atendente IA</span>
                <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Online</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Agendamentos Hoje</span>
                <span className="font-semibold text-gray-800">12 agendados</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl mt-6">
            <h3 className="text-xs font-bold text-blue-800 mb-1">Dica de Conversão</h3>
            <p className="text-[11px] text-blue-600 leading-relaxed">
              Sua IA resolveu 78% das dúvidas nas últimas 24 horas. Considere adicionar uma palavra-chave para "Promoção" para aumentar as vendas!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
