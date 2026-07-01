import React, { useState, useEffect } from 'react'
import { Paintbrush, Save, CheckCircle, Info, RefreshCw, Sun, Moon } from 'lucide-react'

const AparenciaPage = () => {
  const [success, setSuccess] = useState(false)
  const [appearance, setAppearance] = useState({
    theme: 'light',
    systemName: 'Bottgua',
    primaryColor: '#3B82F6',
    sidebarLayout: 'expanded',
    logoUrl: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('bottgua_appearance_config')
    if (saved) {
      try {
        setAppearance(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const handleChange = (name, value) => {
    setAppearance(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('bottgua_appearance_config', JSON.stringify(appearance))
    setSuccess(true)
    
    // Dispatch a custom event to notify other components (e.g. Sidebar / Header)
    window.dispatchEvent(new Event('bottgua_settings_changed'))
    
    setTimeout(() => setSuccess(false), 3000)
  }

  const colors = [
    { name: 'Azul (Padrão)', hex: '#3B82F6' },
    { name: 'Roxo', hex: '#8B5CF6' },
    { name: 'Esmeralda', hex: '#10B981' },
    { name: 'Laranja', hex: '#F59E0B' },
    { name: 'Vermelho', hex: '#EF4444' },
    { name: 'Indigo', hex: '#6366F1' }
  ]

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <p className="text-gray-500 text-sm">Personalize a identidade visual e o comportamento estético do painel Bottgua</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-gray-800 border-b border-gray-100 pb-3">
              <Paintbrush size={18} className="text-blue-500" />
              <h2 className="font-semibold text-sm">Personalização Visual</h2>
            </div>

            {/* System Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nome do Sistema / Plataforma</label>
              <input 
                type="text" 
                value={appearance.systemName} 
                onChange={(e) => handleChange('systemName', e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>

            {/* Tema */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-3">Tema do Painel</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleChange('theme', 'light')}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    appearance.theme === 'light' 
                      ? 'border-blue-500 bg-blue-50/30 text-blue-600 font-semibold' 
                      : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Sun size={18} />
                  <span className="text-sm">Claro (Recomendado)</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleChange('theme', 'dark')}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    appearance.theme === 'dark' 
                      ? 'border-blue-500 bg-blue-50/30 text-blue-600 font-semibold' 
                      : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Moon size={18} />
                  <span className="text-sm">Escuro (Beta)</span>
                </button>
              </div>
            </div>

            {/* Cor Primária */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-3">Cor de Destaque (Tema)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {colors.map(color => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => handleChange('primaryColor', color.hex)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                      appearance.primaryColor === color.hex 
                        ? 'border-blue-500 bg-blue-50/20 font-medium' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }}></span>
                    <span className="text-xs text-gray-700">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mock Upload Logo */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Link da Logomarca (URL)</label>
              <input 
                type="text" 
                placeholder="Ex: https://dominio.com/logo.png"
                value={appearance.logoUrl} 
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Insira um link direto de imagem para substituir o logo padrão do cabeçalho</span>
            </div>
          </div>

          {/* Real-time Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Visualização da Marca</h3>
              
              {/* Preview Box */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">
                {/* Header preview */}
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-5 h-5 rounded text-[10px] font-bold text-white flex items-center justify-center"
                      style={{ backgroundColor: appearance.primaryColor }}
                    >
                      {appearance.systemName.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-gray-700">{appearance.systemName}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
                
                {/* Button preview */}
                <div>
                  <button 
                    type="button" 
                    className="w-full text-white text-xs font-semibold py-2 rounded-lg transition-all shadow-sm flex items-center justify-center gap-1"
                    style={{ backgroundColor: appearance.primaryColor }}
                  >
                    Botão de Ação
                  </button>
                </div>
                
                {/* Input preview */}
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-400">Exemplo de input</span>
                  <div className="border border-gray-100 rounded px-2 py-1 text-[11px] text-gray-600 flex items-center justify-between">
                    <span>Texto digitado...</span>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: appearance.primaryColor }}></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-700 space-y-2 mt-6">
              <div className="flex gap-2">
                <Info size={16} className="shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  As configurações de Aparência de Marca são aplicadas globalmente para todos os operadores do sistema.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons & Alerts */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
          {success && (
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              <CheckCircle size={14} /> Marca atualizada com sucesso!
            </span>
          )}
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
          >
            <Save size={14} /> Aplicar Alterações
          </button>
        </div>
      </form>
    </div>
  )
}

export default AparenciaPage
