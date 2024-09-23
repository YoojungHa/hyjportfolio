$(function(){
    Splitting();
 })

 // 스크롤시 nav 숨기고 나타나게 하기
 $(function(){
    var prevScrollTop = 0;
    document.addEventListener('scroll', function(){
        var nowScrollTop = $(window).scrollTop();

        if(nowScrollTop > prevScrollTop){
            $('header nav').addClass('active');
        } else {
            $('header nav').removeClass('active');
        }
        prevScrollTop = nowScrollTop;
    })
 })


 // section01 - software 진행률 애니메이션
 function progress() {
    const progressContainers = document.querySelectorAll('.progress-container');
    
    progressContainers.forEach((container) => {
        const progressCircle = container.querySelector('.progress-circle');
        const progress = container.getAttribute('data-progress'); // 진행률 가져오기

        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        progressCircle.style.strokeDasharray = `${circumference}`;
        progressCircle.style.strokeDashoffset = `${circumference}`;

        function setProgress(percent) {
            const offset = circumference - (percent / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }

        setProgress(progress); // 각 원에 대해 설정된 진행률 적용
    });
};

// section01에서 software 진행 애니메이션 재생되게 하기
$(window).scroll(function(){
    let scrT = $(window).scrollTop();
    let sec1Top = $('#section01').offset().top;
    if(scrT >= sec1Top) {
        progress()
    }
})


// #section02 gsap (원 커지는거)

gsap.registerPlugin(ScrollTrigger);
// mainCir
$(function(){
    gsap.timeline({
        scrollTrigger:{
            trigger:'#section02',
            start:'0% 50%',
            end:'30% 0%',
            scrub:1,
            // markers:true
        }
    })
    .fromTo('.mainCir',{'width':'0','height':'0','duration':'10','ease':'elastic','top':'3%'},{'width':'2500px','height':'2500px','duration':'10','top':'40%'},0)

    // textBox
    gsap.timeline({
        scrollTrigger:{
            trigger:'#section02 .textBox',
            start:'0% 80%',
            end:'100% 80%',
            scrub:1,
            // markers:true
        }
    })
    .fromTo('#section02 .textBox',{'top':'60%','duration':'5','ease':'elastic','opacity':'0'},{'duration':'5','ease':'none','opacity':'1','top':'50%'},0)

    // #section3 gsap (카드 네개 순서대로 올라오는거)

    $(function(){
        gsap.timeline({
            scrollTrigger:{
                trigger:'#section03 ul',
                start:'-40% 90%',
                end:'20% 130%',
                scrub:2,
                // markers:true
            }
        })
        .to('#section03 li:nth-child(1)', {y:'-500px', duration:1, ease:'none'}, 0.2)
        .to('#section03 li:nth-child(2)', {y:'-500px', duration:1, ease:'none'}, 0.4)
        .to('#section03 li:nth-child(3)', {y:'-500px', duration:1, ease:'none'}, 0.6)
        .to('#section03 li:nth-child(4)', {y:'-500px', duration:1, ease:'none'}, 0.8)
    })
})

// section03 sign svg
$(window).scroll(function(){
    let scrT2 = $(window).scrollTop();
    let sec3Top = $('#section03').offset().top;
    if(scrT2 >= sec3Top) {
        $('#section03 svg').addClass('on')
    }
})


// #section05 웹 (PC) 이미지 호버 애니메이션
$(function(){
    $('.screen').mouseover(function(){
        let imgH = $(this).find('img').height();
        let scrH = $(this).outerHeight();
        
        $(this).find('img').css({top:- imgH + scrH})
    })
    
    $('.screen').mouseout(function(){
        $(this).find('img').css({top:0})
    });
})

// #section05 웹 (mobile) 이미지 호버 애니메이션
$(function(){
    $('.mo_screen').mouseover(function(){
        let imgH = $(this).find('.mo_cont').height();
        let scrH = $(this).outerHeight();
        
        $(this).find('.mo_cont').css({top:- imgH + scrH})
    })
    
    $('.mo_screen').mouseout(function(){
        $(this).find('.mo_cont').css({top:0})
    });
})


$(function(){
    $('.animate').scrolla({
        mobile:true,
        once:false
    })
})

// splitting

$(function(){Splitting();})

$(function(){
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('#section05 section').forEach((section, i) => {
        ScrollTrigger.create({
            trigger:section,
            start:'top top',
            end: '100% top',
            pin: true,
            pinSpacing:false,
            // markers:true
        })
    })
    
    // ScrollTrigger.create({
    //     snap:1 / (section.length -1)
    // })

})


// $('.mockup01 .link li').eq(1).click(function(){
//     $('.viewDetail .FCseoul').show();
// })


// section09 popup slide

//scroll animation
$(function(){
    $('.animate').scrolla({
        mobile:true,
        once:false
    })
})

$(function(){
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
        '(min-width:1024px)' : function(){
            //popup 가로 스크롤
            let list = gsap.utils.toArray('#section09 ul li');
            let scrollTween = gsap.to(list, {
                xPercent:-100 * (list.length -1),
                ease:'none',
                scrollTrigger:{
                    trigger:'#section09',
                    pin:true,
                    scrub:1,
                    start:'center center',
                    end:'300%',
                    // markers:true
                }
            });

            //.imgBox 모션
            gsap.utils.toArray('.imgBox').forEach(function(imgBox){

                //imgBox 가 커지는 애니메이션
                gsap.timeline({
                    scrollTrigger:{
                        trigger:imgBox,
                        containerAnimation:scrollTween,
                        start : 'center right',
                        end:'center center',
                        scrub:true,
                        // markers:true
                    }
                })
                .to(imgBox, {'clip-path':'inset(0%)', ease:'none', duration:1}, 0)

                //imgBox가 작아지는 애니메이션
                gsap.timeline({
                    scrollTrigger:{
                        trigger:imgBox,
                        containerAnimation:scrollTween,
                        start:'center center',
                        end:'center left',
                        scrub:true,
                        // markers:true
                    }
                })
                .to(imgBox, {'clip-path':'inset(30%)', ease:'none', duration:1},0)
            });            

        }
    })
})

// section10 detail page 제목 애니메이션

$(function(){
    gsap.timeline({
        scrollTrigger:{
            trigger:'#section10',
            start:'0% 100%',
            end:'0% 20%',
            scrub:1,
            // markers:true
        }
    })
    .fromTo('#section10 .title .a', {x:'-100%'}, {x:'0%', ease:'none', duration:5},0)
    .fromTo('#section10 .title .b', {x:'100%'}, {x:'0%', ease:'none', duration:5},0)

    .to('#section10 .title', {position:'fixed', ease:'none', left:'0', top:'40%', width:'100%', duration:5},0)

    gsap.timeline({
        scrollTrigger:{
            trigger:'#section10 ul',
            start:'100% 50%',
            end:'100% 0%',
            scrub:1,
            // markers: true
        }
    })
    .to('#section10 .title .a', {x:'-100%', ease:'none', duration:5},0)
    .to('#section10 .title .b', {x:'100%', ease:'none', duration:5},0)
})




