var easing = {
    quadratic: function (x){
      return Math.sqrt(x);
    }
};

function range(start, stop, step){
  var array = [];
  for(var i = start; i < stop; i += step) array.push(i);
  return array;
}

function interpolation(fps, easing, finalValue){
  function scaleIt(value){return finalValue * value; }

  var x = range(0, 1, 1/fps),
      y = x.map(easing).map(scaleIt);

  return y;
}

function animateEl(values, duration, onAnimate){
  var frameIndex = 0,
      fps = values.length,
      id = setInterval(anime, duration/fps );

  function anime(){
    var current = values[frameIndex],
        isLastFrame = (frameIndex === fps - 1);

    onAnimate(current, frameIndex, values);

    if(isLastFrame){
      clearInterval(id);
    }else{
      frameIndex++;
    }
  }
}
