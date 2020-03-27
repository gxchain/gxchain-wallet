<template>
  <div class="page-group">
        <div class="page" id="page-about">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('staking.Income_received')}}</h3>
                <router-link :to="link('/my-index')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="center-content">
                  <div class="list-block" v-for="(item, index) in vestList" :key="index">
                    <ul>
                      <li class="item-content">
                            <div class="item-inner">
                              <div class="item-title">{{$t('staking.get_earned')}}</div>
                              <div class="item-after">{{ item.balance.amount/100000 }} GXC</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                              <div class="item-title">{{$t('staking.earned_coin_day')}}</div>
                              <div class="item-after">{{ getEarned(item) }}{{$t('staking.coin_day')}}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                              <div class="item-title">{{$t('staking.required_coin_day')}}</div>
                              <div class="item-after">{{ getRequired(item)}}{{$t('staking.coin_day')}}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                              <div class="item-title">{{$t('staking.remain_day')}}</div>
                              <div class="item-after">{{ getRemain(item)}}{{$t('staking.day')}}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                              <div class="item-title">{{$t('staking.get_amount')}}</div>
                              <div class="item-after">{{ getAvailableCoin(item)}} GXC</div>
                            </div>
                        </li>
                        <li>
                          <div class="content-block btn-wrap">
                              <div class="row">
                                  <div class="col-50"><a href="#" class="button button-big button-fill " @click="claim(item, false)">{{$t('staking.collect_immediately')}}</a></div>
                                  <div class="col-50"><a href="#" class="button button-big button-fill "  @click="claim(item, true)">{{$t('staking.collect_immediately_all')}}</a></div>
                              </div>
                          </div>
                        </li>
                    </ul>
                  </div>
                  <p class="no-reocrd text-center" v-if="vestList.length==0&&loaded">
                        <span class="icon icon-edit"></span>
                        {{$t('node_vote.index.no_record')}}
                    </p>
                    <div class="line-scale-pulse-out" v-if="!loaded">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                
            </div>
        </div>
        <password-confirm ref="unlock" @unlocking="unlocking"></password-confirm>
    </div>
</template>

<script>
import { get_wallets, get_wallet_index, get_vesting_balances, claimVestingBalance } from '@/services/WalletService';
import util from '@/common/util';
import PasswordConfirm from '@/components/sub/PasswordConfirm.vue';
import filters from '@/filters';
export default {
    filters,
    components: {
        PasswordConfirm
    },
    data () {
        let wallets = get_wallets();
        return {
            loaded: false,
            vestList: [],
            currentWallet: wallets[get_wallet_index()],
            secondsPerDay: 60 * 60 * 24,
            claimAll: false,
            password: '',
            submitting: false,
            currentVest: ''
        };
    },
    mounted () {
        $.init();
        this.loadData();
    },
    methods: {
        loadData () {
            get_vesting_balances(this.currentWallet.account).then(res => {
                this.vestList = res;
                this.loaded = true;
            });
        },
        getEarned (vb) {
            if (vb.policy[0] == 1) {
                let earned = vb.policy[1].coin_seconds_earned;
                let res = util.accDiv(earned, this.secondsPerDay) / 100000;
                return util.format_number(res, 0);
            } else {
                return 0;
            }
        },
        getRequired (vb) {
            if (vb.policy[0] == 1) {
                let vestingPeriod = vb.policy[1].vesting_seconds;
                let res = util.accDiv(util.accMult(vb.balance.amount, vestingPeriod), this.secondsPerDay) / 100000;
                return util.format_number(res, 0);
            } else {
                return 0;
            }
        },
        getRemain (vb) {
            if (vb.policy[0] == 1) {
                let earned = vb.policy[1].coin_seconds_earned;
                if (!earned) {
                    return 0;
                }
                let vestingPeriod = vb.policy[1].vesting_seconds;
                let availablePercent = vestingPeriod === 0 ? 1 : util.accDiv(earned, util.accMult(vb.balance.amount, vestingPeriod));
                let res = vestingPeriod * (1 - availablePercent) / this.secondsPerDay;
                return util.format_number(res, 2);
            } else {
                return 0;
            }
        },
        getAvailableCoin (vb) {
            let earned = vb.policy[1].coin_seconds_earned;
            let vestingPeriod = vb.policy[1].vesting_seconds;
            let availablePercent = vestingPeriod === 0 ? 1 : util.accDiv(earned, util.accMult(vb.balance.amount, vestingPeriod));
            if (!earned) {
                return 0;
            }
            return util.format_number(availablePercent * 100, 2) + '% / ' + Math.round(availablePercent * vb.balance.amount / 100000 * 100000, 5) / 100000;
        },
        claim (item, flag) {
            if (this.submitting) {
                return;
            }
            this.claimAll = flag;
            this.currentVest = item;
            this.$refs.unlock.show();
        },
        unlocking (pwd) {
            if (!pwd.trim()) {
                $.toast(this.$t('unlock.error.invalid_password'));
                this.$refs.unlock.unlocked();
                return;
            }
            this.password = pwd;
            this.submitting = true;
            if (this.claimAll == 'claim') {

            }
            claimVestingBalance('GXC', this.currentWallet.account, this.currentVest, this.password, this.claimAll, true).then(res => {
                this.submitting = false;
                this.$refs.unlock.unlocked();
                this.claimAll = '';
                $.toast(this.$t('staking.income_received_success'));
                this.loadData();
            }).catch(ex => {
                console.error(ex);
                this.submitting = false;
                this.$refs.unlock.unlocked();
                $.toast(ex.message);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.list-block {
    margin: .6rem 0;
    font-size: .65rem;
    .button-big{
      font-size: .65rem;
      line-height: 1.4rem;
      height: 1.4rem;
      width: 80%;
      margin: 0 auto;
      border-radius: 1.25rem;
    }
}
.line-scale-pulse-out {
        margin-top: 2.5rem;
        text-align: center;
    }
    .line-scale-pulse-out > div {
        background: #6699ff;
        width: 2px;
        height: 18px;

    }
.btn-wrap {
  margin: 0;
  padding: .75rem;
}
</style>