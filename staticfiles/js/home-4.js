(function($){
"use strict"; // Start of use strict
//Window Load
jQuery(window).load(function(){ 	
	//Topic Slider
	if($('.content-topic-slider').length>0){
		$('.content-topic-slider').each(function(){
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
			});
		});
	}		
	if($('.title-topic-slider').length>0){
		$('.title-topic-slider').each(function(){
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
				autoPlay:true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}		
	//Most Read Slider
	if($('.most-read-slider').length>0){
		$('.most-read-slider').each(function(){
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
	//Latest News Category
	if($('.content-latest-news-category').length>0){
		$('.content-latest-news-category').each(function(){
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
	//Featured Newday
	if($('.featured-newday-slider').length>0){
		$('.featured-newday-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
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
	//Motion Event
	if($('.motion-event').length>0){
		$('.motion-event').each(function(){
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
			$('.motion-event .owl-theme .owl-controls .owl-buttons').append('<div class="total-slide"></div>');
			$('.motion-event .owl-theme .owl-controls .owl-buttons .total-slide').insertBefore('.motion-event .owl-theme .owl-controls .owl-buttons');
			function show_total_slide(){
				var total = $('.motion-event  .owl-item').size();
				var current = $('.motion-event  .owl-item.active').index()+1;
				$('.total-slide').html(current+' of '+total);
			}
			show_total_slide();
			$('.motion-event .owl-theme .owl-controls .owl-buttons div').on('click',function(){
				show_total_slide();
			});
		});
	}	
	//Trending Slider
	if($('.list-trending-box').length>0){
		$('.list-trending-box').each(function(){
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
			});
		});
	}
	
});
})(jQuery); // End of use strict