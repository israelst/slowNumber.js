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

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function unformat(content){
  var unlocalized = content.replace('.', '').replace(',', '.'),
      value = parseFloat(unlocalized);
  return value;
}

function format(value){
  return value.toString().replace('.', ',');
}

window.addEventListener("DOMContentLoaded", function(){
    var fps = 30,
        els = [].slice.call(document.querySelectorAll('.slowNumber'));

    els.forEach(function(el){
        var content = (el.firstChild.textContent).trim(),
            decimalPlaces = content.split(',')[1] || '',
            value = unformat(content),
            values = interpolation(fps, easing.quadratic, value);

        animateEl(values, 1000, function (current, i, values){
          var isLast = (i === values.length - 1),
              value = round(current, decimalPlaces.length);
          el.firstChild.textContent = isLast? content : format(value);
        });
    });
});
