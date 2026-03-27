import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setName("")
      setMessage("")
      onClose()
    }, 2500)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="relative z-10 w-full max-w-md mx-4 bg-[#0e0e0e] border border-white/10 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <Icon name="X" size={18} />
            </button>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-8 gap-4"
              >
                <Icon name="CheckCircle" size={40} className="text-white/60" />
                <p className="text-white font-serif text-lg tracking-wider">Спасибо!</p>
                <p className="text-white/50 text-xs text-center">Юлия свяжется с вами в ближайшее время</p>
              </motion.div>
            ) : (
              <>
                <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Связаться</span>
                <h2 className="font-serif text-2xl font-light text-white mt-2 mb-1 tracking-wider">Yastrebova JY</h2>
                <div className="h-px w-10 bg-white/20 mb-6" />

                <div className="flex flex-col gap-3 mb-6 text-white/50 text-sm">
                  <a
                    href="https://t.me/yastrebovajulie"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Icon name="Send" size={15} />
                    Telegram: @yastrebovajulie
                  </a>
                  <a
                    href="https://instagram.com/yastrebova_jy"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Icon name="Instagram" size={15} />
                    Instagram: @yastrebova_jy
                  </a>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="bg-transparent border border-white/20 text-white placeholder-white/30 text-sm px-4 py-3 outline-none focus:border-white/50 transition-colors"
                  />
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Сообщение — какой образ вас интересует?"
                    rows={4}
                    className="bg-transparent border border-white/20 text-white placeholder-white/30 text-sm px-4 py-3 outline-none focus:border-white/50 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="border border-white/40 hover:border-white text-white/70 hover:text-white text-xs tracking-[0.25em] uppercase py-3 transition-all duration-300 mt-1"
                  >
                    Отправить
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}