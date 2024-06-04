//전역변수
let svgTimer;

$(function() {
    let userAgent = navigator.userAgent.toLowerCase();

    //ios(아이폰, 아이패드, 아이팟) 전용 css 적용
    if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 || userAgent.indexOf("ipod") > -1) {
        let cssIosLink = document.createElement("link");

        cssIosLink.href = "css/style-ios.css";
        cssIosLink.async = false;
        cssIosLink.rel = "stylesheet";
        cssIosLink.type = "text/css";

        document.head.appendChild(cssIosLink);
    }

    //리사이즈
    $(window).resize(function() {
        //모바일에서 100vh 오류 해결방법
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    //모바일에서 100vh 오류 해결방법
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    //로딩시 홈 메뉴 클릭
    $("nav.nav .n-list").each(function() {
        moveMenu($(this).children("li").eq(0));
    });

    //페이지 스크롤시
    $(".c-page").scroll(function() {
        //위로가기 버튼 보이기&숨기기
        if ($(this).scrollTop() > 100) {
            $(".scrollup-btn").fadeIn("slow");
        } else {
            $(".scrollup-btn").fadeOut("slow");
        }
    });
});

//메뉴 클릭시 페이지 이동
function moveMenu(obj) {
    clearInterval(svgTimer);

    let dataMenu = $(obj).attr("data-menu");
    let postItDelay = 0;
    let svgObj = {};

    $(".c-page").stop().scrollTop(0);

    $("nav.nav .n-list").children("li").removeClass("on");
    $(obj).addClass("on");

    $(".c-page-item").removeClass("on");
    $(".c-page-" + dataMenu).addClass("on");

    $(".c-page-item").find(".post-it-item").removeClass("on");
    $(".c-page-item").find(".post-it-item").stop().css({"top":"-10px", "opacity":"0"});

    if (dataMenu == "home") {
        $(".c-page-" + dataMenu).find(".home-img").find("svg").each(function(index) {
            let dataFills = $(this).attr("data-fills");
            let dataOriginalFill = $(this).attr("data-original-fill");
            
            //svg 기본색 설정
            if (dataOriginalFill != undefined && dataOriginalFill != null) {
                $(this).find("*[data-fill='change']").attr("fill", dataOriginalFill);
            }

            if (dataFills != undefined && dataFills != null) {
                let svgFillsArr = dataFills.split('|');

                if (svgFillsArr.length > 0) {
                    svgObj[index] = {
                        'svgItemObj': $(this),
                        'svgFillsArr': svgFillsArr,
                        'svgFillsIdx': 0
                    };
                }
            }
        });

        //svg 변경할 색 설정
        if (Object.keys(svgObj).length > 0) {
            svgTimer = setInterval(function() {
                $.each(svgObj, function(idx, el) {
                    el.svgItemObj.find("*[data-fill='change']").attr("fill", el.svgFillsArr[el.svgFillsIdx]);
                    el.svgFillsIdx = (el.svgFillsIdx < (el.svgFillsArr.length - 1)) ? el.svgFillsIdx + 1 : 0;
                });
            }, 4000);
        }
        
    } else if (dataMenu == "about") {
        //기술 레벨 설정
        $(".c-page-" + dataMenu).find(".level-list").each(function() {
            let dataLevel = $(this).attr("data-level");
            let levelHtml = "";

            dataLevel = ($.isNumeric(dataLevel)) ? dataLevel : 0;

            for (let i=0; i<5; i++) {
                levelHtml += "<li class='" + (i < dataLevel ? "on" : "") + "'></li>";
            }

            $(this).html(levelHtml);
        });
    } else if (dataMenu == "work") {
        $(".c-page-" + dataMenu).find(".work-list").children("li").each(function() {
            let dataTitle = $(this).closest(".work-item").attr("data-title");
            let dataName = $(this).attr("data-name");
            let dataBackground = $(this).attr("data-background");
            let imgSrc = "img/img-work-0.svg";
            let scrollFlag = true;

            //프로젝트별 배경색 설정
            dataBackground = (dataBackground != undefined && dataBackground != null) ? dataBackground : "#e48db0";

            $(this).css({"background-color":dataBackground});
            
            $(this).find("button").each(function(idx) {
                if (idx == 0) {
                    $(this).css({"background-color":dataBackground, "border-color":dataBackground});
                }
            });

            //프로젝트별 이미지 설정
            if (dataTitle != undefined && dataName != undefined) {
                if (dataTitle == "ilark") {
                    if (dataName == "pixstory" || dataName == "bluephoto" || dataName == "yellowkit" || dataName == "bizcard") {
                        imgSrc = "../siteimg/" + dataTitle + "/intro/" + dataName + "-pc.png";
                    } else if (dataName == "blueapp") {
                        imgSrc = "../siteimg/" + dataTitle + "/intro/" + dataName + "-mobile.png";
                    }

                    scrollFlag = false;
                } else {
                    if (dataName == "safeparking" || dataName == "daehong" || dataName == "redbus" || dataName == "digitalnomad") {
                        imgSrc = "../siteimg/" + dataTitle + "/intro/" + dataName + "-member-onepage.png";
                    } else {
                        imgSrc = "../siteimg/" + dataTitle + "/intro/" + dataName + "-onepage.png";
                    }

                    if (dataName == "agile" || dataName == "jejuschool-admin2" || dataName == "incheonbus-admin" || dataName == "incheonbus-member" || dataName == "water" || dataName == "riverplatform2" || dataName == "agaya" || dataName == "portfolio3") {
                        scrollFlag = false;
                    }
                }

                if (scrollFlag) {
                    $(this).find(".work-img").addClass("scroll-img");
                } else {
                    $(this).find(".work-img").removeClass("scroll-img");
                }
            }

            $(this).find(".work-img").html("<img src='" + imgSrc + "' alt='" + dataName + "'>");

            //이미지 스크롤 설정
            $(this).find(".scroll-img").hover(function() {
                let imgWidth = $(this).find("img").width();
                let imgHeight = $(this).find("img").height();
                let scrollTime = Math.round((imgHeight / imgWidth) * 2500);
                
                $(this).stop().animate({scrollTop: $(this).find("img").height()}, scrollTime);
            }, function() {
                $(this).stop().animate({scrollTop: 0}, 1000);
            });
        });
    }

    if (dataMenu == "work") {
        $(".c-page-" + dataMenu).find(".work-list").each(function() {
            $(this).find(".post-it-item").stop().delay(postItDelay).animate({"top":"0", "opacity":"1"}, function() {
                $(this).addClass("on");
            });
    
            postItDelay = postItDelay + 1000;
        });
    } else {
        $(".c-page-" + dataMenu).find(".post-it-item").each(function() {
            $(this).stop().delay(postItDelay).animate({"top":"0", "opacity":"1"}, function() {
                $(this).addClass("on");
            });
    
            postItDelay = postItDelay + 1000;
        });
    }
}

//위로가기 버튼 클릭시 위로 이동
function scrollUp() {
    $(".c-page").stop().animate({scrollTop: 0}, 1000);
}

