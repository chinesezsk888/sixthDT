<template>
  <div class="dt_video_card">
    <div class="video__cover" @click="playVideo" v-show="flagShowCover">
      <!-- <div class="play_modal"></div> -->
      <div :style="backgrounImg(item.pic)"></div>
    </div>
    <div class="video_box" v-show="!flagShowCover">
      <div class="video_modal" @click="videoState"></div>
      <video
        width="100%"
        class="dt_video"
        controls="controls"
        preload="auto"
        ref="video"
        >
          <source :src="item.link">
      </video>
    </div>
    <FooterGradient :item="item" v-show="flagShowCover" @playVideoFn="playVideo"/>
  </div>
</template>

<script>
import FooterGradient from '@/components/FooterGradient'
export default {
  name: 'DtVideoCard',
  components: {
    FooterGradient
  },
  props: {
    item: Object,
    showCover: Boolean
  },
  data () {
    return {
      flagShowCover: Boolean
    }
  },
  methods: {
    playVideo () {
      this.flagShowCover = false
      this.$refs.video.play()
      // this.$emit('hideModal')
    },
    videoState () {
      if (this.$refs.video.paused) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    },
    backgrounImg (pic) {
      return {
        background: 'url(' + pic + ') center no-repeat',
        backgroundSize: 'cover'
      }
    }
  },
  created () {
    this.$nextTick(function () {
      this.$on('initVideo', function () {
        this.flagShowCover = true
        this.$refs.video.currentTime = 0
        this.$refs.video.pause()
      })
    })
  },
  mounted () {
    this.flagShowCover = this.showCover
  }
}
</script>
<style lang="scss" scoped>
.dt_video_card {
  width: 100%;
  height: 100%;
  .video__cover {
    width: 100%;
    height: 100%;
    position: relative;
    div {
      width: 100%;
      height: 100%;
    }
    &::after {
      display: inline-block;
      content: '';
      clear: both;
      width: 3.428rem;
      height: 3.428rem;
      background: url(~@/assets/images/play_icon.png) center no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .video_box {
    width: 100%;
    height: 100%;
    position: relative;
    .video_modal {
      width: 100%;
      height: 85%;
      position: absolute;
      top: 3rem;
      left: 0;
      background: #fff;
      // background: aqua;
      opacity: 0;
      z-index: 999;
    }
    .dt_video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
