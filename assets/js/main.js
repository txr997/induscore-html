/*
	Template Name: SaasRiver - SaaS & StartUp HTML Template
	Author: https://themexriver.com/
	Version: 1.0
*/


(function ($) {
"use strict";



/*
	windows-load-function
*/


window.addEventListener('load', function(){


	if (document.querySelectorAll(".dc-preloader-1").length) {
		const loader = document.querySelector(".dc-preloader-1");
		
		setTimeout(() => {
			loader.classList.add("loaded");
			afterPreloader();
		});
		setTimeout(function () {
			loader.remove();
		}, 1500);

	} else {
		afterPreloader();
	}

	afterPageLoad();

})




/* 
	after-preloader-start
*/
function afterPreloader() {

	// hero-1-intro — the slide entrance plays once the preloader clears
	$(".dc-hero-1-area").addClass("is-ready");

	// hero-2-intro
	$(".dc-hero-2-area").addClass("is-ready");

	// footer-2 wordmark — the letters rise out of the baseline one after another once it scrolls into view
	$(".dc-footer-2-wordmark").each(function (index, el) {
		$(el).addClass("dc-letters-ani");

		ScrollTrigger.create({
			trigger: el,
			start: "top 92%",
			once: true,
			onEnter: function () {
				$(el).addClass("is-in");
			}
		});
	});

	// light shapes — the squares turn and grow one after another, the notches of the faqs photo rise, each as its own element scrolls into view
	$(".dc-clients-2-shape, .dc-choose-2-shape, .dc-projects-2-card-shape, .dc-services-2-img-shape, .dc-faqs-2-left-img").each(function (index, el) {
		$(el).addClass($(el).hasClass("dc-faqs-2-left-img") ? "dc-clip-ani" : "dc-shape-ani");

		ScrollTrigger.create({
			trigger: el,
			start: "top 90%",
			once: true,
			onEnter: function () {
				$(el).addClass("is-in");
			}
		});
	});

	// checker strips — the boxes show up one by one once their strip scrolls into view (the hero's own waits for the first photo)
	$(".dc-checker-ani").each(function (index, el) {
		if ($(el).hasClass("dc-hero-2-checker")) {
			el.style.setProperty("--dc-ck-delay", ".1s");
		}

		ScrollTrigger.create({
			trigger: el,
			start: "top 100%",
			once: true,
			onEnter: function () {
				$(el).addClass("is-in");
			}
		});
	});

	/*
		only-LTR-direction
	*/
	if (getComputedStyle(document.body).direction !== "rtl") {

		// section-title-1
		if($(".el_title_ani_1").length) {
			var el_title_ani_1 = $(".el_title_ani_1");
			if(el_title_ani_1.length == 0) return;
			gsap.registerPlugin(SplitText);

			el_title_ani_1.each(function(index, el) {

				el.split = new SplitText(el, { 
					type: "lines",
					linesClass: "split-line"
				});

				gsap.set(el, { perspective: 2000, transformStyle: "preserve-3d" });

				if( $(el).hasClass('el_title_ani_1') ){
					gsap.set(el.split.lines, {
						yPercent: 100,
						opacity: 0,
						rotationX: -100
					});
				}

				var splitDelay = parseFloat($(el).attr('data-split-delay')) || 0;

				el.anim = gsap.to(el.split.lines, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
					},
					rotationX: 0,
					yPercent: 0,
					scaleX: 1,
					opacity: 1,
					duration: .4,
					stagger: 0.1,
					delay: splitDelay
				});

			});
		}


		// section-title-1 — lines slide up from behind their own mask
		if($(".wa_title_ani_1").length) {
			gsap.registerPlugin(SplitText);

			$(".wa_title_ani_1").each(function (index, el) {

				// double split: the second pass wraps each line in a mask
				var wa_title_line = new SplitText(el, {
					type: "lines",
					linesClass: "wa-split-line"
				});
				new SplitText(el, {
					type: "lines",
					linesClass: "wa-split-mask"
				});

				var wa_title_delay = parseFloat($(el).attr('data-split-delay')) || 0;

				gsap.set(wa_title_line.lines, {
					yPercent: 110,
					opacity: 0
				});

				gsap.to(wa_title_line.lines, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
					},
					yPercent: 0,
					opacity: 1,
					duration: .9,
					ease: "power3.out",
					stagger: .1,
					delay: wa_title_delay
				});

			});
		}


		// choose-1-count: the figures count up from zero once the list scrolls into view
		if($(".dc-choose-1-list .num").length) {
			gsap.registerPlugin(ScrollTrigger);

			$(".dc-choose-1-list .num").each(function (index, el) {
				var dc_choose1_target = parseInt($(el).text(), 10);
				var dc_choose1_count = { value: 0 };

				$(el).text(0);

				gsap.to(dc_choose1_count, {
					scrollTrigger: {
						trigger: el,
						start: "top 88%",
						once: true
					},
					value: dc_choose1_target,
					duration: 1.8,
					ease: "power2.out",
					delay: .3 + index * .1,
					onUpdate: function () {
						$(el).text(Math.round(dc_choose1_count.value));
					}
				});
			});
		}


		// work-1-bg: the angle sweeps in from the left, then the light behind it flares up and settles
		if($(".dc-work-1-bg-angle").length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsap.registerPlugin(ScrollTrigger);

			var dc_work1_bg = gsap.timeline({
				scrollTrigger: {
					trigger: ".dc-work-1-area",
					start: "top 70%",
					once: true
				}
			});

			dc_work1_bg
				.from(".dc-work-1-bg-angle", {
					xPercent: -25,
					opacity: 0,
					duration: 1.4,
					ease: "power3.out"
				})
				.fromTo(".dc-work-1-bg-color", {
					opacity: 0,
					filter: "brightness(.4)"
				}, {
					opacity: 1,
					filter: "brightness(1.5)",
					duration: 1,
					ease: "power2.in"
				}, .5)
				.to(".dc-work-1-bg-color", {
					filter: "brightness(1)",
					duration: .9,
					ease: "power2.out",
					clearProps: "filter"
				});
		}


		// price-1-photo: the photo opens from the right while it settles from a zoom, then the contact box rises in
		if($(".dc-price-1-card .photo").length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsap.registerPlugin(ScrollTrigger);

			var dc_price1_photo = ".dc-price-1-card .photo";

			gsap.timeline({
				scrollTrigger: {
					trigger: dc_price1_photo,
					start: "top 80%",
					once: true
				}
			})
				.fromTo(dc_price1_photo, {
					clipPath: "inset(0% 0% 0% 100% round 12px)"
				}, {
					clipPath: "inset(0% 0% 0% 0% round 12px)",
					duration: 1.2,
					ease: "power3.inOut",
					clearProps: "clipPath"
				})
				.from(dc_price1_photo + " .img", {
					scale: 1.25,
					duration: 1.6,
					ease: "power2.out"
				}, 0)
				.from(dc_price1_photo + " .contact", {
					y: 40,
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				}, .9);
		}


		// about-1-title — the avatars gather in the middle of the title and fly into their places while the words blur in, all tied to the scroll
		if($(".dc-about-1-sec-title").length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsap.registerPlugin(ScrollTrigger, SplitText);

			var dc_about1_title = document.querySelector(".dc-about-1-sec-title");
			var dc_about1_slots = gsap.utils.toArray(".slot", dc_about1_title);
			var dc_about1_avatars = gsap.utils.toArray(".avatar", dc_about1_title);
			var dc_about1_split = new SplitText(dc_about1_title, {
				type: "words",
				wordsClass: "split-word"
			});

			// where avatar i waits at the start: a row across the middle of the title, measured against its slot (the slot never moves)
			function dc_about1_start(i) {
				var box = dc_about1_title.getBoundingClientRect();
				var slot = dc_about1_slots[i].getBoundingClientRect();
				var vw = window.innerWidth;

				return {
					x: box.left + box.width / 2 + (i - (dc_about1_slots.length - 1) / 2) * Math.min(vw / 5, 190) - (slot.left + slot.width / 2),
					y: box.top + box.height / 2 - (slot.top + slot.height / 2),
					scale: Math.min(110, vw / 6) / slot.width
				};
			}

			var dc_about1_tl = gsap.timeline({
				defaults: {
					ease: "power2.inOut"
				},
				scrollTrigger: {
					trigger: dc_about1_title,
					start: "top 85%",
					end: "bottom 35%",
					scrub: 1,
					invalidateOnRefresh: true
				}
			});

			// the avatars take off one after the other, turning once around as they go
			dc_about1_avatars.forEach(function (avatar, i) {
				dc_about1_tl.fromTo(avatar, {
					x: function () { return dc_about1_start(i).x; },
					y: function () { return dc_about1_start(i).y; },
					scale: function () { return dc_about1_start(i).scale; },
					rotation: 0
				}, {
					x: 0,
					y: 0,
					scale: 1,
					rotation: i % 2 ? -360 : 360,
					duration: 1.4
				}, .1 + i * .12);
			});

			// the words come up out of the blur while they travel
			dc_about1_tl.fromTo(dc_about1_split.words, {
				opacity: 0,
				y: 28,
				filter: "blur(6px)"
			}, {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				duration: .6,
				stagger: .07,
				ease: "power2.out"
			}, .5);

			// the finished title rests for a moment before the scroll leaves it
			dc_about1_tl.to({}, { duration: .4 });

			// the web font changes the line breaks — measure again once it is in
			if (document.fonts && document.fonts.ready) {
				document.fonts.ready.then(function () {
					ScrollTrigger.refresh();
				});
			}
		}


		// services-1-cards — card 01 stays, the other cards ride up from below one after the other and lie over it while the tall box scrolls (desktop widths only)
		if($(".dc-services-1-cards-height").length) {
			gsap.registerPlugin(ScrollTrigger);

			var dc_services1_height = document.querySelector(".dc-services-1-cards-height");
			var dc_services1_pin = dc_services1_height.querySelector(".dc-services-1-cards-pin");
			var dc_services1_box = dc_services1_height.querySelector(".dc-services-1-cards");
			var dc_services1_cards = gsap.utils.toArray(".dc-services-1-card", dc_services1_height);

			gsap.matchMedia().add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", function () {

				// where the pin sticks (css) — the scroll of the tall box runs from the moment it sticks until the moment it lets go
				function dc_services1_top() {
					return parseFloat(getComputedStyle(dc_services1_pin).top) || 0;
				}

				// how far a card waits down: just past the bottom of the screen while the pin sticks, so it is out of sight until its turn
				function dc_services1_hidden() {
					return window.innerHeight - dc_services1_top() - dc_services1_box.offsetTop + 2;
				}

				var dc_services1_tl = gsap.timeline({
					scrollTrigger: {
						trigger: dc_services1_height,
						start: function () { return "top " + dc_services1_top() + "px"; },
						end: function () { return "bottom " + (dc_services1_top() + dc_services1_pin.offsetHeight) + "px"; },
						scrub: true,
						invalidateOnRefresh: true
					}
				});

				dc_services1_cards.slice(1).forEach(function (card) {
					dc_services1_tl.fromTo(card, {
						y: dc_services1_hidden
					}, {
						y: 0,
						duration: 1,
						ease: "power2.inOut"
					}, ">+.1");
				});

				// the finished stack rests for a moment before the scroll leaves it
				dc_services1_tl.to({}, { duration: .3 });
			});
		}


		// hero-1-intro — everything else rides in right behind the titles
		if($(".wa_hero_ani_1").length) {
			var wa_hero_ani_1_tl = gsap.timeline({ delay: .25 });

			wa_hero_ani_1_tl
				.from(".wa_hero_ani_1 .lt-subtitle-1", {
					y: 24,
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				})
				.from(".wa_hero_ani_1 .lt-hero-1-truck", {
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				}, "-=.35")
				.from(".wa_hero_ani_1 .lt-hero-1-disc", {
					y: 24,
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				}, "-=.5")
				.from(".wa_hero_ani_1 .btn-elm > *", {
					y: 24,
					opacity: 0,
					duration: .8,
					stagger: .12,
					ease: "power3.out"
				}, "-=.5")
				.from(".wa_hero_ani_1 .lt-hero-1-accordion-item", {
					x: 40,
					opacity: 0,
					duration: .8,
					stagger: .12,
					ease: "power3.out"
				}, "-=.7");
		}


		// hero-2-intro — the artwork settles in as the preloader clears
		if($(".lt-hero-2-img-box").length) {
			var lt_hero2_imgs = gsap.utils.toArray(".lt-hero-2-img-main img");
			var lt_hero2_tl = gsap.timeline({ delay: .2 });

			// every visual waits below the frame, the first one rides up
			gsap.set(lt_hero2_imgs, { yPercent: 100 });

			lt_hero2_tl
				.from(".lt-hero-2-img-bg img", {
					scale: 1.35,
					duration: 1.8,
					ease: "power3.out"
				})
				.to(lt_hero2_imgs[0], {
					yPercent: 0,
					duration: 1.4,
					ease: "power3.out"
				}, "-=1.35");

			// then they keep taking turns: one drops away as the next rides up
			if (lt_hero2_imgs.length > 1) {
				var lt_hero2_loop = gsap.timeline({ repeat: -1 });

				lt_hero2_imgs.forEach(function (img, index) {
					var lt_hero2_next = lt_hero2_imgs[(index + 1) % lt_hero2_imgs.length];

					lt_hero2_loop
						.to({}, { duration: 2 })
						.to(img, {
							yPercent: 100,
							duration: .9,
							ease: "power3.in"
						})
						.fromTo(lt_hero2_next, {
							yPercent: 100
						}, {
							yPercent: 0,
							duration: .9,
							ease: "power3.out"
						});
				});

				lt_hero2_tl.add(lt_hero2_loop);
			}
		}


		// hero-3-intro — the hero settles in as the preloader clears
		if($(".lt-hero-3-area").length) {
			var lt_hero3_tl = gsap.timeline({ delay: .2 });

			lt_hero3_tl
				.from(".lt-hero-3-rating", {
					y: 24,
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				})
				.from(".lt-hero-3-disc", {
					y: 24,
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				}, "-=.6")
				.from(".lt-hero-3-form", {
					x: 60,
					opacity: 0,
					duration: 1,
					ease: "power3.out"
				}, "-=.85")

				// the glass cards fan out from behind the form
				.from(".lt-hero-3-form-box .ghost-card", {
					x: -24,
					y: -24,
					opacity: 0,
					duration: .8,
					stagger: .12,
					ease: "power3.out"
				}, "-=.55")
				.from(".lt-hero-3-line", {
					scaleX: 0,
					transformOrigin: "left center",
					duration: 1.1,
					ease: "power3.out"
				}, "<")
				.from(".lt-hero-3-bottom .btn-elm ", {
					y: 24,
					opacity: 0,
					duration: .7,
					stagger: .12,
					ease: "power3.out",

					// hand the transform back to css so the hover lift keeps working
					clearProps: "transform"
				}, "-=.5")
				.from(".lt-hero-3-partner", {
					opacity: 0,
					duration: .9,
					ease: "power2.out"
				}, "-=.5");
		}


		// footer-1-copy-name — once the word is really on screen, the letters rise from below, from the middle outwards, and overshoot lightly before they settle
		if($(".dc-footer-1-copy .name").length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsap.registerPlugin(ScrollTrigger, SplitText);

			var dc_footer1_name = document.querySelector(".dc-footer-1-copy .name");
			var dc_footer1_split = new SplitText(dc_footer1_name, {
				type: "chars",
				charsClass: "split-char"
			});

			gsap.from(dc_footer1_split.chars, {
				scrollTrigger: {
					trigger: dc_footer1_name,
					start: "clamp(top 88%)",
					once: true
				},
				yPercent: 60,
				opacity: 0,
				filter: "blur(10px)",
				duration: 1.1,
				ease: "back.out(2.4)",
				stagger: {
					each: .08,
					from: "center"
				},
				clearProps: "filter"
			});
		}


		// footer-big-title — the letters keep driving in and out like a convoy
		function waFooterTitleAnim() {
			gsap.registerPlugin(SplitText);

			var lt_footer_title = new SplitText(".lt-footer-1-big-title", {
				type: "chars",
				charsClass: "split-char"
			});

			var lt_footer_title_tl = gsap.timeline({
				repeat: -1,
				repeatDelay: .6,
				paused: true
			});

			lt_footer_title_tl
				.fromTo(lt_footer_title.chars, {
					xPercent: -160,
					skewX: 24,
					opacity: 0
				}, {
					xPercent: 0,
					skewX: 0,
					opacity: 1,
					duration: 1,
					ease: "power3.out",
					stagger: .07
				})
				.to(lt_footer_title.chars, {
					xPercent: 160,
					skewX: -24,
					opacity: 0,
					duration: .8,
					ease: "power2.in",
					stagger: .06
				}, "+=1.6");

			// only run the loop while the footer is on screen — always from the top,
			// so it never resumes half-way through a letter fly-out
			ScrollTrigger.create({
				trigger: ".lt-footer-1-big-title",
				start: "top bottom",
				end: "bottom top",
				markers: false,
				onToggle: function (self) {
					if (self.isActive) {
						lt_footer_title_tl.restart(true);
					} else {
						lt_footer_title_tl.pause(0);
					}
				}
				
			});

			// the layout shifts while images load — re-measure the trigger
			ScrollTrigger.refresh();
		}
		waFooterTitleAnim();

	}


	/*
		clip-anim-start
	*/
	function waClipAnim() {

		const waClipWraps = document.querySelectorAll(".wa_clip_anim");
		if (!waClipWraps.length) return;

		const waClipObserver = new IntersectionObserver((entries, obs) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				const wrap = entry.target;
				const img = wrap.querySelector(".wa_clip_anim_img[data-animate='true']");
				if (!img) return;

				const url = img.getAttribute("src");

				// ensure relative position
				if (getComputedStyle(wrap).position === "static") {
					wrap.style.position = "relative";
				}

				// remove old masks
				wrap.querySelectorAll(".mask").forEach((mask) => mask.remove());

				const waClipFragment = document.createDocumentFragment();

				for (let i = 0; i < 9; i++) {
					const mask = document.createElement("div");
					mask.className = `mask mask-${i + 1}`;
					mask.style.backgroundImage = `url(${url})`;
					waClipFragment.appendChild(mask);
				}

				wrap.appendChild(waClipFragment);

				// paint the closed state first, then play the reveal
				requestAnimationFrame(function () {
					requestAnimationFrame(function () {
						wrap.classList.add("animated");
					});
				});

				// stop observing after trigger
				obs.unobserve(wrap);
			});
		}, { threshold: 0.2 });

		waClipWraps.forEach((wrap) => waClipObserver.observe(wrap));
	}
	waClipAnim();
/*
	after-preloader-end
*/
}



/* 
	after-page-load-start
*/
function afterPageLoad() {

	/* 
		add-active-class
	*/
	const waAddClass = gsap.utils.toArray('.wa_add_class');
	waAddClass.forEach(waAddClassItem => {
		gsap.to(waAddClassItem, {
			scrollTrigger: {
				trigger: waAddClassItem,
				start: "top 90%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				toggleClass: "active",
				once: true,
				markers: false,
			}
		});
	});


	/* 
		wow-activation
	*/
	if($('.wow').length){
		var wow = new WOW({
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       100,
			mobile:       true,
			live:         true
		});
		wow.init();
	};


		

/* 
	after-page-load-start
*/
}



/*
	clip-anim-end
*/





// price-1-ani-img — grows in from the top-right corner as the section scrolls up
if($(".lt-price-1-ani-img").length) {
	gsap.from(".lt-price-1-ani-img", {
		scrollTrigger: {
			trigger: ".lt-price-1-ani-img",
			start: "top bottom",
			end: "top 35%",
			scrub: 1,
		},
		scale: .45,
		xPercent: 18,
		yPercent: -18,
		transformOrigin: "top right",
		ease: "none"
	});
}





// process-1-bg — drives in from the right as the section scrolls up
if($(".lt-process-1-bg-img").length) {
	gsap.from(".lt-process-1-bg-img", {
		scrollTrigger: {
			trigger: ".lt-process-1-bg-img",
			start: "top bottom",
			end: "top 35%",
			scrub: 1,
		},
		xPercent: 280,
		ease: "none"
	});
}


// cta-3-plane — the plane comes down from the top right and lands
if($(".lt-cta-3-plane").length) {
	gsap.from(".lt-cta-3-plane", {
		scrollTrigger: {
			trigger: ".lt-cta-3-area",
			start: "top 90%",
		},
		xPercent: 80,
		yPercent: -170,
		rotation: 14,
		opacity: 0,
		duration: 1.6,
		ease: "power3.out"
	});
}

// faqs-2-shapes — the side shapes slide in from their own edge
if($(".lt-faqs-2-bg-shape-1, .lt-faqs-2-bg-shape-2").length) {
	var lt_faqs_shape_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-faqs-2-area",
			start: "top 50%",
		}
	});

	lt_faqs_shape_tl

		// inside shape-1 the panel and the ribbons come from opposite sides
		.from(".lt-faqs-2-bg-shape-1 .elm-1", {
			xPercent: -60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},)
		.from(".lt-faqs-2-bg-shape-2 .elm-1", {
			xPercent: 60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<")
		.from(".lt-faqs-2-bg-shape-1 .elm-2", {
			xPercent: -60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<30%")
		.from(".lt-faqs-2-bg-shape-2 .elm-2", {
			xPercent: 60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<")
		.from(".lt-faqs-2-bg-shape-1 .elm-3", {
			xPercent: -60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<30%")
		.from(".lt-faqs-2-bg-shape-2 .elm-3", {
			xPercent: 60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<")

}


// achieve-2-img — the photo cluster drops into place on scroll-in
if($(".lt-achieve-2-img").length) {
	var lt_achieve_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-achieve-2-img",
			start: "top 80%",
		}
	});

	lt_achieve_tl
		.from(".lt-achieve-2-img .has-pos-1", {
			x: -60,
			scale: .9,
			opacity: 0,
			duration: 1,
			ease: "power3.out"
		})
		.from(".lt-achieve-2-img .has-pos-2", {
			y: -60,
			scale: .9,
			opacity: 0,
			duration: 1,
			ease: "power3.out"
		}, "-=.75")
		.from(".lt-achieve-2-img .has-pos-3", {
			y: 60,
			scale: .9,
			opacity: 0,
			duration: 1,
			ease: "power3.out"
		}, "-=.75");
}


// awards-2-left — the client mosaic builds itself up on scroll-in
if($(".lt-awards-2-left").length) {
	var lt_awards_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-awards-2-left",
			start: "top 80%",
		}
	});

	lt_awards_tl
		.from(".lt-awards-2-big-title", {
			x: -60,
			opacity: 0,
			duration: 1,
			ease: "power3.out"
		})
		.from(".lt-awards-2-logo .single-logo", {
			scale: .6,
			opacity: 0,
			duration: .7,
			stagger: {
				each: .06,
				from: "random"
			},
			ease: "power3.out"
		}, "-=.7")
		.from(".lt-awards-2-counter", {
			scale: .8,
			opacity: 0,
			duration: .9,
			ease: "back.out(1.6)"
		}, "-=.45");
}


// projects-2-stack — each card opens up through the star mask while its photo
// zooms out, one card per screen of pinned scroll
if($(".lt-projects-2-height").length) {
	var lt_projects2_cards = gsap.utils.toArray(".lt-projects-2-card");

	// only where the section is pinned — keep in sync with scss/layout/_projects.scss
	gsap.matchMedia().add("(min-width: 992px)", function () {
		var lt_projects2_tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".lt-projects-2-height",
				start: "top 30%",
				end: "bottom bottom",
				scrub: 1,
			}
		});

		lt_projects2_cards.forEach(function (card, index) {
			var lt_projects2_img = card.querySelector(".img-elm img");
			var lt_projects2_content = card.querySelectorAll(".tag-elm, .title, .dvr-line, .disc, .lt-projects-2-btn");

			lt_projects2_tl
				.fromTo(card, {
					"--wa-mask": "0px"
				}, {
					"--wa-mask": "5000px",
					ease: "none",
					duration: 1
				}, index)
				.fromTo(lt_projects2_img, {
					scale: 1.3
				}, {
					scale: 1,
					ease: "none",
					duration: 1
				}, index)

				// the copy rides in once the card is half open
				.from(lt_projects2_content, {
					y: 40,
					opacity: 0,
					duration: .5,
					stagger: .08,
					ease: "power3.out"
				}, index + .3);
		});
	});
}


// blog-1-btn-wrap — the rails draw out and the dots ride in from both sides
if($(".lt-blog-1-btn-wrap").length) {
	var lt_blog_btn_lines = document.querySelectorAll(".lt-blog-1-btn-wrap .line");
	var lt_blog_btn_dots = document.querySelectorAll(".lt-blog-1-btn-wrap .dot-elm");

	var lt_blog_btn_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-blog-1-btn-wrap",
			start: "top 88%",
		}
	});

	lt_blog_btn_tl
		.from(lt_blog_btn_lines[0], {
			scaleX: 0,
			transformOrigin: "left center",
			duration: 1,
			ease: "power3.out"
		})
		.from(lt_blog_btn_lines[1], {
			scaleX: 0,
			transformOrigin: "right center",
			duration: 1,
			ease: "power3.out"
		}, "<")
		.from(lt_blog_btn_dots[0], {
			x: -60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		}, "-=.6")
		.from(lt_blog_btn_dots[1], {
			x: 60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		}, "<");
}


// clients-1-slider
var lt_services1_slider = new Swiper(".lt_services1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 24,
    slidesPerView: "auto",

	pagination: {
		el: '.lt_services1_slider_pagination',
		type: 'fraction',
	},
	navigation: {
		nextEl: '.lt_services1_slider_next',
		prevEl: '.lt_services1_slider_prev',
	},
});

// projects-1-slider
var lt_projects1_total = $('.lt_projects1_slider .swiper-slide').length;

// free space after the last slide, so every card can reach the left edge
// of the slider and become the featured one
function lt_projects1_offset(swiper) {
	var offset = Math.max(0, swiper.width - swiper.slides[swiper.activeIndex].offsetWidth);

	if (swiper.params.slidesOffsetAfter !== offset) {
		swiper.params.slidesOffsetAfter = offset;
		swiper.update();
	}
}

var lt_projects1_slider = new Swiper(".lt_projects1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 28,
	slidesPerView: "auto",

	pagination: {
		el: '.lt_projects1_slider_pagination',
		type: 'fraction',
		renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span>/<span class="' + totalClass + '"></span>';
		},
		formatFractionCurrent: function (number) {
			return ('0' + number).slice(-2);
		},
		formatFractionTotal: function () {
			return lt_projects1_total;
		},
	},
	navigation: {
		nextEl: '.lt_projects1_slider_next',
		prevEl: '.lt_projects1_slider_prev',
	},

	on: {
		afterInit: function () {
			lt_projects1_offset(this);
		},
		resize: function () {
			lt_projects1_offset(this);
		},
		// the featured card is wider than the rest, so the grid has to be
		// re-measured the moment the active class moves to another slide
		slideChangeTransitionStart: function () {
			this.updateSlides();
			this.updateSlidesOffset();
			this.updateProgress();

			var translate = -this.slidesGrid[this.activeIndex];
			translate = Math.min(Math.max(translate, this.maxTranslate()), this.minTranslate());
			this.setTranslate(translate);
		},
	},
});

// choose-1-slider
var lt_choose1_slider = new Swiper(".lt_choose1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 16,
	slidesPerView: 1,

	navigation: {
		nextEl: '.lt_choose1_slider_next',
		prevEl: '.lt_choose1_slider_prev',
	},

	breakpoints: {
		768: {
			slidesPerView: 2,
		},
		1200: {
			slidesPerView: 3,
		},
	},
});

// testimonial-1-slider
var lt_testimonial1_imgs = [];

$('.lt_testimonial1_slider .swiper-slide .item-img img').each(function () {
	lt_testimonial1_imgs.push($(this).attr('src'));
});

// the two thumbs beside the card preview the previous / next slide
function lt_testimonial1_preview(swiper) {
	var total = lt_testimonial1_imgs.length;
	if (!total) return;

	$('.lt_testimonial1_prev_img img').attr('src', lt_testimonial1_imgs[(swiper.realIndex - 1 + total) % total]);
	$('.lt_testimonial1_next_img img').attr('src', lt_testimonial1_imgs[(swiper.realIndex + 1) % total]);
}

var lt_testimonial1_slider = new Swiper(".lt_testimonial1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 28,
	slidesPerView: 1,

	pagination: {
		el: '.lt_testimonial1_slider_pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.lt_testimonial1_slider_next',
		prevEl: '.lt_testimonial1_slider_prev',
	},

	on: {
		afterInit: function () {
			lt_testimonial1_preview(this);
		},
		slideChange: function () {
			lt_testimonial1_preview(this);
		},
	},
});


// testimonial-1-slider — the two thumbs beside the card preview the previous / next slide
var dc_testimonial1_imgs = [];

$('.dc_testimonial1_slider .swiper-slide .item-img img').each(function () {
	dc_testimonial1_imgs.push($(this).attr('src'));
});

function dc_testimonial1_preview(swiper) {
	var total = dc_testimonial1_imgs.length;
	if (!total) return;

	$('.dc-testimonial-1-thumb.has-prev img').attr('src', dc_testimonial1_imgs[(swiper.realIndex - 1 + total) % total]);
	$('.dc-testimonial-1-thumb.has-next img').attr('src', dc_testimonial1_imgs[(swiper.realIndex + 1) % total]);
}

var dc_testimonial1_slider = new Swiper(".dc_testimonial1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 0,
	slidesPerView: 1,

	navigation: {
		prevEl: ".dc_testimonial1_slider_prev",
		nextEl: ".dc_testimonial1_slider_next",
	},

	on: {
		afterInit: function () {
			dc_testimonial1_preview(this);
		},
		slideChange: function () {
			dc_testimonial1_preview(this);
		},
	},
});


// shipping-1-form-select
if ($('.lt-shipping-1-form .has-select select').length) {
	$('.lt-shipping-1-form .has-select select').niceSelect();
}


// shipping-1-distance-range
$('.lt_shipping1_range').each(function () {
	var $min = $(this).find('.range-min');
	var $max = $(this).find('.range-max');
	var $fill = $(this).find('.fill');
	var $value = $(this).find('.range-value');

	function ltShipping1Pad(number) {
		return number < 10 ? '0' + number : '' + number;
	}

	function ltShipping1Range() {
		var start = parseInt($min.attr('min'), 10);
		var span = parseInt($min.attr('max'), 10) - start;
		var low = Math.min(+$min.val(), +$max.val());
		var high = Math.max(+$min.val(), +$max.val());

		$fill.css({
			left: ((low - start) / span * 100) + '%',
			width: ((high - low) / span * 100) + '%'
		});

		$value.text(ltShipping1Pad(low) + ' - ' + ltShipping1Pad(high));
	}

	$min.add($max).on('input', ltShipping1Range);
	ltShipping1Range();
});


// price-1-monthly-annually-toggle
$('.lt-price-1-toggle-btn .single-btn').on('click', function () {
	var isAnnually = $(this).index() === 1;

	$(this).addClass('active').siblings().removeClass('active');

	$('.lt-price-1-card .price').each(function () {
		var value = isAnnually ? $(this).data('annually') : $(this).data('monthly');
		if (value === undefined) return;
		this.firstChild.nodeValue = value + ' ';
	});
});


// price-1-toggle — the knob slides over and the prices follow
$('.dc-price-1-toggle').each(function () {
	var $toggle = $(this);
	var $switch = $toggle.find('.switch');
	var $labels = $toggle.find('.label');
	var $cards = $toggle.closest('.dc-price-1-area').find('.dc-price-1-card');

	function dcPrice1Set(isAnnually) {
		var plan = isAnnually ? 'annually' : 'monthly';

		$toggle.toggleClass('is-annually', isAnnually);
		$switch.attr('aria-checked', isAnnually);
		$labels.each(function () {
			$(this).toggleClass('is-active', $(this).data('plan') === plan);
		});
		$cards.find('.amount, .per').each(function () {
			$(this).text($(this).data(plan));
		});
	}

	$switch.on('click', function () {
		dcPrice1Set(!$toggle.hasClass('is-annually'));
	});

	$labels.on('click', function () {
		dcPrice1Set($(this).data('plan') === 'annually');
	});
});


// hero-1-slider
var dc_hero1_slider = new Swiper(".dc_hero1_slider", {
	loop: true,
	// the leaving slide stays on screen while its photos fade out — see _hero.scss
	speed: 1000,
	slidesPerView: 1,
	effect: 'fade',
	fadeEffect: {
		crossFade: false
	},
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},

	pagination: {
		el: '.dc_hero1_slider_pagination',
		clickable: true,
	},
});


// hero-2-slider — the line on the left is its pagination. No loop: it rewinds, so there are no cloned slides
// to swap in and replay the entrance. The slide that is going out is marked (is-leaving) while the next one comes in — see _hero.scss
var dc_hero2_slider = new Swiper(".dc_hero2_slider", {
	rewind: true,
	// the wipe takes 2.25s, the leaving slide has to stay on screen until it is done
	speed: 2600,
	slidesPerView: 1,
	effect: 'fade',
	fadeEffect: {
		crossFade: false
	},
	autoplay: {
		delay: 7000,
		disableOnInteraction: false,
	},

	pagination: {
		el: '.dc_hero2_slider_pagination',
		clickable: true,
	},

	on: {
		slideChangeTransitionStart: function () {
			var leaving = this.slides[this.previousIndex];
			this.slides.forEach(function (slide) {
				slide.classList.remove('is-leaving');
			});
			if (leaving) {
				leaving.classList.add('is-leaving');
			}
		},
		slideChangeTransitionEnd: function () {
			this.slides.forEach(function (slide) {
				slide.classList.remove('is-leaving');
			});
		},
	},
});


// projects-1-slider — the slides keep their own width and the row runs past the edge
var dc_projects1_slider = new Swiper(".dc_projects1_slider", {
	loop: true,
	slidesPerView: "auto",
	spaceBetween: 24,
	speed: 600,
});


// about-1-slider
var dc_about1_slider = new Swiper(".dc_about1_slider", {
	loop: true,
	spaceBetween: 34,
	speed: 600,
	slidesPerView: 1,

	navigation: {
		prevEl: ".dc_about1_slider_prev",
		nextEl: ".dc_about1_slider_next",
	},
});


// expert-2 bg video — the photo stays until the video really plays
var dc_expert2_video = document.querySelector(".dc-expert-2-bg-video");
if (dc_expert2_video) {
	var dc_expert2_video_on = function () {
		dc_expert2_video.parentElement.classList.add("is-playing");
	};

	dc_expert2_video.addEventListener("playing", dc_expert2_video_on);

	/* it may already be running by the time this line is reached */
	if (!dc_expert2_video.paused && dc_expert2_video.readyState > 2) {
		dc_expert2_video_on();
	}
}


// contact-2 bg parallax — the photo is taller than the section and drifts down while the page scrolls up
if (document.querySelector(".dc-contact-2-bg") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	gsap.fromTo(".dc-contact-2-bg", {
		yPercent: -12
	}, {
		yPercent: 12,
		ease: "none",
		scrollTrigger: {
			trigger: ".dc-contact-2-area",
			start: "top bottom",
			end: "bottom top",
			scrub: 0.5
		}
	});
}


// pr-btn-2 — the little boxes that turn and grow until they fill the button on hover
document.querySelectorAll(".dc-pr-btn-2").forEach(function (btn) {
	var size = 24;
	var boxes = document.createElement("span");
	boxes.className = "boxes";
	boxes.setAttribute("aria-hidden", "true");
	btn.insertBefore(boxes, btn.firstChild);

	/* as many boxes as fit the button, every one with its own delay: a wave from the lower-left with a little chaos in it */
	var build = function () {
		var cols = Math.ceil(btn.offsetWidth / size);
		var rows = Math.ceil(btn.offsetHeight / size);
		if (!cols || !rows || boxes.dataset.grid === cols + "x" + rows) {
			return;
		}
		boxes.dataset.grid = cols + "x" + rows;
		boxes.style.setProperty("--cols", cols);
		boxes.style.setProperty("--rows", rows);

		var html = "";
		for (var r = 0; r < rows; r++) {
			for (var c = 0; c < cols; c++) {
				var d = (c / cols) * 0.3 + ((rows - 1 - r) / rows) * 0.1 + Math.random() * 0.14;
				html += '<span style="--d:' + d.toFixed(2) + 's"></span>';
			}
		}
		boxes.innerHTML = html;
	};

	build();
	if (window.ResizeObserver) {
		new ResizeObserver(build).observe(btn);
	} else {
		window.addEventListener("load", build);
		window.addEventListener("resize", build);
	}
});


// choose-2-slider — the photo band, the dots under it are the pagination
var dc_choose2_slider = new Swiper(".dc_choose2_slider", {
	loop: true,
	speed: 800,
	effect: "fade",
	fadeEffect: {
		crossFade: true
	},

	autoplay: {
		delay: 4500,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},

	pagination: {
		el: ".dc_choose2_slider_dots",
		clickable: true,
	},
});


// services-2-slider — the slides keep their own width and the row runs past the edge
var dc_services2_slider = new Swiper(".dc_services2_slider", {
	loop: true,
	slidesPerView: "auto",
	spaceBetween: 20,
	speed: 600,

	navigation: {
		prevEl: ".dc_services2_slider_prev",
		nextEl: ".dc_services2_slider_next",
	},
});


var lt_about2_slider = new Swiper(".lt_about2_slider", {
	loop: true,
	spaceBetween: 0,
	speed: 500,
	slidesPerView: 1,
	effect: 'fade',
	fadeEffect: {
		crossFade: true 
	},
	  
	navigation: {
		prevEl: ".lt_about2_slider_prev",
		nextEl: ".lt_about2_slider_next",
	},

});








})(jQuery);