/**
 * @author minks
 */

$(function() {
	history.replaceState({}, null, location.pathname); //파라미터 제거
	
	//초기화
	$('section.content-wrap div.content').hide();
	$('#content-home').show();
	
	$('aside li.menu-li a.menu-a:first').addClass("on");
	
	$('section.content-wrap div.home-image').stop().delay(100).animate({"margin-top":"10%", "margin-bottom":"0", "opacity":"1"}, 2000);
	$('section.content-wrap div.home-content').stop().delay(100).animate({"margin-top":"20px"}, 2000);
	
	//프로젝트 내용에 이미지관련 태그 추가
	$('section.content-wrap div.ilark-slide').each(function() {
		var name = $(this).attr("data-name");
		var cnt = $(this).attr("data-cnt");
		var html = "";
		
		if (cnt > 0) {
			for (var i=1; i<=cnt; i++) {
				if (html == "") {
					if ($(this).hasClass("link") == true) {
						html = html + "<li class='ilark-li view2' style='background-image:url(\"../siteimg/ilark/" + name + "/" + name + i + ".png\");'><img src='img/link_image.png' alt='링크'></li>";
					} else {
						html = html + "<li class='ilark-li view2' style='background-image:url(\"../siteimg/ilark/" + name + "/" + name + i + ".png\");'></li>";
					}
				} else {
					if ($(this).hasClass("link") == true) {
						html = html + "<li class='ilark-li' style='background-image:url(\"../siteimg/ilark/" + name + "/" + name + i + ".png\");'><img src='img/link_image.png' alt='링크'></li>";
					} else {
						html = html + "<li class='ilark-li' style='background-image:url(\"../siteimg/ilark/" + name + "/" + name + i + ".png\");'></li>";
					}
				}
			}
		}
		
		$(this).children().html(html);
	});
	
	//메뉴 클릭시
	$('aside li.menu-li a.menu-a').click(function() {
		var href = $(this).attr("href");
		$('section.content-wrap div.content').hide();
		$(href).show();
		
		$('aside li.menu-li a.menu-a').removeClass("on");
		$(this).addClass("on");
		
		if (href == "#content-home") {
			$('section.content-wrap div.home-image').css("margin-top", "calc(10% - 20px)").css("margin-bottom", "100px").css("opacity", "0");
			$('section.content-wrap div.home-content').css("margin-top", "40px");
			
			$('section.content-wrap div.home-image').stop().delay(100).animate({"margin-top":"10%", "margin-bottom":"0", "opacity":"1"}, 2000);
			$('section.content-wrap div.home-content').stop().delay(100).animate({"margin-top":"20px"}, 2000);
		} else if (href == "#content-profile") {
			$('section.content-wrap div.profile-content').css("margin-top", "calc(5vh + 100px)").css("opacity", "0");
			$('section.content-wrap div.progress p.bar').css("width", "0");
			
			$('section.content-wrap div.profile-content').stop().animate({"margin-top":"5vh", "opacity":"1"}, 2000);
			
			$('section.content-wrap div.progress').each(function() {
				var width = $(this).attr("data-bar");
				$(this).children().stop().animate({"width":width + "%"}, 2000);
			});
		} else if (href == "#content-work") {
			$('section.content-wrap div.work-content').css("margin-top", "calc(5vh + 100px)").css("opacity", "0");
			$('section.content-wrap div.work-content').stop().animate({"margin-top":"5vh", "opacity":"1"}, 2000);
			
			$('section.content-wrap div.ilark-div dt.ilark-dt').removeClass("view");
			$('section.content-wrap div.ilark-div dt.ilark-dt:first').addClass("view");
			
			var name = $('section.content-wrap div.ilark-div dt.ilark-dt:first').next().children("div.ilark-image").children("div").attr("data-name");
			var cnt = $('section.content-wrap div.ilark-div dt.ilark-dt:first').next().children("div.ilark-image").children("div").attr("data-cnt");
			
			if (cnt > 0) {
				if (cnt == 1) {
					$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().hide();
				} else {
					$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().show();
				}
				
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').prev().hide();
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:first').css("left", "10px");
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:gt(0)').css("left", "300px");
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li').removeClass("view2");
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:first').addClass("view2");
			} else {
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().hide();
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').prev().hide();
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').children().hide();
			}
			
			$('section.content-wrap div.ilark-div dd.ilark-dd').hide();
			$('section.content-wrap div.ilark-div dd.ilark-dd:first').show();
		}
	});
	
	//프로그래스바 마우스오버시
	$('section.content-wrap div.progress').mouseenter(function() {
		$(this).children().css("width", "0");
		
		var width = $(this).attr("data-bar");
		$(this).children().stop().animate({"width":width + "%"}, 2000);
	});
	
	//프로젝트명 클릭시
	$('section.content-wrap div.ilark-div dt.ilark-dt').click(function() {
		if ($(this).next().css("display") == "none") {
			$('section.content-wrap div.ilark-div dt.ilark-dt').removeClass("view");
			$(this).addClass("view");
			
			var name = $(this).next().children("div.ilark-image").children("div").attr("data-name");
			var cnt = $(this).next().children("div.ilark-image").children("div").attr("data-cnt");
			
			if (cnt > 0) {
				if (cnt == 1) {
					$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().hide();
				} else {
					$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().show();
				}
				
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').prev().hide();
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:first').css("left", "10px");
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:gt(0)').css("left", "300px");
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li').removeClass("view2");
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:first').addClass("view2");
			} else {
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().hide();
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').prev().hide();
				$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').children().hide();
			}
			
			$('section.content-wrap div.ilark-div dd.ilark-dd').hide();
			$(this).next().slideDown("slow");
		}
	});
	
	//이전 이미지 슬라이드
	$('div.ilark-div dd.ilark-dd span.ilark-prev').click(function() {
		var name = $(this).next().attr("data-name");
		var cnt = $(this).next().attr("data-cnt");
		var index = parseInt($('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.view2').index()) - 1;
		
		if (index == 0) {
			$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').prev().hide();
			$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().show();
		} else if (index > 0) {
			$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').prev().show();
			$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().show();
		}
		
		$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:eq(' + index + ')').css("left", "10px");
		$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:gt(' + index + ')').css("left", "300px");
		$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li').removeClass("view2");
		$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:eq(' + index + ')').addClass("view2");
	});
	
	//다음 이미지 슬라이드
	$('div.ilark-div dd.ilark-dd span.ilark-next').click(function() {
		var name = $(this).prev().attr("data-name");
		var cnt = $(this).prev().attr("data-cnt");
		var index = parseInt($('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.view2').index()) + 1;
		
		if (index == (parseInt(cnt) - 1)) {
			$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').prev().show();
			$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().hide();
		} else if (index < (parseInt(cnt) - 1)) {
			$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').prev().show();
			$('section.content-wrap div.ilark-slide[data-name="' + name + '"]').next().show();
		}
		
		$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:eq(' + index + ')').css("left", "10px");
		$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:lt(' + index + ')').css("left", "-290px");
		$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li').removeClass("view2");
		$('section.content-wrap div.ilark-slide[data-name="' + name + '"] li.ilark-li:eq(' + index + ')').addClass("view2");
	});
	
	//이미지 마우스오버시
	$('section.content-wrap div.link li.ilark-li').mouseover(function() {
		var name = $(this).parent().parent().attr("data-name");
		var index = parseInt($(this).index()) + 1;
		var height = $(this).parent().height();
		
		$(this).css("background-image", "url('../siteimg/ilark/" + name + "/" + name + index + "-on.png')");
		$(this).children().stop().animate({"top":((height / 2) - 30) + "px", "opacity":"1"}, 200);
	});
	
	//이미지 마우스아웃시
	$('section.content-wrap div.link li.ilark-li').mouseout(function() {
		var name = $(this).parent().parent().attr("data-name");
		var index = parseInt($(this).index()) + 1;
		
		$(this).css("background-image", "url('../siteimg/ilark/" + name + "/" + name + index + ".png')");
		$(this).children().stop().animate({"top":"50%", "opacity":"0"}, 200);
	});
	
	//ilark 링크 이미지 클릭시
	$('div.link li.ilark-li img').click(function() {
		var url = $(this).parent().parent().parent().attr("data-url");
		window.open(url, "_blank");
	});
	
	//portfolio 링크 이미지 클릭시
	$('div.portfolio-content div.portfolio-inner-content img').click(function() {
		var url = $(this).parent().attr("data-url");
		window.open(url, "_blank");
	});
});
