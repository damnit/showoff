/*jslint browser:true */
var Showoff = (function () {
    var SHOWOFF = {
        "bound": [],
        "keymap": {
            "left": {charCode: 0, keyCode: 37},
            "right": {charCode: 0, keyCode: 39},
            "down": {charCode: 0, keyCode: 40},
            "up": {charCode: 0, keyCode: 38},
            "space": {charCode: 32, keyCode: 0}
        },
        "slideIndex": 0,
        "slideClass": "slide",
        "next": null,
        "previous": null,
        "util": {},
        "log": {
            "loglevel": null,
            "debug": function(data){
                if (SHOWOFF.log.loglevel === null){
                    return;
                }
                console.log(data);
            },
            "error": function(data){
                if (SHOWOFF.log.loglevel === null){
                    return;
                }
                console.error(data);
            }
        },
    };

    function matchKey (ev, mapped){
        var prop;
        mapped = SHOWOFF.keymap[mapped];
        for(prop in mapped){
            if(mapped[prop] !== ev[prop]){
                return false;
            }
        }
        return true;
    }

    function regKeyPress(){
        var i;
        window.onkeydown = function(ev){
            SHOWOFF.log.debug(ev);
            for (i=0; i<SHOWOFF.bound.length; i++){
                if (matchKey(ev, SHOWOFF.bound[i].key) === true){
                    SHOWOFF.bound[i].callback(SHOWOFF.bound[i].args);
                }
            }
        };
    }


    SHOWOFF.init = function(config){
        var bind;
        SHOWOFF.slideClass = config.slideClass || "slide";
        SHOWOFF.next = config.next || SHOWOFF.next;
        SHOWOFF.previous = config.previous || SHOWOFF.previous;
        SHOWOFF.updateProgressBar = config.updateProgressBar || SHOWOFF.updateProgressBar;
        SHOWOFF.log.loglevel = config.loglevel || null;
        for (bind in config.binds) {
            if(config.binds.hasOwnProperty(bind)){
                SHOWOFF.bindKey(bind, config.binds[bind]);
            }
        }
        SHOWOFF.length = document.getElementsByClassName(SHOWOFF.slideClass).length;
        SHOWOFF.updateProgressBar(SHOWOFF.progress());
        return SHOWOFF;
    };

    SHOWOFF.next = function(){
        if (SHOWOFF.length <= SHOWOFF.slideIndex+1) {
            var error = new Error("end of slides");
            SHOWOFF.log.error(error.message);
            throw error;
        }
        document.getElementById('slide' + SHOWOFF.getSlideID()).style.display = 'none';
        SHOWOFF.slideIndex+=1;
        SHOWOFF.log.debug("[SHOWOFF.next] " + SHOWOFF.slideIndex);
        document.getElementById('slide' + SHOWOFF.getSlideID()).style.display = 'block';
        SHOWOFF.updateProgressBar(SHOWOFF.progress());
    };

    SHOWOFF.previous = function(){
        if (SHOWOFF.slideIndex-1 < 0) {
            var error = new Error("start of slides");
            SHOWOFF.log.error(error.message);
            throw error;
        }
        document.getElementById('slide' + SHOWOFF.getSlideID()).style.display = 'none';
        SHOWOFF.slideIndex-=1;
        SHOWOFF.log.debug("[SHOWOFF.previous] " + SHOWOFF.slideIndex);
        document.getElementById('slide' + SHOWOFF.getSlideID()).style.display = 'block';
        SHOWOFF.updateProgressBar(SHOWOFF.progress());
    };

    SHOWOFF.bindKey = function(key, func){
        var args = arguments || [];
        // check if already defined
        if (SHOWOFF.keymap[key] !== undefined){
            SHOWOFF.bound.push({key: key, callback: func, args: args});
        } else {
            var e = new Error("already defined key");
            SHOWOFF.log.error(e.message);
            throw e;
        }
        regKeyPress();
    };

    SHOWOFF.getLength = function(){
        if (SHOWOFF._length !== undefined){
            return SHOWOFF._length;
        }
        var slides = document.getElementsByClassName(SHOWOFF.slideClass);
        SHOWOFF._length = slides.length;
        return SHOWOFF._length;
    };

    SHOWOFF.util.zfill = function(val, len){
        if (typeof val !== "string") {
            val = val.toString();
        }
        while (val.length < len) {
            val = "0" + val;
        }
        return val;
    };

    SHOWOFF.getSlideID = function(){
        var len = SHOWOFF.slideIndex.toString().length;
        SHOWOFF.log.debug("[SHOWOFF.getSlideID#slideIndex] " + SHOWOFF.slideIndex);
        var zFilled = SHOWOFF.util.zfill(SHOWOFF.slideIndex, len);
        return zFilled;
    };

    SHOWOFF.progress = function(){
        var sNum = SHOWOFF.slideIndex + 1;
        var len = SHOWOFF.getLength();
        SHOWOFF.log.debug("[SHOWOFF.progress] " + sNum + " of " + len);
        return Math.round((sNum/len)*100);
    };

    SHOWOFF.updateProgressBar = function (value) {
        var bar = document.getElementsByClassName('progress-bar');
        bar[0].style.width = value + "%";
    };

    return SHOWOFF;
}());

/* vim: set ft=javascript ts=4 sw=4 expandtab : */
