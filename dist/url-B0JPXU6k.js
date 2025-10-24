/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
function e(e2, n4, t2) {
  return n4 in e2 ? Object.defineProperty(e2, n4, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[n4] = t2, e2;
}
function n(e2, n4, t2) {
  return Object.defineProperty(e2, "prototype", { writable: false }), e2;
}
function t(e2, n4) {
  if (!(e2 instanceof n4)) throw new TypeError("Cannot call a class as a function");
}
var r = "client_response", o = "server_response", s = { server: { receive: r, post: o }, client: { receive: o, post: r } }, i = ["hand-shake", "wave-hand", r, o], a = n(function n2(r2, o2, a2) {
  var c2 = this;
  t(this, n2), e(this, "receiveMessage", function(e2, n4, t2) {
    if (e2 === s[c2.type].receive) {
      if (n4 && c2.messageResponse[n4]) {
        var r3 = c2.messageResponse[n4];
        delete c2.messageResponse[n4], r3(t2);
      }
    } else c2.listener ? c2.listener(e2, t2, function(e3) {
      c2.messageProxy.request(s[c2.type].post, n4, e3);
    }) : console.warn("no message listener: ", e2, t2);
  }), e(this, "doPost", function(e2, n4, t2) {
    var r3 = e2.resolve, o3 = e2.reject, s2 = e2.eventId;
    c2.messageResponse[s2] = r3;
    try {
      c2.messageProxy.request(n4, s2, t2);
    } catch (e3) {
      throw delete c2.messageResponse[s2], o3(), e3;
    }
  }), e(this, "listenMessage", function(e2) {
    c2.listener = e2;
  }), e(this, "postMessage", function(e2, n4) {
    return i.indexOf(e2) >= 0 ? Promise.reject(new Error("".concat(e2, " is a protected key-method."))) : new Promise(function(t2, r3) {
      if (c2.destroyed) r3(new Error("message-channel had been destroyed!"));
      else {
        var o3 = null, s2 = Math.random().toString().substr(3, 10);
        c2.doPost({ resolve: function(e3) {
          clearTimeout(o3), t2(e3);
        }, reject: r3, eventId: s2 }, e2, n4), o3 = setTimeout(function() {
          c2.messageResponse && delete c2.messageResponse[s2], r3(new Error("postMessage timeout"));
        }, c2.timeout || 2e4);
      }
    });
  }), e(this, "destroy", function() {
    c2.destroyed = true, c2.unListen && (c2.unListen(), c2.unListen = null), c2.listener = null, c2.messageResponse = null, c2.messageProxy && (c2.messageProxy.destroy(), c2.messageProxy = null);
  }), this.type = r2, this.messageProxy = o2, this.listener = null, this.messageResponse = {}, this.timeout = a2, this.unListen = this.messageProxy.listen(this.receiveMessage);
}), c = "postmessage-promise_client", l = "postmessage-promise_server", u = "identity_key", d = { server: { key: l, accept: c }, client: { key: c, accept: l } }, f = n(function n3(r2, o2, s2) {
  var i2 = this;
  t(this, n3), e(this, "listen", function(e2) {
    var n4 = i2, t2 = function(t3) {
      if (("*" === n4.origin || t3.origin === n4.origin) && t3.source === n4.source && t3.data && t3.data[u] === d[n4.type].accept && t3.data.channelId === n4.channelId && n4.eventFilter(t3) && t3.data.method) {
        var r3 = t3.data, o3 = r3.eventId, s3 = r3.method, i3 = r3.payload;
        e2(s3, o3, i3);
      }
    };
    return window.addEventListener("message", t2), function() {
      window.removeEventListener("message", t2);
    };
  }), e(this, "request", function(n4, t2, r3) {
    i2.source && !i2.source.closed ? i2.source.postMessage(e(e(e(e(e({}, u, d[i2.type].key), "channelId", i2.channelId), "eventId", t2), "method", n4), "payload", r3), i2.origin) : console.error("source closed.");
  }), e(this, "destroy", function() {
    i2.type = "", i2.origin = "", i2.source = null, i2.channelId = "", i2.eventFilter = null;
  }), this.type = r2;
  var a2 = o2.origin, c2 = o2.source, l2 = o2.channelId;
  this.origin = a2, this.source = c2, this.channelId = l2, this.eventFilter = s2;
});
function p(e2, n4) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    n4 && (r2 = r2.filter(function(n5) {
      return Object.getOwnPropertyDescriptor(e2, n5).enumerable;
    })), t2.push.apply(t2, r2);
  }
  return t2;
}
function h(n4) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var r2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? p(Object(r2), true).forEach(function(t3) {
      e(n4, t3, r2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n4, Object.getOwnPropertyDescriptors(r2)) : p(Object(r2)).forEach(function(e2) {
      Object.defineProperty(n4, e2, Object.getOwnPropertyDescriptor(r2, e2));
    });
  }
  return n4;
}
function v(e2) {
  var n4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  if (!e2) throw new Error("serverObject is null");
  var t2 = e2.server, r2 = e2.origin, o2 = n4.eventFilter, s2 = void 0 === o2 ? function() {
    return true;
  } : o2, i2 = n4.timeout, c2 = void 0 === i2 ? 2e4 : i2, l2 = n4.clientInfo, u2 = void 0 === l2 ? {} : l2, d2 = n4.onDestroy, p2 = Math.random().toString().substr(3, 10), v2 = { source: t2, origin: r2, channelId: p2 };
  return new Promise(function(e3, n5) {
    if (t2 && !t2.closed) {
      var r3 = new f("client", v2, s2);
      (function(e4, n6, t3, r4) {
        return new Promise(function(o3, s3) {
          var i3 = e4.source, a2 = e4.origin, c3 = e4.channelId, l3 = Number(Math.random().toString().substr(3, 10)), u3 = null, d3 = /* @__PURE__ */ new Date(), f2 = null;
          f2 = n6.listen(function(e5, t4) {
            var s4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if ("hand-shake" === e5) {
              var d4 = s4 || {}, p3 = d4.SYN, h2 = d4.ACK, v3 = d4.seqnumber, m2 = d4.acknumber;
              1 === p3 && 1 === h2 && m2 === l3 + 1 && (clearInterval(u3), f2 && f2(), n6.request("hand-shake", "hand-shake-event", { clientInfo: r4, ACK: 1, seqnumber: l3 + 1, acknumber: v3 + 1 }), o3({ server: i3, origin: a2, channelId: c3, serverInfo: s4.serverInfo, clientInfo: r4 }));
            }
          }), u3 = setInterval(function() {
            if (!i3 || i3.closed) throw clearInterval(u3), f2 && f2(), s3(new Error("server closed.")), new Error("server closed.");
            if (t3 && /* @__PURE__ */ new Date() - d3 > t3) throw clearInterval(u3), f2 && f2(), s3(new Error("connect timeout.")), new Error("connect timeout.");
            n6.request("hand-shake", "hand-shake-event", { clientInfo: r4, SYN: 1, ACK: 0, seqnumber: l3 });
          }, 100);
        });
      })(v2, r3, c2, u2).then(function(n6) {
        (function(e4, n7, t3) {
          var r4 = e4.server, o3 = e4.serverInfo, s3 = void 0 === o3 ? {} : o3, i3 = e4.channelId, c3 = new a("client", n7, t3), l3 = function() {
            c3 && (c3.destroy(), c3 = null), e4.destroy && e4.destroy();
          }, u3 = null;
          return u3 = setInterval(function() {
            r4 && !r4.closed || (console.info("server closed."), clearInterval(u3), l3());
          }, 2e3), { run: function(e5) {
            e5({ channelId: i3, serverInfo: s3, postMessage: function() {
              var e6;
              return c3 ? (e6 = c3).postMessage.apply(e6, arguments) : Promise.reject();
            }, listenMessage: function() {
              var e6;
              c3 && (e6 = c3).listenMessage.apply(e6, arguments);
            }, destroy: l3 });
          } };
        })(h(h({}, n6), {}, { destroy: function() {
          r3 = null, d2 && d2(n6.serverInfo, n6);
        } }), r3, c2).run(e3);
      }).catch(function(e4) {
        n5(e4);
      });
    } else n5(new Error("server closed"));
  });
}
function m(e2, n4) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    n4 && (r2 = r2.filter(function(n5) {
      return Object.getOwnPropertyDescriptor(e2, n5).enumerable;
    })), t2.push.apply(t2, r2);
  }
  return t2;
}
function g(n4) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var r2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? m(Object(r2), true).forEach(function(t3) {
      e(n4, t3, r2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n4, Object.getOwnPropertyDescriptors(r2)) : m(Object(r2)).forEach(function(e2) {
      Object.defineProperty(n4, e2, Object.getOwnPropertyDescriptor(r2, e2));
    });
  }
  return n4;
}
var y = "identity_key";
function w() {
  var n4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = n4.eventFilter, r2 = void 0 === t2 ? function() {
    return true;
  } : t2, o2 = n4.timeout, s2 = void 0 === o2 ? 2e4 : o2, i2 = n4.serverInfo, c2 = void 0 === i2 ? {} : i2, l2 = n4.onDestroy;
  return new Promise(function(n5) {
    (function(n6, t3) {
      return new Promise(function(r3) {
        var o3 = "syn", s3 = Number(Math.random().toString().substr(3, 10)), i3 = -1, a2 = null, c3 = 5;
        window.addEventListener("message", function l3(u2) {
          if (u2.data && "postmessage-promise_client" === u2.data[y] && u2.data.channelId && u2.data.method && "hand-shake" === u2.data.method && n6(u2)) {
            var d2 = u2.data.payload || {}, f2 = d2.SYN, p2 = d2.ACK, h2 = d2.seqnumber, v2 = d2.acknumber;
            if (1 === f2 && 0 === p2) {
              if ("syn" !== o3) return;
              i3 = h2, o3 = "ack";
              var m2 = function() {
                if (!u2.source || u2.source.closed) return console.info("client closed and reset to listening."), o3 = "syn", clearTimeout(a2), a2 = null, c3 = 5, s3 = Number(Math.random().toString().substr(3, 10)), i3 = -1, false;
                try {
                  u2.source.postMessage(e(e(e(e({}, y, "postmessage-promise_server"), "channelId", u2.data.channelId), "method", "hand-shake"), "payload", { serverInfo: t3, acknumber: h2 + 1, SYN: 1, ACK: 1, seqnumber: s3 }), u2.origin);
                } catch (e2) {
                  return console.error(e2), true;
                }
                return true;
              };
              if (!m2()) return;
              a2 || (a2 = setTimeout(function e2() {
                c3 > 0 ? "ack" === o3 && (c3 -= 1, m2() && (a2 = setTimeout(e2, 1e3))) : (console.info("server three-way hand shake timeout and reset to listening."), o3 = "syn", clearTimeout(a2), a2 = null, c3 = 5, s3 = Number(Math.random().toString().substr(3, 10)), i3 = -1);
              }, 1e3));
            } else if ("ack" === o3 && 1 === p2 && h2 === i3 + 1 && v2 === s3 + 1) {
              o3 = "finish", clearTimeout(a2), a2 = null, window.removeEventListener("message", l3);
              var g2 = u2.data.payload, w2 = void 0 === g2 ? {} : g2;
              r3({ client: u2.source, origin: u2.origin, channelId: u2.data.channelId, serverInfo: t3, clientInfo: w2.clientInfo });
            }
          }
        });
      });
    })(r2, c2).then(function(e2) {
      (function(e3, n6, t3) {
        var r3 = e3.origin, o3 = e3.client, s3 = e3.channelId, i3 = e3.clientInfo, c3 = void 0 === i3 ? {} : i3, l3 = new f("server", { origin: r3, source: o3, channelId: s3 }, n6), u2 = new a("server", l3, t3), d2 = function() {
          u2 && (u2.destroy(), u2 = null), l3 = null, e3.destroy && e3.destroy();
        }, p2 = null;
        return p2 = setInterval(function() {
          o3 && !o3.closed || (console.info("client closed."), clearInterval(p2), d2());
        }, 2e3), { run: function(e4) {
          e4({ channelId: s3, clientInfo: c3, postMessage: function() {
            var e5;
            return u2 ? (e5 = u2).postMessage.apply(e5, arguments) : Promise.reject();
          }, listenMessage: function() {
            var e5;
            u2 && (e5 = u2).listenMessage.apply(e5, arguments);
          }, destroy: d2 });
        } };
      })(g(g({}, e2), {}, { destroy: function() {
        l2 && l2(e2.clientInfo, e2);
      } }), r2, s2).run(n5);
    });
  });
}
function b(e2) {
  var n4 = document.createElement("a");
  n4.href = e2;
  var t2 = n4.protocol.length > 4 ? n4.protocol : window.location.protocol, r2 = n4.host.length ? "80" === n4.port || "443" === n4.port ? n4.hostname : n4.host : window.location.host;
  return n4.origin || "".concat(t2, "//").concat(r2);
}
var I = { resolveOrigin: b, getIframeServer: function(e2, n4, t2) {
  var r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [], o2 = void 0 !== e2 ? e2 : document.body, s2 = b(n4), i2 = document.createElement("iframe");
  return i2.name = t2 || "", i2.classList.add.apply(i2.classList, r2), o2.appendChild(i2), i2.src = n4, { server: i2.contentWindow || i2.contentDocument.parentWindow, origin: s2, frame: i2 };
}, getOpenedServer: function(e2) {
  for (var n4, t2 = b(e2), r2 = arguments.length, o2 = new Array(r2 > 1 ? r2 - 1 : 0), s2 = 1; s2 < r2; s2++) o2[s2 - 1] = arguments[s2];
  return { server: (n4 = window).open.apply(n4, [e2].concat(o2)), origin: t2 };
} };
function O(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var P = { exports: {} }, j = P.exports = E, k = /^\[object (.*)\]$/;
/*!
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Primary Exports
 */
function E(e2) {
  var n4 = Object.prototype.toString.call(e2).match(k)[1].toLowerCase();
  return "function" == typeof Promise && e2 instanceof Promise ? "promise" : null === e2 ? "null" : void 0 === e2 ? "undefined" : n4;
}
function M() {
  if (!(this instanceof M)) return new M();
  this.tests = {};
}
j.Library = M, M.prototype.of = E, M.prototype.define = function(e2, n4) {
  return 1 === arguments.length ? this.tests[e2] : (this.tests[e2] = n4, this);
}, M.prototype.test = function(e2, n4) {
  if (n4 === E(e2)) return true;
  var t2 = this.tests[n4];
  if (t2 && "regexp" === E(t2)) return t2.test(e2);
  if (t2 && "function" === E(t2)) return t2(e2);
  throw new ReferenceError('Type test "' + n4 + '" not defined or invalid.');
};
var S = P.exports;
const x = O(function(e2) {
  if ("string" !== S(e2)) return !!e2;
  var n4;
  switch (e2.toLowerCase()) {
    case "false":
    case "0":
    case "undefined":
    case "null":
    case "":
    case "n":
    case "no":
    case "off":
      n4 = false;
      break;
    default:
      n4 = true;
  }
  return n4;
});
function L(e2, n4) {
  const t2 = (e2 = "string" == typeof e2 ? new URL(e2, location) : e2).searchParams.get(n4);
  return null !== t2 && ("" === t2 || x(t2));
}
function D(e2) {
  try {
    return new URL(e2, location), true;
  } catch {
    return false;
  }
}
function R(e2, n4) {
  const t2 = e2.replace(/[.]/g, "\\$&").replace(/-/g, "\\x2d").replace(/[*]/g, ".*");
  return new RegExp(`^${t2}$`, "u").test(n4);
}
export {
  w as a,
  v as c,
  L as h,
  R as p,
  D as s,
  I as u
};
//# sourceMappingURL=url-B0JPXU6k.js.map
