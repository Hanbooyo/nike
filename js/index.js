$(function () {
    let winWidth;
    $(window).resize(function () { //resize 창크기 변경 이벤트가 발생했을때 (function 수행)
        winWidth=$(this).width();
        console.log(winWidth);
        if(winWidth <= 1024) {
            $('.main-menu').off('mouseenter');
            $('.main-menu').off('mouseleave');  //이벤트 제거
            $('nav').prependTo('.h-top'); // resize 작업이 최초 실행시 적용안되는 단점이 있음. 이를 해결하기 위해선? trigger로 강제이벤트 수행
            $('.jordan-logo').find('img').attr('src','images/AIR-JORDAN-LOGO-b.svg'); //그 안에서 찾는다.
        }else {
            $('nav').appendTo('header');
            $('.jordan-logo').find('img').attr('src','images/AIR-JORDAN-LOGO.svg');
            $('.main-menu').on({
                mouseenter: function() {
                    $('.sub-menu, .sub-bg').stop().show(); //variation은 맘대로
                },
                mouseleave: function() {
                    $('.sub-menu, .sub-bg').stop().hide();
                }
            });
        }
    }); //resize 영역 종료
    $(window).trigger('resize'); // resize 작업이 최초 실행시 적용안되는 오류 상쇄
    $('.menu-btn').click(function(event) {
        event.stopPropagation(); // 내 부모한테까지 이벤트 전달을 막는것.
        $('.index-wrap').css('filter','blur(10px)');
        $('body','html').css({
            height:'100vh',
            overflow:'hidden'  
        }); //이걸 안하면 이상태에서 드래그 되기떄문에, 스크롤을 막으려고 설정
        $('.menu-area').show();
        $('.h-top').animate({
            right:'0%'
        },'fast')
    });// 태블릿, 모바일에서 사용하는 메뉴
    $('.main-menu>li>a').click(function(event) {
        event.stopPropagation();
        $(this).siblings('.sub-menu').animate({  //.main-menu>li>a 의 (this)자신의 siblings 형제(동급)중에서 .sub-menu인 애들한테 animate
            left:'0%'
        },'fast');
    });
    $('.all> a').click(function(event) {
        event.stopPropagation(); //(부모한테 이벤트전달 안한다는 이유는, 나도 부모의 영역의 일부이기떄문에, 나를 클릭했을때 부모의 이벤트가 활성화 되는것을 막는다)
        $(this).parents('.sub-menu').animate({ //parents 는 부모 포함 조부모까지 s
            left:'150%'
        },'fast');
    });
    $('.menu-area').click(function() {
        $('.index-wrap').css('filter','blur(0)');
        $('body','html').css({
            height:'auto',
            overflow:'visible'  
        }); 
        $('.h-top').animate({
            right:'-100%'
        },'fast',function() {
            $('.menu-area').hide();
        })
    });

    if(winWidth<=480) {
        $('.main-01 img').attr('src','images/M-01-mobile.png');
        $('.main-02 img').attr('src','images/M-02-mobile.png');
        $('.main-03 img').attr('src','images/M-03-mobile.png');
    }else {
        $('.main-01 img').attr('src','images/M-01.png');
        $('.main-02 img').attr('src','images/M-02.png');
        $('.main-03 img').attr('src','images/M-03.png');
    }

    //스와이퍼 플러그인
    let swiperSlide=new Swiper('.Featyred-slide', {
        //모바일 기준
        slidesPerView:'auto', //한 화면에 들어오는 사진의 숫자 (auto로 한 이유는)
        spaceBetween: 8, // 여백 8
        pagination: {
            el:'.f-pager', //
            clickable : true, //f-pager 를 클릭가능하게
            type:'fraction' // factcion 좌우  bullets  원형버튼
        },
        navigation: {
            prevEl:'.f-prev', //이전으로는 버튼은 얘로 할꺼다.
            nextEl:'.f-next'  //다음으로가는 버튼은 얘로 할꺼다.
        },
        //반응형
        breakpoints: {
            1025: {
                slidesPerView : 3,
                spaceBetween : 24
            },
            480: {
                slidesPerView : 'auto',
                spaceBetween : 24
            }
        }

            
    });
});