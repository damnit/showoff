var expect = chai.expect;

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
  describe("#progress", function() {
    it("should return a value between 0 and 100", function() {
      var config = {
          updateProgressBar: function() {return true;}
      };
      Showoff.init(config);
      expect(Showoff.progress()).to.be.above(-1);
      expect(Showoff.progress()).to.be.below(101);
    });
  });
});
/* vim: set ft=javascript ts=4 sw=4 expandtab : */
