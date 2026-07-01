import React, { useState, useEffect } from 'react'
import { Building2, Save, CheckCircle, Phone, MapPin, Globe, Clock, ShieldCheck } from 'lucide-react'

const EmpresaPage = () => {
  const [success, setSuccess] = useState(false)
  const [empresa, setEmpresa] = useState({
    nome: 'Sorveteria Bottgua & Cia',
    cnpj: '12.345.678/0001-99',
    email: 'contato@bottgua.com.br',
    telefone: '+55 (11) 99999-8888',
    site: 'https://sorveteriabottgua.com.br',
    endereco: 'Avenida Principal, 1200 - Centro',
    cidade: 'São Paulo - SP',
    horarioAbertura: '09:00',
    horarioFechamento: '22:00',
    diasFuncionamento: 'Segunda a Domingo'
  })

  useEffect(() => {
    const saved = localStorage.getItem('bottgua_empresa_config')
    if (saved) {
      try {
        setEmpresa(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmpresa({ ...empresa, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('bottgua_empresa_config', JSON.stringify(empresa))
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <p className="text-gray-500 text-sm">Gerencie as informações públicas da sua empresa e horários de atendimento</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 mb-6 text-gray-800 border-b border-gray-100 pb-3">
            <Building2 size={18} className="text-blue-500" />
            <h2 className="font-semibold text-sm">Dados Cadastrais</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Razão Social / Nome Fantasia <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="nome"
                value={empresa.nome} 
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">CNPJ</label>
              <input 
                type="text" 
                name="cnpj"
                value={empresa.cnpj} 
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">E-mail Comercial <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                name="email"
                value={empresa.email} 
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Telefone de Atendimento <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="telefone"
                value={empresa.telefone} 
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Website</label>
              <input 
                type="text" 
                name="site"
                value={empresa.site} 
                onChange={handleChange}
                placeholder="https://suaempresa.com.br"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>
          </div>
        </div>

        {/* Location & Operating Hours */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 mb-6 text-gray-800 border-b border-gray-100 pb-3">
            <MapPin size={18} className="text-blue-500" />
            <h2 className="font-semibold text-sm">Localização e Funcionamento</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Endereço Completo</label>
                <input 
                  type="text" 
                  name="endereco"
                  value={empresa.endereco} 
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cidade - UF</label>
                <input 
                  type="text" 
                  name="cidade"
                  value={empresa.cidade} 
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Dias de Funcionamento</label>
                <input 
                  type="text" 
                  name="diasFuncionamento"
                  value={empresa.diasFuncionamento} 
                  onChange={handleChange}
                  placeholder="Ex: Segunda a Sexta"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Horário de Abertura</label>
                <input 
                  type="time" 
                  name="horarioAbertura"
                  value={empresa.horarioAbertura} 
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Horário de Fechamento</label>
                <input 
                  type="time" 
                  name="horarioFechamento"
                  value={empresa.horarioFechamento} 
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons & Alerts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={14} className="text-green-500" />
            <span>As alterações refletirão nas mensagens automáticas do Bot.</span>
          </div>

          <div className="flex items-center gap-3">
            {success && (
              <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg border border-green-200 animation-pulse">
                <CheckCircle size={14} /> Configurações salvas com sucesso!
              </span>
            )}
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              <Save size={14} /> Salvar Configurações
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EmpresaPage
