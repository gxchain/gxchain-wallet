<template>
  <div>
    <div class="page-group">
      <div class="page">
        <header class="bar bar-nav">
          <h3 class="title">{{$t('realtime_quotations.title')}}</h3>
          <router-link :to="link('/')" replace class="icon icon-left"></router-link>
        </header>
        <div class="content">
          <div class="exchange">
            <div class="exchange-title">
              <div class="asset-name">{{$t('index.asset_name')}}<small class="color-light-gray" v-if="$t('index.asset_full_name')!=''">({{$t('index.asset_full_name')}})</small></div>
              <div class="exchange-name">{{exchange_name}}</div>
            </div>
            <div class="exchange-price">
              <div class="price-primary">
                {{_i18n.locale == 'zh' ? `$${exchange_price_dollar}` : `￥${exchange_price_rmb}`}}
              </div>
              <div class="price-secondary">
                {{_i18n.locale == 'zh' ? `￥${exchange_price_rmb}` : `$${exchange_price_dollar}`}}
              </div>
            </div>
            <div class="exchange-quote">
              <div class="quote" :class="{green:exchange_quote>0}">
                {{(exchange_quote > 0 ? '+' : '') + (exchange_quote) + '%'}}
              </div>
            </div>
          </div>  
          
          <div class="quotations">
            <div class="quotation-item">
              <div class="quotation-item-title">
                {{$t('realtime_quotations.high')}}
              </div>
              <div class="quotation-item-value">
                {{123}}
              </div>
            </div>
            <div class="quotation-item">
              <div class="quotation-item-title">
                {{$t('realtime_quotations.low')}}
              </div>
              <div class="quotation-item-value">
                {{456}}
              </div>
            </div>
            <div class="quotation-item">
              <div class="quotation-item-title">
                {{$t('realtime_quotations.volume')}}
              </div>
              <div class="quotation-item-value">
                {{123}}
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="buttons-row">
              <a :class="{active:tabIndex==0}" @click="tabIndex=0"
                class="tab-link button">{{$t('realtime_quotations.time_sharing')}}</a>
              <a :class="{active:tabIndex==1}" @click="tabIndex=1"
                class="tab-link button">{{$t('realtime_quotations.k_line')}}</a>
            </div>
            <div class="tabs">
              <div class="tab" :class="{active:tabIndex==0}">
                <canvas id="time-sharing"></canvas>
              </div>
              <div class="tab" :class="{active:tabIndex==1}">
                <canvas id="k-line"></canvas>
              </div>
            </div>
          </div>
          <div class="strategy">
            <a></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import G2 from '@antv/g2'
  import F2 from '@antv/f2'
  export default {
    data() {
      return {
        exchange_name: this.$route.params.exchange_name,
        exchange_price_rmb: this.$route.params.exchange_price_rmb,
        exchange_price_dollar: this.$route.params.exchange_price_dollar,
        exchange_quote: this.$route.params.exchange_quote,
        tabIndex:0,
      }
    },
    methods: {
      renderTimeSharing(){
        // 设置屏幕像素比
      F2.Global.pixelRatio = window.devicePixelRatio;
      const data = [
        { time: '2016-08-08 00:00:00', tem: 10 },
        { time: '2016-08-08 00:10:00', tem: 22 },
        { time: '2016-08-08 00:30:00', tem: 16},
        { time: '2016-08-09 00:35:00', tem: 26},
        { time: '2016-08-09 01:00:00', tem: 12},
        { time: '2016-08-09 01:20:00', tem: 26},
        { time: '2016-08-10 01:40:00', tem: 18},
        { time: '2016-08-10 02:00:00', tem: 26},
        { time: '2016-08-10 02:20:00', tem: 12},
        
      ];
      const chart = new F2.Chart({
        id: 'time-sharing',
        pixelRatio: window.devicePixelRatio,
        width:window.innerWidth,
        height:400
      });
      chart.source(data, {
        time: {
          type: 'timeCat',
          tickCount: 3,
          range: [ 0, 1 ]
        },
        tem: {
          tickCount: 5,
          min: 0
        }
      });
        // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
      chart.axis('tem', {
        label: {
          fontSize: 14
        }
      });
        // 配置time刻度文字样式
      const label = {
        fill: '#979797',
        font: '14px san-serif',
        offset: 6
      };
      chart.axis('time', {
        label(text, index, total) {
          const cfg = label;
            // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
          if (index === 0) {
            cfg.textAlign = 'start';
          }
          if (index > 0 && index === total - 1) {
            cfg.textAlign = 'end';
          }
          return cfg;
        }
      });
      chart.area().position('time*tem')
        .shape('smooth')
        .style({
          opacity: 0.6
        });
      chart.render();

      },
      renderKLine(){
        const data = [
          {
            time: "2015-11-19",
            start: 8.18,
            max: 8.33,
            min: 7.98,
            end: 8.32,
            volumn: 1810,
            money: 14723.56
          },
          {
            time: "2015-11-18",
            start: 8.37,
            max: 8.6,
            min: 8.03,
            end: 8.09,
            volumn: 2790.37,
            money: 23309.19
          },
          {
            time: "2015-11-17",
            start: 8.7,
            max: 8.78,
            min: 8.32,
            end: 8.37,
            volumn: 3729.04,
            money: 31709.71
          },
          {
            time: "2015-11-16",
            start: 8.18,
            max: 8.69,
            min: 8.05,
            end: 8.62,
            volumn: 3095.44,
            money: 26100.69
          },
          {
            time: "2015-11-13",
            start: 8.01,
            max: 8.75,
            min: 7.97,
            end: 8.41,
            volumn: 5815.58,
            money: 48562.37
          },
          {
            time: "2015-11-12",
            start: 7.76,
            max: 8.18,
            min: 7.61,
            end: 8.15,
            volumn: 4742.6,
            money: 37565.36
          },
          {
            time: "2015-11-11",
            start: 7.55,
            max: 7.81,
            min: 7.49,
            end: 7.8,
            volumn: 3133.82,
            money: 24065.42
          },
          {
            time: "2015-11-10",
            start: 7.5,
            max: 7.68,
            min: 7.44,
            end: 7.57,
            volumn: 2670.35,
            money: 20210.58
          },
          {
            time: "2015-11-09",
            start: 7.65,
            max: 7.66,
            min: 7.3,
            end: 7.58,
            volumn: 2841.79,
            money: 21344.36
          },
          {
            time: "2015-11-06",
            start: 7.52,
            max: 7.71,
            min: 7.48,
            end: 7.64,
            volumn: 2725.44,
            money: 20721.51
          },
        ];

        // 设置屏幕像素比
        F2.Global.pixelRatio = window.devicePixelRatio;
        //数据处理
        data.sort(function(obj1, obj2) {
          return obj1.time > obj2.time ? 1 : -1;
        });
        data.forEach(function(obj) {
          obj.range = [ obj.start, obj.end, obj.max, obj.min ];
          obj.trend = (obj.start <= obj.end) ? 0 : 1;
        });
        const chart = new F2.Chart({
          id: 'k-line',
          width:window.innerWidth,
          height:400
        });
        // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
        chart.axis('range', {
          label: {
            fontSize: 14
          }
        });
        // 配置time刻度文字样式
        const label = {
          fill: '#979797',
          font: '14px san-serif',
          offset: 6
        };
        chart.axis('time', {
          label(text, index, total) {
            const cfg = label;
            // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
            if (index === 0) {
              cfg.textAlign = 'start';
            }
            if (index > 0 && index === total - 1) {
              cfg.textAlign = 'end';
            }
            return cfg;
          }
        });
        chart.source(data, {
          range: {
            tickCount: 5
          },
          time: {
            tickCount: 3
          }
        });
        chart.schema().position('time*range')
          .color('trend', function(trend) {
            return [ '#C00000', '#19B24B' ][trend];
          })
          .shape('candle');
        chart.render();
      },
    },
    mounted() {
      $.init();
      this.renderTimeSharing();

      this.renderKLine();
    }
  }

</script>
<style lang="scss" scoped>
  .exchange{
    display: flex;
    flex-direction: row;
    padding-top: .75rem;
    padding-bottom: .6rem;
    padding-left: .67rem;
    padding-right: .67rem;
    background: #fff;
    border-bottom: 1px solid #e7e7e7;
    .exchange-title{
      text-align: left;
      flex: 1;
      .asset-name{
        font-size: .7rem;
        color:#3d3d3b;
      }
      .exchange-name{
        font-size: .6rem;
        color:#888;
      }
    }
    .exchange-price{
      text-align: right;
      flex: 1;
      .price-secondary{
        font-size: .6rem;
        color:#888;
      }
    }
    .exchange-quote{
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .quote{
        display: inline-block;
        height: 1.2rem;
        line-height: 1.2rem;
        width: 3.5rem;
        text-align: right;
        padding: 0 .2rem;
        font-weight: bold;
        font-size: .65rem;
        color: #fff;
        background: #d63932;
        &.green{
          background:#076f8a;
        }
      }
    }
  }
  .quotations{
    background: #fff;
    display: flex;
    flex-direction: row;
    padding-top: .75rem;
    padding-bottom: .65rem;
    padding-left: .67rem;
    padding-right: .67rem;
    // border-bottom: 1px solid red;
    .quotation-item{
      flex: 1;
      text-align: left;
      .quotation-item-title{
        font-size: .6rem;
        color:#888;
      }
      .quotation-item-value{
        font-size: .7rem;
        color:#3d3d3b;
      }
    }
    // .volume{
    //   flex:1;
    //   text-align: left;
    //   .volume-title{
    //     font-size: .6rem;
    //     color:#888;
    //   }
    //   .total-volume{
    //     font-size: .7rem;
    //     color:#3d3d3b;
    //   }
    // }
  }
  .chart{
    height: 20rem;
    background: #fff;
    padding-left: .67rem;
    padding-right: .67rem;
    .buttons-row .button{
      border-color: #888;
      color: #3d3d3b;
      &.active{
        background: #4a586f;
        color:#fff;
      }
    }
  }

</style>


