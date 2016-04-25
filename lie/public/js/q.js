$(document).ready(function(){
	/*
	var questions;
	$.get("/ques",function(data){
		questions=data;
		for(var i=1; i<questions.length;i++){
			$(".qbg1").append()
		}
	});
*/
	//根據捲軸的位置改變右方導覽列游標的顏色

	$(window).scroll(function(){
		var num_li=$("li").length;
			for(i=1;i<num_li;i++){
				if($(window).scrollTop()>=$(".qbg"+i+"").offset().top && $(window).scrollTop()<$(".qbg"+(i+1)+"").offset().top){
					$(".nav li").css("background-color","white");//除了被點擊到的游標，其他都恢復成原來的顏色
					$(".nav li:eq("+(i-1)+")").css("background-color","#46dd46");
				break;
				}
			}
			if($(window).scrollTop()>=$(".qbg"+num_li).offset().top){
				$(".nav li").css("background-color","white");//除了被點擊到的游標，其他都恢復成原來的顏色
				$(".nav li:eq("+(num_li-1)+")").css("background-color","#46dd46");
			}

	})

	//點選右方導覽列時會到指定圖片

	var num_li=$("li").length
		for(i=0;i<=num_li;i++){
			$(".nav li:eq("+i+")").click({id:i},function(e){
				$("html,body").stop();
				$(".nav li").css("background-color","white");//除了被點擊到的游標，其他都恢復成原來的顏色
				page=e.data.id+1;
				$("html,body").animate({"scrollTop":$(".qbg"+page).offset().top});
				$(".nav li:eq("+e.data.id+")").css("background-color","#46dd46");//被點擊到的游標變色，前面的selector用this也可以
			})
		}
	//一進入網頁時，將導覽列垂直置中計算導覽列置中的位置
	center();

		//縮放網頁時，將導覽列垂直置中
	$(window).resize(function(){
		center();
	})

	//計算導覽列垂直置中的高度
	function center(){
		pos=$(window).height()/2-$(".nav").height()/2;
		$(".nav").css("top",pos);
	}
	var currentQ=1;

})
