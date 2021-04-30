function pathify(path) {
  return `/squoosh/${path}`;
}

function instantiateEmscriptenWasm(factory, path) {
  return factory({
    locateFile() {
      return pathify(path);
    }

  });
}

var Module = function () {
  var _scriptDir = import.meta.url;
  return function (Module) {
    Module = Module || {};
    var f;
    f || (f = typeof Module !== 'undefined' ? Module : {});
    var aa, ba;
    f.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
        t;

    for (t in f) f.hasOwnProperty(t) && (r[t] = f[t]);

    var ca = "./this.program";

    function ea(a, b) {
      throw b;
    }

    var u = "",
        fa;
    u = self.location.href;
    _scriptDir && (u = _scriptDir);
    0 !== u.indexOf("blob:") ? u = u.substr(0, u.lastIndexOf("/") + 1) : u = "";

    fa = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var ha = f.print || console.log.bind(console),
        v = f.printErr || console.warn.bind(console);

    for (t in r) r.hasOwnProperty(t) && (f[t] = r[t]);

    r = null;
    f.thisProgram && (ca = f.thisProgram);
    f.quit && (ea = f.quit);
    var w;
    f.wasmBinary && (w = f.wasmBinary);
    var noExitRuntime;
    f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
    "object" !== typeof WebAssembly && A("no native wasm support detected");
    var B,
        ia = !1,
        ja = new TextDecoder("utf8");

    function ka(a, b, c) {
      var d = C;

      if (0 < c) {
        c = b + c - 1;

        for (var e = 0; e < a.length; ++e) {
          var g = a.charCodeAt(e);

          if (55296 <= g && 57343 >= g) {
            var m = a.charCodeAt(++e);
            g = 65536 + ((g & 1023) << 10) | m & 1023;
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

    var la = new TextDecoder("utf-16le");

    function ma(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && D[c];) ++c;

      return la.decode(C.subarray(a, c << 1));
    }

    function na(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var e = 0; e < c; ++e) E[b >> 1] = a.charCodeAt(e), b += 2;

      E[b >> 1] = 0;
      return b - d;
    }

    function oa(a) {
      return 2 * a.length;
    }

    function pa(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var e = G[a + 4 * c >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
      }

      return d;
    }

    function qa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var e = 0; e < a.length; ++e) {
        var g = a.charCodeAt(e);

        if (55296 <= g && 57343 >= g) {
          var m = a.charCodeAt(++e);
          g = 65536 + ((g & 1023) << 10) | m & 1023;
        }

        G[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }

      G[b >> 2] = 0;
      return b - d;
    }

    function ra(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var H, I, C, E, D, G, J, sa, ta;

    function ua(a) {
      H = a;
      f.HEAP8 = I = new Int8Array(a);
      f.HEAP16 = E = new Int16Array(a);
      f.HEAP32 = G = new Int32Array(a);
      f.HEAPU8 = C = new Uint8Array(a);
      f.HEAPU16 = D = new Uint16Array(a);
      f.HEAPU32 = J = new Uint32Array(a);
      f.HEAPF32 = sa = new Float32Array(a);
      f.HEAPF64 = ta = new Float64Array(a);
    }

    var va = f.INITIAL_MEMORY || 16777216;
    f.wasmMemory ? B = f.wasmMemory : B = new WebAssembly.Memory({
      initial: va / 65536,
      maximum: 32768
    });
    B && (H = B.buffer);
    va = H.byteLength;
    ua(H);
    var K,
        wa = [],
        xa = [],
        ya = [],
        za = [];

    function Aa() {
      var a = f.preRun.shift();
      wa.unshift(a);
    }

    var L = 0,
        M = null;
    f.preloadedImages = {};
    f.preloadedAudios = {};

    function A(a) {
      if (f.onAbort) f.onAbort(a);
      v(a);
      ia = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ba(a);
      throw a;
    }

    function Ca() {
      var a = N;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var N = "mozjpeg_enc.wasm";

    if (!Ca()) {
      var Da = N;
      N = f.locateFile ? f.locateFile(Da, u) : u + Da;
    }

    function Ea() {
      try {
        if (w) return new Uint8Array(w);
        if (fa) return fa(N);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        A(a);
      }
    }

    function Fa() {
      return w || "function" !== typeof fetch ? Promise.resolve().then(Ea) : fetch(N, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + N + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Ea();
      });
    }

    function O(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(f);else {
          var c = b.R;
          "number" === typeof c ? void 0 === b.L ? K.get(c)() : K.get(c)(b.L) : c(void 0 === b.L ? null : b.L);
        }
      }
    }

    var P = {};

    function Ga(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Q(a) {
      return this.fromWireType(J[a >> 2]);
    }

    var R = {},
        S = {},
        Ha = {};

    function Ia(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Ja(a, b) {
      a = Ia(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Ka(a) {
      var b = Error,
          c = Ja(a, function (d) {
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

    var La = void 0;

    function Ma(a, b, c) {
      function d(h) {
        h = c(h);
        if (h.length !== a.length) throw new La("Mismatched type converter count");

        for (var n = 0; n < a.length; ++n) T(a[n], h[n]);
      }

      a.forEach(function (h) {
        Ha[h] = b;
      });
      var e = Array(b.length),
          g = [],
          m = 0;
      b.forEach(function (h, n) {
        S.hasOwnProperty(h) ? e[n] = S[h] : (g.push(h), R.hasOwnProperty(h) || (R[h] = []), R[h].push(function () {
          e[n] = S[h];
          ++m;
          m === g.length && d(e);
        }));
      });
      0 === g.length && d(e);
    }

    function Na(a) {
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

    var Oa = void 0;

    function U(a) {
      for (var b = ""; C[a];) b += Oa[C[a++]];

      return b;
    }

    var Pa = void 0;

    function W(a) {
      throw new Pa(a);
    }

    function T(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || W('type "' + d + '" must have a positive integer typeid pointer');

      if (S.hasOwnProperty(a)) {
        if (c.V) return;
        W("Cannot register type '" + d + "' twice");
      }

      S[a] = b;
      delete Ha[a];
      R.hasOwnProperty(a) && (b = R[a], delete R[a], b.forEach(function (e) {
        e();
      }));
    }

    var Qa = [],
        X = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Ra(a) {
      4 < a && 0 === --X[a].M && (X[a] = void 0, Qa.push(a));
    }

    function Sa(a) {
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
          var b = Qa.length ? Qa.pop() : X.length;
          X[b] = {
            M: 1,
            value: a
          };
          return b;
      }
    }

    function Ta(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Ua(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(sa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(ta[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Va(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Ja(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Wa(a, b) {
      var c = f;

      if (void 0 === c[a].J) {
        var d = c[a];

        c[a] = function () {
          c[a].J.hasOwnProperty(arguments.length) || W("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].J + ")!");
          return c[a].J[arguments.length].apply(this, arguments);
        };

        c[a].J = [];
        c[a].J[d.O] = d;
      }
    }

    function Xa(a, b, c) {
      f.hasOwnProperty(a) ? ((void 0 === c || void 0 !== f[a].J && void 0 !== f[a].J[c]) && W("Cannot register public name '" + a + "' twice"), Wa(a, a), f.hasOwnProperty(c) && W("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), f[a].J[c] = b) : (f[a] = b, void 0 !== c && (f[a].ba = c));
    }

    function Ya(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(G[(b >> 2) + d]);

      return c;
    }

    function Za(a, b) {
      0 <= a.indexOf("j") || A("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var e;
        -1 != a.indexOf("j") ? e = c && c.length ? f["dynCall_" + a].apply(null, [b].concat(c)) : f["dynCall_" + a].call(null, b) : e = K.get(b).apply(null, c);
        return e;
      };
    }

    function Y(a, b) {
      a = U(a);
      var c = -1 != a.indexOf("j") ? Za(a, b) : K.get(b);
      "function" !== typeof c && W("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var $a = void 0;

    function ab(a) {
      a = bb(a);
      var b = U(a);
      Z(a);
      return b;
    }

    function cb(a, b) {
      function c(g) {
        e[g] || S[g] || (Ha[g] ? Ha[g].forEach(c) : (d.push(g), e[g] = !0));
      }

      var d = [],
          e = {};
      b.forEach(c);
      throw new $a(a + ": " + d.map(ab).join([", "]));
    }

    function db(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return I[d];
          } : function (d) {
            return C[d];
          };

        case 1:
          return c ? function (d) {
            return E[d >> 1];
          } : function (d) {
            return D[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return G[d >> 2];
          } : function (d) {
            return J[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var eb = {};

    function fb() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function gb(a, b) {
      var c = S[a];
      void 0 === c && W(b + " has unknown type " + ab(a));
      return c;
    }

    var hb = {},
        ib = {};

    function jb() {
      if (!kb) {
        var a = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
          _: ca || "./this.program"
        },
            b;

        for (b in ib) a[b] = ib[b];

        var c = [];

        for (b in a) c.push(b + "=" + a[b]);

        kb = c;
      }

      return kb;
    }

    var kb,
        lb = [null, [], []];
    La = f.InternalError = Ka("InternalError");

    for (var mb = Array(256), nb = 0; 256 > nb; ++nb) mb[nb] = String.fromCharCode(nb);

    Oa = mb;
    Pa = f.BindingError = Ka("BindingError");

    f.count_emval_handles = function () {
      for (var a = 0, b = 5; b < X.length; ++b) void 0 !== X[b] && ++a;

      return a;
    };

    f.get_first_emval = function () {
      for (var a = 5; a < X.length; ++a) if (void 0 !== X[a]) return X[a];

      return null;
    };

    $a = f.UnboundTypeError = Ka("UnboundTypeError");
    xa.push({
      R: function () {
        ob();
      }
    });
    var rb = {
      B: function () {},
      n: function (a) {
        var b = P[a];
        delete P[a];
        var c = b.W,
            d = b.X,
            e = b.N,
            g = e.map(function (m) {
          return m.U;
        }).concat(e.map(function (m) {
          return m.Z;
        }));
        Ma([a], g, function (m) {
          var h = {};
          e.forEach(function (n, k) {
            var l = m[k],
                q = n.S,
                x = n.T,
                y = m[k + e.length],
                p = n.Y,
                da = n.$;
            h[n.P] = {
              read: function (z) {
                return l.fromWireType(q(x, z));
              },
              write: function (z, F) {
                var V = [];
                p(da, z, y.toWireType(V, F));
                Ga(V);
              }
            };
          });
          return [{
            name: b.name,
            fromWireType: function (n) {
              var k = {},
                  l;

              for (l in h) k[l] = h[l].read(n);

              d(n);
              return k;
            },
            toWireType: function (n, k) {
              for (var l in h) if (!(l in k)) throw new TypeError('Missing field:  "' + l + '"');

              var q = c();

              for (l in h) h[l].write(q, k[l]);

              null !== n && n.push(d, q);
              return q;
            },
            argPackAdvance: 8,
            readValueFromPointer: Q,
            K: d
          }];
        });
      },
      y: function (a, b, c, d, e) {
        var g = Na(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (m) {
            return !!m;
          },
          toWireType: function (m, h) {
            return h ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (m) {
            if (1 === c) var h = I;else if (2 === c) h = E;else if (4 === c) h = G;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[m >> g]);
          },
          K: null
        });
      },
      x: function (a, b) {
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (c) {
            var d = X[c].value;
            Ra(c);
            return d;
          },
          toWireType: function (c, d) {
            return Sa(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Q,
          K: null
        });
      },
      k: function (a, b, c) {
        c = Na(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            if ("number" !== typeof e && "boolean" !== typeof e) throw new TypeError('Cannot convert "' + Ta(e) + '" to ' + this.name);
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ua(b, c),
          K: null
        });
      },
      g: function (a, b, c, d, e, g) {
        var m = Ya(b, c);
        a = U(a);
        e = Y(d, e);
        Xa(a, function () {
          cb("Cannot call " + a + " due to unbound types", m);
        }, b - 1);
        Ma([], m, function (h) {
          var n = a,
              k = a;
          h = [h[0], null].concat(h.slice(1));
          var l = e,
              q = h.length;
          2 > q && W("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var x = null !== h[1] && !1, y = !1, p = 1; p < h.length; ++p) if (null !== h[p] && void 0 === h[p].K) {
            y = !0;
            break;
          }

          var da = "void" !== h[0].name,
              z = "",
              F = "";

          for (p = 0; p < q - 2; ++p) z += (0 !== p ? ", " : "") + "arg" + p, F += (0 !== p ? ", " : "") + "arg" + p + "Wired";

          k = "return function " + Ia(k) + "(" + z + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + k + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          y && (k += "var destructors = [];\n");
          var V = y ? "destructors" : "null";
          z = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          l = [W, l, g, Ga, h[0], h[1]];
          x && (k += "var thisWired = classParam.toWireType(" + V + ", this);\n");

          for (p = 0; p < q - 2; ++p) k += "var arg" + p + "Wired = argType" + p + ".toWireType(" + V + ", arg" + p + "); // " + h[p + 2].name + "\n", z.push("argType" + p), l.push(h[p + 2]);

          x && (F = "thisWired" + (0 < F.length ? ", " : "") + F);
          k += (da ? "var rv = " : "") + "invoker(fn" + (0 < F.length ? ", " : "") + F + ");\n";
          if (y) k += "runDestructors(destructors);\n";else for (p = x ? 1 : 2; p < h.length; ++p) q = 1 === p ? "thisWired" : "arg" + (p - 2) + "Wired", null !== h[p].K && (k += q + "_dtor(" + q + "); // " + h[p].name + "\n", z.push(q + "_dtor"), l.push(h[p].K));
          da && (k += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          z.push(k + "}\n");
          h = Va(z).apply(null, l);
          p = b - 1;
          if (!f.hasOwnProperty(n)) throw new La("Replacing nonexistant public symbol");
          void 0 !== f[n].J && void 0 !== p ? f[n].J[p] = h : (f[n] = h, f[n].O = p);
          return [];
        });
      },
      d: function (a, b, c, d, e) {
        function g(k) {
          return k;
        }

        b = U(b);
        -1 === e && (e = 4294967295);
        var m = Na(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (k) {
            return k << h >>> h;
          };
        }

        var n = -1 != b.indexOf("unsigned");
        T(a, {
          name: b,
          fromWireType: g,
          toWireType: function (k, l) {
            if ("number" !== typeof l && "boolean" !== typeof l) throw new TypeError('Cannot convert "' + Ta(l) + '" to ' + this.name);
            if (l < d || l > e) throw new TypeError('Passing a number "' + Ta(l) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + e + "]!");
            return n ? l >>> 0 : l | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: db(b, m, 0 !== d),
          K: null
        });
      },
      c: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var m = J;
          return new e(H, m[g + 1], m[g]);
        }

        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = U(c);
        T(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          V: !0
        });
      },
      l: function (a, b) {
        b = U(b);
        var c = "std::string" === b;
        T(a, {
          name: b,
          fromWireType: function (d) {
            var e = J[d >> 2];
            if (c) for (var g = d + 4, m = 0; m <= e; ++m) {
              var h = d + 4 + m;

              if (m == e || 0 == C[h]) {
                if (g) {
                  for (var n = g + (h - g), k = g; !(k >= n) && C[k];) ++k;

                  g = ja.decode(C.subarray(g, k));
                } else g = "";

                if (void 0 === l) var l = g;else l += String.fromCharCode(0), l += g;
                g = h + 1;
              }
            } else {
              l = Array(e);

              for (m = 0; m < e; ++m) l[m] = String.fromCharCode(C[d + 4 + m]);

              l = l.join("");
            }
            Z(d);
            return l;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var g = "string" === typeof e;
            g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || W("Cannot pass non-string to std::string");
            var m = (c && g ? function () {
              for (var k = 0, l = 0; l < e.length; ++l) {
                var q = e.charCodeAt(l);
                55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | e.charCodeAt(++l) & 1023);
                127 >= q ? ++k : k = 2047 >= q ? k + 2 : 65535 >= q ? k + 3 : k + 4;
              }

              return k;
            } : function () {
              return e.length;
            })(),
                h = pb(4 + m + 1);
            J[h >> 2] = m;
            if (c && g) ka(e, h + 4, m + 1);else if (g) for (g = 0; g < m; ++g) {
              var n = e.charCodeAt(g);
              255 < n && (Z(h), W("String has UTF-16 code units that do not fit in 8 bits"));
              C[h + 4 + g] = n;
            } else for (g = 0; g < m; ++g) C[h + 4 + g] = e[g];
            null !== d && d.push(Z, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Q,
          K: function (d) {
            Z(d);
          }
        });
      },
      f: function (a, b, c) {
        c = U(c);

        if (2 === b) {
          var d = ma;
          var e = na;
          var g = oa;

          var m = function () {
            return D;
          };

          var h = 1;
        } else 4 === b && (d = pa, e = qa, g = ra, m = function () {
          return J;
        }, h = 2);

        T(a, {
          name: c,
          fromWireType: function (n) {
            for (var k = J[n >> 2], l = m(), q, x = n + 4, y = 0; y <= k; ++y) {
              var p = n + 4 + y * b;
              if (y == k || 0 == l[p >> h]) x = d(x, p - x), void 0 === q ? q = x : (q += String.fromCharCode(0), q += x), x = p + b;
            }

            Z(n);
            return q;
          },
          toWireType: function (n, k) {
            "string" !== typeof k && W("Cannot pass non-string to C++ string type " + c);
            var l = g(k),
                q = pb(4 + l + b);
            J[q >> 2] = l >> h;
            e(k, q + 4, l + b);
            null !== n && n.push(Z, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Q,
          K: function (n) {
            Z(n);
          }
        });
      },
      o: function (a, b, c, d, e, g) {
        P[a] = {
          name: U(b),
          W: Y(c, d),
          X: Y(e, g),
          N: []
        };
      },
      b: function (a, b, c, d, e, g, m, h, n, k) {
        P[a].N.push({
          P: U(b),
          U: c,
          S: Y(d, e),
          T: g,
          Z: m,
          Y: Y(h, n),
          $: k
        });
      },
      z: function (a, b) {
        b = U(b);
        T(a, {
          aa: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      h: Ra,
      v: function (a) {
        if (0 === a) return Sa(fb());
        var b = eb[a];
        a = void 0 === b ? U(a) : b;
        return Sa(fb()[a]);
      },
      m: function (a) {
        4 < a && (X[a].M += 1);
      },
      p: function (a, b, c, d) {
        a || W("Cannot use deleted val. handle = " + a);
        a = X[a].value;
        var e = hb[b];

        if (!e) {
          e = "";

          for (var g = 0; g < b; ++g) e += (0 !== g ? ", " : "") + "arg" + g;

          var m = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (g = 0; g < b; ++g) m += "var argType" + g + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + g + '], "parameter ' + g + '");\nvar arg' + g + " = argType" + g + ".readValueFromPointer(args);\nargs += argType" + g + "['argPackAdvance'];\n";

          e = new Function("requireRegisteredType", "Module", "__emval_register", m + ("var obj = new constructor(" + e + ");\nreturn __emval_register(obj);\n}\n"))(gb, f, Sa);
          hb[b] = e;
        }

        return e(a, c, d);
      },
      i: function () {
        A();
      },
      s: function (a, b, c) {
        C.copyWithin(a, b, b + c);
      },
      e: function (a) {
        a >>>= 0;
        var b = C.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              B.grow(Math.min(2147483648, d) - H.byteLength + 65535 >>> 16);
              ua(B.buffer);
              var e = 1;
              break a;
            } catch (g) {}

            e = void 0;
          }

          if (e) return !0;
        }

        return !1;
      },
      t: function (a, b) {
        var c = 0;
        jb().forEach(function (d, e) {
          var g = b + c;
          e = G[a + 4 * e >> 2] = g;

          for (g = 0; g < d.length; ++g) I[e++ >> 0] = d.charCodeAt(g);

          I[e >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      u: function (a, b) {
        var c = jb();
        G[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (e) {
          d += e.length + 1;
        });
        G[b >> 2] = d;
        return 0;
      },
      A: function (a) {
        if (!noExitRuntime) {
          if (f.onExit) f.onExit(a);
          ia = !0;
        }

        ea(a, new qb(a));
      },
      w: function () {
        return 0;
      },
      q: function () {},
      j: function (a, b, c, d) {
        for (var e = 0, g = 0; g < c; g++) {
          for (var m = G[b + 8 * g >> 2], h = G[b + (8 * g + 4) >> 2], n = 0; n < h; n++) {
            var k = C[m + n],
                l = lb[a];

            if (0 === k || 10 === k) {
              for (k = 0; l[k] && !(NaN <= k);) ++k;

              k = ja.decode(l.subarray ? l.subarray(0, k) : new Uint8Array(l.slice(0, k)));
              (1 === a ? ha : v)(k);
              l.length = 0;
            } else l.push(k);
          }

          e += h;
        }

        G[d >> 2] = e;
        return 0;
      },
      a: B,
      r: function () {}
    };

    (function () {
      function a(e) {
        f.asm = e.exports;
        K = f.asm.C;
        L--;
        f.monitorRunDependencies && f.monitorRunDependencies(L);
        0 == L && M && (e = M, M = null, e());
      }

      function b(e) {
        a(e.instance);
      }

      function c(e) {
        return Fa().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(e, function (g) {
          v("failed to asynchronously prepare wasm: " + g);
          A(g);
        });
      }

      var d = {
        a: rb
      };
      L++;
      f.monitorRunDependencies && f.monitorRunDependencies(L);
      if (f.instantiateWasm) try {
        return f.instantiateWasm(d, a);
      } catch (e) {
        return v("Module.instantiateWasm callback failed with error: " + e), !1;
      }
      (function () {
        return w || "function" !== typeof WebAssembly.instantiateStreaming || Ca() || "function" !== typeof fetch ? c(b) : fetch(N, {
          credentials: "same-origin"
        }).then(function (e) {
          return WebAssembly.instantiateStreaming(e, d).then(b, function (g) {
            v("wasm streaming compile failed: " + g);
            v("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ba);
      return {};
    })();

    var ob = f.___wasm_call_ctors = function () {
      return (ob = f.___wasm_call_ctors = f.asm.D).apply(null, arguments);
    },
        pb = f._malloc = function () {
      return (pb = f._malloc = f.asm.E).apply(null, arguments);
    },
        Z = f._free = function () {
      return (Z = f._free = f.asm.F).apply(null, arguments);
    },
        bb = f.___getTypeName = function () {
      return (bb = f.___getTypeName = f.asm.G).apply(null, arguments);
    };

    f.___embind_register_native_and_builtin_types = function () {
      return (f.___embind_register_native_and_builtin_types = f.asm.H).apply(null, arguments);
    };

    f.dynCall_jiji = function () {
      return (f.dynCall_jiji = f.asm.I).apply(null, arguments);
    };

    var sb;

    function qb(a) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + a + ")";
      this.status = a;
    }

    M = function tb() {
      sb || ub();
      sb || (M = tb);
    };

    function ub() {
      function a() {
        if (!sb && (sb = !0, f.calledRun = !0, !ia)) {
          O(xa);
          O(ya);
          aa(f);
          if (f.onRuntimeInitialized) f.onRuntimeInitialized();
          if (f.postRun) for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length;) {
            var b = f.postRun.shift();
            za.unshift(b);
          }
          O(za);
        }
      }

      if (!(0 < L)) {
        if (f.preRun) for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length;) Aa();
        O(wa);
        0 < L || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            f.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    f.run = ub;
    if (f.preInit) for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length;) f.preInit.pop()();
    noExitRuntime = !0;
    ub();
    return Module.ready;
  };
}();

var mozEncWasm = "mozjpeg_enc-5ad71119.wasm";

var Module$1 = function () {
  var _scriptDir = import.meta.url;
  return function (Module) {
    Module = Module || {};
    var f;
    f || (f = typeof Module !== 'undefined' ? Module : {});
    var aa, ba;
    f.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
        t;

    for (t in f) f.hasOwnProperty(t) && (r[t] = f[t]);

    var ca = "./this.program";

    function ea(a, b) {
      throw b;
    }

    var u = "",
        fa;
    u = self.location.href;
    _scriptDir && (u = _scriptDir);
    0 !== u.indexOf("blob:") ? u = u.substr(0, u.lastIndexOf("/") + 1) : u = "";

    fa = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var ha = f.print || console.log.bind(console),
        v = f.printErr || console.warn.bind(console);

    for (t in r) r.hasOwnProperty(t) && (f[t] = r[t]);

    r = null;
    f.thisProgram && (ca = f.thisProgram);
    f.quit && (ea = f.quit);
    var w;
    f.wasmBinary && (w = f.wasmBinary);
    var noExitRuntime;
    f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
    "object" !== typeof WebAssembly && A("no native wasm support detected");
    var B,
        ia = !1,
        ja = new TextDecoder("utf8");

    function ka(a, b, c) {
      var d = C;

      if (0 < c) {
        c = b + c - 1;

        for (var e = 0; e < a.length; ++e) {
          var g = a.charCodeAt(e);

          if (55296 <= g && 57343 >= g) {
            var m = a.charCodeAt(++e);
            g = 65536 + ((g & 1023) << 10) | m & 1023;
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

    var la = new TextDecoder("utf-16le");

    function ma(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && D[c];) ++c;

      return la.decode(C.subarray(a, c << 1));
    }

    function na(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var e = 0; e < c; ++e) E[b >> 1] = a.charCodeAt(e), b += 2;

      E[b >> 1] = 0;
      return b - d;
    }

    function oa(a) {
      return 2 * a.length;
    }

    function pa(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var e = G[a + 4 * c >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
      }

      return d;
    }

    function qa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var e = 0; e < a.length; ++e) {
        var g = a.charCodeAt(e);

        if (55296 <= g && 57343 >= g) {
          var m = a.charCodeAt(++e);
          g = 65536 + ((g & 1023) << 10) | m & 1023;
        }

        G[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }

      G[b >> 2] = 0;
      return b - d;
    }

    function ra(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var H, I, C, E, D, G, J, sa, ta;

    function ua(a) {
      H = a;
      f.HEAP8 = I = new Int8Array(a);
      f.HEAP16 = E = new Int16Array(a);
      f.HEAP32 = G = new Int32Array(a);
      f.HEAPU8 = C = new Uint8Array(a);
      f.HEAPU16 = D = new Uint16Array(a);
      f.HEAPU32 = J = new Uint32Array(a);
      f.HEAPF32 = sa = new Float32Array(a);
      f.HEAPF64 = ta = new Float64Array(a);
    }

    var va = f.INITIAL_MEMORY || 16777216;
    f.wasmMemory ? B = f.wasmMemory : B = new WebAssembly.Memory({
      initial: va / 65536,
      maximum: 32768
    });
    B && (H = B.buffer);
    va = H.byteLength;
    ua(H);
    var K,
        wa = [],
        xa = [],
        ya = [],
        za = [];

    function Aa() {
      var a = f.preRun.shift();
      wa.unshift(a);
    }

    var L = 0,
        M = null;
    f.preloadedImages = {};
    f.preloadedAudios = {};

    function A(a) {
      if (f.onAbort) f.onAbort(a);
      v(a);
      ia = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ba(a);
      throw a;
    }

    function Ca() {
      var a = N;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var N = "mozjpeg_dec.wasm";

    if (!Ca()) {
      var Da = N;
      N = f.locateFile ? f.locateFile(Da, u) : u + Da;
    }

    function Ea() {
      try {
        if (w) return new Uint8Array(w);
        if (fa) return fa(N);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        A(a);
      }
    }

    function Fa() {
      return w || "function" !== typeof fetch ? Promise.resolve().then(Ea) : fetch(N, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + N + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Ea();
      });
    }

    function O(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(f);else {
          var c = b.R;
          "number" === typeof c ? void 0 === b.L ? K.get(c)() : K.get(c)(b.L) : c(void 0 === b.L ? null : b.L);
        }
      }
    }

    var P = {};

    function Ga(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Q(a) {
      return this.fromWireType(J[a >> 2]);
    }

    var R = {},
        S = {},
        Ha = {};

    function Ia(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Ja(a, b) {
      a = Ia(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Ka(a) {
      var b = Error,
          c = Ja(a, function (d) {
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

    var La = void 0;

    function Ma(a, b, c) {
      function d(h) {
        h = c(h);
        if (h.length !== a.length) throw new La("Mismatched type converter count");

        for (var n = 0; n < a.length; ++n) T(a[n], h[n]);
      }

      a.forEach(function (h) {
        Ha[h] = b;
      });
      var e = Array(b.length),
          g = [],
          m = 0;
      b.forEach(function (h, n) {
        S.hasOwnProperty(h) ? e[n] = S[h] : (g.push(h), R.hasOwnProperty(h) || (R[h] = []), R[h].push(function () {
          e[n] = S[h];
          ++m;
          m === g.length && d(e);
        }));
      });
      0 === g.length && d(e);
    }

    function Na(a) {
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

    var Oa = void 0;

    function U(a) {
      for (var b = ""; C[a];) b += Oa[C[a++]];

      return b;
    }

    var Pa = void 0;

    function W(a) {
      throw new Pa(a);
    }

    function T(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || W('type "' + d + '" must have a positive integer typeid pointer');

      if (S.hasOwnProperty(a)) {
        if (c.V) return;
        W("Cannot register type '" + d + "' twice");
      }

      S[a] = b;
      delete Ha[a];
      R.hasOwnProperty(a) && (b = R[a], delete R[a], b.forEach(function (e) {
        e();
      }));
    }

    var Qa = [],
        X = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Ra(a) {
      4 < a && 0 === --X[a].M && (X[a] = void 0, Qa.push(a));
    }

    function Sa(a) {
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
          var b = Qa.length ? Qa.pop() : X.length;
          X[b] = {
            M: 1,
            value: a
          };
          return b;
      }
    }

    function Ta(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Ua(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(sa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(ta[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Va(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Ja(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Wa(a, b) {
      var c = f;

      if (void 0 === c[a].J) {
        var d = c[a];

        c[a] = function () {
          c[a].J.hasOwnProperty(arguments.length) || W("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].J + ")!");
          return c[a].J[arguments.length].apply(this, arguments);
        };

        c[a].J = [];
        c[a].J[d.O] = d;
      }
    }

    function Xa(a, b, c) {
      f.hasOwnProperty(a) ? ((void 0 === c || void 0 !== f[a].J && void 0 !== f[a].J[c]) && W("Cannot register public name '" + a + "' twice"), Wa(a, a), f.hasOwnProperty(c) && W("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), f[a].J[c] = b) : (f[a] = b, void 0 !== c && (f[a].ba = c));
    }

    function Ya(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(G[(b >> 2) + d]);

      return c;
    }

    function Za(a, b) {
      0 <= a.indexOf("j") || A("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var e;
        -1 != a.indexOf("j") ? e = c && c.length ? f["dynCall_" + a].apply(null, [b].concat(c)) : f["dynCall_" + a].call(null, b) : e = K.get(b).apply(null, c);
        return e;
      };
    }

    function Y(a, b) {
      a = U(a);
      var c = -1 != a.indexOf("j") ? Za(a, b) : K.get(b);
      "function" !== typeof c && W("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var $a = void 0;

    function ab(a) {
      a = bb(a);
      var b = U(a);
      Z(a);
      return b;
    }

    function cb(a, b) {
      function c(g) {
        e[g] || S[g] || (Ha[g] ? Ha[g].forEach(c) : (d.push(g), e[g] = !0));
      }

      var d = [],
          e = {};
      b.forEach(c);
      throw new $a(a + ": " + d.map(ab).join([", "]));
    }

    function db(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return I[d];
          } : function (d) {
            return C[d];
          };

        case 1:
          return c ? function (d) {
            return E[d >> 1];
          } : function (d) {
            return D[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return G[d >> 2];
          } : function (d) {
            return J[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var eb = {};

    function fb() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function gb(a, b) {
      var c = S[a];
      void 0 === c && W(b + " has unknown type " + ab(a));
      return c;
    }

    var hb = {},
        ib = {};

    function jb() {
      if (!kb) {
        var a = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
          _: ca || "./this.program"
        },
            b;

        for (b in ib) a[b] = ib[b];

        var c = [];

        for (b in a) c.push(b + "=" + a[b]);

        kb = c;
      }

      return kb;
    }

    var kb,
        lb = [null, [], []];
    La = f.InternalError = Ka("InternalError");

    for (var mb = Array(256), nb = 0; 256 > nb; ++nb) mb[nb] = String.fromCharCode(nb);

    Oa = mb;
    Pa = f.BindingError = Ka("BindingError");

    f.count_emval_handles = function () {
      for (var a = 0, b = 5; b < X.length; ++b) void 0 !== X[b] && ++a;

      return a;
    };

    f.get_first_emval = function () {
      for (var a = 5; a < X.length; ++a) if (void 0 !== X[a]) return X[a];

      return null;
    };

    $a = f.UnboundTypeError = Ka("UnboundTypeError");
    xa.push({
      R: function () {
        ob();
      }
    });
    var rb = {
      B: function () {},
      n: function (a) {
        var b = P[a];
        delete P[a];
        var c = b.W,
            d = b.X,
            e = b.N,
            g = e.map(function (m) {
          return m.U;
        }).concat(e.map(function (m) {
          return m.Z;
        }));
        Ma([a], g, function (m) {
          var h = {};
          e.forEach(function (n, k) {
            var l = m[k],
                q = n.S,
                x = n.T,
                y = m[k + e.length],
                p = n.Y,
                da = n.$;
            h[n.P] = {
              read: function (z) {
                return l.fromWireType(q(x, z));
              },
              write: function (z, F) {
                var V = [];
                p(da, z, y.toWireType(V, F));
                Ga(V);
              }
            };
          });
          return [{
            name: b.name,
            fromWireType: function (n) {
              var k = {},
                  l;

              for (l in h) k[l] = h[l].read(n);

              d(n);
              return k;
            },
            toWireType: function (n, k) {
              for (var l in h) if (!(l in k)) throw new TypeError('Missing field:  "' + l + '"');

              var q = c();

              for (l in h) h[l].write(q, k[l]);

              null !== n && n.push(d, q);
              return q;
            },
            argPackAdvance: 8,
            readValueFromPointer: Q,
            K: d
          }];
        });
      },
      y: function (a, b, c, d, e) {
        var g = Na(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (m) {
            return !!m;
          },
          toWireType: function (m, h) {
            return h ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (m) {
            if (1 === c) var h = I;else if (2 === c) h = E;else if (4 === c) h = G;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[m >> g]);
          },
          K: null
        });
      },
      x: function (a, b) {
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (c) {
            var d = X[c].value;
            Ra(c);
            return d;
          },
          toWireType: function (c, d) {
            return Sa(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Q,
          K: null
        });
      },
      k: function (a, b, c) {
        c = Na(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            if ("number" !== typeof e && "boolean" !== typeof e) throw new TypeError('Cannot convert "' + Ta(e) + '" to ' + this.name);
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ua(b, c),
          K: null
        });
      },
      g: function (a, b, c, d, e, g) {
        var m = Ya(b, c);
        a = U(a);
        e = Y(d, e);
        Xa(a, function () {
          cb("Cannot call " + a + " due to unbound types", m);
        }, b - 1);
        Ma([], m, function (h) {
          var n = a,
              k = a;
          h = [h[0], null].concat(h.slice(1));
          var l = e,
              q = h.length;
          2 > q && W("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var x = null !== h[1] && !1, y = !1, p = 1; p < h.length; ++p) if (null !== h[p] && void 0 === h[p].K) {
            y = !0;
            break;
          }

          var da = "void" !== h[0].name,
              z = "",
              F = "";

          for (p = 0; p < q - 2; ++p) z += (0 !== p ? ", " : "") + "arg" + p, F += (0 !== p ? ", " : "") + "arg" + p + "Wired";

          k = "return function " + Ia(k) + "(" + z + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + k + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          y && (k += "var destructors = [];\n");
          var V = y ? "destructors" : "null";
          z = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          l = [W, l, g, Ga, h[0], h[1]];
          x && (k += "var thisWired = classParam.toWireType(" + V + ", this);\n");

          for (p = 0; p < q - 2; ++p) k += "var arg" + p + "Wired = argType" + p + ".toWireType(" + V + ", arg" + p + "); // " + h[p + 2].name + "\n", z.push("argType" + p), l.push(h[p + 2]);

          x && (F = "thisWired" + (0 < F.length ? ", " : "") + F);
          k += (da ? "var rv = " : "") + "invoker(fn" + (0 < F.length ? ", " : "") + F + ");\n";
          if (y) k += "runDestructors(destructors);\n";else for (p = x ? 1 : 2; p < h.length; ++p) q = 1 === p ? "thisWired" : "arg" + (p - 2) + "Wired", null !== h[p].K && (k += q + "_dtor(" + q + "); // " + h[p].name + "\n", z.push(q + "_dtor"), l.push(h[p].K));
          da && (k += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          z.push(k + "}\n");
          h = Va(z).apply(null, l);
          p = b - 1;
          if (!f.hasOwnProperty(n)) throw new La("Replacing nonexistant public symbol");
          void 0 !== f[n].J && void 0 !== p ? f[n].J[p] = h : (f[n] = h, f[n].O = p);
          return [];
        });
      },
      d: function (a, b, c, d, e) {
        function g(k) {
          return k;
        }

        b = U(b);
        -1 === e && (e = 4294967295);
        var m = Na(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (k) {
            return k << h >>> h;
          };
        }

        var n = -1 != b.indexOf("unsigned");
        T(a, {
          name: b,
          fromWireType: g,
          toWireType: function (k, l) {
            if ("number" !== typeof l && "boolean" !== typeof l) throw new TypeError('Cannot convert "' + Ta(l) + '" to ' + this.name);
            if (l < d || l > e) throw new TypeError('Passing a number "' + Ta(l) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + e + "]!");
            return n ? l >>> 0 : l | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: db(b, m, 0 !== d),
          K: null
        });
      },
      c: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var m = J;
          return new e(H, m[g + 1], m[g]);
        }

        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = U(c);
        T(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          V: !0
        });
      },
      l: function (a, b) {
        b = U(b);
        var c = "std::string" === b;
        T(a, {
          name: b,
          fromWireType: function (d) {
            var e = J[d >> 2];
            if (c) for (var g = d + 4, m = 0; m <= e; ++m) {
              var h = d + 4 + m;

              if (m == e || 0 == C[h]) {
                if (g) {
                  for (var n = g + (h - g), k = g; !(k >= n) && C[k];) ++k;

                  g = ja.decode(C.subarray(g, k));
                } else g = "";

                if (void 0 === l) var l = g;else l += String.fromCharCode(0), l += g;
                g = h + 1;
              }
            } else {
              l = Array(e);

              for (m = 0; m < e; ++m) l[m] = String.fromCharCode(C[d + 4 + m]);

              l = l.join("");
            }
            Z(d);
            return l;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var g = "string" === typeof e;
            g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || W("Cannot pass non-string to std::string");
            var m = (c && g ? function () {
              for (var k = 0, l = 0; l < e.length; ++l) {
                var q = e.charCodeAt(l);
                55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | e.charCodeAt(++l) & 1023);
                127 >= q ? ++k : k = 2047 >= q ? k + 2 : 65535 >= q ? k + 3 : k + 4;
              }

              return k;
            } : function () {
              return e.length;
            })(),
                h = pb(4 + m + 1);
            J[h >> 2] = m;
            if (c && g) ka(e, h + 4, m + 1);else if (g) for (g = 0; g < m; ++g) {
              var n = e.charCodeAt(g);
              255 < n && (Z(h), W("String has UTF-16 code units that do not fit in 8 bits"));
              C[h + 4 + g] = n;
            } else for (g = 0; g < m; ++g) C[h + 4 + g] = e[g];
            null !== d && d.push(Z, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Q,
          K: function (d) {
            Z(d);
          }
        });
      },
      f: function (a, b, c) {
        c = U(c);

        if (2 === b) {
          var d = ma;
          var e = na;
          var g = oa;

          var m = function () {
            return D;
          };

          var h = 1;
        } else 4 === b && (d = pa, e = qa, g = ra, m = function () {
          return J;
        }, h = 2);

        T(a, {
          name: c,
          fromWireType: function (n) {
            for (var k = J[n >> 2], l = m(), q, x = n + 4, y = 0; y <= k; ++y) {
              var p = n + 4 + y * b;
              if (y == k || 0 == l[p >> h]) x = d(x, p - x), void 0 === q ? q = x : (q += String.fromCharCode(0), q += x), x = p + b;
            }

            Z(n);
            return q;
          },
          toWireType: function (n, k) {
            "string" !== typeof k && W("Cannot pass non-string to C++ string type " + c);
            var l = g(k),
                q = pb(4 + l + b);
            J[q >> 2] = l >> h;
            e(k, q + 4, l + b);
            null !== n && n.push(Z, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Q,
          K: function (n) {
            Z(n);
          }
        });
      },
      o: function (a, b, c, d, e, g) {
        P[a] = {
          name: U(b),
          W: Y(c, d),
          X: Y(e, g),
          N: []
        };
      },
      b: function (a, b, c, d, e, g, m, h, n, k) {
        P[a].N.push({
          P: U(b),
          U: c,
          S: Y(d, e),
          T: g,
          Z: m,
          Y: Y(h, n),
          $: k
        });
      },
      z: function (a, b) {
        b = U(b);
        T(a, {
          aa: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      h: Ra,
      v: function (a) {
        if (0 === a) return Sa(fb());
        var b = eb[a];
        a = void 0 === b ? U(a) : b;
        return Sa(fb()[a]);
      },
      m: function (a) {
        4 < a && (X[a].M += 1);
      },
      p: function (a, b, c, d) {
        a || W("Cannot use deleted val. handle = " + a);
        a = X[a].value;
        var e = hb[b];

        if (!e) {
          e = "";

          for (var g = 0; g < b; ++g) e += (0 !== g ? ", " : "") + "arg" + g;

          var m = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (g = 0; g < b; ++g) m += "var argType" + g + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + g + '], "parameter ' + g + '");\nvar arg' + g + " = argType" + g + ".readValueFromPointer(args);\nargs += argType" + g + "['argPackAdvance'];\n";

          e = new Function("requireRegisteredType", "Module", "__emval_register", m + ("var obj = new constructor(" + e + ");\nreturn __emval_register(obj);\n}\n"))(gb, f, Sa);
          hb[b] = e;
        }

        return e(a, c, d);
      },
      i: function () {
        A();
      },
      s: function (a, b, c) {
        C.copyWithin(a, b, b + c);
      },
      e: function (a) {
        a >>>= 0;
        var b = C.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              B.grow(Math.min(2147483648, d) - H.byteLength + 65535 >>> 16);
              ua(B.buffer);
              var e = 1;
              break a;
            } catch (g) {}

            e = void 0;
          }

          if (e) return !0;
        }

        return !1;
      },
      t: function (a, b) {
        var c = 0;
        jb().forEach(function (d, e) {
          var g = b + c;
          e = G[a + 4 * e >> 2] = g;

          for (g = 0; g < d.length; ++g) I[e++ >> 0] = d.charCodeAt(g);

          I[e >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      u: function (a, b) {
        var c = jb();
        G[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (e) {
          d += e.length + 1;
        });
        G[b >> 2] = d;
        return 0;
      },
      A: function (a) {
        if (!noExitRuntime) {
          if (f.onExit) f.onExit(a);
          ia = !0;
        }

        ea(a, new qb(a));
      },
      w: function () {
        return 0;
      },
      q: function () {},
      j: function (a, b, c, d) {
        for (var e = 0, g = 0; g < c; g++) {
          for (var m = G[b + 8 * g >> 2], h = G[b + (8 * g + 4) >> 2], n = 0; n < h; n++) {
            var k = C[m + n],
                l = lb[a];

            if (0 === k || 10 === k) {
              for (k = 0; l[k] && !(NaN <= k);) ++k;

              k = ja.decode(l.subarray ? l.subarray(0, k) : new Uint8Array(l.slice(0, k)));
              (1 === a ? ha : v)(k);
              l.length = 0;
            } else l.push(k);
          }

          e += h;
        }

        G[d >> 2] = e;
        return 0;
      },
      a: B,
      r: function () {}
    };

    (function () {
      function a(e) {
        f.asm = e.exports;
        K = f.asm.C;
        L--;
        f.monitorRunDependencies && f.monitorRunDependencies(L);
        0 == L && M && (e = M, M = null, e());
      }

      function b(e) {
        a(e.instance);
      }

      function c(e) {
        return Fa().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(e, function (g) {
          v("failed to asynchronously prepare wasm: " + g);
          A(g);
        });
      }

      var d = {
        a: rb
      };
      L++;
      f.monitorRunDependencies && f.monitorRunDependencies(L);
      if (f.instantiateWasm) try {
        return f.instantiateWasm(d, a);
      } catch (e) {
        return v("Module.instantiateWasm callback failed with error: " + e), !1;
      }
      (function () {
        return w || "function" !== typeof WebAssembly.instantiateStreaming || Ca() || "function" !== typeof fetch ? c(b) : fetch(N, {
          credentials: "same-origin"
        }).then(function (e) {
          return WebAssembly.instantiateStreaming(e, d).then(b, function (g) {
            v("wasm streaming compile failed: " + g);
            v("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ba);
      return {};
    })();

    var ob = f.___wasm_call_ctors = function () {
      return (ob = f.___wasm_call_ctors = f.asm.D).apply(null, arguments);
    },
        pb = f._malloc = function () {
      return (pb = f._malloc = f.asm.E).apply(null, arguments);
    },
        Z = f._free = function () {
      return (Z = f._free = f.asm.F).apply(null, arguments);
    },
        bb = f.___getTypeName = function () {
      return (bb = f.___getTypeName = f.asm.G).apply(null, arguments);
    };

    f.___embind_register_native_and_builtin_types = function () {
      return (f.___embind_register_native_and_builtin_types = f.asm.H).apply(null, arguments);
    };

    f.dynCall_jiji = function () {
      return (f.dynCall_jiji = f.asm.I).apply(null, arguments);
    };

    var sb;

    function qb(a) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + a + ")";
      this.status = a;
    }

    M = function tb() {
      sb || ub();
      sb || (M = tb);
    };

    function ub() {
      function a() {
        if (!sb && (sb = !0, f.calledRun = !0, !ia)) {
          O(xa);
          O(ya);
          aa(f);
          if (f.onRuntimeInitialized) f.onRuntimeInitialized();
          if (f.postRun) for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length;) {
            var b = f.postRun.shift();
            za.unshift(b);
          }
          O(za);
        }
      }

      if (!(0 < L)) {
        if (f.preRun) for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length;) Aa();
        O(wa);
        0 < L || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            f.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    f.run = ub;
    if (f.preInit) for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length;) f.preInit.pop()();
    noExitRuntime = !0;
    ub();
    return Module.ready;
  };
}();

var mozDecWasm = "mozjpeg_enc-5ad71119.wasm";

var Module$2 = function () {
  var _scriptDir = import.meta.url;
  return function (Module) {
    Module = Module || {};
    var g;
    g || (g = typeof Module !== 'undefined' ? Module : {});
    var aa, ba;
    g.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
        t;

    for (t in g) g.hasOwnProperty(t) && (r[t] = g[t]);

    var u = "",
        ca;
    u = self.location.href;
    _scriptDir && (u = _scriptDir);
    0 !== u.indexOf("blob:") ? u = u.substr(0, u.lastIndexOf("/") + 1) : u = "";

    ca = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var v = g.printErr || console.warn.bind(console);

    for (t in r) r.hasOwnProperty(t) && (g[t] = r[t]);

    r = null;
    var z;
    g.wasmBinary && (z = g.wasmBinary);
    var noExitRuntime;
    g.noExitRuntime && (noExitRuntime = g.noExitRuntime);
    "object" !== typeof WebAssembly && A("no native wasm support detected");
    var B,
        da = !1,
        fa = new TextDecoder("utf8");

    function ha(a, b, c) {
      var d = C;

      if (0 < c) {
        c = b + c - 1;

        for (var e = 0; e < a.length; ++e) {
          var f = a.charCodeAt(e);

          if (55296 <= f && 57343 >= f) {
            var k = a.charCodeAt(++e);
            f = 65536 + ((f & 1023) << 10) | k & 1023;
          }

          if (127 >= f) {
            if (b >= c) break;
            d[b++] = f;
          } else {
            if (2047 >= f) {
              if (b + 1 >= c) break;
              d[b++] = 192 | f >> 6;
            } else {
              if (65535 >= f) {
                if (b + 2 >= c) break;
                d[b++] = 224 | f >> 12;
              } else {
                if (b + 3 >= c) break;
                d[b++] = 240 | f >> 18;
                d[b++] = 128 | f >> 12 & 63;
              }

              d[b++] = 128 | f >> 6 & 63;
            }

            d[b++] = 128 | f & 63;
          }
        }

        d[b] = 0;
      }
    }

    var ia = new TextDecoder("utf-16le");

    function ja(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && D[c];) ++c;

      return ia.decode(C.subarray(a, c << 1));
    }

    function ka(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var e = 0; e < c; ++e) E[b >> 1] = a.charCodeAt(e), b += 2;

      E[b >> 1] = 0;
      return b - d;
    }

    function la(a) {
      return 2 * a.length;
    }

    function ma(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var e = G[a + 4 * c >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
      }

      return d;
    }

    function na(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var e = 0; e < a.length; ++e) {
        var f = a.charCodeAt(e);

        if (55296 <= f && 57343 >= f) {
          var k = a.charCodeAt(++e);
          f = 65536 + ((f & 1023) << 10) | k & 1023;
        }

        G[b >> 2] = f;
        b += 4;
        if (b + 4 > c) break;
      }

      G[b >> 2] = 0;
      return b - d;
    }

    function oa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var H, I, C, E, D, G, J, pa, qa;

    function ra(a) {
      H = a;
      g.HEAP8 = I = new Int8Array(a);
      g.HEAP16 = E = new Int16Array(a);
      g.HEAP32 = G = new Int32Array(a);
      g.HEAPU8 = C = new Uint8Array(a);
      g.HEAPU16 = D = new Uint16Array(a);
      g.HEAPU32 = J = new Uint32Array(a);
      g.HEAPF32 = pa = new Float32Array(a);
      g.HEAPF64 = qa = new Float64Array(a);
    }

    var sa = g.INITIAL_MEMORY || 16777216;
    g.wasmMemory ? B = g.wasmMemory : B = new WebAssembly.Memory({
      initial: sa / 65536,
      maximum: 32768
    });
    B && (H = B.buffer);
    sa = H.byteLength;
    ra(H);
    var K,
        ta = [],
        ua = [],
        va = [],
        wa = [];

    function xa() {
      var a = g.preRun.shift();
      ta.unshift(a);
    }

    var L = 0,
        M = null;
    g.preloadedImages = {};
    g.preloadedAudios = {};

    function A(a) {
      if (g.onAbort) g.onAbort(a);
      v(a);
      da = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ba(a);
      throw a;
    }

    function za() {
      var a = N;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var N = "webp_enc.wasm";

    if (!za()) {
      var Aa = N;
      N = g.locateFile ? g.locateFile(Aa, u) : u + Aa;
    }

    function Ba() {
      try {
        if (z) return new Uint8Array(z);
        if (ca) return ca(N);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        A(a);
      }
    }

    function Ca() {
      return z || "function" !== typeof fetch ? Promise.resolve().then(Ba) : fetch(N, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + N + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Ba();
      });
    }

    function O(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(g);else {
          var c = b.L;
          "number" === typeof c ? void 0 === b.G ? K.get(c)() : K.get(c)(b.G) : c(void 0 === b.G ? null : b.G);
        }
      }
    }

    var P = {};

    function Da(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Q(a) {
      return this.fromWireType(J[a >> 2]);
    }

    var R = {},
        S = {},
        Ea = {};

    function Fa(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Ga(a, b) {
      a = Fa(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Ha(a) {
      var b = Error,
          c = Ga(a, function (d) {
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

    var Ia = void 0;

    function Ja(a, b, c) {
      function d(h) {
        h = c(h);
        if (h.length !== a.length) throw new Ia("Mismatched type converter count");

        for (var n = 0; n < a.length; ++n) T(a[n], h[n]);
      }

      a.forEach(function (h) {
        Ea[h] = b;
      });
      var e = Array(b.length),
          f = [],
          k = 0;
      b.forEach(function (h, n) {
        S.hasOwnProperty(h) ? e[n] = S[h] : (f.push(h), R.hasOwnProperty(h) || (R[h] = []), R[h].push(function () {
          e[n] = S[h];
          ++k;
          k === f.length && d(e);
        }));
      });
      0 === f.length && d(e);
    }

    function Ka(a) {
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

    var La = void 0;

    function U(a) {
      for (var b = ""; C[a];) b += La[C[a++]];

      return b;
    }

    var Ma = void 0;

    function W(a) {
      throw new Ma(a);
    }

    function T(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || W('type "' + d + '" must have a positive integer typeid pointer');

      if (S.hasOwnProperty(a)) {
        if (c.P) return;
        W("Cannot register type '" + d + "' twice");
      }

      S[a] = b;
      delete Ea[a];
      R.hasOwnProperty(a) && (b = R[a], delete R[a], b.forEach(function (e) {
        e();
      }));
    }

    var Na = [],
        X = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Oa(a) {
      4 < a && 0 === --X[a].H && (X[a] = void 0, Na.push(a));
    }

    function Pa(a) {
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
          var b = Na.length ? Na.pop() : X.length;
          X[b] = {
            H: 1,
            value: a
          };
          return b;
      }
    }

    function Qa(a, b) {
      var c = g;

      if (void 0 === c[a].F) {
        var d = c[a];

        c[a] = function () {
          c[a].F.hasOwnProperty(arguments.length) || W("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].F + ")!");
          return c[a].F[arguments.length].apply(this, arguments);
        };

        c[a].F = [];
        c[a].F[d.J] = d;
      }
    }

    function Ra(a, b, c) {
      g.hasOwnProperty(a) ? ((void 0 === c || void 0 !== g[a].F && void 0 !== g[a].F[c]) && W("Cannot register public name '" + a + "' twice"), Qa(a, a), g.hasOwnProperty(c) && W("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), g[a].F[c] = b) : (g[a] = b, void 0 !== c && (g[a].X = c));
    }

    function Sa(a, b, c) {
      switch (b) {
        case 0:
          return function (d) {
            return this.fromWireType((c ? I : C)[d]);
          };

        case 1:
          return function (d) {
            return this.fromWireType((c ? E : D)[d >> 1]);
          };

        case 2:
          return function (d) {
            return this.fromWireType((c ? G : J)[d >> 2]);
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    function Ta(a) {
      a = Ua(a);
      var b = U(a);
      Y(a);
      return b;
    }

    function Va(a, b) {
      var c = S[a];
      void 0 === c && W(b + " has unknown type " + Ta(a));
      return c;
    }

    function Wa(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Xa(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(pa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(qa[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Ya(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Ga(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Za(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(G[(b >> 2) + d]);

      return c;
    }

    function $a(a, b) {
      0 <= a.indexOf("j") || A("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var e;
        -1 != a.indexOf("j") ? e = c && c.length ? g["dynCall_" + a].apply(null, [b].concat(c)) : g["dynCall_" + a].call(null, b) : e = K.get(b).apply(null, c);
        return e;
      };
    }

    function Z(a, b) {
      a = U(a);
      var c = -1 != a.indexOf("j") ? $a(a, b) : K.get(b);
      "function" !== typeof c && W("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var ab = void 0;

    function bb(a, b) {
      function c(f) {
        e[f] || S[f] || (Ea[f] ? Ea[f].forEach(c) : (d.push(f), e[f] = !0));
      }

      var d = [],
          e = {};
      b.forEach(c);
      throw new ab(a + ": " + d.map(Ta).join([", "]));
    }

    function cb(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return I[d];
          } : function (d) {
            return C[d];
          };

        case 1:
          return c ? function (d) {
            return E[d >> 1];
          } : function (d) {
            return D[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return G[d >> 2];
          } : function (d) {
            return J[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var db = {};

    function eb() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    var fb = {};
    Ia = g.InternalError = Ha("InternalError");

    for (var gb = Array(256), hb = 0; 256 > hb; ++hb) gb[hb] = String.fromCharCode(hb);

    La = gb;
    Ma = g.BindingError = Ha("BindingError");

    g.count_emval_handles = function () {
      for (var a = 0, b = 5; b < X.length; ++b) void 0 !== X[b] && ++a;

      return a;
    };

    g.get_first_emval = function () {
      for (var a = 5; a < X.length; ++a) if (void 0 !== X[a]) return X[a];

      return null;
    };

    ab = g.UnboundTypeError = Ha("UnboundTypeError");
    ua.push({
      L: function () {
        ib();
      }
    });
    var kb = {
      w: function () {},
      m: function (a) {
        var b = P[a];
        delete P[a];
        var c = b.R,
            d = b.S,
            e = b.I,
            f = e.map(function (k) {
          return k.O;
        }).concat(e.map(function (k) {
          return k.U;
        }));
        Ja([a], f, function (k) {
          var h = {};
          e.forEach(function (n, l) {
            var m = k[l],
                q = n.M,
                w = n.N,
                x = k[l + e.length],
                p = n.T,
                ea = n.V;
            h[n.K] = {
              read: function (y) {
                return m.fromWireType(q(w, y));
              },
              write: function (y, F) {
                var V = [];
                p(ea, y, x.toWireType(V, F));
                Da(V);
              }
            };
          });
          return [{
            name: b.name,
            fromWireType: function (n) {
              var l = {},
                  m;

              for (m in h) l[m] = h[m].read(n);

              d(n);
              return l;
            },
            toWireType: function (n, l) {
              for (var m in h) if (!(m in l)) throw new TypeError('Missing field:  "' + m + '"');

              var q = c();

              for (m in h) h[m].write(q, l[m]);

              null !== n && n.push(d, q);
              return q;
            },
            argPackAdvance: 8,
            readValueFromPointer: Q,
            D: d
          }];
        });
      },
      s: function (a, b, c, d, e) {
        var f = Ka(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (k) {
            return !!k;
          },
          toWireType: function (k, h) {
            return h ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (k) {
            if (1 === c) var h = I;else if (2 === c) h = E;else if (4 === c) h = G;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[k >> f]);
          },
          D: null
        });
      },
      r: function (a, b) {
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (c) {
            var d = X[c].value;
            Oa(c);
            return d;
          },
          toWireType: function (c, d) {
            return Pa(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Q,
          D: null
        });
      },
      o: function (a, b, c, d) {
        function e() {}

        c = Ka(c);
        b = U(b);
        e.values = {};
        T(a, {
          name: b,
          constructor: e,
          fromWireType: function (f) {
            return this.constructor.values[f];
          },
          toWireType: function (f, k) {
            return k.value;
          },
          argPackAdvance: 8,
          readValueFromPointer: Sa(b, c, d),
          D: null
        });
        Ra(b, e);
      },
      f: function (a, b, c) {
        var d = Va(a, "enum");
        b = U(b);
        a = d.constructor;
        d = Object.create(d.constructor.prototype, {
          value: {
            value: c
          },
          constructor: {
            value: Ga(d.name + "_" + b, function () {})
          }
        });
        a.values[c] = d;
        a[b] = d;
      },
      k: function (a, b, c) {
        c = Ka(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            if ("number" !== typeof e && "boolean" !== typeof e) throw new TypeError('Cannot convert "' + Wa(e) + '" to ' + this.name);
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: Xa(b, c),
          D: null
        });
      },
      i: function (a, b, c, d, e, f) {
        var k = Za(b, c);
        a = U(a);
        e = Z(d, e);
        Ra(a, function () {
          bb("Cannot call " + a + " due to unbound types", k);
        }, b - 1);
        Ja([], k, function (h) {
          var n = a,
              l = a;
          h = [h[0], null].concat(h.slice(1));
          var m = e,
              q = h.length;
          2 > q && W("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var w = null !== h[1] && !1, x = !1, p = 1; p < h.length; ++p) if (null !== h[p] && void 0 === h[p].D) {
            x = !0;
            break;
          }

          var ea = "void" !== h[0].name,
              y = "",
              F = "";

          for (p = 0; p < q - 2; ++p) y += (0 !== p ? ", " : "") + "arg" + p, F += (0 !== p ? ", " : "") + "arg" + p + "Wired";

          l = "return function " + Fa(l) + "(" + y + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + l + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          x && (l += "var destructors = [];\n");
          var V = x ? "destructors" : "null";
          y = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          m = [W, m, f, Da, h[0], h[1]];
          w && (l += "var thisWired = classParam.toWireType(" + V + ", this);\n");

          for (p = 0; p < q - 2; ++p) l += "var arg" + p + "Wired = argType" + p + ".toWireType(" + V + ", arg" + p + "); // " + h[p + 2].name + "\n", y.push("argType" + p), m.push(h[p + 2]);

          w && (F = "thisWired" + (0 < F.length ? ", " : "") + F);
          l += (ea ? "var rv = " : "") + "invoker(fn" + (0 < F.length ? ", " : "") + F + ");\n";
          if (x) l += "runDestructors(destructors);\n";else for (p = w ? 1 : 2; p < h.length; ++p) q = 1 === p ? "thisWired" : "arg" + (p - 2) + "Wired", null !== h[p].D && (l += q + "_dtor(" + q + "); // " + h[p].name + "\n", y.push(q + "_dtor"), m.push(h[p].D));
          ea && (l += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          y.push(l + "}\n");
          h = Ya(y).apply(null, m);
          p = b - 1;
          if (!g.hasOwnProperty(n)) throw new Ia("Replacing nonexistant public symbol");
          void 0 !== g[n].F && void 0 !== p ? g[n].F[p] = h : (g[n] = h, g[n].J = p);
          return [];
        });
      },
      d: function (a, b, c, d, e) {
        function f(l) {
          return l;
        }

        b = U(b);
        -1 === e && (e = 4294967295);
        var k = Ka(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          f = function (l) {
            return l << h >>> h;
          };
        }

        var n = -1 != b.indexOf("unsigned");
        T(a, {
          name: b,
          fromWireType: f,
          toWireType: function (l, m) {
            if ("number" !== typeof m && "boolean" !== typeof m) throw new TypeError('Cannot convert "' + Wa(m) + '" to ' + this.name);
            if (m < d || m > e) throw new TypeError('Passing a number "' + Wa(m) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + e + "]!");
            return n ? m >>> 0 : m | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: cb(b, k, 0 !== d),
          D: null
        });
      },
      c: function (a, b, c) {
        function d(f) {
          f >>= 2;
          var k = J;
          return new e(H, k[f + 1], k[f]);
        }

        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = U(c);
        T(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          P: !0
        });
      },
      l: function (a, b) {
        b = U(b);
        var c = "std::string" === b;
        T(a, {
          name: b,
          fromWireType: function (d) {
            var e = J[d >> 2];
            if (c) for (var f = d + 4, k = 0; k <= e; ++k) {
              var h = d + 4 + k;

              if (k == e || 0 == C[h]) {
                if (f) {
                  for (var n = f + (h - f), l = f; !(l >= n) && C[l];) ++l;

                  f = fa.decode(C.subarray(f, l));
                } else f = "";

                if (void 0 === m) var m = f;else m += String.fromCharCode(0), m += f;
                f = h + 1;
              }
            } else {
              m = Array(e);

              for (k = 0; k < e; ++k) m[k] = String.fromCharCode(C[d + 4 + k]);

              m = m.join("");
            }
            Y(d);
            return m;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var f = "string" === typeof e;
            f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || W("Cannot pass non-string to std::string");
            var k = (c && f ? function () {
              for (var l = 0, m = 0; m < e.length; ++m) {
                var q = e.charCodeAt(m);
                55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | e.charCodeAt(++m) & 1023);
                127 >= q ? ++l : l = 2047 >= q ? l + 2 : 65535 >= q ? l + 3 : l + 4;
              }

              return l;
            } : function () {
              return e.length;
            })(),
                h = jb(4 + k + 1);
            J[h >> 2] = k;
            if (c && f) ha(e, h + 4, k + 1);else if (f) for (f = 0; f < k; ++f) {
              var n = e.charCodeAt(f);
              255 < n && (Y(h), W("String has UTF-16 code units that do not fit in 8 bits"));
              C[h + 4 + f] = n;
            } else for (f = 0; f < k; ++f) C[h + 4 + f] = e[f];
            null !== d && d.push(Y, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Q,
          D: function (d) {
            Y(d);
          }
        });
      },
      h: function (a, b, c) {
        c = U(c);

        if (2 === b) {
          var d = ja;
          var e = ka;
          var f = la;

          var k = function () {
            return D;
          };

          var h = 1;
        } else 4 === b && (d = ma, e = na, f = oa, k = function () {
          return J;
        }, h = 2);

        T(a, {
          name: c,
          fromWireType: function (n) {
            for (var l = J[n >> 2], m = k(), q, w = n + 4, x = 0; x <= l; ++x) {
              var p = n + 4 + x * b;
              if (x == l || 0 == m[p >> h]) w = d(w, p - w), void 0 === q ? q = w : (q += String.fromCharCode(0), q += w), w = p + b;
            }

            Y(n);
            return q;
          },
          toWireType: function (n, l) {
            "string" !== typeof l && W("Cannot pass non-string to C++ string type " + c);
            var m = f(l),
                q = jb(4 + m + b);
            J[q >> 2] = m >> h;
            e(l, q + 4, m + b);
            null !== n && n.push(Y, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Q,
          D: function (n) {
            Y(n);
          }
        });
      },
      n: function (a, b, c, d, e, f) {
        P[a] = {
          name: U(b),
          R: Z(c, d),
          S: Z(e, f),
          I: []
        };
      },
      b: function (a, b, c, d, e, f, k, h, n, l) {
        P[a].I.push({
          K: U(b),
          O: c,
          M: Z(d, e),
          N: f,
          U: k,
          T: Z(h, n),
          V: l
        });
      },
      t: function (a, b) {
        b = U(b);
        T(a, {
          W: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      g: Oa,
      v: function (a) {
        if (0 === a) return Pa(eb());
        var b = db[a];
        a = void 0 === b ? U(a) : b;
        return Pa(eb()[a]);
      },
      u: function (a) {
        4 < a && (X[a].H += 1);
      },
      p: function (a, b, c, d) {
        a || W("Cannot use deleted val. handle = " + a);
        a = X[a].value;
        var e = fb[b];

        if (!e) {
          e = "";

          for (var f = 0; f < b; ++f) e += (0 !== f ? ", " : "") + "arg" + f;

          var k = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (f = 0; f < b; ++f) k += "var argType" + f + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + f + '], "parameter ' + f + '");\nvar arg' + f + " = argType" + f + ".readValueFromPointer(args);\nargs += argType" + f + "['argPackAdvance'];\n";

          e = new Function("requireRegisteredType", "Module", "__emval_register", k + ("var obj = new constructor(" + e + ");\nreturn __emval_register(obj);\n}\n"))(Va, g, Pa);
          fb[b] = e;
        }

        return e(a, c, d);
      },
      j: function () {
        A();
      },
      q: function (a, b, c) {
        C.copyWithin(a, b, b + c);
      },
      e: function (a) {
        a >>>= 0;
        var b = C.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              B.grow(Math.min(2147483648, d) - H.byteLength + 65535 >>> 16);
              ra(B.buffer);
              var e = 1;
              break a;
            } catch (f) {}

            e = void 0;
          }

          if (e) return !0;
        }

        return !1;
      },
      a: B
    };

    (function () {
      function a(e) {
        g.asm = e.exports;
        K = g.asm.x;
        L--;
        g.monitorRunDependencies && g.monitorRunDependencies(L);
        0 == L && M && (e = M, M = null, e());
      }

      function b(e) {
        a(e.instance);
      }

      function c(e) {
        return Ca().then(function (f) {
          return WebAssembly.instantiate(f, d);
        }).then(e, function (f) {
          v("failed to asynchronously prepare wasm: " + f);
          A(f);
        });
      }

      var d = {
        a: kb
      };
      L++;
      g.monitorRunDependencies && g.monitorRunDependencies(L);
      if (g.instantiateWasm) try {
        return g.instantiateWasm(d, a);
      } catch (e) {
        return v("Module.instantiateWasm callback failed with error: " + e), !1;
      }
      (function () {
        return z || "function" !== typeof WebAssembly.instantiateStreaming || za() || "function" !== typeof fetch ? c(b) : fetch(N, {
          credentials: "same-origin"
        }).then(function (e) {
          return WebAssembly.instantiateStreaming(e, d).then(b, function (f) {
            v("wasm streaming compile failed: " + f);
            v("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ba);
      return {};
    })();

    var ib = g.___wasm_call_ctors = function () {
      return (ib = g.___wasm_call_ctors = g.asm.y).apply(null, arguments);
    },
        jb = g._malloc = function () {
      return (jb = g._malloc = g.asm.z).apply(null, arguments);
    },
        Y = g._free = function () {
      return (Y = g._free = g.asm.A).apply(null, arguments);
    },
        Ua = g.___getTypeName = function () {
      return (Ua = g.___getTypeName = g.asm.B).apply(null, arguments);
    };

    g.___embind_register_native_and_builtin_types = function () {
      return (g.___embind_register_native_and_builtin_types = g.asm.C).apply(null, arguments);
    };

    var lb;

    M = function mb() {
      lb || nb();
      lb || (M = mb);
    };

    function nb() {
      function a() {
        if (!lb && (lb = !0, g.calledRun = !0, !da)) {
          O(ua);
          O(va);
          aa(g);
          if (g.onRuntimeInitialized) g.onRuntimeInitialized();
          if (g.postRun) for ("function" == typeof g.postRun && (g.postRun = [g.postRun]); g.postRun.length;) {
            var b = g.postRun.shift();
            wa.unshift(b);
          }
          O(wa);
        }
      }

      if (!(0 < L)) {
        if (g.preRun) for ("function" == typeof g.preRun && (g.preRun = [g.preRun]); g.preRun.length;) xa();
        O(ta);
        0 < L || (g.setStatus ? (g.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            g.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    g.run = nb;
    if (g.preInit) for ("function" == typeof g.preInit && (g.preInit = [g.preInit]); 0 < g.preInit.length;) g.preInit.pop()();
    noExitRuntime = !0;
    nb();
    return Module.ready;
  };
}();

var webpEncWasm = "webp_enc-b45aec5c.wasm";

var Module$3 = function () {
  var _scriptDir = import.meta.url;
  return function (Module) {
    Module = Module || {};
    var e;
    e || (e = typeof Module !== 'undefined' ? Module : {});
    var aa, r;
    e.ready = new Promise(function (a, b) {
      aa = a;
      r = b;
    });
    var t = {},
        u;

    for (u in e) e.hasOwnProperty(u) && (t[u] = e[u]);

    var v = "",
        ba;
    v = self.location.href;
    _scriptDir && (v = _scriptDir);
    0 !== v.indexOf("blob:") ? v = v.substr(0, v.lastIndexOf("/") + 1) : v = "";

    ba = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var x = e.printErr || console.warn.bind(console);

    for (u in t) t.hasOwnProperty(u) && (e[u] = t[u]);

    t = null;
    var y;
    e.wasmBinary && (y = e.wasmBinary);
    var noExitRuntime;
    e.noExitRuntime && (noExitRuntime = e.noExitRuntime);
    "object" !== typeof WebAssembly && z("no native wasm support detected");
    var A,
        ca = !1,
        da = new TextDecoder("utf8");

    function ea(a, b, c) {
      var d = C;

      if (0 < c) {
        c = b + c - 1;

        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);

          if (55296 <= g && 57343 >= g) {
            var k = a.charCodeAt(++f);
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

    var fa = new TextDecoder("utf-16le");

    function ha(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && D[c];) ++c;

      return fa.decode(C.subarray(a, c << 1));
    }

    function ia(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var f = 0; f < c; ++f) E[b >> 1] = a.charCodeAt(f), b += 2;

      E[b >> 1] = 0;
      return b - d;
    }

    function ja(a) {
      return 2 * a.length;
    }

    function ka(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var f = F[a + 4 * c >> 2];
        if (0 == f) break;
        ++c;
        65536 <= f ? (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : d += String.fromCharCode(f);
      }

      return d;
    }

    function la(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);

        if (55296 <= g && 57343 >= g) {
          var k = a.charCodeAt(++f);
          g = 65536 + ((g & 1023) << 10) | k & 1023;
        }

        F[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }

      F[b >> 2] = 0;
      return b - d;
    }

    function ma(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var G, na, C, E, D, F, H, oa, pa;

    function qa(a) {
      G = a;
      e.HEAP8 = na = new Int8Array(a);
      e.HEAP16 = E = new Int16Array(a);
      e.HEAP32 = F = new Int32Array(a);
      e.HEAPU8 = C = new Uint8Array(a);
      e.HEAPU16 = D = new Uint16Array(a);
      e.HEAPU32 = H = new Uint32Array(a);
      e.HEAPF32 = oa = new Float32Array(a);
      e.HEAPF64 = pa = new Float64Array(a);
    }

    var ra = e.INITIAL_MEMORY || 16777216;
    e.wasmMemory ? A = e.wasmMemory : A = new WebAssembly.Memory({
      initial: ra / 65536,
      maximum: 32768
    });
    A && (G = A.buffer);
    ra = G.byteLength;
    qa(G);
    var J,
        sa = [],
        ta = [],
        ua = [],
        va = [];

    function wa() {
      var a = e.preRun.shift();
      sa.unshift(a);
    }

    var K = 0,
        M = null;
    e.preloadedImages = {};
    e.preloadedAudios = {};

    function z(a) {
      if (e.onAbort) e.onAbort(a);
      x(a);
      ca = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      r(a);
      throw a;
    }

    function ya() {
      var a = N;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var N = "webp_dec.wasm";

    if (!ya()) {
      var za = N;
      N = e.locateFile ? e.locateFile(za, v) : v + za;
    }

    function Aa() {
      try {
        if (y) return new Uint8Array(y);
        if (ba) return ba(N);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        z(a);
      }
    }

    function Ba() {
      return y || "function" !== typeof fetch ? Promise.resolve().then(Aa) : fetch(N, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + N + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Aa();
      });
    }

    function O(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(e);else {
          var c = b.G;
          "number" === typeof c ? void 0 === b.C ? J.get(c)() : J.get(c)(b.C) : c(void 0 === b.C ? null : b.C);
        }
      }
    }

    function Ca(a) {
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

    var Da = void 0;

    function P(a) {
      for (var b = ""; C[a];) b += Da[C[a++]];

      return b;
    }

    var Q = {},
        R = {},
        S = {};

    function Ea(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Fa(a, b) {
      a = Ea(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Ga(a) {
      var b = Error,
          c = Fa(a, function (d) {
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

    var Ha = void 0;

    function T(a) {
      throw new Ha(a);
    }

    var Ia = void 0;

    function Ja(a, b) {
      function c(h) {
        h = b(h);
        if (h.length !== d.length) throw new Ia("Mismatched type converter count");

        for (var p = 0; p < d.length; ++p) U(d[p], h[p]);
      }

      var d = [];
      d.forEach(function (h) {
        S[h] = a;
      });
      var f = Array(a.length),
          g = [],
          k = 0;
      a.forEach(function (h, p) {
        R.hasOwnProperty(h) ? f[p] = R[h] : (g.push(h), Q.hasOwnProperty(h) || (Q[h] = []), Q[h].push(function () {
          f[p] = R[h];
          ++k;
          k === g.length && c(f);
        }));
      });
      0 === g.length && c(f);
    }

    function U(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || T('type "' + d + '" must have a positive integer typeid pointer');

      if (R.hasOwnProperty(a)) {
        if (c.H) return;
        T("Cannot register type '" + d + "' twice");
      }

      R[a] = b;
      delete S[a];
      Q.hasOwnProperty(a) && (b = Q[a], delete Q[a], b.forEach(function (f) {
        f();
      }));
    }

    var Ma = [],
        V = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Na(a) {
      4 < a && 0 === --V[a].D && (V[a] = void 0, Ma.push(a));
    }

    function W(a) {
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
          var b = Ma.length ? Ma.pop() : V.length;
          V[b] = {
            D: 1,
            value: a
          };
          return b;
      }
    }

    function Oa(a) {
      return this.fromWireType(H[a >> 2]);
    }

    function Pa(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Qa(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(oa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(pa[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Ra(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Fa(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Sa(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Ta(a, b) {
      var c = e;

      if (void 0 === c[a].A) {
        var d = c[a];

        c[a] = function () {
          c[a].A.hasOwnProperty(arguments.length) || T("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].A + ")!");
          return c[a].A[arguments.length].apply(this, arguments);
        };

        c[a].A = [];
        c[a].A[d.F] = d;
      }
    }

    function Ua(a, b, c) {
      e.hasOwnProperty(a) ? ((void 0 === c || void 0 !== e[a].A && void 0 !== e[a].A[c]) && T("Cannot register public name '" + a + "' twice"), Ta(a, a), e.hasOwnProperty(c) && T("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), e[a].A[c] = b) : (e[a] = b, void 0 !== c && (e[a].J = c));
    }

    function Va(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(F[(b >> 2) + d]);

      return c;
    }

    function Wa(a, b) {
      0 <= a.indexOf("j") || z("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var f;
        -1 != a.indexOf("j") ? f = c && c.length ? e["dynCall_" + a].apply(null, [b].concat(c)) : e["dynCall_" + a].call(null, b) : f = J.get(b).apply(null, c);
        return f;
      };
    }

    function Xa(a, b) {
      a = P(a);
      var c = -1 != a.indexOf("j") ? Wa(a, b) : J.get(b);
      "function" !== typeof c && T("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var Ya = void 0;

    function Za(a) {
      a = $a(a);
      var b = P(a);
      X(a);
      return b;
    }

    function ab(a, b) {
      function c(g) {
        f[g] || R[g] || (S[g] ? S[g].forEach(c) : (d.push(g), f[g] = !0));
      }

      var d = [],
          f = {};
      b.forEach(c);
      throw new Ya(a + ": " + d.map(Za).join([", "]));
    }

    function bb(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return na[d];
          } : function (d) {
            return C[d];
          };

        case 1:
          return c ? function (d) {
            return E[d >> 1];
          } : function (d) {
            return D[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return F[d >> 2];
          } : function (d) {
            return H[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var cb = {};

    function db() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function eb(a, b) {
      var c = R[a];
      void 0 === c && T(b + " has unknown type " + Za(a));
      return c;
    }

    for (var fb = {}, gb = Array(256), Y = 0; 256 > Y; ++Y) gb[Y] = String.fromCharCode(Y);

    Da = gb;
    Ha = e.BindingError = Ga("BindingError");
    Ia = e.InternalError = Ga("InternalError");

    e.count_emval_handles = function () {
      for (var a = 0, b = 5; b < V.length; ++b) void 0 !== V[b] && ++a;

      return a;
    };

    e.get_first_emval = function () {
      for (var a = 5; a < V.length; ++a) if (void 0 !== V[a]) return V[a];

      return null;
    };

    Ya = e.UnboundTypeError = Ga("UnboundTypeError");
    ta.push({
      G: function () {
        hb();
      }
    });
    var jb = {
      g: function () {},
      o: function (a, b, c, d, f) {
        var g = Ca(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (k) {
            return !!k;
          },
          toWireType: function (k, h) {
            return h ? d : f;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (k) {
            if (1 === c) var h = na;else if (2 === c) h = E;else if (4 === c) h = F;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[k >> g]);
          },
          B: null
        });
      },
      r: function (a, b) {
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (c) {
            var d = V[c].value;
            Na(c);
            return d;
          },
          toWireType: function (c, d) {
            return W(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Oa,
          B: null
        });
      },
      n: function (a, b, c) {
        c = Ca(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, f) {
            if ("number" !== typeof f && "boolean" !== typeof f) throw new TypeError('Cannot convert "' + Pa(f) + '" to ' + this.name);
            return f;
          },
          argPackAdvance: 8,
          readValueFromPointer: Qa(b, c),
          B: null
        });
      },
      j: function (a, b, c, d, f, g) {
        var k = Va(b, c);
        a = P(a);
        f = Xa(d, f);
        Ua(a, function () {
          ab("Cannot call " + a + " due to unbound types", k);
        }, b - 1);
        Ja(k, function (h) {
          var p = a,
              m = a;
          h = [h[0], null].concat(h.slice(1));
          var n = f,
              q = h.length;
          2 > q && T("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var w = null !== h[1] && !1, B = !1, l = 1; l < h.length; ++l) if (null !== h[l] && void 0 === h[l].B) {
            B = !0;
            break;
          }

          var Ka = "void" !== h[0].name,
              I = "",
              L = "";

          for (l = 0; l < q - 2; ++l) I += (0 !== l ? ", " : "") + "arg" + l, L += (0 !== l ? ", " : "") + "arg" + l + "Wired";

          m = "return function " + Ea(m) + "(" + I + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + m + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          B && (m += "var destructors = [];\n");
          var La = B ? "destructors" : "null";
          I = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          n = [T, n, g, Sa, h[0], h[1]];
          w && (m += "var thisWired = classParam.toWireType(" + La + ", this);\n");

          for (l = 0; l < q - 2; ++l) m += "var arg" + l + "Wired = argType" + l + ".toWireType(" + La + ", arg" + l + "); // " + h[l + 2].name + "\n", I.push("argType" + l), n.push(h[l + 2]);

          w && (L = "thisWired" + (0 < L.length ? ", " : "") + L);
          m += (Ka ? "var rv = " : "") + "invoker(fn" + (0 < L.length ? ", " : "") + L + ");\n";
          if (B) m += "runDestructors(destructors);\n";else for (l = w ? 1 : 2; l < h.length; ++l) q = 1 === l ? "thisWired" : "arg" + (l - 2) + "Wired", null !== h[l].B && (m += q + "_dtor(" + q + "); // " + h[l].name + "\n", I.push(q + "_dtor"), n.push(h[l].B));
          Ka && (m += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          I.push(m + "}\n");
          h = Ra(I).apply(null, n);
          l = b - 1;
          if (!e.hasOwnProperty(p)) throw new Ia("Replacing nonexistant public symbol");
          void 0 !== e[p].A && void 0 !== l ? e[p].A[l] = h : (e[p] = h, e[p].F = l);
          return [];
        });
      },
      c: function (a, b, c, d, f) {
        function g(m) {
          return m;
        }

        b = P(b);
        -1 === f && (f = 4294967295);
        var k = Ca(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (m) {
            return m << h >>> h;
          };
        }

        var p = -1 != b.indexOf("unsigned");
        U(a, {
          name: b,
          fromWireType: g,
          toWireType: function (m, n) {
            if ("number" !== typeof n && "boolean" !== typeof n) throw new TypeError('Cannot convert "' + Pa(n) + '" to ' + this.name);
            if (n < d || n > f) throw new TypeError('Passing a number "' + Pa(n) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + f + "]!");
            return p ? n >>> 0 : n | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: bb(b, k, 0 !== d),
          B: null
        });
      },
      b: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var k = H;
          return new f(G, k[g + 1], k[g]);
        }

        var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = P(c);
        U(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          H: !0
        });
      },
      i: function (a, b) {
        b = P(b);
        var c = "std::string" === b;
        U(a, {
          name: b,
          fromWireType: function (d) {
            var f = H[d >> 2];
            if (c) for (var g = d + 4, k = 0; k <= f; ++k) {
              var h = d + 4 + k;

              if (k == f || 0 == C[h]) {
                if (g) {
                  for (var p = g + (h - g), m = g; !(m >= p) && C[m];) ++m;

                  g = da.decode(C.subarray(g, m));
                } else g = "";

                if (void 0 === n) var n = g;else n += String.fromCharCode(0), n += g;
                g = h + 1;
              }
            } else {
              n = Array(f);

              for (k = 0; k < f; ++k) n[k] = String.fromCharCode(C[d + 4 + k]);

              n = n.join("");
            }
            X(d);
            return n;
          },
          toWireType: function (d, f) {
            f instanceof ArrayBuffer && (f = new Uint8Array(f));
            var g = "string" === typeof f;
            g || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || T("Cannot pass non-string to std::string");
            var k = (c && g ? function () {
              for (var m = 0, n = 0; n < f.length; ++n) {
                var q = f.charCodeAt(n);
                55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | f.charCodeAt(++n) & 1023);
                127 >= q ? ++m : m = 2047 >= q ? m + 2 : 65535 >= q ? m + 3 : m + 4;
              }

              return m;
            } : function () {
              return f.length;
            })(),
                h = ib(4 + k + 1);
            H[h >> 2] = k;
            if (c && g) ea(f, h + 4, k + 1);else if (g) for (g = 0; g < k; ++g) {
              var p = f.charCodeAt(g);
              255 < p && (X(h), T("String has UTF-16 code units that do not fit in 8 bits"));
              C[h + 4 + g] = p;
            } else for (g = 0; g < k; ++g) C[h + 4 + g] = f[g];
            null !== d && d.push(X, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Oa,
          B: function (d) {
            X(d);
          }
        });
      },
      h: function (a, b, c) {
        c = P(c);

        if (2 === b) {
          var d = ha;
          var f = ia;
          var g = ja;

          var k = function () {
            return D;
          };

          var h = 1;
        } else 4 === b && (d = ka, f = la, g = ma, k = function () {
          return H;
        }, h = 2);

        U(a, {
          name: c,
          fromWireType: function (p) {
            for (var m = H[p >> 2], n = k(), q, w = p + 4, B = 0; B <= m; ++B) {
              var l = p + 4 + B * b;
              if (B == m || 0 == n[l >> h]) w = d(w, l - w), void 0 === q ? q = w : (q += String.fromCharCode(0), q += w), w = l + b;
            }

            X(p);
            return q;
          },
          toWireType: function (p, m) {
            "string" !== typeof m && T("Cannot pass non-string to C++ string type " + c);
            var n = g(m),
                q = ib(4 + n + b);
            H[q >> 2] = n >> h;
            f(m, q + 4, n + b);
            null !== p && p.push(X, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Oa,
          B: function (p) {
            X(p);
          }
        });
      },
      p: function (a, b) {
        b = P(b);
        U(a, {
          I: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      e: Na,
      f: function (a) {
        if (0 === a) return W(db());
        var b = cb[a];
        a = void 0 === b ? P(a) : b;
        return W(db()[a]);
      },
      k: function (a) {
        4 < a && (V[a].D += 1);
      },
      l: function (a, b, c, d) {
        a || T("Cannot use deleted val. handle = " + a);
        a = V[a].value;
        var f = fb[b];

        if (!f) {
          f = "";

          for (var g = 0; g < b; ++g) f += (0 !== g ? ", " : "") + "arg" + g;

          var k = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (g = 0; g < b; ++g) k += "var argType" + g + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + g + '], "parameter ' + g + '");\nvar arg' + g + " = argType" + g + ".readValueFromPointer(args);\nargs += argType" + g + "['argPackAdvance'];\n";

          f = new Function("requireRegisteredType", "Module", "__emval_register", k + ("var obj = new constructor(" + f + ");\nreturn __emval_register(obj);\n}\n"))(eb, e, W);
          fb[b] = f;
        }

        return f(a, c, d);
      },
      m: function () {
        z();
      },
      q: function (a, b, c) {
        C.copyWithin(a, b, b + c);
      },
      d: function (a) {
        a >>>= 0;
        var b = C.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              A.grow(Math.min(2147483648, d) - G.byteLength + 65535 >>> 16);
              qa(A.buffer);
              var f = 1;
              break a;
            } catch (g) {}

            f = void 0;
          }

          if (f) return !0;
        }

        return !1;
      },
      a: A
    };

    (function () {
      function a(f) {
        e.asm = f.exports;
        J = e.asm.s;
        K--;
        e.monitorRunDependencies && e.monitorRunDependencies(K);
        0 == K && M && (f = M, M = null, f());
      }

      function b(f) {
        a(f.instance);
      }

      function c(f) {
        return Ba().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(f, function (g) {
          x("failed to asynchronously prepare wasm: " + g);
          z(g);
        });
      }

      var d = {
        a: jb
      };
      K++;
      e.monitorRunDependencies && e.monitorRunDependencies(K);
      if (e.instantiateWasm) try {
        return e.instantiateWasm(d, a);
      } catch (f) {
        return x("Module.instantiateWasm callback failed with error: " + f), !1;
      }
      (function () {
        return y || "function" !== typeof WebAssembly.instantiateStreaming || ya() || "function" !== typeof fetch ? c(b) : fetch(N, {
          credentials: "same-origin"
        }).then(function (f) {
          return WebAssembly.instantiateStreaming(f, d).then(b, function (g) {
            x("wasm streaming compile failed: " + g);
            x("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(r);
      return {};
    })();

    var hb = e.___wasm_call_ctors = function () {
      return (hb = e.___wasm_call_ctors = e.asm.t).apply(null, arguments);
    },
        ib = e._malloc = function () {
      return (ib = e._malloc = e.asm.u).apply(null, arguments);
    },
        X = e._free = function () {
      return (X = e._free = e.asm.v).apply(null, arguments);
    },
        $a = e.___getTypeName = function () {
      return ($a = e.___getTypeName = e.asm.w).apply(null, arguments);
    };

    e.___embind_register_native_and_builtin_types = function () {
      return (e.___embind_register_native_and_builtin_types = e.asm.x).apply(null, arguments);
    };

    var Z;

    M = function kb() {
      Z || lb();
      Z || (M = kb);
    };

    function lb() {
      function a() {
        if (!Z && (Z = !0, e.calledRun = !0, !ca)) {
          O(ta);
          O(ua);
          aa(e);
          if (e.onRuntimeInitialized) e.onRuntimeInitialized();
          if (e.postRun) for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
            var b = e.postRun.shift();
            va.unshift(b);
          }
          O(va);
        }
      }

      if (!(0 < K)) {
        if (e.preRun) for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) wa();
        O(sa);
        0 < K || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            e.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    e.run = lb;
    if (e.preInit) for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) e.preInit.pop()();
    noExitRuntime = !0;
    lb();
    return Module.ready;
  };
}();

var webpDecWasm = "webp_dec-9c302491.wasm";

var avif_enc = function () {
  var _scriptDir = import.meta.url;
  return function (avif_enc) {
    avif_enc = avif_enc || {};
    var f;
    f || (f = typeof avif_enc !== 'undefined' ? avif_enc : {});
    var aa, ba;
    f.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var t = {},
        u;

    for (u in f) f.hasOwnProperty(u) && (t[u] = f[u]);

    var v = "",
        ca;
    v = self.location.href;
    _scriptDir && (v = _scriptDir);
    0 !== v.indexOf("blob:") ? v = v.substr(0, v.lastIndexOf("/") + 1) : v = "";

    ca = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var da = f.print || console.log.bind(console),
        w = f.printErr || console.warn.bind(console);

    for (u in t) t.hasOwnProperty(u) && (f[u] = t[u]);

    t = null;
    var ea = 0,
        x;
    f.wasmBinary && (x = f.wasmBinary);
    var noExitRuntime;
    f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
    "object" !== typeof WebAssembly && y("no native wasm support detected");
    var B,
        ha = !1,
        ia = new TextDecoder("utf8");

    function ja(a, b, c) {
      var d = C;

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

    var ka = new TextDecoder("utf-16le");

    function la(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && D[c];) ++c;

      return ka.decode(C.subarray(a, c << 1));
    }

    function ma(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var e = 0; e < c; ++e) E[b >> 1] = a.charCodeAt(e), b += 2;

      E[b >> 1] = 0;
      return b - d;
    }

    function na(a) {
      return 2 * a.length;
    }

    function oa(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var e = F[a + 4 * c >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
      }

      return d;
    }

    function pa(a, b, c) {
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

    function qa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var G, ra, C, E, D, F, H, sa, ta;

    function ua(a) {
      G = a;
      f.HEAP8 = ra = new Int8Array(a);
      f.HEAP16 = E = new Int16Array(a);
      f.HEAP32 = F = new Int32Array(a);
      f.HEAPU8 = C = new Uint8Array(a);
      f.HEAPU16 = D = new Uint16Array(a);
      f.HEAPU32 = H = new Uint32Array(a);
      f.HEAPF32 = sa = new Float32Array(a);
      f.HEAPF64 = ta = new Float64Array(a);
    }

    var va = f.INITIAL_MEMORY || 16777216;
    f.wasmMemory ? B = f.wasmMemory : B = new WebAssembly.Memory({
      initial: va / 65536,
      maximum: 32768
    });
    B && (G = B.buffer);
    va = G.byteLength;
    ua(G);
    var I,
        wa = [],
        xa = [],
        ya = [],
        za = [];

    function Aa() {
      var a = f.preRun.shift();
      wa.unshift(a);
    }

    var K = 0,
        L = null;
    f.preloadedImages = {};
    f.preloadedAudios = {};

    function y(a) {
      if (f.onAbort) f.onAbort(a);
      w(a);
      ha = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ba(a);
      throw a;
    }

    function Ca() {
      var a = M;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var M = "avif_enc.wasm";

    if (!Ca()) {
      var Da = M;
      M = f.locateFile ? f.locateFile(Da, v) : v + Da;
    }

    function Ea() {
      try {
        if (x) return new Uint8Array(x);
        if (ca) return ca(M);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        y(a);
      }
    }

    function Fa() {
      return x || "function" !== typeof fetch ? Promise.resolve().then(Ea) : fetch(M, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + M + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Ea();
      });
    }

    function N(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(f);else {
          var c = b.ia;
          "number" === typeof c ? void 0 === b.da ? I.get(c)() : I.get(c)(b.da) : c(void 0 === b.da ? null : b.da);
        }
      }
    }

    var Ga = [null, [], []],
        Ha = {},
        Ia = {};

    function Ja(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Ka(a) {
      return this.fromWireType(H[a >> 2]);
    }

    var O = {},
        P = {},
        La = {};

    function Ma(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Na(a, b) {
      a = Ma(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Oa(a) {
      var b = Error,
          c = Na(a, function (d) {
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

    var Pa = void 0;

    function Qa(a, b, c) {
      function d(h) {
        h = c(h);
        if (h.length !== a.length) throw new Pa("Mismatched type converter count");

        for (var n = 0; n < a.length; ++n) Q(a[n], h[n]);
      }

      a.forEach(function (h) {
        La[h] = b;
      });
      var e = Array(b.length),
          g = [],
          k = 0;
      b.forEach(function (h, n) {
        P.hasOwnProperty(h) ? e[n] = P[h] : (g.push(h), O.hasOwnProperty(h) || (O[h] = []), O[h].push(function () {
          e[n] = P[h];
          ++k;
          k === g.length && d(e);
        }));
      });
      0 === g.length && d(e);
    }

    function Ra(a) {
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

    var Sa = void 0;

    function R(a) {
      for (var b = ""; C[a];) b += Sa[C[a++]];

      return b;
    }

    var Ta = void 0;

    function S(a) {
      throw new Ta(a);
    }

    function Q(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || S('type "' + d + '" must have a positive integer typeid pointer');

      if (P.hasOwnProperty(a)) {
        if (c.ma) return;
        S("Cannot register type '" + d + "' twice");
      }

      P[a] = b;
      delete La[a];
      O.hasOwnProperty(a) && (b = O[a], delete O[a], b.forEach(function (e) {
        e();
      }));
    }

    var Ua = [],
        T = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Va(a) {
      4 < a && 0 === --T[a].ea && (T[a] = void 0, Ua.push(a));
    }

    function Wa(a) {
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
          var b = Ua.length ? Ua.pop() : T.length;
          T[b] = {
            ea: 1,
            value: a
          };
          return b;
      }
    }

    function Xa(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Ya(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(sa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(ta[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Za(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Na(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function $a(a, b) {
      var c = f;

      if (void 0 === c[a].ba) {
        var d = c[a];

        c[a] = function () {
          c[a].ba.hasOwnProperty(arguments.length) || S("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].ba + ")!");
          return c[a].ba[arguments.length].apply(this, arguments);
        };

        c[a].ba = [];
        c[a].ba[d.ga] = d;
      }
    }

    function ab(a, b, c) {
      f.hasOwnProperty(a) ? ((void 0 === c || void 0 !== f[a].ba && void 0 !== f[a].ba[c]) && S("Cannot register public name '" + a + "' twice"), $a(a, a), f.hasOwnProperty(c) && S("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), f[a].ba[c] = b) : (f[a] = b, void 0 !== c && (f[a].va = c));
    }

    function bb(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(F[(b >> 2) + d]);

      return c;
    }

    function cb(a, b) {
      0 <= a.indexOf("j") || y("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var e;
        -1 != a.indexOf("j") ? e = c && c.length ? f["dynCall_" + a].apply(null, [b].concat(c)) : f["dynCall_" + a].call(null, b) : e = I.get(b).apply(null, c);
        return e;
      };
    }

    function U(a, b) {
      a = R(a);
      var c = -1 != a.indexOf("j") ? cb(a, b) : I.get(b);
      "function" !== typeof c && S("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var db = void 0;

    function eb(a) {
      a = fb(a);
      var b = R(a);
      V(a);
      return b;
    }

    function gb(a, b) {
      function c(g) {
        e[g] || P[g] || (La[g] ? La[g].forEach(c) : (d.push(g), e[g] = !0));
      }

      var d = [],
          e = {};
      b.forEach(c);
      throw new db(a + ": " + d.map(eb).join([", "]));
    }

    function hb(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return ra[d];
          } : function (d) {
            return C[d];
          };

        case 1:
          return c ? function (d) {
            return E[d >> 1];
          } : function (d) {
            return D[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return F[d >> 2];
          } : function (d) {
            return H[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var ib = {};

    function jb() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function kb(a, b) {
      var c = P[a];
      void 0 === c && S(b + " has unknown type " + eb(a));
      return c;
    }

    var lb = {};
    Pa = f.InternalError = Oa("InternalError");

    for (var mb = Array(256), nb = 0; 256 > nb; ++nb) mb[nb] = String.fromCharCode(nb);

    Sa = mb;
    Ta = f.BindingError = Oa("BindingError");

    f.count_emval_handles = function () {
      for (var a = 0, b = 5; b < T.length; ++b) void 0 !== T[b] && ++a;

      return a;
    };

    f.get_first_emval = function () {
      for (var a = 5; a < T.length; ++a) if (void 0 !== T[a]) return T[a];

      return null;
    };

    db = f.UnboundTypeError = Oa("UnboundTypeError");
    xa.push({
      ia: function () {
        ob();
      }
    });
    var yb = {
      N: function () {},
      t: function () {
        return 0;
      },
      G: function () {
        return 0;
      },
      H: function () {},
      A: function (a) {
        var b = Ia[a];
        delete Ia[a];
        var c = b.na,
            d = b.oa,
            e = b.fa,
            g = e.map(function (k) {
          return k.la;
        }).concat(e.map(function (k) {
          return k.qa;
        }));
        Qa([a], g, function (k) {
          var h = {};
          e.forEach(function (n, l) {
            var m = k[l],
                p = n.ja,
                r = n.ka,
                z = k[l + e.length],
                q = n.pa,
                fa = n.ra;
            h[n.ha] = {
              read: function (A) {
                return m.fromWireType(p(r, A));
              },
              write: function (A, J) {
                var X = [];
                q(fa, A, z.toWireType(X, J));
                Ja(X);
              }
            };
          });
          return [{
            name: b.name,
            fromWireType: function (n) {
              var l = {},
                  m;

              for (m in h) l[m] = h[m].read(n);

              d(n);
              return l;
            },
            toWireType: function (n, l) {
              for (var m in h) if (!(m in l)) throw new TypeError('Missing field:  "' + m + '"');

              var p = c();

              for (m in h) h[m].write(p, l[m]);

              null !== n && n.push(d, p);
              return p;
            },
            argPackAdvance: 8,
            readValueFromPointer: Ka,
            ca: d
          }];
        });
      },
      J: function (a, b, c, d, e) {
        var g = Ra(c);
        b = R(b);
        Q(a, {
          name: b,
          fromWireType: function (k) {
            return !!k;
          },
          toWireType: function (k, h) {
            return h ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (k) {
            if (1 === c) var h = ra;else if (2 === c) h = E;else if (4 === c) h = F;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[k >> g]);
          },
          ca: null
        });
      },
      I: function (a, b) {
        b = R(b);
        Q(a, {
          name: b,
          fromWireType: function (c) {
            var d = T[c].value;
            Va(c);
            return d;
          },
          toWireType: function (c, d) {
            return Wa(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Ka,
          ca: null
        });
      },
      w: function (a, b, c) {
        c = Ra(c);
        b = R(b);
        Q(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            if ("number" !== typeof e && "boolean" !== typeof e) throw new TypeError('Cannot convert "' + Xa(e) + '" to ' + this.name);
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ya(b, c),
          ca: null
        });
      },
      z: function (a, b, c, d, e, g) {
        var k = bb(b, c);
        a = R(a);
        e = U(d, e);
        ab(a, function () {
          gb("Cannot call " + a + " due to unbound types", k);
        }, b - 1);
        Qa([], k, function (h) {
          var n = a,
              l = a;
          h = [h[0], null].concat(h.slice(1));
          var m = e,
              p = h.length;
          2 > p && S("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var r = null !== h[1] && !1, z = !1, q = 1; q < h.length; ++q) if (null !== h[q] && void 0 === h[q].ca) {
            z = !0;
            break;
          }

          var fa = "void" !== h[0].name,
              A = "",
              J = "";

          for (q = 0; q < p - 2; ++q) A += (0 !== q ? ", " : "") + "arg" + q, J += (0 !== q ? ", " : "") + "arg" + q + "Wired";

          l = "return function " + Ma(l) + "(" + A + ") {\nif (arguments.length !== " + (p - 2) + ") {\nthrowBindingError('function " + l + " called with ' + arguments.length + ' arguments, expected " + (p - 2) + " args!');\n}\n";
          z && (l += "var destructors = [];\n");
          var X = z ? "destructors" : "null";
          A = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          m = [S, m, g, Ja, h[0], h[1]];
          r && (l += "var thisWired = classParam.toWireType(" + X + ", this);\n");

          for (q = 0; q < p - 2; ++q) l += "var arg" + q + "Wired = argType" + q + ".toWireType(" + X + ", arg" + q + "); // " + h[q + 2].name + "\n", A.push("argType" + q), m.push(h[q + 2]);

          r && (J = "thisWired" + (0 < J.length ? ", " : "") + J);
          l += (fa ? "var rv = " : "") + "invoker(fn" + (0 < J.length ? ", " : "") + J + ");\n";
          if (z) l += "runDestructors(destructors);\n";else for (q = r ? 1 : 2; q < h.length; ++q) p = 1 === q ? "thisWired" : "arg" + (q - 2) + "Wired", null !== h[q].ca && (l += p + "_dtor(" + p + "); // " + h[q].name + "\n", A.push(p + "_dtor"), m.push(h[q].ca));
          fa && (l += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          A.push(l + "}\n");
          h = Za(A).apply(null, m);
          q = b - 1;
          if (!f.hasOwnProperty(n)) throw new Pa("Replacing nonexistant public symbol");
          void 0 !== f[n].ba && void 0 !== q ? f[n].ba[q] = h : (f[n] = h, f[n].ga = q);
          return [];
        });
      },
      j: function (a, b, c, d, e) {
        function g(l) {
          return l;
        }

        b = R(b);
        -1 === e && (e = 4294967295);
        var k = Ra(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (l) {
            return l << h >>> h;
          };
        }

        var n = -1 != b.indexOf("unsigned");
        Q(a, {
          name: b,
          fromWireType: g,
          toWireType: function (l, m) {
            if ("number" !== typeof m && "boolean" !== typeof m) throw new TypeError('Cannot convert "' + Xa(m) + '" to ' + this.name);
            if (m < d || m > e) throw new TypeError('Passing a number "' + Xa(m) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + e + "]!");
            return n ? m >>> 0 : m | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: hb(b, k, 0 !== d),
          ca: null
        });
      },
      f: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var k = H;
          return new e(G, k[g + 1], k[g]);
        }

        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = R(c);
        Q(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          ma: !0
        });
      },
      x: function (a, b) {
        b = R(b);
        var c = "std::string" === b;
        Q(a, {
          name: b,
          fromWireType: function (d) {
            var e = H[d >> 2];
            if (c) for (var g = d + 4, k = 0; k <= e; ++k) {
              var h = d + 4 + k;

              if (k == e || 0 == C[h]) {
                if (g) {
                  for (var n = g + (h - g), l = g; !(l >= n) && C[l];) ++l;

                  g = ia.decode(C.subarray(g, l));
                } else g = "";

                if (void 0 === m) var m = g;else m += String.fromCharCode(0), m += g;
                g = h + 1;
              }
            } else {
              m = Array(e);

              for (k = 0; k < e; ++k) m[k] = String.fromCharCode(C[d + 4 + k]);

              m = m.join("");
            }
            V(d);
            return m;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var g = "string" === typeof e;
            g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || S("Cannot pass non-string to std::string");
            var k = (c && g ? function () {
              for (var l = 0, m = 0; m < e.length; ++m) {
                var p = e.charCodeAt(m);
                55296 <= p && 57343 >= p && (p = 65536 + ((p & 1023) << 10) | e.charCodeAt(++m) & 1023);
                127 >= p ? ++l : l = 2047 >= p ? l + 2 : 65535 >= p ? l + 3 : l + 4;
              }

              return l;
            } : function () {
              return e.length;
            })(),
                h = pb(4 + k + 1);
            H[h >> 2] = k;
            if (c && g) ja(e, h + 4, k + 1);else if (g) for (g = 0; g < k; ++g) {
              var n = e.charCodeAt(g);
              255 < n && (V(h), S("String has UTF-16 code units that do not fit in 8 bits"));
              C[h + 4 + g] = n;
            } else for (g = 0; g < k; ++g) C[h + 4 + g] = e[g];
            null !== d && d.push(V, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ka,
          ca: function (d) {
            V(d);
          }
        });
      },
      q: function (a, b, c) {
        c = R(c);

        if (2 === b) {
          var d = la;
          var e = ma;
          var g = na;

          var k = function () {
            return D;
          };

          var h = 1;
        } else 4 === b && (d = oa, e = pa, g = qa, k = function () {
          return H;
        }, h = 2);

        Q(a, {
          name: c,
          fromWireType: function (n) {
            for (var l = H[n >> 2], m = k(), p, r = n + 4, z = 0; z <= l; ++z) {
              var q = n + 4 + z * b;
              if (z == l || 0 == m[q >> h]) r = d(r, q - r), void 0 === p ? p = r : (p += String.fromCharCode(0), p += r), r = q + b;
            }

            V(n);
            return p;
          },
          toWireType: function (n, l) {
            "string" !== typeof l && S("Cannot pass non-string to C++ string type " + c);
            var m = g(l),
                p = pb(4 + m + b);
            H[p >> 2] = m >> h;
            e(l, p + 4, m + b);
            null !== n && n.push(V, p);
            return p;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ka,
          ca: function (n) {
            V(n);
          }
        });
      },
      B: function (a, b, c, d, e, g) {
        Ia[a] = {
          name: R(b),
          na: U(c, d),
          oa: U(e, g),
          fa: []
        };
      },
      g: function (a, b, c, d, e, g, k, h, n, l) {
        Ia[a].fa.push({
          ha: R(b),
          la: c,
          ja: U(d, e),
          ka: g,
          qa: k,
          pa: U(h, n),
          ra: l
        });
      },
      K: function (a, b) {
        b = R(b);
        Q(a, {
          ua: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      l: Va,
      M: function (a) {
        if (0 === a) return Wa(jb());
        var b = ib[a];
        a = void 0 === b ? R(a) : b;
        return Wa(jb()[a]);
      },
      y: function (a) {
        4 < a && (T[a].ea += 1);
      },
      D: function (a, b, c, d) {
        a || S("Cannot use deleted val. handle = " + a);
        a = T[a].value;
        var e = lb[b];

        if (!e) {
          e = "";

          for (var g = 0; g < b; ++g) e += (0 !== g ? ", " : "") + "arg" + g;

          var k = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (g = 0; g < b; ++g) k += "var argType" + g + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + g + '], "parameter ' + g + '");\nvar arg' + g + " = argType" + g + ".readValueFromPointer(args);\nargs += argType" + g + "['argPackAdvance'];\n";

          e = new Function("requireRegisteredType", "Module", "__emval_register", k + ("var obj = new constructor(" + e + ");\nreturn __emval_register(obj);\n}\n"))(kb, f, Wa);
          lb[b] = e;
        }

        return e(a, c, d);
      },
      i: function () {
        y();
      },
      e: function (a, b) {
        W(a, b || 1);
        throw "longjmp";
      },
      E: function (a, b, c) {
        C.copyWithin(a, b, b + c);
      },
      k: function (a) {
        a >>>= 0;
        var b = C.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              B.grow(Math.min(2147483648, d) - G.byteLength + 65535 >>> 16);
              ua(B.buffer);
              var e = 1;
              break a;
            } catch (g) {}

            e = void 0;
          }

          if (e) return !0;
        }

        return !1;
      },
      v: function () {
        return 0;
      },
      F: function (a, b, c, d) {
        a = Ha.ta(a);
        b = Ha.sa(a, b, c);
        F[d >> 2] = b;
        return 0;
      },
      C: function () {},
      u: function (a, b, c, d) {
        for (var e = 0, g = 0; g < c; g++) {
          for (var k = F[b + 8 * g >> 2], h = F[b + (8 * g + 4) >> 2], n = 0; n < h; n++) {
            var l = C[k + n],
                m = Ga[a];

            if (0 === l || 10 === l) {
              for (l = 0; m[l] && !(NaN <= l);) ++l;

              l = ia.decode(m.subarray ? m.subarray(0, l) : new Uint8Array(m.slice(0, l)));
              (1 === a ? da : w)(l);
              m.length = 0;
            } else m.push(l);
          }

          e += h;
        }

        F[d >> 2] = e;
        return 0;
      },
      c: function () {
        return ea | 0;
      },
      s: qb,
      n: rb,
      r: sb,
      o: tb,
      p: ub,
      h: vb,
      d: wb,
      m: xb,
      a: B,
      b: function (a) {
        ea = a | 0;
      },
      L: function (a) {
        var b = Date.now() / 1E3 | 0;
        a && (F[a >> 2] = b);
        return b;
      }
    };

    (function () {
      function a(e) {
        f.asm = e.exports;
        I = f.asm.O;
        K--;
        f.monitorRunDependencies && f.monitorRunDependencies(K);
        0 == K && L && (e = L, L = null, e());
      }

      function b(e) {
        a(e.instance);
      }

      function c(e) {
        return Fa().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(e, function (g) {
          w("failed to asynchronously prepare wasm: " + g);
          y(g);
        });
      }

      var d = {
        a: yb
      };
      K++;
      f.monitorRunDependencies && f.monitorRunDependencies(K);
      if (f.instantiateWasm) try {
        return f.instantiateWasm(d, a);
      } catch (e) {
        return w("Module.instantiateWasm callback failed with error: " + e), !1;
      }
      (function () {
        return x || "function" !== typeof WebAssembly.instantiateStreaming || Ca() || "function" !== typeof fetch ? c(b) : fetch(M, {
          credentials: "same-origin"
        }).then(function (e) {
          return WebAssembly.instantiateStreaming(e, d).then(b, function (g) {
            w("wasm streaming compile failed: " + g);
            w("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ba);
      return {};
    })();

    var ob = f.___wasm_call_ctors = function () {
      return (ob = f.___wasm_call_ctors = f.asm.P).apply(null, arguments);
    },
        pb = f._malloc = function () {
      return (pb = f._malloc = f.asm.Q).apply(null, arguments);
    },
        V = f._free = function () {
      return (V = f._free = f.asm.R).apply(null, arguments);
    },
        fb = f.___getTypeName = function () {
      return (fb = f.___getTypeName = f.asm.S).apply(null, arguments);
    };

    f.___embind_register_native_and_builtin_types = function () {
      return (f.___embind_register_native_and_builtin_types = f.asm.T).apply(null, arguments);
    };

    var Y = f.stackSave = function () {
      return (Y = f.stackSave = f.asm.U).apply(null, arguments);
    },
        Z = f.stackRestore = function () {
      return (Z = f.stackRestore = f.asm.V).apply(null, arguments);
    },
        W = f._setThrew = function () {
      return (W = f._setThrew = f.asm.W).apply(null, arguments);
    };

    f.dynCall_jiiiiiiiii = function () {
      return (f.dynCall_jiiiiiiiii = f.asm.X).apply(null, arguments);
    };

    f.dynCall_jiji = function () {
      return (f.dynCall_jiji = f.asm.Y).apply(null, arguments);
    };

    f.dynCall_jiiiiiiii = function () {
      return (f.dynCall_jiiiiiiii = f.asm.Z).apply(null, arguments);
    };

    f.dynCall_jiiiiii = function () {
      return (f.dynCall_jiiiiii = f.asm._).apply(null, arguments);
    };

    f.dynCall_jiiiii = function () {
      return (f.dynCall_jiiiii = f.asm.$).apply(null, arguments);
    };

    f.dynCall_iiijii = function () {
      return (f.dynCall_iiijii = f.asm.aa).apply(null, arguments);
    };

    function ub(a, b) {
      var c = Y();

      try {
        I.get(a)(b);
      } catch (d) {
        Z(c);
        if (d !== d + 0 && "longjmp" !== d) throw d;
        W(1, 0);
      }
    }

    function wb(a, b, c, d, e) {
      var g = Y();

      try {
        I.get(a)(b, c, d, e);
      } catch (k) {
        Z(g);
        if (k !== k + 0 && "longjmp" !== k) throw k;
        W(1, 0);
      }
    }

    function vb(a, b, c) {
      var d = Y();

      try {
        I.get(a)(b, c);
      } catch (e) {
        Z(d);
        if (e !== e + 0 && "longjmp" !== e) throw e;
        W(1, 0);
      }
    }

    function tb(a, b, c, d, e, g, k, h, n, l) {
      var m = Y();

      try {
        return I.get(a)(b, c, d, e, g, k, h, n, l);
      } catch (p) {
        Z(m);
        if (p !== p + 0 && "longjmp" !== p) throw p;
        W(1, 0);
      }
    }

    function qb(a, b, c) {
      var d = Y();

      try {
        return I.get(a)(b, c);
      } catch (e) {
        Z(d);
        if (e !== e + 0 && "longjmp" !== e) throw e;
        W(1, 0);
      }
    }

    function rb(a, b, c, d, e) {
      var g = Y();

      try {
        return I.get(a)(b, c, d, e);
      } catch (k) {
        Z(g);
        if (k !== k + 0 && "longjmp" !== k) throw k;
        W(1, 0);
      }
    }

    function xb(a, b, c, d, e, g, k, h, n, l, m) {
      var p = Y();

      try {
        I.get(a)(b, c, d, e, g, k, h, n, l, m);
      } catch (r) {
        Z(p);
        if (r !== r + 0 && "longjmp" !== r) throw r;
        W(1, 0);
      }
    }

    function sb(a, b, c, d, e, g, k, h, n) {
      var l = Y();

      try {
        return I.get(a)(b, c, d, e, g, k, h, n);
      } catch (m) {
        Z(l);
        if (m !== m + 0 && "longjmp" !== m) throw m;
        W(1, 0);
      }
    }

    var zb;

    L = function Ab() {
      zb || Bb();
      zb || (L = Ab);
    };

    function Bb() {
      function a() {
        if (!zb && (zb = !0, f.calledRun = !0, !ha)) {
          N(xa);
          N(ya);
          aa(f);
          if (f.onRuntimeInitialized) f.onRuntimeInitialized();
          if (f.postRun) for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length;) {
            var b = f.postRun.shift();
            za.unshift(b);
          }
          N(za);
        }
      }

      if (!(0 < K)) {
        if (f.preRun) for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length;) Aa();
        N(wa);
        0 < K || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            f.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    f.run = Bb;
    if (f.preInit) for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length;) f.preInit.pop()();
    noExitRuntime = !0;
    Bb();
    return avif_enc.ready;
  };
}();

var avifEncWasm = "avif_enc-64e83761.wasm";

var avif_dec = function () {
  var _scriptDir = import.meta.url;
  return function (avif_dec) {
    avif_dec = avif_dec || {};
    var e;
    e || (e = typeof avif_dec !== 'undefined' ? avif_dec : {});
    var aa, ba;
    e.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
        t;

    for (t in e) e.hasOwnProperty(t) && (r[t] = e[t]);

    var u = "",
        ca;
    u = self.location.href;
    _scriptDir && (u = _scriptDir);
    0 !== u.indexOf("blob:") ? u = u.substr(0, u.lastIndexOf("/") + 1) : u = "";

    ca = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var da = e.print || console.log.bind(console),
        v = e.printErr || console.warn.bind(console);

    for (t in r) r.hasOwnProperty(t) && (e[t] = r[t]);

    r = null;
    var ea = 0,
        w;
    e.wasmBinary && (w = e.wasmBinary);
    var noExitRuntime;
    e.noExitRuntime && (noExitRuntime = e.noExitRuntime);
    "object" !== typeof WebAssembly && y("no native wasm support detected");
    var z,
        fa = !1,
        ha = new TextDecoder("utf8");

    function ia(a, b, c) {
      var d = A;

      if (0 < c) {
        c = b + c - 1;

        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);

          if (55296 <= g && 57343 >= g) {
            var k = a.charCodeAt(++f);
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

    var ja = new TextDecoder("utf-16le");

    function ka(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && B[c];) ++c;

      return ja.decode(A.subarray(a, c << 1));
    }

    function la(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var f = 0; f < c; ++f) C[b >> 1] = a.charCodeAt(f), b += 2;

      C[b >> 1] = 0;
      return b - d;
    }

    function ma(a) {
      return 2 * a.length;
    }

    function na(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var f = E[a + 4 * c >> 2];
        if (0 == f) break;
        ++c;
        65536 <= f ? (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : d += String.fromCharCode(f);
      }

      return d;
    }

    function oa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);

        if (55296 <= g && 57343 >= g) {
          var k = a.charCodeAt(++f);
          g = 65536 + ((g & 1023) << 10) | k & 1023;
        }

        E[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }

      E[b >> 2] = 0;
      return b - d;
    }

    function pa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var F, qa, A, C, B, E, G, ra, sa;

    function ta(a) {
      F = a;
      e.HEAP8 = qa = new Int8Array(a);
      e.HEAP16 = C = new Int16Array(a);
      e.HEAP32 = E = new Int32Array(a);
      e.HEAPU8 = A = new Uint8Array(a);
      e.HEAPU16 = B = new Uint16Array(a);
      e.HEAPU32 = G = new Uint32Array(a);
      e.HEAPF32 = ra = new Float32Array(a);
      e.HEAPF64 = sa = new Float64Array(a);
    }

    var ua = e.INITIAL_MEMORY || 16777216;
    e.wasmMemory ? z = e.wasmMemory : z = new WebAssembly.Memory({
      initial: ua / 65536,
      maximum: 32768
    });
    z && (F = z.buffer);
    ua = F.byteLength;
    ta(F);
    var H,
        va = [],
        wa = [],
        xa = [],
        ya = [];

    function za() {
      var a = e.preRun.shift();
      va.unshift(a);
    }

    var I = 0,
        K = null;
    e.preloadedImages = {};
    e.preloadedAudios = {};

    function y(a) {
      if (e.onAbort) e.onAbort(a);
      v(a);
      fa = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ba(a);
      throw a;
    }

    function Ba() {
      var a = L;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var L = "avif_dec.wasm";

    if (!Ba()) {
      var Ca = L;
      L = e.locateFile ? e.locateFile(Ca, u) : u + Ca;
    }

    function Da() {
      try {
        if (w) return new Uint8Array(w);
        if (ca) return ca(L);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        y(a);
      }
    }

    function Ea() {
      return w || "function" !== typeof fetch ? Promise.resolve().then(Da) : fetch(L, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + L + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Da();
      });
    }

    function M(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(e);else {
          var c = b.T;
          "number" === typeof c ? void 0 === b.P ? H.get(c)() : H.get(c)(b.P) : c(void 0 === b.P ? null : b.P);
        }
      }
    }

    function Fa(a) {
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

    var Ga = void 0;

    function O(a) {
      for (var b = ""; A[a];) b += Ga[A[a++]];

      return b;
    }

    var P = {},
        Q = {},
        R = {};

    function Ha(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Ia(a, b) {
      a = Ha(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Ja(a) {
      var b = Error,
          c = Ia(a, function (d) {
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

    var Ka = void 0;

    function S(a) {
      throw new Ka(a);
    }

    var La = void 0;

    function Ma(a, b) {
      function c(h) {
        h = b(h);
        if (h.length !== d.length) throw new La("Mismatched type converter count");

        for (var n = 0; n < d.length; ++n) T(d[n], h[n]);
      }

      var d = [];
      d.forEach(function (h) {
        R[h] = a;
      });
      var f = Array(a.length),
          g = [],
          k = 0;
      a.forEach(function (h, n) {
        Q.hasOwnProperty(h) ? f[n] = Q[h] : (g.push(h), P.hasOwnProperty(h) || (P[h] = []), P[h].push(function () {
          f[n] = Q[h];
          ++k;
          k === g.length && c(f);
        }));
      });
      0 === g.length && c(f);
    }

    function T(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || S('type "' + d + '" must have a positive integer typeid pointer');

      if (Q.hasOwnProperty(a)) {
        if (c.U) return;
        S("Cannot register type '" + d + "' twice");
      }

      Q[a] = b;
      delete R[a];
      P.hasOwnProperty(a) && (b = P[a], delete P[a], b.forEach(function (f) {
        f();
      }));
    }

    var Na = [],
        U = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Oa(a) {
      4 < a && 0 === --U[a].R && (U[a] = void 0, Na.push(a));
    }

    function V(a) {
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
          var b = Na.length ? Na.pop() : U.length;
          U[b] = {
            R: 1,
            value: a
          };
          return b;
      }
    }

    function Ra(a) {
      return this.fromWireType(G[a >> 2]);
    }

    function Sa(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Ta(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(ra[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(sa[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Ua(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Ia(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Va(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Wa(a, b) {
      var c = e;

      if (void 0 === c[a].N) {
        var d = c[a];

        c[a] = function () {
          c[a].N.hasOwnProperty(arguments.length) || S("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].N + ")!");
          return c[a].N[arguments.length].apply(this, arguments);
        };

        c[a].N = [];
        c[a].N[d.S] = d;
      }
    }

    function Xa(a, b, c) {
      e.hasOwnProperty(a) ? ((void 0 === c || void 0 !== e[a].N && void 0 !== e[a].N[c]) && S("Cannot register public name '" + a + "' twice"), Wa(a, a), e.hasOwnProperty(c) && S("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), e[a].N[c] = b) : (e[a] = b, void 0 !== c && (e[a].W = c));
    }

    function Ya(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(E[(b >> 2) + d]);

      return c;
    }

    function Za(a, b) {
      0 <= a.indexOf("j") || y("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var f;
        -1 != a.indexOf("j") ? f = c && c.length ? e["dynCall_" + a].apply(null, [b].concat(c)) : e["dynCall_" + a].call(null, b) : f = H.get(b).apply(null, c);
        return f;
      };
    }

    function $a(a, b) {
      a = O(a);
      var c = -1 != a.indexOf("j") ? Za(a, b) : H.get(b);
      "function" !== typeof c && S("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var ab = void 0;

    function bb(a) {
      a = cb(a);
      var b = O(a);
      W(a);
      return b;
    }

    function db(a, b) {
      function c(g) {
        f[g] || Q[g] || (R[g] ? R[g].forEach(c) : (d.push(g), f[g] = !0));
      }

      var d = [],
          f = {};
      b.forEach(c);
      throw new ab(a + ": " + d.map(bb).join([", "]));
    }

    function eb(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return qa[d];
          } : function (d) {
            return A[d];
          };

        case 1:
          return c ? function (d) {
            return C[d >> 1];
          } : function (d) {
            return B[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return E[d >> 2];
          } : function (d) {
            return G[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var fb = {};

    function gb() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function hb(a, b) {
      var c = Q[a];
      void 0 === c && S(b + " has unknown type " + bb(a));
      return c;
    }

    for (var ib = {}, jb = [null, [], []], kb = Array(256), lb = 0; 256 > lb; ++lb) kb[lb] = String.fromCharCode(lb);

    Ga = kb;
    Ka = e.BindingError = Ja("BindingError");
    La = e.InternalError = Ja("InternalError");

    e.count_emval_handles = function () {
      for (var a = 0, b = 5; b < U.length; ++b) void 0 !== U[b] && ++a;

      return a;
    };

    e.get_first_emval = function () {
      for (var a = 5; a < U.length; ++a) if (void 0 !== U[a]) return U[a];

      return null;
    };

    ab = e.UnboundTypeError = Ja("UnboundTypeError");
    wa.push({
      T: function () {
        mb();
      }
    });
    var sb = {
      l: function () {},
      t: function (a, b, c, d, f) {
        var g = Fa(c);
        b = O(b);
        T(a, {
          name: b,
          fromWireType: function (k) {
            return !!k;
          },
          toWireType: function (k, h) {
            return h ? d : f;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (k) {
            if (1 === c) var h = qa;else if (2 === c) h = C;else if (4 === c) h = E;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[k >> g]);
          },
          O: null
        });
      },
      B: function (a, b) {
        b = O(b);
        T(a, {
          name: b,
          fromWireType: function (c) {
            var d = U[c].value;
            Oa(c);
            return d;
          },
          toWireType: function (c, d) {
            return V(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Ra,
          O: null
        });
      },
      s: function (a, b, c) {
        c = Fa(c);
        b = O(b);
        T(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, f) {
            if ("number" !== typeof f && "boolean" !== typeof f) throw new TypeError('Cannot convert "' + Sa(f) + '" to ' + this.name);
            return f;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ta(b, c),
          O: null
        });
      },
      v: function (a, b, c, d, f, g) {
        var k = Ya(b, c);
        a = O(a);
        f = $a(d, f);
        Xa(a, function () {
          db("Cannot call " + a + " due to unbound types", k);
        }, b - 1);
        Ma(k, function (h) {
          var n = a,
              l = a;
          h = [h[0], null].concat(h.slice(1));
          var m = f,
              q = h.length;
          2 > q && S("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var x = null !== h[1] && !1, D = !1, p = 1; p < h.length; ++p) if (null !== h[p] && void 0 === h[p].O) {
            D = !0;
            break;
          }

          var Pa = "void" !== h[0].name,
              J = "",
              N = "";

          for (p = 0; p < q - 2; ++p) J += (0 !== p ? ", " : "") + "arg" + p, N += (0 !== p ? ", " : "") + "arg" + p + "Wired";

          l = "return function " + Ha(l) + "(" + J + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + l + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          D && (l += "var destructors = [];\n");
          var Qa = D ? "destructors" : "null";
          J = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          m = [S, m, g, Va, h[0], h[1]];
          x && (l += "var thisWired = classParam.toWireType(" + Qa + ", this);\n");

          for (p = 0; p < q - 2; ++p) l += "var arg" + p + "Wired = argType" + p + ".toWireType(" + Qa + ", arg" + p + "); // " + h[p + 2].name + "\n", J.push("argType" + p), m.push(h[p + 2]);

          x && (N = "thisWired" + (0 < N.length ? ", " : "") + N);
          l += (Pa ? "var rv = " : "") + "invoker(fn" + (0 < N.length ? ", " : "") + N + ");\n";
          if (D) l += "runDestructors(destructors);\n";else for (p = x ? 1 : 2; p < h.length; ++p) q = 1 === p ? "thisWired" : "arg" + (p - 2) + "Wired", null !== h[p].O && (l += q + "_dtor(" + q + "); // " + h[p].name + "\n", J.push(q + "_dtor"), m.push(h[p].O));
          Pa && (l += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          J.push(l + "}\n");
          h = Ua(J).apply(null, m);
          p = b - 1;
          if (!e.hasOwnProperty(n)) throw new La("Replacing nonexistant public symbol");
          void 0 !== e[n].N && void 0 !== p ? e[n].N[p] = h : (e[n] = h, e[n].S = p);
          return [];
        });
      },
      f: function (a, b, c, d, f) {
        function g(l) {
          return l;
        }

        b = O(b);
        -1 === f && (f = 4294967295);
        var k = Fa(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (l) {
            return l << h >>> h;
          };
        }

        var n = -1 != b.indexOf("unsigned");
        T(a, {
          name: b,
          fromWireType: g,
          toWireType: function (l, m) {
            if ("number" !== typeof m && "boolean" !== typeof m) throw new TypeError('Cannot convert "' + Sa(m) + '" to ' + this.name);
            if (m < d || m > f) throw new TypeError('Passing a number "' + Sa(m) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + f + "]!");
            return n ? m >>> 0 : m | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: eb(b, k, 0 !== d),
          O: null
        });
      },
      e: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var k = G;
          return new f(F, k[g + 1], k[g]);
        }

        var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = O(c);
        T(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          U: !0
        });
      },
      n: function (a, b) {
        b = O(b);
        var c = "std::string" === b;
        T(a, {
          name: b,
          fromWireType: function (d) {
            var f = G[d >> 2];
            if (c) for (var g = d + 4, k = 0; k <= f; ++k) {
              var h = d + 4 + k;

              if (k == f || 0 == A[h]) {
                if (g) {
                  for (var n = g + (h - g), l = g; !(l >= n) && A[l];) ++l;

                  g = ha.decode(A.subarray(g, l));
                } else g = "";

                if (void 0 === m) var m = g;else m += String.fromCharCode(0), m += g;
                g = h + 1;
              }
            } else {
              m = Array(f);

              for (k = 0; k < f; ++k) m[k] = String.fromCharCode(A[d + 4 + k]);

              m = m.join("");
            }
            W(d);
            return m;
          },
          toWireType: function (d, f) {
            f instanceof ArrayBuffer && (f = new Uint8Array(f));
            var g = "string" === typeof f;
            g || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || S("Cannot pass non-string to std::string");
            var k = (c && g ? function () {
              for (var l = 0, m = 0; m < f.length; ++m) {
                var q = f.charCodeAt(m);
                55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | f.charCodeAt(++m) & 1023);
                127 >= q ? ++l : l = 2047 >= q ? l + 2 : 65535 >= q ? l + 3 : l + 4;
              }

              return l;
            } : function () {
              return f.length;
            })(),
                h = nb(4 + k + 1);
            G[h >> 2] = k;
            if (c && g) ia(f, h + 4, k + 1);else if (g) for (g = 0; g < k; ++g) {
              var n = f.charCodeAt(g);
              255 < n && (W(h), S("String has UTF-16 code units that do not fit in 8 bits"));
              A[h + 4 + g] = n;
            } else for (g = 0; g < k; ++g) A[h + 4 + g] = f[g];
            null !== d && d.push(W, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ra,
          O: function (d) {
            W(d);
          }
        });
      },
      m: function (a, b, c) {
        c = O(c);

        if (2 === b) {
          var d = ka;
          var f = la;
          var g = ma;

          var k = function () {
            return B;
          };

          var h = 1;
        } else 4 === b && (d = na, f = oa, g = pa, k = function () {
          return G;
        }, h = 2);

        T(a, {
          name: c,
          fromWireType: function (n) {
            for (var l = G[n >> 2], m = k(), q, x = n + 4, D = 0; D <= l; ++D) {
              var p = n + 4 + D * b;
              if (D == l || 0 == m[p >> h]) x = d(x, p - x), void 0 === q ? q = x : (q += String.fromCharCode(0), q += x), x = p + b;
            }

            W(n);
            return q;
          },
          toWireType: function (n, l) {
            "string" !== typeof l && S("Cannot pass non-string to C++ string type " + c);
            var m = g(l),
                q = nb(4 + m + b);
            G[q >> 2] = m >> h;
            f(l, q + 4, m + b);
            null !== n && n.push(W, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ra,
          O: function (n) {
            W(n);
          }
        });
      },
      u: function (a, b) {
        b = O(b);
        T(a, {
          V: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      j: Oa,
      k: function (a) {
        if (0 === a) return V(gb());
        var b = fb[a];
        a = void 0 === b ? O(a) : b;
        return V(gb()[a]);
      },
      o: function (a) {
        4 < a && (U[a].R += 1);
      },
      p: function (a, b, c, d) {
        a || S("Cannot use deleted val. handle = " + a);
        a = U[a].value;
        var f = ib[b];

        if (!f) {
          f = "";

          for (var g = 0; g < b; ++g) f += (0 !== g ? ", " : "") + "arg" + g;

          var k = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (g = 0; g < b; ++g) k += "var argType" + g + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + g + '], "parameter ' + g + '");\nvar arg' + g + " = argType" + g + ".readValueFromPointer(args);\nargs += argType" + g + "['argPackAdvance'];\n";

          f = new Function("requireRegisteredType", "Module", "__emval_register", k + ("var obj = new constructor(" + f + ");\nreturn __emval_register(obj);\n}\n"))(hb, e, V);
          ib[b] = f;
        }

        return f(a, c, d);
      },
      d: function () {
        y();
      },
      i: function (a, b) {
        X(a, b || 1);
        throw "longjmp";
      },
      z: function (a, b, c) {
        A.copyWithin(a, b, b + c);
      },
      h: function (a) {
        a >>>= 0;
        var b = A.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              z.grow(Math.min(2147483648, d) - F.byteLength + 65535 >>> 16);
              ta(z.buffer);
              var f = 1;
              break a;
            } catch (g) {}

            f = void 0;
          }

          if (f) return !0;
        }

        return !1;
      },
      A: function () {
        return 0;
      },
      w: function () {},
      r: function (a, b, c, d) {
        for (var f = 0, g = 0; g < c; g++) {
          for (var k = E[b + 8 * g >> 2], h = E[b + (8 * g + 4) >> 2], n = 0; n < h; n++) {
            var l = A[k + n],
                m = jb[a];

            if (0 === l || 10 === l) {
              for (l = 0; m[l] && !(NaN <= l);) ++l;

              l = ha.decode(m.subarray ? m.subarray(0, l) : new Uint8Array(m.slice(0, l)));
              (1 === a ? da : v)(l);
              m.length = 0;
            } else m.push(l);
          }

          f += h;
        }

        E[d >> 2] = f;
        return 0;
      },
      b: function () {
        return ea | 0;
      },
      g: ob,
      x: pb,
      q: qb,
      y: rb,
      a: z,
      c: function (a) {
        ea = a | 0;
      }
    };

    (function () {
      function a(f) {
        e.asm = f.exports;
        H = e.asm.C;
        I--;
        e.monitorRunDependencies && e.monitorRunDependencies(I);
        0 == I && K && (f = K, K = null, f());
      }

      function b(f) {
        a(f.instance);
      }

      function c(f) {
        return Ea().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(f, function (g) {
          v("failed to asynchronously prepare wasm: " + g);
          y(g);
        });
      }

      var d = {
        a: sb
      };
      I++;
      e.monitorRunDependencies && e.monitorRunDependencies(I);
      if (e.instantiateWasm) try {
        return e.instantiateWasm(d, a);
      } catch (f) {
        return v("Module.instantiateWasm callback failed with error: " + f), !1;
      }
      (function () {
        return w || "function" !== typeof WebAssembly.instantiateStreaming || Ba() || "function" !== typeof fetch ? c(b) : fetch(L, {
          credentials: "same-origin"
        }).then(function (f) {
          return WebAssembly.instantiateStreaming(f, d).then(b, function (g) {
            v("wasm streaming compile failed: " + g);
            v("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ba);
      return {};
    })();

    var mb = e.___wasm_call_ctors = function () {
      return (mb = e.___wasm_call_ctors = e.asm.D).apply(null, arguments);
    },
        nb = e._malloc = function () {
      return (nb = e._malloc = e.asm.E).apply(null, arguments);
    },
        W = e._free = function () {
      return (W = e._free = e.asm.F).apply(null, arguments);
    },
        cb = e.___getTypeName = function () {
      return (cb = e.___getTypeName = e.asm.G).apply(null, arguments);
    };

    e.___embind_register_native_and_builtin_types = function () {
      return (e.___embind_register_native_and_builtin_types = e.asm.H).apply(null, arguments);
    };

    var Y = e.stackSave = function () {
      return (Y = e.stackSave = e.asm.I).apply(null, arguments);
    },
        Z = e.stackRestore = function () {
      return (Z = e.stackRestore = e.asm.J).apply(null, arguments);
    },
        X = e._setThrew = function () {
      return (X = e._setThrew = e.asm.K).apply(null, arguments);
    };

    e.dynCall_iiijii = function () {
      return (e.dynCall_iiijii = e.asm.L).apply(null, arguments);
    };

    e.dynCall_jiji = function () {
      return (e.dynCall_jiji = e.asm.M).apply(null, arguments);
    };

    function rb(a, b, c, d, f, g, k, h) {
      var n = Y();

      try {
        H.get(a)(b, c, d, f, g, k, h);
      } catch (l) {
        Z(n);
        if (l !== l + 0 && "longjmp" !== l) throw l;
        X(1, 0);
      }
    }

    function qb(a, b, c, d, f) {
      var g = Y();

      try {
        H.get(a)(b, c, d, f);
      } catch (k) {
        Z(g);
        if (k !== k + 0 && "longjmp" !== k) throw k;
        X(1, 0);
      }
    }

    function ob(a, b, c) {
      var d = Y();

      try {
        return H.get(a)(b, c);
      } catch (f) {
        Z(d);
        if (f !== f + 0 && "longjmp" !== f) throw f;
        X(1, 0);
      }
    }

    function pb(a, b, c, d, f) {
      var g = Y();

      try {
        return H.get(a)(b, c, d, f);
      } catch (k) {
        Z(g);
        if (k !== k + 0 && "longjmp" !== k) throw k;
        X(1, 0);
      }
    }

    var tb;

    K = function ub() {
      tb || vb();
      tb || (K = ub);
    };

    function vb() {
      function a() {
        if (!tb && (tb = !0, e.calledRun = !0, !fa)) {
          M(wa);
          M(xa);
          aa(e);
          if (e.onRuntimeInitialized) e.onRuntimeInitialized();
          if (e.postRun) for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
            var b = e.postRun.shift();
            ya.unshift(b);
          }
          M(ya);
        }
      }

      if (!(0 < I)) {
        if (e.preRun) for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) za();
        M(va);
        0 < I || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            e.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    e.run = vb;
    if (e.preInit) for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) e.preInit.pop()();
    noExitRuntime = !0;
    vb();
    return avif_dec.ready;
  };
}();

var avifDecWasm = "avif_dec-409810f9.wasm";

var jxl_enc = function () {
  var _scriptDir = import.meta.url;
  return function (jxl_enc) {
    jxl_enc = jxl_enc || {};
    var f;
    f || (f = typeof jxl_enc !== 'undefined' ? jxl_enc : {});
    var aa, ba;
    f.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var t = {},
        w;

    for (w in f) f.hasOwnProperty(w) && (t[w] = f[w]);

    var ca = "./this.program",
        y = "",
        da;
    y = self.location.href;
    _scriptDir && (y = _scriptDir);
    0 !== y.indexOf("blob:") ? y = y.substr(0, y.lastIndexOf("/") + 1) : y = "";

    da = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var ea = f.print || console.log.bind(console),
        z = f.printErr || console.warn.bind(console);

    for (w in t) t.hasOwnProperty(w) && (f[w] = t[w]);

    t = null;
    f.thisProgram && (ca = f.thisProgram);
    var A;
    f.wasmBinary && (A = f.wasmBinary);
    var noExitRuntime;
    f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
    "object" !== typeof WebAssembly && C("no native wasm support detected");
    var D,
        fa = !1,
        ha = new TextDecoder("utf8");

    function ia(a, b) {
      if (!a) return "";
      b = a + b;

      for (var c = a; !(c >= b) && E[c];) ++c;

      return ha.decode(E.subarray(a, c));
    }

    function ja(a, b, c, d) {
      if (0 < d) {
        d = c + d - 1;

        for (var g = 0; g < a.length; ++g) {
          var h = a.charCodeAt(g);

          if (55296 <= h && 57343 >= h) {
            var m = a.charCodeAt(++g);
            h = 65536 + ((h & 1023) << 10) | m & 1023;
          }

          if (127 >= h) {
            if (c >= d) break;
            b[c++] = h;
          } else {
            if (2047 >= h) {
              if (c + 1 >= d) break;
              b[c++] = 192 | h >> 6;
            } else {
              if (65535 >= h) {
                if (c + 2 >= d) break;
                b[c++] = 224 | h >> 12;
              } else {
                if (c + 3 >= d) break;
                b[c++] = 240 | h >> 18;
                b[c++] = 128 | h >> 12 & 63;
              }

              b[c++] = 128 | h >> 6 & 63;
            }

            b[c++] = 128 | h & 63;
          }
        }

        b[c] = 0;
      }
    }

    function ka(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && (d = 65536 + ((d & 1023) << 10) | a.charCodeAt(++c) & 1023);
        127 >= d ? ++b : b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4;
      }

      return b;
    }

    var la = new TextDecoder("utf-16le");

    function ma(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && F[c];) ++c;

      return la.decode(E.subarray(a, c << 1));
    }

    function na(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var g = 0; g < c; ++g) G[b >> 1] = a.charCodeAt(g), b += 2;

      G[b >> 1] = 0;
      return b - d;
    }

    function oa(a) {
      return 2 * a.length;
    }

    function pa(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var g = H[a + 4 * c >> 2];
        if (0 == g) break;
        ++c;
        65536 <= g ? (g -= 65536, d += String.fromCharCode(55296 | g >> 10, 56320 | g & 1023)) : d += String.fromCharCode(g);
      }

      return d;
    }

    function qa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var g = 0; g < a.length; ++g) {
        var h = a.charCodeAt(g);

        if (55296 <= h && 57343 >= h) {
          var m = a.charCodeAt(++g);
          h = 65536 + ((h & 1023) << 10) | m & 1023;
        }

        H[b >> 2] = h;
        b += 4;
        if (b + 4 > c) break;
      }

      H[b >> 2] = 0;
      return b - d;
    }

    function ra(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var I, J, E, G, F, H, K, sa, ta;

    function ua(a) {
      I = a;
      f.HEAP8 = J = new Int8Array(a);
      f.HEAP16 = G = new Int16Array(a);
      f.HEAP32 = H = new Int32Array(a);
      f.HEAPU8 = E = new Uint8Array(a);
      f.HEAPU16 = F = new Uint16Array(a);
      f.HEAPU32 = K = new Uint32Array(a);
      f.HEAPF32 = sa = new Float32Array(a);
      f.HEAPF64 = ta = new Float64Array(a);
    }

    var va = f.INITIAL_MEMORY || 16777216;
    f.wasmMemory ? D = f.wasmMemory : D = new WebAssembly.Memory({
      initial: va / 65536,
      maximum: 32768
    });
    D && (I = D.buffer);
    va = I.byteLength;
    ua(I);
    var L,
        wa = [],
        xa = [],
        ya = [],
        za = [];

    function Aa() {
      var a = f.preRun.shift();
      wa.unshift(a);
    }

    var M = 0,
        N = null;
    f.preloadedImages = {};
    f.preloadedAudios = {};

    function C(a) {
      if (f.onAbort) f.onAbort(a);
      z(a);
      fa = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ba(a);
      throw a;
    }

    function Ca() {
      var a = O;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var O = "jxl_enc.wasm";

    if (!Ca()) {
      var Da = O;
      O = f.locateFile ? f.locateFile(Da, y) : y + Da;
    }

    function Ea() {
      try {
        if (A) return new Uint8Array(A);
        if (da) return da(O);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        C(a);
      }
    }

    function Fa() {
      return A || "function" !== typeof fetch ? Promise.resolve().then(Ea) : fetch(O, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + O + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Ea();
      });
    }

    function P(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(f);else {
          var c = b.fa;
          "number" === typeof c ? void 0 === b.$ ? L.get(c)() : L.get(c)(b.$) : c(void 0 === b.$ ? null : b.$);
        }
      }
    }

    function Ga(a) {
      this.V = a - 16;

      this.ra = function (b) {
        H[this.V + 8 >> 2] = b;
      };

      this.oa = function (b) {
        H[this.V + 0 >> 2] = b;
      };

      this.pa = function () {
        H[this.V + 4 >> 2] = 0;
      };

      this.na = function () {
        J[this.V + 12 >> 0] = 0;
      };

      this.qa = function () {
        J[this.V + 13 >> 0] = 0;
      };

      this.ka = function (b, c) {
        this.ra(b);
        this.oa(c);
        this.pa();
        this.na();
        this.qa();
      };
    }

    var Ha = {};

    function Ia(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Ja(a) {
      return this.fromWireType(K[a >> 2]);
    }

    var R = {},
        S = {},
        Ka = {};

    function La(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Ma(a, b) {
      a = La(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Na(a) {
      var b = Error,
          c = Ma(a, function (d) {
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

    var Oa = void 0;

    function Pa(a, b, c) {
      function d(k) {
        k = c(k);
        if (k.length !== a.length) throw new Oa("Mismatched type converter count");

        for (var n = 0; n < a.length; ++n) T(a[n], k[n]);
      }

      a.forEach(function (k) {
        Ka[k] = b;
      });
      var g = Array(b.length),
          h = [],
          m = 0;
      b.forEach(function (k, n) {
        S.hasOwnProperty(k) ? g[n] = S[k] : (h.push(k), R.hasOwnProperty(k) || (R[k] = []), R[k].push(function () {
          g[n] = S[k];
          ++m;
          m === h.length && d(g);
        }));
      });
      0 === h.length && d(g);
    }

    function Qa(a) {
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

    var Ra = void 0;

    function U(a) {
      for (var b = ""; E[a];) b += Ra[E[a++]];

      return b;
    }

    var Sa = void 0;

    function V(a) {
      throw new Sa(a);
    }

    function T(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || V('type "' + d + '" must have a positive integer typeid pointer');

      if (S.hasOwnProperty(a)) {
        if (c.ja) return;
        V("Cannot register type '" + d + "' twice");
      }

      S[a] = b;
      delete Ka[a];
      R.hasOwnProperty(a) && (b = R[a], delete R[a], b.forEach(function (g) {
        g();
      }));
    }

    var Ta = [],
        X = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Ua(a) {
      4 < a && 0 === --X[a].aa && (X[a] = void 0, Ta.push(a));
    }

    function Va(a) {
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
          var b = Ta.length ? Ta.pop() : X.length;
          X[b] = {
            aa: 1,
            value: a
          };
          return b;
      }
    }

    function Wa(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Xa(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(sa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(ta[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Ya(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Ma(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Za(a, b) {
      var c = f;

      if (void 0 === c[a].S) {
        var d = c[a];

        c[a] = function () {
          c[a].S.hasOwnProperty(arguments.length) || V("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].S + ")!");
          return c[a].S[arguments.length].apply(this, arguments);
        };

        c[a].S = [];
        c[a].S[d.da] = d;
      }
    }

    function $a(a, b, c) {
      f.hasOwnProperty(a) ? ((void 0 === c || void 0 !== f[a].S && void 0 !== f[a].S[c]) && V("Cannot register public name '" + a + "' twice"), Za(a, a), f.hasOwnProperty(c) && V("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), f[a].S[c] = b) : (f[a] = b, void 0 !== c && (f[a].Aa = c));
    }

    function ab(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(H[(b >> 2) + d]);

      return c;
    }

    function bb(a, b) {
      0 <= a.indexOf("j") || C("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var g;
        -1 != a.indexOf("j") ? g = c && c.length ? f["dynCall_" + a].apply(null, [b].concat(c)) : f["dynCall_" + a].call(null, b) : g = L.get(b).apply(null, c);
        return g;
      };
    }

    function Y(a, b) {
      a = U(a);
      var c = -1 != a.indexOf("j") ? bb(a, b) : L.get(b);
      "function" !== typeof c && V("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var cb = void 0;

    function db(a) {
      a = eb(a);
      var b = U(a);
      Z(a);
      return b;
    }

    function fb(a, b) {
      function c(h) {
        g[h] || S[h] || (Ka[h] ? Ka[h].forEach(c) : (d.push(h), g[h] = !0));
      }

      var d = [],
          g = {};
      b.forEach(c);
      throw new cb(a + ": " + d.map(db).join([", "]));
    }

    function gb(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return J[d];
          } : function (d) {
            return E[d];
          };

        case 1:
          return c ? function (d) {
            return G[d >> 1];
          } : function (d) {
            return F[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return H[d >> 2];
          } : function (d) {
            return K[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var hb = {};

    function ib() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function jb(a, b) {
      var c = S[a];
      void 0 === c && V(b + " has unknown type " + db(a));
      return c;
    }

    var kb = {},
        lb = {};

    function mb() {
      if (!nb) {
        var a = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
          _: ca || "./this.program"
        },
            b;

        for (b in lb) a[b] = lb[b];

        var c = [];

        for (b in a) c.push(b + "=" + a[b]);

        nb = c;
      }

      return nb;
    }

    var nb,
        ob = [null, [], []];

    function pb(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }

    function qb(a, b) {
      for (var c = 0, d = 0; d <= b; c += a[d++]);

      return c;
    }

    var rb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        sb = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function tb(a, b) {
      for (a = new Date(a.getTime()); 0 < b;) {
        var c = a.getMonth(),
            d = (pb(a.getFullYear()) ? rb : sb)[c];
        if (b > d - a.getDate()) b -= d - a.getDate() + 1, a.setDate(1), 11 > c ? a.setMonth(c + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));else {
          a.setDate(a.getDate() + b);
          break;
        }
      }

      return a;
    }

    function ub(a, b, c, d) {
      function g(e, l, u) {
        for (e = "number" === typeof e ? e.toString() : e || ""; e.length < l;) e = u[0] + e;

        return e;
      }

      function h(e, l) {
        return g(e, l, "0");
      }

      function m(e, l) {
        function u(B) {
          return 0 > B ? -1 : 0 < B ? 1 : 0;
        }

        var v;
        0 === (v = u(e.getFullYear() - l.getFullYear())) && 0 === (v = u(e.getMonth() - l.getMonth())) && (v = u(e.getDate() - l.getDate()));
        return v;
      }

      function k(e) {
        switch (e.getDay()) {
          case 0:
            return new Date(e.getFullYear() - 1, 11, 29);

          case 1:
            return e;

          case 2:
            return new Date(e.getFullYear(), 0, 3);

          case 3:
            return new Date(e.getFullYear(), 0, 2);

          case 4:
            return new Date(e.getFullYear(), 0, 1);

          case 5:
            return new Date(e.getFullYear() - 1, 11, 31);

          case 6:
            return new Date(e.getFullYear() - 1, 11, 30);
        }
      }

      function n(e) {
        e = tb(new Date(e.R + 1900, 0, 1), e.Z);
        var l = new Date(e.getFullYear() + 1, 0, 4),
            u = k(new Date(e.getFullYear(), 0, 4));
        l = k(l);
        return 0 >= m(u, e) ? 0 >= m(l, e) ? e.getFullYear() + 1 : e.getFullYear() : e.getFullYear() - 1;
      }

      var p = H[d + 40 >> 2];
      d = {
        xa: H[d >> 2],
        wa: H[d + 4 >> 2],
        X: H[d + 8 >> 2],
        W: H[d + 12 >> 2],
        U: H[d + 16 >> 2],
        R: H[d + 20 >> 2],
        Y: H[d + 24 >> 2],
        Z: H[d + 28 >> 2],
        Ba: H[d + 32 >> 2],
        va: H[d + 36 >> 2],
        ya: p ? ia(p) : ""
      };
      c = ia(c);
      p = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y"
      };

      for (var q in p) c = c.replace(new RegExp(q, "g"), p[q]);

      var r = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
          x = "January February March April May June July August September October November December".split(" ");
      p = {
        "%a": function (e) {
          return r[e.Y].substring(0, 3);
        },
        "%A": function (e) {
          return r[e.Y];
        },
        "%b": function (e) {
          return x[e.U].substring(0, 3);
        },
        "%B": function (e) {
          return x[e.U];
        },
        "%C": function (e) {
          return h((e.R + 1900) / 100 | 0, 2);
        },
        "%d": function (e) {
          return h(e.W, 2);
        },
        "%e": function (e) {
          return g(e.W, 2, " ");
        },
        "%g": function (e) {
          return n(e).toString().substring(2);
        },
        "%G": function (e) {
          return n(e);
        },
        "%H": function (e) {
          return h(e.X, 2);
        },
        "%I": function (e) {
          e = e.X;
          0 == e ? e = 12 : 12 < e && (e -= 12);
          return h(e, 2);
        },
        "%j": function (e) {
          return h(e.W + qb(pb(e.R + 1900) ? rb : sb, e.U - 1), 3);
        },
        "%m": function (e) {
          return h(e.U + 1, 2);
        },
        "%M": function (e) {
          return h(e.wa, 2);
        },
        "%n": function () {
          return "\n";
        },
        "%p": function (e) {
          return 0 <= e.X && 12 > e.X ? "AM" : "PM";
        },
        "%S": function (e) {
          return h(e.xa, 2);
        },
        "%t": function () {
          return "\t";
        },
        "%u": function (e) {
          return e.Y || 7;
        },
        "%U": function (e) {
          var l = new Date(e.R + 1900, 0, 1),
              u = 0 === l.getDay() ? l : tb(l, 7 - l.getDay());
          e = new Date(e.R + 1900, e.U, e.W);
          return 0 > m(u, e) ? h(Math.ceil((31 - u.getDate() + (qb(pb(e.getFullYear()) ? rb : sb, e.getMonth() - 1) - 31) + e.getDate()) / 7), 2) : 0 === m(u, l) ? "01" : "00";
        },
        "%V": function (e) {
          var l = new Date(e.R + 1901, 0, 4),
              u = k(new Date(e.R + 1900, 0, 4));
          l = k(l);
          var v = tb(new Date(e.R + 1900, 0, 1), e.Z);
          return 0 > m(v, u) ? "53" : 0 >= m(l, v) ? "01" : h(Math.ceil((u.getFullYear() < e.R + 1900 ? e.Z + 32 - u.getDate() : e.Z + 1 - u.getDate()) / 7), 2);
        },
        "%w": function (e) {
          return e.Y;
        },
        "%W": function (e) {
          var l = new Date(e.R, 0, 1),
              u = 1 === l.getDay() ? l : tb(l, 0 === l.getDay() ? 1 : 7 - l.getDay() + 1);
          e = new Date(e.R + 1900, e.U, e.W);
          return 0 > m(u, e) ? h(Math.ceil((31 - u.getDate() + (qb(pb(e.getFullYear()) ? rb : sb, e.getMonth() - 1) - 31) + e.getDate()) / 7), 2) : 0 === m(u, l) ? "01" : "00";
        },
        "%y": function (e) {
          return (e.R + 1900).toString().substring(2);
        },
        "%Y": function (e) {
          return e.R + 1900;
        },
        "%z": function (e) {
          e = e.va;
          var l = 0 <= e;
          e = Math.abs(e) / 60;
          return (l ? "+" : "-") + String("0000" + (e / 60 * 100 + e % 60)).slice(-4);
        },
        "%Z": function (e) {
          return e.ya;
        },
        "%%": function () {
          return "%";
        }
      };

      for (q in p) 0 <= c.indexOf(q) && (c = c.replace(new RegExp(q, "g"), p[q](d)));

      q = vb(c);
      if (q.length > b) return 0;
      J.set(q, a);
      return q.length - 1;
    }

    Oa = f.InternalError = Na("InternalError");

    for (var wb = Array(256), xb = 0; 256 > xb; ++xb) wb[xb] = String.fromCharCode(xb);

    Ra = wb;
    Sa = f.BindingError = Na("BindingError");

    f.count_emval_handles = function () {
      for (var a = 0, b = 5; b < X.length; ++b) void 0 !== X[b] && ++a;

      return a;
    };

    f.get_first_emval = function () {
      for (var a = 5; a < X.length; ++a) if (void 0 !== X[a]) return X[a];

      return null;
    };

    cb = f.UnboundTypeError = Na("UnboundTypeError");

    function vb(a) {
      var b = Array(ka(a) + 1);
      ja(a, b, 0, b.length);
      return b;
    }

    xa.push({
      fa: function () {
        yb();
      }
    });
    var Ab = {
      q: function (a) {
        return zb(a + 16) + 16;
      },
      D: function () {},
      p: function (a, b, c) {
        new Ga(a).ka(b, c);
        throw a;
      },
      m: function (a) {
        var b = Ha[a];
        delete Ha[a];
        var c = b.la,
            d = b.ma,
            g = b.ba,
            h = g.map(function (m) {
          return m.ia;
        }).concat(g.map(function (m) {
          return m.ta;
        }));
        Pa([a], h, function (m) {
          var k = {};
          g.forEach(function (n, p) {
            var q = m[p],
                r = n.ga,
                x = n.ha,
                e = m[p + g.length],
                l = n.sa,
                u = n.ua;
            k[n.ea] = {
              read: function (v) {
                return q.fromWireType(r(x, v));
              },
              write: function (v, B) {
                var W = [];
                l(u, v, e.toWireType(W, B));
                Ia(W);
              }
            };
          });
          return [{
            name: b.name,
            fromWireType: function (n) {
              var p = {},
                  q;

              for (q in k) p[q] = k[q].read(n);

              d(n);
              return p;
            },
            toWireType: function (n, p) {
              for (var q in k) if (!(q in p)) throw new TypeError('Missing field:  "' + q + '"');

              var r = c();

              for (q in k) k[q].write(r, p[q]);

              null !== n && n.push(d, r);
              return r;
            },
            argPackAdvance: 8,
            readValueFromPointer: Ja,
            T: d
          }];
        });
      },
      z: function (a, b, c, d, g) {
        var h = Qa(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (m) {
            return !!m;
          },
          toWireType: function (m, k) {
            return k ? d : g;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (m) {
            if (1 === c) var k = J;else if (2 === c) k = G;else if (4 === c) k = H;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(k[m >> h]);
          },
          T: null
        });
      },
      y: function (a, b) {
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (c) {
            var d = X[c].value;
            Ua(c);
            return d;
          },
          toWireType: function (c, d) {
            return Va(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Ja,
          T: null
        });
      },
      j: function (a, b, c) {
        c = Qa(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, g) {
            if ("number" !== typeof g && "boolean" !== typeof g) throw new TypeError('Cannot convert "' + Wa(g) + '" to ' + this.name);
            return g;
          },
          argPackAdvance: 8,
          readValueFromPointer: Xa(b, c),
          T: null
        });
      },
      l: function (a, b, c, d, g, h) {
        var m = ab(b, c);
        a = U(a);
        g = Y(d, g);
        $a(a, function () {
          fb("Cannot call " + a + " due to unbound types", m);
        }, b - 1);
        Pa([], m, function (k) {
          var n = a,
              p = a;
          k = [k[0], null].concat(k.slice(1));
          var q = g,
              r = k.length;
          2 > r && V("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var x = null !== k[1] && !1, e = !1, l = 1; l < k.length; ++l) if (null !== k[l] && void 0 === k[l].T) {
            e = !0;
            break;
          }

          var u = "void" !== k[0].name,
              v = "",
              B = "";

          for (l = 0; l < r - 2; ++l) v += (0 !== l ? ", " : "") + "arg" + l, B += (0 !== l ? ", " : "") + "arg" + l + "Wired";

          p = "return function " + La(p) + "(" + v + ") {\nif (arguments.length !== " + (r - 2) + ") {\nthrowBindingError('function " + p + " called with ' + arguments.length + ' arguments, expected " + (r - 2) + " args!');\n}\n";
          e && (p += "var destructors = [];\n");
          var W = e ? "destructors" : "null";
          v = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          q = [V, q, h, Ia, k[0], k[1]];
          x && (p += "var thisWired = classParam.toWireType(" + W + ", this);\n");

          for (l = 0; l < r - 2; ++l) p += "var arg" + l + "Wired = argType" + l + ".toWireType(" + W + ", arg" + l + "); // " + k[l + 2].name + "\n", v.push("argType" + l), q.push(k[l + 2]);

          x && (B = "thisWired" + (0 < B.length ? ", " : "") + B);
          p += (u ? "var rv = " : "") + "invoker(fn" + (0 < B.length ? ", " : "") + B + ");\n";
          if (e) p += "runDestructors(destructors);\n";else for (l = x ? 1 : 2; l < k.length; ++l) r = 1 === l ? "thisWired" : "arg" + (l - 2) + "Wired", null !== k[l].T && (p += r + "_dtor(" + r + "); // " + k[l].name + "\n", v.push(r + "_dtor"), q.push(k[l].T));
          u && (p += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          v.push(p + "}\n");
          k = Ya(v).apply(null, q);
          l = b - 1;
          if (!f.hasOwnProperty(n)) throw new Oa("Replacing nonexistant public symbol");
          void 0 !== f[n].S && void 0 !== l ? f[n].S[l] = k : (f[n] = k, f[n].da = l);
          return [];
        });
      },
      d: function (a, b, c, d, g) {
        function h(p) {
          return p;
        }

        b = U(b);
        -1 === g && (g = 4294967295);
        var m = Qa(c);

        if (0 === d) {
          var k = 32 - 8 * c;

          h = function (p) {
            return p << k >>> k;
          };
        }

        var n = -1 != b.indexOf("unsigned");
        T(a, {
          name: b,
          fromWireType: h,
          toWireType: function (p, q) {
            if ("number" !== typeof q && "boolean" !== typeof q) throw new TypeError('Cannot convert "' + Wa(q) + '" to ' + this.name);
            if (q < d || q > g) throw new TypeError('Passing a number "' + Wa(q) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + g + "]!");
            return n ? q >>> 0 : q | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: gb(b, m, 0 !== d),
          T: null
        });
      },
      c: function (a, b, c) {
        function d(h) {
          h >>= 2;
          var m = K;
          return new g(I, m[h + 1], m[h]);
        }

        var g = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = U(c);
        T(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          ja: !0
        });
      },
      k: function (a, b) {
        b = U(b);
        var c = "std::string" === b;
        T(a, {
          name: b,
          fromWireType: function (d) {
            var g = K[d >> 2];
            if (c) for (var h = d + 4, m = 0; m <= g; ++m) {
              var k = d + 4 + m;

              if (m == g || 0 == E[k]) {
                h = ia(h, k - h);
                if (void 0 === n) var n = h;else n += String.fromCharCode(0), n += h;
                h = k + 1;
              }
            } else {
              n = Array(g);

              for (m = 0; m < g; ++m) n[m] = String.fromCharCode(E[d + 4 + m]);

              n = n.join("");
            }
            Z(d);
            return n;
          },
          toWireType: function (d, g) {
            g instanceof ArrayBuffer && (g = new Uint8Array(g));
            var h = "string" === typeof g;
            h || g instanceof Uint8Array || g instanceof Uint8ClampedArray || g instanceof Int8Array || V("Cannot pass non-string to std::string");
            var m = (c && h ? function () {
              return ka(g);
            } : function () {
              return g.length;
            })(),
                k = zb(4 + m + 1);
            K[k >> 2] = m;
            if (c && h) ja(g, E, k + 4, m + 1);else if (h) for (h = 0; h < m; ++h) {
              var n = g.charCodeAt(h);
              255 < n && (Z(k), V("String has UTF-16 code units that do not fit in 8 bits"));
              E[k + 4 + h] = n;
            } else for (h = 0; h < m; ++h) E[k + 4 + h] = g[h];
            null !== d && d.push(Z, k);
            return k;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ja,
          T: function (d) {
            Z(d);
          }
        });
      },
      h: function (a, b, c) {
        c = U(c);

        if (2 === b) {
          var d = ma;
          var g = na;
          var h = oa;

          var m = function () {
            return F;
          };

          var k = 1;
        } else 4 === b && (d = pa, g = qa, h = ra, m = function () {
          return K;
        }, k = 2);

        T(a, {
          name: c,
          fromWireType: function (n) {
            for (var p = K[n >> 2], q = m(), r, x = n + 4, e = 0; e <= p; ++e) {
              var l = n + 4 + e * b;
              if (e == p || 0 == q[l >> k]) x = d(x, l - x), void 0 === r ? r = x : (r += String.fromCharCode(0), r += x), x = l + b;
            }

            Z(n);
            return r;
          },
          toWireType: function (n, p) {
            "string" !== typeof p && V("Cannot pass non-string to C++ string type " + c);
            var q = h(p),
                r = zb(4 + q + b);
            K[r >> 2] = q >> k;
            g(p, r + 4, q + b);
            null !== n && n.push(Z, r);
            return r;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ja,
          T: function (n) {
            Z(n);
          }
        });
      },
      n: function (a, b, c, d, g, h) {
        Ha[a] = {
          name: U(b),
          la: Y(c, d),
          ma: Y(g, h),
          ba: []
        };
      },
      f: function (a, b, c, d, g, h, m, k, n, p) {
        Ha[a].ba.push({
          ea: U(b),
          ia: c,
          ga: Y(d, g),
          ha: h,
          ta: m,
          sa: Y(k, n),
          ua: p
        });
      },
      A: function (a, b) {
        b = U(b);
        T(a, {
          za: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      g: Ua,
      C: function (a) {
        if (0 === a) return Va(ib());
        var b = hb[a];
        a = void 0 === b ? U(a) : b;
        return Va(ib()[a]);
      },
      B: function (a) {
        4 < a && (X[a].aa += 1);
      },
      o: function (a, b, c, d) {
        a || V("Cannot use deleted val. handle = " + a);
        a = X[a].value;
        var g = kb[b];

        if (!g) {
          g = "";

          for (var h = 0; h < b; ++h) g += (0 !== h ? ", " : "") + "arg" + h;

          var m = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (h = 0; h < b; ++h) m += "var argType" + h + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + h + '], "parameter ' + h + '");\nvar arg' + h + " = argType" + h + ".readValueFromPointer(args);\nargs += argType" + h + "['argPackAdvance'];\n";

          g = new Function("requireRegisteredType", "Module", "__emval_register", m + ("var obj = new constructor(" + g + ");\nreturn __emval_register(obj);\n}\n"))(jb, f, Va);
          kb[b] = g;
        }

        return g(a, c, d);
      },
      b: function () {
        C();
      },
      t: function (a, b, c) {
        E.copyWithin(a, b, b + c);
      },
      e: function (a) {
        a >>>= 0;
        var b = E.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              D.grow(Math.min(2147483648, d) - I.byteLength + 65535 >>> 16);
              ua(D.buffer);
              var g = 1;
              break a;
            } catch (h) {}

            g = void 0;
          }

          if (g) return !0;
        }

        return !1;
      },
      v: function (a, b) {
        var c = 0;
        mb().forEach(function (d, g) {
          var h = b + c;
          g = H[a + 4 * g >> 2] = h;

          for (h = 0; h < d.length; ++h) J[g++ >> 0] = d.charCodeAt(h);

          J[g >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      w: function (a, b) {
        var c = mb();
        H[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (g) {
          d += g.length + 1;
        });
        H[b >> 2] = d;
        return 0;
      },
      x: function () {
        return 0;
      },
      r: function () {},
      i: function (a, b, c, d) {
        for (var g = 0, h = 0; h < c; h++) {
          for (var m = H[b + 8 * h >> 2], k = H[b + (8 * h + 4) >> 2], n = 0; n < k; n++) {
            var p = E[m + n],
                q = ob[a];

            if (0 === p || 10 === p) {
              for (p = 0; q[p] && !(NaN <= p);) ++p;

              p = ha.decode(q.subarray ? q.subarray(0, p) : new Uint8Array(q.slice(0, p)));
              (1 === a ? ea : z)(p);
              q.length = 0;
            } else q.push(p);
          }

          g += k;
        }

        H[d >> 2] = g;
        return 0;
      },
      a: D,
      s: function () {},
      u: function (a, b, c, d) {
        return ub(a, b, c, d);
      }
    };

    (function () {
      function a(g) {
        f.asm = g.exports;
        L = f.asm.E;
        M--;
        f.monitorRunDependencies && f.monitorRunDependencies(M);
        0 == M && N && (g = N, N = null, g());
      }

      function b(g) {
        a(g.instance);
      }

      function c(g) {
        return Fa().then(function (h) {
          return WebAssembly.instantiate(h, d);
        }).then(g, function (h) {
          z("failed to asynchronously prepare wasm: " + h);
          C(h);
        });
      }

      var d = {
        a: Ab
      };
      M++;
      f.monitorRunDependencies && f.monitorRunDependencies(M);
      if (f.instantiateWasm) try {
        return f.instantiateWasm(d, a);
      } catch (g) {
        return z("Module.instantiateWasm callback failed with error: " + g), !1;
      }
      (function () {
        return A || "function" !== typeof WebAssembly.instantiateStreaming || Ca() || "function" !== typeof fetch ? c(b) : fetch(O, {
          credentials: "same-origin"
        }).then(function (g) {
          return WebAssembly.instantiateStreaming(g, d).then(b, function (h) {
            z("wasm streaming compile failed: " + h);
            z("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ba);
      return {};
    })();

    var yb = f.___wasm_call_ctors = function () {
      return (yb = f.___wasm_call_ctors = f.asm.F).apply(null, arguments);
    },
        zb = f._malloc = function () {
      return (zb = f._malloc = f.asm.G).apply(null, arguments);
    },
        Z = f._free = function () {
      return (Z = f._free = f.asm.H).apply(null, arguments);
    },
        eb = f.___getTypeName = function () {
      return (eb = f.___getTypeName = f.asm.I).apply(null, arguments);
    };

    f.___embind_register_native_and_builtin_types = function () {
      return (f.___embind_register_native_and_builtin_types = f.asm.J).apply(null, arguments);
    };

    f.dynCall_viijii = function () {
      return (f.dynCall_viijii = f.asm.K).apply(null, arguments);
    };

    f.dynCall_iiji = function () {
      return (f.dynCall_iiji = f.asm.L).apply(null, arguments);
    };

    f.dynCall_jiji = function () {
      return (f.dynCall_jiji = f.asm.M).apply(null, arguments);
    };

    f.dynCall_iiiiiijj = function () {
      return (f.dynCall_iiiiiijj = f.asm.N).apply(null, arguments);
    };

    f.dynCall_iiiiij = function () {
      return (f.dynCall_iiiiij = f.asm.O).apply(null, arguments);
    };

    f.dynCall_iiiiijj = function () {
      return (f.dynCall_iiiiijj = f.asm.P).apply(null, arguments);
    };

    var Bb;

    N = function Cb() {
      Bb || Db();
      Bb || (N = Cb);
    };

    function Db() {
      function a() {
        if (!Bb && (Bb = !0, f.calledRun = !0, !fa)) {
          P(xa);
          P(ya);
          aa(f);
          if (f.onRuntimeInitialized) f.onRuntimeInitialized();
          if (f.postRun) for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length;) {
            var b = f.postRun.shift();
            za.unshift(b);
          }
          P(za);
        }
      }

      if (!(0 < M)) {
        if (f.preRun) for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length;) Aa();
        P(wa);
        0 < M || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            f.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    f.run = Db;
    if (f.preInit) for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length;) f.preInit.pop()();
    noExitRuntime = !0;
    Db();
    return jxl_enc.ready;
  };
}();

var jxlEncWasm = "jxl_enc-c938301f.wasm";

var jxl_dec = function () {
  var _scriptDir = import.meta.url;
  return function (jxl_dec) {
    jxl_dec = jxl_dec || {};
    var e;
    e || (e = typeof jxl_dec !== 'undefined' ? jxl_dec : {});
    var aa, ba;
    e.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
        t;

    for (t in e) e.hasOwnProperty(t) && (r[t] = e[t]);

    var ca = "./this.program",
        u = "",
        da;
    u = self.location.href;
    _scriptDir && (u = _scriptDir);
    0 !== u.indexOf("blob:") ? u = u.substr(0, u.lastIndexOf("/") + 1) : u = "";

    da = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var ea = e.print || console.log.bind(console),
        v = e.printErr || console.warn.bind(console);

    for (t in r) r.hasOwnProperty(t) && (e[t] = r[t]);

    r = null;
    e.thisProgram && (ca = e.thisProgram);
    var w;
    e.wasmBinary && (w = e.wasmBinary);
    var noExitRuntime;
    e.noExitRuntime && (noExitRuntime = e.noExitRuntime);
    "object" !== typeof WebAssembly && y("no native wasm support detected");
    var z,
        fa = !1,
        ha = new TextDecoder("utf8");

    function ia(a, b, c) {
      var d = A;

      if (0 < c) {
        c = b + c - 1;

        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);

          if (55296 <= g && 57343 >= g) {
            var l = a.charCodeAt(++f);
            g = 65536 + ((g & 1023) << 10) | l & 1023;
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

    var ja = new TextDecoder("utf-16le");

    function ka(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && B[c];) ++c;

      return ja.decode(A.subarray(a, c << 1));
    }

    function la(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var f = 0; f < c; ++f) D[b >> 1] = a.charCodeAt(f), b += 2;

      D[b >> 1] = 0;
      return b - d;
    }

    function ma(a) {
      return 2 * a.length;
    }

    function na(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var f = E[a + 4 * c >> 2];
        if (0 == f) break;
        ++c;
        65536 <= f ? (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : d += String.fromCharCode(f);
      }

      return d;
    }

    function oa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);

        if (55296 <= g && 57343 >= g) {
          var l = a.charCodeAt(++f);
          g = 65536 + ((g & 1023) << 10) | l & 1023;
        }

        E[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }

      E[b >> 2] = 0;
      return b - d;
    }

    function pa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var F, G, A, D, B, E, H, qa, ra;

    function sa(a) {
      F = a;
      e.HEAP8 = G = new Int8Array(a);
      e.HEAP16 = D = new Int16Array(a);
      e.HEAP32 = E = new Int32Array(a);
      e.HEAPU8 = A = new Uint8Array(a);
      e.HEAPU16 = B = new Uint16Array(a);
      e.HEAPU32 = H = new Uint32Array(a);
      e.HEAPF32 = qa = new Float32Array(a);
      e.HEAPF64 = ra = new Float64Array(a);
    }

    var ta = e.INITIAL_MEMORY || 16777216;
    e.wasmMemory ? z = e.wasmMemory : z = new WebAssembly.Memory({
      initial: ta / 65536,
      maximum: 32768
    });
    z && (F = z.buffer);
    ta = F.byteLength;
    sa(F);
    var J,
        ua = [],
        va = [],
        wa = [],
        xa = [];

    function ya() {
      var a = e.preRun.shift();
      ua.unshift(a);
    }

    var K = 0,
        L = null;
    e.preloadedImages = {};
    e.preloadedAudios = {};

    function y(a) {
      if (e.onAbort) e.onAbort(a);
      v(a);
      fa = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ba(a);
      throw a;
    }

    function Aa() {
      var a = N;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var N = "jxl_dec.wasm";

    if (!Aa()) {
      var Ba = N;
      N = e.locateFile ? e.locateFile(Ba, u) : u + Ba;
    }

    function Ca() {
      try {
        if (w) return new Uint8Array(w);
        if (da) return da(N);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        y(a);
      }
    }

    function Da() {
      return w || "function" !== typeof fetch ? Promise.resolve().then(Ca) : fetch(N, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + N + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Ca();
      });
    }

    function O(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(e);else {
          var c = b.L;
          "number" === typeof c ? void 0 === b.I ? J.get(c)() : J.get(c)(b.I) : c(void 0 === b.I ? null : b.I);
        }
      }
    }

    function Ea(a) {
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

    var Fa = void 0;

    function P(a) {
      for (var b = ""; A[a];) b += Fa[A[a++]];

      return b;
    }

    var Q = {},
        R = {},
        S = {};

    function Ga(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Ha(a, b) {
      a = Ga(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Ia(a) {
      var b = Error,
          c = Ha(a, function (d) {
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

    var Ja = void 0;

    function T(a) {
      throw new Ja(a);
    }

    var Ka = void 0;

    function La(a, b) {
      function c(h) {
        h = b(h);
        if (h.length !== d.length) throw new Ka("Mismatched type converter count");

        for (var p = 0; p < d.length; ++p) U(d[p], h[p]);
      }

      var d = [];
      d.forEach(function (h) {
        S[h] = a;
      });
      var f = Array(a.length),
          g = [],
          l = 0;
      a.forEach(function (h, p) {
        R.hasOwnProperty(h) ? f[p] = R[h] : (g.push(h), Q.hasOwnProperty(h) || (Q[h] = []), Q[h].push(function () {
          f[p] = R[h];
          ++l;
          l === g.length && c(f);
        }));
      });
      0 === g.length && c(f);
    }

    function U(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || T('type "' + d + '" must have a positive integer typeid pointer');

      if (R.hasOwnProperty(a)) {
        if (c.M) return;
        T("Cannot register type '" + d + "' twice");
      }

      R[a] = b;
      delete S[a];
      Q.hasOwnProperty(a) && (b = Q[a], delete Q[a], b.forEach(function (f) {
        f();
      }));
    }

    var Ma = [],
        V = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Na(a) {
      4 < a && 0 === --V[a].J && (V[a] = void 0, Ma.push(a));
    }

    function W(a) {
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
          var b = Ma.length ? Ma.pop() : V.length;
          V[b] = {
            J: 1,
            value: a
          };
          return b;
      }
    }

    function Oa(a) {
      return this.fromWireType(H[a >> 2]);
    }

    function Ra(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Sa(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(qa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(ra[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Ta(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Ha(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Ua(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Va(a, b) {
      var c = e;

      if (void 0 === c[a].G) {
        var d = c[a];

        c[a] = function () {
          c[a].G.hasOwnProperty(arguments.length) || T("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].G + ")!");
          return c[a].G[arguments.length].apply(this, arguments);
        };

        c[a].G = [];
        c[a].G[d.K] = d;
      }
    }

    function Wa(a, b, c) {
      e.hasOwnProperty(a) ? ((void 0 === c || void 0 !== e[a].G && void 0 !== e[a].G[c]) && T("Cannot register public name '" + a + "' twice"), Va(a, a), e.hasOwnProperty(c) && T("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), e[a].G[c] = b) : (e[a] = b, void 0 !== c && (e[a].O = c));
    }

    function Xa(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(E[(b >> 2) + d]);

      return c;
    }

    function Ya(a, b) {
      0 <= a.indexOf("j") || y("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var f;
        -1 != a.indexOf("j") ? f = c && c.length ? e["dynCall_" + a].apply(null, [b].concat(c)) : e["dynCall_" + a].call(null, b) : f = J.get(b).apply(null, c);
        return f;
      };
    }

    function Za(a, b) {
      a = P(a);
      var c = -1 != a.indexOf("j") ? Ya(a, b) : J.get(b);
      "function" !== typeof c && T("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var $a = void 0;

    function ab(a) {
      a = bb(a);
      var b = P(a);
      X(a);
      return b;
    }

    function cb(a, b) {
      function c(g) {
        f[g] || R[g] || (S[g] ? S[g].forEach(c) : (d.push(g), f[g] = !0));
      }

      var d = [],
          f = {};
      b.forEach(c);
      throw new $a(a + ": " + d.map(ab).join([", "]));
    }

    function db(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return G[d];
          } : function (d) {
            return A[d];
          };

        case 1:
          return c ? function (d) {
            return D[d >> 1];
          } : function (d) {
            return B[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return E[d >> 2];
          } : function (d) {
            return H[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var eb = {};

    function fb() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function gb(a, b) {
      var c = R[a];
      void 0 === c && T(b + " has unknown type " + ab(a));
      return c;
    }

    var hb = {},
        ib = {};

    function jb() {
      if (!kb) {
        var a = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
          _: ca || "./this.program"
        },
            b;

        for (b in ib) a[b] = ib[b];

        var c = [];

        for (b in a) c.push(b + "=" + a[b]);

        kb = c;
      }

      return kb;
    }

    for (var kb, lb = [null, [], []], mb = Array(256), Y = 0; 256 > Y; ++Y) mb[Y] = String.fromCharCode(Y);

    Fa = mb;
    Ja = e.BindingError = Ia("BindingError");
    Ka = e.InternalError = Ia("InternalError");

    e.count_emval_handles = function () {
      for (var a = 0, b = 5; b < V.length; ++b) void 0 !== V[b] && ++a;

      return a;
    };

    e.get_first_emval = function () {
      for (var a = 5; a < V.length; ++a) if (void 0 !== V[a]) return V[a];

      return null;
    };

    $a = e.UnboundTypeError = Ia("UnboundTypeError");
    va.push({
      L: function () {
        nb();
      }
    });
    var pb = {
      h: function () {},
      o: function (a, b, c, d, f) {
        var g = Ea(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (l) {
            return !!l;
          },
          toWireType: function (l, h) {
            return h ? d : f;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (l) {
            if (1 === c) var h = G;else if (2 === c) h = D;else if (4 === c) h = E;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[l >> g]);
          },
          H: null
        });
      },
      x: function (a, b) {
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (c) {
            var d = V[c].value;
            Na(c);
            return d;
          },
          toWireType: function (c, d) {
            return W(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Oa,
          H: null
        });
      },
      n: function (a, b, c) {
        c = Ea(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, f) {
            if ("number" !== typeof f && "boolean" !== typeof f) throw new TypeError('Cannot convert "' + Ra(f) + '" to ' + this.name);
            return f;
          },
          argPackAdvance: 8,
          readValueFromPointer: Sa(b, c),
          H: null
        });
      },
      q: function (a, b, c, d, f, g) {
        var l = Xa(b, c);
        a = P(a);
        f = Za(d, f);
        Wa(a, function () {
          cb("Cannot call " + a + " due to unbound types", l);
        }, b - 1);
        La(l, function (h) {
          var p = a,
              k = a;
          h = [h[0], null].concat(h.slice(1));
          var m = f,
              q = h.length;
          2 > q && T("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var x = null !== h[1] && !1, C = !1, n = 1; n < h.length; ++n) if (null !== h[n] && void 0 === h[n].H) {
            C = !0;
            break;
          }

          var Pa = "void" !== h[0].name,
              I = "",
              M = "";

          for (n = 0; n < q - 2; ++n) I += (0 !== n ? ", " : "") + "arg" + n, M += (0 !== n ? ", " : "") + "arg" + n + "Wired";

          k = "return function " + Ga(k) + "(" + I + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + k + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          C && (k += "var destructors = [];\n");
          var Qa = C ? "destructors" : "null";
          I = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          m = [T, m, g, Ua, h[0], h[1]];
          x && (k += "var thisWired = classParam.toWireType(" + Qa + ", this);\n");

          for (n = 0; n < q - 2; ++n) k += "var arg" + n + "Wired = argType" + n + ".toWireType(" + Qa + ", arg" + n + "); // " + h[n + 2].name + "\n", I.push("argType" + n), m.push(h[n + 2]);

          x && (M = "thisWired" + (0 < M.length ? ", " : "") + M);
          k += (Pa ? "var rv = " : "") + "invoker(fn" + (0 < M.length ? ", " : "") + M + ");\n";
          if (C) k += "runDestructors(destructors);\n";else for (n = x ? 1 : 2; n < h.length; ++n) q = 1 === n ? "thisWired" : "arg" + (n - 2) + "Wired", null !== h[n].H && (k += q + "_dtor(" + q + "); // " + h[n].name + "\n", I.push(q + "_dtor"), m.push(h[n].H));
          Pa && (k += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          I.push(k + "}\n");
          h = Ta(I).apply(null, m);
          n = b - 1;
          if (!e.hasOwnProperty(p)) throw new Ka("Replacing nonexistant public symbol");
          void 0 !== e[p].G && void 0 !== n ? e[p].G[n] = h : (e[p] = h, e[p].K = n);
          return [];
        });
      },
      d: function (a, b, c, d, f) {
        function g(k) {
          return k;
        }

        b = P(b);
        -1 === f && (f = 4294967295);
        var l = Ea(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (k) {
            return k << h >>> h;
          };
        }

        var p = -1 != b.indexOf("unsigned");
        U(a, {
          name: b,
          fromWireType: g,
          toWireType: function (k, m) {
            if ("number" !== typeof m && "boolean" !== typeof m) throw new TypeError('Cannot convert "' + Ra(m) + '" to ' + this.name);
            if (m < d || m > f) throw new TypeError('Passing a number "' + Ra(m) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + f + "]!");
            return p ? m >>> 0 : m | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: db(b, l, 0 !== d),
          H: null
        });
      },
      c: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var l = H;
          return new f(F, l[g + 1], l[g]);
        }

        var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = P(c);
        U(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          M: !0
        });
      },
      j: function (a, b) {
        b = P(b);
        var c = "std::string" === b;
        U(a, {
          name: b,
          fromWireType: function (d) {
            var f = H[d >> 2];
            if (c) for (var g = d + 4, l = 0; l <= f; ++l) {
              var h = d + 4 + l;

              if (l == f || 0 == A[h]) {
                if (g) {
                  for (var p = g + (h - g), k = g; !(k >= p) && A[k];) ++k;

                  g = ha.decode(A.subarray(g, k));
                } else g = "";

                if (void 0 === m) var m = g;else m += String.fromCharCode(0), m += g;
                g = h + 1;
              }
            } else {
              m = Array(f);

              for (l = 0; l < f; ++l) m[l] = String.fromCharCode(A[d + 4 + l]);

              m = m.join("");
            }
            X(d);
            return m;
          },
          toWireType: function (d, f) {
            f instanceof ArrayBuffer && (f = new Uint8Array(f));
            var g = "string" === typeof f;
            g || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || T("Cannot pass non-string to std::string");
            var l = (c && g ? function () {
              for (var k = 0, m = 0; m < f.length; ++m) {
                var q = f.charCodeAt(m);
                55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | f.charCodeAt(++m) & 1023);
                127 >= q ? ++k : k = 2047 >= q ? k + 2 : 65535 >= q ? k + 3 : k + 4;
              }

              return k;
            } : function () {
              return f.length;
            })(),
                h = ob(4 + l + 1);
            H[h >> 2] = l;
            if (c && g) ia(f, h + 4, l + 1);else if (g) for (g = 0; g < l; ++g) {
              var p = f.charCodeAt(g);
              255 < p && (X(h), T("String has UTF-16 code units that do not fit in 8 bits"));
              A[h + 4 + g] = p;
            } else for (g = 0; g < l; ++g) A[h + 4 + g] = f[g];
            null !== d && d.push(X, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Oa,
          H: function (d) {
            X(d);
          }
        });
      },
      i: function (a, b, c) {
        c = P(c);

        if (2 === b) {
          var d = ka;
          var f = la;
          var g = ma;

          var l = function () {
            return B;
          };

          var h = 1;
        } else 4 === b && (d = na, f = oa, g = pa, l = function () {
          return H;
        }, h = 2);

        U(a, {
          name: c,
          fromWireType: function (p) {
            for (var k = H[p >> 2], m = l(), q, x = p + 4, C = 0; C <= k; ++C) {
              var n = p + 4 + C * b;
              if (C == k || 0 == m[n >> h]) x = d(x, n - x), void 0 === q ? q = x : (q += String.fromCharCode(0), q += x), x = n + b;
            }

            X(p);
            return q;
          },
          toWireType: function (p, k) {
            "string" !== typeof k && T("Cannot pass non-string to C++ string type " + c);
            var m = g(k),
                q = ob(4 + m + b);
            H[q >> 2] = m >> h;
            f(k, q + 4, m + b);
            null !== p && p.push(X, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Oa,
          H: function (p) {
            X(p);
          }
        });
      },
      p: function (a, b) {
        b = P(b);
        U(a, {
          N: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      f: Na,
      g: function (a) {
        if (0 === a) return W(fb());
        var b = eb[a];
        a = void 0 === b ? P(a) : b;
        return W(fb()[a]);
      },
      k: function (a) {
        4 < a && (V[a].J += 1);
      },
      l: function (a, b, c, d) {
        a || T("Cannot use deleted val. handle = " + a);
        a = V[a].value;
        var f = hb[b];

        if (!f) {
          f = "";

          for (var g = 0; g < b; ++g) f += (0 !== g ? ", " : "") + "arg" + g;

          var l = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (g = 0; g < b; ++g) l += "var argType" + g + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + g + '], "parameter ' + g + '");\nvar arg' + g + " = argType" + g + ".readValueFromPointer(args);\nargs += argType" + g + "['argPackAdvance'];\n";

          f = new Function("requireRegisteredType", "Module", "__emval_register", l + ("var obj = new constructor(" + f + ");\nreturn __emval_register(obj);\n}\n"))(gb, e, W);
          hb[b] = f;
        }

        return f(a, c, d);
      },
      b: function () {
        y();
      },
      t: function (a, b, c) {
        A.copyWithin(a, b, b + c);
      },
      e: function (a) {
        a >>>= 0;
        var b = A.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              z.grow(Math.min(2147483648, d) - F.byteLength + 65535 >>> 16);
              sa(z.buffer);
              var f = 1;
              break a;
            } catch (g) {}

            f = void 0;
          }

          if (f) return !0;
        }

        return !1;
      },
      u: function (a, b) {
        var c = 0;
        jb().forEach(function (d, f) {
          var g = b + c;
          f = E[a + 4 * f >> 2] = g;

          for (g = 0; g < d.length; ++g) G[f++ >> 0] = d.charCodeAt(g);

          G[f >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      v: function (a, b) {
        var c = jb();
        E[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (f) {
          d += f.length + 1;
        });
        E[b >> 2] = d;
        return 0;
      },
      w: function () {
        return 0;
      },
      r: function () {},
      m: function (a, b, c, d) {
        for (var f = 0, g = 0; g < c; g++) {
          for (var l = E[b + 8 * g >> 2], h = E[b + (8 * g + 4) >> 2], p = 0; p < h; p++) {
            var k = A[l + p],
                m = lb[a];

            if (0 === k || 10 === k) {
              for (k = 0; m[k] && !(NaN <= k);) ++k;

              k = ha.decode(m.subarray ? m.subarray(0, k) : new Uint8Array(m.slice(0, k)));
              (1 === a ? ea : v)(k);
              m.length = 0;
            } else m.push(k);
          }

          f += h;
        }

        E[d >> 2] = f;
        return 0;
      },
      a: z,
      s: function () {}
    };

    (function () {
      function a(f) {
        e.asm = f.exports;
        J = e.asm.y;
        K--;
        e.monitorRunDependencies && e.monitorRunDependencies(K);
        0 == K && L && (f = L, L = null, f());
      }

      function b(f) {
        a(f.instance);
      }

      function c(f) {
        return Da().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(f, function (g) {
          v("failed to asynchronously prepare wasm: " + g);
          y(g);
        });
      }

      var d = {
        a: pb
      };
      K++;
      e.monitorRunDependencies && e.monitorRunDependencies(K);
      if (e.instantiateWasm) try {
        return e.instantiateWasm(d, a);
      } catch (f) {
        return v("Module.instantiateWasm callback failed with error: " + f), !1;
      }
      (function () {
        return w || "function" !== typeof WebAssembly.instantiateStreaming || Aa() || "function" !== typeof fetch ? c(b) : fetch(N, {
          credentials: "same-origin"
        }).then(function (f) {
          return WebAssembly.instantiateStreaming(f, d).then(b, function (g) {
            v("wasm streaming compile failed: " + g);
            v("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ba);
      return {};
    })();

    var nb = e.___wasm_call_ctors = function () {
      return (nb = e.___wasm_call_ctors = e.asm.z).apply(null, arguments);
    },
        ob = e._malloc = function () {
      return (ob = e._malloc = e.asm.A).apply(null, arguments);
    },
        X = e._free = function () {
      return (X = e._free = e.asm.B).apply(null, arguments);
    },
        bb = e.___getTypeName = function () {
      return (bb = e.___getTypeName = e.asm.C).apply(null, arguments);
    };

    e.___embind_register_native_and_builtin_types = function () {
      return (e.___embind_register_native_and_builtin_types = e.asm.D).apply(null, arguments);
    };

    e.dynCall_iiji = function () {
      return (e.dynCall_iiji = e.asm.E).apply(null, arguments);
    };

    e.dynCall_jiji = function () {
      return (e.dynCall_jiji = e.asm.F).apply(null, arguments);
    };

    var Z;

    L = function qb() {
      Z || rb();
      Z || (L = qb);
    };

    function rb() {
      function a() {
        if (!Z && (Z = !0, e.calledRun = !0, !fa)) {
          O(va);
          O(wa);
          aa(e);
          if (e.onRuntimeInitialized) e.onRuntimeInitialized();
          if (e.postRun) for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
            var b = e.postRun.shift();
            xa.unshift(b);
          }
          O(xa);
        }
      }

      if (!(0 < K)) {
        if (e.preRun) for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) ya();
        O(ua);
        0 < K || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            e.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    e.run = rb;
    if (e.preInit) for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) e.preInit.pop()();
    noExitRuntime = !0;
    rb();
    return jxl_dec.ready;
  };
}();

var jxlDecWasm = "jxl_dec-e715bdd5.wasm";

var wp2_enc = function () {
  var _scriptDir = import.meta.url;
  return function (wp2_enc) {
    wp2_enc = wp2_enc || {};
    var f;
    f || (f = typeof wp2_enc !== 'undefined' ? wp2_enc : {});
    var aa, ba;
    f.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
        t;

    for (t in f) f.hasOwnProperty(t) && (r[t] = f[t]);

    var u = "",
        ca;
    u = self.location.href;
    _scriptDir && (u = _scriptDir);
    0 !== u.indexOf("blob:") ? u = u.substr(0, u.lastIndexOf("/") + 1) : u = "";

    ca = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var da = f.print || console.log.bind(console),
        v = f.printErr || console.warn.bind(console);

    for (t in r) r.hasOwnProperty(t) && (f[t] = r[t]);

    r = null;
    var w;
    f.wasmBinary && (w = f.wasmBinary);
    var noExitRuntime;
    f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
    "object" !== typeof WebAssembly && A("no native wasm support detected");
    var B,
        ea = !1,
        fa = new TextDecoder("utf8");

    function C(a, b) {
      if (!a) return "";
      b = a + b;

      for (var c = a; !(c >= b) && D[c];) ++c;

      return fa.decode(D.subarray(a, c));
    }

    function ia(a, b, c) {
      var d = D;

      if (0 < c) {
        c = b + c - 1;

        for (var e = 0; e < a.length; ++e) {
          var g = a.charCodeAt(e);

          if (55296 <= g && 57343 >= g) {
            var m = a.charCodeAt(++e);
            g = 65536 + ((g & 1023) << 10) | m & 1023;
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

    var ja = new TextDecoder("utf-16le");

    function ka(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && E[c];) ++c;

      return ja.decode(D.subarray(a, c << 1));
    }

    function la(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var e = 0; e < c; ++e) G[b >> 1] = a.charCodeAt(e), b += 2;

      G[b >> 1] = 0;
      return b - d;
    }

    function ma(a) {
      return 2 * a.length;
    }

    function na(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var e = H[a + 4 * c >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
      }

      return d;
    }

    function oa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var e = 0; e < a.length; ++e) {
        var g = a.charCodeAt(e);

        if (55296 <= g && 57343 >= g) {
          var m = a.charCodeAt(++e);
          g = 65536 + ((g & 1023) << 10) | m & 1023;
        }

        H[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }

      H[b >> 2] = 0;
      return b - d;
    }

    function pa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var I, J, D, G, E, H, K, qa, ra;

    function sa(a) {
      I = a;
      f.HEAP8 = J = new Int8Array(a);
      f.HEAP16 = G = new Int16Array(a);
      f.HEAP32 = H = new Int32Array(a);
      f.HEAPU8 = D = new Uint8Array(a);
      f.HEAPU16 = E = new Uint16Array(a);
      f.HEAPU32 = K = new Uint32Array(a);
      f.HEAPF32 = qa = new Float32Array(a);
      f.HEAPF64 = ra = new Float64Array(a);
    }

    var ta = f.INITIAL_MEMORY || 16777216;
    f.wasmMemory ? B = f.wasmMemory : B = new WebAssembly.Memory({
      initial: ta / 65536,
      maximum: 32768
    });
    B && (I = B.buffer);
    ta = I.byteLength;
    sa(I);
    var L,
        ua = [],
        va = [],
        wa = [],
        xa = [];

    function ya() {
      var a = f.preRun.shift();
      ua.unshift(a);
    }

    var M = 0,
        N = null;
    f.preloadedImages = {};
    f.preloadedAudios = {};

    function A(a) {
      if (f.onAbort) f.onAbort(a);
      v(a);
      ea = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ba(a);
      throw a;
    }

    function Aa() {
      var a = O;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var O = "wp2_enc.wasm";

    if (!Aa()) {
      var Ba = O;
      O = f.locateFile ? f.locateFile(Ba, u) : u + Ba;
    }

    function Ca() {
      try {
        if (w) return new Uint8Array(w);
        if (ca) return ca(O);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        A(a);
      }
    }

    function Da() {
      return w || "function" !== typeof fetch ? Promise.resolve().then(Ca) : fetch(O, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + O + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Ca();
      });
    }

    function P(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(f);else {
          var c = b.T;
          "number" === typeof c ? void 0 === b.M ? L.get(c)() : L.get(c)(b.M) : c(void 0 === b.M ? null : b.M);
        }
      }
    }

    function Ea(a) {
      this.L = a - 16;

      this.ea = function (b) {
        H[this.L + 8 >> 2] = b;
      };

      this.ba = function (b) {
        H[this.L + 0 >> 2] = b;
      };

      this.ca = function () {
        H[this.L + 4 >> 2] = 0;
      };

      this.aa = function () {
        J[this.L + 12 >> 0] = 0;
      };

      this.da = function () {
        J[this.L + 13 >> 0] = 0;
      };

      this.Y = function (b, c) {
        this.ea(b);
        this.ba(c);
        this.ca();
        this.aa();
        this.da();
      };
    }

    var Fa = {};

    function Ga(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Ha(a) {
      return this.fromWireType(K[a >> 2]);
    }

    var R = {},
        S = {},
        Ia = {};

    function Ja(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Ka(a, b) {
      a = Ja(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function La(a) {
      var b = Error,
          c = Ka(a, function (d) {
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

    var Ma = void 0;

    function Na(a, b, c) {
      function d(h) {
        h = c(h);
        if (h.length !== a.length) throw new Ma("Mismatched type converter count");

        for (var k = 0; k < a.length; ++k) T(a[k], h[k]);
      }

      a.forEach(function (h) {
        Ia[h] = b;
      });
      var e = Array(b.length),
          g = [],
          m = 0;
      b.forEach(function (h, k) {
        S.hasOwnProperty(h) ? e[k] = S[h] : (g.push(h), R.hasOwnProperty(h) || (R[h] = []), R[h].push(function () {
          e[k] = S[h];
          ++m;
          m === g.length && d(e);
        }));
      });
      0 === g.length && d(e);
    }

    function Oa(a) {
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

    var Pa = void 0;

    function U(a) {
      for (var b = ""; D[a];) b += Pa[D[a++]];

      return b;
    }

    var Qa = void 0;

    function W(a) {
      throw new Qa(a);
    }

    function T(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || W('type "' + d + '" must have a positive integer typeid pointer');

      if (S.hasOwnProperty(a)) {
        if (c.X) return;
        W("Cannot register type '" + d + "' twice");
      }

      S[a] = b;
      delete Ia[a];
      R.hasOwnProperty(a) && (b = R[a], delete R[a], b.forEach(function (e) {
        e();
      }));
    }

    var Ra = [],
        X = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Sa(a) {
      4 < a && 0 === --X[a].N && (X[a] = void 0, Ra.push(a));
    }

    function Ta(a) {
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
          var b = Ra.length ? Ra.pop() : X.length;
          X[b] = {
            N: 1,
            value: a
          };
          return b;
      }
    }

    function Ua(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Va(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(qa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(ra[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Wa(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Ka(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Xa(a, b) {
      var c = f;

      if (void 0 === c[a].J) {
        var d = c[a];

        c[a] = function () {
          c[a].J.hasOwnProperty(arguments.length) || W("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].J + ")!");
          return c[a].J[arguments.length].apply(this, arguments);
        };

        c[a].J = [];
        c[a].J[d.R] = d;
      }
    }

    function Ya(a, b, c) {
      f.hasOwnProperty(a) ? ((void 0 === c || void 0 !== f[a].J && void 0 !== f[a].J[c]) && W("Cannot register public name '" + a + "' twice"), Xa(a, a), f.hasOwnProperty(c) && W("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), f[a].J[c] = b) : (f[a] = b, void 0 !== c && (f[a].ja = c));
    }

    function Za(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(H[(b >> 2) + d]);

      return c;
    }

    function $a(a, b) {
      0 <= a.indexOf("j") || A("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var e;
        -1 != a.indexOf("j") ? e = c && c.length ? f["dynCall_" + a].apply(null, [b].concat(c)) : f["dynCall_" + a].call(null, b) : e = L.get(b).apply(null, c);
        return e;
      };
    }

    function Y(a, b) {
      a = U(a);
      var c = -1 != a.indexOf("j") ? $a(a, b) : L.get(b);
      "function" !== typeof c && W("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var ab = void 0;

    function bb(a) {
      a = cb(a);
      var b = U(a);
      Z(a);
      return b;
    }

    function db(a, b) {
      function c(g) {
        e[g] || S[g] || (Ia[g] ? Ia[g].forEach(c) : (d.push(g), e[g] = !0));
      }

      var d = [],
          e = {};
      b.forEach(c);
      throw new ab(a + ": " + d.map(bb).join([", "]));
    }

    function eb(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return J[d];
          } : function (d) {
            return D[d];
          };

        case 1:
          return c ? function (d) {
            return G[d >> 1];
          } : function (d) {
            return E[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return H[d >> 2];
          } : function (d) {
            return K[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var fb = {};

    function gb() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function hb(a, b) {
      var c = S[a];
      void 0 === c && W(b + " has unknown type " + bb(a));
      return c;
    }

    var ib = {},
        jb = [null, [], []];
    Ma = f.InternalError = La("InternalError");

    for (var kb = Array(256), lb = 0; 256 > lb; ++lb) kb[lb] = String.fromCharCode(lb);

    Pa = kb;
    Qa = f.BindingError = La("BindingError");

    f.count_emval_handles = function () {
      for (var a = 0, b = 5; b < X.length; ++b) void 0 !== X[b] && ++a;

      return a;
    };

    f.get_first_emval = function () {
      for (var a = 5; a < X.length; ++a) if (void 0 !== X[a]) return X[a];

      return null;
    };

    ab = f.UnboundTypeError = La("UnboundTypeError");
    va.push({
      T: function () {
        mb();
      }
    });
    var ob = {
      q: function (a, b, c, d) {
        A("Assertion failed: " + C(a) + ", at: " + [b ? C(b) : "unknown filename", c, d ? C(d) : "unknown function"]);
      },
      z: function (a) {
        return nb(a + 16) + 16;
      },
      B: function () {},
      y: function (a, b, c) {
        new Ea(a).Y(b, c);
        throw a;
      },
      n: function (a) {
        var b = Fa[a];
        delete Fa[a];
        var c = b.Z,
            d = b.$,
            e = b.O,
            g = e.map(function (m) {
          return m.W;
        }).concat(e.map(function (m) {
          return m.ga;
        }));
        Na([a], g, function (m) {
          var h = {};
          e.forEach(function (k, l) {
            var n = m[l],
                q = k.U,
                x = k.V,
                y = m[l + e.length],
                p = k.fa,
                ha = k.ha;
            h[k.S] = {
              read: function (z) {
                return n.fromWireType(q(x, z));
              },
              write: function (z, F) {
                var V = [];
                p(ha, z, y.toWireType(V, F));
                Ga(V);
              }
            };
          });
          return [{
            name: b.name,
            fromWireType: function (k) {
              var l = {},
                  n;

              for (n in h) l[n] = h[n].read(k);

              d(k);
              return l;
            },
            toWireType: function (k, l) {
              for (var n in h) if (!(n in l)) throw new TypeError('Missing field:  "' + n + '"');

              var q = c();

              for (n in h) h[n].write(q, l[n]);

              null !== k && k.push(d, q);
              return q;
            },
            argPackAdvance: 8,
            readValueFromPointer: Ha,
            K: d
          }];
        });
      },
      w: function (a, b, c, d, e) {
        var g = Oa(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (m) {
            return !!m;
          },
          toWireType: function (m, h) {
            return h ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (m) {
            if (1 === c) var h = J;else if (2 === c) h = G;else if (4 === c) h = H;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[m >> g]);
          },
          K: null
        });
      },
      v: function (a, b) {
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (c) {
            var d = X[c].value;
            Sa(c);
            return d;
          },
          toWireType: function (c, d) {
            return Ta(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Ha,
          K: null
        });
      },
      j: function (a, b, c) {
        c = Oa(c);
        b = U(b);
        T(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            if ("number" !== typeof e && "boolean" !== typeof e) throw new TypeError('Cannot convert "' + Ua(e) + '" to ' + this.name);
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: Va(b, c),
          K: null
        });
      },
      m: function (a, b, c, d, e, g) {
        var m = Za(b, c);
        a = U(a);
        e = Y(d, e);
        Ya(a, function () {
          db("Cannot call " + a + " due to unbound types", m);
        }, b - 1);
        Na([], m, function (h) {
          var k = a,
              l = a;
          h = [h[0], null].concat(h.slice(1));
          var n = e,
              q = h.length;
          2 > q && W("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var x = null !== h[1] && !1, y = !1, p = 1; p < h.length; ++p) if (null !== h[p] && void 0 === h[p].K) {
            y = !0;
            break;
          }

          var ha = "void" !== h[0].name,
              z = "",
              F = "";

          for (p = 0; p < q - 2; ++p) z += (0 !== p ? ", " : "") + "arg" + p, F += (0 !== p ? ", " : "") + "arg" + p + "Wired";

          l = "return function " + Ja(l) + "(" + z + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + l + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          y && (l += "var destructors = [];\n");
          var V = y ? "destructors" : "null";
          z = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          n = [W, n, g, Ga, h[0], h[1]];
          x && (l += "var thisWired = classParam.toWireType(" + V + ", this);\n");

          for (p = 0; p < q - 2; ++p) l += "var arg" + p + "Wired = argType" + p + ".toWireType(" + V + ", arg" + p + "); // " + h[p + 2].name + "\n", z.push("argType" + p), n.push(h[p + 2]);

          x && (F = "thisWired" + (0 < F.length ? ", " : "") + F);
          l += (ha ? "var rv = " : "") + "invoker(fn" + (0 < F.length ? ", " : "") + F + ");\n";
          if (y) l += "runDestructors(destructors);\n";else for (p = x ? 1 : 2; p < h.length; ++p) q = 1 === p ? "thisWired" : "arg" + (p - 2) + "Wired", null !== h[p].K && (l += q + "_dtor(" + q + "); // " + h[p].name + "\n", z.push(q + "_dtor"), n.push(h[p].K));
          ha && (l += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          z.push(l + "}\n");
          h = Wa(z).apply(null, n);
          p = b - 1;
          if (!f.hasOwnProperty(k)) throw new Ma("Replacing nonexistant public symbol");
          void 0 !== f[k].J && void 0 !== p ? f[k].J[p] = h : (f[k] = h, f[k].R = p);
          return [];
        });
      },
      d: function (a, b, c, d, e) {
        function g(l) {
          return l;
        }

        b = U(b);
        -1 === e && (e = 4294967295);
        var m = Oa(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (l) {
            return l << h >>> h;
          };
        }

        var k = -1 != b.indexOf("unsigned");
        T(a, {
          name: b,
          fromWireType: g,
          toWireType: function (l, n) {
            if ("number" !== typeof n && "boolean" !== typeof n) throw new TypeError('Cannot convert "' + Ua(n) + '" to ' + this.name);
            if (n < d || n > e) throw new TypeError('Passing a number "' + Ua(n) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + e + "]!");
            return k ? n >>> 0 : n | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: eb(b, m, 0 !== d),
          K: null
        });
      },
      b: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var m = K;
          return new e(I, m[g + 1], m[g]);
        }

        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = U(c);
        T(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          X: !0
        });
      },
      k: function (a, b) {
        b = U(b);
        var c = "std::string" === b;
        T(a, {
          name: b,
          fromWireType: function (d) {
            var e = K[d >> 2];
            if (c) for (var g = d + 4, m = 0; m <= e; ++m) {
              var h = d + 4 + m;

              if (m == e || 0 == D[h]) {
                g = C(g, h - g);
                if (void 0 === k) var k = g;else k += String.fromCharCode(0), k += g;
                g = h + 1;
              }
            } else {
              k = Array(e);

              for (m = 0; m < e; ++m) k[m] = String.fromCharCode(D[d + 4 + m]);

              k = k.join("");
            }
            Z(d);
            return k;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var g = "string" === typeof e;
            g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || W("Cannot pass non-string to std::string");
            var m = (c && g ? function () {
              for (var l = 0, n = 0; n < e.length; ++n) {
                var q = e.charCodeAt(n);
                55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | e.charCodeAt(++n) & 1023);
                127 >= q ? ++l : l = 2047 >= q ? l + 2 : 65535 >= q ? l + 3 : l + 4;
              }

              return l;
            } : function () {
              return e.length;
            })(),
                h = nb(4 + m + 1);
            K[h >> 2] = m;
            if (c && g) ia(e, h + 4, m + 1);else if (g) for (g = 0; g < m; ++g) {
              var k = e.charCodeAt(g);
              255 < k && (Z(h), W("String has UTF-16 code units that do not fit in 8 bits"));
              D[h + 4 + g] = k;
            } else for (g = 0; g < m; ++g) D[h + 4 + g] = e[g];
            null !== d && d.push(Z, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ha,
          K: function (d) {
            Z(d);
          }
        });
      },
      f: function (a, b, c) {
        c = U(c);

        if (2 === b) {
          var d = ka;
          var e = la;
          var g = ma;

          var m = function () {
            return E;
          };

          var h = 1;
        } else 4 === b && (d = na, e = oa, g = pa, m = function () {
          return K;
        }, h = 2);

        T(a, {
          name: c,
          fromWireType: function (k) {
            for (var l = K[k >> 2], n = m(), q, x = k + 4, y = 0; y <= l; ++y) {
              var p = k + 4 + y * b;
              if (y == l || 0 == n[p >> h]) x = d(x, p - x), void 0 === q ? q = x : (q += String.fromCharCode(0), q += x), x = p + b;
            }

            Z(k);
            return q;
          },
          toWireType: function (k, l) {
            "string" !== typeof l && W("Cannot pass non-string to C++ string type " + c);
            var n = g(l),
                q = nb(4 + n + b);
            K[q >> 2] = n >> h;
            e(l, q + 4, n + b);
            null !== k && k.push(Z, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ha,
          K: function (k) {
            Z(k);
          }
        });
      },
      o: function (a, b, c, d, e, g) {
        Fa[a] = {
          name: U(b),
          Z: Y(c, d),
          $: Y(e, g),
          O: []
        };
      },
      c: function (a, b, c, d, e, g, m, h, k, l) {
        Fa[a].O.push({
          S: U(b),
          W: c,
          U: Y(d, e),
          V: g,
          ga: m,
          fa: Y(h, k),
          ha: l
        });
      },
      x: function (a, b) {
        b = U(b);
        T(a, {
          ia: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      i: Sa,
      A: function (a) {
        if (0 === a) return Ta(gb());
        var b = fb[a];
        a = void 0 === b ? U(a) : b;
        return Ta(gb()[a]);
      },
      l: function (a) {
        4 < a && (X[a].N += 1);
      },
      p: function (a, b, c, d) {
        a || W("Cannot use deleted val. handle = " + a);
        a = X[a].value;
        var e = ib[b];

        if (!e) {
          e = "";

          for (var g = 0; g < b; ++g) e += (0 !== g ? ", " : "") + "arg" + g;

          var m = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (g = 0; g < b; ++g) m += "var argType" + g + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + g + '], "parameter ' + g + '");\nvar arg' + g + " = argType" + g + ".readValueFromPointer(args);\nargs += argType" + g + "['argPackAdvance'];\n";

          e = new Function("requireRegisteredType", "Module", "__emval_register", m + ("var obj = new constructor(" + e + ");\nreturn __emval_register(obj);\n}\n"))(hb, f, Ta);
          ib[b] = e;
        }

        return e(a, c, d);
      },
      g: function () {
        A();
      },
      t: function (a, b, c) {
        D.copyWithin(a, b, b + c);
      },
      e: function (a) {
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
              B.grow(Math.min(2147483648, d) - I.byteLength + 65535 >>> 16);
              sa(B.buffer);
              var e = 1;
              break a;
            } catch (g) {}

            e = void 0;
          }

          if (e) return !0;
        }

        return !1;
      },
      u: function () {
        return 0;
      },
      r: function () {},
      h: function (a, b, c, d) {
        for (var e = 0, g = 0; g < c; g++) {
          for (var m = H[b + 8 * g >> 2], h = H[b + (8 * g + 4) >> 2], k = 0; k < h; k++) {
            var l = D[m + k],
                n = jb[a];

            if (0 === l || 10 === l) {
              for (l = 0; n[l] && !(NaN <= l);) ++l;

              l = fa.decode(n.subarray ? n.subarray(0, l) : new Uint8Array(n.slice(0, l)));
              (1 === a ? da : v)(l);
              n.length = 0;
            } else n.push(l);
          }

          e += h;
        }

        H[d >> 2] = e;
        return 0;
      },
      a: B,
      s: function () {}
    };

    (function () {
      function a(e) {
        f.asm = e.exports;
        L = f.asm.C;
        M--;
        f.monitorRunDependencies && f.monitorRunDependencies(M);
        0 == M && N && (e = N, N = null, e());
      }

      function b(e) {
        a(e.instance);
      }

      function c(e) {
        return Da().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(e, function (g) {
          v("failed to asynchronously prepare wasm: " + g);
          A(g);
        });
      }

      var d = {
        a: ob
      };
      M++;
      f.monitorRunDependencies && f.monitorRunDependencies(M);
      if (f.instantiateWasm) try {
        return f.instantiateWasm(d, a);
      } catch (e) {
        return v("Module.instantiateWasm callback failed with error: " + e), !1;
      }
      (function () {
        return w || "function" !== typeof WebAssembly.instantiateStreaming || Aa() || "function" !== typeof fetch ? c(b) : fetch(O, {
          credentials: "same-origin"
        }).then(function (e) {
          return WebAssembly.instantiateStreaming(e, d).then(b, function (g) {
            v("wasm streaming compile failed: " + g);
            v("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ba);
      return {};
    })();

    var mb = f.___wasm_call_ctors = function () {
      return (mb = f.___wasm_call_ctors = f.asm.D).apply(null, arguments);
    },
        Z = f._free = function () {
      return (Z = f._free = f.asm.E).apply(null, arguments);
    },
        nb = f._malloc = function () {
      return (nb = f._malloc = f.asm.F).apply(null, arguments);
    },
        cb = f.___getTypeName = function () {
      return (cb = f.___getTypeName = f.asm.G).apply(null, arguments);
    };

    f.___embind_register_native_and_builtin_types = function () {
      return (f.___embind_register_native_and_builtin_types = f.asm.H).apply(null, arguments);
    };

    f.dynCall_jiji = function () {
      return (f.dynCall_jiji = f.asm.I).apply(null, arguments);
    };

    var pb;

    N = function qb() {
      pb || rb();
      pb || (N = qb);
    };

    function rb() {
      function a() {
        if (!pb && (pb = !0, f.calledRun = !0, !ea)) {
          P(va);
          P(wa);
          aa(f);
          if (f.onRuntimeInitialized) f.onRuntimeInitialized();
          if (f.postRun) for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length;) {
            var b = f.postRun.shift();
            xa.unshift(b);
          }
          P(xa);
        }
      }

      if (!(0 < M)) {
        if (f.preRun) for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length;) ya();
        P(ua);
        0 < M || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            f.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    f.run = rb;
    if (f.preInit) for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length;) f.preInit.pop()();
    noExitRuntime = !0;
    rb();
    return wp2_enc.ready;
  };
}();

var wp2EncWasm = "wp2_enc-9c10ea99.wasm";

var wp2_dec = function () {
  var _scriptDir = import.meta.url;
  return function (wp2_dec) {
    wp2_dec = wp2_dec || {};
    var e;
    e || (e = typeof wp2_dec !== 'undefined' ? wp2_dec : {});
    var aa, ba;
    e.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
        t;

    for (t in e) e.hasOwnProperty(t) && (r[t] = e[t]);

    var u = "",
        ca;
    u = self.location.href;
    _scriptDir && (u = _scriptDir);
    0 !== u.indexOf("blob:") ? u = u.substr(0, u.lastIndexOf("/") + 1) : u = "";

    ca = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var da = e.print || console.log.bind(console),
        v = e.printErr || console.warn.bind(console);

    for (t in r) r.hasOwnProperty(t) && (e[t] = r[t]);

    r = null;
    var w;
    e.wasmBinary && (w = e.wasmBinary);
    var noExitRuntime;
    e.noExitRuntime && (noExitRuntime = e.noExitRuntime);
    "object" !== typeof WebAssembly && y("no native wasm support detected");
    var z,
        ea = !1,
        fa = new TextDecoder("utf8");

    function ha(a, b, c) {
      var d = A;

      if (0 < c) {
        c = b + c - 1;

        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);

          if (55296 <= g && 57343 >= g) {
            var l = a.charCodeAt(++f);
            g = 65536 + ((g & 1023) << 10) | l & 1023;
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

    var ia = new TextDecoder("utf-16le");

    function ja(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && B[c];) ++c;

      return ia.decode(A.subarray(a, c << 1));
    }

    function ka(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var f = 0; f < c; ++f) D[b >> 1] = a.charCodeAt(f), b += 2;

      D[b >> 1] = 0;
      return b - d;
    }

    function la(a) {
      return 2 * a.length;
    }

    function ma(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var f = E[a + 4 * c >> 2];
        if (0 == f) break;
        ++c;
        65536 <= f ? (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : d += String.fromCharCode(f);
      }

      return d;
    }

    function na(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);

        if (55296 <= g && 57343 >= g) {
          var l = a.charCodeAt(++f);
          g = 65536 + ((g & 1023) << 10) | l & 1023;
        }

        E[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }

      E[b >> 2] = 0;
      return b - d;
    }

    function oa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var F, G, A, D, B, E, H, pa, qa;

    function ra(a) {
      F = a;
      e.HEAP8 = G = new Int8Array(a);
      e.HEAP16 = D = new Int16Array(a);
      e.HEAP32 = E = new Int32Array(a);
      e.HEAPU8 = A = new Uint8Array(a);
      e.HEAPU16 = B = new Uint16Array(a);
      e.HEAPU32 = H = new Uint32Array(a);
      e.HEAPF32 = pa = new Float32Array(a);
      e.HEAPF64 = qa = new Float64Array(a);
    }

    var sa = e.INITIAL_MEMORY || 16777216;
    e.wasmMemory ? z = e.wasmMemory : z = new WebAssembly.Memory({
      initial: sa / 65536,
      maximum: 32768
    });
    z && (F = z.buffer);
    sa = F.byteLength;
    ra(F);
    var J,
        ta = [],
        ua = [],
        va = [],
        wa = [];

    function xa() {
      var a = e.preRun.shift();
      ta.unshift(a);
    }

    var K = 0,
        L = null;
    e.preloadedImages = {};
    e.preloadedAudios = {};

    function y(a) {
      if (e.onAbort) e.onAbort(a);
      v(a);
      ea = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      ba(a);
      throw a;
    }

    function za() {
      var a = N;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var N = "wp2_dec.wasm";

    if (!za()) {
      var Aa = N;
      N = e.locateFile ? e.locateFile(Aa, u) : u + Aa;
    }

    function Ba() {
      try {
        if (w) return new Uint8Array(w);
        if (ca) return ca(N);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        y(a);
      }
    }

    function Ca() {
      return w || "function" !== typeof fetch ? Promise.resolve().then(Ba) : fetch(N, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + N + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Ba();
      });
    }

    function O(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(e);else {
          var c = b.L;
          "number" === typeof c ? void 0 === b.H ? J.get(c)() : J.get(c)(b.H) : c(void 0 === b.H ? null : b.H);
        }
      }
    }

    function Da(a) {
      this.G = a - 16;

      this.T = function (b) {
        E[this.G + 8 >> 2] = b;
      };

      this.P = function (b) {
        E[this.G + 0 >> 2] = b;
      };

      this.R = function () {
        E[this.G + 4 >> 2] = 0;
      };

      this.O = function () {
        G[this.G + 12 >> 0] = 0;
      };

      this.S = function () {
        G[this.G + 13 >> 0] = 0;
      };

      this.N = function (b, c) {
        this.T(b);
        this.P(c);
        this.R();
        this.O();
        this.S();
      };
    }

    function Ea(a) {
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

    var Fa = void 0;

    function Q(a) {
      for (var b = ""; A[a];) b += Fa[A[a++]];

      return b;
    }

    var R = {},
        S = {},
        T = {};

    function Ga(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Ha(a, b) {
      a = Ga(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Ia(a) {
      var b = Error,
          c = Ha(a, function (d) {
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

    var Ja = void 0;

    function U(a) {
      throw new Ja(a);
    }

    var Ka = void 0;

    function La(a, b) {
      function c(h) {
        h = b(h);
        if (h.length !== d.length) throw new Ka("Mismatched type converter count");

        for (var p = 0; p < d.length; ++p) V(d[p], h[p]);
      }

      var d = [];
      d.forEach(function (h) {
        T[h] = a;
      });
      var f = Array(a.length),
          g = [],
          l = 0;
      a.forEach(function (h, p) {
        S.hasOwnProperty(h) ? f[p] = S[h] : (g.push(h), R.hasOwnProperty(h) || (R[h] = []), R[h].push(function () {
          f[p] = S[h];
          ++l;
          l === g.length && c(f);
        }));
      });
      0 === g.length && c(f);
    }

    function V(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || U('type "' + d + '" must have a positive integer typeid pointer');

      if (S.hasOwnProperty(a)) {
        if (c.M) return;
        U("Cannot register type '" + d + "' twice");
      }

      S[a] = b;
      delete T[a];
      R.hasOwnProperty(a) && (b = R[a], delete R[a], b.forEach(function (f) {
        f();
      }));
    }

    var Oa = [],
        W = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Pa(a) {
      4 < a && 0 === --W[a].I && (W[a] = void 0, Oa.push(a));
    }

    function X(a) {
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
          var b = Oa.length ? Oa.pop() : W.length;
          W[b] = {
            I: 1,
            value: a
          };
          return b;
      }
    }

    function Qa(a) {
      return this.fromWireType(H[a >> 2]);
    }

    function Ra(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Sa(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(pa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(qa[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Ta(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Ha(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Ua(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Va(a, b) {
      var c = e;

      if (void 0 === c[a].D) {
        var d = c[a];

        c[a] = function () {
          c[a].D.hasOwnProperty(arguments.length) || U("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].D + ")!");
          return c[a].D[arguments.length].apply(this, arguments);
        };

        c[a].D = [];
        c[a].D[d.K] = d;
      }
    }

    function Wa(a, b, c) {
      e.hasOwnProperty(a) ? ((void 0 === c || void 0 !== e[a].D && void 0 !== e[a].D[c]) && U("Cannot register public name '" + a + "' twice"), Va(a, a), e.hasOwnProperty(c) && U("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), e[a].D[c] = b) : (e[a] = b, void 0 !== c && (e[a].V = c));
    }

    function Xa(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(E[(b >> 2) + d]);

      return c;
    }

    function Ya(a, b) {
      0 <= a.indexOf("j") || y("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var f;
        -1 != a.indexOf("j") ? f = c && c.length ? e["dynCall_" + a].apply(null, [b].concat(c)) : e["dynCall_" + a].call(null, b) : f = J.get(b).apply(null, c);
        return f;
      };
    }

    function Za(a, b) {
      a = Q(a);
      var c = -1 != a.indexOf("j") ? Ya(a, b) : J.get(b);
      "function" !== typeof c && U("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var $a = void 0;

    function ab(a) {
      a = bb(a);
      var b = Q(a);
      Y(a);
      return b;
    }

    function cb(a, b) {
      function c(g) {
        f[g] || S[g] || (T[g] ? T[g].forEach(c) : (d.push(g), f[g] = !0));
      }

      var d = [],
          f = {};
      b.forEach(c);
      throw new $a(a + ": " + d.map(ab).join([", "]));
    }

    function db(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return G[d];
          } : function (d) {
            return A[d];
          };

        case 1:
          return c ? function (d) {
            return D[d >> 1];
          } : function (d) {
            return B[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return E[d >> 2];
          } : function (d) {
            return H[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var eb = {};

    function fb() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function gb(a, b) {
      var c = S[a];
      void 0 === c && U(b + " has unknown type " + ab(a));
      return c;
    }

    for (var hb = {}, ib = [null, [], []], jb = Array(256), Z = 0; 256 > Z; ++Z) jb[Z] = String.fromCharCode(Z);

    Fa = jb;
    Ja = e.BindingError = Ia("BindingError");
    Ka = e.InternalError = Ia("InternalError");

    e.count_emval_handles = function () {
      for (var a = 0, b = 5; b < W.length; ++b) void 0 !== W[b] && ++a;

      return a;
    };

    e.get_first_emval = function () {
      for (var a = 5; a < W.length; ++a) if (void 0 !== W[a]) return W[a];

      return null;
    };

    $a = e.UnboundTypeError = Ia("UnboundTypeError");
    ua.push({
      L: function () {
        kb();
      }
    });
    var mb = {
      r: function (a) {
        return lb(a + 16) + 16;
      },
      g: function () {},
      q: function (a, b, c) {
        new Da(a).N(b, c);
        throw a;
      },
      o: function (a, b, c, d, f) {
        var g = Ea(c);
        b = Q(b);
        V(a, {
          name: b,
          fromWireType: function (l) {
            return !!l;
          },
          toWireType: function (l, h) {
            return h ? d : f;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (l) {
            if (1 === c) var h = G;else if (2 === c) h = D;else if (4 === c) h = E;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[l >> g]);
          },
          F: null
        });
      },
      v: function (a, b) {
        b = Q(b);
        V(a, {
          name: b,
          fromWireType: function (c) {
            var d = W[c].value;
            Pa(c);
            return d;
          },
          toWireType: function (c, d) {
            return X(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Qa,
          F: null
        });
      },
      m: function (a, b, c) {
        c = Ea(c);
        b = Q(b);
        V(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, f) {
            if ("number" !== typeof f && "boolean" !== typeof f) throw new TypeError('Cannot convert "' + Ra(f) + '" to ' + this.name);
            return f;
          },
          argPackAdvance: 8,
          readValueFromPointer: Sa(b, c),
          F: null
        });
      },
      s: function (a, b, c, d, f, g) {
        var l = Xa(b, c);
        a = Q(a);
        f = Za(d, f);
        Wa(a, function () {
          cb("Cannot call " + a + " due to unbound types", l);
        }, b - 1);
        La(l, function (h) {
          var p = a,
              k = a;
          h = [h[0], null].concat(h.slice(1));
          var m = f,
              q = h.length;
          2 > q && U("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var x = null !== h[1] && !1, C = !1, n = 1; n < h.length; ++n) if (null !== h[n] && void 0 === h[n].F) {
            C = !0;
            break;
          }

          var Ma = "void" !== h[0].name,
              I = "",
              M = "";

          for (n = 0; n < q - 2; ++n) I += (0 !== n ? ", " : "") + "arg" + n, M += (0 !== n ? ", " : "") + "arg" + n + "Wired";

          k = "return function " + Ga(k) + "(" + I + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + k + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          C && (k += "var destructors = [];\n");
          var Na = C ? "destructors" : "null";
          I = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          m = [U, m, g, Ua, h[0], h[1]];
          x && (k += "var thisWired = classParam.toWireType(" + Na + ", this);\n");

          for (n = 0; n < q - 2; ++n) k += "var arg" + n + "Wired = argType" + n + ".toWireType(" + Na + ", arg" + n + "); // " + h[n + 2].name + "\n", I.push("argType" + n), m.push(h[n + 2]);

          x && (M = "thisWired" + (0 < M.length ? ", " : "") + M);
          k += (Ma ? "var rv = " : "") + "invoker(fn" + (0 < M.length ? ", " : "") + M + ");\n";
          if (C) k += "runDestructors(destructors);\n";else for (n = x ? 1 : 2; n < h.length; ++n) q = 1 === n ? "thisWired" : "arg" + (n - 2) + "Wired", null !== h[n].F && (k += q + "_dtor(" + q + "); // " + h[n].name + "\n", I.push(q + "_dtor"), m.push(h[n].F));
          Ma && (k += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          I.push(k + "}\n");
          h = Ta(I).apply(null, m);
          n = b - 1;
          if (!e.hasOwnProperty(p)) throw new Ka("Replacing nonexistant public symbol");
          void 0 !== e[p].D && void 0 !== n ? e[p].D[n] = h : (e[p] = h, e[p].K = n);
          return [];
        });
      },
      c: function (a, b, c, d, f) {
        function g(k) {
          return k;
        }

        b = Q(b);
        -1 === f && (f = 4294967295);
        var l = Ea(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (k) {
            return k << h >>> h;
          };
        }

        var p = -1 != b.indexOf("unsigned");
        V(a, {
          name: b,
          fromWireType: g,
          toWireType: function (k, m) {
            if ("number" !== typeof m && "boolean" !== typeof m) throw new TypeError('Cannot convert "' + Ra(m) + '" to ' + this.name);
            if (m < d || m > f) throw new TypeError('Passing a number "' + Ra(m) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + f + "]!");
            return p ? m >>> 0 : m | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: db(b, l, 0 !== d),
          F: null
        });
      },
      b: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var l = H;
          return new f(F, l[g + 1], l[g]);
        }

        var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = Q(c);
        V(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          M: !0
        });
      },
      n: function (a, b) {
        b = Q(b);
        var c = "std::string" === b;
        V(a, {
          name: b,
          fromWireType: function (d) {
            var f = H[d >> 2];
            if (c) for (var g = d + 4, l = 0; l <= f; ++l) {
              var h = d + 4 + l;

              if (l == f || 0 == A[h]) {
                if (g) {
                  for (var p = g + (h - g), k = g; !(k >= p) && A[k];) ++k;

                  g = fa.decode(A.subarray(g, k));
                } else g = "";

                if (void 0 === m) var m = g;else m += String.fromCharCode(0), m += g;
                g = h + 1;
              }
            } else {
              m = Array(f);

              for (l = 0; l < f; ++l) m[l] = String.fromCharCode(A[d + 4 + l]);

              m = m.join("");
            }
            Y(d);
            return m;
          },
          toWireType: function (d, f) {
            f instanceof ArrayBuffer && (f = new Uint8Array(f));
            var g = "string" === typeof f;
            g || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || U("Cannot pass non-string to std::string");
            var l = (c && g ? function () {
              for (var k = 0, m = 0; m < f.length; ++m) {
                var q = f.charCodeAt(m);
                55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | f.charCodeAt(++m) & 1023);
                127 >= q ? ++k : k = 2047 >= q ? k + 2 : 65535 >= q ? k + 3 : k + 4;
              }

              return k;
            } : function () {
              return f.length;
            })(),
                h = lb(4 + l + 1);
            H[h >> 2] = l;
            if (c && g) ha(f, h + 4, l + 1);else if (g) for (g = 0; g < l; ++g) {
              var p = f.charCodeAt(g);
              255 < p && (Y(h), U("String has UTF-16 code units that do not fit in 8 bits"));
              A[h + 4 + g] = p;
            } else for (g = 0; g < l; ++g) A[h + 4 + g] = f[g];
            null !== d && d.push(Y, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Qa,
          F: function (d) {
            Y(d);
          }
        });
      },
      h: function (a, b, c) {
        c = Q(c);

        if (2 === b) {
          var d = ja;
          var f = ka;
          var g = la;

          var l = function () {
            return B;
          };

          var h = 1;
        } else 4 === b && (d = ma, f = na, g = oa, l = function () {
          return H;
        }, h = 2);

        V(a, {
          name: c,
          fromWireType: function (p) {
            for (var k = H[p >> 2], m = l(), q, x = p + 4, C = 0; C <= k; ++C) {
              var n = p + 4 + C * b;
              if (C == k || 0 == m[n >> h]) x = d(x, n - x), void 0 === q ? q = x : (q += String.fromCharCode(0), q += x), x = n + b;
            }

            Y(p);
            return q;
          },
          toWireType: function (p, k) {
            "string" !== typeof k && U("Cannot pass non-string to C++ string type " + c);
            var m = g(k),
                q = lb(4 + m + b);
            H[q >> 2] = m >> h;
            f(k, q + 4, m + b);
            null !== p && p.push(Y, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Qa,
          F: function (p) {
            Y(p);
          }
        });
      },
      p: function (a, b) {
        b = Q(b);
        V(a, {
          U: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      e: Pa,
      f: function (a) {
        if (0 === a) return X(fb());
        var b = eb[a];
        a = void 0 === b ? Q(a) : b;
        return X(fb()[a]);
      },
      i: function (a) {
        4 < a && (W[a].I += 1);
      },
      j: function (a, b, c, d) {
        a || U("Cannot use deleted val. handle = " + a);
        a = W[a].value;
        var f = hb[b];

        if (!f) {
          f = "";

          for (var g = 0; g < b; ++g) f += (0 !== g ? ", " : "") + "arg" + g;

          var l = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (g = 0; g < b; ++g) l += "var argType" + g + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + g + '], "parameter ' + g + '");\nvar arg' + g + " = argType" + g + ".readValueFromPointer(args);\nargs += argType" + g + "['argPackAdvance'];\n";

          f = new Function("requireRegisteredType", "Module", "__emval_register", l + ("var obj = new constructor(" + f + ");\nreturn __emval_register(obj);\n}\n"))(gb, e, X);
          hb[b] = f;
        }

        return f(a, c, d);
      },
      k: function () {
        y();
      },
      u: function (a, b, c) {
        A.copyWithin(a, b, b + c);
      },
      d: function (a) {
        a >>>= 0;
        var b = A.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              z.grow(Math.min(2147483648, d) - F.byteLength + 65535 >>> 16);
              ra(z.buffer);
              var f = 1;
              break a;
            } catch (g) {}

            f = void 0;
          }

          if (f) return !0;
        }

        return !1;
      },
      l: function (a, b, c, d) {
        for (var f = 0, g = 0; g < c; g++) {
          for (var l = E[b + 8 * g >> 2], h = E[b + (8 * g + 4) >> 2], p = 0; p < h; p++) {
            var k = A[l + p],
                m = ib[a];

            if (0 === k || 10 === k) {
              for (k = 0; m[k] && !(NaN <= k);) ++k;

              k = fa.decode(m.subarray ? m.subarray(0, k) : new Uint8Array(m.slice(0, k)));
              (1 === a ? da : v)(k);
              m.length = 0;
            } else m.push(k);
          }

          f += h;
        }

        E[d >> 2] = f;
        return 0;
      },
      a: z,
      t: function () {}
    };

    (function () {
      function a(f) {
        e.asm = f.exports;
        J = e.asm.w;
        K--;
        e.monitorRunDependencies && e.monitorRunDependencies(K);
        0 == K && L && (f = L, L = null, f());
      }

      function b(f) {
        a(f.instance);
      }

      function c(f) {
        return Ca().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(f, function (g) {
          v("failed to asynchronously prepare wasm: " + g);
          y(g);
        });
      }

      var d = {
        a: mb
      };
      K++;
      e.monitorRunDependencies && e.monitorRunDependencies(K);
      if (e.instantiateWasm) try {
        return e.instantiateWasm(d, a);
      } catch (f) {
        return v("Module.instantiateWasm callback failed with error: " + f), !1;
      }
      (function () {
        return w || "function" !== typeof WebAssembly.instantiateStreaming || za() || "function" !== typeof fetch ? c(b) : fetch(N, {
          credentials: "same-origin"
        }).then(function (f) {
          return WebAssembly.instantiateStreaming(f, d).then(b, function (g) {
            v("wasm streaming compile failed: " + g);
            v("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(ba);
      return {};
    })();

    var kb = e.___wasm_call_ctors = function () {
      return (kb = e.___wasm_call_ctors = e.asm.x).apply(null, arguments);
    },
        Y = e._free = function () {
      return (Y = e._free = e.asm.y).apply(null, arguments);
    },
        lb = e._malloc = function () {
      return (lb = e._malloc = e.asm.z).apply(null, arguments);
    },
        bb = e.___getTypeName = function () {
      return (bb = e.___getTypeName = e.asm.A).apply(null, arguments);
    };

    e.___embind_register_native_and_builtin_types = function () {
      return (e.___embind_register_native_and_builtin_types = e.asm.B).apply(null, arguments);
    };

    e.dynCall_jiji = function () {
      return (e.dynCall_jiji = e.asm.C).apply(null, arguments);
    };

    var nb;

    L = function ob() {
      nb || pb();
      nb || (L = ob);
    };

    function pb() {
      function a() {
        if (!nb && (nb = !0, e.calledRun = !0, !ea)) {
          O(ua);
          O(va);
          aa(e);
          if (e.onRuntimeInitialized) e.onRuntimeInitialized();
          if (e.postRun) for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
            var b = e.postRun.shift();
            wa.unshift(b);
          }
          O(wa);
        }
      }

      if (!(0 < K)) {
        if (e.preRun) for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) xa();
        O(ta);
        0 < K || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            e.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    e.run = pb;
    if (e.preInit) for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) e.preInit.pop()();
    noExitRuntime = !0;
    pb();
    return wp2_dec.ready;
  };
}();

var wp2DecWasm = "wp2_dec-0c0eb80f.wasm";
let wasm;
let cachedTextDecoder = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }

  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachegetUint8ClampedMemory0 = null;

function getUint8ClampedMemory0() {
  if (cachegetUint8ClampedMemory0 === null || cachegetUint8ClampedMemory0.buffer !== wasm.memory.buffer) {
    cachegetUint8ClampedMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
  }

  return cachegetUint8ClampedMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
  return getUint8ClampedMemory0().subarray(ptr / 1, ptr / 1 + len);
}

const heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);
let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

let cachegetInt32Memory0 = null;

function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }

  return cachegetInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

function encode(data, width, height) {
  try {
    const retptr = wasm.__wbindgen_export_1.value - 16;
    wasm.__wbindgen_export_1.value = retptr;
    var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.encode(retptr, ptr0, len0, width, height);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();

    wasm.__wbindgen_free(r0, r1 * 1);

    return v1;
  } finally {
    wasm.__wbindgen_export_1.value += 16;
  }
}

function getObject(idx) {
  return heap[idx];
}

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

function decode(data) {
  var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.decode(ptr0, len0);
  return takeObject(ret);
}

async function load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return {
        instance,
        module
      };
    } else {
      return instance;
    }
  }
}

async function init(input) {
  if (typeof input === 'undefined') {
    input = import.meta.url.replace(/\.js$/, '_bg.wasm');
  }

  const imports = {};
  imports.wbg = {};

  imports.wbg.__wbg_newwithownedu8clampedarrayandsh_787b2db8ea6bfd62 = function (arg0, arg1, arg2, arg3) {
    var v0 = getClampedArrayU8FromWasm0(arg0, arg1).slice();

    wasm.__wbindgen_free(arg0, arg1 * 1);

    var ret = new ImageData(v0, arg2 >>> 0, arg3 >>> 0);
    return addHeapObject(ret);
  };

  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };

  if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
    input = fetch(input);
  }

  const {
    instance,
    module
  } = await load(await input, imports);
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  return wasm;
}

var pngEncDecWasm = "squoosh_png_bg-29e36628.wasm";
let wasm$1;
let cachedTextDecoder$1 = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder$1.decode();
let cachegetUint8Memory0$1 = null;

function getUint8Memory0$1() {
  if (cachegetUint8Memory0$1 === null || cachegetUint8Memory0$1.buffer !== wasm$1.memory.buffer) {
    cachegetUint8Memory0$1 = new Uint8Array(wasm$1.memory.buffer);
  }

  return cachegetUint8Memory0$1;
}

function getStringFromWasm0$1(ptr, len) {
  return cachedTextDecoder$1.decode(getUint8Memory0$1().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN$1 = 0;

function passArray8ToWasm0$1(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0$1().set(arg, ptr / 1);
  WASM_VECTOR_LEN$1 = arg.length;
  return ptr;
}

let cachegetInt32Memory0$1 = null;

function getInt32Memory0$1() {
  if (cachegetInt32Memory0$1 === null || cachegetInt32Memory0$1.buffer !== wasm$1.memory.buffer) {
    cachegetInt32Memory0$1 = new Int32Array(wasm$1.memory.buffer);
  }

  return cachegetInt32Memory0$1;
}

function getArrayU8FromWasm0$1(ptr, len) {
  return getUint8Memory0$1().subarray(ptr / 1, ptr / 1 + len);
}

function optimise(data, level) {
  try {
    const retptr = wasm$1.__wbindgen_export_0.value - 16;
    wasm$1.__wbindgen_export_0.value = retptr;
    var ptr0 = passArray8ToWasm0$1(data, wasm$1.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN$1;
    wasm$1.optimise(retptr, ptr0, len0, level);
    var r0 = getInt32Memory0$1()[retptr / 4 + 0];
    var r1 = getInt32Memory0$1()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0$1(r0, r1).slice();

    wasm$1.__wbindgen_free(r0, r1 * 1);

    return v1;
  } finally {
    wasm$1.__wbindgen_export_0.value += 16;
  }
}

async function load$1(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return {
        instance,
        module
      };
    } else {
      return instance;
    }
  }
}

async function init$1(input) {
  if (typeof input === 'undefined') {
    input = import.meta.url.replace(/\.js$/, '_bg.wasm');
  }

  const imports = {};
  imports.wbg = {};

  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0$1(arg0, arg1));
  };

  if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
    input = fetch(input);
  }

  const {
    instance,
    module
  } = await load$1(await input, imports);
  wasm$1 = instance.exports;
  init$1.__wbindgen_wasm_module = module;
  return wasm$1;
}

var oxipngWasm = "squoosh_oxipng_bg-7f806c61.wasm";
let wasm$2;
let cachegetUint8Memory0$2 = null;

function getUint8Memory0$2() {
  if (cachegetUint8Memory0$2 === null || cachegetUint8Memory0$2.buffer !== wasm$2.memory.buffer) {
    cachegetUint8Memory0$2 = new Uint8Array(wasm$2.memory.buffer);
  }

  return cachegetUint8Memory0$2;
}

let WASM_VECTOR_LEN$2 = 0;

function passArray8ToWasm0$2(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0$2().set(arg, ptr / 1);
  WASM_VECTOR_LEN$2 = arg.length;
  return ptr;
}

let cachegetInt32Memory0$2 = null;

function getInt32Memory0$2() {
  if (cachegetInt32Memory0$2 === null || cachegetInt32Memory0$2.buffer !== wasm$2.memory.buffer) {
    cachegetInt32Memory0$2 = new Int32Array(wasm$2.memory.buffer);
  }

  return cachegetInt32Memory0$2;
}

function getArrayU8FromWasm0$2(ptr, len) {
  return getUint8Memory0$2().subarray(ptr / 1, ptr / 1 + len);
}

function resize(input_image, input_width, input_height, output_width, output_height, typ_idx, premultiply, color_space_conversion) {
  var ptr0 = passArray8ToWasm0$2(input_image, wasm$2.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN$2;
  wasm$2.resize(8, ptr0, len0, input_width, input_height, output_width, output_height, typ_idx, premultiply, color_space_conversion);
  var r0 = getInt32Memory0$2()[8 / 4 + 0];
  var r1 = getInt32Memory0$2()[8 / 4 + 1];
  var v1 = getArrayU8FromWasm0$2(r0, r1).slice();

  wasm$2.__wbindgen_free(r0, r1 * 1);

  return v1;
}

async function load$2(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return {
        instance,
        module
      };
    } else {
      return instance;
    }
  }
}

async function init$2(input) {
  if (typeof input === 'undefined') {
    input = import.meta.url.replace(/\.js$/, '_bg.wasm');
  }

  const imports = {};

  if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
    input = fetch(input);
  }

  const {
    instance,
    module
  } = await load$2(await input, imports);
  wasm$2 = instance.exports;
  init$2.__wbindgen_wasm_module = module;
  return wasm$2;
}

var resizeWasm = "squoosh_resize_bg-74a0d71f.wasm";
var rotateWasm = "rotate-e8fb6784.wasm";

var Module$4 = function () {
  var _scriptDir = import.meta.url;
  return function (Module) {
    Module = Module || {};
    var e;
    e || (e = typeof Module !== 'undefined' ? Module : {});
    var aa, r;
    e.ready = new Promise(function (a, b) {
      aa = a;
      r = b;
    });
    var t = {},
        u;

    for (u in e) e.hasOwnProperty(u) && (t[u] = e[u]);

    var v = "",
        ba;
    v = self.location.href;
    _scriptDir && (v = _scriptDir);
    0 !== v.indexOf("blob:") ? v = v.substr(0, v.lastIndexOf("/") + 1) : v = "";

    ba = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };

    var ca = e.print || console.log.bind(console),
        w = e.printErr || console.warn.bind(console);

    for (u in t) t.hasOwnProperty(u) && (e[u] = t[u]);

    t = null;
    var y;
    e.wasmBinary && (y = e.wasmBinary);
    var noExitRuntime;
    e.noExitRuntime && (noExitRuntime = e.noExitRuntime);
    "object" !== typeof WebAssembly && z("no native wasm support detected");
    var A,
        da = !1,
        ea = new TextDecoder("utf8");

    function fa(a, b, c) {
      var d = B;

      if (0 < c) {
        c = b + c - 1;

        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);

          if (55296 <= g && 57343 >= g) {
            var l = a.charCodeAt(++f);
            g = 65536 + ((g & 1023) << 10) | l & 1023;
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

    var ha = new TextDecoder("utf-16le");

    function ia(a, b) {
      var c = a >> 1;

      for (b = c + b / 2; !(c >= b) && D[c];) ++c;

      return ha.decode(B.subarray(a, c << 1));
    }

    function ja(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;

      for (var f = 0; f < c; ++f) E[b >> 1] = a.charCodeAt(f), b += 2;

      E[b >> 1] = 0;
      return b - d;
    }

    function ka(a) {
      return 2 * a.length;
    }

    function la(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4);) {
        var f = F[a + 4 * c >> 2];
        if (0 == f) break;
        ++c;
        65536 <= f ? (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : d += String.fromCharCode(f);
      }

      return d;
    }

    function ma(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;

      for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);

        if (55296 <= g && 57343 >= g) {
          var l = a.charCodeAt(++f);
          g = 65536 + ((g & 1023) << 10) | l & 1023;
        }

        F[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }

      F[b >> 2] = 0;
      return b - d;
    }

    function na(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }

      return b;
    }

    var G, oa, B, E, D, F, H, pa, qa;

    function ra(a) {
      G = a;
      e.HEAP8 = oa = new Int8Array(a);
      e.HEAP16 = E = new Int16Array(a);
      e.HEAP32 = F = new Int32Array(a);
      e.HEAPU8 = B = new Uint8Array(a);
      e.HEAPU16 = D = new Uint16Array(a);
      e.HEAPU32 = H = new Uint32Array(a);
      e.HEAPF32 = pa = new Float32Array(a);
      e.HEAPF64 = qa = new Float64Array(a);
    }

    var sa = e.INITIAL_MEMORY || 16777216;
    e.wasmMemory ? A = e.wasmMemory : A = new WebAssembly.Memory({
      initial: sa / 65536,
      maximum: 32768
    });
    A && (G = A.buffer);
    sa = G.byteLength;
    ra(G);
    var J,
        ta = [],
        ua = [],
        va = [],
        wa = [];

    function xa() {
      var a = e.preRun.shift();
      ta.unshift(a);
    }

    var K = 0,
        L = null;
    e.preloadedImages = {};
    e.preloadedAudios = {};

    function z(a) {
      if (e.onAbort) e.onAbort(a);
      w(a);
      da = !0;
      a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      r(a);
      throw a;
    }

    function za() {
      var a = N;
      return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,");
    }

    var N = "imagequant.wasm";

    if (!za()) {
      var Aa = N;
      N = e.locateFile ? e.locateFile(Aa, v) : v + Aa;
    }

    function Ba() {
      try {
        if (y) return new Uint8Array(y);
        if (ba) return ba(N);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        z(a);
      }
    }

    function Ca() {
      return y || "function" !== typeof fetch ? Promise.resolve().then(Ba) : fetch(N, {
        credentials: "same-origin"
      }).then(function (a) {
        if (!a.ok) throw "failed to load wasm binary file at '" + N + "'";
        return a.arrayBuffer();
      }).catch(function () {
        return Ba();
      });
    }

    function O(a) {
      for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(e);else {
          var c = b.J;
          "number" === typeof c ? void 0 === b.G ? J.get(c)() : J.get(c)(b.G) : c(void 0 === b.G ? null : b.G);
        }
      }
    }

    function Da(a) {
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

    var Ea = void 0;

    function P(a) {
      for (var b = ""; B[a];) b += Ea[B[a++]];

      return b;
    }

    var Q = {},
        R = {},
        S = {};

    function Fa(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }

    function Ga(a, b) {
      a = Fa(a);
      return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
    }

    function Ha(a) {
      var b = Error,
          c = Ga(a, function (d) {
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

    var Ia = void 0;

    function T(a) {
      throw new Ia(a);
    }

    var Ja = void 0;

    function Ka(a, b) {
      function c(h) {
        h = b(h);
        if (h.length !== d.length) throw new Ja("Mismatched type converter count");

        for (var p = 0; p < d.length; ++p) U(d[p], h[p]);
      }

      var d = [];
      d.forEach(function (h) {
        S[h] = a;
      });
      var f = Array(a.length),
          g = [],
          l = 0;
      a.forEach(function (h, p) {
        R.hasOwnProperty(h) ? f[p] = R[h] : (g.push(h), Q.hasOwnProperty(h) || (Q[h] = []), Q[h].push(function () {
          f[p] = R[h];
          ++l;
          l === g.length && c(f);
        }));
      });
      0 === g.length && c(f);
    }

    function U(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      var d = b.name;
      a || T('type "' + d + '" must have a positive integer typeid pointer');

      if (R.hasOwnProperty(a)) {
        if (c.K) return;
        T("Cannot register type '" + d + "' twice");
      }

      R[a] = b;
      delete S[a];
      Q.hasOwnProperty(a) && (b = Q[a], delete Q[a], b.forEach(function (f) {
        f();
      }));
    }

    var Na = [],
        V = [{}, {
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    }];

    function Oa(a) {
      4 < a && 0 === --V[a].H && (V[a] = void 0, Na.push(a));
    }

    function W(a) {
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
          var b = Na.length ? Na.pop() : V.length;
          V[b] = {
            H: 1,
            value: a
          };
          return b;
      }
    }

    function Pa(a) {
      return this.fromWireType(H[a >> 2]);
    }

    function Qa(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }

    function Ra(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(pa[c >> 2]);
          };

        case 3:
          return function (c) {
            return this.fromWireType(qa[c >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }

    function Sa(a) {
      var b = Function;
      if (!(b instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
      var c = Ga(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }

    function Ta(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }

    function Ua(a, b) {
      var c = e;

      if (void 0 === c[a].D) {
        var d = c[a];

        c[a] = function () {
          c[a].D.hasOwnProperty(arguments.length) || T("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].D + ")!");
          return c[a].D[arguments.length].apply(this, arguments);
        };

        c[a].D = [];
        c[a].D[d.I] = d;
      }
    }

    function Va(a, b, c) {
      e.hasOwnProperty(a) ? ((void 0 === c || void 0 !== e[a].D && void 0 !== e[a].D[c]) && T("Cannot register public name '" + a + "' twice"), Ua(a, a), e.hasOwnProperty(c) && T("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), e[a].D[c] = b) : (e[a] = b, void 0 !== c && (e[a].M = c));
    }

    function Wa(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(F[(b >> 2) + d]);

      return c;
    }

    function Xa(a, b) {
      0 <= a.indexOf("j") || z("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;

        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];

        var f;
        -1 != a.indexOf("j") ? f = c && c.length ? e["dynCall_" + a].apply(null, [b].concat(c)) : e["dynCall_" + a].call(null, b) : f = J.get(b).apply(null, c);
        return f;
      };
    }

    function Ya(a, b) {
      a = P(a);
      var c = -1 != a.indexOf("j") ? Xa(a, b) : J.get(b);
      "function" !== typeof c && T("unknown function pointer with signature " + a + ": " + b);
      return c;
    }

    var Za = void 0;

    function $a(a) {
      a = ab(a);
      var b = P(a);
      X(a);
      return b;
    }

    function bb(a, b) {
      function c(g) {
        f[g] || R[g] || (S[g] ? S[g].forEach(c) : (d.push(g), f[g] = !0));
      }

      var d = [],
          f = {};
      b.forEach(c);
      throw new Za(a + ": " + d.map($a).join([", "]));
    }

    function cb(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return oa[d];
          } : function (d) {
            return B[d];
          };

        case 1:
          return c ? function (d) {
            return E[d >> 1];
          } : function (d) {
            return D[d >> 1];
          };

        case 2:
          return c ? function (d) {
            return F[d >> 2];
          } : function (d) {
            return H[d >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }

    var db = {};

    function eb() {
      return "object" === typeof globalThis ? globalThis : Function("return this")();
    }

    function fb(a, b) {
      var c = R[a];
      void 0 === c && T(b + " has unknown type " + $a(a));
      return c;
    }

    for (var gb = {}, hb = [null, [], []], ib = Array(256), Y = 0; 256 > Y; ++Y) ib[Y] = String.fromCharCode(Y);

    Ea = ib;
    Ia = e.BindingError = Ha("BindingError");
    Ja = e.InternalError = Ha("InternalError");

    e.count_emval_handles = function () {
      for (var a = 0, b = 5; b < V.length; ++b) void 0 !== V[b] && ++a;

      return a;
    };

    e.get_first_emval = function () {
      for (var a = 5; a < V.length; ++a) if (void 0 !== V[a]) return V[a];

      return null;
    };

    Za = e.UnboundTypeError = Ha("UnboundTypeError");
    ua.push({
      J: function () {
        jb();
      }
    });
    var lb = {
      o: function () {},
      p: function (a, b, c, d, f) {
        var g = Da(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (l) {
            return !!l;
          },
          toWireType: function (l, h) {
            return h ? d : f;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (l) {
            if (1 === c) var h = oa;else if (2 === c) h = E;else if (4 === c) h = F;else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(h[l >> g]);
          },
          F: null
        });
      },
      v: function (a, b) {
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (c) {
            var d = V[c].value;
            Oa(c);
            return d;
          },
          toWireType: function (c, d) {
            return W(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Pa,
          F: null
        });
      },
      n: function (a, b, c) {
        c = Da(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, f) {
            if ("number" !== typeof f && "boolean" !== typeof f) throw new TypeError('Cannot convert "' + Qa(f) + '" to ' + this.name);
            return f;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ra(b, c),
          F: null
        });
      },
      e: function (a, b, c, d, f, g) {
        var l = Wa(b, c);
        a = P(a);
        f = Ya(d, f);
        Va(a, function () {
          bb("Cannot call " + a + " due to unbound types", l);
        }, b - 1);
        Ka(l, function (h) {
          var p = a,
              k = a;
          h = [h[0], null].concat(h.slice(1));
          var m = f,
              q = h.length;
          2 > q && T("argTypes array size mismatch! Must at least get return value and 'this' types!");

          for (var x = null !== h[1] && !1, C = !1, n = 1; n < h.length; ++n) if (null !== h[n] && void 0 === h[n].F) {
            C = !0;
            break;
          }

          var La = "void" !== h[0].name,
              I = "",
              M = "";

          for (n = 0; n < q - 2; ++n) I += (0 !== n ? ", " : "") + "arg" + n, M += (0 !== n ? ", " : "") + "arg" + n + "Wired";

          k = "return function " + Fa(k) + "(" + I + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + k + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          C && (k += "var destructors = [];\n");
          var Ma = C ? "destructors" : "null";
          I = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          m = [T, m, g, Ta, h[0], h[1]];
          x && (k += "var thisWired = classParam.toWireType(" + Ma + ", this);\n");

          for (n = 0; n < q - 2; ++n) k += "var arg" + n + "Wired = argType" + n + ".toWireType(" + Ma + ", arg" + n + "); // " + h[n + 2].name + "\n", I.push("argType" + n), m.push(h[n + 2]);

          x && (M = "thisWired" + (0 < M.length ? ", " : "") + M);
          k += (La ? "var rv = " : "") + "invoker(fn" + (0 < M.length ? ", " : "") + M + ");\n";
          if (C) k += "runDestructors(destructors);\n";else for (n = x ? 1 : 2; n < h.length; ++n) q = 1 === n ? "thisWired" : "arg" + (n - 2) + "Wired", null !== h[n].F && (k += q + "_dtor(" + q + "); // " + h[n].name + "\n", I.push(q + "_dtor"), m.push(h[n].F));
          La && (k += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          I.push(k + "}\n");
          h = Sa(I).apply(null, m);
          n = b - 1;
          if (!e.hasOwnProperty(p)) throw new Ja("Replacing nonexistant public symbol");
          void 0 !== e[p].D && void 0 !== n ? e[p].D[n] = h : (e[p] = h, e[p].I = n);
          return [];
        });
      },
      c: function (a, b, c, d, f) {
        function g(k) {
          return k;
        }

        b = P(b);
        -1 === f && (f = 4294967295);
        var l = Da(c);

        if (0 === d) {
          var h = 32 - 8 * c;

          g = function (k) {
            return k << h >>> h;
          };
        }

        var p = -1 != b.indexOf("unsigned");
        U(a, {
          name: b,
          fromWireType: g,
          toWireType: function (k, m) {
            if ("number" !== typeof m && "boolean" !== typeof m) throw new TypeError('Cannot convert "' + Qa(m) + '" to ' + this.name);
            if (m < d || m > f) throw new TypeError('Passing a number "' + Qa(m) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + d + ", " + f + "]!");
            return p ? m >>> 0 : m | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: cb(b, l, 0 !== d),
          F: null
        });
      },
      b: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var l = H;
          return new f(G, l[g + 1], l[g]);
        }

        var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = P(c);
        U(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          K: !0
        });
      },
      i: function (a, b) {
        b = P(b);
        var c = "std::string" === b;
        U(a, {
          name: b,
          fromWireType: function (d) {
            var f = H[d >> 2];
            if (c) for (var g = d + 4, l = 0; l <= f; ++l) {
              var h = d + 4 + l;

              if (l == f || 0 == B[h]) {
                if (g) {
                  for (var p = g + (h - g), k = g; !(k >= p) && B[k];) ++k;

                  g = ea.decode(B.subarray(g, k));
                } else g = "";

                if (void 0 === m) var m = g;else m += String.fromCharCode(0), m += g;
                g = h + 1;
              }
            } else {
              m = Array(f);

              for (l = 0; l < f; ++l) m[l] = String.fromCharCode(B[d + 4 + l]);

              m = m.join("");
            }
            X(d);
            return m;
          },
          toWireType: function (d, f) {
            f instanceof ArrayBuffer && (f = new Uint8Array(f));
            var g = "string" === typeof f;
            g || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || T("Cannot pass non-string to std::string");
            var l = (c && g ? function () {
              for (var k = 0, m = 0; m < f.length; ++m) {
                var q = f.charCodeAt(m);
                55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | f.charCodeAt(++m) & 1023);
                127 >= q ? ++k : k = 2047 >= q ? k + 2 : 65535 >= q ? k + 3 : k + 4;
              }

              return k;
            } : function () {
              return f.length;
            })(),
                h = kb(4 + l + 1);
            H[h >> 2] = l;
            if (c && g) fa(f, h + 4, l + 1);else if (g) for (g = 0; g < l; ++g) {
              var p = f.charCodeAt(g);
              255 < p && (X(h), T("String has UTF-16 code units that do not fit in 8 bits"));
              B[h + 4 + g] = p;
            } else for (g = 0; g < l; ++g) B[h + 4 + g] = f[g];
            null !== d && d.push(X, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Pa,
          F: function (d) {
            X(d);
          }
        });
      },
      g: function (a, b, c) {
        c = P(c);

        if (2 === b) {
          var d = ia;
          var f = ja;
          var g = ka;

          var l = function () {
            return D;
          };

          var h = 1;
        } else 4 === b && (d = la, f = ma, g = na, l = function () {
          return H;
        }, h = 2);

        U(a, {
          name: c,
          fromWireType: function (p) {
            for (var k = H[p >> 2], m = l(), q, x = p + 4, C = 0; C <= k; ++C) {
              var n = p + 4 + C * b;
              if (C == k || 0 == m[n >> h]) x = d(x, n - x), void 0 === q ? q = x : (q += String.fromCharCode(0), q += x), x = n + b;
            }

            X(p);
            return q;
          },
          toWireType: function (p, k) {
            "string" !== typeof k && T("Cannot pass non-string to C++ string type " + c);
            var m = g(k),
                q = kb(4 + m + b);
            H[q >> 2] = m >> h;
            f(k, q + 4, m + b);
            null !== p && p.push(X, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Pa,
          F: function (p) {
            X(p);
          }
        });
      },
      q: function (a, b) {
        b = P(b);
        U(a, {
          L: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      f: Oa,
      l: function (a) {
        if (0 === a) return W(eb());
        var b = db[a];
        a = void 0 === b ? P(a) : b;
        return W(eb()[a]);
      },
      j: function (a) {
        4 < a && (V[a].H += 1);
      },
      k: function (a, b, c, d) {
        a || T("Cannot use deleted val. handle = " + a);
        a = V[a].value;
        var f = gb[b];

        if (!f) {
          f = "";

          for (var g = 0; g < b; ++g) f += (0 !== g ? ", " : "") + "arg" + g;

          var l = "return function emval_allocator_" + b + "(constructor, argTypes, args) {\n";

          for (g = 0; g < b; ++g) l += "var argType" + g + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + g + '], "parameter ' + g + '");\nvar arg' + g + " = argType" + g + ".readValueFromPointer(args);\nargs += argType" + g + "['argPackAdvance'];\n";

          f = new Function("requireRegisteredType", "Module", "__emval_register", l + ("var obj = new constructor(" + f + ");\nreturn __emval_register(obj);\n}\n"))(fb, e, W);
          gb[b] = f;
        }

        return f(a, c, d);
      },
      h: function () {
        z();
      },
      t: function (a, b, c) {
        B.copyWithin(a, b, b + c);
      },
      d: function (a) {
        a >>>= 0;
        var b = B.length;
        if (2147483648 < a) return !1;

        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + .2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - d % 65536);

          a: {
            try {
              A.grow(Math.min(2147483648, d) - G.byteLength + 65535 >>> 16);
              ra(A.buffer);
              var f = 1;
              break a;
            } catch (g) {}

            f = void 0;
          }

          if (f) return !0;
        }

        return !1;
      },
      u: function () {
        return 0;
      },
      r: function () {},
      m: function (a, b, c, d) {
        for (var f = 0, g = 0; g < c; g++) {
          for (var l = F[b + 8 * g >> 2], h = F[b + (8 * g + 4) >> 2], p = 0; p < h; p++) {
            var k = B[l + p],
                m = hb[a];

            if (0 === k || 10 === k) {
              for (k = 0; m[k] && !(NaN <= k);) ++k;

              k = ea.decode(m.subarray ? m.subarray(0, k) : new Uint8Array(m.slice(0, k)));
              (1 === a ? ca : w)(k);
              m.length = 0;
            } else m.push(k);
          }

          f += h;
        }

        F[d >> 2] = f;
        return 0;
      },
      a: A,
      s: function () {}
    };

    (function () {
      function a(f) {
        e.asm = f.exports;
        J = e.asm.w;
        K--;
        e.monitorRunDependencies && e.monitorRunDependencies(K);
        0 == K && L && (f = L, L = null, f());
      }

      function b(f) {
        a(f.instance);
      }

      function c(f) {
        return Ca().then(function (g) {
          return WebAssembly.instantiate(g, d);
        }).then(f, function (g) {
          w("failed to asynchronously prepare wasm: " + g);
          z(g);
        });
      }

      var d = {
        a: lb
      };
      K++;
      e.monitorRunDependencies && e.monitorRunDependencies(K);
      if (e.instantiateWasm) try {
        return e.instantiateWasm(d, a);
      } catch (f) {
        return w("Module.instantiateWasm callback failed with error: " + f), !1;
      }
      (function () {
        return y || "function" !== typeof WebAssembly.instantiateStreaming || za() || "function" !== typeof fetch ? c(b) : fetch(N, {
          credentials: "same-origin"
        }).then(function (f) {
          return WebAssembly.instantiateStreaming(f, d).then(b, function (g) {
            w("wasm streaming compile failed: " + g);
            w("falling back to ArrayBuffer instantiation");
            return c(b);
          });
        });
      })().catch(r);
      return {};
    })();

    var jb = e.___wasm_call_ctors = function () {
      return (jb = e.___wasm_call_ctors = e.asm.x).apply(null, arguments);
    },
        kb = e._malloc = function () {
      return (kb = e._malloc = e.asm.y).apply(null, arguments);
    },
        X = e._free = function () {
      return (X = e._free = e.asm.z).apply(null, arguments);
    },
        ab = e.___getTypeName = function () {
      return (ab = e.___getTypeName = e.asm.A).apply(null, arguments);
    };

    e.___embind_register_native_and_builtin_types = function () {
      return (e.___embind_register_native_and_builtin_types = e.asm.B).apply(null, arguments);
    };

    e.dynCall_jiji = function () {
      return (e.dynCall_jiji = e.asm.C).apply(null, arguments);
    };

    var Z;

    L = function mb() {
      Z || nb();
      Z || (L = mb);
    };

    function nb() {
      function a() {
        if (!Z && (Z = !0, e.calledRun = !0, !da)) {
          O(ua);
          O(va);
          aa(e);
          if (e.onRuntimeInitialized) e.onRuntimeInitialized();
          if (e.postRun) for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) {
            var b = e.postRun.shift();
            wa.unshift(b);
          }
          O(wa);
        }
      }

      if (!(0 < K)) {
        if (e.preRun) for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) xa();
        O(ta);
        0 < K || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            e.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }

    e.run = nb;
    if (e.preInit) for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) e.preInit.pop()();
    noExitRuntime = !0;
    nb();
    return Module.ready;
  };
}();

var imageQuantWasm = "imagequant-7e6412dc.wasm";

class ImageData$1 {
  constructor(data, width, height) {
    this.data = data;
    this.width = width;
    this.height = height;
  }

}

const pngEncDecPromise = init(fetch(pathify(pngEncDecWasm)));
const oxipngPromise = init$1(fetch(pathify(oxipngWasm)));
const resizePromise = init$2(fetch(pathify(resizeWasm)));
const imageQuantPromise = instantiateEmscriptenWasm(Module$4, imageQuantWasm);
globalThis.ImageData = ImageData$1;

function resizeNameToIndex(name) {
  switch (name) {
    case 'triangle':
      return 0;

    case 'catrom':
      return 1;

    case 'mitchell':
      return 2;

    case 'lanczos3':
      return 3;

    default:
      throw Error(`Unknown resize algorithm "${name}"`);
  }
}

function resizeWithAspect({
  input_width,
  input_height,
  target_width,
  target_height
}) {
  if (!target_width && !target_height) {
    throw Error('Need to specify at least width or height when resizing');
  }

  if (target_width && target_height) {
    return {
      width: target_width,
      height: target_height
    };
  }

  if (!target_width) {
    return {
      width: Math.round(input_width / input_height * target_height),
      height: target_height
    };
  }

  if (!target_height) {
    return {
      width: target_width,
      height: Math.round(input_height / input_width * target_width)
    };
  }
}

const preprocessors = {
  resize: {
    name: 'Resize',
    description: 'Resize the image before compressing',
    instantiate: async () => {
      await resizePromise;
      return (buffer, input_width, input_height, {
        width,
        height,
        method,
        premultiply,
        linearRGB
      }) => {
        ({
          width,
          height
        } = resizeWithAspect({
          input_width,
          input_height,
          target_width: width,
          target_height: height
        }));
        return new ImageData$1(resize(buffer, input_width, input_height, width, height, resizeNameToIndex(method), premultiply, linearRGB), width, height);
      };
    },
    defaultOptions: {
      method: 'lanczos3',
      fitMethod: 'stretch',
      premultiply: true,
      linearRGB: true
    }
  },
  quant: {
    name: 'ImageQuant',
    description: 'Reduce the number of colors used (aka. paletting)',
    instantiate: async () => {
      const imageQuant = await imageQuantPromise;
      return (buffer, width, height, {
        numColors,
        dither
      }) => new ImageData$1(imageQuant.quantize(buffer, width, height, numColors, dither), width, height);
    },
    defaultOptions: {
      numColors: 255,
      dither: 1.0
    }
  },
  rotate: {
    name: 'Rotate',
    description: 'Rotate image',
    instantiate: async () => {
      return async (buffer, width, height, {
        numRotations
      }) => {
        const degrees = numRotations * 90 % 360;
        const sameDimensions = degrees == 0 || degrees == 180;
        const size = width * height * 4;
        const {
          instance
        } = await WebAssembly.instantiate(await fetch(pathify(rotateWasm)));
        const {
          memory
        } = instance.exports;
        const additionalPagesNeeded = Math.ceil((size * 2 - memory.buffer.byteLength + 8) / (64 * 1024));

        if (additionalPagesNeeded > 0) {
          memory.grow(additionalPagesNeeded);
        }

        const view = new Uint8ClampedArray(memory.buffer);
        view.set(buffer, 8);
        instance.exports.rotate(width, height, degrees);
        return new ImageData$1(view.slice(size + 8, size * 2 + 8), sameDimensions ? width : height, sameDimensions ? height : width);
      };
    },
    defaultOptions: {
      numRotations: 0
    }
  }
};
const codecs = {
  mozjpeg: {
    name: 'MozJPEG',
    extension: 'jpg',
    detectors: [/^\xFF\xD8\xFF/],
    dec: () => instantiateEmscriptenWasm(Module$1, mozDecWasm),
    enc: () => instantiateEmscriptenWasm(Module, mozEncWasm),
    defaultEncoderOptions: {
      quality: 75,
      baseline: false,
      arithmetic: false,
      progressive: true,
      optimize_coding: true,
      smoothing: 0,
      color_space: 3,
      quant_table: 3,
      trellis_multipass: false,
      trellis_opt_zero: false,
      trellis_opt_table: false,
      trellis_loops: 1,
      auto_subsample: true,
      chroma_subsample: 2,
      separate_chroma_quality: false,
      chroma_quality: 75
    },
    autoOptimize: {
      option: 'quality',
      min: 0,
      max: 100
    }
  },
  webp: {
    name: 'WebP',
    extension: 'webp',
    detectors: [/^RIFF....WEBPVP8[LX ]/],
    dec: () => instantiateEmscriptenWasm(Module$3, webpDecWasm),
    enc: () => instantiateEmscriptenWasm(Module$2, webpEncWasm),
    defaultEncoderOptions: {
      quality: 75,
      target_size: 0,
      target_PSNR: 0,
      method: 4,
      sns_strength: 50,
      filter_strength: 60,
      filter_sharpness: 0,
      filter_type: 1,
      partitions: 0,
      segments: 4,
      pass: 1,
      show_compressed: 0,
      preprocessing: 0,
      autofilter: 0,
      partition_limit: 0,
      alpha_compression: 1,
      alpha_filtering: 1,
      alpha_quality: 100,
      lossless: 0,
      exact: 0,
      image_hint: 0,
      emulate_jpeg_size: 0,
      thread_level: 0,
      low_memory: 0,
      near_lossless: 100,
      use_delta_palette: 0,
      use_sharp_yuv: 0
    },
    autoOptimize: {
      option: 'quality',
      min: 0,
      max: 100
    }
  },
  avif: {
    name: 'AVIF',
    extension: 'avif',
    detectors: [/^\x00\x00\x00 ftypavif\x00\x00\x00\x00/],
    dec: () => instantiateEmscriptenWasm(avif_dec, avifDecWasm),
    enc: () => instantiateEmscriptenWasm(avif_enc, avifEncWasm),
    defaultEncoderOptions: {
      cqLevel: 33,
      minQuantizer: 33,
      maxQuantizer: 63,
      minQuantizerAlpha: 33,
      cqAlphaLevel: -1,
      denoiseLevel: 0,
      maxQuantizerAlpha: 63,
      tileColsLog2: 0,
      tileRowsLog2: 0,
      speed: 8,
      subsample: 1,
      chromaDeltaQ: false,
      sharpness: 0,
      targetSsim: false
    },
    autoOptimize: {
      option: 'maxQuantizer',
      min: 0,
      max: 62
    }
  },
  jxl: {
    name: 'JPEG-XL',
    extension: 'jxl',
    detectors: [/^\xff\x0a/],
    dec: () => instantiateEmscriptenWasm(jxl_dec, jxlDecWasm),
    enc: () => instantiateEmscriptenWasm(jxl_enc, jxlEncWasm),
    defaultEncoderOptions: {
      speed: 4,
      quality: 75,
      progressive: false,
      epf: -1,
      nearLossless: 0,
      lossyPalette: false
    },
    autoOptimize: {
      option: 'quality',
      min: 0,
      max: 100
    }
  },
  wp2: {
    name: 'WebP2',
    extension: 'wp2',
    detectors: [/^\xF4\xFF\x6F/],
    dec: () => instantiateEmscriptenWasm(wp2_dec, wp2DecWasm),
    enc: () => instantiateEmscriptenWasm(wp2_enc, wp2EncWasm),
    defaultEncoderOptions: {
      quality: 75,
      alpha_quality: 75,
      effort: 5,
      pass: 1,
      sns: 50,
      uv_mode: 0,
      csp_type: 0,
      error_diffusion: 0,
      use_random_matrix: false
    },
    autoOptimize: {
      option: 'quality',
      min: 0,
      max: 100
    }
  },
  oxipng: {
    name: 'OxiPNG',
    extension: 'png',
    detectors: [/^\x89PNG\x0D\x0A\x1A\x0A/],
    dec: async () => {
      await pngEncDecPromise;
      return {
        decode: decode
      };
    },
    enc: async () => {
      await pngEncDecPromise;
      await oxipngPromise;
      return {
        encode: (buffer, width, height, opts) => {
          const simplePng = encode(new Uint8Array(buffer), width, height);
          return optimise(simplePng, opts.level);
        }
      };
    },
    defaultEncoderOptions: {
      level: 2
    },
    autoOptimize: {
      option: 'level',
      min: 6,
      max: 1
    }
  }
};
var SymbolPolyfill = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol : function (description) {
  return "Symbol(" + description + ")";
};

function noop() {}

function getGlobals() {
  if (typeof self !== 'undefined') {
    return self;
  } else if (typeof window !== 'undefined') {
    return window;
  } else if (typeof global !== 'undefined') {
    return global;
  }

  return undefined;
}

var globals = getGlobals();

function typeIsObject(x) {
  return typeof x === 'object' && x !== null || typeof x === 'function';
}

var rethrowAssertionErrorRejection = noop;
var originalPromise = Promise;
var originalPromiseThen = Promise.prototype.then;
var originalPromiseResolve = Promise.resolve.bind(originalPromise);
var originalPromiseReject = Promise.reject.bind(originalPromise);

function newPromise(executor) {
  return new originalPromise(executor);
}

function promiseResolvedWith(value) {
  return originalPromiseResolve(value);
}

function promiseRejectedWith(reason) {
  return originalPromiseReject(reason);
}

function PerformPromiseThen(promise, onFulfilled, onRejected) {
  return originalPromiseThen.call(promise, onFulfilled, onRejected);
}

function uponPromise(promise, onFulfilled, onRejected) {
  PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), undefined, rethrowAssertionErrorRejection);
}

function uponFulfillment(promise, onFulfilled) {
  uponPromise(promise, onFulfilled);
}

function uponRejection(promise, onRejected) {
  uponPromise(promise, undefined, onRejected);
}

function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
  return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
}

function setPromiseIsHandledToTrue(promise) {
  PerformPromiseThen(promise, undefined, rethrowAssertionErrorRejection);
}

var queueMicrotask = function () {
  var globalQueueMicrotask = globals && globals.queueMicrotask;

  if (typeof globalQueueMicrotask === 'function') {
    return globalQueueMicrotask;
  }

  var resolvedPromise = promiseResolvedWith(undefined);
  return function (fn) {
    return PerformPromiseThen(resolvedPromise, fn);
  };
}();

function reflectCall(F, V, args) {
  if (typeof F !== 'function') {
    throw new TypeError('Argument is not a function');
  }

  return Function.prototype.apply.call(F, V, args);
}

function promiseCall(F, V, args) {
  try {
    return promiseResolvedWith(reflectCall(F, V, args));
  } catch (value) {
    return promiseRejectedWith(value);
  }
}

var QUEUE_MAX_ARRAY_SIZE = 16384;

var SimpleQueue = function () {
  function SimpleQueue() {
    this._cursor = 0;
    this._size = 0;
    this._front = {
      _elements: [],
      _next: undefined
    };
    this._back = this._front;
    this._cursor = 0;
    this._size = 0;
  }

  Object.defineProperty(SimpleQueue.prototype, "length", {
    get: function () {
      return this._size;
    },
    enumerable: false,
    configurable: true
  });

  SimpleQueue.prototype.push = function (element) {
    var oldBack = this._back;
    var newBack = oldBack;

    if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
      newBack = {
        _elements: [],
        _next: undefined
      };
    }

    oldBack._elements.push(element);

    if (newBack !== oldBack) {
      this._back = newBack;
      oldBack._next = newBack;
    }

    ++this._size;
  };

  SimpleQueue.prototype.shift = function () {
    var oldFront = this._front;
    var newFront = oldFront;
    var oldCursor = this._cursor;
    var newCursor = oldCursor + 1;
    var elements = oldFront._elements;
    var element = elements[oldCursor];

    if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
      newFront = oldFront._next;
      newCursor = 0;
    }

    --this._size;
    this._cursor = newCursor;

    if (oldFront !== newFront) {
      this._front = newFront;
    }

    elements[oldCursor] = undefined;
    return element;
  };

  SimpleQueue.prototype.forEach = function (callback) {
    var i = this._cursor;
    var node = this._front;
    var elements = node._elements;

    while (i !== elements.length || node._next !== undefined) {
      if (i === elements.length) {
        node = node._next;
        elements = node._elements;
        i = 0;

        if (elements.length === 0) {
          break;
        }
      }

      callback(elements[i]);
      ++i;
    }
  };

  SimpleQueue.prototype.peek = function () {
    var front = this._front;
    var cursor = this._cursor;
    return front._elements[cursor];
  };

  return SimpleQueue;
}();

function ReadableStreamReaderGenericInitialize(reader, stream) {
  reader._ownerReadableStream = stream;
  stream._reader = reader;

  if (stream._state === 'readable') {
    defaultReaderClosedPromiseInitialize(reader);
  } else if (stream._state === 'closed') {
    defaultReaderClosedPromiseInitializeAsResolved(reader);
  } else {
    defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
  }
}

function ReadableStreamReaderGenericCancel(reader, reason) {
  var stream = reader._ownerReadableStream;
  return ReadableStreamCancel(stream, reason);
}

function ReadableStreamReaderGenericRelease(reader) {
  if (reader._ownerReadableStream._state === 'readable') {
    defaultReaderClosedPromiseReject(reader, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness"));
  } else {
    defaultReaderClosedPromiseResetToRejected(reader, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness"));
  }

  reader._ownerReadableStream._reader = undefined;
  reader._ownerReadableStream = undefined;
}

function readerLockException(name) {
  return new TypeError('Cannot ' + name + ' a stream using a released reader');
}

function defaultReaderClosedPromiseInitialize(reader) {
  reader._closedPromise = newPromise(function (resolve, reject) {
    reader._closedPromise_resolve = resolve;
    reader._closedPromise_reject = reject;
  });
}

function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
  defaultReaderClosedPromiseInitialize(reader);
  defaultReaderClosedPromiseReject(reader, reason);
}

function defaultReaderClosedPromiseInitializeAsResolved(reader) {
  defaultReaderClosedPromiseInitialize(reader);
  defaultReaderClosedPromiseResolve(reader);
}

function defaultReaderClosedPromiseReject(reader, reason) {
  setPromiseIsHandledToTrue(reader._closedPromise);

  reader._closedPromise_reject(reason);

  reader._closedPromise_resolve = undefined;
  reader._closedPromise_reject = undefined;
}

function defaultReaderClosedPromiseResetToRejected(reader, reason) {
  defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
}

function defaultReaderClosedPromiseResolve(reader) {
  reader._closedPromise_resolve(undefined);

  reader._closedPromise_resolve = undefined;
  reader._closedPromise_reject = undefined;
}

var AbortSteps = SymbolPolyfill('[[AbortSteps]]');
var ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
var CancelSteps = SymbolPolyfill('[[CancelSteps]]');
var PullSteps = SymbolPolyfill('[[PullSteps]]');

var NumberIsFinite = Number.isFinite || function (x) {
  return typeof x === 'number' && isFinite(x);
};

var MathTrunc = Math.trunc || function (v) {
  return v < 0 ? Math.ceil(v) : Math.floor(v);
};

function isDictionary(x) {
  return typeof x === 'object' || typeof x === 'function';
}

function assertDictionary(obj, context) {
  if (obj !== undefined && !isDictionary(obj)) {
    throw new TypeError(context + " is not an object.");
  }
}

function assertFunction(x, context) {
  if (typeof x !== 'function') {
    throw new TypeError(context + " is not a function.");
  }
}

function isObject(x) {
  return typeof x === 'object' && x !== null || typeof x === 'function';
}

function assertObject(x, context) {
  if (!isObject(x)) {
    throw new TypeError(context + " is not an object.");
  }
}

function assertRequiredArgument(x, position, context) {
  if (x === undefined) {
    throw new TypeError("Parameter " + position + " is required in '" + context + "'.");
  }
}

function assertRequiredField(x, field, context) {
  if (x === undefined) {
    throw new TypeError(field + " is required in '" + context + "'.");
  }
}

function convertUnrestrictedDouble(value) {
  return Number(value);
}

function censorNegativeZero(x) {
  return x === 0 ? 0 : x;
}

function integerPart(x) {
  return censorNegativeZero(MathTrunc(x));
}

function convertUnsignedLongLongWithEnforceRange(value, context) {
  var lowerBound = 0;
  var upperBound = Number.MAX_SAFE_INTEGER;
  var x = Number(value);
  x = censorNegativeZero(x);

  if (!NumberIsFinite(x)) {
    throw new TypeError(context + " is not a finite number");
  }

  x = integerPart(x);

  if (x < lowerBound || x > upperBound) {
    throw new TypeError(context + " is outside the accepted range of " + lowerBound + " to " + upperBound + ", inclusive");
  }

  if (!NumberIsFinite(x) || x === 0) {
    return 0;
  }

  return x;
}

function assertReadableStream(x, context) {
  if (!IsReadableStream(x)) {
    throw new TypeError(context + " is not a ReadableStream.");
  }
}

function AcquireReadableStreamDefaultReader(stream) {
  return new ReadableStreamDefaultReader(stream);
}

function ReadableStreamAddReadRequest(stream, readRequest) {
  stream._reader._readRequests.push(readRequest);
}

function ReadableStreamFulfillReadRequest(stream, chunk, done) {
  var reader = stream._reader;

  var readRequest = reader._readRequests.shift();

  if (done) {
    readRequest._closeSteps();
  } else {
    readRequest._chunkSteps(chunk);
  }
}

function ReadableStreamGetNumReadRequests(stream) {
  return stream._reader._readRequests.length;
}

function ReadableStreamHasDefaultReader(stream) {
  var reader = stream._reader;

  if (reader === undefined) {
    return false;
  }

  if (!IsReadableStreamDefaultReader(reader)) {
    return false;
  }

  return true;
}

var ReadableStreamDefaultReader = function () {
  function ReadableStreamDefaultReader(stream) {
    assertRequiredArgument(stream, 1, 'ReadableStreamDefaultReader');
    assertReadableStream(stream, 'First parameter');

    if (IsReadableStreamLocked(stream)) {
      throw new TypeError('This stream has already been locked for exclusive reading by another reader');
    }

    ReadableStreamReaderGenericInitialize(this, stream);
    this._readRequests = new SimpleQueue();
  }

  Object.defineProperty(ReadableStreamDefaultReader.prototype, "closed", {
    get: function () {
      if (!IsReadableStreamDefaultReader(this)) {
        return promiseRejectedWith(defaultReaderBrandCheckException('closed'));
      }

      return this._closedPromise;
    },
    enumerable: false,
    configurable: true
  });

  ReadableStreamDefaultReader.prototype.cancel = function (reason) {
    if (reason === void 0) {
      reason = undefined;
    }

    if (!IsReadableStreamDefaultReader(this)) {
      return promiseRejectedWith(defaultReaderBrandCheckException('cancel'));
    }

    if (this._ownerReadableStream === undefined) {
      return promiseRejectedWith(readerLockException('cancel'));
    }

    return ReadableStreamReaderGenericCancel(this, reason);
  };

  ReadableStreamDefaultReader.prototype.read = function () {
    if (!IsReadableStreamDefaultReader(this)) {
      return promiseRejectedWith(defaultReaderBrandCheckException('read'));
    }

    if (this._ownerReadableStream === undefined) {
      return promiseRejectedWith(readerLockException('read from'));
    }

    var resolvePromise;
    var rejectPromise;
    var promise = newPromise(function (resolve, reject) {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    var readRequest = {
      _chunkSteps: function (chunk) {
        return resolvePromise({
          value: chunk,
          done: false
        });
      },
      _closeSteps: function () {
        return resolvePromise({
          value: undefined,
          done: true
        });
      },
      _errorSteps: function (e) {
        return rejectPromise(e);
      }
    };
    ReadableStreamDefaultReaderRead(this, readRequest);
    return promise;
  };

  ReadableStreamDefaultReader.prototype.releaseLock = function () {
    if (!IsReadableStreamDefaultReader(this)) {
      throw defaultReaderBrandCheckException('releaseLock');
    }

    if (this._ownerReadableStream === undefined) {
      return;
    }

    if (this._readRequests.length > 0) {
      throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
    }

    ReadableStreamReaderGenericRelease(this);
  };

  return ReadableStreamDefaultReader;
}();

Object.defineProperties(ReadableStreamDefaultReader.prototype, {
  cancel: {
    enumerable: true
  },
  read: {
    enumerable: true
  },
  releaseLock: {
    enumerable: true
  },
  closed: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
    value: 'ReadableStreamDefaultReader',
    configurable: true
  });
}

function IsReadableStreamDefaultReader(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_readRequests')) {
    return false;
  }

  return true;
}

function ReadableStreamDefaultReaderRead(reader, readRequest) {
  var stream = reader._ownerReadableStream;
  stream._disturbed = true;

  if (stream._state === 'closed') {
    readRequest._closeSteps();
  } else if (stream._state === 'errored') {
    readRequest._errorSteps(stream._storedError);
  } else {
    stream._readableStreamController[PullSteps](readRequest);
  }
}

function defaultReaderBrandCheckException(name) {
  return new TypeError("ReadableStreamDefaultReader.prototype." + name + " can only be used on a ReadableStreamDefaultReader");
}

var _a;

var AsyncIteratorPrototype;

if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
  AsyncIteratorPrototype = (_a = {}, _a[SymbolPolyfill.asyncIterator] = function () {
    return this;
  }, _a);
  Object.defineProperty(AsyncIteratorPrototype, SymbolPolyfill.asyncIterator, {
    enumerable: false
  });
}

var ReadableStreamAsyncIteratorImpl = function () {
  function ReadableStreamAsyncIteratorImpl(reader, preventCancel) {
    this._ongoingPromise = undefined;
    this._isFinished = false;
    this._reader = reader;
    this._preventCancel = preventCancel;
  }

  ReadableStreamAsyncIteratorImpl.prototype.next = function () {
    var _this = this;

    var nextSteps = function () {
      return _this._nextSteps();
    };

    this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
    return this._ongoingPromise;
  };

  ReadableStreamAsyncIteratorImpl.prototype.return = function (value) {
    var _this = this;

    var returnSteps = function () {
      return _this._returnSteps(value);
    };

    return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
  };

  ReadableStreamAsyncIteratorImpl.prototype._nextSteps = function () {
    var _this = this;

    if (this._isFinished) {
      return Promise.resolve({
        value: undefined,
        done: true
      });
    }

    var reader = this._reader;

    if (reader._ownerReadableStream === undefined) {
      return promiseRejectedWith(readerLockException('iterate'));
    }

    var resolvePromise;
    var rejectPromise;
    var promise = newPromise(function (resolve, reject) {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    var readRequest = {
      _chunkSteps: function (chunk) {
        _this._ongoingPromise = undefined;
        queueMicrotask(function () {
          return resolvePromise({
            value: chunk,
            done: false
          });
        });
      },
      _closeSteps: function () {
        _this._ongoingPromise = undefined;
        _this._isFinished = true;
        ReadableStreamReaderGenericRelease(reader);
        resolvePromise({
          value: undefined,
          done: true
        });
      },
      _errorSteps: function (reason) {
        _this._ongoingPromise = undefined;
        _this._isFinished = true;
        ReadableStreamReaderGenericRelease(reader);
        rejectPromise(reason);
      }
    };
    ReadableStreamDefaultReaderRead(reader, readRequest);
    return promise;
  };

  ReadableStreamAsyncIteratorImpl.prototype._returnSteps = function (value) {
    if (this._isFinished) {
      return Promise.resolve({
        value: value,
        done: true
      });
    }

    this._isFinished = true;
    var reader = this._reader;

    if (reader._ownerReadableStream === undefined) {
      return promiseRejectedWith(readerLockException('finish iterating'));
    }

    if (!this._preventCancel) {
      var result = ReadableStreamReaderGenericCancel(reader, value);
      ReadableStreamReaderGenericRelease(reader);
      return transformPromiseWith(result, function () {
        return {
          value: value,
          done: true
        };
      });
    }

    ReadableStreamReaderGenericRelease(reader);
    return promiseResolvedWith({
      value: value,
      done: true
    });
  };

  return ReadableStreamAsyncIteratorImpl;
}();

var ReadableStreamAsyncIteratorPrototype = {
  next: function () {
    if (!IsReadableStreamAsyncIterator(this)) {
      return promiseRejectedWith(streamAsyncIteratorBrandCheckException('next'));
    }

    return this._asyncIteratorImpl.next();
  },
  return: function (value) {
    if (!IsReadableStreamAsyncIterator(this)) {
      return promiseRejectedWith(streamAsyncIteratorBrandCheckException('return'));
    }

    return this._asyncIteratorImpl.return(value);
  }
};

if (AsyncIteratorPrototype !== undefined) {
  Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
}

function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
  var reader = AcquireReadableStreamDefaultReader(stream);
  var impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
  iterator._asyncIteratorImpl = impl;
  return iterator;
}

function IsReadableStreamAsyncIterator(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_asyncIteratorImpl')) {
    return false;
  }

  return true;
}

function streamAsyncIteratorBrandCheckException(name) {
  return new TypeError("ReadableStreamAsyncIterator." + name + " can only be used on a ReadableSteamAsyncIterator");
}

var NumberIsNaN = Number.isNaN || function (x) {
  return x !== x;
};

function IsFiniteNonNegativeNumber(v) {
  if (!IsNonNegativeNumber(v)) {
    return false;
  }

  if (v === Infinity) {
    return false;
  }

  return true;
}

function IsNonNegativeNumber(v) {
  if (typeof v !== 'number') {
    return false;
  }

  if (NumberIsNaN(v)) {
    return false;
  }

  if (v < 0) {
    return false;
  }

  return true;
}

function DequeueValue(container) {
  var pair = container._queue.shift();

  container._queueTotalSize -= pair.size;

  if (container._queueTotalSize < 0) {
    container._queueTotalSize = 0;
  }

  return pair.value;
}

function EnqueueValueWithSize(container, value, size) {
  size = Number(size);

  if (!IsFiniteNonNegativeNumber(size)) {
    throw new RangeError('Size must be a finite, non-NaN, non-negative number.');
  }

  container._queue.push({
    value: value,
    size: size
  });

  container._queueTotalSize += size;
}

function PeekQueueValue(container) {
  var pair = container._queue.peek();

  return pair.value;
}

function ResetQueue(container) {
  container._queue = new SimpleQueue();
  container._queueTotalSize = 0;
}

function CreateArrayFromList(elements) {
  return elements.slice();
}

function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
  new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
}

function TransferArrayBuffer(O) {
  return O;
}

function IsDetachedBuffer(O) {
  return false;
}

var ReadableStreamBYOBRequest = function () {
  function ReadableStreamBYOBRequest() {
    throw new TypeError('Illegal constructor');
  }

  Object.defineProperty(ReadableStreamBYOBRequest.prototype, "view", {
    get: function () {
      if (!IsReadableStreamBYOBRequest(this)) {
        throw byobRequestBrandCheckException('view');
      }

      return this._view;
    },
    enumerable: false,
    configurable: true
  });

  ReadableStreamBYOBRequest.prototype.respond = function (bytesWritten) {
    if (!IsReadableStreamBYOBRequest(this)) {
      throw byobRequestBrandCheckException('respond');
    }

    assertRequiredArgument(bytesWritten, 1, 'respond');
    bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, 'First parameter');

    if (this._associatedReadableByteStreamController === undefined) {
      throw new TypeError('This BYOB request has been invalidated');
    }

    if (IsDetachedBuffer(this._view.buffer)) ;
    ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
  };

  ReadableStreamBYOBRequest.prototype.respondWithNewView = function (view) {
    if (!IsReadableStreamBYOBRequest(this)) {
      throw byobRequestBrandCheckException('respondWithNewView');
    }

    assertRequiredArgument(view, 1, 'respondWithNewView');

    if (!ArrayBuffer.isView(view)) {
      throw new TypeError('You can only respond with array buffer views');
    }

    if (view.byteLength === 0) {
      throw new TypeError('chunk must have non-zero byteLength');
    }

    if (view.buffer.byteLength === 0) {
      throw new TypeError("chunk's buffer must have non-zero byteLength");
    }

    if (this._associatedReadableByteStreamController === undefined) {
      throw new TypeError('This BYOB request has been invalidated');
    }

    ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
  };

  return ReadableStreamBYOBRequest;
}();

Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
  respond: {
    enumerable: true
  },
  respondWithNewView: {
    enumerable: true
  },
  view: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
    value: 'ReadableStreamBYOBRequest',
    configurable: true
  });
}

var ReadableByteStreamController = function () {
  function ReadableByteStreamController() {
    throw new TypeError('Illegal constructor');
  }

  Object.defineProperty(ReadableByteStreamController.prototype, "byobRequest", {
    get: function () {
      if (!IsReadableByteStreamController(this)) {
        throw byteStreamControllerBrandCheckException('byobRequest');
      }

      if (this._byobRequest === null && this._pendingPullIntos.length > 0) {
        var firstDescriptor = this._pendingPullIntos.peek();

        var view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
        var byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
        SetUpReadableStreamBYOBRequest(byobRequest, this, view);
        this._byobRequest = byobRequest;
      }

      return this._byobRequest;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ReadableByteStreamController.prototype, "desiredSize", {
    get: function () {
      if (!IsReadableByteStreamController(this)) {
        throw byteStreamControllerBrandCheckException('desiredSize');
      }

      return ReadableByteStreamControllerGetDesiredSize(this);
    },
    enumerable: false,
    configurable: true
  });

  ReadableByteStreamController.prototype.close = function () {
    if (!IsReadableByteStreamController(this)) {
      throw byteStreamControllerBrandCheckException('close');
    }

    if (this._closeRequested) {
      throw new TypeError('The stream has already been closed; do not close it again!');
    }

    var state = this._controlledReadableByteStream._state;

    if (state !== 'readable') {
      throw new TypeError("The stream (in " + state + " state) is not in the readable state and cannot be closed");
    }

    ReadableByteStreamControllerClose(this);
  };

  ReadableByteStreamController.prototype.enqueue = function (chunk) {
    if (!IsReadableByteStreamController(this)) {
      throw byteStreamControllerBrandCheckException('enqueue');
    }

    assertRequiredArgument(chunk, 1, 'enqueue');

    if (!ArrayBuffer.isView(chunk)) {
      throw new TypeError('chunk must be an array buffer view');
    }

    if (chunk.byteLength === 0) {
      throw new TypeError('chunk must have non-zero byteLength');
    }

    if (chunk.buffer.byteLength === 0) {
      throw new TypeError("chunk's buffer must have non-zero byteLength");
    }

    if (this._closeRequested) {
      throw new TypeError('stream is closed or draining');
    }

    var state = this._controlledReadableByteStream._state;

    if (state !== 'readable') {
      throw new TypeError("The stream (in " + state + " state) is not in the readable state and cannot be enqueued to");
    }

    ReadableByteStreamControllerEnqueue(this, chunk);
  };

  ReadableByteStreamController.prototype.error = function (e) {
    if (e === void 0) {
      e = undefined;
    }

    if (!IsReadableByteStreamController(this)) {
      throw byteStreamControllerBrandCheckException('error');
    }

    ReadableByteStreamControllerError(this, e);
  };

  ReadableByteStreamController.prototype[CancelSteps] = function (reason) {
    if (this._pendingPullIntos.length > 0) {
      var firstDescriptor = this._pendingPullIntos.peek();

      firstDescriptor.bytesFilled = 0;
    }

    ResetQueue(this);

    var result = this._cancelAlgorithm(reason);

    ReadableByteStreamControllerClearAlgorithms(this);
    return result;
  };

  ReadableByteStreamController.prototype[PullSteps] = function (readRequest) {
    var stream = this._controlledReadableByteStream;

    if (this._queueTotalSize > 0) {
      var entry = this._queue.shift();

      this._queueTotalSize -= entry.byteLength;
      ReadableByteStreamControllerHandleQueueDrain(this);
      var view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);

      readRequest._chunkSteps(view);

      return;
    }

    var autoAllocateChunkSize = this._autoAllocateChunkSize;

    if (autoAllocateChunkSize !== undefined) {
      var buffer = void 0;

      try {
        buffer = new ArrayBuffer(autoAllocateChunkSize);
      } catch (bufferE) {
        readRequest._errorSteps(bufferE);

        return;
      }

      var pullIntoDescriptor = {
        buffer: buffer,
        byteOffset: 0,
        byteLength: autoAllocateChunkSize,
        bytesFilled: 0,
        elementSize: 1,
        viewConstructor: Uint8Array,
        readerType: 'default'
      };

      this._pendingPullIntos.push(pullIntoDescriptor);
    }

    ReadableStreamAddReadRequest(stream, readRequest);
    ReadableByteStreamControllerCallPullIfNeeded(this);
  };

  return ReadableByteStreamController;
}();

Object.defineProperties(ReadableByteStreamController.prototype, {
  close: {
    enumerable: true
  },
  enqueue: {
    enumerable: true
  },
  error: {
    enumerable: true
  },
  byobRequest: {
    enumerable: true
  },
  desiredSize: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
    value: 'ReadableByteStreamController',
    configurable: true
  });
}

function IsReadableByteStreamController(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableByteStream')) {
    return false;
  }

  return true;
}

function IsReadableStreamBYOBRequest(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_associatedReadableByteStreamController')) {
    return false;
  }

  return true;
}

function ReadableByteStreamControllerCallPullIfNeeded(controller) {
  var shouldPull = ReadableByteStreamControllerShouldCallPull(controller);

  if (!shouldPull) {
    return;
  }

  if (controller._pulling) {
    controller._pullAgain = true;
    return;
  }

  controller._pulling = true;

  var pullPromise = controller._pullAlgorithm();

  uponPromise(pullPromise, function () {
    controller._pulling = false;

    if (controller._pullAgain) {
      controller._pullAgain = false;
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
  }, function (e) {
    ReadableByteStreamControllerError(controller, e);
  });
}

function ReadableByteStreamControllerClearPendingPullIntos(controller) {
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  controller._pendingPullIntos = new SimpleQueue();
}

function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
  var done = false;

  if (stream._state === 'closed') {
    done = true;
  }

  var filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);

  if (pullIntoDescriptor.readerType === 'default') {
    ReadableStreamFulfillReadRequest(stream, filledView, done);
  } else {
    ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
  }
}

function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
  var bytesFilled = pullIntoDescriptor.bytesFilled;
  var elementSize = pullIntoDescriptor.elementSize;
  return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
}

function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
  controller._queue.push({
    buffer: buffer,
    byteOffset: byteOffset,
    byteLength: byteLength
  });

  controller._queueTotalSize += byteLength;
}

function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
  var elementSize = pullIntoDescriptor.elementSize;
  var currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
  var maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
  var maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
  var maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
  var totalBytesToCopyRemaining = maxBytesToCopy;
  var ready = false;

  if (maxAlignedBytes > currentAlignedBytes) {
    totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
    ready = true;
  }

  var queue = controller._queue;

  while (totalBytesToCopyRemaining > 0) {
    var headOfQueue = queue.peek();
    var bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
    var destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
    CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);

    if (headOfQueue.byteLength === bytesToCopy) {
      queue.shift();
    } else {
      headOfQueue.byteOffset += bytesToCopy;
      headOfQueue.byteLength -= bytesToCopy;
    }

    controller._queueTotalSize -= bytesToCopy;
    ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
    totalBytesToCopyRemaining -= bytesToCopy;
  }

  return ready;
}

function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  pullIntoDescriptor.bytesFilled += size;
}

function ReadableByteStreamControllerHandleQueueDrain(controller) {
  if (controller._queueTotalSize === 0 && controller._closeRequested) {
    ReadableByteStreamControllerClearAlgorithms(controller);
    ReadableStreamClose(controller._controlledReadableByteStream);
  } else {
    ReadableByteStreamControllerCallPullIfNeeded(controller);
  }
}

function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
  if (controller._byobRequest === null) {
    return;
  }

  controller._byobRequest._associatedReadableByteStreamController = undefined;
  controller._byobRequest._view = null;
  controller._byobRequest = null;
}

function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
  while (controller._pendingPullIntos.length > 0) {
    if (controller._queueTotalSize === 0) {
      return;
    }

    var pullIntoDescriptor = controller._pendingPullIntos.peek();

    if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
      ReadableByteStreamControllerShiftPendingPullInto(controller);
      ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
    }
  }
}

function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
  var stream = controller._controlledReadableByteStream;
  var elementSize = 1;

  if (view.constructor !== DataView) {
    elementSize = view.constructor.BYTES_PER_ELEMENT;
  }

  var ctor = view.constructor;
  var buffer = TransferArrayBuffer(view.buffer);
  var pullIntoDescriptor = {
    buffer: buffer,
    byteOffset: view.byteOffset,
    byteLength: view.byteLength,
    bytesFilled: 0,
    elementSize: elementSize,
    viewConstructor: ctor,
    readerType: 'byob'
  };

  if (controller._pendingPullIntos.length > 0) {
    controller._pendingPullIntos.push(pullIntoDescriptor);

    ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
    return;
  }

  if (stream._state === 'closed') {
    var emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);

    readIntoRequest._closeSteps(emptyView);

    return;
  }

  if (controller._queueTotalSize > 0) {
    if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
      var filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
      ReadableByteStreamControllerHandleQueueDrain(controller);

      readIntoRequest._chunkSteps(filledView);

      return;
    }

    if (controller._closeRequested) {
      var e = new TypeError('Insufficient bytes to fill elements in the given buffer');
      ReadableByteStreamControllerError(controller, e);

      readIntoRequest._errorSteps(e);

      return;
    }
  }

  controller._pendingPullIntos.push(pullIntoDescriptor);

  ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
  ReadableByteStreamControllerCallPullIfNeeded(controller);
}

function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
  firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
  var stream = controller._controlledReadableByteStream;

  if (ReadableStreamHasBYOBReader(stream)) {
    while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
      var pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
      ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
    }
  }
}

function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
  if (pullIntoDescriptor.bytesFilled + bytesWritten > pullIntoDescriptor.byteLength) {
    throw new RangeError('bytesWritten out of range');
  }

  ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);

  if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
    return;
  }

  ReadableByteStreamControllerShiftPendingPullInto(controller);
  var remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;

  if (remainderSize > 0) {
    var end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
    var remainder = pullIntoDescriptor.buffer.slice(end - remainderSize, end);
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
  }

  pullIntoDescriptor.buffer = TransferArrayBuffer(pullIntoDescriptor.buffer);
  pullIntoDescriptor.bytesFilled -= remainderSize;
  ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
  ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
}

function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
  var firstDescriptor = controller._pendingPullIntos.peek();

  var stream = controller._controlledReadableByteStream;

  if (stream._state === 'closed') {
    if (bytesWritten !== 0) {
      throw new TypeError('bytesWritten must be 0 when calling respond() on a closed stream');
    }

    ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor);
  } else {
    ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
  }

  ReadableByteStreamControllerCallPullIfNeeded(controller);
}

function ReadableByteStreamControllerShiftPendingPullInto(controller) {
  var descriptor = controller._pendingPullIntos.shift();

  ReadableByteStreamControllerInvalidateBYOBRequest(controller);
  return descriptor;
}

function ReadableByteStreamControllerShouldCallPull(controller) {
  var stream = controller._controlledReadableByteStream;

  if (stream._state !== 'readable') {
    return false;
  }

  if (controller._closeRequested) {
    return false;
  }

  if (!controller._started) {
    return false;
  }

  if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
    return true;
  }

  if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
    return true;
  }

  var desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);

  if (desiredSize > 0) {
    return true;
  }

  return false;
}

function ReadableByteStreamControllerClearAlgorithms(controller) {
  controller._pullAlgorithm = undefined;
  controller._cancelAlgorithm = undefined;
}

function ReadableByteStreamControllerClose(controller) {
  var stream = controller._controlledReadableByteStream;

  if (controller._closeRequested || stream._state !== 'readable') {
    return;
  }

  if (controller._queueTotalSize > 0) {
    controller._closeRequested = true;
    return;
  }

  if (controller._pendingPullIntos.length > 0) {
    var firstPendingPullInto = controller._pendingPullIntos.peek();

    if (firstPendingPullInto.bytesFilled > 0) {
      var e = new TypeError('Insufficient bytes to fill elements in the given buffer');
      ReadableByteStreamControllerError(controller, e);
      throw e;
    }
  }

  ReadableByteStreamControllerClearAlgorithms(controller);
  ReadableStreamClose(stream);
}

function ReadableByteStreamControllerEnqueue(controller, chunk) {
  var stream = controller._controlledReadableByteStream;

  if (controller._closeRequested || stream._state !== 'readable') {
    return;
  }

  var buffer = chunk.buffer;
  var byteOffset = chunk.byteOffset;
  var byteLength = chunk.byteLength;
  var transferredBuffer = TransferArrayBuffer(buffer);

  if (ReadableStreamHasDefaultReader(stream)) {
    if (ReadableStreamGetNumReadRequests(stream) === 0) {
      ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
    } else {
      var transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
      ReadableStreamFulfillReadRequest(stream, transferredView, false);
    }
  } else if (ReadableStreamHasBYOBReader(stream)) {
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
    ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
  } else {
    ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
  }

  ReadableByteStreamControllerCallPullIfNeeded(controller);
}

function ReadableByteStreamControllerError(controller, e) {
  var stream = controller._controlledReadableByteStream;

  if (stream._state !== 'readable') {
    return;
  }

  ReadableByteStreamControllerClearPendingPullIntos(controller);
  ResetQueue(controller);
  ReadableByteStreamControllerClearAlgorithms(controller);
  ReadableStreamError(stream, e);
}

function ReadableByteStreamControllerGetDesiredSize(controller) {
  var stream = controller._controlledReadableByteStream;
  var state = stream._state;

  if (state === 'errored') {
    return null;
  }

  if (state === 'closed') {
    return 0;
  }

  return controller._strategyHWM - controller._queueTotalSize;
}

function ReadableByteStreamControllerRespond(controller, bytesWritten) {
  bytesWritten = Number(bytesWritten);

  if (!IsFiniteNonNegativeNumber(bytesWritten)) {
    throw new RangeError('bytesWritten must be a finite');
  }

  ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
}

function ReadableByteStreamControllerRespondWithNewView(controller, view) {
  var firstDescriptor = controller._pendingPullIntos.peek();

  if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
    throw new RangeError('The region specified by view does not match byobRequest');
  }

  if (firstDescriptor.byteLength !== view.byteLength) {
    throw new RangeError('The buffer of view has different capacity than byobRequest');
  }

  firstDescriptor.buffer = view.buffer;
  ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
}

function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
  controller._controlledReadableByteStream = stream;
  controller._pullAgain = false;
  controller._pulling = false;
  controller._byobRequest = null;
  controller._queue = controller._queueTotalSize = undefined;
  ResetQueue(controller);
  controller._closeRequested = false;
  controller._started = false;
  controller._strategyHWM = highWaterMark;
  controller._pullAlgorithm = pullAlgorithm;
  controller._cancelAlgorithm = cancelAlgorithm;
  controller._autoAllocateChunkSize = autoAllocateChunkSize;
  controller._pendingPullIntos = new SimpleQueue();
  stream._readableStreamController = controller;
  var startResult = startAlgorithm();
  uponPromise(promiseResolvedWith(startResult), function () {
    controller._started = true;
    ReadableByteStreamControllerCallPullIfNeeded(controller);
  }, function (r) {
    ReadableByteStreamControllerError(controller, r);
  });
}

function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
  var controller = Object.create(ReadableByteStreamController.prototype);

  var startAlgorithm = function () {
    return undefined;
  };

  var pullAlgorithm = function () {
    return promiseResolvedWith(undefined);
  };

  var cancelAlgorithm = function () {
    return promiseResolvedWith(undefined);
  };

  if (underlyingByteSource.start !== undefined) {
    startAlgorithm = function () {
      return underlyingByteSource.start(controller);
    };
  }

  if (underlyingByteSource.pull !== undefined) {
    pullAlgorithm = function () {
      return underlyingByteSource.pull(controller);
    };
  }

  if (underlyingByteSource.cancel !== undefined) {
    cancelAlgorithm = function (reason) {
      return underlyingByteSource.cancel(reason);
    };
  }

  var autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
  SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
}

function SetUpReadableStreamBYOBRequest(request, controller, view) {
  request._associatedReadableByteStreamController = controller;
  request._view = view;
}

function byobRequestBrandCheckException(name) {
  return new TypeError("ReadableStreamBYOBRequest.prototype." + name + " can only be used on a ReadableStreamBYOBRequest");
}

function byteStreamControllerBrandCheckException(name) {
  return new TypeError("ReadableByteStreamController.prototype." + name + " can only be used on a ReadableByteStreamController");
}

function AcquireReadableStreamBYOBReader(stream) {
  return new ReadableStreamBYOBReader(stream);
}

function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
  stream._reader._readIntoRequests.push(readIntoRequest);
}

function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
  var reader = stream._reader;

  var readIntoRequest = reader._readIntoRequests.shift();

  if (done) {
    readIntoRequest._closeSteps(chunk);
  } else {
    readIntoRequest._chunkSteps(chunk);
  }
}

function ReadableStreamGetNumReadIntoRequests(stream) {
  return stream._reader._readIntoRequests.length;
}

function ReadableStreamHasBYOBReader(stream) {
  var reader = stream._reader;

  if (reader === undefined) {
    return false;
  }

  if (!IsReadableStreamBYOBReader(reader)) {
    return false;
  }

  return true;
}

var ReadableStreamBYOBReader = function () {
  function ReadableStreamBYOBReader(stream) {
    assertRequiredArgument(stream, 1, 'ReadableStreamBYOBReader');
    assertReadableStream(stream, 'First parameter');

    if (IsReadableStreamLocked(stream)) {
      throw new TypeError('This stream has already been locked for exclusive reading by another reader');
    }

    if (!IsReadableByteStreamController(stream._readableStreamController)) {
      throw new TypeError('Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte ' + 'source');
    }

    ReadableStreamReaderGenericInitialize(this, stream);
    this._readIntoRequests = new SimpleQueue();
  }

  Object.defineProperty(ReadableStreamBYOBReader.prototype, "closed", {
    get: function () {
      if (!IsReadableStreamBYOBReader(this)) {
        return promiseRejectedWith(byobReaderBrandCheckException('closed'));
      }

      return this._closedPromise;
    },
    enumerable: false,
    configurable: true
  });

  ReadableStreamBYOBReader.prototype.cancel = function (reason) {
    if (reason === void 0) {
      reason = undefined;
    }

    if (!IsReadableStreamBYOBReader(this)) {
      return promiseRejectedWith(byobReaderBrandCheckException('cancel'));
    }

    if (this._ownerReadableStream === undefined) {
      return promiseRejectedWith(readerLockException('cancel'));
    }

    return ReadableStreamReaderGenericCancel(this, reason);
  };

  ReadableStreamBYOBReader.prototype.read = function (view) {
    if (!IsReadableStreamBYOBReader(this)) {
      return promiseRejectedWith(byobReaderBrandCheckException('read'));
    }

    if (!ArrayBuffer.isView(view)) {
      return promiseRejectedWith(new TypeError('view must be an array buffer view'));
    }

    if (view.byteLength === 0) {
      return promiseRejectedWith(new TypeError('view must have non-zero byteLength'));
    }

    if (view.buffer.byteLength === 0) {
      return promiseRejectedWith(new TypeError("view's buffer must have non-zero byteLength"));
    }

    if (this._ownerReadableStream === undefined) {
      return promiseRejectedWith(readerLockException('read from'));
    }

    var resolvePromise;
    var rejectPromise;
    var promise = newPromise(function (resolve, reject) {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    var readIntoRequest = {
      _chunkSteps: function (chunk) {
        return resolvePromise({
          value: chunk,
          done: false
        });
      },
      _closeSteps: function (chunk) {
        return resolvePromise({
          value: chunk,
          done: true
        });
      },
      _errorSteps: function (e) {
        return rejectPromise(e);
      }
    };
    ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
    return promise;
  };

  ReadableStreamBYOBReader.prototype.releaseLock = function () {
    if (!IsReadableStreamBYOBReader(this)) {
      throw byobReaderBrandCheckException('releaseLock');
    }

    if (this._ownerReadableStream === undefined) {
      return;
    }

    if (this._readIntoRequests.length > 0) {
      throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
    }

    ReadableStreamReaderGenericRelease(this);
  };

  return ReadableStreamBYOBReader;
}();

Object.defineProperties(ReadableStreamBYOBReader.prototype, {
  cancel: {
    enumerable: true
  },
  read: {
    enumerable: true
  },
  releaseLock: {
    enumerable: true
  },
  closed: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
    value: 'ReadableStreamBYOBReader',
    configurable: true
  });
}

function IsReadableStreamBYOBReader(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_readIntoRequests')) {
    return false;
  }

  return true;
}

function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
  var stream = reader._ownerReadableStream;
  stream._disturbed = true;

  if (stream._state === 'errored') {
    readIntoRequest._errorSteps(stream._storedError);
  } else {
    ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
  }
}

function byobReaderBrandCheckException(name) {
  return new TypeError("ReadableStreamBYOBReader.prototype." + name + " can only be used on a ReadableStreamBYOBReader");
}

function ExtractHighWaterMark(strategy, defaultHWM) {
  var highWaterMark = strategy.highWaterMark;

  if (highWaterMark === undefined) {
    return defaultHWM;
  }

  if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
    throw new RangeError('Invalid highWaterMark');
  }

  return highWaterMark;
}

function ExtractSizeAlgorithm(strategy) {
  var size = strategy.size;

  if (!size) {
    return function () {
      return 1;
    };
  }

  return size;
}

function convertQueuingStrategy(init, context) {
  assertDictionary(init, context);
  var highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
  var size = init === null || init === void 0 ? void 0 : init.size;
  return {
    highWaterMark: highWaterMark === undefined ? undefined : convertUnrestrictedDouble(highWaterMark),
    size: size === undefined ? undefined : convertQueuingStrategySize(size, context + " has member 'size' that")
  };
}

function convertQueuingStrategySize(fn, context) {
  assertFunction(fn, context);
  return function (chunk) {
    return convertUnrestrictedDouble(fn(chunk));
  };
}

function convertUnderlyingSink(original, context) {
  assertDictionary(original, context);
  var abort = original === null || original === void 0 ? void 0 : original.abort;
  var close = original === null || original === void 0 ? void 0 : original.close;
  var start = original === null || original === void 0 ? void 0 : original.start;
  var type = original === null || original === void 0 ? void 0 : original.type;
  var write = original === null || original === void 0 ? void 0 : original.write;
  return {
    abort: abort === undefined ? undefined : convertUnderlyingSinkAbortCallback(abort, original, context + " has member 'abort' that"),
    close: close === undefined ? undefined : convertUnderlyingSinkCloseCallback(close, original, context + " has member 'close' that"),
    start: start === undefined ? undefined : convertUnderlyingSinkStartCallback(start, original, context + " has member 'start' that"),
    write: write === undefined ? undefined : convertUnderlyingSinkWriteCallback(write, original, context + " has member 'write' that"),
    type: type
  };
}

function convertUnderlyingSinkAbortCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (reason) {
    return promiseCall(fn, original, [reason]);
  };
}

function convertUnderlyingSinkCloseCallback(fn, original, context) {
  assertFunction(fn, context);
  return function () {
    return promiseCall(fn, original, []);
  };
}

function convertUnderlyingSinkStartCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
    return reflectCall(fn, original, [controller]);
  };
}

function convertUnderlyingSinkWriteCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (chunk, controller) {
    return promiseCall(fn, original, [chunk, controller]);
  };
}

function assertWritableStream(x, context) {
  if (!IsWritableStream(x)) {
    throw new TypeError(context + " is not a WritableStream.");
  }
}

var WritableStream = function () {
  function WritableStream(rawUnderlyingSink, rawStrategy) {
    if (rawUnderlyingSink === void 0) {
      rawUnderlyingSink = {};
    }

    if (rawStrategy === void 0) {
      rawStrategy = {};
    }

    if (rawUnderlyingSink === undefined) {
      rawUnderlyingSink = null;
    } else {
      assertObject(rawUnderlyingSink, 'First parameter');
    }

    var strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
    var underlyingSink = convertUnderlyingSink(rawUnderlyingSink, 'First parameter');
    InitializeWritableStream(this);
    var type = underlyingSink.type;

    if (type !== undefined) {
      throw new RangeError('Invalid type is specified');
    }

    var sizeAlgorithm = ExtractSizeAlgorithm(strategy);
    var highWaterMark = ExtractHighWaterMark(strategy, 1);
    SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
  }

  Object.defineProperty(WritableStream.prototype, "locked", {
    get: function () {
      if (!IsWritableStream(this)) {
        throw streamBrandCheckException('locked');
      }

      return IsWritableStreamLocked(this);
    },
    enumerable: false,
    configurable: true
  });

  WritableStream.prototype.abort = function (reason) {
    if (reason === void 0) {
      reason = undefined;
    }

    if (!IsWritableStream(this)) {
      return promiseRejectedWith(streamBrandCheckException('abort'));
    }

    if (IsWritableStreamLocked(this)) {
      return promiseRejectedWith(new TypeError('Cannot abort a stream that already has a writer'));
    }

    return WritableStreamAbort(this, reason);
  };

  WritableStream.prototype.close = function () {
    if (!IsWritableStream(this)) {
      return promiseRejectedWith(streamBrandCheckException('close'));
    }

    if (IsWritableStreamLocked(this)) {
      return promiseRejectedWith(new TypeError('Cannot close a stream that already has a writer'));
    }

    if (WritableStreamCloseQueuedOrInFlight(this)) {
      return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
    }

    return WritableStreamClose(this);
  };

  WritableStream.prototype.getWriter = function () {
    if (!IsWritableStream(this)) {
      throw streamBrandCheckException('getWriter');
    }

    return AcquireWritableStreamDefaultWriter(this);
  };

  return WritableStream;
}();

Object.defineProperties(WritableStream.prototype, {
  abort: {
    enumerable: true
  },
  close: {
    enumerable: true
  },
  getWriter: {
    enumerable: true
  },
  locked: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
    value: 'WritableStream',
    configurable: true
  });
}

function AcquireWritableStreamDefaultWriter(stream) {
  return new WritableStreamDefaultWriter(stream);
}

function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
  if (highWaterMark === void 0) {
    highWaterMark = 1;
  }

  if (sizeAlgorithm === void 0) {
    sizeAlgorithm = function () {
      return 1;
    };
  }

  var stream = Object.create(WritableStream.prototype);
  InitializeWritableStream(stream);
  var controller = Object.create(WritableStreamDefaultController.prototype);
  SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
  return stream;
}

function InitializeWritableStream(stream) {
  stream._state = 'writable';
  stream._storedError = undefined;
  stream._writer = undefined;
  stream._writableStreamController = undefined;
  stream._writeRequests = new SimpleQueue();
  stream._inFlightWriteRequest = undefined;
  stream._closeRequest = undefined;
  stream._inFlightCloseRequest = undefined;
  stream._pendingAbortRequest = undefined;
  stream._backpressure = false;
}

function IsWritableStream(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_writableStreamController')) {
    return false;
  }

  return true;
}

function IsWritableStreamLocked(stream) {
  if (stream._writer === undefined) {
    return false;
  }

  return true;
}

function WritableStreamAbort(stream, reason) {
  var state = stream._state;

  if (state === 'closed' || state === 'errored') {
    return promiseResolvedWith(undefined);
  }

  if (stream._pendingAbortRequest !== undefined) {
    return stream._pendingAbortRequest._promise;
  }

  var wasAlreadyErroring = false;

  if (state === 'erroring') {
    wasAlreadyErroring = true;
    reason = undefined;
  }

  var promise = newPromise(function (resolve, reject) {
    stream._pendingAbortRequest = {
      _promise: undefined,
      _resolve: resolve,
      _reject: reject,
      _reason: reason,
      _wasAlreadyErroring: wasAlreadyErroring
    };
  });
  stream._pendingAbortRequest._promise = promise;

  if (!wasAlreadyErroring) {
    WritableStreamStartErroring(stream, reason);
  }

  return promise;
}

function WritableStreamClose(stream) {
  var state = stream._state;

  if (state === 'closed' || state === 'errored') {
    return promiseRejectedWith(new TypeError("The stream (in " + state + " state) is not in the writable state and cannot be closed"));
  }

  var promise = newPromise(function (resolve, reject) {
    var closeRequest = {
      _resolve: resolve,
      _reject: reject
    };
    stream._closeRequest = closeRequest;
  });
  var writer = stream._writer;

  if (writer !== undefined && stream._backpressure && state === 'writable') {
    defaultWriterReadyPromiseResolve(writer);
  }

  WritableStreamDefaultControllerClose(stream._writableStreamController);
  return promise;
}

function WritableStreamAddWriteRequest(stream) {
  var promise = newPromise(function (resolve, reject) {
    var writeRequest = {
      _resolve: resolve,
      _reject: reject
    };

    stream._writeRequests.push(writeRequest);
  });
  return promise;
}

function WritableStreamDealWithRejection(stream, error) {
  var state = stream._state;

  if (state === 'writable') {
    WritableStreamStartErroring(stream, error);
    return;
  }

  WritableStreamFinishErroring(stream);
}

function WritableStreamStartErroring(stream, reason) {
  var controller = stream._writableStreamController;
  stream._state = 'erroring';
  stream._storedError = reason;
  var writer = stream._writer;

  if (writer !== undefined) {
    WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
  }

  if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
    WritableStreamFinishErroring(stream);
  }
}

function WritableStreamFinishErroring(stream) {
  stream._state = 'errored';

  stream._writableStreamController[ErrorSteps]();

  var storedError = stream._storedError;

  stream._writeRequests.forEach(function (writeRequest) {
    writeRequest._reject(storedError);
  });

  stream._writeRequests = new SimpleQueue();

  if (stream._pendingAbortRequest === undefined) {
    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
    return;
  }

  var abortRequest = stream._pendingAbortRequest;
  stream._pendingAbortRequest = undefined;

  if (abortRequest._wasAlreadyErroring) {
    abortRequest._reject(storedError);

    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
    return;
  }

  var promise = stream._writableStreamController[AbortSteps](abortRequest._reason);

  uponPromise(promise, function () {
    abortRequest._resolve();

    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
  }, function (reason) {
    abortRequest._reject(reason);

    WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
  });
}

function WritableStreamFinishInFlightWrite(stream) {
  stream._inFlightWriteRequest._resolve(undefined);

  stream._inFlightWriteRequest = undefined;
}

function WritableStreamFinishInFlightWriteWithError(stream, error) {
  stream._inFlightWriteRequest._reject(error);

  stream._inFlightWriteRequest = undefined;
  WritableStreamDealWithRejection(stream, error);
}

function WritableStreamFinishInFlightClose(stream) {
  stream._inFlightCloseRequest._resolve(undefined);

  stream._inFlightCloseRequest = undefined;
  var state = stream._state;

  if (state === 'erroring') {
    stream._storedError = undefined;

    if (stream._pendingAbortRequest !== undefined) {
      stream._pendingAbortRequest._resolve();

      stream._pendingAbortRequest = undefined;
    }
  }

  stream._state = 'closed';
  var writer = stream._writer;

  if (writer !== undefined) {
    defaultWriterClosedPromiseResolve(writer);
  }
}

function WritableStreamFinishInFlightCloseWithError(stream, error) {
  stream._inFlightCloseRequest._reject(error);

  stream._inFlightCloseRequest = undefined;

  if (stream._pendingAbortRequest !== undefined) {
    stream._pendingAbortRequest._reject(error);

    stream._pendingAbortRequest = undefined;
  }

  WritableStreamDealWithRejection(stream, error);
}

function WritableStreamCloseQueuedOrInFlight(stream) {
  if (stream._closeRequest === undefined && stream._inFlightCloseRequest === undefined) {
    return false;
  }

  return true;
}

function WritableStreamHasOperationMarkedInFlight(stream) {
  if (stream._inFlightWriteRequest === undefined && stream._inFlightCloseRequest === undefined) {
    return false;
  }

  return true;
}

function WritableStreamMarkCloseRequestInFlight(stream) {
  stream._inFlightCloseRequest = stream._closeRequest;
  stream._closeRequest = undefined;
}

function WritableStreamMarkFirstWriteRequestInFlight(stream) {
  stream._inFlightWriteRequest = stream._writeRequests.shift();
}

function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
  if (stream._closeRequest !== undefined) {
    stream._closeRequest._reject(stream._storedError);

    stream._closeRequest = undefined;
  }

  var writer = stream._writer;

  if (writer !== undefined) {
    defaultWriterClosedPromiseReject(writer, stream._storedError);
  }
}

function WritableStreamUpdateBackpressure(stream, backpressure) {
  var writer = stream._writer;

  if (writer !== undefined && backpressure !== stream._backpressure) {
    if (backpressure) {
      defaultWriterReadyPromiseReset(writer);
    } else {
      defaultWriterReadyPromiseResolve(writer);
    }
  }

  stream._backpressure = backpressure;
}

var WritableStreamDefaultWriter = function () {
  function WritableStreamDefaultWriter(stream) {
    assertRequiredArgument(stream, 1, 'WritableStreamDefaultWriter');
    assertWritableStream(stream, 'First parameter');

    if (IsWritableStreamLocked(stream)) {
      throw new TypeError('This stream has already been locked for exclusive writing by another writer');
    }

    this._ownerWritableStream = stream;
    stream._writer = this;
    var state = stream._state;

    if (state === 'writable') {
      if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
        defaultWriterReadyPromiseInitialize(this);
      } else {
        defaultWriterReadyPromiseInitializeAsResolved(this);
      }

      defaultWriterClosedPromiseInitialize(this);
    } else if (state === 'erroring') {
      defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
      defaultWriterClosedPromiseInitialize(this);
    } else if (state === 'closed') {
      defaultWriterReadyPromiseInitializeAsResolved(this);
      defaultWriterClosedPromiseInitializeAsResolved(this);
    } else {
      var storedError = stream._storedError;
      defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
      defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
    }
  }

  Object.defineProperty(WritableStreamDefaultWriter.prototype, "closed", {
    get: function () {
      if (!IsWritableStreamDefaultWriter(this)) {
        return promiseRejectedWith(defaultWriterBrandCheckException('closed'));
      }

      return this._closedPromise;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WritableStreamDefaultWriter.prototype, "desiredSize", {
    get: function () {
      if (!IsWritableStreamDefaultWriter(this)) {
        throw defaultWriterBrandCheckException('desiredSize');
      }

      if (this._ownerWritableStream === undefined) {
        throw defaultWriterLockException('desiredSize');
      }

      return WritableStreamDefaultWriterGetDesiredSize(this);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WritableStreamDefaultWriter.prototype, "ready", {
    get: function () {
      if (!IsWritableStreamDefaultWriter(this)) {
        return promiseRejectedWith(defaultWriterBrandCheckException('ready'));
      }

      return this._readyPromise;
    },
    enumerable: false,
    configurable: true
  });

  WritableStreamDefaultWriter.prototype.abort = function (reason) {
    if (reason === void 0) {
      reason = undefined;
    }

    if (!IsWritableStreamDefaultWriter(this)) {
      return promiseRejectedWith(defaultWriterBrandCheckException('abort'));
    }

    if (this._ownerWritableStream === undefined) {
      return promiseRejectedWith(defaultWriterLockException('abort'));
    }

    return WritableStreamDefaultWriterAbort(this, reason);
  };

  WritableStreamDefaultWriter.prototype.close = function () {
    if (!IsWritableStreamDefaultWriter(this)) {
      return promiseRejectedWith(defaultWriterBrandCheckException('close'));
    }

    var stream = this._ownerWritableStream;

    if (stream === undefined) {
      return promiseRejectedWith(defaultWriterLockException('close'));
    }

    if (WritableStreamCloseQueuedOrInFlight(stream)) {
      return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
    }

    return WritableStreamDefaultWriterClose(this);
  };

  WritableStreamDefaultWriter.prototype.releaseLock = function () {
    if (!IsWritableStreamDefaultWriter(this)) {
      throw defaultWriterBrandCheckException('releaseLock');
    }

    var stream = this._ownerWritableStream;

    if (stream === undefined) {
      return;
    }

    WritableStreamDefaultWriterRelease(this);
  };

  WritableStreamDefaultWriter.prototype.write = function (chunk) {
    if (chunk === void 0) {
      chunk = undefined;
    }

    if (!IsWritableStreamDefaultWriter(this)) {
      return promiseRejectedWith(defaultWriterBrandCheckException('write'));
    }

    if (this._ownerWritableStream === undefined) {
      return promiseRejectedWith(defaultWriterLockException('write to'));
    }

    return WritableStreamDefaultWriterWrite(this, chunk);
  };

  return WritableStreamDefaultWriter;
}();

Object.defineProperties(WritableStreamDefaultWriter.prototype, {
  abort: {
    enumerable: true
  },
  close: {
    enumerable: true
  },
  releaseLock: {
    enumerable: true
  },
  write: {
    enumerable: true
  },
  closed: {
    enumerable: true
  },
  desiredSize: {
    enumerable: true
  },
  ready: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
    value: 'WritableStreamDefaultWriter',
    configurable: true
  });
}

function IsWritableStreamDefaultWriter(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_ownerWritableStream')) {
    return false;
  }

  return true;
}

function WritableStreamDefaultWriterAbort(writer, reason) {
  var stream = writer._ownerWritableStream;
  return WritableStreamAbort(stream, reason);
}

function WritableStreamDefaultWriterClose(writer) {
  var stream = writer._ownerWritableStream;
  return WritableStreamClose(stream);
}

function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
  var stream = writer._ownerWritableStream;
  var state = stream._state;

  if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
    return promiseResolvedWith(undefined);
  }

  if (state === 'errored') {
    return promiseRejectedWith(stream._storedError);
  }

  return WritableStreamDefaultWriterClose(writer);
}

function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
  if (writer._closedPromiseState === 'pending') {
    defaultWriterClosedPromiseReject(writer, error);
  } else {
    defaultWriterClosedPromiseResetToRejected(writer, error);
  }
}

function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
  if (writer._readyPromiseState === 'pending') {
    defaultWriterReadyPromiseReject(writer, error);
  } else {
    defaultWriterReadyPromiseResetToRejected(writer, error);
  }
}

function WritableStreamDefaultWriterGetDesiredSize(writer) {
  var stream = writer._ownerWritableStream;
  var state = stream._state;

  if (state === 'errored' || state === 'erroring') {
    return null;
  }

  if (state === 'closed') {
    return 0;
  }

  return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
}

function WritableStreamDefaultWriterRelease(writer) {
  var stream = writer._ownerWritableStream;
  var releasedError = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
  WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
  WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
  stream._writer = undefined;
  writer._ownerWritableStream = undefined;
}

function WritableStreamDefaultWriterWrite(writer, chunk) {
  var stream = writer._ownerWritableStream;
  var controller = stream._writableStreamController;
  var chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);

  if (stream !== writer._ownerWritableStream) {
    return promiseRejectedWith(defaultWriterLockException('write to'));
  }

  var state = stream._state;

  if (state === 'errored') {
    return promiseRejectedWith(stream._storedError);
  }

  if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
    return promiseRejectedWith(new TypeError('The stream is closing or closed and cannot be written to'));
  }

  if (state === 'erroring') {
    return promiseRejectedWith(stream._storedError);
  }

  var promise = WritableStreamAddWriteRequest(stream);
  WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
  return promise;
}

var closeSentinel = {};

var WritableStreamDefaultController = function () {
  function WritableStreamDefaultController() {
    throw new TypeError('Illegal constructor');
  }

  WritableStreamDefaultController.prototype.error = function (e) {
    if (e === void 0) {
      e = undefined;
    }

    if (!IsWritableStreamDefaultController(this)) {
      throw new TypeError('WritableStreamDefaultController.prototype.error can only be used on a WritableStreamDefaultController');
    }

    var state = this._controlledWritableStream._state;

    if (state !== 'writable') {
      return;
    }

    WritableStreamDefaultControllerError(this, e);
  };

  WritableStreamDefaultController.prototype[AbortSteps] = function (reason) {
    var result = this._abortAlgorithm(reason);

    WritableStreamDefaultControllerClearAlgorithms(this);
    return result;
  };

  WritableStreamDefaultController.prototype[ErrorSteps] = function () {
    ResetQueue(this);
  };

  return WritableStreamDefaultController;
}();

Object.defineProperties(WritableStreamDefaultController.prototype, {
  error: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
    value: 'WritableStreamDefaultController',
    configurable: true
  });
}

function IsWritableStreamDefaultController(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_controlledWritableStream')) {
    return false;
  }

  return true;
}

function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
  controller._controlledWritableStream = stream;
  stream._writableStreamController = controller;
  controller._queue = undefined;
  controller._queueTotalSize = undefined;
  ResetQueue(controller);
  controller._started = false;
  controller._strategySizeAlgorithm = sizeAlgorithm;
  controller._strategyHWM = highWaterMark;
  controller._writeAlgorithm = writeAlgorithm;
  controller._closeAlgorithm = closeAlgorithm;
  controller._abortAlgorithm = abortAlgorithm;
  var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
  WritableStreamUpdateBackpressure(stream, backpressure);
  var startResult = startAlgorithm();
  var startPromise = promiseResolvedWith(startResult);
  uponPromise(startPromise, function () {
    controller._started = true;
    WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
  }, function (r) {
    controller._started = true;
    WritableStreamDealWithRejection(stream, r);
  });
}

function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
  var controller = Object.create(WritableStreamDefaultController.prototype);

  var startAlgorithm = function () {
    return undefined;
  };

  var writeAlgorithm = function () {
    return promiseResolvedWith(undefined);
  };

  var closeAlgorithm = function () {
    return promiseResolvedWith(undefined);
  };

  var abortAlgorithm = function () {
    return promiseResolvedWith(undefined);
  };

  if (underlyingSink.start !== undefined) {
    startAlgorithm = function () {
      return underlyingSink.start(controller);
    };
  }

  if (underlyingSink.write !== undefined) {
    writeAlgorithm = function (chunk) {
      return underlyingSink.write(chunk, controller);
    };
  }

  if (underlyingSink.close !== undefined) {
    closeAlgorithm = function () {
      return underlyingSink.close();
    };
  }

  if (underlyingSink.abort !== undefined) {
    abortAlgorithm = function (reason) {
      return underlyingSink.abort(reason);
    };
  }

  SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
}

function WritableStreamDefaultControllerClearAlgorithms(controller) {
  controller._writeAlgorithm = undefined;
  controller._closeAlgorithm = undefined;
  controller._abortAlgorithm = undefined;
  controller._strategySizeAlgorithm = undefined;
}

function WritableStreamDefaultControllerClose(controller) {
  EnqueueValueWithSize(controller, closeSentinel, 0);
  WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
}

function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
  try {
    return controller._strategySizeAlgorithm(chunk);
  } catch (chunkSizeE) {
    WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
    return 1;
  }
}

function WritableStreamDefaultControllerGetDesiredSize(controller) {
  return controller._strategyHWM - controller._queueTotalSize;
}

function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
  try {
    EnqueueValueWithSize(controller, chunk, chunkSize);
  } catch (enqueueE) {
    WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
    return;
  }

  var stream = controller._controlledWritableStream;

  if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === 'writable') {
    var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
    WritableStreamUpdateBackpressure(stream, backpressure);
  }

  WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
}

function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
  var stream = controller._controlledWritableStream;

  if (!controller._started) {
    return;
  }

  if (stream._inFlightWriteRequest !== undefined) {
    return;
  }

  var state = stream._state;

  if (state === 'erroring') {
    WritableStreamFinishErroring(stream);
    return;
  }

  if (controller._queue.length === 0) {
    return;
  }

  var value = PeekQueueValue(controller);

  if (value === closeSentinel) {
    WritableStreamDefaultControllerProcessClose(controller);
  } else {
    WritableStreamDefaultControllerProcessWrite(controller, value);
  }
}

function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
  if (controller._controlledWritableStream._state === 'writable') {
    WritableStreamDefaultControllerError(controller, error);
  }
}

function WritableStreamDefaultControllerProcessClose(controller) {
  var stream = controller._controlledWritableStream;
  WritableStreamMarkCloseRequestInFlight(stream);
  DequeueValue(controller);

  var sinkClosePromise = controller._closeAlgorithm();

  WritableStreamDefaultControllerClearAlgorithms(controller);
  uponPromise(sinkClosePromise, function () {
    WritableStreamFinishInFlightClose(stream);
  }, function (reason) {
    WritableStreamFinishInFlightCloseWithError(stream, reason);
  });
}

function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
  var stream = controller._controlledWritableStream;
  WritableStreamMarkFirstWriteRequestInFlight(stream);

  var sinkWritePromise = controller._writeAlgorithm(chunk);

  uponPromise(sinkWritePromise, function () {
    WritableStreamFinishInFlightWrite(stream);
    var state = stream._state;
    DequeueValue(controller);

    if (!WritableStreamCloseQueuedOrInFlight(stream) && state === 'writable') {
      var backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
      WritableStreamUpdateBackpressure(stream, backpressure);
    }

    WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
  }, function (reason) {
    if (stream._state === 'writable') {
      WritableStreamDefaultControllerClearAlgorithms(controller);
    }

    WritableStreamFinishInFlightWriteWithError(stream, reason);
  });
}

function WritableStreamDefaultControllerGetBackpressure(controller) {
  var desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
  return desiredSize <= 0;
}

function WritableStreamDefaultControllerError(controller, error) {
  var stream = controller._controlledWritableStream;
  WritableStreamDefaultControllerClearAlgorithms(controller);
  WritableStreamStartErroring(stream, error);
}

function streamBrandCheckException(name) {
  return new TypeError("WritableStream.prototype." + name + " can only be used on a WritableStream");
}

function defaultWriterBrandCheckException(name) {
  return new TypeError("WritableStreamDefaultWriter.prototype." + name + " can only be used on a WritableStreamDefaultWriter");
}

function defaultWriterLockException(name) {
  return new TypeError('Cannot ' + name + ' a stream using a released writer');
}

function defaultWriterClosedPromiseInitialize(writer) {
  writer._closedPromise = newPromise(function (resolve, reject) {
    writer._closedPromise_resolve = resolve;
    writer._closedPromise_reject = reject;
    writer._closedPromiseState = 'pending';
  });
}

function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
  defaultWriterClosedPromiseInitialize(writer);
  defaultWriterClosedPromiseReject(writer, reason);
}

function defaultWriterClosedPromiseInitializeAsResolved(writer) {
  defaultWriterClosedPromiseInitialize(writer);
  defaultWriterClosedPromiseResolve(writer);
}

function defaultWriterClosedPromiseReject(writer, reason) {
  setPromiseIsHandledToTrue(writer._closedPromise);

  writer._closedPromise_reject(reason);

  writer._closedPromise_resolve = undefined;
  writer._closedPromise_reject = undefined;
  writer._closedPromiseState = 'rejected';
}

function defaultWriterClosedPromiseResetToRejected(writer, reason) {
  defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
}

function defaultWriterClosedPromiseResolve(writer) {
  writer._closedPromise_resolve(undefined);

  writer._closedPromise_resolve = undefined;
  writer._closedPromise_reject = undefined;
  writer._closedPromiseState = 'resolved';
}

function defaultWriterReadyPromiseInitialize(writer) {
  writer._readyPromise = newPromise(function (resolve, reject) {
    writer._readyPromise_resolve = resolve;
    writer._readyPromise_reject = reject;
  });
  writer._readyPromiseState = 'pending';
}

function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
  defaultWriterReadyPromiseInitialize(writer);
  defaultWriterReadyPromiseReject(writer, reason);
}

function defaultWriterReadyPromiseInitializeAsResolved(writer) {
  defaultWriterReadyPromiseInitialize(writer);
  defaultWriterReadyPromiseResolve(writer);
}

function defaultWriterReadyPromiseReject(writer, reason) {
  setPromiseIsHandledToTrue(writer._readyPromise);

  writer._readyPromise_reject(reason);

  writer._readyPromise_resolve = undefined;
  writer._readyPromise_reject = undefined;
  writer._readyPromiseState = 'rejected';
}

function defaultWriterReadyPromiseReset(writer) {
  defaultWriterReadyPromiseInitialize(writer);
}

function defaultWriterReadyPromiseResetToRejected(writer, reason) {
  defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
}

function defaultWriterReadyPromiseResolve(writer) {
  writer._readyPromise_resolve(undefined);

  writer._readyPromise_resolve = undefined;
  writer._readyPromise_reject = undefined;
  writer._readyPromiseState = 'fulfilled';
}

function isAbortSignal(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  try {
    return typeof value.aborted === 'boolean';
  } catch (_a) {
    return false;
  }
}

var NativeDOMException = typeof DOMException !== 'undefined' ? DOMException : undefined;

function isDOMExceptionConstructor(ctor) {
  if (!(typeof ctor === 'function' || typeof ctor === 'object')) {
    return false;
  }

  try {
    new ctor();
    return true;
  } catch (_a) {
    return false;
  }
}

function createDOMExceptionPolyfill() {
  var ctor = function DOMException(message, name) {
    this.message = message || '';
    this.name = name || 'Error';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  };

  ctor.prototype = Object.create(Error.prototype);
  Object.defineProperty(ctor.prototype, 'constructor', {
    value: ctor,
    writable: true,
    configurable: true
  });
  return ctor;
}

var DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();

function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
  var reader = AcquireReadableStreamDefaultReader(source);
  var writer = AcquireWritableStreamDefaultWriter(dest);
  source._disturbed = true;
  var shuttingDown = false;
  var currentWrite = promiseResolvedWith(undefined);
  return newPromise(function (resolve, reject) {
    var abortAlgorithm;

    if (signal !== undefined) {
      abortAlgorithm = function () {
        var error = new DOMException$1('Aborted', 'AbortError');
        var actions = [];

        if (!preventAbort) {
          actions.push(function () {
            if (dest._state === 'writable') {
              return WritableStreamAbort(dest, error);
            }

            return promiseResolvedWith(undefined);
          });
        }

        if (!preventCancel) {
          actions.push(function () {
            if (source._state === 'readable') {
              return ReadableStreamCancel(source, error);
            }

            return promiseResolvedWith(undefined);
          });
        }

        shutdownWithAction(function () {
          return Promise.all(actions.map(function (action) {
            return action();
          }));
        }, true, error);
      };

      if (signal.aborted) {
        abortAlgorithm();
        return;
      }

      signal.addEventListener('abort', abortAlgorithm);
    }

    function pipeLoop() {
      return newPromise(function (resolveLoop, rejectLoop) {
        function next(done) {
          if (done) {
            resolveLoop();
          } else {
            PerformPromiseThen(pipeStep(), next, rejectLoop);
          }
        }

        next(false);
      });
    }

    function pipeStep() {
      if (shuttingDown) {
        return promiseResolvedWith(true);
      }

      return PerformPromiseThen(writer._readyPromise, function () {
        return newPromise(function (resolveRead, rejectRead) {
          ReadableStreamDefaultReaderRead(reader, {
            _chunkSteps: function (chunk) {
              currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), undefined, noop);
              resolveRead(false);
            },
            _closeSteps: function () {
              return resolveRead(true);
            },
            _errorSteps: rejectRead
          });
        });
      });
    }

    isOrBecomesErrored(source, reader._closedPromise, function (storedError) {
      if (!preventAbort) {
        shutdownWithAction(function () {
          return WritableStreamAbort(dest, storedError);
        }, true, storedError);
      } else {
        shutdown(true, storedError);
      }
    });
    isOrBecomesErrored(dest, writer._closedPromise, function (storedError) {
      if (!preventCancel) {
        shutdownWithAction(function () {
          return ReadableStreamCancel(source, storedError);
        }, true, storedError);
      } else {
        shutdown(true, storedError);
      }
    });
    isOrBecomesClosed(source, reader._closedPromise, function () {
      if (!preventClose) {
        shutdownWithAction(function () {
          return WritableStreamDefaultWriterCloseWithErrorPropagation(writer);
        });
      } else {
        shutdown();
      }
    });

    if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === 'closed') {
      var destClosed_1 = new TypeError('the destination writable stream closed before all data could be piped to it');

      if (!preventCancel) {
        shutdownWithAction(function () {
          return ReadableStreamCancel(source, destClosed_1);
        }, true, destClosed_1);
      } else {
        shutdown(true, destClosed_1);
      }
    }

    setPromiseIsHandledToTrue(pipeLoop());

    function waitForWritesToFinish() {
      var oldCurrentWrite = currentWrite;
      return PerformPromiseThen(currentWrite, function () {
        return oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : undefined;
      });
    }

    function isOrBecomesErrored(stream, promise, action) {
      if (stream._state === 'errored') {
        action(stream._storedError);
      } else {
        uponRejection(promise, action);
      }
    }

    function isOrBecomesClosed(stream, promise, action) {
      if (stream._state === 'closed') {
        action();
      } else {
        uponFulfillment(promise, action);
      }
    }

    function shutdownWithAction(action, originalIsError, originalError) {
      if (shuttingDown) {
        return;
      }

      shuttingDown = true;

      if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
        uponFulfillment(waitForWritesToFinish(), doTheRest);
      } else {
        doTheRest();
      }

      function doTheRest() {
        uponPromise(action(), function () {
          return finalize(originalIsError, originalError);
        }, function (newError) {
          return finalize(true, newError);
        });
      }
    }

    function shutdown(isError, error) {
      if (shuttingDown) {
        return;
      }

      shuttingDown = true;

      if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
        uponFulfillment(waitForWritesToFinish(), function () {
          return finalize(isError, error);
        });
      } else {
        finalize(isError, error);
      }
    }

    function finalize(isError, error) {
      WritableStreamDefaultWriterRelease(writer);
      ReadableStreamReaderGenericRelease(reader);

      if (signal !== undefined) {
        signal.removeEventListener('abort', abortAlgorithm);
      }

      if (isError) {
        reject(error);
      } else {
        resolve(undefined);
      }
    }
  });
}

var ReadableStreamDefaultController = function () {
  function ReadableStreamDefaultController() {
    throw new TypeError('Illegal constructor');
  }

  Object.defineProperty(ReadableStreamDefaultController.prototype, "desiredSize", {
    get: function () {
      if (!IsReadableStreamDefaultController(this)) {
        throw defaultControllerBrandCheckException('desiredSize');
      }

      return ReadableStreamDefaultControllerGetDesiredSize(this);
    },
    enumerable: false,
    configurable: true
  });

  ReadableStreamDefaultController.prototype.close = function () {
    if (!IsReadableStreamDefaultController(this)) {
      throw defaultControllerBrandCheckException('close');
    }

    if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
      throw new TypeError('The stream is not in a state that permits close');
    }

    ReadableStreamDefaultControllerClose(this);
  };

  ReadableStreamDefaultController.prototype.enqueue = function (chunk) {
    if (chunk === void 0) {
      chunk = undefined;
    }

    if (!IsReadableStreamDefaultController(this)) {
      throw defaultControllerBrandCheckException('enqueue');
    }

    if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
      throw new TypeError('The stream is not in a state that permits enqueue');
    }

    return ReadableStreamDefaultControllerEnqueue(this, chunk);
  };

  ReadableStreamDefaultController.prototype.error = function (e) {
    if (e === void 0) {
      e = undefined;
    }

    if (!IsReadableStreamDefaultController(this)) {
      throw defaultControllerBrandCheckException('error');
    }

    ReadableStreamDefaultControllerError(this, e);
  };

  ReadableStreamDefaultController.prototype[CancelSteps] = function (reason) {
    ResetQueue(this);

    var result = this._cancelAlgorithm(reason);

    ReadableStreamDefaultControllerClearAlgorithms(this);
    return result;
  };

  ReadableStreamDefaultController.prototype[PullSteps] = function (readRequest) {
    var stream = this._controlledReadableStream;

    if (this._queue.length > 0) {
      var chunk = DequeueValue(this);

      if (this._closeRequested && this._queue.length === 0) {
        ReadableStreamDefaultControllerClearAlgorithms(this);
        ReadableStreamClose(stream);
      } else {
        ReadableStreamDefaultControllerCallPullIfNeeded(this);
      }

      readRequest._chunkSteps(chunk);
    } else {
      ReadableStreamAddReadRequest(stream, readRequest);
      ReadableStreamDefaultControllerCallPullIfNeeded(this);
    }
  };

  return ReadableStreamDefaultController;
}();

Object.defineProperties(ReadableStreamDefaultController.prototype, {
  close: {
    enumerable: true
  },
  enqueue: {
    enumerable: true
  },
  error: {
    enumerable: true
  },
  desiredSize: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
    value: 'ReadableStreamDefaultController',
    configurable: true
  });
}

function IsReadableStreamDefaultController(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableStream')) {
    return false;
  }

  return true;
}

function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
  var shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);

  if (!shouldPull) {
    return;
  }

  if (controller._pulling) {
    controller._pullAgain = true;
    return;
  }

  controller._pulling = true;

  var pullPromise = controller._pullAlgorithm();

  uponPromise(pullPromise, function () {
    controller._pulling = false;

    if (controller._pullAgain) {
      controller._pullAgain = false;
      ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
  }, function (e) {
    ReadableStreamDefaultControllerError(controller, e);
  });
}

function ReadableStreamDefaultControllerShouldCallPull(controller) {
  var stream = controller._controlledReadableStream;

  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
    return false;
  }

  if (!controller._started) {
    return false;
  }

  if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
    return true;
  }

  var desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);

  if (desiredSize > 0) {
    return true;
  }

  return false;
}

function ReadableStreamDefaultControllerClearAlgorithms(controller) {
  controller._pullAlgorithm = undefined;
  controller._cancelAlgorithm = undefined;
  controller._strategySizeAlgorithm = undefined;
}

function ReadableStreamDefaultControllerClose(controller) {
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
    return;
  }

  var stream = controller._controlledReadableStream;
  controller._closeRequested = true;

  if (controller._queue.length === 0) {
    ReadableStreamDefaultControllerClearAlgorithms(controller);
    ReadableStreamClose(stream);
  }
}

function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
    return;
  }

  var stream = controller._controlledReadableStream;

  if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
    ReadableStreamFulfillReadRequest(stream, chunk, false);
  } else {
    var chunkSize = void 0;

    try {
      chunkSize = controller._strategySizeAlgorithm(chunk);
    } catch (chunkSizeE) {
      ReadableStreamDefaultControllerError(controller, chunkSizeE);
      throw chunkSizeE;
    }

    try {
      EnqueueValueWithSize(controller, chunk, chunkSize);
    } catch (enqueueE) {
      ReadableStreamDefaultControllerError(controller, enqueueE);
      throw enqueueE;
    }
  }

  ReadableStreamDefaultControllerCallPullIfNeeded(controller);
}

function ReadableStreamDefaultControllerError(controller, e) {
  var stream = controller._controlledReadableStream;

  if (stream._state !== 'readable') {
    return;
  }

  ResetQueue(controller);
  ReadableStreamDefaultControllerClearAlgorithms(controller);
  ReadableStreamError(stream, e);
}

function ReadableStreamDefaultControllerGetDesiredSize(controller) {
  var stream = controller._controlledReadableStream;
  var state = stream._state;

  if (state === 'errored') {
    return null;
  }

  if (state === 'closed') {
    return 0;
  }

  return controller._strategyHWM - controller._queueTotalSize;
}

function ReadableStreamDefaultControllerHasBackpressure(controller) {
  if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
    return false;
  }

  return true;
}

function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
  var state = controller._controlledReadableStream._state;

  if (!controller._closeRequested && state === 'readable') {
    return true;
  }

  return false;
}

function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
  controller._controlledReadableStream = stream;
  controller._queue = undefined;
  controller._queueTotalSize = undefined;
  ResetQueue(controller);
  controller._started = false;
  controller._closeRequested = false;
  controller._pullAgain = false;
  controller._pulling = false;
  controller._strategySizeAlgorithm = sizeAlgorithm;
  controller._strategyHWM = highWaterMark;
  controller._pullAlgorithm = pullAlgorithm;
  controller._cancelAlgorithm = cancelAlgorithm;
  stream._readableStreamController = controller;
  var startResult = startAlgorithm();
  uponPromise(promiseResolvedWith(startResult), function () {
    controller._started = true;
    ReadableStreamDefaultControllerCallPullIfNeeded(controller);
  }, function (r) {
    ReadableStreamDefaultControllerError(controller, r);
  });
}

function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
  var controller = Object.create(ReadableStreamDefaultController.prototype);

  var startAlgorithm = function () {
    return undefined;
  };

  var pullAlgorithm = function () {
    return promiseResolvedWith(undefined);
  };

  var cancelAlgorithm = function () {
    return promiseResolvedWith(undefined);
  };

  if (underlyingSource.start !== undefined) {
    startAlgorithm = function () {
      return underlyingSource.start(controller);
    };
  }

  if (underlyingSource.pull !== undefined) {
    pullAlgorithm = function () {
      return underlyingSource.pull(controller);
    };
  }

  if (underlyingSource.cancel !== undefined) {
    cancelAlgorithm = function (reason) {
      return underlyingSource.cancel(reason);
    };
  }

  SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
}

function defaultControllerBrandCheckException(name) {
  return new TypeError("ReadableStreamDefaultController.prototype." + name + " can only be used on a ReadableStreamDefaultController");
}

function ReadableStreamTee(stream, cloneForBranch2) {
  var reader = AcquireReadableStreamDefaultReader(stream);
  var reading = false;
  var canceled1 = false;
  var canceled2 = false;
  var reason1;
  var reason2;
  var branch1;
  var branch2;
  var resolveCancelPromise;
  var cancelPromise = newPromise(function (resolve) {
    resolveCancelPromise = resolve;
  });

  function pullAlgorithm() {
    if (reading) {
      return promiseResolvedWith(undefined);
    }

    reading = true;
    var readRequest = {
      _chunkSteps: function (value) {
        queueMicrotask(function () {
          reading = false;
          var value1 = value;
          var value2 = value;

          if (!canceled1) {
            ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, value1);
          }

          if (!canceled2) {
            ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, value2);
          }
        });
      },
      _closeSteps: function () {
        reading = false;

        if (!canceled1) {
          ReadableStreamDefaultControllerClose(branch1._readableStreamController);
        }

        if (!canceled2) {
          ReadableStreamDefaultControllerClose(branch2._readableStreamController);
        }
      },
      _errorSteps: function () {
        reading = false;
      }
    };
    ReadableStreamDefaultReaderRead(reader, readRequest);
    return promiseResolvedWith(undefined);
  }

  function cancel1Algorithm(reason) {
    canceled1 = true;
    reason1 = reason;

    if (canceled2) {
      var compositeReason = CreateArrayFromList([reason1, reason2]);
      var cancelResult = ReadableStreamCancel(stream, compositeReason);
      resolveCancelPromise(cancelResult);
    }

    return cancelPromise;
  }

  function cancel2Algorithm(reason) {
    canceled2 = true;
    reason2 = reason;

    if (canceled1) {
      var compositeReason = CreateArrayFromList([reason1, reason2]);
      var cancelResult = ReadableStreamCancel(stream, compositeReason);
      resolveCancelPromise(cancelResult);
    }

    return cancelPromise;
  }

  function startAlgorithm() {}

  branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
  branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
  uponRejection(reader._closedPromise, function (r) {
    ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
    ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
  });
  return [branch1, branch2];
}

function convertUnderlyingDefaultOrByteSource(source, context) {
  assertDictionary(source, context);
  var original = source;
  var autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
  var cancel = original === null || original === void 0 ? void 0 : original.cancel;
  var pull = original === null || original === void 0 ? void 0 : original.pull;
  var start = original === null || original === void 0 ? void 0 : original.start;
  var type = original === null || original === void 0 ? void 0 : original.type;
  return {
    autoAllocateChunkSize: autoAllocateChunkSize === undefined ? undefined : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, context + " has member 'autoAllocateChunkSize' that"),
    cancel: cancel === undefined ? undefined : convertUnderlyingSourceCancelCallback(cancel, original, context + " has member 'cancel' that"),
    pull: pull === undefined ? undefined : convertUnderlyingSourcePullCallback(pull, original, context + " has member 'pull' that"),
    start: start === undefined ? undefined : convertUnderlyingSourceStartCallback(start, original, context + " has member 'start' that"),
    type: type === undefined ? undefined : convertReadableStreamType(type, context + " has member 'type' that")
  };
}

function convertUnderlyingSourceCancelCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (reason) {
    return promiseCall(fn, original, [reason]);
  };
}

function convertUnderlyingSourcePullCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
    return promiseCall(fn, original, [controller]);
  };
}

function convertUnderlyingSourceStartCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
    return reflectCall(fn, original, [controller]);
  };
}

function convertReadableStreamType(type, context) {
  type = "" + type;

  if (type !== 'bytes') {
    throw new TypeError(context + " '" + type + "' is not a valid enumeration value for ReadableStreamType");
  }

  return type;
}

function convertReaderOptions(options, context) {
  assertDictionary(options, context);
  var mode = options === null || options === void 0 ? void 0 : options.mode;
  return {
    mode: mode === undefined ? undefined : convertReadableStreamReaderMode(mode, context + " has member 'mode' that")
  };
}

function convertReadableStreamReaderMode(mode, context) {
  mode = "" + mode;

  if (mode !== 'byob') {
    throw new TypeError(context + " '" + mode + "' is not a valid enumeration value for ReadableStreamReaderMode");
  }

  return mode;
}

function convertIteratorOptions(options, context) {
  assertDictionary(options, context);
  var preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
  return {
    preventCancel: Boolean(preventCancel)
  };
}

function convertPipeOptions(options, context) {
  assertDictionary(options, context);
  var preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
  var preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
  var preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
  var signal = options === null || options === void 0 ? void 0 : options.signal;

  if (signal !== undefined) {
    assertAbortSignal(signal, context + " has member 'signal' that");
  }

  return {
    preventAbort: Boolean(preventAbort),
    preventCancel: Boolean(preventCancel),
    preventClose: Boolean(preventClose),
    signal: signal
  };
}

function assertAbortSignal(signal, context) {
  if (!isAbortSignal(signal)) {
    throw new TypeError(context + " is not an AbortSignal.");
  }
}

function convertReadableWritablePair(pair, context) {
  assertDictionary(pair, context);
  var readable = pair === null || pair === void 0 ? void 0 : pair.readable;
  assertRequiredField(readable, 'readable', 'ReadableWritablePair');
  assertReadableStream(readable, context + " has member 'readable' that");
  var writable = pair === null || pair === void 0 ? void 0 : pair.writable;
  assertRequiredField(writable, 'writable', 'ReadableWritablePair');
  assertWritableStream(writable, context + " has member 'writable' that");
  return {
    readable: readable,
    writable: writable
  };
}

var ReadableStream = function () {
  function ReadableStream(rawUnderlyingSource, rawStrategy) {
    if (rawUnderlyingSource === void 0) {
      rawUnderlyingSource = {};
    }

    if (rawStrategy === void 0) {
      rawStrategy = {};
    }

    if (rawUnderlyingSource === undefined) {
      rawUnderlyingSource = null;
    } else {
      assertObject(rawUnderlyingSource, 'First parameter');
    }

    var strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
    var underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, 'First parameter');
    InitializeReadableStream(this);

    if (underlyingSource.type === 'bytes') {
      if (strategy.size !== undefined) {
        throw new RangeError('The strategy for a byte stream cannot have a size function');
      }

      var highWaterMark = ExtractHighWaterMark(strategy, 0);
      SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
    } else {
      var sizeAlgorithm = ExtractSizeAlgorithm(strategy);
      var highWaterMark = ExtractHighWaterMark(strategy, 1);
      SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
    }
  }

  Object.defineProperty(ReadableStream.prototype, "locked", {
    get: function () {
      if (!IsReadableStream(this)) {
        throw streamBrandCheckException$1('locked');
      }

      return IsReadableStreamLocked(this);
    },
    enumerable: false,
    configurable: true
  });

  ReadableStream.prototype.cancel = function (reason) {
    if (reason === void 0) {
      reason = undefined;
    }

    if (!IsReadableStream(this)) {
      return promiseRejectedWith(streamBrandCheckException$1('cancel'));
    }

    if (IsReadableStreamLocked(this)) {
      return promiseRejectedWith(new TypeError('Cannot cancel a stream that already has a reader'));
    }

    return ReadableStreamCancel(this, reason);
  };

  ReadableStream.prototype.getReader = function (rawOptions) {
    if (rawOptions === void 0) {
      rawOptions = undefined;
    }

    if (!IsReadableStream(this)) {
      throw streamBrandCheckException$1('getReader');
    }

    var options = convertReaderOptions(rawOptions, 'First parameter');

    if (options.mode === undefined) {
      return AcquireReadableStreamDefaultReader(this);
    }

    return AcquireReadableStreamBYOBReader(this);
  };

  ReadableStream.prototype.pipeThrough = function (rawTransform, rawOptions) {
    if (rawOptions === void 0) {
      rawOptions = {};
    }

    if (!IsReadableStream(this)) {
      throw streamBrandCheckException$1('pipeThrough');
    }

    assertRequiredArgument(rawTransform, 1, 'pipeThrough');
    var transform = convertReadableWritablePair(rawTransform, 'First parameter');
    var options = convertPipeOptions(rawOptions, 'Second parameter');

    if (IsReadableStreamLocked(this)) {
      throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream');
    }

    if (IsWritableStreamLocked(transform.writable)) {
      throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream');
    }

    var promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
    setPromiseIsHandledToTrue(promise);
    return transform.readable;
  };

  ReadableStream.prototype.pipeTo = function (destination, rawOptions) {
    if (rawOptions === void 0) {
      rawOptions = {};
    }

    if (!IsReadableStream(this)) {
      return promiseRejectedWith(streamBrandCheckException$1('pipeTo'));
    }

    if (destination === undefined) {
      return promiseRejectedWith("Parameter 1 is required in 'pipeTo'.");
    }

    if (!IsWritableStream(destination)) {
      return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
    }

    var options;

    try {
      options = convertPipeOptions(rawOptions, 'Second parameter');
    } catch (e) {
      return promiseRejectedWith(e);
    }

    if (IsReadableStreamLocked(this)) {
      return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'));
    }

    if (IsWritableStreamLocked(destination)) {
      return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'));
    }

    return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
  };

  ReadableStream.prototype.tee = function () {
    if (!IsReadableStream(this)) {
      throw streamBrandCheckException$1('tee');
    }

    var branches = ReadableStreamTee(this);
    return CreateArrayFromList(branches);
  };

  ReadableStream.prototype.values = function (rawOptions) {
    if (rawOptions === void 0) {
      rawOptions = undefined;
    }

    if (!IsReadableStream(this)) {
      throw streamBrandCheckException$1('values');
    }

    var options = convertIteratorOptions(rawOptions, 'First parameter');
    return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
  };

  return ReadableStream;
}();

Object.defineProperties(ReadableStream.prototype, {
  cancel: {
    enumerable: true
  },
  getReader: {
    enumerable: true
  },
  pipeThrough: {
    enumerable: true
  },
  pipeTo: {
    enumerable: true
  },
  tee: {
    enumerable: true
  },
  values: {
    enumerable: true
  },
  locked: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.toStringTag, {
    value: 'ReadableStream',
    configurable: true
  });
}

if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
  Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.asyncIterator, {
    value: ReadableStream.prototype.values,
    writable: true,
    configurable: true
  });
}

function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
  if (highWaterMark === void 0) {
    highWaterMark = 1;
  }

  if (sizeAlgorithm === void 0) {
    sizeAlgorithm = function () {
      return 1;
    };
  }

  var stream = Object.create(ReadableStream.prototype);
  InitializeReadableStream(stream);
  var controller = Object.create(ReadableStreamDefaultController.prototype);
  SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
  return stream;
}

function InitializeReadableStream(stream) {
  stream._state = 'readable';
  stream._reader = undefined;
  stream._storedError = undefined;
  stream._disturbed = false;
}

function IsReadableStream(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_readableStreamController')) {
    return false;
  }

  return true;
}

function IsReadableStreamLocked(stream) {
  if (stream._reader === undefined) {
    return false;
  }

  return true;
}

function ReadableStreamCancel(stream, reason) {
  stream._disturbed = true;

  if (stream._state === 'closed') {
    return promiseResolvedWith(undefined);
  }

  if (stream._state === 'errored') {
    return promiseRejectedWith(stream._storedError);
  }

  ReadableStreamClose(stream);

  var sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);

  return transformPromiseWith(sourceCancelPromise, noop);
}

function ReadableStreamClose(stream) {
  stream._state = 'closed';
  var reader = stream._reader;

  if (reader === undefined) {
    return;
  }

  if (IsReadableStreamDefaultReader(reader)) {
    reader._readRequests.forEach(function (readRequest) {
      readRequest._closeSteps();
    });

    reader._readRequests = new SimpleQueue();
  }

  defaultReaderClosedPromiseResolve(reader);
}

function ReadableStreamError(stream, e) {
  stream._state = 'errored';
  stream._storedError = e;
  var reader = stream._reader;

  if (reader === undefined) {
    return;
  }

  if (IsReadableStreamDefaultReader(reader)) {
    reader._readRequests.forEach(function (readRequest) {
      readRequest._errorSteps(e);
    });

    reader._readRequests = new SimpleQueue();
  } else {
    reader._readIntoRequests.forEach(function (readIntoRequest) {
      readIntoRequest._errorSteps(e);
    });

    reader._readIntoRequests = new SimpleQueue();
  }

  defaultReaderClosedPromiseReject(reader, e);
}

function streamBrandCheckException$1(name) {
  return new TypeError("ReadableStream.prototype." + name + " can only be used on a ReadableStream");
}

function convertQueuingStrategyInit(init, context) {
  assertDictionary(init, context);
  var highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
  assertRequiredField(highWaterMark, 'highWaterMark', 'QueuingStrategyInit');
  return {
    highWaterMark: convertUnrestrictedDouble(highWaterMark)
  };
}

var byteLengthSizeFunction = function size(chunk) {
  return chunk.byteLength;
};

var ByteLengthQueuingStrategy = function () {
  function ByteLengthQueuingStrategy(options) {
    assertRequiredArgument(options, 1, 'ByteLengthQueuingStrategy');
    options = convertQueuingStrategyInit(options, 'First parameter');
    this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
  }

  Object.defineProperty(ByteLengthQueuingStrategy.prototype, "highWaterMark", {
    get: function () {
      if (!IsByteLengthQueuingStrategy(this)) {
        throw byteLengthBrandCheckException('highWaterMark');
      }

      return this._byteLengthQueuingStrategyHighWaterMark;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ByteLengthQueuingStrategy.prototype, "size", {
    get: function () {
      if (!IsByteLengthQueuingStrategy(this)) {
        throw byteLengthBrandCheckException('size');
      }

      return byteLengthSizeFunction;
    },
    enumerable: false,
    configurable: true
  });
  return ByteLengthQueuingStrategy;
}();

Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
  highWaterMark: {
    enumerable: true
  },
  size: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
    value: 'ByteLengthQueuingStrategy',
    configurable: true
  });
}

function byteLengthBrandCheckException(name) {
  return new TypeError("ByteLengthQueuingStrategy.prototype." + name + " can only be used on a ByteLengthQueuingStrategy");
}

function IsByteLengthQueuingStrategy(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_byteLengthQueuingStrategyHighWaterMark')) {
    return false;
  }

  return true;
}

var countSizeFunction = function size() {
  return 1;
};

var CountQueuingStrategy = function () {
  function CountQueuingStrategy(options) {
    assertRequiredArgument(options, 1, 'CountQueuingStrategy');
    options = convertQueuingStrategyInit(options, 'First parameter');
    this._countQueuingStrategyHighWaterMark = options.highWaterMark;
  }

  Object.defineProperty(CountQueuingStrategy.prototype, "highWaterMark", {
    get: function () {
      if (!IsCountQueuingStrategy(this)) {
        throw countBrandCheckException('highWaterMark');
      }

      return this._countQueuingStrategyHighWaterMark;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CountQueuingStrategy.prototype, "size", {
    get: function () {
      if (!IsCountQueuingStrategy(this)) {
        throw countBrandCheckException('size');
      }

      return countSizeFunction;
    },
    enumerable: false,
    configurable: true
  });
  return CountQueuingStrategy;
}();

Object.defineProperties(CountQueuingStrategy.prototype, {
  highWaterMark: {
    enumerable: true
  },
  size: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
    value: 'CountQueuingStrategy',
    configurable: true
  });
}

function countBrandCheckException(name) {
  return new TypeError("CountQueuingStrategy.prototype." + name + " can only be used on a CountQueuingStrategy");
}

function IsCountQueuingStrategy(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_countQueuingStrategyHighWaterMark')) {
    return false;
  }

  return true;
}

function convertTransformer(original, context) {
  assertDictionary(original, context);
  var flush = original === null || original === void 0 ? void 0 : original.flush;
  var readableType = original === null || original === void 0 ? void 0 : original.readableType;
  var start = original === null || original === void 0 ? void 0 : original.start;
  var transform = original === null || original === void 0 ? void 0 : original.transform;
  var writableType = original === null || original === void 0 ? void 0 : original.writableType;
  return {
    flush: flush === undefined ? undefined : convertTransformerFlushCallback(flush, original, context + " has member 'flush' that"),
    readableType: readableType,
    start: start === undefined ? undefined : convertTransformerStartCallback(start, original, context + " has member 'start' that"),
    transform: transform === undefined ? undefined : convertTransformerTransformCallback(transform, original, context + " has member 'transform' that"),
    writableType: writableType
  };
}

function convertTransformerFlushCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
    return promiseCall(fn, original, [controller]);
  };
}

function convertTransformerStartCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (controller) {
    return reflectCall(fn, original, [controller]);
  };
}

function convertTransformerTransformCallback(fn, original, context) {
  assertFunction(fn, context);
  return function (chunk, controller) {
    return promiseCall(fn, original, [chunk, controller]);
  };
}

var TransformStream = function () {
  function TransformStream(rawTransformer, rawWritableStrategy, rawReadableStrategy) {
    if (rawTransformer === void 0) {
      rawTransformer = {};
    }

    if (rawWritableStrategy === void 0) {
      rawWritableStrategy = {};
    }

    if (rawReadableStrategy === void 0) {
      rawReadableStrategy = {};
    }

    if (rawTransformer === undefined) {
      rawTransformer = null;
    }

    var writableStrategy = convertQueuingStrategy(rawWritableStrategy, 'Second parameter');
    var readableStrategy = convertQueuingStrategy(rawReadableStrategy, 'Third parameter');
    var transformer = convertTransformer(rawTransformer, 'First parameter');

    if (transformer.readableType !== undefined) {
      throw new RangeError('Invalid readableType specified');
    }

    if (transformer.writableType !== undefined) {
      throw new RangeError('Invalid writableType specified');
    }

    var readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
    var readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
    var writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
    var writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
    var startPromise_resolve;
    var startPromise = newPromise(function (resolve) {
      startPromise_resolve = resolve;
    });
    InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
    SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);

    if (transformer.start !== undefined) {
      startPromise_resolve(transformer.start(this._transformStreamController));
    } else {
      startPromise_resolve(undefined);
    }
  }

  Object.defineProperty(TransformStream.prototype, "readable", {
    get: function () {
      if (!IsTransformStream(this)) {
        throw streamBrandCheckException$2('readable');
      }

      return this._readable;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(TransformStream.prototype, "writable", {
    get: function () {
      if (!IsTransformStream(this)) {
        throw streamBrandCheckException$2('writable');
      }

      return this._writable;
    },
    enumerable: false,
    configurable: true
  });
  return TransformStream;
}();

Object.defineProperties(TransformStream.prototype, {
  readable: {
    enumerable: true
  },
  writable: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
    value: 'TransformStream',
    configurable: true
  });
}

function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
  function startAlgorithm() {
    return startPromise;
  }

  function writeAlgorithm(chunk) {
    return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
  }

  function abortAlgorithm(reason) {
    return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
  }

  function closeAlgorithm() {
    return TransformStreamDefaultSinkCloseAlgorithm(stream);
  }

  stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);

  function pullAlgorithm() {
    return TransformStreamDefaultSourcePullAlgorithm(stream);
  }

  function cancelAlgorithm(reason) {
    TransformStreamErrorWritableAndUnblockWrite(stream, reason);
    return promiseResolvedWith(undefined);
  }

  stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
  stream._backpressure = undefined;
  stream._backpressureChangePromise = undefined;
  stream._backpressureChangePromise_resolve = undefined;
  TransformStreamSetBackpressure(stream, true);
  stream._transformStreamController = undefined;
}

function IsTransformStream(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_transformStreamController')) {
    return false;
  }

  return true;
}

function TransformStreamError(stream, e) {
  ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
  TransformStreamErrorWritableAndUnblockWrite(stream, e);
}

function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
  TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
  WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);

  if (stream._backpressure) {
    TransformStreamSetBackpressure(stream, false);
  }
}

function TransformStreamSetBackpressure(stream, backpressure) {
  if (stream._backpressureChangePromise !== undefined) {
    stream._backpressureChangePromise_resolve();
  }

  stream._backpressureChangePromise = newPromise(function (resolve) {
    stream._backpressureChangePromise_resolve = resolve;
  });
  stream._backpressure = backpressure;
}

var TransformStreamDefaultController = function () {
  function TransformStreamDefaultController() {
    throw new TypeError('Illegal constructor');
  }

  Object.defineProperty(TransformStreamDefaultController.prototype, "desiredSize", {
    get: function () {
      if (!IsTransformStreamDefaultController(this)) {
        throw defaultControllerBrandCheckException$1('desiredSize');
      }

      var readableController = this._controlledTransformStream._readable._readableStreamController;
      return ReadableStreamDefaultControllerGetDesiredSize(readableController);
    },
    enumerable: false,
    configurable: true
  });

  TransformStreamDefaultController.prototype.enqueue = function (chunk) {
    if (chunk === void 0) {
      chunk = undefined;
    }

    if (!IsTransformStreamDefaultController(this)) {
      throw defaultControllerBrandCheckException$1('enqueue');
    }

    TransformStreamDefaultControllerEnqueue(this, chunk);
  };

  TransformStreamDefaultController.prototype.error = function (reason) {
    if (reason === void 0) {
      reason = undefined;
    }

    if (!IsTransformStreamDefaultController(this)) {
      throw defaultControllerBrandCheckException$1('error');
    }

    TransformStreamDefaultControllerError(this, reason);
  };

  TransformStreamDefaultController.prototype.terminate = function () {
    if (!IsTransformStreamDefaultController(this)) {
      throw defaultControllerBrandCheckException$1('terminate');
    }

    TransformStreamDefaultControllerTerminate(this);
  };

  return TransformStreamDefaultController;
}();

Object.defineProperties(TransformStreamDefaultController.prototype, {
  enqueue: {
    enumerable: true
  },
  error: {
    enumerable: true
  },
  terminate: {
    enumerable: true
  },
  desiredSize: {
    enumerable: true
  }
});

if (typeof SymbolPolyfill.toStringTag === 'symbol') {
  Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
    value: 'TransformStreamDefaultController',
    configurable: true
  });
}

function IsTransformStreamDefaultController(x) {
  if (!typeIsObject(x)) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(x, '_controlledTransformStream')) {
    return false;
  }

  return true;
}

function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
  controller._controlledTransformStream = stream;
  stream._transformStreamController = controller;
  controller._transformAlgorithm = transformAlgorithm;
  controller._flushAlgorithm = flushAlgorithm;
}

function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
  var controller = Object.create(TransformStreamDefaultController.prototype);

  var transformAlgorithm = function (chunk) {
    try {
      TransformStreamDefaultControllerEnqueue(controller, chunk);
      return promiseResolvedWith(undefined);
    } catch (transformResultE) {
      return promiseRejectedWith(transformResultE);
    }
  };

  var flushAlgorithm = function () {
    return promiseResolvedWith(undefined);
  };

  if (transformer.transform !== undefined) {
    transformAlgorithm = function (chunk) {
      return transformer.transform(chunk, controller);
    };
  }

  if (transformer.flush !== undefined) {
    flushAlgorithm = function () {
      return transformer.flush(controller);
    };
  }

  SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
}

function TransformStreamDefaultControllerClearAlgorithms(controller) {
  controller._transformAlgorithm = undefined;
  controller._flushAlgorithm = undefined;
}

function TransformStreamDefaultControllerEnqueue(controller, chunk) {
  var stream = controller._controlledTransformStream;
  var readableController = stream._readable._readableStreamController;

  if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
    throw new TypeError('Readable side is not in a state that permits enqueue');
  }

  try {
    ReadableStreamDefaultControllerEnqueue(readableController, chunk);
  } catch (e) {
    TransformStreamErrorWritableAndUnblockWrite(stream, e);
    throw stream._readable._storedError;
  }

  var backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);

  if (backpressure !== stream._backpressure) {
    TransformStreamSetBackpressure(stream, true);
  }
}

function TransformStreamDefaultControllerError(controller, e) {
  TransformStreamError(controller._controlledTransformStream, e);
}

function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
  var transformPromise = controller._transformAlgorithm(chunk);

  return transformPromiseWith(transformPromise, undefined, function (r) {
    TransformStreamError(controller._controlledTransformStream, r);
    throw r;
  });
}

function TransformStreamDefaultControllerTerminate(controller) {
  var stream = controller._controlledTransformStream;
  var readableController = stream._readable._readableStreamController;
  ReadableStreamDefaultControllerClose(readableController);
  var error = new TypeError('TransformStream terminated');
  TransformStreamErrorWritableAndUnblockWrite(stream, error);
}

function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
  var controller = stream._transformStreamController;

  if (stream._backpressure) {
    var backpressureChangePromise = stream._backpressureChangePromise;
    return transformPromiseWith(backpressureChangePromise, function () {
      var writable = stream._writable;
      var state = writable._state;

      if (state === 'erroring') {
        throw writable._storedError;
      }

      return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    });
  }

  return TransformStreamDefaultControllerPerformTransform(controller, chunk);
}

function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
  TransformStreamError(stream, reason);
  return promiseResolvedWith(undefined);
}

function TransformStreamDefaultSinkCloseAlgorithm(stream) {
  var readable = stream._readable;
  var controller = stream._transformStreamController;

  var flushPromise = controller._flushAlgorithm();

  TransformStreamDefaultControllerClearAlgorithms(controller);
  return transformPromiseWith(flushPromise, function () {
    if (readable._state === 'errored') {
      throw readable._storedError;
    }

    ReadableStreamDefaultControllerClose(readable._readableStreamController);
  }, function (r) {
    TransformStreamError(stream, r);
    throw readable._storedError;
  });
}

function TransformStreamDefaultSourcePullAlgorithm(stream) {
  TransformStreamSetBackpressure(stream, false);
  return stream._backpressureChangePromise;
}

function defaultControllerBrandCheckException$1(name) {
  return new TypeError("TransformStreamDefaultController.prototype." + name + " can only be used on a TransformStreamDefaultController");
}

function streamBrandCheckException$2(name) {
  return new TypeError("TransformStream.prototype." + name + " can only be used on a TransformStream");
}

var exports = {
  ReadableStream: ReadableStream,
  ReadableStreamDefaultController: ReadableStreamDefaultController,
  ReadableByteStreamController: ReadableByteStreamController,
  ReadableStreamBYOBRequest: ReadableStreamBYOBRequest,
  ReadableStreamDefaultReader: ReadableStreamDefaultReader,
  ReadableStreamBYOBReader: ReadableStreamBYOBReader,
  WritableStream: WritableStream,
  WritableStreamDefaultController: WritableStreamDefaultController,
  WritableStreamDefaultWriter: WritableStreamDefaultWriter,
  ByteLengthQueuingStrategy: ByteLengthQueuingStrategy,
  CountQueuingStrategy: CountQueuingStrategy,
  TransformStream: TransformStream,
  TransformStreamDefaultController: TransformStreamDefaultController
};

if (typeof globals !== 'undefined') {
  for (var prop in exports) {
    if (Object.prototype.hasOwnProperty.call(exports, prop)) {
      Object.defineProperty(globals, prop, {
        value: exports[prop],
        writable: true,
        configurable: true
      });
    }
  }
}

function uuid() {
  return Array.from({
    length: 16
  }, () => Math.floor(Math.random() * 256).toString(16)).join('');
}

function jobPromise(worker, msg) {
  return new Promise(resolve => {
    const id = uuid();
    worker.postMessage({
      msg,
      id
    });
    worker.addEventListener('message', function f({
      data
    }) {
      const result = data.result;
      const rid = data.id;

      if (rid !== id) {
        return;
      }

      worker.removeEventListener('message', f);
      resolve(result);
    });
    worker.addEventListener('error', error => console.error('Worker error: ', error));
  });
}

class WorkerPool {
  constructor(numWorkers, workerFile) {
    this.numWorkers = numWorkers;
    this.jobQueue = new TransformStream();
    this.workerQueue = new TransformStream();
    const writer = this.workerQueue.writable.getWriter();

    for (let i = 0; i < numWorkers; i++) {
      writer.write(new Worker(new URL("worker-863f5ac4.js", import.meta.url), {
        type: 'module'
      }));
    }

    writer.releaseLock();
    this.done = this._readLoop();
  }

  async _readLoop() {
    const reader = this.jobQueue.readable.getReader();

    while (true) {
      const {
        value,
        done
      } = await reader.read();

      if (done) {
        await this._terminateAll();
        return;
      }

      const {
        msg,
        resolve
      } = value;
      const worker = await this._nextWorker();
      jobPromise(worker, msg).then(result => {
        resolve(result);
        const writer = this.workerQueue.writable.getWriter();
        writer.write(worker);
        writer.releaseLock();
      });
    }
  }

  async _nextWorker() {
    const reader = this.workerQueue.readable.getReader();
    const {
      value,
      done
    } = await reader.read();
    reader.releaseLock();
    return value;
  }

  async _terminateAll() {
    for (let n = 0; n < this.numWorkers; n++) {
      const worker = await this._nextWorker();
      worker.terminate();
    }

    this.workerQueue.writable.close();
  }

  async join() {
    this.jobQueue.writable.getWriter().close();
    await this.done;
  }

  dispatchJob(msg) {
    return new Promise(resolve => {
      const writer = this.jobQueue.writable.getWriter();
      writer.write({
        msg,
        resolve
      });
      writer.releaseLock();
    });
  }

  static useThisThreadAsWorker(cb) {
    self.addEventListener('message', async event => {
      const {
        msg,
        id
      } = event.data;
      const result = await cb(msg);
      self.postMessage({
        result,
        id
      });
    });
  }

}

export { WorkerPool as W, codecs as c, instantiateEmscriptenWasm as i, preprocessors as p };
