<template>
  <v-app>
    <v-main>
      <v-container fluid  class="content-wrapper">
        <!-- 슬라이더 -->
        <vue-slider
          v-if="isSlider"
          v-model="scaleValue.score"
          class="scale"
          v-bind="options"
          :tooltip-formatter="v => v.toLocaleString() + '평'"
        >
        </vue-slider>
        <!-- // 슬라이더-->

      </v-container>
    </v-main>
    <v-app-bar flat fixed position="bottom">
      <v-app-bar-title class="text-blue-grey-darken-2 font-weight-bold">
        {{ scaleValue.score }}평은 약 {{ Math.floor(unitScale).toLocaleString() }}m<sup>2</sup>
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'vue-slider-component/theme/antd.css';
import VueSlider from 'vue-slider-component';
import { TweenLite } from 'gsap/gsap-core';

declare global {
  interface Window {
    chrome: any;
  }
}
export default defineComponent({
  name: 'App',
  components: {
    VueSlider,
  },
  data() {
    return {
      isSlider: false,
      scaleValue: { score: 1, complete: true },
      options: {
        dotSize: 0,
        width: window.innerWidth,
        height: window.innerHeight - 64,
        contained: false,
        direction: 'btt',
        data: null,
        min: 1,
        max: 100,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.3,
        adsorb: false,
        lazy: false,
        tooltip: 'always',
        tooltipFormatter: '',
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: true,
        enableCross: true,
        fixed: false,
        minRange: 0,
        maxRange: 0,
        order: false,
        marks: false,
        dotOptions: true,
        process: true,
        dotStyle: 10,
        railStyle: 0,
        processStyle: 0,
        tooltipStyle: 0,
        stepStyle: 0,
        stepActiveStyle: 0,
        labelStyle: 0,
        labelActiveStyle: 0,
      },
    };
  },
  computed: {
    // 평으로 환산
    unitScale(): number {
      return this.scaleValue.score * 3.3057;
    },
  },
  watch: {
  },
  methods: {
  },
  mounted() {
    let vh : number = window.innerHeight * 0.01;
    window.addEventListener('resize', () => {
      // We execute the same script as before
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    this.isSlider = true;
    TweenLite.to(this.scaleValue, 0.5, {
      delay: 0.5,
      roundProps: 'score',
      onComplete: () => {
        this.scaleValue.score = 50;
        setTimeout(() => {
          this.options.tooltip = 'active';
        }, 1500);
      },
    });
  },
});
</script>

<style lang="scss">
html, body, .v-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.v-main {
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}
.money {
  &:before {
    content: '🎉';
    display: inline-block;
    padding-right: 15px;
  }
  &>div {
    vertical-align: bottom;
    display: inline-block;
  }
}
.v-container {
  padding: 0;
}
.content-wrapper {
  position: relative;
  .info-area {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 10;
    padding: 20px;
    background-color: transparent;
    .v-row {
      flex: 1 1 100%;
    }
  }
}
.scale {
  &.vue-slider {
    .vue-slider-rail {
      border-radius: 0;
      .vue-slider-process {
        border-radius: 0;
        background-color: #ffbb31;
      }
    }
  }
  .vue-slider-btt .vue-slider-mark-label {
    left: 0;
  }
  .vue-slider-dot-tooltip {
    margin-top: 30px;
    left: 20px;
    z-index: 9;
    .vue-slider-dot-tooltip-text {
      font-size: 30px;
      font-weight: bold;
      text-align: left;
    }
  }
  .vue-slider-dot-tooltip-inner-left::after {
    display: none;
  }
}
.v-dialog {
  .vue-slider-process, .vue-slider-process:hover {
    background-color: #ffbb31;
  }
  .vue-slider-dot-handle {
    border: 2px solid #ffbb31;
  }
}
</style>
