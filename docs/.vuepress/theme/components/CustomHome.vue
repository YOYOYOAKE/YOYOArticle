<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue'

onMounted(async () => {
  const canvas = document.getElementById('background') as HTMLCanvasElement

  if (canvas) {
    const ctx = canvas.getContext('2d')

    if (ctx) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

      // 根据设备性能调整配置
      const isLowPerformance = isMobile || navigator.hardwareConcurrency <= 2

      // 粒子配置 - 根据设备性能动态调整
      const particleCount = isLowPerformance ? 80 : 160 // 粒子数量
      const particleSize = 2 // 粒子直径
      const influenceRadius = 300 // 鼠标影响半径

      // 性能优化配置
      const frameSkip = isLowPerformance ? 2 : 1 // 低性能设备跳帧
      let frameCounter = 0

      // 海浪配置
      let time = 0
      const waveCount = 6

      // 离屏Canvas优化海浪渲染
      let offscreenCanvas: HTMLCanvasElement | null = null
      let offscreenCtx: CanvasRenderingContext2D | null = null
      let lastWaveRenderTime = 0

      // 画布尺寸
      let width = 0
      let height = 0

      // 鼠标位置
      let mouseX = 0
      let mouseY = 0
      let prevMouseX = 0
      let prevMouseY = 0

      // 粒子类
      class Particle {
        // 位置
        x: number
        y: number
        // 速度
        vx: number
        vy: number
        // 基础速度
        baseVx: number
        baseVy: number
        // 颜色
        color: string
        // 与鼠标的距离
        distanceToMouse: number

        constructor() {
          this.x = Math.random() * width
          this.y = Math.random() * height
          this.vx = (Math.random() - 0.5) * 0.5
          this.vy = (Math.random() - 0.5) * 0.5
          this.baseVx = this.vx
          this.baseVy = this.vy
          this.color = '#ccc'
          this.distanceToMouse = Infinity
        }

        updatePosition() {
          // 随机游动
          this.baseVx += (Math.random() - 0.5) * 0.02
          this.baseVy += (Math.random() - 0.5) * 0.02

          // 限制基础速度
          this.baseVx = Math.max(-0.5, Math.min(0.5, this.baseVx))
          this.baseVy = Math.max(-0.5, Math.min(0.5, this.baseVy))

          // 鼠标影响 - 使用缓存的距离计算
          if (!isMobile) {
            if (this.distanceToMouse < influenceRadius) {
              const mouseVx = mouseX - prevMouseX
              const mouseVy = mouseY - prevMouseY
              const influence = 1 - (this.distanceToMouse / influenceRadius)
              this.vx = this.baseVx + mouseVx * influence * 0.05
              this.vy = this.baseVy + mouseVy * influence * 0.05
            } else {
              this.vx = this.baseVx
              this.vy = this.baseVy
            }
          } else {
            this.vx = this.baseVx
            this.vy = this.baseVy
          }

          // 更新位置
          this.x += this.vx
          this.y += this.vy

          // 边界处理
          if (this.x < 0) this.x = width
          if (this.x > width) this.x = 0
          if (this.y < 0) this.y = height
          if (this.y > height) this.y = 0
        }

        // 分离距离计算和颜色更新
        updateInfluence() {
          if (!isMobile) {
            // 使用平方距离比较避免Math.sqrt
            const dx = this.x - mouseX
            const dy = this.y - mouseY
            const squaredDistance = dx * dx + dy * dy
            const maxSquaredDistance = influenceRadius * influenceRadius

            if (squaredDistance < maxSquaredDistance) {
              this.distanceToMouse = Math.sqrt(squaredDistance)
              const ratio = 1 - (this.distanceToMouse / influenceRadius)
              // 使用位运算优化颜色计算
              const r = 204 + ((54 - 204) * ratio) | 0
              const g = 204 + ((116 - 204) * ratio) | 0
              const b = 204 + ((181 - 204) * ratio) | 0
              this.color = `rgb(${r}, ${g}, ${b})`
            } else {
              this.distanceToMouse = Infinity
              this.color = '#ccc'
            }
          }
        }

        draw() {
          if (!ctx) return

          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x, this.y, particleSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 粒子数组
      let particles: Particle[] = []

      // 处理画布大小更新
      const updateCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1

        const displayWidth = window.innerWidth
        const displayHeight = window.innerHeight

        canvas.width = displayWidth * dpr
        canvas.height = displayHeight * dpr
        canvas.style.width = displayWidth + 'px'
        canvas.style.height = displayHeight + 'px'

        width = displayWidth
        height = displayHeight

        ctx.scale(dpr, dpr)

        // 重新初始化粒子
        particles = []
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle())
        }

        // 初始化离屏Canvas
        if (!isLowPerformance) {
          offscreenCanvas = document.createElement('canvas')
          offscreenCanvas.width = width
          offscreenCanvas.height = height
          offscreenCtx = offscreenCanvas.getContext('2d')
        }
      }

      updateCanvasSize()

      // 绘制海浪背景
      const drawWave = () => {
        if (!ctx) return

        // 高性能设备使用离屏渲染优化
        if (!isLowPerformance && offscreenCanvas && offscreenCtx) {
          // 每隔几帧才重新渲染海浪到离屏Canvas
          if (frameCounter - lastWaveRenderTime > 3) {
            offscreenCtx.clearRect(0, 0, width, height)

            // 创建渐变
            const gradient = offscreenCtx.createLinearGradient(0, 0, 0, height)
            gradient.addColorStop(0, 'rgba(173, 216, 230, 0.6)')
            gradient.addColorStop(0.6, 'rgba(173, 216, 230, 0.3)')
            gradient.addColorStop(0.8, 'rgba(173, 216, 230, 0.1)')
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

            offscreenCtx.fillStyle = gradient
            offscreenCtx.fillRect(0, 0, width, height)

            // 在离屏Canvas上绘制海浪
            for (let i = 0; i < waveCount; i++) {
              offscreenCtx.beginPath()

              const amplitude = 20 + i * 5
              const frequency = 0.003 + i * 0.001
              const phase = time * (0.5 + i * 0.2)
              const yOffset = height * 0.1 + i * 30

              const alpha = 0.1 - i * 0.015
              offscreenCtx.fillStyle = `rgba(100, 149, 237, ${alpha})`

              offscreenCtx.moveTo(0, yOffset)

              for (let x = 0; x <= width; x += 4) {
                const y = yOffset + Math.sin(x * frequency + phase) * amplitude
                offscreenCtx.lineTo(x, y)
              }

              offscreenCtx.lineTo(width, height)
              offscreenCtx.lineTo(0, height)
              offscreenCtx.closePath()
              offscreenCtx.fill()
            }

            lastWaveRenderTime = frameCounter
          }

          // 将离屏Canvas绘制到主Canvas
          ctx.drawImage(offscreenCanvas, 0, 0)
          return
        }

        // 低性能设备的简化海浪绘制
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, 'rgba(173, 216, 230, 0.6)')
        gradient.addColorStop(0.6, 'rgba(173, 216, 230, 0.3)')
        gradient.addColorStop(0.8, 'rgba(173, 216, 230, 0.1)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        const reducedWaveCount = 3
        const step = 8

        for (let i = 0; i < reducedWaveCount; i++) {
          ctx.beginPath()

          const amplitude = 20 + i * 5
          const frequency = 0.003 + i * 0.001
          const phase = time * (0.5 + i * 0.2)
          const yOffset = height * 0.1 + i * 30

          const alpha = 0.1 - i * 0.015
          ctx.fillStyle = `rgba(100, 149, 237, ${alpha})`

          ctx.moveTo(0, yOffset)

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

      const draw = () => {
        // 跳帧优化 - 低性能设备降低帧率
        frameCounter++
        if (frameCounter % frameSkip !== 0) {
          return
        }

        ctx.clearRect(0, 0, width, height)

        // 先绘制海浪背景
        drawWave()

        // 批量更新粒子距离和颜色（减少频率）
        if (frameCounter % (frameSkip * 2) === 0) {
          particles.forEach(particle => {
            particle.updateInfluence()
          })
        }

        // 更新和绘制粒子
        particles.forEach(particle => {
          particle.updatePosition()
          particle.draw()
        })

        // 更新时间和鼠标位置记录
        time += 0.02
        prevMouseX = mouseX
        prevMouseY = mouseY
      }

      const animate = () => {
        draw()
        requestAnimationFrame(animate)
      }

      // 监听事件：页面可见性变化
      const handleVisibilityChange = () => {
        if (document.hidden) return
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)

      // 监听事件：窗口大小变化
      const handleResize = () => {
        updateCanvasSize()
      }
      window.addEventListener('resize', updateCanvasSize)

      // 监听事件：鼠标移动
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
      }
      // 非移动设备时添加鼠标移动监听
      if (!isMobile) {
        canvas.addEventListener('mousemove', handleMouseMove)
      }

      animate()

      onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        if (!isMobile) {
          canvas.removeEventListener('mousemove', handleMouseMove)
        }
      })
    }
  }
})
</script>

<template>
  <div>
    <canvas id="background" />
    <div id="title-group">
      <div id="title">YOYOArticle</div>
      <div id="slogen">𝑩𝒊𝒓𝒅𝒔 𝒂𝒓𝒆 𝒃𝒐𝒓𝒏 𝒘𝒊𝒕𝒉 𝒏𝒐 𝒔𝒉𝒂𝒄𝒌𝒍𝒆𝒔.</div>
      <div id="button-group">
        <VPButton href="/blog/">我的博客</VPButton>
        <VPButton href="https://github.com/YOYOYOAKE" theme="alt">我的 Github →</VPButton>
      </div>
    </div>

  </div>
</template>

<style>
#background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

#title-group {
  padding: 16px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  @media (max-width: 768px) {
    left: 50%;
    text-align: center;
    border: none;
    padding: 0;
  }

  #title {
    margin-bottom: 24px;

    font-size: 4.5rem;
    font-weight: 1000;
    line-height: 4.5rem;
    vertical-align: bottom;
    background-image: linear-gradient(to right bottom, var(--vp-c-brand-1), var(--vp-c-brand-2));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    @media (max-width: 768px) {
      font-size: 3.5rem;
      line-height: 3.5rem;
    }
  }

  #slogen {
    margin-bottom: 24px;

    font-size: 1.5rem;
    line-height: 1.5rem;
    vertical-align: bottom;
    color: var(--vp-c-text-3);

    @media (max-width: 768px) {
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }
}
</style>