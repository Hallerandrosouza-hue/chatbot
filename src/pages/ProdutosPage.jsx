import React from 'react'
import { Package, Plus, Edit2, Trash2 } from 'lucide-react'

const ProdutosPage = () => {
  const produtos = [
    { id: 1, imagem: '🍫', nome: 'Sorvete de Chocolate', categoria: 'Sorvetes', descricao: 'Sorvete cremoso de chocolate belga premium', preco: 'R$ 15,00', estoque: 87, unidade: 'Litro' },
    { id: 2, imagem: '🥣', nome: 'Açaí 500ml', categoria: 'Açaí', descricao: 'Açaí puro batido na hora com frutas', preco: 'R$ 15,00', estoque: 124, unidade: 'Unidade' },
    { id: 3, imagem: '🍓', nome: 'Picolé de Morango', categoria: 'Picolés', descricao: 'Picolé artesanal de morango natural', preco: 'R$ 7,00', estoque: 203, unidade: 'Unidade' },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-800">
          <Package size={18} />
          <h2 className="font-semibold text-sm">Produtos e Serviços</h2>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm">
          <Plus size={14} /> Adicionar Produto
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F8FAFC] text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium w-20">Imagem</th>
              <th className="px-6 py-4 font-medium">Nome</th>
              <th className="px-6 py-4 font-medium">Categoria</th>
              <th className="px-6 py-4 font-medium">Descrição</th>
              <th className="px-6 py-4 font-medium">Preço</th>
              <th className="px-6 py-4 font-medium">Estoque</th>
              <th className="px-6 py-4 font-medium">Unidade</th>
              <th className="px-6 py-4 font-medium text-center w-24">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {produtos.map((produto) => (
              <tr key={produto.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl shadow-sm border border-gray-200">
                    {produto.imagem}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{produto.nome}</td>
                <td className="px-6 py-4 text-gray-500">{produto.categoria}</td>
                <td className="px-6 py-4 text-gray-500">{produto.descricao}</td>
                <td className="px-6 py-4 font-medium">{produto.preco}</td>
                <td className="px-6 py-4 text-gray-500">{produto.estoque}</td>
                <td className="px-6 py-4 text-gray-500">{produto.unidade}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProdutosPage
