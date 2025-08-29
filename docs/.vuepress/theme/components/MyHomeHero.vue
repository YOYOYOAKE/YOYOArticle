<script setup lang="ts">
import { ref } from 'vue'
import useMyHomeHero from '../script/useMyHomeHero'

const hero = {
  name: 'YOYOArticle',
  text: '𝑩𝒊𝒓𝒅𝒔 𝒂𝒓𝒆 𝒃𝒐𝒓𝒏 𝒘𝒊𝒕𝒉 𝒏𝒐 𝒔𝒉𝒂𝒄𝒌𝒍𝒆𝒔.',
  actions: [
    {
      theme: 'brand',
      text: '我的博客',
      link: '/blog/'
    },
    {
      theme: 'alt',
      text: '我的Github →',
      link: 'https://github.com/yoyoyoake/'
    }
  ]
}

const canvas = ref<HTMLCanvasElement>()

useMyHomeHero(canvas)

</script>

<template>
  <div class="vp-home-hero full once">
    <div class="bg-filter">
      <canvas ref="canvas" />
    </div>

    <div class="container">
      <div class="content">
        <h1 v-if="hero.name" class="hero-name" v-html="hero.name" />
        <p v-if="hero.text" class="hero-text" v-html="hero.text" />

        <div v-if="hero.actions.length" class="actions">
          <div class="action">
            <VPButton v-for="action in hero.actions" :key="action.link" tag="a" size="medium" :theme="action.theme"
              :text="action.text" :href="action.link" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-home-hero {
  position: relative;
  width: 100%;
}

.vp-home-hero.full {
  height: calc(100vh - var(--vp-nav-height));
}

.vp-home-hero.full.once {
  height: calc(100vh - var(--vp-nav-height) - var(--vp-footer-height, 0px));
}

.container {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
}

.vp-home-hero.full .container {
  align-items: center;
  justify-content: center;
}

.vp-home-hero:not(.full) .container {
  padding-top: 80px;
  padding-bottom: 80px;
}

.content {
  max-width: 960px;
  padding: 0 20px;
  margin: 0 auto;
  text-align: center;
  user-select: none;
}

.vp-home-hero.full .container .content {
  margin-top: -40px;
}

.hero-name {
  font-size: 48px;
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: -0.5px;

  background: var(--vp-bg-home-hero-name, linear-gradient(315deg, var(--vp-c-purple-1) 15%, var(--vp-c-brand-2) 65%, var(--vp-c-brand-2) 100%));
  -webkit-background-clip: text;
  background-clip: text;

  -webkit-text-fill-color: transparent;
}

.hero-text {
  margin: 18px 0 30px;
  font-size: 18px;
  font-weight: 500;
  color: var(--vp-c-home-hero-text, var(--vp-c-text-3));
  white-space: pre-wrap;
  transition: color var(--vp-t-color);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 30px 0 0;
}

.action {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  align-items: center;
  justify-content: center;
}

.action :deep(.vp-button) {
  margin-left: 0;
}

.action :deep(.vp-button:last-of-type) {
  margin-right: 0;
}

/* =========== background filter begin ======= */
.bg-filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  transform: translate3d(0, 0, 0);
}

.vp-home-hero.full.once .bg-filter {
  height: calc(100% + var(--vp-footer-height, 0px));
}

@property --vp-home-hero-bg-filter {
  inherits: false;
  initial-value: #fff;
  syntax: "<color>";
}

.bg-filter::after {
  --vp-home-hero-bg-filter: var(--vp-c-bg);

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  background: linear-gradient(to bottom, var(--vp-home-hero-bg-filter) 0, transparent 45%, transparent 55%, var(--vp-home-hero-bg-filter) 140%);
  transition: --vp-home-hero-bg-filter var(--vp-t-color);
}

.bg-filter canvas {
  width: 100%;
  height: 100%;
}

/* =========== background filter end ======= */

@media (min-width: 768px) {

  .hero-name {
    font-size: 64px;
  }

  .hero-text {
    font-size: 20px;
  }
}

@media (min-width: 960px) {

  .hero-name {
    font-size: 72px;
  }

  .hero-text {
    font-size: 24px;
  }
}
</style>
