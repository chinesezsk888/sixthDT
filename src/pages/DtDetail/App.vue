<template>
  <div id="dt__detail" class="dt__detail">
    <div class="rl_com" @click="showCalendar">
      <p class="months">{{dateInfo.month | initMonth }}</p>
      <p class="data">{{dateInfo.day}}</p>
      <p class="week">{{dateInfo.week}}</p>
    </div>
    <div class="calendar_box" v-if="calendarData.resultCode==1">
      <DtCalendar
      v-show="showCalendarStatus"
      :cdata="calendarData"
      :current='dateInfo'
      @sendNewList="getNewList"
      @sendPackUpCalendarMsg="packUpCalendar"
      />
    </div>
    <div class="swiper__box">
      <swiper
      ref="mySwiper"
      :options="swiperOptions"
      class="swiper"
      >
        <swiper-slide
        :key="detailItem.contId"
        v-for="detailItem in detailList"
        >
          <DtVideoCard
          :item="detailItem"
          :showCover = "showCover"
          v-if="detailItem.cardType==2"
          ref="dtVideoCard"
          />
          <DtDefaultItemCard :item="detailItem" v-else />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import DtDefaultItemCard from './components/DtDefaultItemCard'
import DtVideoCard from './components/DtVideoCard'
import DtCalendar from '@/components/DtCalendar'
import { apiUrl, calendarUrl, getUrlKey } from '@/util/config'
export default {
  name: 'app',
  data () {
    return {
      showCalendarStatus: false,
      dateInfo: {},
      calendarData: {},
      showCover: true,
      detailList: [],
      specialInfo: {},
      hideCalendar: true,
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'my-bullet', // 需设置.my-bullet样式
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        on: {
          slideChangeTransitionStart: ()=> {
           this.hideCalendar = true
          },
          slideChangeTransitionEnd: () => {
            const previousIndex = this.$refs.mySwiper.$swiper.previousIndex
            const slideDom = this.$refs.mySwiper.$swiper.slides[previousIndex]
            // this.hideCalendar = true
            if($(slideDom).children('.dt_video_card')) {
              this.$refs.dtVideoCard[0].$emit('initVideo')
            }
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  filters: {
    initMonth (monthNum) {
      let month = ''
       switch (monthNum) {
        case "01":
          month = 'Jan'
          break;
        case "02":
          month = 'Feb'
          break;
        case "03":
          month = 'Mar'
          break;
        case "04":
          month = 'Apr'
          break;
        case "05":
          month = 'May'
          break;
        case "06":
          month = 'Jun'
          break;
        case "07":
          month = 'Jul'
          break;
        case "08":
          month = 'Aug'
          break;
        case "09":
          month = 'Sep'
          break;
        case "10":
          month = 'Oct'
          break;
        case "11":
          month = 'Nov'
          break;
        default:
          month = 'Dec'
      }
      return month
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    DtDefaultItemCard,
    DtVideoCard,
    DtCalendar
  },
  methods: {
    showCalendar () {
      this.showCalendarStatus = true
    },
    packUpCalendar () {
      this.showCalendarStatus = false
    },
    getNewList (value) {
      let cardType = getUrlKey('cardType')
      this.showCalendarStatus = false
      location.href = '/dtDetail.jsp?n=' + value.nodeList[0].nodeId
      // this.getPageData(apiUrl + '?n=' + value.nodeList[0].nodeId)
    },
    getPageData (src, cid) {
      let url = src
      this.axios.get(url)
        .then(res => {
          let resp = res.data.data
          this.detailList = resp.contList
          if (cid && this.detailList) {
            this.detailList.forEach( (item,index) => {
              if(item.contId == cid) {
                this.$refs.mySwiper.$swiper.activeIndex = index
              }
            })
          }
          this.dateInfo = resp.dateInfo
          this.specialInfo = resp.specialInfo
          this.getCalendar(this.dateInfo.year + this.dateInfo.month)
        }).catch(() => {
          console.log('请稍后重试')
        })
    },
    getCalendar (yearMonth) {
      let url = calendarUrl + yearMonth
      this.axios.get(url).then(res => {
        this.calendarData = res.data
      }).catch(() => {
        console.log('请稍后重试')
      })
    }
  },
  created () {
    let nodeId = getUrlKey('n')
    let cid = getUrlKey('cid')
    this.getPageData(apiUrl + '?n=' + nodeId, cid)
  }
}

</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
// html {
//   font-size: 14px;
// }
html,body {
  width: 100%;
  height: 100%;
}
ul,li,ol {
  list-style: none;
}
// @media (max-width: 759px) {
//   .dt__detail {
//     height: calc(100vh-60px);
//   }
// }
.dt__detail {
  position: relative;
  height: calc(100vh-60px);
  .rl_com {
    position: absolute;
    width: 4.643rem;
    height: 5.714rem;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.571rem;
    box-sizing: border-box;
    background-image: linear-gradient(134deg, rgba(74, 74, 74, 0.4) 0%, rgba(25, 25, 25, 0.4) 100%);
    color: rgb(255, 255, 255);
    p {
      margin: 0;
    }
    .months {
      font-size: 1rem;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 1rem;
      font-family: 'robotocondensed-regular-webfont';
    }
    .data {
      font-size: 2.143rem;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 2.643rem;
      font-family: 'robotocondensed-regular-webfont';
    }
    .week {
      font-size: 1rem;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 1rem;
      font-family: 'robotocondensed-light-webfont';
    }
  }
  .swiper__box {
    width: 100%;
    height: 100%;
    ::v-deep .swiper-container {
      width: 100%;
      height: 100%;
    }
    ::v-deep .swiper-slide {
      width: 100%;
      height: 100%;
      position: relative;
    }
    ::v-deep .swiper-pagination {
      width: 100%;
      height: 6.428rem;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
      & .my-bullet:nth-last-child(1) {
        margin-right: 0;
      }
      .my-bullet {
        width: 0.285rem;
        height: 0.285rem;
        background: #FFFFFF;
        border-radius: 0.143rem;
        margin-right: 0.428rem;
        opacity: 0.5;
        &.my-bullet-active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
