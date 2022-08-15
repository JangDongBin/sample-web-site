function open_excel( page )
{
    var Excel;

    try
    {
        Excel = new ActiveXObject( "Excel.application" );
        Excel.Visible = true;
        Excel.Workbooks.Open( page );
    }
    catch( exception )
    {
        window.open( page );

    }
} // end of open_excel()

function CA( form )
{


    form_len = form.length

    for( i = 0; i < form_len; i++ )
    {
        obj = form.elements[i]

        if( obj.type == "checkbox" && obj.name != 'group_no_fix_flag' && obj.name != 'bbs_check' ) // syjung200910
        {
            if( !obj.checked )
            {
                obj.checked = true
            }
            else
            {
                obj.checked = false
            }
        }
    }

} // end of CA()

function open_window( filename, option, win_name )
{

    /*
     * default option
     *
     * option = "tollbar=no, location=no, directories=no, status=no," +
     *          "menubar=no, scrollbars=no, resizable=no," +
     *        "width=, height=, top=, left="
     */

    if( !win_name )
    {
        win_name = "echosting_admin_pop"
    }

    win = window.open( filename, win_name, option )
    return win

} // end of open_window()

// 寃뚯떆�� �쒖떆�쒖꽌 蹂�寃� �앹뾽李� �꾩슦湲�
function board_order_display_pop()
{
    option = "tollbar=no, location=no, directories=no, status=no," +
                "menubar=no, scrollbars=no, resizable=no," +
                "width=690, height=460, top=200, left=300";
    filename = "board_admin_o.php";
    open_window( filename, option, "board_display_pop" )

} // end of board_order_display_pop()

// 寃뚯떆�� �깅줉李� �꾩슦湲�
function board_entry_pop()
{
    var count = 0;
    form_len = document.frm.length;

    for( i = 0; i < form_len; i++ )
    {
        obj = document.frm.elements[i]

        if( obj.type == "checkbox" )
        {
            count++;
        }
    }

    if(count > 6)
      alert(__('NUMBER.USE.EXCEEDS.TOTAL', 'ADMIN.STDLIB.JS'));

        option = "tollbar=no, location=no, directories=no, status=no," +
                "menubar=no, scrollbars=yes, resizable=no," +
                "width=840, height=720, top=200, left=100"
    filename = "/admin/php/b/board_admin_f.php"
    open_window( filename, option, "board_entry_pop" )

} // end of board_entry_pop()

// 寃뚯떆�� �쒖떆�쒖꽌 蹂�寃�
function set_display_order( form, mode )
{

    obj = form.display_box
    direct_index = form.direct.value
    f_index = 0;
    e_index = obj.length - 1;
    select_index = obj.selectedIndex;
    dest_select_index = "";

    // �좏깮�� �섏� �딆븯�ㅻ㈃
    if( select_index < f_index || select_index > e_index  )
    {
        msg = __('PLEASE.SELECT.BOARD', 'ADMIN.STDLIB.JS');
        alert( msg );

        return false;
    }

    switch( mode )
    {
        // �쒖뭏 �꾨줈 �대룞
        case "up":
            dest_select_index = select_index - 1;
        break;

        // �쒖씪 �꾨줈 �대룞
        case "top":
            dest_select_index = f_index;
        break;

        // �쒖뭏 �꾨옒濡� �대룞
        case "down":
            dest_select_index = select_index + 1;
        break;

        // �쒖씪 �꾨옒濡� �대룞
        case "bottom":
            dest_select_index = e_index;
        break;

        // 吏곸젒�대룞
        case "direct":
            dest_select_index = form.direct.value - 1;

            is_error = false;
            e_index = e_index + 1;

            if( typeof( obj[dest_select_index] ) == "undefined" || !obj[dest_select_index] )
            {
                is_error = true;
            }

            if( dest_select_index < f_index || dest_select_index > e_index )
            {
                is_error = true;
            }

            f_index = f_index + 1;
            if( is_error )
            {
                msg = sprintf(__('NUMBER.MOVED.CORRECT', 'ADMIN.STDLIB.JS'), f_index, e_index);
                alert( msg );

                return false;
            }

        break;
    }

    select_obj = obj[select_index];
    temp_value = select_obj.value;
    temp_text = select_obj.text;

    // �쒖뭏 �대룞��
    if( mode == "down" || mode == "up" )
    {
        dest_obj = obj[dest_select_index];

        select_obj.value = dest_obj.value;
        select_obj.text = dest_obj.text;
        dest_obj.value = temp_value;
        dest_obj.text = temp_text;
    }

    // top or bottom
    if( mode == "bottom" || mode == "top" || mode == "direct" )
    {
        obj.remove( select_index );

        var s_option = document.createElement( "OPTION" );
        s_option.text = temp_text;
        s_option.value = temp_value;
        obj.add( s_option, dest_select_index );

        dest_obj = obj[dest_select_index];
    }

    dest_obj.selected = true;

} // end of set_display_order()

function board_display_submit( form )
{

    display_box_length = form.display_box.length - 1;

    for( i = 0; i <= display_box_length; i++ )
    {
        board_no  = form.display_box.options[i].value
        form['display_order[]'][i].value = board_no
    }

    form.submit();
}

// �ㅻ챸�몄쬆 �쒕퉬�� �좎껌�섍린 李�
function ssn_pop( is_ssn_pop )
{
        if( is_ssn_pop != "T" )
        {
                return false;
        }

        filename = "/admin/php/m/ssn_pop.php"
        option = "tollbar=no, location=no, directories=no, status=no," +
                "menubar=no, scrollbars=no, resizable=no," +
                "width=440, height=150, top=200, left=300"
        open_window( filename, option, "ssn_pop" )
}

function set_image_map ( page_name, module_id, image_id )
{
        url = '/admin/php/d/set_image_map_f.php?page_name='+ page_name+'&module_id='+module_id+'&image_id='+image_id;
        winname = 'image_map';
        option = 'toolbar=no location=no scrollbars=yes resizable=yes width=700 height=620';
        opener = window.open(url,winname,option);
}

function member_memo_pop( member_id )
{
    var iHeight = (SHOP.isMode() === true) ? 400 : 248;
    option = "tollbar=no, location=no, directories=no, status=no," +
            "menubar=no, scrollbars=auto, resizable=no," +
            "width=425, height="+iHeight+", top=100, left=100";
    filename = "/disp/admin/shop" + EC_SDE_SHOP_NUM + "/member/Memo";
    filename += "?member_id=" + member_id;

    if (SHOP.isMobileAdmin() === true){
        MOBILE_ADMIN_UI.openCommonIframeLayer(filename, true, true);
    } else {
        open_window( filename, option, "member_memo_pop" );
    }
}

function member_mail_pop( member_id, to_name, to_email, order_id, nmc_passwd )
{
        option = "tollbar=no, location=no, directories=no, status=no," +
                "menubar=no, scrollbars=auto, resizable=no," +
                "width=560, height=430, top=100, left=100";
        filename = "/admin/php/c/form_mail.php";
        filename += "?member_id=" + member_id;
        filename += "&to_name=" + to_name;
        filename += "&to_email=" + to_email;
        filename += "&order_id=" + order_id;
        filename += "&nmc_passwd=" + nmc_passwd;
        filename += (typeof EC_SDE_SHOP_NUM != "undefined") ? "&shop_no=" + EC_SDE_SHOP_NUM : "";

        if (SHOP.isMobileAdmin() === true){
            MOBILE_ADMIN_UI.openCommonIframeLayer(filename, true, true);
        } else {
            open_window( filename, option, "ec_form_mail" );
        }

}

function member_sms_pop( member_id, to_phone, order_id, nmc_passwd, new_url)
{
    var aOptions = [];
    aOptions.push('tollbar=no, location=no, directories=no, status=no,');
    aOptions.push('menubar=no, scrollbars=yes, resizable=no,');
    aOptions.push('width=900, height=540, top=100, left=100');

    var sUrl = getMultiShopUrl("/admin/php/c/form_sms.php");

    var aUrl = [];
    if (typeof new_url === 'undefined') {
        aUrl.push(sUrl);
    } else {
        aUrl.push(new_url);
    }
    aUrl.push('?member_id=' + member_id);
    aUrl.push('&to_phone=' + to_phone);
    aUrl.push('&navi_hide=T');
    if (typeof order_id !== 'undefined') {
        aUrl.push('&order_id=' + order_id);
    }
    if (typeof nmc_passwd !== 'undefined') {
        aUrl.push('&nmc_passwd=' + nmc_passwd);
    }

    if (SHOP.isMobileAdmin() === true){
        MOBILE_ADMIN_UI.openCommonIframeLayer(aUrl.join(''), true, true);
    } else {
        open_window(aUrl.join(''), aOptions.join(' '), "ec_form_sms");
    }
}
function open_product_master_f_pop()
{

        option = "tollbar=no, location=no, directories=no, status=no," +
                "menubar=no, scrollbars=yes, resizable=no," +
                "width=840, height=600, top=200, left=300"
        filename = "/admin/php/g/open_product_master_f.php"

    return open_window(  filename, option, "open_product_master_f_t002" )

}

function open_product_master_detail_f_pop( mode, master_no )
{

    method = '';

    switch( mode )
    {
        // �쇰컲 �뺣낫
        case 1:
            method = '#open_product_area1';
        break;

        // 異붽� �뺣낫
        case 2:
            method = '#open_product_area2';
        break;

        // 遺�媛� �쒕퉬��
        case 3:
            method = '#open_product_area3';
        break;
    }

        option = "tollbar=no, location=no, directories=no, status=no," +
                "menubar=no, scrollbars=yes, resizable=yes," +
                "width=880, height=600, top=200, left=300"
        filename = "/admin/php/g/open_product_master_detail_f.php?master_no=" + master_no
        filename += method;

    return open_window(  filename, option, "open_product_master_detail_f" )

}

function open_product_master_ready_f_pop()
{

        option = "tollbar=no, location=no, directories=no, status=no," +
                "menubar=no, scrollbars=yes, resizable=yes," +
                "width=700, height=600, top=200, left=300"
        filename = "/admin/php/g/open_product_master_login_check.php";

    return open_window(  filename, option, "open_product_master_ready_f" )

}

function open_product_master_image_detail_pop( master_no, mode )
{

        option = "tollbar=no, location=no, directories=no, status=no," +
                "menubar=no, scrollbars=yes, resizable=yes," +
                "width=700, height=700, top=200, left=300"
        filename = "/admin/php/g/open_product_master_image_detail.php";
        filename += "?master_no=" + master_no;
        filename += "&mode=" + mode;

    return open_window(  filename, option, "open_product_master_image_detail" )

}


// �쒓� �ш린瑜� 泥댄겕�섎뒗 �⑥닔 by jsyoon
function str_size_check(str){
        var strlen = str.length;
        var bsize = 0;
        for(i=0; i<strlen; i++){
                chr =   str.charAt(i);
                // �쒓��대㈃ 2瑜� �뷀븳��.
                if (escape(chr).length > 4)
                {
                        bsize += 2;
                }
                // 洹몃컰�� 寃쎌슦�� 1�� �뷀븳��.
                else
                {
                        bsize++;
                }
        }
        return bsize;
}

var IMGSIZE_CTL = {
    init : function ( id_hobj, max_width, max_height )
    {
        IMGSIZE_CTL.id_hobj = id_hobj ;
        IMGSIZE_CTL.max_width = max_width ;
        IMGSIZE_CTL.max_height = max_height ;
        IMGSIZE_CTL.is_ie = ( document.all ) ? true : false ;
        if ( IMGSIZE_CTL.is_ie )
            window.attachEvent( 'onload', IMGSIZE_CTL.resize_start ) ;
        else
            window.addEventListener( 'load', IMGSIZE_CTL.resize_start, true ) ;
    },
    resize_start : function ()
    {
        var hobj_top = document.getElementById( IMGSIZE_CTL.id_hobj ) ;
        if ( !hobj_top || !IMGSIZE_CTL.max_width ) return ;
        IMGSIZE_CTL.max_width = parseInt( IMGSIZE_CTL.max_width ) ;
        IMGSIZE_CTL.max_height = parseInt( IMGSIZE_CTL.max_height ) ;
        IMGSIZE_CTL.hobj_list_img = hobj_top.getElementsByTagName( 'img' ) ;
        IMGSIZE_CTL.hobj_list_swf = hobj_top.getElementsByTagName( IMGSIZE_CTL.is_ie ? 'object' : 'embed' ) ;
        IMGSIZE_CTL.resize_img() ;
        IMGSIZE_CTL.resize_swf() ;
    },
    resize_swf : function ()
    {
        var new_target = new Array() ;
        var obj_target = null ;
        var obj_width = 0 ;
        for ( var cnt = 0, len = IMGSIZE_CTL.hobj_list_swf.length ; cnt < len ; cnt++ )
        {
            obj_target = IMGSIZE_CTL.hobj_list_swf[cnt] ;
            try
            {
                if ( obj_target.getVariable( '_root' ) )
                {
                    obj_width = obj_target.getVariable( '_root._width' ) ;
                    if ( !IMGSIZE_CTL.resize_obj( obj_target, obj_width ) ) new_target[new_target.length] = obj_target ;
                }
                else
                {
                    new_target[new_target.length] = obj_target ;
                }
            }
            catch (e)
            {
                new_target[new_target.length] = obj_target ;
            }
        }
        if ( new_target.length )
        {
            IMGSIZE_CTL.hobj_list_swf = new_target ;
            setTimeout( 'IMGSIZE_CTL.resize_swf()', 500 ) ;
        }
    },
    resize_img : function ()
    {
        var new_target = new Array() ;
        var obj_target = null ;
        var obj_width = 0 ;
        for ( var cnt = 0, len = IMGSIZE_CTL.hobj_list_img.length ; cnt < len ; cnt++ )
        {
            obj_target = IMGSIZE_CTL.hobj_list_img[cnt] ;
            if ( parseInt(obj_target.clientWidth) && obj_target.clientWidth )
            {
                obj_width = obj_target.clientWidth ;
                if ( !IMGSIZE_CTL.resize_obj( obj_target, obj_width ) ) new_target[new_target.length] = obj_target ;
            }
            else
            {
                new_target[new_target.length] = obj_target ;
            }
        }
        if ( new_target.length )
        {
            IMGSIZE_CTL.hobj_list_img = new_target ;
            setTimeout( 'IMGSIZE_CTL.resize_swf()', 500 ) ;
        }
    },
    resize_obj : function ( obj_target, obj_width )
    {
        if ( !parseInt(obj_width) || !obj_width )
        {
            obj_target.style.display = '' ;
            obj_target.style.position = 'absolute' ;
            obj_target.style.visibility = 'hidden' ;
            return false ;
        }
        else
        {
            obj_target.width = ( obj_width > IMGSIZE_CTL.max_width ) ? IMGSIZE_CTL.max_width : obj_width ;
            obj_target.style.display = '' ;
            obj_target.style.position = 'static' ;
            obj_target.style.visibility = '' ;
            return true ;
        }
    }
}
/**
 * i18n �ъ슜�섏� �딅뒗寃껋삤瑜� 蹂댁뿬 __() <- �쇱씠釉뚮윭由� �곸슜�쒗궎吏� �딆쓬
 *  �묒��ㅼ슫濡쒕뱶�� �좎쭨 泥댄겕
 *  2010-02-03
 *  jykim
 */
function getCheckCal(sDct)
{
    var iFuture = new Date(sDct.year2.value, sDct.month2.value, sDct.day2.value);
    var iBounds = new Date(Date.parse(iFuture) - 365*1000*60*60*24).valueOf();     //寃��됯린媛꾩� 365��
    var iPast = new Date(sDct.year1.value, sDct.month1.value, sDct.day1.value).valueOf();
    var iFutureValueOf = iFuture.valueOf();
    var sParam;

    if (iFutureValueOf < iPast) {
        alert("寃��� �쒖옉 �좎쭨蹂대떎 �앸굹�� �좎쭨媛� �묒뒿�덈떎.");
        return false;
    }

    if (iBounds > iPast) {
        alert("�묒� �앹꽦 湲곌컙�� 理쒕� 1�� �낅땲��.");
        return false;
    }
    sParam = "year1="+sDct.year1.value+"&month1="+sDct.month1.value+"&day1="+sDct.day1.value+"&year2="+sDct.year2.value+"&month2="+sDct.month2.value+"&day2="+sDct.day2.value;
    return sParam;
}

function getCheckCal2(aDate1, aDate2, iPeriod)
{
    var iYear1 = parseInt(aDate1[0], 10);
    var iMonth1 = parseInt(aDate1[1], 10) - 1;
    var iDay1 = parseInt(aDate1[2], 10);

    var iYear2 = parseInt(aDate2[0], 10);
    var iMonth2 = parseInt(aDate2[1], 10) - 1;
    var iDay2 = parseInt(aDate2[2], 10);

    var iDate1 = new Date(iYear1, iMonth1, iDay1);
    var iDate2 = new Date(iYear2, iMonth2, iDay2);
    var iDiff = iDate2 - iDate1;

    var iCurrentDay = 24 * 60 * 60 * 1000;// �� * 遺� * 珥� * 諛�由ъ꽭而�
    var iTermDay = iDiff/iCurrentDay;

    if (iTermDay < 0) {
        return '0001';
    }

    //理쒕� 1�꾩씠�댁쓽 �뺣낫留� 議고쉶 媛��ν빀�덈떎.
    if (iPeriod < iTermDay) {
        return '0002';
    }
    return '0000';
}

// �묒そ 怨듬갚 �놁븷湲�
function trim(sVal)
{
    var pattern = /(^\s*)|(\s*$)/g; // \s 臾몄옄�� �쒖옉遺�遺꾧낵 臾몄옄�� �앸굹�� 遺�遺꾩쓽 怨듬갚, ��쓣 紐⑤몢 李얜뒗��.
    sReturnVal = sVal.replace(pattern, "");
    return sReturnVal;
}

var AdminComm = {
    setLoding:function ()
    {
        if (typeof(SHOP) !== 'undefined' && SHOP.isMobileAdmin() === true) {
            MOBILE_ADMIN_UI.showPageLoading();
            return;
        }
        if ( document.getElementById('dLoading') != null ) {
            document.getElementById('dLoading').style.display = "block";
        } else {
            var sNoticeMsg = '泥섎━以묒엯�덈떎. �좎떆留� 湲곕떎�ㅼ＜�몄슂';
            if (window['__']) {
                sNoticeMsg = __("PROCESSING.PLEASE.WAIT", "ADMIN.STDLIB.JS");
            }
            var sLoding = '<div style="top:0px;left:0px;width:1500px;height:1500px;position:absolute;opacity: .1;filter:alpha(opacity=10);background:#000000;"></div><div style="position:absolute;top:250px;left:200px;width:400px;height:150px; padding:50px; text-align:center; color:#575757; font-size:12px;background:#ffffff; font-family:dotum,�뗭�,�뗭�泥�;"><b>' + sNoticeMsg + '</b><img src="//img0001.echosting.cafe24.com/admin/center/newadmin/c/send.gif" border=""/></div>';
            eNewDiv = document.createElement('div');
            document.body.appendChild(eNewDiv);
            eNewDiv.id = 'dLoading';
            document.getElementById('dLoading').innerHTML = sLoding;
        }
    },

    unsetLoding:function ()
    {
        if (typeof(SHOP) !== 'undefined' && SHOP.isMobileAdmin() === true) {
            MOBILE_ADMIN_UI.hidePageLoading();
            return;
        }
        document.getElementById('dLoading').style.display = "none";
    },

    formCheck:function(frm)
    {
        //�쇨갗�섎쭔�� 猷⑦봽
        for (j=0; j<$(frm).elements.length; j++) {
            pre_input = $(frm).elements[j];

            if (pre_input.require == 'true' && pre_input.value == '' && (pre_input.type == 'text' || pre_input.type == 'textarea')) {
                alert(sprintf(__('PLEASE.ENTER', 'ADMIN.STDLIB.JS'), pre_input.title));
                pre_input.focus();
                return false;
            }
        }
    },

    /**
     * trim 泥섎━
     * @param {String} trim
     * @param {String} value
     */
    _trim: function(trim, value){
        if (trim !== null) {
            switch (trim) {
                case 'ltrim'    : value = value.ltrim(); break;
                case 'rtrim'    : value = value.rtrim(); break;
                default            : value = value.trim(); break;
            }
        }
        return value;
    },

    /**
    * �⑦꽩 寃��� 硫붿냼��
    **/
    isValidEmail: function(val) {
        val = this._trim(null, val);
        var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
        return (pattern.test(val)) ? true : false;
    },

    isValidUserid: function(val) {
        val = this._trim(null, val);
        var pattern = /^[a-zA-Z]{1}[a-zA-Z0-9_]{3,11}$/;
        return (pattern.test(val)) ? true : false;
    },

    hasHangul: function(val) {
        val = this._trim(null, val);
        var pattern = /[媛�-��]/;
        return (pattern.test(val)) ? true : false;
    },

    alphaOnly: function(val) {
        val = this._trim(null, val);
        var pattern = /^[a-zA-Z]+$/;
        return (pattern.test(val)) ? true : false;
    },

    isNumeric: function(val) {
        if (isNaN(val)) { return false; }
        var pattern = /^[0-9]+$/;
        return (pattern.test(val)) ? true : false;
    },

    isFloat: function(val) {
        if (isNaN(val)) { return false; }
        var pattern = /^[0-9\.]+$/;
        return (pattern.test(val)) ? true : false;
    },

    isValidJumin: function(num) {
        num = this._trim(null, num);
        var pattern = /^([0-9]{6})-?([0-9]{7})$/;
        if (!pattern.test(num)) return false;
        num = RegExp.$1 + RegExp.$2;

        var sum = 0;
        var last = num.charCodeAt(12) - 0x30;
        var bases = "234567892345";
        for (var i=0; i<12; i++) {
            if (isNaN(num.substring(i,i+1))) return false;
            sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
        }
        var mod = sum % 11;
        return ((11 - mod) % 10 == last) ? true : false;
    },

    isValidBizNo: function(num) {
        num = this._trim(null, num);
        var pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
        if (!pattern.test(num)) return false;
        num = RegExp.$1 + RegExp.$2 + RegExp.$3;
        var cVal = 0;
        for (var i=0; i<8; i++) {
            var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7);
            cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10;
        }
        var li_temp = parseFloat(num.substring(i,i+1)) * 5 + "0";
        cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2));
         return (parseInt(num.substring(9,10)) == 10-(cVal % 10)%10) ? true : false;
    },

    isValidCell: function(num) {
        num = this._trim(null, num);
        var pattern = /^([0]{1}[0-9]{1,2})-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
        if (pattern.exec(num)) {
            if(RegExp.$1 == "010" || RegExp.$1 == "011" || RegExp .$1 == "016" || RegExp.$1 == "017" || RegExp.$1 == "018" || RegExp.$1 == "019") {
                return true;
            }
            return true;
        } else {
            return false;
        }
    },

    isValidTel: function(num) {
        num = this._trim(null, num);
        var pattern = /^([0]{1}[2-9]{1}[0-9]{0,2})-?([0-9]{3,4})-?([0-9]{4})$/;
        return (pattern.test(num)) ? true : false;
    },

    /**
     * 泥댄겕諛뺤뒪 泥댄겕 �ㅽ겕由쏀듃
     * @param {Element} el
     * @param {Element} frm
     * @param {String} name
     */
    checkAll: function(el, frm, name) {
        $('input[name="'+name+'"]').each(function(){
            if ( $(el).is(":checked") == true ) {
                $(this).attr('checked', true);
            } else {
                $(this).attr('checked', false);
            }
        });
    },

    /**
     *  臾몄옄�댁쓣 �뱀젙�� 諛붿씠�몃줈 �먮쫫
     */
    cutStrByte:function(str, iLen) {
        var i;
        var m=str.length;
        var iReCount=0;
        var iVal = 0;;
        var iLenCnt = 0;
        for (i=0;iReCount<iLen; i++) {
            val = escape(str.charAt(i)).length;
            iLenCnt++;
            if (val>3) {
                iReCount++;
            }
            iReCount++;
        }
        if(iReCount%2 == 1)  {
            iLenCnt-1;
        } else {
            iLenCnt;
        }
        return str.toString().substr(0,iLenCnt);
    }
};

/**
 * string buffer
 */
var StringBuffer = function() {
    this.buffer = new Array();
};
StringBuffer.prototype.append = function(obj) {
    this.buffer.push(obj);
};
StringBuffer.prototype.toString = function() {
    return this.buffer.join('');
};
StringBuffer.prototype.clear = function() {
    return this.buffer.clear();
};

function getVal(sObjName)
{
    return document.getElementsByName(sObjName);
}
/**
 *  �ㅼ씠踰� �섏씠 諛곗넚泥섎━ 議곌굔
 *  媛쒕퀎諛곗넚�� �먯껜 諛곗넚留� 媛���
 *  �꾩껜 諛곗넚 �� �� 媛���
 *  2010-10-28 jykim
 */
var ncheckoutOrders = {

    init : function ()
    {
        this.sScinfo = '';
        this.sScinfoFirstData = '';
        this.iCheckProductLen = 0;
        this.iOrderProductCnt = 0;
        this.oNcheckoutProductIndex;
        this.oNcheckoutProductIndexLen;
        this.oChkId = getVal("chk_id[]");
        this.aChkIdVal;
        this.iOrderIdIndexNo;
        this.oOrderIdLen = getVal("order_id[]").length;
        this.iOrdersNcheckoutCheck;
        this.iOrdersUsuallyCheck;
        this.iNcheckoutProductIndexNo;
    },
    /**
     *  param   sOrderId        string or Boolean
     *          iChkIdIndexNo   int
     */
    orderProductCheck : function (sOrderId, iChkIdIndexNo)
    {
        if (getVal("delvReady")[0] != undefined) {
            if (getVal("delvReady")[0].value == "T") {
                return true;
            }
        }
        this.aChkIdVal;
        this.iOrderIdIndexNo = 0;
        if (sOrderId === false) {
            this.aChkIdVal = this.oChkId[iChkIdIndexNo].value.split(',');
            iOrderIdIndexNo = this.aChkIdVal[0];         //chk_id[] �� 二쇰Ц 媛�닔蹂� index 踰덊샇媛� �덉쓬��.
            sOrderId = getVal("order_id[]")[iOrderIdIndexNo].value;
        }

        this.iChkIdIndexNo = iChkIdIndexNo;     //�좏깮�� �곹뭹 index 踰덊샇

        for (var i = 0; i<this.oOrderIdLen; i++) {
            //諛곗넚泥섎━ �쒕룄�섎뒗 �곹뭹�� 二쇰Ц�� �ㅼ씠踰� �섏씠 二쇰Ц�몄� �뺤씤
            if (getVal("order_id[]")[i].value === sOrderId) {
                //�ㅼ씠踰� �섏씠 二쇰Ц 遺�遺� 諛곗넚 �쒕룄��  遺덇�
                if (this.ncheckoutCheck(i) === false) {
                    return false;
                }
            }
        }
    },
    ncheckoutCheck : function (i)
    {
        this.iOrdersNcheckoutCheck = 0;
        this.iOrdersUsuallyCheck = 0;
        this.oNcheckoutProductIndex = null;
        this.oNcheckoutProductIndexLen = 0;

        //�ㅼ씠踰� �섏씠 二쇰Ц 泥댄겕 異붽�
        if (getVal("order_kind[]")[i].value == 'NCHECKOUT') {
            this.iCheckProductLen = 0;
            this.oNcheckoutProductIndex = "ncheckout_product_index"+i+"[]";
            this.oNcheckoutProductIndexLen = getVal(this.oNcheckoutProductIndex).length;
            this.iNcheckoutProductIndexNo = 0;
            //�ㅼ씠踰� �섏씠 二쇰Ц�� �곹뭹�� 紐뉕컻 �좏깮�섏뿀�붿� �뺤씤
            for (var j = 0; j<this.oNcheckoutProductIndexLen; j++) {
                this.iNcheckoutProductIndexNo = getVal(this.oNcheckoutProductIndex)[j].value;
                if (getVal("chk_id[]")[this.iNcheckoutProductIndexNo].checked === true) {
                    this.iCheckProductLen++;
                }
            }

            if (this.iCheckProductLen > 0) {
                //this.sScinfo = getVal("sc_info[]")[i].value;
                //sScinfoFirstData = this.sScinfo.substring(0, 1);       //�앸같�� �낆껜 �뺣낫
                this.iOrderProductCnt = getVal("product_cnt[]")[i].value   //二쇰Ц�� �곹뭹 珥� 媛�닔
                //�ㅼ씠踰� �섏씠 媛쒕퀎 諛곗넚 �ㅼ떆 �덉슜 2010-11-19 jykim
                if (getVal("shipped_flag[]")[i].value == 'F') {       //二쇰Ц�� 紐⑤뱺 �곹뭹�� 諛곗넚�꾩씤 �곹깭媛�
                    /**
                     *  媛쒕퀎 諛곗넚 �먯껜諛곗넚, �앸같�� �좏깮 媛��ν븯�꾨줉 蹂�寃� 2010-10-20 jykim
                    if (this.iOrderProductCnt != this.iCheckProductLen) {
                        if (sScinfoFirstData != 1) {    //�쇰� 諛곗넚�� �먯껜諛곗넚留� 媛���
                            alert("�ㅼ씠踰� �섏씠 二쇰Ц�� 媛쒕퀎 諛곗넚�� '�먯껜諛곗넚'留� 媛��ν빀�덈떎.");
                            return false;
                        }
                    }
                    if (this.iOrderProductCnt != this.iCheckProductLen) {
                        alert("�ㅼ씠踰� �섏씠 二쇰Ц�� 媛쒕퀎 諛곗넚�� 遺덇��⑸땲��.");
                        return false;
                    }
                     */
                } else if(getVal("shipped_flag[]")[i].value == 'T') {     //二쇰Ц�� �쇰� �곹뭹�� 諛곗넚以묒씠嫄곕굹 �ㅻⅨ �곹깭媛�
                    /**
                     *
                    if (sScinfoFirstData == 1) {
                        alert("�ㅼ씠踰� �섏씠 二쇰Ц�� 媛쒕퀎 諛곗넚�� '�먯껜諛곗넚'留� 媛��ν빀�덈떎.");
                        return false;
                    }
                    if (this.iOrderProductCnt != this.iCheckProductLen) {
                        alert("�ㅼ씠踰� �섏씠 二쇰Ц�� 媛쒕퀎 諛곗넚�� 遺덇��⑸땲��!!.");
                        return false;
                    }
                     */
                }
            }
            this.iOrdersNcheckoutCheck++;
        } else {
            this.iOrdersUsuallyCheck++;
        }

        if (this.iOrdersNcheckoutCheck > 0 && this.iOrdersUsuallyCheck > 0) {
            alert("�좏깮�� 二쇰Ц 以� �ㅼ씠踰� �섏씠 二쇰Ц�� �ы븿�섏뼱 �덉뒿�덈떎.\n�ㅼ씠踰� �섏씠 二쇰Ц �좏깮�댁젣 �� �ㅼ떆 吏꾪뻾�� 二쇱꽭��.");
            return false;
        }
    }
}

//諛곗넚泥섎━�섎뒗 �섏씠吏��먯꽌 �ㅼ씠踰� �섏씠 二쇰Ц�� �ы븿�섏뼱 �덈뒗吏� 泥댄겕
function naverOrderCheck(OrdLen)
{
    var iOrderKindLen = getVal("order_kind[]").length;

    if (OrdLen == 'om_info'){
        var iOrderIdLen = getVal("om_info[]").length;

        for (var i = 0; i<iOrderKindLen; i++) {
            if (getVal("order_kind[]")[i].value == 'NCHECKOUT' && getVal("om_info[]")[i].checked === true) {
                alert("�좏깮�� 二쇰Ц 以� �ㅼ씠踰� �섏씠 二쇰Ц�� �ы븿�섏뼱 �덉뒿�덈떎.\n�ㅼ씠踰� �섏씠 二쇰Ц �좏깮�댁젣 �� �ㅼ떆 吏꾪뻾�� 二쇱꽭��1.");
                return false;
            }
        }
    }else{
        var iOrderIdLen = getVal("order_id[]").length;

        for (var i = 0; i<iOrderKindLen; i++) {
            if (getVal("order_kind[]")[i].value == 'NCHECKOUT' && getVal("order_id[]")[i].checked === true ) {
                alert("�좏깮�� 二쇰Ц 以� �ㅼ씠踰� �섏씠 二쇰Ц�� �ы븿�섏뼱 �덉뒿�덈떎.\n�ㅼ씠踰� �섏씠 二쇰Ц �좏깮�댁젣 �� �ㅼ떆 吏꾪뻾�� 二쇱꽭��.");
                return false;
            }
        }

    }
    return true;
}

//諛곗넚泥섎━�섎뒗 �섏씠吏��먯꽌 �ㅼ씠踰� �섏씠 二쇰Ц�� �ы븿�섏뼱 �덈뒗吏� 泥댄겕
//i18n �ъ슜�섏� �딅뒗寃껋삤瑜� 蹂댁뿬 __() <- �쇱씠釉뚮윭由� �곸슜�쒗궎吏� �딆쓬
function naverOrderCheck2(OrdLen)
{
    var iOrderKindLen = getVal("order_kind[]").length;
    if (OrdLen == 'om_info'){
        var iOrderIdLen = getVal("om_info[]").length;

        for (var i = 0; i<iOrderKindLen; i++) {
            if (getVal("order_kind[]")[i].value == 'NCHECKOUT' && getVal("om_info[]")[i].checked === true) {
                alert("�좏깮�� 二쇰Ц 以� �ㅼ씠踰� �섏씠 二쇰Ц�� �ы븿�섏뼱 �덉뒿�덈떎.\n�ㅼ씠踰� �섏씠 二쇰Ц �좏깮�댁젣 �� �ㅼ떆 吏꾪뻾�� 二쇱꽭��.");
                return false;
            }
        }
    }else{
        var iOrderIdLen = getVal("order_id[]").length;
        var iChkLen = getVal("chk_id[]").length;

        if( iOrderIdLen > 0 ){
            for (var i = 0; i<iOrderKindLen; i++) {
                if (getVal("order_kind[]")[i].value == 'NCHECKOUT' && getVal("order_id[]")[i].checked === true) {
                    alert("�좏깮�� 二쇰Ц 以� �ㅼ씠踰� �섏씠 二쇰Ц�� �ы븿�섏뼱 �덉뒿�덈떎.\n�ㅼ씠踰� �섏씠 二쇰Ц �좏깮�댁젣 �� �ㅼ떆 吏꾪뻾�� 二쇱꽭��.");
                    return false;
                }
            }
        }

        if( iChkLen > 0 ){
            for (var i = 0; i<iChkLen; i++) {
                if (getVal("order_kind[]")[i].value == 'self' && getVal("chk_id[]")[i].checked === true) {
                    alert("�좏깮�� 二쇰Ц 以� �ㅼ씠踰� �섏씠 二쇰Ц�� �ы븿�섏뼱 �덉뒿�덈떎.\n�ㅼ씠踰� �섏씠 二쇰Ц �좏깮�댁젣 �� �ㅼ떆 吏꾪뻾�� 二쇱꽭��.");
                    return false;
                }
            }
        }
    }

    //return true;
}

/*
 * i18n �ъ슜�섏� �딅뒗寃껋삤瑜� 蹂댁뿬�� __() <- �쇱씠釉뚮윭由� �곸슜�쒗궎吏� �딆쓬
 */

var pRiceDetailCtl = {
    on : function ( price_detail_oid, price_detail_all, price_detail_mbenifit, price_detail_cbenifit, price_detail_pmoney,
                    price_detail_real, instant_sale_kind, instant_sale_price, instant_mileage_used, add_sale_price, ship_fee,
                    sOrderKindMsg, naver_used_point, naver_save_rate, iDepositUsed, hobj_box, isCheckoutOldNo, naver_cash_used)
    {
        try {
            var naver_cash_used = (naver_cash_used == undefined) ? 0 : naver_cash_used;

            // �ㅼ씠踰� 留덉씪由ъ�&罹먯돩 �쒖떆 議곌굔 蹂�寃�
            // �ㅼ씠踰꾨쭏�쇰━吏� �곷┰ or �ъ슜, 罹먯돩 �ъ슜�쒓꼍�� 1媛쒖“嫄대쭔 留뚯”�섎㈃ 紐⑤뱺��ぉ �몄텧
            var is_naver_mileage_cash_display = false;
            var iNaverMileage  = parseInt(naver_used_point.replace(',', ''));
            var iNaverCash     = parseInt(naver_cash_used.replace(',', ''));
            var iNaverSaveRate = parseFloat(naver_save_rate.replace(',', ''));
            if (iNaverMileage > 0 || iNaverCash > 0 || iNaverSaveRate > 0) {
                is_naver_mileage_cash_display = true;
            }

            if (sOrderKindMsg == "NCHECKOUT") {
                this.checkouticon(hobj_box, sOrderKindMsg, isCheckoutOldNo);
            }
            document.getElementById( 'price_detail_oid' ).innerHTML = '�� 二쇰Ц踰덊샇 ' + price_detail_oid + '�� 援щℓ湲덉븸�뺣낫';
            document.getElementById( 'price_detail_all' ).innerHTML = price_detail_all + '��';
            document.getElementById( 'instant_sale_kind' ).innerHTML = instant_sale_kind;

            document.getElementById('instatnce_tr').style.display = 'none';
            document.getElementById('addsale_tr').style.display = 'none';
            document.getElementById('member_tr').style.display = 'none';
            document.getElementById('coupon_tr').style.display = 'none';
            document.getElementById('deposit_tr').style.display = 'none';
            document.getElementById('mileage_tr').style.display = 'none';
            document.getElementById('shipfee_tr').style.display = 'none';
            document.getElementById('naver_point_tr').style.display = 'none';
            document.getElementById('naver_cash_tr').style.display = 'none';

            if(instant_sale_price != 0){document.getElementById('instatnce_tr').style.display = '';}
            if(add_sale_price != 0){document.getElementById('addsale_tr').style.display = '';}
            if(price_detail_mbenifit != 0){document.getElementById('member_tr').style.display = '';}
            if(price_detail_cbenifit != 0){document.getElementById('coupon_tr').style.display = '';}
            if (iDepositUsed != 0) {
                document.getElementById('deposit_tr').style.display = '';
            }
            if(price_detail_pmoney != 0 || instant_mileage_used != 0){document.getElementById('mileage_tr').style.display = '';}
            if(ship_fee != 0){document.getElementById('shipfee_tr').style.display = '';}
            if (is_naver_mileage_cash_display) {
                document.getElementById('naver_point_tr').style.display = '';
                document.getElementById('naver_cash_tr').style.display  = '';
            }

            if ( parseInt( price_detail_mbenifit ) ) price_detail_mbenifit = '- ' + price_detail_mbenifit ;
            if ( parseInt( price_detail_cbenifit ) ) price_detail_cbenifit = '- ' + price_detail_cbenifit ;
            //if ( parseInt( price_detail_pmoney ) ) price_detail_pmoney = '- ' + price_detail_pmoney ;
            document.getElementById( 'price_detail_mbenifit' ).innerHTML = price_detail_mbenifit + '��';
            document.getElementById( 'price_detail_cbenifit' ).innerHTML = price_detail_cbenifit + '��';
            document.getElementById( 'price_detail_dmoney' ).innerHTML = '- ' + iDepositUsed + '��';
            if( parseInt(instant_mileage_used) ){
                document.getElementById( 'instant_mileage_used' ).innerHTML = '�ㅼ씠踰� �섏씠<br>- 援щℓ�먯땐�꾧툑/�ㅼ씠踰꾨쭏�쇰━吏�';
                document.getElementById( 'price_detail_pmoney' ).innerHTML = '- ' + instant_mileage_used + '��';
            }else {
                document.getElementById( 'instant_mileage_used' ).innerHTML = '�곷┰湲덉궗��';
                document.getElementById( 'price_detail_pmoney' ).innerHTML = '- ' + price_detail_pmoney + '��';
            }
            document.getElementById( 'price_detail_real' ).innerHTML = price_detail_real + '��';
            document.getElementById( 'instant_sale_price' ).innerHTML = '- ' + instant_sale_price + '��';
            document.getElementById( 'add_sale_price' ).innerHTML = '- ' + add_sale_price + '��';
            document.getElementById( 'ship_fee' ).innerHTML = ship_fee + '��';
            document.getElementById( 'price_detail_naver_cash' ).innerHTML = (iNaverCash > 0) ? '- ' + naver_cash_used + '��' : '0';

            var tmpX = event.clientX + document.body.scrollLeft;
            var tmpY = event.clientY + document.body.scrollTop;

            document.getElementById( 'price_detail_main' ).style.left = tmpX - 350 + 'px' ;
            document.getElementById( 'price_detail_main' ).style.top = tmpY - 20 + 'px' ;
            document.getElementById( 'price_detail_main' ).style.display = '' ;

            var sNaverMileageStr = new String();
            var sNaverAddRateStr = new String();
            if(iNaverMileage > 0){
                sNaverMileageStr = '- ' + naver_used_point + '��';
            } else {
                sNaverMileageStr = '0';
            }

            if (iNaverSaveRate > 0) {
                sNaverAddRateStr = iNaverSaveRate + '% �곷┰ / ';
            }
            document.getElementById('price_detail_naver_point').innerHTML = sNaverAddRateStr + sNaverMileageStr;

        } catch ( e ) {}

        try {
            if ( hobj_box )  {
                pRiceDetailCtl.color_org = hobj_box.style.backgroundColor;
                hobj_box.style.backgroundColor = '#EFEFEF' ;
            }
        } catch (e) {}

    },
    off : function ( hobj_box )
    {
        if ( hobj_box )
        {
            hobj_box.style.backgroundColor = pRiceDetailCtl.color_org ;
        }
        try {
            this.checkouticon(hobj_box, 'none');
            document.getElementById( 'price_detail_main' ).style.display = 'none' ;

        } catch ( e ) {}
    },
    /**
     *  i18n �ъ슜�섏� �딅뒗寃껋삤瑜� 蹂댁뿬�� __() <- �쇱씠釉뚮윭由� �곸슜�쒗궎吏� �딆쓬
     *  留덉슦�� �ㅻ쾭�� �ㅼ씠踰� �섏씠 �꾩씠肄� �몄텧
     *  ��긽 蹂댁뿬吏��� 嫄몃줈 �섏젙 2010-10-20 jykim
     */
    checkouticon : function (oObj, sKind, iCheckoutOldNo)
    {

        if (sKind == 'NCHECKOUT' && document.getElementById("checkout_layer") == null) {
            var oTmpLayer = document.createElement("div");
            oTmpLayer.setAttribute("id", "checkout_layer");
            if(iCheckoutOldNo == 'T'){
                oTmpLayer.style.cssText = "position:absolute; margin-left:5px; width:70px; height:20px; padding:5px; border:1px #33CC00 solid; background-color:#66FF00; text-align:center;";
                oTmpLayer.innerHTML = "�ㅼ씠踰� �섏씠";
            }else{
                oTmpLayer.style.cssText = "position:absolute; margin-left:5px; width:200px; height:20px; padding:5px; border:1px solid; background-color:#FF0000; text-align:center;";
                oTmpLayer.innerHTML = "�ㅼ씠踰꾩꽱�곗뿉�� 吏곸젒泥섎━�댁＜�몄슂";
            }
            oObj.appendChild(oTmpLayer);
        } else if (document.getElementById("checkout_layer") != null) {
            oObj.removeChild(document.getElementById("checkout_layer"));
        }

    }
};

/*
�ㅽ겕濡� �곕씪 �ㅻ땲�� 踰좊꼫瑜� �꾪븳 �ㅽ겕由쏀듃
*/
function initMoving(target, position, topLimit, btmLimit) {
    if (!target)
        return false;
    var obj = target;
    obj.initTop = position;
    obj.topLimit = topLimit;
    obj.bottomLimit = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - btmLimit - obj.offsetHeight;

    obj.style.position = "absolute";
    obj.top = obj.initTop;
    // obj.left = obj.initLeft;

    if (typeof(window.pageYOffset) == "number") {   //WebKit
        obj.getTop = function() {
            return window.pageYOffset;
        };
    } else if (typeof(document.documentElement.scrollTop) == "number") {
        obj.getTop = function() {
            return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        };
    } else {
        obj.getTop = function() {
            return 0;
        };
    }

    if (self.innerHeight) { //WebKit
        obj.getHeight = function() {
            return self.innerHeight;
        };
    } else if (document.documentElement.clientHeight) {
        obj.getHeight = function() {
            return document.documentElement.clientHeight;
        };
    } else {
        obj.getHeight = function() {
            return 500;
        };
    }

    obj.move = setInterval(function() {
        if (obj.initTop > 0) {
            pos = obj.getTop() + obj.initTop;
        } else {
            pos = obj.getTop() + obj.getHeight() + obj.initTop;
            //pos = obj.getTop() + obj.getHeight() / 2 - 15;
        }

        if (pos > obj.bottomLimit)
            pos = obj.bottomLimit;
        if (pos < obj.topLimit)
            pos = obj.topLimit;

        interval = obj.top - pos;
        obj.top = obj.top - interval / 3;
        obj.style.top = obj.top + "px";
    }, 30);
};
/**
 * jQuery Loader
 * Author : Jae-Kwang Lee <jklee02@simplexi.com>
 * Description : Dynamic load jquery library
 * Since : 2012. 07. 10
 * Usage :
 *
 * jQueryOnload(function() {
 *     // any code that executed after jquery is loaded
 *
 *     // If 'prototype' is already loaded in page, $ object refer to 'prototype'
 *     // So, if you want to use jquery safely, see http://docs.jquery.com/Using_jQuery_with_Other_Libraries
 * });
 *
 **/

(function() {
    var callback = function() { if (typeof window.jqcb != 'function') { return; } window.jqcb(); };

    function loadJs(src, callback) {
        var script = document.createElement('script'),
            isIE = /*@cc_on!@*/false,
            head = document.getElementsByTagName('HEAD').item(0),
            src = src || '';

        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', src);

        if (isIE) {
            script.onreadystatechange = function() {
                if (this.readyState == 'complete' || this.readyState == 'loaded')  {
                    callback();
                }
            }
        } else {
            script.onload = callback;
        }

        head.appendChild(script);
    }

    window.jQueryOnload = function(func) {
        var old = window.jqcb;

        if(typeof window.jqcb != 'function') {
            window.jqcb = func;
        } else {
            window.jqcb = function() {
                old();
                func();
            }
        }
    };

    var sImgDomain = (typeof CAFE24.GLOBAL_INFO !== "undefined" && CAFE24.GLOBAL_INFO.isGlobal() === true) ? 'skin.cafe24img.com' : 'img.echosting.cafe24.com';
    loadJs('//' + sImgDomain + '/js/jquery-1.7.2.min.js', callback);

    jQueryOnload(function(){
        jQuery.noConflict();

        if (typeof $ != 'function') $ = jQuery;
    });
})(); // end of jQuery Loader


//i18n �ъ슜�섏� �딅뒗寃껋삤瑜� 蹂댁뿬 __() <- �쇱씠釉뚮윭由� �곸슜�쒗궎吏� �딆쓬
function alertAuthExcel()
{
    alert("�묒��ㅼ슫 諛� 愿�由� 沅뚰븳�� �놁뒿�덈떎.\n愿�由ъ옄�먭쾶 臾몄쓽�� 二쇱꽭��.");
}