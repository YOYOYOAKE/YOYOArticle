<script setup lang="ts">

</script>

<template>
  <div id="title-group">
    <div id="title">YOYOArticle</div>
    <div id="slogen">𝑩𝒊𝒓𝒅𝒔 𝒂𝒓𝒆 𝒃𝒐𝒓𝒏 𝒘𝒊𝒕𝒉 𝒏𝒐 𝒔𝒉𝒂𝒄𝒌𝒍𝒆𝒔.</div>
    <div id="button-group">
      <VPButton href="/blog/">我的博客</VPButton>
      <VPButton href="https://github.com/YOYOYOAKE" theme="alt">我的 Github →</VPButton>
    </div>
  </div>
</template>

<style lang="less">
#title-group {
  padding: 16px;

  position: absolute;
  top: 40%;
  left: 30%;
  transform: translate(-50%, -50%);
  text-align: left;

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