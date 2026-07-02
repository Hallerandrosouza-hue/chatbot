import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'

// Landing Page (capa antes do menu principal)
import LandingPage from './pages/LandingPage'

// Importando todas as páginas do Bottgua
import DashboardPage from './pages/DashboardPage'
import EmpresaPage from './pages/EmpresaPage'
import AparenciaPage from './pages/AparenciaPage'
import ConexaoWhatsAppPage from './pages/ConexaoWhatsAppPage'
import ConversasWhatsAppPage from './pages/ConversasWhatsAppPage'
import AtendenteIAPage from './pages/AtendenteIAPage'
import ProdutosPage from './pages/ProdutosPage'
import PrecosPage from './pages/PrecosPage'
import AgendamentosPage from './pages/AgendamentosPage'
import PagamentosPage from './pages/PagamentosPage'
import EquipePage from './pages/EquipePage'
import RelatoriosPage from './pages/RelatoriosPage'
import ConfiguracoesPage from './pages/ConfiguracoesPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/empresa" element={<EmpresaPage />} />
          <Route path="/aparencia" element={<AparenciaPage />} />
          <Route path="/conexao" element={<ConexaoWhatsAppPage />} />
          <Route path="/conversas" element={<ConversasWhatsAppPage />} />
          <Route path="/atendente-ia" element={<AtendenteIAPage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/precos" element={<PrecosPage />} />
          <Route path="/agendamentos" element={<AgendamentosPage />} />
          <Route path="/pagamentos" element={<PagamentosPage />} />
          <Route path="/equipe" element={<EquipePage />} />
          <Route path="/relatorios" element={<RelatoriosPage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

