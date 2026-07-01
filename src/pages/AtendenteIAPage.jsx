import React, { useState, useEffect } from 'react'
import { Bot, MessageSquare, Zap, Plus, Trash2, CheckCircle, Save } from 'lucide-react'

const AtendenteIAPage = () => {
  const [activeTab, setActiveTab] = useState('gerais')
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // IA Configuration
  const [config, setConfig] = useState({
    nome: 'Atendente IA',
    cargo: 'Suporte & Vendas',
    personalidade: 'Prestativa, amigável, focada em resolver dúvidas sobre sorvetes, sabores, preços e realizar agendamentos rápidos.',
    tomVoz: 'Amigável',
    usarEmojis: true,
    boasVindas: 'Olá! Sou o Atendente IA da Bottgua. 🍦 Como posso ajudar você hoje?'
  })

  // Rules list
  const [rules, setRules] = useState([
    { id: 1, keyword: 'sabor, sabores, cardapio', reply: 'Temos sorvetes premium de Chocolate Belga, Morango Silvestre e Açaí batido na hora! 🍧' },
    { id: 2, keyword: 'preco, preco, quanto custa', reply: 'Nossos preços variam de R$ 7,00 (picolés) a R$ 15,00 (sorvetes de 500ml e açaí).' },
    { id: 3, keyword: 'agendar, horario, agenda', reply: 'Para agendar sua entrega ou retirada, informe o dia e horário que gostaria!' }
  ])

  // New rule state
  const [newRule, setNewRule] = useState({ keyword: '', reply: '' })

  useEffect(() => {
    const savedConfig = localStorage.getItem('bottgua_ia_config')
    const savedRules = localStorage.getItem('bottgua_ia_rules')
    if (savedConfig) setConfig(JSON.parse(savedConfig))
    if (savedRules) setRules(JSON.parse(savedRules))
  }, [])

  const handleSaveConfig = (e) => {
    e.preventDefault()
    localStorage.setItem('bottgua_ia_config', JSON.stringify(config))
    triggerToast('Configurações do Atendente salvas!')
  }

  const handleCreateRule = (e) => {
    e.preventDefault()
    if (!newRule.keyword || !newRule.reply) return

    const id = Date.now()
    const updated = [...rules, { ...newRule, id }]
    setRules(updated)
    localStorage.setItem('bottgua_ia_rules', JSON.stringify(updated))
    setNewRule({ keyword: '', reply: '' })
    triggerToast('Resposta automática adicionada!')
  }

  const handleDeleteRule = (id) => {
    const updated = rules.filter(r => r.id !== id)
    setRules(updated)
    localStorage.setItem('bottgua_ia_rules', JSON.stringify(updated))
    triggerToast('Resposta removida.')
  }

  const triggerToast = (msg) => {
    setSuccessMsg(msg)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {success && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-lg transition-all">
          <CheckCircle size={16} />
          <span className="text-xs font-semibold">{successMsg}</span>
        </div>
      )}

      <div>
        <p className="text-gray-500 text-sm">Configure o comportamento e as respostas automáticas do seu assistente virtual</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button 
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'gerais' ? 'border-blue-500 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('gerais')}
        >
          <Bot size={16} /> Configurações Gerais
        </button>
        <button 
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'respostas' ? 'border-blue-500 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('respostas')}
        >
          <Zap size={16} /> Respostas Automáticas
        </button>
      </div>

      {activeTab === 'gerais' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Formulario */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
              <Bot size={18} className="text-blue-500" />
              <h2 className="font-semibold text-sm font-medium">Configuração do Atendente</h2>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nome do Atendente <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={config.nome}
                  onChange={(e) => setConfig({...config, nome: e.target.value})}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cargo / Função</label>
                <input 
                  type="text" 
                  value={config.cargo}
                  onChange={(e) => setConfig({...config, cargo: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Instruções / Personalidade</label>
                <textarea 
                  rows={3} 
                  value={config.personalidade}
                  onChange={(e) => setConfig({...config, personalidade: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none bg-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tom de Voz</label>
                <select 
                  value={config.tomVoz}
                  onChange={(e) => setConfig({...config, tomVoz: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option>Amigável</option>
                  <option>Profissional</option>
                  <option>Descontraído</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-gray-700">Usar Emojis</span>
                  <p className="text-[10px] text-gray-400">Adiciona emojis amigáveis no fim das frases</p>
                </div>
                <div 
                  className={`w-10 h-5 rounded-full p-0.5 cursor-pointer flex items-center transition-colors ${config.usarEmojis ? 'bg-blue-500 justify-end' : 'bg-gray-200 justify-start'}`}
                  onClick={() => setConfig({...config, usarEmojis: !config.usarEmojis})}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 mt-2">Mensagem de Boas-vindas</label>
                <textarea 
                  rows={2} 
                  value={config.boasVindas}
                  onChange={(e) => setConfig({...config, boasVindas: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none bg-white"
                ></textarea>
              </div>

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button 
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Save size={13} /> Salvar Configurações
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Chat Preview */}
          <div className="bg-[#F8FAFC] rounded-xl border border-gray-200 p-6 flex flex-col h-[520px]">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
              <MessageSquare size={18} className="text-blue-500" />
              <h2 className="font-semibold text-sm">Prévia da Conversa (Simulador)</h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {/* Bot message */}
              <div className="flex flex-col gap-1 items-start max-w-[85%]">
                <span className="text-[9px] font-semibold text-gray-400 ml-1">{config.nome} ({config.cargo})</span>
                <div className="bg-white border border-gray-150 text-gray-800 text-xs px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm">
                  {config.boasVindas}
                </div>
              </div>

              {/* User message */}
              <div className="flex flex-col gap-1 items-end self-end max-w-[85%] ml-auto">
                <div className="bg-blue-500 text-white text-xs px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm border border-blue-650">
                  Olá! Quais são os sabores disponíveis hoje?
                </div>
              </div>

              {/* Bot message */}
              <div className="flex flex-col gap-1 items-start max-w-[85%]">
                <span className="text-[9px] font-semibold text-gray-400 ml-1">{config.nome} ({config.cargo})</span>
                <div className="bg-white border border-gray-150 text-gray-800 text-xs px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm">
                  Temos sorvetes premium de Chocolate Belga, Morango Silvestre e Açaí batido na hora! {config.usarEmojis && '🍧'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-[10px] text-gray-400 text-center bg-white p-2.5 border border-gray-150 rounded-lg">
              Vá no painel de <strong>Conversas</strong> para testar a resposta da IA em tempo real!
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rules list */}
          <div className="bg-white rounded-xl border border-gray-200 p-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] lg:col-span-2 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-800">
                <Zap size={18} className="text-blue-500" />
                <h3 className="font-semibold text-sm">Respostas de Palavras-Chave</h3>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {rules.map(rule => (
                <div key={rule.id} className="p-4 hover:bg-gray-50/50 transition-colors flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold font-mono bg-blue-50 border border-blue-150 text-blue-600 px-2 py-0.5 rounded">
                      Se mensagem contém: "{rule.keyword}"
                    </span>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">{rule.reply}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors shrink-0 p-1 rounded hover:bg-gray-100"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add rule form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-fit">
            <h3 className="font-semibold text-sm text-gray-850 mb-4 flex items-center gap-1.5">
              <Plus size={16} className="text-blue-500" /> Nova Regra de Resposta
            </h3>

            <form onSubmit={handleCreateRule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-650 mb-1">Palavra-Chave (Tratamento) <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newRule.keyword}
                  onChange={(e) => setNewRule({...newRule, keyword: e.target.value})}
                  required
                  placeholder="Ex: preco, valor, quanto"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
                <span className="text-[9px] text-gray-400 mt-1 block">Separe os gatilhos por vírgula</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-650 mb-1">Mensagem de Resposta <span className="text-red-500">*</span></label>
                <textarea 
                  rows={4}
                  value={newRule.reply}
                  onChange={(e) => setNewRule({...newRule, reply: e.target.value})}
                  required
                  placeholder="Olá, nossos preços são..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none bg-white"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg text-xs transition-colors shadow-sm"
              >
                Cadastrar Resposta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AtendenteIAPage

