<template>
    <div class="popup">
        <header class="bar bar-nav">
            <h2 class="title">Bigone充值交易平台教程</h2>
            <a href="javascript:;" class="pull-right icon icon-close close-popup">&times;</a>
        </header>
        <div class="content">
            <div class="detail">
                <p class="step">第一步：</p>
                <p>进入网站：https://www.big.one/点击注册</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step1_img1')}`" width="100%">
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step1_img2')}`" width="100%">
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step1_img3')}`" width="100%">
                <p>进入邮箱复制（command+c）验证码进入双重验证界面</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step1_img4')}`" width="100%">
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step1_img5')}`" width="100%">
                <p>手机下载谷歌身份验证器Authenticator，输入验证码，输入密码，创建账户，注册成功。</p>
                <p class="step">第二步：如何充值</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step2_img1')}`" width="100%">
                <p>进入资产页往下来找到【gxs】</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step2_img2')}`" width="100%">
                <p>点击充值</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step2_img3')}`" width="100%">
                <p>账户地址: e0c0fdcd673dca790e53afd2bf570bda</p>
                <p>MEMO : (每个账户的MEMO不一样，请务必填写MEMO)</p>
                <p class="step">具体充币有以下两种操作：</p>
                <p>
                    (1):通过其他交易平台提现，向Bigone交易平台【充值】方式 以云币交易平台为例，点击【绑定区块链资产提现地址】
                </p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step2_img4')}`" width="100%">
                <p>进入界面后：</p>
                <p>第一栏选择【GXS】</p>
                <p>第二栏备注，建议填写【bigone平台交易账户】</p>
                <p>第三栏输入平台交易的账户：e0c0fdcd673dca790e53afd2bf570bda</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step2_img5')}`" width="100%">
                <p>回到【区块链资产提现】，点击bigone这栏【提现】</p>
                <p>MEMO : (每个账户的MEMO不一样，请务必填写MEMO)</p>
                <p>钱包地址和账户memo最好复制以免出错</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step2_img6')}`" width="100%">
                <p>提现申请成功，等待云币审核通过，近期云币提现提币申请较多，平台审核可能需要较长时间。（注册的邮箱会收到提现申请的邮件）</p>
                <p>(2):通过钱包向Bigone交易平台【充币】方式以下界面为在线钱包【在线钱包和钱包客户端的操作一致】</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step2_img7')}`" width="100%">
                <p>点击【转账】</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step2_img8')}`" width="100%">
                <p>来自：是自己的账户信息</p>
                <p>发往：e0c0fdcd673dca790e53afd2bf570bda（交易平台的账户），建议复制黏贴以免操作错误</p>
                <p>金额：往平台充值的数量，可小额充值测试</p>
                <p>备注信息：交易平台提供的MEMO信息，MEMO信息建议从平台复制，以免出错，交易平台转账一定要填写MEMO！！！</p>
                <img :src="`static/strategy_img/${$t('realtime_quotations.bigone_step2_img9')}`" width="100%">
                <p>输入解锁密码，核对转账信息，确认无误后，点击【确认发送】</p>
                <p>提醒：此次教程用于Bigone充值交易平提现</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            show () {
                $.popup(this.$el);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .detail {
        padding-bottom: .6rem;
        padding-left: .67rem;
        padding-right: .67rem;
        font-size: .6rem;
        .step {
            font-weight: bold;
        }
    }
</style>
