var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/*
 * simplyScroll 1.0.4 - a scroll-tastic jQuery plugin
 *
 * http://logicbox.net/jquery/simplyscroll
 * http://logicbox.net/blog/simplyscroll-jquery-plugin
 * http://plugins.jquery.com/project/simplyScroll
 *
 * Copyright (c) 2009 Will Kelly - http://logicbox.net
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Last revised: 03/07/2009 21:13
 *
 */

(function($) {

$.fn.simplyScroll = function(o) {
	return this.each(function() {
		new $.simplyScroll(this,o);
	});
};

var defaults = {
	className: 'simply-scroll',
	frameRate: 24, //No of movements per second
	speed: 1, //No of pixels per frame
	horizontal: true,
	autoMode: 'off', //disables buttons 'loop','bounce'
	pauseOnHover: true,
	startOnLoad: false //use this if having rendering problems (safari 3 + Mac OSX?)
};
	
$.simplyScroll = function(el,o) {
	
	var self = this;
	
	this.o = $.extend({}, defaults, o || {});
	this.auto = this.o.autoMode!=="off" ? true : false;
	
	//called on ul/ol/div etc
	this.$list = $(el);
	
	//generate extra markup
	this.$list.addClass('simply-scroll-list')
		.wrap('<div class="simply-scroll-clip"></div>')
		.parent().wrap('<div class="' + this.o.className + ' simply-scroll-container"></div>');
	
	if (!this.o.auto) { //button placeholders
		this.$list.parent().parent()
		.prepend('<div class="simply-scroll-forward"></div>')
		.prepend('<div class="simply-scroll-back"></div>');
	}
	
  if (!this.o.startOnLoad) {
    this.init();
  } else {
    //wait for load before completing setup
    $(window).load(function() { self.init();  });
  }
		
};
	
$.simplyScroll.fn = $.simplyScroll.prototype = {};

$.simplyScroll.fn.extend = $.simplyScroll.extend = $.extend;

$.simplyScroll.fn.extend({
	init: function() {
		//shortcuts
		this.$items = this.$list.children();
		this.$clip = this.$list.parent();
		this.$container = this.$clip.parent();

		if (!this.o.horizontal) {
			this.itemMax = this.$items[0].offsetHeight; //this.$items[0].offsetHeight;
			this.clipMax = this.$clip.height(); //this.$clip[0].offsetHeight;
			this.dimension = 'height';			
			this.moveBackClass = 'simply-scroll-btn-up';
			this.moveForwardClass = 'simply-scroll-btn-down';
		} else {
			this.itemMax = this.$items[0].offsetWidth;
			this.clipMax = this.$clip.width();			
			this.dimension = 'width';
			this.moveBackClass = 'simply-scroll-btn-left';
			this.moveForwardClass = 'simply-scroll-btn-right';
		}
		
		this.posMin = 0;
		this.posMax = this.$items.length * this.itemMax;
		this.$list.css(this.dimension,this.posMax +'px');
		
		if (this.o.autoMode=='loop') {
			var addItems = Math.ceil(this.clipMax / this.itemMax);	
			this.$items.slice(0,addItems).clone(true).appendTo(this.$list);
			this.posMax += (this.clipMax - this.o.speed);
			this.$list.css(this.dimension,this.posMax+(this.itemMax*addItems) +'px');
		}
		
		this.interval = null;	
		this.intervalDelay = Math.floor(1000 / this.o.frameRate);
		
		//ensure that speed is divisible by item width
		while (this.itemMax % this.o.speed !== 0) {
			this.o.speed--;
			if (this.o.speed===0) {
				this.o.speed=1; break;	
			}
		}
		
		var self = this;
		this.trigger = null;
		this.funcMoveBack = function() { self.trigger=this;self.moveBack(); };
		this.funcMoveForward = function() { self.trigger=this;self.moveForward(); };
		this.funcMoveStop = function() { self.moveStop(); };
		this.funcMoveResume = function() { self.moveResume(); };
		
		if (this.auto) {
			if (this.o.pauseOnHover) {
				this.$clip.hover(this.funcMoveStop,this.funcMoveResume);
			}
			this.moveForward();
		} else {
			this.$btnBack = $('.simply-scroll-back',this.$container)
				.addClass('simply-scroll-btn' + ' ' + this.moveBackClass + ' ' + 'disabled')
				.hover(this.funcMoveBack,this.funcMoveStop);
			this.$btnForward = $('.simply-scroll-forward',this.$container)
				.addClass('simply-scroll-btn' + ' ' + this.moveForwardClass)
				.hover(this.funcMoveForward,this.funcMoveStop);
		}
	},
	moveForward: function() {
		var self = this;
		this.movement = 'forward';
		if (this.trigger !== null) {
			this.$btnBack.removeClass('disabled');
		}
		self.interval = setInterval(function() {
			if (!self.o.horizontal && self.$clip[0].scrollTop < (self.posMax-self.clipMax)) {
				self.$clip[0].scrollTop += self.o.speed;
			} else if (self.o.horizontal && self.$clip[0].scrollLeft < (self.posMax-self.clipMax)) {
				self.$clip[0].scrollLeft += self.o.speed; 
			} else if (self.o.autoMode=='loop') {
				self.resetPos();
			} else {
				self.moveStop(self.movement);
			}
		},self.intervalDelay);
	},
	moveBack: function() {
		var self = this;
		this.movement = 'back';
		if (this.trigger !== null) {
			this.$btnForward.removeClass('disabled');
		}
		self.interval = setInterval(function() {
			if (!self.o.horizontal && self.$clip[0].scrollTop>0) {
				self.$clip[0].scrollTop -= self.o.speed;
			} else if (self.o.horizontal && self.$clip[0].scrollLeft>0) {
				self.$clip[0].scrollLeft -= self.o.speed;
			} else if (self.o.autoMode=='loop') {
				self.resetPos();
			} else {
				self.moveStop(self.movement);
			}
		},self.intervalDelay);
	},
	moveStop: function(moveDir) {
		clearInterval(this.interval);	
		if (this.trigger!==null) {
			if (typeof moveDir != "undefined") {
				$(this.trigger).addClass('disabled');
			}
			this.trigger = null;
		}
		if (this.auto) {
			if (this.o.autoMode=='bounce') {
				moveDir == 'forward' ? this.moveBack() : this.moveForward();
			}
		}
	},
	moveResume: function() {
		this.movement=='forward' ? this.moveForward() : this.moveBack();
	},
	resetPos: function() {
		if (!this.o.horizontal) {
			this.$clip[0].scrollTop = 0;
		} else {
			this.$clip[0].scrollLeft = 0;
		}
	}
});
		  
})(jQuery);

}
