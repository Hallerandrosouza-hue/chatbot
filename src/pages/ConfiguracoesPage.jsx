import React, { useState, useEffect } from 'react'
import { Settings, Save, CheckCircle, Bell, Globe, Shield, RefreshCw, Mail } from 'lucide-react'

const Toggle = ({ label, desc, checked, onChange }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50">
    <div className="space-y-0.5">
      <span className="text-xs font-semibold text-gray-700">{label}</span>
      <p className="text-[10px] text-gray-400 max-w-[400px]">{desc}</p>
    </div>
    
    <div 
      className={`w-10 h-5 rounded-full p-0.5 cursor-pointer flex items-center transition-colors shrink-0 ${checked ? 'bg-blue-500 justify-end' : 'bg-gray-200 justify-start'}`}
      onClick={onChange}
    >
      <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
    </div>
  </div>
)

const ConfiguracoesPage = () => {
  const [success, setSuccess] = useState(false)
  const [config, setConfig] = useState({
    idioma: 'Português (BR)',
    fusoHorario: 'GMT-3 (São Paulo)',
    notificacoesSom: true,
    notificacoesNavegador: true,
    emailAlerts: false,
    autoBackup: true,
    envioImediato: true,
    limpezaCache: '30d'
  })

  useEffect(() => {
    const saved = localStorage.getItem('bottgua_system_settings')
    if (saved) {
      try {
        setConfig(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const handleToggle = (key) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setConfig(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('bottgua_system_settings', JSON.stringify(config))
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <p className="text-gray-500 text-sm">Configure as preferências operacionais de notificações, fuso horário, idioma e rotinas automáticas de backup do sistema</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Localization & Region */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 mb-6 text-gray-800 border-b border-gray-100 pb-3">
            <Globe size={18} className="text-blue-500" />
            <h2 className="font-semibold text-sm">Idioma e Região</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Idioma Padrão</label>
              <select 
                name="idioma"
                value={config.idioma}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option>Português (BR)</option>
                <option>English (US)</option>
                <option>Español (ES)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Fuso Horário</label>
              <select 
                name="fusoHorario"
                value={config.fusoHorario}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option>GMT-3 (São Paulo)</option>
                <option>GMT-4 (Manaus)</option>
                <option>GMT-5 (Acre)</option>
                <option>GMT+0 (Londres)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications and sound preferences */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 mb-6 text-gray-800 border-b border-gray-100 pb-3">
            <Bell size={18} className="text-blue-500" />
            <h2 className="font-semibold text-sm">Alertas e Notificações</h2>
          </div>

          <div className="space-y-1">
            <Toggle 
              label="Notificações Sonoras" 
              desc="Tocar um sinal sonoro leve toda vez que um cliente enviar uma nova mensagem ou realizar um agendamento."
              checked={config.notificacoesSom} 
              onChange={() => handleToggle('notificacoesSom')}
            />
            <Toggle 
              label="Notificações no Navegador" 
              desc="Exibir balões de alerta no canto da tela do seu computador quando houver mensagens pendentes de atendimento."
              checked={config.notificacoesNavegador} 
              onChange={() => handleToggle('notificacoesNavegador')}
            />
            <Toggle 
              label="E-mails diários de faturamento" 
              desc="Receber um resumo por e-mail todas as noites detalhando o total de agendamentos e faturamento das últimas 24 horas."
              checked={config.emailAlerts} 
              onChange={() => handleToggle('emailAlerts')}
            />
          </div>
        </div>

        {/* Security & Backup settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 mb-6 text-gray-800 border-b border-gray-100 pb-3">
            <Shield size={18} className="text-blue-500" />
            <h2 className="font-semibold text-sm">Segurança e Manutenção</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Toggle 
                label="Backup Automático" 
                desc="Gerar backups automáticos dos produtos, agendamentos e configurações a cada 7 dias."
                checked={config.autoBackup} 
                onChange={() => handleToggle('autoBackup')}
              />
              <Toggle 
                label="Envio Imediato das Mensagens" 
                desc="Desativar atraso de digitação humana simulada e enviar mensagens do Bot imediatamente."
                checked={config.envioImediato} 
                onChange={() => handleToggle('envioImediato')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-50">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Intervalo de Limpeza do Histórico (WhatsApp)</label>
                <select 
                  name="limpezaCache"
                  value={config.limpezaCache}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="30d">Manter últimos 30 dias</option>
                  <option value="90d">Manter últimos 90 dias</option>
                  <option value="never">Nunca excluir histórico</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
          {success && (
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              <CheckCircle size={14} /> Preferências salvas com sucesso!
            </span>
          )}
          
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
          >
            <Save size={14} /> Salvar Preferências
          </button>
        </div>

      </form>
    </div>
  )
}

export default ConfiguracoesPage
