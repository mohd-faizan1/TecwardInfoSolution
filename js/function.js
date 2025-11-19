(function ($) {
	"use strict";

	var $window = $(window);
	var $body = $('body');

	/* Preloader Effect */
	$window.on('load', function () {
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */
	if ($('.active-sticky-header').length) {
		$window.on('resize', function () {
			setHeaderHeight();
		});

		function setHeaderHeight() {
			$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}

		$window.on("scroll", function () {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}

	/* Slick Menu JS */
	$('#menu').slicknav({
		label: '',
		prependTo: '.responsive-menu'
	});

	if ($("a[href='#top']").length) {
		$(document).on("click", "a[href='#top']", function () {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Hero Company Slider JS */
	if ($('.hero-company-slider').length) {
		const hero_company_slider = new Swiper('.hero-company-slider .swiper', {
			slidesPerView: 2,
			speed: 2000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				768: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 5,
				}
			}
		});
	}

	if ($('.service-slider').length) {
		const service_slider = new Swiper('.service-slider .swiper', {
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 1000,
			},
			pagination: {
				el: '.service-slider-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.service-slider-button-next',
				prevEl: '.service-slider-button-prev',
			},
			breakpoints: {
				480: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				991: {
					slidesPerView: 3,
				}
			}
		});
	}

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView: 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next',
				prevEl: '.testimonial-button-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 1,
				},
				991: {
					slidesPerView: 1,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function () {
			$('.skillbar').each(function () {
				$(this).find('.count-bar').animate({
					width: $(this).attr('data-percent')
				}, 2000);
			});
		}, {
			offset: '70%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 1500 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
		gsap.registerPlugin(ScrollTrigger);
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					toggleActions: "play none none none"
				}
			});
			tl.set(container, {
				autoAlpha: 1
			});
			tl.from(container, 1, {
				xPercent: -100,
				ease: Power2.out
			});
			tl.from(image, 1, {
				xPercent: 100,
				scale: 1,
				delay: -1,
				ease: Power2.out
			});
		});
	}

	/* Text Effect Animation Start */
	if ($('.text-effect').length) {
		var textheading = $(".text-effect");

		if (textheading.length == 0) return; gsap.registerPlugin(SplitText); textheading.each(function (index, el) {

			el.split = new SplitText(el, {
				type: "lines,words,chars",
				linesClass: "split-line"
			});

			if ($(el).hasClass('text-effect')) {
				gsap.set(el.split.chars, {
					opacity: .3,
					x: "-7",
				});
			}
			el.anim = gsap.to(el.split.chars, {
				scrollTrigger: {
					trigger: el,
					start: "top 92%",
					end: "top 60%",
					markers: false,
					scrub: 1,
				},

				x: "0",
				y: "0",
				opacity: 1,
				duration: .7,
				stagger: 0.2,
			});

		});
	}
	/* Text Effect Animation End */

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if ($parallaxie.length && ($window.width() > 991)) {
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function (element) {
				return element.find('img');
			}
		}
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({ focus: false }).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm() {
		var $contactform = $("#contactForm");

		// Add custom subject along with form fields
		var formData = $contactform.serializeArray();
		formData.push({ name: "_replyto", value: $("#email").val() });
		formData.push({ name: "_from", value: "Website Contact Form <no-reply@yourdomain.com>" });
		formData.push({ name: "_subject", value: "Contact request from " + $("#fname").val() + " " + $("#lname").val() });
		formData.push({ name: "_template", value: "table" });
		formData.push({ name: "_captcha", value: "false" });

		$.ajax({
			type: "POST",
			url: "https://formsubmit.co/ajax/info@techwardinfosolutions.com", // 👈 replace with your email
			data: formData,
			dataType: "json",
			success: function (response) {
				if (response.success) {
					formSuccess();
				} else {
					submitMSG(false, "Failed to send. Please try again.");
				}
			},
			error: function () {
				submitMSG(false, "An error occurred while sending the form.");
			}
		});
	}

	// function submitForm(){
	// 	/* Ajax call to submit form */
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "form-process.php",
	// 		data: $contactform.serialize(),
	// 		success : function(text){
	// 			if (text === "success"){
	// 				formSuccess();
	// 			} else {
	// 				submitMSG(false,text);
	// 			}
	// 		}
	// 	});
	// }

	function formSuccess() {
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Animated Wow Js */
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	/* Page Testimonials Item Active Start */
	var $page_testimonials = $('.page-testimonials');
	if ($page_testimonials.length) {
		var $testimonial_item = $page_testimonials.find('.testimonial-item');

		if ($testimonial_item.length) {
			$testimonial_item.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$testimonial_item.removeClass('active');
						$(this).addClass('active');
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* Page Testimonials Item Active End */

	// START: Create Sticky Contact Icons
	var stickyHtml = $('<div>', { class: 'ic-stickey' }).append(
		$('<ul>').append(
			$('<li>', { class: 'whatsapp' }).append(
				$('<a>', {
					href: 'https://api.whatsapp.com/send?phone=919650765250&text=Hello',
					class: 'entypo-whatsApp',
					target: '_blank'
				}).html('WhatsApp <i class="fa-brands fa-whatsapp"></i>')
			),
			$('<li>', { class: 'fb' }).append(
				$('<a>', {
					href: 'tel:+919650765250',
					class: 'entypo-facebook',
					target: '_blank'
				}).html('Phone <i class="fa fa-phone"></i>')
			),
			$('<li>', { class: 'linkedin' }).append(
				$('<a>', {
					href: 'mailto:info@techwardinfosolutions.com',
					class: 'entypo-linkedin',
					target: '_blank'
				}).html('Contact Us <i class="fa fa-envelope" aria-hidden="true" style="padding:7px;"></i>')
			)
		)
	);
	$('body').append($(stickyHtml));
	// END: Create Sticky Contact Icons

	var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();

  $(function () {
      var $s1 = $("<script>", {
          async: true,
          src: "https://embed.tawk.to/690b9f3f8f9062194f4e0527/1j9amc4qc",
          charset: "UTF-8",
          crossorigin: "*"
      });

      // insert before the first existing <script> tag
      $("script").first().before($s1);
  });
$("#header").load("header.html", function () {
    let currentPage = window.location.pathname.split("/").pop(); 

    $("#header .nav-link").each(function () {
        let linkPage = $(this).attr("href");

        if (linkPage === currentPage) {
            $(this).addClass("active");
        }
    });
});

  $("#mainFooter").load("footer.html");


// $(window).on('scroll', function() {
//   if ($(this).scrollTop() < 100) {
//     $('.header-sticky').addClass('show');
//   } else {
//     $('.header-sticky').removeClass('show');
//   }
// });

})(jQuery);
