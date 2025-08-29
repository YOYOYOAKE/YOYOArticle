import { onMounted, onUnmounted, Ref } from 'vue'

export default (canvas: Ref<HTMLCanvasElement | undefined>): void => {
  let ctx: CanvasRenderingContext2D | null = null
  let timer: number = 0
  let t: number = 0

  let canvasWidth: number = 0
  let canvasHeight: number = 0
  let renderRatio: number = 0.75

  let mouseX: number = 0
  let mouseY: number = 0

  const themeColor = { r: 54, g: 116, b: 181 }

  const particles: {
    x: number
    y: number
    vx: number
    vy: number
  }[] = []

  const resizeCanvas = () => {
    if (!canvas.value) return

    const rect = canvas.value.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    // Canvas 画布尺寸
    canvasWidth = rect.width
    canvasHeight = rect.height

    canvas.value.width = canvasWidth * dpr * renderRatio
    canvas.value.height = canvasHeight * dpr * renderRatio

    ctx = canvas.value.getContext('2d')!
    ctx.setTransform(dpr * renderRatio, 0, 0, dpr * renderRatio, 0, 0)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!canvas.value) return

    const rect = canvas.value.getBoundingClientRect()

    mouseX = event.clientX - rect.left
    mouseY = event.clientY - rect.top
  }

  const draw = () => {
    if (!ctx || !canvas.value) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    drawWaves(ctx, canvasWidth, canvasHeight)

    drawParticles(ctx, canvasWidth, canvasHeight)

    // 更新时间
    t += 0.01

    timer = window.requestAnimationFrame(draw)
  }

  const drawParticles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void => {
    // 更新位置
    const baseColor = { r: 128, g: 128, b: 128 }

    particles.forEach(particle => {
      particle.x += particle.vx
      particle.y += particle.vy

      // 边界反弹
      if (particle.x <= 1 || particle.x >= width - 1) {
        particle.vx = -particle.vx
        particle.x = Math.max(1, Math.min(width - 1, particle.x))
      }

      if (particle.y <= 1 || particle.y >= height - 1) {
        particle.vy = -particle.vy
        particle.y = Math.max(1, Math.min(height - 1, particle.y))
      }

      // 随机扰动
      particle.vx += (Math.random() - 0.5) * 0.01
      particle.vy += (Math.random() - 0.5) * 0.01

      // 限制速度
      const speedSq = particle.vx * particle.vx + particle.vy * particle.vy
      if (speedSq > 2.25) {
        particle.vx *= 0.9
        particle.vy *= 0.9
      }

      const dx = particle.x - mouseX
      const dy = particle.y - mouseY
      const distSq = dx * dx + dy * dy

      let r = baseColor.r
      let g = baseColor.g
      let b = baseColor.b

      if (distSq < 300 ** 2) {
        const t = 1 - distSq / (300 ** 2)
        r = baseColor.r + (themeColor.r - baseColor.r) * t
        g = baseColor.g + (themeColor.g - baseColor.g) * t
        b = baseColor.b + (themeColor.b - baseColor.b) * t
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const drawWaves = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void => {
    // 海浪参数
    const waveCount = 6
    const step = 64
    const waves: {
      path: Path2D
      fillStyle: string
    }[] = []

    for (let i = 0; i < waveCount; i++) {
      const amplitude = 20 + i * 5
      const frequency = 0.001 + i * 0.001
      const phase = t * (0.5 + i * 0.2)
      const yOffset = height * 0.06 + i * 15

      const alpha = 0.3 - i * 0.02
      const fillStyle = `rgba(${themeColor.r}, ${themeColor.g}, ${themeColor.b}, ${alpha})`

      const path = new Path2D()
      path.moveTo(0, yOffset)

      // 生成波浪路径
      for (let x = 0; x <= width; x += step) {
        const y = yOffset + Math.sin(x * frequency + phase) * amplitude
        path.lineTo(x, y)
      }

      if (width % step !== 0) {
        const y = yOffset + Math.sin(width * frequency + phase) * amplitude
        path.lineTo(width, y)
      }

      path.lineTo(width, height)
      path.lineTo(0, height)
      path.closePath()

      waves.push({ path, fillStyle })
    }

    // 绘制海浪
    waves.forEach(wave => {
      ctx.fillStyle = wave.fillStyle
      ctx.fill(wave.path)
    })
  }

  onMounted(() => {
    const initParticles = (): void => {
      for (let i = 0; i < 160; i++) {
        particles.push({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          vx: Math.random() - 0.5,
          vy: Math.random() - 0.5,
        })
      }
    }

    if (canvas.value) {
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      window.addEventListener('mousemove', handleMouseMove)
      if (timer) window.cancelAnimationFrame(timer)

      initParticles()
      draw()
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas)
    window.removeEventListener('mousemove', handleMouseMove)
    if (timer) window.cancelAnimationFrame(timer)
  })
}