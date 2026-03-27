import { motion, AnimatePresence } from "framer-motion"
import { imagesMeta } from "./Scene"
import Icon from "@/components/ui/icon"

interface LookDetailProps {
  index: number | null
  onClose: () => void
  onContact: () => void
}

export default function LookDetail({ index, onClose, onContact }: LookDetailProps) {
  const look = index !== null ? imagesMeta[index] : null

  return (
    <AnimatePresence>
      {look && (
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
            className="relative z-10 flex flex-col md:flex-row gap-0 max-w-3xl w-full mx-4 bg-[#0e0e0e] border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-1/2 w-full aspect-[3/4] overflow-hidden">
              <img
                src={look.url}
                alt={look.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 flex flex-col justify-between p-8">
              <div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                  <Icon name="X" size={18} />
                </button>
                <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Collection 2025</span>
                <h2 className="font-serif text-2xl font-light text-white mt-2 tracking-wider">{look.title}</h2>
                <div className="h-px w-10 bg-white/20 my-4" />
                <p className="text-white/60 text-sm leading-relaxed">{look.description}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={onContact}
                  className="w-full border border-white/30 text-white/80 hover:text-white hover:border-white text-xs tracking-[0.25em] uppercase py-3 transition-all duration-300"
                >
                  Заказать / Узнать цену
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-white/30 hover:text-white/60 text-xs tracking-[0.2em] uppercase py-2 transition-colors duration-300"
                >
                  Вернуться в галерею
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
