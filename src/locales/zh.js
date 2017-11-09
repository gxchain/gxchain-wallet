const locale = {
  index: {
    balance_loading: '**',
    backup_wallet: '备份钱包',
    asset_name: 'GXS(公信股)',
    value: '价值(CNY)',
    transfer: '发送',
    receive: '接收',
    wallet: '钱包账户',
    account_name: '账户名'
  },
  account_import: {
    title: '账户导入',
    error: {
      account_not_found: '账户不存在'
    }
  },
  left_panel: {
    import_wallet: '导入钱包',
    create_wallet: '创建钱包',
    manage_wallets: '管理钱包',
    history: '转账记录',
    language: '语言设置',
    about: '关于我们'
  },
  language_setting: {
    title: '语言设置'
  },
  account_create: {
    title: '账户创建',
    empty_account: "账户名不可为空",
    account_should_be_longer: "账户名至少3位",
    account_should_be_shorter: "账户名过长",
    account_should_start_with_a_letter: "账户名需以字母开头",
    account_format_error: "账户名只能是字母、数字和-的组合",
    account_one_dash_error: "-只能使用一次",
    account_end_error: "账户名需要以字母或数字结尾",
    account_segment_should_be_longer: "账户名过短，.分割的部分应超过3位",
    premium_name: "你使用的是高级账户名,请选择其他名字，包含至少一个横杠、数字或者不含元音字母",
  },
  unlock: {
    account_not_found: '钱包内没有此账户',
    wrong_password: '密码错误'
  },
  transfer: {
    title: '发送',
    from: '发送账户',
    to: '对方账户',
    to_placeholder: '填写对方账号',
    amount: '发送数量',
    amount_placeholder: '填写GXS数量',
    available: '<small class="color-gray">可用GXS:</small> {amount}',
    memo: '备注信息',
    fee: '手续费',
    memo_placeholder: '选填',
    next: '下一步',
    send: '发送',
    sending: '发送中',
    error: {
      amount: {
        invalid: '数量不正确',
        insufficient_balance: '余额不足,请确认余额大于转账金额+手续费'
      },
      account: {
        cannot_send_to_yourself:'不能向自己转账',
        from_account_not_exist: '转出账户不存在',
        to_account_not_exist: '对方账户不存在',
        empty_account: "账户名不可为空",
        account_should_be_longer: "账户名至少3位",
        account_should_be_shorter: "账户名过长",
        account_should_start_with_a_letter: "账户名需以字母开头",
        account_format_error: "账户名只能是字母、数字和-的组合",
        account_one_dash_error: "-只能使用一次",
        account_end_error: "账户名需要以字母或数字结尾",
        account_segment_should_be_longer: "账户名过短，.分割的部分应超过3位",
        premium_name: "你使用的是高级账户名,请选择其他名字，包含至少一个横杠、数字或者不含元音字母"
      }
    },
    confirm: {
      title: '确认转账',
      title_password:'密码',
      enter_password:'输入密码'
    }
  }
}

export default locale
