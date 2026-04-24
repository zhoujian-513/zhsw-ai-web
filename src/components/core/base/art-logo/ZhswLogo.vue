<!-- 智慧水管家 SVG Logo -->
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00d4ff" />
        <stop offset="100%" stop-color="#0066cc" />
      </linearGradient>
      <linearGradient id="grad-drop" x1="0%" y1="0%" x2="60%" y2="100%">
        <stop offset="0%" stop-color="#40eeff" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0044aa" stop-opacity="0.85" />
      </linearGradient>
      <radialGradient id="glow-ring" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stop-color="#00bfff" stop-opacity="0" />
        <stop offset="100%" stop-color="#00bfff" stop-opacity="0.25" />
      </radialGradient>
      <filter id="drop-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#00d4ff" flood-opacity="0.6" />
      </filter>
    </defs>

    <!-- 外圆光晕 -->
    <circle cx="60" cy="60" r="58" fill="url(#glow-ring)" />

    <!-- 外环六边形 -->
    <polygon
      points="60,4 108,32 108,88 60,116 12,88 12,32"
      fill="none"
      stroke="url(#grad-main)"
      stroke-width="2"
      stroke-linejoin="round"
      opacity="0.7"
    />

    <!-- 内六边形 -->
    <polygon
      points="60,14 100,37 100,83 60,106 20,83 20,37"
      fill="#051a3a"
      stroke="url(#grad-main)"
      stroke-width="1.5"
      stroke-linejoin="round"
      opacity="0.9"
    />

    <!-- 科技装饰线：左上 -->
    <line x1="20" y1="37" x2="10" y2="28" stroke="#00d4ff" stroke-width="1" opacity="0.5" />
    <circle cx="9" cy="27" r="2" fill="#00d4ff" opacity="0.6" />

    <!-- 科技装饰线：右上 -->
    <line x1="100" y1="37" x2="110" y2="28" stroke="#00d4ff" stroke-width="1" opacity="0.5" />
    <circle cx="111" cy="27" r="2" fill="#00d4ff" opacity="0.6" />

    <!-- 科技装饰线：底部 -->
    <line x1="60" y1="106" x2="60" y2="116" stroke="#00d4ff" stroke-width="1" opacity="0.5" />
    <circle cx="60" cy="118" r="2" fill="#00d4ff" opacity="0.6" />

    <!-- 水滴主体 -->
    <path
      d="M60 28 C60 28 38 52 38 66 C38 78.15 48.06 88 60 88 C71.94 88 82 78.15 82 66 C82 52 60 28 60 28 Z"
      fill="url(#grad-drop)"
      filter="url(#drop-shadow)"
    />

    <!-- 水滴高光 -->
    <ellipse cx="52" cy="58" rx="5" ry="9" fill="white" opacity="0.18" transform="rotate(-20 52 58)" />

    <!-- 水滴内十字定位线 -->
    <g stroke="white" stroke-width="1.2" opacity="0.45" stroke-linecap="round">
      <line x1="60" y1="50" x2="60" y2="80" />
      <line x1="52" y1="62" x2="68" y2="62" />
      <circle cx="60" cy="62" r="3.5" fill="none" stroke="white" stroke-width="1.5" opacity="0.7" />
    </g>

    <!-- 水波纹 -->
    <g opacity="0.55">
      <path d="M42 82 Q51 78 60 82 Q69 86 78 82" stroke="#40eeff" stroke-width="1.5" fill="none" stroke-linecap="round" />
      <path d="M46 87 Q53 83 60 87 Q67 91 74 87" stroke="#40eeff" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.6" />
    </g>

    <!-- 顶点装饰 -->
    <circle cx="60" cy="4" r="2.5" fill="#00d4ff" opacity="0.8" />
  </svg>
</template>

<script setup lang="ts">
  defineOptions({ name: 'ZhswLogo' })

  interface Props {
    size?: number | string
  }

  withDefaults(defineProps<Props>(), {
    size: 36
  })
</script>
