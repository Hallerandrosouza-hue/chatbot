import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Layers, Bot, Package, Users, BarChart3, 
  ArrowRight, CheckCircle2, Sparkles, Shield, Zap, Globe,
  Play, Star, ChevronDown, IceCream, Car, Printer, Shirt,
  UtensilsCrossed, Hospital, ShoppingCart, Plus, X, MessageSquare, Send
} from 'lucide-react'

/* ─── Intersection Observer Hook ─── */
const useInView = (options = {}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        obs.unobserve(el)
      }
    }, { threshold: 0.15, ...options })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, isInView]
}

/* ─── Floating Particles ─── */
const Particles = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ─── Typewriter ─── */
const Typewriter = ({ text, delay = 60, color }) => {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) { setDone(true); clearInterval(timer) }
    }, delay)
    return () => clearInterval(timer)
  }, [text, delay])
  return (
    <span style={{ color }}>
      {displayed}
      {!done && <span className="landing-cursor">|</span>}
    </span>
  )
}

/* ─── Feature Mockups ─── */
const FeatureMockup = ({ feature, brandColor }) => {
  if (feature.title === 'Dashboard Completo') {
    return (
      <div className="w-full flex items-center justify-center p-4">
        <img src="/images/hero-dashboard.png" alt="Dashboard Preview" className="w-full max-w-2xl rounded-2xl shadow-lg border border-gray-200/50" />
      </div>
    )
  }

  if (feature.title === 'Atendente IA') {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[400px]">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <Bot size={20} className="text-emerald-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">Assistente Virtual</h4>
            <p className="text-xs text-emerald-500 font-medium">Online e pronto para ajudar</p>
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto bg-gray-50/30">
          <div className="self-end bg-blue-500 text-white p-3 rounded-2xl rounded-tr-sm text-sm max-w-[80%] shadow-sm">
            Ola! Gostaria de saber o horario de funcionamento.
          </div>
          <div className="self-start bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm text-sm max-w-[80%] shadow-sm text-gray-700 flex items-start gap-2">
            <Bot size={16} className="text-emerald-500 mt-0.5 shrink-0" />
            <span>Ola! Nosso horario de funcionamento e de segunda a sexta, das 8h as 18h. Posso ajudar com mais alguma coisa?</span>
          </div>
          <div className="self-end bg-blue-500 text-white p-3 rounded-2xl rounded-tr-sm text-sm max-w-[80%] shadow-sm">
            Voces fazem entregas?
          </div>
          <div className="self-start bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm text-sm max-w-[80%] shadow-sm text-gray-700 flex items-start gap-2">
            <div className="flex space-x-1 mt-1.5">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <input type="text" placeholder="Digite uma mensagem..." className="bg-transparent flex-1 outline-none text-sm" disabled />
            <Send size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    )
  }

  if (feature.title === 'Gestao de Produtos') {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">Catálogo de Produtos</h4>
          <button className="px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1"><Plus size={14} /> Novo Produto</button>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Produto</th>
                <th className="px-4 py-3 font-medium">Estoque</th>
                <th className="px-4 py-3 font-medium">Preço</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { n: 'Camiseta Basic Algodão', e: 145, p: 'R$ 89,90', s: 'Ativo' },
                { n: 'Calça Jeans Premium', e: 32, p: 'R$ 199,90', s: 'Ativo' },
                { n: 'Tênis Esportivo Pro', e: 0, p: 'R$ 349,90', s: 'Sem estoque' },
                { n: 'Jaqueta Corta Vento', e: 12, p: 'R$ 259,90', s: 'Ativo' }
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center"><Package size={14} className="text-gray-400" /></div>
                    {item.n}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.e} un.</td>
                  <td className="px-4 py-3 text-gray-600">{item.p}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.e > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{item.s}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (feature.title === 'Relatorios Detalhados') {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          {[
            { l: 'Faturamento', v: 'R$ 45.230', c: '+12%' },
            { l: 'Novos Clientes', v: '342', c: '+5%' },
            { l: 'Atendimentos IA', v: '1.204', c: '+28%' }
          ].map((s, i) => (
             <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
               <p className="text-xs text-gray-500 mb-1">{s.l}</p>
               <div className="flex items-end justify-between">
                 <h4 className="text-xl font-bold text-gray-800">{s.v}</h4>
                 <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">{s.c}</span>
               </div>
             </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
          <h4 className="font-semibold text-gray-800 text-sm">Crescimento de Vendas (Ultimos 6 meses)</h4>
          <div className="h-48 flex items-end justify-between gap-2 mt-4 px-2">
            {[40, 60, 45, 80, 65, 100].map((h, i) => (
              <div key={i} className="w-full bg-blue-100 rounded-t-md relative group hover:bg-blue-200 transition-colors" style={{ height: `${h}%` }}>
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">R$ {h}k</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-4 text-xs text-gray-400 font-medium mt-2">
            <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
          </div>
        </div>
      </div>
    )
  }

  // Generic fallback with styled icon
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 text-center">
      <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6" style={{ background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}05)` }}>
        <feature.icon size={48} style={{ color: feature.color }} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
      <p className="text-gray-500 max-w-md mx-auto">{feature.description}</p>
      <p className="mt-8 text-sm font-semibold py-2 px-4 rounded-full bg-blue-50 text-blue-600">
        Acesse o Dashboard para ver na prática!
      </p>
    </div>
  )
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */
const LandingPage = () => {
  const navigate = useNavigate()
  const [brandName, setBrandName] = useState('Bottgua')
  const [brandColor, setBrandColor] = useState('#3B82F6')
  const [scrollY, setScrollY] = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedFeature, setSelectedFeature] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('bottgua_appearance_config')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.systemName) setBrandName(parsed.systemName)
        if (parsed.primaryColor) setBrandColor(parsed.primaryColor)
      } catch (e) { console.error(e) }
    }
    setTimeout(() => setHeroReady(true), 200)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedFeature) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedFeature])

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  const [featRef, featInView] = useInView()
  const [segRef, segInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  const features = [
    { icon: LayoutDashboard, title: 'Dashboard Completo', description: 'Visualize todas as metricas importantes do seu negocio em tempo real', color: '#3B82F6' },
    { icon: Layers, title: 'Multi-Segmento', description: 'Funciona para sorveteria, loja de carros, grafica, restaurante e muito mais', color: '#6366F1' },
    { icon: Bot, title: 'Atendente IA', description: 'Configure um assistente virtual inteligente para atender seus clientes', color: '#8B5CF6' },
    { icon: Package, title: 'Gestao de Produtos', description: 'Gerencie produtos, precos, estoque e promocoes facilmente', color: '#10B981' },
    { icon: Users, title: 'Gestao de Equipe', description: 'Controle comissoes e desempenho da sua equipe', color: '#F59E0B' },
    { icon: BarChart3, title: 'Relatorios Detalhados', description: 'Analises completas de faturamento, conversao e atendimentos', color: '#EF4444' }
  ]

  const segmentos = [
    { name: 'Sorveteria', icon: IceCream, color: '#EC4899', image: '/images/icon-sorveteria.png' },
    { name: 'Loja de Carros', icon: Car, color: '#3B82F6', image: '/images/icon-carros.png' },
    { name: 'Grafica', icon: Printer, color: '#6366F1', image: '/images/icon-grafica.png' },
    { name: 'Loja de Roupas', icon: Shirt, color: '#8B5CF6', image: '/images/icon-roupas.png' },
    { name: 'Restaurante', icon: UtensilsCrossed, color: '#F59E0B' },
    { name: 'Clinica', icon: Hospital, color: '#10B981' },
    { name: 'Mercado', icon: ShoppingCart, color: '#EF4444' },
    { name: 'E muito mais', icon: Plus, color: '#6366F1' }
  ]

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden" onMouseMove={handleMouseMove}>

      {/* ═══════════ MODAL DE DEMONSTRAÇÃO ═══════════ */}
      {selectedFeature && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedFeature(null)}
          />
          <div 
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up"
            style={{ animation: 'fade-in 0.3s ease-out forwards' }}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 bg-white z-10 shrink-0">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center" 
                  style={{ background: `linear-gradient(135deg, ${selectedFeature.color}15, ${selectedFeature.color}05)` }}
                >
                  <selectedFeature.icon size={24} style={{ color: selectedFeature.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{selectedFeature.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{selectedFeature.description}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFeature(null)} 
                className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Area de Pre-visualização */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#FAFBFD] flex items-center justify-center relative">
              {/* Decorative bg inside modal */}
              <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
              
              <div className="relative z-10 w-full animate-fade-in">
                <FeatureMockup feature={selectedFeature} brandColor={brandColor} />
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-5 sm:p-6 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
              <p className="text-sm text-gray-500 hidden sm:block">Gostou do que viu?</p>
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <button 
                  onClick={() => setSelectedFeature(null)} 
                  className="px-5 py-2.5 rounded-xl text-gray-600 font-semibold hover:bg-gray-100 transition-colors"
                >
                  Fechar preview
                </button>
                <button 
                  onClick={() => navigate('/dashboard')} 
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  style={{ backgroundColor: brandColor, boxShadow: `0 4px 14px ${brandColor}40` }}
                >
                  Testar na Pratica
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ NAVBAR ═══════════ */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrollY > 60 ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrollY > 60 ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrollY > 60 ? '1px solid rgba(229,231,235,0.6)' : '1px solid transparent',
          boxShadow: scrollY > 60 ? '0 4px 30px rgba(0,0,0,0.04)' : 'none'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div 
              className="w-9 h-9 rounded-xl text-white text-xs font-bold flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ 
                background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
                boxShadow: `0 4px 14px ${brandColor}40`
              }}
            >
              {brandName.substring(0, 2).toUpperCase()}
            </div>
            <span className="font-bold text-gray-900 text-base tracking-tight">{brandName}</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="hidden md:block text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors px-3 py-1.5"
            >
              Recursos
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="landing-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300"
              style={{ 
                background: `linear-gradient(135deg, ${brandColor}, ${brandColor}cc)`,
                boxShadow: `0 4px 15px ${brandColor}35`
              }}
            >
              Acessar Dashboard
              <ArrowRight size={14} className="transition-transform duration-300" />
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 landing-mesh-bg" />
        <Particles />

        {/* Parallax orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="landing-orb absolute w-[500px] h-[500px] rounded-full"
            style={{ 
              background: `radial-gradient(circle, ${brandColor}15, transparent 70%)`,
              top: '10%', right: '-5%',
              transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)`
            }}
          />
          <div 
            className="landing-orb absolute w-[400px] h-[400px] rounded-full"
            style={{ 
              background: `radial-gradient(circle, #8B5CF620, transparent 70%)`,
              bottom: '5%', left: '-5%',
              transform: `translate(${mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)`,
              animationDelay: '-3s'
            }}
          />
          <div 
            className="landing-orb absolute w-[300px] h-[300px] rounded-full"
            style={{ 
              background: `radial-gradient(circle, #10B98115, transparent 70%)`,
              top: '50%', left: '30%',
              transform: `translate(${mousePos.x * -0.01}px, ${mousePos.y * 0.01}px)`,
              animationDelay: '-7s'
            }}
          />
        </div>

        <div className="absolute inset-0 landing-grid-pattern opacity-[0.03]" />

        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side — text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold mb-8 transition-all duration-700 landing-glass ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ 
                color: brandColor,
                border: `1px solid ${brandColor}20`,
                transitionDelay: '0.3s'
              }}
            >
              <Sparkles size={14} className="landing-sparkle" />
              Plataforma completa de gestao empresarial
              <span className="landing-badge-dot" style={{ backgroundColor: brandColor }} />
            </div>
            
            {/* Title */}
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ lineHeight: '1.08', transitionDelay: '0.5s' }}
            >
              Gerencie seu negocio<br />
              {heroReady && <Typewriter text="com inteligencia" delay={70} color={brandColor} />}
            </h1>
            
            {/* Subtitle */}
            <p 
              className={`text-gray-500 text-lg leading-relaxed max-w-xl mb-10 transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mx-auto lg:mx-0`}
              style={{ transitionDelay: '0.8s' }}
            >
              Plataforma completa de gestao empresarial com dashboard intuitivo, 
              atendente IA, controle de produtos e relatorios detalhados.
            </p>
            
            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12 transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1s' }}
            >
              <button 
                onClick={() => navigate('/dashboard')}
                className="landing-cta-glow group flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                style={{ 
                  background: `linear-gradient(135deg, ${brandColor}, #6366F1)`,
                  boxShadow: `0 8px 32px ${brandColor}40`
                }}
              >
                <Sparkles size={18} className="opacity-80" />
                Comecar Agora
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="landing-glass group flex items-center gap-3 px-8 py-4 rounded-2xl text-gray-700 font-bold text-base border border-gray-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg active:translate-y-0"
              >
                <Play size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                Ver Demonstracao
              </button>
            </div>

            {/* Trust indicators */}
            <div 
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-6 transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '1.3s' }}
            >
              {[
                { icon: Shield, text: '100% Seguro', color: '#10B981' },
                { icon: Zap, text: 'Setup em 5 min', color: '#F59E0B' },
                { icon: Globe, text: 'Acesso Global', color: '#3B82F6' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-400 text-sm font-medium group cursor-default">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${item.color}10` }}>
                    <item.icon size={15} style={{ color: item.color }} />
                  </div>
                  <span className="group-hover:text-gray-600 transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — hero image */}
          <div 
            className={`flex-1 max-w-lg lg:max-w-xl transition-all duration-1000 ${heroReady ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
            style={{ transitionDelay: '0.6s' }}
          >
            <div className="relative">
              {/* Glow behind image */}
              <div 
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20 scale-90"
                style={{ background: `linear-gradient(135deg, ${brandColor}, #8B5CF6)` }}
              />
              <img 
                src="/images/hero-dashboard.png" 
                alt={`Dashboard ${brandName}`} 
                className="relative z-10 w-full h-auto rounded-2xl landing-hero-float cursor-pointer transition-transform duration-300 hover:scale-105"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
                onClick={() => setSelectedFeature(features[0])}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 ${scrollY > 100 ? 'opacity-0' : 'opacity-60'}`}>
          <div className="landing-scroll-indicator flex flex-col items-center gap-2 text-gray-400">
            <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 landing-features-bg" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div ref={featRef} className={`text-center mb-16 transition-all duration-700 ${featInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 text-blue-600 text-xs font-semibold mb-4">
              <Zap size={12} />
              Tudo em um so lugar
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
              Recursos poderosos para<br />seu negocio
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">
              Tudo que voce precisa para gerenciar e expandir sua empresa em uma unica plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index}
                  onClick={() => setSelectedFeature(feature)}
                  className={`landing-feature-card group relative bg-white rounded-2xl border border-gray-100/80 p-8 transition-all duration-500 cursor-pointer ${featInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${feature.color}05, ${feature.color}10)` }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:-rotate-3"
                      style={{ 
                        background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}08)`,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 8px 24px ${feature.color}25`}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <Icon size={24} style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2.5 group-hover:text-gray-800 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                    
                    <div className="mt-6 flex items-center gap-1.5 text-[13px] font-bold opacity-80 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1" style={{ color: feature.color }}>
                      <Play size={12} className="fill-current" />
                      <span>Ver demonstracao</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ SEGMENTOS ═══════════ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div ref={segRef} className={`text-center mb-14 transition-all duration-700 ${segInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
              Funciona para qualquer<br />segmento
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">
              Nossa plataforma se adapta perfeitamente ao seu tipo de negocio
            </p>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-700 ${segInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
            {segmentos.map((seg, index) => {
              const SegIcon = seg.icon
              return (
                <div 
                  key={index}
                  className="landing-segment-card group relative bg-white rounded-2xl border border-gray-100/80 p-6 text-center transition-all duration-400 hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-2 hover:border-gray-200 cursor-default overflow-hidden"
                  style={{ transitionDelay: `${0.05 * index}s` }}
                >
                  {/* Image icon if available, otherwise Lucide icon */}
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {seg.image ? (
                      <img 
                        src={seg.image} 
                        alt={seg.name} 
                        className="w-12 h-12 object-contain rounded-xl"
                      />
                    ) : (
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${seg.color}15, ${seg.color}08)` }}
                      >
                        <SegIcon size={22} style={{ color: seg.color }} />
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{seg.name}</p>
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full group-hover:w-8 transition-all duration-300"
                    style={{ backgroundColor: seg.color }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="py-24 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${brandColor}, #4F46E5, #7C3AED)`,
          }}
        />
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="landing-cta-shape absolute w-96 h-96 rounded-full bg-white/[0.04]" style={{ top: '-10%', right: '-5%' }} />
          <div className="landing-cta-shape absolute w-72 h-72 rounded-full bg-white/[0.04]" style={{ bottom: '-15%', left: '-3%', animationDelay: '-4s' }} />
          <div className="landing-cta-shape absolute w-48 h-48 rounded-full bg-white/[0.06]" style={{ top: '30%', left: '20%', animationDelay: '-8s' }} />
          <div className="landing-cta-shape absolute w-32 h-32 rounded-full bg-white/[0.03]" style={{ top: '60%', right: '25%', animationDelay: '-2s' }} />
          <div className="absolute inset-0 landing-dots-pattern opacity-[0.06]" />
        </div>

        <div className={`max-w-2xl mx-auto text-center relative z-10 transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-6 backdrop-blur-sm border border-white/10">
            <Star size={12} />
            Comece gratuitamente
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Pronto para comecar?
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Experimente gratuitamente e veja como podemos<br className="hidden md:block" /> transformar a gestao do seu negocio
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="landing-cta-white group inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-white font-bold text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
            style={{ color: brandColor, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
          >
            Acessar Dashboard
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-12 px-6 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-gray-900" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-xl text-white text-[10px] font-bold flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor}cc)` }}
              >
                {brandName.substring(0, 2).toUpperCase()}
              </div>
              <span className="font-bold text-white text-sm">{brandName}</span>
            </div>
            
            <p className="text-xs text-gray-500">
              2026 {brandName}. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-8">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-300">
                Politica de Privacidade
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-300">
                Termos de Servico
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════ FLOATING BOT ═══════════ */}
      <button 
        onClick={() => navigate('/atendente-ia')}
        className="landing-floating-bot fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ 
          background: 'linear-gradient(135deg, #10B981, #059669)',
          boxShadow: '0 6px 24px rgba(16,185,129,0.4)'
        }}
        title="Atendente IA"
      >
        <Bot size={24} className="text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white landing-pulse-dot" />
      </button>
    </div>
  )
}

export default LandingPage
