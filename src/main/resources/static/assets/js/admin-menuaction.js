/**
 * GNB / LNB 蹂��� �ㅽ겕由쏀듃
 * jwlee03@simplexi.com
 * 2013.04.04
 */
 var MenuAction = {
    //�ъ슜�섎뒗 ID
    ID_TOP_MENU : 'top_menu', //top window.frameset �� �곕뒗 �꾩씠��
    ID_GNB_UL : 'gnb', //gnb li�쒓렇瑜� 媛먯떥怨좎엳�� Ul �꾩씠��

    //�ъ슜�섎뒗 CLASS
    CLASS_NAME_SELECTED : 'selected', //gnb �ㅻ퉬寃뚯씠�� �좏깮/鍮꾩꽑�� �대옒��

    //�붿껌 URL
    URL_TEMPLATE_MENU_LIST : '/admin/php/menu/request/TemplateMenuListAjax.php', // �대떦 紐곗씠 �ъ슜�섎뒗 �쒗뵆由우쓽 硫붾돱 tree�뺣낫 �붿껌 url

    // 硫붾돱 �쇱� 荑좏궎 ��
    MENU_REFRESH_COOKIE_KEY : 'is_refresh_menu',
    // 硫붾돱 濡쒖뺄�ㅽ넗由ъ� �� prefix
    MENU_LOCAL_STORAGE_PREFIX : 'templateMenuList',

    //�꾨젅�� 怨듯넻URL
    URL_IFRAME_COMMON : '/disp/admin/shop/frame?menu=',

    //�꾨젅�� �곗씠�� �뺣낫
    frames : {
        frame_top : null,
        frame_center : null,
        frame_left : null,
        frame_content : null
    },

    //硫붾돱�뺣낫瑜� �대뒗 諛곗뿴
    aMenuList : [],

    //�덉쇅���곸씤 硫붾돱�ㅼ쓽 紐⑤뱶�뺣낫 媛��몄삤湲�
    //�붿옄�멸�由ъ뿉�� html/template , �묒냽�듦퀎�먯꽌 1.9 / 2.0
    aExceptionMenuMode : [],

    //gnb/lnb �뺣낫 / 硫��곗꺏 �뺣낫 / 湲고� �뚮씪誘명꽣 �뺣낫
    navi : {
        menu : null,
        lnb : null,
        other : {}
    },

    //more �≪뀡.
    // - �ъ슜�⑸룄 ( 媛쒕컻�� 留덉쓬 )
    // 1. �곹뭹愿�由ъ쓽 ��遺꾨쪟瑜� �섎굹 �좏깮�섍린�꾪빐 �ъ슜��.
    more : null,

    // change �⑥닔�먯꽌 path�ㅼ뿉 �뚮씪硫뷀꽣 異붽��� �ъ슜�섎뒗 object
    oParams : null,

    // �쇳븨紐곗쓣 蹂�寃쏀븯怨� �덈뒗 以묒씤吏� (top�곸뿭�� closeAgent()�먯꽌 �ъ슜)
    onGoingChangeShop : false,

    /**
     * �� 蹂�寃�
     * @param int iToShopNo 蹂�寃쏀븷 �듬쾲��
     * @param string sToLanguage 蹂�寃쏀븷 �듭쓽 �몄뼱
     */
    changeShop : function(iToShopNo, sToLanguage)
    {
        if (EC_SDE_SHOP_NUM == iToShopNo) {
            // �꾩옱�듦낵 蹂�寃쏀븷 �듭씠 �숈씪�� 寃쎌슦 �꾨Т寃껊룄 �덊븿
            return;
        }

        if (this.aMenuList.length == 0) {
            this.getMenuListAjax();
        }

        // ECQAUNIT-59970 : �댄봽濡쒕え�� �쇳븨紐� �ㅼ젙 �섏쐞 硫붾돱�멸꼍�� �몃━踰덊샇 �ы븷��
        if (SHOP.isNewProMode() && NEW_PRO_CURRENT_PAGE_SETTING_HUB_TREE_NO) {
            // ECQAINT-48904 : �대� 理쒖쥌 �대룞�� �섏씠吏��� �곗씠�곌� �뺤긽 �뗮똿�� 寃쎌슦(depth媛� 4�댁긽)�� �쒖쇅
            if (MenuAction.aMenuList.treeno[MenuAction.navi.lnb]['depth'] < 4) {
                MenuAction.navi.lnb = NEW_PRO_CURRENT_PAGE_SETTING_HUB_TREE_NO;
            }
        }

        // �꾩옱硫붾돱 ���� (T: 怨듯넻硫붾돱, F: �듬퀎硫붾돱, K: 援�궡紐�(�쒓뎅�대ぐ)�먯꽌留� �ъ슜 媛��ν븳 硫붾돱)
        var sCurrentMenuType = null;
        if (MenuAction.navi.lnb && MenuAction.aMenuList.treeno[MenuAction.navi.lnb]) {
            sCurrentMenuType = MenuAction.aMenuList.treeno[MenuAction.navi.lnb].is_common_menu;
        }

        // �꾩옱 硫붾돱踰덊샇
        var iCurrentMenuNo = null;
        if (MenuAction.navi.lnb && MenuAction.aMenuList.treeno[MenuAction.navi.lnb]) {
            iCurrentMenuNo = MenuAction.aMenuList.treeno[MenuAction.navi.lnb].menuno;
        }

        // ���쒕낫�� �щ�
        var sIsDashBoard = false
        try {
            sIsDashBoard = (MenuAction.navi.lnb == MenuAction.aMenuList.treeno[MenuAction.navi.lnb].topTreeNo) ? true : false;
        } catch (e) {
        }
        // �댄봽濡쒕え�쒖뿉�쒕뒗 ���쒕낫�쒖そ MenuAction.navi.lnb 媛믪씠 null濡� 珥덇린�붾맖.. (GNB媛� �놁뼱�몄꽌 洹몃윴寃껉컳��)
        if (!sIsDashBoard && SHOP.isNewProMode()) {
            // ���쒕낫�� �섏씠吏��몄��� �щ� �뺤씤
            sIsDashBoard = $('#ec_new_pro_sub_dashboard_page').length > 0 ? true : false;
        }

        if (SHOP.isDefaultShop() === true && iToShopNo != SHOP.getDefaultShopNo() && sCurrentMenuType === 'T' && sIsDashBoard == false) {
            // �꾩옱 硫붾돱媛� 怨듯넻 硫붾돱怨� 蹂�寃쏀븯�ㅻ뒗 �듭씠 湲곕낯�듭씠 �꾨땶 寃쎌슦
            if (MenuAction.aMenuList.treeno[MenuAction.navi.lnb].is_default_menu === 'T') {
                alert(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["THIS.MENU.THE.BASIC.MALL"]);
            } else {
                alert(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["BASIC.SHOPPING.MALL"]);
            }
            return;
        }

        if (sToLanguage != 'ko_KR' && sCurrentMenuType === 'K' && sIsDashBoard == false) {
            alert(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["THIS.MENU.DOMESTIC.MALLS"]);
            return;
        }

        // ECHOSTING-126465 �댁쇅紐곕쭔 "怨좉컼愿�由� > �ъ엯怨� �뚮┝�ㅼ젙 > �ъ엯怨� �뚮┝ �ъ슜�ㅼ젙|硫붿씪愿�由�" 硫붾돱 �ㅽ뵂 (硫붾돱肄붾뱶 : 2300,2301)
        if (sToLanguage == 'ko_KR' && (iCurrentMenuNo == '2300' || iCurrentMenuNo == '2301') && CAFE24.GLOBAL_INFO.isGlobal() == false) {
            alert(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["MENU.AT.OVERSEAS.MALLS"]);
            return;
        }

        // ECHOSTING-93593 - 洹몃９�⑥뼱 諛붾줈媛�湲� 湲곕낯紐� �대룞�� 洹몃９�⑥뼱 二쇱슂湲곕뒫 �섏씠吏�濡� �대룞
        if (iCurrentMenuNo == '1278') {
            iCurrentMenuNo = '1277';
        }

        // �좏깮�� lnb媛� �놁쓣 寃쎌슦, �뚮씪硫뷀꽣 �뚯떛�섏뿬 李얘린
        if (MenuAction.navi.lnb == null) {
            var iTreeNo = MenuAction.parseIframe();
            MenuAction.navi.lnb = (iTreeNo != '') ? iTreeNo : null;

            if (MenuAction.navi.lnb == null) {
                // �ъ씠�몃㏊�몄� 泥댄겕
                var iSiteMap = location.pathname.indexOf('site_map_new.php');
                if (iSiteMap > 0) {
                    MenuAction.navi.lnb = (CAFE24.GLOBAL_INFO.isGlobal() === true) ? 2548 : 869;
                }
            }
            iCurrentMenuNo = (MenuAction.navi.lnb != null) ? MenuAction.aMenuList.treeno[MenuAction.navi.lnb].menuno : iCurrentMenuNo;
        }
        if (typeof INFLUENCER_MENU_NAVIGATION_GNB !== 'undefined' && INFLUENCER_MENU_NAVIGATION_GNB.getCookie('is_mode') !== 'false') {
            INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_mode', false, 30);
        }
        // �� 諛� 硫붾돱 議댁옱 �щ� �뺤씤 �� �대룞
        $.ajax({
            url: '/admin/php/shop' + iToShopNo + '/menu/request/checkExistsShopAndMenuAjax.php',
            dataType: 'json',
            data: {
                menu_no: iCurrentMenuNo
            },
            success: function(json)
            {
                if (json.shop_no != iToShopNo) {
                    alert(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["MALL.BEING.CREATED"]);
                    return;
                }

                if (iCurrentMenuNo && json.exists_menu_no === false) {
                    alert(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["MALL.MENU.PRIVILEGES"]);
                    return;
                }

                MenuAction.onGoingChangeShop = true;

                var aParameter = [];
                if (MenuAction.navi.menu) {
                    aParameter.push('menu=' + MenuAction.navi.menu);
                }
                if (iCurrentMenuNo) {
                    aParameter.push('lnb=' + iCurrentMenuNo);
                }

                var aMenuItem = MenuAction.aMenuList.treeno[MenuAction.navi.lnb];
                var sUrl = '';
                if (aMenuItem == null) {
                    sUrl = '/admin/php/shop' + iToShopNo + '/main.php' + '?' + aParameter.join('&');
                    // �댄봽濡쒕え��: 硫붾돱�뺣낫 �녿뒗(���쒕낫�� �섏씠吏�) 硫��곗꺏 �대룞濡쒖쭅 �덉쇅泥섎━
                    if (SHOP.isNewProMode() && sIsDashBoard) {
                        var sCurrentUrl = window.location.pathname + window.location.search;
                        sUrl = sCurrentUrl.replace(/\/shop[0-9][0-9]?/g , '/shop' + iToShopNo);
                    }
                } else {
                    sUrl = (aMenuItem.frame == 'I' || json.is_iframe == 'T') ? MenuAction.URL_IFRAME_COMMON + aMenuItem.menuno : aMenuItem.path;

                    // �붿옄�멸�由� ���쒕낫�� �덉쇅泥섎━ - 援ъ긽�덈븣臾몄뿉 �꾨젅�꾪���(t_menu_treeview.frame_type)�� 'I'�대�濡�
                    if (aMenuItem.menuno == 2 && aMenuItem.menu_alias == 'newDesign') {
                        sUrl = aMenuItem.path;
                    }

                    // �댄봽濡쒕え��: �ㅼ젙�덈툕 �섏씠吏� 硫��곗꺏 �대룞濡쒖쭅 �덉쇅泥섎━
                    if (SHOP.isNewProMode() && aMenuItem['topMenuNo'] == '10270') {
                        // �댄봽濡쒕え�� �ㅼ젙�덈툕�� �랁븳 硫붾돱�먯꽌�� 硫��곗꺏 蹂�寃쎌떆
                        if (aMenuItem['has_child'] === 'T') {
                            var sCurrentUrl = window.location.pathname + window.location.search;
                            sUrl = sCurrentUrl.replace(/\/shop[0-9][0-9]?/g , '');
                        } else {
                            if (aMenuItem.frame == 'I' || json.is_iframe == 'T') {
                                sUrl = MenuAction.URL_IFRAME_COMMON + aMenuItem.menuno;
                            } else {
                                sUrl = aMenuItem['path'];
                            }
                        }
                    }

                    sUrl = MenuAction.replaceMultiShopUrl(sUrl, iToShopNo);
                }

                if (parent) {
                    parent.top.location.href = sUrl;
                } else {
                    top.location.href = sUrl;
                }

            },
            complete: function(xhr, status)
            {
                if (status != 'success') {
                    alert(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["NETWORK.ERROR.PLEASE.TRY"]);
                }
            }
        });

    },

    /*
     * �ㅻ퉬寃뚯씠�� �뺣낫 珥덇린��
     */
    clearNavi : function()
    {
        this.navi.menu = null;
        this.navi.lnb = null;
        this.navi.other = {};
        return ;
    },

    /**
     * Object Length
     * IE8�먯꽌 Object.keys 吏��먯븞��..
     */
    getObjectSize : function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    },

    /*
     * 硫붾돱 踰덊샇瑜� �듯빐 GNB�� LNB瑜� �숈떆�� 蹂��붿떆�⑤떎.
     * @param string menu gnb 硫붾돱�� �섎━�댁뒪紐�
     *
     * @param int lnb lnb 硫붾돱�� 硫붾돱踰덊샇
     * @param bool isRoute clearNavi �섑뻾 �щ� (湲곕낯�듭씠 �꾨땶 硫붿씤�붾㈃ > 利먭꺼李얜뒗 硫붾돱 > 湲곕낯�듭뿉�쒕쭔 �ъ슜媛��ν븳 硫붾돱 �대┃ �덉쓣 寃쎌슦 _ �ㅻ퉬 珥덇린�� / 2014.11.21)
     * @param string more 異붽��곸쑝濡� �됰룞�댁빞�� �ы빆吏���. �� �뚮씪誘명꽣�� 媛쒕컻�먭� 硫붾돱�대룞�� 愿��섏뿬 異붽��ы빆�� �앷만�� �쎌엯�섏뿬 泥섎━�쒕떎.
     * @param string params �곹뭹�닿린�� �ъ슜�섎뒗 �뚮씪誘명꽣.
     * @return bool �뺤긽 �대룞 �щ� 由ы꽩
     */
    change : function(menu, lnb , isRoute, more, params)
    {
        // �댄봽濡쒕え�� 遺�媛��쒕퉬�� �섏씠吏� 硫붾돱�뺣낫 �덉쇅泥섎━
        var bIsNewProModeBmExcept = SHOP.isNewProMode() && more === 'moveBm';
        if (bIsNewProModeBmExcept) {
            // lnb 蹂�寃� (湲곗〈 遺�媛��쒕퉬�� treeno -> �좉퇋 遺�媛��쒕퉬�� menuno)
            if (CAFE24.GLOBAL_INFO.isGlobal()) { // Global
                if (lnb == '2557') lnb = '8';
            } else { // KR
                if (lnb == '157') lnb = '10384';
            }

            // lnb �덉쇅泥섎━
            if (params == 'addsvc_foreign_pg_info' || params == 'alliance_bankcheck_info' || params == 'addsvc_foreign_csagentsm_info' || params == 'alliance_ems_info' || params == 'alliance_express_info' || params == 'pg_root') {
                lnb = '10385';
            } else if (params == 'alliance_sms' || params == 'cs_alarmtalk_info' || params == 'addsvc_cafe24app_info' || params == 'alliance_bulkmail') {
                lnb = '10386';
            } else if (params == 'alliance_imagehosting_apply') {
                lnb = '10387';
            }

            // 遺�媛��쒕퉬�� 肄붾뱶 �덉쇅泥섎━
            if (params == 'addsvc_apply_apply') {
                params = 'addsvc_root';
            }

            // 遺�媛��쒕퉬�� 肄붾뱶 �덉쇅泥섎━
            if (params == 'dashboard_addsvc_apply_apply') {
                params = 'addsvc_apply_apply';
            }

            // ��젣�덉젙硫붾돱 �덉쇅泥섎━
            if (params == 'addsvc_foreign_trans_info') { // �댁쇅踰덉뿭
                window.open('https://store.cafe24.com/kr/apps/13823', '_blank');
                return;
            }
        }

        var sTargetFrame = (more == 'targetFrame') ? more : '';
        // BM�섏씠吏�濡� �대룞�섍린�꾪빐 service_code瑜� �뗮똿
        // �댄봽濡쒕え�쒖뿉�� �대떦媛믪씠 sub_hub_code
        var sBmSvcCode = (more == 'moveBm') ? params : '';

        // params媛� object�쇰㈃ �뗮똿
        if (typeof params == 'object' && MenuAction.getObjectSize(params) > 0) {
            this.oParams = params;
        }
        
        //硫붾돱�뺣낫媛� �놁쑝硫� ajax �붿껌. ajax 肄쒕갚�먯꽌 �댄썑 泥섎━瑜� �대떦�쒕떎.
        if (this.aMenuList.length == 0) {
            //蹂��붾맆 menu�� lnb瑜� 肄쒕갚�먯꽌 諛쏄린�꾪빐 �꾨떖.
            //ajax �붿껌
            this.getMenuListAjax();
            //return;
        }

        // �댁쟾 Navi �곗씠�� 蹂닿�
        var aOldNaviInfo = {};
        for (var k in this.navi) {
            aOldNaviInfo[k] = this.navi[k];
        }

        //more �≪뀡�� �뚮씪誘명꽣 �щ�泥섎━
        if (params == 'addProduct') {
            //�쒖옉�섍린�먯꽌 �곹뭹�깅줉�섍린瑜� �대┃�덉쓣寃쎌슦�먮쭔 �ъ슜�섎뒗 �뚮씪誘명꽣
            this.more = params;
        } else {
            this.more = more;
        }

        // 1) transformTreeNo �≪뀡�� 諛쏆�寃쎌슦 lnb媛� �ㅼ젣 硫붾돱踰덊샇濡� �붽린�뚮Ц�� treeno濡� 移섑솚�쒗궡.
        // 2) �댄봽濡쒕え�쒖뿉�� BM�섏씠吏� �대룞�좊븧 湲곗〈泥섎읆 BM硫붾돱�뺣낫瑜� 媛뽮퀬�덉� �딄린 �뚮Ц�� �꾩뿉 �덉쇅泥섎━�� lnb濡� 硫붾돱�뺣낫 �명똿
        if (more == 'transformTreeNo' || bIsNewProModeBmExcept) {
            if (lnb) {
                lnb = this.aMenuList.menuno[lnb];
            }
            this.more = (params == 'addProduct')? this.more: null;
        }

        if (menu) {
            this.navi.menu = menu;
        } else if ( ! lnb) {
            this.navi.menu = null;
        }
        this.navi.lnb = lnb;

        //蹂�寃쎈��� 議댁옱 泥댄겕. 蹂�寃쏀븷 硫붾돱媛� �놁쑝硫� 蹂��뷀븯吏��딆쓬.
        if (this.navi.menu == null && this.navi.lnb == null) {
            return ;
        }

        //�≪뀡�� �섑뻾�섍린�� menu �꾪꽣瑜� �섑뻾�쒕떎. 12r�먯꽌 �섏뼱�붿쓣寃쎌슦 �곷떦�� 泥섎━媛� �꾩슂�섍린�뚮Ц
        inMenuFilter();

        var targetMenu = getTargetMenu();
        //���� 硫붾돱媛� 議댁옱�섎뒗寃쎌슦 硫붾돱�뺣낫�� �곕Ⅸ 泥섎━�섑뻾
        if (targetMenu == null) {
            // ��寃� �뺣낫媛� �놁쑝硫� 硫붾돱 罹먯떆 鍮꾩슦怨� �ㅼ떆 媛��몄샂
            this.clearMenuCache();
            targetMenu = getTargetMenu();

            // �ㅼ떆 媛��몄솕�붾뜲�� ��寃� �뺣낫媛� �녿뒗寃쎌슦 硫붿씤�섏씠吏�濡� �꾪솚
            if (targetMenu == null) {
                this.changeMAIN();
                return false;
            }
        }

        // �댄봽濡쒕え�� �먮ℓ梨꾨꼸 �덉쇅泥섎━ (KR紐� 湲곕낯�듭씤寃쎌슦�� 硫뷀��ы듃濡� �대룞�쒗궎湲�)
        if (CAFE24.GLOBAL_INFO.isGlobal() == false && SHOP.isDefaultShop() && targetMenu.menuno == 10005) {
            window.location.href = '/disp/admin/shop/frame?menu=10368';
            return;
        }

        // �붿옄�멸�由� GNB�� 湲곕낯紐� �곸슜 硫붾돱濡� �≫엳吏� �딄쾶 �섍린 �꾪빐 depth 媛믪쓣 蹂댁젙
        if (SHOP.isDefaultShop() === false && targetMenu.menuno == 1011) {
            targetMenu.depth = 1;
        }
        
        // �꾩옱�듭씠 湲곕낯�듭씠 �꾨땲怨� 怨듯넻硫붾돱�� 寃쎌슦
        if (SHOP.isMultiShop() === true && SHOP.isDefaultShop() === false && targetMenu.depth > 1 && targetMenu.is_common_menu === 'T') {
            // 湲곕낯紐곗뿉�쒕쭔 �곸슜�섎뒗 硫붾돱�낅땲��.\n湲곕낯紐곕줈 �대룞�섏떆寃좎뒿�덇퉴?
            if (confirm(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["THIS.MENU.BASIC.MALL.NDO"])) {

                // 湲곕낯�듭씠 �꾨땶 硫붿씤�붾㈃ > 利먭꺼李얜뒗 硫붾돱 > 湲곕낯�듭뿉�쒕쭔 �ъ슜媛��ν븳 硫붾돱 �대┃ �덉쓣 寃쎌슦
                // �ㅻ퉬寃뚯씠�� �뺣낫 珥덇린�� _ �섏� �딆쑝硫� 湲곕낯紐곕줈 �대룞 �덉쓣 寃쎌슦 ���щ낫�쒓� 鍮� �섏씠吏�
                if (isRoute == 'T')     MenuAction.clearNavi();
                
                // 湲곕낯�듭쑝濡� 蹂�寃�
                MenuAction.changeShop(1, 'ko_KR');
            } else {
                // �댁쟾 Navi �곗씠�곕줈 蹂듦뎄
                for (var k in this.navi) {
                    this.navi[k] = aOldNaviInfo[k];
                }
            }
            return false;
        }


        
        if (SHOP.getLanguage() != 'ko_KR' && targetMenu.depth > 1 && targetMenu.is_common_menu === 'K') {
            // 援�궡紐곗뿉�쒕쭔 �곸슜�섎뒗 硫붾돱�낅땲��.\n湲곕낯紐곕줈 �대룞�섏떆寃좎뒿�덇퉴?
            if (confirm(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["THIS.MENU.DOMESTIC.MALLS.001"])) {
                // 湲곕낯�듭쑝濡� 蹂�寃�
                MenuAction.changeShop(1, 'ko_KR');
            } else {
                // �댁쟾 Navi �곗씠�곕줈 蹂듦뎄
                for (var k in this.navi) {
                    this.navi[k] = aOldNaviInfo[k];
                }
            }
            return false;
        }

        // ECHOSTING-126465 �댁쇅紐곕쭔 "怨좉컼愿�由� > �ъ엯怨� �뚮┝�ㅼ젙 > �ъ엯怨� �뚮┝ �ъ슜�ㅼ젙|硫붿씪愿�由�" 硫붾돱 �ㅽ뵂  (硫붾돱肄붾뱶 : 2300,2301)
        if (SHOP.getLanguage() == 'ko_KR' && (targetMenu.menuno == '2300' || targetMenu.menuno == '2301') && CAFE24.GLOBAL_INFO.isGlobal() == false) {
            alert(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["MENU.AT.OVERSEAS.MALLS.001"]);
            // �댁쟾 Navi �곗씠�곕줈 蹂듦뎄
            for (var k in this.navi) {
                this.navi[k] = aOldNaviInfo[k];
            }
            return false;
        }

        // 援щ뵒�먯씤 �ъ슜以묒씤 寃쎌슦, frame_type 蹂�寃쏀븯�� iframe 異쒕젰�쒗궡
        if (targetMenu.menu_alias == 'design') {
            targetMenu.frame = 'I';

            // 援щ뵒�먯씤 �ъ슜以묒씠吏�留�..
            // LNB Tab�먯꽌 '�ㅻ쭏�몃뵒�먯씤' �대┃�� 寃쎌슦, iframe�쇰줈 newDesign 異쒕젰�쒗궡
            if (menu == 'newDesign') {
                targetMenu.menuno = menu;
            }
        }

        // �댁쇅�듭씤 �곹깭�먯꽌 '留덉��낆꽱��' �좏깮�� 寃쎌슦, '�댁쇅CMC' �섏씠吏� 異쒕젰 (ECHOSTING-213223)
        // QAUNIT-1324 �댄봽濡쒕え�쒕뒗 �덉쇅
        // ECQAUNIT-60535 KR �대뱶誘쇱뿉�� "留덉��낆꽱��" -> "留덉���" 硫붾돱濡� 蹂�寃쎈릺�� �꾨옒 濡쒖쭅 �덊��꾨줉 �섏젙
        var bIsNotKrJpAdmin = CAFE24.GLOBAL_INFO.getCountryCode() !== 'JP' && CAFE24.GLOBAL_INFO.getCountryCode() !== 'KR';
        if ( (targetMenu.menuno == '9' && SHOP.getLanguage() != 'ko_KR') && bIsNotKrJpAdmin && !SHOP.isNewProMode()) {
            var sUrlCmcGlobal = '/admin/php/AutoLogin/request.php?uri=https%3a%2f%2fcmcglobal.cafe24.com%2fglb%2f';
            window.open(sUrlCmcGlobal, '_blank');
            // �덊꺆 硫붾돱 �대┃ ��, �댁쟾 硫붾돱�뺣낫濡� 蹂듭썝 (�� �대룞�� �꾩슂�뺣낫)
            this.navi = aOldNaviInfo;
            return true;
        }

        // GNB TOP�곸뿭 硫붾돱 �덉갹異쒕젰
        if (targetMenu.target == 'N') {
            this.changeNEW(targetMenu);
            // �덊꺆 硫붾돱 �대┃ ��, �댁쟾 硫붾돱�뺣낫濡� 蹂듭썝 (�� �대룞�� �꾩슂�뺣낫)
            this.navi = aOldNaviInfo;
            return true;
        }

        // 寃뚯떆�먭�由� �섏쐞硫붾돱 愿��� �앹뾽異쒕젰 (ECHOSTING-160101)
        if (targetMenu.css_class == 'popup') {
            popup(targetMenu);
            return true;
        }

        // �꾨줈紐⑥뀡 �곷떒 硫붾돱 �대┃�� �댁긽�덉씤 寃쎌슦 12r濡� 蹂�寃� �쒕떎.
        if (targetMenu.menuno == '1250' && SHOP.getProductVer() == 2) {
            //targetMenu.frame = 'F';
            targetMenu.path = '/disp/admin/promotion/DashboardMain';
        }

        // �듯봽�덉엫�� 寃쎌슦
        if (1) {
            changeONEFRAME(targetMenu, this.URL_IFRAME_COMMON, sTargetFrame, sBmSvcCode);

        //�꾨젅�꾩쓽 寃쎌슦
        } else {
            //�몃��먯꽌 愿�由ы븯�� 硫붾돱 諛� �섏씠吏��ㅼ뿉 ���� �덉쇅泥섎━
            //�몃��섏씠吏� �대떦遺��쒖� expanded / selected 泥섎━瑜� �묒쓽 諛� 泥섎━�� �꾨옒議곌굔臾� �쒓굅. 洹몄쟾源뚯쭊 �몃��섏씠吏� 留곹겕�� �� 議곌굔臾몄씠 �대떦.
            if (this.navi.menu == 'b2b' || this.navi.menu == 'social' || this.navi.menu == 'marketing') {
                this.changeGNB(targetMenu.css_id);
                changeCONTENT(this.aMenuList.treeno[this.aMenuList.alias[this.navi.menu]]);
                return true;
            }

            //寃��됰맂 硫붾돱�먯꽌 �④꼍�� �몃�愿�由щ찓�댁쨷 留덉폆�듯빀愿�由ъ� 遺�媛��쒕퉬�ㅻ뒗 top_menu�� �⑥닔瑜� 諛붾씪蹂몃떎.
            if (this.more == 'searchedMenu') {
                if (this.navi.menu == 'addservice') {
                    top.frames['top_menu'].funcActionMenu8();
                    return true;
                } else if (this.navi.menu == 'market_manager') {
                    top.frames['top_menu'].marketManagerOpen();
                    return true;
                }
            }


            //留덉폆�듯빀愿�由� 硫붾돱 �덉쇅泥섎━
            if (this.navi.menu == 'market_manager') {
                //gnb�먯꽌 �대┃�쒓꼍��
                if (this.more == 'rootGnb') {

                } else {
                    this.changeGNB(targetMenu.css_id);
                    changeCONTENT(this.aMenuList.treeno[this.aMenuList.alias[this.navi.menu]]);
                    return true;
                }
            }

            //硫붾돱媛� TOP �멸꼍��
            if (targetMenu.level == 'TP' || targetMenu.level == 'TS') {
                //媛� 硫붾돱�� 蹂��붿��댁뒪�� �곕Ⅸ 泥섎━�섑뻾
                if (targetMenu.target == 'C') {
                  //�ъ씠�몃㏊�멸꼍�� lnb �덉텧��
                    if (targetMenu.menuno == 1508) {
                        changeLNB('home', targetMenu);
                    }
                    this.changeGNB(targetMenu.css_id);
                    this.changeCENTER(targetMenu);
                } else if (targetMenu.target == 'T') {
                    changeCONTENT(targetMenu);
                } else if (targetMenu.target == 'N') {
                    this.changeNEW(targetMenu);
                }
            } else {
                //��寃� 泥섎━. C : center | T : content | N : new | U : userdefined
                if (targetMenu.target == 'N') {
                    this.changeNEW(targetMenu);
                } else if (targetMenu.target == 'T') {
                    this.changeGNB(targetMenu.css_id);
                    changeCONTENT(targetMenu);
                } else if (targetMenu.target == 'U') {
                } else {
                    //lnb �섏씠吏� 蹂�寃�
                    changeLNB(this.navi.menu , targetMenu);
                    //GNB 蹂�寃�
                    this.changeGNB(targetMenu.css_id);
                    //lnb �뺣낫�� �곕Ⅸ center �섏씠吏� 濡쒕뱶
                    this.changeCENTER(targetMenu, params);
                    
                    // �붿옄�� 愿�由ъ쓽 寃쎌슦�먮뒗 GNB 踰꾪듉 �쒖꽦�� 泥섎━瑜� �꾪븳 �덉쇅 援щЦ 異붽�
                    if (this.navi.menu == 'newDesign') {
                        this.changeGNB('design');
                        return true;
                    }
                }
            }
        }

        return true;

        /*
         * �대룞�� 硫붾돱�뺣낫瑜� MenuAction.aMenuList �댁뿉�� 李얠븘��
         */
        function getTargetMenu()
        {
            //alias �� lnb 瑜� �듯븳 硫붾돱踰덊솕
            //��寃잛씠 �� 硫붾돱
            var targetMenu = null;
            //硫붾돱 �섎━�댁뒪 �뺣낫留� �덈뒗寃쎌슦
            //- gnb瑜� 泥섏쓬 �뚮��꾨븣 �섏씠吏�媛� �놁씠 湲곕낯 �섏씠吏�濡� �≫��쇳븯�붽꼍��
            if (MenuAction.navi.menu != null && MenuAction.navi.lnb == null) {
                targetMenu = top.MenuAction.aMenuList.treeno[MenuAction.aMenuList.alias[MenuAction.navi.menu]];

                //�� �뺣낫媛� 紐⑤몢 議댁옱�섎뒗寃쎌슦
            } else if (MenuAction.navi.menu != null && MenuAction.navi.lnb != null) {
                targetMenu = top.MenuAction.aMenuList.treeno[MenuAction.navi.lnb];

                //lnb留� 議댁옱�섎뒗寃쎌슦
                //�뱀씠 耳��댁뒪��. 二쇰줈 top 硫붾돱�ㅼ뿉 �섑빐 �곸슜�섏뼱吏� 遺�遺�
            } else if (MenuAction.navi.menu == null && MenuAction.navi.lnb != null) {
                targetMenu = top.MenuAction.aMenuList.treeno[MenuAction.navi.lnb];
            }

            return targetMenu;
        }

        /*
         * inMenu �꾪꽣
         * 湲곗〈 1.9 �� GNB �대옒�ㅻ챸怨� 12r濡� �닿꺼吏� GNB �대옒�ㅻ챸�� �ㅻⅤ湲곕븣臾몄뿉 �댄븿�섍� �꾩슂��.
         * 12r-> 1.9 濡쒕꽆�댁삱�� main.php?menu=11&lnb=11 怨� 媛숈씠 ��. �대븣 �レ옄�쇨꼍�� 硫붾돱�섎━�댁뒪濡� 移섑솚�쒖폒�쇳븿.
         * �먰븯�섏쓽 議곌굔. 12r�먯꽌 �섏뼱�붿쓣�� 硫붾돱踰덊샇媛� TP�� 寃쎌슦 �묐찓�댁쓽 navi
         */
        function inMenuFilter()
        {
            if ( ! MenuAction.navi.menu) {
                return;
            }

            if (isNaN(MenuAction.navi.menu) == true) {
                // �대� �レ옄�� 寃쎌슦 return
                return;
            }

            var oMenu = top.MenuAction.aMenuList.treeno[top.MenuAction.aMenuList.menuno[MenuAction.navi.menu]];
            //TOP 湲됱쓽 硫붾돱媛� �ㅼ뼱�④꼍�� �대떦 硫붾돱瑜� lnb濡� 痍④툒, menu�� home �쎌엯
            if (oMenu.level == 'TP') {
                MenuAction.navi.lnb = oMenu.treeno;
                MenuAction.navi.menu = 'home';
                return;
            }

            //硫붾돱踰덊샇�� �쇱튂�섏�留� �섎━�댁뒪媛� �녿뒗寃쎌슦 null 泥섎━
            if (oMenu.menu_alias == '' || oMenu.menu_alias == undefined || oMenu.menu_alias == null) {
                MenuAction.navi.menu = null;
            } else {
                MenuAction.navi.menu = oMenu.menu_alias;
            }
            return;
        }


        /*
         * 而⑦뀗痢� �먯껜 蹂��붿＜湲� - left 以꾩씠怨� center�곸뿭 �볧엳�� 諛⑹떇
         */
        function changeCONTENT(menu)
        {
            if (menu == undefined || menu == null || menu == '') {
                return ;
            }

            if (menu.target != 'T') {
                return ;
            }

            if (menu.path == '' || menu.path == undefined || menu.path == null) {
                return ;
            }

            //遺�紐� GNB 援ы븯湲�
            var oGnb = MenuAction.getMostParentMenu(menu);

            //�섎㉧吏� 荑쇰━�ㅽ듃留� 援ы빐�� 遺숈씠湲�
            var other = '';
            other = MenuAction.getQuerySringFromNaviOther();


            if (MenuAction.frames.frame_center.cols != '0,*,0') {
                MenuAction.frames.frame_center.cols = '0,*,0';
            }

            var url = menu.path;

            if (SHOP.isMultiShop() === true) {
                if (menu.depth > 2 && menu.is_common_menu === 'T') {
                    url = url.replace(/\/(admin\/php|disp\/admin)\/(?:shop[0-9]+)?/, '/$1/shop1/');
                } else {
                    url = url.replace(/\/(admin\/php|disp\/admin)\/(?:shop[0-9]+)?/, '/$1/shop' + EC_SDE_SHOP_NUM + '/');
                }
            }

            MenuAction.frames.frame_content.location = url + other;

            return ;
        }


        /*
         * LNB 蹂��붿＜湲�
         * @param menu
         *      lnb�� 硫붾돱紐�. �섎━�댁뒪媛� �쒕떎.
         */
        function changeLNB(menu_alias , menu)
        {
            //lnb 蹂��뷀븯吏� �딅뒗��.
            if (MenuAction.more == 'noLnbChange'){
                MenuAction.more = null;
                return;
            }

            //�대떦 ��寃잙찓�댁쓽 �섎━�댁뒪 �댁슜�섍린�멸꼍��
            if (MenuAction.more == 'useThisMenuAlias') {
                menu_alias = menu.menu_alias;
            }

            //遺�紐� GNB 援ы븯湲�
            var oGnb = MenuAction.getMostParentMenu(menu);

            if (menu_alias == null || menu_alias == undefined || menu_alias == '') {
                menu_alias = oGnb.menu_alias;
            }

            //�섎㉧吏� 荑쇰━�ㅽ듃留� 援ы빐�� 遺숈씠湲�
            var other = MenuAction.getQuerySringFromNaviOther();
            
            //�붿옄�멸�由ъ쓽 寃쎌슦 �ㅻ뵒/援щ뵒 援щ텇吏��댁＜湲�
            var bSmartDesignMenu = MenuAction.isNewDesignMenu(menu);
            if (bSmartDesignMenu == true) {
                // �ㅻ뵒�� 寃쎌슦
                menu_alias = 'newDesign';

            } else {
                //援щ뵒�먯씤�멸꼍��.
                if (oGnb.menu_alias == 'design') {
                    //gnb �대┃�� �섑빐 �④꼍��.
                    if (MenuAction.more == 'rootGnb') {
                        menu_alias = oGnb.menu_alias;
                    //硫붾돱寃��됱뿉�� �대┃�쒓꼍��
                    } else if (MenuAction.more == 'searchedMenu' && menu.menuno == 2) {
                        //�щ뱶 �붿옄�몄씤寃쎌슦
                        if (MenuAction.aExceptionMenuMode.designMode == 'oldDesign') {
                            menu_alias = oGnb.menu_alias+'&type=A';
                        //�대뵒�먯씤�멸꼍��
                        } else {
                            menu_alias = 'design';
                            MenuAction.navi.lnb = null;
                        }
                        //�ㅻⅨ 硫붾돱�대룞�쇰줈遺��� 泥섎━�쒓꼍��
                    } else {
                        menu_alias = oGnb.menu_alias+'&type=A';
                    }
                    
                  //硫붾돱寃��� �먮뒗 �ъ씠�몃㏊�먯꽌 援щ뵒�먯씤 �묎렐�� LNB瑜� 媛뺤젣濡� �ㅻ뵒硫붾돱 �꾪솚 湲덉�泥섎━
                    if (MenuAction.aExceptionMenuMode.designMode == 'oldDesign' && (MenuAction.more == 'searchedMenu' || MenuAction.more == 'sitemap')) {
                        other  = other + "&is_search=T";
                    }
                }
            }

            if (MenuAction.frames.frame_center.cols != '207,*,0') {
                MenuAction.frames.frame_center.cols = '207,*,0';
            }

            //二쇰Ц愿�由ъ쓽 寃쎌슦 menu_alias瑜� �뺤씤, �곸뾽愿�由ъ� �듦퀎愿�由ъ뿉 ���섏뿬 媛곴컖 �뚮씪誘명꽣 異붽�
            if (menu_alias == 'sales') {
                menu_alias = 'sales&type=A';
                var oTabMenu = MenuAction.isTab(menu);
                if (oTabMenu != null) {
                    if (oTabMenu.menuno == 4) {
                        menu_alias = 'sales&type=A';
                    } else {
                        menu_alias = 'sales&type=B';
                    }
                }
            }

            var multishop = '';
            if (SHOP.isMultiShop() === true) {
                multishop = '/shop' + EC_SDE_SHOP_NUM;
            }
            MenuAction.frames.frame_left.location = "/admin/php"+multishop+"/left.php?menu="+menu_alias + other;

            return;
        }

        /*
         * �먰봽�덉엫�쇰줈 �대룞�섍린
         * 
         * @param object menu 硫붾돱媛앹껜
         * @param string sIframeUrl 怨듯넻 iframe二쇱냼
         * @param string sTargetFrame iframe 異쒕젰�щ�
         * @param string sBmSvcCode BM�섏씠吏�濡� �대룞�섍린�꾪븳 service_code
         * 
         * oneframe �쇰줈 �대룞�섍린�꾪븳 硫붾돱�뺣낫瑜� 媛뽯뒗 �ㅻ툕�앺듃
         */
        function changeONEFRAME(menu, sIframeUrl, sTargetFrame, sBmSvcCode)
        {
            if (menu == undefined || menu == null || menu == '') {
                return ;
            }

            if (menu.path == '' || menu.path == undefined || menu.path == null) {
                return ;
            }

            //�ㅽ봽�� 由ъ뀑�щ� �뚮옒洹�
            var bOpenerReset = true;
            if (typeof(window.name) === 'string' && window.name.match(/^ec-blank-page-no-menu-\d+/)) {
                bOpenerReset = false;
            }

            // sugar AutoLogin 留곹겕濡� 濡쒓렇�명븯硫� opener媛� �댁븘�덉뼱 null泥섎━
            if (bOpenerReset === true && (opener || window.opener)) {
                window.opener = null;
                opener = null;
            }

            // 硫붾돱踰덊샇媛� �몃��쒕퉬�� �먮뒗 C�ㅽ넗�� �뺥깭�몄� 援щ텇
            var bIsIframeMove = (menu.menuno.indexOf('_') > 0) ? true : false;

            // BM �쒕퉬�ㅼ퐫�� �뗮똿
            var sMoveBmParam = (menu.menuno == 8 && sBmSvcCode != '' && !SHOP.isNewProMode()) ? '&svccode=' + sBmSvcCode : '';

            // �뚮씪硫뷀꽣 �뗮똿
            var sParams = '';
            if (MenuAction.getObjectSize(MenuAction.oParams) > 0) {
                $.each(MenuAction.oParams, function(key, val) {
                    sParams += '&' + key + '=' + val;
                });
            }

            // 怨듯넻 iframe 二쇱냼�뗮똿
            var sUrl = '';
            if (menu.frame == 'I' || menu.frame == 'S' || bIsIframeMove == true) {
                // �댄봽濡쒕え�� 遺�媛��쒕퉬�� �덉쇅泥섎━
                var aNewProSvcMenuNoGroup = ['8', '10384', '10385', '10386', '10387'];
                if (SHOP.isNewProMode() && aNewProSvcMenuNoGroup.indexOf(menu.menuno) !== -1) {
                    var sTargetFrameMenuNo = CAFE24.GLOBAL_INFO.getCountryCode() === 'KR' && menu.menuno == '8' ? '10384' : menu.menuno; // LNB selected 泥섎━瑜� �꾪븿
                    var sNewProBmSvcUrl = sIframeUrl + sTargetFrameMenuNo;
                    if (sBmSvcCode) {
                        sNewProBmSvcUrl += '&sub_hub_code=' + sBmSvcCode;
                    }
                    sNewProBmSvcUrl += sParams;
                    sUrl = sNewProBmSvcUrl;
                } else {
                    sUrl = sIframeUrl + menu.menuno + sMoveBmParam + sParams;
                }
            } else {
                sUrl = menu.path;
            }
            sUrl = MenuAction.replaceMultiShopUrl(sUrl);

            if (sTargetFrame == 'targetFrame') {
                try {
                    top.adminFrameContent.location.href = sUrl;
                } catch (e) {
                    top.location.href = sUrl;
                }
            } else {
                top.location.href = sUrl;
            }
            

            return ;
        }

        // 寃뚯떆�먭�由� �섏쐞硫붾돱 愿��� �앹뾽異쒕젰 (ECHOSTING-160101)
        function popup(menu)
        {
            if (SHOP.isMultiShop() === true) {
                // �대뱶誘� URL�� �쇳븨紐곕쾲�� 異붽�
                if (menu.depth > 2 && menu.is_common_menu === 'T') {
                    sUrl = menu.path.replace(/\/(admin\/php|disp\/admin)\/(?:shop[0-9]+)?/, '/$1/shop1/');
                } else {
                    sUrl = menu.path.replace(/\/(admin\/php|disp\/admin)\/(?:shop[0-9]+)?/, '/$1/shop' + EC_SDE_SHOP_NUM + '/');
                }
            } else {
                sUrl = menu.path;
            }

            option = 'tollbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, fullscreen=yes' ;
            opener = window.open( sUrl, "", option );

            var agt = navigator.userAgent.toLowerCase();
            if (agt.indexOf("chrome") != -1) {
                opener.resizeTo(screen.availWidth,screen.availHeight);
            }
            return ;
        }

    },

    /*
     * 硫��곗눥�묐ぐ URL濡� 蹂�寃�
     */
    replaceMultiShopUrl : function(sUrl, iShopNo)
    {
        var iShopNoMulti = (iShopNo == null) ? EC_SDE_SHOP_NUM : iShopNo;
        return sUrl.replace(/\/(admin\/php|disp\/admin)\/(?:shop[0-9]+)?/, '/$1/shop' + iShopNoMulti + '/');
    },

    /*
     * iframe �뚯꽌
     */
    parseIframe : function()
    {
        var params = window.top.location.search;
        var sParseKey = '';
        var sParseValue = '';
        var sReturnValue = '';
        //�뚮씪誘명꽣媛� �녿뒗寃쎌슦 �뚯꽌�덊븿
        if (params != '') {

            params = params.substr(1,params.length);
            var query = params.split("&");
            for (var i=0;i<query.length; i++) {
                sParseKey = query[i].split("=")[0];
                sParseValue = query[i].split("=")[1];

                //gnb �뚯꽌
                if (sParseKey == 'menu' && sParseValue != '') {
                    if (MenuAction.aMenuList.menuno[sParseValue] != '') {
                        sReturnValue = MenuAction.aMenuList.menuno[sParseValue];
                        break;
                    };
                }
            }
        }

        return sReturnValue;
    },

    /*
     * GNB 蹂��붿＜湲�
     * @param css_id
     *      �대떦 硫붾돱�� 吏��뺣맂 �대옒�ㅻ챸
     */
    changeGNB : function(css_id)
    {
        //ID瑜� ���ν븯�� �꾩떆蹂���
        var tempId = null;

        var topObject = null;
        topObject = $(window.window.frames[MenuAction.ID_TOP_MENU].document);


        try{
            //gnb �대��� li �붿냼以� selected �대옒�� 紐⑤몢�쒓굅
            //selected �대옒�ㅺ� �ㅼ뼱媛� li �섎━癒쇳듃�� �됱씠 蹂���
            topObject.find('#' + MenuAction.ID_GNB_UL).find("li").removeClass(MenuAction.CLASS_NAME_SELECTED);

            //css_class �뺣낫媛� �녿뒗寃쎌슦 navi �ㅻ툕�앺듃 �댁쓽 alias媛믪쓣 �듯빐 css_class媛믪쓣 援ы븳��.
            if (css_id == undefined || css_id == null || css_id == '') {
                var oTempObject = null;
                if (MenuAction.aMenuList.alias[MenuAction.navi.menu] != undefined ) {
                    oTempObject = MenuAction.aMenuList.treeno[MenuAction.aMenuList.alias[MenuAction.navi.menu]];
                    tempId = oTempObject.css_id;
                    
                    // �ㅻ쭏�몃뵒�먯씤�� 寃쎌슦�먮뒗 css_id �뺣낫媛� �놁쑝誘�濡� design �쇰줈 蹂�寃�
                    if (tempId == null && oTempObject.menu_alias == 'newDesign') {
                        tempId = 'design';
                    }
                } else if (MenuAction.aMenuList.menuno[MenuAction.navi.menu] != undefined) {
                    oTempObject = MenuAction.getMostParentMenu(MenuAction.aMenuList.treeno[MenuAction.aMenuList.menuno[MenuAction.navi.menu]]);
                    tempId = oTempObject.css_id;
                } else {
                    oTempObject = MenuAction.getMostParentMenu(MenuAction.aMenuList.treeno[MenuAction.navi.lnb]);
                    tempId = oTempObject.css_id;
                }
            } else {
                tempId = css_id;
            }

            //GNB�� ���� id瑜� 李얠� 紐삵뻽�ㅻ㈃ �⑥닔 耳꾩뒳
            if (tempId == null || tempId == '') {
                return;
            }

            //�대떦 li�� ���섏뿬 selected �대옒�� �쎌엯
            topObject.find('#' + tempId).addClass(MenuAction.CLASS_NAME_SELECTED);
        }catch(error){
            return ;
        }

        return ;
    },

    /*
     * CNTER 蹂��붿＜湲�
     * @param menu
     *      center�뺣낫瑜� 媛뽮퀬�덈뒗 硫붾돱 �ㅻ툕�앺듃
     */
    changeCENTER: function (menu, params)
    {
        //path媛� 議댁옱�좉꼍�곕쭔 蹂���
        if (menu.path == '' || menu.path == undefined || menu.path == null) {
            return ;
        }

        //action�� L �먮뒗 M�멸꼍�곕쭔 蹂���
        if (menu.action == 'L' || menu.action == 'M') {
            if (MenuAction.frames.frame_center.cols != '207,*,0') {
                MenuAction.frames.frame_center.cols = '207,*,0';
            }

            var sPath = menu.path;

            if (SHOP.isMultiShop() === true) {
                // �대뱶誘� URL�� �쇳븨紐곕쾲�� 異붽�
                if (menu.depth > 2 && menu.is_common_menu === 'T') {
                    sPath = sPath.replace(/\/(admin\/php|disp\/admin)\/(?:shop[0-9]+)?/, '/$1/shop1/');
                } else {
                    sPath = sPath.replace(/\/(admin\/php|disp\/admin)\/(?:shop[0-9]+)?/, '/$1/shop' + EC_SDE_SHOP_NUM + '/');
                }
            }

            //硫붾돱�� �녿뒗 �섏씠吏�濡� 媛��� �좊븣
            if (params && params.isOverWrite == 'T') {
                sPath = params.location;
            }

            MenuAction.frames.frame_content.location = sPath;
        }

        return ;
    },

    /*
     * 硫붿씤�섏씠吏�濡� �꾪솚
     */
    changeMAIN : function()
    {
        location.href = '/admin/php/main.php';  //二쇱냼媛� 蹂�寃쎈맆 �곕젮媛��덉쑝誘�濡�, php�곸닔瑜� 媛��몄��� �뗮똿
        return ;
    },

    /*
     * �좉퇋 �섏씠吏� �꾩슦湲�
     */
    changeNEW : function(menu)
    {
        if (menu == undefined || menu == null || menu == '') {
            return ;
        }

        if (menu.target != 'N') {
            return ;
        }

        if (menu.path == '' || menu.path == undefined || menu.path == null) {
            return ;
        }

        window.open(MenuAction.replaceMultiShopUrl(menu.path), "ec-blank-page-exists-menu-" + menu.menuno);
        return ;
    },


    /*
     * LNB �뚯꽌
     */
    parseLNB : function()
    {
        /** @todo */
        //var params = window.frames["left"].location.search;
        var params = '';
        var sParseKey = '';
        var sParseValue = '';
        //�뚮씪誘명꽣媛� �녿뒗寃쎌슦 �뚯꽌�덊븿
        if (params != '') {

            params = params.substr(1,params.length);
            var query = params.split("&");
            for (var i=0;i<query.length; i++) {
                sParseKey = query[i].split("=")[0];
                sParseValue = query[i].split("=")[1];

                //�쎌엯�섏� 留먯븘�쇳븷 key continue
                if (sParseKey == 'menu') continue;

                //lnb �뚯꽌
                if (sParseKey == 'lnb' && sParseValue != '') {
                    try {
                        this.navi.lnb = this.aMenuList.treeno[this.aMenuList.menuno[sParseValue]].treeno;
                    } catch (e) {
                        this.navi.lnb = null;
                    }
                    continue;
                }

                //�섎㉧吏� �뚮씪誘명꽣 �뚯떛�댁꽌 navi.other �� �쎌엯
                this.navi.other[sParseKey] = sParseValue;
            }
        }

        return ;
    },

    /*
     * GNB �뚯꽌
     */
    parseGNB : function()
    {
        var params = window.frames["top"].location.search;
        var sParseKey = '';
        var sParseValue = '';
        //�뚮씪誘명꽣媛� �녿뒗寃쎌슦 �뚯꽌�덊븿
        if (params != '') {

            params = params.substr(1,params.length);
            var query = params.split("&");
            for (var i=0;i<query.length; i++) {
                sParseKey = query[i].split("=")[0];
                sParseValue = query[i].split("=")[1];

                //gnb �뚯꽌
                if (sParseKey == 'menu' && sParseValue != '') {
                    this.navi.menu = sParseValue;
                    continue;
                }
            }
        }

        return ;
    },

    /*
     * CENTER �뚯꽌
     */
    parseCENTER : function()
    {
        var params = window.frames["center"].location.search;
        var sParseKey = '';
        var sParseValue = '';
        //�뚮씪誘명꽣媛� �녿뒗寃쎌슦 �뚯꽌�덊븿
        if (params != '') {

            params = params.substr(1,params.length);
            var query = params.split("&");
            for (var i=0;i<query.length; i++) {
                sParseKey = query[i].split("=")[0];
                sParseValue = query[i].split("=")[1];

                //�쎌엯�섏� 留먯븘�쇳븷 key contonue
                if (sParseKey == 'menu') continue;

                //lnb �뚯꽌
                if (sParseKey == 'lnb' && sParseValue != '') {
                    try {
                        this.navi.lnb = this.aMenuList.treeno[this.aMenuList.menuno[sParseValue]].treeno;
                    } catch (e) {

                    }
                    continue;
                }

                //�섎㉧吏� �뚮씪誘명꽣 �뚯떛�댁꽌 navi.other �� �쎌엯
                this.navi.other[sParseKey] = sParseValue;
            }
        }

        return ;
    },
    /*
     * �몃━酉곕꽆踰꾩뿉 ���� 理쒖긽�� 遺�紐⑥쓽 �ㅻ툕�앺듃 諛섑솚�섍린
     */
    getMostParentMenu : function(menu)
    {
        if (menu == null) {
            return null;
        }

        if (menu.parent == 0) {
            return menu;
        } else {
            return this.getMostParentMenu(this.aMenuList.treeno[menu.parent]);
        }
    },

    /*
     * �대떦 硫붾돱踰덊샇瑜� 媛뽮퀬 GNB �몄� 寃���. 寃��ы썑 GNB湲� 硫붾돱�대㈃ �대떦硫붾돱 �ㅻ툕�앺듃 由ы꽩
     */
    isGNB : function(iTreeNo)
    {
        var oReturnObject = null;
        if (this.aMenuList.length == 0) {
            this.getMenuListAjax();
        }

        // 硫붾돱 �뺣낫�� 濡쒕뱶�섏뿀�쇰굹, GNB �몄� �먮떒 �붿껌�� tree 踰덊샇媛� �녿뒗 寃쎌슦 cache clear
        if (this.aMenuList['treeno'] && !this.aMenuList['treeno'][iTreeNo]) {
            this.clearMenuCache();
        }

        try{
            if (this.aMenuList.treeno[iTreeNo].level == 'GB' || this.aMenuList.treeno[iTreeNo].level == 'TG') {
                oReturnObject = this.aMenuList.treeno[iTreeNo];
            }
        }catch(e){

        }

        return oReturnObject;
    },

    /*
     * �대떦 硫붾돱踰덊샇瑜� 媛뽮퀬 遺�紐⑥쨷�� tab �� �덈뒗吏� 寃��ы븯湲�
     */
    isTab : function(menu)
    {
        if (menu == null) {
            return null;
        }

        if (menu.parentno == 0 && menu.lnbtype != 'T') {
            return null;
        }

        if (menu.lnbtype == 'T') {
            return menu;
        } else {
            return this.isTab(this.aMenuList.treeno[menu.parent]);
        }
    },

    /*
     * newDesign硫붾돱�몄� �뚯븙�섎뒗 �⑥닔.
     */
    isNewDesignMenu : function(oMenu)
    {
        if (oMenu.menu_alias == 'design') {
            return false;
        }

        if (oMenu.parent == 0) {
            return false;
        }

        if (oMenu.menu_alias == 'newDesign') {
            return true;
        }

        return this.isNewDesignMenu(this.aMenuList.treeno[oMenu.parent]);
    },

    /*
     * 硫붾돱踰덊샇瑜� 媛뽮퀬 硫붾돱 �ㅻ툕�앺듃 由ы꽩諛쏄린
     */
    getMenuObjectByMenuNo : function(iMenuNo)
    {
        var oReturnObject = null;

        if (this.aMenuList.length == 0) {
            this.getMenuListAjax();
        }

        if (this.aMenuList.treeno[this.aMenuList.menuno[iMenuNo]] != undefined) {
            oReturnObject = this.aMenuList.treeno[this.aMenuList.menuno[iMenuNo]];
        }
        return oReturnObject;
    },

    /*
     * �몃━踰덊샇瑜� 媛뽮퀬 �몃━�ㅻ툕�앺듃 由ы꽩�섍린
     */
    getTreeObjectByTreeNo : function(iTreeNo)
    {
        var oReturnObject = null;

        if (this.aMenuList.length == 0) {
            return null;
        }
        if (this.aMenuList.treeno[iTreeNo] != undefined) {
            oReturnObject = this.aMenuList.treeno[iTreeNo];
        }
        return oReturnObject;
    },


    /*
     * navi�� �덈뒗 蹂��섎뱾�� 荑쇰━�ㅽ듃留곸쑝濡� 蹂��쒖떆�⑤떎.
     */
    getQuerySringFromNaviOther : function()
    {
        var sQueryString = '';
        for (var i in this.navi.other) {
            sQueryString += "&"+i+"="+this.navi.other[i];
        }
        return sQueryString;
    },

    /*
     * 硫붾돱由ъ뒪�� �붿껌
     * @param bool is_clear 罹먯돩 ��젣�좎� �щ�
     * @param bool async 鍮꾨룞湲고샇異� �щ�
     */
    getMenuListAjax : function(is_clear, callback, async)
    {
        var requestUrl = this.URL_TEMPLATE_MENU_LIST;
        var sIsClear = (is_clear) ? 'T' : 'F';
        var bAsync = (async == null) ? false : async;

        // 荑좏궎濡� 硫붾돱 罹먯떆 �쇱�
        var sMenuRefreshCookie = document.cookie.match('(^|;) ?' + this.MENU_REFRESH_COOKIE_KEY + '=([^;]*)(;|$)');
        if (sMenuRefreshCookie && sMenuRefreshCookie[2] && sMenuRefreshCookie[2].trim() === 'T') {
            document.cookie = this.MENU_REFRESH_COOKIE_KEY + "=F" + "; expires=" + new Date().toUTCString() + "; path=/ ;domain=." + CAFE24.GLOBAL_INFO.getBaseDomain();
            this.clearMenuInStorage();
        }

        var oMenuData = this.getMenuFromStorage();
        if (sIsClear === 'F' && oMenuData !== false) {
            MenuAction.aMenuList = oMenuData;
            if (typeof callback === 'function') {
                callback();
            }

            return;
        }

        $.ajax({
            url: requestUrl,
            data: {
                shop_no: EC_SDE_SHOP_NUM,
                is_clear: sIsClear
            },
            async: bAsync,
            dataType: 'json',
            success: function(data) {

                //�뺤긽�곸쑝濡� 硫붾돱媛� 諛쏆븘��議뚯쓣寃쎌슦 �뗮똿
                if (data.result == true){
                    MenuAction.aMenuList = data.menuInfo;
                    MenuAction.setMenuToStorage(data.menuInfo);

                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            }
        });
    },

    /*
     * �ㅽ넗由ъ� �� 媛��몄삤湲�
     */
    getStorageKey : function() {
        var sMode;

        if (SHOP.isMobileAdmin()) {
            sMode = 'mobileadmin';
        } else if (SHOP.isMode()) {
            sMode = 'influencer';
        } else if (SHOP.isNewProMode()) {
            sMode = 'newpro';
        } else {
            sMode = 'pro';
        }

        return this.MENU_LOCAL_STORAGE_PREFIX + '_' + sMode + '_' + EC_SDE_SHOP_NUM + '_' + SHOP.getAdminID();
    },

    /*
     * 濡쒖뺄�ㅽ넗由ъ� 硫붾돱 罹먯떆�곗씠�� 媛��몄삤湲�
     */
    getMenuFromStorage : function() {
        if (!localStorage) {
            return false;
        }

        var sStorageKey = this.getStorageKey();
        var sMenuJsonData = localStorage.getItem(sStorageKey);

        if (typeof sMenuJsonData !== "string") {
            localStorage.removeItem(sStorageKey);
            return false;
        }

        var iCurrentTime = new Date().getTime();
        var oMenuData = JSON.parse(sMenuJsonData);

        if (oMenuData.hasOwnProperty('data') === false || oMenuData.hasOwnProperty('expire_time') === false || oMenuData['expire_time'] < iCurrentTime) {
            localStorage.removeItem(sStorageKey);
            return false;
        }

        return oMenuData['data'];
    },

    /*
     * 濡쒖뺄�ㅽ넗由ъ��� 硫붾돱 �곗씠�� ����
     */
    setMenuToStorage : function(oMenuData) {
        if (!localStorage || typeof oMenuData !== "object") {
            return;
        }

        var sStorageKey = this.getStorageKey();
        var sProModeRegexPattern = new RegExp("^" + this.MENU_LOCAL_STORAGE_PREFIX + "_pro_\\d+_.+$");

        // �꾨줈紐⑤뱶 �곸젏愿�由� (硫붾돱踰덊샇 1) 議댁옱 �좊Т濡� 紐⑤뱶蹂� �섎せ 罹먯떆�섎뒗 耳��댁뒪 諛⑹�
        var bIsProData = oMenuData['menuno'] && oMenuData['menuno'].hasOwnProperty(1) === true;
        var bIsProStorageKey = !!sStorageKey.match(sProModeRegexPattern);
        if (bIsProData !== bIsProStorageKey) {
            return;
        }

        // �댄봽濡쒕え�� �듯빀�묒� (硫붾돱踰덊샇 10340) 議댁옱 �좊Т濡� �섎せ 罹먯떆�� 耳��댁뒪 諛⑹�
        var sNewProModeRegexPattern = new RegExp("^" + this.MENU_LOCAL_STORAGE_PREFIX + "_newpro_\\d+_.+$");
        var bIsNewProData = oMenuData['menuno'] && oMenuData['menuno'].hasOwnProperty(10340) === true;
        var bIsNewProStorageKey = !!sStorageKey.match(sNewProModeRegexPattern);
        if (bIsNewProData !== bIsNewProStorageKey) {
            return;
        }

        var iExpireTime = new Date().getTime() + 7200000; // �먯떆媛�

        localStorage.setItem(sStorageKey, JSON.stringify({
            data: oMenuData,
            expire_time: iExpireTime
        }));
    },

    /*
     * �몄뀡�ㅽ넗由ъ� 硫붾돱 愿��� �� ��젣
     */
    clearMenuInStorage : function() {
        if (!localStorage) {
            return;
        }

        var i, aMenuKeys = [];

        // 濡쒖뺄 �ㅽ넗由ъ� 以� 硫붾돱 愿��⑤맂 �� 李얠쓬 (李얠쑝硫댁꽌 ��젣�섎㈃ �몃뜳�ㅺ� 蹂��댁꽌 �쒕�濡� ��젣�섏� �딆쓬)
        for (i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).startsWith(this.MENU_LOCAL_STORAGE_PREFIX) === true) {
                aMenuKeys.push(localStorage.key(i));
            }
        }

        // 李얠� �� ��젣
        for (i = 0; i < aMenuKeys.length; i++) {
            localStorage.removeItem(aMenuKeys[i]);
        }
    },

    clearMenuCache : function(callback)
    {
        this.clearMenuInStorage();
        this.getMenuListAjax(true, callback);
    },

    /*
     * �붿옄�멸�由�, �묒냽�듦퀎 硫붾돱 紐⑤뱶 �붿껌
     */
    getExceptionMenuModeAjax : function()
    {
        MenuAction.aExceptionMenuMode = {
            "design"          : "html",
            "previous_design" : "all",
            "designMode"      : "newDesign",
            "access"          : "new",
            "b2b"             : false,
            "product"         : "new",
            "mobile"          : "new",
            "except_topmenuno": [
                2446,  // �덉떆��
                1507,  // 援먯쑁�쇳꽣
                1508,  // �ъ씠�몃㏊
                1510,  // 1:1臾몄쓽
                1511,  // �꾩�留�
                1671,   // �묒냽�듦퀎
                2325,   // �먯＜ 臾삳뒗 吏덈Ц
                2413,   // 留ㅻ돱��
                2477,   // 怨듭��ы빆
                1011    // �붿옄�멸�由� > �ㅻ쭏�몃뵒�먯씤
            ]
        };
    },

    getMenuTitle : function()
    {
        var treeno = 0;
        if (null != this.navi.lnb) {
            treeno = this.navi.lnb;
        } else {
            treeno = this.aMenuList.alias[this.navi.menu];
        }
        var title = '<h1>'+this.aMenuList.treeno[treeno]["name"]+'</h1>';

        return title;
    },

    getMenuNavi : function()
    {
        var navi = '';
        var treeno = 0;
        if (null != this.navi.lnb) {
            treeno = this.navi.lnb;
        } else if (null != this.navi.menu) {
            treeno = this.aMenuList.alias[this.navi.menu];
        }

        if (treeno === 0) {
            return navi; // ���쒕낫��
        }

        var naviHome = '<li class="home">��</li>';
        var naviHere = '<li title="�꾩옱 �꾩튂"><strong>' + this.aMenuList.treeno[treeno]["name"] + '</strong></li>';
        var parentTree = this.aMenuList.treeno[treeno]["parent"];
        while (parentTree != 0) {
            navi =  '<li>' + this.aMenuList.treeno[parentTree]["name"] + '</li>' + navi;
            parentTree = this.aMenuList.treeno[parentTree]["parent"];
        }
        navi = naviHome + navi + naviHere;


        return navi;
    },

    setMenuTitle : function(sClassMenuTitle)
    {
        sClassMenuTitle = typeof sClassMenuTitle !== 'undefined' ? sClassMenuTitle : 'menu_title';
        $(center.document).find("."+sClassMenuTitle).html(this.getMenuTitle());

        return ;
    },

    setMenuNavi : function(sClassMenuNavi)
    {
        sClassMenuNavi = typeof sClassMenuNavi !== 'undefined' ? sClassMenuNavi : 'menu_navi';
        $(center.document).find("."+sClassMenuNavi).html(this.getMenuNavi());

        return ;
    },

    /*
     * �꾨젅�꾨え�쇨린
     */
    getFrames : function()
    {
        this.frames.frame_top = window.frames["top_menu"];
        this.frames.frame_center = document.getElementById("frame_center");
        this.frames.frame_left = window.frames["left"];
        this.frames.frame_content = window.frames["center"];
    }
};


/**
* - 硫붾돱�뺣낫瑜� ajax �붿껌�섏뿬 ���μ떆�⑤떎.
*/
$(document).ready(function(){
try {
    if ((SHOP.isMode() === true || aMenuListSupplyPHP == null) && !SHOP.isNewProMode()) {
        // 鍮꾨룞湲곕줈 �몄텧
        MenuAction.getMenuListAjax(false, null, true);
        MenuAction.getExceptionMenuModeAjax();
    } else if (SHOP.isNewProMode() === true) {
        MenuAction.getMenuListAjax(false, null, true);
    }  else {
        var oJsonMenuInfo;
        if (typeof(aMenuListSupplyPHP) == 'object') {
            oJsonMenuInfo = aMenuListSupplyPHP;
        } else {
            oJsonMenuInfo = ( new Function( 'return (' + $.trim(aMenuListSupplyPHP) + ');' ) )();
        }

        if (oJsonMenuInfo.result == true) {
            MenuAction.aMenuList =oJsonMenuInfo.menuInfo;
        }
        oJsonMenuInfo = null;
    }
    aMenuListSupplyPHP = null;
} catch (e) {}

//�꾨젅�꾨え�쇨린
//MenuAction.getFrames();
});


var EC_ADMIN_PRODUCT_MENU_ACTION   = {
setSearchKeyMenuAction : function(bUseElastic) {

    var sUrl = '/disp/admin/shop'+EC_SDE_SHOP_NUM+'/product/';
    if (typeof bUseElastic == 'undefined' || bUseElastic == false) {
        location.href = sUrl +'ConfigSearchkey';
    } else if (confirm(EC_ADMIN_MENU_TRANSLATE_JS.oJsList["USING.SHOPPING.CURRENCIES"]) === true) {
        location.href = sUrl +'ConfigElastic'; //'/disp/admin/product/ConfigElastic';
    }
}
};

function setMemberSmsOldSort()
{
try {
    // 援ъ긽�덉씪寃쎌슦 �ъ젙�ы빐以���
    if (SHOP.getProductVer() == 1) {
        $('#QA_Lnb_Menu105').parent().parent().prepend($('#QA_Lnb_Menu105').parent()); // 8
        $('#QA_Lnb_Menu104').parent().parent().prepend($('#QA_Lnb_Menu104').parent()); // 7
        $('#QA_Lnb_Menu102').parent().parent().prepend($('#QA_Lnb_Menu102').parent()); // 6
        $('#QA_Lnb_Menu101').parent().parent().prepend($('#QA_Lnb_Menu101').parent()); // 5
        $('#QA_Lnb_Menu2378').parent().parent().prepend($('#QA_Lnb_Menu2378').parent()); // 4
        $('#QA_Lnb_Menu832').parent().parent().prepend($('#QA_Lnb_Menu832').parent()); // 3
        $('#QA_Lnb_Menu103').parent().parent().prepend($('#QA_Lnb_Menu103').parent()); // 2
        $('#QA_Lnb_Menu2183').parent().parent().prepend($('#QA_Lnb_Menu2183').parent()); // 1
    }
} catch (e) {
}
}