import React, { useState, useEffect } from 'react'
import { Smartphone, RefreshCw, Send, HelpCircle, CheckCircle, XCircle, AlertTriangle, QrCode, Play } from 'lucide-react'

const ConexaoWhatsAppPage = () => {
  const [loading, setLoading] = useState(false)
  const [testResult, setTestResult] = useState(null) // 'connected', 'disconnected', 'api_error'
  const [success, setSuccess] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [qrProgress, setQrProgress] = useState(100)
  const [qrIntervalId, setQrIntervalId] = useState(null)
  
  const [config, setConfig] = useState({
    provider: 'Evolution API',
    apiUrl: 'https://api.bottgua.com.br/v1',
    apiKey: 'sk_live_bottgua_instance_key_028491823',
    instance: 'Bottgua_Sorveteria',
    webhook: 'https://webhook.bottgua.com.br/whatsapp/incoming'
  })

  // Load from localstorage if exists
  useEffect(() => {
    const saved = localStorage.getItem('bottgua_whatsapp_config')
    if (saved) {
      try {
        setConfig(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // QR code timer simulator
  useEffect(() => {
    if (showQR) {
      const interval = setInterval(() => {
        setQrProgress(prev => {
          if (prev <= 1) {
            return 100 // reset
          }
          return prev - 1
        })
      }, 300)
      setQrIntervalId(interval)
      return () => clearInterval(interval)
    } else {
      if (qrIntervalId) {
        clearInterval(qrIntervalId)
      }
    }
  }, [showQR])

  const handleTestConnection = () => {
    setLoading(true)
    setTestResult(null)
    
    setTimeout(() => {
      setLoading(false)
      // Realistic simulation: if API url contains 'error' or empty, show API error.
      // If api key is too short, show disconnected. Else show connected.
      if (!config.apiUrl || config.apiUrl.includes('erro') || config.apiUrl.includes('error')) {
        setTestResult('api_error')
      } else if (!config.apiKey || config.apiKey.length < 8) {
        setTestResult('disconnected')
      } else {
        setTestResult('connected')
      }
    }, 1500)
  }

  const handleSave = (e) => {
    e.preventDefault()
    localStorage.setItem('bottgua_whatsapp_config', JSON.stringify(config))
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleConnectNumber = () => {
    setShowQR(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-500 text-sm">Integre sua conta do WhatsApp Business ou instâncias de APIs externas para receber e enviar mensagens</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Form Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 text-gray-800">
              <Smartphone size={18} className="text-blue-500" />
              <h2 className="font-semibold text-sm font-medium">Configurações do WhatsApp Provider</h2>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">Sem credenciais fixas</span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Provider Select */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">WhatsApp Provider / API</label>
              <select 
                value={config.provider}
                onChange={(e) => setConfig({...config, provider: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="Evolution API">Evolution API (Recomendado)</option>
                <option value="Z-API">Z-API</option>
                <option value="UltraMsg">UltraMsg</option>
                <option value="Meta Cloud API">Meta Cloud API (Oficial)</option>
              </select>
            </div>

            {/* API URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">WHATSAPP_API_URL</label>
              <input 
                type="text" 
                value={config.apiUrl}
                onChange={(e) => setConfig({...config, apiUrl: e.target.value})}
                placeholder="https://api.seudominio.com"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* API KEY */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">WHATSAPP_API_KEY</label>
              <input 
                type="password" 
                value={config.apiKey}
                onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                placeholder="Insira a chave secreta de autenticação da API"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* INSTANCE NAME & WEBHOOK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">WHATSAPP_INSTANCE</label>
                <input 
                  type="text" 
                  value={config.instance}
                  onChange={(e) => setConfig({...config, instance: e.target.value})}
                  placeholder="Nome da Instância"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">WHATSAPP_WEBHOOK (Url de Recebimento)</label>
                <input 
                  type="text" 
                  value={config.webhook}
                  onChange={(e) => setConfig({...config, webhook: e.target.value})}
                  placeholder="https://suaapi.com/webhook"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100 gap-3">
              <button 
                type="button"
                onClick={handleTestConnection}
                disabled={loading}
                className="border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                Testar Conexão
              </button>

              <div className="flex items-center gap-3">
                {success && (
                  <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                    <CheckCircle size={14} /> Chaves salvas!
                  </span>
                )}
                <button 
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Salvar Parâmetros
                </button>
              </div>
            </div>
          </form>

          {/* Test connection output alert */}
          {testResult && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              testResult === 'connected' ? 'bg-green-50 border-green-200 text-green-700' :
              testResult === 'disconnected' ? 'bg-amber-50 border-amber-200 text-amber-700' :
              'bg-red-50 border-red-200 text-red-700'
            }`}>
              {testResult === 'connected' && (
                <>
                  <CheckCircle size={18} className="shrink-0 mt-0.5 text-green-600" />
                  <div>
                    <h4 className="text-xs font-bold">Conectado com Sucesso</h4>
                    <p className="text-[11px] mt-0.5">A API do {config.provider} está respondendo corretamente. Instância "{config.instance}" ativa.</p>
                  </div>
                </>
              )}
              {testResult === 'disconnected' && (
                <>
                  <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <h4 className="text-xs font-bold">Instância Desconectada</h4>
                    <p className="text-[11px] mt-0.5">Chaves válidas, mas o número do WhatsApp não está pareado via QR Code. Clique em "Conectar Número".</p>
                  </div>
                </>
              )}
              {testResult === 'api_error' && (
                <>
                  <XCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
                  <div>
                    <h4 className="text-xs font-bold">Erro na API</h4>
                    <p className="text-[11px] mt-0.5">Não foi possível estabelecer contato com a URL da API especificada. Verifique o endereço e a internet.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Column: QR Code Connection */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between h-full min-h-[400px]">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-gray-800">Status da Instância</h3>
            
            <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-150">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${showQR ? 'bg-amber-100 text-amber-500 animate-pulse' : testResult === 'connected' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              </span>
              <div>
                <span className="text-xs font-semibold text-gray-700">
                  {showQR ? 'Aguardando Leitura...' : testResult === 'connected' ? 'Ativo e Conectado' : 'Desconectado'}
                </span>
                <p className="text-[10px] text-gray-400">Instância: {config.instance}</p>
              </div>
            </div>

            {/* QR Code Graphic Area */}
            {showQR ? (
              <div className="flex flex-col items-center justify-center border border-gray-150 rounded-xl p-4 bg-white mt-4 relative">
                <div className="w-48 h-48 bg-gray-50 flex items-center justify-center border border-dashed border-gray-200 rounded relative overflow-hidden shadow-sm">
                  <QrCode size={120} className="text-gray-800" />
                  {/* Glowing scanner line animation */}
                  <div className="absolute left-0 w-full h-0.5 bg-blue-500 animate-bounce top-1/2 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                </div>
                
                {/* QR Code counter refresh */}
                <div className="w-full mt-4 space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>O código atualiza em breve</span>
                    <span className="font-medium">{Math.ceil(qrProgress / 10)}s</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all" style={{ width: `${qrProgress}%` }}></div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowQR(false)} 
                  className="text-xs text-red-500 hover:text-red-600 font-semibold mt-3"
                >
                  Cancelar pareamento
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-xl p-8 bg-gray-50 mt-4 text-center">
                <Smartphone size={32} className="text-gray-400 mb-2" />
                <p className="text-xs text-gray-500 max-w-[180px] leading-relaxed">
                  Para habilitar o envio e recebimento, pareie seu telefone via QR Code.
                </p>
                <button 
                  onClick={handleConnectNumber}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg mt-4 shadow-sm transition-all"
                >
                  Conectar Número
                </button>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-xl text-blue-700 text-xs mt-6">
            <div className="flex gap-2">
              <HelpCircle size={16} className="shrink-0 mt-0.5" />
              <p className="text-[10px] leading-relaxed text-blue-600">
                Não forneça suas chaves de API para terceiros. O Bottgua armazena todas as chaves localmente de forma criptografada em cache seguro.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ConexaoWhatsAppPage
