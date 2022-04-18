/*! For license information please see main.js.LICENSE.txt */
(() => {
    var e, t, i, n, o, r, s = {
        9669: (e, t, i) => {
            e.exports = i(1609)
        }, 5448: (e, t, i) => {
            "use strict";
            var n = i(4867), o = i(6026), r = i(4372), s = i(5327), a = i(4097), l = i(4109), c = i(7985), d = i(5061),
                u = i(5655), p = i(5263);
            e.exports = function (e) {
                return new Promise((function (t, i) {
                    var h, f = e.data, m = e.headers, g = e.responseType;

                    function y() {
                        e.cancelToken && e.cancelToken.unsubscribe(h), e.signal && e.signal.removeEventListener("abort", h)
                    }

                    n.isFormData(f) && delete m["Content-Type"];
                    var v = new XMLHttpRequest;
                    if (e.auth) {
                        var x = e.auth.username || "",
                            b = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                        m.Authorization = "Basic " + btoa(x + ":" + b)
                    }
                    var w = a(e.baseURL, e.url);

                    function S() {
                        if (v) {
                            var n = "getAllResponseHeaders" in v ? l(v.getAllResponseHeaders()) : null, r = {
                                data: g && "text" !== g && "json" !== g ? v.response : v.responseText,
                                status: v.status,
                                statusText: v.statusText,
                                headers: n,
                                config: e,
                                request: v
                            };
                            o((function (e) {
                                t(e), y()
                            }), (function (e) {
                                i(e), y()
                            }), r), v = null
                        }
                    }

                    if (v.open(e.method.toUpperCase(), s(w, e.params, e.paramsSerializer), !0), v.timeout = e.timeout, "onloadend" in v ? v.onloadend = S : v.onreadystatechange = function () {
                        v && 4 === v.readyState && (0 !== v.status || v.responseURL && 0 === v.responseURL.indexOf("file:")) && setTimeout(S)
                    }, v.onabort = function () {
                        v && (i(d("Request aborted", e, "ECONNABORTED", v)), v = null)
                    }, v.onerror = function () {
                        i(d("Network Error", e, null, v)), v = null
                    }, v.ontimeout = function () {
                        var t = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded",
                            n = e.transitional || u.transitional;
                        e.timeoutErrorMessage && (t = e.timeoutErrorMessage), i(d(t, e, n.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", v)), v = null
                    }, n.isStandardBrowserEnv()) {
                        var A = (e.withCredentials || c(w)) && e.xsrfCookieName ? r.read(e.xsrfCookieName) : void 0;
                        A && (m[e.xsrfHeaderName] = A)
                    }
                    "setRequestHeader" in v && n.forEach(m, (function (e, t) {
                        void 0 === f && "content-type" === t.toLowerCase() ? delete m[t] : v.setRequestHeader(t, e)
                    })), n.isUndefined(e.withCredentials) || (v.withCredentials = !!e.withCredentials), g && "json" !== g && (v.responseType = e.responseType), "function" == typeof e.onDownloadProgress && v.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && v.upload && v.upload.addEventListener("progress", e.onUploadProgress), (e.cancelToken || e.signal) && (h = function (e) {
                        v && (i(!e || e && e.type ? new p("canceled") : e), v.abort(), v = null)
                    }, e.cancelToken && e.cancelToken.subscribe(h), e.signal && (e.signal.aborted ? h() : e.signal.addEventListener("abort", h))), f || (f = null), v.send(f)
                }))
            }
        }, 1609: (e, t, i) => {
            "use strict";
            var n = i(4867), o = i(1849), r = i(321), s = i(7185), a = function e(t) {
                var i = new r(t), a = o(r.prototype.request, i);
                return n.extend(a, r.prototype, i), n.extend(a, i), a.create = function (i) {
                    return e(s(t, i))
                }, a
            }(i(5655));
            a.Axios = r, a.Cancel = i(5263), a.CancelToken = i(4972), a.isCancel = i(6502), a.VERSION = i(7288).version, a.all = function (e) {
                return Promise.all(e)
            }, a.spread = i(8713), a.isAxiosError = i(6268), e.exports = a, e.exports.default = a
        }, 5263: e => {
            "use strict";

            function t(e) {
                this.message = e
            }

            t.prototype.toString = function () {
                return "Cancel" + (this.message ? ": " + this.message : "")
            }, t.prototype.__CANCEL__ = !0, e.exports = t
        }, 4972: (e, t, i) => {
            "use strict";
            var n = i(5263);

            function o(e) {
                if ("function" != typeof e) throw new TypeError("executor must be a function.");
                var t;
                this.promise = new Promise((function (e) {
                    t = e
                }));
                var i = this;
                this.promise.then((function (e) {
                    if (i._listeners) {
                        var t, n = i._listeners.length;
                        for (t = 0; t < n; t++) i._listeners[t](e);
                        i._listeners = null
                    }
                })), this.promise.then = function (e) {
                    var t, n = new Promise((function (e) {
                        i.subscribe(e), t = e
                    })).then(e);
                    return n.cancel = function () {
                        i.unsubscribe(t)
                    }, n
                }, e((function (e) {
                    i.reason || (i.reason = new n(e), t(i.reason))
                }))
            }

            o.prototype.throwIfRequested = function () {
                if (this.reason) throw this.reason
            }, o.prototype.subscribe = function (e) {
                this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e]
            }, o.prototype.unsubscribe = function (e) {
                if (this._listeners) {
                    var t = this._listeners.indexOf(e);
                    -1 !== t && this._listeners.splice(t, 1)
                }
            }, o.source = function () {
                var e;
                return {
                    token: new o((function (t) {
                        e = t
                    })), cancel: e
                }
            }, e.exports = o
        }, 6502: e => {
            "use strict";
            e.exports = function (e) {
                return !(!e || !e.__CANCEL__)
            }
        }, 321: (e, t, i) => {
            "use strict";
            var n = i(4867), o = i(5327), r = i(782), s = i(3572), a = i(7185), l = i(4875), c = l.validators;

            function d(e) {
                this.defaults = e, this.interceptors = {request: new r, response: new r}
            }

            d.prototype.request = function (e, t) {
                "string" == typeof e ? (t = t || {}).url = e : t = e || {}, (t = a(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
                var i = t.transitional;
                void 0 !== i && l.assertOptions(i, {
                    silentJSONParsing: c.transitional(c.boolean),
                    forcedJSONParsing: c.transitional(c.boolean),
                    clarifyTimeoutError: c.transitional(c.boolean)
                }, !1);
                var n = [], o = !0;
                this.interceptors.request.forEach((function (e) {
                    "function" == typeof e.runWhen && !1 === e.runWhen(t) || (o = o && e.synchronous, n.unshift(e.fulfilled, e.rejected))
                }));
                var r, d = [];
                if (this.interceptors.response.forEach((function (e) {
                    d.push(e.fulfilled, e.rejected)
                })), !o) {
                    var u = [s, void 0];
                    for (Array.prototype.unshift.apply(u, n), u = u.concat(d), r = Promise.resolve(t); u.length;) r = r.then(u.shift(), u.shift());
                    return r
                }
                for (var p = t; n.length;) {
                    var h = n.shift(), f = n.shift();
                    try {
                        p = h(p)
                    } catch (e) {
                        f(e);
                        break
                    }
                }
                try {
                    r = s(p)
                } catch (e) {
                    return Promise.reject(e)
                }
                for (; d.length;) r = r.then(d.shift(), d.shift());
                return r
            }, d.prototype.getUri = function (e) {
                return e = a(this.defaults, e), o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
            }, n.forEach(["delete", "get", "head", "options"], (function (e) {
                d.prototype[e] = function (t, i) {
                    return this.request(a(i || {}, {method: e, url: t, data: (i || {}).data}))
                }
            })), n.forEach(["post", "put", "patch"], (function (e) {
                d.prototype[e] = function (t, i, n) {
                    return this.request(a(n || {}, {method: e, url: t, data: i}))
                }
            })), e.exports = d
        }, 782: (e, t, i) => {
            "use strict";
            var n = i(4867);

            function o() {
                this.handlers = []
            }

            o.prototype.use = function (e, t, i) {
                return this.handlers.push({
                    fulfilled: e,
                    rejected: t,
                    synchronous: !!i && i.synchronous,
                    runWhen: i ? i.runWhen : null
                }), this.handlers.length - 1
            }, o.prototype.eject = function (e) {
                this.handlers[e] && (this.handlers[e] = null)
            }, o.prototype.forEach = function (e) {
                n.forEach(this.handlers, (function (t) {
                    null !== t && e(t)
                }))
            }, e.exports = o
        }, 4097: (e, t, i) => {
            "use strict";
            var n = i(1793), o = i(7303);
            e.exports = function (e, t) {
                return e && !n(t) ? o(e, t) : t
            }
        }, 5061: (e, t, i) => {
            "use strict";
            var n = i(481);
            e.exports = function (e, t, i, o, r) {
                var s = new Error(e);
                return n(s, t, i, o, r)
            }
        }, 3572: (e, t, i) => {
            "use strict";
            var n = i(4867), o = i(8527), r = i(6502), s = i(5655), a = i(5263);

            function l(e) {
                if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new a("canceled")
            }

            e.exports = function (e) {
                return l(e), e.headers = e.headers || {}, e.data = o.call(e, e.data, e.headers, e.transformRequest), e.headers = n.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), n.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (t) {
                    delete e.headers[t]
                })), (e.adapter || s.adapter)(e).then((function (t) {
                    return l(e), t.data = o.call(e, t.data, t.headers, e.transformResponse), t
                }), (function (t) {
                    return r(t) || (l(e), t && t.response && (t.response.data = o.call(e, t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
                }))
            }
        }, 481: e => {
            "use strict";
            e.exports = function (e, t, i, n, o) {
                return e.config = t, i && (e.code = i), e.request = n, e.response = o, e.isAxiosError = !0, e.toJSON = function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code,
                        status: this.response && this.response.status ? this.response.status : null
                    }
                }, e
            }
        }, 7185: (e, t, i) => {
            "use strict";
            var n = i(4867);
            e.exports = function (e, t) {
                t = t || {};
                var i = {};

                function o(e, t) {
                    return n.isPlainObject(e) && n.isPlainObject(t) ? n.merge(e, t) : n.isPlainObject(t) ? n.merge({}, t) : n.isArray(t) ? t.slice() : t
                }

                function r(i) {
                    return n.isUndefined(t[i]) ? n.isUndefined(e[i]) ? void 0 : o(void 0, e[i]) : o(e[i], t[i])
                }

                function s(e) {
                    if (!n.isUndefined(t[e])) return o(void 0, t[e])
                }

                function a(i) {
                    return n.isUndefined(t[i]) ? n.isUndefined(e[i]) ? void 0 : o(void 0, e[i]) : o(void 0, t[i])
                }

                function l(i) {
                    return i in t ? o(e[i], t[i]) : i in e ? o(void 0, e[i]) : void 0
                }

                var c = {
                    url: s,
                    method: s,
                    data: s,
                    baseURL: a,
                    transformRequest: a,
                    transformResponse: a,
                    paramsSerializer: a,
                    timeout: a,
                    timeoutMessage: a,
                    withCredentials: a,
                    adapter: a,
                    responseType: a,
                    xsrfCookieName: a,
                    xsrfHeaderName: a,
                    onUploadProgress: a,
                    onDownloadProgress: a,
                    decompress: a,
                    maxContentLength: a,
                    maxBodyLength: a,
                    transport: a,
                    httpAgent: a,
                    httpsAgent: a,
                    cancelToken: a,
                    socketPath: a,
                    responseEncoding: a,
                    validateStatus: l
                };
                return n.forEach(Object.keys(e).concat(Object.keys(t)), (function (e) {
                    var t = c[e] || r, o = t(e);
                    n.isUndefined(o) && t !== l || (i[e] = o)
                })), i
            }
        }, 6026: (e, t, i) => {
            "use strict";
            var n = i(5061);
            e.exports = function (e, t, i) {
                var o = i.config.validateStatus;
                i.status && o && !o(i.status) ? t(n("Request failed with status code " + i.status, i.config, null, i.request, i)) : e(i)
            }
        }, 8527: (e, t, i) => {
            "use strict";
            var n = i(4867), o = i(5655);
            e.exports = function (e, t, i) {
                var r = this || o;
                return n.forEach(i, (function (i) {
                    e = i.call(r, e, t)
                })), e
            }
        }, 5655: (e, t, i) => {
            "use strict";
            var n = i(4867), o = i(6016), r = i(481), s = {"Content-Type": "application/x-www-form-urlencoded"};

            function a(e, t) {
                !n.isUndefined(e) && n.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
            }

            var l, c = {
                transitional: {silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1},
                adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (l = i(5448)), l),
                transformRequest: [function (e, t) {
                    return o(t, "Accept"), o(t, "Content-Type"), n.isFormData(e) || n.isArrayBuffer(e) || n.isBuffer(e) || n.isStream(e) || n.isFile(e) || n.isBlob(e) ? e : n.isArrayBufferView(e) ? e.buffer : n.isURLSearchParams(e) ? (a(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : n.isObject(e) || t && "application/json" === t["Content-Type"] ? (a(t, "application/json"), function (e, t, i) {
                        if (n.isString(e)) try {
                            return (0, JSON.parse)(e), n.trim(e)
                        } catch (e) {
                            if ("SyntaxError" !== e.name) throw e
                        }
                        return (0, JSON.stringify)(e)
                    }(e)) : e
                }],
                transformResponse: [function (e) {
                    var t = this.transitional || c.transitional, i = t && t.silentJSONParsing,
                        o = t && t.forcedJSONParsing, s = !i && "json" === this.responseType;
                    if (s || o && n.isString(e) && e.length) try {
                        return JSON.parse(e)
                    } catch (e) {
                        if (s) {
                            if ("SyntaxError" === e.name) throw r(e, this, "E_JSON_PARSE");
                            throw e
                        }
                    }
                    return e
                }],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                maxBodyLength: -1,
                validateStatus: function (e) {
                    return e >= 200 && e < 300
                },
                headers: {common: {Accept: "application/json, text/plain, */*"}}
            };
            n.forEach(["delete", "get", "head"], (function (e) {
                c.headers[e] = {}
            })), n.forEach(["post", "put", "patch"], (function (e) {
                c.headers[e] = n.merge(s)
            })), e.exports = c
        }, 7288: e => {
            e.exports = {version: "0.26.0"}
        }, 1849: e => {
            "use strict";
            e.exports = function (e, t) {
                return function () {
                    for (var i = new Array(arguments.length), n = 0; n < i.length; n++) i[n] = arguments[n];
                    return e.apply(t, i)
                }
            }
        }, 5327: (e, t, i) => {
            "use strict";
            var n = i(4867);

            function o(e) {
                return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
            }

            e.exports = function (e, t, i) {
                if (!t) return e;
                var r;
                if (i) r = i(t); else if (n.isURLSearchParams(t)) r = t.toString(); else {
                    var s = [];
                    n.forEach(t, (function (e, t) {
                        null != e && (n.isArray(e) ? t += "[]" : e = [e], n.forEach(e, (function (e) {
                            n.isDate(e) ? e = e.toISOString() : n.isObject(e) && (e = JSON.stringify(e)), s.push(o(t) + "=" + o(e))
                        })))
                    })), r = s.join("&")
                }
                if (r) {
                    var a = e.indexOf("#");
                    -1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + r
                }
                return e
            }
        }, 7303: e => {
            "use strict";
            e.exports = function (e, t) {
                return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
            }
        }, 4372: (e, t, i) => {
            "use strict";
            var n = i(4867);
            e.exports = n.isStandardBrowserEnv() ? {
                write: function (e, t, i, o, r, s) {
                    var a = [];
                    a.push(e + "=" + encodeURIComponent(t)), n.isNumber(i) && a.push("expires=" + new Date(i).toGMTString()), n.isString(o) && a.push("path=" + o), n.isString(r) && a.push("domain=" + r), !0 === s && a.push("secure"), document.cookie = a.join("; ")
                }, read: function (e) {
                    var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                    return t ? decodeURIComponent(t[3]) : null
                }, remove: function (e) {
                    this.write(e, "", Date.now() - 864e5)
                }
            } : {
                write: function () {
                }, read: function () {
                    return null
                }, remove: function () {
                }
            }
        }, 1793: e => {
            "use strict";
            e.exports = function (e) {
                return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
            }
        }, 6268: (e, t, i) => {
            "use strict";
            var n = i(4867);
            e.exports = function (e) {
                return n.isObject(e) && !0 === e.isAxiosError
            }
        }, 7985: (e, t, i) => {
            "use strict";
            var n = i(4867);
            e.exports = n.isStandardBrowserEnv() ? function () {
                var e, t = /(msie|trident)/i.test(navigator.userAgent), i = document.createElement("a");

                function o(e) {
                    var n = e;
                    return t && (i.setAttribute("href", n), n = i.href), i.setAttribute("href", n), {
                        href: i.href,
                        protocol: i.protocol ? i.protocol.replace(/:$/, "") : "",
                        host: i.host,
                        search: i.search ? i.search.replace(/^\?/, "") : "",
                        hash: i.hash ? i.hash.replace(/^#/, "") : "",
                        hostname: i.hostname,
                        port: i.port,
                        pathname: "/" === i.pathname.charAt(0) ? i.pathname : "/" + i.pathname
                    }
                }

                return e = o(window.location.href), function (t) {
                    var i = n.isString(t) ? o(t) : t;
                    return i.protocol === e.protocol && i.host === e.host
                }
            }() : function () {
                return !0
            }
        }, 6016: (e, t, i) => {
            "use strict";
            var n = i(4867);
            e.exports = function (e, t) {
                n.forEach(e, (function (i, n) {
                    n !== t && n.toUpperCase() === t.toUpperCase() && (e[t] = i, delete e[n])
                }))
            }
        }, 4109: (e, t, i) => {
            "use strict";
            var n = i(4867),
                o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
            e.exports = function (e) {
                var t, i, r, s = {};
                return e ? (n.forEach(e.split("\n"), (function (e) {
                    if (r = e.indexOf(":"), t = n.trim(e.substr(0, r)).toLowerCase(), i = n.trim(e.substr(r + 1)), t) {
                        if (s[t] && o.indexOf(t) >= 0) return;
                        s[t] = "set-cookie" === t ? (s[t] ? s[t] : []).concat([i]) : s[t] ? s[t] + ", " + i : i
                    }
                })), s) : s
            }
        }, 8713: e => {
            "use strict";
            e.exports = function (e) {
                return function (t) {
                    return e.apply(null, t)
                }
            }
        }, 4875: (e, t, i) => {
            "use strict";
            var n = i(7288).version, o = {};
            ["object", "boolean", "number", "function", "string", "symbol"].forEach((function (e, t) {
                o[e] = function (i) {
                    return typeof i === e || "a" + (t < 1 ? "n " : " ") + e
                }
            }));
            var r = {};
            o.transitional = function (e, t, i) {
                function o(e, t) {
                    return "[Axios v" + n + "] Transitional option '" + e + "'" + t + (i ? ". " + i : "")
                }

                return function (i, n, s) {
                    if (!1 === e) throw new Error(o(n, " has been removed" + (t ? " in " + t : "")));
                    return t && !r[n] && (r[n] = !0, console.warn(o(n, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(i, n, s)
                }
            }, e.exports = {
                assertOptions: function (e, t, i) {
                    if ("object" != typeof e) throw new TypeError("options must be an object");
                    for (var n = Object.keys(e), o = n.length; o-- > 0;) {
                        var r = n[o], s = t[r];
                        if (s) {
                            var a = e[r], l = void 0 === a || s(a, r, e);
                            if (!0 !== l) throw new TypeError("option " + r + " must be " + l)
                        } else if (!0 !== i) throw Error("Unknown option " + r)
                    }
                }, validators: o
            }
        }, 4867: (e, t, i) => {
            "use strict";
            var n = i(1849), o = Object.prototype.toString;

            function r(e) {
                return Array.isArray(e)
            }

            function s(e) {
                return void 0 === e
            }

            function a(e) {
                return "[object ArrayBuffer]" === o.call(e)
            }

            function l(e) {
                return null !== e && "object" == typeof e
            }

            function c(e) {
                if ("[object Object]" !== o.call(e)) return !1;
                var t = Object.getPrototypeOf(e);
                return null === t || t === Object.prototype
            }

            function d(e) {
                return "[object Function]" === o.call(e)
            }

            function u(e, t) {
                if (null != e) if ("object" != typeof e && (e = [e]), r(e)) for (var i = 0, n = e.length; i < n; i++) t.call(null, e[i], i, e); else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
            }

            e.exports = {
                isArray: r, isArrayBuffer: a, isBuffer: function (e) {
                    return null !== e && !s(e) && null !== e.constructor && !s(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                }, isFormData: function (e) {
                    return "[object FormData]" === o.call(e)
                }, isArrayBufferView: function (e) {
                    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && a(e.buffer)
                }, isString: function (e) {
                    return "string" == typeof e
                }, isNumber: function (e) {
                    return "number" == typeof e
                }, isObject: l, isPlainObject: c, isUndefined: s, isDate: function (e) {
                    return "[object Date]" === o.call(e)
                }, isFile: function (e) {
                    return "[object File]" === o.call(e)
                }, isBlob: function (e) {
                    return "[object Blob]" === o.call(e)
                }, isFunction: d, isStream: function (e) {
                    return l(e) && d(e.pipe)
                }, isURLSearchParams: function (e) {
                    return "[object URLSearchParams]" === o.call(e)
                }, isStandardBrowserEnv: function () {
                    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
                }, forEach: u, merge: function e() {
                    var t = {};

                    function i(i, n) {
                        c(t[n]) && c(i) ? t[n] = e(t[n], i) : c(i) ? t[n] = e({}, i) : r(i) ? t[n] = i.slice() : t[n] = i
                    }

                    for (var n = 0, o = arguments.length; n < o; n++) u(arguments[n], i);
                    return t
                }, extend: function (e, t, i) {
                    return u(t, (function (t, o) {
                        e[o] = i && "function" == typeof t ? n(t, i) : t
                    })), e
                }, trim: function (e) {
                    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                }, stripBOM: function (e) {
                    return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
                }
            }
        }, 9685: (e, t, i) => {
            "use strict";
            i.d(t, {Ib: () => n, WT: () => o, FD: () => r});
            var n = 1e-6, o = "undefined" != typeof Float32Array ? Float32Array : Array, r = Math.random;
            Math.PI, Math.hypot || (Math.hypot = function () {
                for (var e = 0, t = arguments.length; t--;) e += arguments[t] * arguments[t];
                return Math.sqrt(e)
            })
        }, 5975: (e, t, i) => {
            "use strict";
            i.d(t, {
                Ue: () => o,
                Iu: () => r,
                bA: () => s,
                U1: () => a,
                i0: () => l,
                Q$: () => c,
                j6: () => d,
                Iw: () => u,
                G3: () => p,
                M5: () => h,
                zB: () => f,
                dC: () => m
            });
            var n = i(9685);

            function o() {
                var e = new n.WT(16);
                return n.WT != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0), e[0] = 1, e[5] = 1, e[10] = 1, e[15] = 1, e
            }

            function r(e, t, i) {
                var n, o, r, s, a, l, c, d, u, p, h, f, m = i[0], g = i[1], y = i[2];
                return t === e ? (e[12] = t[0] * m + t[4] * g + t[8] * y + t[12], e[13] = t[1] * m + t[5] * g + t[9] * y + t[13], e[14] = t[2] * m + t[6] * g + t[10] * y + t[14], e[15] = t[3] * m + t[7] * g + t[11] * y + t[15]) : (n = t[0], o = t[1], r = t[2], s = t[3], a = t[4], l = t[5], c = t[6], d = t[7], u = t[8], p = t[9], h = t[10], f = t[11], e[0] = n, e[1] = o, e[2] = r, e[3] = s, e[4] = a, e[5] = l, e[6] = c, e[7] = d, e[8] = u, e[9] = p, e[10] = h, e[11] = f, e[12] = n * m + a * g + u * y + t[12], e[13] = o * m + l * g + p * y + t[13], e[14] = r * m + c * g + h * y + t[14], e[15] = s * m + d * g + f * y + t[15]), e
            }

            function s(e, t, i) {
                var n = i[0], o = i[1], r = i[2];
                return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e[4] = t[4] * o, e[5] = t[5] * o, e[6] = t[6] * o, e[7] = t[7] * o, e[8] = t[8] * r, e[9] = t[9] * r, e[10] = t[10] * r, e[11] = t[11] * r, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
            }

            function a(e, t, i, o) {
                var r, s, a, l, c, d, u, p, h, f, m, g, y, v, x, b, w, S, A, T, _, k, C, E, B = o[0], P = o[1],
                    M = o[2], R = Math.hypot(B, P, M);
                return R < n.Ib ? null : (B *= R = 1 / R, P *= R, M *= R, r = Math.sin(i), a = 1 - (s = Math.cos(i)), l = t[0], c = t[1], d = t[2], u = t[3], p = t[4], h = t[5], f = t[6], m = t[7], g = t[8], y = t[9], v = t[10], x = t[11], b = B * B * a + s, w = P * B * a + M * r, S = M * B * a - P * r, A = B * P * a - M * r, T = P * P * a + s, _ = M * P * a + B * r, k = B * M * a + P * r, C = P * M * a - B * r, E = M * M * a + s, e[0] = l * b + p * w + g * S, e[1] = c * b + h * w + y * S, e[2] = d * b + f * w + v * S, e[3] = u * b + m * w + x * S, e[4] = l * A + p * T + g * _, e[5] = c * A + h * T + y * _, e[6] = d * A + f * T + v * _, e[7] = u * A + m * T + x * _, e[8] = l * k + p * C + g * E, e[9] = c * k + h * C + y * E, e[10] = d * k + f * C + v * E, e[11] = u * k + m * C + x * E, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e)
            }

            function l(e, t) {
                return e[0] = t[12], e[1] = t[13], e[2] = t[14], e
            }

            function c(e, t) {
                var i = t[0], n = t[1], o = t[2], r = t[4], s = t[5], a = t[6], l = t[8], c = t[9], d = t[10];
                return e[0] = Math.hypot(i, n, o), e[1] = Math.hypot(r, s, a), e[2] = Math.hypot(l, c, d), e
            }

            function d(e, t) {
                var i = new n.WT(3);
                c(i, t);
                var o = 1 / i[0], r = 1 / i[1], s = 1 / i[2], a = t[0] * o, l = t[1] * r, d = t[2] * s, u = t[4] * o,
                    p = t[5] * r, h = t[6] * s, f = t[8] * o, m = t[9] * r, g = t[10] * s, y = a + p + g, v = 0;
                return y > 0 ? (v = 2 * Math.sqrt(y + 1), e[3] = .25 * v, e[0] = (h - m) / v, e[1] = (f - d) / v, e[2] = (l - u) / v) : a > p && a > g ? (v = 2 * Math.sqrt(1 + a - p - g), e[3] = (h - m) / v, e[0] = .25 * v, e[1] = (l + u) / v, e[2] = (f + d) / v) : p > g ? (v = 2 * Math.sqrt(1 + p - a - g), e[3] = (f - d) / v, e[0] = (l + u) / v, e[1] = .25 * v, e[2] = (h + m) / v) : (v = 2 * Math.sqrt(1 + g - a - p), e[3] = (l - u) / v, e[0] = (f + d) / v, e[1] = (h + m) / v, e[2] = .25 * v), e
            }

            function u(e, t, i, n) {
                var o = t[0], r = t[1], s = t[2], a = t[3], l = o + o, c = r + r, d = s + s, u = o * l, p = o * c,
                    h = o * d, f = r * c, m = r * d, g = s * d, y = a * l, v = a * c, x = a * d, b = n[0], w = n[1],
                    S = n[2];
                return e[0] = (1 - (f + g)) * b, e[1] = (p + x) * b, e[2] = (h - v) * b, e[3] = 0, e[4] = (p - x) * w, e[5] = (1 - (u + g)) * w, e[6] = (m + y) * w, e[7] = 0, e[8] = (h + v) * S, e[9] = (m - y) * S, e[10] = (1 - (u + f)) * S, e[11] = 0, e[12] = i[0], e[13] = i[1], e[14] = i[2], e[15] = 1, e
            }

            var p = function (e, t, i, n, o) {
                var r, s = 1 / Math.tan(t / 2);
                return e[0] = s / i, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = s, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, null != o && o !== 1 / 0 ? (r = 1 / (n - o), e[10] = (o + n) * r, e[14] = 2 * o * n * r) : (e[10] = -1, e[14] = -2 * n), e
            }, h = function (e, t, i, n, o, r, s) {
                var a = 1 / (t - i), l = 1 / (n - o), c = 1 / (r - s);
                return e[0] = -2 * a, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * l, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * c, e[11] = 0, e[12] = (t + i) * a, e[13] = (o + n) * l, e[14] = (s + r) * c, e[15] = 1, e
            };

            function f(e, t, i, o) {
                var r, s, a, l, c, d, u, p, h, f, m = t[0], g = t[1], y = t[2], v = o[0], x = o[1], b = o[2], w = i[0],
                    S = i[1], A = i[2];
                return Math.abs(m - w) < n.Ib && Math.abs(g - S) < n.Ib && Math.abs(y - A) < n.Ib ? function (e) {
                    return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
                }(e) : (u = m - w, p = g - S, h = y - A, r = x * (h *= f = 1 / Math.hypot(u, p, h)) - b * (p *= f), s = b * (u *= f) - v * h, a = v * p - x * u, (f = Math.hypot(r, s, a)) ? (r *= f = 1 / f, s *= f, a *= f) : (r = 0, s = 0, a = 0), l = p * a - h * s, c = h * r - u * a, d = u * s - p * r, (f = Math.hypot(l, c, d)) ? (l *= f = 1 / f, c *= f, d *= f) : (l = 0, c = 0, d = 0), e[0] = r, e[1] = l, e[2] = u, e[3] = 0, e[4] = s, e[5] = c, e[6] = p, e[7] = 0, e[8] = a, e[9] = d, e[10] = h, e[11] = 0, e[12] = -(r * m + s * g + a * y), e[13] = -(l * m + c * g + d * y), e[14] = -(u * m + p * g + h * y), e[15] = 1, e)
            }

            var m = function (e, t, i) {
                var n = t[0], o = t[1], r = t[2], s = t[3], a = t[4], l = t[5], c = t[6], d = t[7], u = t[8], p = t[9],
                    h = t[10], f = t[11], m = t[12], g = t[13], y = t[14], v = t[15], x = i[0], b = i[1], w = i[2],
                    S = i[3];
                return e[0] = x * n + b * a + w * u + S * m, e[1] = x * o + b * l + w * p + S * g, e[2] = x * r + b * c + w * h + S * y, e[3] = x * s + b * d + w * f + S * v, x = i[4], b = i[5], w = i[6], S = i[7], e[4] = x * n + b * a + w * u + S * m, e[5] = x * o + b * l + w * p + S * g, e[6] = x * r + b * c + w * h + S * y, e[7] = x * s + b * d + w * f + S * v, x = i[8], b = i[9], w = i[10], S = i[11], e[8] = x * n + b * a + w * u + S * m, e[9] = x * o + b * l + w * p + S * g, e[10] = x * r + b * c + w * h + S * y, e[11] = x * s + b * d + w * f + S * v, x = i[12], b = i[13], w = i[14], S = i[15], e[12] = x * n + b * a + w * u + S * m, e[13] = x * o + b * l + w * p + S * g, e[14] = x * r + b * c + w * h + S * y, e[15] = x * s + b * d + w * f + S * v, e
            }
        }, 7160: (e, t, i) => {
            "use strict";
            i.d(t, {
                Ue: () => o,
                al: () => r,
                t8: () => s,
                IH: () => a,
                bA: () => l,
                Fv: () => c,
                AK: () => d,
                kC: () => u,
                MX: () => p,
                jI: () => h,
                lu: () => f,
                dC: () => m,
                Zh: () => g
            });
            var n = i(9685);

            function o() {
                var e = new n.WT(3);
                return n.WT != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e
            }

            function r(e, t, i) {
                var o = new n.WT(3);
                return o[0] = e, o[1] = t, o[2] = i, o
            }

            function s(e, t, i, n) {
                return e[0] = t, e[1] = i, e[2] = n, e
            }

            function a(e, t, i) {
                return e[0] = t[0] + i[0], e[1] = t[1] + i[1], e[2] = t[2] + i[2], e
            }

            function l(e, t, i) {
                return e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e
            }

            function c(e, t) {
                var i = t[0], n = t[1], o = t[2], r = i * i + n * n + o * o;
                return r > 0 && (r = 1 / Math.sqrt(r)), e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e
            }

            function d(e, t) {
                return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
            }

            function u(e, t, i) {
                var n = t[0], o = t[1], r = t[2], s = i[0], a = i[1], l = i[2];
                return e[0] = o * l - r * a, e[1] = r * s - n * l, e[2] = n * a - o * s, e
            }

            function p(e, t) {
                t = t || 1;
                var i = 2 * n.FD() * Math.PI, o = 2 * n.FD() - 1, r = Math.sqrt(1 - o * o) * t;
                return e[0] = Math.cos(i) * r, e[1] = Math.sin(i) * r, e[2] = o * t, e
            }

            function h(e, t, i, n) {
                var o = [], r = [];
                return o[0] = t[0] - i[0], o[1] = t[1] - i[1], o[2] = t[2] - i[2], r[0] = o[0] * Math.cos(n) - o[1] * Math.sin(n), r[1] = o[0] * Math.sin(n) + o[1] * Math.cos(n), r[2] = o[2], e[0] = r[0] + i[0], e[1] = r[1] + i[1], e[2] = r[2] + i[2], e
            }

            var f = function (e, t, i) {
                return e[0] = t[0] - i[0], e[1] = t[1] - i[1], e[2] = t[2] - i[2], e
            }, m = function (e, t, i) {
                return e[0] = t[0] * i[0], e[1] = t[1] * i[1], e[2] = t[2] * i[2], e
            }, g = function (e) {
                var t = e[0], i = e[1], n = e[2];
                return Math.hypot(t, i, n)
            };
            o()
        }, 9842: function (e, t, i) {
            var n;
            n = function () {
                return function (e) {
                    var t = {};

                    function i(n) {
                        if (t[n]) return t[n].exports;
                        var o = t[n] = {i: n, l: !1, exports: {}};
                        return e[n].call(o.exports, o, o.exports, i), o.l = !0, o.exports
                    }

                    return i.m = e, i.c = t, i.d = function (e, t, n) {
                        i.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
                    }, i.r = function (e) {
                        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
                    }, i.t = function (e, t) {
                        if (1 & t && (e = i(e)), 8 & t) return e;
                        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                        var n = Object.create(null);
                        if (i.r(n), Object.defineProperty(n, "default", {
                            enumerable: !0,
                            value: e
                        }), 2 & t && "string" != typeof e) for (var o in e) i.d(n, o, function (t) {
                            return e[t]
                        }.bind(null, o));
                        return n
                    }, i.n = function (e) {
                        var t = e && e.__esModule ? function () {
                            return e.default
                        } : function () {
                            return e
                        };
                        return i.d(t, "a", t), t
                    }, i.o = function (e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }, i.p = "", i(i.s = 21)
                }([function (e, t) {
                    var n = {};
                    e.exports = n, function () {
                        n._nextId = 0, n._seed = 0, n._nowStartTime = +new Date, n._warnedOnce = {}, n._decomp = null, n.extend = function (e, t) {
                            var i, o;
                            "boolean" == typeof t ? (i = 2, o = t) : (i = 1, o = !0);
                            for (var r = i; r < arguments.length; r++) {
                                var s = arguments[r];
                                if (s) for (var a in s) o && s[a] && s[a].constructor === Object ? e[a] && e[a].constructor !== Object ? e[a] = s[a] : (e[a] = e[a] || {}, n.extend(e[a], o, s[a])) : e[a] = s[a]
                            }
                            return e
                        }, n.clone = function (e, t) {
                            return n.extend({}, t, e)
                        }, n.keys = function (e) {
                            if (Object.keys) return Object.keys(e);
                            var t = [];
                            for (var i in e) t.push(i);
                            return t
                        }, n.values = function (e) {
                            var t = [];
                            if (Object.keys) {
                                for (var i = Object.keys(e), n = 0; n < i.length; n++) t.push(e[i[n]]);
                                return t
                            }
                            for (var o in e) t.push(e[o]);
                            return t
                        }, n.get = function (e, t, i, n) {
                            t = t.split(".").slice(i, n);
                            for (var o = 0; o < t.length; o += 1) e = e[t[o]];
                            return e
                        }, n.set = function (e, t, i, o, r) {
                            var s = t.split(".").slice(o, r);
                            return n.get(e, t, 0, -1)[s[s.length - 1]] = i, i
                        }, n.shuffle = function (e) {
                            for (var t = e.length - 1; t > 0; t--) {
                                var i = Math.floor(n.random() * (t + 1)), o = e[t];
                                e[t] = e[i], e[i] = o
                            }
                            return e
                        }, n.choose = function (e) {
                            return e[Math.floor(n.random() * e.length)]
                        }, n.isElement = function (e) {
                            return "undefined" != typeof HTMLElement ? e instanceof HTMLElement : !!(e && e.nodeType && e.nodeName)
                        }, n.isArray = function (e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        }, n.isFunction = function (e) {
                            return "function" == typeof e
                        }, n.isPlainObject = function (e) {
                            return "object" == typeof e && e.constructor === Object
                        }, n.isString = function (e) {
                            return "[object String]" === toString.call(e)
                        }, n.clamp = function (e, t, i) {
                            return e < t ? t : e > i ? i : e
                        }, n.sign = function (e) {
                            return e < 0 ? -1 : 1
                        }, n.now = function () {
                            if ("undefined" != typeof window && window.performance) {
                                if (window.performance.now) return window.performance.now();
                                if (window.performance.webkitNow) return window.performance.webkitNow()
                            }
                            return Date.now ? Date.now() : new Date - n._nowStartTime
                        }, n.random = function (t, i) {
                            return i = void 0 !== i ? i : 1, (t = void 0 !== t ? t : 0) + e() * (i - t)
                        };
                        var e = function () {
                            return n._seed = (9301 * n._seed + 49297) % 233280, n._seed / 233280
                        };
                        n.colorToNumber = function (e) {
                            return 3 == (e = e.replace("#", "")).length && (e = e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2)), parseInt(e, 16)
                        }, n.logLevel = 1, n.log = function () {
                            console && n.logLevel > 0 && n.logLevel <= 3 && console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)))
                        }, n.info = function () {
                            console && n.logLevel > 0 && n.logLevel <= 2 && console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)))
                        }, n.warn = function () {
                            console && n.logLevel > 0 && n.logLevel <= 3 && console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)))
                        }, n.warnOnce = function () {
                            var e = Array.prototype.slice.call(arguments).join(" ");
                            n._warnedOnce[e] || (n.warn(e), n._warnedOnce[e] = !0)
                        }, n.deprecated = function (e, t, i) {
                            e[t] = n.chain((function () {
                                n.warnOnce("🔅 deprecated 🔅", i)
                            }), e[t])
                        }, n.nextId = function () {
                            return n._nextId++
                        }, n.indexOf = function (e, t) {
                            if (e.indexOf) return e.indexOf(t);
                            for (var i = 0; i < e.length; i++) if (e[i] === t) return i;
                            return -1
                        }, n.map = function (e, t) {
                            if (e.map) return e.map(t);
                            for (var i = [], n = 0; n < e.length; n += 1) i.push(t(e[n]));
                            return i
                        }, n.topologicalSort = function (e) {
                            var t = [], i = [], o = [];
                            for (var r in e) i[r] || o[r] || n._topologicalSort(r, i, o, e, t);
                            return t
                        }, n._topologicalSort = function (e, t, i, o, r) {
                            var s = o[e] || [];
                            i[e] = !0;
                            for (var a = 0; a < s.length; a += 1) {
                                var l = s[a];
                                i[l] || t[l] || n._topologicalSort(l, t, i, o, r)
                            }
                            i[e] = !1, t[e] = !0, r.push(e)
                        }, n.chain = function () {
                            for (var e = [], t = 0; t < arguments.length; t += 1) {
                                var i = arguments[t];
                                i._chained ? e.push.apply(e, i._chained) : e.push(i)
                            }
                            var n = function () {
                                for (var t, i = new Array(arguments.length), n = 0, o = arguments.length; n < o; n++) i[n] = arguments[n];
                                for (n = 0; n < e.length; n += 1) {
                                    var r = e[n].apply(t, i);
                                    void 0 !== r && (t = r)
                                }
                                return t
                            };
                            return n._chained = e, n
                        }, n.chainPathBefore = function (e, t, i) {
                            return n.set(e, t, n.chain(i, n.get(e, t)))
                        }, n.chainPathAfter = function (e, t, i) {
                            return n.set(e, t, n.chain(n.get(e, t), i))
                        }, n.setDecomp = function (e) {
                            n._decomp = e
                        }, n.getDecomp = function () {
                            var e = n._decomp;
                            try {
                                e || "undefined" == typeof window || (e = window.decomp), e || void 0 === i.g || (e = i.g.decomp)
                            } catch (t) {
                                e = null
                            }
                            return e
                        }
                    }()
                }, function (e, t) {
                    var i = {};
                    e.exports = i, i.create = function (e) {
                        var t = {min: {x: 0, y: 0}, max: {x: 0, y: 0}};
                        return e && i.update(t, e), t
                    }, i.update = function (e, t, i) {
                        e.min.x = 1 / 0, e.max.x = -1 / 0, e.min.y = 1 / 0, e.max.y = -1 / 0;
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.x > e.max.x && (e.max.x = o.x), o.x < e.min.x && (e.min.x = o.x), o.y > e.max.y && (e.max.y = o.y), o.y < e.min.y && (e.min.y = o.y)
                        }
                        i && (i.x > 0 ? e.max.x += i.x : e.min.x += i.x, i.y > 0 ? e.max.y += i.y : e.min.y += i.y)
                    }, i.contains = function (e, t) {
                        return t.x >= e.min.x && t.x <= e.max.x && t.y >= e.min.y && t.y <= e.max.y
                    }, i.overlaps = function (e, t) {
                        return e.min.x <= t.max.x && e.max.x >= t.min.x && e.max.y >= t.min.y && e.min.y <= t.max.y
                    }, i.translate = function (e, t) {
                        e.min.x += t.x, e.max.x += t.x, e.min.y += t.y, e.max.y += t.y
                    }, i.shift = function (e, t) {
                        var i = e.max.x - e.min.x, n = e.max.y - e.min.y;
                        e.min.x = t.x, e.max.x = t.x + i, e.min.y = t.y, e.max.y = t.y + n
                    }
                }, function (e, t) {
                    var i = {};
                    e.exports = i, i.create = function (e, t) {
                        return {x: e || 0, y: t || 0}
                    }, i.clone = function (e) {
                        return {x: e.x, y: e.y}
                    }, i.magnitude = function (e) {
                        return Math.sqrt(e.x * e.x + e.y * e.y)
                    }, i.magnitudeSquared = function (e) {
                        return e.x * e.x + e.y * e.y
                    }, i.rotate = function (e, t, i) {
                        var n = Math.cos(t), o = Math.sin(t);
                        i || (i = {});
                        var r = e.x * n - e.y * o;
                        return i.y = e.x * o + e.y * n, i.x = r, i
                    }, i.rotateAbout = function (e, t, i, n) {
                        var o = Math.cos(t), r = Math.sin(t);
                        n || (n = {});
                        var s = i.x + ((e.x - i.x) * o - (e.y - i.y) * r);
                        return n.y = i.y + ((e.x - i.x) * r + (e.y - i.y) * o), n.x = s, n
                    }, i.normalise = function (e) {
                        var t = i.magnitude(e);
                        return 0 === t ? {x: 0, y: 0} : {x: e.x / t, y: e.y / t}
                    }, i.dot = function (e, t) {
                        return e.x * t.x + e.y * t.y
                    }, i.cross = function (e, t) {
                        return e.x * t.y - e.y * t.x
                    }, i.cross3 = function (e, t, i) {
                        return (t.x - e.x) * (i.y - e.y) - (t.y - e.y) * (i.x - e.x)
                    }, i.add = function (e, t, i) {
                        return i || (i = {}), i.x = e.x + t.x, i.y = e.y + t.y, i
                    }, i.sub = function (e, t, i) {
                        return i || (i = {}), i.x = e.x - t.x, i.y = e.y - t.y, i
                    }, i.mult = function (e, t) {
                        return {x: e.x * t, y: e.y * t}
                    }, i.div = function (e, t) {
                        return {x: e.x / t, y: e.y / t}
                    }, i.perp = function (e, t) {
                        return {x: (t = !0 === t ? -1 : 1) * -e.y, y: t * e.x}
                    }, i.neg = function (e) {
                        return {x: -e.x, y: -e.y}
                    }, i.angle = function (e, t) {
                        return Math.atan2(t.y - e.y, t.x - e.x)
                    }, i._temp = [i.create(), i.create(), i.create(), i.create(), i.create(), i.create()]
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(2), r = i(0);
                    n.create = function (e, t) {
                        for (var i = [], n = 0; n < e.length; n++) {
                            var o = e[n], r = {x: o.x, y: o.y, index: n, body: t, isInternal: !1};
                            i.push(r)
                        }
                        return i
                    }, n.fromPath = function (e, t) {
                        var i = [];
                        return e.replace(/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/gi, (function (e, t, n) {
                            i.push({x: parseFloat(t), y: parseFloat(n)})
                        })), n.create(i, t)
                    }, n.centre = function (e) {
                        for (var t, i, r, s = n.area(e, !0), a = {
                            x: 0,
                            y: 0
                        }, l = 0; l < e.length; l++) r = (l + 1) % e.length, t = o.cross(e[l], e[r]), i = o.mult(o.add(e[l], e[r]), t), a = o.add(a, i);
                        return o.div(a, 6 * s)
                    }, n.mean = function (e) {
                        for (var t = {x: 0, y: 0}, i = 0; i < e.length; i++) t.x += e[i].x, t.y += e[i].y;
                        return o.div(t, e.length)
                    }, n.area = function (e, t) {
                        for (var i = 0, n = e.length - 1, o = 0; o < e.length; o++) i += (e[n].x - e[o].x) * (e[n].y + e[o].y), n = o;
                        return t ? i / 2 : Math.abs(i) / 2
                    }, n.inertia = function (e, t) {
                        for (var i, n, r = 0, s = 0, a = e, l = 0; l < a.length; l++) n = (l + 1) % a.length, r += (i = Math.abs(o.cross(a[n], a[l]))) * (o.dot(a[n], a[n]) + o.dot(a[n], a[l]) + o.dot(a[l], a[l])), s += i;
                        return t / 6 * (r / s)
                    }, n.translate = function (e, t, i) {
                        i = void 0 !== i ? i : 1;
                        var n, o = e.length, r = t.x * i, s = t.y * i;
                        for (n = 0; n < o; n++) e[n].x += r, e[n].y += s;
                        return e
                    }, n.rotate = function (e, t, i) {
                        if (0 !== t) {
                            var n, o, r, s, a = Math.cos(t), l = Math.sin(t), c = i.x, d = i.y, u = e.length;
                            for (s = 0; s < u; s++) o = (n = e[s]).x - c, r = n.y - d, n.x = c + (o * a - r * l), n.y = d + (o * l + r * a);
                            return e
                        }
                    }, n.contains = function (e, t) {
                        for (var i, n = t.x, o = t.y, r = e.length, s = e[r - 1], a = 0; a < r; a++) {
                            if (i = e[a], (n - s.x) * (i.y - s.y) + (o - s.y) * (s.x - i.x) > 0) return !1;
                            s = i
                        }
                        return !0
                    }, n.scale = function (e, t, i, r) {
                        if (1 === t && 1 === i) return e;
                        var s, a;
                        r = r || n.centre(e);
                        for (var l = 0; l < e.length; l++) s = e[l], a = o.sub(s, r), e[l].x = r.x + a.x * t, e[l].y = r.y + a.y * i;
                        return e
                    }, n.chamfer = function (e, t, i, n, s) {
                        t = "number" == typeof t ? [t] : t || [8], i = void 0 !== i ? i : -1, n = n || 2, s = s || 14;
                        for (var a = [], l = 0; l < e.length; l++) {
                            var c = e[l - 1 >= 0 ? l - 1 : e.length - 1], d = e[l], u = e[(l + 1) % e.length],
                                p = t[l < t.length ? l : t.length - 1];
                            if (0 !== p) {
                                var h = o.normalise({x: d.y - c.y, y: c.x - d.x}),
                                    f = o.normalise({x: u.y - d.y, y: d.x - u.x}), m = Math.sqrt(2 * Math.pow(p, 2)),
                                    g = o.mult(r.clone(h), p), y = o.normalise(o.mult(o.add(h, f), .5)),
                                    v = o.sub(d, o.mult(y, m)), x = i;
                                -1 === i && (x = 1.75 * Math.pow(p, .32)), (x = r.clamp(x, n, s)) % 2 == 1 && (x += 1);
                                for (var b = Math.acos(o.dot(h, f)) / x, w = 0; w < x; w++) a.push(o.add(o.rotate(g, b * w), v))
                            } else a.push(d)
                        }
                        return a
                    }, n.clockwiseSort = function (e) {
                        var t = n.mean(e);
                        return e.sort((function (e, i) {
                            return o.angle(t, e) - o.angle(t, i)
                        })), e
                    }, n.isConvex = function (e) {
                        var t, i, n, o, r = 0, s = e.length;
                        if (s < 3) return null;
                        for (t = 0; t < s; t++) if (n = (t + 2) % s, o = (e[i = (t + 1) % s].x - e[t].x) * (e[n].y - e[i].y), (o -= (e[i].y - e[t].y) * (e[n].x - e[i].x)) < 0 ? r |= 1 : o > 0 && (r |= 2), 3 === r) return !1;
                        return 0 !== r || null
                    }, n.hull = function (e) {
                        var t, i, n = [], r = [];
                        for ((e = e.slice(0)).sort((function (e, t) {
                            var i = e.x - t.x;
                            return 0 !== i ? i : e.y - t.y
                        })), i = 0; i < e.length; i += 1) {
                            for (t = e[i]; r.length >= 2 && o.cross3(r[r.length - 2], r[r.length - 1], t) <= 0;) r.pop();
                            r.push(t)
                        }
                        for (i = e.length - 1; i >= 0; i -= 1) {
                            for (t = e[i]; n.length >= 2 && o.cross3(n[n.length - 2], n[n.length - 1], t) <= 0;) n.pop();
                            n.push(t)
                        }
                        return n.pop(), r.pop(), n.concat(r)
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(0);
                    n.on = function (e, t, i) {
                        for (var n, o = t.split(" "), r = 0; r < o.length; r++) n = o[r], e.events = e.events || {}, e.events[n] = e.events[n] || [], e.events[n].push(i);
                        return i
                    }, n.off = function (e, t, i) {
                        if (t) {
                            "function" == typeof t && (i = t, t = o.keys(e.events).join(" "));
                            for (var n = t.split(" "), r = 0; r < n.length; r++) {
                                var s = e.events[n[r]], a = [];
                                if (i && s) for (var l = 0; l < s.length; l++) s[l] !== i && a.push(s[l]);
                                e.events[n[r]] = a
                            }
                        } else e.events = {}
                    }, n.trigger = function (e, t, i) {
                        var n, r, s, a, l = e.events;
                        if (l && o.keys(l).length > 0) {
                            i || (i = {}), n = t.split(" ");
                            for (var c = 0; c < n.length; c++) if (s = l[r = n[c]]) {
                                (a = o.clone(i, !1)).name = r, a.source = e;
                                for (var d = 0; d < s.length; d++) s[d].apply(e, [a])
                            }
                        }
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(4), r = i(0), s = i(1), a = i(6);
                    n.create = function (e) {
                        return r.extend({
                            id: r.nextId(),
                            type: "composite",
                            parent: null,
                            isModified: !1,
                            bodies: [],
                            constraints: [],
                            composites: [],
                            label: "Composite",
                            plugin: {},
                            cache: {allBodies: null, allConstraints: null, allComposites: null}
                        }, e)
                    }, n.setModified = function (e, t, i, o) {
                        if (e.isModified = t, t && e.cache && (e.cache.allBodies = null, e.cache.allConstraints = null, e.cache.allComposites = null), i && e.parent && n.setModified(e.parent, t, i, o), o) for (var r = 0; r < e.composites.length; r++) {
                            var s = e.composites[r];
                            n.setModified(s, t, i, o)
                        }
                    }, n.add = function (e, t) {
                        var i = [].concat(t);
                        o.trigger(e, "beforeAdd", {object: t});
                        for (var s = 0; s < i.length; s++) {
                            var a = i[s];
                            switch (a.type) {
                                case"body":
                                    if (a.parent !== a) {
                                        r.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                                        break
                                    }
                                    n.addBody(e, a);
                                    break;
                                case"constraint":
                                    n.addConstraint(e, a);
                                    break;
                                case"composite":
                                    n.addComposite(e, a);
                                    break;
                                case"mouseConstraint":
                                    n.addConstraint(e, a.constraint)
                            }
                        }
                        return o.trigger(e, "afterAdd", {object: t}), e
                    }, n.remove = function (e, t, i) {
                        var r = [].concat(t);
                        o.trigger(e, "beforeRemove", {object: t});
                        for (var s = 0; s < r.length; s++) {
                            var a = r[s];
                            switch (a.type) {
                                case"body":
                                    n.removeBody(e, a, i);
                                    break;
                                case"constraint":
                                    n.removeConstraint(e, a, i);
                                    break;
                                case"composite":
                                    n.removeComposite(e, a, i);
                                    break;
                                case"mouseConstraint":
                                    n.removeConstraint(e, a.constraint)
                            }
                        }
                        return o.trigger(e, "afterRemove", {object: t}), e
                    }, n.addComposite = function (e, t) {
                        return e.composites.push(t), t.parent = e, n.setModified(e, !0, !0, !1), e
                    }, n.removeComposite = function (e, t, i) {
                        var o = r.indexOf(e.composites, t);
                        if (-1 !== o && n.removeCompositeAt(e, o), i) for (var s = 0; s < e.composites.length; s++) n.removeComposite(e.composites[s], t, !0);
                        return e
                    }, n.removeCompositeAt = function (e, t) {
                        return e.composites.splice(t, 1), n.setModified(e, !0, !0, !1), e
                    }, n.addBody = function (e, t) {
                        return e.bodies.push(t), n.setModified(e, !0, !0, !1), e
                    }, n.removeBody = function (e, t, i) {
                        var o = r.indexOf(e.bodies, t);
                        if (-1 !== o && n.removeBodyAt(e, o), i) for (var s = 0; s < e.composites.length; s++) n.removeBody(e.composites[s], t, !0);
                        return e
                    }, n.removeBodyAt = function (e, t) {
                        return e.bodies.splice(t, 1), n.setModified(e, !0, !0, !1), e
                    }, n.addConstraint = function (e, t) {
                        return e.constraints.push(t), n.setModified(e, !0, !0, !1), e
                    }, n.removeConstraint = function (e, t, i) {
                        var o = r.indexOf(e.constraints, t);
                        if (-1 !== o && n.removeConstraintAt(e, o), i) for (var s = 0; s < e.composites.length; s++) n.removeConstraint(e.composites[s], t, !0);
                        return e
                    }, n.removeConstraintAt = function (e, t) {
                        return e.constraints.splice(t, 1), n.setModified(e, !0, !0, !1), e
                    }, n.clear = function (e, t, i) {
                        if (i) for (var o = 0; o < e.composites.length; o++) n.clear(e.composites[o], t, !0);
                        return t ? e.bodies = e.bodies.filter((function (e) {
                            return e.isStatic
                        })) : e.bodies.length = 0, e.constraints.length = 0, e.composites.length = 0, n.setModified(e, !0, !0, !1), e
                    }, n.allBodies = function (e) {
                        if (e.cache && e.cache.allBodies) return e.cache.allBodies;
                        for (var t = [].concat(e.bodies), i = 0; i < e.composites.length; i++) t = t.concat(n.allBodies(e.composites[i]));
                        return e.cache && (e.cache.allBodies = t), t
                    }, n.allConstraints = function (e) {
                        if (e.cache && e.cache.allConstraints) return e.cache.allConstraints;
                        for (var t = [].concat(e.constraints), i = 0; i < e.composites.length; i++) t = t.concat(n.allConstraints(e.composites[i]));
                        return e.cache && (e.cache.allConstraints = t), t
                    }, n.allComposites = function (e) {
                        if (e.cache && e.cache.allComposites) return e.cache.allComposites;
                        for (var t = [].concat(e.composites), i = 0; i < e.composites.length; i++) t = t.concat(n.allComposites(e.composites[i]));
                        return e.cache && (e.cache.allComposites = t), t
                    }, n.get = function (e, t, i) {
                        var o, r;
                        switch (i) {
                            case"body":
                                o = n.allBodies(e);
                                break;
                            case"constraint":
                                o = n.allConstraints(e);
                                break;
                            case"composite":
                                o = n.allComposites(e).concat(e)
                        }
                        return o ? 0 === (r = o.filter((function (e) {
                            return e.id.toString() === t.toString()
                        }))).length ? null : r[0] : null
                    }, n.move = function (e, t, i) {
                        return n.remove(e, t), n.add(i, t), e
                    }, n.rebase = function (e) {
                        for (var t = n.allBodies(e).concat(n.allConstraints(e)).concat(n.allComposites(e)), i = 0; i < t.length; i++) t[i].id = r.nextId();
                        return e
                    }, n.translate = function (e, t, i) {
                        for (var o = i ? n.allBodies(e) : e.bodies, r = 0; r < o.length; r++) a.translate(o[r], t);
                        return e
                    }, n.rotate = function (e, t, i, o) {
                        for (var r = Math.cos(t), s = Math.sin(t), l = o ? n.allBodies(e) : e.bodies, c = 0; c < l.length; c++) {
                            var d = l[c], u = d.position.x - i.x, p = d.position.y - i.y;
                            a.setPosition(d, {x: i.x + (u * r - p * s), y: i.y + (u * s + p * r)}), a.rotate(d, t)
                        }
                        return e
                    }, n.scale = function (e, t, i, o, r) {
                        for (var s = r ? n.allBodies(e) : e.bodies, l = 0; l < s.length; l++) {
                            var c = s[l], d = c.position.x - o.x, u = c.position.y - o.y;
                            a.setPosition(c, {x: o.x + d * t, y: o.y + u * i}), a.scale(c, t, i)
                        }
                        return e
                    }, n.bounds = function (e) {
                        for (var t = n.allBodies(e), i = [], o = 0; o < t.length; o += 1) {
                            var r = t[o];
                            i.push(r.bounds.min, r.bounds.max)
                        }
                        return s.create(i)
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(3), r = i(2), s = i(7), a = (i(16), i(0)), l = i(1), c = i(11);
                    !function () {
                        n._inertiaScale = 4, n._nextCollidingGroupId = 1, n._nextNonCollidingGroupId = -1, n._nextCategory = 1, n.create = function (t) {
                            var i = {
                                id: a.nextId(),
                                type: "body",
                                label: "Body",
                                parts: [],
                                plugin: {},
                                angle: 0,
                                vertices: o.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),
                                position: {x: 0, y: 0},
                                force: {x: 0, y: 0},
                                torque: 0,
                                positionImpulse: {x: 0, y: 0},
                                constraintImpulse: {x: 0, y: 0, angle: 0},
                                totalContacts: 0,
                                speed: 0,
                                angularSpeed: 0,
                                velocity: {x: 0, y: 0},
                                angularVelocity: 0,
                                isSensor: !1,
                                isStatic: !1,
                                isSleeping: !1,
                                motion: 0,
                                sleepThreshold: 60,
                                density: .001,
                                restitution: 0,
                                friction: .1,
                                frictionStatic: .5,
                                frictionAir: .01,
                                collisionFilter: {category: 1, mask: 4294967295, group: 0},
                                slop: .05,
                                timeScale: 1,
                                render: {
                                    visible: !0,
                                    opacity: 1,
                                    strokeStyle: null,
                                    fillStyle: null,
                                    lineWidth: null,
                                    sprite: {xScale: 1, yScale: 1, xOffset: 0, yOffset: 0}
                                },
                                events: null,
                                bounds: null,
                                chamfer: null,
                                circleRadius: 0,
                                positionPrev: null,
                                anglePrev: 0,
                                parent: null,
                                axes: null,
                                area: 0,
                                mass: 0,
                                inertia: 0,
                                _original: null
                            }, n = a.extend(i, t);
                            return e(n, t), n
                        }, n.nextGroup = function (e) {
                            return e ? n._nextNonCollidingGroupId-- : n._nextCollidingGroupId++
                        }, n.nextCategory = function () {
                            return n._nextCategory = n._nextCategory << 1, n._nextCategory
                        };
                        var e = function (e, t) {
                            t = t || {}, n.set(e, {
                                bounds: e.bounds || l.create(e.vertices),
                                positionPrev: e.positionPrev || r.clone(e.position),
                                anglePrev: e.anglePrev || e.angle,
                                vertices: e.vertices,
                                parts: e.parts || [e],
                                isStatic: e.isStatic,
                                isSleeping: e.isSleeping,
                                parent: e.parent || e
                            }), o.rotate(e.vertices, e.angle, e.position), c.rotate(e.axes, e.angle), l.update(e.bounds, e.vertices, e.velocity), n.set(e, {
                                axes: t.axes || e.axes,
                                area: t.area || e.area,
                                mass: t.mass || e.mass,
                                inertia: t.inertia || e.inertia
                            });
                            var i = e.isStatic ? "#14151f" : a.choose(["#f19648", "#f5d259", "#f55a3c", "#063e7b", "#ececd1"]),
                                s = e.isStatic ? "#555" : "#ccc", d = e.isStatic && null === e.render.fillStyle ? 1 : 0;
                            e.render.fillStyle = e.render.fillStyle || i, e.render.strokeStyle = e.render.strokeStyle || s, e.render.lineWidth = e.render.lineWidth || d, e.render.sprite.xOffset += -(e.bounds.min.x - e.position.x) / (e.bounds.max.x - e.bounds.min.x), e.render.sprite.yOffset += -(e.bounds.min.y - e.position.y) / (e.bounds.max.y - e.bounds.min.y)
                        };
                        n.set = function (e, t, i) {
                            var o;
                            for (o in "string" == typeof t && (o = t, (t = {})[o] = i), t) if (Object.prototype.hasOwnProperty.call(t, o)) switch (i = t[o], o) {
                                case"isStatic":
                                    n.setStatic(e, i);
                                    break;
                                case"isSleeping":
                                    s.set(e, i);
                                    break;
                                case"mass":
                                    n.setMass(e, i);
                                    break;
                                case"density":
                                    n.setDensity(e, i);
                                    break;
                                case"inertia":
                                    n.setInertia(e, i);
                                    break;
                                case"vertices":
                                    n.setVertices(e, i);
                                    break;
                                case"position":
                                    n.setPosition(e, i);
                                    break;
                                case"angle":
                                    n.setAngle(e, i);
                                    break;
                                case"velocity":
                                    n.setVelocity(e, i);
                                    break;
                                case"angularVelocity":
                                    n.setAngularVelocity(e, i);
                                    break;
                                case"parts":
                                    n.setParts(e, i);
                                    break;
                                case"centre":
                                    n.setCentre(e, i);
                                    break;
                                default:
                                    e[o] = i
                            }
                        }, n.setStatic = function (e, t) {
                            for (var i = 0; i < e.parts.length; i++) {
                                var n = e.parts[i];
                                n.isStatic = t, t ? (n._original = {
                                    restitution: n.restitution,
                                    friction: n.friction,
                                    mass: n.mass,
                                    inertia: n.inertia,
                                    density: n.density,
                                    inverseMass: n.inverseMass,
                                    inverseInertia: n.inverseInertia
                                }, n.restitution = 0, n.friction = 1, n.mass = n.inertia = n.density = 1 / 0, n.inverseMass = n.inverseInertia = 0, n.positionPrev.x = n.position.x, n.positionPrev.y = n.position.y, n.anglePrev = n.angle, n.angularVelocity = 0, n.speed = 0, n.angularSpeed = 0, n.motion = 0) : n._original && (n.restitution = n._original.restitution, n.friction = n._original.friction, n.mass = n._original.mass, n.inertia = n._original.inertia, n.density = n._original.density, n.inverseMass = n._original.inverseMass, n.inverseInertia = n._original.inverseInertia, n._original = null)
                            }
                        }, n.setMass = function (e, t) {
                            var i = e.inertia / (e.mass / 6);
                            e.inertia = i * (t / 6), e.inverseInertia = 1 / e.inertia, e.mass = t, e.inverseMass = 1 / e.mass, e.density = e.mass / e.area
                        }, n.setDensity = function (e, t) {
                            n.setMass(e, t * e.area), e.density = t
                        }, n.setInertia = function (e, t) {
                            e.inertia = t, e.inverseInertia = 1 / e.inertia
                        }, n.setVertices = function (e, t) {
                            t[0].body === e ? e.vertices = t : e.vertices = o.create(t, e), e.axes = c.fromVertices(e.vertices), e.area = o.area(e.vertices), n.setMass(e, e.density * e.area);
                            var i = o.centre(e.vertices);
                            o.translate(e.vertices, i, -1), n.setInertia(e, n._inertiaScale * o.inertia(e.vertices, e.mass)), o.translate(e.vertices, e.position), l.update(e.bounds, e.vertices, e.velocity)
                        }, n.setParts = function (e, t, i) {
                            var r;
                            for (t = t.slice(0), e.parts.length = 0, e.parts.push(e), e.parent = e, r = 0; r < t.length; r++) {
                                var s = t[r];
                                s !== e && (s.parent = e, e.parts.push(s))
                            }
                            if (1 !== e.parts.length) {
                                if (i = void 0 === i || i) {
                                    var a = [];
                                    for (r = 0; r < t.length; r++) a = a.concat(t[r].vertices);
                                    o.clockwiseSort(a);
                                    var l = o.hull(a), c = o.centre(l);
                                    n.setVertices(e, l), o.translate(e.vertices, c)
                                }
                                var d = n._totalProperties(e);
                                e.area = d.area, e.parent = e, e.position.x = d.centre.x, e.position.y = d.centre.y, e.positionPrev.x = d.centre.x, e.positionPrev.y = d.centre.y, n.setMass(e, d.mass), n.setInertia(e, d.inertia), n.setPosition(e, d.centre)
                            }
                        }, n.setCentre = function (e, t, i) {
                            i ? (e.positionPrev.x += t.x, e.positionPrev.y += t.y, e.position.x += t.x, e.position.y += t.y) : (e.positionPrev.x = t.x - (e.position.x - e.positionPrev.x), e.positionPrev.y = t.y - (e.position.y - e.positionPrev.y), e.position.x = t.x, e.position.y = t.y)
                        }, n.setPosition = function (e, t) {
                            var i = r.sub(t, e.position);
                            e.positionPrev.x += i.x, e.positionPrev.y += i.y;
                            for (var n = 0; n < e.parts.length; n++) {
                                var s = e.parts[n];
                                s.position.x += i.x, s.position.y += i.y, o.translate(s.vertices, i), l.update(s.bounds, s.vertices, e.velocity)
                            }
                        }, n.setAngle = function (e, t) {
                            var i = t - e.angle;
                            e.anglePrev += i;
                            for (var n = 0; n < e.parts.length; n++) {
                                var s = e.parts[n];
                                s.angle += i, o.rotate(s.vertices, i, e.position), c.rotate(s.axes, i), l.update(s.bounds, s.vertices, e.velocity), n > 0 && r.rotateAbout(s.position, i, e.position, s.position)
                            }
                        }, n.setVelocity = function (e, t) {
                            e.positionPrev.x = e.position.x - t.x, e.positionPrev.y = e.position.y - t.y, e.velocity.x = t.x, e.velocity.y = t.y, e.speed = r.magnitude(e.velocity)
                        }, n.setAngularVelocity = function (e, t) {
                            e.anglePrev = e.angle - t, e.angularVelocity = t, e.angularSpeed = Math.abs(e.angularVelocity)
                        }, n.translate = function (e, t) {
                            n.setPosition(e, r.add(e.position, t))
                        }, n.rotate = function (e, t, i) {
                            if (i) {
                                var o = Math.cos(t), r = Math.sin(t), s = e.position.x - i.x, a = e.position.y - i.y;
                                n.setPosition(e, {
                                    x: i.x + (s * o - a * r),
                                    y: i.y + (s * r + a * o)
                                }), n.setAngle(e, e.angle + t)
                            } else n.setAngle(e, e.angle + t)
                        }, n.scale = function (e, t, i, r) {
                            var s = 0, a = 0;
                            r = r || e.position;
                            for (var d = 0; d < e.parts.length; d++) {
                                var u = e.parts[d];
                                o.scale(u.vertices, t, i, r), u.axes = c.fromVertices(u.vertices), u.area = o.area(u.vertices), n.setMass(u, e.density * u.area), o.translate(u.vertices, {
                                    x: -u.position.x,
                                    y: -u.position.y
                                }), n.setInertia(u, n._inertiaScale * o.inertia(u.vertices, u.mass)), o.translate(u.vertices, {
                                    x: u.position.x,
                                    y: u.position.y
                                }), d > 0 && (s += u.area, a += u.inertia), u.position.x = r.x + (u.position.x - r.x) * t, u.position.y = r.y + (u.position.y - r.y) * i, l.update(u.bounds, u.vertices, e.velocity)
                            }
                            e.parts.length > 1 && (e.area = s, e.isStatic || (n.setMass(e, e.density * s), n.setInertia(e, a))), e.circleRadius && (t === i ? e.circleRadius *= t : e.circleRadius = null)
                        }, n.update = function (e, t, i, n) {
                            var s = Math.pow(t * i * e.timeScale, 2), a = 1 - e.frictionAir * i * e.timeScale,
                                d = e.position.x - e.positionPrev.x, u = e.position.y - e.positionPrev.y;
                            e.velocity.x = d * a * n + e.force.x / e.mass * s, e.velocity.y = u * a * n + e.force.y / e.mass * s, e.positionPrev.x = e.position.x, e.positionPrev.y = e.position.y, e.position.x += e.velocity.x, e.position.y += e.velocity.y, e.angularVelocity = (e.angle - e.anglePrev) * a * n + e.torque / e.inertia * s, e.anglePrev = e.angle, e.angle += e.angularVelocity, e.speed = r.magnitude(e.velocity), e.angularSpeed = Math.abs(e.angularVelocity);
                            for (var p = 0; p < e.parts.length; p++) {
                                var h = e.parts[p];
                                o.translate(h.vertices, e.velocity), p > 0 && (h.position.x += e.velocity.x, h.position.y += e.velocity.y), 0 !== e.angularVelocity && (o.rotate(h.vertices, e.angularVelocity, e.position), c.rotate(h.axes, e.angularVelocity), p > 0 && r.rotateAbout(h.position, e.angularVelocity, e.position, h.position)), l.update(h.bounds, h.vertices, e.velocity)
                            }
                        }, n.applyForce = function (e, t, i) {
                            e.force.x += i.x, e.force.y += i.y;
                            var n = t.x - e.position.x, o = t.y - e.position.y;
                            e.torque += n * i.y - o * i.x
                        }, n._totalProperties = function (e) {
                            for (var t = {
                                mass: 0,
                                area: 0,
                                inertia: 0,
                                centre: {x: 0, y: 0}
                            }, i = 1 === e.parts.length ? 0 : 1; i < e.parts.length; i++) {
                                var n = e.parts[i], o = n.mass !== 1 / 0 ? n.mass : 1;
                                t.mass += o, t.area += n.area, t.inertia += n.inertia, t.centre = r.add(t.centre, r.mult(n.position, o))
                            }
                            return t.centre = r.div(t.centre, t.mass), t
                        }
                    }()
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(4);
                    n._motionWakeThreshold = .18, n._motionSleepThreshold = .08, n._minBias = .9, n.update = function (e, t) {
                        for (var i = t * t * t, o = 0; o < e.length; o++) {
                            var r = e[o], s = r.speed * r.speed + r.angularSpeed * r.angularSpeed;
                            if (0 === r.force.x && 0 === r.force.y) {
                                var a = Math.min(r.motion, s), l = Math.max(r.motion, s);
                                r.motion = n._minBias * a + (1 - n._minBias) * l, r.sleepThreshold > 0 && r.motion < n._motionSleepThreshold * i ? (r.sleepCounter += 1, r.sleepCounter >= r.sleepThreshold && n.set(r, !0)) : r.sleepCounter > 0 && (r.sleepCounter -= 1)
                            } else n.set(r, !1)
                        }
                    }, n.afterCollisions = function (e, t) {
                        for (var i = t * t * t, o = 0; o < e.length; o++) {
                            var r = e[o];
                            if (r.isActive) {
                                var s = r.collision, a = s.bodyA.parent, l = s.bodyB.parent;
                                if (!(a.isSleeping && l.isSleeping || a.isStatic || l.isStatic) && (a.isSleeping || l.isSleeping)) {
                                    var c = a.isSleeping && !a.isStatic ? a : l, d = c === a ? l : a;
                                    !c.isStatic && d.motion > n._motionWakeThreshold * i && n.set(c, !1)
                                }
                            }
                        }
                    }, n.set = function (e, t) {
                        var i = e.isSleeping;
                        t ? (e.isSleeping = !0, e.sleepCounter = e.sleepThreshold, e.positionImpulse.x = 0, e.positionImpulse.y = 0, e.positionPrev.x = e.position.x, e.positionPrev.y = e.position.y, e.anglePrev = e.angle, e.speed = 0, e.angularSpeed = 0, e.motion = 0, i || o.trigger(e, "sleepStart")) : (e.isSleeping = !1, e.sleepCounter = 0, i && o.trigger(e, "sleepEnd"))
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o, r, s, a = i(3), l = i(9);
                    o = [], r = {overlap: 0, axis: null}, s = {overlap: 0, axis: null}, n.create = function (e, t) {
                        return {
                            pair: null,
                            collided: !1,
                            bodyA: e,
                            bodyB: t,
                            parentA: e.parent,
                            parentB: t.parent,
                            depth: 0,
                            normal: {x: 0, y: 0},
                            tangent: {x: 0, y: 0},
                            penetration: {x: 0, y: 0},
                            supports: []
                        }
                    }, n.collides = function (e, t, i) {
                        if (n._overlapAxes(r, e.vertices, t.vertices, e.axes), r.overlap <= 0) return null;
                        if (n._overlapAxes(s, t.vertices, e.vertices, t.axes), s.overlap <= 0) return null;
                        var o, c, d = i && i.table[l.id(e, t)];
                        d ? o = d.collision : ((o = n.create(e, t)).collided = !0, o.bodyA = e.id < t.id ? e : t, o.bodyB = e.id < t.id ? t : e, o.parentA = o.bodyA.parent, o.parentB = o.bodyB.parent), e = o.bodyA, t = o.bodyB, c = r.overlap < s.overlap ? r : s;
                        var u = o.normal, p = o.supports, h = c.axis, f = h.x, m = h.y;
                        f * (t.position.x - e.position.x) + m * (t.position.y - e.position.y) < 0 ? (u.x = f, u.y = m) : (u.x = -f, u.y = -m), o.tangent.x = -u.y, o.tangent.y = u.x, o.depth = c.overlap, o.penetration.x = u.x * o.depth, o.penetration.y = u.y * o.depth;
                        var g = n._findSupports(e, t, u, 1), y = 0;
                        if (a.contains(e.vertices, g[0]) && (p[y++] = g[0]), a.contains(e.vertices, g[1]) && (p[y++] = g[1]), y < 2) {
                            var v = n._findSupports(t, e, u, -1);
                            a.contains(t.vertices, v[0]) && (p[y++] = v[0]), y < 2 && a.contains(t.vertices, v[1]) && (p[y++] = v[1])
                        }
                        return 0 === y && (p[y++] = g[0]), p.length = y, o
                    }, n._overlapAxes = function (e, t, i, n) {
                        var o, r, s, a, l, c, d = t.length, u = i.length, p = t[0].x, h = t[0].y, f = i[0].x,
                            m = i[0].y, g = n.length, y = Number.MAX_VALUE, v = 0;
                        for (l = 0; l < g; l++) {
                            var x = n[l], b = x.x, w = x.y, S = p * b + h * w, A = f * b + m * w, T = S, _ = A;
                            for (c = 1; c < d; c += 1) (a = t[c].x * b + t[c].y * w) > T ? T = a : a < S && (S = a);
                            for (c = 1; c < u; c += 1) (a = i[c].x * b + i[c].y * w) > _ ? _ = a : a < A && (A = a);
                            if ((o = (r = T - A) < (s = _ - S) ? r : s) < y && (y = o, v = l, o <= 0)) break
                        }
                        e.axis = n[v], e.overlap = y
                    }, n._projectToAxis = function (e, t, i) {
                        for (var n = t[0].x * i.x + t[0].y * i.y, o = n, r = 1; r < t.length; r += 1) {
                            var s = t[r].x * i.x + t[r].y * i.y;
                            s > o ? o = s : s < n && (n = s)
                        }
                        e.min = n, e.max = o
                    }, n._findSupports = function (e, t, i, n) {
                        var r, s, a, l, c, d = t.vertices, u = d.length, p = e.position.x, h = e.position.y,
                            f = i.x * n, m = i.y * n, g = Number.MAX_VALUE;
                        for (c = 0; c < u; c += 1) (l = f * (p - (s = d[c]).x) + m * (h - s.y)) < g && (g = l, r = s);
                        return g = f * (p - (a = d[(u + r.index - 1) % u]).x) + m * (h - a.y), f * (p - (s = d[(r.index + 1) % u]).x) + m * (h - s.y) < g ? (o[0] = r, o[1] = s, o) : (o[0] = r, o[1] = a, o)
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(17);
                    n.create = function (e, t) {
                        var i = e.bodyA, o = e.bodyB, r = {
                            id: n.id(i, o),
                            bodyA: i,
                            bodyB: o,
                            collision: e,
                            contacts: [],
                            activeContacts: [],
                            separation: 0,
                            isActive: !0,
                            confirmedActive: !0,
                            isSensor: i.isSensor || o.isSensor,
                            timeCreated: t,
                            timeUpdated: t,
                            inverseMass: 0,
                            friction: 0,
                            frictionStatic: 0,
                            restitution: 0,
                            slop: 0
                        };
                        return n.update(r, e, t), r
                    }, n.update = function (e, t, i) {
                        var n = e.contacts, r = t.supports, s = e.activeContacts, a = t.parentA, l = t.parentB,
                            c = a.vertices.length;
                        e.isActive = !0, e.timeUpdated = i, e.collision = t, e.separation = t.depth, e.inverseMass = a.inverseMass + l.inverseMass, e.friction = a.friction < l.friction ? a.friction : l.friction, e.frictionStatic = a.frictionStatic > l.frictionStatic ? a.frictionStatic : l.frictionStatic, e.restitution = a.restitution > l.restitution ? a.restitution : l.restitution, e.slop = a.slop > l.slop ? a.slop : l.slop, t.pair = e, s.length = 0;
                        for (var d = 0; d < r.length; d++) {
                            var u = r[d], p = u.body === a ? u.index : c + u.index, h = n[p];
                            h ? s.push(h) : s.push(n[p] = o.create(u))
                        }
                    }, n.setActive = function (e, t, i) {
                        t ? (e.isActive = !0, e.timeUpdated = i) : (e.isActive = !1, e.activeContacts.length = 0)
                    }, n.id = function (e, t) {
                        return e.id < t.id ? "A" + e.id + "B" + t.id : "A" + t.id + "B" + e.id
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(3), r = i(2), s = i(7), a = i(1), l = i(11), c = i(0);
                    n._warming = .4, n._torqueDampen = 1, n._minLength = 1e-6, n.create = function (e) {
                        var t = e;
                        t.bodyA && !t.pointA && (t.pointA = {x: 0, y: 0}), t.bodyB && !t.pointB && (t.pointB = {
                            x: 0,
                            y: 0
                        });
                        var i = t.bodyA ? r.add(t.bodyA.position, t.pointA) : t.pointA,
                            n = t.bodyB ? r.add(t.bodyB.position, t.pointB) : t.pointB, o = r.magnitude(r.sub(i, n));
                        t.length = void 0 !== t.length ? t.length : o, t.id = t.id || c.nextId(), t.label = t.label || "Constraint", t.type = "constraint", t.stiffness = t.stiffness || (t.length > 0 ? 1 : .7), t.damping = t.damping || 0, t.angularStiffness = t.angularStiffness || 0, t.angleA = t.bodyA ? t.bodyA.angle : t.angleA, t.angleB = t.bodyB ? t.bodyB.angle : t.angleB, t.plugin = {};
                        var s = {visible: !0, lineWidth: 2, strokeStyle: "#ffffff", type: "line", anchors: !0};
                        return 0 === t.length && t.stiffness > .1 ? (s.type = "pin", s.anchors = !1) : t.stiffness < .9 && (s.type = "spring"), t.render = c.extend(s, t.render), t
                    }, n.preSolveAll = function (e) {
                        for (var t = 0; t < e.length; t += 1) {
                            var i = e[t], n = i.constraintImpulse;
                            i.isStatic || 0 === n.x && 0 === n.y && 0 === n.angle || (i.position.x += n.x, i.position.y += n.y, i.angle += n.angle)
                        }
                    }, n.solveAll = function (e, t) {
                        for (var i = 0; i < e.length; i += 1) {
                            var o = e[i], r = !o.bodyA || o.bodyA && o.bodyA.isStatic,
                                s = !o.bodyB || o.bodyB && o.bodyB.isStatic;
                            (r || s) && n.solve(e[i], t)
                        }
                        for (i = 0; i < e.length; i += 1) r = !(o = e[i]).bodyA || o.bodyA && o.bodyA.isStatic, s = !o.bodyB || o.bodyB && o.bodyB.isStatic, r || s || n.solve(e[i], t)
                    }, n.solve = function (e, t) {
                        var i = e.bodyA, o = e.bodyB, s = e.pointA, a = e.pointB;
                        if (i || o) {
                            i && !i.isStatic && (r.rotate(s, i.angle - e.angleA, s), e.angleA = i.angle), o && !o.isStatic && (r.rotate(a, o.angle - e.angleB, a), e.angleB = o.angle);
                            var l = s, c = a;
                            if (i && (l = r.add(i.position, s)), o && (c = r.add(o.position, a)), l && c) {
                                var d = r.sub(l, c), u = r.magnitude(d);
                                u < n._minLength && (u = n._minLength);
                                var p, h, f, m, g, y = (u - e.length) / u,
                                    v = e.stiffness < 1 ? e.stiffness * t : e.stiffness, x = r.mult(d, y * v),
                                    b = (i ? i.inverseMass : 0) + (o ? o.inverseMass : 0),
                                    w = b + ((i ? i.inverseInertia : 0) + (o ? o.inverseInertia : 0));
                                if (e.damping) {
                                    var S = r.create();
                                    f = r.div(d, u), g = r.sub(o && r.sub(o.position, o.positionPrev) || S, i && r.sub(i.position, i.positionPrev) || S), m = r.dot(f, g)
                                }
                                i && !i.isStatic && (h = i.inverseMass / b, i.constraintImpulse.x -= x.x * h, i.constraintImpulse.y -= x.y * h, i.position.x -= x.x * h, i.position.y -= x.y * h, e.damping && (i.positionPrev.x -= e.damping * f.x * m * h, i.positionPrev.y -= e.damping * f.y * m * h), p = r.cross(s, x) / w * n._torqueDampen * i.inverseInertia * (1 - e.angularStiffness), i.constraintImpulse.angle -= p, i.angle -= p), o && !o.isStatic && (h = o.inverseMass / b, o.constraintImpulse.x += x.x * h, o.constraintImpulse.y += x.y * h, o.position.x += x.x * h, o.position.y += x.y * h, e.damping && (o.positionPrev.x += e.damping * f.x * m * h, o.positionPrev.y += e.damping * f.y * m * h), p = r.cross(a, x) / w * n._torqueDampen * o.inverseInertia * (1 - e.angularStiffness), o.constraintImpulse.angle += p, o.angle += p)
                            }
                        }
                    }, n.postSolveAll = function (e) {
                        for (var t = 0; t < e.length; t++) {
                            var i = e[t], c = i.constraintImpulse;
                            if (!(i.isStatic || 0 === c.x && 0 === c.y && 0 === c.angle)) {
                                s.set(i, !1);
                                for (var d = 0; d < i.parts.length; d++) {
                                    var u = i.parts[d];
                                    o.translate(u.vertices, c), d > 0 && (u.position.x += c.x, u.position.y += c.y), 0 !== c.angle && (o.rotate(u.vertices, c.angle, i.position), l.rotate(u.axes, c.angle), d > 0 && r.rotateAbout(u.position, c.angle, i.position, u.position)), a.update(u.bounds, u.vertices, i.velocity)
                                }
                                c.angle *= n._warming, c.x *= n._warming, c.y *= n._warming
                            }
                        }
                    }, n.pointAWorld = function (e) {
                        return {
                            x: (e.bodyA ? e.bodyA.position.x : 0) + e.pointA.x,
                            y: (e.bodyA ? e.bodyA.position.y : 0) + e.pointA.y
                        }
                    }, n.pointBWorld = function (e) {
                        return {
                            x: (e.bodyB ? e.bodyB.position.x : 0) + e.pointB.x,
                            y: (e.bodyB ? e.bodyB.position.y : 0) + e.pointB.y
                        }
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(2), r = i(0);
                    n.fromVertices = function (e) {
                        for (var t = {}, i = 0; i < e.length; i++) {
                            var n = (i + 1) % e.length, s = o.normalise({x: e[n].y - e[i].y, y: e[i].x - e[n].x}),
                                a = 0 === s.y ? 1 / 0 : s.x / s.y;
                            t[a = a.toFixed(3).toString()] = s
                        }
                        return r.values(t)
                    }, n.rotate = function (e, t) {
                        if (0 !== t) for (var i = Math.cos(t), n = Math.sin(t), o = 0; o < e.length; o++) {
                            var r, s = e[o];
                            r = s.x * i - s.y * n, s.y = s.x * n + s.y * i, s.x = r
                        }
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(3), r = i(0), s = i(6), a = i(1), l = i(2);
                    n.rectangle = function (e, t, i, n, a) {
                        a = a || {};
                        var l = {
                            label: "Rectangle Body",
                            position: {x: e, y: t},
                            vertices: o.fromPath("L 0 0 L " + i + " 0 L " + i + " " + n + " L 0 " + n)
                        };
                        if (a.chamfer) {
                            var c = a.chamfer;
                            l.vertices = o.chamfer(l.vertices, c.radius, c.quality, c.qualityMin, c.qualityMax), delete a.chamfer
                        }
                        return s.create(r.extend({}, l, a))
                    }, n.trapezoid = function (e, t, i, n, a, l) {
                        l = l || {};
                        var c, d = i * (a *= .5), u = d + (1 - 2 * a) * i, p = u + d;
                        c = a < .5 ? "L 0 0 L " + d + " " + -n + " L " + u + " " + -n + " L " + p + " 0" : "L 0 0 L " + u + " " + -n + " L " + p + " 0";
                        var h = {label: "Trapezoid Body", position: {x: e, y: t}, vertices: o.fromPath(c)};
                        if (l.chamfer) {
                            var f = l.chamfer;
                            h.vertices = o.chamfer(h.vertices, f.radius, f.quality, f.qualityMin, f.qualityMax), delete l.chamfer
                        }
                        return s.create(r.extend({}, h, l))
                    }, n.circle = function (e, t, i, o, s) {
                        o = o || {};
                        var a = {label: "Circle Body", circleRadius: i};
                        s = s || 25;
                        var l = Math.ceil(Math.max(10, Math.min(s, i)));
                        return l % 2 == 1 && (l += 1), n.polygon(e, t, l, i, r.extend({}, a, o))
                    }, n.polygon = function (e, t, i, a, l) {
                        if (l = l || {}, i < 3) return n.circle(e, t, a, l);
                        for (var c = 2 * Math.PI / i, d = "", u = .5 * c, p = 0; p < i; p += 1) {
                            var h = u + p * c, f = Math.cos(h) * a, m = Math.sin(h) * a;
                            d += "L " + f.toFixed(3) + " " + m.toFixed(3) + " "
                        }
                        var g = {label: "Polygon Body", position: {x: e, y: t}, vertices: o.fromPath(d)};
                        if (l.chamfer) {
                            var y = l.chamfer;
                            g.vertices = o.chamfer(g.vertices, y.radius, y.quality, y.qualityMin, y.qualityMax), delete l.chamfer
                        }
                        return s.create(r.extend({}, g, l))
                    }, n.fromVertices = function (e, t, i, n, c, d, u, p) {
                        var h, f, m, g, y, v, x, b, w, S, A = r.getDecomp();
                        for (h = Boolean(A && A.quickDecomp), n = n || {}, m = [], c = void 0 !== c && c, d = void 0 !== d ? d : .01, u = void 0 !== u ? u : 10, p = void 0 !== p ? p : .01, r.isArray(i[0]) || (i = [i]), w = 0; w < i.length; w += 1) if (y = i[w], !(g = o.isConvex(y)) && !h && r.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."), g || !h) y = g ? o.clockwiseSort(y) : o.hull(y), m.push({
                            position: {
                                x: e,
                                y: t
                            }, vertices: y
                        }); else {
                            var T = y.map((function (e) {
                                return [e.x, e.y]
                            }));
                            A.makeCCW(T), !1 !== d && A.removeCollinearPoints(T, d), !1 !== p && A.removeDuplicatePoints && A.removeDuplicatePoints(T, p);
                            var _ = A.quickDecomp(T);
                            for (v = 0; v < _.length; v++) {
                                var k = _[v].map((function (e) {
                                    return {x: e[0], y: e[1]}
                                }));
                                u > 0 && o.area(k) < u || m.push({position: o.centre(k), vertices: k})
                            }
                        }
                        for (v = 0; v < m.length; v++) m[v] = s.create(r.extend(m[v], n));
                        if (c) for (v = 0; v < m.length; v++) {
                            var C = m[v];
                            for (x = v + 1; x < m.length; x++) {
                                var E = m[x];
                                if (a.overlaps(C.bounds, E.bounds)) {
                                    var B = C.vertices, P = E.vertices;
                                    for (b = 0; b < C.vertices.length; b++) for (S = 0; S < E.vertices.length; S++) {
                                        var M = l.magnitudeSquared(l.sub(B[(b + 1) % B.length], P[S])),
                                            R = l.magnitudeSquared(l.sub(B[b], P[(S + 1) % P.length]));
                                        M < 5 && R < 5 && (B[b].isInternal = !0, P[S].isInternal = !0)
                                    }
                                }
                            }
                        }
                        return m.length > 1 ? (f = s.create(r.extend({parts: m.slice(0)}, n)), s.setPosition(f, {
                            x: e,
                            y: t
                        }), f) : m[0]
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(0);
                    n.create = function (e) {
                        var t = {};
                        return e || o.log("Mouse.create: element was undefined, defaulting to document.body", "warn"), t.element = e || document.body, t.absolute = {
                            x: 0,
                            y: 0
                        }, t.position = {x: 0, y: 0}, t.mousedownPosition = {x: 0, y: 0}, t.mouseupPosition = {
                            x: 0,
                            y: 0
                        }, t.offset = {x: 0, y: 0}, t.scale = {
                            x: 1,
                            y: 1
                        }, t.wheelDelta = 0, t.button = -1, t.pixelRatio = parseInt(t.element.getAttribute("data-pixel-ratio"), 10) || 1, t.sourceEvents = {
                            mousemove: null,
                            mousedown: null,
                            mouseup: null,
                            mousewheel: null
                        }, t.mousemove = function (e) {
                            var i = n._getRelativeMousePosition(e, t.element, t.pixelRatio);
                            e.changedTouches && (t.button = 0, e.preventDefault()), t.absolute.x = i.x, t.absolute.y = i.y, t.position.x = t.absolute.x * t.scale.x + t.offset.x, t.position.y = t.absolute.y * t.scale.y + t.offset.y, t.sourceEvents.mousemove = e
                        }, t.mousedown = function (e) {
                            var i = n._getRelativeMousePosition(e, t.element, t.pixelRatio);
                            e.changedTouches ? (t.button = 0, e.preventDefault()) : t.button = e.button, t.absolute.x = i.x, t.absolute.y = i.y, t.position.x = t.absolute.x * t.scale.x + t.offset.x, t.position.y = t.absolute.y * t.scale.y + t.offset.y, t.mousedownPosition.x = t.position.x, t.mousedownPosition.y = t.position.y, t.sourceEvents.mousedown = e
                        }, t.mouseup = function (e) {
                            var i = n._getRelativeMousePosition(e, t.element, t.pixelRatio);
                            e.changedTouches && e.preventDefault(), t.button = -1, t.absolute.x = i.x, t.absolute.y = i.y, t.position.x = t.absolute.x * t.scale.x + t.offset.x, t.position.y = t.absolute.y * t.scale.y + t.offset.y, t.mouseupPosition.x = t.position.x, t.mouseupPosition.y = t.position.y, t.sourceEvents.mouseup = e
                        }, t.mousewheel = function (e) {
                            t.wheelDelta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)), e.preventDefault()
                        }, n.setElement(t, t.element), t
                    }, n.setElement = function (e, t) {
                        e.element = t, t.addEventListener("mousemove", e.mousemove), t.addEventListener("mousedown", e.mousedown), t.addEventListener("mouseup", e.mouseup), t.addEventListener("mousewheel", e.mousewheel), t.addEventListener("DOMMouseScroll", e.mousewheel), t.addEventListener("touchmove", e.mousemove), t.addEventListener("touchstart", e.mousedown), t.addEventListener("touchend", e.mouseup)
                    }, n.clearSourceEvents = function (e) {
                        e.sourceEvents.mousemove = null, e.sourceEvents.mousedown = null, e.sourceEvents.mouseup = null, e.sourceEvents.mousewheel = null, e.wheelDelta = 0
                    }, n.setOffset = function (e, t) {
                        e.offset.x = t.x, e.offset.y = t.y, e.position.x = e.absolute.x * e.scale.x + e.offset.x, e.position.y = e.absolute.y * e.scale.y + e.offset.y
                    }, n.setScale = function (e, t) {
                        e.scale.x = t.x, e.scale.y = t.y, e.position.x = e.absolute.x * e.scale.x + e.offset.x, e.position.y = e.absolute.y * e.scale.y + e.offset.y
                    }, n._getRelativeMousePosition = function (e, t, i) {
                        var n, o, r = t.getBoundingClientRect(),
                            s = document.documentElement || document.body.parentNode || document.body,
                            a = void 0 !== window.pageXOffset ? window.pageXOffset : s.scrollLeft,
                            l = void 0 !== window.pageYOffset ? window.pageYOffset : s.scrollTop, c = e.changedTouches;
                        return c ? (n = c[0].pageX - r.left - a, o = c[0].pageY - r.top - l) : (n = e.pageX - r.left - a, o = e.pageY - r.top - l), {
                            x: n / (t.clientWidth / (t.width || t.clientWidth) * i),
                            y: o / (t.clientHeight / (t.height || t.clientHeight) * i)
                        }
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(0), r = i(8);
                    n.create = function (e) {
                        return o.extend({bodies: [], pairs: null}, e)
                    }, n.setBodies = function (e, t) {
                        e.bodies = t.slice(0)
                    }, n.clear = function (e) {
                        e.bodies = []
                    }, n.collisions = function (e) {
                        var t, i, o = [], s = e.pairs, a = e.bodies, l = a.length, c = n.canCollide, d = r.collides;
                        for (a.sort(n._compareBoundsX), t = 0; t < l; t++) {
                            var u = a[t], p = u.bounds, h = u.bounds.max.x, f = u.bounds.max.y, m = u.bounds.min.y,
                                g = u.isStatic || u.isSleeping, y = u.parts.length, v = 1 === y;
                            for (i = t + 1; i < l; i++) {
                                var x = a[i];
                                if ((C = x.bounds).min.x > h) break;
                                if (!(f < C.min.y || m > C.max.y) && (!g || !x.isStatic && !x.isSleeping) && c(u.collisionFilter, x.collisionFilter)) {
                                    var b = x.parts.length;
                                    if (v && 1 === b) (_ = d(u, x, s)) && o.push(_); else for (var w = b > 1 ? 1 : 0, S = y > 1 ? 1 : 0; S < y; S++) for (var A = u.parts[S], T = (p = A.bounds, w); T < b; T++) {
                                        var _, k = x.parts[T], C = k.bounds;
                                        p.min.x > C.max.x || p.max.x < C.min.x || p.max.y < C.min.y || p.min.y > C.max.y || (_ = d(A, k, s)) && o.push(_)
                                    }
                                }
                            }
                        }
                        return o
                    }, n.canCollide = function (e, t) {
                        return e.group === t.group && 0 !== e.group ? e.group > 0 : 0 != (e.mask & t.category) && 0 != (t.mask & e.category)
                    }, n._compareBoundsX = function (e, t) {
                        return e.bounds.min.x - t.bounds.min.x
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(0);
                    n._registry = {}, n.register = function (e) {
                        if (n.isPlugin(e) || o.warn("Plugin.register:", n.toString(e), "does not implement all required fields."), e.name in n._registry) {
                            var t = n._registry[e.name], i = n.versionParse(e.version).number,
                                r = n.versionParse(t.version).number;
                            i > r ? (o.warn("Plugin.register:", n.toString(t), "was upgraded to", n.toString(e)), n._registry[e.name] = e) : i < r ? o.warn("Plugin.register:", n.toString(t), "can not be downgraded to", n.toString(e)) : e !== t && o.warn("Plugin.register:", n.toString(e), "is already registered to different plugin object")
                        } else n._registry[e.name] = e;
                        return e
                    }, n.resolve = function (e) {
                        return n._registry[n.dependencyParse(e).name]
                    }, n.toString = function (e) {
                        return "string" == typeof e ? e : (e.name || "anonymous") + "@" + (e.version || e.range || "0.0.0")
                    }, n.isPlugin = function (e) {
                        return e && e.name && e.version && e.install
                    }, n.isUsed = function (e, t) {
                        return e.used.indexOf(t) > -1
                    }, n.isFor = function (e, t) {
                        var i = e.for && n.dependencyParse(e.for);
                        return !e.for || t.name === i.name && n.versionSatisfies(t.version, i.range)
                    }, n.use = function (e, t) {
                        if (e.uses = (e.uses || []).concat(t || []), 0 !== e.uses.length) {
                            for (var i = n.dependencies(e), r = o.topologicalSort(i), s = [], a = 0; a < r.length; a += 1) if (r[a] !== e.name) {
                                var l = n.resolve(r[a]);
                                l ? n.isUsed(e, l.name) || (n.isFor(l, e) || (o.warn("Plugin.use:", n.toString(l), "is for", l.for, "but installed on", n.toString(e) + "."), l._warned = !0), l.install ? l.install(e) : (o.warn("Plugin.use:", n.toString(l), "does not specify an install function."), l._warned = !0), l._warned ? (s.push("🔶 " + n.toString(l)), delete l._warned) : s.push("✅ " + n.toString(l)), e.used.push(l.name)) : s.push("❌ " + r[a])
                            }
                            s.length > 0 && o.info(s.join("  "))
                        } else o.warn("Plugin.use:", n.toString(e), "does not specify any dependencies to install.")
                    }, n.dependencies = function (e, t) {
                        var i = n.dependencyParse(e), r = i.name;
                        if (!(r in (t = t || {}))) {
                            e = n.resolve(e) || e, t[r] = o.map(e.uses || [], (function (t) {
                                n.isPlugin(t) && n.register(t);
                                var r = n.dependencyParse(t), s = n.resolve(t);
                                return s && !n.versionSatisfies(s.version, r.range) ? (o.warn("Plugin.dependencies:", n.toString(s), "does not satisfy", n.toString(r), "used by", n.toString(i) + "."), s._warned = !0, e._warned = !0) : s || (o.warn("Plugin.dependencies:", n.toString(t), "used by", n.toString(i), "could not be resolved."), e._warned = !0), r.name
                            }));
                            for (var s = 0; s < t[r].length; s += 1) n.dependencies(t[r][s], t);
                            return t
                        }
                    }, n.dependencyParse = function (e) {
                        return o.isString(e) ? (/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/.test(e) || o.warn("Plugin.dependencyParse:", e, "is not a valid dependency string."), {
                            name: e.split("@")[0],
                            range: e.split("@")[1] || "*"
                        }) : {name: e.name, range: e.range || e.version}
                    }, n.versionParse = function (e) {
                        var t = /^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;
                        t.test(e) || o.warn("Plugin.versionParse:", e, "is not a valid version or range.");
                        var i = t.exec(e), n = Number(i[4]), r = Number(i[5]), s = Number(i[6]);
                        return {
                            isRange: Boolean(i[1] || i[2]),
                            version: i[3],
                            range: e,
                            operator: i[1] || i[2] || "",
                            major: n,
                            minor: r,
                            patch: s,
                            parts: [n, r, s],
                            prerelease: i[7],
                            number: 1e8 * n + 1e4 * r + s
                        }
                    }, n.versionSatisfies = function (e, t) {
                        t = t || "*";
                        var i = n.versionParse(t), o = n.versionParse(e);
                        if (i.isRange) {
                            if ("*" === i.operator || "*" === e) return !0;
                            if (">" === i.operator) return o.number > i.number;
                            if (">=" === i.operator) return o.number >= i.number;
                            if ("~" === i.operator) return o.major === i.major && o.minor === i.minor && o.patch >= i.patch;
                            if ("^" === i.operator) return i.major > 0 ? o.major === i.major && o.number >= i.number : i.minor > 0 ? o.minor === i.minor && o.patch >= i.patch : o.patch === i.patch
                        }
                        return e === t || "*" === e
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(0), r = i(5), s = i(1), a = i(4), l = i(2), c = i(13);
                    !function () {
                        var e, t;
                        "undefined" != typeof window && (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
                            window.setTimeout((function () {
                                e(o.now())
                            }), 1e3 / 60)
                        }, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), n._goodFps = 30, n._goodDelta = 1e3 / 60, n.create = function (e) {
                            var t = {
                                controller: n,
                                engine: null,
                                element: null,
                                canvas: null,
                                mouse: null,
                                frameRequestId: null,
                                timing: {
                                    historySize: 60,
                                    delta: 0,
                                    deltaHistory: [],
                                    lastTime: 0,
                                    lastTimestamp: 0,
                                    lastElapsed: 0,
                                    timestampElapsed: 0,
                                    timestampElapsedHistory: [],
                                    engineDeltaHistory: [],
                                    engineElapsedHistory: [],
                                    elapsedHistory: []
                                },
                                options: {
                                    width: 800,
                                    height: 600,
                                    pixelRatio: 1,
                                    background: "#14151f",
                                    wireframeBackground: "#14151f",
                                    hasBounds: !!e.bounds,
                                    enabled: !0,
                                    wireframes: !0,
                                    showSleeping: !0,
                                    showDebug: !1,
                                    showStats: !1,
                                    showPerformance: !1,
                                    showBounds: !1,
                                    showVelocity: !1,
                                    showCollisions: !1,
                                    showSeparations: !1,
                                    showAxes: !1,
                                    showPositions: !1,
                                    showAngleIndicator: !1,
                                    showIds: !1,
                                    showVertexNumbers: !1,
                                    showConvexHulls: !1,
                                    showInternalEdges: !1,
                                    showMousePosition: !1
                                }
                            }, i = o.extend(t, e);
                            return i.canvas && (i.canvas.width = i.options.width || i.canvas.width, i.canvas.height = i.options.height || i.canvas.height), i.mouse = e.mouse, i.engine = e.engine, i.canvas = i.canvas || u(i.options.width, i.options.height), i.context = i.canvas.getContext("2d"), i.textures = {}, i.bounds = i.bounds || {
                                min: {
                                    x: 0,
                                    y: 0
                                }, max: {x: i.canvas.width, y: i.canvas.height}
                            }, i.options.showBroadphase = !1, 1 !== i.options.pixelRatio && n.setPixelRatio(i, i.options.pixelRatio), o.isElement(i.element) ? i.element.appendChild(i.canvas) : i.canvas.parentNode || o.log("Render.create: options.element was undefined, render.canvas was created but not appended", "warn"), i
                        }, n.run = function (t) {
                            !function o(r) {
                                t.frameRequestId = e(o), i(t, r), n.world(t, r), (t.options.showStats || t.options.showDebug) && n.stats(t, t.context, r), (t.options.showPerformance || t.options.showDebug) && n.performance(t, t.context, r)
                            }()
                        }, n.stop = function (e) {
                            t(e.frameRequestId)
                        }, n.setPixelRatio = function (e, t) {
                            var i = e.options, n = e.canvas;
                            "auto" === t && (t = p(n)), i.pixelRatio = t, n.setAttribute("data-pixel-ratio", t), n.width = i.width * t, n.height = i.height * t, n.style.width = i.width + "px", n.style.height = i.height + "px"
                        }, n.lookAt = function (e, t, i, n) {
                            n = void 0 === n || n, t = o.isArray(t) ? t : [t], i = i || {x: 0, y: 0};
                            for (var r = {
                                min: {x: 1 / 0, y: 1 / 0},
                                max: {x: -1 / 0, y: -1 / 0}
                            }, s = 0; s < t.length; s += 1) {
                                var a = t[s], l = a.bounds ? a.bounds.min : a.min || a.position || a,
                                    d = a.bounds ? a.bounds.max : a.max || a.position || a;
                                l && d && (l.x < r.min.x && (r.min.x = l.x), d.x > r.max.x && (r.max.x = d.x), l.y < r.min.y && (r.min.y = l.y), d.y > r.max.y && (r.max.y = d.y))
                            }
                            var u = r.max.x - r.min.x + 2 * i.x, p = r.max.y - r.min.y + 2 * i.y, h = e.canvas.height,
                                f = e.canvas.width / h, m = u / p, g = 1, y = 1;
                            m > f ? y = m / f : g = f / m, e.options.hasBounds = !0, e.bounds.min.x = r.min.x, e.bounds.max.x = r.min.x + u * g, e.bounds.min.y = r.min.y, e.bounds.max.y = r.min.y + p * y, n && (e.bounds.min.x += .5 * u - u * g * .5, e.bounds.max.x += .5 * u - u * g * .5, e.bounds.min.y += .5 * p - p * y * .5, e.bounds.max.y += .5 * p - p * y * .5), e.bounds.min.x -= i.x, e.bounds.max.x -= i.x, e.bounds.min.y -= i.y, e.bounds.max.y -= i.y, e.mouse && (c.setScale(e.mouse, {
                                x: (e.bounds.max.x - e.bounds.min.x) / e.canvas.width,
                                y: (e.bounds.max.y - e.bounds.min.y) / e.canvas.height
                            }), c.setOffset(e.mouse, e.bounds.min))
                        }, n.startViewTransform = function (e) {
                            var t = e.bounds.max.x - e.bounds.min.x, i = e.bounds.max.y - e.bounds.min.y,
                                n = t / e.options.width, o = i / e.options.height;
                            e.context.setTransform(e.options.pixelRatio / n, 0, 0, e.options.pixelRatio / o, 0, 0), e.context.translate(-e.bounds.min.x, -e.bounds.min.y)
                        }, n.endViewTransform = function (e) {
                            e.context.setTransform(e.options.pixelRatio, 0, 0, e.options.pixelRatio, 0, 0)
                        }, n.world = function (e, t) {
                            var i, d = o.now(), u = e.engine, p = u.world, h = e.canvas, m = e.context, g = e.options,
                                y = e.timing, v = r.allBodies(p), x = r.allConstraints(p),
                                b = g.wireframes ? g.wireframeBackground : g.background, w = [], S = [],
                                A = {timestamp: u.timing.timestamp};
                            if (a.trigger(e, "beforeRender", A), e.currentBackground !== b && f(e, b), m.globalCompositeOperation = "source-in", m.fillStyle = "transparent", m.fillRect(0, 0, h.width, h.height), m.globalCompositeOperation = "source-over", g.hasBounds) {
                                for (i = 0; i < v.length; i++) {
                                    var T = v[i];
                                    s.overlaps(T.bounds, e.bounds) && w.push(T)
                                }
                                for (i = 0; i < x.length; i++) {
                                    var _ = x[i], k = _.bodyA, C = _.bodyB, E = _.pointA, B = _.pointB;
                                    k && (E = l.add(k.position, _.pointA)), C && (B = l.add(C.position, _.pointB)), E && B && (s.contains(e.bounds, E) || s.contains(e.bounds, B)) && S.push(_)
                                }
                                n.startViewTransform(e), e.mouse && (c.setScale(e.mouse, {
                                    x: (e.bounds.max.x - e.bounds.min.x) / e.options.width,
                                    y: (e.bounds.max.y - e.bounds.min.y) / e.options.height
                                }), c.setOffset(e.mouse, e.bounds.min))
                            } else S = x, w = v, 1 !== e.options.pixelRatio && e.context.setTransform(e.options.pixelRatio, 0, 0, e.options.pixelRatio, 0, 0);
                            !g.wireframes || u.enableSleeping && g.showSleeping ? n.bodies(e, w, m) : (g.showConvexHulls && n.bodyConvexHulls(e, w, m), n.bodyWireframes(e, w, m)), g.showBounds && n.bodyBounds(e, w, m), (g.showAxes || g.showAngleIndicator) && n.bodyAxes(e, w, m), g.showPositions && n.bodyPositions(e, w, m), g.showVelocity && n.bodyVelocity(e, w, m), g.showIds && n.bodyIds(e, w, m), g.showSeparations && n.separations(e, u.pairs.list, m), g.showCollisions && n.collisions(e, u.pairs.list, m), g.showVertexNumbers && n.vertexNumbers(e, w, m), g.showMousePosition && n.mousePosition(e, e.mouse, m), n.constraints(S, m), g.hasBounds && n.endViewTransform(e), a.trigger(e, "afterRender", A), y.lastElapsed = o.now() - d
                        }, n.stats = function (e, t, i) {
                            for (var n = e.engine, o = n.world, s = r.allBodies(o), a = 0, l = 0, c = 0; c < s.length; c += 1) a += s[c].parts.length;
                            var d = {
                                Part: a,
                                Body: s.length,
                                Cons: r.allConstraints(o).length,
                                Comp: r.allComposites(o).length,
                                Pair: n.pairs.list.length
                            };
                            for (var u in t.fillStyle = "#0e0f19", t.fillRect(l, 0, 302.5, 44), t.font = "12px Arial", t.textBaseline = "top", t.textAlign = "right", d) {
                                var p = d[u];
                                t.fillStyle = "#aaa", t.fillText(u, l + 55, 8), t.fillStyle = "#eee", t.fillText(p, l + 55, 26), l += 55
                            }
                        }, n.performance = function (e, t) {
                            var i = e.engine, o = e.timing, r = o.deltaHistory, s = o.elapsedHistory,
                                a = o.timestampElapsedHistory, l = o.engineDeltaHistory, c = o.engineElapsedHistory,
                                u = i.timing.lastDelta, p = d(r), h = d(s), f = d(l), m = d(c), g = d(a) / p || 0,
                                y = 1e3 / p || 0;
                            t.fillStyle = "#0e0f19", t.fillRect(0, 50, 370, 34), n.status(t, 10, 69, 60, 4, r.length, Math.round(y) + " fps", y / n._goodFps, (function (e) {
                                return r[e] / p - 1
                            })), n.status(t, 82, 69, 60, 4, l.length, u.toFixed(2) + " dt", n._goodDelta / u, (function (e) {
                                return l[e] / f - 1
                            })), n.status(t, 154, 69, 60, 4, c.length, m.toFixed(2) + " ut", 1 - m / n._goodFps, (function (e) {
                                return c[e] / m - 1
                            })), n.status(t, 226, 69, 60, 4, s.length, h.toFixed(2) + " rt", 1 - h / n._goodFps, (function (e) {
                                return s[e] / h - 1
                            })), n.status(t, 298, 69, 60, 4, a.length, g.toFixed(2) + " x", g * g * g, (function (e) {
                                return (a[e] / r[e] / g || 0) - 1
                            }))
                        }, n.status = function (e, t, i, n, r, s, a, l, c) {
                            e.strokeStyle = "#888", e.fillStyle = "#444", e.lineWidth = 1, e.fillRect(t, i + 7, n, 1), e.beginPath(), e.moveTo(t, i + 7 - r * o.clamp(.4 * c(0), -2, 2));
                            for (var d = 0; d < n; d += 1) e.lineTo(t + d, i + 7 - (d < s ? r * o.clamp(.4 * c(d), -2, 2) : 0));
                            e.stroke(), e.fillStyle = "hsl(" + o.clamp(25 + 95 * l, 0, 120) + ",100%,60%)", e.fillRect(t, i - 7, 4, 4), e.font = "12px Arial", e.textBaseline = "middle", e.textAlign = "right", e.fillStyle = "#eee", e.fillText(a, t + n, i - 5)
                        }, n.constraints = function (e, t) {
                            for (var i = t, n = 0; n < e.length; n++) {
                                var r = e[n];
                                if (r.render.visible && r.pointA && r.pointB) {
                                    var s, a, c = r.bodyA, d = r.bodyB;
                                    if (s = c ? l.add(c.position, r.pointA) : r.pointA, "pin" === r.render.type) i.beginPath(), i.arc(s.x, s.y, 3, 0, 2 * Math.PI), i.closePath(); else {
                                        if (a = d ? l.add(d.position, r.pointB) : r.pointB, i.beginPath(), i.moveTo(s.x, s.y), "spring" === r.render.type) for (var u, p = l.sub(a, s), h = l.perp(l.normalise(p)), f = Math.ceil(o.clamp(r.length / 5, 12, 20)), m = 1; m < f; m += 1) u = m % 2 == 0 ? 1 : -1, i.lineTo(s.x + p.x * (m / f) + h.x * u * 4, s.y + p.y * (m / f) + h.y * u * 4);
                                        i.lineTo(a.x, a.y)
                                    }
                                    r.render.lineWidth && (i.lineWidth = r.render.lineWidth, i.strokeStyle = r.render.strokeStyle, i.stroke()), r.render.anchors && (i.fillStyle = r.render.strokeStyle, i.beginPath(), i.arc(s.x, s.y, 3, 0, 2 * Math.PI), i.arc(a.x, a.y, 3, 0, 2 * Math.PI), i.closePath(), i.fill())
                                }
                            }
                        }, n.bodies = function (e, t, i) {
                            var n, o, r, s, a = i, l = (e.engine, e.options), c = l.showInternalEdges || !l.wireframes;
                            for (r = 0; r < t.length; r++) if ((n = t[r]).render.visible) for (s = n.parts.length > 1 ? 1 : 0; s < n.parts.length; s++) if ((o = n.parts[s]).render.visible) {
                                if (l.showSleeping && n.isSleeping ? a.globalAlpha = .5 * o.render.opacity : 1 !== o.render.opacity && (a.globalAlpha = o.render.opacity), o.render.sprite && o.render.sprite.texture && !l.wireframes) {
                                    var d = o.render.sprite, u = h(e, d.texture);
                                    a.translate(o.position.x, o.position.y), a.rotate(o.angle), a.drawImage(u, u.width * -d.xOffset * d.xScale, u.height * -d.yOffset * d.yScale, u.width * d.xScale, u.height * d.yScale), a.rotate(-o.angle), a.translate(-o.position.x, -o.position.y)
                                } else {
                                    if (o.circleRadius) a.beginPath(), a.arc(o.position.x, o.position.y, o.circleRadius, 0, 2 * Math.PI); else {
                                        a.beginPath(), a.moveTo(o.vertices[0].x, o.vertices[0].y);
                                        for (var p = 1; p < o.vertices.length; p++) !o.vertices[p - 1].isInternal || c ? a.lineTo(o.vertices[p].x, o.vertices[p].y) : a.moveTo(o.vertices[p].x, o.vertices[p].y), o.vertices[p].isInternal && !c && a.moveTo(o.vertices[(p + 1) % o.vertices.length].x, o.vertices[(p + 1) % o.vertices.length].y);
                                        a.lineTo(o.vertices[0].x, o.vertices[0].y), a.closePath()
                                    }
                                    l.wireframes ? (a.lineWidth = 1, a.strokeStyle = "#bbb", a.stroke()) : (a.fillStyle = o.render.fillStyle, o.render.lineWidth && (a.lineWidth = o.render.lineWidth, a.strokeStyle = o.render.strokeStyle, a.stroke()), a.fill())
                                }
                                a.globalAlpha = 1
                            }
                        }, n.bodyWireframes = function (e, t, i) {
                            var n, o, r, s, a, l = i, c = e.options.showInternalEdges;
                            for (l.beginPath(), r = 0; r < t.length; r++) if ((n = t[r]).render.visible) for (a = n.parts.length > 1 ? 1 : 0; a < n.parts.length; a++) {
                                for (o = n.parts[a], l.moveTo(o.vertices[0].x, o.vertices[0].y), s = 1; s < o.vertices.length; s++) !o.vertices[s - 1].isInternal || c ? l.lineTo(o.vertices[s].x, o.vertices[s].y) : l.moveTo(o.vertices[s].x, o.vertices[s].y), o.vertices[s].isInternal && !c && l.moveTo(o.vertices[(s + 1) % o.vertices.length].x, o.vertices[(s + 1) % o.vertices.length].y);
                                l.lineTo(o.vertices[0].x, o.vertices[0].y)
                            }
                            l.lineWidth = 1, l.strokeStyle = "#bbb", l.stroke()
                        }, n.bodyConvexHulls = function (e, t, i) {
                            var n, o, r, s = i;
                            for (s.beginPath(), o = 0; o < t.length; o++) if ((n = t[o]).render.visible && 1 !== n.parts.length) {
                                for (s.moveTo(n.vertices[0].x, n.vertices[0].y), r = 1; r < n.vertices.length; r++) s.lineTo(n.vertices[r].x, n.vertices[r].y);
                                s.lineTo(n.vertices[0].x, n.vertices[0].y)
                            }
                            s.lineWidth = 1, s.strokeStyle = "rgba(255,255,255,0.2)", s.stroke()
                        }, n.vertexNumbers = function (e, t, i) {
                            var n, o, r, s = i;
                            for (n = 0; n < t.length; n++) {
                                var a = t[n].parts;
                                for (r = a.length > 1 ? 1 : 0; r < a.length; r++) {
                                    var l = a[r];
                                    for (o = 0; o < l.vertices.length; o++) s.fillStyle = "rgba(255,255,255,0.2)", s.fillText(n + "_" + o, l.position.x + .8 * (l.vertices[o].x - l.position.x), l.position.y + .8 * (l.vertices[o].y - l.position.y))
                                }
                            }
                        }, n.mousePosition = function (e, t, i) {
                            var n = i;
                            n.fillStyle = "rgba(255,255,255,0.8)", n.fillText(t.position.x + "  " + t.position.y, t.position.x + 5, t.position.y - 5)
                        }, n.bodyBounds = function (e, t, i) {
                            var n = i, o = (e.engine, e.options);
                            n.beginPath();
                            for (var r = 0; r < t.length; r++) if (t[r].render.visible) for (var s = t[r].parts, a = s.length > 1 ? 1 : 0; a < s.length; a++) {
                                var l = s[a];
                                n.rect(l.bounds.min.x, l.bounds.min.y, l.bounds.max.x - l.bounds.min.x, l.bounds.max.y - l.bounds.min.y)
                            }
                            o.wireframes ? n.strokeStyle = "rgba(255,255,255,0.08)" : n.strokeStyle = "rgba(0,0,0,0.1)", n.lineWidth = 1, n.stroke()
                        }, n.bodyAxes = function (e, t, i) {
                            var n, o, r, s, a = i, l = (e.engine, e.options);
                            for (a.beginPath(), o = 0; o < t.length; o++) {
                                var c = t[o], d = c.parts;
                                if (c.render.visible) if (l.showAxes) for (r = d.length > 1 ? 1 : 0; r < d.length; r++) for (n = d[r], s = 0; s < n.axes.length; s++) {
                                    var u = n.axes[s];
                                    a.moveTo(n.position.x, n.position.y), a.lineTo(n.position.x + 20 * u.x, n.position.y + 20 * u.y)
                                } else for (r = d.length > 1 ? 1 : 0; r < d.length; r++) for (n = d[r], s = 0; s < n.axes.length; s++) a.moveTo(n.position.x, n.position.y), a.lineTo((n.vertices[0].x + n.vertices[n.vertices.length - 1].x) / 2, (n.vertices[0].y + n.vertices[n.vertices.length - 1].y) / 2)
                            }
                            l.wireframes ? (a.strokeStyle = "indianred", a.lineWidth = 1) : (a.strokeStyle = "rgba(255, 255, 255, 0.4)", a.globalCompositeOperation = "overlay", a.lineWidth = 2), a.stroke(), a.globalCompositeOperation = "source-over"
                        }, n.bodyPositions = function (e, t, i) {
                            var n, o, r, s, a = i, l = (e.engine, e.options);
                            for (a.beginPath(), r = 0; r < t.length; r++) if ((n = t[r]).render.visible) for (s = 0; s < n.parts.length; s++) o = n.parts[s], a.arc(o.position.x, o.position.y, 3, 0, 2 * Math.PI, !1), a.closePath();
                            for (l.wireframes ? a.fillStyle = "indianred" : a.fillStyle = "rgba(0,0,0,0.5)", a.fill(), a.beginPath(), r = 0; r < t.length; r++) (n = t[r]).render.visible && (a.arc(n.positionPrev.x, n.positionPrev.y, 2, 0, 2 * Math.PI, !1), a.closePath());
                            a.fillStyle = "rgba(255,165,0,0.8)", a.fill()
                        }, n.bodyVelocity = function (e, t, i) {
                            var n = i;
                            n.beginPath();
                            for (var o = 0; o < t.length; o++) {
                                var r = t[o];
                                r.render.visible && (n.moveTo(r.position.x, r.position.y), n.lineTo(r.position.x + 2 * (r.position.x - r.positionPrev.x), r.position.y + 2 * (r.position.y - r.positionPrev.y)))
                            }
                            n.lineWidth = 3, n.strokeStyle = "cornflowerblue", n.stroke()
                        }, n.bodyIds = function (e, t, i) {
                            var n, o, r = i;
                            for (n = 0; n < t.length; n++) if (t[n].render.visible) {
                                var s = t[n].parts;
                                for (o = s.length > 1 ? 1 : 0; o < s.length; o++) {
                                    var a = s[o];
                                    r.font = "12px Arial", r.fillStyle = "rgba(255,255,255,0.5)", r.fillText(a.id, a.position.x + 10, a.position.y - 10)
                                }
                            }
                        }, n.collisions = function (e, t, i) {
                            var n, o, r, s, a = i, l = e.options;
                            for (a.beginPath(), r = 0; r < t.length; r++) if ((n = t[r]).isActive) for (o = n.collision, s = 0; s < n.activeContacts.length; s++) {
                                var c = n.activeContacts[s].vertex;
                                a.rect(c.x - 1.5, c.y - 1.5, 3.5, 3.5)
                            }
                            for (l.wireframes ? a.fillStyle = "rgba(255,255,255,0.7)" : a.fillStyle = "orange", a.fill(), a.beginPath(), r = 0; r < t.length; r++) if ((n = t[r]).isActive && (o = n.collision, n.activeContacts.length > 0)) {
                                var d = n.activeContacts[0].vertex.x, u = n.activeContacts[0].vertex.y;
                                2 === n.activeContacts.length && (d = (n.activeContacts[0].vertex.x + n.activeContacts[1].vertex.x) / 2, u = (n.activeContacts[0].vertex.y + n.activeContacts[1].vertex.y) / 2), o.bodyB === o.supports[0].body || !0 === o.bodyA.isStatic ? a.moveTo(d - 8 * o.normal.x, u - 8 * o.normal.y) : a.moveTo(d + 8 * o.normal.x, u + 8 * o.normal.y), a.lineTo(d, u)
                            }
                            l.wireframes ? a.strokeStyle = "rgba(255,165,0,0.7)" : a.strokeStyle = "orange", a.lineWidth = 1, a.stroke()
                        }, n.separations = function (e, t, i) {
                            var n, o, r, s, a, l = i, c = e.options;
                            for (l.beginPath(), a = 0; a < t.length; a++) if ((n = t[a]).isActive) {
                                r = (o = n.collision).bodyA;
                                var d = 1;
                                (s = o.bodyB).isStatic || r.isStatic || (d = .5), s.isStatic && (d = 0), l.moveTo(s.position.x, s.position.y), l.lineTo(s.position.x - o.penetration.x * d, s.position.y - o.penetration.y * d), d = 1, s.isStatic || r.isStatic || (d = .5), r.isStatic && (d = 0), l.moveTo(r.position.x, r.position.y), l.lineTo(r.position.x + o.penetration.x * d, r.position.y + o.penetration.y * d)
                            }
                            c.wireframes ? l.strokeStyle = "rgba(255,165,0,0.5)" : l.strokeStyle = "orange", l.stroke()
                        }, n.inspector = function (e, t) {
                            e.engine;
                            var i, n = e.selected, o = e.render, r = o.options;
                            if (r.hasBounds) {
                                var s = o.bounds.max.x - o.bounds.min.x, a = o.bounds.max.y - o.bounds.min.y,
                                    l = s / o.options.width, c = a / o.options.height;
                                t.scale(1 / l, 1 / c), t.translate(-o.bounds.min.x, -o.bounds.min.y)
                            }
                            for (var d = 0; d < n.length; d++) {
                                var u = n[d].data;
                                switch (t.translate(.5, .5), t.lineWidth = 1, t.strokeStyle = "rgba(255,165,0,0.9)", t.setLineDash([1, 2]), u.type) {
                                    case"body":
                                        i = u.bounds, t.beginPath(), t.rect(Math.floor(i.min.x - 3), Math.floor(i.min.y - 3), Math.floor(i.max.x - i.min.x + 6), Math.floor(i.max.y - i.min.y + 6)), t.closePath(), t.stroke();
                                        break;
                                    case"constraint":
                                        var p = u.pointA;
                                        u.bodyA && (p = u.pointB), t.beginPath(), t.arc(p.x, p.y, 10, 0, 2 * Math.PI), t.closePath(), t.stroke()
                                }
                                t.setLineDash([]), t.translate(-.5, -.5)
                            }
                            null !== e.selectStart && (t.translate(.5, .5), t.lineWidth = 1, t.strokeStyle = "rgba(255,165,0,0.6)", t.fillStyle = "rgba(255,165,0,0.1)", i = e.selectBounds, t.beginPath(), t.rect(Math.floor(i.min.x), Math.floor(i.min.y), Math.floor(i.max.x - i.min.x), Math.floor(i.max.y - i.min.y)), t.closePath(), t.stroke(), t.fill(), t.translate(-.5, -.5)), r.hasBounds && t.setTransform(1, 0, 0, 1, 0, 0)
                        };
                        var i = function (e, t) {
                            var i = e.engine, o = e.timing, r = o.historySize, s = i.timing.timestamp;
                            o.delta = t - o.lastTime || n._goodDelta, o.lastTime = t, o.timestampElapsed = s - o.lastTimestamp || 0, o.lastTimestamp = s, o.deltaHistory.unshift(o.delta), o.deltaHistory.length = Math.min(o.deltaHistory.length, r), o.engineDeltaHistory.unshift(i.timing.lastDelta), o.engineDeltaHistory.length = Math.min(o.engineDeltaHistory.length, r), o.timestampElapsedHistory.unshift(o.timestampElapsed), o.timestampElapsedHistory.length = Math.min(o.timestampElapsedHistory.length, r), o.engineElapsedHistory.unshift(i.timing.lastElapsed), o.engineElapsedHistory.length = Math.min(o.engineElapsedHistory.length, r), o.elapsedHistory.unshift(o.lastElapsed), o.elapsedHistory.length = Math.min(o.elapsedHistory.length, r)
                        }, d = function (e) {
                            for (var t = 0, i = 0; i < e.length; i += 1) t += e[i];
                            return t / e.length || 0
                        }, u = function (e, t) {
                            var i = document.createElement("canvas");
                            return i.width = e, i.height = t, i.oncontextmenu = function () {
                                return !1
                            }, i.onselectstart = function () {
                                return !1
                            }, i
                        }, p = function (e) {
                            var t = e.getContext("2d");
                            return (window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1)
                        }, h = function (e, t) {
                            var i = e.textures[t];
                            return i || ((i = e.textures[t] = new Image).src = t, i)
                        }, f = function (e, t) {
                            var i = t;
                            /(jpg|gif|png)$/.test(t) && (i = "url(" + t + ")"), e.canvas.style.background = i, e.canvas.style.backgroundSize = "contain", e.currentBackground = t
                        }
                    }()
                }, function (e, t) {
                    var i = {};
                    e.exports = i, i.create = function (e) {
                        return {vertex: e, normalImpulse: 0, tangentImpulse: 0}
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(7), r = i(19), s = i(14), a = i(20), l = i(4), c = i(5), d = i(10), u = i(0), p = i(6);
                    n.create = function (e) {
                        e = e || {};
                        var t = u.extend({
                            positionIterations: 6,
                            velocityIterations: 4,
                            constraintIterations: 2,
                            enableSleeping: !1,
                            events: [],
                            plugin: {},
                            gravity: {x: 0, y: 1, scale: .001},
                            timing: {timestamp: 0, timeScale: 1, lastDelta: 0, lastElapsed: 0}
                        }, e);
                        return t.world = e.world || c.create({label: "World"}), t.pairs = e.pairs || a.create(), t.detector = e.detector || s.create(), t.grid = {buckets: []}, t.world.gravity = t.gravity, t.broadphase = t.grid, t.metrics = {}, t
                    }, n.update = function (e, t, i) {
                        var p = u.now();
                        t = t || 1e3 / 60, i = i || 1;
                        var h, f = e.world, m = e.detector, g = e.pairs, y = e.timing, v = y.timestamp;
                        y.timestamp += t * y.timeScale, y.lastDelta = t * y.timeScale;
                        var x = {timestamp: y.timestamp};
                        l.trigger(e, "beforeUpdate", x);
                        var b = c.allBodies(f), w = c.allConstraints(f);
                        for (f.isModified && s.setBodies(m, b), f.isModified && c.setModified(f, !1, !1, !0), e.enableSleeping && o.update(b, y.timeScale), n._bodiesApplyGravity(b, e.gravity), n._bodiesUpdate(b, t, y.timeScale, i, f.bounds), d.preSolveAll(b), h = 0; h < e.constraintIterations; h++) d.solveAll(w, y.timeScale);
                        d.postSolveAll(b), m.pairs = e.pairs;
                        var S = s.collisions(m);
                        for (a.update(g, S, v), e.enableSleeping && o.afterCollisions(g.list, y.timeScale), g.collisionStart.length > 0 && l.trigger(e, "collisionStart", {pairs: g.collisionStart}), r.preSolvePosition(g.list), h = 0; h < e.positionIterations; h++) r.solvePosition(g.list, y.timeScale);
                        for (r.postSolvePosition(b), d.preSolveAll(b), h = 0; h < e.constraintIterations; h++) d.solveAll(w, y.timeScale);
                        for (d.postSolveAll(b), r.preSolveVelocity(g.list), h = 0; h < e.velocityIterations; h++) r.solveVelocity(g.list, y.timeScale);
                        return g.collisionActive.length > 0 && l.trigger(e, "collisionActive", {pairs: g.collisionActive}), g.collisionEnd.length > 0 && l.trigger(e, "collisionEnd", {pairs: g.collisionEnd}), n._bodiesClearForces(b), l.trigger(e, "afterUpdate", x), e.timing.lastElapsed = u.now() - p, e
                    }, n.merge = function (e, t) {
                        if (u.extend(e, t), t.world) {
                            e.world = t.world, n.clear(e);
                            for (var i = c.allBodies(e.world), r = 0; r < i.length; r++) {
                                var s = i[r];
                                o.set(s, !1), s.id = u.nextId()
                            }
                        }
                    }, n.clear = function (e) {
                        a.clear(e.pairs), s.clear(e.detector)
                    }, n._bodiesClearForces = function (e) {
                        for (var t = 0; t < e.length; t++) {
                            var i = e[t];
                            i.force.x = 0, i.force.y = 0, i.torque = 0
                        }
                    }, n._bodiesApplyGravity = function (e, t) {
                        var i = void 0 !== t.scale ? t.scale : .001;
                        if ((0 !== t.x || 0 !== t.y) && 0 !== i) for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            o.isStatic || o.isSleeping || (o.force.y += o.mass * t.y * i, o.force.x += o.mass * t.x * i)
                        }
                    }, n._bodiesUpdate = function (e, t, i, n, o) {
                        for (var r = 0; r < e.length; r++) {
                            var s = e[r];
                            s.isStatic || s.isSleeping || p.update(s, t, i, n)
                        }
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(3), r = i(1);
                    n._restingThresh = 4, n._restingThreshTangent = 6, n._positionDampen = .9, n._positionWarming = .8, n._frictionNormalMultiplier = 5, n.preSolvePosition = function (e) {
                        var t, i, n, o = e.length;
                        for (t = 0; t < o; t++) (i = e[t]).isActive && (n = i.activeContacts.length, i.collision.parentA.totalContacts += n, i.collision.parentB.totalContacts += n)
                    }, n.solvePosition = function (e, t) {
                        var i, o, r, s, a, l, c, d, u = n._positionDampen, p = e.length;
                        for (i = 0; i < p; i++) (o = e[i]).isActive && !o.isSensor && (s = (r = o.collision).parentA, a = r.parentB, l = r.normal, o.separation = l.x * (a.positionImpulse.x + r.penetration.x - s.positionImpulse.x) + l.y * (a.positionImpulse.y + r.penetration.y - s.positionImpulse.y));
                        for (i = 0; i < p; i++) (o = e[i]).isActive && !o.isSensor && (s = (r = o.collision).parentA, a = r.parentB, l = r.normal, d = (o.separation - o.slop) * t, (s.isStatic || a.isStatic) && (d *= 2), s.isStatic || s.isSleeping || (c = u / s.totalContacts, s.positionImpulse.x += l.x * d * c, s.positionImpulse.y += l.y * d * c), a.isStatic || a.isSleeping || (c = u / a.totalContacts, a.positionImpulse.x -= l.x * d * c, a.positionImpulse.y -= l.y * d * c))
                    }, n.postSolvePosition = function (e) {
                        for (var t = n._positionWarming, i = e.length, s = o.translate, a = r.update, l = 0; l < i; l++) {
                            var c = e[l], d = c.positionImpulse, u = d.x, p = d.y, h = c.velocity;
                            if (c.totalContacts = 0, 0 !== u || 0 !== p) {
                                for (var f = 0; f < c.parts.length; f++) {
                                    var m = c.parts[f];
                                    s(m.vertices, d), a(m.bounds, m.vertices, h), m.position.x += u, m.position.y += p
                                }
                                c.positionPrev.x += u, c.positionPrev.y += p, u * h.x + p * h.y < 0 ? (d.x = 0, d.y = 0) : (d.x *= t, d.y *= t)
                            }
                        }
                    }, n.preSolveVelocity = function (e) {
                        var t, i, n = e.length;
                        for (t = 0; t < n; t++) {
                            var o = e[t];
                            if (o.isActive && !o.isSensor) {
                                var r = o.activeContacts, s = r.length, a = o.collision, l = a.parentA, c = a.parentB,
                                    d = a.normal, u = a.tangent;
                                for (i = 0; i < s; i++) {
                                    var p = r[i], h = p.vertex, f = p.normalImpulse, m = p.tangentImpulse;
                                    if (0 !== f || 0 !== m) {
                                        var g = d.x * f + u.x * m, y = d.y * f + u.y * m;
                                        l.isStatic || l.isSleeping || (l.positionPrev.x += g * l.inverseMass, l.positionPrev.y += y * l.inverseMass, l.anglePrev += l.inverseInertia * ((h.x - l.position.x) * y - (h.y - l.position.y) * g)), c.isStatic || c.isSleeping || (c.positionPrev.x -= g * c.inverseMass, c.positionPrev.y -= y * c.inverseMass, c.anglePrev -= c.inverseInertia * ((h.x - c.position.x) * y - (h.y - c.position.y) * g))
                                    }
                                }
                            }
                        }
                    }, n.solveVelocity = function (e, t) {
                        var i, o, r, s, a = t * t, l = n._restingThresh * a, c = n._frictionNormalMultiplier,
                            d = n._restingThreshTangent * a, u = Number.MAX_VALUE, p = e.length;
                        for (r = 0; r < p; r++) {
                            var h = e[r];
                            if (h.isActive && !h.isSensor) {
                                var f = h.collision, m = f.parentA, g = f.parentB, y = m.velocity, v = g.velocity,
                                    x = f.normal.x, b = f.normal.y, w = f.tangent.x, S = f.tangent.y,
                                    A = h.activeContacts, T = A.length, _ = 1 / T, k = m.inverseMass + g.inverseMass,
                                    C = h.friction * h.frictionStatic * c * a;
                                for (y.x = m.position.x - m.positionPrev.x, y.y = m.position.y - m.positionPrev.y, v.x = g.position.x - g.positionPrev.x, v.y = g.position.y - g.positionPrev.y, m.angularVelocity = m.angle - m.anglePrev, g.angularVelocity = g.angle - g.anglePrev, s = 0; s < T; s++) {
                                    var E = A[s], B = E.vertex, P = B.x - m.position.x, M = B.y - m.position.y,
                                        R = B.x - g.position.x, I = B.y - g.position.y, j = y.x - M * m.angularVelocity,
                                        H = y.y + P * m.angularVelocity, L = j - (v.x - I * g.angularVelocity),
                                        N = H - (v.y + R * g.angularVelocity), F = x * L + b * N, O = w * L + S * N,
                                        V = h.separation + F, D = Math.min(V, 1), U = (D = V < 0 ? 0 : D) * C;
                                    O > U || -O > U ? (o = O > 0 ? O : -O, (i = h.friction * (O > 0 ? 1 : -1) * a) < -o ? i = -o : i > o && (i = o)) : (i = O, o = u);
                                    var X = P * b - M * x, z = R * b - I * x,
                                        W = _ / (k + m.inverseInertia * X * X + g.inverseInertia * z * z),
                                        G = (1 + h.restitution) * F * W;
                                    if (i *= W, F * F > l && F < 0) E.normalImpulse = 0; else {
                                        var q = E.normalImpulse;
                                        E.normalImpulse += G, E.normalImpulse = Math.min(E.normalImpulse, 0), G = E.normalImpulse - q
                                    }
                                    if (O * O > d) E.tangentImpulse = 0; else {
                                        var Z = E.tangentImpulse;
                                        E.tangentImpulse += i, E.tangentImpulse < -o && (E.tangentImpulse = -o), E.tangentImpulse > o && (E.tangentImpulse = o), i = E.tangentImpulse - Z
                                    }
                                    var Y = x * G + w * i, J = b * G + S * i;
                                    m.isStatic || m.isSleeping || (m.positionPrev.x += Y * m.inverseMass, m.positionPrev.y += J * m.inverseMass, m.anglePrev += (P * J - M * Y) * m.inverseInertia), g.isStatic || g.isSleeping || (g.positionPrev.x -= Y * g.inverseMass, g.positionPrev.y -= J * g.inverseMass, g.anglePrev -= (R * J - I * Y) * g.inverseInertia)
                                }
                            }
                        }
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(9), r = i(0);
                    n.create = function (e) {
                        return r.extend({
                            table: {},
                            list: [],
                            collisionStart: [],
                            collisionActive: [],
                            collisionEnd: []
                        }, e)
                    }, n.update = function (e, t, i) {
                        var n, r, s, a, l = e.list, c = l.length, d = e.table, u = t.length, p = e.collisionStart,
                            h = e.collisionEnd, f = e.collisionActive;
                        for (p.length = 0, h.length = 0, f.length = 0, a = 0; a < c; a++) l[a].confirmedActive = !1;
                        for (a = 0; a < u; a++) (s = (n = t[a]).pair) ? (s.isActive ? f.push(s) : p.push(s), o.update(s, n, i), s.confirmedActive = !0) : (d[(s = o.create(n, i)).id] = s, p.push(s), l.push(s));
                        var m = [];
                        for (c = l.length, a = 0; a < c; a++) (s = l[a]).confirmedActive || (o.setActive(s, !1, i), h.push(s), s.collision.bodyA.isSleeping || s.collision.bodyB.isSleeping || m.push(a));
                        for (a = 0; a < m.length; a++) s = l[r = m[a] - a], l.splice(r, 1), delete d[s.id]
                    }, n.clear = function (e) {
                        return e.table = {}, e.list.length = 0, e.collisionStart.length = 0, e.collisionActive.length = 0, e.collisionEnd.length = 0, e
                    }
                }, function (e, t, i) {
                    var n = e.exports = i(22);
                    n.Axes = i(11), n.Bodies = i(12), n.Body = i(6), n.Bounds = i(1), n.Collision = i(8), n.Common = i(0), n.Composite = i(5), n.Composites = i(23), n.Constraint = i(10), n.Contact = i(17), n.Detector = i(14), n.Engine = i(18), n.Events = i(4), n.Grid = i(24), n.Mouse = i(13), n.MouseConstraint = i(25), n.Pair = i(9), n.Pairs = i(20), n.Plugin = i(15), n.Query = i(26), n.Render = i(16), n.Resolver = i(19), n.Runner = i(27), n.SAT = i(28), n.Sleeping = i(7), n.Svg = i(29), n.Vector = i(2), n.Vertices = i(3), n.World = i(30), n.Engine.run = n.Runner.run, n.Common.deprecated(n.Engine, "run", "Engine.run ➤ use Matter.Runner.run(engine) instead")
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(15), r = i(0);
                    n.name = "matter-js", n.version = "0.18.0", n.uses = [], n.used = [], n.use = function () {
                        o.use(n, Array.prototype.slice.call(arguments))
                    }, n.before = function (e, t) {
                        return e = e.replace(/^Matter./, ""), r.chainPathBefore(n, e, t)
                    }, n.after = function (e, t) {
                        return e = e.replace(/^Matter./, ""), r.chainPathAfter(n, e, t)
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(5), r = i(10), s = i(0), a = i(6), l = i(12), c = s.deprecated;
                    n.stack = function (e, t, i, n, r, s, l) {
                        for (var c, d = o.create({label: "Stack"}), u = e, p = t, h = 0, f = 0; f < n; f++) {
                            for (var m = 0, g = 0; g < i; g++) {
                                var y = l(u, p, g, f, c, h);
                                if (y) {
                                    var v = y.bounds.max.y - y.bounds.min.y, x = y.bounds.max.x - y.bounds.min.x;
                                    v > m && (m = v), a.translate(y, {
                                        x: .5 * x,
                                        y: .5 * v
                                    }), u = y.bounds.max.x + r, o.addBody(d, y), c = y, h += 1
                                } else u += r
                            }
                            p += m + s, u = e
                        }
                        return d
                    }, n.chain = function (e, t, i, n, a, l) {
                        for (var c = e.bodies, d = 1; d < c.length; d++) {
                            var u = c[d - 1], p = c[d], h = u.bounds.max.y - u.bounds.min.y,
                                f = u.bounds.max.x - u.bounds.min.x, m = p.bounds.max.y - p.bounds.min.y, g = {
                                    bodyA: u,
                                    pointA: {x: f * t, y: h * i},
                                    bodyB: p,
                                    pointB: {x: (p.bounds.max.x - p.bounds.min.x) * n, y: m * a}
                                }, y = s.extend(g, l);
                            o.addConstraint(e, r.create(y))
                        }
                        return e.label += " Chain", e
                    }, n.mesh = function (e, t, i, n, a) {
                        var l, c, d, u, p, h = e.bodies;
                        for (l = 0; l < i; l++) {
                            for (c = 1; c < t; c++) d = h[c - 1 + l * t], u = h[c + l * t], o.addConstraint(e, r.create(s.extend({
                                bodyA: d,
                                bodyB: u
                            }, a)));
                            if (l > 0) for (c = 0; c < t; c++) d = h[c + (l - 1) * t], u = h[c + l * t], o.addConstraint(e, r.create(s.extend({
                                bodyA: d,
                                bodyB: u
                            }, a))), n && c > 0 && (p = h[c - 1 + (l - 1) * t], o.addConstraint(e, r.create(s.extend({
                                bodyA: p,
                                bodyB: u
                            }, a)))), n && c < t - 1 && (p = h[c + 1 + (l - 1) * t], o.addConstraint(e, r.create(s.extend({
                                bodyA: p,
                                bodyB: u
                            }, a))))
                        }
                        return e.label += " Mesh", e
                    }, n.pyramid = function (e, t, i, o, r, s, l) {
                        return n.stack(e, t, i, o, r, s, (function (t, n, s, c, d, u) {
                            var p = Math.min(o, Math.ceil(i / 2)), h = d ? d.bounds.max.x - d.bounds.min.x : 0;
                            if (!(c > p || s < (c = p - c) || s > i - 1 - c)) return 1 === u && a.translate(d, {
                                x: (s + (i % 2 == 1 ? 1 : -1)) * h,
                                y: 0
                            }), l(e + (d ? s * h : 0) + s * r, n, s, c, d, u)
                        }))
                    }, n.newtonsCradle = function (e, t, i, n, s) {
                        for (var a = o.create({label: "Newtons Cradle"}), c = 0; c < i; c++) {
                            var d = l.circle(e + c * (1.9 * n), t + s, n, {
                                inertia: 1 / 0,
                                restitution: 1,
                                friction: 0,
                                frictionAir: 1e-4,
                                slop: 1
                            }), u = r.create({pointA: {x: e + c * (1.9 * n), y: t}, bodyB: d});
                            o.addBody(a, d), o.addConstraint(a, u)
                        }
                        return a
                    }, c(n, "newtonsCradle", "Composites.newtonsCradle ➤ moved to newtonsCradle example"), n.car = function (e, t, i, n, s) {
                        var c = a.nextGroup(!0), d = .5 * -i + 20, u = .5 * i - 20, p = o.create({label: "Car"}),
                            h = l.rectangle(e, t, i, n, {
                                collisionFilter: {group: c},
                                chamfer: {radius: .5 * n},
                                density: 2e-4
                            }), f = l.circle(e + d, t + 0, s, {collisionFilter: {group: c}, friction: .8}),
                            m = l.circle(e + u, t + 0, s, {collisionFilter: {group: c}, friction: .8}),
                            g = r.create({bodyB: h, pointB: {x: d, y: 0}, bodyA: f, stiffness: 1, length: 0}),
                            y = r.create({bodyB: h, pointB: {x: u, y: 0}, bodyA: m, stiffness: 1, length: 0});
                        return o.addBody(p, h), o.addBody(p, f), o.addBody(p, m), o.addConstraint(p, g), o.addConstraint(p, y), p
                    }, c(n, "car", "Composites.car ➤ moved to car example"), n.softBody = function (e, t, i, o, r, a, c, d, u, p) {
                        u = s.extend({inertia: 1 / 0}, u), p = s.extend({
                            stiffness: .2,
                            render: {type: "line", anchors: !1}
                        }, p);
                        var h = n.stack(e, t, i, o, r, a, (function (e, t) {
                            return l.circle(e, t, d, u)
                        }));
                        return n.mesh(h, i, o, c, p), h.label = "Soft Body", h
                    }, c(n, "softBody", "Composites.softBody ➤ moved to softBody and cloth examples")
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(9), r = i(0), s = r.deprecated;
                    n.create = function (e) {
                        return r.extend({buckets: {}, pairs: {}, pairsList: [], bucketWidth: 48, bucketHeight: 48}, e)
                    }, n.update = function (e, t, i, o) {
                        var r, s, a, l, c, d = i.world, u = e.buckets, p = !1;
                        for (r = 0; r < t.length; r++) {
                            var h = t[r];
                            if ((!h.isSleeping || o) && (!d.bounds || !(h.bounds.max.x < d.bounds.min.x || h.bounds.min.x > d.bounds.max.x || h.bounds.max.y < d.bounds.min.y || h.bounds.min.y > d.bounds.max.y))) {
                                var f = n._getRegion(e, h);
                                if (!h.region || f.id !== h.region.id || o) {
                                    h.region && !o || (h.region = f);
                                    var m = n._regionUnion(f, h.region);
                                    for (s = m.startCol; s <= m.endCol; s++) for (a = m.startRow; a <= m.endRow; a++) {
                                        l = u[c = n._getBucketId(s, a)];
                                        var g = s >= f.startCol && s <= f.endCol && a >= f.startRow && a <= f.endRow,
                                            y = s >= h.region.startCol && s <= h.region.endCol && a >= h.region.startRow && a <= h.region.endRow;
                                        !g && y && y && l && n._bucketRemoveBody(e, l, h), (h.region === f || g && !y || o) && (l || (l = n._createBucket(u, c)), n._bucketAddBody(e, l, h))
                                    }
                                    h.region = f, p = !0
                                }
                            }
                        }
                        p && (e.pairsList = n._createActivePairsList(e))
                    }, s(n, "update", "Grid.update ➤ replaced by Matter.Detector"), n.clear = function (e) {
                        e.buckets = {}, e.pairs = {}, e.pairsList = []
                    }, s(n, "clear", "Grid.clear ➤ replaced by Matter.Detector"), n._regionUnion = function (e, t) {
                        var i = Math.min(e.startCol, t.startCol), o = Math.max(e.endCol, t.endCol),
                            r = Math.min(e.startRow, t.startRow), s = Math.max(e.endRow, t.endRow);
                        return n._createRegion(i, o, r, s)
                    }, n._getRegion = function (e, t) {
                        var i = t.bounds, o = Math.floor(i.min.x / e.bucketWidth),
                            r = Math.floor(i.max.x / e.bucketWidth), s = Math.floor(i.min.y / e.bucketHeight),
                            a = Math.floor(i.max.y / e.bucketHeight);
                        return n._createRegion(o, r, s, a)
                    }, n._createRegion = function (e, t, i, n) {
                        return {id: e + "," + t + "," + i + "," + n, startCol: e, endCol: t, startRow: i, endRow: n}
                    }, n._getBucketId = function (e, t) {
                        return "C" + e + "R" + t
                    }, n._createBucket = function (e, t) {
                        return e[t] = []
                    }, n._bucketAddBody = function (e, t, i) {
                        var n, r = e.pairs, s = o.id, a = t.length;
                        for (n = 0; n < a; n++) {
                            var l = t[n];
                            if (!(i.id === l.id || i.isStatic && l.isStatic)) {
                                var c = s(i, l), d = r[c];
                                d ? d[2] += 1 : r[c] = [i, l, 1]
                            }
                        }
                        t.push(i)
                    }, n._bucketRemoveBody = function (e, t, i) {
                        var n, s = e.pairs, a = o.id;
                        t.splice(r.indexOf(t, i), 1);
                        var l = t.length;
                        for (n = 0; n < l; n++) {
                            var c = s[a(i, t[n])];
                            c && (c[2] -= 1)
                        }
                    }, n._createActivePairsList = function (e) {
                        var t, i, n = e.pairs, o = r.keys(n), s = o.length, a = [];
                        for (i = 0; i < s; i++) (t = n[o[i]])[2] > 0 ? a.push(t) : delete n[o[i]];
                        return a
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(3), r = i(7), s = i(13), a = i(4), l = i(14), c = i(10), d = i(5), u = i(0), p = i(1);
                    n.create = function (e, t) {
                        var i = (e ? e.mouse : null) || (t ? t.mouse : null);
                        i || (e && e.render && e.render.canvas ? i = s.create(e.render.canvas) : t && t.element ? i = s.create(t.element) : (i = s.create(), u.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));
                        var o = {
                            type: "mouseConstraint",
                            mouse: i,
                            element: null,
                            body: null,
                            constraint: c.create({
                                label: "Mouse Constraint",
                                pointA: i.position,
                                pointB: {x: 0, y: 0},
                                length: .01,
                                stiffness: .1,
                                angularStiffness: 1,
                                render: {strokeStyle: "#90EE90", lineWidth: 3}
                            }),
                            collisionFilter: {category: 1, mask: 4294967295, group: 0}
                        }, r = u.extend(o, t);
                        return a.on(e, "beforeUpdate", (function () {
                            var t = d.allBodies(e.world);
                            n.update(r, t), n._triggerEvents(r)
                        })), r
                    }, n.update = function (e, t) {
                        var i = e.mouse, n = e.constraint, s = e.body;
                        if (0 === i.button) {
                            if (n.bodyB) r.set(n.bodyB, !1), n.pointA = i.position; else for (var c = 0; c < t.length; c++) if (s = t[c], p.contains(s.bounds, i.position) && l.canCollide(s.collisionFilter, e.collisionFilter)) for (var d = s.parts.length > 1 ? 1 : 0; d < s.parts.length; d++) {
                                var u = s.parts[d];
                                if (o.contains(u.vertices, i.position)) {
                                    n.pointA = i.position, n.bodyB = e.body = s, n.pointB = {
                                        x: i.position.x - s.position.x,
                                        y: i.position.y - s.position.y
                                    }, n.angleB = s.angle, r.set(s, !1), a.trigger(e, "startdrag", {mouse: i, body: s});
                                    break
                                }
                            }
                        } else n.bodyB = e.body = null, n.pointB = null, s && a.trigger(e, "enddrag", {
                            mouse: i,
                            body: s
                        })
                    }, n._triggerEvents = function (e) {
                        var t = e.mouse, i = t.sourceEvents;
                        i.mousemove && a.trigger(e, "mousemove", {mouse: t}), i.mousedown && a.trigger(e, "mousedown", {mouse: t}), i.mouseup && a.trigger(e, "mouseup", {mouse: t}), s.clearSourceEvents(t)
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(2), r = i(8), s = i(1), a = i(12), l = i(3);
                    n.collides = function (e, t) {
                        for (var i = [], n = t.length, o = e.bounds, a = r.collides, l = s.overlaps, c = 0; c < n; c++) {
                            var d = t[c], u = d.parts.length, p = 1 === u ? 0 : 1;
                            if (l(d.bounds, o)) for (var h = p; h < u; h++) {
                                var f = d.parts[h];
                                if (l(f.bounds, o)) {
                                    var m = a(f, e);
                                    if (m) {
                                        i.push(m);
                                        break
                                    }
                                }
                            }
                        }
                        return i
                    }, n.ray = function (e, t, i, r) {
                        r = r || 1e-100;
                        for (var s = o.angle(t, i), l = o.magnitude(o.sub(t, i)), c = .5 * (i.x + t.x), d = .5 * (i.y + t.y), u = a.rectangle(c, d, l, r, {angle: s}), p = n.collides(u, e), h = 0; h < p.length; h += 1) {
                            var f = p[h];
                            f.body = f.bodyB = f.bodyA
                        }
                        return p
                    }, n.region = function (e, t, i) {
                        for (var n = [], o = 0; o < e.length; o++) {
                            var r = e[o], a = s.overlaps(r.bounds, t);
                            (a && !i || !a && i) && n.push(r)
                        }
                        return n
                    }, n.point = function (e, t) {
                        for (var i = [], n = 0; n < e.length; n++) {
                            var o = e[n];
                            if (s.contains(o.bounds, t)) for (var r = 1 === o.parts.length ? 0 : 1; r < o.parts.length; r++) {
                                var a = o.parts[r];
                                if (s.contains(a.bounds, t) && l.contains(a.vertices, t)) {
                                    i.push(o);
                                    break
                                }
                            }
                        }
                        return i
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o, r, s, a = i(4), l = i(18), c = i(0);
                    "undefined" != typeof window && (o = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame, r = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), o || (o = function (e) {
                        s = setTimeout((function () {
                            e(c.now())
                        }), 1e3 / 60)
                    }, r = function () {
                        clearTimeout(s)
                    }), n.create = function (e) {
                        var t = c.extend({
                            fps: 60,
                            correction: 1,
                            deltaSampleSize: 60,
                            counterTimestamp: 0,
                            frameCounter: 0,
                            deltaHistory: [],
                            timePrev: null,
                            timeScalePrev: 1,
                            frameRequestId: null,
                            isFixed: !1,
                            enabled: !0
                        }, e);
                        return t.delta = t.delta || 1e3 / t.fps, t.deltaMin = t.deltaMin || 1e3 / t.fps, t.deltaMax = t.deltaMax || 1e3 / (.5 * t.fps), t.fps = 1e3 / t.delta, t
                    }, n.run = function (e, t) {
                        return void 0 !== e.positionIterations && (t = e, e = n.create()), function i(r) {
                            e.frameRequestId = o(i), r && e.enabled && n.tick(e, t, r)
                        }(), e
                    }, n.tick = function (e, t, i) {
                        var n, o = t.timing, r = 1, s = {timestamp: o.timestamp};
                        a.trigger(e, "beforeTick", s), e.isFixed ? n = e.delta : (n = i - e.timePrev || e.delta, e.timePrev = i, e.deltaHistory.push(n), e.deltaHistory = e.deltaHistory.slice(-e.deltaSampleSize), r = (n = (n = (n = Math.min.apply(null, e.deltaHistory)) < e.deltaMin ? e.deltaMin : n) > e.deltaMax ? e.deltaMax : n) / e.delta, e.delta = n), 0 !== e.timeScalePrev && (r *= o.timeScale / e.timeScalePrev), 0 === o.timeScale && (r = 0), e.timeScalePrev = o.timeScale, e.correction = r, e.frameCounter += 1, i - e.counterTimestamp >= 1e3 && (e.fps = e.frameCounter * ((i - e.counterTimestamp) / 1e3), e.counterTimestamp = i, e.frameCounter = 0), a.trigger(e, "tick", s), a.trigger(e, "beforeUpdate", s), l.update(t, n, r), a.trigger(e, "afterUpdate", s), a.trigger(e, "afterTick", s)
                    }, n.stop = function (e) {
                        r(e.frameRequestId)
                    }, n.start = function (e, t) {
                        n.run(e, t)
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(8), r = i(0).deprecated;
                    n.collides = function (e, t) {
                        return o.collides(e, t)
                    }, r(n, "collides", "SAT.collides ➤ replaced by Collision.collides")
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n, i(1);
                    var o = i(0);
                    n.pathToVertices = function (e, t) {
                        "undefined" == typeof window || "SVGPathSeg" in window || o.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
                        var i, r, s, a, l, c, d, u, p, h, f, m = [], g = 0, y = 0, v = 0;
                        t = t || 15;
                        var x = function (e, t, i) {
                            var n = i % 2 == 1 && i > 1;
                            if (!p || e != p.x || t != p.y) {
                                p && n ? (h = p.x, f = p.y) : (h = 0, f = 0);
                                var o = {x: h + e, y: f + t};
                                !n && p || (p = o), m.push(o), y = h + e, v = f + t
                            }
                        }, b = function (e) {
                            var t = e.pathSegTypeAsLetter.toUpperCase();
                            if ("Z" !== t) {
                                switch (t) {
                                    case"M":
                                    case"L":
                                    case"T":
                                    case"C":
                                    case"S":
                                    case"Q":
                                        y = e.x, v = e.y;
                                        break;
                                    case"H":
                                        y = e.x;
                                        break;
                                    case"V":
                                        v = e.y
                                }
                                x(y, v, e.pathSegType)
                            }
                        };
                        for (n._svgPathToAbsolute(e), s = e.getTotalLength(), c = [], i = 0; i < e.pathSegList.numberOfItems; i += 1) c.push(e.pathSegList.getItem(i));
                        for (d = c.concat(); g < s;) {
                            if ((l = c[e.getPathSegAtLength(g)]) != u) {
                                for (; d.length && d[0] != l;) b(d.shift());
                                u = l
                            }
                            switch (l.pathSegTypeAsLetter.toUpperCase()) {
                                case"C":
                                case"T":
                                case"S":
                                case"Q":
                                case"A":
                                    a = e.getPointAtLength(g), x(a.x, a.y, 0)
                            }
                            g += t
                        }
                        for (i = 0, r = d.length; i < r; ++i) b(d[i]);
                        return m
                    }, n._svgPathToAbsolute = function (e) {
                        for (var t, i, n, o, r, s, a = e.pathSegList, l = 0, c = 0, d = a.numberOfItems, u = 0; u < d; ++u) {
                            var p = a.getItem(u), h = p.pathSegTypeAsLetter;
                            if (/[MLHVCSQTA]/.test(h)) "x" in p && (l = p.x), "y" in p && (c = p.y); else switch ("x1" in p && (n = l + p.x1), "x2" in p && (r = l + p.x2), "y1" in p && (o = c + p.y1), "y2" in p && (s = c + p.y2), "x" in p && (l += p.x), "y" in p && (c += p.y), h) {
                                case"m":
                                    a.replaceItem(e.createSVGPathSegMovetoAbs(l, c), u);
                                    break;
                                case"l":
                                    a.replaceItem(e.createSVGPathSegLinetoAbs(l, c), u);
                                    break;
                                case"h":
                                    a.replaceItem(e.createSVGPathSegLinetoHorizontalAbs(l), u);
                                    break;
                                case"v":
                                    a.replaceItem(e.createSVGPathSegLinetoVerticalAbs(c), u);
                                    break;
                                case"c":
                                    a.replaceItem(e.createSVGPathSegCurvetoCubicAbs(l, c, n, o, r, s), u);
                                    break;
                                case"s":
                                    a.replaceItem(e.createSVGPathSegCurvetoCubicSmoothAbs(l, c, r, s), u);
                                    break;
                                case"q":
                                    a.replaceItem(e.createSVGPathSegCurvetoQuadraticAbs(l, c, n, o), u);
                                    break;
                                case"t":
                                    a.replaceItem(e.createSVGPathSegCurvetoQuadraticSmoothAbs(l, c), u);
                                    break;
                                case"a":
                                    a.replaceItem(e.createSVGPathSegArcAbs(l, c, p.r1, p.r2, p.angle, p.largeArcFlag, p.sweepFlag), u);
                                    break;
                                case"z":
                                case"Z":
                                    l = t, c = i
                            }
                            "M" != h && "m" != h || (t = l, i = c)
                        }
                    }
                }, function (e, t, i) {
                    var n = {};
                    e.exports = n;
                    var o = i(5);
                    i(0), n.create = o.create, n.add = o.add, n.remove = o.remove, n.clear = o.clear, n.addComposite = o.addComposite, n.addBody = o.addBody, n.addConstraint = o.addConstraint
                }])
            }, e.exports = n()
        }, 6472: (e, t, i) => {
            "use strict";
            i.d(t, {
                V1: () => r,
                fv: () => h,
                hp: () => P,
                MJ: () => y,
                Th: () => f,
                BV: () => u,
                ex: () => g,
                jy: () => S,
                Lx: () => C,
                DV: () => p,
                HT: () => k
            });
            var n = i(5975), o = i(7160);

            class r {
                _position;
                _direction;
                _up;
                fovY;
                viewMatrix = n.Ue();
                projectionMatrix = n.Ue();
                viewProjection = n.Ue();
                tempDir = o.Ue();
                orthographic = !1;
                width;
                height;
                near;
                far;

                constructor(e) {
                    this._position = e.position, this._direction = e.direction, this._up = e.up || o.al(0, 1, 0), this.fovY = e.fovY || Math.PI / 4, this.orthographic = e.orthographic || !1, this.width = e.width, this.height = e.height, this.near = e.near || .1, this.far = e.far || 1e3, this.getProjectionMatrix(), this.updateViewProjection()
                }

                updateViewMatrix() {
                    o.IH(this.tempDir, this.position, this.direction), n.zB(this.viewMatrix, this.position, this.tempDir, this.up)
                }

                updateViewProjection() {
                    this.updateViewMatrix(), n.dC(this.viewProjection, this.projectionMatrix, this.viewMatrix)
                }

                get position() {
                    return this._position
                }

                set position(e) {
                    this._position = e, this.updateViewProjection()
                }

                get direction() {
                    return this._direction
                }

                set direction(e) {
                    this._direction = e, this.updateViewProjection()
                }

                get up() {
                    return this._up
                }

                set up(e) {
                    this._up = e, this.updateViewProjection()
                }

                getProjectionMatrix() {
                    if (this.orthographic) {
                        const e = this.width / 2, t = this.height / 2;
                        return n.M5(this.projectionMatrix, -e, e, -t, t, this.near, this.far)
                    }
                    return n.G3(this.projectionMatrix, this.fovY, this.width / this.height, this.near, this.far)
                }
            }

            var s, a = i(9685);

            function l() {
                var e = new a.WT(4);
                return a.WT != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e
            }

            s = new a.WT(4), a.WT != Float32Array && (s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 0);
            o.Ue(), o.al(1, 0, 0), o.al(0, 1, 0), l(), l(), function () {
                var e = new a.WT(9);
                a.WT != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1
            }();
            const c = e => {
                const t = e.parentTransform;
                n.dC(e.tempTransform, t, e.modelMatrix), e.children?.forEach((e => c(e)))
            }, d = e => {
                e.update(), e.children?.forEach((e => d(e)))
            };

            class u {
                modelMatrix = n.Ue();
                object;
                children = [];
                tempTransform = n.Ue();
                parentTransform = n.Ue();
                _position = o.Ue();
                _scaling = o.Ue();
                _rotation = l();

                constructor(e) {
                    this.object = e
                }

                addChild(e) {
                    this.children.push(e), e.parentTransform = this.tempTransform, c(e)
                }

                clear() {
                    this.children.forEach((e => e.destroy())), this.children = []
                }

                scale(e) {
                    n.bA(this.modelMatrix, this.modelMatrix, e), this.updateTransform()
                }

                translate(e) {
                    n.Iu(this.modelMatrix, this.modelMatrix, e), this.updateTransform()
                }

                rotate(e, t) {
                    n.U1(this.modelMatrix, this.modelMatrix, e, t), this.updateTransform()
                }

                updateTransform() {
                    c(this)
                }

                get position() {
                    return n.i0(this._position, this.modelMatrix)
                }

                get scaling() {
                    return n.Q$(this._scaling, this.modelMatrix)
                }

                get rotation() {
                    return n.j6(this._rotation, this.modelMatrix)
                }

                set position(e) {
                    n.Iw(this.modelMatrix, this.rotation, e, this.scaling), c(this)
                }

                set scaling(e) {
                    n.Iw(this.modelMatrix, this.rotation, this.position, e), c(this)
                }

                set rotation(e) {
                    n.Iw(this.modelMatrix, e, this.position, this.scaling), c(this)
                }

                update() {
                }

                updateRecursive() {
                    d(this)
                }

                destroy() {
                    this.children && (this.children.forEach((e => e.destroy())), this.children = []), this.object && (this.object.destroy(), this.object = void 0)
                }
            }

            class p {
                currentState;
                states;
                hookMap = {};
                conditionMap = {};

                constructor(e) {
                    this.states = e, this.currentState = this.states[0]
                }

                addHook(e, t, i) {
                    this.hookMap[e] || (this.hookMap[e] = {
                        enter: [],
                        leave: [],
                        update: []
                    }), this.hookMap[e][t].push(i)
                }

                addCondition(e, t, i) {
                    this.conditionMap[e] || (this.conditionMap[e] = []), this.conditionMap[e].push({
                        nextState: t,
                        condition: i
                    })
                }

                changeState(e) {
                    const t = this.currentState, i = e;
                    this.hookMap[t]?.leave.forEach((e => e(i))), this.currentState = e, this.hookMap[i]?.enter.forEach((e => e(t)))
                }

                update() {
                    if (this.conditionMap[this.currentState]) for (let e = 0; e < this.conditionMap[this.currentState].length; e++) {
                        const {nextState: t, condition: i} = this.conditionMap[this.currentState][e];
                        if (i()) {
                            this.changeState(t);
                            break
                        }
                    }
                    this.hookMap[this.currentState]?.update.forEach((e => e(this.currentState)))
                }
            }

            class h {
                el;
                keys;
                keyDownHandlers = [];
                keyUpHandlers = [];

                constructor(e) {
                    this.el = e, this.keys = {};
                    e.tabIndex = 0, e.style.outline = "none", e.addEventListener("keydown", (e => {
                        e.metaKey || e.ctrlKey || e.altKey || (e.preventDefault(), e.stopPropagation()), this.keys[e.key] = !0, this.keyDownHandlers.forEach((t => t(e)))
                    }), {capture: !0}), e.addEventListener("keyup", (e => {
                        e.metaKey || e.ctrlKey || e.altKey || (e.preventDefault(), e.stopPropagation()), this.keys[e.key] = !1, this.keyUpHandlers.forEach((t => t(e)))
                    }), {capture: !0})
                }

                onKeyDown(e) {
                    return this.keyDownHandlers.push(e), () => {
                        this.keyDownHandlers = this.keyDownHandlers.filter((t => t !== e))
                    }
                }

                onKeyUp(e) {
                    return this.keyUpHandlers.push(e), () => {
                        this.keyUpHandlers = this.keyUpHandlers.filter((t => t !== e))
                    }
                }
            }

            class f {
                gl;
                initSet = new Set;

                constructor(e) {
                    const t = e.getContext("webgl2", {premultipliedAlpha: !0, antialias: !1});
                    if (!t) throw new Error("webgl2 not available");
                    this.gl = t, t.viewport(0, 0, e.width, e.height), t.enable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA), t.clearColor(0, 0, 0, 0)
                }

                render(e, t) {
                    t.object && (this.initSet.has(t.object) || (t.object.init(this), this.initSet.add(t.object)), t.object.render({
                        modelMatrix: t.tempTransform,
                        viewMatrix: e.viewMatrix,
                        projectionMatrix: e.projectionMatrix,
                        viewProjection: e.viewProjection
                    })), t.children && t.children.forEach((t => this.render(e, t)))
                }
            }

            const m = (e, t, i) => {
                const n = e.createShader(t);
                if (e.shaderSource(n, i), e.compileShader(n), !e.getShaderParameter(n, e.COMPILE_STATUS)) {
                    const t = `An error occurred compiling the shaders: ${e.getShaderInfoLog(n)}`;
                    throw e.deleteShader(n), new Error(t)
                }
                return n
            };

            class g {
                gl;
                program;
                locations;
                uniformBuffers;
                setUniform;

                constructor({gl: e, vs: t, fs: i, transformFeedbackVaryings: n}) {
                    this.gl = e;
                    const o = m(e, e.VERTEX_SHADER, t), r = m(e, e.FRAGMENT_SHADER, i), s = e.createProgram();
                    if (!s) throw new Error("can not create shader program");
                    if (this.program = s, e.attachShader(s, o), e.attachShader(s, r), n && e.transformFeedbackVaryings(s, n, e.INTERLEAVED_ATTRIBS), e.linkProgram(s), e.deleteShader(o), e.deleteShader(r), !e.getProgramParameter(s, e.LINK_STATUS)) throw new Error(`Unable to initialize the shader program: ${e.getProgramInfoLog(s)}`);
                    this.locations = {}, this.uniformBuffers = {}, this.setUniform = (t, i, n) => {
                        let o = this.locations[t];
                        o || (o = e.getUniformLocation(s, t), this.locations[t] = o), {
                            BOOLEAN: () => e.uniform1i(o, Number(n)),
                            INT: () => e.uniform1i(o, Math.round(n)),
                            FLOAT: () => e.uniform1f(o, n),
                            VEC2: () => e.uniform2fv(o, n),
                            VEC3: () => e.uniform3fv(o, n),
                            VEC4: () => e.uniform4fv(o, n),
                            MAT2: () => e.uniformMatrix2fv(o, !1, n),
                            MAT3: () => e.uniformMatrix3fv(o, !1, n),
                            MAT4: () => e.uniformMatrix4fv(o, !1, n)
                        }[i]?.()
                    }
                }

                use() {
                    this.gl.useProgram(this.program)
                }

                setUniformBuffer(e, t) {
                    let i = this.uniformBuffers[e];
                    i || (i = this.gl.createBuffer(), this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, i), this.gl.uniformBlockBinding(this.program, 0, 0), this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, i), this.uniformBuffers[e] = i), this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, i), this.gl.bufferData(this.gl.UNIFORM_BUFFER, t, this.gl.DYNAMIC_DRAW)
                }

                destroy() {
                    this.gl.deleteProgram(this.program)
                }
            }

            class y {
            }

            function v() {
                var e = new a.WT(2);
                return a.WT != Float32Array && (e[0] = 0, e[1] = 0), e
            }

            function x(e, t, i) {
                return e[0] = t, e[1] = i, e
            }

            v();
            var b = i(2604), w = i(56);

            class S extends y {
                renderer = null;
                buffer = null;
                shader = null;
                vao = null;
                texture = null;
                textureImg;
                size;
                repeat;
                uvOffset;
                scale = v();
                mvp = n.Ue();
                tempVec3 = o.Ue();

                constructor(e) {
                    super(), this.repeat = e.repeat || [1, 1], this.uvOffset = [0, 0], this.size = [e.texture.naturalWidth, e.texture.naturalHeight], this.textureImg = e.texture
                }

                init(e) {
                    const t = e.gl;
                    this.renderer = e, this.shader = new g({gl: t, vs: b, fs: w});
                    const i = new Float32Array([-.5, .5, -.5, -.5, .5, .5, .5, -.5]);
                    this.vao = t.createVertexArray(), this.buffer = t.createBuffer(), t.bindVertexArray(this.vao), t.bindBuffer(t.ARRAY_BUFFER, this.buffer), t.bufferData(t.ARRAY_BUFFER, i, t.STATIC_DRAW), t.enableVertexAttribArray(0), t.vertexAttribPointer(0, 2, t.FLOAT, !0, 8, 0), t.bindBuffer(t.ARRAY_BUFFER, null), this.texture = t.createTexture(), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, this.texture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, WebGL2RenderingContext.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, WebGL2RenderingContext.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, WebGL2RenderingContext.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, WebGL2RenderingContext.NEAREST), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this.textureImg)
                }

                render(e) {
                    if (!this.shader || !this.renderer) return;
                    const t = this.renderer.gl;
                    t.bindVertexArray(this.vao), this.shader.use(), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, this.texture), n.Q$(this.tempVec3, e.modelMatrix), x(this.scale, this.tempVec3[0], this.tempVec3[1]), this.shader.setUniform("half_pixel", "VEC2", [.5 / (this.size[0] * this.scale[0]), .5 / (this.size[1] * this.scale[1])]), n.bA(this.mvp, e.modelMatrix, [this.size[0], this.size[1], 1]), n.dC(this.mvp, e.viewProjection, this.mvp), this.shader.setUniform("mvp_matrix", "MAT4", this.mvp), this.shader.setUniform("uv_offset", "VEC2", this.uvOffset), this.shader.setUniform("repeat", "VEC2", this.repeat), t.drawArrays(t.TRIANGLE_STRIP, 0, 4)
                }

                destroy() {
                    if (!this.renderer) return;
                    const e = this.renderer.gl;
                    e.deleteVertexArray(this.vao), e.deleteBuffer(this.buffer), e.deleteTexture(this.texture), this.renderer.initSet.delete(this), this.shader?.destroy()
                }
            }

            var A = i(1436), T = i(2430);
            const _ = performance.now(),
                k = {raf: NaN, time: _, lastT: _, deltaT: 0, _time: _, _lastT: _, _interval: 1e3 / 61, _deltaT: 0};

            class C extends y {
                renderer = null;
                shader = null;
                vao = null;
                texture = null;
                buffer = null;
                textureImg;
                atlas;
                spriteSize;
                animations;
                tempTransform = null;
                scale = v();
                mvp = n.Ue();
                tempVec3 = o.Ue();
                lastChange = k.time;
                currentFrame = 0;
                currentAnimation;
                changingAnimation = null;
                changingAnimationStartFrame = 0;

                constructor(e) {
                    super(), this.textureImg = e.texture, this.atlas = e.atlas, this.spriteSize = [this.atlas.meta.size.w, this.atlas.meta.size.h];
                    const t = (e, t) => {
                        let i = 0;
                        for (let n = e; n <= t; n++) i += this.atlas.frames[n].duration;
                        return i
                    };
                    this.animations = {};
                    for (const e of this.atlas.meta.frameTags) this.animations[e.name] = {
                        start: e.from,
                        length: e.to - e.from + 1,
                        duration: t(e.from, e.to)
                    };
                    this.currentAnimation = Object.keys(this.animations)[0]
                }

                init(e) {
                    this.renderer = e;
                    const t = e.gl;
                    this.shader = new g({
                        gl: t,
                        vs: A,
                        fs: T
                    }), this.shader.use(), this.vao = t.createVertexArray(), this.buffer = t.createBuffer(), t.bindVertexArray(this.vao), t.bindBuffer(t.ARRAY_BUFFER, this.buffer), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-.5, .5, -.5, -.5, .5, .5, .5, -.5]), t.STATIC_DRAW), t.enableVertexAttribArray(0), t.vertexAttribPointer(0, 2, t.FLOAT, !0, 8, 0), t.bindBuffer(t.ARRAY_BUFFER, null), this.texture = t.createTexture(), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, this.texture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, WebGL2RenderingContext.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, WebGL2RenderingContext.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, WebGL2RenderingContext.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, WebGL2RenderingContext.NEAREST), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this.textureImg)
                }

                render(e) {
                    if (!this.shader || !this.renderer) return;
                    const t = this.renderer.gl;
                    t.bindVertexArray(this.vao), this.shader.use(), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, this.texture);
                    const i = this.animations[this.currentAnimation].start;
                    let o = this.atlas.frames[i + this.currentFrame];
                    if (k.time > this.lastChange + o.duration || this.changingAnimation) {
                        if (this.changingAnimation) {
                            this.currentAnimation = this.changingAnimation, this.currentFrame = this.changingAnimationStartFrame, this.changingAnimation = null;
                            const e = this.animations[this.currentAnimation];
                            o = this.atlas.frames[e.start + this.currentFrame]
                        } else {
                            const e = this.animations[this.currentAnimation];
                            this.currentFrame = (this.currentFrame + 1) % e.length, o = this.atlas.frames[e.start + this.currentFrame]
                        }
                        const {frame: t, sourceSize: i, spriteSourceSize: r} = o;
                        this.shader.use(), this.shader.setUniform("sprite_box", "VEC4", [r.x / i.w, r.y / i.h, r.w / i.w, r.h / i.h]), this.shader.setUniform("sprite_position", "VEC4", [t.x / this.spriteSize[0], t.y / this.spriteSize[1], t.w / this.spriteSize[0], t.h / this.spriteSize[1]]), n.Q$(this.tempVec3, e.modelMatrix), x(this.scale, this.tempVec3[0], this.tempVec3[1]);
                        const s = [.5 / (i.w * this.scale[0]), .5 / (i.h * this.scale[1])];
                        this.shader.setUniform("half_pixel", "VEC2", s), this.lastChange = k.time
                    }
                    n.bA(this.mvp, e.modelMatrix, [o.sourceSize.w, o.sourceSize.h, 1]), n.dC(this.mvp, e.viewProjection, this.mvp), this.shader.setUniform("mvp_matrix", "MAT4", this.mvp), t.drawArrays(t.TRIANGLE_STRIP, 0, 4)
                }

                changeAnimation(e, t = 0) {
                    this.changingAnimation = e, this.changingAnimationStartFrame = t
                }

                destroy() {
                    if (!this.renderer) return;
                    const e = this.renderer.gl;
                    e.deleteVertexArray(this.vao), e.deleteBuffer(this.buffer), e.deleteTexture(this.texture), this.shader?.destroy(), this.renderer.initSet.delete(this)
                }
            }

            i(755), i(8261);
            var E = i(675), B = i(2294);

            class P extends y {
                options;
                renderer = null;
                particleTexture = null;
                buffer = null;
                vao = null;
                shader = null;
                singleParticleLength = 8;
                particleData;
                updatePass = null;
                displayPass = null;
                bornParticles = 0;
                increaseFloat = 0;
                increaseTemp = 0;

                constructor(e) {
                    super(), this.options = e, this.particleData = (() => {
                        const t = this.singleParticleLength, i = new Float32Array(t * e.numParticles);
                        for (let n = 0; n < e.numParticles; n++) {
                            i[n * t] = 1e10, i[n * t + 1] = 1e10, i[n * t + 2] = 1e10, i[n * t + 3] = 0, i[n * t + 4] = 0, i[n * t + 5] = 0;
                            const o = e.ageRange[0] + Math.random() * (e.ageRange[1] - e.ageRange[0]);
                            i[n * t + 6] = o, i[n * t + 7] = o + 1
                        }
                        return i
                    })()
                }

                init(e) {
                    const t = e.gl;
                    this.renderer = e, this.particleTexture = (() => {
                        const e = t.createTexture();
                        return t.bindTexture(t.TEXTURE_2D, e), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA8, this.options.texture.naturalWidth, this.options.texture.naturalHeight, 0, t.RGBA, t.UNSIGNED_BYTE, this.options.texture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), e
                    })();
                    const i = t.createBuffer();
                    this.buffer = i, t.bindBuffer(t.ARRAY_BUFFER, i), t.bufferData(t.ARRAY_BUFFER, this.particleData, t.DYNAMIC_DRAW), this.updatePass = () => {
                        const e = this.singleParticleLength, n = this.particleData;
                        for (let t = 0; t < this.bornParticles; t++) {
                            const i = this.particleData[t * e + 6];
                            if (this.particleData[t * e + 7] > i) {
                                const i = o.Ue(), r = o.MX([0, 0, 0]);
                                o.lu(i, this.options.originB, this.options.originA), o.dC(i, i, r), o.IH(i, this.options.originA, i), n[t * e] = i[0], n[t * e + 1] = i[1], n[t * e + 2] = i[2];
                                const s = (2 * Math.random() - 1) * this.options.angleRadius;
                                o.t8(i, Math.cos(s), Math.sin(s), 0), o.jI(i, i, [0, 0, 0], this.options.angle2d);
                                const a = this.options.speedRange[0] + Math.random() * (this.options.speedRange[1] - this.options.speedRange[0]);
                                o.bA(i, i, a), n[t * e + 3] = i[0], n[t * e + 4] = i[1], n[t * e + 5] = i[2], n[t * e + 7] = 0
                            } else {
                                const i = k.deltaT / 1e3;
                                n[t * e] = n[t * e] + n[t * e + 3] * i, n[t * e + 1] = n[t * e + 1] + n[t * e + 4] * i, n[t * e + 2] = n[t * e + 2] + n[t * e + 5] * i, n[t * e + 3] = n[t * e + 3] + this.options.gravity[0] * i, n[t * e + 4] = n[t * e + 4] + this.options.gravity[1] * i, n[t * e + 5] = n[t * e + 5] + this.options.gravity[2] * i, n[t * e + 7] = n[t * e + 7] + i
                            }
                        }
                        t.bindBuffer(t.ARRAY_BUFFER, i), t.bufferData(t.ARRAY_BUFFER, this.particleData, t.DYNAMIC_DRAW)
                    }, this.displayPass = (() => {
                        const e = t.createVertexArray();
                        this.vao = e, t.bindVertexArray(e), t.bindBuffer(t.ARRAY_BUFFER, i), t.enableVertexAttribArray(0), t.vertexAttribPointer(0, 3, t.FLOAT, !1, 32, 0), t.vertexAttribDivisor(0, 1), t.enableVertexAttribArray(1), t.vertexAttribPointer(1, 3, t.FLOAT, !1, 32, 12), t.vertexAttribDivisor(1, 1), t.enableVertexAttribArray(2), t.vertexAttribPointer(2, 1, t.FLOAT, !1, 32, 24), t.vertexAttribDivisor(2, 1), t.enableVertexAttribArray(3), t.vertexAttribPointer(3, 1, t.FLOAT, !1, 32, 28), t.vertexAttribDivisor(3, 1);
                        const n = t.createBuffer();
                        t.bindBuffer(t.ARRAY_BUFFER, n), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), t.STATIC_DRAW), t.enableVertexAttribArray(4), t.vertexAttribPointer(4, 2, t.FLOAT, !0, 8, 0), t.bindBuffer(t.ARRAY_BUFFER, null), t.bindVertexArray(null);
                        const o = new g({gl: t, vs: E, fs: B});
                        return this.shader = o, ({viewMatrix: i, projectionMatrix: n}) => {
                            t.bindVertexArray(e), o.use(), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, this.particleTexture), o.setUniform("u_Sprite", "INT", 0), o.setUniform("u_Size", "VEC2", [this.options.scale * this.options.texture.naturalWidth, this.options.scale * this.options.texture.naturalHeight]), o.setUniform("u_ViewMatrix", "MAT4", i), o.setUniform("u_ProjectionMatrix", "MAT4", n), t.drawArraysInstanced(t.TRIANGLE_STRIP, 0, 4, this.bornParticles)
                        }
                    })()
                }

                render(e) {
                    if (k.time < 3e3) return;
                    this.increaseFloat += this.options.particleBirthRate / 60;
                    const t = Math.floor(this.increaseFloat) - this.increaseTemp;
                    t > 0 && (this.increaseFloat -= t, this.increaseTemp = 0), this.bornParticles = Math.min(this.options.numParticles, this.bornParticles + t), this.bornParticles > 0 && (this.updatePass?.(), this.displayPass?.(e))
                }

                destroy() {
                    if (!this.renderer) return;
                    const e = this.renderer.gl;
                    e.deleteVertexArray(this.vao), e.deleteBuffer(this.buffer), e.deleteTexture(this.particleTexture), this.shader?.destroy(), this.renderer.initSet.delete(this)
                }
            }
        }, 3607: (e, t, i) => {
            "use strict";
            i.a(e, (async (e, t) => {
                try {
                    var n = i(7160), o = i(9842), r = i(6472), s = i(6010), a = i(9783), l = i(4634), c = i(5377),
                        d = i(9905), u = i(5059), p = i(1153), h = i(1462), f = i(3654), m = i(2644), g = i(7199),
                        y = i(4351), v = i(8593);
                    const e = ["MainMenu", "InGame", "Paused", "EndPage"], x = e => {
                        (0, v.SZ)({type: "tech", c: "banner_game", d: "gaming", e: "jump"}, {
                            msg: JSON.stringify({
                                id: 0,
                                game: "叶间穿行",
                                score: s.XH.score,
                                position: e.toString()
                            })
                        })
                    }, b = (e, t) => {
                        (0, v.SZ)({
                            type: "tech",
                            c: "banner_game",
                            d: "gaming",
                            e: "climb"
                        }, {
                            msg: JSON.stringify({
                                id: 0,
                                game: "叶间穿行",
                                score: s.XH.score,
                                position: e.toString(),
                                success: t
                            })
                        })
                    };

                    class w {
                        banner;
                        gameContainer;
                        root;
                        canvas;
                        domElements;
                        onExit;
                        listeners = {};
                        renderer;
                        camera;
                        scene;
                        keyboardInput;
                        lockInput = !1;
                        player = null;
                        shamrocks = null;
                        winds = null;
                        birds = null;
                        endEffectNode = null;
                        countDown = null;
                        gameState = new r.DV(e);
                        lag = !1;
                        lastT = 0;
                        lastActive = r.HT.time;

                        constructor(e) {
                            this.banner = e, this.domElements = (0, a.n)(e), this.gameContainer = this.domElements.bannerGame, this.root = this.domElements.root, this.canvas = this.domElements.canvas;
                            const t = this.canvas;
                            this.renderer = new r.Th(t), this.camera = new r.V1({
                                position: n.al(0, 0, 10),
                                direction: n.al(0, 0, -1),
                                width: t.width,
                                height: t.height,
                                orthographic: !0
                            }), this.scene = new r.BV, o.Engine.clear(s.YB.engine), s.YB.engine = o.Engine.create(), s.YB.engine.gravity.y = -1.25, this.keyboardInput = new r.fv(this.gameContainer)
                        }

                        async init() {
                            await s.am.load();
                            const e = new p.J, t = new u.O, i = new f.D;
                            this.player = e, this.shamrocks = t, this.winds = i, this.birds = new m.g, this.countDown = new y.W, this.scene.addChild(new d.A), this.scene.addChild(this.birds), this.scene.addChild(t), this.scene.addChild(this.countDown), this.scene.addChild(e), this.scene.addChild(new h.o), this.scene.addChild(i), this.player = e, this.domElements.restartEl.onclick = () => {
                                this.lastActive = performance.now(), (0, v.SZ)({
                                    type: "click",
                                    c: "banner_game",
                                    d: "end_page",
                                    e: "restart"
                                }, {msg: JSON.stringify({id: 0, game: "叶间穿行"})}), this.start()
                            }, this.domElements.closeEl.onclick = () => {
                                this.lastActive = performance.now(), (0, v.SZ)({
                                    type: "click",
                                    c: "banner_game",
                                    d: "end_page",
                                    e: "close"
                                }, {msg: JSON.stringify({id: 0, game: "叶间穿行"})}), this.onExit?.(), this.destroy()
                            }, this.domElements.shareEl.onclick = () => {
                                this.lastActive = performance.now(), (0, v.SZ)({
                                    type: "click",
                                    c: "banner_game",
                                    d: "end_page",
                                    e: "share"
                                }, {
                                    msg: JSON.stringify({
                                        id: 0,
                                        game: "叶间穿行",
                                        score: s.XH.score,
                                        login: !!window.__BiliUser__?.cache?.data?.isLogin
                                    })
                                }), (0, l.B)(s.XH.score, this.domElements.scoreTextRef)
                            }, this.domElements.viewGuideEl.onclick = () => {
                                this.lastActive = performance.now(), (0, v.SZ)({
                                    type: "click",
                                    c: "banner_game",
                                    d: "end_page",
                                    e: "view_guide"
                                }, {msg: JSON.stringify({id: 0, game: "叶间穿行"})}), this.showGuide(!0)
                            }, s.XH.scoreEl = this.domElements.scoreEl, this.keyboardInput.onKeyDown((e => {
                                this.lastActive = performance.now(), "none" === this.domElements.endCover.style.display || this.lockInput || "z" !== e.key || this.start()
                            })), this.gameState.addHook("EndPage", "enter", (() => {
                                this.lastActive = performance.now(), (0, v.SZ)({
                                    type: "click",
                                    c: "banner_game",
                                    d: "gaming",
                                    e: "duration"
                                }, {msg: JSON.stringify({id: 0, duration: s.XH.score})}), (0, v.SZ)({
                                    type: "tech",
                                    c: "banner_game",
                                    d: "gaming",
                                    e: "score"
                                }, {
                                    msg: JSON.stringify({
                                        id: 0,
                                        game: "叶间穿行",
                                        score: s.XH.score,
                                        position: this.player?.position.toString()
                                    })
                                });
                                const t = e.position, i = new g.N({center: [t[0], t[1]], duration: 1e3});
                                this.endEffectNode = new r.BV(i), this.endEffectNode.position = [0, 0, 1], this.scene.addChild(this.endEffectNode), this.domElements.scoreEl.style.display = "none", this.lockInput = !0, setTimeout((() => {
                                    this.domElements.endCover.style.display = "block", this.domElements.updateEndScore(s.XH.score), setTimeout((() => {
                                        this.domElements.endCover.style.opacity = "1"
                                    }), 50), setTimeout((() => {
                                        this.scene.children.pop()?.destroy(), this.lockInput = !1
                                    }), 550)
                                }), 1e3)
                            })), this.gameState.addHook("EndPage", "leave", (() => {
                                this.domElements.endCover.style.display = "none", this.domElements.endCover.style.opacity = "0"
                            })), this.gameState.addHook("InGame", "enter", (() => {
                                r.HT.lastT = performance.now(), cancelAnimationFrame(r.HT.raf), r.HT.raf = requestAnimationFrame(this.af.bind(this))
                            })), this.gameState.addHook("InGame", "leave", (() => {
                            })), this.gameState.addHook("InGame", "update", (() => {
                                s.XH.duration += r.HT.deltaT, Math.floor(s.XH.duration / 1e3) > s.XH.score && (s.XH.score = Math.floor(s.XH.duration / 1e3)), s.XH.updateStage(), s.XH.translateSpeed = s.XH.baseSpeed + s.XH.bonusSpeed, this.player.position[1] > 130 ? this.camera.position = [0, this.player.position[1] - 130, this.camera.position[2]] : this.camera.position[1] > 0 && (this.camera.position = [0, 0, this.camera.position[2]]), o.Engine.update(s.YB.engine, r.HT.deltaT);
                                const i = this.keyboardInput.keys.ArrowLeft || this.keyboardInput.keys.a,
                                    n = this.keyboardInput.keys.ArrowRight || this.keyboardInput.keys.d, a = i && !n,
                                    l = n && !i;
                                a && "left" !== e.facingState.currentState ? e.facingState.changeState("left") : l && "right" !== e.facingState.currentState && e.facingState.changeState("right");
                                const c = (t = !1) => {
                                    l && e.body.velocity.x < 5.5 ? o.Body.setVelocity(e.body, {
                                        x: Math.min(5.5, e.body.velocity.x + 1),
                                        y: e.body.velocity.y
                                    }) : a && e.body.velocity.x > -3 && o.Body.setVelocity(e.body, {
                                        x: Math.max(-3, e.body.velocity.x - .5),
                                        y: e.body.velocity.y
                                    })
                                };
                                e.lockGround || ("Air" === e.state.currentState ? c() : "Ground" === e.state.currentState && c(!0)), t.all.forEach((t => {
                                    const i = t.leafBody;
                                    t.leafDisableLock || (e.body.velocity.y < .5 && e.body.position.y - e.size.h / 2 > i.position.y + 8 ? i.collisionFilter.mask = 5 | i.collisionFilter.mask : i.collisionFilter.mask = ~(5 | ~i.collisionFilter.mask))
                                })), o.Composite.translate(s.YB.engine.world, {x: -.18 * r.HT.deltaT, y: 0})
                            })), this.keyboardInput.onKeyDown((i => {
                                if (r.HT.time < 3e3) return;
                                const n = () => {
                                    ({
                                        Ground: () => {
                                            e.lockGround && (t.luckies.find((t => t.leafBody === e.ground))?.triggerEnd(), e.lockGround = !1, o.Body.translate(e.body, {
                                                x: 0,
                                                y: 4
                                            }), o.Body.setStatic(e.body, !1), e.body.collisionFilter.mask = 2, o.Body.setVelocity(e.body, {
                                                x: 0,
                                                y: 0
                                            })), o.Body.setVelocity(e.body, {
                                                x: e.body.velocity.x,
                                                y: 12
                                            }), e.groundJumpTime = s.XH.duration, x(e.position)
                                        }, Climb: () => {
                                            e.lockStem && (t.luckies.find((t => t.stemBody === e.stem))?.triggerEnd(), e.lockStem = !1, e.body.collisionFilter.mask = 2), e.state.changeState("Air"), o.Body.setVelocity(e.body, {
                                                x: e.body.velocity.x,
                                                y: 12
                                            }), e.groundJumpTime = s.XH.duration, x(e.position)
                                        }
                                    })[e.state.currentState]?.()
                                }, a = () => {
                                    const i = () => {
                                        if (!e.lockGround && !e.lockStem) if (b(e.position, !!e.stem), e.stem) {
                                            if ("stem_trap" === e.stem.label) t.traps.find((t => t.stemBody === e.stem))?.triggerTrap(), (0, v.SZ)({
                                                type: "tech",
                                                c: "banner_game",
                                                d: "gaming",
                                                e: "trap"
                                            }, {
                                                msg: JSON.stringify({
                                                    id: 0,
                                                    game: "叶间穿行",
                                                    score: s.XH.score,
                                                    position: e.position.toString()
                                                })
                                            }); else if ("stem_lucky" === e.stem.label) {
                                                const i = t.luckies.find((t => t.stemBody === e.stem));
                                                "idle" === i?.state.currentState && (i?.triggerFly(), e.lockStem = !0, e.lockStemEndAt = s.XH.duration + s.XH.luckyDuration, e.body.collisionFilter.mask = 0, (0, v.SZ)({
                                                    type: "tech",
                                                    c: "banner_game",
                                                    d: "gaming",
                                                    e: "lucky"
                                                }, {
                                                    msg: JSON.stringify({
                                                        id: 0,
                                                        game: "叶间穿行",
                                                        score: s.XH.score,
                                                        position: e.position.toString()
                                                    })
                                                }))
                                            }
                                            e.state.changeState("Climb")
                                        } else "Ground" === e.state.currentState ? (e.tryClimbTime = s.XH.duration, e.animationState.changeState("try_climb")) : "Air" === e.state.currentState && (e.tryClimbTime = s.XH.duration, e.animationState.changeState("jump_try_climb"))
                                    };
                                    ({Ground: i, Air: i})[e.state.currentState]?.()
                                }, l = () => {
                                    const i = t.all.find((t => t.leafBody && t.leafBody === e.ground));
                                    i && (i.leafDisableLockTime = s.XH.duration, i.leafDisableLock = !0, i.leafBody.collisionFilter.mask = ~(5 | ~i.leafBody.collisionFilter.mask))
                                };
                                ({" ": n, c: n, z: a, ArrowUp: n, ArrowDown: l, j: n, k: a, w: n, s: l})[i.key]?.()
                            })), this.keyboardInput.onKeyUp((t => {
                                ({
                                    " ": () => {
                                        e.groundJumpTime && (e.groundJumpTime = NaN)
                                    }
                                })[t.key]?.()
                            })), o.Events.on(s.YB.engine, "collisionStart", (i => {
                                i.pairs.forEach((i => {
                                    if (!e.lockGround && "groundSensor" === i.bodyA.label && 0 === i.bodyB.label.indexOf("leaf")) if (e.ground = i.bodyB, "leaf_trap" === i.bodyB.label) t.traps.find((e => e.leafBody === i.bodyB))?.triggerTrap(), (0, v.SZ)({
                                        type: "tech",
                                        c: "banner_game",
                                        d: "gaming",
                                        e: "trap"
                                    }, {
                                        msg: JSON.stringify({
                                            id: 0,
                                            game: "叶间穿行",
                                            score: s.XH.score,
                                            position: e.position.toString()
                                        })
                                    }); else if ("leaf_lucky" === i.bodyB.label) {
                                        const n = t.luckies.find((e => e.leafBody === i.bodyB));
                                        "idle" === n?.state.currentState && (n?.triggerFly(), e.lockGround = !0, e.lockGroundEndAt = s.XH.duration + s.XH.luckyDuration, o.Body.setStatic(e.body, !0), e.body.collisionFilter.mask = 0, (0, v.SZ)({
                                            type: "tech",
                                            c: "banner_game",
                                            d: "gaming",
                                            e: "lucky"
                                        }, {
                                            msg: JSON.stringify({
                                                id: 0,
                                                game: "叶间穿行",
                                                score: s.XH.score,
                                                position: e.position.toString()
                                            })
                                        }))
                                    }
                                    e.lockStem || "player" !== i.bodyA.label || 0 !== i.bodyB.label.indexOf("stem") || "Climb" !== e.state.currentState && (e.stem = i.bodyB)
                                }))
                            })), o.Events.on(s.YB.engine, "collisionEnd", (t => {
                                t.pairs.forEach((t => {
                                    e.lockGround || "groundSensor" !== t.bodyA.label || 0 !== t.bodyB.label.indexOf("leaf") || e.ground !== t.bodyB || (e.ground = null), e.lockStem || "player" !== t.bodyA.label || 0 !== t.bodyB.label.indexOf("stem") || e.stem !== t.bodyB || (e.stem = null)
                                }))
                            })), this.gameState.addCondition("InGame", "EndPage", (() => {
                                const t = e.position;
                                return t[0] < -980 || t[1] < -220
                            })), this.renderer.render(this.camera, this.scene), this.banner.children.length > 2 ? this.banner.insertBefore(this.gameContainer, this.banner.lastElementChild) : this.banner.append(this.gameContainer), this.listeners.blur = () => this.pause(), this.listeners.focus = () => this.resume(), this.listeners.visibilitychange = () => {
                                "hidden" === document.visibilityState ? this.pause() : "visible" === document.visibilityState && this.resume()
                            }, this.listeners.resize = () => {
                                const e = this.banner.clientWidth / (16 / 3);
                                this.banner.style.height = e + "px", this.banner.style.maxHeight = e + "px", this.gameContainer.style.height = e + "px", this.canvas.style.height = e + "px";
                                const t = this.banner.clientWidth / 1920 || 1;
                                this.domElements.endContainer.style.transform = `scale(${t})`;
                                const i = this.root.querySelector(".guide-container");
                                i && (i.style.transform = `scale(${t})`)
                            }, this.gameContainer.addEventListener("blur", this.listeners.blur), this.gameContainer.addEventListener("focus", this.listeners.focus), window.addEventListener("visibilitychange", this.listeners.visibilitychange), window.addEventListener("resize", this.listeners.resize), this.listeners.beforeunload = () => {
                                "InGame" === this.gameState.currentState && (0, v.SZ)({
                                    type: "click",
                                    c: "banner_game",
                                    d: "gaming",
                                    e: "duration"
                                }, {msg: JSON.stringify({id: 0, game: "叶间穿行", duration: s.XH.score})}), this.destroy()
                            }, window.addEventListener("beforeunload", this.listeners.beforeunload)
                        }

                        destroy() {
                            try {
                                cancelAnimationFrame(r.HT.raf), this.gameContainer.removeEventListener("blur", this.listeners.blur), this.gameContainer.removeEventListener("focus", this.listeners.focus), window.removeEventListener("visibilitychange", this.listeners.visibilitychange), window.removeEventListener("beforeunload", this.listeners.beforeunload), window.removeEventListener("resize", this.listeners.resize);
                                const e = this.banner?.querySelector(".banner-game");
                                e && this.banner?.removeChild(e), this.scene.destroy(), this.renderer.initSet.clear(), o.Engine.clear(s.YB.engine)
                            } catch (e) {
                            }
                        }

                        start() {
                            "MainMenu" !== this.gameState.currentState && "EndPage" !== this.gameState.currentState || (this.domElements.scoreEl.style.display = "flex", this.reset(), this.gameState.changeState("InGame"))
                        }

                        pause() {
                            "InGame" === this.gameState.currentState && this.gameState.changeState("Paused")
                        }

                        resume() {
                            "Paused" === this.gameState.currentState && (this.lastT = performance.now(), this.gameState.changeState("InGame"))
                        }

                        reset() {
                            if (s.XH.duration = 0, s.XH.score = 0, r.HT.time = 0, this.shamrocks?.reset(), this.winds?.reset(), this.birds?.reset(), this.countDown?.reset(), this.lastT = performance.now(), this.lag = !1, this.player) {
                                const e = this.shamrocks?.all[0], t = e.position;
                                this.player.stem = e.stemBody, this.player.body.isStatic || o.Body.setStatic(this.player.body, !0), o.Body.setVelocity(this.player.body, {
                                    x: 0,
                                    y: 0
                                }), this.player.position = [t[0] + e.stemOffset[0] - 5, t[1] + e.stemOffset[1] - 20, this.player.zIndex], this.player.animationState.changeState("climb"), setTimeout((() => {
                                    this.player.sprite.lastChange = 3e3
                                }), 34), this.player.state.currentState = "Climb"
                            }
                            o.Body.setVelocity(this.player.body, {x: 0, y: 0}), o.Engine.update(s.YB.engine, 0)
                        }

                        renderFirstFrame() {
                            this.reset(), this.gameLoop()
                        }

                        gameLoop() {
                            this.renderer.gl.clearColor(.6235294117647059, .8823529411764706, .8627450980392157, 1), this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT | this.renderer.gl.DEPTH_BUFFER_BIT), r.HT.time > 3e3 && (this.gameState.update(), this.scene.updateRecursive()), this.renderer.render(this.camera, this.scene)
                        }

                        af(e) {
                            r.HT._deltaT = e - r.HT._lastT, r.HT.deltaT = 1e3 / 60, r.HT.lastT = r.HT.time, r.HT.time = r.HT.lastT + r.HT.deltaT, r.HT.raf = requestAnimationFrame(this.af.bind(this)), r.HT._deltaT < r.HT._interval || (r.HT._lastT = e, "InGame" === this.gameState.currentState && (this.gameLoop(), !this.lag && e - this.lastT > 100 && (this.lag = !0, (0, v.SZ)({
                                type: "tech",
                                c: "banner_game",
                                d: "lag"
                            }, {
                                msg: JSON.stringify({
                                    id: 0,
                                    game: "叶间穿行",
                                    duration: s.XH.score,
                                    lag: Math.round(e - this.lastT)
                                })
                            })), this.lastT = e), "EndPage" === this.gameState.currentState && this.endEffectNode && this.renderer.render(this.camera, this.scene))
                        }

                        showGuide(e = !1) {
                            (0, c.Y)(this.root, this.banner.clientWidth / 1920, (() => this.start()), e)
                        }
                    }

                    if (window.BannerGameSpring2022 = w, s.s1) {
                        const e = new w(document.getElementById("banner"));
                        await e.init(), e.renderFirstFrame(), e.showGuide()
                    }
                    t()
                } catch (e) {
                    t(e)
                }
            }), 1)
        }, 9783: (e, t, i) => {
            "use strict";
            i.d(t, {n: () => r});
            var n = i(6010);
            const o = {r1: "", r2: ""}, r = e => {
                const t = document.createElement("div");
                t.className = "banner-game";
                const i = e.clientWidth / (16 / 3);
                Object.assign(t.style, {
                    width: "100%",
                    height: i + "px",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    userSelect: "none",
                    fontFamily: "Vonwaon, sans-serif",
                    letterSpacing: "1px",
                    textRendering: "geometricPrecision"
                });
                const r = t.attachShadow({mode: "closed"}), s = document.createElement("style");
                s.textContent = `\n    canvas {\n      width: 100%;\n      height: ${i}px;\n      position: absolute;\n      top: 0;\n      left: 0;\n      cursor: 'default';\n    }\n    .full {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      image-rendering: pixelated;\n    }\n    .content-bubble {\n      position: absolute;\n      width: 650px;\n      height: 314px;\n      top: 24px;\n      left: 634px;\n      background: url(${n.fF ? "/guide/bubble.png" : "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/fqC498nGEQ.png"});\n    }\n    .option-bubble {\n      width: 220px;\n      height: 80px;\n      background: url(${n.fF ? "/guide/bubble_option.png" : "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/x0KtnfZvTq.png"});\n      cursor: pointer;\n      text-align: center;\n      font-size: 24px;\n      line-height: 24px;\n      color: rgb(89, 164, 87);\n      box-sizing: border-box;\n      padding-top: 28px;\n      padding-right: 28px;\n      transition: 0.3s\n    }\n    .option-bubble:hover {\n      transform: translateY(-5px);\n    }\n    .end-content-left {\n      position: absolute;\n      width: 220px;\n      height: 160px;\n      top: 80px;\n      left: 70px;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      box-sizing: border-box;\n      padding-left: 20px;\n    }\n    .end-content-right {\n      position: absolute;\n      width: 220px;\n      height: 160px;\n      top: 80px;\n      left: 310px;\n      font-size: 24px;\n      color: rgb(116, 167, 166);\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n    }\n    .end-content-right span {\n      color: #a4d341;\n      letter-spacing: -3px;\n      margin-right: 3px;\n    }\n    .end-option-icon {\n      position: absolute;\n      width: 36px;\n      height: 36px;\n      top: 20px;\n      left: 160px;\n      background-size: 100%;\n      background-repeat: no-repeat;\n      background-position: center;\n    }\n\n    .score {\n      position: absolute;\n      color: #fff;\n      top: 48px;\n      right: 24px;\n      text-shadow: 3px 3px #000;\n      display: flex;\n      align-items: center;\n      justify-content: flex-end;\n      width: 240px;\n      height: 32px;\n      transform: scale(1.5);\n      transform-origin: right;\n    }\n    .number {\n      width: 24px;\n      height: 32px;\n      background-image: url(/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220316/00979505aec5edd6e5c2f8c096fa0f62/ZP51pxsKWj.png);\n      background-repeat: no-repeat;\n      background-size: 240px 32px;\n      image-rendering: pixelated;\n    }\n  `, r.appendChild(s);
                const a = document.createElement("canvas");
                a.width = 1920, a.height = 360, r.appendChild(a);
                const l = document.createElement("div");
                l.classList.add("full"), r.appendChild(l), Object.assign(l.style, {
                    display: "none",
                    opacity: "0",
                    transition: "opacity 0.5s",
                    backgroundImage: `url(${n.fF ? "/guide/end_cover.png" : "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/3xqAauWyWp.png"})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                });
                const c = document.createElement("div");
                Object.assign(c.style, {
                    position: "absolute",
                    width: "1920px",
                    height: "360px",
                    top: "0",
                    left: "0",
                    transformOrigin: "top left",
                    transform: `scale(${e.clientWidth / 1920 || 1})`
                });
                const d = document.createElement("div");
                d.classList.add("content-bubble"), c.appendChild(d);
                const u = document.createElement("div");
                u.classList.add("end-content-left");
                const p = document.createElement("div");
                p.textContent = "坚持了", Object.assign(p.style, {
                    fontSize: "24px",
                    lineHeight: "24px",
                    marginBottom: "8px",
                    color: "#74a7a6"
                }), u.appendChild(p);
                const h = document.createElement("div");
                h.textContent = "秒", Object.assign(h.style, {
                    fontSize: "24px",
                    lineHeight: "24px",
                    marginBottom: "8px",
                    color: "#74a7a6"
                });
                const f = document.createElement("span");
                Object.assign(f.style, {
                    fontSize: "72px",
                    lineHeight: "72px",
                    color: "#a4d341",
                    position: "relative",
                    bottom: "-10px",
                    left: "-5px",
                    letterSpacing: "-10px",
                    marginRight: "5px"
                }), h.insertBefore(f, h.firstChild), u.appendChild(h), d.appendChild(u);
                const m = document.createElement("div");
                m.classList.add("end-content-right");
                const g = document.createElement("div");
                Object.assign(g.style, {marginBottom: "20px"});
                const y = document.createElement("div");
                m.appendChild(g), m.appendChild(y);
                const {timeStage: v, timeText: x, scorePercent: b, scoreText: w} = n.dl, S = (e, t) => {
                    for (let i = 0; i < b.length; i++) if (e >= t[i]) return i;
                    return b.length - 1
                };
                d.appendChild(m);
                const A = [{y: 10, text: '再来！(<span style="color:#a4d341;">按Z</span>)', icon: ""}, {
                    y: 97,
                    text: "分享结果",
                    icon: n.fF ? "/guide/share.png" : "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/L64vnF6vEL.png"
                }, {
                    y: 185,
                    text: "回看教程",
                    icon: n.fF ? "/guide/book.png" : "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/bZ4QGDKRXu.png"
                }, {
                    y: 273,
                    text: "退出",
                    icon: n.fF ? "/guide/exit.png" : "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/OfPa9ZyIUb.png"
                }].map(((e, t) => {
                    const i = document.createElement("div");
                    if (i.classList.add("option-bubble"), Object.assign(i.style, {
                        position: "absolute",
                        top: `${e.y}px`,
                        left: "1186px"
                    }), i.innerHTML = e.text, 0 === t) i.style.paddingRight = "0px", i.style.paddingLeft = "16px"; else {
                        const t = document.createElement("div");
                        t.classList.add("end-option-icon"), t.style.backgroundImage = `url(${e.icon})`, i.appendChild(t)
                    }
                    return c.appendChild(i), i
                }));
                l.appendChild(c);
                const T = document.createElement("div");
                return T.classList.add("score"), r.appendChild(T), {
                    bannerGame: t,
                    root: r,
                    canvas: a,
                    scoreEl: T,
                    endContainer: c,
                    restartEl: A[0],
                    shareEl: A[1],
                    viewGuideEl: A[2],
                    closeEl: A[3],
                    endCover: l,
                    updateEndScore: async e => {
                        f.textContent = e.toString();
                        let t = 0;
                        try {
                            t = (await fetch(`https://api.bilibili.com/x/web-frontend/score/score?score=${e}`, {credentials: "include"}).then((e => e.json()))).result?.pct || 0
                        } catch (e) {
                        }
                        if (t) {
                            const e = S(t, b), i = Math.floor(Math.random() * w[e].length);
                            o.r1 = `你超过了<span>${t}%</span><br/>的玩家！`, o.r2 = w[e][i]
                        } else {
                            const t = S(e, v), i = Math.floor(Math.random() * x[t].length);
                            o.r1 = `恭喜你坚持了<span>${e}</span>秒！`, o.r2 = x[t][i]
                        }
                        g.innerHTML = o.r1, y.innerHTML = o.r2
                    },
                    scoreTextRef: o
                }
            }
        }, 6010: (e, t, i) => {
            "use strict";
            i.d(t, {am: () => f, fF: () => r, XH: () => c, ed: () => l, YB: () => a, dl: () => g, s1: () => s});
            var n = i(9842), o = i(8593);
            const r = !1, s = !1, a = {engine: n.Engine.create()}, l = [{time: 0, speed: -.06, trap: .2, lucky: .1}, {
                time: 3e4,
                speed: -.09,
                trap: .5,
                lucky: .1
            }, {time: 9e4, speed: -.12, trap: .8, lucky: .1}], c = new class {
                duration = 0;
                _score = 0;
                scoreEl = null;
                luckyDuration = 1e4;
                baseSpeed = -.06;
                bonusSpeed = 0;
                translateSpeed = 0;

                get score() {
                    return this._score
                }

                set score(e) {
                    if (this._score = e, this.scoreEl) {
                        const t = e.toString().split("").map((e => Number(e)));
                        this.scoreEl.innerHTML = "", t.map((e => {
                            const t = document.createElement("div");
                            t.classList.add("number"), t.style.backgroundPosition = `-${24 * e}px 0px`, this.scoreEl?.appendChild(t)
                        }))
                    }
                }

                stageIndex = 0;
                stage = l[0];

                updateStage() {
                    let e = 0;
                    for (let t = 0; t < l.length && !(l[t].time > c.duration); t++) e = t;
                    e !== this.stageIndex && (this.stage = l[e], this.baseSpeed = this.stage.speed)
                }
            }, d = {
                "/VonwaonBitmap-12px.woff2": {
                    src: r ? "/VonwaonBitmap-12px.woff2" : "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220315/00979505aec5edd6e5c2f8c096fa0f62/g0JJ6atToR.woff2",
                    type: "font",
                    options: {name: "Vonwaon"}
                }
            }, u = {
                "/sprite/background/sky.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220217/00979505aec5edd6e5c2f8c096fa0f62/1Pf3J23kur.png",
                "/sprite/background/clouds.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220217/00979505aec5edd6e5c2f8c096fa0f62/rvRI0G1BmS.png",
                "/sprite/background/mountain.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220217/00979505aec5edd6e5c2f8c096fa0f62/LuWoq27X7W.png",
                "/sprite/background/near.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220217/00979505aec5edd6e5c2f8c096fa0f62/AkmiDNoNFy.png",
                "/sprite/background/space.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220308/00979505aec5edd6e5c2f8c096fa0f62/hllMZ39mFV.png",
                "/sprite/leaves/leaves1.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220224/00979505aec5edd6e5c2f8c096fa0f62/w66W8qKtsi.png",
                "/sprite/leaves/leaves2.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220224/00979505aec5edd6e5c2f8c096fa0f62/we0s57YZSN.png",
                "/sprite/leaves/leaves3.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220224/00979505aec5edd6e5c2f8c096fa0f62/V90uva9Va2.png",
                "/sprite/leaves/leaves4.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220224/00979505aec5edd6e5c2f8c096fa0f62/IA21PIMRvD.png",
                "/sprite/22.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220308/00979505aec5edd6e5c2f8c096fa0f62/hXJaoTXC37.png",
                "/sprite/33.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220304/00979505aec5edd6e5c2f8c096fa0f62/SNPes6slpr.png",
                "/sprite/shamrocks/shamrock1.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220225/00979505aec5edd6e5c2f8c096fa0f62/1r6uJBboeZ.png",
                "/sprite/shamrocks/shamrock2.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220225/00979505aec5edd6e5c2f8c096fa0f62/56CwjhVTVg.png",
                "/sprite/shamrocks/shamrock3.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220225/00979505aec5edd6e5c2f8c096fa0f62/XSPA4yDs52.png",
                "/sprite/shamrocks/shamrock4.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220225/00979505aec5edd6e5c2f8c096fa0f62/ahwB6bVcGw.png",
                "/sprite/shamrocks/shamrock_trap.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/KFDYJVlhgT.png",
                "/sprite/shamrocks/shamrock_lucky.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/A29O65miDc.png",
                "/sprite/wind/wind1.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/h90zWlIavR.png",
                "/sprite/wind/wind2.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/mjTIdrD1yz.png",
                "/sprite/wind/wind3.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/oUz5oLVDl0.png",
                "/sprite/wind/wind4.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/hffVhQpxwA.png",
                "/sprite/bird/bird.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220316/00979505aec5edd6e5c2f8c096fa0f62/lxv3u3Y9ev.png",
                "/sprite/bird/numbers.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220316/00979505aec5edd6e5c2f8c096fa0f62/ZP51pxsKWj.png",
                "/sprite/bird/numbers2.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220316/00979505aec5edd6e5c2f8c096fa0f62/oMP50YCuMA.png",
                "/sprite/count.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220323/00979505aec5edd6e5c2f8c096fa0f62/SFB0E2Z4gz.png",
                "/guide/bubble.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/fqC498nGEQ.png",
                "/guide/end_cover.png": "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/3xqAauWyWp.png"
            }, p = {
                "/sprite/22.json": "/wind-game/activity.hdslb.com/blackboard/static/20220308/00979505aec5edd6e5c2f8c096fa0f62/mhFnJ3WgCI.json",
                "/sprite/33.json": "/wind-game/activity.hdslb.com/blackboard/static/20220304/00979505aec5edd6e5c2f8c096fa0f62/bZ70VoHTmH.json",
                "/sprite/shamrocks/shamrock1.json": "/wind-game/activity.hdslb.com/blackboard/static/20220225/00979505aec5edd6e5c2f8c096fa0f62/vQOKaRcQiQ.json",
                "/sprite/shamrocks/shamrock2.json": "/wind-game/activity.hdslb.com/blackboard/static/20220225/00979505aec5edd6e5c2f8c096fa0f62/KKLdKJ60Tm.json",
                "/sprite/shamrocks/shamrock3.json": "/wind-game/activity.hdslb.com/blackboard/static/20220225/00979505aec5edd6e5c2f8c096fa0f62/ECCbC7xZCf.json",
                "/sprite/shamrocks/shamrock4.json": "/wind-game/activity.hdslb.com/blackboard/static/20220225/00979505aec5edd6e5c2f8c096fa0f62/jHhlzBK8lT.json",
                "/sprite/shamrocks/shamrock_trap.json": "/wind-game/activity.hdslb.com/blackboard/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/ekSXHfFK0Q.json",
                "/sprite/shamrocks/shamrock_lucky.json": "/wind-game/activity.hdslb.com/blackboard/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/jNCwVQWxuT.json",
                "/sprite/wind/wind1.json": "/wind-game/activity.hdslb.com/blackboard/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/RIfIuimWkU.json",
                "/sprite/wind/wind2.json": "/wind-game/activity.hdslb.com/blackboard/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/IHWo3trIPV.json",
                "/sprite/wind/wind3.json": "/wind-game/activity.hdslb.com/blackboard/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/2pqUgkNUXm.json",
                "/sprite/wind/wind4.json": "/wind-game/activity.hdslb.com/blackboard/static/20220303/00979505aec5edd6e5c2f8c096fa0f62/ro0B1H3Ov8.json",
                "/sprite/bird/bird.json": "/wind-game/activity.hdslb.com/blackboard/static/20220316/00979505aec5edd6e5c2f8c096fa0f62/VKYQz9AWcj.json",
                "/sprite/count.json": "/wind-game/activity.hdslb.com/blackboard/static/20220323/00979505aec5edd6e5c2f8c096fa0f62/QUgV5pcBul.json"
            }, h = (() => {
                try {
                    return 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
                } catch (e) {
                    return !1
                }
            })();
            Object.keys(u).forEach((e => {
                d[e] = {src: r ? e : h ? u[e] + "@1c.webp" : u[e], type: "image"}
            })), Object.keys(p).forEach((e => {
                d[e] = {src: r ? e : p[e], type: "atlas"}
            }));
            const f = new class {
                    pending = {};
                    items = {};
                    loaded = !1;
                    m = {
                        image: e => (0, o.po)(e.src),
                        atlas: e => fetch(e.src).then((e => e.json())),
                        atlasHash: e => fetch(e.src).then((e => e.json())),
                        font: async e => {
                            const t = new FontFace(e.options.name, `url(${e.src})`);
                            return await t.load().then((() => document.fonts.add(t))), t
                        }
                    };

                    constructor(e) {
                        this.pending = e
                    }

                    load() {
                        return new Promise(((e, t) => {
                            const i = Object.keys(this.pending);
                            let n = 0;
                            i.forEach((o => {
                                const r = this.pending[o];
                                (0, this.m[r.type])(r).then((t => {
                                    this.items[o] = t, delete this.pending[o], n += 1, n === i.length && (this.loaded = !0, e())
                                })).catch((e => t(e)))
                            }))
                        }))
                    }

                    get(e) {
                        return this.items[e]
                    }
                }(d),
                m = [["天赋异禀·疾风征服者·被22选中的人！", "成就达成，进击的22！"], ["平平无奇小天才ㄟ( ▔, ▔ )ㄏ ", "不愧是你，22拯救者！"], ["再接再厉，芜湖起飞！", "22必不能轻易认输！", "是时候展现真正的技术了！"], ["就这，绝对不是我 (°ー°〃)", "是意外啦，22绝不会轻易狗带！"], ["身残志坚，答应22不要放弃治疗！", "这河狸吗？<br/>o(一︿一+)o  ", "是什么糊住了22的眼睛？是风！ ", "落地成盒，虾仁猪心 (ノへ￣、)"]],
                g = {timeText: m, timeStage: [70, 50, 30, 15, 0], scorePercent: [95, 70, 50, 25, 10], scoreText: m}
        }, 9905: (e, t, i) => {
            "use strict";
            i.d(t, {A: () => r});
            var n = i(6472), o = i(6010);

            class r extends n.BV {
                sprites = [];

                constructor() {
                    super();
                    const e = ["/sprite/background/sky.png", "/sprite/background/clouds.png", "/sprite/background/mountain.png", "/sprite/background/near.png"].map((e => o.am.get(e))),
                        t = o.am.get("/sprite/background/space.png"), i = new n.jy({texture: t}), r = new n.BV(i);
                    r.translate([0, 360, -51]), r.scale([240, 45, 1]), this.addChild(r);
                    const s = e.map(((t, i) => {
                        const o = new n.jy({texture: t});
                        this.sprites.push(o);
                        const r = new n.BV(o);
                        return r.translate([0, 0, i - e.length - 50]), r.scale([2, 2, 1]), o.uvOffset[0] = -.065, r
                    }));
                    s.forEach((e => this.addChild(e)))
                }

                update() {
                    this.sprites[0].uvOffset[0] = (this.sprites[0].uvOffset[0] + 5e-6 * n.HT.deltaT) % 1, this.sprites[1].uvOffset[0] = (this.sprites[1].uvOffset[0] + 1e-5 * n.HT.deltaT) % 1, this.sprites[2].uvOffset[0] = (this.sprites[2].uvOffset[0] + 2e-5 * n.HT.deltaT) % 1, this.sprites[3].uvOffset[0] = (this.sprites[3].uvOffset[0] + 3e-5 * n.HT.deltaT) % 1
                }
            }
        }, 2644: (e, t, i) => {
            "use strict";
            i.d(t, {g: () => r});
            var n = i(6472), o = i(6010);

            class r extends n.BV {
                numberCanvas;
                numberCtx;
                numbersTexture;
                birdSprite;
                birdNode;
                numNode;
                nextAppear = 30;

                constructor() {
                    super(), this.numberCanvas = document.createElement("canvas"), this.numberCanvas.width = 60, this.numberCanvas.height = 16, this.numberCtx = this.numberCanvas.getContext("2d");
                    const [e, t] = [o.am.get("/sprite/bird/bird.png"), o.am.get("/sprite/bird/bird.json")];
                    this.numbersTexture = o.am.get("/sprite/bird/numbers2.png"), this.birdSprite = new n.Lx({
                        texture: e,
                        atlas: t
                    }), this.birdSprite.changeAnimation("idle"), this.birdNode = new n.BV, this.birdNode.scaling = [2, 2, 1], this.birdNode.translate([-2e3, 75, -49]), this.numNode = new n.BV, this.numNode.scaling = [1, 1, 1], this.numNode.position = [20, -10, 1], this.birdNode.addChild(this.numNode), this.addChild(this.birdNode)
                }

                update() {
                    if (o.XH.duration / 1e3 > this.nextAppear) {
                        const e = this.nextAppear;
                        this.nextAppear = e + 30, this.genNumber(e).then((e => {
                            this.numNode.object?.destroy(), this.numNode.object = new n.jy({texture: e}), this.birdNode.position = [1100, 75, -49], this.birdNode.object = this.birdSprite, this.birdSprite.lastChange = 0
                        }))
                    }
                    this.birdNode.position[0] > -1100 ? this.birdNode.translate([-4, 0, 0]) : this.birdNode.object && (this.birdNode.object = void 0)
                }

                reset() {
                    this.birdNode.object = void 0, this.numNode.object?.destroy(), this.numNode.object = void 0, this.birdSprite.lastChange = 0, this.nextAppear = 30
                }

                async genNumber(e) {
                    this.numberCtx.clearRect(0, 0, this.numberCanvas.width, this.numberCanvas.height);
                    const t = Math.floor(e).toString().split("").map((e => Number(e))), i = Math.max(t.length, 5),
                        n = 30 - 6 * i;
                    for (let e = 0; e < i; e++) this.numberCtx.drawImage(this.numbersTexture, 12 * t[e], 0, 12, 16, n + 12 * e, 0, 12, 16);
                    return new Promise((e => {
                        const t = document.createElement("img");
                        t.onload = () => e(t), t.src = this.numberCanvas.toDataURL()
                    }))
                }
            }
        }, 4351: (e, t, i) => {
            "use strict";
            i.d(t, {W: () => r});
            var n = i(6472), o = i(6010);

            class r extends n.BV {
                sprite;

                constructor() {
                    super();
                    const [e, t] = [o.am.get("/sprite/count.png"), o.am.get("/sprite/count.json")];
                    this.sprite = new n.Lx({texture: e, atlas: t}), this.scaling = [2, 2, 1], this.reset()
                }

                reset() {
                    this.position = [0, 100, -1], this.sprite.changeAnimation("idle"), this.sprite.lastChange = 0, this.object = this.sprite
                }

                update() {
                    this.object && n.HT.time > 4e3 ? this.object = void 0 : this.object && this.translate([n.HT.deltaT * (o.XH.translateSpeed - .18) / 2, 0, 0])
                }
            }
        }, 7199: (e, t, i) => {
            "use strict";
            i.d(t, {N: () => a});
            var n = i(6472), o = i(5975), r = i(1525), s = i(8157);

            class a extends n.MJ {
                renderer = null;
                buffer = null;
                vao = null;
                shader = null;
                mvp = o.Ue();
                startTime = NaN;
                center;
                duration;
                size;

                constructor(e) {
                    super(), this.center = e?.center || [0, 0], this.duration = e?.duration || 1e3, this.size = e?.size || [1920, 720]
                }

                init(e) {
                    const t = e.gl;
                    this.renderer = e, this.shader = new n.ex({
                        gl: t,
                        vs: r,
                        fs: s
                    }), this.shader.use(), this.shader.setUniform("size", "VEC2", this.size), this.shader.setUniform("center", "VEC2", this.center);
                    const i = new Float32Array([-.5, .5, -.5, -.5, .5, .5, .5, -.5]);
                    this.vao = t.createVertexArray();
                    const o = t.createBuffer();
                    this.buffer = o, t.bindVertexArray(this.vao), t.bindBuffer(t.ARRAY_BUFFER, o), t.bufferData(t.ARRAY_BUFFER, i, t.STATIC_DRAW), t.enableVertexAttribArray(0), t.vertexAttribPointer(0, 2, t.FLOAT, !0, 8, 0), t.bindBuffer(t.ARRAY_BUFFER, null), this.startTime = n.HT.time
                }

                render(e) {
                    if (!this.renderer || !this.shader) return;
                    const t = this.renderer.gl;
                    t.bindVertexArray(this.vao), this.shader.use(), o.bA(this.mvp, e.modelMatrix, [this.size[0], this.size[1], 1]), o.dC(this.mvp, e.viewProjection, this.mvp), this.shader.setUniform("mvp_matrix", "MAT4", this.mvp), this.shader.setUniform("pct", "FLOAT", (n.HT.time - this.startTime) / this.duration), t.drawArrays(t.TRIANGLE_STRIP, 0, 4)
                }

                destroy() {
                    if (!this.renderer) return;
                    const e = this.renderer.gl;
                    e.deleteVertexArray(this.vao), e.deleteBuffer(this.buffer), this.renderer.initSet.delete(this), this.shader?.destroy()
                }
            }
        }, 1462: (e, t, i) => {
            "use strict";
            i.d(t, {o: () => s});
            var n = i(6472), o = i(6010);
            const r = ["/sprite/leaves/leaves1.png", "/sprite/leaves/leaves2.png", "/sprite/leaves/leaves3.png", "/sprite/leaves/leaves4.png"];

            class s extends n.BV {
                constructor() {
                    super(), r.map((e => o.am.get(e))).map(((e, t) => new n.BV(new n.hp({
                        texture: e,
                        scale: 1,
                        numParticles: 15,
                        particleBirthRate: 1,
                        originA: [960, 280, .5],
                        originB: [-960, 280, .5],
                        angle2d: Math.PI * (17 / 16),
                        angleRadius: .01,
                        speedRange: [400, 450],
                        gravity: [0, -10, 0],
                        ageRange: [10, 11]
                    })))).forEach((e => this.addChild(e)))
                }
            }
        }, 5377: (e, t, i) => {
            "use strict";
            i.d(t, {Y: () => r});
            var n = i(6010);
            const o = n.fF ? new Array(10).fill(0).map(((e, t) => ({c: `/guide/${t + 1}.png`}))) : [{c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/IjRnuJVAMU.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/NtXwfLTm8r.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/sKIvMZvfqJ.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220323/00979505aec5edd6e5c2f8c096fa0f62/H6ysLDyYzc.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220323/00979505aec5edd6e5c2f8c096fa0f62/mMUeW2fhs3.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220323/00979505aec5edd6e5c2f8c096fa0f62/pYaSYzhqWz.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220323/00979505aec5edd6e5c2f8c096fa0f62/n2Pw2iT2r1.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/ODZkSkGrlS.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/KWGhLKKHic.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/QpEVse7WKu.png"}, {c: "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/vBuQkSZx0C.png"}],
                r = (e, t, i, r = !1) => {
                    let s = 0;
                    const a = document.createElement("div");
                    a.classList.add("full"), Object.assign(a.style, {
                        overflow: "hidden",
                        zIndex: "1"
                    }), e.appendChild(a);
                    const l = document.createElement("div");
                    l.classList.add("guide-container"), Object.assign(l.style, {
                        position: "absolute",
                        width: "1920px",
                        height: "360px",
                        top: "0",
                        left: "0",
                        background: "rgba(0,0,0,0.1)",
                        transformOrigin: "top left",
                        transform: `scale(${t || 1})`
                    });
                    const c = document.createElement("style");
                    c.textContent = `\n  .guide-close {\n    position: absolute;\n    width: 58px;\n    height: 58px;\n    top: 28px;\n    left: 1132px;\n    cursor: pointer;\n    background: url(${n.fF ? "/guide/x.png" : "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/pDRaxEfL5S.png"});\n  }\n  .guide-arrow {\n    position: absolute;\n    width: 40px;\n    height: 30px;\n    top: 24px;\n    left: 160px;\n    background: url(${n.fF ? "/guide/arrow.png" : "/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220309/00979505aec5edd6e5c2f8c096fa0f62/ZWZ5JWBR7W.png"});\n  }\n  @keyframes arrow_floating {\n    from { transform: translateX(0px); }\n    to   { transform: translateX(5px); }\n  }\n  @keyframes arrow_floating_r {\n    from { transform: scaleX(-1) translateX(0px); }\n    to   { transform: scaleX(-1) translateX(-5px); }\n  }\n  `, l.appendChild(c);
                    const d = document.createElement("div");
                    d.classList.add("content-bubble"), l.appendChild(d);
                    const u = document.createElement("div");
                    u.classList.add("guide-close"), l.appendChild(u);
                    const p = document.createElement("div");
                    Object.assign(p.style, {
                        position: "absolute",
                        width: "460px",
                        height: "200px",
                        top: "86px",
                        left: "712px",
                        display: "flex",
                        alignItems: "center"
                    });
                    const h = document.createElement("img");
                    h.src = o[0].c, p.appendChild(h), l.appendChild(p);
                    const f = document.createElement("div");
                    f.classList.add("option-bubble"), Object.assign(f.style, {
                        position: "absolute",
                        top: "158px",
                        left: "1185px"
                    });
                    const m = document.createElement("div");
                    m.classList.add("guide-arrow"), Object.assign(m.style, {animation: "0.5s linear infinite alternate arrow_floating"});
                    const g = document.createTextNode("怎么办");
                    f.appendChild(g), f.appendChild(m);
                    const y = document.createElement("div");
                    y.classList.add("option-bubble"), Object.assign(y.style, {
                        position: "absolute",
                        top: "245px",
                        left: "1186px",
                        display: "none"
                    });
                    const v = document.createElement("div");
                    v.classList.add("guide-arrow"), Object.assign(v.style, {
                        transform: "scaleX(-1)",
                        animation: "0.5s linear infinite alternate arrow_floating_r"
                    });
                    const x = document.createTextNode("没听清...");
                    y.appendChild(x), y.appendChild(v), l.appendChild(f), l.appendChild(y);
                    const b = e => {
                        if (!(e < 0 || e > o.length)) {
                            if (e === o.length) return a.parentNode?.removeChild(a), void i();
                            0 === e && (g.textContent = "怎么办", y.style.display = "none"), 1 === e && (y.style.display = "block", g.textContent = "嗯嗯"), e === o.length - 2 && (g.textContent = "嗯嗯"), e === o.length - 1 && (g.textContent = "OK，来吧"), s = e, h.src = o[s].c
                        }
                    };
                    f.addEventListener("click", (() => b(s + 1))), y.addEventListener("click", (() => b(s - 1))), u.addEventListener("click", (() => {
                        a.parentNode?.removeChild(a), r || i()
                    })), a.appendChild(l)
                }
        }, 1153: (e, t, i) => {
            "use strict";
            i.d(t, {J: () => u});
            var n = i(6472), o = i(9842), r = i(6010);
            const s = {w: 52, h: 78}, a = -s.h / 4 - 5, l = {w: s.w - 2, h: s.h / 2},
                c = ["Air", "Ground", "Climb", "Transition"],
                d = ["idle", "run", "jump", "fall", "into_climb", "climb", "try_climb", "jump_try_climb"];

            class u extends n.BV {
                body;
                groundSensor;
                state = new n.DV(c);
                animationState = new n.DV(d);
                facingState = new n.DV(["right", "left"]);
                sprite = null;
                ground = null;
                stem = null;
                size = s;
                zIndex = 0;
                intoClimbTime = NaN;
                tryClimbTime = NaN;
                groundJumpTime = NaN;
                lockGround = !1;
                lockGroundEndAt = NaN;
                lockStem = !1;
                lockStemEndAt = NaN;

                constructor() {
                    super();
                    const e = r.am.get("/sprite/22.png"), t = r.am.get("/sprite/22.json");
                    this.sprite = new n.Lx({
                        texture: e,
                        atlas: t
                    }), this.object = this.sprite, this.translate([100, 50, 0]), this.scale([2, 2, 1]), this.body = o.Bodies.rectangle(0, 230, s.w, s.h, {
                        inertia: 1 / 0,
                        label: "player",
                        collisionFilter: {category: 1, mask: 2}
                    }), o.Body.setMass(this.body, 10), this.groundSensor = o.Bodies.rectangle(0, 230 + a, l.w, l.h, {
                        isSensor: !0,
                        inertia: 1 / 0,
                        label: "groundSensor",
                        collisionFilter: {category: 4, mask: 2}
                    }), o.Composite.add(r.YB.engine.world, [this.body, this.groundSensor]), d.forEach((e => {
                        this.animationState.addHook(e, "enter", (() => {
                            this.sprite?.animations[e + "_left"] && "left" === this.facingState.currentState ? this.sprite?.changeAnimation(e + "_left") : this.sprite?.changeAnimation(e)
                        }))
                    })), this.animationState.addCondition("jump", "fall", (() => this.body.velocity.y < 0)), this.animationState.addCondition("fall", "idle", (() => null !== this.ground)), this.animationState.addCondition("idle", "jump", (() => null === this.ground && this.body.velocity.y > .2)), this.animationState.addCondition("idle", "fall", (() => null === this.ground && this.body.velocity.y < .2)), this.animationState.addCondition("idle", "run", (() => !this.lockGround && this.body.velocity.x > .3)), this.animationState.addCondition("idle", "run", (() => !this.lockGround && this.body.velocity.x < -.3)), this.animationState.addCondition("run", "idle", (() => Math.abs(this.body.velocity.x) < .3)), this.animationState.addCondition("run", "jump", (() => null === this.ground && this.body.velocity.y > .2)), this.animationState.addCondition("run", "fall", (() => null === this.ground && this.body.velocity.y < .2)), this.animationState.addCondition("into_climb", "climb", (() => r.XH.duration - this.intoClimbTime > 450)), this.animationState.addCondition("try_climb", "idle", (() => r.XH.duration - this.tryClimbTime > 300)), this.animationState.addCondition("jump_try_climb", "jump", (() => r.XH.duration - this.tryClimbTime > 200)), this.state.addCondition("Air", "Ground", (() => null !== this.ground)), this.state.addCondition("Ground", "Air", (() => !this.lockGround && null === this.ground)), this.state.addHook("Climb", "enter", (() => {
                        this.body.isStatic || (o.Body.setStatic(this.body, !0), o.Body.setVelocity(this.body, {
                            x: 0,
                            y: 0
                        })), this.stem && o.Body.setPosition(this.body, {
                            x: this.stem.position.x - 5,
                            y: this.stem.position.y - 20
                        }), this.body.velocity.x > -.2 ? (this.animationState.changeState("into_climb"), this.intoClimbTime = r.XH.duration) : this.animationState.changeState("climb")
                    })), this.state.addHook("Climb", "leave", (() => {
                        this.body.isStatic && o.Body.setStatic(this.body, !1), this.animationState.changeState("jump")
                    })), this.state.addHook("Air", "update", (() => {
                        o.Body.translate(this.body, {x: n.HT.deltaT * r.XH.stage.speed, y: 0})
                    })), this.state.addHook("Ground", "update", (() => {
                        o.Body.translate(this.body, {x: n.HT.deltaT * r.XH.stage.speed, y: 0})
                    })), this.state.addHook("Climb", "update", (() => {
                        this.stem ? o.Body.setPosition(this.body, {
                            x: this.stem.position.x - 5,
                            y: this.stem.position.y - 20
                        }) : this.state.changeState("Air")
                    })), this.facingState.addHook("right", "enter", (() => {
                        "into_climb" !== this.animationState.currentState && this.animationState.changeState(this.animationState.currentState)
                    })), this.facingState.addHook("left", "enter", (() => {
                        "into_climb" !== this.animationState.currentState && this.animationState.changeState(this.animationState.currentState)
                    }))
                }

                get position() {
                    return super.position
                }

                set position(e) {
                    super.position = e, o.Body.setPosition(this.body, {x: e[0], y: e[1]})
                }

                update() {
                    this.lockGround && ("idle" !== this.animationState.currentState && this.animationState.changeState("idle"), this.lockGroundEndAt && r.XH.duration < this.lockGroundEndAt ? o.Body.setPosition(this.body, {
                        x: this.ground.position.x,
                        y: this.ground.position.y + 50
                    }) : (this.lockGround = !1, o.Body.translate(this.body, {
                        x: 0,
                        y: 4
                    }), o.Body.setStatic(this.body, !1), this.body.collisionFilter.mask = 2, o.Body.setVelocity(this.body, {
                        x: 0,
                        y: 0
                    }))), this.lockStem && (this.lockStemEndAt && r.XH.duration < this.lockStemEndAt ? o.Body.setPosition(this.body, {
                        x: this.stem.position.x,
                        y: this.stem.position.y - 50
                    }) : (this.lockStem = !1, this.body.collisionFilter.mask = 2)), this.state.update(), this.animationState.update();
                    const e = this.body.position;
                    super.position = [Math.round(e.x), Math.round(e.y), 0], o.Body.setPosition(this.groundSensor, {
                        x: e.x + 0,
                        y: e.y + a
                    }), o.Body.setVelocity(this.groundSensor, {x: 0, y: 0})
                }
            }
        }, 5059: (e, t, i) => {
            "use strict";
            i.d(t, {O: () => S});
            var n = i(6472), o = i(8593), r = i(6010), s = i(9842);
            const a = [92, 20], l = [0, 26], c = [-5, -46];

            class d extends n.BV {
                leafBody;
                stemBody;
                sprite;
                disabled = !1;
                disableLeafAt = NaN;
                disableStemAt = NaN;
                disappearAt = NaN;
                leafDisableLock = !1;

                constructor({texture: e, atlas: t}) {
                    super();
                    const i = new n.Lx({texture: e, atlas: t});
                    this.sprite = i, this.object = i, this.scaling = [2, 2, 1], i.changeAnimation("idle"), this.leafBody = s.Bodies.rectangle(0, 0, a[0], a[1], {
                        isStatic: !0,
                        friction: .5,
                        frictionAir: .6,
                        label: "leaf_trap",
                        collisionFilter: {category: 2, mask: 15}
                    }), this.stemBody = s.Bodies.circle(0, 0, 30, {
                        isSensor: !0,
                        inertia: 1 / 0,
                        label: "stem_trap",
                        collisionFilter: {category: 2, mask: 1}
                    }), s.Composite.add(r.YB.engine.world, [this.leafBody, this.stemBody])
                }

                get position() {
                    return super.position
                }

                set position(e) {
                    super.position = e, this.leafBody && s.Body.setPosition(this.leafBody, {
                        x: e[0] + l[0],
                        y: e[1] + l[1]
                    })
                }

                update() {
                    if (!this.leafBody || !this.stemBody) return;
                    const e = this.leafBody.position,
                        t = [Math.round(e.x - l[0]), Math.round(e.y - l[1]), this.position[2]];
                    super.position = t, this.disabled ? (this.object && (s.Body.setPosition(this.stemBody, {
                        x: this.leafBody.position.x,
                        y: this.stemBody.position.y - 1
                    }), s.Body.setVelocity(this.stemBody, {
                        x: 0,
                        y: 0
                    })), this.disableLeafAt < r.XH.duration && (this.leafBody.collisionFilter.mask = 0), this.disableStemAt < r.XH.duration && (this.stemBody.collisionFilter.mask = 0), this.disappearAt < r.XH.duration && this.object && (this.destroy(), this.object = void 0)) : (s.Body.setPosition(this.stemBody, {
                        x: t[0] + c[0],
                        y: t[1] + c[1]
                    }), s.Body.setVelocity(this.stemBody, {x: 0, y: 0}))
                }

                triggerTrap() {
                    this.disableLeafAt = r.XH.duration + 200, this.disableStemAt = r.XH.duration + 300, this.disappearAt = r.XH.duration + (this.sprite?.animations.vanish.duration || 0) - 20, this.sprite?.changeAnimation("vanish"), this.leafDisableLock = !0, this.disabled = !0
                }

                destroy() {
                    super.destroy(), s.Composite.remove(r.YB.engine.world, this.leafBody), s.Composite.remove(r.YB.engine.world, this.stemBody)
                }
            }

            const u = [92, 20], p = [0, 26], h = [-8, -46];

            class f extends n.BV {
                leafBody;
                stemBody;
                sprite;
                state = new n.DV(["idle", "entering", "blowing", "leaving"]);
                _33 = new n.BV;
                _33Sprite;
                endFlyAt = NaN;
                intoDizzyAt = NaN;
                leafDisableLock = !1;
                leafDisableLockTime = NaN;
                adjectiveLeaving = !1;

                constructor({texture: e, atlas: t}) {
                    super();
                    const i = new n.Lx({texture: e, atlas: t});
                    this.sprite = i, this.object = i, this.scaling = [2, 2, 1], i.changeAnimation("idle"), this.leafBody = s.Bodies.rectangle(0, 0, u[0], u[1], {
                        isStatic: !0,
                        friction: .5,
                        frictionAir: .6,
                        label: "leaf_lucky",
                        collisionFilter: {category: 2, mask: 15}
                    }), this.stemBody = s.Bodies.circle(0, 0, 30, {
                        isSensor: !0,
                        inertia: 1 / 0,
                        label: "stem_lucky",
                        collisionFilter: {category: 2, mask: 1}
                    }), s.Composite.add(r.YB.engine.world, [this.leafBody, this.stemBody]);
                    const [o, a] = [r.am.get("/sprite/33.png"), r.am.get("/sprite/33.json")];
                    this._33Sprite = new n.Lx({
                        texture: o,
                        atlas: a
                    }), this._33Sprite.changeAnimation("fly"), this._33.position = [this.position[1] - 200 - 80, this.position[1] + 200, 0], this._33.object = this._33Sprite;
                    let l = 0;
                    this.state.addHook("entering", "enter", (() => {
                        this.addChild(this._33);
                        const e = this.position;
                        this.position = [e[0], e[1], -20], l = .18 - r.XH.stage.speed
                    })), this.state.addHook("entering", "update", (() => {
                        this._33.translate([4, -4, 0]), s.Body.translate(this.leafBody, {x: l * n.HT.deltaT, y: 0})
                    })), this.state.addHook("blowing", "enter", (() => {
                        r.XH.bonusSpeed = -.12, l = .18 - (r.XH.baseSpeed + r.XH.bonusSpeed), this.position[0] < 300 && (l += (300 - this.position[0]) / r.XH.luckyDuration), this._33Sprite.changeAnimation("blow")
                    })), this.state.addHook("blowing", "update", (() => {
                        s.Body.translate(this.leafBody, {x: l * n.HT.deltaT, y: 0})
                    })), this.state.addHook("leaving", "enter", (() => {
                        r.XH.bonusSpeed = 0, this.adjectiveLeaving ? this._33Sprite.changeAnimation("fly") : (this._33Sprite.changeAnimation("into_dizzy"), this.intoDizzyAt = r.XH.duration + this._33Sprite.animations.into_dizzy.duration)
                    })), this.state.addHook("leaving", "update", (() => {
                        "dizzy" === this._33Sprite.currentAnimation || this.adjectiveLeaving ? this._33.translate([-3, 3, 0]) : r.XH.duration > this.intoDizzyAt && this._33Sprite.changeAnimation("dizzy")
                    })), this.state.addCondition("entering", "blowing", (() => this._33.position[1] < 1)), this.state.addCondition("blowing", "leaving", (() => r.XH.duration > this.endFlyAt))
                }

                get position() {
                    return super.position
                }

                set position(e) {
                    super.position = e, this.leafBody && s.Body.setPosition(this.leafBody, {
                        x: e[0] + p[0],
                        y: e[1] + p[1]
                    })
                }

                update() {
                    r.XH.duration - this.leafDisableLockTime > 500 && (this.leafDisableLock = !1), this.state.update();
                    const e = this.leafBody.position,
                        t = [Math.round(e.x - p[0]), Math.round(e.y - p[1]), this.position[2]];
                    super.position = t, s.Body.setPosition(this.stemBody, {
                        x: t[0] + h[0],
                        y: t[1] + h[1]
                    }), s.Body.setVelocity(this.stemBody, {x: 0, y: 0})
                }

                triggerFly() {
                    this.endFlyAt = r.XH.duration + r.XH.luckyDuration, this.state.changeState("entering")
                }

                triggerEnd() {
                    this.endFlyAt = NaN, this.adjectiveLeaving = !0, this.state.changeState("leaving")
                }

                destroy() {
                    super.destroy(), s.Composite.remove(r.YB.engine.world, this.leafBody), s.Composite.remove(r.YB.engine.world, this.stemBody)
                }
            }

            const m = [{
                    t: "/sprite/shamrocks/shamrock1.png",
                    a: "/sprite/shamrocks/shamrock1.json"
                }, {
                    t: "/sprite/shamrocks/shamrock2.png",
                    a: "/sprite/shamrocks/shamrock2.json"
                }, {
                    t: "/sprite/shamrocks/shamrock3.png",
                    a: "/sprite/shamrocks/shamrock3.json"
                }, {t: "/sprite/shamrocks/shamrock4.png", a: "/sprite/shamrocks/shamrock4.json"}],
                g = [{t: "/sprite/shamrocks/shamrock_trap.png", a: "/sprite/shamrocks/shamrock_trap.json"}],
                y = [{t: "/sprite/shamrocks/shamrock_lucky.png", a: "/sprite/shamrocks/shamrock_lucky.json"}],
                v = [[92, 20], [102, 20], [122, 20], [94, 20]], x = [[0, 26], [0, 34], [0, 32], [0, 30]],
                b = [[-5, -46], [-8, -48], [-16, -50], [-14, -46]];

            class w extends n.BV {
                leafBody;
                stemBody;
                leafDisableLock = !1;
                leafDisableLockTime = NaN;
                stemOffset;
                leafSize;
                leafOffset;

                constructor(e) {
                    super(), this.stemOffset = e.stemOffset, this.leafSize = e.leafSize, this.leafOffset = e.leafOffset;
                    const t = new n.Lx({texture: e.texture, atlas: e.atlas});
                    t.changeAnimation("idle", e.startFrame), setTimeout((() => {
                        t.lastChange = 3e3
                    }), 34), this.object = t, this.scaling = [2, 2, 1], this.leafBody = s.Bodies.rectangle(0, 0, this.leafSize[0], this.leafSize[1], {
                        isStatic: !0,
                        friction: .5,
                        frictionAir: .6,
                        label: "leaf",
                        collisionFilter: {category: 2, mask: 15}
                    }), this.stemBody = s.Bodies.circle(0, 0, 30, {
                        isSensor: !0,
                        inertia: 1 / 0,
                        label: "stem",
                        collisionFilter: {category: 2, mask: 1}
                    }), s.Composite.add(r.YB.engine.world, [this.leafBody, this.stemBody])
                }

                get position() {
                    return super.position
                }

                set position(e) {
                    super.position = e, s.Body.setPosition(this.leafBody, {
                        x: e[0] + this.leafOffset[0],
                        y: e[1] + this.leafOffset[1]
                    })
                }

                update() {
                    r.XH.duration - this.leafDisableLockTime > 500 && (this.leafDisableLock = !1);
                    const e = this.leafBody.position,
                        t = [Math.round(e.x - this.leafOffset[0]), Math.round(e.y - this.leafOffset[1]), this.position[2]];
                    super.position = t, s.Body.setPosition(this.stemBody, {
                        x: t[0] + this.stemOffset[0],
                        y: t[1] + this.stemOffset[1]
                    }), s.Body.setVelocity(this.stemBody, {x: 0, y: 0})
                }

                destroy() {
                    super.destroy(), s.Composite.remove(r.YB.engine.world, this.leafBody), s.Composite.remove(r.YB.engine.world, this.stemBody)
                }
            }

            class S extends n.BV {
                normal = [];
                trap = [];
                normalNode;
                trapNode;
                luckyNode;
                normalGenIndex = 0;
                lastZIndex = -40;
                lastAddType = "normal";
                normalImgs = [];
                normalAtlas = [];
                trapTexture = [];
                trapAtlas = [];
                luckyTexture = [];
                luckyAtlas = [];
                allowLuckyAfter = 15e3;

                constructor() {
                    super(), this.normalNode = new n.BV, this.trapNode = new n.BV, this.luckyNode = new n.BV;
                    const [e, t] = [m.map((e => r.am.get(e.t))), m.map((e => r.am.get(e.a)))], [i, o] = [g.map((e => r.am.get(e.t))), g.map((e => r.am.get(e.a)))], [s, a] = [y.map((e => r.am.get(e.t))), y.map((e => r.am.get(e.a)))];
                    this.normalImgs = e, this.normalAtlas = t, this.trapTexture = i, this.trapAtlas = o, this.luckyTexture = s, this.luckyAtlas = a, this.addChild(this.normalNode), this.addChild(this.trapNode), this.addChild(this.luckyNode)
                }

                addInitial() {
                    [{type: 0, start: 1, position: [-100, 20]}, {type: 3, start: 5, position: [88, -60]}, {
                        type: 2,
                        start: 5,
                        position: [237, 25]
                    }, {type: 3, start: 5, position: [420, 15]}, {type: 1, start: 5, position: [613, -130]}, {
                        type: 0,
                        start: 5,
                        position: [723, -4]
                    }, {type: 2, start: 5, position: [885, 68]}].forEach((e => {
                        const t = new w({
                            texture: this.normalImgs[e.type],
                            atlas: this.normalAtlas[e.type],
                            stemOffset: b[e.type],
                            leafSize: v[e.type],
                            leafOffset: x[e.type],
                            startFrame: e.start
                        });
                        t.position = [e.position[0], e.position[1], -40], this.normalNode.addChild(t)
                    })), this.lastAddType = "normal"
                }

                reset() {
                    this.allowLuckyAfter = 15e3, this.normalNode.clear(), this.trapNode.clear(), this.luckyNode.clear(), this.addInitial()
                }

                genNormal() {
                    const e = Math.floor(4 * Math.random());
                    return new w({
                        texture: this.normalImgs[e],
                        atlas: this.normalAtlas[e],
                        stemOffset: b[e],
                        leafSize: v[e],
                        leafOffset: x[e],
                        startFrame: Math.floor(6 * Math.random())
                    })
                }

                genTrap() {
                    return new d({texture: this.trapTexture[0], atlas: this.trapAtlas[0]})
                }

                genLucky() {
                    return new f({texture: this.luckyTexture[0], atlas: this.luckyAtlas[0]})
                }

                get lastNodePosition() {
                    return {
                        normal: this.normalNode.children[this.normalNode.children.length - 1],
                        trap: this.trapNode.children[this.trapNode.children.length - 1],
                        lucky: this.luckyNode.children[this.luckyNode.children.length - 1]
                    }[this.lastAddType]?.position || [0, 0, 0]
                }

                addNext() {
                    const e = [50, 200], t = [-100, 100], i = this.lastNodePosition;
                    if (!i) return;
                    let n = (0, o.rs)(e);
                    const s = (0, o.rs)(t), a = Math.random();
                    this.lastZIndex = this.lastZIndex + 1, this.lastZIndex > -30 && (this.lastZIndex = -40, n = Math.max(150, n));
                    let l = 0;
                    for (let e = 0; e < r.ed.length && !(r.ed[e].time > r.XH.duration); e++) l = e;
                    const c = r.ed[l];
                    if (a < c.trap) {
                        "lucky" === this.lastAddType && (n = Math.max(150, n));
                        const e = this.genTrap();
                        n += i[0], e.position = [n, s, this.lastZIndex], this.trapNode.addChild(e), this.lastAddType = "trap"
                    } else if (a < c.trap + c.lucky && r.XH.duration > this.allowLuckyAfter) {
                        const e = this.genLucky();
                        n += i[0], e.position = [n, s, this.lastZIndex], this.luckyNode.addChild(e), this.lastAddType = "lucky", this.allowLuckyAfter = r.XH.duration + 3e4
                    } else {
                        "trap" !== this.lastAddType && "lucky" !== this.lastAddType || (n = Math.max(150, n)), n += i[0];
                        const e = this.genNormal();
                        e.position = [n, s, this.lastZIndex], this.normalNode.addChild(e), this.lastAddType = "normal"
                    }
                    if (s > 80 || s < -60) {
                        this.lastZIndex = this.lastZIndex + .1;
                        let i = (0, o.rs)(e);
                        "trap" !== this.lastAddType && "lucky" !== this.lastAddType || (i = Math.max(150, i)), i += n;
                        const r = (0, o.rs)(t), s = this.genNormal();
                        s.position = [i, r, this.lastZIndex], this.normalNode.addChild(s), this.lastAddType = "normal"
                    }
                }

                update() {
                    for (; this.normalNode.children[0]?.position[0] < -1e3;) this.normalNode.children.shift()?.destroy();
                    for (; this.trapNode.children[0]?.position[0] < -1e3;) this.trapNode.children.shift()?.destroy();
                    for (; this.luckyNode.children[0]?.position[0] < -1e3;) this.luckyNode.children.shift()?.destroy();
                    this.lastNodePosition[0] < 1100 && this.addNext(), this.normalNode.children.concat(this.trapNode.children).forEach(((e, t) => {
                        s.Body.translate(e.leafBody, {x: 0, y: .5 * Math.sin(n.HT.time / 400 + 1.23 * t)})
                    })), this.all.forEach(((e, t) => {
                        s.Body.translate(e.leafBody, {x: n.HT.deltaT * r.XH.translateSpeed, y: 0})
                    }))
                }

                get all() {
                    return this.normalNode.children.concat(this.trapNode.children).concat(this.luckyNode.children)
                }

                get traps() {
                    return this.trapNode.children
                }

                get luckies() {
                    return this.luckyNode.children
                }
            }
        }, 3654: (e, t, i) => {
            "use strict";
            i.d(t, {D: () => l});
            var n = i(6472), o = i(8593), r = i(6010);
            const s = [{t: "/sprite/wind/wind1.png", a: "/sprite/wind/wind1.json"}, {
                t: "/sprite/wind/wind2.png",
                a: "/sprite/wind/wind2.json"
            }, {t: "/sprite/wind/wind3.png", a: "/sprite/wind/wind3.json"}, {
                t: "/sprite/wind/wind4.png",
                a: "/sprite/wind/wind4.json"
            }];

            class a extends n.BV {
                duration;

                constructor(e) {
                    super();
                    const {texture: t, atlas: i} = e, o = new n.Lx({texture: t, atlas: i});
                    this.object = o, this.scaling = [2, 2, 1], this.duration = o.animations.idle.duration
                }
            }

            class l extends n.BV {
                currentEnd = 0;
                nextStart = 0;
                winds = [];

                constructor() {
                    super();
                    const [e, t] = [s.map((e => r.am.get(e.t))), s.map((e => r.am.get(e.a)))];
                    e.forEach(((e, i) => {
                        const n = new a({texture: e, atlas: t[i]});
                        n.position = [0, 0, .5 + .1 * i], this.winds.push(n)
                    }))
                }

                update() {
                    if (n.HT.time > this.nextStart) {
                        const e = Math.floor((0, o.rs)([0, this.winds.length])), t = this.winds[e];
                        t.object.changeAnimation("idle"), this.currentEnd = n.HT.time + t.duration, this.nextStart = this.currentEnd + (0, o.rs)([500, 1e3]), this.addChild(t)
                    } else n.HT.time > this.currentEnd && this.children?.length && this.children.shift()
                }

                reset() {
                    this.children = [], this.currentEnd = 0, this.nextStart = 3e3 + (0, o.rs)([500, 1e3])
                }

                destroy() {
                    super.destroy(), this.winds.forEach((e => e.destroy()))
                }
            }
        }, 4634: (e, t, i) => {
            "use strict";
            i.d(t, {B: () => p});
            var n = i(8593), o = i(9669), r = i.n(o), s = i(6010);
            const a = async (e, t) => {
                const i = new FontFace(e, `url(${t})`);
                return await i.load().then((() => document.fonts.add(i))), i
            }, l = async () => {
                await Promise.all([a("FZLanTYJW", s.fF ? "/FZLanTYJW.ttf" : "/wind-game/activity.hdslb.com/blackboard/static/20220310/00979505aec5edd6e5c2f8c096fa0f62/eg3s0Wl9p3.ttf"), a("HighPixel7", s.fF ? "/HighPixel7-08jv.ttf" : "/wind-game/activity.hdslb.com/blackboard/static/20220310/00979505aec5edd6e5c2f8c096fa0f62/cKILLYSZ6K.ttf")]), c = !0
            };
            let c = !1, d = null;
            setTimeout((() => {
                c || d || (d = l())
            }), 15e3);
            let u = !1;
            const p = async (e, t) => {
                if (u) return;
                u = !0;
                let i = window.__BiliUser__?.cache?.data?.isLogin ? window.__BiliUser__?.cache?.data : null;
                if (!i) try {
                    const e = await r().get("https://api.bilibili.com/x/web-interface/nav", {withCredentials: !0}).then((e => e.data?.data));
                    e.isLogin && (i = e)
                } catch (e) {
                }
                if (!i) return window.__BiliUser__?.quickLogin(), void (u = !1);
                const o = 'bold 30px "FZLanTYJW","PingFang SC","Microsoft YaHei", sans-serif';
                c || (d || (d = l()), await d);
                const s = document.createElement("canvas");
                s.width = 720, s.height = 935;
                const a = s.getContext("2d");
                try {
                    const e = await (0, n.po)("/wind-game/i0.hdslb.com/bfs/activity-plat/static/20220317/00979505aec5edd6e5c2f8c096fa0f62/e0y0URDBAU.png");
                    a.drawImage(e, 0, 0, e.naturalWidth, e.naturalHeight, 0, 0, 720, 935)
                } catch (e) {
                }
                a.font = o, a.fillStyle = "#324232", a.strokeStyle = "#fff", a.lineWidth = 6, a.strokeText("在风叶穿行挑战中", 54, 96), a.fillText("在风叶穿行挑战中", 54, 96);
                const p = i.uname;
                a.fillStyle = "#ec7100", a.strokeText(p, 54, 140), a.fillText(p, 54, 140);
                const h = a.measureText(p).width;
                a.fillStyle = "#324232", a.strokeText("得分：", 54 + h + 8, 140), a.fillText("得分：", 54 + h + 8, 140), a.font = '200px "HighPixel7", sans-serif', a.fillStyle = "#E35200", a.lineWidth = 10, a.strokeText(e.toString(), 54, 360), a.fillText(e.toString(), 54, 360), a.lineWidth = 6;
                const f = t.r1.replace(/<\/?span>|<br\/>|恭喜你|^你/g, "");
                a.font = o, a.fillStyle = "#324232", a.strokeText(f, 54, 440), a.fillText(f, 54, 440);
                const m = t.r2.replace(/<\/?span>|<br\/>/g, "");
                if (m.length > 16) {
                    let e = "，" === m[14] ? 13 : 14;
                    const t = m.slice(0, e);
                    a.strokeText(t, 54, 484), a.fillText(t, 54, 484);
                    const i = m.slice(e);
                    a.strokeText(i, 54, 528), a.fillText(i, 54, 528)
                } else a.strokeText(m, 54, 484), a.fillText(m, 54, 484);
                a.strokeText(p, 132, 720), a.fillText(p, 132, 720);
                try {
                    const e = i.face, t = await (0, n.po)(e), o = 36, r = 36 + o, s = 668 + o;
                    a.beginPath(), a.arc(r, s, o, 0, 2 * Math.PI, !1), a.closePath(), a.stroke(), a.save(), a.clip(), a.drawImage(t, 0, 0, t.naturalWidth, t.naturalHeight, 36, 668, 72, 72), a.restore()
                } catch (e) {
                }
                const g = document.createElement("div");
                Object.assign(g.style, {
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    top: 0,
                    left: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    zIndex: 3e3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }), Object.assign(s.style, {borderRadius: "8px", width: "360px", height: "468px"}), g.appendChild(s);
                const y = document.createElement("div");
                Object.assign(y.style, {
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative"
                });
                const v = document.createElement("div");
                Object.assign(v.style, {display: "flex", justifyContent: "center"});
                const x = "http://www.w3.org/2000/svg", b = (() => {
                    const e = document.createElement("div");
                    Object.assign(e.style, {
                        width: "76px",
                        height: "68px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer",
                        marginRight: "40px"
                    });
                    const t = document.createElementNS(x, "svg");
                    Object.assign(t.style, {
                        width: "45px",
                        height: "44px"
                    }), t.setAttributeNS(x, "viewBox", "0 0 45 44"), t.setAttributeNS(x, "width", "45"), t.setAttributeNS(x, "height", "44"), t.setAttributeNS(x, "fill", "none"), t.innerHTML = '\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 0C10.35 0 0.5 9.85 0.5 22C0.5 34.15 10.35 44 22.5 44C34.65 44 44.5 34.15 44.5 22C44.5 9.85 34.65 0 22.5 0Z" fill="#5A62C7"/>\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.5723 19.5522H26.8603C26.3483 19.5522 25.9333 19.1372 25.9333 18.6262V14.5152C25.9333 13.7212 25.2843 13.0732 24.4913 13.0732H20.1643C19.3713 13.0732 18.7213 13.7212 18.7213 14.5152V18.6262C18.7213 19.1372 18.3073 19.5522 17.7963 19.5522H15.4273C14.5683 19.5522 14.1733 20.6222 14.8253 21.1812L21.6423 27.0212C22.1353 27.4442 22.8643 27.4442 23.3573 27.0212L30.1753 21.1812C30.8273 20.6222 30.4313 19.5522 29.5723 19.5522Z" fill="white" stroke="white" stroke-width="2"/>\n    <path d="M17.5 31H27.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n  ';
                    const i = document.createElement("div");
                    return Object.assign(i.style, {
                        color: "#fff",
                        marginTop: "8px",
                        fontSize: "14px",
                        lineHeight: "16px"
                    }), i.innerText = "保存至本地", e.appendChild(t), e.appendChild(i), e
                })(), w = (() => {
                    const e = document.createElement("div");
                    Object.assign(e.style, {
                        width: "76px",
                        height: "68px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer"
                    });
                    const t = document.createElementNS(x, "svg");
                    Object.assign(t.style, {
                        width: "45px",
                        height: "44px"
                    }), t.setAttributeNS(x, "viewBox", "0 0 45 44"), t.setAttributeNS(x, "width", "45"), t.setAttributeNS(x, "height", "44"), t.setAttributeNS(x, "fill", "none"), t.innerHTML = '\n      <circle cx="22.5" cy="22" r="22" fill="#FB7299"/>\n      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 16C16.5 13.2386 18.7386 11 21.5 11V21C18.7386 21 16.5 18.7614 16.5 16ZM28.5 28C28.5 25.2386 26.2614 23 23.5 23V33C26.2614 33 28.5 30.7614 28.5 28ZM23.5 21C23.5 18.2386 25.7386 16 28.5 16C31.2614 16 33.5 18.2386 33.5 21H23.5ZM16.5 28C13.7386 28 11.5 25.7614 11.5 23H21.5C21.5 25.7614 19.2614 28 16.5 28Z" fill="white"/>\n      <path d="M21.5 11H22C22 10.7239 21.7761 10.5 21.5 10.5V11ZM21.5 21V21.5C21.7761 21.5 22 21.2761 22 21H21.5ZM23.5 23V22.5C23.2239 22.5 23 22.7239 23 23H23.5ZM23.5 33H23C23 33.2761 23.2239 33.5 23.5 33.5V33ZM23.5 21H23C23 21.2761 23.2239 21.5 23.5 21.5V21ZM33.5 21V21.5C33.7761 21.5 34 21.2761 34 21H33.5ZM11.5 23V22.5C11.2239 22.5 11 22.7239 11 23H11.5ZM21.5 23H22C22 22.7239 21.7761 22.5 21.5 22.5V23ZM21.5 10.5C18.4624 10.5 16 12.9624 16 16H17C17 13.5147 19.0147 11.5 21.5 11.5V10.5ZM22 21V11H21V21H22ZM16 16C16 19.0376 18.4624 21.5 21.5 21.5V20.5C19.0147 20.5 17 18.4853 17 16H16ZM23.5 23.5C25.9853 23.5 28 25.5147 28 28H29C29 24.9624 26.5376 22.5 23.5 22.5V23.5ZM24 33V23H23V33H24ZM28 28C28 30.4853 25.9853 32.5 23.5 32.5V33.5C26.5376 33.5 29 31.0376 29 28H28ZM28.5 15.5C25.4624 15.5 23 17.9624 23 21H24C24 18.5147 26.0147 16.5 28.5 16.5V15.5ZM34 21C34 17.9624 31.5376 15.5 28.5 15.5V16.5C30.9853 16.5 33 18.5147 33 21H34ZM23.5 21.5H33.5V20.5H23.5V21.5ZM11 23C11 26.0376 13.4624 28.5 16.5 28.5V27.5C14.0147 27.5 12 25.4853 12 23H11ZM21.5 22.5H11.5V23.5H21.5V22.5ZM16.5 28.5C19.5376 28.5 22 26.0376 22 23H21C21 25.4853 18.9853 27.5 16.5 27.5V28.5Z" fill="white"/>\n    ';
                    const i = document.createElement("div");
                    return Object.assign(i.style, {
                        color: "#fff",
                        marginTop: "8px",
                        fontSize: "14px",
                        lineHeight: "16px"
                    }), i.innerText = "分享至动态", e.appendChild(t), e.appendChild(i), e
                })();
                let S = !1;
                b.addEventListener("click", (async () => {
                    if (!S) {
                        S = !0, (0, n.SZ)({
                            type: "click",
                            c: "banner_game",
                            d: "share_page",
                            e: "save"
                        }, {msg: JSON.stringify({id: 0, game: "叶间穿行"})});
                        try {
                            const e = await new Promise((e => s.toBlob((t => e(t))))), t = URL.createObjectURL(e),
                                i = document.createElement("a");
                            i.href = t, i.download = "share.png", document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(t)
                        } catch (e) {
                        }
                        S = !1
                    }
                }));
                let A = !1;
                w.addEventListener("click", (async () => {
                    if (!A) {
                        A = !0, (0, n.SZ)({
                            type: "click",
                            c: "banner_game",
                            d: "share_page",
                            e: "share_to_feed"
                        }, {msg: JSON.stringify({id: 0, game: "叶间穿行"})});
                        try {
                            await _()
                        } catch (e) {
                        }
                        A = !1
                    }
                })), v.appendChild(b), v.appendChild(w), y.appendChild(v);
                const T = (() => {
                    const e = document.createElementNS(x, "svg");
                    return Object.assign(e.style, {
                        position: "absolute",
                        width: "45px",
                        height: "44px",
                        top: "-496px",
                        transform: "translateX(240px)",
                        cursor: "pointer"
                    }), e.setAttributeNS(x, "viewBox", "0 0 41 40"), e.setAttributeNS(x, "width", "41"), e.setAttributeNS(x, "height", "40"), e.setAttributeNS(x, "fill", "none"), e.innerHTML = '\n      <circle cx="20.5" cy="20" r="19.75" fill="white" fill-opacity="0.2" stroke="white" stroke-width="0.5"/>\n      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5104 21.0711L13.9697 15.5303C13.6768 15.2374 13.6768 14.7626 13.9697 14.4697C14.2626 14.1768 14.7374 14.1768 15.0303 14.4697L20.5711 20.0104L26.1118 14.4697C26.4047 14.1768 26.8796 14.1768 27.1725 14.4697C27.4654 14.7626 27.4654 15.2374 27.1725 15.5303L21.6317 21.0711L27.1725 26.6118C27.4654 26.9047 27.4654 27.3796 27.1725 27.6725C26.8796 27.9654 26.4047 27.9654 26.1118 27.6725L20.5711 22.1317L15.0303 27.6725C14.7374 27.9654 14.2626 27.9654 13.9697 27.6725C13.6768 27.3796 13.6768 26.9047 13.9697 26.6118L19.5104 21.0711Z" fill="#FEFEFE"/>\n    ', e
                })();
                T.addEventListener("click", (() => {
                    document.body.removeChild(g), u = !1
                })), y.append(T), g.appendChild(y), document.body.appendChild(g);
                const _ = async () => {
                    const t = await new Promise((e => s.toBlob((t => e(t))))), i = await (0, n.Ti)(t),
                        o = new URLSearchParams;
                    o.append("text", "在风叶穿行挑战中，我的得分是：" + e), o.append("img_src", i.location), o.append("img_width", 720..toString()), o.append("img_height", 935..toString()), o.append("img_size", t.size.toString());
                    const r = document.createElement("iframe");
                    Object.assign(r.style, {
                        position: "fixed",
                        width: "100vw",
                        height: "100vh",
                        top: "0",
                        left: "0",
                        border: "none",
                        zIndex: "3000"
                    }), r.onload = () => {
                        document.body.removeChild(g)
                    }, r.src = "/wind-game/www.bilibili.com/blackboard/fe/activity-Jxv8XB9Wcp.html?" + o.toString(), document.body.appendChild(r);
                    const a = e => {
                        "close-share-pub" === e.data.type && (e.data.id && (0, n.SZ)({
                            type: "click",
                            c: "banner_game",
                            d: "share_page",
                            e: "share_to_feed_publish"
                        }, {msg: JSON.stringify({id: 0, game: "叶间穿行"})}), setTimeout((() => {
                            r.remove(), u = !1
                        }), 1e3), window.removeEventListener("message", a))
                    };
                    window.addEventListener("message", a)
                }
            }
        }, 8593: (e, t, i) => {
            "use strict";
            i.d(t, {po: () => r, rs: () => s, Ti: () => a, SZ: () => l});
            var n = i(9669), o = i.n(n);

            function r(e) {
                const t = new Image;
                return t.crossOrigin = "anonymous", t.src = e, new Promise(((e, i) => {
                    t.onload = () => e(t), t.onerror = i
                }))
            }

            const s = e => e[0] + Math.random() * (e[1] - e[0]), a = e => {
                const t = {
                        "x-icon": "ico",
                        jpeg: "jpg",
                        "x-portable-bitmap": "bmp",
                        pict: "pic",
                        "x-macpaint": "pnt",
                        "x-portable-pixmap": "ppm",
                        "x-rgb": "rgb",
                        "svg+xml": "svg"
                    }, i = new FormData,
                    n = document.cookie.split(";").map((e => e.trim())).find((e => 0 === e.indexOf("bili_jct=")))?.replace("bili_jct=", "");
                return i.append("csrf", n || ""), i.append("bucket", "active"), i.append("file", e, "UPLOAD_IMG_" + +new Date + "." + (e => {
                    const i = e.replace("image/", "");
                    return t[i] || i
                })(e.type)), o().post("https:////api.bilibili.com/x/upload/web/image", i, {withCredentials: !0}).then((e => e.data?.data))
            }, l = (e = {}, t = {}) => {
                const i = e.spm_id || document.getElementsByTagName("meta").spm_prefix?.content || "0.0",
                    n = e.c || e.CBlock, o = e.d || e.DBlock, r = e.e, s = r ? `${i}.${n}.${o}.${r}` : `${i}.${n}.${o}`;
                if (!e.type) throw new Error("report need type");
                if (window.MReporter) {
                    const {spm_id: i, type: s} = e, a = r ? `${n}.${o}.${r}` : `${n}.${o}`;
                    window.MReporter?.[s]({spmBiz: i, evt: a, msg: t.msg})
                } else t.spm_id = s, window.reportObserver && window.reportObserver.reportCustomData && window.reportObserver.reportCustomData(e.type, t)
            }
        }, 8261: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nuniform int circle;\n\nin vec2 position;\nout vec4 fragColor;\n\nvoid main() {\n    // vec2 uv = position + 0.5;\n    if(circle > 0) {\n        float d = length(position);\n        if(d > .5) {\n            discard;\n        }\n    }\n\n    fragColor = vec4(vec3(0.), 0.5);\n}\n"
        }, 755: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nlayout(location = 0) in vec2 i_position;\n\nuniform mat4 mvp_matrix;\n\nout vec2 position;\n\nvoid main() {\n  position = i_position;\n  gl_Position = mvp_matrix * vec4(position, 0., 1.);\n}\n"
        }, 2294: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nuniform sampler2D u_Sprite;\n\nin float v_Life;\nin float v_Age;\nin vec2 v_Uv;\nout vec4 o_FragColor;\n\nvoid main() {\n  // o_FragColor = vec4(v_Uv, 0., 1.);\n  o_FragColor = texture(u_Sprite, v_Uv);\n  // o_FragColor.a = o_FragColor.a * (1. - step(v_Life, v_Age)); // * (1. - v_Age/v_Life)\n}\n"
        }, 675: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nlayout(location = 0) in vec3 i_Position;\nlayout(location = 1) in vec3 i_Velocity;\nlayout(location = 2) in float i_Life;\nlayout(location = 3) in float i_Age;\nlayout(location = 4) in vec2 i_Coord;\n\nout float v_Life;\nout float v_Age;\nout vec2 v_Uv;\n\nuniform vec2 u_Size;\nuniform mat4 u_ViewMatrix;\nuniform mat4 u_ProjectionMatrix;\n\nvoid main() {\n  vec3 cameraRight = vec3(u_ViewMatrix[0].x, u_ViewMatrix[1].x, u_ViewMatrix[2].x);\n  vec3 cameraUp = vec3(u_ViewMatrix[0].y, u_ViewMatrix[1].y, u_ViewMatrix[2].y);\n  vec3 position = i_Position + (cameraRight * i_Coord.x * u_Size.x + cameraUp * i_Coord.y * u_Size.y);\n\n  v_Age = i_Age;\n  v_Life = i_Life;\n  v_Uv = (i_Coord + 1.) / 2.;\n  gl_Position = u_ProjectionMatrix * u_ViewMatrix * vec4(position, 1.0);\n}\n"
        }, 56: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nuniform sampler2D spirte_texture;\nuniform vec2 repeat;\nuniform vec2 uv_offset;\nuniform vec2 half_pixel;\n\nin vec2 position;\nout vec4 fragColor;\n\nvoid main() {\n  vec2 uv = half_pixel + (position + 0.5) * (1. - half_pixel * 2.);\n  uv.y = 1. - uv.y;\n  uv = fract(fract(uv * repeat) + uv_offset);\n  fragColor = texture(spirte_texture, uv);\n  // fragColor = vec4(uv, 0.5, 1.);\n}\n"
        }, 2604: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nlayout(location = 0) in vec2 i_position;\n\nuniform mat4 mvp_matrix;\n\nout vec2 position;\n\nvoid main() {\n  position = i_position;\n  gl_Position = mvp_matrix * vec4(position, 0., 1.);\n}\n"
        }, 2430: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nuniform sampler2D spirte_texture;\n\nuniform vec4 sprite_position;\nuniform vec4 sprite_box;\nuniform vec2 half_pixel;\n\nin vec2 position;\nout vec4 fragColor;\n\nvoid main() {\n  vec2 uv = half_pixel + (position + 0.5) * (1. - half_pixel * 2.);\n  uv.y = 1. - uv.y;\n  if(uv.x < sprite_box.x || uv.x > (sprite_box.x + sprite_box.z) || uv.y < sprite_box.y || uv.y > (sprite_box.y + sprite_box.w)) {\n    // fragColor = vec4(0.0, 0.4, 0.5, 1.0);\n    discard;\n  } else {\n    vec2 luv = (uv - sprite_box.xy) / sprite_box.zw;\n    vec2 suv = sprite_position.xy + luv * sprite_position.zw;\n    fragColor = texture(spirte_texture, suv);\n  }\n}\n"
        }, 1436: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nlayout(location = 0) in vec2 i_position;\n\nuniform mat4 mvp_matrix;\n\nout vec2 position;\n\nvoid main() {\n  position = i_position;\n  gl_Position = mvp_matrix * vec4(position, 0., 1.);\n}\n"
        }, 8157: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nuniform float pct;\nuniform vec2 center;\nuniform vec2 size;\n\nin vec2 position;\nout vec4 fragColor;\n\nvoid main() {\n    // vec2 uv = position;\n    // uv.x = uv.x * (size.x / size.y);\n\n    vec2 uv = position * size;\n    float d = length(uv - center);\n    if(d / (size.x - 600.) > 1. - pct) {\n        fragColor = vec4(0., 0., 0., 1.);\n    } else {\n        fragColor = vec4(0., 0., 0., 0.);\n    }\n\n}\n"
        }, 1525: e => {
            "use strict";
            e.exports = "#version 300 es\nprecision mediump float;\n\nlayout(location = 0) in vec2 i_position;\n\nuniform mat4 mvp_matrix;\n\nout vec2 position;\n\nvoid main() {\n    position = i_position;\n    gl_Position = mvp_matrix * vec4(position, 0., 1.);\n}\n"
        }
    }, a = {};

    function l(e) {
        var t = a[e];
        if (void 0 !== t) return t.exports;
        var i = a[e] = {exports: {}};
        return s[e].call(i.exports, i, i.exports, l), i.exports
    }

    e = "function" == typeof Symbol ? Symbol("webpack then") : "__webpack_then__", t = "function" == typeof Symbol ? Symbol("webpack exports") : "__webpack_exports__", i = "function" == typeof Symbol ? Symbol("webpack error") : "__webpack_error__", n = e => {
        e && (e.forEach((e => e.r--)), e.forEach((e => e.r-- ? e.r++ : e())))
    }, o = e => !--e.r && e(), r = (e, t) => e ? e.push(t) : o(t), l.a = (s, a, l) => {
        var c, d, u, p = l && [], h = s.exports, f = !0, m = !1, g = (t, i, n) => {
            m || (m = !0, i.r += t.length, t.map(((t, o) => t[e](i, n))), m = !1)
        }, y = new Promise(((e, t) => {
            u = t, d = () => (e(h), n(p), p = 0)
        }));
        y[t] = h, y[e] = (e, t) => {
            if (f) return o(e);
            c && g(c, e, t), r(p, e), y.catch(t)
        }, s.exports = y, a((s => {
            var a;
            c = (s => s.map((s => {
                if (null !== s && "object" == typeof s) {
                    if (s[e]) return s;
                    if (s.then) {
                        var a = [];
                        s.then((e => {
                            l[t] = e, n(a), a = 0
                        }), (e => {
                            l[i] = e, n(a), a = 0
                        }));
                        var l = {};
                        return l[e] = (e, t) => (r(a, e), s.catch(t)), l
                    }
                }
                var c = {};
                return c[e] = e => o(e), c[t] = s, c
            })))(s);
            var l = () => c.map((e => {
                if (e[i]) throw e[i];
                return e[t]
            })), d = new Promise(((e, t) => {
                (a = () => e(l)).r = 0, g(c, a, t)
            }));
            return a.r ? d : l()
        }), (e => (e && u(y[i] = e), d()))), f = !1
    }, l.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return l.d(t, {a: t}), t
    }, l.d = (e, t) => {
        for (var i in t) l.o(t, i) && !l.o(e, i) && Object.defineProperty(e, i, {enumerable: !0, get: t[i]})
    }, l.g = function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), l.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), l(3607)
})();
//# sourceMappingURL=main.js.map