import React, { useState, useEffect } from 'react'
import { Tags, Plus, Trash2, Edit2, DollarSign, Calendar, Percent, CheckCircle } from 'lucide-react'

const PrecosPage = () => {
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [activeTab, setActiveTab] = useState('planos')
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showCouponModal, setShowCouponModal] = useState(false)
  
  // Plans state
  const [plans, setPlans] = useState([
    { id: 1, name: 'Combo Casal', desc: '2 Sorvetes de 500ml + Calda', price: 'R$ 28,00', validity: '30 dias', active: true },
    { id: 2, name: 'Assinatura Semanal Açaí', desc: '1 Açaí de 500ml toda sexta', price: 'R$ 55,00 / mês', validity: 'Mensal', active: true },
    { id: 3, name: 'Fidelidade Premium 10', desc: 'Cartão fidelidade com 10 carimbos', price: 'R$ 60,00', validity: 'Sem expiração', active: false }
  ])

  // Coupons state
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'BOTTGUA10', discount: '10%', type: 'Porcentagem', usage: '48 vezes', active: true },
    { id: 2, code: 'VERAO20', discount: '20%', type: 'Porcentagem', usage: '124 vezes', active: true },
    { id: 3, code: 'SORVETEBOM', discount: 'R$ 5,00', type: 'Valor Fixo', usage: '15 vezes', active: false }
  ])

  // Form states
  const [newPlan, setNewPlan] = useState({ name: '', desc: '', price: '', validity: '', active: true })
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', type: 'Porcentagem', usage: '0 vezes', active: true })

  useEffect(() => {
    const savedPlans = localStorage.getItem('bottgua_plans')
    const savedCoupons = localStorage.getItem('bottgua_coupons')
    if (savedPlans) setPlans(JSON.parse(savedPlans))
    if (savedCoupons) setCoupons(JSON.parse(savedCoupons))
  }, [])

  const saveToStorage = (updatedPlans, updatedCoupons) => {
    if (updatedPlans) localStorage.setItem('bottgua_plans', JSON.stringify(updatedPlans))
    if (updatedCoupons) localStorage.setItem('bottgua_coupons', JSON.stringify(updatedCoupons))
  }

  const handleCreatePlan = (e) => {
    e.preventDefault()
    if (!newPlan.name || !newPlan.price) return
    
    const id = Date.now()
    const updated = [...plans, { ...newPlan, id }]
    setPlans(updated)
    saveToStorage(updated, null)
    
    setNewPlan({ name: '', desc: '', price: '', validity: '', active: true })
    setShowPlanModal(false)
    triggerToast('Preço/Plano criado com sucesso!')
  }

  const handleCreateCoupon = (e) => {
    e.preventDefault()
    if (!newCoupon.code || !newCoupon.discount) return

    const id = Date.now()
    const updated = [...coupons, { ...newCoupon, id }]
    setCoupons(updated)
    saveToStorage(null, updated)

    setNewCoupon({ code: '', discount: '', type: 'Porcentagem', usage: '0 vezes', active: true })
    setShowCouponModal(false)
    triggerToast('Cupom de desconto ativado!')
  }

  const deletePlan = (id) => {
    const updated = plans.filter(p => p.id !== id)
    setPlans(updated)
    saveToStorage(updated, null)
    triggerToast('Preço/Plano removido.')
  }

  const deleteCoupon = (id) => {
    const updated = coupons.filter(c => c.id !== id)
    setCoupons(updated)
    saveToStorage(null, updated)
    triggerToast('Cupom removido.')
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
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-lg transition-all animate-bounce">
          <CheckCircle size={16} />
          <span className="text-xs font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button 
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'planos' ? 'border-blue-500 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('planos')}
        >
          <DollarSign size={16} /> Planos & Tabela de Preços
        </button>
        <button 
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'cupons' ? 'border-blue-500 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('cupons')}
        >
          <Percent size={16} /> Cupons de Desconto
        </button>
      </div>

      {activeTab === 'planos' ? (
        <div className="bg-white rounded-xl border border-gray-200 p-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-800">
              <Tags size={18} />
              <h2 className="font-semibold text-sm">Planos e Preços Promocionais</h2>
            </div>
            <button 
              onClick={() => setShowPlanModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={14} /> Novo Plano/Preço
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Nome do Combo/Plano</th>
                  <th className="px-6 py-4 font-medium">Descrição</th>
                  <th className="px-6 py-4 font-medium">Preço Cobrado</th>
                  <th className="px-6 py-4 font-medium">Validade</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-center w-24">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {plans.map(plan => (
                  <tr key={plan.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{plan.name}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{plan.desc}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{plan.price}</td>
                    <td className="px-6 py-4 text-gray-500">{plan.validity || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${plan.active ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-50 text-gray-400 border border-gray-150'}`}>
                        {plan.active ? 'Ativo' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => deletePlan(plan.id)}
                          className="text-gray-450 hover:text-red-500 transition-colors"
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
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-800">
              <Percent size={18} />
              <h2 className="font-semibold text-sm">Cupons Promocionais Ativos</h2>
            </div>
            <button 
              onClick={() => setShowCouponModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={14} /> Novo Cupom
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Código do Cupom</th>
                  <th className="px-6 py-4 font-medium">Desconto</th>
                  <th className="px-6 py-4 font-medium">Tipo</th>
                  <th className="px-6 py-4 font-medium">Total de Usos</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-center w-24">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {coupons.map(coupon => (
                  <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600 text-xs">{coupon.code}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{coupon.discount}</td>
                    <td className="px-6 py-4 text-gray-500">{coupon.type}</td>
                    <td className="px-6 py-4 text-gray-500">{coupon.usage}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${coupon.active ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-50 text-gray-400 border border-gray-150'}`}>
                        {coupon.active ? 'Válido' : 'Expirado'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => deleteCoupon(coupon.id)}
                          className="text-gray-450 hover:text-red-500 transition-colors"
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
      )}

      {/* Plan Creation Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full border border-gray-250 shadow-2xl p-6 relative">
            <h3 className="font-bold text-gray-800 text-sm mb-4">Adicionar Novo Plano/Preço</h3>
            
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nome do Plano/Combo <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newPlan.name} 
                  onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                  required
                  placeholder="Ex: Combo Família"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Descrição</label>
                <input 
                  type="text" 
                  value={newPlan.desc} 
                  onChange={(e) => setNewPlan({...newPlan, desc: e.target.value})}
                  placeholder="Ex: 3 sorvetes + 1 calda grátis"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Preço <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={newPlan.price} 
                    onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                    required
                    placeholder="Ex: R$ 35,00"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Validade / Renovação</label>
                  <input 
                    type="text" 
                    value={newPlan.validity} 
                    onChange={(e) => setNewPlan({...newPlan, validity: e.target.value})}
                    placeholder="Ex: 30 dias, Mensal"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setShowPlanModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-50 text-gray-600"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  Criar Plano
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Creation Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full border border-gray-250 shadow-2xl p-6 relative">
            <h3 className="font-bold text-gray-800 text-sm mb-4">Adicionar Novo Cupom de Desconto</h3>
            
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Código do Cupom <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={newCoupon.code} 
                  onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                  required
                  placeholder="Ex: PROMO20"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Desconto <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={newCoupon.discount} 
                    onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
                    required
                    placeholder="Ex: 15% ou R$ 10,00"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Tipo de Desconto</label>
                  <select 
                    value={newCoupon.type} 
                    onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" 
                  >
                    <option value="Porcentagem">Porcentagem (%)</option>
                    <option value="Valor Fixo">Valor Fixo (R$)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-50 text-gray-600"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  Ativar Cupom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrecosPage
