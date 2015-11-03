(function () {
  if (typeof AlienDestroyer === "undefined") {
    window.AlienDestroyer = {};
  }

  Util = AlienDestroyer.Util = {};

  Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate ();
    ChildClass.prototype.constructor = ChildClass;
  };

  Util.randomAlienVec = function(length) {
    var sqDist = length * length;
    var randXSq = Math.random() * sqDist/2;
    // restrict angle of X
    var randY = Math.sqrt(sqDist - randXSq)/2;
    var randX = Math.sqrt(randXSq)/2;
    return [randX*(Math.round(Math.random()) * 2 - 1), randY/2];
    // X can go both ways, Y goes down only
  }

    // Util.dir = function (vec) {
    //   var norm = Util.norm(vec);
    //   return Util.scale(vec, 1 / norm);
    // };
    //
    //   Util.norm = function (vec) {
    //     debugger;
    //     return Util.dist([0, 0], vec);
    // };
    //
    // // Scale the length of a vector by the given amount.
    // Util.scale = function (vec, m) {
    //   return [vec[0] * m, vec[1] * m];
    // };
    //
    Util.dist = function (pos1, pos2) {
       return Math.sqrt(
         Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
       );
    };







})();
