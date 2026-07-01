import React, { useState } from 'react'
import { CreditCard, Smartphone, Banknote, FileText, CalendarRange } from 'lucide-react'

const PaymentMethodCard = ({ icon: Icon, title, description, active, onChange, children }) => (
  <div className="border border-gray-200 rounded-xl p-5 mb-4 bg-white">
    <div className="flex justify-between items-start">
      <div className="flex gap-4">
        <div className={`mt-0.5 ${active ? 'text-blue-500' : 'text-gray-400'}`}>
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          
          {children && active && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
      </div>
      
      <div 
        className={`w-10 h-5 rounded-full p-0.5 cursor-pointer flex items-center transition-colors ${active ? 'bg-blue-500 justify-end' : 'bg-gray-200 justify-start'}`}
        onClick={onChange}
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
      </div>
    </div>
  </div>
)

const PagamentosPage = () => {
  const [methods, setMethods] = useState({
    pix: true,
    dinheiro: false,
    cartao: true,
    boleto: false,
    parcelamento: true
  })

  const toggleMethod = (key) => {
    setMethods({...methods, [key]: !methods[key]})
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2 mb-6 text-gray-800">
        <CreditCard size={18} />
        <h2 className="font-semibold text-sm">Métodos de Pagamento</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <PaymentMethodCard 
          icon={Smartphone}
          title="Pix" 
          description="Pagamento instantâneo via Pix"
          active={methods.pix}
          onChange={() => toggleMethod('pix')}
        />
        
        <PaymentMethodCard 
          icon={Banknote}
          title="Dinheiro" 
          description="Pagamento em dinheiro na entrega"
          active={methods.dinheiro}
          onChange={() => toggleMethod('dinheiro')}
        />
        
        <PaymentMethodCard 
          icon={CreditCard}
          title="Cartão" 
          description="Cartão de crédito ou débito"
          active={methods.cartao}
          onChange={() => toggleMethod('cartao')}
        />
        
        <PaymentMethodCard 
          icon={FileText}
          title="Boleto" 
          description="Boleto bancário"
          active={methods.boleto}
          onChange={() => toggleMethod('boleto')}
        />
        
        <PaymentMethodCard 
          icon={CalendarRange}
          title="Parcelamento" 
          description="Pagamento parcelado"
          active={methods.parcelamento}
          onChange={() => toggleMethod('parcelamento')}
        >
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Máximo de Parcelas</label>
            <input 
              type="number" 
              defaultValue="12" 
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[200px]" 
            />
          </div>
        </PaymentMethodCard>
      </div>

      <div className="flex justify-end mt-4 pt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
          Salvar Configurações
        </button>
      </div>
    </div>
  )
}

export default PagamentosPage
