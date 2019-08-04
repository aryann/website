var utils = {

  // Returns a new 2D array with dimensions rows by cols. All cells
  // will initially contain the value given by initVal.
  create2DArray: function(rows, cols, initVal) {
    var res = new Array(rows);
    for (var row = 0; row < rows; row++) {
      res[row] = new Array(cols);
      for (var col = 0; col < cols; col++) {
	res[row][col] = initVal;
      }
    }
    return res;
  },

  // A Python-like mod.
  mod: function(n, p) {
    if (n < 0) {
      return p + n % p;
    } else {
      return n % p;
    }
  },

};
