'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Upload, Edit3, X, Lock } from 'lucide-react'
import { Button } from './ui/Button'
import { ContentItem } from '@/types'
import { cn } from '@/lib/utils'

interface ContentManagerProps {
  onAddContent?: (content: ContentItem) => void
}

export default function ContentManager({ onAddContent }: ContentManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'create'>('create')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authPrompt, setAuthPrompt] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Simple authentication - you can change this password
  const ADMIN_PASSWORD = 'engelbert2024admin'

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setAuthPrompt(false)
      setPassword('')
      setAuthError('')
      localStorage.setItem('admin_authenticated', 'true')
    } else {
      setAuthError('Contraseña incorrecta')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_authenticated')
    setIsOpen(false)
  }

  const handleFloatingButtonClick = () => {
    if (!isAuthenticated) {
      setAuthPrompt(true)
    } else {
      setIsOpen(true)
    }
  }
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'writing' as ContentItem['category'],
    tags: '',
    source: '',
    url: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newContent: ContentItem = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      date: new Date().toISOString().split('T')[0],
      category: formData.category,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      source: formData.source || undefined,
      url: formData.url || undefined,
      featured: false
    }

    onAddContent?.(newContent)
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'writing',
      tags: '',
      source: '',
      url: ''
    })
    setIsOpen(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    setFormData(prev => ({
      ...prev,
      title: file.name.replace(/\.[^/.]+$/, ''),
      content: text,
      source: file.name
    }))
  }

  return (
    <>
      <motion.button
        onClick={handleFloatingButtonClick}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-colors z-50 ${
          isAuthenticated 
            ? 'bg-black text-white hover:bg-gray-800' 
            : 'bg-gray-600 text-white hover:bg-gray-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isAuthenticated ? 'Gestión de Contenido' : 'Acceso de Administrador'}
      >
        {isAuthenticated ? <Plus className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
      </motion.button>

      {/* Authentication Modal */}
      <AnimatePresence>
        {authPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setAuthPrompt(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-gray-600" />
                  <h2 className="text-xl font-bold text-gray-900">Acceso de Administrador</h2>
                </div>
                <button
                  onClick={() => setAuthPrompt(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña de Administrador
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setAuthError('')
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ingresa tu contraseña"
                  />
                  {authError && (
                    <p className="text-sm text-red-600 mt-1">{authError}</p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAuthPrompt(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Acceder
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Gestión de Contenido</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                    title="Cerrar sesión"
                  >
                    Cerrar sesión
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('create')}
                  className={cn(
                    'flex-1 px-6 py-3 text-sm font-medium transition-colors',
                    activeTab === 'create' 
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  <Edit3 className="inline h-4 w-4 mr-2" />
                  Crear Nuevo
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={cn(
                    'flex-1 px-6 py-3 text-sm font-medium transition-colors',
                    activeTab === 'upload' 
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  <Upload className="inline h-4 w-4 mr-2" />
                  Subir Archivo
                </button>
              </div>

              <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === 'upload' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subir archivo de texto
                      </label>
                      <input
                        type="file"
                        accept=".txt,.md,.html"
                        onChange={handleFileUpload}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Formatos soportados: TXT, Markdown, HTML
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Título del contenido"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ContentItem['category'] }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="writing">Escritura</option>
                        <option value="interviews">Entrevistas</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extracto
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      rows={2}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Breve descripción del contenido"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenido *
                    </label>
                    <textarea
                      required
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={12}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="Escribe tu contenido aquí (soporta Markdown)"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (separados por comas)
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="IA, Tecnología, Análisis"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL de Referencia
                      </label>
                      <input
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://ejemplo.com"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Guardar Contenido
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}