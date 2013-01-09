#NODE-BENCHMARK

Node-benchmark implements the ```timethis, timethese, countit``` functions some folks with a Perl background may be familiar with.

##Install

```
  npm install timethis
```

##Usage

```javascript
var bench = require("timethis");

bench.timethis(100,function(time){
  console.log("Tested @ " + time + bench.accuracy);
},function(callback){
  setTimeout(function(){
    callback();
  }, 50);
});

bench.timethese(100,function(times){
  console.log("Times:" + JSON.stringify(times));
},{
  "fun50":function(callback){
    setTimeout(function(){
      callback();
    }, 50);
  }
  ,"fun100":function(callback){
    setTimeout(function(){
      callback();
    }, 100);
  }
});

bench.countit(1000,function(iterations){
  console.log("Iterations: " + iterations);
},function(callback){
  setTimeout(function(){
    callback();
  }, 500);
});
```
