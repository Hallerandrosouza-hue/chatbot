import React, { useState, useEffect } from 'react'
import { Users, Plus, Trash2, Mail, Shield, CheckCircle, XCircle } from 'lucide-react'

const EquipePage = () => {
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [team, setTeam] = useState([
    { id: 1, name: 'Admin Bottgua', email: 'admin@bottgua.com', role: 'Administrador', status: 'Ativo' },
    { id: 2, name: 'Carlos Gerente', email: 'carlos@bottgua.com', role: 'Gerente', status: 'Ativo' },
    { id: 3, name: 'Juliana Atendente', email: 'juliana@bottgua.com', role: 'Atendente', status: 'Ativo' },
    { id: 4, name: 'Marcos Suporte', email: 'marcos@bottgua.com', role: 'Atendente', status: 'Inativo' }
  ])

  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Atendente', status: 'Ativo' })

  useEffect(() => {
    const saved = localStorage.getItem('bottgua_team')
    if (saved) {
      try {
        setTeam(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const saveToStorage = (updatedTeam) => {
    localStorage.setItem('bottgua_team', JSON.stringify(updatedTeam))
  }

  const handleCreateMember = (e) => {
    e.preventDefault()
    if (!newMember.name || !newMember.email) return

    const id = Date.now()
    const updated = [...team, { ...newMember, id }]
    setTeam(updated)
    saveToStorage(updated)
    
    setNewMember({ name: '', email: '', role: 'Atendente', status: 'Ativo' })
    setShowModal(false)
    triggerToast('Membro da equipe adicionado com sucesso!')
  }

  const toggleStatus = (id) => {
    const updated = team.map(member => {
      if (member.id === id) {
        const nextStatus = member.status === 'Ativo' ? 'Inativo' : 'Ativo'
        return { ...member, status: nextStatus }
      }
      return member
    })
    setTeam(updated)
    saveToStorage(updated)
    triggerToast('Status do membro atualizado!')
  }

  const deleteMember = (id) => {
    const updated = team.filter(m => m.id !== id)
    setTeam(updated)
    saveToStorage(updated)
    triggerToast('Membro removido da equipe.')
  }

  const triggerToast = (msg) => {
    setSuccessMsg(msg)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Administrador': return 'bg-purple-50 text-purple-600 border-purple-100'
      case 'Gerente': return 'bg-blue-50 text-blue-600 border-blue-100'
      default: return 'bg-gray-50 text-gray-600 border-gray-150'
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {success && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-lg transition-all animate-bounce">
          <CheckCircle size={16} />
          <span className="text-xs font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-gray-200 p-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-800">
            <Users size={18} />
            <h2 className="font-semibold text-sm">Gerenciamento de Operadores e Equipe</h2>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={14} /> Convidar Membro
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Nome do Operador</th>
                <th className="px-6 py-4 font-medium">E-mail de Login</th>
                <th className="px-6 py-4 font-medium">Nível de Acesso</th>
                <th className="px-6 py-4 font-medium">Status da Conta</th>
                <th className="px-6 py-4 font-medium text-center w-36">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {team.map(member => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 font-bold flex items-center justify-center text-xs shadow-inner">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-gray-500 text-xs font-mono">
                      <Mail size={12} className="text-gray-400" /> {member.email}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded border text-[10px] font-bold ${getRoleBadgeColor(member.role)}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStatus(member.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1 ${
                        member.status === 'Ativo' 
                          ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100/50' 
                          : 'bg-red-50 text-red-500 border-red-100 hover:bg-red-100/50'
                      }`}
                    >
                      {member.status === 'Ativo' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                      {member.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => deleteMember(member.id)}
                        disabled={member.role === 'Administrador'}
                        className={`transition-colors ${member.role === 'Administrador' ? 'text-gray-200 cursor-not-allowed' : 'text-gray-450 hover:text-red-500'}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Guide */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
        <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
          <Shield size={14} className="text-blue-500" /> Níveis de Acesso e Permissões do Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] text-gray-500 leading-relaxed">
          <div className="p-3 bg-white border border-gray-150 rounded-lg">
            <p className="font-bold text-gray-800 mb-1">Administrador</p>
            <p>Controle total sobre o painel. Conecta o WhatsApp, altera aparências, cria planos/cupons e gerencia toda a equipe de operadores.</p>
          </div>
          <div className="p-3 bg-white border border-gray-150 rounded-lg">
            <p className="font-bold text-gray-800 mb-1">Gerente</p>
            <p>Gerencia produtos, agenda atendimentos de clientes, altera dados da empresa e visualiza relatórios. Não altera dados de integrações WhatsApp.</p>
          </div>
          <div className="p-3 bg-white border border-gray-150 rounded-lg">
            <p className="font-bold text-gray-800 mb-1">Atendente</p>
            <p>Permissão exclusiva para atendimento no chat de Conversas e controle de seus próprios agendamentos locais. Sem acesso a configurações.</p>
          </div>
        </div>
      </div>

      {/* Modal Convidar Membro */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full border border-gray-250 shadow-2xl p-6 relative">
            <h3 className="font-bold text-gray-800 text-sm mb-4">Adicionar Operador</h3>
            
            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nome Completo <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newMember.name} 
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  required
                  placeholder="Ex: João Ferreira"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">E-mail <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  value={newMember.email} 
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  required
                  placeholder="Ex: joao@bottgua.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Cargo / Função</label>
                  <select 
                    value={newMember.role} 
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" 
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Atendente">Atendente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Status da Conta</label>
                  <select 
                    value={newMember.status} 
                    onChange={(e) => setNewMember({...newMember, status: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" 
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-50 text-gray-600"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EquipePage
