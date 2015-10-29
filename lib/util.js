(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  AlienDestroyer.Util = {};

  AlienDestroyer.Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate ();
    ChildClass.prototype.constructor = ChildClass;
  };

  AlienDestroyer.Util.randomAlienVec = function(length) {
    var sqDist = length * length;
    var randXSq = Math.random() * sqDist/2;
    // restrict angle of X
    var randY = Math.sqrt(sqDist - randXSq)/2;
    var randX = Math.sqrt(randXSq)/2;
    return [randX*(Math.round(Math.random()) * 2 - 1), randY/2];
    // X can go both ways, Y goes down only
  }














})();
