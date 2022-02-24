(function($){
"use strict"; // Start of use strict
//Document Ready
jQuery(document).ready(function(){
	//Add
	$('.prev-story').on('click',function(){
		$('html, body').animate({
	        scrollTop: $('.item-post-blog.active').prev().offset().top - 125
	    }, 1000);
	})
	$('.next-story').on('click',function(){
		$('html, body').animate({
	        scrollTop: $('.item-post-blog.active').next().offset().top - 125
	    }, 1000);
	})
	//End add
	
	//Main BLog
	$('.item-post-blog:gt(9)').hide();
	$('.loadmore-story').on('click',function(event){
		event.preventDefault();
		$('.explode-more').click();
		$('.item-post-blog').slideDown();
		$(this).hide();
		$(this).next().show();
		$('.total-story').text($('.item-post-blog').size());
	});
	//Sidebar Blog
	$('.list-post-blog li:gt(9)').hide();
	$('.explode-more').on('click',function(event){
		event.preventDefault();
		$('.list-post-blog li').slideDown();
		$(this).hide();
		$(this).next().show();
	});
	//Scroll
	function blog_scroll(){
		$('.item-post-blog').each(function(){
			if($(this).is(':visible')){
				var ost = $(this).offset().top-$('.header-page-blog').height()-50;
				var osb = ost+$(this).height();
				var sbt = $('.sidebar-blog').offset().top;
				var st = $(window).scrollTop();
				if(st>ost && st<osb){
					$(this).addClass('active');
					var id = $('.item-post-blog.active').index();
					$('.current-story').text(id+1);
					$('.list-post-blog li').removeClass('active');
					$('.list-post-blog li').eq(id).addClass('active');
				}else{
					$(this).removeClass('active');
				}
			}
		});
		var st = $(window).scrollTop();
		var sbt = $('.sidebar-blog').offset().top-$('.header-page-blog').height();
		var atop = $('.list-post-blog li.active').offset().top-$('.list-post-blog li:eq(0)').offset().top;
		var stop = $('#footer').offset().top-420;
		var stop2 = $('#footer').offset().top-550;
		if(st>sbt){
			$('.inner-sidebar-blog').css('margin-top','-'+atop+'px');
		}else{
		}
		if(st>stop){
			$('.blog-post-count').addClass('stop-bog-count');
		}else{
			$('.blog-post-count').removeClass('stop-bog-count');
		}
		if(st>stop2){
			$('.blog-post-count').parent().addClass('stop-blog');
		}else{
			$('.blog-post-count').parent().removeClass('stop-blog');
		}
		/* var num=$('.item-post-blog:visible').size();
		console.log(num); */
		$('.prev-story').on('click',function(event){
			event.preventDefault();
		});
		$('.next-story').on('click',function(event){
			event.preventDefault();
		});
	}
	if($(window).width()>1280){
		blog_scroll();
		$(window).scroll(function(){
			blog_scroll();
		});
	}
	//Fancy Box Video
	$('.video-fancybox').attr('rel', 'media-gallery').fancybox({
		openEffect : 'none',
		closeEffect : 'none',
		prevEffect : 'none',
		nextEffect : 'none',

		arrows : false,
		helpers : {
			media : {},
			buttons : {}
		}
	});
	//Fancy Box Gallery
	$(".gallery-fancybox").on('click',function() {
		$.fancybox.open([
			{
				href : 'images/photo/1.jpg'
			}, {
				href : 'images/photo/2.jpg'
			}, {
				href : 'images/photo/3.jpg',
			},{
				href : 'images/photo/4.jpg',
			},{
				href : 'images/photo/5.jpg',
			},{
				href : 'images/photo/6.jpg',
			},{
				href : 'images/photo/7.jpg',
			},{
				href : 'images/photo/8.jpg',
			},{
				href : 'images/photo/9.jpg',
			},{
				href : 'images/photo/10.jpg',
			},
		]);
	});
});
})(jQuery); // End of use strict