(function($){
"use strict"; // Start of use strict
//Document Ready
jQuery(document).ready(function(){
	$('.btn-header-search').on('click',function(event){
		event.preventDefault();
		$('.input-header-search').toggleClass('active');
	});
	//Post Load More
	$('.latest-post-loadmore').each(function(){
		var size_li = $(this).find(".item-latest-post").size();
		var x=$('.btn-load-more').attr('data-num');
		var y=parseInt($('.btn-load-more').attr('data-num'),10)-1;
		$(this).find('.item-latest-post:lt('+x+')').show();
		$(this).find('.item-latest-post:gt('+y+')').hide();
		$('.btn-load-more').on('click',function (event) {
			event.preventDefault();
			var size_li = $('.latest-post-loadmore .item-latest-post').size();
			//console.log(size_li);
			var x=$(this).attr('data-num');
			var x=parseInt($(this).attr('data-num'),10);
			$(this).attr('data-num',x+1);
			var x=$(this).attr('data-num');
			$('.latest-post-loadmore .item-latest-post:lt('+x+')').slideDown('slow');
			if($(this).attr('data-num')>size_li){
				$(this).parent().hide();
			}
		});
	});
});
//Window Load
jQuery(window).load(function(){ 	
	//Layer Slider
	if($('.page-layout-slider').length>0){
		$('.page-layout-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 5,
				itemsCustom: [ 
				[0, 2], 
				[480, 3], 
				[768, 4], 
				[992, 4], 
				[1200, 5] 
				],
				pagination: false,
				navigation: false,
				autoPlay: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}			
	//Top Post Slider
	if($('.top-post-slider6').length>0){
		$('.top-post-slider6').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 2], 
				[992, 2], 
				[1200, 2] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}		
	//Expert Slider
	if($('.info-expert').length>0){
		$('.info-expert').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}		
	//Adv Slider
	if($('.adv-slider').length>0){
		$('.adv-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
				autoPlay:true
			});
		});
	}			
	//Trending Slider
	if($('.trending-post').length>0){
		$('.trending-post').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: false,
				navigation: true,
				addClassActive:true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
			$('.trending-post .owl-theme .owl-controls .owl-buttons').append('<div class="total-slide"></div>');
			$('.trending-post .owl-theme .owl-controls .owl-buttons .total-slide').insertAfter('.trending-post .owl-theme .owl-controls .owl-buttons .owl-prev');
			function show_total_slide(){
				var total = $('.trending-post  .owl-item').size();
				var current = $('.trending-post  .owl-item.active').index()+1;
				$('.total-slide').html('<span class="current-item">'+current+'</span>'+'<span class="total-item">/'+total+'</span>');
			}
			show_total_slide();
			$('.trending-post .owl-theme .owl-controls .owl-buttons div').on('click',function(){
				show_total_slide();
			});
		});
	}		
	//Gallery Slider
	if($('.main-gallery-slider').length>0){
		$('.main-gallery-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: false,
				navigation: true,
				addClassActive:true,
				loop:true,
				slideSpeed:800,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
			$('.main-gallery-slider .owl-theme .owl-controls .owl-buttons').append('<div class="total-slide"></div>');
			$('.main-gallery-slider .owl-theme .owl-controls .owl-buttons .total-slide').insertAfter('.main-gallery-slider .owl-theme .owl-controls .owl-buttons .owl-prev');
			function show_total_slide(){
				var total = $('.main-gallery-slider  .owl-item').size();
				var current = $('.main-gallery-slider  .owl-item.active').index()+1;
				$('.total-slide').html('<span class="current-item">'+current+'</span>'+'<span class="total-item">/'+total+'</span>');
			}
			show_total_slide();
			$('.main-gallery-slider .owl-theme .owl-controls .owl-buttons div').on('click',function(){
				show_total_slide();
			});
			function get_html(){
				if($('.main-gallery-slider').find('.owl-item.active').prev().length>0){
				$('.item-gallery-prev').html($('.main-gallery-slider').find('.owl-item.active').prev().find('.gallery-slider-thumb').html());
				}else{
					$('.item-gallery-prev').html($('.main-gallery-slider').find('.owl-item').last().find('.gallery-slider-thumb').html());
				}
				if($('.main-gallery-slider').find('.owl-item.active').next().length>0){
					$('.item-gallery-next').html($('.main-gallery-slider').find('.owl-item.active').next().find('.gallery-slider-thumb').html());
				}else{
					$('.item-gallery-next').html($('.main-gallery-slider').find('.owl-item').first().find('.gallery-slider-thumb').html());
				}
			}
			if($(window).width()>1024){
				get_html();
				$('.owl-prev').on('click',function(){
					get_html();
				});
				$('.owl-next').on('click',function(){
					get_html();
				});
			}
		});
	}	
	//Banner Slider
	if($('.banner-slider6').length>0){
		$('.banner-slider6').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				pagination: true,
				navigation: false,
				singleItem : true,
				transitionStyle : "fade"
			});
		});
	}		
	//Event Popular Slider
	if($('.event-popular-slider').length>0){
		$('.event-popular-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 2], 
				[992, 3], 
				[1200, 3] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}	
	
});
})(jQuery); // End of use strict