import { onMounted, onUnmounted, Ref } from 'vue'

export default (canvas: Ref<HTMLCanvasElement | undefined>): void => {
  let ctx: CanvasRenderingContext2D | null = null
  let timer: number = 0
  let t: number = 0
  let canvasWidth: number = 0
  let canvasHeight: number = 0
  let renderRatio: number = 0.75

  const resizeCanvas = () => {
    if (!canvas.value) return

    const rect = canvas.value.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    // 设置实际 Canvas 尺寸（考虑设备像素比率）
    canvasWidth = rect.width * dpr * renderRatio
    canvasHeight = rect.height * dpr * renderRatio

    canvas.value.width = canvasWidth
    canvas.value.height = canvasHeight

    ctx = canvas.value.getContext('2d')!
    ctx.scale(dpr, dpr)

    // 设置显示尺寸
    canvas.value.style.width = rect.width * dpr + 'px'
    canvas.value.style.height = rect.height * dpr + 'px'

    // 重新初始化粒子
    // initParticles(rect.width, rect.height)
  }

  const draw = (): void => {
    if (!ctx || !canvas.value) return

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    drawBackground(ctx, canvasWidth, canvasHeight)

    // 更新时间
    t += 0.02

    timer = window.requestAnimationFrame(draw)
  }

  const drawParticle = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void => {

  }

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void => {

    // 海浪参数
    const waveCount = 4
    const step = 64

    // 绘制多层海浪
    for (let i = 0; i < waveCount; i++) {
      ctx.beginPath()

      const amplitude = 20 + i * 5
      const frequency = 0.003 + i * 0.001
      const phase = t * (0.5 + i * 0.2)
      const yOffset = height * 0.06 + i * 15

      const alpha = 0.3 - i * 0.02
      ctx.fillStyle = `rgba(70, 120, 200, ${alpha})`

      ctx.moveTo(0, yOffset)

      // 绘制波浪路径
      for (let x = 0; x <= width; x += step) {
        const y = yOffset + Math.sin(x * frequency + phase) * amplitude
        ctx.lineTo(x, y)
      }

      if (width % step !== 0) {
        const y = yOffset + Math.sin(width * frequency + phase) * amplitude
        ctx.lineTo(width, y)
      }

      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()
    }
  }

  onMounted(() => {
    if (canvas.value) {
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      if (timer) window.cancelAnimationFrame(timer)

      draw()
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas)
    if (timer) window.cancelAnimationFrame(timer)
  })
}