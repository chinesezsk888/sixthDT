<template>
   <div class="footer_gradient">
      <!-- 标签 -->
      <p class="card_label">{{ item.cardType | cardTitle }}</p>
      <!-- 点击区域 -->
      <div class="card_click_box" @click="goDetailPage($event, item.relationIds)">
        <p class="card_title" v-if="item.name !=''">{{item.name}}</p>
        <p class="card_dec" v-if="item.summary !=''">{{item.summary}}</p>
        <p class="read_more" v-if="item.relationIds!=''">Read More</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FooterGradient',
  props: {
    item: Object
  },
  filters: {
    cardTitle (value) {
      switch (value) {
        case "1":
          return 'PHOTO'
        break;
        case "2":
          return 'VIDEO'
        break;
        case "3":
          return '#TRENDING'
        break;
        case "4":
          return 'DATA'
        break;
        case "5":
          return 'QUOTE'
        break;
        case "6":
          return 'BUZZWORD'
        break;
        default:
          return '"EDITOR"S PICK'
      }
    }
  },
  methods: {
    goDetailPage (e, cid) {
      const fathertDom = e.currentTarget.parentElement.parentElement
      if(fathertDom.getAttribute('class') == 'dt_video_card' ) {
        this.$emit('playVideoFn')
      } else {
        if (cid == '') {
          return false
        } else {
           location.href = '/news/' + cid // 跳到对应文章详情页
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .footer_gradient {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
    // z-index: 999;
    .card_label {
      font-size: 1.143rem;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 1.285rem;
      position: relative;
      padding: 0 1.428rem 0;
      box-sizing: border-box;
      margin-bottom: 0;
      font-family: 'robotocondensed-regular-webfont';
      &::after {
        display: inline-block;
        content: '';
        clear: both;
        width: 1.785rem;
        height: 0.143rem;
        background: #FF5300;
        position: absolute;
        left: 1.393rem;
        bottom: -0.571rem;
      }
    }
    .card_click_box {
      width: 100%;
      padding: 0.643rem 1.428rem 2.428rem;
      box-sizing: border-box;
      margin-top: 2.214rem;
      .card_title {
        font-size: 2.143rem;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 2.3rem;
        margin-bottom: 1rem;
        font-family: 'robotocondensed-bold-webfont';
      }
      .card_dec {
        font-size: 1.143rem;
        font-weight: 300;
        color: #FFFFFF;
        line-height: 1.357rem;
        margin-bottom: 0;
      }
    }
    .read_more {
      font-size: 0.928rem;
      font-weight: 300;
      color: rgba(225,225,225,.4);
      line-height: 1.071rem;
      padding-top: 1.464rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-family: 'robotocondensed-regular-webfont';
      &::after {
        display: inline-block;
        content: '';
        clear: both;
        width: 1.143rem;
        height: 1.143rem;
        background: url(~@/assets/images/dt_detail_more.png) center no-repeat;
        background-size: 100% 100%;
      }
    }
    & p:nth-last-child(1) {
      margin-bottom: 1.321rem;
    }
  }
</style>
