import { motion } from "framer-motion"

export default function Overlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute top-8 left-0 right-0 flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="flex flex-col items-center"
        >
          <span className="font-serif text-xs tracking-[0.4em] uppercase text-white/60 mb-1">Collection 2025</span>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-white tracking-widest">
            VELO
          </h1>
          <div className="h-px w-16 bg-white/30 mt-2" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3"
      >
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Drag to explore</p>
        <div className="flex gap-6 pointer-events-auto">
          <button className="text-white/60 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300 border-b border-white/20 hover:border-white/60 pb-1">
            Shop
          </button>
          <button className="text-white/60 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300 border-b border-white/20 hover:border-white/60 pb-1">
            About
          </button>
          <button className="text-white/60 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300 border-b border-white/20 hover:border-white/60 pb-1">
            Contact
          </button>
        </div>
      </motion.div>
    </div>
  )
}
