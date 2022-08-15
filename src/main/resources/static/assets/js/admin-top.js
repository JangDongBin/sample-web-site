/**
 * top / gnb �먯꽌 �대┃�� 諛쒖깮�� �대깽�몄뿉 ���섏뿬 泥섎━�쒕떎.
 * 臾몄꽌 理쒖긽�⑥씤 TOP�� �ㅼ튂�� menu_action.js �� MenuAction �ㅻ툕�앺듃瑜� ���곸쑝濡� �ㅽ겕由쏀듃媛� �섑뻾�쒕떎.
 * jwlee03@simplexi.com
 * 2013.04.12
 */
 var gnbChangeImg;
 var gnbSession;
 var gnbSessionCnt = 0;
 
 var MENU_NAVIGATION_GNB = {
     // �섎굹湲덉쑖�쒕퉬�� �대�吏� toggle�� �꾪븳 �섎━癒쇳듃 �뗮똿
     setElementFinancial : function() {
         var elemLi = $('#gnb > ul > #financial');
         if (elemLi.length > 0) {
             elemLi.find('a').attr('class', 'focus');
             elemLi.append('<a href="#none" class="active"><span>湲덉쑖�쒕퉬��</span></a>');
         }
     },
 
     // �대�吏� toggle
     fadeImages : function() {
         // IE8 �댄븯�먯꽑 UI媛� ���댁��� �댁뒋濡� 濡ㅻ쭅�덊븿
         try {
             if (jQuery.browser.version <= 8.0) {
                 return;
             }
         } catch (e) {return ;}
         var $active = $('#financial .active');
         var $next = ($active.next().length > 0) ? $active.next() : $('#financial a:first');
         $next.css('z-index',2); //move the next image up the pile
         $active.fadeOut(1500,function(){ //fade out the top image
             $active.css('z-index',1).show().removeClass('active'); //reset the z-index and unhide the image
             $next.css('z-index',3).addClass('active'); //make the next image the top one
         });
     },
 
     // ajax�몄텧 (CTI, ep purge�� �덉쟾�뚯뒪�먯꽌 �ъ슜)
     sendRequest : function(callback, data, method, url, async, sload, user, password)
     {
         jQuery.ajax({
             url: url,
             async: async,
             type: method,
             data: data,
             success: function(data, textStatus, jqXHR) {
                 callback(jqXHR);
             },
             cache: sload ? false : true,
             username: user,
             password: password
         });
     },
 
     //紐⑤컮�� 釉뚮씪�곗� �쇨꼍��, sytle蹂�寃�
     setHeaderStyleIsMobile : function() {
         if (typeof(SHOP) !== 'undefined' && SHOP.isMode() === true) {
             return;
         }
         var mobileInfo = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
         for (var i = 0; i < mobileInfo.length; i++){
             if (navigator.userAgent.match(mobileInfo[i]) != null){
                 if ($('#header').length > 0) {
                     $('#header').attr('style', 'position:absolute');
                 }
                 break;
             }
         }
     },
 
     // URL �뚮씪硫뷀꽣 �뚯떛
     getParameterByName : function(name) {
         name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
         var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
             results = regex.exec(location.search);
         return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
     },
 
     // �ы뵆�붿옄�� 愿�由ъ뿉�� �ㅼ젙�덉씠�� �꾩슱�� body style�곸슜
     setBodyStyleSimpleLayer : function() {
         // �ы뵆�붿옄�몄뿉�� �몄텧�섏뿀�붿� 泥댄겕
         var sIsSimple = this.getParameterByName('is_wysiwyg');
         if (sIsSimple == '1') {
             $('body').attr('style', 'min-width:0;');
         }
     },
 
     // opener�쒖뼱
     setOpenerCheck : function() {
         try {
             // �덉쇅泥섎━
             var aExceptionWinName = ['sms_win', 'openbenefit', 'openmemberadmin'];
             if ($.inArray(window.name, aExceptionWinName) > -1) {
                 return;
             }
 
             if (typeof(window.name) === 'string' && window.name.match(/^ec-blank-page-no-menu-\d+/)) {
                 return;
             }
 
             if (window.name == 'blankWindow' || window.opener.top.MenuAction == null || window.name.match(/^Editor_[0-9]+/)) {
                 window.opener = null;
             }
         } catch (e) {
             window.opener = null;
         }
     },
 
     // frame�쒖뼱
     setFrameCheck : function() {
         try {
             // 留덉폆紐⑤뱶�먯꽌 �몄텧�섎뒗 寃쎌슦�먮뒗 wrapHidden 泥섎━瑜� �섏� �딅룄濡� 泥섎━ (BASE_MARKET_CODE�� 留덉폆�듯빀愿�由ъ뿉�� �좎뼵)
             if (typeof(BASE_MARKET_CODE) === 'object') {
                 return;
             }
 
             // 而ㅻ꽖�� 硫붾돱 �몄텧�섎뒗 寃쎌슦 LNB 硫붾돱 �몄텧(wrapHidden 泥섎━X) ECHOSTING-448206 > ECHOSTING-450643 二쇱꽍泥섎━ �꾨씫�섏뼱 ECHOSTING-457649 吏��쇱뿉�� 二쇱꽍泥섎━
             /*
             if (window.name == 'connect_popup') {
                 return;
             }
             */
 
             // �곕갚(�몃�) �쒕퉬�ㅼ뿉�� �몄텧�� �ㅻ퉬寃뚯씠�� hide (phone-001.echosting.cafe24.com)
             var bIsPhone001 = (/Space/).test(window.name);
 
             // 二쇰Ц愿�由� > �먮룞�낃툑�뺤씤 愿�由� > 泥섎━�댁뿭 議고쉶 - '�섎룞�낃툑泥섎━�섍린' 踰꾪듉 �낃툑泥섎━/�꾨씫由ъ뒪�� �앹뾽��
             // '�낃툑�꾧�由�'�� 臾댁“嫄� �ㅻ퉬寃뚯씠�� hide (ECHOSTING-183809)
 
             // �꾨젅�꾨궡 �먮뒗 �앹뾽�쇰줈 �몄텧�섏뿀�ㅻ㈃ GNB/LNB 誘몃끂異�
             if (window.name.indexOf('ec-blank-page-exists-menu') < 0 && (bIsPhone001 == true || window.name == 'payment_list' || window.frameElement != null || window.opener)) {
                 $('#wrap').attr('class', 'wrapHidden');
                 $('body').attr('id', 'popup');
             } else {
                 // navi_hide �뚮씪硫뷀꽣 泥댄겕
                 var sNaviHide = MENU_NAVIGATION_GNB.getParameterByName('navi_hide');
                 var sNaviHideForm = $(':input[name="navi_hide"]').val();
                 if (sNaviHide == 'T' || sNaviHideForm == 'T') {
                     return;
                 }
 
                 // 諛섎�濡� �꾨젅�꾪샇異쒖씠 �꾨땶��, class議댁옱�쒕떎硫� remove
                 if ($('#wrap').hasClass('wrapHidden') == true) {
                     $('#wrap').removeClass('wrapHidden');
                 }
             }
         } catch (e) {}
     },
 
     // �ㅻ쭏�몃え�쒖뿉�� �꾨줎�몃쭅而ㅻ。 �▲꽮�댁솕�꾨븣 媛� �쇱뿉 留곸빱媛믪쓣 �섍꺼二쇨린 �꾪빐�� 異붽�
     setSmartModeLink : function() {
         if (typeof(SHOP) === 'undefined') {
             return;
         }
         if (SHOP.isMode() === false) {
             return;
         }
 
         var isLinker = parseInt(MENU_NAVIGATION_GNB.getParameterByName('is_linker'));
 
         if (isLinker !== 1) {
             return;
         }
 
         $('body').find('form').each(function () {
             $(this).append($('<input>').attr({type : 'hidden', name : 'is_linker'}).val(1));
         });
     },
 
     // top踰꾪듉 append
     setTopButton : function() {
         if (typeof(SHOP) !== 'undefined' && SHOP.isMode() === true) {
             return;
         }
         var iWrapLength = $('#wrap').length;
         var bClassWrapHidden = $('#wrap').hasClass('wrapHidden');
         var bClassSnbHidden = $('#container').hasClass('snbHidden');
         if (iWrapLength > 0 && bClassWrapHidden == false && bClassSnbHidden == false && typeof CAFE24.GLOBAL_INFO === 'object') {
            //  var sImgDomain = (CAFE24.GLOBAL_INFO.isGlobal() === true) ? 'skin.cafe24img.com' : 'img.echosting.cafe24.com';
            //  var sHtml = '<a href="#wrap" class="btnWrap"><img src="//' + sImgDomain + '/ec/layout/btn_wrap.png" alt="�곷떒�쇰줈 �대룞"></a>';
            //  $('#wrap').append(sHtml);
         }
     },
 
     // �쒕쿋�� append
     // /home/12r/program/resource/js/admin/navigation/top.js �ъ뼇留욎땄
     setSurveyMenu : function() {
         var sSurveyCode = 'ECHOSTING-467016';
 
         // �몄텧 �쒓컙 2022�� 8�� 17�� 源뚯�. (�붿� 0遺��� �쒖옉)
         var iEndTime = new Date(2022, 7, 17, 23, 59, 59).getTime(),
             iCurrentTime = new Date().getTime();
         if (iCurrentTime > iEndTime) {
             $('.betaArea').removeClass('show');
             $('.betaArea').addClass('hide');
             return ;
         }
 
         // �몄텧 �꾩튂: �대뱶誘� 硫붿씤 ���쒕낫��
         var sPathname = window.location.pathname.replace(/\/shop[1-9][0-9]*/g , '');
         var oMainDashBoard = [
             "/admin/php/main.php".toLowerCase(),
             "/disp/admin/mode/dashboard".toLowerCase()
         ];
         var sIsMainDashBoard = oMainDashBoard.indexOf(sPathname.toLowerCase());
         if(sIsMainDashBoard < 0) {
             return;
         }
 
         // �몄텧 議곌굔 �ъ뼇
         var isCloseSurvey = INFLUENCER_MENU_NAVIGATION_GNB.getCookie('is_close_survey');
         var iLoginCount = INFLUENCER_MENU_NAVIGATION_GNB.getCookie('login_count');
         var isSurvey = false;
         if(isCloseSurvey === 'T' || iLoginCount >= 3) {
             $('.betaArea').removeClass('show');
             $('.betaArea').addClass('hide');
             return ;
         } else {
             $.ajax({
                 url: '/exec/admin/Mall/SurveyCheck',
                 data : {'code' : sSurveyCode},
                 async: false,
                 dataType: 'json',
                 success: function(resp){
                     isSurvey = resp.result;
                 }
             });
             if (isSurvey == true) {
                 $('.betaArea').removeClass('show');
                 $('.betaArea').addClass('hide');
                 return ;
             }
         }
 
         // �몄텧 �쒗뵆由�
         var sHtml =
             '<div class="mSurveyLayer show"><!-- 李멸퀬: show �대옓�� 異붽��� �덉씠�� �앹뾽 �몄텧 �� -->\n' +
             '        <div class="heading">\n' +
             '            <strong class="title">�섍껄�� �ㅻ젮二쇱꽭��!</strong>\n' +
             '        </div>\n' +
             '        <div class="wrap">\n' +
             '            <div class="desc">\n' +
             '                移댄럹24 �쇳븨紐� 愿�由ъ옄�� ����<br>�뚯쨷�� �섍껄�� �꾪빐二쇱꽭��<br>(3遺� �댁쇅 �뚯슂)\n' +
             '            </div>\n' +
             '        </div>\n' +
             '        <div class="footer">\n' +
             '            <a href="#none" class="btnSurveyNormal eClose">愿��ъ뾾�댁슂</a>\n' +
             '            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdvRIYs78RJL8VMT6AJO3Evz-2jyCFr2jGqH-qC1LyiYBxP9w/viewform?usp=sf_link" class="btnSurveyCtrl" target="_blank">�ㅻЦ 李몄뿬�섍린<i class="icoSurveyOutLink"></i></a>\n' +
             '        </div>\n' +
             '        <button type="button" class="btnSurveyClose eClose">�リ린</button>\n' +
             '    </div>';
         $('#wrap > #container').after(sHtml);
 
         // �대깽�� �뺤쓽
         // 愿��ъ뾾�댁슂 - �대┃ �� 鍮꾨끂異� (臾닿린��)
         $('#wrap .mSurveyLayer .btnSurveyNormal').live('click', function () {
             $('.mSurveyLayer').removeClass('show');
             $.ajax({
                 url: '/exec/admin/Mall/SurveyResult',
                 data : {'code' : sSurveyCode}
             });
         });
 
         // �リ린 - �대┃ �� 鍮꾨끂異� (48 �쒓컙)
         $('#wrap .mSurveyLayer .btnSurveyClose').live('click', function () {
             $('.mSurveyLayer').removeClass('show');
             INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_close_survey', 'T', 2);
         });
 
         // �ㅻЦ 李몄뿬�섍린
         $('#wrap .mSurveyLayer .btnSurveyCtrl').live('click', function () {
             $('.mSurveyLayer').removeClass('show');
             $.ajax({
                 url: '/exec/admin/Mall/SurveyResult',
                 data : {'code' : sSurveyCode}
             });
         });
     },
 
     // 紐⑤컮�쇱눥�묐ぐ > 紐⑤컮�� �깃�由�
     openSmartskinAdmin : function() {
         window.open('/exec/admin/manage/mobilesmartskin', 'smartskin', 'width=1400,height=1000,scrollbars=yes');
     },
     // 二쇰Ц愿�由� > 由ъ뼹�⑦궧 �ъ옣珥ъ쁺 愿�由� - �앹뾽李�
     openRealPackingAdmin : function() {
         window.open('/disp/admin/order/realpacking', 'realpacking', 'width=1400,height=1000,scrollbars=yes');
     },
 
  
     //FTP > �� FTP > �뚯씪�낅줈�� - �앹뾽李�
     openFileUploaderAdmin : function() {
         window.open('/disp/admin/ecfileupload/main?type=download', 'uploader', 'width=1280,height=870');
     },
 
     // �섏씠吏��먯꽌 蹂대궡以� �믪씠媛� �뺣낫濡� �꾩씠�꾨젅�꾩쓽 �믪씠媛� 蹂�寃�
     receiveMessage : function(event)
     {
         var origin = event.origin || event.originalEvent.origin;
 
         //異붽� �덉슜�� �꾨찓�몄씠 �덉쓣�� �섎떒�� �묒꽦�댁＜�몄슂
         var originMatch = origin.match(/^.+:\/\/(shop[0-9]+\.)?([a-z0-9-_\.]*)[\/\?]?/i);
         if (!originMatch[2] || originMatch[2] !== window.location.hostname) {   //sub-domain
             return;
         }
 
         var iHeight = parseInt(event.data, 10);
         if (isNaN(iHeight) == true || iHeight < 1) {
             return;
         }
 
         $('#adminFrameContent').css('height', iHeight + 'px');
         $('#adminFrameContent').parent().css('height', '');
     },
     // 硫붿씤 �곹뭹 吏꾩뿴愿�由�+ �앹뾽
     openShowInfoMainPlus : function() {
         window.open(getMultiShopUrl('/disp/admin/product/ShowInfoMainplus'), 'showInfoDisplayPlus', 'top=8,width=' + (screen.width - 16) + ',height=' + (screen.height - 108));
 
         if (SHOP.isMode() === false) {
             location.href = getMultiShopUrl('/disp/admin/product/ShowInfoMain');
         }
     },
     // ECKOREA/ECJAPAN division 蹂꾨룄 (UI)
     setAddMenuDivision: function () {
         var layerAddMenu = $(".topBar .service .list");
         // �붾낫湲� add divide
         if (typeof CAFE24.GLOBAL_INFO === 'object' && CAFE24.GLOBAL_INFO.isGlobal() === true) {
             //layerAddMenu.find('li[id]').last().next().addClass('line'); //�쇱씤 �ｌ뼱二쇰뒗 以� (�섏쨷�� �ㅼ떆 異붽��댁빞�� 寃쎌슦 二쇱꽍 �앸왂)
         } else {
             layerAddMenu.find('li[id]').last().addClass('line');
         }
     },
 
     openMarketManage : function () {
         window.open(getMultiShopUrl('/disp/admin/shop/frame?menu=1553'), 'ec-blank-page-exists-menu-1553');
     },
 
     multishopAutoLink : function () {
         if (SHOP.isDefaultShop() === false) {
             if (confirm('湲곕낯紐곗뿉�쒕쭔 �쒓났�섎뒗 硫붾돱�낅땲��. 湲곕낯紐곕줈 �대룞�섏떆寃좎뒿�덇퉴?') === false) {
                 return;
             }
         }
 
         location.href = '/disp/admin/shop' + SHOP.getDefaultShopNo() + '/multishop/AutoDashboard';
     },
     // �먮룞吏꾩뿴 �앹뾽
     openAutodisplay : function(sDirect) {
         if (typeof(sDirect) !== 'undefined' && sDirect === 'T') {
             // direct �묎렐�� 寃쎌슦�먮뒗 �앹뾽�쇰줈 泥섎━
             window.open(getMultiShopUrl('/disp/admin/product/DisplayAutodisplay?direct=T'), 'autodisplay', 'top=8,width=' + (screen.width - 16) + ',height=' + (screen.height - 108));
 
             return;
         }
 
         var sUrl = getMultiShopUrl('/disp/admin/product/DisplayAutodisplay');
         var oContainer = document.createElement('div');
         var oIframe = document.createElement('iframe');
 
         oContainer.setAttribute('id', 'autodisplay');
         oIframe.setAttribute('src', sUrl);
         oIframe.setAttribute('frameborder', 0);
 
         $(oContainer).css({
             position: 'fixed',
             left: 0,
             top: 0,
             right: 0,
             bottom: '1px',
             padding: '8px',
             background: 'rgba(0, 0, 0, 0.5)',
             'z-index': 9999
         });
 
         $(oIframe).css({
             width: '100%',
             height: '100%',
             'box-shadow': 'rgba(0, 0, 0, 0.5) 0px 0px 24px 4px, rgba(0, 0, 0, 0.5) 0px 9px 12px 0px',
             'backgounrd-color': '#FFF'
         });
 
         oContainer.appendChild(oIframe);
         document.body.appendChild(oContainer);
     },
     // �먮룞吏꾩뿴 �앹뾽 �쒓굅
     closeAutodisplay: function() {
         $('#autodisplay').remove();
 
         // �덈줈怨좎묠 (蹂�寃쎌궗��씠 �덉쓣 �� �덉쑝誘�濡�)
         location.reload();
     },
     //lnb �섏씠�ㅻ턿 梨꾨꼸
     openFacebookChannel: function()
     {
         var oParam = {'menu_type': 'channel', 'mode': 'smart'};
         var sUrl = getMultiShopUrl('/disp/admin/external/ExternalscriptFbe');
 
         //lnb �섏씠�ㅻ턿 梨꾨꼸 �쏆� �덉쑝硫� �깃낵異붿쟻 �뚮씪誘명꽣 �뗮똿
         var oLnbMenu = $('#snb .facebookTip');
         var oLink = oLnbMenu.find('a.facebook');
         var oFloating = oLnbMenu.find('div.mFacebookInterest');
         if (oLink.length > 0 && oFloating.length > 0) {
             oParam['menu_type'] = 'lnb';
             oParam['nudge_type'] = oFloating.find('input[name="nudge_type"]').val();
             oParam['trigger_type1'] = oFloating.find('input[name="trigger_tp1"]').val();
             oParam['trigger_type2'] = oFloating.find('input[name="trigger_tp2"]').val();
         }
 
         location.href = sUrl + '?' + $.param(oParam);
     },
 
     // �좊뜲�ㅽ겕 梨쀫큸 �ㅽ겕由쏀듃 �쎌엯
     setZenmateChatbotScript: function()
     {
         // 梨꾨꼸愿�由щ� �쒖쇅�� ���쒕낫�쒖뿉�쒕쭔 梨쀫큸 �몄텧
         var sPathName = window.location.pathname.replace(/\/shop[0-9]/g , '');
         var aMainDashBoard = [
             "/admin/php/main.php",
             "/admin/php/m/center.php",
             "/disp/admin/product/DashboardMain",
             "/admin/php/s/center.php",
             "/admin/php/c/center.php",
             "/admin/php/b/center.php",
             "/disp/admin/Manage/Index",
             "/disp/admin/manage/mobileIndex",
             "/disp/admin/promotion/DashboardMain",
             "/disp/admin/myapps/list"
         ];
         var sIsMainDashBoard = aMainDashBoard.indexOf(sPathName);
         if(sIsMainDashBoard < 0) {
             return;
         }
 
         // �좊뜲�ㅽ겕 梨쀫큸 �ㅽ겕由쏀듃 濡쒕뱶
         var oZenmateChatbotScript = document.createElement('script');
         oZenmateChatbotScript.id = 'ze-snippet';
         oZenmateChatbotScript.src = 'https://static.zdassets.com/ekr/snippet.js?key=a56e8c63-cf6c-47fd-ab04-3f984a071631';
         document.body.appendChild(oZenmateChatbotScript);
     },
 
     // LNB(�ㅻ쭏�몃え��) > �쒕퉬�ㅽ솗�� > �뚮윭�ㅼ빋 - �앹뾽李�
     openPlusApp: function (bIsUse) {
         var sUrl = '/disp/admin/Mode/SettingExtra?menu_mode=plusapp';
         if (bIsUse === true) {
             sUrl += '&menuno=2340';
         }
         window.open(getMultiShopUrl(sUrl), 'ec-blank-page-exists-menu', 'toolbar=no, location=no, scrollbars=yes, resizable=yes, width=1350, height=800');
     }
 };
 
 // 紐⑤뱶 �꾪솚 荑좏궎
 var INFLUENCER_MENU_NAVIGATION_GNB = {
     bIsChaneMode : false,
 
     initialize : function() {
         if (typeof(SHOP) === 'undefined') {
             return;
         }
 
         $('#ec-influencer-gnb-appstore').click(function (e) {
             e.preventDefault();
             INFLUENCER_MENU_NAVIGATION_GNB.openAppStore();
         });
 
         /**
          * �ㅻ쭏�몃え�� �곷떒 top硫붾돱 �대┃�� �쒕∼�ㅼ슫硫붾돱 �몄텧
          */
         $('.ec-mode-gnb-menu').click(function() {
             var bHasClass = $(this).parent().hasClass('selected');
             // ���ㅼ슫 硫붾돱 �꾩껜 珥덇린��
             $('#header').find('.dropLayer').parent().removeClass('selected');
 
             if (bHasClass == false) {
                 $(this).parent().addClass('selected');
             }
         });
 
         // 紐⑤뱶�꾪솚 以묐났 �대┃ 諛⑹�
         var bClickFlag = true;
         $('.ec-influencer-gnb-mode-change').click(function() {
             INFLUENCER_MENU_NAVIGATION_GNB.bIsChaneMode = true;
             if (bClickFlag === true) {
                 $(this).siblings('.mode').removeClass('now');
                 $('#ec-influencer-gnb-mode-change-checkbox').attr('checked', 'checked');
                 INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_new_pro_mode', 'F', 30);
                 if (SHOP.isMode() === true) {
                     $('#ec-influencer-gnb-mode-pro').addClass('now');
 
                     INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_mode', false, 30);
                     window.location.href = '/admin/php/influencer.php';
                 } else {
                     $('#ec-influencer-gnb-mode-smart').addClass('now');
 
                     INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_mode', true, 30);
                     window.location.href = '/admin/php/influencer.php?mode=smart';
                 }
                 $('#ec-influencer-gnb-mode-change-checkbox').attr('disabled', 'disabled');
                 bClickFlag = false;
             }
         });
 
         $('#ec-smartmode-lnb-file-uploader').click(function () {
             INFLUENCER_MENU_NAVIGATION_GNB.openFileUploader();
         });
 
         // eSnbModal : dimmed layer position
         function dimmedSnbLayerPosition(target){
             var findLayer = target,
                 propWinWidth = $(window).width(),
                 propWinHeight = $(window).height(),
                 propWidth = findLayer.outerWidth(),
                 propHeight = findLayer.outerHeight(),
                 propWinScroll = $(window).scrollTop(),
                 propTop = 0,
                 propHeadHeight = 0;
 
             if(propWinWidth < propWidth){
                 findLayer.css({'left':0, 'marginLeft':0});
             } else {
                 var propLeft = propWidth/2;
                 var pLeft = propWinWidth/2;
                 findLayer.css({'left':pLeft+'px', 'marginLeft':'-'+ propLeft +'px'});
             }
 
             if($('#header').length >= 1){ propHeadHeight = $('#header').height()+10; }
             if(propHeight-propWinHeight>0){
                 propTop = propHeadHeight;
             }else{
                 propTop = (propWinHeight - propHeight)/2;
             }
             findLayer.css({'top':propTop});
 
             findLayer.show();
         }
         // eSnbModal : show
         $('body').delegate('.eSnbModal', 'click', function(e){
             var findTarget = $($(this).attr('href'));
             //call dimmed layer position function
             dimmedSnbLayerPosition(findTarget);
             $('body').append('<div id="dimmed_'+ findTarget.attr('id') +'" class="dimmed" style="background:#fff;"></div>');
             if($('.dimmed').length > 1 ){
                 $('.dimmed').addClass('hide');
                 var propZIndex = 110 + $('.dimmed').length;
                 $(findTarget).css({'zIndex':propZIndex+5});
                 $('#dimmed_'+ findTarget.attr('id')).css({ 'zIndex' : propZIndex }).removeClass('hide');
             }
             e.preventDefault();
         });
         // mLayer : close
         function closeSnbModal(target){
             var findParent = target.parents('.mLayer:first');
             var findDimmed = $('#dimmed_' + findParent.attr('id'));
             findParent.hide();
 
             if(findDimmed){
                 if($('.dimmed').length > 1){
                     $('.dimmed').removeClass('hide');
                 }
                 findDimmed.remove();
             }
             return false
         }
         $('body').delegate('.mLayer .footer .eCloseSnbModal', 'click', function(){
             closeSnbModal($(this));
         });
         $('body').delegate('.mLayer > .eCloseSnbModal', 'click', function(){
             closeSnbModal($(this));
         });
         // 紐⑤컮�쇰줈 蹂닿린 踰꾪듉 �リ린
         $('#ecmode-gnb-view-on-moblie-btn').find('.eClose').click(function(){
             $('#ecmode-gnb-view-on-moblie-btn').remove();
         });
         // 紐⑤컮�쇰줈 蹂닿린 踰꾪듉
         $('#ecmode-gnb-view-on-moblie-btn').show();
 
         //lnb �섏씠�ㅻ턿 梨꾨꼸 �쏆� 泥섎━
         INFLUENCER_MENU_NAVIGATION_GNB.setLnbFbChNudge();
 
     },
 
     switch : function(sUrl) {
         var bIsMode = INFLUENCER_MENU_NAVIGATION_GNB.getCookie('is_mode');
 
         if (bIsMode === 'true') {
             INFLUENCER_MENU_NAVIGATION_GNB.removeCookie('is_mode');
             INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_mode', false, 30);
             location.href = sUrl;
         }
     },
 
     getCookie : function(findKey)
     {
         var value = document.cookie;
         var startPos = value.indexOf(" " + findKey + "=");
 
         if (startPos == -1) {
             startPos = value.indexOf(findKey + "=");
         }
 
         if (startPos == -1) {
             value = null;
         } else {
             startPos = value.indexOf("=", startPos) + 1;
             var endPos = value.indexOf(";", startPos);
 
             if (endPos == -1) {
                 endPos = value.length;
             }
             value = unescape(value.substring(startPos, endPos));
         }
 
         return value;
     },
     setCookie : function(setKey, value, exdays)
     {
         var exdate = new Date();
         exdate.setDate(exdate.getDate() + exdays);
         var setValue=escape(value) + "; domain=." + CAFE24.GLOBAL_INFO.getBaseDomain() + "; path=/;" + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
 
         document.cookie=setKey + "=" + setValue;
     },
     removeCookie : function (findKey) {
         var expireDate=new Date();
         expireDate.setDate(expireDate.getDate()-1);
         document.cookie = findKey + "= ; expires="+expireDate.toUTCString()+";path=/";
     },
 
     openAppStore : function () {
         var sUrl = getMultiShopUrl('/disp/admin/myapps/list?navi_hide=T');
         window.open(sUrl, "ec-influencer-gnb-appstore", "width=1000,height=610,resizable=yes,scrollbars=yes");
     },
 
     openFileUploader : function () {
         if (jQuery.browser.safari === true && !window.chrome) {
             return;
         }
 
         var openUrl = '/disp/admin/ecfileupload/main';
 
         var iWidth = 1280;
         var iHeight = 800;
 
         var iLeft = screen.width/2 - iWidth/2;
         var iTop =screen.height/2 - iHeight/2;
         window.open(openUrl, "openUploader", "left=" + iLeft + ",top=" + iTop + ",width=" + iWidth + ",height=" + iHeight + ",status=no,resizeable=no,scroll=no");
     },
     setLnbFbChNudge: function(){
         //lnb �섏씠�ㅻ턿 梨꾨꼸 硫붾돱 留덉슦�� �ㅻ쾭�� �뚮줈�� 泥섎━
         var oLnbNudge = $('#sidebar .facebookTip .eHover');
         oLnbNudge.live('mouseover', function () {
             var scrollHeight = $(document).scrollTop();
             var domTop = $(this).offset().top;
             var domHeight = domTop - 28;
             $(this).parents('#sidebar').find('.mFacebookInterest').removeClass('show').addClass('show');
             if (scrollHeight && scrollHeight > 0) {
                 $('.mFacebookInterest.show').css({'top': domHeight - scrollHeight});
             } else {
                 $('.mFacebookInterest.show').css({'top': domHeight});
             }
         });
 
         oLnbNudge.live('mouseout', function (){
             $('#sidebar .mFacebookInterest').removeClass('show');
         });
     }
 };
 
 var NEW_PRO_MODE_MENU_NAGIVATION_GNB = {
 
     initialize: function () {
         this.setNewProModeChangeLayer();
     },
 
     isNewProMode: function () {
         return INFLUENCER_MENU_NAVIGATION_GNB.getCookie('is_new_pro_mode') === 'T';
     },
 
     // "�덈줈�� �쇳븨紐� 愿�由ъ옄 �ъ슜�� 蹂닿린", "湲곗〈 �쇳븨紐� 愿�由ъ옄濡� �뚯븘媛�湲�"
     // �댄봽濡쒕え�� �꾪솚 踰꾪듉 �대┃�대깽�� (���쒕낫�� 紐⑤떖�먯꽌�� �ъ슜)
     onClickNewProModeToggle: function () {
         var sProModeDashboard = '/admin/php/main.php';
         var sInfluencerModeDashboard = '/disp/admin/shop' + EC_SDE_SHOP_NUM + '/mode/dashboard';
         if (SHOP.isNewProMode()) {
             // �댄봽濡쒕え�� -> �댁쟾紐⑤뱶(�꾨줈紐⑤뱶 or �명뵆猷⑥뼵�� 紐⑤뱶)
             INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_new_pro_mode', 'F', 30);
             var sPrevMode = INFLUENCER_MENU_NAVIGATION_GNB.getCookie('prev_mode');
             if (sPrevMode == 'pro') {
                 INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_mode', false, 30);
                 window.location.href = sProModeDashboard;
             } else {
                 INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_mode', true, 30);
                 window.location.href = sInfluencerModeDashboard;
             }
         } else {
             // �댁쟾紐⑤뱶(�꾨줈紐⑤뱶 or �명뵆猷⑥뼵�� 紐⑤뱶) ->  �댄봽濡쒕え��
             var sCurrentMode = $(this).data('current-mode') ? $(this).data('current-mode') : 'mode';
             INFLUENCER_MENU_NAVIGATION_GNB.setCookie('prev_mode', sCurrentMode, 30);
 
             // �댄봽濡쒕え�� 荑좏궎�명똿
             INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_new_pro_mode', 'T', 30);
             // INFLUENCER_MENU_NAVIGATION_GNB.removeCookie('is_mode');
             INFLUENCER_MENU_NAVIGATION_GNB.setCookie('is_mode', false, 30);
             window.location.href = sProModeDashboard;
         }
     },
 
     // �댄봽濡쒕え�� �꾪솚 �좊룄 紐⑤떖 �リ린 �대┃ �대깽��
     onClickNewProModeDashboardModalClose: function () {
         $('.layerBetaIntro').addClass('layerBetaHide');
         $('body').removeClass('layerBetaShow');
     },
 
     // �댄봽濡쒕え�� �꾪솚 �덉씠�� UI
     setNewProModeChangeLayer: function () {
         // top 硫붾돱 �곸뿭 �꾪솚�덉씠�� �대깽��
         $('a[name="ec-gnb-new-pro-mode-change"]').click(this.onClickNewProModeToggle);
 
         $('.newPromodeArea .btnPromodeView').mouseenter(function() {
             var targetEl = $(this);
             setTimeout(function() {
                 targetEl.siblings('.newPromodeToolTip').addClass('show');
             },250);
         });
         $('.newPromodeArea').mouseleave(function() {
             var targetEl = $(this);
             setTimeout(function() {
                 targetEl.find('.newPromodeToolTip').removeClass('show');
             },250);
         });
     }
 }
 
 $(document).ready(function() {
 
     // �ы뵆�붿옄�� �ㅼ젙�덉씠�대씪硫� body style 異붽�
     MENU_NAVIGATION_GNB.setBodyStyleSimpleLayer();
 
     //紐⑤컮�� 釉뚮씪�곗� �쇨꼍��, sytle蹂�寃�
     MENU_NAVIGATION_GNB.setHeaderStyleIsMobile();
 
     // target="blankWindow"濡� �덊꺆/李쎌쑝濡� �섏뼱�� opener�� null泥섎━
     MENU_NAVIGATION_GNB.setOpenerCheck();
 
     // �꾨젅�꾨궡 �먮뒗 �앹뾽�쇰줈 �몄텧�섏뿀�ㅻ㈃ GNB/LNB 誘몃끂異�
     MENU_NAVIGATION_GNB.setFrameCheck();
 
     // �ㅻ쭏�몃え�쒖뿉�� �꾨줎�몃쭅而� 泥섎━
     MENU_NAVIGATION_GNB.setSmartModeLink();
 
     // �곗륫 �섎떒 top�대룞 踰꾪듉 append
     MENU_NAVIGATION_GNB.setTopButton();
 
     // �댄봽濡쒕え��
     NEW_PRO_MODE_MENU_NAGIVATION_GNB.initialize();

 
     // 而⑦뀗痢좎쁺�� �꾩씠�꾨젅�� height �뗮똿
     $('#adminFrameContent').load(function() {
         var _this = this;
         function adminFrameContentHeight(){
             var headerHeight = document.getElementById('header') ? document.getElementById('header').offsetHeight : 100;
             var frameHeight = $(window).height() - headerHeight;
             var dFrameHeight = window.innerHeight - headerHeight;
             var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
             try {
                 // �대��섏씠吏�
                 if (isSafari == false || typeof $(_this).contents().height() === 'number') {
                     var iMenuNo = MENU_NAVIGATION_GNB.getParameterByName('menu');
                     if (iMenuNo == 1628) {
                         $(_this).css('height', '919px');
                         $(_this).parent().css('height', '919px');
                     } else if (iMenuNo == 13){ // '�꾨찓�� �ㅼ젙' �섏씠吏� iframe (ECQAUNIT-57404)
                         $(_this).css('height', dFrameHeight + 'px');
                         $(_this).parent().css('height', ''); 
                     } else {
                         $(_this).css('height', frameHeight + 'px');
                         $(_this).css('height', $(_this).contents().height() + 30 + 'px');
                         $(_this).parent().css('height', ''); //gFrame - ECHOSTING-192966
                     }
                 }
             } catch (e) {
                 // �몃��섏씠吏�
                 var iMenuNo = MENU_NAVIGATION_GNB.getParameterByName('menu');
                 if (iMenuNo == 13) { // '�꾨찓�� �ㅼ젙' �섏씠吏� iframe (ECQAUNIT-57404)
               
                         document.domain = 'cafe24.com';
                     
                     $(_this).css('height', dFrameHeight + 'px');
                 } else {
                     $(_this).parent().css('height', frameHeight + 'px');
                     if (frameHeight < 750) {
                         $(_this).parent().css('minHeight', 750 + 'px');
                     } else {
                         $(_this).parent().css('minHeight', $(".snbArea").height() + 'px');
                     }
                     $(_this).parents('#content').css('minHeight', '0');
                     $(_this).css('position', 'relative');
                 }
             }
         }
         adminFrameContentHeight();
         $(window).resize(throttle(100, adminFrameContentHeight));
         function throttle(ms, fn) {
             var allow = true;
             function enable() {
                 allow = true;
             }
             return function(e) {
                 if(allow) {
                     allow = false;
                     setTimeout(enable, ms);
                     fn.call(this, e);
                 }
             }
         }
     });
 
     // focus諛쒖깮�� input�곸뿭�� center濡� �꾩튂�섎룄濡� �뗮똿 (IE�댁뒋)
     var bIsTextOver = false;
     $(':text')
         .focus(function() {
             if (bIsTextOver == false) {
                 var center = $(window).height()/2;
                 var top = $(this).offset().top ;
                 if (top > center){
                     $(window).scrollTop(top-center);
                 }
             }
         })
         .mouseenter(function() {
             bIsTextOver = true;
         })
         .mouseleave(function() {
             bIsTextOver = false;
         });
     // �곹뭹�깅줉>�곹뭹紐�(硫��곗꺏) '湲곕낯�쇳븨紐� �뺣낫 怨듯넻�ъ슜' 泥댄겕踰꾪듉 �대┃�쇰줈 focus諛쒖깮�� center�대룞 skip
     $(':checkbox[name^="is_inherit_product_name"]').parent()
         .mouseenter(function() {
             bIsTextOver = true;
         })
         .mouseleave(function() {
             bIsTextOver = false;
         });
 
     $(".topBar .topMenuAct").delegate("a", "click", function(e){
         e.preventDefault();
         var menuObject = top.MenuAction.getMenuObjectByMenuNo($(this).attr("menuno"));
         if (menuObject.path.search(/javascript/gi) > -1) {
             eval(menuObject.path);
         } else {
             top.MenuAction.change(menuObject.menu_alias, $(this).attr("treeno"), '', 'rootTop');
         }
     });
 
     // �덉쇅泥섎━�� Top 硫붾돱
     if ($('#GNB_TP').children().length > 0) {
         $('#GNB_TP').show();
     } else {
         $('#GNB_TP').hide();
     }
 
     // �붾낫湲�
     var layerAddMenu = $(".topBar .service .list");
     $("#gnbTopMore").click(function () {
         $('.topBar .service').toggleClass('selected');
         if (layerAddMenu.is(':hidden') == true) {
             layerAddMenu.show();
             MENU_NAVIGATION_GNB.setAddMenuDivision();
             layerMultiShop.hide();
             layerProfile.hide();
         } else {
             layerAddMenu.hide();
         }
     });
 
     // �붾낫湲� Event
     $('.topBar .service').mouseleave(function () {
         if ($(this).is(':visible') == true) {
             $(this).removeClass('selected');
             layerAddMenu.hide();
         }
     });
 
     // �꾨줈��
     var layerProfile = $(".topBar .membership .adminLayer");
     $('.membership .admin').click(function () {
         if (layerProfile.is(':hidden') == true) {
             layerProfile.show();
             layerAddMenu.hide();
             layerMultiShop.hide();
         } else {
             layerProfile.hide();
         }
     });
 
 
     //硫��곗꺏
     var layerMultiShop = $(".myShop .list");
     $('.myShop .btnCover').click(function () {
         if (layerMultiShop.is(':hidden') == true) {
             layerMultiShop.show();
             layerProfile.hide();
             layerAddMenu.hide();
         } else {
             layerMultiShop.hide();
         }
     });
 
     // 寃���
     $('.search button.btnSmartHelper').click(function () {
         Menu_autocomplete.init();
         if (typeof EC_ADMIN_USE_SMARTHELPER !== 'undefined' && EC_ADMIN_USE_SMARTHELPER === 'T') {
 
             if (typeof EC_ADMIN_MENU_SEARCH === 'undefined') {
                 return;
             }
 
             // �ㅻ쭏�� �꾩�留�
             if ($(this).parents(".search").hasClass('selected') === true) {
                 EC_ADMIN_MENU_SEARCH.close();
             } else {
                 EC_ADMIN_MENU_SEARCH.open();
             }
         } else {
             // 硫붾돱 �먮룞�꾩꽦
             $(this).parents(".search").toggleClass("selected");
         }
     });
 
     // GNB �몄뼱 蹂�寃쎄린��
     $('.global button.btnGlobal,.global button.btnGlobel').click(function() {
         var $oButtonGlobal = $(this);
         var $oMenuLanguage = $oButtonGlobal.parent();
         if ($oMenuLanguage.hasClass('selected') === true) {
             $oMenuLanguage.removeClass('selected');
         } else {
             $oMenuLanguage.addClass('selected');
         }
     });
 
     var fnChangeLanguage = function(sLanguageCode) {
         $.ajax({
             url: '/exec/admin/menu/language',
             type: 'post',
             data: {
                 language: sLanguageCode
             },
             dataType: 'json',
             success: function() {
                 document.cookie = this.MENU_REFRESH_COOKIE_KEY + "=T" + "; expires=" + new Date().toUTCString() + "; path=/ ;domain=." + CAFE24.GLOBAL_INFO.getBaseDomain();
                 location.reload();
             }
         });
     };
     var oTarget = (typeof SHOP !== "undefined" && SHOP.isMode() === true) ? $('.ec-gnb-language-select') : $('.global .list li');
     oTarget.click(function() {
         var $oList = $(this);
         var sLanguageCode = $oList.data('code');
         if (aAvailableLanguages.indexOf(sLanguageCode) === -1) {
             if (SHOP.isMode() === true) {
                 $oList.removeClass('selected');
             } else {
                 $oList.closest('div.global').removeClass('selected');
             }
             return false;
         }
         fnChangeLanguage(sLanguageCode);
     });
 
     if (SHOP.isMobileAdmin() === true) {
         var oSetLanguagePopup = $('#ecmobile-lnb-set-language-popup');
         if (oSetLanguagePopup.length < 1) {
             return false;
         }
         oSetLanguagePopup.appendTo('body');
 
         $('#ecmobile-lnb-set-language-open').click(function(e){
             e.preventDefault();
             oSetLanguagePopup.addClass('on');
             $('#ecmobile-lnb-set-language-select').val(CAFE24.GLOBAL_INFO.getAdminLanguageCode());
         });
 
         $('#ecmobile-lnb-set-language-confirm').click(function(e){
             e.preventDefault();
             var sLanguageCode = oSetLanguagePopup.find('option:selected').val();
             if (aAvailableLanguages.indexOf(sLanguageCode) === -1) {
                 return false;
             }
             fnChangeLanguage(sLanguageCode);
         });
     }
 
     // 援ъ긽�� �댁뒋濡� �대깽�� 異붽�
     $(".search .btnReset").click(function () {
         $(this).parents(".search").toggleClass("selected");
     });
 
     $(".search .keyword input").focus(function(){
        $(this).parents(".form").addClass("focus");
         fakescroll.set('searchFakeScroll');// fakescroll �곸슜
     });
 
     $('.topBar .cti li').click(function(){
         $(this).addClass('selected').siblings().removeClass('selected');
     });
 
     // �섎굹湲덉쑖�쒕퉬�� �대�吏� toggle�� �꾪븳 �섎━癒쇳듃 �뗮똿
     MENU_NAVIGATION_GNB.setElementFinancial();
 
     // �섎굹湲덉쑖�쒕퉬�� �대�吏� toggle
     gnbChangeImg = setInterval('MENU_NAVIGATION_GNB.fadeImages()', 3000);
     $("#financial > a").mouseenter(function() {
         clearInterval(gnbChangeImg);
         $(this).css('z-index',1).show().removeClass('active');
         $(".focus").css('z-index',3).css('color','#fff').addClass('active');
     }).mouseleave(function() {
         gnbChangeImg = setInterval('MENU_NAVIGATION_GNB.fadeImages()', 3000);
         $(".focus").css('color','#c8dbf8');
     });
 
     /*
      * gnb 硫붾돱�� �대┃�� ���� 泥섎━
      */
     $("#gnb").delegate("a", "click", function(e){
         //onclick�� �먮컮�ㅽ겕由쏀듃 �덉쑝硫� 洹몃깷 由ы꽩��.(onclick�� �ㅽ겕由쏀듃 �ㅽ뻾)
         var sOnclick = $(this).attr("onclick");
         if (sOnclick != null && sOnclick != ''){
             if (sOnclick.search(/javascript/gi)>-1){
                 return false;
             }
         }
 
         //硫붾돱踰덊샇瑜� �듯빐 gnb�ㅻ툕�앺듃 媛��몄삤湲�
         var gnbObject = top.MenuAction.isGNB($(this).attr("treeno"));
         if (gnbObject == null) {
             return ;
         }
 
         e.preventDefault();
         var bResult = top.MenuAction.change(gnbObject.menu_alias,null,'','rootGnb');
         if (bResult == true) {
             // GNB�대┃�쇰줈 �섏씠吏� �대룞�� LNB open/close 荑좏궎�쒓굅
             MENU_NAVIGATION_SNB.removeCookie('isLnbMenuClose');
         }
 
     });
 
     if ('addEventListener' in window) {
         window.addEventListener('message', MENU_NAVIGATION_GNB.receiveMessage, false);
     } else if ('attachEvent' in window) { //IE
         window.attachEvent('onmessage', MENU_NAVIGATION_GNB.receiveMessage);
     }
 
     /* btnMenu eExpand */
     $('.settingMenu .eExpand').click(function () {
         $(this).parent().toggleClass('open');
         if ($(this).next('.menuLayer').css('display') != 'none') {
             $(this).text('�リ린');
         } else {
             $(this).text('二쇱슂硫붾돱');
         }
     });
 
     /* tab */
     $('body').delegate('.eTab li a', 'click', function (e) {
         var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
             _target = $(this).attr('href'),
             _siblings = $(_target).attr('class');
         if (_siblings) {
             var _arr = _siblings.split(" "),
                 _classSiblings = '.' + _arr[0];
             $(_target).show().siblings(_classSiblings).hide();
         }
         e.preventDefault();
     });
 
     // ftp �⑸웾 異붽� �좎껌 �앹뾽李�
     $('#ec-smartmode-ftp-add').click(function () {
         $.ajax({
             url: getMultiShopUrl('/admin/php/f/ftp_request_a.php'),
             type: 'POST',
             data: {
                 ftp_click : 'T',
                 quota: 500
             },
             dataType: 'json',
             success: function(oJson) {
                 if (oJson.passed !== true) {
                     alert(oJson.message);
                     $('#layerFtpApplyClose').trigger('click');
                     return;
                 }
             }
         });
     });
     // ftp �⑸웾 異붽� �좎껌 �덉씠�� �リ린
     $('#ec-smartmode-ftp-close').click(function () {
         document.querySelector('.tooltip_ftp_over').style.display = 'none';
     });
 
     $('.ec-smartmode-ftp-add-complete').click(function () {
         document.location.reload();
     });
 
     INFLUENCER_MENU_NAVIGATION_GNB.initialize();
 });
 