const locale = {
    index: {
        balance_loading: '**',
        backup_wallet: ' 개인키 백업',
        asset_name: 'GXC',
        asset_full_name: '',
        value: '자산총액(CNY)',
        unit: '￥',
        transfer: '보내기',
        receive: '받기',
        wallet: '내 지갑 주소',
        account_name: '지갑주소 ',
        copy: '지갑주소 복사 ',
        copied: '복사 완료 ',
        show_loyalty_program: 'NORMAL',
        join_loyalty_program: '충성계획 참여 ',
        loyalty_program_icon: 'loyalty-program-btn-zh.png',
        account_is_address: '지갑주소 즉 송금 주소'
    },
    market: {
        title: '시세'
    },
    tabs: {
        wallet: '지갑',
        market: '시세',
        staking: 'Staking',
        balance: 'Balance',
        my: 'User'
    },
    left_panel: {
        import_wallet: '지갑 임포트',
        create_wallet: '지갑 생성 ',
        node_vote: '노드 투표',
        manage_wallets: '지갑 관리 ',
        history: '거래 내역',
        language: 'Language',
        about: 'GXChain소개',
        disclaimer: '면책조항'
    },
    wallet_create: {
        index: {
            title: 'GXChain지갑',
            tip_empty: 'GXChain지갑 결합 잠시 못합니다',
            button_create: '지갑 생성 ',
            button_import: '지갑 임포트 ',
            tip_how: '지갑을 어떻게 임포트할까요?'
        },
        step1: {
            title: '지갑 생성',
            label: {
                account: '주소'
            },
            placeholder: {
                account: '주소는 영문 문자,숫자를 포함하여 만드셔야 합니다.'
            },
            query_account_name: '주소 확인 중',
            error: {
                query_account_failed: '주소 조회 실패, 다시 시도해주세요.',
                account_already_exist: '이미 존재하는 주소입니다.',
                empty_account: '주소 입력해주세요',
                account_should_be_longer: '주소는 3자리 이상로 만드세요.',
                account_should_be_shorter: '주소 너무 깁니다.',
                account_should_start_with_a_letter:
          '주소는 영문문자부터 시작해야 합니다.',
                account_format_error:
          '주소는 영문문자,숫자 또는 -를 포함하여 만드셔야 합니다.',
                account_one_dash_error: '-한번만 사용 가능',
                account_end_error: '주소는 영문문자 또는 숫자로 끝나야 합니다.',
                account_segment_should_be_longer:
          '주소는 너무 짧습니다.-전후 3자리를 초과해서 입력해주세요',
                premium_name:
          '사용하고 있는 주소는 고급 주소라 다른 주소 선택해주세요.최소 -하나,숫자 하나 또는 모음을 않 포함하는 주소를 입력해주세요.'
            },
            next: '다음'
        },
        step2: {
            title: '지갑 생성',
            label: {
                password: '비밀번호 입력해주세요',
                confirm: '비밀번호 확인해주세요'
            },
            placeholder: {
                password: '6자리 이상으로 만드셔야 합니다.'
            },
            creating: '주소 생성중',
            done: '완료되었습니다',
            notice: '주의',
            error: {
                password_not_equal: '비밀번호가 일치하지 않습니다',
                account_has_been_registered:
          '중복된 주소 입니다. 주소를 다시 입력해주세요',
                account_create_failed: '주소생성 실패 하였습니다.다시 시도해주세요'
            }
        },
        success: {
            title: '성공',
            tip1: '지갑 생성 성공했습니다',
            tip2: '개인키 분실되면 다시 못 찾으니까 사용전에 백업하시길 바랍니다!',
            backup_wallet: '개인키 백업',
            detail: '지갑 상세 '
        }
    },
    wallet_import: {
        title: '지갑주소 임포트',
        label: {
            password: '비밀번호 입력해주세요 ',
            confirm: '비밀번호 확인해주세요'
        },
        placeholder: {
            key: '여기에 활성화된 개인키를 입력해주세요',
            password: '6자리 이상으로 만드셔야 합니다.'
        },
        confirm: '임포트 확인 ',
        error: {
            password_not_equal: '비밀번호가 일치하지 않습니다',
            account_already_exist: '임포트된 주소입니다.',
            account_not_found: '존재하지 않는 주소입니다',
            invalid_key: '잘못된 개인키 형식입니다',
            no_reference_account:
        '임포트 실패했습니다!개인키와 맞는 주소가 존재하지 않습니다.'
        },
        success: {
            title: '임포트 성공',
            tip1: '지갑 임포트가 성공했습니다',
            tip2:
        '개인키 분실되면은 다시 못 찾으니까 사용전에 개인키를 백업하시길 바랍니다!',
            backup_wallet: '개인키 백업',
            detail: '지갑 열기'
        }
    },
    wallet_manage: {
        title: '지갑 관리',
        tip_backup: '백업해주세요',
        button_import: '지갑 임포트',
        button_create: '지갑 생성'
    },
    wallet_backup: {
        index: {
            title: '개인키를 백업하시길 바랍니다.',
            tip:
        '앱 삭제 후 다른 휴대폰에서 지갑을 사용 시,사용하고 있는 지갑의 개인키를 임포트하셔야 되니까 개인키를 백업하시길 바랍니다.아니면 지갑 자산 영구적으로 분실될 것이다.백업한 지갑 정보를 잘 보관하시길 바랍니다.',
            label: {
                account: '지갑주소',
                asset: '지갑 자산(GXC)',
                private_key: '개인키'
            },
            button_backup: '개인키 백업',
            button_remove: '지갑 삭제'
        },
        detail: {
            title: '개인키를 백업',
            tip:
        '백업을 쉽게 하기 위해 지갑주소는 하기와 같이 문자열로 되는 개인키로 암호화됐습니다.이 개인키를 백업하면 지갑이 되찾아올 수 있습니다.',
            tip1: '순서대로 개인키를 종이에다 적으셔서 잘 보관합니다',
            tip2: '누군가 개인키정보를 얻으면 지갑의 자금을 조작할 수 있습니다.',
            tip3:
        '휴대폰이 캐시를 정리하거나 응용을 삭제하면 개인키가 분실될 수 있습니다.개인키를 분실하면 지갑의 자금을 영구적으로 찾지 못합니다！',
            unlock: '잠금해제',
            copy: '개인키 복사',
            copied: '복사 완료',
            cancel: '취소',
            ok: '확인',
            confirm: '개인키는 백업되셨습니까?',
            tip_password: '지갑을 잠금 해제',
            go_back: '첫 페이지로 돌아가기',
            placeholder: {
                password: '지갑 비밀번호를 입력해주세요'
            },
            error: {
                invalid_password: '비밀번호가 정확하지 않습니다.'
            },
            backup_data_key: '지갑으로 Data-Key를 백업하기'
        }
    },
    wallet_del: {
        title: '지갑 삭제',
        cancel: '취소',
        ok: '확인',
        tip_del:
      '지갑이 잠금해제하고 삭제하기.조작은 취소를 할 수 없습니다.삭제하시겠습니까？',
        placeholder: {
            password: '지갑 비밀번호를 입력해주세요.'
        },
        error: {
            invalid_password: '비밀번호 정확하지 않습니다.',
            invalid_delete: '잔액이 있는 주소는 삭제할 수 없습니다.'
        }
    },
    language_setting: {
        title: 'Language',
        moment: 'ko-KR'
    },
    about: {
        title: 'GXChain소개',
        version: 'V1.2.3',
        desc:
      'GXChain는 개인사용자가 안전하게 데이터를 관리하고 제어 할 수 있도록 지원합니다. 사용자가 데이터의 주인이되고, 시민의 신용 데이터를 진정하게 관리 할 수있는 것이 실현할 것이다。',
        disclaimer: '면책 조항'
    },
    disclaimer: {
        title: '면책조항',
        content:
      '<h4 class="text-center">사용지침 및 면책조항</h4>' +
      '<p>GXChain지갑은 탈중알화 블록체인 응용 프로그램입니다.사용 전 블록체인 관련 지식을 충분히 이해하시고 탈중앙화 지갑을 합리적으로 사용하여 관리하는 기본적인 능력을 갖추시길 바랍니다。</p>' +
      '<p>一、GXChain지갑주소와 비밀번호가 분실되면은 다시 찾지 못합니다.주소와 비밀번호를 잘 보관하시고 개인키를 백업하시길 바랍니다.개인키는 지갑을 다시 찾아올수 있는 유일한 증거입니다!개인키를 백업하지 않거나 보관하지 않거나 부적절한 조작으로 인한 지갑이 분실,혹은 도난당할 경우 GXChain가 책임지지 않습니다.</p>' +
      '<p>二、승인되지 않은 제3자한데 GXChain지갑 앱이나 앱 명이 같은 응용 프로그램을 다운로드받으면 GXChain는 이 소프트웨어의 안정성을 보장하지 않습니다. 이로 인한 손해는 귀하의 책임입니다.</p>' +
      '<p>三、GXChain지갑으로 GXC 송금,출금 등 기능 사용 시 ,블록체인에 조작이 "취소불가" 의속성을 이해해야 합니다.부적절한 조작으로 인한 손실은 귀하의 책임입니다.\n</p>' +
      '<p>四、GXChain지갑에 거래 시,관련된 국가정책, 법률법규를 준수해야 합니다。</p>',
        accept: '확인하고 동의합니다'
    },
    unlock: {
        account_not_found: '지갑안에 해당 주소가 없습니다.',
        cancel: '취소',
        ok: '확인',
        tip_password: '지갑 잠금 해제',
        placeholder: {
            password: '지갑 비밀번호를 입력해주세요'
        },
        error: {
            invalid_password: '비밀번호가 정확하지 않습니다'
        }
    },
    transfer: {
        title: '송금',
        from: '송금 주소 ',
        to: '송금 받는 주소',
        to_placeholder: '주소를 입력해주세요',
        amount: '송금금액',
        amount_placeholder: '금액{symbol}입력',
        receive_amount: '송금 GXC수량을 입력해주세요',
        available: '사용가능: <span class="color-danger">{amount}</span> {symbol}',
        memo: '메모(MEMO)',
        fee: '수수료',
        memo_placeholder: '선택 사항',
        next: '다음',
        send: '송금 요청',
        sending: '송금중',
        error: {
            amount: {
                invalid: '금액이 정확하지 않습니다',
                insufficient_balance:
          '잔액이 부족합니다.잔액은 송금금액+수수료보다 많은 것을 확인해주세요',
                insufficient_diff_balance:
          '잔액이 부족합니다.잔액은 송금금액보다 많은 것을 확인해주세요',
                insufficient_diff_fee: '수수료 잔액이 부족합니다.',
                minimum: '최소 수량은 1보다 커야 합니다.'
            },
            account: {
                cannot_send_to_yourself: '자기에게 송금 불가능합니다',
                from_account_not_exist: '송금하는 주소가 존재하지 않습니다',
                to_account_not_exist: '송금받는 주소가 존재하지 않습니다 ',
                empty_account: '주소 입력해주세요',
                account_should_be_longer: '주소는 최소 3자리입니다.',
                account_should_be_shorter: '주소가 너무 깁니다',
                account_should_start_with_a_letter:
          '주소는 영문문자로  시작되어야 합니다.',
                account_format_error: '주소는 영문、 숫자 또는 - 로 구성되어야합니다',
                account_one_dash_error: '-한번만 사용가능',
                account_end_error: '주소는 영문문자나 숫자로 끝내야 합니다',
                account_segment_should_be_longer:
          '아이디가 너무 짧습니다. -전후 3자리이상으로 입력해주세요',
                premium_name:
          '고급 주소를 사용하고 있으니 최소 -하나,숫자 하나 또는 모음을 않 포함하는 주소를 입력해주세요',
                memo_signer_not_exist:
          '개인키가 존재하지 않습니다.비고는 추가할 수 없습니다.'
            }
        },
        confirm: {
            title: '송금 확인',
            title_password: '비밀번호',
            enter_password: '지갑 비밀번호를 입력해주세요',
            remember_password: 'Remember Password'
        },
        success: {
            title: '송금 성공',
            tip1: '송금이 성공했습니다.',
            tip2: '송금를 받았습니다.',
            done: '완료되었습니다.'
        }
    },
    trade_history: {
        title: '거래 내역',
        switch: '바꾸기',
        currentAccount: '현재주소: {account}',
        empty: '기록이 더 이상 없습니다',
        received: '받기',
        sent: '보내기'
    },
    trade: {
        title: '거래내역',
        sent: '아래 주소로 송금',
        receive: '아래 주소로 송금 받음',
        label: {
            from: '송금 주소',
            to: '받은 주소',
            timestamp: '조작한 시간',
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
        tip2: '가치투자자의 혜택,장기보유자에게 보상을 줄 것입니다',
        tip3:
      '충성계획은 GXChain가 출시한 복리계획입니다.투자자는 일정한 금액의 GXC를 잠글 수 있습니다.잠금 기간에 자금 동결 동시에 해당 보상을 받을 수 있습니다.예를 들어 GXC 1만 개를 9개월 동안에 잠그면 연간이자율 6%으로 하여 자금 잠금해제 시 GXC 450개 보상을 얻을 수 있습니다 .GXChain는 투자자가 충성계획을 통해 앞으로 GXChain가 발전하는 것에 자져온  장기적인 이익을 누릴수 있는 것을 원합니다！',
        banner: 'loyalty-program-banner-zh.jpg',
        term: '잠금기간',
        bonus: '연간보상',
        expected_bonus: '만기보상',
        month: '{month}월| {month}월',
        day: '{day}일 | {day}일',
        due: '만기시간',
        amount: '잠금금액',
        available: '사용가능: <span class="color-danger">{amount}</span> GXC',
        reward: '보상: <span class="color-danger">{amount}</span> GXC',
        join: '계획 설정',
        history: '잠금 기록',
        no_record: '기록이 없습니다',
        locked_at: '잠금 시간',
        locked_amount: '잠금 금액(GXC)',
        button_join:
      '충성계획 가입해서  <span class="big">{bonus}</span>% 벌 수 있습니다.',
        placeholder: {
            amount: '잠금 금액을 입력해주세요 '
        },
        modal: {
            message:
        '충성계획을 가입하는 금액이 잠그될 것이니 그 기간에 팔지 못합니다.해당 조작은 취소할 수 없습니다.가입을 확인하시겠습니까？',
            cancel: '취소',
            confirm: '확인',
            placeholder: '지갑 비밀번호를 입력해주세요'
        },
        error: {
            insufficient_balance: '잔액이 부족합니다.',
            invalid_amount: '금액이 정확하지 않습니다.',
            too_less: '최소 잠금 금액은 1GXC입니다'
        },
        status: {
            title: '상태',
            locked: '잠그되었습니다. ',
            can_unlock: '잠금 수동 해제'
        },
        success: {
            title: '참여 성공',
            message: '{amount} GXC를 성공적으로 잠겄습니다.'
        },
        detail: {
            title: '잠금 상세',
            success: {
                title: '주의',
                message: '축하드립니다.성공적으로 {amount} GXC를 잠금 해제했습니다'
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
            intro:
        'The TrustNode is the producer of the block in GXChain. They validate transaction data and maintain network security. You can vote for the person you trust to become a public trust node. When you vote, the candidate you choose will receive the same number of votes you cast.',
            proxy_tip: '*Voting rights are taken over by proxy voting account.',
            tips: '*updated every hour',
            name: 'TrustNode candidate',
            no_record: 'No records',
            vote_num: 'Vote Num',
            btn_vote: 'Confirm',
            btn_update: 'Update'
        },
        proxy: {
            intro:
        'After setting up a proxy voting account, the proxy voting account will exercise voting power on your behalf.',
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
                lack:
          'The voting account GXC balance is insufficient, at least 0.1GXC is required.'
            }
        }
    },
    realtime_quotations: {
        title: '실시간 시세',
        high: '24h 최고가',
        low: '24h 최저가',
        volume: '24h 거래량',
        line: '시분할',
        candle: '일k',
        strategy: '거래소 입금 공략',
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
        title: '자산 추가',
        tip: '잔여액이 0보다 많을 때는 삭제할 수 없습니다 '
    },
    smart_contract: {
        title: 'Smart Contract',
        params: {
            method_type: 'Method Type',
            request_data: 'Request Data'
        },
        tabs: {
            detail: 'Detail',
            data: 'Data'
        },
        btn: {
            confirm: 'Confirm',
            cancel: 'Cancel'
        }
    },
    pick_wallet: {
        title: {
            step1: 'Choose a GXC Wallet account',
            step2: 'Enter password to unlock',
            no_wallet: 'No Wallet'
        },
        empty_tip: 'No binding wallet, please go to the GXC Wallet to create',
        btn: {
            confirm: 'Confirm',
            next: 'Next'
        },
        remember_pwd: 'remember password during app lifetime'
    },
    oauth: {
        authorize: {
            title: 'Authorization',
            error: {
                default: 'Please open in the BlockCity client',
                response_type: 'response_type parameter is invalid.',
                client_id: 'client_id parameter is invalid.',
                redirect_uri: 'redirect_uri parameter is invalid.',
                login_status: 'Get the user login status is abnormal.'
            },
            chain: {
                data: 'Data on the chain',
                wechat: 'WeChat information',
                confirm_tip1: 'The system detected your ',
                confirm_tip2:
          ', the blockchain has not been uploaded and the app can\'t get your information.',
                confirm: 'To Upload',
                datakey: {
                    lost:
            'The system detects that you have not generated a Data-Key or the Data-Key has been lost, and the application cannot obtain your information.',
                    confirm: 'Generate or retrieve Data-Key'
                }
            },
            current_app: 'This DApp',
            confirm_tip1: 'You agree',
            confirm_tip2: 'get the following permissions',
            confirm_tip3: 'Confirm and agree',
            confirm_tip4: '《User License Agreement》',
            wallet_account: 'Get the name of the GXChain wallet account.',
            wallet_pubkey: 'Get the PublicKey of the GXChain wallet account.',
            btn: {
                confirm: 'Confirm',
                cancel: 'Not yet'
            }
        },
        maintenance: {
            title: 'Application maintenance',
            tips:
        'The app is currently under maintenance. Your assets within the app are not affected during maintenance. The official of BlockCity has instructed the application side to step up processing and resume operations as soon as possible. Please be patient.'
        }
    },
    transactionConfirm: {
        transfer: 'Transfer',
        vote: 'Vote'
    },
    staking: {
        staking_create: 'Create staking',
        staking_claim: 'Claim staking',
        staking_update: 'Update staking',
        staking_max_count:
      'The number of staking has reached the limit. Please change your account to staking',
        staking_program: 'Days',
        please_select_program: 'Please select terms',
        please_input_staking_amount: 'Please input Staking amount',
        staking_amount: 'Amount',
        staking_amount_weight: 'Votes',
        available_count: 'Available ',
        fee: 'Fee',
        confirm: 'Confirm',
        cancel: 'Cancel',
        please_input_amount: 'Please input Amount',
        select_node: 'TrustNode',
        please_select_node: 'Please select TrustNode',
        nodeList: 'TrustNode',
        staking_success: 'Create staking successfully',
        staking_update_success: 'Update staking successfully',
        staking_claim_success: 'Claim staking successfully'
    },
    my: {
        title: 'My'
    }
};

export default locale;
