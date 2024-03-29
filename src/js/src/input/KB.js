function KB(keyCode, press, release) {
  var isArr = Array.isArray(keyCode);
  var key = {
    code: isArr ? -1 : keyCode,
    codes: isArr ? keyCode : [], 
    isDown: false,
    press: press,
    release: release
  };
  key.downHandler = function (e) {
    if ((!isArr && e.keyCode === key.code) || (isArr && key.codes.indexOf(e.keyCode) !== -1)) {
      if (!key.isDown && key.press) {
        key.press();
      }
      key.isDown = true;
    }
    e.preventDefault();
  };
  key.upHandler = function (e) {
    if ((!isArr && e.keyCode === key.code) || (isArr && key.codes.indexOf(e.keyCode) !== -1)) {
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
    }
    e.preventDefault();
  };
  key.destroy = function () {
    window.removeEventListener('keydown', key.downHandler, false);
    window.removeEventListener('keyup', key.upHandler, false);
  };
  window.addEventListener('keydown', key.downHandler, false);
  window.addEventListener('keyup', key.upHandler, false);
  
  return key;
}

KB.keys = {
  a: 65,
  w: 87,
  s: 83,
  d: 68,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  space: 32,
  enter: 13
};
