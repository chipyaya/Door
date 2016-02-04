$(document).ready(function(){
  
  $('.tlt_q').textillate({
    selector: '.texts',
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 0,
    autoStart: true,
    inEffects: [],
    in: {
      effect: 'fadeInTada',
      delayScale: 1.5,
      delay: 20,
      sync: false,
      shuffle: false,
      reverse: false,
      callback: function () {}
    },
    callback: function () {},
    type: 'char'
  });

  $('.tlt_c').textillate({
    selector: '.texts',
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 300,
    autoStart: true,
    inEffects: [],
    in: {
      effect: 'fadeInTada',
      delayScale: 1.5,
      delay: 30,
      sync: true,
      shuffle: false,
      reverse: false,
      callback: function () {}
    },
    callback: function () {},
    type: 'char'
  });

});
