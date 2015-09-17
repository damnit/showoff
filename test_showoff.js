var expect = chai.expect;

describe("Showoff.init()", function() {

  describe("slideIndex", function() {
    it("should be zero", function() {
      var config = {
          updateProgressBar: function() {return true;}
      };
      var so = Showoff.init(config);
      expect(so.slideIndex).to.equal(0);
    });
  });
});
/* vim: set ft=javascript ts=4 sw=4 expandtab : */
