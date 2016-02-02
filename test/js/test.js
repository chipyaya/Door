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
      delay: 80,
      sync: false,
      shuffle: false,
      reverse: false,
      callback: function () {}
    },
    callback: function () {},
    type: 'char'
  });

  $('.tlt_c1').textillate({
    selector: '.texts',
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 700,
    autoStart: true,
    inEffects: [],
    in: {
      effect: 'fadeInTada',
      delayScale: 1.5,
      delay: 80,
      sync: false,
      shuffle: false,
      reverse: false,
      callback: function () {}
    },
    callback: function () {},
    type: 'char'
  });

  $('.tlt_c2').textillate({
    selector: '.texts',
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 1800,
    autoStart: true,
    inEffects: [],
    in: {
      effect: 'fadeInTada',
      delayScale: 1.5,
      delay: 80,
      sync: false,
      shuffle: false,
      reverse: false,
      callback: function () {}
    },
    callback: function () {},
    type: 'char'
  });
});
