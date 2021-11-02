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
        account_is_address: '지갑주소 즉 송금 주소',
        staking: '투표',
        assets: 'Assets',
        collection: 'NFT'
    },
    nft: {
        send: 'Send',
        please_input_account: 'Please Input Account',
        view_info: 'View Detail',
        nft_list: 'NFT List',
        confirm_send: 'Confirm',
        details: 'Detail: ',
        total: 'Total: ',
        successful: 'Send successful'
    },
    market: {
        title: '시세'
    },
    tabs: {
        wallet: '지갑',
        market: '시세',
        staking: '투표',
        balance: '자산',
        my: '나의'
    },
    left_panel: {
        import_wallet: '지갑 임포트',
        create_wallet: '지갑 생성 ',
        node_vote: '노드 투표',
        manage_wallets: '지갑 관리 ',
        history: '거래 내역',
        language: 'Language',
        about: 'GXChain소개',
        disclaimer: '면책조항',
        Income_received: '수익 수령'
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
            claim: {
                not_arrived: '클 레 임 타임 포인트 가 아직 도착 하지 않 았 다.'
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
            tab1: '트러스트 노드',
            tab2: 'Proxy Voting'
        },
        index: {
            title: '노드 투표',
            records: '투표 기록',
            intro:
        '트러스트 노드는 GXChain에 블록 생성자입니다. 트러스트 노드가 거래 데이터를 검증하고 네트워크 안정을 유지합니다.  신뢰할 만한 노드에게 트러스트 노드가되도록 투표 할 수 있습니다. 투표하면 선택한 트러스트 노드 후보자가 투표 한 것과 같은 수의 투표를 얻게 됩니다.',
            proxy_tip: '*Voting rights are taken over by proxy voting account.',
            tips: '*투표수가  한시간마다 업데이트합니다',
            name: '트러스트 노드 후보자',
            no_record: '기록이 없음',
            vote_num: '투표수',
            vote_num_weight: '새 티켓',
            btn_vote: '투표 제출',
            btn_update: '투표 업데이트',
            view_new_vote: '살펴보다 액면 가격.'
        },
        proxy: {
            intro:
        'After setting up a proxy voting account, the proxy voting account will exercise voting power on your behalf.',
            input_label: 'Account',
            input_placeholder: '계정주소를 입력하세요',
            btn_submit: '저정',
            btn_remove: 'Remove Proxy'
        },
        confirm: {
            title: '투표 확인',
            title2: '투표 계정 주소 변경',
            account: '계정',
            proxy_account: 'Proxy account',
            selected_node: '선택한 노드',
            fee: '수수료',
            btn_confirm: '확인',
            success: '투표 성공',
            success2: '업데이터 성공'
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
        title: '스마트 계약',
        params: {
            method_type: '함수 타입',
            request_data: '데이터 요청'
        },
        tabs: {
            detail: '상세',
            data: '데이터'
        },
        btn: {
            confirm: '확인',
            cancel: '취소'
        }
    },
    pick_wallet: {
        title: {
            step1: '지엑스체인 지갑 계정 선택하기',
            step2: '지갑 비밀번호를 입력하여 락 해제하기',
            no_wallet: '지갑이 없음'
        },
        empty_tip: '연동된 지갑이 없음. 지엑스체인 지갑을 생성하기',
        btn: {
            confirm: '확인',
            next: '다음'
        },
        remember_pwd: 'app 생명 주기내에 비밀번호 기억하기'
    },
    oauth: {
        authorize: {
            title: '수권하기',
            error: {
                default: '댑 블록시티 안에 열리기',
                response_type: 'response_type  매개 변수가 유효하지 않습니다',
                client_id: 'client_id 매개 변수가 유효하지 않습니다.',
                redirect_uri: 'redirect_uri 매개 변수가 유효하지 않습니다.',
                login_status: '유저 등록 상태 회득 불가'
            },
            chain: {
                data: 'on-chain 데이터',
                wechat: 'wechat 정보',
                confirm_tip1: '고객님의 ',
                confirm_tip2:
          ', chain에 업로드하지 않았으며 응용측에 해당 데이터가 검색하지 못합니다.',
                confirm: '데이터 on-chain 하기',
                datakey: {
                    lost:
            '고객님의 Date-Key 생성되지않거나 Date-Key가 분실된 상태라 응용측에 해당 데이터를 검색하지 못합니다.',
                    confirm: 'Data-Key 생성 및 되찾기'
                }
            },
            current_app: '현재 응용',
            confirm_tip1: '동의합니다.',
            confirm_tip2: '하기 권한을 수권합니다.',
            confirm_tip3: '수권 및 동의',
            confirm_tip4: '《고객 수권 협의》',
            wallet_account: 'GXChain 지갑 계정 명칭 획득.',
            wallet_pubkey: 'GXChain 지갑 계정 퍼블릭 키 획득.',
            btn: {
                confirm: '수권 확인',
                cancel: '잠시후'
            }
        },
        maintenance: {
            title: '시스템 점검 중',
            tips:
        '해당 응용이 점검 중입니다. 점검 시  응용 안에 자산이 영향을 받지 않습니다.'
        }
    },
    transactionConfirm: {
        transfer: '이체',
        vote: '투표',
        signature: '사인'
    },
    staking: {
        staking_create: '투표하기',
        staking_claim: '투표 취소',
        staking_update: '투표 변경',
        staking_max_count:
      '투표 수가 상한에 도달했습니다. 투표하도록 계정을 변경하십시오',
        staking_program: '투표 주기 ',
        please_select_program: '투표 주기를 선택하세요',
        please_input_staking_amount: '투표 수량을 입력하세요',
        staking_amount: '투표 수량',
        staking_amount_weight: '투표수',
        available_count: '사용 가능 ',
        fee: '수수료',
        confirm: '확인',
        cancel: '취소',
        please_input_amount: '투표 수량을 입력하세요',
        select_node: '노드 선택',
        please_select_node: '노드 선택하기',
        nodeList: '노드',
        staking_success: '투표 제출 성공',
        staking_update_success: '투표 변경 성공',
        staking_claim_success: '투표 취소 성공',
        staking_for_node: '노드에 투표하기 ',
        Income_received: '수익 수령',
        collect_immediately: '바로 수령',
        collect_immediately_all: '모든 수익 수령해보기',
        get_earned: '환불',
        earned_coin_day: '기 완료된 스테이킹 시간',
        required_coin_day: '스테이킹 필요한 시간',
        remain_day: '락업 해제 될 때까지',
        get_amount: '수령 가능한 수량',
        coin_day: '코인 스테이킹 시간',
        day: '일',
        income_received_success: '수익 수령 성공',
        please_input_min_amount: '투표 최소 수량 {amount} 개 GXC',
        title: '투표',
        node_rate: '커미션 비율',
        error: {
            insufficient_balance: '수수료 가 부족 하 다'
        },
        income: {
            amount: '금액',
            confirmTitle: '거래 를 확인 하 세 요.',
            tips: '해빙 계좌 잔액 을 추출 하 다.'
        }
    },
    my: {
        title: '나의 '
    },
    proposal: {
        vote: '투표',
        vote_number: '투표 수',
        active: '활동적인',
        result: '현재 결과',
        information: '정보',
        report: '보고서 다운로드',
        support: '동의하십니까?',
        no_support: '동의하지 않는 것이 확실합니까?',
        vote_success: '투표 성공',
        vote_fail: '투표 실패',
        yes: '확인하다',
        expand: '나머지 확장',
        change_support: '동의로 변경하시겠습니까?',
        change_noSupport: '동의하지 않음으로 변경하시겠습니까?',
        totalVote: '총 투표수',
        totalUserVote: '유권자 수',
        agree: '동의하다',
        disagree: '동의하지 않는다',
        cast_agree: '동의에 투표하셨습니다~',
        cast_disagree: '당신은 이미 반대표를 던졌습니다~',
        start_date: '시작일',
        end_date: '오픈 종료일',
        dint: '결과는 최종 통계에 따릅니다'
    }
};

export default locale;
