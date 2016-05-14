(function(){
  'use strict';

  $('.winner .number').animateNumber({number: 20}, 1500);
  $('.loser .number').animateNumber({number: 80}, 1500);

})();


function toggle(effect){
  var effect = (typeof effect != 'undefined') ? effect : 'hide-sth';
  var section = (effect === 'left-close') ? 'section' : 'section:eq(0)';
  if($(section).hasClass(effect)) {
    $(section).removeClass(effect);
  } else {
    $(section).addClass(effect);
  }
}

function Ad(elem, url, schedule) {
  var vElem = $('<video>').attr('src', url);

  var scheduleStatus = {};
  var init = function(){
    for(var i in schedule){
      scheduleStatus[schedule[i].unix()] = false;
    }
    localStorage.setItem(url, JSON.stringify(scheduleStatus));
  };
  init();

  this.play = function(){
    elem.find('video').get(0).play();
  };

  this.insert = function(callback){
    vElem.get(0).onended = function(e) {
      toggle('left-close');
      callback();
      setTimeout(function(){
        vElem.remove();
      }, 500);
    };

    elem.append(vElem);
  };

  this.lunch = function(unixtime, callback){
    var play = this.play;
    var status = JSON.parse(localStorage[url]);
    status[unixtime] = true;

    localStorage[url] = JSON.stringify(status);
    this.insert(callback);

    toggle('left-close');

    setTimeout(function(){
      play();
    }, 500);
  };

  this.getSchedule = function(){
    return schedule;
  };
}

var pause = 0;
var adBoxElem = $('.ad-box');
var ad = {
  'ad/meiji.mp4': new Ad(adBoxElem, 'ad/meiji.mp4', [moment().hour(12).minute(45), moment().hour(17).minute(45)]),
  'ad/hotelday.mp4': new Ad(adBoxElem, 'ad/hotelday.mp4', [moment().hour(13).minute(0), moment().hour(18).minute(0)])
};
var checkSchedule = function(){
  for(var url in ad){
    var s = ad[url].getSchedule();
    var status = JSON.parse(localStorage[url]);

    for(var j in s){
      var sUnixtime = s[j].unix();
      var gap = moment().unix() - sUnixtime;

      if(Math.abs(gap) < 180 && !status[sUnixtime]){
        return {
          'url': url,
          'unixtime': sUnixtime
        };
      }
    }
  }
  return false;
};

setInterval(function(){
  if(!pause){
    toggle();
  }

  var s = checkSchedule();
  if(s && !pause){
    ad[s.url].lunch(s.unixtime, function(){
      pause = 0;
    });
    pause = 1;
  }

}, 5000);