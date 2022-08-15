var MENU_NAVIGATION_SNB = {
    /* 쿠키 관련 메서드 */
    setCookie : function(cookieName, cookieValue, expireDate) {
        var today = new Date();
        today.setDate( today.getDate() + parseInt( expireDate ) );
        document.cookie = cookieName + "=" + escape( cookieValue ) + "; path=/; expires=" + today.toGMTString() + ";";
    },

    getCookie : function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    removeCookie : function(name) {
        this.setCookie(name,"",-1);
    },
    /* 쿠키관련 메서드 끝 */

    /**
     * 스마트모드 lnb 스크롤 이벤트
     */
    setScrollEventMode : function() {
        
        // 스마트모드 아니면 리턴.
        if (SHOP.isMode() !== true) {
            return;
        }
       
        // 모바일 모드면 리턴.
        if (SHOP.isMobileAdmin() === true) {
            return;
        }

        // LNB 홈 링크 selected (선택된 메뉴가 없을경우에만)
        if ($('#snb').find('li.collapsable').length === 0) {
            $('.ec-mode-lnb-topmenu').closest('li').addClass('selected');
            if ($('#content').data('dashboard') !== true) {
                // 대시보드가 아닐경우 설정버튼 활성화
                $('.ec-mode-lnb-topmenu.btnSetting').addClass('selected');
            }
        }

        $(".eCustomScrollbar").mCustomScrollbar({
            axis: "y",
            scrollButtons: {
                enable: false
            }
        });

        $('#snb > li > a').click(function() {
            // 스마트모드 LNB 상단 홈, 설정 메뉴 선택 UI 처리
            if ($(this).hasClass('ec-mode-lnb-topmenu') === true) {
                $(this).parent().addClass('selected');
            }
            // 클릭한 메뉴가 새창으로 여는 메뉴라면 이전에 선택된 메뉴 collapsable class 삭제
            if ($(this).parent().hasClass('newWindow') === true) {
                $('#snb > li').removeClass('collapsable');
            }
            // 플러스앱 메뉴(팝업,newWindow 클래스 없음)의 경우 이전에 선택된 메뉴 collapsable class 삭제되도록 별도 처리
            if ($(this).attr('menuno') === '10243') {
                $('#snb > li').removeClass('collapsable');
            }

            setScrollbar();
            return;
        });

        if($('#sidebar .ftp').hasClass('over')) {
            $('.mLayerFileUploader').addClass('show');
        }

        $('.btnLink.detele').click(function() {
            $('.mLayerFileUploader').removeClass('show');
        });

        function setScrollbar(){
            var headerHeight = $('#header').outerHeight(true),
                snbHeight = $('#snb').outerHeight(true),
                snbBottomHeight = $('.snbBottom').outerHeight(true),
                sideBarHeight = $('body').outerHeight(true);
            if( snbHeight > sideBarHeight - headerHeight - snbBottomHeight + 1){
                $('.mCSB_container').addClass('gFlexClear');
            }else{
                $('.mCSB_container').removeClass('gFlexClear');
            }

        }

        setScrollbar();

        $(window).resize(function() {
            setScrollbar();
        });
    },

    /**
     * 뉴프로모드 LNB 펼침/닫힘 이벤트
     */
    setLnbExpandEvent: function() {
        // 서버단에서 쿠키 flag대로 펼침/접힘 안되는 케이스 방지
        var sIsFoldLnb = MENU_NAVIGATION_SNB.getCookie('is_new_pro_mode_lnb_fold');
        if (sIsFoldLnb !== 'T') {
            $('#wrap.beta').removeClass('snbHidden');
        }

        // 펼침/닫힘시 쿠키생성
        $('.eSnbToggle').click(function(){
            $('#wrap').toggleClass("snbHidden");
            $('.betaArea').toggleClass('hide');

            // 쿠키에 펼침/닫힘 상태 저장
            var sIsLnbFold = $('#wrap').hasClass('snbHidden') ? 'T' : 'F';
            MENU_NAVIGATION_SNB.setCookie('is_new_pro_mode_lnb_fold', sIsLnbFold, '365');
        });

        // 좌측상단 로고 및 1depth 클릭시 펼침상태로 초기화
        $('#menuList ul li,.logo a').click(function() {
            MENU_NAVIGATION_SNB.setCookie('is_new_pro_mode_lnb_fold', 'F', '365');
        });

        // 퍼블리싱팀 UI 스크립트 (단축키 이벤트)
        function snbToggle(e) {
            var wrap = document.querySelector("#wrap");
            if(e && e.keyCode == 219) {
                if (wrap.classList.contains("snbHidden")) {
                    wrap.classList.remove("snbHidden");
                } else {
                    wrap.classList.add("snbHidden");
                }
                var sIsLnbFold = wrap.classList.contains ? 'T' : 'F';
                MENU_NAVIGATION_SNB.setCookie('is_new_pro_mode_lnb_fold', sIsLnbFold, '365');
            }
        }
        var form = document.querySelectorAll("input","textarea");
        document.addEventListener("keyup",snbToggle);
        for (var i=0; i<form.length; i++) {
            form[i].addEventListener("focus",function() {
                document.removeEventListener("keyup", snbToggle);
            });
            form[i].addEventListener("blur",function() {
                document.addEventListener("keyup", snbToggle);
            });
        }
    },

    /**
     * 뉴프로모드 LNB ui 클릭 이벤트
     */
    setNewProModeLnbClickEvent: function() {
        // 2depth 뒤로가기 버튼
        $('#ec_new_pro_lnb_back_btn').click(function() {
            $('.snbArea').removeClass('simple');
            $('.subMenu.eClone').css('display', 'none');
        });
        // $('#mCSB_2_container ul.menu a').click(function(e) {
        //     var sOnclick = $(this).attr("onclick");
        //     if (sOnclick != null && sOnclick != ''){
        //         if (sOnclick.search(/javascript/gi)>-1){
        //             return false;
        //         }
        //     }
        //
        //     //메뉴번호를 통해 gnb오브젝트 가져오기
        //     var gnbObject = top.MenuAction.isGNB($(this).attr("treeno"));
        //     if (gnbObject == null) {
        //         return ;
        //     }
        //
        //     e.preventDefault();
        //     var bResult = top.MenuAction.change(gnbObject.menu_alias,null,'','rootGnb');
        //     if (bResult == true) {
        //         // GNB클릭으로 페이지 이동시 LNB open/close 쿠키제거
        //         MENU_NAVIGATION_SNB.removeCookie('isLnbMenuClose');
        //     }
        // });
    },

    // 뉴프로모드: 마우스 오버시 커스텀 툴팁 노출하는 UI 개발팀 이벤트
    setNewProModeTooltipEvent: function() {
        if($('#wrap.snbHidden') || $('.snbArea.simple')){
            $('#sidebar .link[name]').each(function(){
                var target = $(this);
                var targetName = target.attr("name");
                target.hover(function(){
                    var xPosition = $('#sidebar').width() + 5;
                    var yPosition =target.offset().top - $(window).scrollTop() + 6;
                    var sideTip = $('<span class="sideTip">'+targetName+'</span>');
                    if(!$('#wrap').hasClass('snbHidden') && $('.snbArea').hasClass('simple')){
                        var xPosition = $('#sidebar').width() - $('.snbArea > .subMenu').width() + 5;
                        sideTip.css({top:yPosition, left:xPosition, display:'block'});
                    }else{
                        sideTip.css({top:yPosition, left:xPosition});
                    }
                    $('#wrap').append(sideTip);
                },function(){
                    $('#wrap .sideTip').remove();
                });
            });
        }
    }
};

// 주문관리 매뉴얼 오픈
var ORDER_MANUAL = {
    init : function () {
        // 이벤트 세팅 : 주문관리 매뉴얼 버튼 클릭 > 지정한 target 으로 오픈
        $('.eBtnOrdManual').click(function(e){
            e.preventDefault();
            var sPopupUrl = $(this).attr('href');
            var sTarget = $(this).attr('target');

            if (typeof(sTarget) == 'undefined') {
                sTarget = '_blank';
            }
            if (typeof(sPopupUrl) != 'undefined') {
                ORDER_MANUAL.openManualPopup(sPopupUrl, sTarget);
            }
        });
    },
    
    // 매뉴얼창 오픈
    openManualPopup : function(sPopupUrl, sTarget) {
        window.open(sPopupUrl, sTarget);
    }
};

jQuery(function($){
    // 메뉴클릭 이벤트 바인딩
    if (SHOP.isNewProMode() === true) {
        // GNB & LNB & 설정허브
        snb.setClick($(".snbArea .menu li a,.snbArea .subMenu ul li a,.hubArea ul li a"), $(".tabArea .tab li a"), $(".sub .menu"));

    } else {
        snb.setClick($(".snbArea .sub .menu:visible li a"), $(".tabArea .tab li a"), $(".sub .menu"));
    }

    snb.initOpen();

    // LNB메뉴 close 쿠키여부로 class처리
    snb.setSnbHidden();

    // LNB메뉴 open/close
    $('.eSnb button').click(function(){
        $('#container').toggleClass("snbHidden");

        // LNB메뉴숨김 cookie처리
        if ($('#container').hasClass('snbHidden')) {
            MENU_NAVIGATION_SNB.setCookie('isLnbMenuClose', 'T', '365');
        } else {
            MENU_NAVIGATION_SNB.removeCookie('isLnbMenuClose');
        }
    });

    // 멀티쇼핑몰 리스트
    var $sideMultiShopWrap = $("#sideMultiShop .wrap");

    $sideMultiShopWrap.delegate('*', 'focus click', function(){
        $sideMultiShopWrap.data('onfocusing', true);
        window.setTimeout(function(){$sideMultiShopWrap.data('onfocusing', false);}, 100);
    });

    $("#sideMultiShop .setting .toggle").click(function(){
        if ($sideMultiShopWrap.is(':visible')) {
            $(document.body).undelegate('*', 'blur.multishop');
            $sideMultiShopWrap.hide();

        } else {
            $(document.body).delegate('*', 'blur.multishop', function(e){
                window.setTimeout(function(){
                    if ( ! $sideMultiShopWrap.data('onfocusing')) {
                        $(document.body).undelegate('*', 'blur.multishop');
                        $sideMultiShopWrap.hide();
                    }
                }, 100);
            });

            $sideMultiShopWrap.show();

            // fakescroll 적용
            fakescroll.set('multiShopfakeScroll', { tracksize:'-3' });
            $('#multiShopfakeScroll .scroll-bar').append('<span class="inner"></span>');
            $('#multiShopfakeScroll .scroll-arrow').append('<span class="inner"></span>');
        }
    });
    $("#sideMultiShop .wrap .footer .close").click(function(){
        $sideMultiShopWrap.hide();
    });
    $("#sideMultiShop .wrap .shop").click(function(){
        $sideMultiShopWrap.hide();
    });
    if (MENU_NAVIGATION_SNB.getCookie('isViewMultishopGuide') == null) {
        $("#multiShopGuide").show();
    }
    $("#multiShopGuide .footer .close").click(function(){
        if ($(".eViewMultishopGuide").is(":checked")) {
            MENU_NAVIGATION_SNB.setCookie('isViewMultishopGuide', 'T', '365');
        }
        $("#multiShopGuide").hide();
    });

    // 디자인 편집하기 버튼 클릭시
    $(".snbArea .sub .link a").click(function() {

        var sOpenType = $(this).data('open');
        if (sOpenType === 'redirect') {
            window.location.href = $(this).attr('url');
            return;
        } else if (sOpenType === 'tab') {
            var sUrl = $(this).attr('url');
            var sTarget = '_blank';
            if (sUrl.indexOf('ezstframe') !== -1) {
                var oMatch = sUrl.match(/skin-skin(\d*)/);
                var sKeyword = oMatch !== null && typeof(oMatch) === 'object' && oMatch[1] ? oMatch[1] : '0';
                sTarget = 'ec-blank-page-exists-menu-ezst-' + sKeyword
            }
            window.open(sUrl, sTarget).focus();
            return;
        }

        //popup
        var sPopupOption = 'top=0,left=0,width=' + (screen.availWidth - 20) + 'px,';
        sPopupOption += 'height=' + (screen.availHeight - 70) + 'px, scrollbars=no,';
        sPopupOption += 'status=no, toolbar=no, menubar=no, location=no, resizable=yes';

        var url = $(this).attr('url');
        var match = url.match(/skin_no=([0-9]*)/);

        if (match == null) match = url.match(/skin_code=([0-9]*)/);

        var pop = window.open(url, 'Editor_' + match[1], sPopupOption);
        pop.focus();
    });

    // 주문관리 매뉴얼 팝업
    ORDER_MANUAL.init();
});

(function(window, undefined){
    var $ = window.jQuery;
    var snb = function(){};

    snb = snb.prototype = {
        snbObj : null,
        tabObj : null,  //tab 버튼정의
        tabLayer : null, //tab 레이어

        /**
         * jwlee03 추가
         * 탭메뉴에 관련된 버튼이나 레이어 수집 함께처리
         * 
         * @author 이재욱 <jwlee03@simplexi.com>
         * @since 2014.02.13
         */
        setClick : function (obj, tab, layer) {
            // 인플모드 체크
            obj = (typeof(SHOP) !== 'undefined' && SHOP.isMode() === true) ? $('#snb li a[menuno]') : obj;

            this.snbObj = obj;
            obj.click(function(e){
                snb.switchFunction.call(this,e);
            });
            
            //탭 셋팅. 탭또는 레이어가 없는경우 셋팅하지 않음.
            if (tab == undefined || layer == undefined) {
                return ;
            } else {
                if (tab.length == 0 || layer.length == 0) {
                    return ;
                }
            }

            this.tabObj = tab;
            this.tabLayer = layer;

            if ($(tab).parent().hasClass('selected') == false) {
                $(tab[0]).parent().addClass("selected");
                $(layer[0]).css("display" , "block");
            }

            tab.each(function(index){
                $(this).click(function(e){
                    top.MenuAction.change(null ,$(this).attr("treeno") , '' , '');
                    //snb.toggleTabLayer(index , $(this).attr('menuno'));
                    e.preventDefault();
                });
            });
        },

        /**
         * LNB메뉴 close셋팅
         */
        setSnbHidden : function() {
            var sCookie = MENU_NAVIGATION_SNB.getCookie('isLnbMenuClose');

            // 대시보드페이지면 cookie remove
            if ($('.snbToggle').length < 1) {
                MENU_NAVIGATION_SNB.removeCookie('isLnbMenuClose');
                return;
            }

            if (sCookie == 'T') {
                $('#container').attr('class', 'snbHidden');
            }
        },

        /**
         * jwlee03 추가
         * 탭에 대한 메뉴 토글 수행
         */
        toggleTabLayer : function (index , menuno) {
            this.tabObj.parent().removeClass("selected");
            $(this.tabObj[index]).parent().addClass("selected");

            this.tabLayer.hide();
            $(this.tabLayer[index]).show();

            //주문관리 업그레이드 레이어 처리
            if (menuno != null && menuno == 4) {
                $(".tabArea .version").show();
            } else {
                $(".tabArea .version").hide();
            }
        },

        /**
         * jwlee03 추가
         * 오브젝트 비교를 통해 메뉴가 토글될 인덱스 가져오기
         */
        getToggleTabIndex : function(menu)
        {
            var index = -1;
            for (var i=0; i<this.tabObj.length; i++) {
                if ($(this.tabObj[i]).attr("treeno") == menu.treeno) {
                    index =  i;
                    break;
                }

            }
            return index;
        },

        toggleChild : function (liObj){
            if (SHOP.isNewProMode() === true) {
                // 2depth이고 자식메뉴가 있는경우 펼침/닫힘 처리
                if (liObj.closest('ul').hasClass('depth2') && liObj.hasClass('hasChild')) {

                    // ECHOSTING-465988 : 현재 페이지와 다른 2depth 메뉴 펼칠시 UI 처리 분기 (사양 보완해서 추후 적용할예정)
                    // var $currentSelectedLi = null;
                    // $('ul.depth3 li').each(function (iIndex, oLiElement) {
                    //     // 현재 페이지가 3depth 메뉴인경우 li 엘리먼트 세팅
                    //     if ($(oLiElement).hasClass('selected') ) {
                    //         $currentSelectedLi = $(oLiElement);
                    //     }
                    // });
                    // if ($currentSelectedLi) {
                    //     if (liObj.hasClass('selected')) { // 현재 페이지의 2depth 부모 펼침메뉴 클릭한경우
                    //         $currentSelectedLi.closest('li.hasChild').removeClass('selected');
                    //     } else { // 현재 페이지 외 다른 2depth 펼침메뉴 클릭한 경우
                    //         $currentSelectedLi.closest('li.hasChild').addClass('selected');
                    //     }
                    // }

                    if (liObj.hasClass('show')) { // 클릭한 li가 이미 펼침상태면
                        liObj.closest('ul').find('li').removeClass('show');
                    } else { // 클릭한 li가 닫혀있다면
                        liObj.closest('ul').find('li').removeClass('show');
                        liObj.addClass('show');
                    }
                }
            } else {
                if ( liObj.hasClass("depth2") ){ //3뎁스인 메뉴의 2뎁스메뉴일때
                    liObj.toggleClass("collapsable");
                    liObj.toggleClass("expandable");
                    if (!liObj.parent().parent().hasClass("collapsable")) {
                        liObj.parent().parent().toggleClass("collapsable");
                    }
                } else {
                    if (!liObj.hasClass("collapsable")){ //현재 메뉴가 펼쳐진 상태라면 닫는 처리만 함
                        this.snbObj.each(function(){$(this).parent().removeClass("collapsable");});
                    }

                    if (typeof SHOP !== 'undefined' && SHOP.isMode() === true && liObj.hasClass('ec-smart-gnb-link') === true && liObj.hasClass('collapsable') === true) {
                        return;
                    } else {
                        if (liObj.hasClass("expandable")) {
                            liObj.toggleClass("collapsable");
                        }
                    }
                }
            }
        },

        initOpen : function () { //서브메인페이지 호출시 snb메뉴
            //LNB 파싱하기 메뉴 파싱하기
            //top.MenuAction.parseLNB();

            // GNB/LNB hidden일 경우 return
            if ($('#wrap').attr('class') == 'wrapHidden') {
                return;
            }

            // C스토어 메뉴 selected 구분변수
            var bCstoreSelected = false;

            // 페이지 첫로드시 lnb정보 셋팅 - 멀티쇼핑몰 이동 및 대시보드 접근시 첫메뉴open을 위해
            this.snbObj.each(function() {
                // LNB하단영역 C스토어 메뉴, C스토어 > 마이앱(1576) selected 체크
                if ($(this).parent().hasClass('collapsable') && ( $(this).parent().hasClass('line') || $(this).attr('menuno') == '1576' )) {
                    bCstoreSelected = true;
                    return false;
                }

                if ($(this).parent().hasClass('selected')) {
                    MenuAction.navi.lnb = $(this).attr('treeno');
                    return false;
                }
            });

            // C스토어 메뉴가 selected라면 return;
            if (bCstoreSelected == true) {
                return false;
            }

            if (top.MenuAction.navi.lnb == null) {
                if (this.tabObj != null) {
                    // 주문관리 탭일경우 - 영업관리/통계관리
                    this.tabObj.each(function() {
                        if ($(this).parent().hasClass('selected')) {
                            top.MenuAction.navi.lnb = $(this).attr('treeno');
                            return false;
                        }
                    });
                }

                if (top.MenuAction.navi.lnb == null) {
                    // 대시보드 페이지인지 GNB에서 찾음
                    $('#gnb ul li a').each(function() {
                        if ($(this).parent().hasClass('selected')) {
                            top.MenuAction.navi.lnb = $(this).attr('treeno');
                            return false;
                        }
                    });
                }

                // 인플루언서 모드는 첫메뉴 토글 안함
                if (typeof(SHOP) !== 'undefined' && SHOP.isMode() === true) {
                    return false;
                }

                //navi에 메뉴정보 없는경우 기본적인 첫 메뉴 토글
                try {
                    if ($(this.snbObj[0]).parent().length > 0 && !$(this.snbObj[0]).parent().hasClass("collapsable")) {
                        snb.toggleChild($(this.snbObj[0]).parent());
                    }                    
                } catch (e) {}
            }

            /*
            //뉴상품 상품관리페이지 LNB토글 (top 로딩순서가 뒤로 밀리는현상때문에 인터벌)
            if (!top.MenuAction.navi.menu) {
                var interval_cnt = 1;
                var interval = setInterval(function(){
                    if (interval_cnt > 10) {
                        clearInterval(interval);
                    } else {
                        if (top.MenuAction.navi.menu) {
                            snb.setNewProductMenuToggle();
                            clearInterval(interval);
                        }
                    }
                    interval_cnt++;
                }, 100);
            } else {
                snb.setNewProductMenuToggle();
            }
            */
        },
        hrefSelected : function (href) {
            this.snbObj.each(function(){
                if (this.href == href) {
                    if ( $(this).parent().parent().parent().hasClass("depth1") || $(this).parent().parent().parent().hasClass("depth2") ) {
                        snb.toggleChild($(this).parent().parent().parent());
                    }
                    snb.setSelected (this);
                }
            });
        },
        menuNameSelected : function (sMenuName) {
            this.snbObj.each(function(){
                if (this.innerText == sMenuName) {
                    if ( $(this).parent().parent().parent().hasClass("depth1") || $(this).parent().parent().parent().hasClass("depth2") ) {
                        snb.toggleChild($(this).parent().parent().parent());
                    }
                    snb.setSelected (this);
                 }
            });
        },

        menuNameSelectedAndMovePage : function (sMenuName) {
            this.snbObj.each(function(){
                if (this.innerText == sMenuName) {
                    if ( $(this).parent().parent().parent().hasClass("depth1") || $(this).parent().parent().parent().hasClass("depth2") ) {
                        snb.toggleChild($(this).parent().parent().parent());
                    }
                    snb.moveLocation(this.href);
                    snb.setSelected (this);
                }
            });
        },

        /**
         * jwlee03 추가
         * 메뉴번호를 통한 메뉴 펼침
         */
        menuNoSelectedAndMovePage : function (iTreeNo) {
            //고객센터정보 예외처리
            if (iTreeNo == 871) {
                iTreeNo = 160;
            }

            //해당 메뉴번호가 GNB 번호인지 검사. GNB 번호일경우 1번 탭이 오픈되며 나머지 처리는없음.
            var mResult = top.MenuAction.isGNB(iTreeNo);
            //GNB인경우
            if (mResult != null) {
                snb.toggleChild($(this.snbObj[0]).parent());
                return ;

            //해당 메뉴가 GNB가 아닌경우 처리
            } else {
                this.snbObj.each(function(){
                    if ($(this).attr("treeno") == iTreeNo) {
                        if ( $(this).parent().parent().parent().hasClass("depth1") || $(this).parent().parent().parent().hasClass("depth2") ) {
                            snb.toggleChild($(this).parent().parent().parent());
                        }
                        snb.setSelected (this);
                    }
                });
            }

            //메뉴번호로 오브젝트 받아내기
            var oMenu = top.MenuAction.getTreeObjectByTreeNo(iTreeNo);

            //정산관리의 경우 첫번째 메뉴 펼침
            if (oMenu.menuno == 5 || oMenu.menuno == 2060) {
                var oTempParent = $($($(".sub .menu")[1]).children()[0]);
                if (oTempParent.hasClass("collapsable") == false) {
                    snb.toggleChild($($($(".sub .menu")[1]).children()[0]));
                }
            }

            //메뉴정보를 토대로 상위에 탭메뉴가 존재하는지 파악.
            var tabResult = top.MenuAction.isTab(oMenu);
            // 존재하면 해당 오브젝트 갖고 탭될 버튼및 레이어에 반영
            if (tabResult != null) {
                var index = this.getToggleTabIndex(tabResult);
                this.toggleTabLayer(index , tabResult.menuno);
            }
        },

        setSelected : function (obj){
            var liObj =  $(obj).parent();
            this.snbObj.each(function(){$(this).parent().removeClass("selected");});
            liObj.addClass("selected");
        },
        moveLocation : function (sHref){

            parent.parent.frames["center"].location = sHref;

            return false;

        },
        switchFunction : function(e){

            //메뉴가 펼쳐지면서 center 도 변하는 경우    
            if ($(this).hasClass("menu_action_m")) {
                snb.toggleChild($(this).parent());
                e.preventDefault();
                top.MenuAction.change(null ,$(this).attr("treeno"),'','noLnbChange');
                return false;

            } else if ($(this).parent().find("ul").length > 0 && ! $(this).parent().hasClass("version")) {
                if (typeof SHOP !== 'undefined' && SHOP.isMode() === true && $(this).parent().hasClass('ec-smart-gnb-link') === true) {
                    return ;
                }

                // 하위 메뉴 toggle
                snb.toggleChild($(this).parent());
                e.preventDefault();
                return false;

            } else if (this.href.search(/javascript/gi) > -1) {
                // href의 스크립트 실행 (href에 자바스크립트 있으면 그냥 리턴함.)
                snb.setSelected(this);
                return false;

            } else {
                // 메뉴 열기
                var iMenuNo = $(this).attr("menuno");
                var sMenu = null;
                var iTreeNo = $(this).attr("treeno");
                var sMore = 'noLnbChange'; // lnb 새로고침 안함
                var sTargetFrame = $(this).attr("targetframe");

                if (iMenuNo == '2075') {
                    sMenu = 'store';
                    iTreeNo = 1273;
                    sMore = 'transformTreeNo';

                } else if (iMenuNo == '1641') {
                    //분석통계 메뉴인경우 lnb변화 추가(1.9 접속통계 변환을 위해서는 이 메뉴만은 lnb가 변해야한다.)
                    sMore = 'useThisMenuAlias';
                }

                sMore = (sTargetFrame == 'T') ? 'targetFrame' : sMore;

                if (snb.isNewProductLnbMenu() === true) {
                    snb.toggleLnb(snb.isProductToggleMenu(iTreeNo));
                }

                if (top.MenuAction.change(sMenu, iTreeNo, '', sMore) === true) {
                    // return값이 true인 경우에만 선택한 것으로 표시
                    snb.setSelected(this);
                }
                e.preventDefault();
            }

        },
        
        setNewProductMenuToggle: function() {
            if (snb.isNewProductLnbMenu() === true) {
                snb.setToggleBtnEvent();
                snb.toggleLnb(snb.isProductListLangdingPage());
            }
        },
        
        isNewProductLnbMenu: function() {
            return (top.MenuAction.navi.menu === 'product2') ? true : false;
        },
        
        isProductListLangdingPage: function() {
            
            if (top.MenuAction.navi.lnb && $.inArray(top.MenuAction.navi.lnb, snb.getNewProductToggleMenu()) !== -1) {
                return true;
            }
            return false;
        },
        
        isProductToggleMenu: function(tree_no) {
            
            if (tree_no && $.inArray(tree_no, snb.getNewProductToggleMenu()) !== -1) {
                return true;
            } 
            return false;
        },
        
        getNewProductToggleMenu: function() {
            return ['958', '959', '960'];
        },
        
        toggleLnb: function(flag) {
            
            if (flag === true) {
                $("body").addClass('gToggle');
                $(".snbToggle").show();
            } else {
                $("body").removeClass('gToggle');
                $(".snbToggle").hide();
            }
        },
        
        setToggleBtnEvent: function () {
            
            $("#eToggleLeftDisplay").toggle(
                function() {
                    $("body").addClass("snbHidden");
                    $(parent.document).find("#frame_center").attr('cols', '17,*');
                    $("#eToggleLeftDisplay").html("메뉴 펼침");
                },
                function() {
                    $("body").removeClass("snbHidden");
                    $(parent.document).find("#frame_center").attr('cols', '200,*,0');
                    $("#eToggleLeftDisplay").html("메뉴 숨김");
                }
            );
        }
    };

    window.snb = snb;

})(window);

// ECHOSTING-370456 lnb 스크롤 액션.
$(window).load(function(){
    MENU_NAVIGATION_SNB.setScrollEventMode();

    if (SHOP.isNewProMode() === true) {
        MENU_NAVIGATION_SNB.setLnbExpandEvent();
        MENU_NAVIGATION_SNB.setNewProModeLnbClickEvent();
        MENU_NAVIGATION_SNB.setNewProModeTooltipEvent();
    }
});