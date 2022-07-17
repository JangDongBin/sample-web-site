
var allcheckbox = false;
function checkAllCheckbox( form, box_name,checkvalue){

	allcheckbox = !allcheckbox;
	
	if(checkvalue == 1)
	allcheckbox = true;
	else if(checkvalue == 0)
	allcheckbox = false;

	for( var i = 0; i < form.length; i++ )
	{
		var e = form.elements[i];

		if(e.name == box_name)
		{
			e.checked = allcheckbox;
		}
	}

	return;
}

function deleteOptions(id) {
    var models = document.getElementById(id);
    while(models.childNodes.length > 0) {
        models.removeChild(models.childNodes[0]);
    }
}

function checkForm( form, checkElement, checkMsg )
{
	for( var i = 0; i < form.length; i++ )
	{
		for( var j = 0; j < checkElement.length; j++ )
		{
			if( form[i].name == checkElement[j] && form[i].value == "" )
			{
				alert( checkMsg[j] );
				form[i].focus();
				return false;
			}
		}
	}
	
	return true;
}

function isValidId(strId) {
   var comp="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ*";
   var strIdLen=strId.length;
   var IdChk=1;
   if(strIdLen < 4 || strIdLen > 12) {
		return false;
   }
   for(i=0;i < strIdLen;i++) {
	  if(comp.indexOf(strId.substring(i,i+1)) < 0) {
         IdChk=0;
      }
   }
   if (IdChk == 1) {
      return true;
   } else {
      return false;
   }
}
function CheckEmail(str){
	var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	if(!reg_email.test(str)){
		return false;
	}
	else{
		return true;
	}
}

/*
* 리스트 체크 박스 검사
*/
function checkListCheckBox( form, box_name, check_limit ){
	var box_count = 0;
	var check_nums = form.elements.length;

	for( var i = 0; i < check_nums; i++ )
	{
		if( form.elements[i].checked == true && form.elements[i].name == box_name)
		{
			box_count++; 
		}
	}

	//## 선택 개수 제한
	if(box_count > check_limit && check_limit > 0)
	{ 
		alert( check_limit+"개만 선택하세요." ); 
		return false; 
	} 

	//## 선택 개수 체크
	if( box_count <= 0 ){
		return false; 
	}
	else
	{
		return true;
	}
}


function autoCommaObj(cls) {
	var moneyorg = cls.value
	var moneyorglen = moneyorg.length;      
	if (moneyorg.substr(0,1) == "0"){
		moneyorg = moneyorg.substr(1,moneyorglen);
	}      
	moneyorglen--;
	money = "";
	var moyo = "";
	var y = 0;
	for (var x=moneyorglen; x>=0; x--){
		moyo = moneyorg.charAt(x);
		if (moyo != ","){
			if (y%3 == 0 && y != 0){
				money = moyo + "," + money;
				y++;
			} 
			else {
				money = moyo + money;
				y++;
			}
		}
	} 
	cls.value = money; 
} 
 
 
function submitMultiCheckboxForm( form, url, boxName, noSelMsg, confirmMsg )
{
	var flag = checkListCheckBox( form, boxName, 0 );
	if( !flag  ){
		alert( noSelMsg );	}
	else{
 
		if(confirmMsg!="" && !confirm( confirmMsg ) ){
			return;
		}
 
		form.action = url;
		form.submit();
	}
}


 
 
function addOptionToSelect( selectBox, text, value )
{
	var form = selectBox.form;
	
	// 새로운 Option 생성
    var newOpt = document.createElement('OPTION');
    newOpt.text = text;
	newOpt.value = value;
	
    form.elements[selectBox.name].add(newOpt);	
}

 
 
 

function checkNum(){

	if( event.keyCode < 48 || event.keyCode > 57 || event.keyCode == 189 || event.keyCode == 109 )
	{
		event.keyCode = '';
		alert('숫자외 다른 문자는 입력할 수 없습니다.');
		return;
	}
}

  
function spacexf(obj){
	if (obj.value == "" || obj.value.replace(/(^ +)|( +$)/g,'') == "" ){
		obj.value = "";
		return false;
	}
	return true;
}	

function jquery_spacexf(obj){
	if (obj.val() == "" || obj.val().replace(/(^ +)|( +$)/g,'') == "" ){
		obj.val("");
		return false;
	}
	return true;
}	

function checkChr(code) {   
    if((code<48) || (code > 57)){   
        event.returnValue = false; 
    }  
} 
function checkChrCommaSign(code) {
    if((code<48 || code > 57 )&& code!=46 && code!=45 && code!=43){   
        event.returnValue = false; 
    }  
} 



function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (var i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}


function urlencode(str) {
	str = (str + '').toString();
	return encodeURIComponent(str)
		.replace(/!/g, '%21')
		.replace(/'/g, '%27')
		.replace(/\(/g, '%28')
		.replace(/\)/g, '%29')
		.replace(/\*/g, '%2A')
		.replace(/%20/g, '+');
}

function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}
 
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}
 
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}


function getMonthStr(myDate){
	month = myDate.getMonth() + 1;
	month = month >= 10 ? month : '0' + month;
	return (myDate.getFullYear() + '-' + month);
}

function getMonth(cdate,symbol) {
	var d = new Date(cdate)
	if(symbol == "pre_month"){
		var monthOfYear = d.getMonth();
		d.setMonth(monthOfYear - 1);
	}
	else if(symbol == "next_month"){
		var monthOfYear = d.getMonth();
		d.setMonth(monthOfYear + 1);
	}
	else if(symbol == "pre_year"){
		var monthOfYear = d.getFullYear();
		d.setYear(monthOfYear - 1);
	}
	else if(symbol == "next_year"){
		var monthOfYear = d.getFullYear();
		d.setYear(monthOfYear + 1);
	}	
	
	return getMonthStr(d)
}

function getDateStr(myDate){
	month = myDate.getMonth() + 1;
	month = month >= 10 ? month : '0' + month;
	
	date = myDate.getDate();
	date = date >= 10 ? date : '0' + date;

	return (myDate.getFullYear() + '-' + month + '-' + date);
}
function getDate(cdate,symbol) {
	var d = new Date(cdate);
 
	if(symbol == "pre_date"){
		var monthOfYear = d.getDate();
		d.setDate(monthOfYear - 1);
	}
	else if(symbol == "next_date"){
		var monthOfYear = d.getDate();
		d.setDate(monthOfYear + 1);
	}
	else if(symbol == "pre_month"){
		var monthOfYear = d.getMonth();
		d.setMonth(monthOfYear - 1);
	}
	else if(symbol == "next_month"){
		var monthOfYear = d.getMonth();
		d.setMonth(monthOfYear + 1);
	}	
	
	return getDateStr(d)
}

function isMobile(phoneNum) {
	var regExp =/(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
	var myArray; 
	if(regExp.test(phoneNum)){ 
		myArray = regExp.exec(phoneNum); 
		// console.log(myArray[1]); 
		// console.log(myArray[2]); 
		// console.log(myArray[3]); 
		return true; 
	} 
	else {
		return false; 
	} 
}
