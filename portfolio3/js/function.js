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

    //위로가기 버튼 클릭시
    $(".scrollup-btn").click(function() {
        $(".c-page").stop().animate({scrollTop: 0}, 1000);
    });
});

//메뉴 클릭시 페이지 이동
function moveMenu(obj) {
    let dataMenu = $(obj).attr("data-menu");
    let postItDelay = 0;

    $(".c-page").stop().scrollTop(0);

    $("nav.nav .n-list").children("li").removeClass("on");
    $(obj).addClass("on");

    $(".c-page-item").removeClass("on");
    $(".c-page-" + dataMenu).addClass("on");

    $(".c-page-item").find(".post-it-item").removeClass("on");
    $(".c-page-item").find(".post-it-item").stop().css({"top":"-10px", "opacity":"0"});

    if (dataMenu == "about") {
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
            let dataColor = $(this).attr("data-color");
            let imgSrc = "img/img-panda-0.svg";
            let scrollFlag = true;

            //프로젝트별 배경색과 글자색 설정
            dataBackground = (dataBackground != undefined && dataBackground != null) ? dataBackground : "#6d9886";
            dataColor = (dataColor != undefined && dataColor != null) ? dataColor : "#26352f";

            $(this).css({"background-color":dataBackground, "color":dataColor});
            $(this).find(".tag-list").children("li").css({"border-color":dataColor, "color":dataColor});
            
            $(this).find("button").each(function() {
                $(this).hover(function() {
                    if ($(this).prop("disabled") == false) {
                        $(this).css({"background-color":dataColor, "color":"#ffffff"});
                    } else {
                        $(this).css({"background-color":"#ffffff", "border-color":dataColor, "color":dataColor});
                    }
                }, function() {
                    $(this).css({"background-color":"#ffffff", "border-color":dataColor, "color":dataColor});
                });
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
                let scrollTime = Math.round(imgHeight / imgWidth) * 3000;
                
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
