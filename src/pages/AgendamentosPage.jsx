import React, { useState } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

const DayCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer mb-2">
    <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}>
      {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <span className={`text-sm ${checked ? 'text-gray-800' : 'text-gray-500'}`}>{label}</span>
  </label>
)

const RadioOption = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer mb-2">
    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${checked ? 'border-blue-500' : 'border-gray-300'}`}>
      {checked && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
    </div>
    <span className="text-sm text-gray-700">{label}</span>
  </label>
)

const AgendamentosPage = () => {
  const [days, setDays] = useState({
    'Segunda-feira': true,
    'Terça-feira': true,
    'Quarta-feira': true,
    'Quinta-feira': true,
    'Sexta-feira': true,
    'Sábado': false,
    'Domingo': false,
  })
  
  const [active, setActive] = useState(true)
  const [tipo, setTipo] = useState('Entrega e Retirada')

  const toggleDay = (day) => {
    setDays({...days, [day]: !days[day]})
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Configurações */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2 mb-6 text-gray-800">
          <CalendarIcon size={18} />
          <h2 className="font-semibold">Configurações de Agendamento</h2>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-medium text-sm text-gray-800">Ativar Agendamento</div>
            <div className="text-xs text-gray-400">Permitir que clientes agendem horários</div>
          </div>
          <div 
            className={`w-10 h-5 rounded-full p-0.5 cursor-pointer flex items-center transition-colors ${active ? 'bg-blue-500 justify-end' : 'bg-gray-200 justify-start'}`}
            onClick={() => setActive(!active)}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium text-gray-700 mb-3">Dias Disponíveis</div>
          <div className="space-y-1">
            {Object.keys(days).map(day => (
              <DayCheckbox key={day} label={day} checked={days[day]} onChange={() => toggleDay(day)} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Horário de Início</label>
            <input type="time" defaultValue="09:00" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Horário de Término</label>
            <input type="time" defaultValue="18:00" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        <div className="mb-8">
          <div className="text-sm font-medium text-gray-700 mb-3">Tipo de Atendimento</div>
          <RadioOption label="Apenas Entrega" checked={tipo === 'Apenas Entrega'} onChange={() => setTipo('Apenas Entrega')} />
          <RadioOption label="Apenas Retirada" checked={tipo === 'Apenas Retirada'} onChange={() => setTipo('Apenas Retirada')} />
          <RadioOption label="Entrega e Retirada" checked={tipo === 'Entrega e Retirada'} onChange={() => setTipo('Entrega e Retirada')} />
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            Salvar Configurações
          </button>
        </div>
      </div>

      {/* Right Column: Calendário */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-full flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-8">
          <h2 className="font-medium text-gray-800 text-sm">Calendário</h2>
        </div>

        <div className="w-64 border border-gray-100 rounded-xl shadow-sm p-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <button className="text-gray-400 hover:text-gray-700"><ChevronLeft size={16} /></button>
            <span className="text-sm font-medium text-gray-800">June 2026</span>
            <button className="text-gray-400 hover:text-gray-700"><ChevronRight size={16} /></button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-xs text-gray-400 font-medium">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty days */}
            <div className="w-8 h-8 flex items-center justify-center text-xs text-gray-300">31</div>
            
            {/* Days 1-27 for mockup */}
            {[...Array(27)].map((_, i) => (
              <div 
                key={i} 
                className={`w-8 h-8 flex items-center justify-center text-xs rounded-full cursor-pointer
                  ${i+1 === 22 ? 'bg-blue-500 text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                {i+1}
              </div>
            ))}
            
            <div className="w-8 h-8 flex items-center justify-center text-xs text-gray-300">1</div>
            <div className="w-8 h-8 flex items-center justify-center text-xs text-gray-300">2</div>
            <div className="w-8 h-8 flex items-center justify-center text-xs text-gray-300">3</div>
            <div className="w-8 h-8 flex items-center justify-center text-xs text-gray-300">4</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgendamentosPage
