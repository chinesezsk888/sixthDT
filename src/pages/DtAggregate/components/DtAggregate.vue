<template>
  <div class="dt_aggregate__box">
      <div class="dgb__header" @click="goDtDetail(firstCard.nodeId, firstCard.contId)">
          <div class="header_img" :style="backgroundImg(firstCard.pic)">
            <!-- <img :src="firstCard.pic"> -->
          </div>
          <!-- 阴影 -->
          <div class="dp_modal">
            <p class="photo_card_type">{{firstCard.cardType | initTitle}}</p>
            <p class="photo_card_title" v-html="firstCard.name"></p>
          </div>
      </div>
      <!-- Dt卡片 -->
      <div class="dgb_dt__card" v-if="list.length>1">
        <div
        class="card_item"
        :class="{
          photo_type: carditem.cardType == '1',
          video_type: carditem.cardType == '2',
          trending_type: carditem.cardType == '3',
          data_type: carditem.cardType =='4',
          quote_type: carditem.cardType =='5',
          buzzword_type: carditem.cardType =='6',
          editor_type: carditem.cardType =='7'
          }"
        v-for="carditem in (list.slice(1))"
        :key="carditem.contId"
        @click="goDtDetail(carditem.nodeId, carditem.contId)"
        v-html="carditem.name"
        >
        <!-- {{carditem.name}} -->
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DtAggregate',
  components: {},
  props: {
    list: Array
  },
  watch: {
    list (newValue, old) {
      this.firstCard = newValue[0]
    }
  },
  data () {
    return {
      firstCard: {}
    }
  },
  methods: {
    goDtDetail (id,cid) {
      // location.href = '/dtdetail.html?n=' + id
      location.href = '/dtDetail.jsp?n=' + id + '&cid=' + cid
    },
    backgroundImg (pic) {
      return {
        background: 'url(' + pic + ') center / cover no-repeat'
      }
    }
  },
  filters: {
    initTitle (type) {
      switch (type) {
        case '1':
          return 'PHOTO'
          break;
        case '2':
          return 'VIDEO'
          break;
        case '3':
          return '#TRENDING'
          break;
        case '4':
          return 'DATA'
          break;
        case '5':
          return 'QUOTE'
          break;
        case '6':
          return 'BUZZWORD'
          break;
        default:
          return '"EDITOR"S PICK'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dgb__header {
    width: 100%;
    height: 26.785rem;
    position: relative;
    .header_img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .dp_modal {
      width: 100%;
      // height: 1.91rem;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
      padding: 1.321rem 1.428rem 1.143rem;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      .photo_card_type {
        font-size: 1.143rem;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 1.285rem;
        margin-bottom: 0.857rem;
        font-family: 'robotocondensed-regular-webfont';
      }
      .photo_card_title {
        font-size: 1.928rem;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 2.214rem;
        font-family: 'robotocondensed-bold-webfont';
      }
    }
}
.dgb_dt__card {
  width: 100%;
  padding: 2.142rem 1.428rem 5.714rem;
  box-sizing: border-box;
  background: linear-gradient(90deg, #4A4A4A 0%, #191919 100%);
  .card_item {
    padding-left: 2.285rem;
    padding-right: 4.143rem;
    font-size: 1.428rem;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 1.643rem;
    box-sizing: border-box;
    margin-bottom: 2.857rem;
    display: flex;
    align-items: center;
    position: relative;
    font-family: 'robotocondensed-bold-webfont';
    &.photo_type::before {
      background: url(~@/assets/images/photo_type_icon.png) center no-repeat;
      background-size: 100% 100%;
    }
    &.video_type::before {
      background: url(~@/assets/images/video_type_icon.png) center no-repeat;
      background-size: 100% 100%;
    }
    &.trending_type::before {
      background: url(~@/assets/images/trending_type_icon.png) center no-repeat;
      background-size: 100% 100%;
    }
    &.data_type::before {
      background: url(~@/assets/images/data_type_icon.png) center no-repeat;
      background-size: 100% 100%;
    }
    &.quote_type::before {
      background: url(~@/assets/images/quote_type_icon.png) center no-repeat;
      background-size: 100% 100%;
    }
    &.buzzword_type::before {
      background: url(~@/assets/images/buzzword_type_icon.png) center no-repeat;
      background-size: 100% 100%;
    }
    &.editor_type::before {
      background: url(~@/assets/images/editor_type_icon.png) center no-repeat;
      background-size: 100% 100%;
    }
  }
  .card_item::before {
      display: inline-block;
      content: '';
      clear: both;
      width: 1.143rem;
      height: 1.143rem;
      position: absolute;
      left: 0;
      top: 0.285rem;
  }
  .card_item::after {
    display: inline-block;
    content: '';
    clear: both;
    width: 1.143rem;
    height: 1.143rem;
    background: url(~@/assets/images/dt_detail_more.png) center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
  }
  & .card_item:nth-last-child(1) {
    margin-bottom: 0rem;
  }
}
</style>
