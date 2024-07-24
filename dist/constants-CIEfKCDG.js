/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.12.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { n as e } from "./package-BhnEHglX.js";
import { t as n } from "./type-BPiIb9Kq.js";
function t(e4, n2, t2) {
  return n2 in e4 ? Object.defineProperty(e4, n2, { value: t2, enumerable: true, configurable: true, writable: true }) : e4[n2] = t2, e4;
}
function r(e4, n2, t2) {
  return Object.defineProperty(e4, "prototype", { writable: false }), e4;
}
function o(e4, n2) {
  if (!(e4 instanceof n2)) throw new TypeError("Cannot call a class as a function");
}
var s = "client_response", i = "server_response", a = { server: { receive: s, post: i }, client: { receive: i, post: s } }, c = ["hand-shake", "wave-hand", s, i], l = r(function e2(n2, r2, s2) {
  var i2 = this;
  o(this, e2), t(this, "receiveMessage", function(e4, n3, t2) {
    if (e4 === a[i2.type].receive) {
      if (n3 && i2.messageResponse[n3]) {
        var r3 = i2.messageResponse[n3];
        delete i2.messageResponse[n3], r3(t2);
      }
    } else i2.listener ? i2.listener(e4, t2, function(e5) {
      i2.messageProxy.request(a[i2.type].post, n3, e5);
    }) : console.warn("no message listener: ", e4, t2);
  }), t(this, "doPost", function(e4, n3, t2) {
    var r3 = e4.resolve, o2 = e4.reject, s3 = e4.eventId;
    i2.messageResponse[s3] = r3;
    try {
      i2.messageProxy.request(n3, s3, t2);
    } catch (e5) {
      throw delete i2.messageResponse[s3], o2(), e5;
    }
  }), t(this, "listenMessage", function(e4) {
    i2.listener = e4;
  }), t(this, "postMessage", function(e4, n3) {
    return c.indexOf(e4) >= 0 ? Promise.reject(new Error("".concat(e4, " is a protected key-method."))) : new Promise(function(t2, r3) {
      if (i2.destroyed) r3(new Error("message-channel had been destroyed!"));
      else {
        var o2 = null, s3 = Math.random().toString().substr(3, 10);
        i2.doPost({ resolve: function(e5) {
          clearTimeout(o2), t2(e5);
        }, reject: r3, eventId: s3 }, e4, n3), o2 = setTimeout(function() {
          i2.messageResponse && delete i2.messageResponse[s3], r3(new Error("postMessage timeout"));
        }, i2.timeout || 2e4);
      }
    });
  }), t(this, "destroy", function() {
    i2.destroyed = true, i2.unListen && (i2.unListen(), i2.unListen = null), i2.listener = null, i2.messageResponse = null, i2.messageProxy && (i2.messageProxy.destroy(), i2.messageProxy = null);
  }), this.type = n2, this.messageProxy = r2, this.listener = null, this.messageResponse = {}, this.timeout = s2, this.unListen = this.messageProxy.listen(this.receiveMessage);
}), u = "postmessage-promise_client", d = "postmessage-promise_server", f = "identity_key", h = { server: { key: d, accept: u }, client: { key: u, accept: d } }, p = r(function e3(n2, r2, s2) {
  var i2 = this;
  o(this, e3), t(this, "listen", function(e4) {
    var n3 = i2, t2 = function(t3) {
      if (("*" === n3.origin || t3.origin === n3.origin) && t3.source === n3.source && t3.data && t3.data[f] === h[n3.type].accept && t3.data.channelId === n3.channelId && n3.eventFilter(t3) && t3.data.method) {
        var r3 = t3.data, o2 = r3.eventId, s3 = r3.method, i3 = r3.payload;
        e4(s3, o2, i3);
      }
    };
    return window.addEventListener("message", t2), function() {
      window.removeEventListener("message", t2);
    };
  }), t(this, "request", function(e4, n3, r3) {
    i2.source && !i2.source.closed ? i2.source.postMessage(t(t(t(t(t({}, f, h[i2.type].key), "channelId", i2.channelId), "eventId", n3), "method", e4), "payload", r3), i2.origin) : console.error("source closed.");
  }), t(this, "destroy", function() {
    i2.type = "", i2.origin = "", i2.source = null, i2.channelId = "", i2.eventFilter = null;
  }), this.type = n2;
  var a2 = r2.origin, c2 = r2.source, l2 = r2.channelId;
  this.origin = a2, this.source = c2, this.channelId = l2, this.eventFilter = s2;
});
function v(e4, n2) {
  var t2 = Object.keys(e4);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e4);
    n2 && (r2 = r2.filter(function(n3) {
      return Object.getOwnPropertyDescriptor(e4, n3).enumerable;
    })), t2.push.apply(t2, r2);
  }
  return t2;
}
function m(e4) {
  for (var n2 = 1; n2 < arguments.length; n2++) {
    var r2 = null != arguments[n2] ? arguments[n2] : {};
    n2 % 2 ? v(Object(r2), true).forEach(function(n3) {
      t(e4, n3, r2[n3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(r2)) : v(Object(r2)).forEach(function(n3) {
      Object.defineProperty(e4, n3, Object.getOwnPropertyDescriptor(r2, n3));
    });
  }
  return e4;
}
function g(e4) {
  var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  if (!e4) throw new Error("serverObject is null");
  var t2 = e4.server, r2 = e4.origin, o2 = n2.eventFilter, s2 = void 0 === o2 ? function() {
    return true;
  } : o2, i2 = n2.timeout, a2 = void 0 === i2 ? 2e4 : i2, c2 = n2.clientInfo, u2 = void 0 === c2 ? {} : c2, d2 = n2.onDestroy, f2 = Math.random().toString().substr(3, 10), h2 = { source: t2, origin: r2, channelId: f2 };
  return new Promise(function(e5, n3) {
    if (t2 && !t2.closed) {
      var r3 = new p("client", h2, s2);
      (function(e6, n4, t3, r4) {
        return new Promise(function(o3, s3) {
          var i3 = e6.source, a3 = e6.origin, c3 = e6.channelId, l2 = Number(Math.random().toString().substr(3, 10)), u3 = null, d3 = /* @__PURE__ */ new Date(), f3 = null;
          f3 = n4.listen(function(e7, t4) {
            var s4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if ("hand-shake" === e7) {
              var d4 = s4 || {}, h3 = d4.SYN, p2 = d4.ACK, v2 = d4.seqnumber, m2 = d4.acknumber;
              1 === h3 && 1 === p2 && m2 === l2 + 1 && (clearInterval(u3), f3 && f3(), n4.request("hand-shake", "hand-shake-event", { clientInfo: r4, ACK: 1, seqnumber: l2 + 1, acknumber: v2 + 1 }), o3({ server: i3, origin: a3, channelId: c3, serverInfo: s4.serverInfo, clientInfo: r4 }));
            }
          }), u3 = setInterval(function() {
            if (!i3 || i3.closed) throw clearInterval(u3), f3 && f3(), s3(new Error("server closed.")), new Error("server closed.");
            if (t3 && /* @__PURE__ */ new Date() - d3 > t3) throw clearInterval(u3), f3 && f3(), s3(new Error("connect timeout.")), new Error("connect timeout.");
            n4.request("hand-shake", "hand-shake-event", { clientInfo: r4, SYN: 1, ACK: 0, seqnumber: l2 });
          }, 100);
        });
      })(h2, r3, a2, u2).then(function(n4) {
        (function(e6, n5, t3) {
          var r4 = e6.server, o3 = e6.serverInfo, s3 = void 0 === o3 ? {} : o3, i3 = e6.channelId, a3 = new l("client", n5, t3), c3 = function() {
            a3 && (a3.destroy(), a3 = null), e6.destroy && e6.destroy();
          }, u3 = null;
          return u3 = setInterval(function() {
            r4 && !r4.closed || (console.info("server closed."), clearInterval(u3), c3());
          }, 2e3), { run: function(e7) {
            e7({ channelId: i3, serverInfo: s3, postMessage: function() {
              var e8;
              return a3 ? (e8 = a3).postMessage.apply(e8, arguments) : Promise.reject();
            }, listenMessage: function() {
              var e8;
              a3 && (e8 = a3).listenMessage.apply(e8, arguments);
            }, destroy: c3 });
          } };
        })(m(m({}, n4), {}, { destroy: function() {
          r3 = null, d2 && d2(n4.serverInfo, n4);
        } }), r3, a2).run(e5);
      }).catch(function(e6) {
        n3(e6);
      });
    } else n3(new Error("server closed"));
  });
}
function y(e4, n2) {
  var t2 = Object.keys(e4);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e4);
    n2 && (r2 = r2.filter(function(n3) {
      return Object.getOwnPropertyDescriptor(e4, n3).enumerable;
    })), t2.push.apply(t2, r2);
  }
  return t2;
}
function w(e4) {
  for (var n2 = 1; n2 < arguments.length; n2++) {
    var r2 = null != arguments[n2] ? arguments[n2] : {};
    n2 % 2 ? y(Object(r2), true).forEach(function(n3) {
      t(e4, n3, r2[n3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(r2)) : y(Object(r2)).forEach(function(n3) {
      Object.defineProperty(e4, n3, Object.getOwnPropertyDescriptor(r2, n3));
    });
  }
  return e4;
}
var b = "identity_key";
function I() {
  var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n2 = e4.eventFilter, r2 = void 0 === n2 ? function() {
    return true;
  } : n2, o2 = e4.timeout, s2 = void 0 === o2 ? 2e4 : o2, i2 = e4.serverInfo, a2 = void 0 === i2 ? {} : i2, c2 = e4.onDestroy;
  return new Promise(function(e5) {
    (function(e6, n3) {
      return new Promise(function(r3) {
        var o3 = "syn", s3 = Number(Math.random().toString().substr(3, 10)), i3 = -1, a3 = null, c3 = 5;
        window.addEventListener("message", function l2(u2) {
          if (u2.data && "postmessage-promise_client" === u2.data[b] && u2.data.channelId && u2.data.method && "hand-shake" === u2.data.method && e6(u2)) {
            var d2 = u2.data.payload || {}, f2 = d2.SYN, h2 = d2.ACK, p2 = d2.seqnumber, v2 = d2.acknumber;
            if (1 === f2 && 0 === h2) {
              if ("syn" !== o3) return;
              i3 = p2, o3 = "ack";
              var m2 = function() {
                if (!u2.source || u2.source.closed) return console.info("client closed and reset to listening."), o3 = "syn", clearTimeout(a3), a3 = null, c3 = 5, s3 = Number(Math.random().toString().substr(3, 10)), i3 = -1, false;
                try {
                  u2.source.postMessage(t(t(t(t({}, b, "postmessage-promise_server"), "channelId", u2.data.channelId), "method", "hand-shake"), "payload", { serverInfo: n3, acknumber: p2 + 1, SYN: 1, ACK: 1, seqnumber: s3 }), u2.origin);
                } catch (e7) {
                  return console.error(e7), true;
                }
                return true;
              };
              if (!m2()) return;
              a3 || (a3 = setTimeout(function e7() {
                c3 > 0 ? "ack" === o3 && (c3 -= 1, m2() && (a3 = setTimeout(e7, 1e3))) : (console.info("server three-way hand shake timeout and reset to listening."), o3 = "syn", clearTimeout(a3), a3 = null, c3 = 5, s3 = Number(Math.random().toString().substr(3, 10)), i3 = -1);
              }, 1e3));
            } else if ("ack" === o3 && 1 === h2 && p2 === i3 + 1 && v2 === s3 + 1) {
              o3 = "finish", clearTimeout(a3), a3 = null, window.removeEventListener("message", l2);
              var g2 = u2.data.payload, y2 = void 0 === g2 ? {} : g2;
              r3({ client: u2.source, origin: u2.origin, channelId: u2.data.channelId, serverInfo: n3, clientInfo: y2.clientInfo });
            }
          }
        });
      });
    })(r2, a2).then(function(n3) {
      (function(e6, n4, t2) {
        var r3 = e6.origin, o3 = e6.client, s3 = e6.channelId, i3 = e6.clientInfo, a3 = void 0 === i3 ? {} : i3, c3 = new p("server", { origin: r3, source: o3, channelId: s3 }, n4), u2 = new l("server", c3, t2), d2 = function() {
          u2 && (u2.destroy(), u2 = null), c3 = null, e6.destroy && e6.destroy();
        }, f2 = null;
        return f2 = setInterval(function() {
          o3 && !o3.closed || (console.info("client closed."), clearInterval(f2), d2());
        }, 2e3), { run: function(e7) {
          e7({ channelId: s3, clientInfo: a3, postMessage: function() {
            var e8;
            return u2 ? (e8 = u2).postMessage.apply(e8, arguments) : Promise.reject();
          }, listenMessage: function() {
            var e8;
            u2 && (e8 = u2).listenMessage.apply(e8, arguments);
          }, destroy: d2 });
        } };
      })(w(w({}, n3), {}, { destroy: function() {
        c2 && c2(n3.clientInfo, n3);
      } }), r2, s2).run(e5);
    });
  });
}
function O(e4) {
  var n2 = document.createElement("a");
  n2.href = e4;
  var t2 = n2.protocol.length > 4 ? n2.protocol : window.location.protocol, r2 = n2.host.length ? "80" === n2.port || "443" === n2.port ? n2.hostname : n2.host : window.location.host;
  return n2.origin || "".concat(t2, "//").concat(r2);
}
var P = { resolveOrigin: O, getIframeServer: function(e4, n2, t2) {
  var r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [], o2 = void 0 !== e4 ? e4 : document.body, s2 = O(n2), i2 = document.createElement("iframe");
  return i2.name = t2 || "", i2.classList.add.apply(i2.classList, r2), o2.appendChild(i2), i2.src = n2, { server: i2.contentWindow || i2.contentDocument.parentWindow, origin: s2, frame: i2 };
}, getOpenedServer: function(e4) {
  for (var n2, t2 = O(e4), r2 = arguments.length, o2 = new Array(r2 > 1 ? r2 - 1 : 0), s2 = 1; s2 < r2; s2++) o2[s2 - 1] = arguments[s2];
  return { server: (n2 = window).open.apply(n2, [e4].concat(o2)), origin: t2 };
} };
function j(e4) {
  return e4 && e4.__esModule && Object.prototype.hasOwnProperty.call(e4, "default") ? e4.default : e4;
}
var E = n;
const k = j(function(e4) {
  if ("string" !== E(e4)) return !!e4;
  var n2;
  switch (e4.toLowerCase()) {
    case "false":
    case "0":
    case "undefined":
    case "null":
    case "":
    case "n":
    case "no":
    case "off":
      n2 = false;
      break;
    default:
      n2 = true;
  }
  return n2;
});
function M(e4) {
  try {
    return new URL(e4, location), true;
  } catch {
    return false;
  }
}
function S(e4, n2) {
  const t2 = e4.replace(/[.]/g, "\\$&").replace(/-/g, "\\x2d").replace(/[*]/g, ".*");
  return new RegExp(`^${t2}$`, "u").test(n2);
}
function T(e4) {
  return function(n2) {
    return `bib:${e4}:${n2}`;
  };
}
function q(e4) {
  return `${N}-${e4}`;
}
function D(e4, n2) {
  const t2 = void 0 !== e4 ? e4 : document.body, r2 = P.resolveOrigin(n2), o2 = q("iframe");
  let s2;
  return document.querySelector(`#${o2}`) ? s2 = document.querySelector(`#${o2}`) : (s2 = document.createElement("iframe"), s2.id = o2, function(e5, n3) {
    const t3 = (e5 = "string" == typeof e5 ? new URL(e5, location) : e5).searchParams.get("debug");
    return null !== t3 && ("" === t3 || k(t3));
  }(n2) ? s2.style.cssText = "width: 100%; height: 100%; border: 0;" : (s2.ariaHidden = true, s2.tabIndex = -1, s2.hidden = true, s2.style.setProperty("display", "none")), t2.appendChild(s2), s2.src = n2), { server: s2.contentWindow || s2.contentDocument.parentWindow, origin: r2, iframe: s2 };
}
async function L(e4) {
  const n2 = e4.serverUrl, t2 = e4.serverRequestTimeout || U;
  if (!n2) return _.LOCAL;
  const r2 = new AbortController();
  let o2, s2;
  try {
    if (s2 = setTimeout(() => {
      console.warn(`Request timed out after ${t2}ms. Aborting request...`), r2.abort();
    }, t2), o2 = await fetch(n2, { signal: r2.signal }), o2.ok) return _.REMOTE;
  } catch (e5) {
    if (console.error(e5), r2.signal.aborted) throw new Error(`Unable to locate server page. The request timed out after ${t2}ms. url: ${n2.href}`);
    throw new Error(`Unable to locate server page : ${n2.href}.`, e5);
  } finally {
    clearTimeout(s2);
  }
  throw new Error(`Unable to locate server page. The request failed with status code ${o2.status}. url: ${n2.href}`);
}
const R = T("consent"), C = `${e}/consent`, $ = 1, x = "consent", A = { CONSENT: R("consent"), READY: R("ready"), UPDATE: R("update") }, N = "bib-consent", _ = { LOCAL: "local", REMOTE: "remote" }, U = 500, F = { performanceCookies: null, functionalityCookies: null, adsCookies: null };
export {
  F as D,
  A as E,
  N as P,
  _ as S,
  D as a,
  U as b,
  g as c,
  I as d,
  q as e,
  C as f,
  L as g,
  $ as h,
  x as i,
  T as j,
  S as p,
  M as s
};
//# sourceMappingURL=constants-CIEfKCDG.js.map
