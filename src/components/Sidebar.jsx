import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, Building2, Paintbrush, 
  Smartphone, MessageSquare, Bot, 
  Package, Tags, CalendarDays, CreditCard, Users,
  BarChart3, Settings, ChevronLeft
} from 'lucide-react'

const SidebarItem = ({ icon: Icon, label, to, badge, activeColor }) => {
  const location = useLocation()
  const isActive = location.pathname.includes(to)

  return (
    <Link 
      to={to} 
      className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1 ${
        isActive 
          ? 'text-white' 
          : 'text-sidebar-foreground hover:bg-sidebar-hover'
      }`}
      style={isActive ? { backgroundColor: activeColor || '#3B82F6' } : {}}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
        <span>{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
          isActive ? 'bg-white/20 text-white' : 'bg-green-500 text-white animate-pulse'
        }`}>
          {badge}
        </span>
      )}
    </Link>
  )
}

const SidebarGroup = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="px-4 text-[11px] font-semibold text-gray-400 tracking-wider mb-2 uppercase">
      {title}
    </h3>
    <div className="px-2">
      {children}
    </div>
  </div>
)

const Sidebar = () => {
  const [brandName, setBrandName] = useState('Bottgua')
  const [brandColor, setBrandColor] = useState('#3B82F6')

  // Load brand name dynamically on mount and watch for changes
  const updateBrand = () => {
    const saved = localStorage.getItem('bottgua_appearance_config')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.systemName) setBrandName(parsed.systemName)
        if (parsed.primaryColor) setBrandColor(parsed.primaryColor)
      } catch (e) {
        console.error(e)
      }
    }
  }

  useEffect(() => {
    updateBrand()
    window.addEventListener('bottgua_settings_changed', updateBrand)
    return () => window.removeEventListener('bottgua_settings_changed', updateBrand)
  }, [])

  return (
    <div className="w-[260px] h-full bg-sidebar-background border-r border-sidebar-border flex flex-col overflow-y-auto shrink-0">
      {/* Header Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border sticky top-0 bg-sidebar-background z-10">
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 text-white rounded text-[10px] font-bold flex items-center justify-center transition-all"
            style={{ backgroundColor: brandColor }}
          >
            {brandName.slice(0, 2).toUpperCase()}
          </div>
          <span className="font-bold text-gray-800 text-sm tracking-tight">{brandName}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <SidebarGroup title="Principal">
          <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" activeColor={brandColor} />
          <SidebarItem to="/empresa" icon={Building2} label="Empresa" activeColor={brandColor} />
          <SidebarItem to="/aparencia" icon={Paintbrush} label="Aparência" activeColor={brandColor} />
        </SidebarGroup>

        <SidebarGroup title="WhatsApp">
          <SidebarItem to="/conexao" icon={Smartphone} label="Conexão" activeColor={brandColor} />
          <SidebarItem to="/conversas" icon={MessageSquare} label="Conversas" badge="2" activeColor={brandColor} />
          <SidebarItem to="/atendente-ia" icon={Bot} label="Atendente IA" activeColor={brandColor} />
        </SidebarGroup>

        <SidebarGroup title="Negócio">
          <SidebarItem to="/produtos" icon={Package} label="Produtos e Serviços" activeColor={brandColor} />
          <SidebarItem to="/precos" icon={Tags} label="Preços e Promoções" activeColor={brandColor} />
          <SidebarItem to="/agendamentos" icon={CalendarDays} label="Agendamentos" activeColor={brandColor} />
          <SidebarItem to="/pagamentos" icon={CreditCard} label="Pagamentos" activeColor={brandColor} />
          <SidebarItem to="/equipe" icon={Users} label="Equipe" activeColor={brandColor} />
        </SidebarGroup>

        <SidebarGroup title="Sistema">
          <SidebarItem to="/relatorios" icon={BarChart3} label="Relatórios" activeColor={brandColor} />
          <SidebarItem to="/configuracoes" icon={Settings} label="Configurações" activeColor={brandColor} />
        </SidebarGroup>
      </div>

      {/* Footer Info */}
      <div className="p-4 mx-4 mb-4 bg-gray-50 rounded-lg">
        <div className="text-xs font-semibold text-gray-600">Versão 1.0.0</div>
        <div className="text-[9px] text-gray-400 mt-1">© 2026 {brandName}</div>
      </div>
    </div>
  )
}

export default Sidebar

