import { i as instantiateEmscriptenWasm, c as codecs, p as preprocessors } from './codecs-cf5f19af.js';

var visdif = function () {
  var _scriptDir = import.meta.url;
  return function (visdif) {
    visdif = visdif || {};
    var f;
    f || (f = typeof visdif !== 'undefined' ? visdif : {});
    var ba, ca;
    f.ready = new Promise(function (a, b) {
      ba = a;
      ca = b;
    });
    var da = {},
        q;

    for (q in f) f.hasOwnProperty(q) && (da[q] = f[q]);

    var ea = !1,
        v = !1,
        fa = !1,
        ha = !1;
    ea = "object" === typeof window;
    v = "function" === typeof importScripts;
    fa = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
    ha = !ea && !fa && !v;
    var y = "",
        ia,
        ja,
        ka,
        la;
    if (fa) y = v ? require("path").dirname(y) + "/" : __dirname + "/", ia = function (a, b) {
      ka || (ka = require("fs"));
      la || (la = require("path"));
      a = la.normalize(a);
      return ka.readFileSync(a, b ? null : "utf8");
    }, ja = function (a) {
      a = ia(a, !0);
      a.buffer || (a = new Uint8Array(a));
      assert(a.buffer);
      return a;
    }, 1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), process.on("uncaughtException", function (a) {
      throw a;
    }), process.on("unhandledRejection", A), f.inspect = function () {
      return "[Emscripten Module object]";
    };else if (ha) "undefined" != typeof read && (ia = function (a) {
      return read(a);
    }), ja = function (a) {
      if ("function" === typeof readbuffer) return new Uint8Array(readbuffer(a));
      a = read(a, "binary");
      assert("object" === typeof a);
      return a;
    }, "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);else if (ea || v) v ? y = self.location.href : "undefined" !== typeof document && document.currentScript && (y = document.currentScript.src), _scriptDir && (y = _scriptDir), 0 !== y.indexOf("blob:") ? y = y.substr(0, y.lastIndexOf("/") + 1) : y = "", ia = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.send(null);
      return b.responseText;
    }, v && (ja = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    });
    var ma = f.print || console.log.bind(console),
        B = f.printErr || console.warn.bind(console);

    for (q in da) da.hasOwnProperty(q) && (f[q] = da[q]);

    da = null;
    var na;
    f.wasmBinary && (na = f.wasmBinary);
    var noExitRuntime;
    f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
    "object" !== typeof WebAssembly && A("no native wasm support detected");
    var C,
        oa = !1;

    function assert(a, b) {
      a || A("Assertion failed: " + b);
    }

    var pa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;

    function qa(a, b, c) {
      var d = b + c;

      for (c = b; a[c] && !(c >= d);) ++c;

      if (16 < c - b && a.subarray && pa) return pa.decode(a.subarray(b, c));

      for (d = ""; b < c;) {
        var e = a[b++];

        if (e & 128) {
          var g = a[b++] & 63;
          if (192 == (e & 224)) d += String.fromCharCode((e & 31) << 6 | g);else {
            var k = a[b++] & 63;
            e = 224 == (e & 240) ? (e & 15) << 12 | g << 6 | k : (e & 7) << 18 | g << 12 | k << 6 | a[b++] & 63;
            65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
          }
        } else d += String.fromCharCode(e);
      }

      return d;
    }

    function ra(a, b, c) {
      var d = D;

      if (0 < c) {
        c = b + c - 1;

        for (var e = 0; e < a.length; ++e) {
          var g = a.charCodeAt(e);

          if (55296 <= g && 57343 >= g) {
            var k = a.charCodeAt(++e);
            g = 65536 + ((g & 1023) << 10) | k & 1023;
          }

          if (127 >= g) {
            if (b >= c) break;
            d[b++] = g;
          } else {
            if (2047 >= g) {
              if (b + 1 >= c) break;
              d[b++] = 192 | g >> 6;
            } else {
              if (65535 >= g) {
                if (b + 2 >= c) break;
                d[b++] = 224 | g >> 12;
              } else {
                if (b + 3 >= c) break;
                d[b++] = 240 | g >> 18;
                d[b++] = 128 | g >> 12 & 63;
              }

              d[b++] = 128 | g >> 6 & 63;
            }

            d[b++] = 128 | g & 63;
          }
        }

        d[b] = 0;
      }
    }

    var sa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;

    function ta(a, b) {
      var c = a >> 1;

      for (var d = c + b / 2; !(c >= d) && ua[c];) ++c;

      c <<= 1;
      if (32 < c - a && sa) return sa.decode(D.subarray(a, c));
      c = 0;

      for (d = "";;) {
        var e = E[a + 2 * c >> 1];
        if (0 == e || c == b / 2) return d;
        ++c;
        d += String.fromCharCode(e);
      }
    }

    function va(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var e = 0; e < c; ++e) E[b >> 1] = a.charCodeAt(e), b += 2;

      E[b >> 1] = 0;
      return b - d;
    }

    function wa(a) {
      return 2 * a.length;
    }

    function xa(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var e = F[a + 4 * c >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
      }

      return d;
    }

    function ya(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var e = 0; e < a.length; ++e) {
        var g = a.charCodeAt(e);

        if (55296 <= g && 57343 >= g) {
          var k = a.charCodeAt(++e);
          g = 65536 + ((g & 1023) << 10) | k & 1023;
        }

        F[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }

      F[b >> 2] = 0;
      return b - d;
    }

    function za(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var G, Aa, D, E, ua, F, I, Ba, Ca;

    function Da(a) {
      G = a;
      f.HEAP8 = Aa = new Int8Array(a);
      f.HEAP16 = E = new Int16Array(a);
      f.HEAP32 = F = new Int32Array(a);
      f.HEAPU8 = D = new Uint8Array(a);
      f.HEAPU16 = ua = new Uint16Array(a);
      f.HEAPU32 = I = new Uint32Array(a);
      f.HEAPF32 = Ba = new Float32Array(a);
      f.HEAPF64 = Ca = new Float64Array(a);
    }

    var Ea = f.INITIAL_MEMORY || 16777216;
    f.wasmMemory ? C = f.wasmMemory : C = new WebAssembly.Memory({
      initial: Ea / 65536,
      maximum: 32768
    });
    C && (G = C.buffer);
    Ea = G.byteLength;
    Da(G);
    var Fa,
        Ga = [],
        Ha = [],
        Ia = [],
        Ja = [];

    function Ka() {
      var a = f.preRun.shift();
      Ga.unshift(a);
    }

    var J = 0,
        Ma = null;
    f.preloadedImages = {};
    f.preloadedAudios = {};

    function A(a) {
      if (f.onAbort) f.onAbort(a);
      B(a);
      oa = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ca(a);
      throw a;
    }

    function Na(a) {
      var b = K;
      return String.prototype.startsWith ? b.startsWith(a) : 0 === b.indexOf(a);
    }

    function Oa() {
      return Na("data:application/octet-stream;base64,");
    }

    var K = "visdif.wasm";

    if (!Oa()) {
      var Pa = K;
      K = f.locateFile ? f.locateFile(Pa, y) : y + Pa;
    }

    function Qa() {
      try {
        if (na) return new Uint8Array(na);
        if (ja) return ja(K);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        A(a);
      }
    }

    function Ra() {
      return na || !ea && !v || "function" !== typeof fetch || Na("file://") ? Promise.resolve().then(Qa) : fetch(K, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + K + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Qa();
      });
    }

    function Sa(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(f);else {
          var c = b.ba;
          "number" === typeof c ? void 0 === b.V ? Fa.get(c)() : Fa.get(c)(b.V) : c(void 0 === b.V ? null : b.V);
        }
      }
    }

    function Ta(a) {
      this.C = a - 16;

      this.qa = function (b) {
        F[this.C + 8 >> 2] = b;
      };

      this.na = function (b) {
        F[this.C + 0 >> 2] = b;
      };

      this.oa = function () {
        F[this.C + 4 >> 2] = 0;
      };

      this.ma = function () {
        Aa[this.C + 12 >> 0] = 0;
      };

      this.pa = function () {
        Aa[this.C + 13 >> 0] = 0;
      };

      this.ga = function (b, c) {
        this.qa(b);
        this.na(c);
        this.oa();
        this.ma();
        this.pa();
      };
    }

    function Va(a) {
      switch (a) {
        case 1:
          return 0;

        case 2:
          return 1;

        case 4:
          return 2;

        case 8:
          return 3;

        default:
          throw new TypeError("Unknown type size: " + a);
      }
    }

    var Wa = void 0;

    function L(a) {
      for (var b = ""; D[a];) b += Wa[D[a++]];

      return b;
    }

    var M = {},
        N = {},
        Xa = {};

    function Ya(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Za(a, b) {
      a = Ya(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function $a(a) {
      var b = Error,
          c = Za(a, function (d) {
        this.name = a;
        this.message = d;
        d = Error(d).stack;
        void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      c.prototype = Object.create(b.prototype);
      c.prototype.constructor = c;

      c.prototype.toString = function () {
        return void 0 === this.message ? this.name : this.name + ": " + this.message;
      };

      return c;
    }

    var O = void 0;

    function R(a) {
      throw new O(a);
    }

    var ab = void 0;

    function bb(a) {
      throw new ab(a);
    }

    function cb(a, b, c) {
      function d(h) {
        h = c(h);
        h.length !== a.length && bb("Mismatched type converter count");

        for (var m = 0; m < a.length; ++m) S(a[m], h[m]);
      }

      a.forEach(function (h) {
        Xa[h] = b;
      });
      var e = Array(b.length),
          g = [],
          k = 0;
      b.forEach(function (h, m) {
        N.hasOwnProperty(h) ? e[m] = N[h] : (g.push(h), M.hasOwnProperty(h) || (M[h] = []), M[h].push(function () {
          e[m] = N[h];
          ++k;
          k === g.length && d(e);
        }));
      });
      0 === g.length && d(e);
    }

    function S(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || R('type "' + d + '" must have a positive integer typeid pointer');

      if (N.hasOwnProperty(a)) {
        if (c.fa) return;
        R("Cannot register type '" + d + "' twice");
      }

      N[a] = b;
      delete Xa[a];
      M.hasOwnProperty(a) && (b = M[a], delete M[a], b.forEach(function (e) {
        e();
      }));
    }

    function db(a) {
      return {
        count: a.count,
        N: a.N,
        P: a.P,
        C: a.C,
        F: a.F,
        G: a.G,
        H: a.H
      };
    }

    function eb(a) {
      R(a.B.F.D.name + " instance already deleted");
    }

    var fb = !1;

    function gb() {}

    function hb(a) {
      --a.count.value;
      0 === a.count.value && (a.G ? a.H.M(a.G) : a.F.D.M(a.C));
    }

    function ib(a) {
      if ("undefined" === typeof FinalizationGroup) return ib = function (b) {
        return b;
      }, a;
      fb = new FinalizationGroup(function (b) {
        for (var c = b.next(); !c.done; c = b.next()) c = c.value, c.C ? hb(c) : console.warn("object already deleted: " + c.C);
      });

      ib = function (b) {
        fb.register(b, b.B, b.B);
        return b;
      };

      gb = function (b) {
        fb.unregister(b.B);
      };

      return ib(a);
    }

    var jb = void 0,
        kb = [];

    function lb() {
      for (; kb.length;) {
        var a = kb.pop();
        a.B.N = !1;
        a["delete"]();
      }
    }

    function T() {}

    var mb = {};

    function nb(a, b, c) {
      if (void 0 === a[b].J) {
        var d = a[b];

        a[b] = function () {
          a[b].J.hasOwnProperty(arguments.length) || R("Function '" + c + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[b].J + ")!");
          return a[b].J[arguments.length].apply(this, arguments);
        };

        a[b].J = [];
        a[b].J[d.S] = d;
      }
    }

    function ob(a, b) {
      f.hasOwnProperty(a) ? (R("Cannot register public name '" + a + "' twice"), nb(f, a, a), f.hasOwnProperty(void 0) && R("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"), f[a].J[void 0] = b) : f[a] = b;
    }

    function pb(a, b, c, d, e, g, k, h) {
      this.name = a;
      this.constructor = b;
      this.O = c;
      this.M = d;
      this.I = e;
      this.da = g;
      this.R = k;
      this.aa = h;
      this.ia = [];
    }

    function qb(a, b, c) {
      for (; b !== c;) b.R || R("Expected null or instance of " + c.name + ", got an instance of " + b.name), a = b.R(a), b = b.I;

      return a;
    }

    function rb(a, b) {
      if (null === b) return this.W && R("null is not a valid " + this.name), 0;
      b.B || R('Cannot pass "' + U(b) + '" as a ' + this.name);
      b.B.C || R("Cannot pass deleted object as a pointer of type " + this.name);
      return qb(b.B.C, b.B.F.D, this.D);
    }

    function sb(a, b) {
      if (null === b) {
        this.W && R("null is not a valid " + this.name);

        if (this.U) {
          var c = this.ja();
          null !== a && a.push(this.M, c);
          return c;
        }

        return 0;
      }

      b.B || R('Cannot pass "' + U(b) + '" as a ' + this.name);
      b.B.C || R("Cannot pass deleted object as a pointer of type " + this.name);
      !this.T && b.B.F.T && R("Cannot convert argument of type " + (b.B.H ? b.B.H.name : b.B.F.name) + " to parameter type " + this.name);
      c = qb(b.B.C, b.B.F.D, this.D);
      if (this.U) switch (void 0 === b.B.G && R("Passing raw pointer to smart pointer is illegal"), this.ra) {
        case 0:
          b.B.H === this ? c = b.B.G : R("Cannot convert argument of type " + (b.B.H ? b.B.H.name : b.B.F.name) + " to parameter type " + this.name);
          break;

        case 1:
          c = b.B.G;
          break;

        case 2:
          if (b.B.H === this) c = b.B.G;else {
            var d = b.clone();
            c = this.ka(c, vb(function () {
              d["delete"]();
            }));
            null !== a && a.push(this.M, c);
          }
          break;

        default:
          R("Unsupporting sharing policy");
      }
      return c;
    }

    function wb(a, b) {
      if (null === b) return this.W && R("null is not a valid " + this.name), 0;
      b.B || R('Cannot pass "' + U(b) + '" as a ' + this.name);
      b.B.C || R("Cannot pass deleted object as a pointer of type " + this.name);
      b.B.F.T && R("Cannot convert argument of type " + b.B.F.name + " to parameter type " + this.name);
      return qb(b.B.C, b.B.F.D, this.D);
    }

    function xb(a) {
      return this.fromWireType(I[a >> 2]);
    }

    function yb(a, b, c) {
      if (b === c) return a;
      if (void 0 === c.I) return null;
      a = yb(a, b, c.I);
      return null === a ? null : c.aa(a);
    }

    var zb = {};

    function Ab(a, b) {
      for (void 0 === b && R("ptr should not be undefined"); a.I;) b = a.R(b), a = a.I;

      return zb[b];
    }

    function Bb(a, b) {
      b.F && b.C || bb("makeClassHandle requires ptr and ptrType");
      !!b.H !== !!b.G && bb("Both smartPtrType and smartPtr must be specified");
      b.count = {
        value: 1
      };
      return ib(Object.create(a, {
        B: {
          value: b
        }
      }));
    }

    function V(a, b, c, d) {
      this.name = a;
      this.D = b;
      this.W = c;
      this.T = d;
      this.U = !1;
      this.M = this.ka = this.ja = this.Y = this.ra = this.ha = void 0;
      void 0 !== b.I ? this.toWireType = sb : (this.toWireType = d ? rb : wb, this.K = null);
    }

    function Cb(a, b) {
      f.hasOwnProperty(a) || bb("Replacing nonexistant public symbol");
      f[a] = b;
      f[a].S = void 0;
    }

    function Db(a, b) {
      assert(0 <= a.indexOf("j"), "getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var e;
        -1 != a.indexOf("j") ? e = c && c.length ? f["dynCall_" + a].apply(null, [b].concat(c)) : f["dynCall_" + a].call(null, b) : e = Fa.get(b).apply(null, c);
        return e;
      };
    }

    function W(a, b) {
      a = L(a);
      var c = -1 != a.indexOf("j") ? Db(a, b) : Fa.get(b);
      "function" !== typeof c && R("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var Eb = void 0;

    function Fb(a) {
      a = Gb(a);
      var b = L(a);
      X(a);
      return b;
    }

    function Hb(a, b) {
      function c(g) {
        e[g] || N[g] || (Xa[g] ? Xa[g].forEach(c) : (d.push(g), e[g] = !0));
      }

      var d = [],
          e = {};
      b.forEach(c);
      throw new Eb(a + ": " + d.map(Fb).join([", "]));
    }

    function Ib(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(F[(b >> 2) + d]);

      return c;
    }

    function Jb(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Kb(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Za(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    var Lb = [],
        Y = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function vb(a) {
      switch (a) {
        case void 0:
          return 1;

        case null:
          return 2;

        case !0:
          return 3;

        case !1:
          return 4;

        default:
          var b = Lb.length ? Lb.pop() : Y.length;
          Y[b] = {
            la: 1,
            value: a
          };
          return b;
      }
    }

    function U(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Mb(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(Ba[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(Ca[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Nb(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return Aa[d];
          } : function (d) {
            return D[d];
          };

        case 1:
          return c ? function (d) {
            return E[d >> 1];
          } : function (d) {
            return ua[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return F[d >> 2];
          } : function (d) {
            return I[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    for (var Ob = [null, [], []], Pb = Array(256), Qb = 0; 256 > Qb; ++Qb) Pb[Qb] = String.fromCharCode(Qb);

    Wa = Pb;
    O = f.BindingError = $a("BindingError");
    ab = f.InternalError = $a("InternalError");

    T.prototype.isAliasOf = function (a) {
      if (!(this instanceof T && a instanceof T)) return !1;
      var b = this.B.F.D,
          c = this.B.C,
          d = a.B.F.D;

      for (a = a.B.C; b.I;) c = b.R(c), b = b.I;

      for (; d.I;) a = d.R(a), d = d.I;

      return b === d && c === a;
    };

    T.prototype.clone = function () {
      this.B.C || eb(this);
      if (this.B.P) return this.B.count.value += 1, this;
      var a = ib(Object.create(Object.getPrototypeOf(this), {
        B: {
          value: db(this.B)
        }
      }));
      a.B.count.value += 1;
      a.B.N = !1;
      return a;
    };

    T.prototype["delete"] = function () {
      this.B.C || eb(this);
      this.B.N && !this.B.P && R("Object already scheduled for deletion");
      gb(this);
      hb(this.B);
      this.B.P || (this.B.G = void 0, this.B.C = void 0);
    };

    T.prototype.isDeleted = function () {
      return !this.B.C;
    };

    T.prototype.deleteLater = function () {
      this.B.C || eb(this);
      this.B.N && !this.B.P && R("Object already scheduled for deletion");
      kb.push(this);
      1 === kb.length && jb && jb(lb);
      this.B.N = !0;
      return this;
    };

    V.prototype.ea = function (a) {
      this.Y && (a = this.Y(a));
      return a;
    };

    V.prototype.X = function (a) {
      this.M && this.M(a);
    };

    V.prototype.argPackAdvance = 8;
    V.prototype.readValueFromPointer = xb;

    V.prototype.deleteObject = function (a) {
      if (null !== a) a["delete"]();
    };

    V.prototype.fromWireType = function (a) {
      function b() {
        return this.U ? Bb(this.D.O, {
          F: this.ha,
          C: c,
          H: this,
          G: a
        }) : Bb(this.D.O, {
          F: this,
          C: a
        });
      }

      var c = this.ea(a);
      if (!c) return this.X(a), null;
      var d = Ab(this.D, c);

      if (void 0 !== d) {
        if (0 === d.B.count.value) return d.B.C = c, d.B.G = a, d.clone();
        d = d.clone();
        this.X(a);
        return d;
      }

      d = this.D.da(c);
      d = mb[d];
      if (!d) return b.call(this);
      d = this.T ? d.$ : d.pointerType;
      var e = yb(c, this.D, d.D);
      return null === e ? b.call(this) : this.U ? Bb(d.D.O, {
        F: d,
        C: e,
        H: this,
        G: a
      }) : Bb(d.D.O, {
        F: d,
        C: e
      });
    };

    f.getInheritedInstanceCount = function () {
      return Object.keys(zb).length;
    };

    f.getLiveInheritedInstances = function () {
      var a = [],
          b;

      for (b in zb) zb.hasOwnProperty(b) && a.push(zb[b]);

      return a;
    };

    f.flushPendingDeletes = lb;

    f.setDelayFunction = function (a) {
      jb = a;
      kb.length && jb && jb(lb);
    };

    Eb = f.UnboundTypeError = $a("UnboundTypeError");

    f.count_emval_handles = function () {
      for (var a = 0, b = 5; b < Y.length; ++b) void 0 !== Y[b] && ++a;

      return a;
    };

    f.get_first_emval = function () {
      for (var a = 5; a < Y.length; ++a) if (void 0 !== Y[a]) return Y[a];

      return null;
    };

    Ha.push({
      ba: function () {
        Rb();
      }
    });
    var Tb = {
      c: function (a, b, c, d) {
        A("Assertion failed: " + (a ? qa(D, a, void 0) : "") + ", at: " + [b ? b ? qa(D, b, void 0) : "" : "unknown filename", c, d ? d ? qa(D, d, void 0) : "" : "unknown function"]);
      },
      t: function (a) {
        return Sb(a + 16) + 16;
      },
      p: function (a, b, c) {
        new Ta(a).ga(b, c);
        throw a;
      },
      k: function (a, b, c, d, e) {
        var g = Va(c);
        b = L(b);
        S(a, {
          name: b,
          fromWireType: function (k) {
            return !!k;
          },
          toWireType: function (k, h) {
            return h ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (k) {
            if (1 === c) var h = Aa;else if (2 === c) h = E;else if (4 === c) h = F;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[k >> g]);
          },
          K: null
        });
      },
      o: function (a, b, c, d, e, g, k, h, m, l, n, t, u) {
        n = L(n);
        g = W(e, g);
        h && (h = W(k, h));
        l && (l = W(m, l));
        u = W(t, u);
        var z = Ya(n);
        ob(z, function () {
          Hb("Cannot construct " + n + " due to unbound types", [d]);
        });
        cb([a, b, c], d ? [d] : [], function (r) {
          r = r[0];

          if (d) {
            var w = r.D;
            var p = w.O;
          } else p = T.prototype;

          r = Za(z, function () {
            if (Object.getPrototypeOf(this) !== H) throw new O("Use 'new' to construct " + n);
            if (void 0 === x.L) throw new O(n + " has no accessible constructor");
            var P = x.L[arguments.length];
            if (void 0 === P) throw new O("Tried to invoke ctor of " + n + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(x.L).toString() + ") parameters instead!");
            return P.apply(this, arguments);
          });
          var H = Object.create(p, {
            constructor: {
              value: r
            }
          });
          r.prototype = H;
          var x = new pb(n, r, H, u, w, g, h, l);
          w = new V(n, x, !0, !1);
          p = new V(n + "*", x, !1, !1);
          var Z = new V(n + " const*", x, !1, !0);
          mb[a] = {
            pointerType: p,
            $: Z
          };
          Cb(z, r);
          return [w, p, Z];
        });
      },
      n: function (a, b, c, d, e, g) {
        assert(0 < b);
        var k = Ib(b, c);
        e = W(d, e);
        var h = [g],
            m = [];
        cb([], [a], function (l) {
          l = l[0];
          var n = "constructor " + l.name;
          void 0 === l.D.L && (l.D.L = []);
          if (void 0 !== l.D.L[b - 1]) throw new O("Cannot register multiple constructors with identical number of parameters (" + (b - 1) + ") for class '" + l.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");

          l.D.L[b - 1] = function () {
            Hb("Cannot construct " + l.name + " due to unbound types", k);
          };

          cb([], k, function (t) {
            l.D.L[b - 1] = function () {
              arguments.length !== b - 1 && R(n + " called with " + arguments.length + " arguments, expected " + (b - 1));
              m.length = 0;
              h.length = b;

              for (var u = 1; u < b; ++u) h[u] = t[u].toWireType(m, arguments[u - 1]);

              u = e.apply(null, h);
              Jb(m);
              return t[0].fromWireType(u);
            };

            return [];
          });
          return [];
        });
      },
      m: function (a, b, c, d, e, g, k, h) {
        var m = Ib(c, d);
        b = L(b);
        g = W(e, g);
        cb([], [a], function (l) {
          function n() {
            Hb("Cannot call " + t + " due to unbound types", m);
          }

          l = l[0];
          var t = l.name + "." + b;
          h && l.D.ia.push(b);
          var u = l.D.O,
              z = u[b];
          void 0 === z || void 0 === z.J && z.className !== l.name && z.S === c - 2 ? (n.S = c - 2, n.className = l.name, u[b] = n) : (nb(u, b, t), u[b].J[c - 2] = n);
          cb([], m, function (r) {
            var w = t,
                p = l,
                H = g,
                x = r.length;
            2 > x && R("argTypes array size mismatch! Must at least get return value and 'this' types!");
            var Z = null !== r[1] && null !== p,
                P = !1;

            for (p = 1; p < r.length; ++p) if (null !== r[p] && void 0 === r[p].K) {
              P = !0;
              break;
            }

            var tb = "void" !== r[0].name,
                Q = "",
                aa = "";

            for (p = 0; p < x - 2; ++p) Q += (0 !== p ? ", " : "") + "arg" + p, aa += (0 !== p ? ", " : "") + "arg" + p + "Wired";

            w = "return function " + Ya(w) + "(" + Q + ") {\nif (arguments.length !== " + (x - 2) + ") {\nthrowBindingError('function " + w + " called with ' + arguments.length + ' arguments, expected " + (x - 2) + " args!');\n}\n";
            P && (w += "var destructors = [];\n");
            var ub = P ? "destructors" : "null";
            Q = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
            H = [R, H, k, Jb, r[0], r[1]];
            Z && (w += "var thisWired = classParam.toWireType(" + ub + ", this);\n");

            for (p = 0; p < x - 2; ++p) w += "var arg" + p + "Wired = argType" + p + ".toWireType(" + ub + ", arg" + p + "); // " + r[p + 2].name + "\n", Q.push("argType" + p), H.push(r[p + 2]);

            Z && (aa = "thisWired" + (0 < aa.length ? ", " : "") + aa);
            w += (tb ? "var rv = " : "") + "invoker(fn" + (0 < aa.length ? ", " : "") + aa + ");\n";
            if (P) w += "runDestructors(destructors);\n";else for (p = Z ? 1 : 2; p < r.length; ++p) x = 1 === p ? "thisWired" : "arg" + (p - 2) + "Wired", null !== r[p].K && (w += x + "_dtor(" + x + "); // " + r[p].name + "\n", Q.push(x + "_dtor"), H.push(r[p].K));
            tb && (w += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
            Q.push(w + "}\n");
            r = Kb(Q).apply(null, H);
            void 0 === u[b].J ? (r.S = c - 2, u[b] = r) : u[b].J[c - 2] = r;
            return [];
          });
          return [];
        });
      },
      s: function (a, b) {
        b = L(b);
        S(a, {
          name: b,
          fromWireType: function (c) {
            var d = Y[c].value;
            4 < c && 0 === --Y[c].la && (Y[c] = void 0, Lb.push(c));
            return d;
          },
          toWireType: function (c, d) {
            return vb(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: xb,
          K: null
        });
      },
      j: function (a, b, c) {
        c = Va(c);
        b = L(b);
        S(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            if ("number" !== typeof e && "boolean" !== typeof e) throw new TypeError('Cannot convert "' + U(e) + '" to ' + this.name);
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: Mb(b, c),
          K: null
        });
      },
      e: function (a, b, c, d, e) {
        function g(l) {
          return l;
        }

        b = L(b);
        -1 === e && (e = 4294967295);
        var k = Va(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (l) {
            return l << h >>> h;
          };
        }

        var m = -1 != b.indexOf("unsigned");
        S(a, {
          name: b,
          fromWireType: g,
          toWireType: function (l, n) {
            if ("number" !== typeof n && "boolean" !== typeof n) throw new TypeError('Cannot convert "' + U(n) + '" to ' + this.name);
            if (n < d || n > e) throw new TypeError('Passing a number "' + U(n) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + e + "]!");
            return m ? n >>> 0 : n | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: Nb(b, k, 0 !== d),
          K: null
        });
      },
      d: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var k = I;
          return new e(G, k[g + 1], k[g]);
        }

        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = L(c);
        S(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          fa: !0
        });
      },
      h: function (a, b) {
        b = L(b);
        var c = "std::string" === b;
        S(a, {
          name: b,
          fromWireType: function (d) {
            var e = I[d >> 2];
            if (c) for (var g = d + 4, k = 0; k <= e; ++k) {
              var h = d + 4 + k;

              if (k == e || 0 == D[h]) {
                g = g ? qa(D, g, h - g) : "";
                if (void 0 === m) var m = g;else m += String.fromCharCode(0), m += g;
                g = h + 1;
              }
            } else {
              m = Array(e);

              for (k = 0; k < e; ++k) m[k] = String.fromCharCode(D[d + 4 + k]);

              m = m.join("");
            }
            X(d);
            return m;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var g = "string" === typeof e;
            g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || R("Cannot pass non-string to std::string");
            var k = (c && g ? function () {
              for (var l = 0, n = 0; n < e.length; ++n) {
                var t = e.charCodeAt(n);
                55296 <= t && 57343 >= t && (t = 65536 + ((t & 1023) << 10) | e.charCodeAt(++n) & 1023);
                127 >= t ? ++l : l = 2047 >= t ? l + 2 : 65535 >= t ? l + 3 : l + 4;
              }

              return l;
            } : function () {
              return e.length;
            })(),
                h = Sb(4 + k + 1);
            I[h >> 2] = k;
            if (c && g) ra(e, h + 4, k + 1);else if (g) for (g = 0; g < k; ++g) {
              var m = e.charCodeAt(g);
              255 < m && (X(h), R("String has UTF-16 code units that do not fit in 8 bits"));
              D[h + 4 + g] = m;
            } else for (g = 0; g < k; ++g) D[h + 4 + g] = e[g];
            null !== d && d.push(X, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: xb,
          K: function (d) {
            X(d);
          }
        });
      },
      g: function (a, b, c) {
        c = L(c);

        if (2 === b) {
          var d = ta;
          var e = va;
          var g = wa;

          var k = function () {
            return ua;
          };

          var h = 1;
        } else 4 === b && (d = xa, e = ya, g = za, k = function () {
          return I;
        }, h = 2);

        S(a, {
          name: c,
          fromWireType: function (m) {
            for (var l = I[m >> 2], n = k(), t, u = m + 4, z = 0; z <= l; ++z) {
              var r = m + 4 + z * b;
              if (z == l || 0 == n[r >> h]) u = d(u, r - u), void 0 === t ? t = u : (t += String.fromCharCode(0), t += u), u = r + b;
            }

            X(m);
            return t;
          },
          toWireType: function (m, l) {
            "string" !== typeof l && R("Cannot pass non-string to C++ string type " + c);
            var n = g(l),
                t = Sb(4 + n + b);
            I[t >> 2] = n >> h;
            e(l, t + 4, n + b);
            null !== m && m.push(X, t);
            return t;
          },
          argPackAdvance: 8,
          readValueFromPointer: xb,
          K: function (m) {
            X(m);
          }
        });
      },
      l: function (a, b) {
        b = L(b);
        S(a, {
          sa: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      b: function () {
        A();
      },
      r: function (a, b, c) {
        D.copyWithin(a, b, b + c);
      },
      f: function (a) {
        a >>>= 0;
        var b = D.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              C.grow(Math.min(2147483648, d) - G.byteLength + 65535 >>> 16);
              Da(C.buffer);
              var e = 1;
              break a;
            } catch (g) {}

            e = void 0;
          }

          if (e) return !0;
        }

        return !1;
      },
      i: function (a, b, c, d) {
        for (var e = 0, g = 0; g < c; g++) {
          for (var k = F[b + 8 * g >> 2], h = F[b + (8 * g + 4) >> 2], m = 0; m < h; m++) {
            var l = D[k + m],
                n = Ob[a];
            0 === l || 10 === l ? ((1 === a ? ma : B)(qa(n, 0)), n.length = 0) : n.push(l);
          }

          e += h;
        }

        F[d >> 2] = e;
        return 0;
      },
      a: C,
      q: function () {}
    };

    (function () {
      function a(e) {
        f.asm = e.exports;
        Fa = f.asm.u;
        J--;
        f.monitorRunDependencies && f.monitorRunDependencies(J);
        0 == J && Ma && (e = Ma, Ma = null, e());
      }

      function b(e) {
        a(e.instance);
      }

      function c(e) {
        return Ra().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(e, function (g) {
          B("failed to asynchronously prepare wasm: " + g);
          A(g);
        });
      }

      var d = {
        a: Tb
      };
      J++;
      f.monitorRunDependencies && f.monitorRunDependencies(J);
      if (f.instantiateWasm) try {
        return f.instantiateWasm(d, a);
      } catch (e) {
        return B("Module.instantiateWasm callback failed with error: " + e), !1;
      }
      (function () {
        return na || "function" !== typeof WebAssembly.instantiateStreaming || Oa() || Na("file://") || "function" !== typeof fetch ? c(b) : fetch(K, {
          credentials: "same-origin"
        }).then(function (e) {
          return WebAssembly.instantiateStreaming(e, d).then(b, function (g) {
            B("wasm streaming compile failed: " + g);
            B("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ca);
      return {};
    })();

    var Rb = f.___wasm_call_ctors = function () {
      return (Rb = f.___wasm_call_ctors = f.asm.v).apply(null, arguments);
    },
        Sb = f._malloc = function () {
      return (Sb = f._malloc = f.asm.w).apply(null, arguments);
    },
        X = f._free = function () {
      return (X = f._free = f.asm.x).apply(null, arguments);
    },
        Gb = f.___getTypeName = function () {
      return (Gb = f.___getTypeName = f.asm.y).apply(null, arguments);
    };

    f.___embind_register_native_and_builtin_types = function () {
      return (f.___embind_register_native_and_builtin_types = f.asm.z).apply(null, arguments);
    };

    f.dynCall_jiji = function () {
      return (f.dynCall_jiji = f.asm.A).apply(null, arguments);
    };

    var Ub;

    Ma = function Vb() {
      Ub || Wb();
      Ub || (Ma = Vb);
    };

    function Wb() {
      function a() {
        if (!Ub && (Ub = !0, f.calledRun = !0, !oa)) {
          Sa(Ha);
          Sa(Ia);
          ba(f);
          if (f.onRuntimeInitialized) f.onRuntimeInitialized();
          if (f.postRun) for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length;) {
            var b = f.postRun.shift();
            Ja.unshift(b);
          }
          Sa(Ja);
        }
      }

      if (!(0 < J)) {
        if (f.preRun) for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length;) Ka();
        Sa(Ga);
        0 < J || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            f.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    f.run = Wb;
    if (f.preInit) for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length;) f.preInit.pop()();
    noExitRuntime = !0;
    Wb();
    return visdif.ready;
  };
}();

var visdifWasm = "visdif-2d84f8c1.wasm";

async function binarySearch(measureGoal, measure, {
  min = 0,
  max = 100,
  epsilon = 0.1,
  maxRounds = 8
} = {}) {
  let parameter = (max - min) / 2 + min;
  let delta = (max - min) / 4;
  let value;
  let round = 1;

  while (true) {
    value = await measure(parameter);

    if (Math.abs(value - measureGoal) < epsilon || round >= maxRounds) {
      return {
        parameter,
        round,
        value
      };
    }

    if (value > measureGoal) {
      parameter -= delta;
    } else if (value < measureGoal) {
      parameter += delta;
    }

    delta /= 2;
    round++;
  }
}

async function autoOptimize(bitmapIn, encode, decode, {
  butteraugliDistanceGoal = 1.4,
  ...otherOpts
} = {}) {
  const {
    VisDiff
  } = await instantiateEmscriptenWasm(visdif, visdifWasm);
  const comparator = new VisDiff(bitmapIn.data, bitmapIn.width, bitmapIn.height);
  let bitmapOut;
  let binaryOut;
  const {
    parameter
  } = await binarySearch(-1 * butteraugliDistanceGoal, async quality => {
    binaryOut = await encode(bitmapIn, quality);
    bitmapOut = await decode(binaryOut);
    return -1 * comparator.distance(bitmapOut.data);
  }, otherOpts);
  comparator.delete();
  return {
    bitmap: bitmapOut,
    binary: binaryOut,
    quality: parameter
  };
}

async function decodeFile(file) {
  var _Object$entries$find;

  const buffer = await file.arrayBuffer();
  const firstChunk = buffer.slice(0, 16);
  const firstChunkString = new Uint8Array(firstChunk).reduce((prev, curr) => prev + String.fromCodePoint(curr), '');
  const key = (_Object$entries$find = Object.entries(codecs).find(([name, {
    detectors
  }]) => detectors.some(detector => detector.exec(firstChunkString)))) == null ? void 0 : _Object$entries$find[0];

  if (!key) {
    throw Error(`${file} has an unsupported format`);
  }

  const rgba = (await codecs[key].dec()).decode(new Uint8Array(buffer));
  return {
    file,
    bitmap: rgba,
    size: buffer.length
  };
}

async function preprocessImage({
  preprocessorName,
  options,
  file
}) {
  const preprocessor = await preprocessors[preprocessorName].instantiate();
  file.bitmap = await preprocessor(file.bitmap.data, file.bitmap.width, file.bitmap.height, options);
  return file;
}

async function encodeFile({
  file,
  size,
  bitmap: bitmapIn,
  outputFile,
  encName,
  encConfig,
  optimizerButteraugliTarget,
  maxOptimizerRounds
}) {
  let out, infoText;
  const encoder = await codecs[encName].enc();

  if (encConfig === 'auto') {
    const optionToOptimize = codecs[encName].autoOptimize.option;
    const decoder = await codecs[encName].dec();

    const encode = (bitmapIn, quality) => encoder.encode(bitmapIn.data, bitmapIn.width, bitmapIn.height, Object.assign({}, codecs[encName].defaultEncoderOptions, {
      [optionToOptimize]: quality
    }));

    const decode = binary => decoder.decode(binary);

    const {
      bitmap,
      binary,
      quality
    } = await autoOptimize(bitmapIn, encode, decode, {
      min: codecs[encName].autoOptimize.min,
      max: codecs[encName].autoOptimize.max,
      butteraugliDistanceGoal: optimizerButteraugliTarget,
      maxRounds: maxOptimizerRounds
    });
    out = binary;
    const opts = {
      [optionToOptimize]: Math.round(quality * 10000) / 10000
    };
    infoText = ` using --${encName} '${JSON.stringify(opts)}'`;
  } else {
    out = encoder.encode(bitmapIn.data.buffer, bitmapIn.width, bitmapIn.height, encConfig);
  }

  return {
    infoText,
    inputSize: size,
    inputFile: file,
    outputFile,
    out,
    outputSize: out.length
  };
}

function handleJob(params) {
  console.log(params);
  const {
    operation
  } = params;

  switch (operation) {
    case 'encode':
      return encodeFile(params);

    case 'decode':
      return decodeFile(params.file);

    case 'preprocess':
      return preprocessImage(params);

    default:
      throw Error(`Invalid job "${operation}"`);
  }
}

self.addEventListener('message', async event => {
  const {
    msg,
    id
  } = event.data;
  const result = await handleJob(msg);
  self.postMessage({
    result,
    id
  });
});
