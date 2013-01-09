var microtime, diff, accuracy;

try{
  microtime = require("microtime");
  accuracy = "microseconds";
}catch(e){
  microtime = require("./macrotime");
  accuracy = "milliseconds";
};

diff = function(d1,d2){
  return Math.abs(d2-d1);
};

var odell = {
  accuracy:accuracy
  ,timethis:function(c,cb,f){
    var t = 0;
    var s, callback, i;
    i = Math.abs(c);
    callback = function(){
      t += diff(s,microtime.now());
      i--;
      if(i != 0){
        s = microtime.now();
        f(callback);
      }else{
        cb(t/c);
      }
    };
    s = microtime.now();
    f(callback);
  }
  ,timethese:function(c,cb,f){
    var times = {};
    var open = 0;
    for(var i in f){
      times[i] = -1;
      open++;
      (function(f,i){
        odell.timethis(c,function(t){
          open--;
          times[i] = t;
          if(open == 0){
            cb(times);
          }
        }, f);
      })(f[i],i);
    }
  }
  ,countit:function(t,cb,f){
    var iterations = 0;
    var i = Math.abs(t);
    var callback = function(){
      t -= diff(s,microtime.now());
      iterations++;
      if(t < 0){
        cb(iterations);
      }else{
        s = microtime.now();
        f(callback);
      }
    };
    s = microtime.now();
    f(callback);
  }
};

module.exports = odell;
