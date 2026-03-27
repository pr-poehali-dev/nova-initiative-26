import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import Scene from "./Scene"
import Overlay from "./Overlay"
import LoadingScreen from "./LoadingScreen"
import LookDetail from "./LookDetail"
import ContactModal from "./ContactModal"

export default function Gallery3D() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [contactOpen, setContactOpen] = useState(false)

  const handleSelectImage = (index: number) => {
    setSelectedImage(index)
  }

  const handleContact = () => {
    setSelectedImage(null)
    setContactOpen(true)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: false }}>
        <Suspense fallback={null}>
          <Scene onSelectImage={handleSelectImage} />
        </Suspense>
      </Canvas>
      <Overlay onContact={() => setContactOpen(true)} />
      <LoadingScreen />
      <LookDetail
        index={selectedImage}
        onClose={() => setSelectedImage(null)}
        onContact={handleContact}
      />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
