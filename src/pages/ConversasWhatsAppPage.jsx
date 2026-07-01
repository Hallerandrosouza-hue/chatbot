import React, { useState, useEffect, useRef } from 'react'
import { Search, Send, CheckCheck, Smile, Paperclip, Phone, User, Tag, FileText, CheckCircle2, ChevronRight, Bot } from 'lucide-react'

// Canned AI Bot answers based on keywords
const getAIResponse = (userText) => {
  const text = userText.toLowerCase()
  
  if (text.includes('oi') || text.includes('olá') || text.includes('ola') || text.includes('bom dia') || text.includes('boa tarde')) {
    return "Olá! Sou o Atendente IA da Bottgua. 🍦 Como posso ajudar você hoje? Digite 'sabores' para ver nosso menu ou 'agendar' para marcar um horário!"
  }
  
  if (text.includes('sabor') || text.includes('sabores') || text.includes('sorvete') || text.includes('cardapio') || text.includes('cardápio')) {
    return "Temos sabores deliciosos hoje! 🍫 Chocolate Belga (R$ 15), 🍓 Morango Silvestre (R$ 7), 🥥 Coco Artesanal (R$ 12) e o nosso famoso 🥣 Açaí Completo (R$ 15). Qual você gostaria de pedir?"
  }
  
  if (text.includes('preco') || text.includes('preço') || text.includes('valor') || text.includes('quanto custa')) {
    return "Nossos picolés começam em R$ 7,00 e sorvetes premium em R$ 15,00. Aceitamos Pix, dinheiro e cartões de crédito/débito! 💳"
  }
  
  if (text.includes('agendar') || text.includes('agenda') || text.includes('retirar') || text.includes('retirada') || text.includes('horario') || text.includes('horário')) {
    return "Claro! Para agendar uma entrega ou retirada, me diga qual o melhor dia e horário. Atendemos de Segunda a Sexta das 09h às 18h! 📅"
  }
  
  if (text.includes('obrigado') || text.includes('obrigada') || text.includes('valeu') || text.includes('tchau')) {
    return "Por nada! Se precisar de mais alguma coisa, estarei aqui. Tenha um ótimo dia! 🍦✨"
  }

  return "Entendi! Estou processando seu pedido... Sou um agente IA em modo de simulação local. Você pode me perguntar sobre 'sabores', 'preços', ou pedir para 'agendar' um atendimento! 😊"
}

const initialContacts = [
  { id: 1, name: 'Maria Silva', phone: '+55 (11) 99888-7777', lastMessage: 'Quero Sorvete de Chocolate', time: '14:02', unread: 2, active: true, tags: ['Cliente Novo', 'Agendamento'], notes: 'Prefere retirar às 15:00.' },
  { id: 2, name: 'Carlos Santos', phone: '+55 (11) 98765-4321', lastMessage: 'Qual o valor do Açaí?', time: '13:58', unread: 0, active: true, tags: ['Dúvida Preços'], notes: 'Perguntou sobre adicionais.' },
  { id: 3, name: 'Juliana Lima', phone: '+55 (21) 97777-6666', lastMessage: 'Obrigado pela entrega rápida! 🍦', time: 'Ontem', unread: 0, active: false, tags: ['Fidelizado'], notes: 'Cliente recorrente.' },
  { id: 4, name: 'Roberto Alencar', phone: '+55 (11) 96543-2100', lastMessage: 'Amanhã vou querer retirar', time: 'Ontem', unread: 0, active: true, tags: ['Agendamento'], notes: 'Trabalha perto da loja.' }
]

const initialMessages = {
  1: [
    { sender: 'contact', text: 'Olá! Vocês estão abertos hoje?', time: '13:50', isIA: false },
    { sender: 'bot', text: 'Olá! Sim, funcionamos até às 22h hoje. 🍦', time: '13:51', isIA: true },
    { sender: 'contact', text: 'Que ótimo! Quero Sorvete de Chocolate', time: '14:02', isIA: false }
  ],
  2: [
    { sender: 'contact', text: 'Boa tarde! Qual o valor do Açaí?', time: '13:58', isIA: false }
  ],
  3: [
    { sender: 'contact', text: 'Oi, meu pedido já saiu?', time: 'Ontem 11:30', isIA: false },
    { sender: 'bot', text: 'Sim! O entregador já está a caminho.', time: 'Ontem 11:32', isIA: true },
    { sender: 'contact', text: 'Obrigado pela entrega rápida! 🍦', time: 'Ontem 11:45', isIA: false }
  ],
  4: [
    { sender: 'contact', text: 'Amanhã vou querer retirar', time: 'Ontem 17:00', isIA: false }
  ]
}

const ConversasWhatsAppPage = () => {
  const [contacts, setContacts] = useState(initialContacts)
  const [activeContactId, setActiveContactId] = useState(1)
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')
  const [search, setSearch] = useState('')
  const [filterActive, setFilterActive] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [newTagName, setNewTagName] = useState('')
  
  const messagesEndRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeContactId, isTyping])

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0]
  const currentChatMessages = messages[activeContact.id] || []

  // Add a new tag to the active contact
  const handleAddTag = (e) => {
    e.preventDefault()
    if (!newTagName.trim()) return
    setContacts(contacts.map(c => {
      if (c.id === activeContact.id) {
        if (c.tags.includes(newTagName.trim())) return c
        return { ...c, tags: [...c.tags, newTagName.trim()] }
      }
      return c
    }))
    setNewTagName('')
  }

  // Remove tag
  const handleRemoveTag = (tagToRemove) => {
    setContacts(contacts.map(c => {
      if (c.id === activeContact.id) {
        return { ...c, tags: c.tags.filter(t => t !== tagToRemove) }
      }
      return c
    }))
  }

  // Edit notes
  const handleNoteChange = (newNotes) => {
    setContacts(contacts.map(c => {
      if (c.id === activeContact.id) {
        return { ...c, notes: newNotes }
      }
      return c
    }))
  }

  // Handle message send
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const textToSend = inputText.trim()
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    // Append user message
    const updatedChatMessages = [
      ...currentChatMessages,
      { sender: 'user', text: textToSend, time: timeStr, isIA: false }
    ]

    setMessages({
      ...messages,
      [activeContact.id]: updatedChatMessages
    })

    // Update last message in contact list
    setContacts(contacts.map(c => {
      if (c.id === activeContact.id) {
        return { ...c, lastMessage: textToSend, time: timeStr, unread: 0 }
      }
      return c
    }))

    setInputText('')

    // Simulate Agent IA response
    setIsTyping(true)
    setTimeout(() => {
      const aiResponseText = getAIResponse(textToSend)
      const aiTime = new Date()
      const aiTimeStr = `${String(aiTime.getHours()).padStart(2, '0')}:${String(aiTime.getMinutes()).padStart(2, '0')}`

      setMessages(prev => ({
        ...prev,
        [activeContact.id]: [
          ...(prev[activeContact.id] || []),
          { sender: 'bot', text: aiResponseText, time: aiTimeStr, isIA: true }
        ]
      }))

      setContacts(prevContacts => prevContacts.map(c => {
        if (c.id === activeContact.id) {
          return { ...c, lastMessage: aiResponseText.slice(0, 30) + '...', time: aiTimeStr }
        }
        return c
      }))
      
      setIsTyping(false)
    }, 1500)
  }

  // Clean unread count on select
  const handleSelectContact = (id) => {
    setActiveContactId(id)
    setContacts(contacts.map(c => c.id === id ? { ...c, unread: 0 } : c))
  }

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
    const matchesStatus = filterActive ? c.active : !c.active
    return matchesSearch && matchesStatus
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] h-[calc(100vh-140px)] flex">
      
      {/* Left panel: Contacts List */}
      <div className="w-[320px] border-r border-gray-150 flex flex-col h-full shrink-0">
        {/* Search */}
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar conversas..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50/50" 
            />
          </div>
          
          {/* Tabs Active/Resolved */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterActive(true)}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${filterActive ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Ativas
            </button>
            <button
              onClick={() => setFilterActive(false)}
              className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${!filterActive ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Resolvidas
            </button>
          </div>
        </div>

        {/* Contacts */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => handleSelectContact(contact.id)}
                className={`p-4 cursor-pointer flex justify-between items-start transition-all hover:bg-gray-50/50 ${activeContact.id === contact.id ? 'bg-blue-50/20 border-l-2 border-blue-500' : ''}`}
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-inner shrink-0 border border-blue-200">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">{contact.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{contact.phone}</p>
                    <p className="text-[11px] text-gray-500 mt-1 truncate max-w-[170px]">{contact.lastMessage}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[9px] text-gray-400 font-medium">{contact.time}</span>
                  {contact.unread > 0 && (
                    <span className="bg-green-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400 text-xs mt-10">Nenhuma conversa encontrada</div>
          )}
        </div>
      </div>

      {/* Middle Panel: Chat History */}
      <div className="flex-1 flex flex-col h-full bg-[#FAFBFD] relative">
        {/* Chat Header */}
        <div className="h-16 bg-white border-b border-gray-150 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shadow-inner">
              {activeContact.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-800">{activeContact.name}</h3>
              <p className="text-[9px] text-green-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Conversa aberta
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-bold flex items-center gap-1 border border-blue-100">
              <Bot size={12} /> Agente IA Ativo
            </span>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {currentChatMessages.map((msg, i) => {
            const isUser = msg.sender === 'user'
            const isBot = msg.sender === 'bot'
            
            return (
              <div 
                key={i} 
                className={`flex flex-col max-w-[70%] ${
                  isUser ? 'ml-auto items-end' : 'items-start'
                }`}
              >
                {/* Name Label */}
                <span className="text-[9px] font-semibold text-gray-400 mb-1 ml-1">
                  {isUser ? 'Você' : isBot ? 'Atendente IA (Bottgua)' : activeContact.name}
                </span>

                {/* Message Bubble */}
                <div 
                  className={`px-4 py-2.5 rounded-2xl shadow-sm text-xs leading-relaxed border ${
                    isUser 
                      ? 'bg-blue-500 text-white border-blue-600 rounded-tr-none' 
                      : isBot
                      ? 'bg-white text-gray-800 border-gray-150 rounded-tl-none ring-1 ring-blue-50/50'
                      : 'bg-gray-100 text-gray-800 border-gray-250 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                
                {/* Time & Read Status */}
                <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-400 px-1">
                  <span>{msg.time}</span>
                  {isUser && <CheckCheck size={11} className="text-blue-500" />}
                </div>
              </div>
            )
          })}

          {/* Typing Simulator */}
          {isTyping && (
            <div className="flex flex-col items-start max-w-[70%]">
              <span className="text-[9px] font-semibold text-gray-400 mb-1 ml-1">Atendente IA (Bottgua)</span>
              <div className="bg-white border border-gray-150 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-150 flex items-center gap-3 shrink-0">
          <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
            <Smile size={18} />
          </button>
          <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip size={18} />
          </button>
          
          <input 
            type="text" 
            placeholder="Digite sua mensagem para o cliente (e teste o Bot de IA)..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50/50" 
          />
          
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-xl shadow-sm transition-colors"
          >
            <Send size={14} />
          </button>
        </form>
      </div>

      {/* Right Panel: Lead Details */}
      <div className="w-[280px] border-l border-gray-150 flex flex-col h-full bg-white shrink-0 p-5 space-y-6 overflow-y-auto">
        <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Detalhes do Lead</h3>

        {/* Contact Info */}
        <div className="space-y-3 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <User size={14} className="text-gray-400" />
            <span className="font-semibold text-gray-800">{activeContact.name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Phone size={14} className="text-gray-400" />
            <span>{activeContact.phone}</span>
          </div>
        </div>

        {/* Tags Section */}
        <div className="space-y-3 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
            <Tag size={14} className="text-blue-500" />
            <span>Tags</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {activeContact.tags.map(tag => (
              <span 
                key={tag} 
                className="text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-150 px-2 py-0.5 rounded flex items-center gap-1"
              >
                {tag}
                <button 
                  type="button" 
                  onClick={() => handleRemoveTag(tag)}
                  className="text-blue-400 hover:text-blue-600 text-[10px]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={handleAddTag} className="flex gap-1.5 mt-2">
            <input 
              type="text" 
              placeholder="Nova tag..." 
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="border border-gray-200 rounded px-2 py-1 text-[10px] flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded border border-gray-200"
            >
              +
            </button>
          </form>
        </div>

        {/* Notes Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
            <FileText size={14} className="text-blue-500" />
            <span>Observações</span>
          </div>
          <textarea
            rows={4}
            value={activeContact.notes}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Anotações internas sobre este cliente..."
            className="w-full border border-gray-200 rounded-lg p-2.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Quick Help */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-[10px] text-blue-600 space-y-1">
          <p className="font-bold">Como funciona a IA?</p>
          <p className="leading-relaxed">
            Envie uma mensagem contendo palavras como: <strong>sabores</strong>, <strong>preços</strong>, ou <strong>agendar</strong> para ver o agente IA responder automaticamente!
          </p>
        </div>

      </div>

    </div>
  )
}

export default ConversasWhatsAppPage
