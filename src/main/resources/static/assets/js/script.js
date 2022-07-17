$(document).ready(function() {
	$(".gnb li").hover(function() {
		$(this).find(".depth2").show();
	} , function() { 
		$(this).find(".depth2").hide(); 
	});
	
	
});

/* setCookie */
function setCookie(name, data){
    var date = new Date();
    
    if(data){
        date.setDate(date.getDate() + 1);
    } else {
        date.setDate(date.getDate() - 1);
    }

    var willCookie = "";
    willCookie += name + "=" + data + ";";
    willCookie += "path=/;";
    willCookie += "expires=" + date.toUTCString();

    document.cookie = willCookie;
}

$(document).ready(function(){ 




	
		$(".gnb .brand").on("mouseenter",function(e){
			//$(".wrap_header").stop().animate({"height":340});
				$(".wrap_header").addClass("on");
				$(".wrap_header .list_brand").addClass("on");
				$(".wrap_header .bg").addClass("on");

		})
		$(".wrap_header .bg").on("mouseleave",function(e){
			//$(".wrap_header").stop().animate({"height":70});
				$(".wrap_header").removeClass("on");
					$(".wrap_header .list_brand").removeClass("on");
					$(".wrap_header .bg").removeClass("on");
		})
			$(".wrap_header .menu").on("mouseenter",function(e){
				//$(".wrap_header").stop().animate({"height":70});
				$(".wrap_header").removeClass("on");
					$(".wrap_header .list_brand").removeClass("on");
					$(".wrap_header .bg").removeClass("on");

		})

			/*$(".gnb_m .brand").on("click",function(e){
				$(".list_brand").addClass("on");
				$(".wrap_gnb").addClass("on");
				$(".wrap_header").addClass("on");

				

		})
			$(".m_open").on("click",function(e){
				$(".list_brand").removeClass("on");
				$(".wrap_gnb").removeClass("on");
				$(".wrap_header").removeClass("on");

				

		})*/
		$('.btn_down').click(function(){
				$('html, body').animate({
					scrollTop: $( $(this).attr('href') ).offset().top
				}, 500);
				return false;
			});
		var select = $("select.color");
    
    select.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });

	
	

});  

$(document).ready(function(){
	/*$('.section_main.section1 .num').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 5000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});*/


   $('.m_open').on('click',function(){
        $('nav').css('display','block');
        setTimeout(function(){
            $('nav').addClass('on');
			$('body').addClass('on');
        },50);
   })
   $('.m_close').on('click',function(){
        $('nav').removeClass('on');
		$('body').removeClass('on');
        setTimeout(function(){
            $('nav').css('display','none');
            $('.m_menu .big').removeClass('on');
            if($(window).width() < 1200){
                $('.m_menu .sub').slideUp('fast');
            }
        },400);
   })


$(".big").attr("href", "#");


   $('.m_menu .big').on('click',function(){
       $('.m_menu .big').removeClass('on');
       $('.m_menu .sub').slideUp('fast');
       $(this).addClass('on');
       $(this).next().slideDown('fast');
   })

	 


   

})

 function setupLabel() {
        if ($('.label_check input').length) {
            $('.label_check').each(function(){ 
                $(this).removeClass('c_on');
            });
            $('.label_check input:checked').each(function(){ 
                $(this).parent('label').addClass('c_on');
            });                
        };
        if ($('.label_radio input').length) {
            $('.label_radio').each(function(){ 
                $(this).removeClass('r_on');
            });
            $('.label_radio input:checked').each(function(){ 
                $(this).parent('label').addClass('r_on');
            });
        };
    };
    $(document).ready(function(){
        $('body').addClass('has-js');
        $('.label_check, .label_radio').click(function(){
            setupLabel();
        });
        setupLabel(); 
    });
