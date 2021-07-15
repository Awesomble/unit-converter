<template>
  <v-app>
    <v-main>
      <v-container fluid  class="content-wrapper">
        <!-- 슬라이더 -->
        <vue-slider
          v-model="scaleValue.score"
          class="salary"
          v-bind="options"
          :tooltip-formatter="v => v.toLocaleString()"
        >
          <v-row class="info-area">
              <v-row cols="12">
                <v-spacer/>
                <v-col cols="4" class="font-weight-light mr-2">🏡국민연금</v-col>
                <v-col cols="3" class="text-right font-weight-bold">
                  {{ Math.floor(nationalPension).toLocaleString() }}
                  <em class="font-weight-light">원</em>
                </v-col>
              </v-row>
              <v-row cols="12">
                <v-spacer/>
                <v-col cols="4" class="font-weight-light mr-2">🏩건강보험</v-col>
                <v-col cols="3" class="text-right font-weight-bold">
                  {{ Math.floor(healthInsurance).toLocaleString() }}
                  <em class="font-weight-light">원</em>
                </v-col>
              </v-row>
              <v-row cols="12">
                <v-spacer/>
                <v-col cols="4" class="font-weight-light mr-2">🧑‍🚒고용보험</v-col>
                <v-col cols="3" class="text-right font-weight-bold">
                  {{ Math.floor(employmentInsurance).toLocaleString() }}
                  <em class="font-weight-light">원</em>
                </v-col>
              </v-row>
              <v-row cols="12">
                <v-spacer/>
                <v-col cols="4" class="font-weight-light mr-2">🏦소득세</v-col>
                <v-col cols="3" class="text-right font-weight-bold">
                  {{ Math.floor(income + income / 10).toLocaleString() }}
                  <em class="font-weight-light">원</em>
                </v-col>
              </v-row>
          </v-row>
        </vue-slider>
        <!-- // 슬라이더-->

      </v-container>
    </v-main>
    <v-app-bar flat fixed position="bottom">
      <v-app-bar-title class="text-blue-grey-darken-2 font-weight-bold money">
        {{ Math.floor(realIncome).toLocaleString() }}원
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="dialog = true"
        color="warning"
        icon="mdi-account-circle"
        size="small"
      />
    </v-app-bar>

    <!-- 세팅 -->
    <v-dialog
      v-model="dialog"
      fullscreen="fullscreen"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card style="overflow: hidden">
        <v-card-title>
          <span class="headline">설정</span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-row >
            <v-col class="text-left pb-0" cols="8">
              <span class="subtitle-1 font-weight-bold black--text">인적공제</span>
            </v-col>
            <v-col class="text-right pb-0" cols="4">
              <span class="subtitle-1 font-weight-light">
                <em class="font-weight-bold black--text">{{ H }}</em>
              명</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <vue-slider
                v-model="H"
                :min="1"
                :max="10"
                tooltip="none"
              >
              </vue-slider>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-left pb-0" cols="4">
              <span class="subtitle-1 font-weight-bold black--text">비급여</span>
            </v-col>
            <v-col class="text-right pb-0" cols="8">
              <span class="subtitle-1 font-weight-light">
                <em class="font-weight-bold black--text">{{ F.toLocaleString() }}</em>
              원</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <vue-slider
                v-model="F"
                :step="100000"
                :min="0"
                :interval="100000"
                :max="10000000"
                tooltip="none"
              >
              </vue-slider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" @click="dialog = false">
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- //세팅 -->
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'vue-slider-component/theme/antd.css';
import VueSlider from 'vue-slider-component';
import gabgeunse2021 from '@/assets/tax/gabgeunse2021.json';
import { TweenLite } from 'gsap/gsap-core';

export default defineComponent({
  name: 'App',
  components: {
    VueSlider,
  },
  data() {
    return {
      isSlider: false,
      dialog: false,
      scaleValue: { score: 24000000, complete: true },
      H: 1,
      F: 0,
      mark1: true,
      options: {
        dotSize: 0,
        width: window.innerWidth,
        height: window.innerHeight - 64,
        contained: false,
        direction: 'btt',
        data: null,
        min: 24000000,
        max: 100000000,
        interval: 100000,
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
    // a computed getter
    realIncome(): number {
      return (
        (this.scaleValue.score - this.F) / 12
        - this.nationalPension
        - this.healthInsurance
        - this.employmentInsurance
        - this.income
        - this.income / 10
      ) + (this.F / 12);
    },
    nationalPension(): number {
      return (this.scaleValue.score / 12) * 0.045;
    },
    healthInsurance(): number {
      return (
        (this.scaleValue.score / 12) * 0.0343
        + (this.scaleValue.score / 12) * 0.0343 * 0.1152
      );
    },
    employmentInsurance(): number {
      return (this.scaleValue.score / 12) * 0.008;
    },
    income(): number {
      const d = gabgeunse2021.tax;
      const l = d.length;
      const s = (this.scaleValue.score - this.F) / 12000;
      for (let i = 0; i < l; i += 1) {
        if (s >= parseFloat(d[i][0]) && s < parseFloat(d[i][1])) {
          return parseFloat(d[i][1 + this.H]);
        }
      }
      return 0;
    },
    maxF(): number {
      return this.scaleValue.score * 0.5;
    },
  },
  watch: {
    H(newValue) {
      localStorage.H = newValue;
    },
    F(newValue) {
      localStorage.F = newValue;
    },
    scaleValue: {
      handler(newValue) {
        localStorage.score = newValue.score;
      },
      deep: true,
    },
  },
  methods: {
  },
  mounted() {
    this.H = localStorage.H ? Number(localStorage.H) : this.H;
    this.F = localStorage.F ? Number(localStorage.F) : this.F;
    // this.scaleValue.score = localStorage.score ? Number(localStorage.score) : 100000000 / 2;
    this.isSlider = true;
    const initScore = localStorage.score ? Number(localStorage.score) : 100000000 / 2;
    TweenLite.to(this.scaleValue, 0.5, {
      initScore,
      delay: 0.5,
      roundProps: 'score',
      onComplete: () => {
        this.scaleValue.score = initScore;
        setTimeout(() => {
          this.options.tooltip = 'active';
        }, 1500);
      },
    });
  },
});
</script>

<style lang="scss">
.money {
  &:before {
    content: '🎉';
    display: inline-block;
    padding-right: 15px;
    vertical-align: top;
  }
  &>div {
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
.salary {
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
