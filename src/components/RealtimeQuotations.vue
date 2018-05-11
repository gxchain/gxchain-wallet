<template>
    <div class="page-group">
        <div class="page">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('realtime_quotations.title')}}</h3>
                <router-link :to="link('/market')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="exchange">
                    <div class="exchange-title">
                        <div class="asset-name">{{exchange_symbol}}</div>
                        <div class="exchange-name">{{exchange_name}}</div>
                    </div>
                    <div class="exchange-price">
                        <div class="price-primary">
                            {{exchange_price}}
                        </div>
                        <div class="price-secondary">
                            {{_i18n.locale == 'zh-CN' ? `￥${exchange_price_rmb}` : `$${exchange_price_dollar}`}}
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
                            {{high}}
                        </div>
                    </div>
                    <div class="quotation-item">
                        <div class="quotation-item-title">
                            {{$t('realtime_quotations.low')}}
                        </div>
                        <div class="quotation-item-value">
                            {{low}}
                        </div>
                    </div>
                    <div class="quotation-item">
                        <div class="quotation-item-title">
                            {{$t('realtime_quotations.volume')}}
                        </div>
                        <div class="quotation-item-value">
                            {{volume}}
                        </div>
                    </div>
                </div>
                <div class="chart">
                    <div class="buttons-row">
                        <a :class="{active:tabIndex==0}" @click="loadLineData" class="tab-link button">{{$t('realtime_quotations.line')}}</a>
                        <a :class="{active:tabIndex==1}" @click="loadCandleData" class="tab-link button">{{$t('realtime_quotations.candle')}}</a>
                    </div>
                    <div class="tabs">
                        <div class="tab" :class="{active:tabIndex==0}">
                            <div id="line"></div>
                        </div>
                        <div class="tab" :class="{active:tabIndex==1}">
                            <div id="candle"></div>
                        </div>
                    </div>
                    <div class="strategy">
                        <a v-if="_i18n.locale == 'zh-CN'" @click="showStrategyModal">{{$t('realtime_quotations.strategy')+'>'}}></a>
                    </div>
                </div>

            </div>
        </div>
        <div v-if="exchange_name === 'Binance'">
            <binance-strategy ref="strategy"></binance-strategy>
        </div>
        <div v-else-if="exchange_name === 'Bit-Z'">
            <bitz-strategy ref="strategy"></bitz-strategy>
        </div>
        <div v-else-if="exchange_name === 'Allcoin'">
            <allcoin-strategy ref="strategy"></allcoin-strategy>
        </div>
        <div v-else-if="exchange_name === 'BigOne'">
            <bigone-strategy ref="strategy"></bigone-strategy>
        </div>
    </div>

</template>
<script>
    import G2 from 'g2';
    import DataSet from 'dataset';
    import BinanceStrategy from '@/components/BinanceStrategy.vue';
    import BitzStrategy from '@/components/BitzStrategy.vue';
    import AllcoinStrategy from '@/components/AllcoinStrategy.vue';
    import BigoneStrategy from '@/components/BigoneStrategy.vue';
    import {
        get_realtime_quotation,
        get_chart_data
    } from '@/services/MarketService';
    G2.track(false);
    export default {
        data () {
            return {
                exchange_name: this.$route.params.exchange_name,
                exchange_symbol: this.$route.params.exchange_symbol,
                exchange_price: '',
                exchange_price_rmb: '',
                exchange_price_dollar: '',
                exchange_quote: '',
                high: '',
                low: '',
                volume: '',
                tabIndex: 0,
                stopFetchingQuotation: false,
                lineData: [],
                candleData: []
            };
        },
        methods: {
            loadRealtimeQuotation () {
                get_realtime_quotation(this.exchange_name, this.exchange_symbol).then((resp) => {
                    this.exchange_price = resp.price;
                    this.exchange_price_rmb = resp.price_rmb;
                    this.exchange_price_dollar = resp.price_dollar;
                    this.exchange_quote = resp.quote;
                    this.high = resp.high;
                    this.low = resp.low;
                    this.volume = resp.volume;
                    setTimeout(() => {
                        if (!this.stopFetchingQuotation) {
                            this.loadRealtimeQuotation();
                        }
                    }, 5000);
                }).catch(ex => {
                    console.error(ex);
                    setTimeout(() => {
                        if (!this.stopFetchingQuotation) {
                            this.loadRealtimeQuotation();
                        }
                    }, 5000);
                });
            },
            loadLineData () {
                this.tabIndex = 0;
                if (this.lineData.length == 0) {
                    get_chart_data(this.exchange_name, this.exchange_symbol, '1m').then((resp) => {
                        this.lineData = resp.map((item) => {
                            item.price = parseFloat(item.price);
                            return item;
                        });
                        this.renderLine();
                    });
                }
            },
            loadCandleData () {
                this.tabIndex = 1;
                if (this.candleData.length == 0) {
                    get_chart_data(this.exchange_name, this.exchange_symbol, '1440m').then((resp) => {
                        this.candleData = resp.map((item) => {
                            item.max = parseFloat(item.max);
                            item.min = parseFloat(item.min);
                            item.start = parseFloat(item.start);
                            item.end = parseFloat(item.end);
                            item.volumn = parseFloat(item.volumn);
                            item.money = parseFloat(item.money);
                            return item;
                        });
                        this.renderCandle();
                    });
                }
            },
            renderCandle () {
                const dv = new DataSet.View();
                dv.source(this.candleData)
                    .transform({
                        type: 'map',
                        callback: obj => {
                            obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
                            obj.range = [obj.start, obj.end, obj.max, obj.min];
                            return obj;
                        }
                    });
                const chart = new G2.Chart({
                    container: 'candle',
                    forceFit: true,
                    height: 400,
                    animate: true,
                    padding: [10, 40, 10, 70]
                });
                chart.source(dv, {
                    'time': {
                        // type: 'timeCat',
                        nice: false,
                        tickCount: 5,
                        // mask: 'MM-DD',
                        range: [0, 1]
                    },
                    trend: {
                        values: ['上涨', '下跌']
                    },
                    'volumn': {
                        alias: '成交量'
                    },
                    'start': {
                        alias: '开盘价'
                    },
                    'end': {
                        alias: '收盘价'
                    },
                    'max': {
                        alias: '最高价'
                    },
                    'min': {
                        alias: '最低价'
                    },
                    'range': {
                        alias: '价格'
                    }
                });
                chart.legend({
                    offset: 20
                });
                chart.tooltip({
                    showTitle: false,
                    itemTpl: '<li data-index={index}>' +
                        '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
                        '{name}{value}</li>'
                });
                const kView = chart.view({
                    end: {
                        x: 1,
                        y: 0.5
                    }
                });
                kView.source(dv);
                kView.schema()
                    .position('time*range')
                    .color('trend', val => {
                        if (val === '上涨') {
                            return '#2fc25b';
                        }

                        if (val === '下跌') {
                            return '#f04864';
                        }
                    })
                    .shape('candle')
                    .tooltip('time*start*end*max*min', (time, start, end, max, min) => {
                        return {
                            name: time,
                            value: '<br><span style="padding-left: 16px">开盘价：' + start + '</span><br/>' +
                                '<span style="padding-left: 16px">收盘价：' + end + '</span><br/>' +
                                '<span style="padding-left: 16px">最高价：' + max + '</span><br/>' +
                                '<span style="padding-left: 16px">最低价：' + min + '</span>'
                        };
                    });
                const barView = chart.view({
                    start: {
                        x: 0,
                        y: 0.65
                    }
                });
                barView.source(dv, {
                    volumn: {
                        tickCount: 3
                    }
                });
                barView.axis('time', {
                    tickLine: null,
                    label: null
                });
                barView.axis('volumn', {
                    label: {
                        formatter: function (val) {
                            return parseInt(val / 10000, 10) + 'w';
                        }
                    }
                });
                barView.interval()
                    .position('time*volumn')
                    .color('trend', val => {
                        if (val === '上涨') {
                            return '#2fc25b';
                        }

                        if (val === '下跌') {
                            return '#f04864';
                        }
                    })
                    .tooltip('time*volumn', (time, volumn) => {
                        return {
                            name: time,
                            value: '<br/><span style="padding-left: 16px">成交量：' + volumn + '</span><br/>'
                        };
                    });
                chart.render();
            },
            renderLine () {
                const chart = new G2.Chart({
                    container: 'line',
                    forceFit: true,
                    height: 400,
                    animate: true
                });
                chart.source(this.lineData);
                chart.scale({
                    time: {
                        tickCount: 5,
                        range: [0, 1]
                    }
                });
                chart.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                chart.area().position('time*price');
                chart.line().position('time*price').size(1);
                chart.render();
                setInterval(() => {
                    if (!this.stopFetchingQuotation) {
                        if (this.lineData.length > 0) {
                            let last = this.lineData[this.lineData.length - 1];
                            let now = new Date().format('hh:mm');
                            if (last.time < now) {
                                let obj = {};
                                obj.price = parseFloat(this.exchange_price);
                                obj.time = now;
                                this.lineData.push(obj);
                            }
                        }
                        chart.changeData(this.lineData);
                    }
                }, 1000);
            },
            showStrategyModal () {
                this.$refs.strategy.show();
            }
        },
        destroyed () {
            this.stopFetchingQuotation = true;
        },
        mounted () {
            $.init();
            this.loadRealtimeQuotation();
            this.loadLineData();
        },
        components: {
            BinanceStrategy,
            BitzStrategy,
            AllcoinStrategy,
            BigoneStrategy
        }
    };
</script>
<style lang="scss" scoped>
    .content {
        background: #fff;
    }

    .exchange {
        display: flex;
        flex-direction: row;
        padding-top: .75rem;
        padding-bottom: .6rem;
        padding-left: .67rem;
        padding-right: .67rem;
        background: #fff;
        border-bottom: 1px solid #e7e7e7;
        .exchange-title {
            text-align: left;
            flex: 1;
            .asset-name {
                font-size: .7rem;
                color: #3d3d3b;
            }
            .exchange-name {
                font-size: .6rem;
                color: #888;
            }
        }
        .exchange-price {
            text-align: right;
            flex: 1;
            .price-secondary {
                font-size: .6rem;
                color: #888;
            }
        }
        .exchange-quote {
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            .quote {
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
                &.green {
                    background: #076f8a;
                }
            }
        }
    }

    .quotations {
        background: #fff;
        display: flex;
        flex-direction: row;
        padding-top: .75rem;
        padding-bottom: .65rem;
        padding-left: .67rem;
        padding-right: .67rem; // border-bottom: 1px solid red;
        .quotation-item {
            flex: 1;
            text-align: left;
            .quotation-item-title {
                font-size: .6rem;
                color: #888;
            }
            .quotation-item-value {
                font-size: .7rem;
                color: #3d3d3b;
            }
        }
    }

    .chart {
        height: 20rem;
        background: #fff;
        padding-left: .67rem;
        padding-right: .67rem;
        .buttons-row .button {
            border-color: #888;
            color: #3d3d3b;
            &.active {
                background: #4a586f;
                color: #fff;
            }
        }
        .tab {
            width: 100%;
            height: 400px;
        }
        #line {
            margin-top: 1rem;
        }
        #candle {
            margin-top: 1rem;
        }
    }

    .strategy {
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .7rem;
    }
</style>
