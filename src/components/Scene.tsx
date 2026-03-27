import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function useLoadedTextures(urls: string[]) {
  const [textures, setTextures] = useState<(THREE.Texture | null)[]>(Array(urls.length).fill(null))

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = "anonymous"
    urls.forEach((url, i) => {
      loader.load(url, (tex) => {
        setTextures((prev) => {
          const next = [...prev]
          next[i] = tex
          return next
        })
      })
    })
  }, [])

  return textures
}

const images = [
  "https://cdn.poehali.dev/projects/64c0066b-75ed-4ca7-9a62-72c25709d50b/bucket/c5fff5cd-b6aa-4315-8529-bbb706529c71.jpeg",
  "https://cdn.poehali.dev/projects/64c0066b-75ed-4ca7-9a62-72c25709d50b/bucket/2842d813-70c7-4673-9a50-7fdc79b72802.jpeg",
  "https://cdn.poehali.dev/projects/64c0066b-75ed-4ca7-9a62-72c25709d50b/bucket/80015b33-c370-4ea4-873d-c58e05da965e.jpeg",
  "https://cdn.poehali.dev/projects/64c0066b-75ed-4ca7-9a62-72c25709d50b/bucket/411b5875-6497-4e79-bcc6-ce05555bd621.jpeg",
  "https://cdn.poehali.dev/projects/64c0066b-75ed-4ca7-9a62-72c25709d50b/bucket/4bdea667-f39a-4d46-ab09-885ba543f07b.jpeg",
  "https://cdn.poehali.dev/projects/64c0066b-75ed-4ca7-9a62-72c25709d50b/bucket/c5fff5cd-b6aa-4315-8529-bbb706529c71.jpeg",
  "https://cdn.poehali.dev/projects/64c0066b-75ed-4ca7-9a62-72c25709d50b/bucket/2842d813-70c7-4673-9a50-7fdc79b72802.jpeg",
  "https://cdn.poehali.dev/projects/64c0066b-75ed-4ca7-9a62-72c25709d50b/bucket/80015b33-c370-4ea4-873d-c58e05da965e.jpeg",
]

export const imagesMeta = [
  { title: "Street Collection", description: "Ансамбль с широкополой шляпой и пиджаком с фринжем. Городская сцена, три образа.", url: images[0] },
  { title: "Pink Jacket", description: "Розовый жакет с чёрно-белым шарфом в полоску. Выполнен в пастельной технике на крафте.", url: images[1] },
  { title: "Hussar Coat", description: "Гусарский сюртук из джинса с красными позументами, колпак для маскарада, сумка Биркин.", url: images[2] },
  { title: "Black Maxi", description: "Чёрный максимальный силуэт с открытым плечом и синими солнечными очками oversize.", url: images[3] },
  { title: "White Blazer", description: "Белый блейзер с разрезами на лацканах, радужные брюки, кроссовки. Подпись Yastrebova.", url: images[4] },
  { title: "Street Collection II", description: "Второй взгляд на уличную коллекцию.", url: images[5] },
  { title: "Pink Jacket II", description: "Детальный вид розового жакета.", url: images[6] },
  { title: "Black Maxi II", description: "Детальный вид чёрного образа.", url: images[7] },
]

const imagePositions = [
  { pos: [-3.2, 1.8, -2.5] as [number, number, number], rot: [0, 0.4, 0] as [number, number, number], scale: 0.85 },
  { pos: [2.8, -1.2, -3] as [number, number, number], rot: [0, -0.5, 0] as [number, number, number], scale: 0.9 },
  { pos: [-1.5, 2.5, -1.8] as [number, number, number], rot: [0, 0.3, 0] as [number, number, number], scale: 0.8 },
  { pos: [3.5, 0.8, -2.2] as [number, number, number], rot: [0, -0.4, 0] as [number, number, number], scale: 0.88 },
  { pos: [-2.8, -2.1, -2.8] as [number, number, number], rot: [0, 0.5, 0] as [number, number, number], scale: 0.82 },
  { pos: [1.2, 2.2, -2.5] as [number, number, number], rot: [0, -0.3, 0] as [number, number, number], scale: 0.9 },
  { pos: [-3.5, 0.5, -2] as [number, number, number], rot: [0, 0.6, 0] as [number, number, number], scale: 0.78 },
  { pos: [2.2, -2.5, -2.6] as [number, number, number], rot: [0, -0.4, 0] as [number, number, number], scale: 0.86 },
]

interface FloatingImageProps {
  texture: THREE.Texture
  index: number
  rotation: number
  onSelect: (index: number) => void
}

function FloatingImage({ texture, index, rotation, onSelect }: FloatingImageProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const config = imagePositions[index]
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return

    const targetRotY = config.rot[1] + rotation
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.12)

    const time = state.clock.getElapsedTime()
    // Усиленное дыхание: амплитуда 0.35 вместо 0.1
    meshRef.current.position.y = config.pos[1] + Math.sin(time * 0.6 + index * 1.1) * 0.35

    // Масштаб при наведении
    const targetScale = hovered ? config.scale * 1.08 : config.scale
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    )
  })

  return (
    <mesh
      ref={meshRef}
      position={config.pos}
      rotation={config.rot}
      scale={config.scale}
      onClick={() => onSelect(index)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[0.833, 1.2]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={hovered ? 1 : 0.92}
        side={THREE.DoubleSide}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  )
}

interface SceneProps {
  onSelectImage: (index: number) => void
}

export default function Scene({ onSelectImage }: SceneProps) {
  const [rotation, setRotation] = useState(0)
  const [targetRotation, setTargetRotation] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [lastInteraction, setLastInteraction] = useState(Date.now())
  const { camera, size } = useThree()
  const mousePosition = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const dragRotation = useRef(0)

  const textures = useLoadedTextures(images)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - dragStart.current.x
        const rotationAmount = (deltaX / size.width) * Math.PI * 2
        setTargetRotation(dragRotation.current + rotationAmount)
      } else {
        mousePosition.current = {
          x: (e.clientX / size.width) * 2 - 1,
          y: -(e.clientY / size.height) * 2 + 1,
        }
      }
      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [size])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      dragStart.current = { x: e.clientX, y: e.clientY }
      dragRotation.current = targetRotation
      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [targetRotation])

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      dragRotation.current = targetRotation
      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        const deltaX = e.touches[0].clientX - dragStart.current.x
        const rotationAmount = (deltaX / size.width) * Math.PI * 2
        setTargetRotation(dragRotation.current + rotationAmount)
      }
      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    const handleTouchEnd = () => {
      isDragging.current = false
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [targetRotation, size])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setTargetRotation((prev) => prev + Math.PI / 3)
        setLastInteraction(Date.now())
        setIsAutoPlaying(false)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setTargetRotation((prev) => prev - Math.PI / 3)
        setLastInteraction(Date.now())
        setIsAutoPlaying(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    let isThrottled = false

    const handleWheel = (e: WheelEvent) => {
      if (isThrottled) return
      isThrottled = true
      setTimeout(() => { isThrottled = false }, 400)

      if (e.deltaY > 0) {
        setTargetRotation((prev) => prev + Math.PI / 3)
      } else {
        setTargetRotation((prev) => prev - Math.PI / 3)
      }

      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => { window.removeEventListener("wheel", handleWheel) }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteraction
      if (timeSinceLastInteraction > 3000) {
        setIsAutoPlaying(true)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [lastInteraction])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setTargetRotation((prev) => prev + Math.PI / 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useFrame(() => {
    if (!isDragging.current) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.current.x * 0.5, 0.1)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.current.y * 0.5, 0.1)
    }
    camera.lookAt(0, 0, 0)

    setRotation((prev) => THREE.MathUtils.lerp(prev, targetRotation, 0.12))
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#ff6b35" />
      <spotLight position={[0, 5, 5]} intensity={0.3} angle={0.6} penumbra={1} />

      {textures.map((texture, index) =>
        texture ? (
          <FloatingImage key={index} texture={texture} index={index} rotation={rotation} onSelect={onSelectImage} />
        ) : null
      )}

      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0a0a0a" transparent opacity={0.2} roughness={0.1} metalness={0.9} />
      </mesh>
    </>
  )
}