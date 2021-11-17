<template>
  <div class="home" id="page-wallet-index">
    <header class="bar bar-nav">
      <h3 class="title">Proposal</h3>
      <router-link :to="$route.query.from||link('/my-index')" replace class="icon icon-left"></router-link>
      <a class="pull-right icon account-switch" v-if="wallets&&wallets.length>1">
        {{$t('trade_history.switch')}}
          <select @change="switchWallet">
              <option v-for="(wallet,i) in wallets" :key="i" :value="i" :selected="i==currentWalletIndex">{{wallet.account}}</option>
          </select>
      </a>
    </header>
    <div class="content" ref="content-view">
      <div class="section-left">
       <div class="block-item">
          <h2>{{ $t("proposal_content.name") }}</h2>
          <div class="share-active">
            <div :class="this.canVote ? 'active' : 'disActive'">{{$t('proposal.active')}}</div> 
          </div>
          <h4>[{{ $t("proposal_content.background.title") }}]</h4>
          <p>{{ $t("proposal_content.background.stage1") }}</p>
          <p>{{ $t("proposal_content.background.stage2") }}</p>
          <h4>[{{ $t("proposal_content.substance.content1.title") }}]</h4>
          <h5>{{ $t("proposal_content.substance.content1.change_name") }}</h5>
          <p>{{ $t("proposal_content.substance.content1.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content1.stage2") }}</p>
          <h5>{{ $t("proposal_content.substance.content1.rei_mean") }}</h5>
          <p>{{ $t("proposal_content.substance.content1.stage3") }}</p>
          <p>{{ $t("proposal_content.substance.content1.stage4") }}</p>
          <h4>[{{ $t("proposal_content.substance.content2.title") }}]</h4>
          <p>{{ $t("proposal_content.substance.content2.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content2.stage2") }}</p>
          <p>{{ $t("proposal_content.substance.content2.stage3") }}</p>
          <h4>{{ $t("proposal_content.substance.content2.steps1") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.split") }}</p>
          <h4>{{ $t("proposal_content.substance.content2.steps2") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.upgrade") }}</p>
          <h4>{{ $t("proposal_content.substance.content2.steps3") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.govern") }}</p>
          <h4>{{ $t("proposal_content.substance.content2.steps4") }}</h4>
          <h5>{{ $t("proposal_content.substance.content2.total") }}</h5>
          <ul class="four-step">
            <li>{{ $t("proposal_content.substance.content2.port1") }}</li>
            <li>
              {{ $t("proposal_content.substance.content2.port2") }}
              <ul>
                <li>{{ $t("proposal_content.substance.content2.spread1") }}</li>
                <li>{{ $t("proposal_content.substance.content2.spread2") }}</li>
                <li>{{ $t("proposal_content.substance.content2.spread3") }}</li>
              </ul>
            </li>
          </ul>
          <img class="image" src="@/assets/images/image.png" alt="">
          <h4>{{ $t("proposal_content.substance.content2.steps5") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.detailed") }}</p>
          <div class="div-content">{{ $t("proposal_content.substance.content2.plan1") }}
            <div>{{ $t("proposal_content.substance.content2.consult") }}</div>
          </div>
          <div class="div-content">{{ $t("proposal_content.substance.content2.plan2") }}
            <div>{{ $t("proposal_content.substance.content2.deposit") }}</div>
            <div>{{ $t("proposal_content.substance.content2.term_a") }}</div>
            <div>{{ $t("proposal_content.substance.content2.term_b") }}</div>
          </div>
          <div class="div-content">{{ $t("proposal_content.substance.content2.plan3") }}
            <div>{{ $t("proposal_content.substance.content2.campaign") }}</div>
          </div>
          <h4>{{ $t("proposal_content.substance.content2.steps6") }}</h4>
          <p>{{ $t("proposal_content.substance.content2.rei_gxc") }}</p>
          <h4>[{{ $t("proposal_content.substance.content3.title") }}]</h4>
          <h5>{{ $t("proposal_content.substance.content3.construct.head") }}</h5>
          <p>{{ $t("proposal_content.substance.content3.construct.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content3.construct.stage2") }}</p>
          <p>{{ $t("proposal_content.substance.content3.construct.stage3") }}</p>
          <p>{{ $t("proposal_content.substance.content3.construct.stage4") }}</p>
          <h4>{{ $t("proposal_content.substance.content3.worth.head") }}</h4>
          <p>{{ $t("proposal_content.substance.content3.worth.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content3.worth.stage2") }}</p>
          <p>{{ $t("proposal_content.substance.content3.worth.stage3") }}</p>
          <p>{{ $t("proposal_content.substance.content3.worth.stage4") }}</p>
          <h4>{{ $t("proposal_content.substance.content3.extra.head") }}</h4>
          <p>{{ $t("proposal_content.substance.content3.extra.stage1") }}</p>
          <p>{{ $t("proposal_content.substance.content3.extra.stage2") }}</p>
          <p>{{ $t("proposal_content.substance.content3.extra.stage3") }}</p>
          <p>{{ $t("proposal_content.substance.content3.extra.stage4") }}</p>
          <h5>{{ $t("proposal_content.substance.content3.reality") }}</h5>
          <p>{{$t("proposal_content.substance.content3.stage_end") }}</p>
          <h5>{{ $t("proposal_content.substance.content3.ending") }}</h5>
       </div>
        <div class="vote" v-if="this.canVote">
          <div class="voteText">
            <div>{{$t('proposal.vote')}}</div>
          </div>
           <Modal v-if="supportShow">
              <div class="header" slot="header">{{$t('proposal.vote')}}</div>
              <div class="body" slot="body">{{$t('proposal.support')}}</div>
              <div class="footer" slot="footer">
                <div class="content-block nodelist-footer">
                    <div class="row">
                      <div class="col-50"><a href="#" class="button btn " @click="onCancel()">{{$t('staking.cancel')}}</a></div>
                      <div class="col-50"><a href="#" class="button btn  button-fill" @click="onVoteConfirm()">{{$t('staking.confirm')}}</a></div>
                    </div>
                </div>
              </div>
          </Modal>
          <Modal v-if="noSupportShow">
              <div class="header" slot="header">{{$t('proposal.vote')}}</div>
              <div class="body" slot="body">{{$t('proposal.no_support')}}</div>
              <div class="footer" slot="footer">
                <div class="content-block nodelist-footer">
                    <div class="row">
                      <div class="col-50"><a href="#" class="button btn " @click="onCancel()">{{$t('staking.cancel')}}</a></div>
                      <div class="col-50"><a href="#" class="button btn  button-fill" @click="onVoteConfirm()">{{$t('staking.confirm')}}</a></div>
                    </div>
                </div>
              </div>
          </Modal>
          <password-confirm ref="unlock" :account="currentWallet.account" @unlocking="unlocking"></password-confirm>
           <div class="voting-button">
            <button @click="select(1)" :class="index ==1?'use':'notuse'">{{$t('proposal.agree')}}</button>
            <button @click="select(2)" :class="index ==2?'use':'notuse'" >{{$t('proposal.disagree')}}</button>
            <button :disabled="disabled" :class="disabled?'disabled-button':'no-disabled'" @click="votes()">{{$t('proposal.yes')}}</button>
          </div>
        </div>
        <div class="vote-number">
          <div class="header-number">
            <div class="numberText">{{ $t("proposal.vote_number") }}</div>
            <div class="totalVote">{{(this.number.totalVote/1e5).toLocaleString(undefined,{maximumFractionDigits: 5})}}</div>
          </div>
          <ul>
            <li v-for="(item, index) in detailList" :key="index">
              <div class="detail" v-if="index<moreSteps">
                <div class="vote-head">
                  <div class="account-avatar">
                    <account-image class="sm-img" :account="item.userName" :size="15"></account-image>
                  </div>
                  <div> {{ item.userName }}</div>
                </div>
                <div class="createdAt">
                  <div>{{(item.voteGXCNumberHourly/1e5).toLocaleString(undefined,{maximumFractionDigits: 5})}} GXC</div>
                  <div>{{new Date(new Date(item.createdAt).getTime()).format('yyyy-MM-dd hh:mm:ss')}}</div>
                </div>
                <div class="agree-vote">
                  <div v-if="item.votingstate" style="color:#2CDFC0">{{$t('proposal.agree')}}</div>
                  <div v-else style="color:#FE898A">{{$t('proposal.disagree')}}</div>
                </div>
              </div>
            </li>
            <button class="expendMore" @click="expendMore()" v-if="this.resultSum>this.moreSteps">{{$t("proposal.expend_more")}}</button>
          </ul>
        </div>
      </div>
      <div class="section-right">
        <div class="right-fomat">
          <div style="display:flex;align-items:center">
            <div class="inforText">{{$t('proposal.information')}}</div>
          </div>
           <div style="padding-bottom:1.5rem">
             <div class="information">
            <div>{{$t('proposal.start_date')}}</div>
            <div>{{new Date(new Date(this.startTime).getTime()).format('yyyy-MM-dd hh:mm:ss')}}</div>
          </div>
          <div class="information">
            <div>{{$t('proposal.end_date')}}</div>
            <div>{{new Date(new Date(this.stopTime).getTime()).format('yyyy-MM-dd hh:mm:ss')}}</div>
          </div>
           </div>
        </div>
        <div class="right-fomat">
          <div class="result-header">
            <div class="header-left">
              <div class="inforText">{{ $t("proposal.totalVote") }}</div>
              <div class="totalVote">{{(this.number.totalVote/1e5).toLocaleString(undefined,{maximumFractionDigits: 5})}}</div>
            </div>
            <div class="to-dint">
               <div class="dint">{{$t('proposal.dint')}}</div>
               <button class="hint">?</button>
            </div>
          </div>
          <div class="result">
            <div class="result-content">
              <div style="color:#2CDFC0">{{$t('proposal.agree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.number.voteNumberTrue+'%'}"></div>
                </div>
                <div style="width:78px">{{this.number.voteNumberTrue}}%</div>
              </div>
            </div>
            <div class="result-content">
              <div style="color:#FE898A">{{$t('proposal.disagree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.number.voteNumberFalse+'%'}"></div>
                </div>
                <div style="width:78px">{{this.number.voteNumberFalse}}%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-fomat">
           <div class="result-header">
            <div class="header-left">
               <div class="inforText">{{ $t("proposal.totalUserVote") }}</div>
               <div class="totalVote">{{this.user.totalUserVote.toLocaleString()}}</div>
            </div>
            <div class="to-dint">
               <div class="dint">{{$t('proposal.dint')}}</div>
               <button class="hint">?</button>
            </div>
          </div>
          <div class="result">
            <div class="result-content">
              <div style="color:#2CDFC0">{{$t('proposal.agree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.user.voteUserTrue+'%'}"></div>
                </div>
                <div>{{this.user.voteUserTrue}}%</div>
              </div>
            </div>
            <div class="result-content">
              <div style="color:#FE898A">{{$t('proposal.disagree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.user.voteUserFalse+'%'}"></div>
                </div>
                <div>{{this.user.voteUserFalse}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    call_contract,
    get_wallet_index,
    get_wallets,
    get_nodes_votes,
    set_wallet_index,
    get_vote_statistics,
    get_vote_state,
    get_vote_date,
    get_voter_sum,
    get_voter_findone
} from '@/services/WalletService';
import AccountImage from '@/components/sub/AccountImage.vue';
import Modal from '@/components/sub/Modal.vue';
import PasswordConfirm from '@/components/sub/PasswordConfirm.vue';
// import util from '@/common/util';
export default {
    name: 'Proposal',
    data () {
        let wallets = get_wallets();
        return {
            brandFold: true,
            isVoteDetail: false,
            wallets: get_wallets(),
            currentWallet: wallets[get_wallet_index()],
            currentWalletIndex: get_wallet_index(),
            supportShow: false,
            noSupportShow: false,
            disabled: true,
            index: 0,
            detailList: [],
            flag: false,
            number: {
                totalVote: 0,
                voteNumberTrue: 0,
                voteNumberFalse: 0
            },
            user: {
                totalUserVote: 0,
                voteUserTrue: 0,
                voteUserFalse: 0
            },
            canVote: true,
            contractName: process.env.contractName,
            stopTime: '',
            startTime: '',
            resultSum: 0,
            moreSteps: 10,
            votingstate: 0,
            limit: 0
        };
    },
    computed: {
    },
    components: {
        Modal,
        AccountImage,
        PasswordConfirm
    },
    mounted: function () {
        this.getVoter();
        this.getVoteEnds();
        this.getStartTime();
        this.timer = setInterval(() => {
            this.getVoter();
            this.getNoStopVote();
        }, 3000);
        // 判断投票是否结束
        if (!this.canVote) {
            // 关闭投票后获取投票信息
            get_vote_statistics().then(res => {
                this.number.totalVote = res.statistics.totalVoteGXCNumber;
                this.number.voteNumberTrue = (res.statistics.totalVoteGXCNumberTrue / this.number.totalVote * 100);
                this.number.voteNumberFalse = (res.statistics.totalVoteGXCNumberFalse / this.number.totalVote * 100);
                this.user.totalUserVote = res.statistics.voteUserNumber;
                this.user.voteUserTrue = (res.statistics.voteUserNumberTrue / this.user.totalUserVote * 100);
                this.user.voteUserFalse = (res.statistics.voteUserNumberFalse / this.user.totalUserVote * 100);
            });
        } else {
            this.getNoStopVote();
        }
        // 获取是否投过同意或者不同意
        get_voter_findone(this.currentWallet.account).then(res => {
            this.votingstate = res.votingstate;
        });
    },
    methods: {
        getVoter () {
            get_nodes_votes().then(res => {
                this.detailList = res.result;
                this.resultSum = res.resultsSum;
            });
        },
        getVoteEnds () {
            get_vote_state().then(res => {
                this.canVote = res.canVote;
            });
        },
        // 投票开始和结束的时间
        getStartTime () {
            get_vote_date().then(res => {
                this.stopTime = res.stopTime;
                this.startTime = res.startTime;
            });
        },
        // 未关闭投票前获取投票信息
        getNoStopVote () {
            get_voter_sum().then(res => {
                this.number.totalVote = res.voterGXCSum;
                this.number.voteNumberTrue = (res.voterGXCTrueSum / this.number.totalVote * 100).toFixed(5);
                this.number.voteNumberFalse = Number.parseFloat(res.voterGXCFalseSum / this.number.totalVote * 100).toFixed(5);
                this.user.totalUserVote = res.voterNum;
                this.user.voteUserTrue = Number.parseFloat(res.voterTrueNum / this.user.totalUserVote * 100).toFixed(2); // 投true总人数
                this.user.voteUserFalse = Number.parseFloat(res.voterFalseNum / this.user.totalUserVote * 100).toFixed(2); // 投false总人数
            });
        },
        // 是否投票
        select (i) {
            this.disabled = false;
            this.index = i;
            get_voter_findone(this.currentWallet.account).then(res => {
                this.votingstate = res.votingstate;
            });
        },
        expendMore () {
            this.moreSteps += 20;
            get_nodes_votes(this.limit).then(res => {
                this.limit = this.moreSteps;
            });
        },
        votes () {
            if (this.index === 1) {
                if (this.votingstate != true) {
                    this.supportShow = !this.supportShow;
                } else {
                    $.toast(this.$t('proposal.cast_agree'));
                }
            } else {
                if (this.votingstate != false) {
                    this.noSupportShow = !this.noSupportShow;
                } else {
                    $.toast(this.$t('proposal.cast_disagree'));
                }
            }
        },
        // 切换账号
        switchWallet (e) {
            let index = e.target.value;
            set_wallet_index(index);
            this.currentWalletIndex = index;
            this.currentWallet = this.wallets[this.currentWalletIndex];
            get_voter_findone(this.currentWallet.account).then(res => {
                this.votingstate = res.votingstate;
            });
        },
        onCancel () {
            this.supportShow = false;
            this.noSupportShow = false;
        },
        onVoteConfirm () {
            this.$refs.unlock.show();
            console.log('account', this.currentWallet.account);
        },
        unlocking (pwd) {
            if (this.supportShow) {
                call_contract(this.currentWallet.account, this.contractName, 'vote', {approve: true}, 0, pwd, true).then(res => {
                    $.closeModal($(this.$el));
                    $.toast(this.$t('proposal.vote_success'));
                    this.$refs.unlock.unlocked();
                    this.getVoter();
                }).catch(ex => {
                    console.error(ex);
                    $.toast(this.$t('proposal.vote_fail'));
                    this.$refs.unlock.unlocked();
                });
            } else {
                call_contract(this.currentWallet.account, this.contractName, 'vote', {approve: false}, 0, pwd, true).then(res => {
                    $.closeModal($(this.$el));
                    $.toast(this.$t('proposal.vote_success'));
                    this.$refs.unlock.unlocked();
                    this.getVoter();
                }).catch(ex => {
                    console.error(ex);
                    $.toast(this.$t('proposal.vote_fail'));
                    this.$refs.unlock.unlocked();
                });
            }
            this.supportShow = false;
            this.noSupportShow = false;
            this.index = 0;
            this.disabled = true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
 @import "../assets/styles/components/refresh_layer";
/*::-webkit-scrollbar {*/
    /*display: none;*/
    /*}*/
* {
  margin: 0;
  padding: 0;
}
.home {
    font-size: 0.8rem;
    .account-switch {
        font-size: .75rem;
        select {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            opacity: 0;
            width: 100%;
        }
    }
  .content {
    display: flex;
    padding: 1.2rem 4%;
    background-color: rgb(235,235,242);
    .section-left {
      width: 66%;
      margin-bottom: 1.2rem;
      margin-right: 1rem;
      .block-item {
        background-color: #FFF;
        padding:1rem;
        border-radius: 10px;
        p {
          margin-top: 20px;
          font-size: 14px;
          line-height: 28px;
        }
        .div-content {
          margin-top: 20px;
          font-size: 14px;
          line-height: 28px;
          div {
            padding:0 20px;
          }
        }
        h4 {
          margin-top: 20px;
        }
        h5 {
          margin-top: 16px;
        }
        h2 {
          border-bottom: 1px rgb(163, 166, 196) dashed;
          padding-bottom:1.6rem;
          padding-top:1.2rem;
        }
        .image{
          width: 100%;
        }
        .four-step{
          padding:10px 20px;
          font-size: 14px;
          line-height: 28px;
          ul{
            padding:0 20px;
            li{
              list-style-type: circle;
            }
          }
        }
        .share-active {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        .active {
          background-color: rgb(255, 126, 29);
          padding: 1px 8px;
          border-radius: 16px;
          color: #fff;
        }
        .disActive {
          background-color: rgb(188, 189, 193);
          padding: 1px 8px;
          border-radius: 16px;
          color: #fff;
        }
      }
      }
      .vote {
        padding: 0.8rem 1rem 1.6rem 1rem;
        margin-top: 1.2rem;
        background-color: #fff;
        border-radius: 6px;
        .voteText {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .vote-button{
            display: flex;
            .voteButton{
              padding: 0.3rem 1rem;
              border:1px rgb(163, 166, 196) solid;
              color: rgb(163, 166, 196) ;
              border-radius:32px;
              margin-right: 1rem;
            }
            .voted{
              padding: 0.3rem 1rem;
              background-color: rgb(84, 131, 255);
              color: #FFF;
              border-radius:32px;
            }
          }
        }
        .vote-item{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top: 20px;          
          .vote-progress{
            color: #fff;
            width:78%;
            background-color:rgb(235,235,242);
            height:32px;
            border-radius:16px;
            line-height:32px;
            .vote-clip{
              padding-left:12px ;
              background-color: rgb(84, 131, 255);
              width: 80%;
              height:32px;
              border-radius: 16px;
            }
          }
          .voteButton{
            padding: 0.1rem 1rem;
            border:1px rgb(84, 131, 255) solid;
            color: rgb(84, 131, 255) ;
            border-radius:24px;
            margin-right: 1rem;
            text-align: center;
          }
        }
        .voting-button{
          width:100%;
          .use{
            text-align: center;
            width: 80%;
            border:1px rgb(123, 166, 255) solid;
            color: rgb(123, 166, 255);
            padding: 4px;
            background-color: #fff;
            border-radius: 20px;
            margin-bottom: 16px;
            margin-left:10%;
            background-color: #ecf5ff;
          }
          .notuse{
            text-align: center;
            width: 80%;
            border:1px rgb(178, 181, 205) solid;
            color: rgb(178, 181, 205);
            padding: 4px;
            background-color: #FFF;
            border-radius: 20px;
            margin-bottom: 16px;
            margin-left:10%;
          }
          .disabled-button{
            text-align: center;
            width: 80%;
            border: none;
            color: #fff;
            padding: 4px;
            border-radius: 20px;
            margin-bottom: 12px;
            margin-left:10%;
            background-color:rgb(188, 189, 193);
          }
          .no-disabled{
            text-align: center;
            width: 80%;
            color: #fff;
            padding: 4px;
            border: none;
            border-radius: 20px;
            margin-bottom: 12px;
            margin-left:10%;
            background-color:rgb(123, 166, 255);
          }
        }
      }
      .vote-number {
        margin-top: 1.2rem;
        background-color: #fff;
        border-radius: 10px;
        padding: 0 0.6rem;
        .header-number{
          display: flex;
          align-items: center;
          .totalVote{
            background-color: rgb(123, 166, 255);
            color: #FFF;
            padding:0 10px;
            border-radius: 30px;
            margin-top: 10px;
          }
        }
        .numberText {
          padding: 1.2rem 2% 0.6rem 2%;
        }
        ul {
          overflow-y: scroll;
          overflow-x: hidden;
          max-height: 32rem;
          li {
            list-style: none;
            .detail{
              padding:1rem 2% 0.6rem 2%;
              border-bottom: 1px rgb(178, 181, 205) solid;
              display: flex;
              justify-content: space-between;
            }
            .vote-head {
              display: flex;
              align-items: center;
              width: 6rem;
            }
            .account-avatar {
              width: 1.2rem;
              height: 1.2rem;
              // border-radius: 0.5rem;
              margin-right: 8px;
            }
            .createdAt{
              color: grey;
              font-size: 12px;
            }
            .agree-vote{
              width: 2.8rem;
              text-align: right;
            }
          }
          .expendMore{
            width: 100%;
            text-align: center;
            border: none;
            padding: 20px 0;
            color: rgb(123, 166, 255);
            background-color: #fff;
          }
        }
        .unfold-hide {
          background-color: #fff;
          width: 100%;
          text-align: center;
          padding: 0.8rem 0;
          border: none;
        }
        .vote-detail {
          position: absolute;
          width: 20%;
          background-color: white;
          border: 1px rgb(208, 201, 202) solid;
          height: 10rem;
          border-radius: 6px;
          padding: 2%;
          text-align: center;
          .img {
            width: 50px;
            height: 50px;
            border-radius: 25px;
          }
          .browser-view {
            display: flex;
            width: 90%;
            border: 1px rgb(208, 201, 202) solid;
            border-radius: 24px;
            padding: 8px;
            justify-content: center;
            margin-top: 2rem;
            margin-left: 5%;
          }
        }
      }
    }
    .section-right {
      width: 30%;
      .progress{
        // padding: 0 4%;
        display: flex;
        align-items: center;
      }
      .clip-background{
        width:78%;
        background-color:rgb(208, 201, 202);
        height:8px;
        border-radius:4px;
        margin-right: 16px;
        .clip{
          background-color: rgb(84, 131, 255);;
          width: 80%;
          height:8px;
          border-radius: 4px;
      }
      }
      .right-fomat {
        padding: 0 1rem;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 1.2rem;
        font-size: 16px;
        .inforText {
          margin-top:1.2rem;
          font-weight: 500;
          margin-right: 10px;
        }
        .totalVote{
          background-color: rgb(123, 166, 255);
          color: #FFF;
          padding:0 10px;
          border-radius: 30px;
          margin-top:1.2rem;
        }
      }
      .result-header{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .header-left{
            display:flex;
            align-items:center;
            // width:72%
          }
          .to-dint:hover .dint{
            visibility: visible;
          }
          .to-dint{
            position: relative;
            display: flex;
            flex-direction: column;
          }
          .dint{
            visibility: hidden;
            position: absolute;
            font-size: 12px;
            right: 0;
            bottom: 1.6rem;
            background-color: rgba(0,0,0,.8);
            width: 7.2rem;
            padding:10px 20px;
            border-radius: 6px;
            color: #FFF;
          }
          .hint{
           width: 30px;
           height: 30px;
           font-size: 18px;
           border-radius: 15px;
           border:1px rgb(208, 201, 202) solid;
           margin-top: 1.2rem;
          }
      }
      .information {
          display: flex;
          justify-content: space-between;
          margin-top:1rem;
      }
      .result {
        padding-bottom: 1.2rem;
        .result-content {
          margin-top: 0.8rem;
        }
      }
    }
  }
}
// #page-wallet-index {
//   .content-view {
//     top: 2.2rem;
//     -webkit-overflow-scrolling: auto;
//   }
// }
.native-ios-x #page-wallet-index {
  .content{
    top: 4.5rem;
    -webkit-overflow-scrolling: auto;
  }
}
@media screen and (max-width: 1050px) {
  .popContainer {
    width: 100% !important;
    height: 100% !important;
    z-index: 100;
    background-color: white !important;
    .walletToast {
      // background-color: white;
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      .title {
        padding: 0.9rem 1.2rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px rgb(208, 201, 202) solid;
      }
      .wallet-content {
        text-align: center;
        width: 72%;
        border: 1px rgb(208, 201, 202) solid;
        border-radius: 18px;
        padding: 8px;
        margin-top: 1.2rem;
        margin-left: 10%;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column !important;
    .section-left {
      width: 100% !important;
      .vote-item{
        .vote-progress{
          width: 72% !important;
        }
        .voteButton{
          width: 24% !important;
          font-size: 15px !important;
          padding:0.2rem 0.5rem !important;
        }
      }
    }
    .section-right {
      width: 100% !important;
    }
  }
}
</style>
