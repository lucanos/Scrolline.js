/*
* Scrolline.js - Create an indication bar line of scroll position
* Basic usage : $.scrolline();
* ---
* Version: 1.0
* Copyright 2014, Anthony Ly (http://anthonyly.com)
* Released under the MIT Licence
*/

(function($, window, document, undefined) {
    $.extend({
        scrolline: function (options) {
            var defaults = {
                backColor   : '#ecf0f1',
                direction   : 'horizontal',
                frontColor  : '#2ecc71',
                opacity     : 1,
                position    : 'top',
                reverse     : false,
                weight      : 5,
                zindex      : 10,
                scrollEnd   : function() {}
            };

            function Plugin(options) {
                this.params = $.extend(defaults, options);
                this.$back = $(document.createElement('div'));
                this.$front = $(document.createElement('div'));
                this.init();
            }

            Plugin.prototype = {
                init : function() {
                    var self = this,
                        tBack, rBack, bBack, lBack, bgBack,
                        tFront, rFront, bFront, lFront, bgFront;

                    // Direction and position
                    if(self.params.direction != 'vertical') {
                        self.params.direction = 'horizontal';
                        self.params.position = ( self.params.position != 'bottom' ? 'top' : 'bottom' );
                        rBack = lBack = 0;
                        if(self.params.position == 'bottom') {
                            tBack = 'auto';
                            bBack = 0;
                        } else {
                            tBack =  0;
                            bBack = 'auto';
                        }
                    } else {
                        self.params.position = ( self.params.position != 'left' ? 'right' : 'left' );
                        bBack = tBack = 0;
                        if(self.params.position == 'right') {
                            rBack = 0;
                            lBack = 'auto';
                        } else {
                            rBack = 'auto';
                            lBack = 0;
                        }
                    }

                    if(self.params.reverse && self.params.reverse === true) {
                        if(self.params.direction == 'vertical') {
                            bFront = rFront = lFront = 0;
                            tFront = 'auto';
                        } else {
                            bFront = rFront = rFront = 0;
                            lFront = 'auto';
                        }
                    } else {
                        tFront = lFront = 0;
                        bFront = rFront = 'auto';
                    }

                    self.$front.css({
                        height : 0,
                        width : 0,
                        margin: 0,
                        padding: 0,
                        top: tFront,
                        right : rFront,
                        bottom : bFront,
                        left : lFront,
                        background : self.params.frontColor,
                        overflow: 'hidden',
                        position: 'absolute'
                    }).appendTo(self.$back);

                    self.$back.css({
                        width : 0,
                        height : 0,
                        margin: 0,
                        padding: 0,
                        top: tBack,
                        right : rBack,
                        bottom: bBack,
                        left : lBack,
                        background : self.params.backColor,
                        opacity: self.params.opacity,
                        overflow: 'hidden',
                        position: 'fixed',
                        zIndex : self.params.zindex
                    }).appendTo('body');

                    $(window).on("load resize scroll orientationchange", function() {
                        self.scrollListener();
                    });
                },

                scrollListener : function() {
                    var self = this,
                        hWin = $(window).height(),
                        wWin = $(window).width(),
                        hDoc = $(document).height() - hWin,
                        scrollValue = $(window).scrollTop(),
                        wBack, hBack, wFront, hFront, scrollineVal, wRef;

                    if(self.params.direction == 'vertical') {
                        scrollineVal = scrollValue * hWin / hDoc;
                        wBack = self.params.weight;
                        hBack = wRef = hWin;
                        wFront = self.params.weight;
                        hFront = scrollineVal;
                    } else {
                        scrollineVal = scrollValue * wWin / hDoc;
                        wBack = wRef = wWin;
                        hBack = self.params.weight;
                        wFront = scrollineVal;
                        hFront = self.params.weight;
                    }

                    self.$back.css({
                        height: hBack,
                        width: wBack
                    });
                    self.$front.css({
                        height: hFront,
                        width: wFront
                    });

                    if(scrollineVal >= wRef) {
                        self.params.scrollEnd();
                    }
                }
            };

            new Plugin(options);
        }
    });
})(jQuery, window, document);