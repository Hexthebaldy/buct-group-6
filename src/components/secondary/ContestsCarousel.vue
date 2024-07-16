<template>
    <div class="carousel">
      <div class="carousel-inner" :style="carouselStyle">
        <div 
          class="carousel-item" 
          v-for="(slide, index) in slides" 
          :key="index"
        >
          <img :src="slide.img" :alt="slide.title">
        </div>
      </div>
      <button class="carousel-control prev" @click="prevSlide">‹</button>
      <button class="carousel-control next" @click="nextSlide">›</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      slides: {
        type: Array,
        required: true
      },
      interval: {
        type: Number,
        default: 3000
      }
    },
    data() {
      return {
        currentIndex: 0,
        timer: null
      };
    },
    computed: {
      carouselStyle() {
        return {
          transform: `translateX(-${this.currentIndex * 100}%)`
        };
      }
    },
    methods: {
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      },
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      },
      startAutoPlay() {
        this.timer = setInterval(this.nextSlide, this.interval);
      },
      stopAutoPlay() {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    mounted() {
      this.startAutoPlay();
    },
    beforeDestroy() {
      this.stopAutoPlay();
    }
  };
  </script>
  
  <style scoped>
  .carousel {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 2px solid rgb(83, 82, 82);
    box-shadow: 0px 1px 8px rgba(72, 67, 67, 1);
    position: relative;
    width: 83%;
    height: 190px;
    overflow: hidden;
  }
  
  .carousel-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .carousel-item {
    min-width: 100%;
    box-sizing: border-box;
    
  }
  
  .carousel-item img {
    display: block;
    width: 100%;  /* 使图片宽度适应父容器 */
    height: auto; /* 保持图片的宽高比 */
  }
  
  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 10;
  }
  
  .carousel-control.prev {
    left: 10px;
  }
  
  .carousel-control.next {
    right: 10px;
  }
  </style>
  