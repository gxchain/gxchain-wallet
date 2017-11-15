import Vue from 'vue'
import Router from 'vue-router'
import WalletIndex from '@/components/WalletIndex'
import WalletCreateIndex from '@/components/WalletCreateIndex'
import WalletCreateStep1 from '@/components/WalletCreateStep1'
import WalletCreateStep2 from '@/components/WalletCreateStep2'
import WalletCreateSuccess from '@/components/WalletCreateSuccess'
import WalletImport from '@/components/WalletImport'
import WalletImportSuccess from '@/components/WalletImportSuccess'
import WalletManage from '@/components/WalletManage'
import About from '@/components/About'
import LanguageSetting from '@/components/LanguageSetting'
import WalletBackupIndex from '@/components/WalletBackupIndex'
import WalletBackupDetail from '@/components/WalletBackupDetail'
import TradeHistory from '@/components/TradeHistory'
import TradeDetail from '@/components/TradeDetail'
import Transfer from '@/components/Transfer'
import TransferSuccess from '@/components/TransferSuccess'
import Disclaimer from '@/components/Disclaimer'
import LoyaltyProgram from '@/components/LoyaltyProgram'
import LoyaltyProgramDetail from '@/components/LoyaltyProgramDetail'
import store from '@/vuex/store'
import connect from '@/common/connect'
import cordovaLoader from '@/common/cordovaLoader'
import {get_wallets} from '@/services/WalletService'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: ''
      },
      name: 'WalletIndex',
      component: WalletIndex
    },
    {
      path: '/wallet-create',
      meta: {
        title: '钱包',
        whiteList: true
      },
      name: 'WalletCreateIndex',
      component: WalletCreateIndex
    },
    {
      path: '/wallet-create-step-1',
      meta: {
        title: '创建钱包',
        whiteList: true
      },
      name: 'WalletCreateStep1',
      component: WalletCreateStep1
    },
    {
      path: '/wallet-create-step-2',
      meta: {
        title: '设置密码',
        whiteList: true
      },
      name: 'WalletCreateStep2',
      component: WalletCreateStep2
    },
    {
      path: '/wallet-create-success',
      meta: {
        title: '创建成功',
        whiteList: true
      },
      name: 'WalletCreateSuccess',
      component: WalletCreateSuccess
    },
    {
      path: '/wallet-import',
      meta: {
        title: '钱包导入',
        whiteList: true
      },
      name: 'WalletImport',
      component: WalletImport
    },
    {
      path: '/wallet-import-success',
      meta: {
        title: '导入成功',
        whiteList: true
      },
      name: 'WalletImportSuccess',
      component: WalletImportSuccess
    },
    {
      path: '/wallet-manage',
      meta: {
        title: '管理钱包'
      },
      name: 'WalletMange',
      component: WalletManage
    },
    {
      path: '/about',
      meta: {
        title: '关于我们'
      },
      name: 'About',
      component: About
    },
    {
      path: '/disclaimer',
      meta: {
        title: '免责声明',
        whiteList: true
      },
      name: 'Disclaimer',
      component: Disclaimer
    },
    {
      path: '/language-setting',
      meta: {
        title: '语言设置'
      },
      name: 'LanguageSetting',
      component: LanguageSetting
    },
    {
      path: '/trade-history',
      meta: {
        title: '交易记录'
      },
      name: 'TradeHistory',
      component: TradeHistory
    },
    {
      path: '/trade/:id',
      meta: {
        title: '记录详情'
      },
      name: 'TradeDetail',
      component: TradeDetail
    },
    {
      path: '/transfer',
      meta: {
        title: '转账'
      },
      name: 'Transfer',
      component: Transfer
    },
    {
      path: '/transfer-success',
      meta: {
        title: '转账成功'
      },
      name: 'TransferSuccess',
      component: TransferSuccess
    },
    {
      path: '/wallet-backup',
      meta: {
        title: '钱包备份'
      },
      name: 'BackupIndex',
      component: WalletBackupIndex
    },
    {
      path: '/wallet-backup-detail',
      meta: {
        title: '钱包备份'
      },
      name: 'BackupDetail',
      component: WalletBackupDetail
    },
    {
      path: '/loyalty-program',
      meta: {
        title: '忠诚者计划'
      },
      name: 'LoyaltyProgram',
      component: LoyaltyProgram
    },
    {
      path: '/loyalty-program/:id',
      meta: {
        title: '计划详情'
      },
      name: 'LoyaltyProgramDetail',
      component: LoyaltyProgramDetail
    }
  ]
})

const inWhiteList = (component) => {
  return !!component.meta.whiteList;
}

const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

router.beforeEach((to, from, next) => {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('setDirection', {direction: 'slide-right'})
    } else {
      store.commit('setDirection', {direction: 'slide-left'})
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('setDirection', {direction: 'slide-right'})
  }

  let platform = (from.name ? from.query.platform : to.query.platform) || 'browser';
  to.query.platform = platform;
  // let nativeHook = typeof to.query.nativeHook == undefined ? true : to.query.nativeHook;
  let isNative = platform == 'ios' || platform == 'android';
  const goNext = () => {
    // let title = to.matched[0].meta.title;
    // let hideNav = to.matched[0].meta.hideNav;
    // if (!nativeHook && from.name && isNative) {
    //   cordova.exec(null, null, 'Controller', 'push', ['url', `${process.env.__HOST__}${to.path}?${$.param($.extend(from.query, to.query))}`, title,'',0,hideNav]);
    // }
    // else {
    connect(() => {
      if ((!get_wallets() || get_wallets().length == 0) && !inWhiteList(to)) {
        let query = $.extend({platform: platform}, to.query);
        router.replace({
          path: `/wallet-create?${$.param(query)}`
        })
      }
      else {
        next();
      }
      // if (isNative) {
      //   cordova.exec(null, null, 'NavBar', 'setTitle', [title]);
      // }
    })
    // }
  }
  $.hidePreloader();
  $.closePanel();
  $.closeModal();
  store.commit('setIsNative', {isNative: isNative});
  cordovaLoader.load(platform).then(function () {
    goNext();
  })
})

export default router;


