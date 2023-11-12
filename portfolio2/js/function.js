/**
 * @author minks
 */

//상품 정보 배열에 담기
var goodsArray = new Array();
goodsArray["ACCESSORY1"] = "소토토로 머리끈/12,000";
goodsArray["ACCESSORY2"] = "구로스케 머리끈/12,000";
goodsArray["ACCESSORY3"] = "우산 토토로 귀걸이/22,400";
goodsArray["ACCESSORY4"] = "대토토로 감귤 귀걸이/21,000";
goodsArray["ACCESSORY5"] = "시소 넥타이핀/63,000";
goodsArray["ACCESSORY6"] = "앤틱 넥타이핀/63,000";
goodsArray["ACCESSORY7"] = "토토로 레이스팔찌/16,800";
goodsArray["ACCESSORY8"] = "소토토로 레이스팔찌/16,800";
goodsArray["ACCESSORY9"] = "대토토로 포인트반지/16,800";
goodsArray["ACCESSORY10"] = "소토토로 포인트반지/16,800";
goodsArray["ACCESSORY11"] = "소토토로 반지/21,000";
goodsArray["ACCESSORY12"] = "토토로 낙엽 반지/21,000";

goodsArray["BAG1"] = "대토토로 배낭/53,000";
goodsArray["BAG2"] = "대토토로 스마일 배낭/53,000";
goodsArray["BAG3"] = "우산 토토로 손가방/19,000";
goodsArray["BAG4"] = "토토로 그린 도트백/39,000";
goodsArray["BAG5"] = "네잎클로버 도트백/32,000";
goodsArray["BAG6"] = "꽃과 나무열매 도트백/44,000";
goodsArray["BAG7"] = "산책 토토로 배낭/35,000";
goodsArray["BAG8"] = "아웃도어 프로덕트 백팩/137,000";
goodsArray["BAG9"] = "토토로 꽃축제 여권케이스/32,500";
goodsArray["BAG10"] = "레트로 에코백 BIG/25,000";
goodsArray["BAG11"] = "레트로 에코백 SMALL/19,000";
goodsArray["BAG12"] = "토토로 나무 냅색/29,000";

goodsArray["CLOTHING1"] = "고양이버스 티셔츠/39,000";
goodsArray["CLOTHING2"] = "구로스케 모자/20,000";
goodsArray["CLOTHING3"] = "스트라이프 넥타이/96,000";
goodsArray["CLOTHING4"] = "크로바 넥타이/96,000";
goodsArray["CLOTHING5"] = "겨울 머플러/42,000";
goodsArray["CLOTHING6"] = "퐁퐁시리즈 모자/26,400";
goodsArray["CLOTHING7"] = "퐁퐁시리즈 머플러/27,600";
goodsArray["CLOTHING8"] = "퐁퐁시리즈 장갑/24,000";
goodsArray["CLOTHING9"] = "긴팔 회색 티셔츠/35,000";
goodsArray["CLOTHING10"] = "긴팔 네이비 티셔츠/35,000";
goodsArray["CLOTHING11"] = "화이트 구로스케 도트 티셔츠/31,000";
goodsArray["CLOTHING12"] = "블랙 구로스케 도트 티셔츠/31,000";

goodsArray["DOLL1"] = "토토로네집 인형/39,000";
goodsArray["DOLL2"] = "스마일 대토토로 인형/39,000";
goodsArray["DOLL3"] = "중토토로 인형/48,000";
goodsArray["DOLL4"] = "소토토로 인형/28,000";
goodsArray["DOLL5"] = "후가후가 고양이버스 인형/21,000";
goodsArray["DOLL6"] = "나뭇잎 대토토로 인형/98,000";
goodsArray["DOLL7"] = "춤추는 중토토로 인형/48,000";
goodsArray["DOLL8"] = "웃는 나뭇잎 소토토로 인형/22,000";
goodsArray["DOLL9"] = "고양이버스 인형/42,000";
goodsArray["DOLL10"] = "대토토로 인형/18,000";
goodsArray["DOLL11"] = "단짝친구 중토토로 인형/54,000";
goodsArray["DOLL12"] = "대토토로 인형2/39,000";

goodsArray["FANCY1"] = "그린 다이어리/12,000";
goodsArray["FANCY2"] = "블루 다이어리/12,000";
goodsArray["FANCY3"] = "고양이버스 펜케이스/21,000";
goodsArray["FANCY4"] = "클로버 펜케이스/13,000";
goodsArray["FANCY5"] = "블루 루반노트/13,500";
goodsArray["FANCY6"] = "베이지 루반노트/13,500";
goodsArray["FANCY7"] = "아이보리 라떼아트 메모/11,200";
goodsArray["FANCY8"] = "브라운 라떼아트 메모/11,200";
goodsArray["FANCY9"] = "팽이 토토로 파우치스탬프/11,200";
goodsArray["FANCY10"] = "벚꽃 중토토로 파우치스탬프/11,200";
goodsArray["FANCY11"] = "구로스케 도트 미니링노트/6,300";
goodsArray["FANCY12"] = "토토로 키친 미니링노트/6,300";

goodsArray["PUZZLE1"] = "우산을쓰고 퍼즐/8,500";
goodsArray["PUZZLE2"] = "도토리줄줄 퍼즐/8,500";
goodsArray["PUZZLE3"] = "고양이버스달려 퍼즐/8,500";
goodsArray["PUZZLE4"] = "토끼풀피었다 퍼즐/8,500";
goodsArray["PUZZLE5"] = "나무딸기 퍼즐/8,500";
goodsArray["PUZZLE6"] = "날다 퍼즐/8,500";
goodsArray["PUZZLE7"] = "바람과 민들레 퍼즐/8,500";
goodsArray["PUZZLE8"] = "낙옆의 계절 퍼즐/8,500";
goodsArray["PUZZLE9"] = "토토로세계 화분퍼즐/28,600";
goodsArray["PUZZLE10"] = "코리코마을 화분퍼즐/28,600";

$(function() {
    history.replaceState({}, null, location.pathname); //파라미터 제거
	
	//Initialize Swiper
	var swiper1 = new Swiper('.swiper1', {
		slidesPerView: 1,
		spaceBetween: 30,
		effect: 'fade',
		loop: true, //슬라이드 반복
		autoplayDisableOnInteraction: false,
		autoplay: { //자동재생
			delay: 5000, //딜레이
		},
		speed: 1000, //슬라이드 속도
		pagination: {
			el: '.swiper-pagination1',
			clickable: true,
		},
    });
    
    var swiper2 = new Swiper('.swiper2', {
		slidesPerView: 4,
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
    });
    
    //슬라이드 영역에 마우스 오버시 자동재생 정지
    $('div.swiper-container').hover(function() {
        swiper1.autoplay.stop();
    }, function() {
        swiper1.autoplay.start();
    });
    
    //상품 상세 슬라이드에 태그 추가
    $('section.goods-wrap li.one-goods-li,li.two-goods-li').click(function() {
        var category = $(this).attr("data-category");
        var cnt = $(this).attr("data-cnt");
        var html = "";
        
        if (cnt > 0) {
            for (var i=1; i<=cnt; i++) {
                var goods_arr = goodsArray[category + i].split('/');
                
                html = html + "<div class='swiper-slide swiper-slide2' style='background:white url(\"img/" + category.toLowerCase() + "/" + category.toLowerCase() + i + ".jpg\") no-repeat center;'><span class='detail-back'></span><span class='detail-txt'><span class='detail-name'>" + goods_arr[0] + "</span><span class='detail-price'>" + goods_arr[1] + "</span></span></div>";
            }
        }
        
        $('section.goods-wrap div.detail-goods h5').text(category);
        $('section.goods-wrap div.detail-goods div.swiper-wrapper').html(html);
        
        $('section.goods-wrap div.detail-goods').css("opacity", "0");
        $('section.goods-wrap div.detail-goods').stop().delay(100).animate({"opacity":"1"}, 2000);
        
        var swiper2 = new Swiper('.swiper2', {
            slidesPerView: 4,
			spaceBetween: 10,
			speed: 1000,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
        });
        
        $('section.goods-wrap div.detail-goods div.swiper-slide2').click(function() {
            //location.href = "상품 상세페이지 이동";
        });
    });
    
    $('section.goods-wrap div.detail-goods div.swiper-slide2').click(function() {
        //location.href = "상품 상세페이지 이동";
    });
    
    setLogout();
});

//로그인 클릭시
function setLogin() {
    $(".header-link").css("display","none");
    $(".header-member-link").css("display","inline-block");
    $(".nav-member-li").css("display","list-item");
}

//로그아웃 클릭시
function setLogout() {
    $(".header-link").css("display","none");
    $(".header-nonmember-link").css("display","inline-block");
    $(".nav-member-li").css("display","none");
}
