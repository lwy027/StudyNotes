!(function () {
  "use strict";
  !(function (e, t) {
    void 0 === t && (t = {});
    var n = t.insertAt;
    if (e && "undefined" != typeof document) {
      var o = document.head || document.getElementsByTagName("head")[0],
        d = document.createElement("style");
      (d.type = "text/css"),
        "top" === n && o.firstChild
          ? o.insertBefore(d, o.firstChild)
          : o.appendChild(d),
        d.styleSheet
          ? (d.styleSheet.cssText = e)
          : d.appendChild(document.createTextNode(e));
    }
  })("body {\r\n  background-color: skyblue;\r\n}\r\n");
  var e = document.createElement("h2");
  (e.textContent = "哈哈哈"),
    document.body.append(e),
    (exports = {
      sum: function (e, t) {
        return e + t;
      },
      bar: function () {
        console.log("bar fun exec");
      },
    });
})();
