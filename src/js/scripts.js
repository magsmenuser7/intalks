jQuery(function ($) {

	$(document).ready(function() {
	
		"use strict";
		
		PageLoad();
		FirstLoad();
		Showcase();
		
	});


/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {	
		
		if ($('#page-content').hasClass("light-content")) {
			$('.preloader-wrap').addClass('light-content');			
		}
		
		$('body').removeClass('hidden');		
		
	}// End Page Load
		


/*--------------------------------------------------
Function First Load
---------------------------------------------------*/	

	function FirstLoad() {	
		
		
		if ($("body").hasClass("smooth-scroll")) {
			var elem = document.querySelector("#content-scroll");
			var scrollbar = Scrollbar.init(elem,
			{
				renderByPixels: true,
				damping:0.05
			});
			window.smooth_scrollbar = scrollbar;
		}
		
		$("html,body").animate({scrollTop: 0}, 1);
		
		if ($("#page-content").hasClass("light-content")) {
			$("main, nav").css('background-color', '#141414');
			if( $('#hero').length > 0 ){						
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', 'transparent');
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		} else {
			$("main").css('background-color', '#fff');
			$("nav").css('background-color', '#141414');
			if( $('#hero').length > 0 ){	
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', '#fff');
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		}
		
		$('.section-image').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		$('.item').each(function() {
			var image = $(this).find('.item-image').data('src');	
			$(this).find('.item-image').css({'background-image': 'url(' + image + ')'});
		});
		
		
			
		// Slider Center on click
		$('.slider').on('click', function() {				
			var $window = $(window),
				$element = $(this),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);	
			if ($("body").hasClass("smooth-scroll")) {					
				var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height/2);                    
				TweenLite.to(scrollbar, 0.8, {scrollTo:scrollOffset + elementHeight/2, ease:Power4.easeInOut});                    
			}
			else{                    
				$("html, body").animate({ scrollTop: scrollIt }, 350);                
			}				
		});
		
		
		if ($("body").hasClass("smooth-scroll")) {
			scrollbar.addListener(() => {
				$(".white-section").each(function () {
					var $this = $(this),
					elementTop = $this.offset().top;
					if (scrollbar.isVisible(this)) {	
						if (elementTop <= 60) {	
							$("header").addClass("white-header")
						} else {
							$("header").removeClass("white-header")
						}
					} else {
						$("header").removeClass("white-header")
					}
				});
			});
		}
		
		
		// Tilt Showcase Wrapper
		if( $('#hero').hasClass("has-image")) {				
			var timeout;
			$(window).resize(changePersective);				
			changePersective();				
			function changePersective(){
				TweenMax.set('#hero-bg-wrapper', {perspective: $('body').width()});
			}
			$('#hero').mousemove(function(e){
				if(timeout) clearTimeout(timeout);
				setTimeout(callParallaxHero.bind(null, e));			
			});				
			function callParallaxHero(e){
				parallaxItHero(e, '#hero-bg-image', 0); //5
				moveItHero(e, '#hero-bg-image', - 30); //80
			}				
			function parallaxItHero(e, target, movement){
				var $this = $('#hero-bg-wrapper');
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;					
				TweenMax.to(target, 1, {
					rotationY: (relX - $this.width()/1.5) / $this.width() * movement,
					rotationX: (relY - $this.height()/2) / $this.height() * movement,
				})
			}				
			function moveItHero(e, target, movement){
				var $this = $('#hero-bg-wrapper');
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;					
				TweenMax.to(target, 1, {
					x: (relX - $this.width()/2) / $this.width() * movement,
					y: (relY - $this.height()/2) / $this.height() * movement,
				})
			}
		}
		
		var heroparallax = TweenMax.to('#hero-image-parallax', 1, {top:"20%", scale:1.2, ease:Linear.easeNone});
		var captionParallax = TweenMax.to('.has-image #hero-caption', 0.5, {top:"25%", ease:Linear.easeNone});
		var bottomParallax = TweenMax.to('.has-image .hero-bottom', 0.5, {opacity:"0", ease:Linear.easeNone});
		
		var controller = new ScrollMagic.Controller();
		
		var heroScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'100%'
		})
		.setTween(heroparallax)
		.addTo(controller);
		  
		var captionScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'100%'
		})
		.setTween(captionParallax)
		.addTo(controller);
		
		var bottomScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'20%'
		})
		.setTween(bottomParallax)
		.addTo(controller);
		
		if ($("body").hasClass("smooth-scroll")) {
			scrollbar.addListener(() => {
				heroScene.refresh()
				captionScene.refresh()
				bottomScene.refresh()
			});
		}
		
		// 	parallax image 
		$(".has-parallax").each( function () {
			var $this = $(this);
			var $thisHeight = $(this).height();
			var bg = $this.find("img");
			
			// Add tweenmax for backgroundParallax
			var parallax = TweenMax.fromTo( bg, 1, {y: '-20%'}, {y: '10%',ease:Linear.easeNone});
			
			// Create scrollmagic scene
			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: this, // <-- Use this to select current element
				triggerHook: 1,
				duration:'300%'
			})
			.setTween(parallax)
			.addTo(controller);
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					parallaxScene.refresh()
				});
			}
			
		});
		
		// animate each
		$('.has-animation').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();
			
			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(1)
			
			scene.on('enter', function(){
				$this.delay($this.attr('data-delay')).queue(function(next){
					TweenMax.to($this, 0.6, {force3D:true, opacity:1, y:0, scale:1, delay:0.1, ease:Power2.easeOut});
					next();
				});
			});
			
			scene.on('leave', function(event){
				$this.removeClass('active');
			});
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})
		
		$('.has-mask').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});
		
		$('.has-mask span').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});
		
		$('.has-mask').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();
			
			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(1)
			
			scene.on('enter', function(){				
				
				var tl = new TimelineLite();
						
				$this.find('span > span').each(function(index, element) {
					tl.to(element, 0.6, {y:0, opacity:1, delay:0.1, ease:Power2.easeOut}, index * 0.03)
				});
				
			});
			
			scene.on('leave', function(event){
				$this.removeClass('active');
			});
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})
		
		$('.item-appear').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();
			
			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(1)
			
			scene.on('enter', function(){				
				$this.addClass('active');
			});
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})
		
	}// End First Load
	


/*--------------------------------------------------
Function Showcase
---------------------------------------------------*/
	
	function Showcase() {
		
	
		if( $('#showcase-slider').length > 0 ){	
			
			var titles = [];
			var subtitle = [];
			var counter = [];
			$('#showcase-slider .swiper-slide').each(function(i) {
			  	titles.push($(this).data('title'));
				subtitle.push($(this).data('subtitle'));
				counter.push($(this).data('number'))
			});
						
			var interleaveOffset = 0.4;

			var swiperOptions = {
				direction: "vertical",
				loop: false,
				grabCursor: false,
				resistance : true,
				resistanceRatio : 0,
				allowTouchMove:true, 
				speed:1600,
				autoplay: false,
				effect: "slide",
				mousewheelControl: false,
				hashnav: true,
				replaceState: true,
				pagination: {
					el: '.showcase-captions',
					clickable: true,
					renderBullet: function (index, className) {
						return '<div class="tab__link ' + className + '">' + '<div class="subtitle">' + subtitle[index] + '</div>' + '<div class="title">' + titles[index] + '<span class="counter">' + counter[index] + '</span>' + '</div>' + '</div>';
						 
					},
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				on: {
					progress: function() {
					  var swiper = this;
					  for (var i = 0; i < swiper.slides.length; i++) {
						var slideProgress = swiper.slides[i].progress;
						var innerOffset = swiper.height * interleaveOffset;
						var innerTranslate = slideProgress * innerOffset;
						swiper.slides[i].querySelector(".img-mask").style.transform = "translate3d(0, " + innerTranslate + "px,0)";
					  }
					},
					touchStart: function() {
					  var swiper = this;
					  for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = "";
					  }
					},
					setTransition: function(speed) {
					  var swiper = this;
					  for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = speed + "ms";
						swiper.slides[i].querySelector(".img-mask").style.transition = speed + "ms";
					  }   
				  },
					init: function () {
						
						$('.swiper-slide-active').find('video').each(function() {
							$(this).get(0).play();
						});						
						$('.showcase-captions-wrap').clone().removeClass('no-stroked').addClass('stroked').insertAfter('.showcase-captions-wrap');
						$('.stroked .showcase-captions').clone().removeClass('no-stroked').appendTo('.showcase-subtitles-wrap');
						
						
					}
  				},
			};
							
			var swiper = new Swiper(".swiper-container", swiperOptions);
			
			var indicator = new WheelIndicator({
			  elem: document.querySelector('.swiper-container'),
			  callback: function(e){
				if(e.direction == 'up') swiper.slidePrev();
				else swiper.slideNext();
			  }
			});
			
			$("#showcase-slider .swiper-slide").find(".title").each(function(i) {				
				$(this).wrap( "<div class='outer'><div class='inner'></div></div>" );
			});
			
			$('.showcase-subtitles-wrap .title').remove();
			$('.no-stroked .subtitle, .stroked .subtitle').remove();
			
			
			// Tilt Showcase Wrapper
			var maxTilt = 1.5;
			var mouseX, mouseY;
			$(document).on("mousemove", function(event) {
				mouseX = event.pageX;
				mouseY = event.pageY;
			});
			$('#showcase-tilt').each(function() {
				var thisWidth = $(this).width();
				var thisHeight = $(this).height();
				var thisOffset = $(this).offset();
				$(document).mousemove(function() {
					var horTilt = ((mouseX / thisWidth) * (maxTilt * 2)) - maxTilt;
					var verTilt = (((mouseY - thisOffset.top) / thisHeight) * (maxTilt * 2)) - maxTilt;					
					TweenMax.to('#showcase-tilt', 1,{rotationY: horTilt, rotationX: verTilt, scale: 1.05, ease:Power1.easeOut});
				});
			});
			
			
			$('#showcase-slider').on('mousedown touchstart', function(event) {				
				$('body').addClass('scale-up');
				TweenMax.to('#ball', 0.2,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.6});
			});
						
			$('#showcase-slider').on('mouseup touchend', function(event) {				
				$('body').removeClass('scale-up');
				TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale:1, x: -15, y: -15});
			});
			
			TweenMax.set($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), {opacity:0, y:-120});
			TweenMax.set($('.no-stroked .swiper-pagination-bullet-active').find('.title'), {opacity:0, y:60});
			TweenMax.set($('.stroked .swiper-pagination-bullet-active').find('.title'), {opacity:0, y:60});
			TweenMax.set($('.stroked .swiper-pagination-bullet-active').next().find('.title'), {opacity:0, y:240});
			
			var slidertitleheight = $(".title").height()
			
			TweenMax.to($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), 0.5, {force3D:true, opacity:0.3, y:-slidertitleheight, delay:0.4, ease:Power2.easeOut});
			TweenMax.to($('.no-stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:1, y:0, delay:0.5, ease:Power2.easeOut});
			TweenMax.to($('.stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:0.3, y:0, delay:0.5, ease:Power2.easeOut});
			TweenMax.to($('.stroked .swiper-pagination-bullet-active').next().find('.title'), 0.5, {force3D:true, opacity:0.3, y:slidertitleheight, delay:0.6, ease:Power2.easeOut});
			
		}	
		
			
	}//End Showcase
	

});
	
