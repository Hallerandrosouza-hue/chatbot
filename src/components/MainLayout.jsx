import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import Sidebar from './Sidebar'

const getPageTitle = (pathname) => {
  if (pathname.includes('/dashboard')) return 'Dashboard Principal'
  if (pathname.includes('/empresa')) return 'Dados da Empresa'
  if (pathname.includes('/aparencia')) return 'Configurações de Aparência'
  if (pathname.includes('/conexao')) return 'Integrações WhatsApp'
  if (pathname.includes('/conversas')) return 'Painel de Conversas'
  if (pathname.includes('/atendente-ia')) return 'Atendente IA (Configurações)'
  if (pathname.includes('/produtos')) return 'Produtos e Serviços'
  if (pathname.includes('/precos')) return 'Tabela de Preços e Promoções'
  if (pathname.includes('/agendamentos')) return 'Agendamentos'
  if (pathname.includes('/pagamentos')) return 'Métodos de Pagamento'
  if (pathname.includes('/equipe')) return 'Gerenciamento de Equipe'
  if (pathname.includes('/relatorios')) return 'Relatórios e Analíticos'
  if (pathname.includes('/configuracoes')) return 'Configurações do Sistema'
  return 'Bottgua Admin'
}

const Header = () => {
  const location = useLocation()
  const title = getPageTitle(location.pathname)
  const [theme, setTheme] = useState('light')
  const [color, setColor] = useState('#3B82F6')

  const updateBrand = () => {
    const saved = localStorage.getItem('bottgua_appearance_config')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.theme) {
          setTheme(parsed.theme)
          if (parsed.theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
        if (parsed.primaryColor) setColor(parsed.primaryColor)
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
    <header className="h-16 border-b border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-8 shrink-0 transition-colors duration-300">
      <h2 className="text-[15px] font-bold text-gray-800 dark:text-gray-100 tracking-tight">{title}</h2>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={() => {
            const nextTheme = theme === 'light' ? 'dark' : 'light'
            setTheme(nextTheme)
            if (nextTheme === 'dark') {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
            const saved = localStorage.getItem('bottgua_appearance_config')
            let configObj = {}
            if (saved) {
              try { configObj = JSON.parse(saved) } catch(e) {}
            }
            configObj.theme = nextTheme
            localStorage.setItem('bottgua_appearance_config', JSON.stringify(configObj))
            window.dispatchEvent(new Event('bottgua_settings_changed'))
          }} 
          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Alternar Tema"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-amber-500" />}
        </button>
        <div 
          className="w-8 h-8 rounded-full text-white flex items-center justify-center text-[10px] font-bold shadow-sm transition-all cursor-pointer"
          style={{ backgroundColor: color }}
        >
          AD
        </div>
      </div>
    </header>
  )
}

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#FAFBFD] dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout

