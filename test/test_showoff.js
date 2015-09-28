try {
    var expect = require("chai").expect;
    var Showoff = require("../showoff.js");
}
catch (ReferenceError) {
    var expect = chai.expect;
}

describe("Showoff.init()", function() {
    describe("slideIndex", function() {
      it("defaults to zero", function() {
        var config = {
            updateProgressBar: function() {return true;}
        };
        Showoff.init(config);
        expect(Showoff.slideIndex).to.equal(0);
      });
    });
    describe("bound", function() {
      it("should be an empty array", function() {
        var config = {
            updateProgressBar: function() {return true;}
        };
        Showoff.init(config);
        expect(typeof Showoff.bound).to.equal(typeof []);
        expect(Showoff.bound.length).to.equal([].length);
      });
    });
    describe("slideClass", function() {
      it("defaults to 'slide'", function() {
        var config = {
            updateProgressBar: function() {return true;}
        };
        Showoff.init(config);
        expect(Showoff.slideClass).to.equal("slide");
      });
    });
});

describe("Showoff.progress()", function() {
    it("should return a value between 0 and 100", function() {
      var config = {
          updateProgressBar: function() {return true;}
      };
      Showoff.init(config);
      expect(Showoff.progress()).to.be.above(-1);
      expect(Showoff.progress()).to.be.below(101);
    });
});
describe("Showoff.getLength()", function() {
    it("should return one on this page", function() {
      var config = {
          updateProgressBar: function() {return true;}
      };
      Showoff.init(config);
      expect(Showoff.getLength()).to.equal(1);
    });
});

describe("Showoff.util.zfill()", function() {
    it("should always return a string", function() {
        expect(typeof Showoff.util.zfill(1, 0)).to.equal(typeof "");
        expect(typeof Showoff.util.zfill("1", 0)).to.equal(typeof "");
        expect(typeof Showoff.util.zfill({}, 0)).to.equal(typeof "");
    });
    it("should zero-fill a value", function() {
        expect(Showoff.util.zfill("2", 3)).to.equal("002");
    });
    it("should zero-fill a value", function() {
        expect(Showoff.util.zfill("2", 1000)).to.equal((new Array(1000)).join("0") + "2");
    });
    it("should not work with a negative value", function() {
        expect(Showoff.util.zfill("2", -1)).to.equal("2");
    });
});
/* vim: set ft=javascript ts=4 sw=4 expandtab : */
