<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('background') as HTMLCanvasElement

  if (canvas) {
    const ctx = canvas.getContext('2d')

    if (ctx) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

      // 元素尺寸
      const size = 75
      const halfSize = size / 2
      const highlightDistance = halfSize
      const circleRadius = halfSize / 2

      // 偏移量
      let offsetX = 0
      let offsetY = 0

      // 画布尺寸
      let width = 0
      let height = 0

      // 鼠标位置
      let mouseX = 0
      let mouseY = 0

      const updateCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1

        const displayWidth = window.innerWidth
        const displayHeight = window.innerHeight

        canvas.width = displayWidth * dpr
        canvas.height = displayHeight * dpr

        width = canvas.width
        height = canvas.height

        ctx.scale(dpr, dpr)

        ctx.strokeStyle = '#ccc'
        ctx.lineWidth = 1
      }

      updateCanvasSize()

      const draw = () => {
        ctx.clearRect(0, 0, width, height)

        for (let x = -halfSize; x < width + halfSize; x += size) {
          for (let y = -halfSize; y < height + halfSize; y += size) {
            const centerX = x + halfSize / 2 + offsetX
            const centerY = y + halfSize / 2 + offsetY

            // 在非移动设备下才检测鼠标位置
            const distance = !isMobile ? Math.hypot(centerX - mouseX, centerY - mouseY) : Infinity
            const isHighlight = distance < highlightDistance

            if (isHighlight) {
              // 绘制圆形
              ctx.strokeStyle = '#3674b5'
              ctx.lineWidth = 2

              ctx.beginPath()
              ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
              ctx.stroke()
              ctx.closePath()
            } else {
              // 绘制交叉线
              ctx.strokeStyle = '#ccc'
              ctx.lineWidth = 1

              // 绘制从左上到右下的线
              ctx.beginPath()
              ctx.moveTo(x + offsetX, y + offsetY)
              ctx.lineTo(x + halfSize + offsetX, y + halfSize + offsetY)
              ctx.stroke()
              ctx.closePath()

              // 绘制从右上到左下的线
              ctx.beginPath()
              ctx.moveTo(x + halfSize + offsetX, y + offsetY)
              ctx.lineTo(x + offsetX, y + halfSize + offsetY)
              ctx.stroke()
              ctx.closePath()
            }
          }
        }
      }

      const animate = () => {
        offsetX = (offsetX + 0.5) % size
        offsetY = (offsetY + 0.5) % size
        draw()
        requestAnimationFrame(animate)
      }

      // 监听事件：窗口大小变化
      const handleResize = () => {
        updateCanvasSize()
        draw()
      }
      window.addEventListener('resize', handleResize)

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
    <CustomHomeTitle />

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


</style>