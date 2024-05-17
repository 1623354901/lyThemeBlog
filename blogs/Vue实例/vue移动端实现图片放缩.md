---
title: vue2 移动端图片双指放缩
date: 2023-05-15
tags:
  - Vue
categories:
  - Vue
  - 移动端
publish: true
---

在 Vue 2 中实现移动端图片的双指放大缩功能，可以使用触摸事件 touchstart, touchmove, touchend 来监听用户的触摸行为。以下是一个简单的示例：

```vue
<template>
  <div
    ref="container"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <img
      :style="imageStyle"
      src="path/to/your/image.jpg"
      alt="Zoomable Image"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      startDistance: 0,
      scale: 1,
      baseImageStyle: {
        transform: "translate(0, 0) scale(1)",
        transformOrigin: "center center",
      },
    };
  },
  computed: {
    imageStyle() {
      return {
        ...this.baseImageStyle,
        transform: `translate(${this.baseImageStyle.translateX}px, ${this.baseImageStyle.translateY}px) scale(${this.scale})`,
      };
    },
  },
  methods: {
    handleTouchStart(event) {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        this.start.x = (touch1.pageX + touch2.pageX) / 2;
        this.start.y = (touch1.pageY + touch2.pageY) / 2;
        this.startDistance = Math.hypot(
          touch1.pageX - touch2.pageX,
          touch1.pageY - touch2.pageY
        );
      }
    },
    handleTouchMove(event) {
      if (event.touches.length === 2) {
        event.preventDefault();
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const currentDistance = Math.hypot(
          touch1.pageX - touch2.pageX,
          touch1.pageY - touch2.pageY
        );
        const scaleFactor = currentDistance / this.startDistance;
        this.scale *= scaleFactor;
        this.baseImageStyle.translateX =
          ((touch1.pageX + touch2.pageX) / 2 - this.start.x) *
          (1 - scaleFactor);
        this.baseImageStyle.translateY =
          ((touch1.pageY + touch2.pageY) / 2 - this.start.y) *
          (1 - scaleFactor);
      }
    },
    handleTouchEnd(event) {
      if (event.touches.length < 2) {
        this.startDistance = 0;
      }
    },
  },
};
</script>

<style>
div {
  overflow: hidden;
  touch-action: none;
  width: 100%;
  height: 400px; /* Adjust height as needed */
}

img {
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
```

在这个示例中，我们创建了一个 Vue 组件，其中包含一个容器 div 和一个图片 img。我们监听触摸事件来处理缩放逻辑。handleTouchStart 记录起始触点的位置和距离。handleTouchMove 计算当前距离并与起始距离比较以计算缩放因子，然后更新图片的位置。handleTouchEnd 在触点松开时重置。

请注意，这个例子没有包含边界检查或过度缩放的保护，实际应用中可能需要添加这些功能。此外，图片的初始位置和缩放等样式通过计算属性 imageStyle 动态生成，以确保与当前状态一致。
