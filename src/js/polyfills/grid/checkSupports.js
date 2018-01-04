function checkCalc() {
  var el = document.createElement('div');
  el.style.cssText = 'width:calc(10px)';
  return !!el.style.length;
}

function checkFlexWrap() {
  var el = document.createElement('div');
  el.style.cssText = 'flex-wrap:wrap';
  return !!el.style.length;
}

if (!checkCalc()) {
  document.body.classList.add('no-calc');
}

if (!checkFlexWrap()) {
    document.body.classList.add('no-flexwrap');
} 

