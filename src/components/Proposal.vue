<template>
  <div class="home">
      <header class="bar bar-nav">
            <h3 class="title">Proposal</h3>
            <router-link :to="$route.query.from||link('/my-index')" replace class="icon icon-left"></router-link>
            <a class="pull-right icon account-switch" v-if="wallets&&wallets.length>1">
                {{$t('trade_history.switch')}}
                    <select @change="switchWallet">
                        <option v-for="(wallet,i) in wallets" :key="i" :value="i" :selected="i==currentWalletIndex">{{wallet.account}}
                        </option>
                    </select>
                </a>
        </header>
   <div class="content">
      <div class="section-left">
       <div class="block-item">
          <h3>IP-82: Move yUSD funds to yDAI Vault</h3>
          <div class="share-active">
            <div :class="!this.canVote ? 'active' : 'disActive'">{{$t('proposal.active')}}</div> 
          </div>
          <p>
            Yam Finance YIP-82: Move yUSD funds to yDAI Vault 活跃 Yearn's yUSD
            vault was their first product and the only one available when YAM
            launched. Since then, Yearn has developed numerous other vault
            products and the yUSD vault no longer earns comparable returns to the
            newer, more robust and flexible products.
          </p>
          <p>
            As we rebalance the Treasury and YDS per YIPs 80, and 81, we have an
            opportunity to upgrade our yield bearing stable-coins to one of these
            newer products. yDAI is the most philosophically aligned with our
            mission as DAI is an un-censorable stablecoin backed by ETH and other
            assets.
          </p>
          <p>
            Making this change should earn the DAO additional interest from our
            stablecoins, and although no rates are set in stone, the returns on
            yDAI should be consistently higher than yUSD due to how the vault is
            constructed.
          </p>
          <p>
          See the full post with rationale and data here:
          https://forum.yam.finance/t/yip-82-transition-yusd-to-new-vault/1493
          </p>
       </div>
        <div class="vote">
          <div class="voteText">
            <div>{{$t('proposal.vote')}}</div>
          </div>
           <Modal v-if="supportShow">
              <div class="header" slot="header">{{$t('proposal.vote')}}</div>
              <div class="body" slot="body" v-if="!this.flag">{{$t('proposal.support')}}</div>
              <div class="body" slot="body" v-else>{{$t('proposal.change_support')}}</div>
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
              <div class="body" slot="body" v-if="!this.flag">{{$t('proposal.no_support')}}</div>
              <div class="body" slot="body" v-else>{{$t('proposal.change_noSupport')}}</div>
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
          <div class="numberText">{{$t('proposal.vote_number')}}</div>
          <ul>
            <li v-for="(item, index) in detailList" :key="index">
              <div class="vote-head">
                <div class="account-avatar">
                    <account-image class="sm-img" :account="item.userName" :size="15"></account-image>
                </div>
                <div>
                  {{ item.userName }}
                </div>
              </div>
              <div v-if="item.votingstate">{{$t('proposal.agree')}}</div>
              <div v-else>{{$t('proposal.disagree')}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="section-right" v-show="voteResultShow">
        <div class="right-fomat">
          <div style="display:flex;align-items:center">
            <div class="inforText">{{ $t("proposal.totalVote") }}</div>
            <div class="totalVote">{{this.number.totalVote}}</div>
          </div>
          <div class="result">
            <div class="result-content">
              <div>{{$t('proposal.agree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.number.voteNumberTrue+'%'}"></div>
                </div>
                <div>{{this.number.voteNumberTrue}}%</div>
              </div>
            </div>
            <div class="result-content">
              <div>{{$t('proposal.disagree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.number.voteNumberFalse+'%'}"></div>
                </div>
                <div>{{this.number.voteNumberFalse}}%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-fomat">
          <div style="display:flex;align-items:center">
            <div class="inforText">{{ $t("proposal.totalUserVote") }}</div>
            <div class="totalVote">{{this.user.totalUserVote}}</div>
          </div>
          <div class="result">
            <div class="result-content">
              <div>{{$t('proposal.agree')}}</div>
              <div class="progress">
                <div class="clip-background">
                    <div class='clip' :style="{width:this.user.voteUserTrue+'%'}"></div>
                </div>
                <div>{{this.user.voteUserTrue}}%</div>
              </div>
            </div>
            <div class="result-content">
              <div>{{$t('proposal.disagree')}}</div>
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
    get_vote_state
} from '@/services/WalletService';
import AccountImage from '@/components/sub/AccountImage.vue';
import Modal from '@/components/sub/Modal.vue';
import PasswordConfirm from '@/components/sub/PasswordConfirm.vue';
export default {
    name: 'Proposal',
    data () {
        let wallets = get_wallets();
        return {
            brandFold: true,
            isVoteDetail: false,
            current: 0,
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
                totalVote: 90,
                voteNumberTrue: 16,
                voteNumberFalse: 49
            },
            user: {
                totalUserVote: 40,
                voteUserTrue: 22,
                voteUserFalse: 6
            },
            canVote: true,
            voteResultShow: true,
            contractName: process.env.contractName
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
        this.send();
        this.voteEnds();
        // 判断投票是否结束
        if (this.canVote) {
            this.voteResultShow = false;
        } else {
            this.voteResultShow = true;
        }
    },
    methods: {
        send () {
            get_nodes_votes().then(res => {
                this.detailList = res.result;
                console.log('detailList', this.detailList);
            });
        },
        voteEnds () {
            get_vote_statistics().then(res => {
                this.number.totalVote = res.data.statistics.totalVoteGXCNumber;
                this.number.voteNumberTrue = (res.data.statistics.totalVoteGXCNumberTrue / this.number.totalVote * 100);
                this.number.voteNumberFalse = (res.data.statistics.totalVoteGXCNumberFalse / this.number.totalVote * 100);
                this.user.totalUserVote = res.data.statistics.voteUserNumber;
                this.user.voteUserTrue = (res.data.statistics.voteUserNumberTrue / this.user.totalUserVote * 100);
                this.user.voteUserFalse = (res.data.statistics.voteUserNumberFalse / this.user.totalUserVote * 100);
            });
            get_vote_state().then(res => {
                this.canVote = res.canVote;
                console.log('canVote', res);
            });
        },
        // 是否投票
        select (i) {
            this.disabled = false;
            this.index = i;
        },
        votes () {
            if (this.index === 1) {
                this.supportShow = !this.supportShow;
            } else {
                this.noSupportShow = !this.noSupportShow;
            }
            for (var i = 0; i < this.detailList.length; i++) {
                if (this.currentWallet.account === this.detailList[i].userName) {
                    this.flag = true;
                    return;
                }
            }
        },
        // 切换账号
        switchWallet (e) {
            let index = e.target.value;
            set_wallet_index(index);
            this.currentWalletIndex = index;
            this.currentWallet = this.wallets[this.currentWalletIndex];
            // this.loadData();
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
                    console.log(res);
                    $.closeModal($(this.$el));
                    $.toast(this.$t('proposal.vote_success'));
                    this.$refs.unlock.unlocked();
                    this.send();
                }).catch(ex => {
                    console.error(ex);
                    $.toast(this.$t('proposal.vote_fail'));
                    this.$refs.unlock.unlocked();
                });
            } else {
                call_contract(this.currentWallet.account, this.contractName, 'vote', {approve: false}, 0, pwd, true).then(res => {
                    console.log(res);
                    $.closeModal($(this.$el));
                    $.toast(this.$t('proposal.vote_success'));
                    this.$refs.unlock.unlocked();
                    this.send();
                }).catch(ex => {
                    console.error(ex);
                    $.toast(this.$t('proposal.vote_fail'));
                    this.$refs.unlock.unlocked();
                });
            }
            this.supportShow = false;
            this.noSupportShow = false;
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
    justify-content: space-around;
    padding: 1.2rem 6%;
    background-color: rgb(235,235,242);
    .section-left {
      width: 66%;
      margin-bottom: 1.2rem;
      .block-item{
        background-color: #FFF;
        padding:1rem;
        border-radius: 10px;
        h3{
          border-bottom: 1px rgb(163, 166, 196) dashed;
          padding-bottom: 1.2rem;
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
        p {
          margin-top: 1.2rem;
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
        padding: 0 1rem;
        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 32rem;
        .numberText {
          padding: 0.8rem 2%;
        }
        ul {
          li {
            list-style: none;
            padding: 0.8rem 2%;
            border-bottom: 1px rgb(231, 231, 231) solid;
            display: flex;
            justify-content: space-between;
            .vote-head {
              display: flex;
              align-items: center;
            }
            .account-avatar {
              width: 1.2rem;
              height: 1.2rem;
              // border-radius: 0.5rem;
              margin-right: 15px;
            }
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
        padding: 0 4%;
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
      
      .inforText {
        padding: 0.6rem 3%;
      }
      .totalVote{
        background-color: rgb(123, 166, 255);
        color: #FFF;
        padding:0 6px;
        border-radius: 30px;
      }
      .right-fomat {
        padding: 0 1rem;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 1.2rem;
        .download {
          text-align: center;
          width: 80%;
          border: 1px rgb(123, 166, 255) solid;
          border-radius: 24px;
          color: rgb(123, 166, 255);
          background-color: #fff;
          padding: 4px;
          margin-top: 1.2rem;
          margin-left: 10%;
        }
      }
      .information {
        padding: 1rem 2%;
        .item-right {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.2rem;
        }
        .right-right {
          display: flex;
          align-items: center;
        }
        .headImg {
          width: 1rem;
          height: 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }
      }
      .result {
        padding-bottom: 1.2rem;
        .result-content {
          margin-top: 1.2rem;
        }
      }
      .quorom {
        padding: 1.2rem 4%;
        display: flex;
        align-items: center;
      }
    }
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
