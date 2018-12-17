const locale = {
    index: {
        balance_loading: '**',
        backup_wallet: ' 프라이빗 키를 백업해주세요',
        asset_name: 'GXC',
        asset_full_name: '',
        value: '가치 (CNY)',
        unit: '￥',
        transfer: '발신',
        receive: '수신',
        wallet: '지갑계정',
        account_name: '아이디명 ',
        copy: '아이디 복사 ',
        copied: '복사 완료 ',
        show_loyalty_program: 'HIDE',
        join_loyalty_program: '충성계획 참여 ',
        loyalty_program_icon: 'loyalty-program-btn-en.png',
        account_is_address: '아이디명 즉 계좌 이체 주소 '
    },
    market: {
        title: '시장'
    },
    tabs: {
        wallet: '지갑계정',
        market: '시장'
    },
    left_panel: {
        import_wallet: '지갑 유입',
        create_wallet: '지갑 생성 ',
        node_vote: '노드 투표',
        manage_wallets: '지갑 관리 ',
        history: '수신과 발신 기록',
        language: 'Language',
        about: 'GXChain소개',
        disclaimer: '면책 성명'
    },
    wallet_create: {
        index: {
            title: 'GXChain지갑',
            tip_empty: 'GXChain지갑에 등록이 안했습니다',
            button_create: '지갑 생성 ',
            button_import: '지갑 유입 ',
            tip_how: '지갑을 어떻게 유입할까요 ?'
        },
        step1: {
            title: '지갑 생성 ',
            label: {
                account: '아이디명 '
            },
            placeholder: {
                account: '자모와 숫자의 조합을 입력해주세요  '
            },
            query_account_name: '아이디명 검사중 ',
            error: {
                query_account_failed: '아이디 조회 실패, 다시 시도해주세요 ',
                account_already_exist: '아이디 이미 존재합니다 ',
                empty_account: '아이디명 입력해주세요',
                account_should_be_longer: '아이디명 최소 3자리로 ',
                account_should_be_shorter: '아이디명 너무 깁니다 ',
                account_should_start_with_a_letter: '아이디는 영문부터 시작 ',
                account_format_error: '아이디는 영문、 숫자 또는 -를 조합하여',
                account_one_dash_error: '-한번만 사용 가능',
                account_end_error: '아이디는 영문 또는 숫자로 끝납니다',
                account_segment_should_be_longer: '아이디는 짧다는 경우,-전후  3자리를 초과하여 입력해주세요',
                premium_name: '사용하고 있는 아이디는 고급 아이디라 다른 아이디 선택해주세요,최소 -하나 또는 숫자 하나를 포함, 단  모음자모 불포함'
            },
            next: '다음 단계'
        },
        step2: {
            title: '지갑 생성',
            label: {
                password: '비밀번호 입력해주세요',
                confirm: '비밀번호 확인해주세요'
            },
            placeholder: {
                password: '6자리 이상 문자'
            },
            creating: '아이디 생성중',
            done: '완료되었습니다',
            notice: '제시',
            error: {
                password_not_equal: '비밀번호가 일치하지 않습니다',
                account_has_been_registered: '중복된 아이디 입니다，아이디를 다시 입력해주세요',
                account_create_failed: '아이디 생성을 실패 하였습니다,다시 시도해주세요'
            }
        },
        success: {
            title: '사용 가능한 아이디입니다',
            tip1: '지갑 생성 성공했습니다',
            tip2: '사용전 프라이빗 키를 백업해주세요, 분실되면은 다시 찾지 못합니다',
            backup_wallet: '프라이빗 키를 백업해주세요',
            detail: '지갑 세부 정보'
        }
    },
    wallet_import: {
        title: '아이디 유입',
        label: {
            password: '비밀번호 입력해주세요 ',
            confirm: '비밀번호 입력해주세요'
        },
        placeholder: {
            key: '권한 프라이빗 키를 입력하여 활성화 시켜 주세요',
            password: '6자리 이상 문자 '
        },
        confirm: '유입 확인 ',
        error: {
            password_not_equal: '비밀번호가 일치하지 않습니다',
            account_already_exist: '중복된 아이디 입니다, 유입하지 마세요',
            account_not_found: '존재되지 않는 아이디입니다',
            invalid_key: '프라이빗 키 양식이 정확하지 않습니다',
            no_reference_account: '유입 실패되었습니다. 프라이빗 키와 맞는 아이디가 존재하지 않습니다'
        },
        success: {
            title: '유입을 성공했습니다',
            tip1: '지갑 유입을 성공했습니다',
            tip2: '사용전 프라이빗 키를 백업해주세요, 분실되면은 다시 찾지 못합니다',
            backup_wallet: '프라이빗 키를 백업해주세요',
            detail: '지갑 세부 정보'
        }
    },
    wallet_manage: {
        title: '지갑 관리',
        tip_backup: '백업해주세요',
        button_import: '지갑 유입',
        button_create: '지갑 생성'
    },
    wallet_backup: {
        index: {
            title: '프라이빗 키를 백업해주세요',
            tip: '앱 삭제 후 다른 휴대폰에서 지갑을 사용 시 ,사용하고 있는 지갑을 유입하여 프라이빗 키를 백업해주세요,아니면 지갑 재산 영구적으로 분실될 것이다 ,지갑을 백업하여 정보를 잘 보관해주세요 。',
            label: {
                account: '지갑아이디',
                asset: '지갑 잔액(GXC)',
                private_key: '프라이빗 키'
            },
            button_backup: '프라이빗 키를 백업해주세요',
            button_remove: '지갑 삭제'
        },
        detail: {
            title: '프라이빗 키를 백업해주세요',
            tip: '백업을 편하기 하기 위해 우리는 지갑아이디에 이하 영문으로 조합되는 암호 프라이빗 키,이 프라이빗 키를 백업하면 지갑이 회복될 것이다。',
            tip1: '순서대로 프라이빗 키를 종이에 다가 복사하거나 베껴 적고 잘 보관합니다',
            tip2: '누군가 프라이빗 키정보를 얻으면 지갑의 자금을 작업할 수 있습니다',
            tip3: '휴대폰이 캐시를 정리하거나 응용을 삭제하면 프라이빗 키가 분실될 수 있습니다 .프라이빗 키를 분실하시면 지갑의 자금을 영구적으로 찾지 못합니다！',
            unlock: '해제',
            copy: '프라이빗 키 복사',
            copied: '복사 완료',
            cancel: '취소',
            ok: '확인',
            confirm: '프라이빗 키를 백업 했습니까？',
            tip_password: '지갑을 해제 해주세요',
            go_back: '메인페이지로  돌아가기',
            placeholder: {
                password: '지갑 비밀번호를 입력해주세요'
            },
            error: {
                invalid_password: '비밀번호가 정확하지 않습니다'
            },
            backup_data_key: '지갑으로 Data-Key를 백업해주세요'
        }
    },
    wallet_del: {
        title: '지갑 삭제',
        cancel: '취소',
        ok: '확인',
        tip_del: '지갑을 해제하고 삭제하세요., 이 작업은 취소를 할 수 없습니다. ,삭제 하시겠습니까？',
        placeholder: {
            password: '지갑 비밀번호를입력해주세요'
        },
        error: {
            invalid_password: '비밀번호 정확하지 않습니다',
            invalid_delete: '잔액이 있는 아이디는 삭제를 할수없습니다'
        }
    },
    language_setting: {
        title: 'Language',
        moment: 'ko-KR'
    },
    about: {
        title: 'GXChain소개',
        version: 'V1.2.3',
        desc: 'GXChain는 개인사용자가 안전하게 데이터를 관리하고 제어 할 수 있도록 지원합니다. 사용자가 데이터의 주인이되고, 시민의 신용 데이터를 진정하게 관리 할 수있는 것이 실현할 것이다。',
        disclaimer: '면책 조항'
    },
    disclaimer: {
        title: '면책 조항',
        content: '<h4 class="text-center">사용 및 면책 지침</h4>' +
        '<p>GXChain지갑은 분산 된 블록체인 응용 프로그램입니다,사용 전 블록체인에 과학적인 지식을 충분히 이해하여야 합니다,분산 된 지갑을 합리적으로 사용하거나 관리하는 기본적인 능력을 갖춰야 합니다。</p>' +
        '<p>一、GXChain지갑아이디과 비밀번호가 분실되면은 다시 찾지 못합니다,아이디와 비밀번호를 잘 보관해주세요,또한 지갑의 프라이빗 키를 백업해주세요,프라이빗 키는 지갑을 다시 찾을 수 있는 유일한 증거입니다!프라이빗 키를 미백업하거나 미보관하거나 부적절한 작업으로 지갑이 분길되거나 도난에 대한 책임은 GXChain가 책임지지 않습니다。</p>' +
        '<p>二、승인되지 않은 제3방에게 GXChain지갑앱이나 이 소프트웨어명칭과 같은 응용 프로그램을 얻으면 GXChain는 이 소프트웨어의 안정성을 보증하지 않습니다. 이 때문에 손해나는 것을 귀하의 부담해야 합니다。</p>' +
        '<p>三、GXChain지갑으로 GXC등 기능을 발송 시,블록체인에 작업을 "취소불능 "속성을 이해해야 합니다,틀리게 작업하는 탓에 결과가  불이익 손실을 스스로 부담해야 합니다。\n</p>' +
        '<p>四、GXChain지갑에 거래 시,관련된 국가정책, 법률법규를 준수해야 합니다。</p>',
        accept: '확인하였고 동의합니다'
    },
    unlock: {
        account_not_found: '지갑안에 해당 아이디가 없습니다',
        cancel: '삭제',
        ok: '확인',
        tip_password: '당신의 지갑을 잠금을 풀어주세요',
        placeholder: {
            password: '지갑 비밀번호를 입력해주세요'
        },
        error: {
            invalid_password: '비밀번호가 정확하지 않습니다'
        }
    },
    transfer: {
        title: '발송',
        from: '아이디 발송 ',
        to: '상대방 아이디',
        to_placeholder: '상대방의 아이디를 작성해주세요',
        amount: '발송 수량',
        amount_placeholder: '수량{symbol}작성',
        receive_amount: '수신GXC수량을 작성해주세요',
        available: '사용가능: <span class="color-danger">{amount}</span> {symbol}',
        memo: '메모(MEMO)',
        fee: '수수료',
        memo_placeholder: '선택 사항',
        next: '다음 단계',
        send: '발송',
        sending: '발송중',
        error: {
            amount: {
                invalid: '수량이 정확하지 않습니다',
                insufficient_balance: '잔액이 부족합니다,송금금액+수수료가 잔액보다 많은 것을 확인해주세요',
                insufficient_diff_balance: '잔액이 부족합니다,송금금액이 잔액보다 많은 것을 확인해주세요',
                insufficient_diff_fee: '수수료 잔액이 부족합니다',
                minimum: '최소수량은 1보다 커야 합니다'
            },
            account: {
                cannot_send_to_yourself: '자기에게 송금 불가능합니다',
                from_account_not_exist: '전출아이디가 존재하지 않습니다',
                to_account_not_exist: '상대방 아이디가 존재하지 않습니다 ',
                empty_account: '아이디명을 입력해주세요',
                account_should_be_longer: '아이디는 최소 3자리로',
                account_should_be_shorter: '아이디가 너무 깁니다',
                account_should_start_with_a_letter: '아이디는 문자로  시작되어야 합니다',
                account_format_error: '아이디는 영문、 숫자 또는 - 를 조합하여',
                account_one_dash_error: '-한번만 사용가능',
                account_end_error: '아이디는 문자나 숫자로 끝내야 합니다',
                account_segment_should_be_longer: '아이디가 너무 짧습니다, -전후  3자리를 초과하여 입력해주세요',
                premium_name: '프리미엄 아이디를 사용하고 있습니다.,최소 -하나 또는 숫자 하나를 포함, 단  모음자모 불포함',
                memo_signer_not_exist: '프라이빗 키가 존재하지 않습니다, 비고는 추가할 수 없습니다'
            }
        },
        confirm: {
            title: '계죄이체 확인',
            title_password: '비밀번호',
            enter_password: '지갑 비밀번호를 입력해주세요'
        },
        success: {
            title: '계좌이체가 성공했습니다',
            tip1: '계좌이체가 성공했습니다',
            tip2: '계좌이체를 받았습니다',
            done: '완료되었습니다'
        }
    },
    trade_history: {
        title: '수신과 발신 기록',
        switch: '전환',
        currentAccount: '현재아이디: {account}',
        empty: '기록이 더 이상 없습니다',
        received: '수신',
        sent: '발신'
    },
    trade: {
        title: '세부 정보 기록',
        sent: '이하 계좌로 입금해주세요',
        receive: '이하 계좌에서 옵니다',
        label: {
            from: '아이디를 발송합니다',
            to: '아이디를 수신합니다',
            timestamp: '작업한 시간',
            fee: '수수료({symbol})',
            memo: '메모(MEMO)'
        },
        modal: {
            ok: '확인',
            copy: '복사',
            copy_success: '복사 성공했습니다'
        }
    },
    loyalty_program: {
        title: '충성계획',
        tip1: 'GXChain과 함께 성장하겠습니다',
        tip2: '가치투자자의 복리,장기보유자에게 보상을 줄 것입니다',
        tip3: '충성계획은 GXChain가 출시한 복리계획입니다,투자자는 한정한 한도의 GXC를 고정시킬 수 있습니다,잠금 기간에 자금동결 동시에 대응보상을 향유합니다.예를 들어 1만GXC를 9개월 고정시킨다면 연간6%에 따라 만기 후 450개 GXC보상을 얻을 수 있습니다 .GXChain는 투자자가 충성계획을 통해 앞으로 GXChain가 발전하는 것에 자져온  장기적인 이익을 누릴수 있는 것을 원합니다！',
        banner: 'loyalty-program-banner-en.jpg',
        term: '잠금기간',
        bonus: '연간보상',
        expected_bonus: '만기보상',
        month: '{month}월| {month}월',
        day: '{day}일 | {day}일',
        due: '만기시간',
        amount: '잠금금액',
        available: '사용가능: <span class="color-danger">{amount}</span> GXC',
        reward: '보상: <span class="color-danger">{amount}</span> GXC',
        join: '설치계획',
        history: '잠금기록',
        no_record: '기록이 없습니다',
        locked_at: '잠금시간',
        locked_amount: '잠금금액(GXC)',
        button_join: '충성계획 가입해서 <span class="big">{bonus}</span>% 를 벌 수 있습니다',
        placeholder: {
            amount: '잠금금액을 작성해주세요 '
        },
        modal: {
            message: '충성계획을 가입하는 금액이 고정될 것이다, 그 기간에 팔지 못합니다,해당 조작은 삭제할수없습니다,가입을 확인하겠습니까？',
            cancel: '취소',
            confirm: '확인',
            placeholder: '지갑 비밀번호를 입력해주세요'
        },
        error: {
            insufficient_balance: '잔액이 부족합니다',
            invalid_amount: '금액이 정확하지 않습니다',
            too_less: '최소잠금금액은 1GXC입니다'
        },
        status: {
            title: '상태',
            locked: '잠금이 되었습니다 ',
            can_unlock: '수동으로 해제해주세요'
        },
        success: {
            title: '참여성공했습니다',
            message: '잠금이 성공했습니다 {amount} GXC'
        },
        detail: {
            title: '잠금 세부 정보',
            success: {
                title: '제시',
                message: '축하합니다,성공적으로 {amount} GXC를 해제합니다'
            }
        }
    },
    node_vote: {
        tab: {
            tab1: 'TrustNodes',
            tab2: 'Proxy Voting'
        },
        index: {
            title: 'Node Voting',
            records: 'Voting record',
            intro: 'The TrustNode is the producer of the block in GXChain. They validate transaction data and maintain network security. You can vote for the person you trust to become a public trust node. When you vote, the candidate you choose will receive the same number of votes you cast.',
            proxy_tip: '*Voting rights are taken over by proxy voting account.',
            tips: '*updated every hour',
            name: 'TrustNode candidate',
            no_record: 'No records',
            vote_num: 'Vote Num',
            btn_vote: 'Confirm',
            btn_update: 'Update'
        },
        proxy: {
            intro: 'After setting up a proxy voting account, the proxy voting account will exercise voting power on your behalf.',
            input_label: 'Account',
            input_placeholder: 'please enter proxy account',
            btn_submit: 'Save changes',
            btn_remove: 'Remove Proxy'
        },
        confirm: {
            title: 'Confirm the vote',
            title2: 'Update proxy account',
            account: 'Account',
            proxy_account: 'Proxy account',
            selected_node: 'Selected',
            fee: 'Fee',
            btn_confirm: 'Confirm',
            success: 'Successful Vote',
            success2: 'Successful Update'
        },
        error: {
            cannot_proxy_to_yourself: 'Cannot proxy to yourself'
        }
    },
    node: {
        vote: {
            count: {
                max: 'Support up to 10 nodes',
                min: 'Support at least 2 nodes'
            },
            gxc: {
                lack: 'The voting account GXC balance is insufficient, at least 0.1GXC is required.'
            }
        }
    },
    realtime_quotations: {
        title: '실시간 시세',
        high: '24h최고값',
        low: '24h최저값',
        volume: '24h거래량',
        line: '시분할',
        candle: '일k',
        strategy: '거래소 입금되는 전략',
        allcoin_step1_img1: 'allcoin_step1_img1.png',
        allcoin_step1_img2: 'allcoin_step1_img2.png',
        allcoin_step1_img3: 'allcoin_step1_img3.png',
        allcoin_step1_img4: 'allcoin_step1_img4.png',
        allcoin_step2_img1: 'allcoin_step2_img1.png',
        allcoin_step2_img2: 'allcoin_step2_img2.png',
        allcoin_step2_img3: 'allcoin_step2_img3.png',
        allcoin_step2_img4: 'allcoin_step2_img4.png',
        allcoin_step2_img5: 'allcoin_step2_img5.png',
        allcoin_step2_img6: 'allcoin_step2_img6.png',
        allcoin_step2_img7: 'allcoin_step2_img7.png',
        allcoin_step3_img1: 'allcoin_step3_img1.png',
        allcoin_step3_img2: 'allcoin_step3_img2.png',
        allcoin_step3_img3: 'allcoin_step3_img3.png',
        allcoin_step3_img4: 'allcoin_step3_img4.png',
        allcoin_step3_img5: 'allcoin_step3_img5.png',
        allcoin_step3_img6: 'allcoin_step3_img6.png',
        allcoin_step3_img7: 'allcoin_step3_img7.png',
        allcoin_step3_img8: 'allcoin_step3_img8.png',
        allcoin_step3_img9: 'allcoin_step3_img9.png',
        bigone_step1_img1: 'bigone_step1_img1.png',
        bigone_step1_img2: 'bigone_step1_img2.png',
        bigone_step1_img3: 'bigone_step1_img3.png',
        bigone_step1_img4: 'bigone_step1_img4.png',
        bigone_step1_img5: 'bigone_step1_img5.png',
        bigone_step2_img1: 'bigone_step2_img1.png',
        bigone_step2_img2: 'bigone_step2_img2.png',
        bigone_step2_img3: 'bigone_step2_img3.png',
        bigone_step2_img4: 'bigone_step2_img4.png',
        bigone_step2_img5: 'bigone_step2_img5.png',
        bigone_step2_img6: 'bigone_step2_img6.png',
        bigone_step2_img7: 'bigone_step2_img7.png',
        bigone_step2_img8: 'bigone_step2_img8.png',
        bigone_step2_img9: 'bigone_step2_img9.png',
        binance_step1_img1: 'binance_step1_img1.png',
        binance_step1_img2: 'binance_step1_img2.png',
        binance_step2_img1: 'binance_step2_img1.png',
        binance_step2_img2: 'binance_step2_img2.png',
        binance_step3_img1: 'binance_step3_img1.png',
        binance_step3_img2: 'binance_step3_img2.png',
        binance_step3_img3: 'binance_step3_img3.png',
        binance_step3_img4: 'binance_step3_img4.png',
        binance_step3_img5: 'binance_step3_img5.png',
        binance_step3_img6: 'binance_step3_img6.png',
        binance_step3_img7: 'binance_step3_img7.png',
        binance_step3_img8: 'binance_step3_img8.png',
        binance_step3_img9: 'binance_step3_img9.png',
        bitz_step1_img1: 'bitz_step1_img1.png',
        bitz_step1_img2: 'bitz_step1_img2.png',
        bitz_step1_img3: 'bitz_step1_img3.png',
        bitz_step2_img1: 'bitz_step2_img1.png',
        bitz_step2_img2: 'bitz_step2_img2.png',
        bitz_step2_img3: 'bitz_step2_img3.png',
        bitz_step2_img4: 'bitz_step2_img4.png',
        bitz_step3_img1: 'bitz_step3_img1.png',
        bitz_step3_img2: 'bitz_step3_img2.png',
        bitz_step3_img3: 'bitz_step3_img3.png',
        bitz_step3_img4: 'bitz_step3_img4.png',
        bitz_step3_img5: 'bitz_step3_img5.png',
        bitz_step3_img6: 'bitz_step3_img6.png',
        bitz_step3_img7: 'bitz_step3_img7.png',
        bitz_step3_img8: 'bitz_step3_img8.png'
    },
    add_assets: {
        title: '새로운 자산을 추가',
        tip: '이 자산잔액이 0보다 많습니다,꺼질 수 없습니다 '
    }
};

export default locale;
