(function($){
"use strict"; // Start of use strict
//Document Ready
jQuery(document).ready(function(){
	//Abroad Language
	$('.abroad-link').on('click',function(event){
		event.preventDefault();
		$('.abroad-language').toggleClass('active');
	});
	//Widget Faqs
	$('.widget.widget-faqs a').on('click',function(event){
		event.preventDefault();
		$('.widget.widget-faqs li').removeClass('active');
		$(this).parent().addClass('active');
	});
	$('.btn-loadmore-items').on('click',function(event){
		event.preventDefault();
		$('.content-item-loadmore').slideDown('slow');
	});
	//Menu Responsive
	if($(window).width()<1025){
		// $('body').on('click',function(event){
		// 	$('.main-nav .main-menu').slideUp('slow');
		// });
		$('.btn-mobile-menu').on('click',function(event){
			event.preventDefault();
			event.stopPropagation();
			$('.main-nav .main-menu').slideToggle('slow');
		});
		$('.main-nav li.menu-item-has-children>a').on('click',function(event){
			event.stopPropagation();
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				event.preventDefault();
				$(this).next().slideDown('slow');
			}else{
				$(this).next().slideUp('slow');
			}
		});
	}
	//Masonry
	if($('.masonry-post-box').length>0){
		$('.masonry-post-box').masonry({
			// options
			itemSelector: '.item-post-box',
		});
	}
	if($('.content-blog-grid').length>0){
		$('.content-blog-grid').masonry({
			// options
			itemSelector: '.item-blog-grid',
		});
	}
	//Shop Tab 
	if($('.bx-pager-tab').length>0){
		$('.bxslider-left').bxSlider({
			pagerCustom: '#bx-pager-left',
			controls:false
		});
		$('.bxslider-right').bxSlider({
			pagerCustom: '#bx-pager-right',
			controls:false
		});
	}
	//Fixed Post Control
	function post_control(){
		if($('.post-control2').length>0){
			var st = $(window).scrollTop();
			var sbt = $('.main-content-blog2').offset().top-50;
			var stop = $('#footer').offset().top-400;
			if(st>sbt && st<stop){
				$('.post-control2').addClass('active');
			}else{
				$('.post-control2').removeClass('active');
			}
		}
	}
	post_control();
	$(window).scroll(function(){
		post_control();
	});
	//Close Adv
	$('.close-top-adv').on('click',function(event){
		event.preventDefault();
		$(this).parent().slideUp();
	});
	//Scroll Top
	$('.scroll-top').on('click',function(event){
		event.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow');
	});
	//Product Quick View
	$('.product-quick-view').each(function(){
		$(this).fancybox();
	});
	//Select Color
	$('.attr-color li a').on('click',function(event) {
		event.preventDefault();
		$('.attr-color li a').removeClass('selected');
		$(this).addClass('selected');
	});
	//Select Size
	$('.selected-attr-size').text($('.select-attr-size li').first().find('a').text());
	$('body').click(function(){
		$('.select-attr-size').slideUp();
	});
	$('.selected-attr-size').on('click',function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.select-attr-size').slideToggle();
	});
	$('.select-attr-size a').on('click',function(event) {
		event.preventDefault();
		$('.select-attr-size a').removeClass('selected');
		$(this).addClass('selected');
		$('.selected-attr-size').text($(this).text());
	});
	//Qty Up-Down
	$('.info-qty').each(function(){
		var qtyval = parseInt($(this).find('.qty-val').text(),10);
		$('.qty-up').on('click',function(event) {
			event.preventDefault();
			qtyval=qtyval+1;
			$('.qty-val').text(qtyval);
		});
		$('.qty-down').on('click',function(event) {
			event.preventDefault();
			qtyval=qtyval-1;
			if(qtyval>0){
				$('.qty-val').text(qtyval);
			}else{
				qtyval=0;
				$('.qty-val').text(qtyval);
			}
		});
	});
	//Detail Gallery
	if($('.detail-gallery').length>0){
		$(".detail-gallery .carousel").jCarouselLite({
			btnNext: ".gallery-control .next",
			btnPrev: ".gallery-control .prev",
			speed: 800
		});

		$(".detail-gallery .carousel a").on('click',function(event) {
			event.preventDefault();
			$(".detail-gallery .carousel a").removeClass('active');
			$(this).addClass('active');
			$(".detail-gallery .mid img").attr("src", $(this).find('img').attr("src"));
		});
	}
	//Video Tab Slider
	if($('.tab-video-slider').length>0){
		$('.bxslider1').bxSlider({
			pagerCustom: '#bx-pager1'
		});
		$('.bxslider2').bxSlider({
			pagerCustom: '#bx-pager2'
		});
		$('.bxslider3').bxSlider({
			pagerCustom: '#bx-pager3'
		});
		$('.tab-item').hide();
		$('.tab-item.active').show();
		$('.title-tab-video a').on('click',function(event){
			event.preventDefault();
			$('.title-tab-video li').removeClass('active');
			$(this).parent().addClass('active');
			$('.tab-item').removeClass('active');
			$('.tab-item').eq($(this).parent().index()).addClass('active');
			$('.tab-item').hide();
			$('.tab-item.active').show();
		});
	}
	//Fancy Box Event
	if($('.fancybox-video').length>0){
		$('.fancybox-video').attr('rel', 'media-gallery').fancybox({
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
	}
	if($('.fancybox-photos').length>0){
		$(".fancybox-photos").on('click',function() {
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
				},
			]);
		});
	}
	//Select Time
	if($('.select-event-time').length>0){
		$('.select-event-time').selectmenu();
	}
	//Extra Menu
	$('.btn-extra-menu').on('click',function(event){
		event.preventDefault();
		$('.extra-menu-dropdown').toggleClass('active');
	});
	//Show Search
	$('.header-btn-search').on('click',function(event){
		event.preventDefault();
		$('.header-input-search').toggleClass('active');
	});
	$('.event-btn-search').on('click',function(event){
		event.preventDefault();
		$('.event-form-search').toggleClass('active');
	});
	//Date Picker
	if($('#datepicker').length>0){
		$( ".input-event-start-on #datepicker" ).datepicker();
	}
	//Event Speaker Hover Dir
	$('.item-speaker').each( function() {
		$(this).hoverdir(); 
	});
	//Filter Price
	if($('.info-price-filter').length>0){
		$( ".info-price-filter  #slider-range" ).slider({
		  range: true,
		  min: 0,
		  max: 500,
		  values: [ 50, 350 ],
		  slide: function( event, ui ) {
			$( ".info-price-filter  #amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		  }
		});
		$( ".info-price-filter  #amount" ).val( "$" + $( ".info-price-filter  #slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	}
	//Toggle Sub Category
	$('.has-sub-cat a').on('click',function(event){
		$(this).toggleClass('current');
		if($(this).hasClass('current')){
			event.preventDefault();
			$('.has-sub-cat').removeClass('active');
			$(this).parent().addClass('active');
		}else{
			$('.has-sub-cat').removeClass('active');
			$(this).parent().addClass('active');
		}
	});
});
//Window Load
jQuery(window).load(function(){ 
	//Vertical Menu Slider
	if($('.vertical-menu-slider').length>0){
		$(".vertical-menu-slider").jCarouselLite({
			btnNext: ".control-menu-slider .next",
			btnPrev: ".control-menu-slider .prev",
			visible: 6,
			vertical: true
		});
	}
	if($('.vertical-mega-slider').length>0){
		$(".vertical-mega-slider").jCarouselLite({
			btnNext: ".control-mega-slider .next",
			btnPrev: ".control-mega-slider .prev",
			visible: 3,
			vertical: true
		});
	}
	//Top Post Slider
	if($('.top-post-slider .home-direct-nav').length>0){
		$('.top-post-slider .home-direct-nav').each(function(){
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
	//Video Slider
	if($('.video-slider .home-direct-nav').length>0){
		$('.video-slider .home-direct-nav').each(function(){
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
	//Explode Slider
	if($('.explore-slider .home-direct-nav').length>0){
		$('.explore-slider .home-direct-nav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 3], 
				[992, 3], 
				[1200, 4] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}	
	//List Video Slider
	if($('.box-video-slider .home-direct-nav').length>0){
		$('.box-video-slider .home-direct-nav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 3], 
				[992, 3], 
				[1200, 4] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}	
	//Event Banner Slider
	if($('.event-banner-slider').length>0){
		$('.event-banner-slider').each(function(){
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
				navigationText:['<span class="lnr lnr-arrow-left-circle"></span>','<span class="lnr lnr-arrow-right-circle"></span>']
			});
		});
	}	
	//Most Popular Post Box Home 2
	if($('.most-popular-post-slider').length>0){
		$('.most-popular-post-slider').each(function(){
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
	//Item Blog List Slider
	if($('.item-blog-full-slider').length>0){
		$('.item-blog-full-slider').each(function(){
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
	if($('.item-blog-list').length>0){
		$('.item-blog-list').each(function(){
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
	//Host Topics Home 5
	if($('.hot-topics-slider').length>0){
		$('.hot-topics-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				autoPlay:true,
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}	
	if($('.include-speak').length>0){
		$('.include-speak').each(function(){
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
	if($('.bxslider5').length>0){
		$('.bxslider5').bxSlider({
			pagerCustom: '#bx-pager5',
			auto:true,
			nextText:'<span class="lnr lnr-chevron-right"></span>',
			prevText:'<span class="lnr lnr-chevron-left"></span>',
		});
	}
	//Our Team Slider
	if($('.team-slider').length>0){
		$('.team-slider').each(function(){
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
	//Banner Slider
	if($('.banner-slider').length>0){
		$('.banner-slider').each(function(){
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
	//Trending Slider
	if($('.trending-slider .home-direct-nav').length>0){
		$('.trending-slider .home-direct-nav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 2], 
				[1200, 2] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}		
	//Event Slider
	if($('.current-event .home-direct-nav').length>0){
		$('.current-event .home-direct-nav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 2], 
				[992, 2], 
				[1200, 3] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}		
	//Gallery Slider
	if($('.gallery-slider .center').length>0){
		$('.gallery-slider .center').each(function(){
			if($(window).width()>768){
				$(this).slick({
					 centerMode: true,
					 centerPadding: '218px',
					 slidesToShow: 1,
				});
			}
			if($(window).width()>640 && $(window).width()<=768){
				$(this).slick({
					 centerMode: true,
					 centerPadding: '100px',
					 slidesToShow: 1,
				});
			}
			if($(window).width()<=640){
				$(this).slick({
					 centerMode: true,
					 centerPadding: '0px',
					 slidesToShow: 1,
				});
			}
		});
	}	
	//Related Post Slider
	if($('.related-post  .home-direct-nav').length>0){
		$('.related-post  .home-direct-nav').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 2], 
				[992, 3], 
				[1200, 4] 
				],
				pagination: false,
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}	
	//Event Comming Up
	if($('.event-upcomming-slider').length>0){
		$('.event-upcomming-slider').each(function(){
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
	if($('.hotdeal-countdown').length>0){
		$(".hotdeal-countdown").TimeCircles({
			fg_width: 0.03,
			bg_width: 0,
			text_size: 0,
			circle_bg_color: "#494a4c",
			time: {
				Days: {
					show: true,
					text: "DAY",
					color: "#fbb450"
				},
				Hours: {
					show: true,
					text: "HOUR",
					color: "#fbb450"
				},
				Minutes: {
					show: true,
					text: "MIN",
					color: "#fbb450"
				},
				Seconds: {
					show: true,
					text: "SEC",
					color: "#fbb450"
				}
			}
		}); 
	}
	/*Shop*/
	//Shop Banner Slider
	if($('.banner-shop-slider').length>0){
		$('.banner-shop-slider').each(function(){
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
				navigationText:['','']
			});
		});
	}
	//Featured Product Slider
	if($('.featured-product-slider').length>0){
		$('.featured-product-slider').each(function(){
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
				navigationText:['','']
			});
		});
	}
	//Owl Product Slider
	if($('.owl-tab-slider').length>0){
		$('.owl-tab-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 4,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 3], 
				[992, 3], 
				[1200, 4] 
				],
				pagination: false,
				navigation: true,
				navigationText:['','']
			});
		});
	}
	//Latest Product Slider
	if($('.latest-product-slider').length>0){
		$('.latest-product-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 3,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 2], 
				[992, 3], 
				[1200, 3] 
				],
				pagination: false,
				navigation: true,
				navigationText:['','']
			});
		});
	}
	//Widget Adv
	if($('.adv-widget-slider').length>0){
		$('.adv-widget-slider').each(function(){
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
	//Home 7
	if($('.content-bx-latest-post').length>0){
		if($(window).width()>480){
			$('.content-bx-latest-post').bxSlider({
				minSlides: 1,
				maxSlides: 4,
				moveSlides: 1,
				slideMargin: 5,
				slideWidth: 280,
				pager: false,
				touchEnabled:true,
				nextText:'<span class="lnr lnr-chevron-right"></span>',
				prevText:'<span class="lnr lnr-chevron-left"></span>',
			});
		}else{
			$('.content-bx-latest-post').bxSlider({
				minSlides: 1,
				maxSlides: 1,
				moveSlides: 1,
				slideMargin: 0,
				slideWidth: 480,
				pager: false,
				touchEnabled:true,
				nextText:'<span class="lnr lnr-chevron-right"></span>',
				prevText:'<span class="lnr lnr-chevron-left"></span>',
			});
		}
	}
	if($('.content-owl-speaker').length>0){
		$('.content-owl-speaker').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 3,
				itemsCustom: [ 
				[0, 1], 
				[480, 2], 
				[768, 2], 
				[992, 3], 
				[1200, 3] 
				],
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>'],
				pagination: false,
				navigation: true,
			});
		});
	}
	if($('.content-what-new-slider').length>0){
		$('.content-what-new-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>'],
				pagination: false,
				navigation: true,
			});
		});
	}
	if($('.content-photo-video-slider').length>0){
		$('.content-photo-video-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				navigationText:['<span class="lnr lnr-arrow-left-circle"></span>','<span class="lnr lnr-arrow-right-circle"></span>'],
				pagination: true,
				navigation: true,
			});
		});
	}
	if($('.analysis-slider').length>0){
		$('.analysis-slider').each(function(){
			$(this).find('.wrap-item').owlCarousel({
				items: 1,
				itemsCustom: [ 
				[0, 1], 
				[480, 1], 
				[768, 1], 
				[992, 1], 
				[1200, 1] 
				],
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>'],
				pagination: false,
				navigation: true,
			});
		});
	}
	//Home 3
	//Banner Slider
	if($('.banner-slider3').length>0){
		$('.banner-slider3').each(function(){
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
				navigation: true,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>']
			});
		});
	}
	//Post Format Slider
	if($('.post-format-slider').length>0){
		$('.post-format-slider').each(function(){
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
	//Popular Slider
	if($('.most-popular-slider .center').length>0){
		$('.most-popular-slider .center').each(function(){
			if($(window).width()>1024){
				$(this).slick({
					 centerMode: true,
					 centerPadding: '200px',
					 slidesToShow: 1,
				});
			}else{
				$(this).slick({
					 centerMode: true,
					 centerPadding: '0px',
					 slidesToShow: 1,
					 arrows: false,
				});
			}
		});
	}		
});
})(jQuery); // End of use strict