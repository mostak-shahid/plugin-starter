/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@remix-run/router/dist/router.js":
/*!*******************************************************!*\
  !*** ./node_modules/@remix-run/router/dist/router.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbortedDeferredError: () => (/* binding */ AbortedDeferredError),
/* harmony export */   Action: () => (/* binding */ Action),
/* harmony export */   IDLE_BLOCKER: () => (/* binding */ IDLE_BLOCKER),
/* harmony export */   IDLE_FETCHER: () => (/* binding */ IDLE_FETCHER),
/* harmony export */   IDLE_NAVIGATION: () => (/* binding */ IDLE_NAVIGATION),
/* harmony export */   UNSAFE_DEFERRED_SYMBOL: () => (/* binding */ UNSAFE_DEFERRED_SYMBOL),
/* harmony export */   UNSAFE_DeferredData: () => (/* binding */ DeferredData),
/* harmony export */   UNSAFE_ErrorResponseImpl: () => (/* binding */ ErrorResponseImpl),
/* harmony export */   UNSAFE_convertRouteMatchToUiMatch: () => (/* binding */ convertRouteMatchToUiMatch),
/* harmony export */   UNSAFE_convertRoutesToDataRoutes: () => (/* binding */ convertRoutesToDataRoutes),
/* harmony export */   UNSAFE_getResolveToMatches: () => (/* binding */ getResolveToMatches),
/* harmony export */   UNSAFE_invariant: () => (/* binding */ invariant),
/* harmony export */   UNSAFE_warning: () => (/* binding */ warning),
/* harmony export */   createBrowserHistory: () => (/* binding */ createBrowserHistory),
/* harmony export */   createHashHistory: () => (/* binding */ createHashHistory),
/* harmony export */   createMemoryHistory: () => (/* binding */ createMemoryHistory),
/* harmony export */   createPath: () => (/* binding */ createPath),
/* harmony export */   createRouter: () => (/* binding */ createRouter),
/* harmony export */   createStaticHandler: () => (/* binding */ createStaticHandler),
/* harmony export */   defer: () => (/* binding */ defer),
/* harmony export */   generatePath: () => (/* binding */ generatePath),
/* harmony export */   getStaticContextFromError: () => (/* binding */ getStaticContextFromError),
/* harmony export */   getToPathname: () => (/* binding */ getToPathname),
/* harmony export */   isDeferredData: () => (/* binding */ isDeferredData),
/* harmony export */   isRouteErrorResponse: () => (/* binding */ isRouteErrorResponse),
/* harmony export */   joinPaths: () => (/* binding */ joinPaths),
/* harmony export */   json: () => (/* binding */ json),
/* harmony export */   matchPath: () => (/* binding */ matchPath),
/* harmony export */   matchRoutes: () => (/* binding */ matchRoutes),
/* harmony export */   normalizePathname: () => (/* binding */ normalizePathname),
/* harmony export */   parsePath: () => (/* binding */ parsePath),
/* harmony export */   redirect: () => (/* binding */ redirect),
/* harmony export */   redirectDocument: () => (/* binding */ redirectDocument),
/* harmony export */   resolvePath: () => (/* binding */ resolvePath),
/* harmony export */   resolveTo: () => (/* binding */ resolveTo),
/* harmony export */   stripBasename: () => (/* binding */ stripBasename)
/* harmony export */ });
/**
 * @remix-run/router v1.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////
/**
 * Actions represent the type of change to a location value.
 */
var Action;
(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */
  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */
  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */
function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options;
  let entries; // Declare so we can access from createMemoryLocation
  entries = initialEntries.map((entry, index) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : undefined));
  let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  let action = Action.Pop;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 1
        });
      }
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 0
        });
      }
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({
          action,
          location: nextLocation,
          delta
        });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window.location;
    return createLocation("", {
      pathname,
      search,
      hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createBrowserHref(window, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */
function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createHashLocation(window, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window.location.hash.substr(1));
    // Hash URL should always have a leading / just like window.location.pathname
    // does, so if an app ends up at a route like /#something then we add a
    // leading slash so all of our path-matching behaves the same as if it would
    // in a browser router.  This is particularly important when there exists a
    // root splat route (<Route path="*">) since that matches internally against
    // "/*" and we'd expect /#something to 404 in a hash router app.
    if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
      pathname = "/" + pathname;
    }
    return createLocation("", {
      pathname,
      search,
      hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createHashHref(window, to) {
    let base = window.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);
    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience, so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * For browser-based histories, we combine the state and key into an object
 */
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
/**
 * Creates a Location object with a unique key from the given Path
 */
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex();
  // Index should only be null when we initialize. If not, it's because the
  // user called history.pushState or history.replaceState directly, in which
  // case we should log a warning as it will result in bugs.
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    // try...catch because iOS limits us to 100 pushState calls :/
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      // If the exception is because `state` can't be serialized, let that throw
      // outwards just like a replace call would so the dev knows the cause
      // https://html.spec.whatwg.org/multipage/nav-history-apis.html#shared-history-push/replace-state-steps
      // https://html.spec.whatwg.org/multipage/structured-data.html#structuredserializeinternal
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      // They are going to lose state here, but there is no real
      // way to warn them about it since the page will refresh...
      window.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    // window.location.origin is "null" (the literal string value) in Firefox
    // under certain conditions, notably when serving from a local HTML file
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
    let base = window.location.origin !== "null" ? window.location.origin : window.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    // Treating this as a full URL will strip any trailing spaces so we need to
    // pre-encode them since they might be part of a matching splat param from
    // an ancestor route
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window, to);
    },
    createURL,
    encodeLocation(to) {
      // Encode a Location the same way window.location would
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
//#endregion

var ResultType;
(function (ResultType) {
  ResultType["data"] = "data";
  ResultType["deferred"] = "deferred";
  ResultType["redirect"] = "redirect";
  ResultType["error"] = "error";
})(ResultType || (ResultType = {}));
const immutableRouteKeys = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function isIndexRoute(route) {
  return route.index === true;
}
// Walk the route tree generating unique IDs where necessary, so we are working
// solely with AgnosticDataRouteObject's within the Router
function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (manifest === void 0) {
    manifest = {};
  }
  return routes.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!manifest[id], "Found a route id collision on id \"" + id + "\".  Route " + "id's must be globally unique within Data Router usages");
    if (isIndexRoute(route)) {
      let indexRoute = _extends({}, route, mapRouteProperties(route), {
        id
      });
      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, mapRouteProperties(route), {
        id,
        children: undefined
      });
      manifest[id] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest);
      }
      return pathOrLayoutRoute;
    }
  });
}
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/utils/match-routes
 */
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    // Incoming pathnames are generally encoded from either window.location
    // or from router.navigate, but we want to match against the unencoded
    // paths in the route definitions.  Memory router locations won't be
    // encoded here but there also shouldn't be anything to decode so this
    // should be a safe operation.  This avoids needing matchRoutes to be
    // history-aware.
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i], decoded, allowPartial);
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === undefined ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    // Add the children before adding this route to the array, so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.
    if (route.children && route.children.length > 0) {
      invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;
    // coarse-grain check for optional params
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
/**
 * Computes all combinations of optional path segments for a given path,
 * excluding combinations that are ambiguous and of lower priority.
 *
 * For example, `/one/:two?/three/:four?/:five?` explodes to:
 * - `/one/three`
 * - `/one/:two/three`
 * - `/one/three/:four`
 * - `/one/three/:five`
 * - `/one/:two/three/:four`
 * - `/one/:two/three/:five`
 * - `/one/three/:four/:five`
 * - `/one/:two/three/:four/:five`
 */
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  // Optional path segments are denoted by a trailing `?`
  let isOptional = first.endsWith("?");
  // Compute the corresponding required segment: `foo?` -> `foo`
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    // Intepret empty string as omitting an optional segment
    // `["one", "", "three"]` corresponds to omitting `:two` from `/one/:two?/three` -> `/one/three`
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  // All child paths with the prefix.  Do this for all children before the
  // optional version for all children, so we get consistent ordering where the
  // parent optional aspect is preferred as required.  Otherwise, we can get
  // child sections interspersed where deeper optional segments are higher than
  // parent optional segments, where for example, /:two would explode _earlier_
  // then /:one.  By always including the parent as required _for all children_
  // first, we avoid this issue
  result.push(...restExploded.map(subpath => subpath === "" ? required : [required, subpath].join("/")));
  // Then, if this is an optional value, add all child versions without
  if (isOptional) {
    result.push(...restExploded);
  }
  // for absolute paths, ensure `/` instead of empty segment
  return result.map(exploded => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score // Higher score first
  : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
}
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = s => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ?
  // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] :
  // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}
function matchRouteBranch(branch, pathname, allowPartial) {
  if (allowPartial === void 0) {
    allowPartial = false;
  }
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/utils/generate-path
 */
function generatePath(originalPath, params) {
  if (params === void 0) {
    params = {};
  }
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(false, "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
    path = path.replace(/\*$/, "/*");
  }
  // ensure `/` is added at the beginning if the path is absolute
  const prefix = path.startsWith("/") ? "/" : "";
  const stringify = p => p == null ? "" : typeof p === "string" ? p : String(p);
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    // only apply the splat if it's the last segment
    if (isLastSegment && segment === "*") {
      const star = "*";
      // Apply the splat
      return stringify(params[star]);
    }
    const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
    if (keyMatch) {
      const [, key, optional] = keyMatch;
      let param = params[key];
      invariant(optional === "?" || param != null, "Missing \":" + key + "\" param");
      return stringify(param);
    }
    // Remove any optional markers from optional static segments
    return segment.replace(/\?$/g, "");
  })
  // Remove empty segments
  .filter(segment => !!segment);
  return prefix + segments.join("/");
}
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/utils/match-path
 */
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo[paramName] = undefined;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
  .replace(/^\/*/, "/") // Make sure it has a leading /
  .replace(/[\\.*+^${}|()[\]]/g, "\\$&") // Escape special regex chars
  .replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex, so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map(v => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a " + "malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
    return value;
  }
}
/**
 * @private
 */
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/utils/resolve-path
 */
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach(segment => {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
// Return the array of pathnames for the current route matches - used to
// generate the routePathnames input for resolveTo()
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  // When v7_relativeSplatPath is enabled, use the full pathname for the leaf
  // match so we include splat values for "." links.  See:
  // https://github.com/remix-run/react-router/issues/11052#issuecomment-1836589329
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === matches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map(match => match.pathnameBase);
}
/**
 * @private
 */
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  // Routing is relative to the current pathname if explicitly requested.
  //
  // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    // With relative="route" (the default), each leading .. segment means
    // "go up one route" instead of "go up one URL segment".  This is a key
    // difference from how <a href> works and a major reason we call this a
    // "to" value instead of a "href".
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  // Ensure the pathname has a trailing slash if the original "to" had one
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  // Or if this was a link to the current path which has a trailing slash
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
/**
 * @private
 */
function getToPathname(to) {
  // Empty strings should be treated the same as / paths
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
/**
 * @private
 */
const joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");
/**
 * @private
 */
const normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
/**
 * @private
 */
const normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
/**
 * @private
 */
const normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 */
const json = function json(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers
  }));
};
class AbortedDeferredError extends Error {}
class DeferredData {
  constructor(data, responseInit) {
    this.pendingKeysSet = new Set();
    this.subscribers = new Set();
    this.deferredKeys = [];
    invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects");
    // Set up an AbortController + Promise we can race against to exit early
    // cancellation
    let reject;
    this.abortPromise = new Promise((_, r) => reject = r);
    this.controller = new AbortController();
    let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
    this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return Object.assign(acc, {
        [key]: this.trackPromise(key, value)
      });
    }, {});
    if (this.done) {
      // All incoming values were resolved
      this.unlistenAbortSignal();
    }
    this.init = responseInit;
  }
  trackPromise(key, value) {
    if (!(value instanceof Promise)) {
      return value;
    }
    this.deferredKeys.push(key);
    this.pendingKeysSet.add(key);
    // We store a little wrapper promise that will be extended with
    // _data/_error props upon resolve/reject
    let promise = Promise.race([value, this.abortPromise]).then(data => this.onSettle(promise, key, undefined, data), error => this.onSettle(promise, key, error));
    // Register rejection listeners to avoid uncaught promise rejections on
    // errors or aborted deferred values
    promise.catch(() => {});
    Object.defineProperty(promise, "_tracked", {
      get: () => true
    });
    return promise;
  }
  onSettle(promise, key, error, data) {
    if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
      this.unlistenAbortSignal();
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      return Promise.reject(error);
    }
    this.pendingKeysSet.delete(key);
    if (this.done) {
      // Nothing left to abort!
      this.unlistenAbortSignal();
    }
    // If the promise was resolved/rejected with undefined, we'll throw an error as you
    // should always resolve with a value or null
    if (error === undefined && data === undefined) {
      let undefinedError = new Error("Deferred data for key \"" + key + "\" resolved/rejected with `undefined`, " + "you must resolve/reject with a value or `null`.");
      Object.defineProperty(promise, "_error", {
        get: () => undefinedError
      });
      this.emit(false, key);
      return Promise.reject(undefinedError);
    }
    if (data === undefined) {
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      this.emit(false, key);
      return Promise.reject(error);
    }
    Object.defineProperty(promise, "_data", {
      get: () => data
    });
    this.emit(false, key);
    return data;
  }
  emit(aborted, settledKey) {
    this.subscribers.forEach(subscriber => subscriber(aborted, settledKey));
  }
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  cancel() {
    this.controller.abort();
    this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
    this.emit(true);
  }
  async resolveData(signal) {
    let aborted = false;
    if (!this.done) {
      let onAbort = () => this.cancel();
      signal.addEventListener("abort", onAbort);
      aborted = await new Promise(resolve => {
        this.subscribe(aborted => {
          signal.removeEventListener("abort", onAbort);
          if (aborted || this.done) {
            resolve(aborted);
          }
        });
      });
    }
    return aborted;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
    return Object.entries(this.data).reduce((acc, _ref3) => {
      let [key, value] = _ref3;
      return Object.assign(acc, {
        [key]: unwrapTrackedPromise(value)
      });
    }, {});
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }
  if (value._error) {
    throw value._error;
  }
  return value._data;
}
const defer = function defer(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  return new DeferredData(data, responseInit);
};
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */
const redirect = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers
  }));
};
/**
 * A redirect response that will force a document reload to the new location.
 * Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */
const redirectDocument = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
/**
 * @private
 * Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
 *
 * We don't export the class for public use since it's an implementation
 * detail, but we export the interface above so folks can build their own
 * abstractions around instances via isRouteErrorResponse()
 */
class ErrorResponseImpl {
  constructor(status, statusText, data, internal) {
    if (internal === void 0) {
      internal = false;
    }
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data instanceof Error) {
      this.data = data.toString();
      this.error = data;
    } else {
      this.data = data;
    }
  }
}
/**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response thrown from an action/loader
 */
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}

const validMutationMethodsArr = ["post", "put", "patch", "delete"];
const validMutationMethods = new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
const validRequestMethods = new Set(validRequestMethodsArr);
const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
const redirectPreserveMethodStatusCodes = new Set([307, 308]);
const IDLE_NAVIGATION = {
  state: "idle",
  location: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined,
  json: undefined,
  text: undefined
};
const IDLE_FETCHER = {
  state: "idle",
  data: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined,
  json: undefined,
  text: undefined
};
const IDLE_BLOCKER = {
  state: "unblocked",
  proceed: undefined,
  reset: undefined,
  location: undefined
};
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const defaultMapRouteProperties = route => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
const TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createRouter
////////////////////////////////////////////////////////////////////////////////
/**
 * Create a router and listen to history POP navigations
 */
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : undefined;
  const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  const isServer = !isBrowser;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties;
  if (init.mapRouteProperties) {
    mapRouteProperties = init.mapRouteProperties;
  } else if (init.detectErrorBoundary) {
    // If they are still using the deprecated version, wrap it with the new API
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  // Routes keyed by ID
  let manifest = {};
  // Routes in tree format for matching
  let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, undefined, manifest);
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  let dataStrategyImpl = init.unstable_dataStrategy || defaultDataStrategy;
  let patchRoutesOnMissImpl = init.unstable_patchRoutesOnMiss;
  // Config driven behavior flags
  let future = _extends({
    v7_fetcherPersist: false,
    v7_normalizeFormMethod: false,
    v7_partialHydration: false,
    v7_prependBasename: false,
    v7_relativeSplatPath: false,
    unstable_skipActionErrorRevalidation: false
  }, init.future);
  // Cleanup function for history
  let unlistenHistory = null;
  // Externally-provided functions to call on all state changes
  let subscribers = new Set();
  // Externally-provided object to hold scroll restoration locations during routing
  let savedScrollPositions = null;
  // Externally-provided function to get scroll restoration keys
  let getScrollRestorationKey = null;
  // Externally-provided function to get current scroll position
  let getScrollPosition = null;
  // One-time flag to control the initial hydration scroll restoration.  Because
  // we don't get the saved positions from <ScrollRestoration /> until _after_
  // the initial render, we need to manually trigger a separate updateState to
  // send along the restoreScrollPosition
  // Set to true if we have `hydrationData` since we assume we were SSR'd and that
  // SSR did the initial scroll restoration.
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialErrors = null;
  if (initialMatches == null && !patchRoutesOnMissImpl) {
    // If we do not match a user-provided-route, fall back to the root
    // to allow the error boundary to take over
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }
  let initialized;
  if (!initialMatches) {
    // We need to run patchRoutesOnMiss in initialize()
    initialized = false;
    initialMatches = [];
  } else if (initialMatches.some(m => m.route.lazy)) {
    // All initialMatches need to be loaded before we're ready.  If we have lazy
    // functions around still then we'll need to run them in initialize()
    initialized = false;
  } else if (!initialMatches.some(m => m.route.loader)) {
    // If we've got no loaders to run, then we're good to go
    initialized = true;
  } else if (future.v7_partialHydration) {
    // If partial hydration is enabled, we're initialized so long as we were
    // provided with hydrationData for every route with a loader, and no loaders
    // were marked for explicit hydration
    let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
    let errors = init.hydrationData ? init.hydrationData.errors : null;
    let isRouteInitialized = m => {
      // No loader, nothing to initialize
      if (!m.route.loader) {
        return true;
      }
      // Explicitly opting-in to running on hydration
      if (typeof m.route.loader === "function" && m.route.loader.hydrate === true) {
        return false;
      }
      // Otherwise, initialized if hydrated with data or an error
      return loaderData && loaderData[m.route.id] !== undefined || errors && errors[m.route.id] !== undefined;
    };
    // If errors exist, don't consider routes below the boundary
    if (errors) {
      let idx = initialMatches.findIndex(m => errors[m.route.id] !== undefined);
      initialized = initialMatches.slice(0, idx + 1).every(isRouteInitialized);
    } else {
      initialized = initialMatches.every(isRouteInitialized);
    }
  } else {
    // Without partial hydration - we're initialized if we were provided any
    // hydrationData - which is expected to be complete
    initialized = init.hydrationData != null;
  }
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: new Map(),
    blockers: new Map()
  };
  // -- Stateful internal variables to manage navigations --
  // Current navigation in progress (to be committed in completeNavigation)
  let pendingAction = Action.Pop;
  // Should the current navigation prevent the scroll reset if scroll cannot
  // be restored?
  let pendingPreventScrollReset = false;
  // AbortController for the active navigation
  let pendingNavigationController;
  // Should the current navigation enable document.startViewTransition?
  let pendingViewTransitionEnabled = false;
  // Store applied view transitions so we can apply them on POP
  let appliedViewTransitions = new Map();
  // Cleanup function for persisting applied transitions to sessionStorage
  let removePageHideEventListener = null;
  // We use this to avoid touching history in completeNavigation if a
  // revalidation is entirely uninterrupted
  let isUninterruptedRevalidation = false;
  // Use this internal flag to force revalidation of all loaders:
  //  - submissions (completed or interrupted)
  //  - useRevalidator()
  //  - X-Remix-Revalidate (from redirect)
  let isRevalidationRequired = false;
  // Use this internal array to capture routes that require revalidation due
  // to a cancelled deferred on action submission
  let cancelledDeferredRoutes = [];
  // Use this internal array to capture fetcher loads that were cancelled by an
  // action navigation and require revalidation
  let cancelledFetcherLoads = [];
  // AbortControllers for any in-flight fetchers
  let fetchControllers = new Map();
  // Track loads based on the order in which they started
  let incrementingLoadId = 0;
  // Track the outstanding pending navigation data load to be compared against
  // the globally incrementing load when a fetcher load lands after a completed
  // navigation
  let pendingNavigationLoadId = -1;
  // Fetchers that triggered data reloads as a result of their actions
  let fetchReloadIds = new Map();
  // Fetchers that triggered redirect navigations
  let fetchRedirectIds = new Set();
  // Most recent href/match for fetcher.load calls for fetchers
  let fetchLoadMatches = new Map();
  // Ref-count mounted fetchers so we know when it's ok to clean them up
  let activeFetchers = new Map();
  // Fetchers that have requested a delete when using v7_fetcherPersist,
  // they'll be officially removed after they return to idle
  let deletedFetchers = new Set();
  // Store DeferredData instances for active route matches.  When a
  // route loader returns defer() we stick one in here.  Then, when a nested
  // promise resolves we update loaderData.  If a new navigation starts we
  // cancel active deferreds for eliminated routes.
  let activeDeferreds = new Map();
  // Store blocker functions in a separate Map outside of router state since
  // we don't need to update UI state if they change
  let blockerFunctions = new Map();
  // Map of pending patchRoutesOnMiss() promises (keyed by path/matches) so
  // that we only kick them off once for a given combo
  let pendingPatchRoutes = new Map();
  // Flag to ignore the next history update, so we can revert the URL change on
  // a POP navigation that was blocked by the user without touching router state
  let ignoreNextHistoryUpdate = false;
  // Initialize the router, all side effects should be kicked off from here.
  // Implemented as a Fluent API for ease of:
  //   let router = createRouter(init).initialize();
  function initialize() {
    // If history informs us of a POP navigation, start the navigation but do not update
    // state.  We'll update our own state once the navigation completes
    unlistenHistory = init.history.listen(_ref => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;
      // Ignore this event if it was just us resetting the URL from a
      // blocked POP navigation
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = false;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location " + "that was not created by @remix-run/router. This will fail silently in " + "production. This can happen if you are navigating outside the router " + "via `window.history.pushState`/`window.location.hash` instead of using " + "router navigation APIs.  This can also happen if you are using " + "createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey && delta != null) {
        // Restore the URL to match the current UI, but don't update router state
        ignoreNextHistoryUpdate = true;
        init.history.go(delta * -1);
        // Put the blocker into a blocked state
        updateBlocker(blockerKey, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: undefined,
              reset: undefined,
              location
            });
            // Re-do the same POP navigation we just blocked
            init.history.go(delta);
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER);
            updateState({
              blockers
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    });
    if (isBrowser) {
      // FIXME: This feels gross.  How can we cleanup the lines between
      // scrollRestoration/appliedTransitions persistance?
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    // Kick off initial data load if needed.  Use Pop to avoid modifying history
    // Note we don't do any handling of lazy here.  For SPA's it'll get handled
    // in the normal navigation flow.  For SSR it's expected that lazy modules are
    // resolved prior to router creation since we can't go into a fallbackElement
    // UI for SSR'd apps
    if (!state.initialized) {
      startNavigation(Action.Pop, state.location, {
        initialHydration: true
      });
    }
    return router;
  }
  // Clean up a router and it's side effects
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  // Subscribe to state updates for the router
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  // Update our state and notify the calling context of the change
  function updateState(newState, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state = _extends({}, state, newState);
    // Prep fetcher cleanup so we can tell the UI which fetcher data entries
    // can be removed
    let completedFetchers = [];
    let deletedFetchersKeys = [];
    if (future.v7_fetcherPersist) {
      state.fetchers.forEach((fetcher, key) => {
        if (fetcher.state === "idle") {
          if (deletedFetchers.has(key)) {
            // Unmounted from the UI and can be totally removed
            deletedFetchersKeys.push(key);
          } else {
            // Returned to idle but still mounted in the UI, so semi-remains for
            // revalidations and such
            completedFetchers.push(key);
          }
        }
      });
    }
    // Iterate over a local copy so that if flushSync is used and we end up
    // removing and adding a new subscriber due to the useCallback dependencies,
    // we don't get ourselves into a loop calling the new subscriber immediately
    [...subscribers].forEach(subscriber => subscriber(state, {
      deletedFetchers: deletedFetchersKeys,
      unstable_viewTransitionOpts: opts.viewTransitionOpts,
      unstable_flushSync: opts.flushSync === true
    }));
    // Remove idle fetchers from state since we only care about in-flight fetchers.
    if (future.v7_fetcherPersist) {
      completedFetchers.forEach(key => state.fetchers.delete(key));
      deletedFetchersKeys.forEach(key => deleteFetcher(key));
    }
  }
  // Complete a navigation returning the state.navigation back to the IDLE_NAVIGATION
  // and setting state.[historyAction/location/matches] to the new route.
  // - Location is a required param
  // - Navigation will always be set to IDLE_NAVIGATION
  // - Can pass any other state in newState
  function completeNavigation(location, newState, _temp) {
    var _location$state, _location$state2;
    let {
      flushSync
    } = _temp === void 0 ? {} : _temp;
    // Deduce if we're in a loading/actionReload state:
    // - We have committed actionData in the store
    // - The current navigation was a mutation submission
    // - We're past the submitting state and into the loading state
    // - The location being loaded is not the result of a redirect
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        // Empty actionData -> clear prior actionData due to an action error
        actionData = null;
      }
    } else if (isActionReload) {
      // Keep the current data if we're wrapping up the action reload
      actionData = state.actionData;
    } else {
      // Clear actionData on any other completed navigations
      actionData = null;
    }
    // Always preserve any existing loaderData from re-used routes
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
    // On a successful navigation we can assume we got through all blockers
    // so we can start fresh
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
    }
    // Always respect the user flag.  Otherwise don't reset on mutation
    // submission navigations unless they redirect
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = undefined;
    }
    if (isUninterruptedRevalidation) ; else if (pendingAction === Action.Pop) ; else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    // On POP, enable transitions if they were enabled on the original navigation
    if (pendingAction === Action.Pop) {
      // Forward takes precedence so they behave like the original navigation
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        // If we don't have a previous forward nav, assume we're popping back to
        // the new location and enable if that location previously enabled
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      // Store the applied transition on PUSH/REPLACE
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers
    }), {
      viewTransitionOpts,
      flushSync: flushSync === true
    });
    // Reset stateful navigation vars
    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
    cancelledFetcherLoads = [];
  }
  // Trigger a navigation event, which can either be a numerical POP or a PUSH
  // replace with an optional submission
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    // When using navigate as a PUSH/REPLACE we aren't reading an already-encoded
    // URL from window.location, so we need to encode it here so the behavior
    // remains the same as POP and non-data-router usages.  new URL() does all
    // the same encoding we'd get from a history.pushState/window.location read
    // without having to touch history
    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : undefined;
    let historyAction = Action.Push;
    if (userReplace === true) {
      historyAction = Action.Replace;
    } else if (userReplace === false) ; else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      // By default on submissions to the current location we REPLACE so that
      // users don't have to double-click the back button to get to the prior
      // location.  If the user redirects to a different location from the
      // action/loader this will be ignored and the redirect will be a PUSH
      historyAction = Action.Replace;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : undefined;
    let flushSync = (opts && opts.unstable_flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      // Put the blocker into a blocked state
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: undefined,
            reset: undefined,
            location: nextLocation
          });
          // Send the same navigation through
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({
            blockers
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.unstable_viewTransition,
      flushSync
    });
  }
  // Revalidate all current loaders.  If a navigation is in progress or if this
  // is interrupted by a navigation, allow this to "succeed" by calling all
  // loaders during the next loader round
  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    });
    // If we're currently submitting an action, we don't need to start a new
    // navigation, we'll just let the follow up loader execution call all loaders
    if (state.navigation.state === "submitting") {
      return;
    }
    // If we're currently in an idle state, start a new navigation for the current
    // action/location and mark it as uninterrupted, which will skip the history
    // update in completeNavigation
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    }
    // Otherwise, if we're currently in a loading state, just start a new
    // navigation to the navigation.location but do not trigger an uninterrupted
    // revalidation so that history correctly updates once the navigation completes
    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation
    });
  }
  // Start a navigation to the given action/location.  Can optionally provide a
  // overrideNavigation which will override the normalLoad in the case of a redirect
  // navigation
  async function startNavigation(historyAction, location, opts) {
    // Abort any in-progress navigations and start a new one. Unset any ongoing
    // uninterrupted revalidations unless told otherwise, since we want this
    // new navigation to update history normally
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    // Save the current scroll position every time we start a new navigation,
    // and track whether we should reset scroll on completion
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = matchRoutes(routesToUse, location, basename);
    let flushSync = (opts && opts.flushSync) === true;
    let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    // Short circuit with a 404 on the root error boundary if we match nothing
    if (!matches) {
      let {
        error,
        notFoundMatches,
        route
      } = handleNavigational404(location.pathname);
      completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      }, {
        flushSync
      });
      return;
    }
    // Short circuit if it's only a hash change and not a revalidation or
    // mutation submission.
    //
    // Ignore on initial page loads because since the initial load will always
    // be "same hash".  For example, on /page#hash and submit a <Form method="post">
    // which will default to a navigation to /page
    if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      }, {
        flushSync
      });
      return;
    }
    // Create a controller/Request for this navigation
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionResult;
    if (opts && opts.pendingError) {
      // If we have a pendingError, it means the user attempted a GET submission
      // with binary FormData so assign here and skip to handleLoaders.  That
      // way we handle calling loaders above the boundary etc.  It's not really
      // different from an actionError in that sense.
      pendingActionResult = [findNearestBoundary(matches).route.id, {
        type: ResultType.error,
        error: opts.pendingError
      }];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      // Call action if we received an action submission
      let actionResult = await handleAction(request, location, opts.submission, matches, fogOfWar.active, {
        replace: opts.replace,
        flushSync
      });
      if (actionResult.shortCircuited) {
        return;
      }
      // If we received a 404 from handleAction, it's because we couldn't lazily
      // discover the destination route so we don't want to call loaders
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location, opts.submission);
      flushSync = false;
      // No need to do fog of war matching again on loader execution
      fogOfWar.active = false;
      // Create a GET request for the loaders
      request = createClientSideRequest(init.history, request.url, request.signal);
    }
    // Call loaders
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, fogOfWar.active, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionResult);
    if (shortCircuited) {
      return;
    }
    // Clean up now that the action/loaders have completed.  Don't clean up if
    // we short circuited because pendingNavigationController will have already
    // been assigned to a new controller for the next navigation
    pendingNavigationController = null;
    completeNavigation(location, _extends({
      matches: updatedMatches || matches
    }, getActionDataForCommit(pendingActionResult), {
      loaderData,
      errors
    }));
  }
  // Call the action matched by the leaf route for this navigation and handle
  // redirects/errors
  async function handleAction(request, location, submission, matches, isFogOfWar, opts) {
    if (opts === void 0) {
      opts = {};
    }
    interruptActiveLoads();
    // Put us in a submitting state
    let navigation = getSubmittingNavigation(location, submission);
    updateState({
      navigation
    }, {
      flushSync: opts.flushSync === true
    });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
      if (discoverResult.type === "aborted") {
        return {
          shortCircuited: true
        };
      } else if (discoverResult.type === "error") {
        let {
          error,
          notFoundMatches,
          route
        } = handleDiscoverRouteError(location.pathname, discoverResult);
        return {
          matches: notFoundMatches,
          pendingActionResult: [route.id, {
            type: ResultType.error,
            error
          }]
        };
      } else if (!discoverResult.matches) {
        let {
          notFoundMatches,
          error,
          route
        } = handleNavigational404(location.pathname);
        return {
          matches: notFoundMatches,
          pendingActionResult: [route.id, {
            type: ResultType.error,
            error
          }]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    // Call our action and get the result
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let results = await callDataStrategy("action", request, [actionMatch], matches);
      result = results[0];
      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }
    if (isRedirectResult(result)) {
      let replace;
      if (opts && opts.replace != null) {
        replace = opts.replace;
      } else {
        // If the user didn't explicity indicate replace behavior, replace if
        // we redirected to the exact same location we're currently at to avoid
        // double back-buttons
        let location = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename);
        replace = location === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, {
        submission,
        replace
      });
      return {
        shortCircuited: true
      };
    }
    if (isDeferredResult(result)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      // By default, all submissions to the current location are REPLACE
      // navigations, but if the action threw an error that'll be rendered in
      // an errorElement, we fall back to PUSH so that the user can use the
      // back button to get back to the pre-submission form location to try
      // again
      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }
      return {
        matches,
        pendingActionResult: [boundaryMatch.route.id, result]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  // Call all applicable loaders for the given matches, handling redirects,
  // errors, etc.
  async function handleLoaders(request, location, matches, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionResult) {
    // Figure out the right navigation we want to use for data loading
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
    // If this was a redirect from an action we don't have a "submission" but
    // we have it on the loading navigation so use that if available
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    // If this is an uninterrupted revalidation, we remain in our current idle
    // state.  If not, we need to switch to our loading state and load data,
    // preserving any new action data or existing action data (in the case of
    // a revalidation interrupting an actionReload)
    // If we have partialHydration enabled, then don't update the state for the
    // initial data load since it's not a "navigation"
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration);
    // When fog of war is enabled, we enter our `loading` state earlier so we
    // can discover new routes during the `loading` state.  We skip this if
    // we've already run actions since we would have done our matching already.
    // If the children() function threw then, we want to proceed with the
    // partial matches it discovered.
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(_extends({
          navigation: loadingNavigation
        }, actionData !== undefined ? {
          actionData
        } : {}), {
          flushSync
        });
      }
      let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
      if (discoverResult.type === "aborted") {
        return {
          shortCircuited: true
        };
      } else if (discoverResult.type === "error") {
        let {
          error,
          notFoundMatches,
          route
        } = handleDiscoverRouteError(location.pathname, discoverResult);
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else if (!discoverResult.matches) {
        let {
          error,
          notFoundMatches,
          route
        } = handleNavigational404(location.pathname);
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && initialHydration === true, future.unstable_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
    // Cancel pending deferreds for no-longer-matched routes or routes we're
    // about to reload.  Note that if this is an action reload we would have
    // already cancelled all pending deferreds so this would be a no-op
    cancelActiveDeferreds(routeId => !(matches && matches.some(m => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some(m => m.route.id === routeId));
    pendingNavigationLoadId = ++incrementingLoadId;
    // Short circuit if we have no loaders to run
    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers = markFetchRedirectsDone();
      completeNavigation(location, _extends({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null
      }, getActionDataForCommit(pendingActionResult), updatedFetchers ? {
        fetchers: new Map(state.fetchers)
      } : {}), {
        flushSync
      });
      return {
        shortCircuited: true
      };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        // Only update navigation/actionNData if we didn't already do it above
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== undefined) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, {
        flushSync
      });
    }
    revalidatingFetchers.forEach(rf => {
      if (fetchControllers.has(rf.key)) {
        abortFetcher(rf.key);
      }
      if (rf.controller) {
        // Fetchers use an independent AbortController so that aborting a fetcher
        // (via deleteFetcher) does not abort the triggering navigation that
        // triggered the revalidation
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    // Proxy navigation abort through to revalidation fetchers
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(f => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    }
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    }
    // Clean up _after_ loaders have completed.  Don't clean up if we short
    // circuited because fetchControllers would have been aborted and
    // reassigned to new controllers for the next navigation
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    }
    revalidatingFetchers.forEach(rf => fetchControllers.delete(rf.key));
    // If any loaders returned a redirect Response, start a new REPLACE navigation
    let redirect = findRedirect([...loaderResults, ...fetcherResults]);
    if (redirect) {
      if (redirect.idx >= matchesToLoad.length) {
        // If this redirect came from a fetcher make sure we mark it in
        // fetchRedirectIds so it doesn't get revalidated on the next set of
        // loader executions
        let fetcherKey = revalidatingFetchers[redirect.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      await startRedirectNavigation(request, redirect.result, {
        replace
      });
      return {
        shortCircuited: true
      };
    }
    // Process and commit output from loaders
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
    // Wire up subscribers to update loaderData as promises settle
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe(aborted => {
        // Note: No need to updateState here since the TrackedPromise on
        // loaderData is stable across resolve/reject
        // Remove this instance if we were aborted or if promises have settled
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    // During partial hydration, preserve SSR errors for routes that don't re-run
    if (future.v7_partialHydration && initialHydration && state.errors) {
      Object.entries(state.errors).filter(_ref2 => {
        let [id] = _ref2;
        return !matchesToLoad.some(m => m.route.id === id);
      }).forEach(_ref3 => {
        let [routeId, error] = _ref3;
        errors = Object.assign(errors || {}, {
          [routeId]: error
        });
      });
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends({
      matches,
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      // This is cast to `any` currently because `RouteData`uses any and it
      // would be a breaking change to use any.
      // TODO: v7 - change `RouteData` to use `unknown` instead of `any`
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    revalidatingFetchers.forEach(rf => {
      let fetcher = state.fetchers.get(rf.key);
      let revalidatingFetcher = getLoadingFetcher(undefined, fetcher ? fetcher.data : undefined);
      state.fetchers.set(rf.key, revalidatingFetcher);
    });
    return new Map(state.fetchers);
  }
  // Trigger a fetcher load/submit for the given fetcher key
  function fetch(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. " + "You are likely calling a useFetcher() method in the body of your component. " + "Try moving it to a useEffect or a callback.");
    }
    if (fetchControllers.has(key)) abortFetcher(key);
    let flushSync = (opts && opts.unstable_flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }), {
        flushSync
      });
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
    if (error) {
      setFetcherError(key, routeId, error, {
        flushSync
      });
      return;
    }
    let match = getTargetMatch(matches, path);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, fogOfWar.active, flushSync, submission);
      return;
    }
    // Store off the match so we can call it's shouldRevalidate on subsequent
    // revalidations
    fetchLoadMatches.set(key, {
      routeId,
      path
    });
    handleFetcherLoader(key, routeId, path, match, matches, fogOfWar.active, flushSync, submission);
  }
  // Call the action for the matched fetcher.submit(), and then handle redirects,
  // errors, and revalidation
  async function handleFetcherAction(key, routeId, path, match, requestMatches, isFogOfWar, flushSync, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    function detectAndHandle405Error(m) {
      if (!m.route.action && !m.route.lazy) {
        let error = getInternalRouterError(405, {
          method: submission.formMethod,
          pathname: path,
          routeId: routeId
        });
        setFetcherError(key, routeId, error, {
          flushSync
        });
        return true;
      }
      return false;
    }
    if (!isFogOfWar && detectAndHandle405Error(match)) {
      return;
    }
    // Put this fetcher into it's submitting state
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(requestMatches, path, fetchRequest.signal);
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        let {
          error
        } = handleDiscoverRouteError(path, discoverResult);
        setFetcherError(key, routeId, error, {
          flushSync
        });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(key, routeId, getInternalRouterError(404, {
          pathname: path
        }), {
          flushSync
        });
        return;
      } else {
        requestMatches = discoverResult.matches;
        match = getTargetMatch(requestMatches, path);
        if (detectAndHandle405Error(match)) {
          return;
        }
      }
    }
    // Call the action for the fetcher
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let actionResults = await callDataStrategy("action", fetchRequest, [match], requestMatches);
    let actionResult = actionResults[0];
    if (fetchRequest.signal.aborted) {
      // We can delete this so long as we weren't aborted by our own fetcher
      // re-submit which would have put _new_ controller is in fetchControllers
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    // When using v7_fetcherPersist, we don't want errors bubbling up to the UI
    // or redirects processed for unmounted fetchers so we just revert them to
    // idle
    if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(undefined));
        return;
      }
      // Let SuccessResult's fall through for revalidation
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          // A new navigation was kicked off after our action started, so that
          // should take precedence over this redirect navigation.  We already
          // set isRevalidationRequired so all loaders for the new route should
          // fire unless opted out via shouldRevalidate
          updateFetcherState(key, getDoneFetcher(undefined));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, {
            fetcherSubmission: submission
          });
        }
      }
      // Process any non-redirect errors thrown
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    if (isDeferredResult(actionResult)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    // Start the data load for current matches, or the next location if we're
    // in the middle of a navigation
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.unstable_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [match.route.id, actionResult]);
    // Put all revalidating fetchers into the loading state, except for the
    // current fetcher which we want to keep in it's current loading state which
    // contains it's action submission info + action data
    revalidatingFetchers.filter(rf => rf.key !== key).forEach(rf => {
      let staleKey = rf.key;
      let existingFetcher = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(undefined, existingFetcher ? existingFetcher.data : undefined);
      state.fetchers.set(staleKey, revalidatingFetcher);
      if (fetchControllers.has(staleKey)) {
        abortFetcher(staleKey);
      }
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(rf => abortFetcher(rf.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach(r => fetchControllers.delete(r.key));
    let redirect = findRedirect([...loaderResults, ...fetcherResults]);
    if (redirect) {
      if (redirect.idx >= matchesToLoad.length) {
        // If this redirect came from a fetcher make sure we mark it in
        // fetchRedirectIds so it doesn't get revalidated on the next set of
        // loader executions
        let fetcherKey = revalidatingFetchers[redirect.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      return startRedirectNavigation(revalidationRequest, redirect.result);
    }
    // Process and commit output from loaders
    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, undefined, revalidatingFetchers, fetcherResults, activeDeferreds);
    // Since we let revalidations complete even if the submitting fetcher was
    // deleted, only put it back to idle if it hasn't been deleted
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    abortStaleFetchLoads(loadId);
    // If we are currently in a navigation loading state and this fetcher is
    // more recent than the navigation, we want the newer data so abort the
    // navigation and complete it with the fetcher data
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      // otherwise just update with the fetcher data, preserving any existing
      // loaderData for loaders that did not need to reload.  We have to
      // manually merge here since we aren't going through completeNavigation
      updateState({
        errors,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  // Call the matched loader for fetcher.load(), handling redirects, errors, etc.
  async function handleFetcherLoader(key, routeId, path, match, matches, isFogOfWar, flushSync, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : undefined), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(matches, path, fetchRequest.signal);
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        let {
          error
        } = handleDiscoverRouteError(path, discoverResult);
        setFetcherError(key, routeId, error, {
          flushSync
        });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(key, routeId, getInternalRouterError(404, {
          pathname: path
        }), {
          flushSync
        });
        return;
      } else {
        matches = discoverResult.matches;
        match = getTargetMatch(matches, path);
      }
    }
    // Call the loader for this fetcher route match
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let results = await callDataStrategy("loader", fetchRequest, [match], matches);
    let result = results[0];
    // Deferred isn't supported for fetcher loads, await everything and treat it
    // as a normal load.  resolveDeferredData will return undefined if this
    // fetcher gets aborted, so we just leave result untouched and short circuit
    // below if that happens
    if (isDeferredResult(result)) {
      result = (await resolveDeferredData(result, fetchRequest.signal, true)) || result;
    }
    // We can delete this so long as we weren't aborted by our our own fetcher
    // re-load which would have put _new_ controller is in fetchControllers
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    // We don't want errors bubbling up or redirects followed for unmounted
    // fetchers, so short circuit here if it was removed from the UI
    if (deletedFetchers.has(key)) {
      updateFetcherState(key, getDoneFetcher(undefined));
      return;
    }
    // If the loader threw a redirect Response, start a new REPLACE navigation
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        // A new navigation was kicked off after our loader started, so that
        // should take precedence over this redirect navigation
        updateFetcherState(key, getDoneFetcher(undefined));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result);
        return;
      }
    }
    // Process any non-redirect errors thrown
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    // Put the fetcher back into an idle state
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  /**
   * Utility function to handle redirects returned from an action or loader.
   * Normally, a redirect "replaces" the navigation that triggered it.  So, for
   * example:
   *
   *  - user is on /a
   *  - user clicks a link to /b
   *  - loader for /b redirects to /c
   *
   * In a non-JS app the browser would track the in-flight navigation to /b and
   * then replace it with /c when it encountered the redirect response.  In
   * the end it would only ever update the URL bar with /c.
   *
   * In client-side routing using pushState/replaceState, we aim to emulate
   * this behavior and we also do not update history until the end of the
   * navigation (including processed redirects).  This means that we never
   * actually touch history until we've processed redirects, so we just use
   * the history action from the original navigation (PUSH or REPLACE).
   */
  async function startRedirectNavigation(request, redirect, _temp2) {
    let {
      submission,
      fetcherSubmission,
      replace
    } = _temp2 === void 0 ? {} : _temp2;
    if (redirect.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(location, new URL(request.url), basename);
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser) {
      let isDocumentReload = false;
      if (redirect.response.headers.has("X-Remix-Reload-Document")) {
        // Hard reload if the response contained X-Remix-Reload-Document
        isDocumentReload = true;
      } else if (ABSOLUTE_URL_REGEX.test(location)) {
        const url = init.history.createURL(location);
        isDocumentReload =
        // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin ||
        // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    // There's no need to abort on redirects, since we don't detect the
    // redirect until the action/loaders have settled
    pendingNavigationController = null;
    let redirectHistoryAction = replace === true ? Action.Replace : Action.Push;
    // Use the incoming submission if provided, fallback on the active one in
    // state.navigation
    let {
      formMethod,
      formAction,
      formEncType
    } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    // If this was a 307/308 submission we want to preserve the HTTP method and
    // re-submit the GET/POST/PUT/PATCH/DELETE as a submission navigation to the
    // redirected location
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, activeSubmission, {
          formAction: location
        }),
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    } else {
      // If we have a navigation submission, we will preserve it through the
      // redirect navigation
      let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    }
  }
  // Utility wrapper for calling dataStrategy client-side without having to
  // pass around the manifest, mapRouteProperties, etc.
  async function callDataStrategy(type, request, matchesToLoad, matches) {
    try {
      let results = await callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties);
      return await Promise.all(results.map((result, i) => {
        if (isRedirectHandlerResult(result)) {
          let response = result.result;
          return {
            type: ResultType.redirect,
            response: normalizeRelativeRoutingRedirectResponse(response, request, matchesToLoad[i].route.id, matches, basename, future.v7_relativeSplatPath)
          };
        }
        return convertHandlerResultToDataResult(result);
      }));
    } catch (e) {
      // If the outer dataStrategy method throws, just return the error for all
      // matches - and it'll naturally bubble to the root
      return matchesToLoad.map(() => ({
        type: ResultType.error,
        error: e
      }));
    }
  }
  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    let [loaderResults, ...fetcherResults] = await Promise.all([matchesToLoad.length ? callDataStrategy("loader", request, matchesToLoad, matches) : [], ...fetchersToLoad.map(f => {
      if (f.matches && f.match && f.controller) {
        let fetcherRequest = createClientSideRequest(init.history, f.path, f.controller.signal);
        return callDataStrategy("loader", fetcherRequest, [f.match], f.matches).then(r => r[0]);
      } else {
        return Promise.resolve({
          type: ResultType.error,
          error: getInternalRouterError(404, {
            pathname: f.path
          })
        });
      }
    })]);
    await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map(f => f.match), fetcherResults, fetchersToLoad.map(f => f.controller ? f.controller.signal : null), true)]);
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    // Every interruption triggers a revalidation
    isRevalidationRequired = true;
    // Cancel pending route-level deferreds and mark cancelled routes for
    // revalidation
    cancelledDeferredRoutes.push(...cancelActiveDeferreds());
    // Abort in-flight fetcher loads
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.push(key);
        abortFetcher(key);
      }
    });
  }
  function updateFetcherState(key, fetcher, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state.fetchers.set(key, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function setFetcherError(key, routeId, error, opts) {
    if (opts === void 0) {
      opts = {};
    }
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function getFetcher(key) {
    if (future.v7_fetcherPersist) {
      activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
      // If this fetcher was previously marked for deletion, unmark it since we
      // have a new instance
      if (deletedFetchers.has(key)) {
        deletedFetchers.delete(key);
      }
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    // Don't abort the controller if this is a deletion of a fetcher.submit()
    // in it's loading phase since - we don't want to abort the corresponding
    // revalidation and want them to complete and land
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    deletedFetchers.delete(key);
    state.fetchers.delete(key);
  }
  function deleteFetcherAndUpdateState(key) {
    if (future.v7_fetcherPersist) {
      let count = (activeFetchers.get(key) || 0) - 1;
      if (count <= 0) {
        activeFetchers.delete(key);
        deletedFetchers.add(key);
      } else {
        activeFetchers.set(key, count);
      }
    } else {
      deleteFetcher(key);
    }
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key);
    controller.abort();
    fetchControllers.delete(key);
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  // Utility function to update blockers, ensuring valid state transitions
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    // Poor mans state machine :)
    // https://mermaid.live/edit#pako:eNqVkc9OwzAMxl8l8nnjAYrEtDIOHEBIgwvKJTReGy3_lDpIqO27k6awMG0XcrLlnz87nwdonESogKXXBuE79rq75XZO3-yHds0RJVuv70YrPlUrCEe2HfrORS3rubqZfuhtpg5C9wk5tZ4VKcRUq88q9Z8RS0-48cE1iHJkL0ugbHuFLus9L6spZy8nX9MP2CNdomVaposqu3fGayT8T8-jJQwhepo_UtpgBQaDEUom04dZhAN1aJBDlUKJBxE1ceB2Smj0Mln-IBW5AFU2dwUiktt_2Qaq2dBfaKdEup85UV7Yd-dKjlnkabl2Pvr0DTkTreM
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({
      blockers
    });
  }
  function shouldBlockNavigation(_ref4) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref4;
    if (blockerFunctions.size === 0) {
      return;
    }
    // We ony support a single active blocker at the moment since we don't have
    // any compelling use cases for multi-blocker yet
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      // If the blocker is currently proceeding, we don't need to re-check
      // it and can let this navigation continue
      return;
    }
    // At this point, we know we're unblocked/blocked so we need to check the
    // user-provided blocker function
    if (blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, {
      pathname
    });
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let {
      matches,
      route
    } = getShortCircuitMatches(routesToUse);
    // Cancel all pending deferred on 404s since we don't keep any routes
    cancelActiveDeferreds();
    return {
      notFoundMatches: matches,
      route,
      error
    };
  }
  function handleDiscoverRouteError(pathname, discoverResult) {
    let matches = discoverResult.partialMatches;
    let route = matches[matches.length - 1].route;
    let error = getInternalRouterError(400, {
      type: "route-discovery",
      routeId: route.id,
      pathname,
      message: discoverResult.error != null && "message" in discoverResult.error ? discoverResult.error : String(discoverResult.error)
    });
    return {
      notFoundMatches: matches,
      route,
      error
    };
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        // Cancel the deferred - but do not remove from activeDeferreds here -
        // we rely on the subscribers to do that so our tests can assert proper
        // cleanup via _internalActiveDeferreds
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  }
  // Opt in to capturing and reporting scroll positions during navigations,
  // used by the <ScrollRestoration> component
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || null;
    // Perform initial hydration scroll restoration, since we miss the boat on
    // the initial updateState() because we've not yet rendered <ScrollRestoration/>
    // and therefore have no savedScrollPositions available
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }
    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey) {
      let key = getScrollRestorationKey(location, matches.map(m => convertRouteMatchToUiMatch(m, state.loaderData)));
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions) {
      let key = getScrollKey(location, matches);
      let y = savedScrollPositions[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (patchRoutesOnMissImpl) {
      if (!matches) {
        let fogMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
        return {
          active: true,
          matches: fogMatches || []
        };
      } else {
        let leafRoute = matches[matches.length - 1].route;
        if (leafRoute.path === "*") {
          // If we matched a splat, it might only be because we haven't yet fetched
          // the children that would match with a higher score, so let's fetch
          // around and find out
          let partialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
          return {
            active: true,
            matches: partialMatches
          };
        }
      }
    }
    return {
      active: false,
      matches: null
    };
  }
  async function discoverRoutes(matches, pathname, signal) {
    let partialMatches = matches;
    let route = partialMatches.length > 0 ? partialMatches[partialMatches.length - 1].route : null;
    while (true) {
      try {
        await loadLazyRouteChildren(patchRoutesOnMissImpl, pathname, partialMatches, dataRoutes || inFlightDataRoutes, manifest, mapRouteProperties, pendingPatchRoutes, signal);
      } catch (e) {
        return {
          type: "error",
          error: e,
          partialMatches
        };
      }
      if (signal.aborted) {
        return {
          type: "aborted"
        };
      }
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let newMatches = matchRoutes(routesToUse, pathname, basename);
      let matchedSplat = false;
      if (newMatches) {
        let leafRoute = newMatches[newMatches.length - 1].route;
        if (leafRoute.index) {
          // If we found an index route, we can stop
          return {
            type: "success",
            matches: newMatches
          };
        }
        if (leafRoute.path && leafRoute.path.length > 0) {
          if (leafRoute.path === "*") {
            // If we found a splat route, we can't be sure there's not a
            // higher-scoring route down some partial matches trail so we need
            // to check that out
            matchedSplat = true;
          } else {
            // If we found a non-splat route, we can stop
            return {
              type: "success",
              matches: newMatches
            };
          }
        }
      }
      let newPartialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
      // If we are no longer partially matching anything, this was either a
      // legit splat match above, or it's a 404.  Also avoid loops if the
      // second pass results in the same partial matches
      if (!newPartialMatches || partialMatches.map(m => m.route.id).join("-") === newPartialMatches.map(m => m.route.id).join("-")) {
        return {
          type: "success",
          matches: matchedSplat ? newMatches : null
        };
      }
      partialMatches = newPartialMatches;
      route = partialMatches[partialMatches.length - 1].route;
      if (route.path === "*") {
        // The splat is still our most accurate partial, so run with it
        return {
          type: "success",
          matches: partialMatches
        };
      }
    }
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties, undefined, manifest);
  }
  router = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: to => init.history.createHref(to),
    encodeLocation: to => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher: deleteFetcherAndUpdateState,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes(routeId, children) {
      return patchRoutes(routeId, children, dataRoutes || inFlightDataRoutes, manifest, mapRouteProperties);
    },
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  };
  return router;
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createStaticHandler
////////////////////////////////////////////////////////////////////////////////
const UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
function createStaticHandler(routes, opts) {
  invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let mapRouteProperties;
  if (opts != null && opts.mapRouteProperties) {
    mapRouteProperties = opts.mapRouteProperties;
  } else if (opts != null && opts.detectErrorBoundary) {
    // If they are still using the deprecated version, wrap it with the new API
    let detectErrorBoundary = opts.detectErrorBoundary;
    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  // Config driven behavior flags
  let future = _extends({
    v7_relativeSplatPath: false,
    v7_throwAbortReason: false
  }, opts ? opts.future : null);
  let dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties, undefined, manifest);
  /**
   * The query() method is intended for document requests, in which we want to
   * call an optional action and potentially multiple loaders for all nested
   * routes.  It returns a StaticHandlerContext object, which is very similar
   * to the router state (location, loaderData, actionData, errors, etc.) and
   * also adds SSR-specific information such as the statusCode and headers
   * from action/loaders Responses.
   *
   * It _should_ never throw and should report all errors through the
   * returned context.errors object, properly associating errors to their error
   * boundary.  Additionally, it tracks _deepestRenderedBoundaryId which can be
   * used to emulate React error boundaries during SSr by performing a second
   * pass only down to the boundaryId.
   *
   * The one exception where we do not return a StaticHandlerContext is when a
   * redirect response is returned or thrown from any action/loader.  We
   * propagate that out and return the raw Response so the HTTP server can
   * return it directly.
   *
   * - `opts.requestContext` is an optional server context that will be passed
   *   to actions/loaders in the `context` parameter
   * - `opts.skipLoaderErrorBubbling` is an optional parameter that will prevent
   *   the bubbling of errors which allows single-fetch-type implementations
   *   where the client will handle the bubbling and we may need to return data
   *   for the handling route
   */
  async function query(request, _temp3) {
    let {
      requestContext,
      skipLoaderErrorBubbling,
      unstable_dataStrategy
    } = _temp3 === void 0 ? {} : _temp3;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    // SSR supports HEAD requests while SPA doesn't
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      });
      let {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext, unstable_dataStrategy || null, skipLoaderErrorBubbling === true, null);
    if (isResponse(result)) {
      return result;
    }
    // When returning StaticHandlerContext, we patch back in the location here
    // since we need it for React Context.  But this helps keep our submit and
    // loadRouteData operating on a Request instead of a Location
    return _extends({
      location,
      basename
    }, result);
  }
  /**
   * The queryRoute() method is intended for targeted route requests, either
   * for fetch ?_data requests or resource route requests.  In this case, we
   * are only ever calling a single action or loader, and we are returning the
   * returned value directly.  In most cases, this will be a Response returned
   * from the action/loader, but it may be a primitive or other value as well -
   * and in such cases the calling context should handle that accordingly.
   *
   * We do respect the throw/return differentiation, so if an action/loader
   * throws, then this method will throw the value.  This is important so we
   * can do proper boundary identification in Remix where a thrown Response
   * must go to the Catch Boundary but a returned Response is happy-path.
   *
   * One thing to note is that any Router-initiated Errors that make sense
   * to associate with a status code will be thrown as an ErrorResponse
   * instance which include the raw Error, such that the calling context can
   * serialize the error as they see fit while including the proper response
   * code.  Examples here are 404 and 405 errors that occur prior to reaching
   * any user-defined loaders.
   *
   * - `opts.routeId` allows you to specify the specific route handler to call.
   *   If not provided the handler will determine the proper route by matching
   *   against `request.url`
   * - `opts.requestContext` is an optional server context that will be passed
   *    to actions/loaders in the `context` parameter
   */
  async function queryRoute(request, _temp4) {
    let {
      routeId,
      requestContext,
      unstable_dataStrategy
    } = _temp4 === void 0 ? {} : _temp4;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    // SSR supports HEAD requests while SPA doesn't
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, {
        method
      });
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let match = routeId ? matches.find(m => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      // This should never hit I don't think?
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let result = await queryImpl(request, location, matches, requestContext, unstable_dataStrategy || null, false, match);
    if (isResponse(result)) {
      return result;
    }
    let error = result.errors ? Object.values(result.errors)[0] : undefined;
    if (error !== undefined) {
      // If we got back result.errors, that means the loader/action threw
      // _something_ that wasn't a Response, but it's not guaranteed/required
      // to be an `instanceof Error` either, so we have to use throw here to
      // preserve the "error" state outside of queryImpl.
      throw error;
    }
    // Pick off the right state value to return
    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }
    if (result.loaderData) {
      var _result$activeDeferre;
      let data = Object.values(result.loaderData)[0];
      if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
        data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
      }
      return data;
    }
    return undefined;
  }
  async function queryImpl(request, location, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase())) {
        let result = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch != null);
        return result;
      }
      let result = await loadRouteData(request, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      // If the user threw/returned a Response in callLoaderOrAction for a
      // `queryRoute` call, we throw the `HandlerResult` to bail out early
      // and then return or throw the raw Response here accordingly
      if (isHandlerResult(e) && isResponse(e.result)) {
        if (e.type === ResultType.error) {
          throw e.result;
        }
        return e.result;
      }
      // Redirects are always returned since they don't propagate to catch
      // boundaries
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    } else {
      let results = await callDataStrategy("action", request, [actionMatch], matches, isRouteRequest, requestContext, unstable_dataStrategy);
      result = results[0];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest, future);
      }
    }
    if (isRedirectResult(result)) {
      // Uhhhh - this should never happen, we should always throw these from
      // callLoaderOrAction, but the type narrowing here keeps TS happy and we
      // can get back on the "throw all redirect responses" train here should
      // this ever happen :/
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      // Note: This should only be non-Response values if we get here, since
      // isRouteRequest should throw any Response received in callLoaderOrAction
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    // Create a GET request for the loaders
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let context = await loadRouteData(loaderRequest, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, null, [boundaryMatch.route.id, result]);
      // action status codes take precedence over loader status codes
      return _extends({}, context, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let context = await loadRouteData(loaderRequest, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, null);
    return _extends({}, context, {
      actionData: {
        [actionMatch.route.id]: result.data
      }
    }, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionHeaders: result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {}
    });
  }
  async function loadRouteData(request, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    // Short circuit if we have no loaders to run (queryRoute())
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }
    let requestMatches = routeMatch ? [routeMatch] : pendingActionResult && isErrorResult(pendingActionResult[1]) ? getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]) : matches;
    let matchesToLoad = requestMatches.filter(m => m.route.loader || m.route.lazy);
    // Short circuit if we have no loaders to run (query())
    if (matchesToLoad.length === 0) {
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    }
    let results = await callDataStrategy("loader", request, matchesToLoad, matches, isRouteRequest, requestContext, unstable_dataStrategy);
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest, future);
    }
    // Process and commit output from loaders
    let activeDeferreds = new Map();
    let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling);
    // Add a null for any non-loader matches for proper revalidation on the client
    let executedLoaders = new Set(matchesToLoad.map(match => match.route.id));
    matches.forEach(match => {
      if (!executedLoaders.has(match.route.id)) {
        context.loaderData[match.route.id] = null;
      }
    });
    return _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  // Utility wrapper for calling dataStrategy server-side without having to
  // pass around the manifest, mapRouteProperties, etc.
  async function callDataStrategy(type, request, matchesToLoad, matches, isRouteRequest, requestContext, unstable_dataStrategy) {
    let results = await callDataStrategyImpl(unstable_dataStrategy || defaultDataStrategy, type, request, matchesToLoad, matches, manifest, mapRouteProperties, requestContext);
    return await Promise.all(results.map((result, i) => {
      if (isRedirectHandlerResult(result)) {
        let response = result.result;
        // Throw redirects and let the server handle them with an HTTP redirect
        throw normalizeRelativeRoutingRedirectResponse(response, request, matchesToLoad[i].route.id, matches, basename, future.v7_relativeSplatPath);
      }
      if (isResponse(result.result) && isRouteRequest) {
        // For SSR single-route requests, we want to hand Responses back
        // directly without unwrapping
        throw result;
      }
      return convertHandlerResultToDataResult(result);
    }));
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Helpers
////////////////////////////////////////////////////////////////////////////////
/**
 * Given an existing StaticHandlerContext and an error thrown at render time,
 * provide an updated StaticHandlerContext suitable for a second SSR render
 */
function getStaticContextFromError(routes, context, error) {
  let newContext = _extends({}, context, {
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes[0].id]: error
    }
  });
  return newContext;
}
function throwStaticHandlerAbortedError(request, isRouteRequest, future) {
  if (future.v7_throwAbortReason && request.signal.reason !== undefined) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(method + "() call aborted: " + request.method + " " + request.url);
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== undefined);
}
function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    // Grab matches up to the calling route so our route-relative logic is
    // relative to the correct source route
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  // Resolve the relative path
  let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
  // When `to` is not specified we inherit search/hash from the current
  // location, unlike when to="." and we just inherit the path.
  // See https://github.com/remix-run/remix/issues/927
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  // Add an ?index param for matched index routes if we don't already have one
  if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  // If we're operating within a basename, prepend it to the pathname.  If
  // this is a root navigation, then just use the raw basename which allows
  // the basename to have full control over the presence of a trailing slash
  // on root actions
  if (prependBasename && basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
// Normalize navigation options by converting formMethod=GET formData objects to
// URLSearchParams so they behave identically to links with query params
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  // Return location verbatim on non-submission navigations
  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, {
      type: "invalid-body"
    })
  });
  // Create a Submission on non-GET navigations
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== undefined) {
    if (opts.formEncType === "text/plain") {
      // text only support POST/PUT/PATCH/DELETE submissions
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ?
      // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
      Array.from(opts.body.entries()).reduce((acc, _ref5) => {
        let [name, value] = _ref5;
        return "" + acc + name + "=" + value + "\n";
      }, "") : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: undefined,
          json: undefined,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      // json only supports POST/PUT/PATCH/DELETE submissions
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: undefined,
            json,
            text: undefined
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(typeof FormData === "function", "FormData is not available in this environment");
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: undefined,
    text: undefined
  };
  if (isMutationMethod(submission.formMethod)) {
    return {
      path,
      submission
    };
  }
  // Flatten submission onto URLSearchParams for GET submissions
  let parsedPath = parsePath(path);
  // On GET navigation submissions we can drop the ?index param from the
  // resulting location since all loaders will run.  But fetcher GET submissions
  // only run a single loader so we need to preserve any incoming ?index params
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = "?" + searchParams;
  return {
    path: createPath(parsedPath),
    submission
  };
}
// Filter out all routes below any caught error as they aren't going to
// render so we don't need to load them
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex(m => m.route.id === boundaryId);
    if (index >= 0) {
      boundaryMatches = matches.slice(0, index);
    }
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location, isInitialLoad, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : undefined;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  // Pick navigation matches that are net-new or qualify for revalidation
  let boundaryId = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[0] : undefined;
  let boundaryMatches = boundaryId ? getLoaderMatchesUntilBoundary(matches, boundaryId) : matches;
  // Don't revalidate loaders by default after action 4xx/5xx responses
  // when the flag is enabled.  They can still opt-into revalidation via
  // `shouldRevalidate` via `actionResult`
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : undefined;
  let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
  let navigationMatches = boundaryMatches.filter((match, index) => {
    let {
      route
    } = match;
    if (route.lazy) {
      // We haven't loaded this route yet so we don't know if it's got a loader!
      return true;
    }
    if (route.loader == null) {
      return false;
    }
    if (isInitialLoad) {
      if (typeof route.loader !== "function" || route.loader.hydrate) {
        return true;
      }
      return state.loaderData[route.id] === undefined && (
      // Don't re-run if the loader ran and threw an error
      !state.errors || state.errors[route.id] === undefined);
    }
    // Always call the loader on new route instances and pending defer cancellations
    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some(id => id === match.route.id)) {
      return true;
    }
    // This is the default implementation for when we revalidate.  If the route
    // provides it's own implementation, then we give them full control but
    // provide this value so they can leverage it if needed after they check
    // their own specific use cases
    let currentRouteMatch = state.matches[index];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      unstable_actionStatus: actionStatus,
      defaultShouldRevalidate: shouldSkipRevalidation ? false :
      // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
      isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search ||
      // Search params affect all loaders
      currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
    }));
  });
  // Pick fetcher.loads that need to be revalidated
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    // Don't revalidate:
    //  - on initial load (shouldn't be any fetchers then anyway)
    //  - if fetcher won't be present in the subsequent render
    //    - no longer matches the URL (v7_fetcherPersist=false)
    //    - was unmounted but persisted due to v7_fetcherPersist=true
    if (isInitialLoad || !matches.some(m => m.route.id === f.routeId) || deletedFetchers.has(key)) {
      return;
    }
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    // If the fetcher path no longer matches, push it in with null matches so
    // we can trigger a 404 in callLoadersAndMaybeResolveData.  Note this is
    // currently only a use-case for Remix HMR where the route tree can change
    // at runtime and remove a route previously loaded via a fetcher
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    // Revalidating fetchers are decoupled from the route matches since they
    // load from a static href.  They revalidate based on explicit revalidation
    // (submission, useRevalidator, or X-Remix-Revalidate)
    let fetcher = state.fetchers.get(key);
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    let shouldRevalidate = false;
    if (fetchRedirectIds.has(key)) {
      // Never trigger a revalidation of an actively redirecting fetcher
      shouldRevalidate = false;
    } else if (cancelledFetcherLoads.includes(key)) {
      // Always revalidate if the fetcher was cancelled
      shouldRevalidate = true;
    } else if (fetcher && fetcher.state !== "idle" && fetcher.data === undefined) {
      // If the fetcher hasn't ever completed loading yet, then this isn't a
      // revalidation, it would just be a brand new load if an explicit
      // revalidation is required
      shouldRevalidate = isRevalidationRequired;
    } else {
      // Otherwise fall back on any user-defined shouldRevalidate, defaulting
      // to explicit revalidations only
      shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
        currentUrl,
        currentParams: state.matches[state.matches.length - 1].params,
        nextUrl,
        nextParams: matches[matches.length - 1].params
      }, submission, {
        actionResult,
        unstable_actionStatus: actionStatus,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
      }));
    }
    if (shouldRevalidate) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew =
  // [a] -> [a, b]
  !currentMatch ||
  // [a, b] -> [a, c]
  match.route.id !== currentMatch.route.id;
  // Handle the case that we don't have data for a re-used route, potentially
  // from a prior error or from a cancelled pending deferred
  let isMissingData = currentLoaderData[match.route.id] === undefined;
  // Always load if this is a net-new route or we don't yet have data
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname ||
    // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
/**
 * Idempotent utility to execute route.children() method to lazily load route
 * definitions and update the routes/routeManifest
 */
async function loadLazyRouteChildren(patchRoutesOnMissImpl, path, matches, routes, manifest, mapRouteProperties, pendingRouteChildren, signal) {
  let key = [path, ...matches.map(m => m.route.id)].join("-");
  try {
    let pending = pendingRouteChildren.get(key);
    if (!pending) {
      pending = patchRoutesOnMissImpl({
        path,
        matches,
        patch: (routeId, children) => {
          if (!signal.aborted) {
            patchRoutes(routeId, children, routes, manifest, mapRouteProperties);
          }
        }
      });
      pendingRouteChildren.set(key, pending);
    }
    if (pending && isPromise(pending)) {
      await pending;
    }
  } finally {
    pendingRouteChildren.delete(key);
  }
}
function patchRoutes(routeId, children, routes, manifest, mapRouteProperties) {
  if (routeId) {
    var _route$children;
    let route = manifest[routeId];
    invariant(route, "No route found to patch children into: routeId = " + routeId);
    let dataChildren = convertRoutesToDataRoutes(children, mapRouteProperties, [routeId, "patch", String(((_route$children = route.children) == null ? void 0 : _route$children.length) || "0")], manifest);
    if (route.children) {
      route.children.push(...dataChildren);
    } else {
      route.children = dataChildren;
    }
  } else {
    let dataChildren = convertRoutesToDataRoutes(children, mapRouteProperties, ["patch", String(routes.length || "0")], manifest);
    routes.push(...dataChildren);
  }
}
/**
 * Execute route.lazy() methods to lazily load route modules (loader, action,
 * shouldRevalidate) and update the routeManifest in place which shares objects
 * with dataRoutes so those get updated as well.
 */
async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
  if (!route.lazy) {
    return;
  }
  let lazyRoute = await route.lazy();
  // If the lazy route function was executed and removed by another parallel
  // call then we can return - first lazy() to finish wins because the return
  // value of lazy is expected to be static
  if (!route.lazy) {
    return;
  }
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  // Update the route in place.  This should be safe because there's no way
  // we could yet be sitting on this route as we can't get there without
  // resolving lazy() first.
  //
  // This is different than the HMR "update" use-case where we may actively be
  // on the route being updated.  The main concern boils down to "does this
  // mutation affect any ongoing navigations or any current state.matches
  // values?".  If not, it should be safe to update in place.
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let staticRouteValue = routeToUpdate[lazyRouteProperty];
    let isPropertyStaticallyDefined = staticRouteValue !== undefined &&
    // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, "Route \"" + routeToUpdate.id + "\" has a static property \"" + lazyRouteProperty + "\" " + "defined but its lazy function is also returning a value for this property. " + ("The lazy route property \"" + lazyRouteProperty + "\" will be ignored."));
    if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
      routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
    }
  }
  // Mutate the route with the provided updates.  Do this first so we pass
  // the updated version to mapRouteProperties
  Object.assign(routeToUpdate, routeUpdates);
  // Mutate the `hasErrorBoundary` property on the route based on the route
  // updates and remove the `lazy` function so we don't resolve the lazy
  // route again.
  Object.assign(routeToUpdate, _extends({}, mapRouteProperties(routeToUpdate), {
    lazy: undefined
  }));
}
// Default implementation of `dataStrategy` which fetches all loaders in parallel
function defaultDataStrategy(opts) {
  return Promise.all(opts.matches.map(m => m.resolve()));
}
async function callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties, requestContext) {
  let routeIdsToLoad = matchesToLoad.reduce((acc, m) => acc.add(m.route.id), new Set());
  let loadedMatches = new Set();
  // Send all matches here to allow for a middleware-type implementation.
  // handler will be a no-op for unneeded routes and we filter those results
  // back out below.
  let results = await dataStrategyImpl({
    matches: matches.map(match => {
      let shouldLoad = routeIdsToLoad.has(match.route.id);
      // `resolve` encapsulates the route.lazy, executing the
      // loader/action, and mapping return values/thrown errors to a
      // HandlerResult.  Users can pass a callback to take fine-grained control
      // over the execution of the loader/action
      let resolve = handlerOverride => {
        loadedMatches.add(match.route.id);
        return shouldLoad ? callLoaderOrAction(type, request, match, manifest, mapRouteProperties, handlerOverride, requestContext) : Promise.resolve({
          type: ResultType.data,
          result: undefined
        });
      };
      return _extends({}, match, {
        shouldLoad,
        resolve
      });
    }),
    request,
    params: matches[0].params,
    context: requestContext
  });
  // Throw if any loadRoute implementations not called since they are what
  // ensures a route is fully loaded
  matches.forEach(m => invariant(loadedMatches.has(m.route.id), "`match.resolve()` was not called for route id \"" + m.route.id + "\". " + "You must call `match.resolve()` on every match passed to " + "`dataStrategy` to ensure all routes are properly loaded."));
  // Filter out any middleware-only matches for which we didn't need to run handlers
  return results.filter((_, i) => routeIdsToLoad.has(matches[i].route.id));
}
// Default logic for calling a loader/action is the user has no specified a dataStrategy
async function callLoaderOrAction(type, request, match, manifest, mapRouteProperties, handlerOverride, staticContext) {
  let result;
  let onReject;
  let runHandler = handler => {
    // Setup a promise we can race against so that abort signals short circuit
    let reject;
    // This will never resolve so safe to type it as Promise<HandlerResult> to
    // satisfy the function return value
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = ctx => {
      if (typeof handler !== "function") {
        return Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ("\"" + type + "\" [routeId: " + match.route.id + "]")));
      }
      return handler({
        request,
        params: match.params,
        context: staticContext
      }, ...(ctx !== undefined ? [ctx] : []));
    };
    let handlerPromise;
    if (handlerOverride) {
      handlerPromise = handlerOverride(ctx => actualHandler(ctx));
    } else {
      handlerPromise = (async () => {
        try {
          let val = await actualHandler();
          return {
            type: "data",
            result: val
          };
        } catch (e) {
          return {
            type: "error",
            result: e
          };
        }
      })();
    }
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (match.route.lazy) {
      if (handler) {
        // Run statically defined handler in parallel with lazy()
        let handlerError;
        let [value] = await Promise.all([
        // If the handler throws, don't let it immediately bubble out,
        // since we need to let the lazy() execution finish so we know if this
        // route has a boundary that can handle the error
        runHandler(handler).catch(e => {
          handlerError = e;
        }), loadLazyRouteModule(match.route, mapRouteProperties, manifest)]);
        if (handlerError !== undefined) {
          throw handlerError;
        }
        result = value;
      } else {
        // Load lazy route module, then run any returned handler
        await loadLazyRouteModule(match.route, mapRouteProperties, manifest);
        handler = match.route[type];
        if (handler) {
          // Handler still runs even if we got interrupted to maintain consistency
          // with un-abortable behavior of handler execution on non-lazy or
          // previously-lazy-loaded routes
          result = await runHandler(handler);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          // lazy() route has no loader to run.  Short circuit here so we don't
          // hit the invariant below that errors on returning undefined.
          return {
            type: ResultType.data,
            result: undefined
          };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
    invariant(result.result !== undefined, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ("\"" + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    // We should already be catching and converting normal handler executions to
    // HandlerResults and returning them, so anything that throws here is an
    // unexpected error we still need to wrap
    return {
      type: ResultType.error,
      result: e
    };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function convertHandlerResultToDataResult(handlerResult) {
  let {
    result,
    type,
    status
  } = handlerResult;
  if (isResponse(result)) {
    let data;
    try {
      let contentType = result.headers.get("Content-Type");
      // Check between word boundaries instead of startsWith() due to the last
      // paragraph of https://httpwg.org/specs/rfc9110.html#field.content-type
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        if (result.body == null) {
          data = null;
        } else {
          data = await result.json();
        }
      } else {
        data = await result.text();
      }
    } catch (e) {
      return {
        type: ResultType.error,
        error: e
      };
    }
    if (type === ResultType.error) {
      return {
        type: ResultType.error,
        error: new ErrorResponseImpl(result.status, result.statusText, data),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === ResultType.error) {
    return {
      type: ResultType.error,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : status
    };
  }
  if (isDeferredData(result)) {
    var _result$init, _result$init2;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
      headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
    };
  }
  return {
    type: ResultType.data,
    data: result,
    statusCode: status
  };
}
// Support relative routing in internal redirects
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
  let location = response.headers.get("Location");
  invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
  if (!ABSOLUTE_URL_REGEX.test(location)) {
    let trimmedMatches = matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1);
    location = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location, v7_relativeSplatPath);
    response.headers.set("Location", location);
  }
  return response;
}
function normalizeRedirectLocation(location, currentUrl, basename) {
  if (ABSOLUTE_URL_REGEX.test(location)) {
    // Strip off the protocol+origin for same-origin + same-basename absolute redirects
    let normalizedLocation = location;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location;
}
// Utility method for creating the Request instances for loaders/actions during
// client-side navigations and fetches.  During SSR we will always have a
// Request instance from the static handler (query/queryRoute)
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType
    } = submission;
    // Didn't think we needed this but it turns out unlike other methods, patch
    // won't be properly normalized to uppercase and results in a 405 error.
    // See: https://fetch.spec.whatwg.org/#concept-method
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({
        "Content-Type": formEncType
      });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
  // Fill in loaderData/errors from our loaders
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : undefined;
  // Process loader results into state.loaderData/state.errors
  results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
    if (isErrorResult(result)) {
      let error = result.error;
      // If we have a pending action error, we report it at the highest-route
      // that throws a loader error, and then clear it out to indicate that
      // it was consumed
      if (pendingError !== undefined) {
        error = pendingError;
        pendingError = undefined;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        // Look upwards from the matched route for the closest ancestor error
        // boundary, defaulting to the root match.  Prefer higher error values
        // if lower errors bubble to the same boundary
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      // Clear our any prior loaderData for the throwing route
      loaderData[id] = undefined;
      // Once we find our first (highest) error, we set the status code and
      // prevent deeper status codes from overriding
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id, result.deferredData);
        loaderData[id] = result.deferredData.data;
        // Error status codes always override success status codes, but if all
        // loaders are successful we take the deepest status code.
        if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id] = result.headers;
        }
      } else {
        loaderData[id] = result.data;
        // Error status codes always override success status codes, but if all
        // loaders are successful we take the deepest status code.
        if (result.statusCode && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id] = result.headers;
        }
      }
    }
  });
  // If we didn't consume the pending action error (i.e., all loaders
  // resolved), then consume it here.  Also clear out any loaderData for the
  // throwing route
  if (pendingError !== undefined && pendingActionResult) {
    errors = {
      [pendingActionResult[0]]: pendingError
    };
    loaderData[pendingActionResult[0]] = undefined;
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds, false // This method is only called client side so we always want to bubble
  );
  // Process results from our revalidating fetchers
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      match,
      controller
    } = revalidatingFetchers[index];
    invariant(fetcherResults !== undefined && fetcherResults[index] !== undefined, "Did not find corresponding fetcher result");
    let result = fetcherResults[index];
    // Process fetcher non-redirect errors
    if (controller && controller.signal.aborted) {
      // Nothing to do for aborted fetchers
      continue;
    } else if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        });
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      // Should never get here, redirects should get processed above, but we
      // keep this to type narrow to a success result in the else
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      // Should never get here, deferred data should be awaited for fetchers
      // in resolveDeferredResults
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match of matches) {
    let id = match.route.id;
    if (newLoaderData.hasOwnProperty(id)) {
      if (newLoaderData[id] !== undefined) {
        mergedLoaderData[id] = newLoaderData[id];
      }
    } else if (loaderData[id] !== undefined && match.route.loader) {
      // Preserve existing keys not included in newLoaderData and where a loader
      // wasn't removed by HMR
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      // Don't keep any loader data below the boundary
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
// Find the nearest error boundary, looking upwards from the leaf route (or the
// route specified by routeId) for the closest ancestor error boundary,
// defaulting to the root match
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find(m => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  // Prefer a root layout route if present, otherwise shim in a route object
  let route = routes.length === 1 ? routes[0] : routes.find(r => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp5) {
  let {
    pathname,
    routeId,
    method,
    type,
    message
  } = _temp5 === void 0 ? {} : _temp5;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (type === "route-discovery") {
      errorMessage = "Unable to match URL \"" + pathname + "\" - the `children()` function for " + ("route `" + routeId + "` threw the following error:\n" + message);
    } else if (method && pathname && routeId) {
      errorMessage = "You made a " + method + " request to \"" + pathname + "\" but " + ("did not provide a `loader` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = "Route \"" + routeId + "\" does not match URL \"" + pathname + "\"";
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = "No route matches URL \"" + pathname + "\"";
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + " request to \"" + pathname + "\" but " + ("did not provide an `action` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = "Invalid request method \"" + method.toUpperCase() + "\"";
    }
  }
  return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
}
// Find any returned redirect errors, starting from the lowest match
function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];
    if (isRedirectResult(result)) {
      return {
        result,
        idx: i
      };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    // /page -> /page#hash
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    // /page#hash -> /page#hash
    return true;
  } else if (b.hash !== "") {
    // /page#hash -> /page#other
    return true;
  }
  // If the hash is removed the browser will re-perform a request to the server
  // /page#hash -> /page
  return false;
}
function isPromise(val) {
  return typeof val === "object" && val != null && "then" in val;
}
function isHandlerResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === ResultType.data || result.type === ResultType.error);
}
function isRedirectHandlerResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectResponse(result) {
  if (!isResponse(result)) {
    return false;
  }
  let status = result.status;
  let location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index];
    let match = matchesToLoad[index];
    // If we don't have a match, then we can have a deferred result to do
    // anything with.  This is for revalidating fetchers where the route was
    // removed during HMR
    if (!match) {
      continue;
    }
    let currentMatch = currentMatches.find(m => m.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== undefined;
    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      // Note: we do not have to touch activeDeferreds here since we race them
      // against the signal in resolveDeferredData and they'll get aborted
      // there if needed
      let signal = signals[index];
      invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result");
      await resolveDeferredData(result, signal, isFetcher).then(result => {
        if (result) {
          results[index] = result || results[index];
        }
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }
  let aborted = await result.deferredData.resolveData(signal);
  if (aborted) {
    return;
  }
  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e) {
      // Handle any TrackedPromise._error values encountered while unwrapping
      return {
        type: ResultType.error,
        error: e
      };
    }
  }
  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some(v => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    // Return the leaf index route when index is present
    return matches[matches.length - 1];
  }
  // Otherwise grab the deepest "path contributing" match (ignoring index and
  // pathless layout routes)
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let {
    formMethod,
    formAction,
    formEncType,
    text,
    formData,
    json
  } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: undefined,
      json: undefined,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: undefined,
      text: undefined
    };
  } else if (json !== undefined) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: undefined,
      json,
      text: undefined
    };
  }
}
function getLoadingNavigation(location, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      json: undefined,
      text: undefined
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, submission) {
  let navigation = {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      json: undefined,
      text: undefined,
      data
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : undefined
  };
  return fetcher;
}
function getDoneFetcher(data) {
  let fetcher = {
    state: "idle",
    formMethod: undefined,
    formAction: undefined,
    formEncType: undefined,
    formData: undefined,
    json: undefined,
    text: undefined,
    data
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
    if (sessionPositions) {
      let json = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json || {})) {
        if (v && Array.isArray(v)) {
          transitions.set(k, new Set(v || []));
        }
      }
    }
  } catch (e) {
    // no-op, use default empty object
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json = {};
    for (let [k, v] of transitions) {
      json[k] = [...v];
    }
    try {
      _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json));
    } catch (error) {
      warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
    }
  }
}
//#endregion


//# sourceMappingURL=router.js.map


/***/ }),

/***/ "./src/assets/images/get-5-star-support.svg":
/*!**************************************************!*\
  !*** ./src/assets/images/get-5-star-support.svg ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgGet5StarSupport),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _circle, _path, _path2;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgGet5StarSupport(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 36,
    height: 36,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _circle || (_circle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 18,
    cy: 18,
    r: 18,
    fill: "#0167FF",
    fillOpacity: 0.2
  })), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M26.22 24.86c-.483-1.44-2.41-2.34-3.783-2.943-.538-.236-2.028-.636-2.207-1.313a1.401 1.401 0 01-.003-.695 1.35 1.35 0 01-.254.025h-.895a1.296 1.296 0 01-1.295-1.295c0-.714.581-1.294 1.295-1.294h.895c.296 0 .576.1.802.279.322-.043.64-.112.95-.208.391-.82.696-1.8.765-2.645.292-3.611-1.922-5.724-5.097-5.36-2.308.267-3.687 1.988-3.836 4.203-.15 2.259.687 3.927 1.576 5.15.39.535.8.88.736 1.524-.073.762-.888.974-1.47 1.209-.691.277-1.435.698-1.787.893-1.21.668-2.539 1.473-2.837 2.574-.661 2.44 1.572 3.18 3.415 3.52 1.582.293 3.366.316 4.833.316 2.655 0 7.427-.107 8.197-2.102.219-.566.125-1.468 0-1.839z",
    fill: "#0167FF"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M20.537 18.273a.676.676 0 00-.566-.307h-.895a.675.675 0 100 1.348h.895a.67.67 0 00.595-.365c1.248-.098 2.333-.479 3.095-1.042.175.113.381.18.605.18h.056a1.126 1.126 0 001.125-1.127V14.71a1.122 1.122 0 00-.641-1.013c-.166-3.61-3.154-6.499-6.805-6.499s-6.64 2.888-6.805 6.499a1.12 1.12 0 00-.641 1.013v2.249a1.124 1.124 0 001.124 1.126h.057a1.125 1.125 0 001.125-1.126V14.71a1.123 1.123 0 00-.626-1.006A5.781 5.781 0 0118 8.24a5.78 5.78 0 015.765 5.466 1.124 1.124 0 00-.625 1.006v2.249c0 .15.03.288.08.418-.655.47-1.61.803-2.684.895z",
    fill: "#0167FF"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTgiIGZpbGw9IiMwMTY3RkYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGQ9Ik0yNi4yMiAyNC44NTkyQzI1LjczNjcgMjMuNDIwNyAyMy44MTAyIDIyLjUyMDIgMjIuNDM2NyAyMS45MTY2QzIxLjg5ODYgMjEuNjgwOSAyMC40MDg5IDIxLjI4MTEgMjAuMjI5OSAyMC42MDM2QzIwLjE2NTggMjAuMzU5NSAyMC4xNzQ0IDIwLjEyOTMgMjAuMjI3IDE5LjkwODhDMjAuMTQzNCAxOS45MjUyIDIwLjA1ODUgMTkuOTMzNiAxOS45NzMzIDE5LjkzNEgxOS4wNzgzQzE4LjczNSAxOS45MzM2IDE4LjQwNTcgMTkuNzk3IDE4LjE2MyAxOS41NTQxQzE3LjkyMDIgMTkuMzExMyAxNy43ODM2IDE4Ljk4MjEgMTcuNzgzMyAxOC42Mzg3QzE3Ljc4MzMgMTcuOTI1MiAxOC4zNjQxIDE3LjM0NTEgMTkuMDc4MyAxNy4zNDUxSDE5Ljk3MzNDMjAuMjY5IDE3LjM0NTEgMjAuNTQ5MyAxNy40NDUyIDIwLjc3NTQgMTcuNjIzN0MyMS4wOTcxIDE3LjU4MTMgMjEuNDE0NiAxNy41MTE4IDIxLjcyNDYgMTcuNDE1OUMyMi4xMTYgMTYuNTk1OCAyMi40MjEzIDE1LjYxNTIgMjIuNDg5NyAxNC43NzExQzIyLjc4MTggMTEuMTU5NiAyMC41Njc4IDkuMDQ2NiAxNy4zOTMzIDkuNDExODhDMTUuMDg1MiA5LjY3NzU2IDEzLjcwNjQgMTEuMzk4NiAxMy41NTc0IDEzLjYxNDNDMTMuNDA2NyAxNS44NzI3IDE0LjI0NCAxNy41NDA3IDE1LjEzMzUgMTguNzY0MkMxNS41MjMgMTkuMjk5MiAxNS45MzIyIDE5LjY0MzEgMTUuODY5MyAyMC4yODc3QzE1Ljc5NjMgMjEuMDUgMTQuOTgxMyAyMS4yNjI0IDE0LjM5ODMgMjEuNDk2NkMxMy43MDc2IDIxLjc3NCAxMi45NjM2IDIyLjE5NSAxMi42MTIzIDIyLjM4OTZDMTEuNDAxOSAyMy4wNTggMTAuMDczNSAyMy44NjMgOS43NzQ5OSAyNC45NjQxQzkuMTEzNzkgMjcuNDA0NCAxMS4zNDY3IDI4LjE0MzYgMTMuMTkwMiAyOC40ODQ5QzE0Ljc3MjMgMjguNzc2OCAxNi41NTYyIDI4Ljc5OTggMTguMDIzNSAyOC43OTk4QzIwLjY3NzcgMjguNzk5OCAyNS40NTAzIDI4LjY5MzUgMjYuMjIgMjYuNjk4NEMyNi40Mzg5IDI2LjEzMjIgMjYuMzQ1MSAyNS4yMyAyNi4yMiAyNC44NTkyWiIgZmlsbD0iIzAxNjdGRiIvPgo8cGF0aCBkPSJNMjAuNTM2OCAxOC4yNzM1QzIwLjQ3NTUgMTguMTc5MiAyMC4zOTE2IDE4LjEwMTYgMjAuMjkyOCAxOC4wNDc5QzIwLjE5NCAxNy45OTQxIDIwLjA4MzMgMTcuOTY1OCAxOS45NzA4IDE3Ljk2NTZIMTkuMDc1OUMxOC45ODU4IDE3Ljk2MzIgMTguODk2MiAxNy45Nzg5IDE4LjgxMjMgMTguMDExN0MxOC43Mjg0IDE4LjA0NDUgMTguNjUyIDE4LjA5MzcgMTguNTg3NCAxOC4xNTY2QzE4LjUyMjkgMTguMjE5NCAxOC40NzE2IDE4LjI5NDYgMTguNDM2NiAxOC4zNzc1QzE4LjQwMTUgMTguNDYwNSAxOC4zODM1IDE4LjU0OTcgMTguMzgzNSAxOC42Mzk4QzE4LjM4MzUgMTguNzI5OSAxOC40MDE1IDE4LjgxOSAxOC40MzY2IDE4LjkwMkMxOC40NzE2IDE4Ljk4NSAxOC41MjI5IDE5LjA2MDEgMTguNTg3NCAxOS4xMjNDMTguNjUyIDE5LjE4NTggMTguNzI4NCAxOS4yMzUxIDE4LjgxMjMgMTkuMjY3OUMxOC44OTYyIDE5LjMwMDcgMTguOTg1OCAxOS4zMTYzIDE5LjA3NTkgMTkuMzEzOUgxOS45NzA4QzIwLjA5NCAxOS4zMTM4IDIwLjIxNDcgMTkuMjc5NyAyMC4zMTk3IDE5LjIxNTRDMjAuNDI0NiAxOS4xNTExIDIwLjUwOTggMTkuMDU5IDIwLjU2NTggMTguOTQ5NEMyMS44MTM2IDE4Ljg1MTIgMjIuODk4OCAxOC40NzAxIDIzLjY2MDYgMTcuOTA3M0MyMy44MzU2IDE4LjAyMDEgMjQuMDQyNCAxOC4wODYxIDI0LjI2NTYgMTguMDg2MUgyNC4zMjE4QzI0LjQ2OTcgMTguMDg2MSAyNC42MTYxIDE4LjA1NyAyNC43NTI3IDE4LjAwMDRDMjQuODg5MyAxNy45NDM4IDI1LjAxMzQgMTcuODYwOCAyNS4xMTc5IDE3Ljc1NjJDMjUuMjIyNCAxNy42NTE2IDI1LjMwNTIgMTcuNTI3NCAyNS4zNjE3IDE3LjM5MDdDMjUuNDE4MiAxNy4yNTQxIDI1LjQ0NzEgMTcuMTA3NiAyNS40NDY5IDE2Ljk1OThWMTQuNzExNUMyNS40NDcgMTQuNDk5MSAyNS4zODY3IDE0LjI5MTEgMjUuMjczMiAxNC4xMTE2QzI1LjE1OTcgMTMuOTMyMiAyNC45OTc1IDEzLjc4ODYgMjQuODA1NiAxMy42OTc3QzI0LjY0MDUgMTAuMDg3NCAyMS42NTE4IDcuMTk5MjIgMTguMDAwOSA3LjE5OTIyQzE0LjM1IDcuMTk5MjIgMTEuMzYwOCAxMC4wODc0IDExLjE5NjQgMTMuNjk3N0MxMS4wMDQ0IDEzLjc4ODUgMTAuODQyMSAxMy45MzIgMTAuNzI4NSAxNC4xMTE1QzEwLjYxNDkgMTQuMjkxIDEwLjU1NDYgMTQuNDk5IDEwLjU1NDcgMTQuNzExNVYxNi45NTk4QzEwLjU1NDUgMTcuMTA3NiAxMC41ODM0IDE3LjI1MzkgMTAuNjM5OCAxNy4zOTA1QzEwLjY5NjIgMTcuNTI3MSAxMC43NzkgMTcuNjUxMyAxMC44ODM0IDE3Ljc1NTlDMTAuOTg3OCAxNy44NjA1IDExLjExMTggMTcuOTQzNSAxMS4yNDgzIDE4LjAwMDFDMTEuMzg0OCAxOC4wNTY4IDExLjUzMTEgMTguMDg2IDExLjY3ODggMTguMDg2MUgxMS43MzU3QzExLjg4MzYgMTguMDg2MSAxMi4wMjk5IDE4LjA1NjkgMTIuMTY2NSAxOC4wMDAzQzEyLjMwMzEgMTcuOTQzNiAxMi40MjcxIDE3Ljg2MDcgMTIuNTMxNiAxNy43NTYxQzEyLjYzNiAxNy42NTE0IDEyLjcxODkgMTcuNTI3MyAxMi43NzUzIDE3LjM5MDdDMTIuODMxOCAxNy4yNTQgMTIuODYwOCAxNy4xMDc2IDEyLjg2MDYgMTYuOTU5OFYxNC43MTE1QzEyLjg2MDUgMTQuNTAyMSAxMi44MDE4IDE0LjI5NjkgMTIuNjkxMiAxNC4xMTkxQzEyLjU4MDYgMTMuOTQxMyAxMi40MjI1IDEzLjc5OCAxMi4yMzQ3IDEzLjcwNTRDMTIuMzk1MiAxMC42NjM0IDE0LjkxOTYgOC4yMzg2NiAxOC4wMDA5IDguMjM4NjZDMjEuMDgxMSA4LjIzODY2IDIzLjYwNjYgMTAuNjYzNCAyMy43NjY0IDEzLjcwNTRDMjMuNTc4OSAxMy43OTgyIDIzLjQyMDkgMTMuOTQxNSAyMy4zMTA0IDE0LjExOTNDMjMuMiAxNC4yOTcxIDIzLjE0MTQgMTQuNTAyMiAyMy4xNDEyIDE0LjcxMTVWMTYuOTU5OEMyMy4xNDEyIDE3LjEwOTEgMjMuMTcwMyAxNy4yNDggMjMuMjIxNCAxNy4zNzc5QzIyLjU2NTcgMTcuODQ3MSAyMS42MTEyIDE4LjE4MTQgMjAuNTM2OCAxOC4yNzM1WiIgZmlsbD0iIzAxNjdGRiIvPgo8L3N2Zz4K");


/***/ }),

/***/ "./src/assets/images/icon.svg":
/*!************************************!*\
  !*** ./src/assets/images/icon.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgIcon),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2, _path3, _path4, _path5;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 40,
    height: 38,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M34.397 4.488c3.566 2.604 5.943 6.66 5.563 10.323-.354 3.664-3.439 6.96-5.588 11.107-2.15 4.148-3.363 9.148-6.524 10.945-3.186 1.797-8.344.392-12.744-1.59-4.425-2.005-8.142-4.585-10.873-8.088-2.73-3.48-4.5-7.88-4.197-12.397.278-4.516 2.655-9.125 6.549-11.683C10.452.571 15.863.064 20.945.41c5.083.323 9.862 1.475 13.452 4.079z",
    fill: "#fff"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19.39 15.964c0-.207.168-.374.375-.374h4.195a.374.374 0 110 .749h-4.195a.375.375 0 01-.374-.375zM19.438 18.062c0-.207.167-.375.374-.375h4.195a.375.375 0 010 .75h-4.195a.375.375 0 01-.375-.375zM19.469 20.16c0-.207.167-.375.374-.375h4.195a.374.374 0 110 .75h-4.195a.374.374 0 01-.374-.375zM19.5 22.257c0-.207.168-.374.375-.374h4.194a.375.375 0 010 .749h-4.194a.375.375 0 01-.375-.375z",
    fill: "#000"
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.719 10.574c0-.703.57-1.273 1.273-1.273h2.285a.374.374 0 110 .749H8.992a.524.524 0 00-.524.524v17.041c0 .29.235.525.524.525h17.303c.29 0 .525-.235.525-.525v-17.04a.524.524 0 00-.524-.525h-7.379a.375.375 0 110-.75h7.378c.704 0 1.274.57 1.274 1.274v17.041c0 .704-.57 1.274-1.273 1.274H8.992c-.703 0-1.273-.57-1.273-1.274v-17.04z",
    fill: "#000"
  })), _path4 || (_path4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.224 25.257a1.573 1.573 0 11-3.146 0 1.573 1.573 0 013.146 0zm-1.573.824a.824.824 0 100-1.648.824.824 0 000 1.648zM16.177 25.257a1.573 1.573 0 11-3.146 0 1.573 1.573 0 013.146 0zm-1.573.824a.824.824 0 100-1.648.824.824 0 000 1.648zM19.25 11.773c0-.207.168-.375.375-.375h.15a.375.375 0 110 .75h-.15a.375.375 0 01-.375-.375zM21.219 11.773c0-.207.167-.375.374-.375h.15a.375.375 0 010 .75h-.15a.374.374 0 01-.374-.375zM23.156 11.773c0-.207.168-.375.375-.375h.15a.375.375 0 010 .75h-.15a.375.375 0 01-.375-.375zM9.297 11.812c0-.207.168-.374.374-.374h5.843a.374.374 0 110 .749H9.671a.375.375 0 01-.374-.375z",
    fill: "#000"
  })), _path5 || (_path5 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M39.275 25.777l-5.804-5.808-.79.794-.182.184-.912-.917c.213-.245.425-.49.608-.734.09-.153.212-.306.304-.428.03-.061.09-.153.121-.214.06-.092.091-.153.152-.244a10.113 10.113 0 001.367-4.372c.487-5.685-3.737-10.73-9.39-11.218-5.682-.49-10.666 3.76-11.152 9.445a10.8 10.8 0 00.243 3.302c.03.153.091.305.122.458l.091.275c0 .03 0 .03.03.061.03.092.061.153.092.245.334 1.009.85 1.956 1.489 2.843h.03a10.234 10.234 0 006.29 3.913c-.03 0-.06 0-.09.03.637.123 1.306.214 1.944.214 2.127 0 4.133-.611 5.865-1.803.304-.214.608-.459.912-.703l.911.917-1.124 1.1 5.804 5.808c.425.428.972.673 1.55.673.577 0 1.154-.214 1.58-.642.425-.428.668-.978.668-1.56-.09-.641-.303-1.191-.729-1.62zm-7.992-11.983a7.457 7.457 0 01-4.376 6.175c-1.124.52-2.37.733-3.677.641-2.248-.183-4.163-1.375-5.409-3.087a7.518 7.518 0 01-1.367-5.013c.364-4.096 3.95-7.153 8.052-6.817 4.072.367 7.111 4.005 6.777 8.1z",
    fill: "#343433"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCA0MCAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM0LjM5NzQgNC40ODc5OUMzNy45NjI3IDcuMDkxODMgNDAuMzM5NiAxMS4xNDc0IDM5Ljk2MDMgMTQuODExMkMzOS42MDYzIDE4LjQ3NSAzNi41MjE0IDIxLjc3MDEgMzQuMzcyMSAyNS45MTc4QzMyLjIyMjggMzAuMDY1NSAzMS4wMDkxIDM1LjA2NTggMjcuODQ4MyAzNi44NjMxQzI0LjY2MjMgMzguNjYwNCAxOS41MDQgMzcuMjU0OCAxNS4xMDQyIDM1LjI3MzJDMTAuNjc5MiAzMy4yNjg0IDYuOTYyMTEgMzAuNjg3NiA0LjIzMTIzIDI3LjE4NTFDMS41MDAzNCAyMy43MDU3IC0wLjI2OTY3OSAxOS4zMDQ1IDAuMDMzNzUyNyAxNC43ODgxQzAuMzExODk5IDEwLjI3MTcgMi42ODg3OCA1LjY2MzE4IDYuNTgyODIgMy4xMDU0M0MxMC40NTE2IDAuNTcwNzIxIDE1Ljg2MjggMC4wNjM3ODA0IDIwLjk0NTMgMC40MDk0MjJDMjYuMDI3NyAwLjczMjAyMSAzMC44MDY4IDEuODg0MTYgMzQuMzk3NCA0LjQ4Nzk5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOS4zOTA2IDE1Ljk2NDRDMTkuMzkwNiAxNS43NTc1IDE5LjU1ODMgMTUuNTg5OCAxOS43NjUyIDE1LjU4OThIMjMuOTU5OUMyNC4xNjY4IDE1LjU4OTggMjQuMzM0NCAxNS43NTc1IDI0LjMzNDQgMTUuOTY0NEMyNC4zMzQ0IDE2LjE3MTIgMjQuMTY2OCAxNi4zMzg5IDIzLjk1OTkgMTYuMzM4OUgxOS43NjUyQzE5LjU1ODMgMTYuMzM4OSAxOS4zOTA2IDE2LjE3MTIgMTkuMzkwNiAxNS45NjQ0WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOS40Mzc1IDE4LjA2MkMxOS40Mzc1IDE3Ljg1NTIgMTkuNjA1MiAxNy42ODc1IDE5LjgxMiAxNy42ODc1SDI0LjAwNjhDMjQuMjEzNiAxNy42ODc1IDI0LjM4MTMgMTcuODU1MiAyNC4zODEzIDE4LjA2MkMyNC4zODEzIDE4LjI2ODkgMjQuMjEzNiAxOC40MzY2IDI0LjAwNjggMTguNDM2NkgxOS44MTJDMTkuNjA1MiAxOC40MzY2IDE5LjQzNzUgMTguMjY4OSAxOS40Mzc1IDE4LjA2MloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTkuNDY4OCAyMC4xNTk3QzE5LjQ2ODggMTkuOTUyOCAxOS42MzY0IDE5Ljc4NTIgMTkuODQzMyAxOS43ODUySDI0LjAzOEMyNC4yNDQ5IDE5Ljc4NTIgMjQuNDEyNiAxOS45NTI4IDI0LjQxMjYgMjAuMTU5N0MyNC40MTI2IDIwLjM2NjUgMjQuMjQ0OSAyMC41MzQyIDI0LjAzOCAyMC41MzQySDE5Ljg0MzNDMTkuNjM2NCAyMC41MzQyIDE5LjQ2ODggMjAuMzY2NSAxOS40Njg4IDIwLjE1OTdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE5LjUgMjIuMjU3M0MxOS41IDIyLjA1MDUgMTkuNjY3NyAyMS44ODI4IDE5Ljg3NDUgMjEuODgyOEgyNC4wNjkzQzI0LjI3NjEgMjEuODgyOCAyNC40NDM4IDIyLjA1MDUgMjQuNDQzOCAyMi4yNTczQzI0LjQ0MzggMjIuNDY0MiAyNC4yNzYxIDIyLjYzMTkgMjQuMDY5MyAyMi42MzE5SDE5Ljg3NDVDMTkuNjY3NyAyMi42MzE5IDE5LjUgMjIuNDY0MiAxOS41IDIyLjI1NzNaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuNzE4NzUgMTAuNTc0MkM3LjcxODc1IDkuODcwOTEgOC4yODg4NyA5LjMwMDc4IDguOTkyMTYgOS4zMDA3OEgxMS4yNzY4QzExLjQ4MzcgOS4zMDA3OCAxMS42NTEzIDkuNDY4NDYgMTEuNjUxMyA5LjY3NTMxQzExLjY1MTMgOS44ODIxNiAxMS40ODM3IDEwLjA0OTggMTEuMjc2OCAxMC4wNDk4SDguOTkyMTZDOC43MDI1NyAxMC4wNDk4IDguNDY3ODEgMTAuMjg0NiA4LjQ2NzgxIDEwLjU3NDJWMjcuNjE1NEM4LjQ2NzgxIDI3LjkwNSA4LjcwMjU3IDI4LjEzOTcgOC45OTIxNiAyOC4xMzk3SDI2LjI5NTVDMjYuNTg1MSAyOC4xMzk3IDI2LjgxOTkgMjcuOTA1IDI2LjgxOTkgMjcuNjE1NFYxMC41NzQyQzI2LjgxOTkgMTAuMjg0NiAyNi41ODUxIDEwLjA0OTggMjYuMjk1NSAxMC4wNDk4SDE4LjkxNzNDMTguNzEwNCAxMC4wNDk4IDE4LjU0MjcgOS44ODIxNiAxOC41NDI3IDkuNjc1MzFDMTguNTQyNyA5LjQ2ODQ2IDE4LjcxMDQgOS4zMDA3OCAxOC45MTczIDkuMzAwNzhIMjYuMjk1NUMyNi45OTg4IDkuMzAwNzggMjcuNTY4OSA5Ljg3MDkxIDI3LjU2ODkgMTAuNTc0MlYyNy42MTU0QzI3LjU2ODkgMjguMzE4NyAyNi45OTg4IDI4Ljg4ODggMjYuMjk1NSAyOC44ODg4SDguOTkyMTZDOC4yODg4NyAyOC44ODg4IDcuNzE4NzUgMjguMzE4NyA3LjcxODc1IDI3LjYxNTRWMTAuNTc0MloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIuMjI0MiAyNS4yNTY2QzEyLjIyNDIgMjYuMTI1NCAxMS41MTk5IDI2LjgyOTcgMTAuNjUxMiAyNi44Mjk3QzkuNzgyNCAyNi44Mjk3IDkuMDc4MTIgMjYuMTI1NCA5LjA3ODEyIDI1LjI1NjZDOS4wNzgxMiAyNC4zODc5IDkuNzgyNCAyMy42ODM2IDEwLjY1MTIgMjMuNjgzNkMxMS41MTk5IDIzLjY4MzYgMTIuMjI0MiAyNC4zODc5IDEyLjIyNDIgMjUuMjU2NlpNMTAuNjUxMiAyNi4wODA2QzExLjEwNjIgMjYuMDgwNiAxMS40NzUxIDI1LjcxMTcgMTEuNDc1MSAyNS4yNTY2QzExLjQ3NTEgMjQuODAxNiAxMS4xMDYyIDI0LjQzMjcgMTAuNjUxMiAyNC40MzI3QzEwLjE5NjEgMjQuNDMyNyA5LjgyNzE5IDI0LjgwMTYgOS44MjcxOSAyNS4yNTY2QzkuODI3MTkgMjUuNzExNyAxMC4xOTYxIDI2LjA4MDYgMTAuNjUxMiAyNi4wODA2WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNi4xNzczIDI1LjI1NjZDMTYuMTc3MyAyNi4xMjU0IDE1LjQ3MyAyNi44Mjk3IDE0LjYwNDMgMjYuODI5N0MxMy43MzU1IDI2LjgyOTcgMTMuMDMxMiAyNi4xMjU0IDEzLjAzMTIgMjUuMjU2NkMxMy4wMzEyIDI0LjM4NzkgMTMuNzM1NSAyMy42ODM2IDE0LjYwNDMgMjMuNjgzNkMxNS40NzMgMjMuNjgzNiAxNi4xNzczIDI0LjM4NzkgMTYuMTc3MyAyNS4yNTY2Wk0xNC42MDQzIDI2LjA4MDZDMTUuMDU5MyAyNi4wODA2IDE1LjQyODMgMjUuNzExNyAxNS40MjgzIDI1LjI1NjZDMTUuNDI4MyAyNC44MDE2IDE1LjA1OTMgMjQuNDMyNyAxNC42MDQzIDI0LjQzMjdDMTQuMTQ5MiAyNC40MzI3IDEzLjc4MDMgMjQuODAxNiAxMy43ODAzIDI1LjI1NjZDMTMuNzgwMyAyNS43MTE3IDE0LjE0OTIgMjYuMDgwNiAxNC42MDQzIDI2LjA4MDZaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE5LjI1IDExLjc3M0MxOS4yNSAxMS41NjYxIDE5LjQxNzcgMTEuMzk4NCAxOS42MjQ1IDExLjM5ODRIMTkuNzc0M0MxOS45ODEyIDExLjM5ODQgMjAuMTQ4OSAxMS41NjYxIDIwLjE0ODkgMTEuNzczQzIwLjE0ODkgMTEuOTc5OCAxOS45ODEyIDEyLjE0NzUgMTkuNzc0MyAxMi4xNDc1SDE5LjYyNDVDMTkuNDE3NyAxMi4xNDc1IDE5LjI1IDExLjk3OTggMTkuMjUgMTEuNzczWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS4yMTg4IDExLjc3M0MyMS4yMTg4IDExLjU2NjEgMjEuMzg2NCAxMS4zOTg0IDIxLjU5MzMgMTEuMzk4NEgyMS43NDMxQzIxLjk0OTkgMTEuMzk4NCAyMi4xMTc2IDExLjU2NjEgMjIuMTE3NiAxMS43NzNDMjIuMTE3NiAxMS45Nzk4IDIxLjk0OTkgMTIuMTQ3NSAyMS43NDMxIDEyLjE0NzVIMjEuNTkzM0MyMS4zODY0IDEyLjE0NzUgMjEuMjE4OCAxMS45Nzk4IDIxLjIxODggMTEuNzczWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMy4xNTYyIDExLjc3M0MyMy4xNTYyIDExLjU2NjEgMjMuMzIzOSAxMS4zOTg0IDIzLjUzMDggMTEuMzk4NEgyMy42ODA2QzIzLjg4NzQgMTEuMzk4NCAyNC4wNTUxIDExLjU2NjEgMjQuMDU1MSAxMS43NzNDMjQuMDU1MSAxMS45Nzk4IDIzLjg4NzQgMTIuMTQ3NSAyMy42ODA2IDEyLjE0NzVIMjMuNTMwOEMyMy4zMjM5IDEyLjE0NzUgMjMuMTU2MiAxMS45Nzk4IDIzLjE1NjIgMTEuNzczWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjI5Njg4IDExLjgxMkM5LjI5Njg4IDExLjYwNTIgOS40NjQ1NiAxMS40Mzc1IDkuNjcxNDEgMTEuNDM3NUgxNS41MTQxQzE1LjcyMSAxMS40Mzc1IDE1Ljg4ODYgMTEuNjA1MiAxNS44ODg2IDExLjgxMkMxNS44ODg2IDEyLjAxODkgMTUuNzIxIDEyLjE4NjYgMTUuNTE0MSAxMi4xODY2SDkuNjcxNDFDOS40NjQ1NiAxMi4xODY2IDkuMjk2ODggMTIuMDE4OSA5LjI5Njg4IDExLjgxMloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0zOS4yNzUxIDI1Ljc3NjZMMzMuNDcxIDE5Ljk2ODZMMzIuNjgwOSAyMC43NjM0TDMyLjQ5ODYgMjAuOTQ2OEwzMS41ODY5IDIwLjAyOTdDMzEuNzk5NyAxOS43ODUyIDMyLjAxMjQgMTkuNTQwNiAzMi4xOTQ3IDE5LjI5NjFDMzIuMjg1OSAxOS4xNDMyIDMyLjQwNzQgMTguOTkwNCAzMi40OTg2IDE4Ljg2ODFDMzIuNTI5IDE4LjgwNyAzMi41ODk3IDE4LjcxNTMgMzIuNjIwMSAxOC42NTQyQzMyLjY4MDkgMTguNTYyNCAzMi43MTEzIDE4LjUwMTMgMzIuNzcyMSAxOC40MDk2QzMzLjUzMTggMTcuMTI1NyAzNC4wMTggMTUuNjI3OSAzNC4xMzk1IDE0LjAzODNDMzQuNjI1OCA4LjM1MjUxIDMwLjQwMTggMy4zMDg2OCAyNC43NDk2IDIuODE5NThDMTkuMDY3IDIuMzMwNDggMTQuMDgzNCA2LjU3OTUzIDEzLjU5NzIgMTIuMjY1M0MxMy41MDYgMTMuMzk2MyAxMy41OTcyIDE0LjUyNzQgMTMuODQwMyAxNS41NjY3QzEzLjg3MDcgMTUuNzE5NiAxMy45MzE0IDE1Ljg3MjQgMTMuOTYxOCAxNi4wMjUyQzEzLjk5MjIgMTYuMTE3IDE0LjAyMjYgMTYuMjA4NyAxNC4wNTMgMTYuMzAwNEMxNC4wNTMgMTYuMzMwOSAxNC4wNTMgMTYuMzMwOSAxNC4wODM0IDE2LjM2MTVDMTQuMTEzOCAxNi40NTMyIDE0LjE0NDIgMTYuNTE0MyAxNC4xNzQ2IDE2LjYwNkMxNC41MDg4IDE3LjYxNDggMTUuMDI1NCAxOC41NjI0IDE1LjY2MzYgMTkuNDQ4OUMxNS42NjM2IDE5LjQ0ODkgMTUuNjYzNiAxOS40NDg5IDE1LjY5NCAxOS40NDg5QzE3LjE4MyAyMS40MzU5IDE5LjQwMTMgMjIuODcyNiAyMS45ODQzIDIzLjM2MTdDMjEuOTUzOSAyMy4zNjE3IDIxLjkyMzUgMjMuMzYxNyAyMS44OTMxIDIzLjM5MjNDMjIuNTMxMyAyMy41MTQ2IDIzLjE5OTggMjMuNjA2MyAyMy44MzggMjMuNjA2M0MyNS45NjUxIDIzLjYwNjMgMjcuOTcwOCAyMi45OTQ5IDI5LjcwMjkgMjEuODAyN0MzMC4wMDY4IDIxLjU4ODcgMzAuMzEwNiAyMS4zNDQyIDMwLjYxNDUgMjEuMDk5NkwzMS41MjYyIDIyLjAxNjdMMzAuNDAxOCAyMy4xMTcyTDM2LjIwNTkgMjguOTI1MkMzNi42MzE0IDI5LjM1MzIgMzcuMTc4NCAyOS41OTc3IDM3Ljc1NTcgMjkuNTk3N0MzOC4zMzMxIDI5LjU5NzcgMzguOTEwNSAyOS4zODM4IDM5LjMzNTkgMjguOTU1OEMzOS43NjEzIDI4LjUyNzggNDAuMDA0NCAyNy45Nzc2IDQwLjAwNDQgMjcuMzk2OEMzOS45MTMzIDI2Ljc1NDggMzkuNzAwNiAyNi4yMDQ2IDM5LjI3NTEgMjUuNzc2NlpNMzEuMjgzMSAxMy43OTM3QzMxLjA0IDE2LjU3NTUgMjkuMzA3OCAxOC44OTg3IDI2LjkwNzIgMTkuOTY4NkMyNS43ODI4IDIwLjQ4ODMgMjQuNTM2OSAyMC43MDIzIDIzLjIzMDIgMjAuNjEwNUMyMC45ODE1IDIwLjQyNzEgMTkuMDY3IDE5LjIzNSAxNy44MjExIDE3LjUyMzFDMTYuODE4MyAxNi4xMTcgMTYuMzAxNyAxNC4zNzQ1IDE2LjQ1MzcgMTIuNTA5OEMxNi44MTgzIDguNDEzNjUgMjAuNDA0MSA1LjM1Njc4IDI0LjUwNjUgNS42OTMwNEMyOC41Nzg1IDYuMDU5ODYgMzEuNjE3MyA5LjY5NzUzIDMxLjI4MzEgMTMuNzkzN1oiIGZpbGw9IiMzNDM0MzMiLz4KPC9zdmc+Cg==");


/***/ }),

/***/ "./src/assets/images/join-the-community.svg":
/*!**************************************************!*\
  !*** ./src/assets/images/join-the-community.svg ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgJoinTheCommunity),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _circle, _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgJoinTheCommunity(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 36,
    height: 36,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _circle || (_circle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 18,
    cy: 18,
    r: 18,
    fill: "#0167FF",
    fillOpacity: 0.2
  })), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M23.066 21.052v1.066c0 .018 0 .037-.003.056a.96.96 0 01-.96.904h-8.217a.959.959 0 01-.96-.904c-.004-.019-.004-.038-.004-.056v-1.066c-.006-1.13.789-2.091 1.857-2.366l.844-.281c1.235 1.192 3.511 1.192 4.747 0l.848.281c1.06.285 1.858 1.238 1.848 2.366zm4.043-2.52l-.567-.187c-.825.894-2.336 1.205-3.465.668.48.571.741 1.294.74 2.04v1.064c0 .02 0 .038-.005.057h3.84a.85.85 0 00.848-.848v-.858a2.04 2.04 0 00-1.391-1.936zm-.428-2.355a2.353 2.353 0 00-2.351-2.35 2.355 2.355 0 00-2.351 2.35 2.355 2.355 0 002.351 2.352 2.353 2.353 0 002.351-2.352zm-11.509-.434a2.825 2.825 0 002.824 2.82 2.824 2.824 0 002.82-2.82 2.824 2.824 0 00-2.82-2.82 2.825 2.825 0 00-2.823 2.82zm-5.853.434a2.353 2.353 0 002.351 2.352 2.352 2.352 0 000-4.703 2.353 2.353 0 00-2.351 2.351zm2.853 5.94v-1.065c0-.757.263-1.47.736-2.032-.39.17-.812.259-1.238.259-.866 0-1.65-.357-2.209-.934l-.57.191A2.032 2.032 0 007.5 20.467v.86a.851.851 0 00.848.847h3.828c-.004-.019-.004-.038-.004-.056zm14.653.862a.376.376 0 00-.516.123A9.695 9.695 0 0118 27.75a9.693 9.693 0 01-8.31-4.648.375.375 0 10-.638.393A10.439 10.439 0 0018 28.5c3.675 0 7.02-1.871 8.948-5.005a.375.375 0 00-.123-.516zM7.875 18.15a.38.38 0 00.383-.367C8.367 12.526 12.74 8.25 18 8.25c5.26 0 9.631 4.277 9.742 9.532a.375.375 0 00.375.368h.008a.375.375 0 00.367-.383C28.372 12.106 23.666 7.5 18 7.5c-5.665 0-10.372 4.606-10.492 10.267a.375.375 0 00.367.383zm3.622 4.918a.375.375 0 00-.591.462A8.95 8.95 0 0018 27a8.951 8.951 0 007.094-3.47.375.375 0 00-.59-.462A8.205 8.205 0 0118 26.25a8.205 8.205 0 01-6.503-3.182zm13.035-10.1a.376.376 0 10.593-.458A8.944 8.944 0 0018 9a8.947 8.947 0 00-7.125 3.51.375.375 0 00.593.458A8.201 8.201 0 0118 9.75a8.202 8.202 0 016.532 3.218z",
    fill: "#0167FF"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTgiIGZpbGw9IiMwMTY3RkYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGQ9Ik0yMy4wNjYzIDIxLjA1MjVWMjIuMTE3NUMyMy4wNjYzIDIyLjEzNjIgMjMuMDY2MyAyMi4xNTUgMjMuMDYyNSAyMi4xNzM3QzIzLjA0ODQgMjIuNDE4NiAyMi45NDEgMjIuNjQ4NyAyMi43NjI1IDIyLjgxNjhDMjIuNTgzOSAyMi45ODQ5IDIyLjM0NzcgMjMuMDc4MiAyMi4xMDI1IDIzLjA3NzVIMTMuODg2M0MxMy4zNzI1IDIzLjA3NzUgMTIuOTUyNSAyMi42NzYzIDEyLjkyNjMgMjIuMTczN0MxMi45MjI1IDIyLjE1NSAxMi45MjI1IDIyLjEzNjIgMTIuOTIyNSAyMi4xMTc1VjIxLjA1MjVDMTIuOTE2MSAxOS45MjI2IDEzLjcxMDggMTguOTYwOCAxNC43Nzg4IDE4LjY4NjNMMTUuNjIyNSAxOC40MDVDMTYuODU4MSAxOS41OTc1IDE5LjEzNDQgMTkuNTk3NSAyMC4zNyAxOC40MDVMMjEuMjE3NSAxOC42ODYzQzIyLjI3ODggMTguOTcxMyAyMy4wNzU2IDE5LjkyMzcgMjMuMDY2MyAyMS4wNTI1Wk0yNy4xMDg4IDE4LjUzMjVMMjYuNTQyNSAxOC4zNDVDMjUuNzE3NSAxOS4yMzk0IDI0LjIwNjMgMTkuNTQ5OSAyMy4wNzc1IDE5LjAxMjVDMjMuNTU2NyAxOS41ODQgMjMuODE4NCAyMC4zMDY2IDIzLjgxNjIgMjEuMDUyNVYyMi4xMTc1QzIzLjgxNjIgMjIuMTM2MiAyMy44MTYzIDIyLjE1NSAyMy44MTI1IDIyLjE3MzdIMjcuNjUyNUMyNy44NzcgMjIuMTcyOCAyOC4wOTIgMjIuMDgzMiAyOC4yNTA3IDIxLjkyNDRDMjguNDA5NCAyMS43NjU3IDI4LjQ5OSAyMS41NTA3IDI4LjUgMjEuMzI2M1YyMC40Njc1QzI4LjUgMTkuNTkgMjcuOTQxMyAxOC44MTM3IDI3LjEwODggMTguNTMyNVpNMjYuNjgxMyAxNi4xNzc1QzI2LjY4MTMgMTQuODggMjUuNjI3NSAxMy44MjYzIDI0LjMzIDEzLjgyNjNDMjMuMDM2MyAxMy44MjYzIDIxLjk3ODggMTQuODggMjEuOTc4OCAxNi4xNzc1QzIxLjk3ODggMTcuNDc1IDIzLjAzNjMgMTguNTI4NyAyNC4zMyAxOC41Mjg3QzI1LjYyNzUgMTguNTI4NyAyNi42ODEzIDE3LjQ3NSAyNi42ODEzIDE2LjE3NzVaTTE1LjE3MjUgMTUuNzQyNUMxNS4xNzI1IDE3LjI5ODcgMTYuNDQgMTguNTYyNSAxNy45OTYzIDE4LjU2MjVDMTkuNTQ4OCAxOC41NjI1IDIwLjgxNjMgMTcuMjk4NyAyMC44MTYzIDE1Ljc0MjVDMjAuODE2MyAxNC4xODYyIDE5LjU0ODggMTIuOTIyNSAxNy45OTYzIDEyLjkyMjVDMTYuNDQgMTIuOTIyNSAxNS4xNzI1IDE0LjE4NjIgMTUuMTcyNSAxNS43NDI1Wk05LjMxODc1IDE2LjE3NzVDOS4zMTg3NSAxNy40NzUgMTAuMzcyNSAxOC41Mjg3IDExLjY3IDE4LjUyODdDMTIuOTYzOCAxOC41Mjg3IDE0LjAxNzUgMTcuNDc1IDE0LjAxNzUgMTYuMTc3NUMxNC4wMTc1IDE0Ljg4IDEyLjk2MzggMTMuODI2MyAxMS42NyAxMy44MjYzQzEwLjM3MjUgMTMuODI2MyA5LjMxODc1IDE0Ljg4IDkuMzE4NzUgMTYuMTc3NVpNMTIuMTcyNSAyMi4xMTc1VjIxLjA1MjVDMTIuMTcyNSAyMC4yOTUgMTIuNDM1IDE5LjU4MjUgMTIuOTA3NSAxOS4wMkMxMi41MTcyIDE5LjE5MDQgMTIuMDk1OSAxOS4yNzg1IDExLjY3IDE5LjI3ODdDMTAuODAzOCAxOS4yNzg3IDEwLjAyIDE4LjkyMjUgOS40NjEyNSAxOC4zNDVMOC44OTEyNSAxOC41MzYzQzguNDg1NzggMTguNjcxMSA4LjEzMzEyIDE4LjkzMDIgNy44ODMzNiAxOS4yNzY5QzcuNjMzNiAxOS42MjM2IDcuNDk5NDYgMjAuMDQwMiA3LjUgMjAuNDY3NVYyMS4zMjYzQzcuNTAwOTkgMjEuNTUwNyA3LjU5MDU5IDIxLjc2NTcgNy43NDkzMiAyMS45MjQ0QzcuOTA4MDQgMjIuMDgzMiA4LjEyMzAzIDIyLjE3MjggOC4zNDc1IDIyLjE3MzdIMTIuMTc2M0MxMi4xNzI1IDIyLjE1NSAxMi4xNzI1IDIyLjEzNjIgMTIuMTcyNSAyMi4xMTc1Wk0yNi44MjUzIDIyLjk3OTJDMjYuNzgzMyAyMi45NTMzIDI2LjczNjcgMjIuOTM2IDI2LjY4OCAyMi45MjgxQzI2LjYzOTQgMjIuOTIwMyAyNi41ODk2IDIyLjkyMjEgMjYuNTQxNyAyMi45MzM1QzI2LjQ5MzcgMjIuOTQ1IDI2LjQ0ODUgMjIuOTY1OCAyNi40MDg2IDIyLjk5NDdDMjYuMzY4OCAyMy4wMjM3IDI2LjMzNSAyMy4wNjAyIDI2LjMwOTMgMjMuMTAyMkMyNC41MTg2IDI2LjAxMjIgMjEuNDEyNSAyNy43NSAxOCAyNy43NUMxNC41ODc1IDI3Ljc1IDExLjQ4MTQgMjYuMDEyNiA5LjY5MDc1IDIzLjEwMjJDOS42NjU0NSAyMy4wNTkzIDkuNjMxODMgMjMuMDIxOCA5LjU5MTg3IDIyLjk5MkM5LjU1MTkxIDIyLjk2MjIgOS41MDY0MSAyMi45NDA3IDkuNDU4MDIgMjIuOTI4NkM5LjQwOTY0IDIyLjkxNjYgOS4zNTkzNCAyMi45MTQ0IDkuMzEwMDggMjIuOTIyQzkuMjYwODEgMjIuOTI5NyA5LjIxMzU3IDIyLjk0NzEgOS4xNzExMSAyMi45NzMyQzkuMTI4NjUgMjIuOTk5MyA5LjA5MTgzIDIzLjAzMzcgOS4wNjI4IDIzLjA3NDJDOS4wMzM3NyAyMy4xMTQ3IDkuMDEzMTEgMjMuMTYwNiA5LjAwMjAzIDIzLjIwOTNDOC45OTA5NSAyMy4yNTc5IDguOTg5NjcgMjMuMzA4MiA4Ljk5ODI3IDIzLjM1NzNDOS4wMDY4OCAyMy40MDY0IDkuMDI1MTggMjMuNDUzMyA5LjA1MjEzIDIzLjQ5NTJDMTAuOTggMjYuNjI4NyAxNC4zMjUgMjguNSAxOCAyOC41QzIxLjY3NSAyOC41IDI1LjAyIDI2LjYyODcgMjYuOTQ3OSAyMy40OTUyQzI2Ljk3MzcgMjMuNDUzMyAyNi45OTEgMjMuNDA2NyAyNi45OTg4IDIzLjM1ODFDMjcuMDA2NyAyMy4zMDk1IDI3LjAwNDggMjMuMjU5OCAyNi45OTM0IDIzLjIxMTlDMjYuOTgyMSAyMy4xNjM5IDI2Ljk2MTMgMjMuMTE4NyAyNi45MzI1IDIzLjA3ODhDMjYuOTAzNiAyMy4wMzg5IDI2Ljg2NzIgMjMuMDA1MSAyNi44MjUzIDIyLjk3OTJaTTcuODc0NjMgMTguMTVDNy45NzM3MyAxOC4xNTA2IDguMDY5MTggMTguMTEyNiA4LjE0MDY4IDE4LjA0NEM4LjIxMjE3IDE3Ljk3NTQgOC4yNTQwOSAxNy44ODE1IDguMjU3NSAxNy43ODI1QzguMzY4ODggMTIuNTI2OSAxMi43Mzk1IDguMjUgMTggOC4yNUMyMy4yNjA1IDguMjUgMjcuNjMxMSAxMi41MjY1IDI3Ljc0MjUgMTcuNzgyNUMyNy43NDQ1IDE3Ljg4MDcgMjcuNzg0OCAxNy45NzQxIDI3Ljg1NSAxOC4wNDI4QzI3LjkyNTEgMTguMTExNSAyOC4wMTkzIDE4LjE1IDI4LjExNzUgMTguMTVIMjguMTI1QzI4LjE3NDIgMTguMTQ5IDI4LjIyMjggMTguMTM4MyAyOC4yNjc5IDE4LjExODVDMjguMzEzIDE4LjA5ODcgMjguMzUzOCAxOC4wNzAyIDI4LjM4NzkgMTguMDM0NkMyOC40MjIgMTcuOTk5MSAyOC40NDg3IDE3Ljk1NzEgMjguNDY2NiAxNy45MTEyQzI4LjQ4NDUgMTcuODY1MyAyOC40OTMyIDE3LjgxNjQgMjguNDkyMSAxNy43NjcxQzI4LjM3MjUgMTIuMTA1OCAyMy42NjU1IDcuNSAxOCA3LjVDMTIuMzM0NSA3LjUgNy42Mjc1IDEyLjEwNTggNy41MDc1IDE3Ljc2NzFDNy41MDU0OSAxNy44NjY1IDcuNTQzMDMgMTcuOTYyNyA3LjYxMTg4IDE4LjAzNDRDNy42ODA3MiAxOC4xMDYxIDcuNzc1MjMgMTguMTQ3NiA3Ljg3NDYzIDE4LjE0OTZWMTguMTVaTTExLjQ5NzEgMjMuMDY3N0MxMS40MzU5IDIyLjk4OTMgMTEuMzQ2IDIyLjkzODUgMTEuMjQ3MiAyMi45MjYzQzExLjE0ODQgMjIuOTE0MiAxMS4wNDg5IDIyLjk0MTggMTAuOTcwNCAyMy4wMDMxQzEwLjg5MiAyMy4wNjQzIDEwLjg0MTEgMjMuMTU0MiAxMC44MjkgMjMuMjUzQzEwLjgxNjkgMjMuMzUxOCAxMC44NDQ1IDIzLjQ1MTMgMTAuOTA1OCAyMy41Mjk3QzEyLjYyODUgMjUuNzM1MSAxNS4yMTQxIDI3IDE4IDI3QzIwLjc4NTkgMjcgMjMuMzcxNSAyNS43MzUxIDI1LjA5NDMgMjMuNTI5N0MyNS4xNTU1IDIzLjQ1MTQgMjUuMTgzMSAyMy4zNTE5IDI1LjE3MSAyMy4yNTMxQzI1LjE1ODkgMjMuMTU0NCAyNS4xMDgxIDIzLjA2NDUgMjUuMDI5OCAyMy4wMDMzQzI0Ljk1MTQgMjIuOTQyIDI0Ljg1MTkgMjIuOTE0NCAyNC43NTMxIDIyLjkyNjVDMjQuNjU0NCAyMi45Mzg2IDI0LjU2NDUgMjIuOTg5NCAyNC41MDMzIDIzLjA2NzdDMjIuOTIzOCAyNS4wOTAxIDIwLjU1MzQgMjYuMjUgMTggMjYuMjVDMTUuNDQ2NiAyNi4yNSAxMy4wNzYzIDI1LjA5MDEgMTEuNDk2OCAyMy4wNjc3SDExLjQ5NzFaTTI0LjUzMjEgMTIuOTY4M0MyNC41NjE1IDEzLjAwOTEgMjQuNTk4OSAxMy4wNDM2IDI0LjY0MTkgMTMuMDY5N0MyNC42ODQ5IDEzLjA5NTggMjQuNzMyOCAxMy4xMTMgMjQuNzgyNiAxMy4xMjAyQzI0LjgzMjQgMTMuMTI3NSAyNC44ODMxIDEzLjEyNDYgMjQuOTMxOCAxMy4xMTE4QzI0Ljk4MDUgMTMuMDk5IDI1LjAyNjEgMTMuMDc2NSAyNS4wNjU5IDEzLjA0NTdDMjUuMTA1NyAxMy4wMTQ5IDI1LjEzODkgMTIuOTc2NCAyNS4xNjM1IDEyLjkzMjVDMjUuMTg4MSAxMi44ODg2IDI1LjIwMzcgMTIuODQwMiAyNS4yMDkyIDEyLjc5MDJDMjUuMjE0NyAxMi43NDAyIDI1LjIxMDEgMTIuNjg5NiAyNS4xOTU2IDEyLjY0MTRDMjUuMTgxMiAxMi41OTMyIDI1LjE1NzEgMTIuNTQ4NCAyNS4xMjUgMTIuNTA5NkMyMy40MDI2IDEwLjI3ODcgMjAuODA1NCA5IDE4IDlDMTUuMTk0NiA5IDEyLjU5NzQgMTAuMjc5MSAxMC44NzQ2IDEyLjUwOTZDMTAuODEzOCAxMi41ODgzIDEwLjc4NjggMTIuNjg4IDEwLjc5OTQgMTIuNzg2N0MxMC44MTIxIDEyLjg4NTMgMTAuODYzNCAxMi45NzQ5IDEwLjk0MjEgMTMuMDM1N0MxMS4wMjA4IDEzLjA5NjYgMTEuMTIwNSAxMy4xMjM2IDExLjIxOTIgMTMuMTExQzExLjMxNzggMTMuMDk4MyAxMS40MDc0IDEzLjA0NyAxMS40NjgzIDEyLjk2ODNDMTMuMDQ3OCAxMC45MjMgMTUuNDI4NiA5Ljc1IDE4IDkuNzVDMjAuNTcxNCA5Ljc1IDIyLjk1MjYgMTAuOTIzIDI0LjUzMjEgMTIuOTY4M1oiIGZpbGw9IiMwMTY3RkYiLz4KPC9zdmc+Cg==");


/***/ }),

/***/ "./src/assets/images/logo.svg":
/*!************************************!*\
  !*** ./src/assets/images/logo.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgLogo),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _mask, _path2, _path3;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgLogo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 147,
    height: 36,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M80.008 0h-80v36h80V0zm-57.79 22.906c-.135-.078-.424-.27-.866-.578.833-1.015 1.25-2.37 1.25-4.062 0-1.901-.519-3.362-1.555-4.383-1.031-1.021-2.498-1.531-4.399-1.531-1.864 0-3.317.523-4.359 1.57-1.036 1.041-1.555 2.505-1.555 4.39 0 1.943.594 3.451 1.782 4.524 1.005.906 2.377 1.36 4.117 1.36 1.177 0 2.156-.17 2.937-.509.193.167.532.415 1.016.743.484.333.974.62 1.469.86l.984-1.985a9.55 9.55 0 01-.82-.399zm-3.155-4.656c0 1.005-.141 1.76-.422 2.266-.141-.089-.271-.175-.391-.258-.505-.354-.846-.573-1.023-.656a2.934 2.934 0 00-.727-.211l-.555 1.273c.64.255 1.11.526 1.407.813a3.17 3.17 0 01-.68.07c-.745 0-1.33-.253-1.758-.758-.427-.505-.64-1.383-.64-2.633 0-1.073.218-1.862.656-2.367.437-.505 1.008-.758 1.71-.758.756 0 1.347.248 1.774.742.432.495.648 1.32.648 2.477zm16.43-5.703H31.96v6.992c0 .635-.174 1.128-.523 1.477-.344.343-.82.515-1.43.515-.615 0-1.096-.174-1.445-.523-.344-.354-.516-.844-.516-1.469v-6.992h-3.531v6.828c0 .563.109 1.208.328 1.938.135.453.385.893.75 1.32.37.427.776.758 1.218.992.443.23.993.383 1.649.46.661.08 1.27.118 1.828.118.964 0 1.79-.127 2.477-.383.494-.182.966-.497 1.414-.945a4.12 4.12 0 00.992-1.578c.213-.604.32-1.245.32-1.922v-6.828zm6.03 0h-3.546V24h3.546V12.547zm13.274 7.71l-3.102-.937c-.156.724-.409 1.276-.758 1.657-.343.38-.854.57-1.53.57-.699 0-1.24-.235-1.626-.703-.385-.474-.578-1.347-.578-2.617 0-1.026.162-1.78.484-2.258.428-.646 1.042-.969 1.844-.969.354 0 .675.073.961.219.287.146.529.354.727.625.12.161.234.416.343.765l3.126-.695c-.402-1.208-1.016-2.104-1.844-2.687-.823-.584-1.956-.875-3.399-.875-1.843 0-3.27.51-4.28 1.53-1.006 1.016-1.509 2.472-1.509 4.368 0 1.422.287 2.588.86 3.5.573.912 1.252 1.55 2.039 1.914.791.36 1.81.54 3.054.54 1.026 0 1.87-.15 2.532-.446a4.266 4.266 0 001.672-1.32c.447-.584.776-1.31.984-2.18zm5.281-7.71H56.54V24h3.54v-2.797l1.827-1.914L64.32 24h4.36l-4.36-7.133 4.172-4.32H63.79l-3.71 4.328v-4.328z",
    fill: "#fff"
  })), _mask || (_mask = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "logo_svg__a",
    fill: "#fff"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M80.008 0h67v36h-67V0z"
  }))), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M147.008 0h2v-2h-2v2zm0 36v2h2v-2h-2zm-67-34h67v-4h-67v4zm65-2v36h4V0h-4zm2 34h-67v4h67v-4z",
    fill: "#fff",
    mask: "url(#logo_svg__a)"
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M90.047 12.547h3.703l2.578 8.242 2.54-8.242h3.593L98.211 24h-3.836l-4.328-11.453zm13.726 0h3.547V24h-3.547V12.547zm6.086 0h9.485v2.445h-5.938v1.82h5.508v2.336h-5.508v2.258h6.11V24h-9.657V12.547zm10.391 0h3.359l1.211 6.398 1.766-6.398h3.352l1.773 6.398 1.211-6.398h3.344L133.742 24h-3.469l-2.007-7.21-2 7.21h-3.469l-2.547-11.453z",
    fill: "#fff"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ3IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgMTQ3IDM2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTgwLjAwNzggMEgwLjAwNzgxMjVWMzZIODAuMDA3OFYwWk0yMi4yMTg4IDIyLjkwNjJDMjIuMDgzMyAyMi44MjgxIDIxLjc5NDMgMjIuNjM1NCAyMS4zNTE2IDIyLjMyODFDMjIuMTg0OSAyMS4zMTI1IDIyLjYwMTYgMTkuOTU4MyAyMi42MDE2IDE4LjI2NTZDMjIuNjAxNiAxNi4zNjQ2IDIyLjA4MzMgMTQuOTAzNiAyMS4wNDY5IDEzLjg4MjhDMjAuMDE1NiAxMi44NjIgMTguNTQ5NSAxMi4zNTE2IDE2LjY0ODQgMTIuMzUxNkMxNC43ODM5IDEyLjM1MTYgMTMuMzMwNyAxMi44NzUgMTIuMjg5MSAxMy45MjE5QzExLjI1MjYgMTQuOTYzNSAxMC43MzQ0IDE2LjQyNzEgMTAuNzM0NCAxOC4zMTI1QzEwLjczNDQgMjAuMjU1MiAxMS4zMjgxIDIxLjc2MyAxMi41MTU2IDIyLjgzNTlDMTMuNTIwOCAyMy43NDIyIDE0Ljg5MzIgMjQuMTk1MyAxNi42MzI4IDI0LjE5NTNDMTcuODA5OSAyNC4xOTUzIDE4Ljc4OTEgMjQuMDI2IDE5LjU3MDMgMjMuNjg3NUMxOS43NjMgMjMuODU0MiAyMC4xMDE2IDI0LjEwMTYgMjAuNTg1OSAyNC40Mjk3QzIxLjA3MDMgMjQuNzYzIDIxLjU1OTkgMjUuMDQ5NSAyMi4wNTQ3IDI1LjI4OTFMMjMuMDM5MSAyMy4zMDQ3QzIyLjY5NTMgMjMuMTUzNiAyMi40MjE5IDIzLjAyMDggMjIuMjE4OCAyMi45MDYyWk0xOS4wNjI1IDE4LjI1QzE5LjA2MjUgMTkuMjU1MiAxOC45MjE5IDIwLjAxMDQgMTguNjQwNiAyMC41MTU2QzE4LjUgMjAuNDI3MSAxOC4zNjk4IDIwLjM0MTEgMTguMjUgMjAuMjU3OEMxNy43NDQ4IDE5LjkwMzYgMTcuNDAzNiAxOS42ODQ5IDE3LjIyNjYgMTkuNjAxNkMxNy4wNTQ3IDE5LjUxODIgMTYuODEyNSAxOS40NDc5IDE2LjUgMTkuMzkwNkwxNS45NDUzIDIwLjY2NDFDMTYuNTg1OSAyMC45MTkzIDE3LjA1NDcgMjEuMTkwMSAxNy4zNTE2IDIxLjQ3NjZDMTcuMTM4IDIxLjUyMzQgMTYuOTExNSAyMS41NDY5IDE2LjY3MTkgMjEuNTQ2OUMxNS45MjcxIDIxLjU0NjkgMTUuMzQxMSAyMS4yOTQzIDE0LjkxNDEgMjAuNzg5MUMxNC40ODcgMjAuMjgzOSAxNC4yNzM0IDE5LjQwNjIgMTQuMjczNCAxOC4xNTYyQzE0LjI3MzQgMTcuMDgzMyAxNC40OTIyIDE2LjI5NDMgMTQuOTI5NyAxNS43ODkxQzE1LjM2NzIgMTUuMjgzOSAxNS45Mzc1IDE1LjAzMTIgMTYuNjQwNiAxNS4wMzEyQzE3LjM5NTggMTUuMDMxMiAxNy45ODcgMTUuMjc4NiAxOC40MTQxIDE1Ljc3MzRDMTguODQ2NCAxNi4yNjgyIDE5LjA2MjUgMTcuMDkzOCAxOS4wNjI1IDE4LjI1Wk0zNS40OTIyIDEyLjU0NjlIMzEuOTYwOVYxOS41MzkxQzMxLjk2MDkgMjAuMTc0NSAzMS43ODY1IDIwLjY2NjcgMzEuNDM3NSAyMS4wMTU2QzMxLjA5MzggMjEuMzU5NCAzMC42MTcyIDIxLjUzMTIgMzAuMDA3OCAyMS41MzEyQzI5LjM5MzIgMjEuNTMxMiAyOC45MTE1IDIxLjM1NjggMjguNTYyNSAyMS4wMDc4QzI4LjIxODggMjAuNjUzNiAyOC4wNDY5IDIwLjE2NDEgMjguMDQ2OSAxOS41MzkxVjEyLjU0NjlIMjQuNTE1NlYxOS4zNzVDMjQuNTE1NiAxOS45Mzc1IDI0LjYyNSAyMC41ODMzIDI0Ljg0MzggMjEuMzEyNUMyNC45NzkyIDIxLjc2NTYgMjUuMjI5MiAyMi4yMDU3IDI1LjU5MzggMjIuNjMyOEMyNS45NjM1IDIzLjA1OTkgMjYuMzY5OCAyMy4zOTA2IDI2LjgxMjUgMjMuNjI1QzI3LjI1NTIgMjMuODU0MiAyNy44MDQ3IDI0LjAwNzggMjguNDYwOSAyNC4wODU5QzI5LjEyMjQgMjQuMTY0MSAyOS43MzE4IDI0LjIwMzEgMzAuMjg5MSAyNC4yMDMxQzMxLjI1MjYgMjQuMjAzMSAzMi4wNzgxIDI0LjA3NTUgMzIuNzY1NiAyMy44MjAzQzMzLjI2MDQgMjMuNjM4IDMzLjczMTggMjMuMzIyOSAzNC4xNzk3IDIyLjg3NUMzNC42MzI4IDIyLjQyMTkgMzQuOTYzNSAyMS44OTU4IDM1LjE3MTkgMjEuMjk2OUMzNS4zODU0IDIwLjY5MjcgMzUuNDkyMiAyMC4wNTIxIDM1LjQ5MjIgMTkuMzc1VjEyLjU0NjlaTTQxLjUyMzQgMTIuNTQ2OUgzNy45NzY2VjI0SDQxLjUyMzRWMTIuNTQ2OVpNNTQuNzk2OSAyMC4yNTc4TDUxLjY5NTMgMTkuMzIwM0M1MS41MzkxIDIwLjA0NDMgNTEuMjg2NSAyMC41OTY0IDUwLjkzNzUgMjAuOTc2NkM1MC41OTM4IDIxLjM1NjggNTAuMDgzMyAyMS41NDY5IDQ5LjQwNjIgMjEuNTQ2OUM0OC43MDgzIDIxLjU0NjkgNDguMTY2NyAyMS4zMTI1IDQ3Ljc4MTIgMjAuODQzOEM0Ny4zOTU4IDIwLjM2OTggNDcuMjAzMSAxOS40OTc0IDQ3LjIwMzEgMTguMjI2NkM0Ny4yMDMxIDE3LjIwMDUgNDcuMzY0NiAxNi40NDc5IDQ3LjY4NzUgMTUuOTY4OEM0OC4xMTQ2IDE1LjMyMjkgNDguNzI5MiAxNSA0OS41MzEyIDE1QzQ5Ljg4NTQgMTUgNTAuMjA1NyAxNS4wNzI5IDUwLjQ5MjIgMTUuMjE4OEM1MC43Nzg2IDE1LjM2NDYgNTEuMDIwOCAxNS41NzI5IDUxLjIxODggMTUuODQzOEM1MS4zMzg1IDE2LjAwNTIgNTEuNDUzMSAxNi4yNjA0IDUxLjU2MjUgMTYuNjA5NEw1NC42ODc1IDE1LjkxNDFDNTQuMjg2NSAxNC43MDU3IDUzLjY3MTkgMTMuODA5OSA1Mi44NDM4IDEzLjIyNjZDNTIuMDIwOCAxMi42NDMyIDUwLjg4OCAxMi4zNTE2IDQ5LjQ0NTMgMTIuMzUxNkM0Ny42MDE2IDEyLjM1MTYgNDYuMTc0NSAxMi44NjIgNDUuMTY0MSAxMy44ODI4QzQ0LjE1ODkgMTQuODk4NCA0My42NTYyIDE2LjM1NDIgNDMuNjU2MiAxOC4yNUM0My42NTYyIDE5LjY3MTkgNDMuOTQyNyAyMC44Mzg1IDQ0LjUxNTYgMjEuNzVDNDUuMDg4NSAyMi42NjE1IDQ1Ljc2ODIgMjMuMjk5NSA0Ni41NTQ3IDIzLjY2NDFDNDcuMzQ2NCAyNC4wMjM0IDQ4LjM2NDYgMjQuMjAzMSA0OS42MDk0IDI0LjIwMzFDNTAuNjM1NCAyNC4yMDMxIDUxLjQ3OTIgMjQuMDU0NyA1Mi4xNDA2IDIzLjc1NzhDNTIuODA3MyAyMy40NjA5IDUzLjM2NDYgMjMuMDIwOCA1My44MTI1IDIyLjQzNzVDNTQuMjYwNCAyMS44NTQyIDU0LjU4ODUgMjEuMTI3NiA1NC43OTY5IDIwLjI1NzhaTTYwLjA3ODEgMTIuNTQ2OUg1Ni41MzkxVjI0SDYwLjA3ODFWMjEuMjAzMUw2MS45MDYyIDE5LjI4OTFMNjQuMzIwMyAyNEg2OC42Nzk3TDY0LjMyMDMgMTYuODY3Mkw2OC40OTIyIDEyLjU0NjlINjMuNzg5MUw2MC4wNzgxIDE2Ljg3NVYxMi41NDY5WiIgZmlsbD0id2hpdGUiLz4KPG1hc2sgaWQ9InBhdGgtMi1pbnNpZGUtMV8zODMzXzE2MzY5IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik04MC4wMDc4IDBIMTQ3LjAwOFYzNkg4MC4wMDc4VjBaIi8+CjwvbWFzaz4KPHBhdGggZD0iTTE0Ny4wMDggMEgxNDkuMDA4Vi0ySDE0Ny4wMDhWMFpNMTQ3LjAwOCAzNlYzOEgxNDkuMDA4VjM2SDE0Ny4wMDhaTTgwLjAwNzggMkgxNDcuMDA4Vi0ySDgwLjAwNzhWMlpNMTQ1LjAwOCAwVjM2SDE0OS4wMDhWMEgxNDUuMDA4Wk0xNDcuMDA4IDM0SDgwLjAwNzhWMzhIMTQ3LjAwOFYzNFoiIGZpbGw9IndoaXRlIiBtYXNrPSJ1cmwoI3BhdGgtMi1pbnNpZGUtMV8zODMzXzE2MzY5KSIvPgo8cGF0aCBkPSJNOTAuMDQ2OSAxMi41NDY5SDkzLjc1TDk2LjMyODEgMjAuNzg5MUw5OC44NjcyIDEyLjU0NjlIMTAyLjQ2MUw5OC4yMTA5IDI0SDk0LjM3NUw5MC4wNDY5IDEyLjU0NjlaTTEwMy43NzMgMTIuNTQ2OUgxMDcuMzJWMjRIMTAzLjc3M1YxMi41NDY5Wk0xMDkuODU5IDEyLjU0NjlIMTE5LjM0NFYxNC45OTIySDExMy40MDZWMTYuODEyNUgxMTguOTE0VjE5LjE0ODRIMTEzLjQwNlYyMS40MDYySDExOS41MTZWMjRIMTA5Ljg1OVYxMi41NDY5Wk0xMjAuMjUgMTIuNTQ2OUgxMjMuNjA5TDEyNC44MiAxOC45NDUzTDEyNi41ODYgMTIuNTQ2OUgxMjkuOTM4TDEzMS43MTEgMTguOTQ1M0wxMzIuOTIyIDEyLjU0NjlIMTM2LjI2NkwxMzMuNzQyIDI0SDEzMC4yNzNMMTI4LjI2NiAxNi43ODkxTDEyNi4yNjYgMjRIMTIyLjc5N0wxMjAuMjUgMTIuNTQ2OVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=");


/***/ }),

/***/ "./src/assets/images/rate-us.svg":
/*!***************************************!*\
  !*** ./src/assets/images/rate-us.svg ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgRateUs),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _circle, _g, _defs;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgRateUs(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 36,
    height: 36,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _circle || (_circle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 18,
    cy: 18,
    r: 18,
    fill: "#0167FF",
    fillOpacity: 0.2
  })), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#rate-us_svg__clip0_3779_16319)",
    fill: "#0167FF"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M25.403 19.126l-2.542 2.478.6 3.498c.225 1.309-1.15 2.302-2.321 1.686l-3.142-1.651-3.141 1.651c-1.168.616-2.546-.375-2.321-1.686l.6-3.498-2.542-2.478c-.95-.925-.425-2.539.886-2.729l3.513-.51 1.57-3.183c.585-1.185 2.28-1.192 2.87 0l1.57 3.183 3.513.51c1.312.19 1.836 1.805.887 2.73z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M29.635 14.566l-1.94 1.89.459 2.67c.169.984-.867 1.732-1.747 1.269l-.754-.396c.285-.277.42-.396.572-.603 1.064-1.445.208-3.531-1.592-3.792l-3.096-.45-1.383-2.802 1.578-.229 1.198-2.429c.442-.894 1.718-.894 2.16 0l1.198 2.43 2.68.389c.985.142 1.383 1.355.667 2.053zm-13.789-2.214l-1.383 2.802-3.096.45c-1.968.285-2.753 2.707-1.33 4.094l.31.301-.754.396c-.883.465-1.915-.286-1.747-1.269l.458-2.67-1.94-1.89c-.715-.698-.317-1.911.668-2.053l2.68-.39 1.199-2.429c.441-.894 1.717-.894 2.16 0l1.198 2.43 1.577.228z"
  }))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "rate-us_svg__clip0_3779_16319"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    transform: "translate(6 6)",
    d: "M0 0h24v24H0z"
  })))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTgiIGZpbGw9IiMwMTY3RkYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8zNzc5XzE2MzE5KSI+CjxwYXRoIGQ9Ik0yNS40MDI4IDE5LjEyNjFMMjIuODYxNCAyMS42MDM2TDIzLjQ2MTMgMjUuMTAxNUMyMy42ODU1IDI2LjQxMDYgMjIuMzEwNSAyNy40MDQ1IDIxLjEzOTkgMjYuNzg4TDE3Ljk5ODQgMjUuMTM2NUwxNC44NTcgMjYuNzg4QzEzLjY4OTEgMjcuNDA0MSAxMi4zMTExIDI2LjQxMjUgMTIuNTM1NSAyNS4xMDE1TDEzLjEzNTUgMjEuNjAzNkwxMC41OTQxIDE5LjEyNjFDOS42NDQ2MiAxOC4yMDE1IDEwLjE2OTIgMTYuNTg3MyAxMS40ODA1IDE2LjM5NzJMMTQuOTkzIDE1Ljg4NjdMMTYuNTYzNSAxMi43MDQyQzE3LjE0ODUgMTEuNTE4OSAxOC44NDM2IDExLjUxMTYgMTkuNDMzNCAxMi43MDQyTDIxLjAwMzkgMTUuODg2N0wyNC41MTYzIDE2LjM5NzJDMjUuODI3OSAxNi41ODczIDI2LjM1MjEgMTguMjAxNiAyNS40MDI4IDE5LjEyNjFaIiBmaWxsPSIjMDE2N0ZGIi8+CjxwYXRoIGQ9Ik0yOS42MzU0IDE0LjU2NjFMMjcuNjk1OSAxNi40NTY1TDI4LjE1MzkgMTkuMTI2QzI4LjMyMjUgMjAuMTA5OSAyNy4yODY4IDIwLjg1ODQgMjYuNDA2OSAyMC4zOTVMMjUuNjUzNCAxOS45OTlDMjUuOTM4MSAxOS43MjE3IDI2LjA3MzIgMTkuNjAyOCAyNi4yMjU0IDE5LjM5NkMyNy4yODg2IDE3Ljk1MDcgMjYuNDMzNCAxNS44NjUgMjQuNjMzIDE1LjYwNDFMMjEuNTM3IDE1LjE1NDFMMjAuMTU0IDEyLjM1MjFMMjEuNzMxNSAxMi4xMjMxTDIyLjkzIDkuNjk0MTVDMjMuMzcxNyA4Ljc5OTgyIDI0LjY0NzggOC43OTk5MiAyNS4wODk1IDkuNjk0MTVMMjYuMjg3OSAxMi4xMjMxTDI4Ljk2ODQgMTIuNTEyNkMyOS45NTM0IDEyLjY1NSAzMC4zNTA2IDEzLjg2ODIgMjkuNjM1NCAxNC41NjYxWk0xNS44NDYxIDEyLjM1MjFMMTQuNDYzMSAxNS4xNTQxTDExLjM2NzIgMTUuNjA0MUM5LjM5OTQxIDE1Ljg4OTMgOC42MTM3MiAxOC4zMTA4IDEwLjAzNzIgMTkuNjk3NUwxMC4zNDY3IDE5Ljk5OUw5LjU5MzIxIDIwLjM5NUM4LjcxMDMyIDIwLjg1OTYgNy42Nzc3NCAyMC4xMDg4IDcuODQ2MjQgMTkuMTI2TDguMzA0MjMgMTYuNDU2NUw2LjM2NDc2IDE0LjU2NjFDNS42NDkyMiAxMy44Njc5IDYuMDQ2ODIgMTIuNjU0OSA3LjAzMjI1IDEyLjUxMjZMOS43MTIyMSAxMi4xMjMxTDEwLjkxMDcgOS42OTQxNUMxMS4zNTI0IDguNzk5ODcgMTIuNjI4NCA4Ljc5OTkyIDEzLjA3MDEgOS42OTQxNUwxNC4yNjg2IDEyLjEyMzFMMTUuODQ2MSAxMi4zNTIxWiIgZmlsbD0iIzAxNjdGRiIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzM3NzlfMTYzMTkiPgo8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2IDYpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==");


/***/ }),

/***/ "./src/assets/images/welcome-feature-image.svg":
/*!*****************************************************!*\
  !*** ./src/assets/images/welcome-feature-image.svg ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgWelcomeFeatureImage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2, _path3, _path4, _path5, _path6, _path7, _path8, _path9, _path10, _path11, _path12, _path13, _path14, _path15, _path16, _path17, _path18, _path19, _path20, _path21, _path22, _path23, _path24, _path25, _path26, _path27, _path28, _path29;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgWelcomeFeatureImage(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 550,
    height: 382,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M549.995 266.935a101.735 101.735 0 01-.961 10.547c-4.105 28.654-20.282 57.061-45.916 69.494-10.824 4.277-23.084 8.241-36.468 11.837a498.905 498.905 0 01-20.693 5.09 484.878 484.878 0 01-7.603 1.648c-.101.02-.202.044-.304.063-.864.179-1.729.363-2.599.537-2.26.464-4.535.918-6.839 1.373-.01 0-.019 0-.029.004-.884.165-1.773.339-2.662.508a4.106 4.106 0 00-.241.048c-1.739.324-3.483.653-5.241.967-.966.174-1.942.353-2.922.522-.005 0-.015 0-.02.005-1.738.304-3.482.604-5.24.899-.976.164-1.952.324-2.937.488-1.744.29-3.488.57-5.246.841-.975.155-1.951.305-2.936.45a628.072 628.072 0 01-8.183 1.208c-1.744.247-3.487.493-5.246.73-.975.131-1.951.256-2.936.387-.677.092-1.353.179-2.039.266a879.84 879.84 0 01-57.508 5.442c-3.029.194-6.062.363-9.101.517a883.991 883.991 0 01-50.76 1.18 809.941 809.941 0 01-28.615-.672 638.27 638.27 0 01-13.041-.653 668.105 668.105 0 01-30.672-2.489c-13.452-1.406-26.528-3.224-39.053-5.467-.768-.135-1.54-.275-2.308-.42-23.21-4.273-44.482-10.045-62.721-17.46-38.994-13.35-69.087-41.617-82.022-76.304a1.16 1.16 0 00-.03-.068c-.361-.981-.714-1.967-1.047-2.953a106.31 106.31 0 01-1.84-5.945 81.023 81.023 0 01-.517-1.924 105.84 105.84 0 01-2.14-10.243c-.15-.894-.28-1.793-.401-2.702-1.546-11.552-1.256-23.549 1.125-35.73.198-1.015.425-2.002.667-2.954.029-.116.063-.227.092-.338.096-.387.203-.764.314-1.136.024-.106.062-.218.096-.324 1.15-3.867 2.686-7.265 4.488-10.392a59.367 59.367 0 012.154-3.461c.372-.561.753-1.107 1.14-1.648.135-.199.275-.387.415-.581.068-.091.135-.188.208-.285.125-.169.246-.343.377-.512.695-.938 1.41-1.861 2.14-2.779.371-.464.743-.933 1.12-1.393.087-.116.179-.227.27-.338.464-.565.928-1.126 1.401-1.692.343-.42.686-.836 1.039-1.256.816-.982 1.642-1.977 2.463-2.978 3.087-3.761 6.178-7.724 8.96-12.36.58-.962 1.15-1.962 1.7-2.982a71.03 71.03 0 001.904-3.833c10.167-20.969 9.11-48.946 4.917-66.26-8.999-37.925 4.057-82.801 48.93-97.075 61.093-19.267 108.849 52.445 188.36 43.474 46.307-5.225 54.91-18.895 103.289-38.423.377-.154.759-.31 1.15-.459.633-.251 1.265-.508 1.908-.759 18.437-7.29 51.688-11.306 80.225-5.288l1.15.247c18.002 3.987 34.004 12.05 43.037 25.903 34.198 50.768-10.018 77.561-16.157 120.576 1.159 44.171 44.564 58.894 56.91 95.915a62.472 62.472 0 012.55 10.716c.212 1.436.377 2.905.493 4.413.154 2.016.227 4.095.202 6.241z",
    fill: "#EFEBFF"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M159.141 232.131c.001 12.791.029 25.582.084 38.37.004.85-.01 1.712-.024 2.569-.014.851-.027 1.696-.024 2.522l3.225-.029c.093-14.626.02-29.254-.22-43.88-1.01.177-2.025.327-3.041.448zm151.647 53.274c-.784.257-10.803.42-25.567.499.002-1.203-.027-2.369-.136-3.449 22.846.087 25.2-.188 26.897-1.39.162-.114.319-.238.487-.371l.076-.06c3.817-3.005 3.772-5.341 3.493-19.644-.147-7.569-.359-18.49-.099-34.635.04-.293.041-.59.005-.878.557-.05.971-.103 1.233-.16a16.393 16.393 0 001.732-.411c.276 4.057.366 32.621.389 39.925V264.922c.002.723.003 1.224.005 1.457.002.584.008 1.163.013 1.733v.006c.075 7.933.135 14.439-8.528 17.287z",
    fill: "#191919"
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M172.224 266.625c.915-11.55 16.572-15.124 26.723-9.542 4.174 2.296 6.053 6.249 7.094 10.677.274 1.16-.621 1.272-1.473 1.272-33.564.011-32.647 1.427-32.344-2.407zm14.915.747c18.087-.051 17.616.527 15.034-3.612-7.228-11.586-27.594-7.488-27.872 2.621-.042 1.472-.06 1.028 12.838.991zM269.913 231.879a1.145 1.145 0 01.962 1.112c.005.268-.085.53-.252.74a1.153 1.153 0 01-.668.406c-.923.196-52.482-.237-52.522-.24-.936 0-2.486.294-2.539-1.095-.046-1.45-.048-1.19 27.949-1.19 0 .368 22.795-.096 27.07.267z",
    fill: "#191919"
  })), _path4 || (_path4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M198.108 243.828c-.126 12.054-16.695 11.049-16.544-.455a8.276 8.276 0 018.024-8.443 8.799 8.799 0 018.52 8.898zm-2.295.267c-.166-9.338-12.353-8.807-12.187-.29.169 8.723 12.328 8.513 12.187.29zM254.219 244.366c2.133 0 2.143 2.329.01 2.35-38.282.376-37.856.062-37.801-1.196.066-1.515 9.133-1.164 37.791-1.154zM300.138 231.984c2.136.028 2.116 2.219.055 2.259-25.78.497-26.365.254-26.264-1.46.091-1.528 1.687-1.107 26.209-.799zM236.843 259.671l-4.071-.592c-.267-.04-.405-.262-1.227-1.989-.243-.514-.923-1.925-.934-1.95a2.098 2.098 0 00-.779-.857 2.103 2.103 0 00-2.227 0 2.098 2.098 0 00-.779.857l-1.823 3.694c-.184.374-.995.343-4.415.84a2.107 2.107 0 00-1.697 1.442 2.103 2.103 0 00.537 2.16l2.946 2.873c.297.292.017 1.063-.565 4.461-.051.304-.036.614.043.91.082.297.226.572.423.808.197.235.444.424.723.553.278.131.581.199.888.199.699 0 .724-.132 4.627-2.155.368-.192 1.004.308 4.066 1.916.348.183.741.266 1.134.236a2.105 2.105 0 001.801-1.31c.15-.364.193-.764.126-1.152l-.706-4.066c-.071-.42.691-.947 3.078-3.276.282-.275.482-.623.577-1.005a2.12 2.12 0 00-.688-2.121 2.128 2.128 0 00-1.058-.476zm.014 2.415c-2.809 2.739-3.812 3.279-3.555 4.743.742 4.33.829 4.272.515 4.502-.283.198-.291.151-2.366-.981-1.939-1.058-2.663-1.456-3.717-.902l-3.646 1.918a.448.448 0 01-.482-.031.448.448 0 01-.181-.45c.663-3.884 1.147-4.895.09-5.926-3.149-3.072-3.181-2.967-3.061-3.339.119-.371.293-.313 2.471-.593 2.205-.287 3.029-.393 3.556-1.464l1.823-3.692a.447.447 0 01.613-.202.436.436 0 01.176.159c1.917 3.957 2.083 4.695 3.433 4.892 4.352.633 4.319.531 4.438.9a.44.44 0 01-.107.466z",
    fill: "#191919"
  })), _path5 || (_path5 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M225.729 264.466c-.341-.055-.828.078-.971-.497-.111-.456.181-.663.549-.819 1.505-.607 2.409-2.472 2.852-2.321 1.034.391-.199 3.541-2.43 3.637z",
    fill: "#191919"
  })), _path6 || (_path6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M249.548 269.578a1.447 1.447 0 110 2.894 1.447 1.447 0 010-2.894zM258.228 269.578a1.447 1.447 0 110 2.894 1.447 1.447 0 010-2.894z",
    stroke: "#191919",
    strokeWidth: 1.5
  })), _path7 || (_path7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M252.925 260.898h-2.894M244.242 255.109l.256.086c1.273.424 1.909.636 2.273 1.142.365.505.365 1.176.365 2.519v2.524c0 2.729 0 4.094.847 4.941.847.848 2.211.848 4.939.848h1.929m5.787 0h-1.929",
    stroke: "#191919",
    strokeWidth: 1.5,
    strokeLinecap: "round"
  })), _path8 || (_path8 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M247.133 258.004h2.893m-2.411 6.753h10.148c.925 0 1.388 0 1.75-.239.363-.239.545-.664.909-1.515l.414-.965c.78-1.822 1.171-2.733.742-3.384-.429-.65-1.42-.65-3.402-.65h-4.292",
    stroke: "#191919",
    strokeWidth: 1.5,
    strokeLinecap: "round"
  })), _path9 || (_path9 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M191.86 131.779c59.656-.107 126.111.237 130.791 1.899 3.651 1.296 3.638 2.437 3.485 14.874a791.273 791.273 0 00-.064 17.142l.01 1.183c.066 7.432.384 42.921.068 44.536a11.704 11.704 0 01-10.366 9.946c-17.485 1.527-79.931-.046-79.914-.091.184-.479-22.286-.414-49.316-.209a61.218 61.218 0 01-8.548 5.033c45.993.287 94.813.285 130.367-.381.47-.008 1.021.002 1.634.012 5.235.092 15.08.267 19.808-10.253 1.48-3.289 1.563-4.294 1.472-30.359-.017-5.338-.244-41.541-.358-46.88a9.414 9.414 0 00-.675-3.698 9.413 9.413 0 00-5.193-5.223 9.436 9.436 0 00-3.694-.694l-.123-.001c-3.329-.035-73.452-.761-135.057-.959a54.193 54.193 0 015.673 4.123zm-67.529-4.057c-13.515.113-23.643.317-28.283.645-7.78.55-15.117 6.575-15.016 19.739 0 .04.062 56.641.332 67.549a9.37 9.37 0 002.676 6.731 9.325 9.325 0 003.056 2.073 9.324 9.324 0 003.621.73c7.824.116 16.396.232 25.52.341.287-1.165.787-2.468 1.343-3.89-9.16.058-16.248.078-19.818.024a25.766 25.766 0 01-8.162-1.551c-3.74-1.315-3.72-2.321-3.449-16.839.19-10.133.503-26.843-.251-54.83a25.651 25.651 0 01.198-6.066 11.67 11.67 0 0110.545-9.9c.854-.091 8.943-.211 21.596-.327a63.002 63.002 0 016.092-4.429z",
    fill: "#191919"
  })), _path10 || (_path10 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M255.617 148.658c.131-2.3-.744-1.823-38.235-1.823 0-.02-7.176-.095-15.046-.124l1.967 3.804c51.176.136 51.178.533 51.314-1.857zM232.959 168.233c.08-2.015.077-2.041-23.787-1.985l.519 3.947c23.186.137 23.189.043 23.268-1.945v-.017zM302.084 147.222c2.499.27 2.353 2.884.094 3.189-1.326.179-38.483.254-39.887-.031-2.217-.45-2.799-3.114.182-3.394 2.552-.24 39.571.232 39.611.236z",
    fill: "#191919"
  })), _path11 || (_path11 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M270.031 189.352c3.294 6.669 1.45 5.338 8.811 6.407.305.043.593.173.83.37a1.643 1.643 0 01.083 2.448c-5.326 5.194-4.622 3.036-3.367 10.369a1.654 1.654 0 01-1.505 1.923 1.656 1.656 0 01-.885-.185c-6.582-3.465-4.309-3.46-10.896 0a1.641 1.641 0 01-1.735-.125 1.642 1.642 0 01-.655-1.613c1.263-7.332 1.956-5.175-3.367-10.369a1.664 1.664 0 01-.413-1.691 1.66 1.66 0 011.326-1.127c7.359-1.077 5.523.262 8.818-6.407a1.65 1.65 0 012.346-.67c.262.163.473.395.609.67zM298.748 189.35c3.294 6.669 1.45 5.338 8.811 6.407a1.642 1.642 0 011.337 1.124c.095.293.106.608.032.908a1.66 1.66 0 01-.456.786c-5.324 5.194-4.622 3.035-3.366 10.369a1.643 1.643 0 01-1.504 1.921 1.626 1.626 0 01-.885-.184c-6.584-3.464-4.309-3.459-10.898 0a1.62 1.62 0 01-.885.186 1.645 1.645 0 01-1.505-1.923c1.265-7.332 1.957-5.175-3.366-10.369a1.662 1.662 0 01.09-2.442c.234-.199.519-.33.822-.376 7.361-1.078 5.525.262 8.82-6.407a1.645 1.645 0 012.953 0zM241.31 189.35c3.295 6.669 1.45 5.338 8.813 6.407a1.651 1.651 0 011.336 1.124c.094.293.106.608.031.908a1.66 1.66 0 01-.455.786c-5.325 5.194-4.621 3.035-3.366 10.369a1.652 1.652 0 01-.655 1.611 1.632 1.632 0 01-.85.31 1.63 1.63 0 01-.885-.184c-6.582-3.464-4.309-3.459-10.898 0a1.619 1.619 0 01-.885.186 1.643 1.643 0 01-1.504-1.923c1.264-7.332 1.957-5.175-3.366-10.369a1.656 1.656 0 01.091-2.442c.234-.199.519-.33.822-.376 7.36-1.078 5.523.262 8.818-6.407a1.647 1.647 0 012.347-.672c.26.163.47.395.606.672z",
    fill: "#0167FF"
  })), _path12 || (_path12 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M203.908 202.618c.06.113.108.224.146.34.333 1.026-.156 2.321-.787 5.986a1.638 1.638 0 00.654 1.613c.249.181.542.289.851.31.306.023.613-.041.884-.186 3.297-1.73 4.374-2.596 5.453-2.596 1.077 0 2.154.864 5.445 2.596.272.143.579.208.885.184a1.64 1.64 0 001.407-1.022c.116-.284.149-.595.098-.899-.628-3.667-1.119-4.961-.786-5.988.334-1.026 1.49-1.785 4.152-4.381a1.65 1.65 0 00-.913-2.818c-3.679-.534-5.06-.469-5.93-1.103-.872-.634-1.235-1.969-2.882-5.304a1.652 1.652 0 00-.606-.672 1.657 1.657 0 00-1.74 0 1.647 1.647 0 00-.607.672c-.184.373-.351.719-.507 1.044a56.342 56.342 0 01-5.217 12.224z",
    fill: "#0167FF"
  })), _path13 || (_path13 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M169.093 120.613c-46.463-11.994-92.732 40.706-63.932 86.243 4.422 6.991 8.19 10.062 10.43 11.888 1.694 1.38 2.513 2.049 2.08 3.161-1.492 3.821-2.643 6.797-.535 8.584.269.228.474.393.578.608.497 1.025-1.344 3.185-9.693 18.983-2.486 4.696-19.782 37.465-22.06 42.698-1.373 3.163 5.662 10.364 13.39 8.183 2.626-.741 31.571-58.585 32.701-61.07.493-1.082 1.203-.94 2.117-.754 1.21.244 2.778.562 4.678-1.792 1.26-1.56 1.862-2.833 2.307-3.775.708-1.498 1.022-2.163 2.964-1.826 31.807 5.521 67.523-19.791 67.328-58.013a54.27 54.27 0 00-25.294-45.594 64.602 64.602 0 00-2.26-1.382c-.953.672-1.991 1.418-3.079 2.203 10.953 5.836 19.967 15.726 24.496 29.655 11.206 34.48-15.137 69.043-50.296 70.485h.005c-40.154 1.648-66.877-38.138-50.356-74.219 11.934-26.067 39.472-36.283 63.186-30.766.474-1.291.887-2.449 1.245-3.5zM106.279 278.22c.888-1.711 1.93-3.723 3.167-6.097l.989-1.897c3.887-7.445 4.428-8.479 3.244-9.066-1.173-.58-4.153 5.263-7.649 12.12-2.934 5.754-6.233 12.222-9.13 16.201-.841 1.155-1.833 1.238-2.547 1.296-.587.048-.986.081-.959.685.043.922 1.414 1.084 2.69 1.233l.032.004c1.046.22 1.542-.526 2.217-1.541.383-.575.823-1.236 1.453-1.856 1.531-1.507 2.167-2.734 6.493-11.082zm14.459-28.53c1.014-2.102 2.228-4.622 3.693-7.635 1.837-3.788.059-5.151-9.891 15.078a5.24 5.24 0 01-.308.518c-.444.691-.929 1.447.156 1.996 1.248.63 1.291.542 6.35-9.957zm16.818-16.6c.145-.254.298-.521.464-.801h-.005c.922-1.563.248-1.754-2.106-2.42-2.485-.703-6.84-1.937-13.165-5.87-1.265-.784-1.892-1.186-2.325-1.033-.431.152-.67.854-1.156 2.274-.835 2.444-.487 3.558 1.745 4.775 13.952 7.607 14.272 7.048 16.548 3.075z",
    fill: "#0167FF"
  })), _path14 || (_path14 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M165.769 129.362a50.011 50.011 0 00-40.419 8.288c-32.787 23.706-24.474 72.21 12.057 83.781 42.173 13.358 79.251-30.15 60.177-67.558-4.961-9.73-12.823-16.893-21.993-21.159-.857.608-1.713 1.21-2.556 1.791 20.088 8.873 33.184 31.759 23.999 56.188-16.36 43.509-80.496 38.761-88.387-6.16a44.997 44.997 0 0119.775-45.634c11.966-7.988 24.803-9.763 36.256-7.163.368-.791.74-1.591 1.091-2.374z",
    fill: "#0167FF"
  })), _path15 || (_path15 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M133.121 152.103a133.166 133.166 0 01-10.602 10.689.719.719 0 00-.113.938c2.229 3.262 3.734 6.766 5.328 10.473a.712.712 0 00.749.428.73.73 0 00.289-.102c2.959-1.845 6.099-3.541 9.108-5.362.309 9.053-.027 18.728-1.078 31.146a.723.723 0 00.584.765c12.279 2.294 24.192 2.016 36.417-.866a.708.708 0 00.394-.249.713.713 0 00.159-.438c.112-7.2-.723-20.649-2.559-29.394 1.84 1.724 3.988 3.42 6.41 5.06a.716.716 0 00.931-.109c2.802-3.058 5.787-5.975 8.602-9.048a.716.716 0 00.095-.84 105.872 105.872 0 00-8.907-13.208.717.717 0 00-.471-.543 52.92 52.92 0 00-12.355-2.601.724.724 0 00-.665.334c-7.011.41-13.395.347-20.509.752a.716.716 0 00-.665 0 .707.707 0 00-.482-.014 45.726 45.726 0 01-9.695 2.093.719.719 0 00-.965.096zm31.976-1.472c-2.336 3.898-5.941 6.337-9.615 6.434-3.599.1-7.194-2.083-9.594-5.75 6.737-.35 12.52-.31 19.209-.684zm-20.921.664l.021.011c2.422 4.169 6.592 7.319 11.323 7.194 4.48-.118 8.832-3.234 11.37-8.134a51.505 51.505 0 0110.777 2.33c.109.155 4.587 5.686 8.661 12.754-2.554 2.762-5.247 5.42-7.826 8.204-2.95-2.041-5.456-4.159-7.455-6.301-.507-.544-1.408-.046-1.218.673 2.155 8.146 3.166 22.929 3.099 30.916-11.613 2.664-22.956 2.94-34.642.842 1.059-12.725 1.362-22.588.981-31.9a.718.718 0 00-1.096-.58c-3.057 1.907-6.327 3.663-9.448 5.569-1.422-3.3-2.819-6.438-4.784-9.431a134.673 134.673 0 009.946-10.046c.11.04.212.053.319.042a47.223 47.223 0 009.972-2.143z",
    fill: "#000"
  })), _path16 || (_path16 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M154.489 182.591c3.325 0 6.719-1.551 8.641-4.236 1.447-2.023 2.06-4.511 1.681-6.826-1.495-9.144-16.212-9.925-19.387-1.44-1.993 5.324 1.921 12.502 9.065 12.502zm2.159-14.324a.734.734 0 011.088.198c.571-.028 1.107.315 1.356.874.451 1.018-.249 2.08-1.415 2.08-.582 0-1.116-.27-1.42-.699-.53-.744-.355-1.845.391-2.453zm1.737 5.699a.726.726 0 01.979-.205.68.68 0 01.231.948c-1.932 2.979-6.206 3.44-8.768.985a.685.685 0 01.012-.965.73.73 0 01.992-.027c1.907 1.828 5.111 1.489 6.554-.736zm-6.931-4.596a.728.728 0 01.529.034c.667.057 1.258.538 1.325 1.192.116 1.115-1.298 1.922-2.249 1.272-.93-.636-.681-2.159.395-2.498z",
    fill: "#000"
  })), _path17 || (_path17 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M261.242 59.465c6.961 1.063 5.94 3.184 6.919 19.952a285.244 285.244 0 01-.548 35.085c-.7 4.111-2.652 6.631-7.695 6.772-22.932.628-56.676 2.44-71.037 2.294-2.065-.02-9.259 7.155-24.03 15.846-9.491 5.583 5.635-15.506 5.976-27.648.177-6.382-.847-5.899-.875-31.974-.012-10.203-1.715-17.686 7.015-18.535 25.14-2.444 79.965-2.45 84.275-1.792zm-32.499 2.576c-15.263.36-44.436 1.366-50.2 2.056-2.817.331-4.832 1.052-4.745 8.139.595 48.257 2.804 40.679-6.428 60.638-.133.286-.376.654-.051.901.324.247.611-.085.865-.271 23.559-17.31 15.203-13.366 30.403-13.795 59.328-1.673 57.278-1.645 61.235-2.321 3.431-.59 4.185-3.07 4.594-11.439.273-5.591.413-18.235-.747-40.052-.174-3.296.409-4.687-34.926-3.856z",
    fill: "#191919"
  })), _path18 || (_path18 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M186.179 98.703c-2.998-.596-2.132-3.545.342-3.647 9.66-.416 59.354-1.278 68.867.445 1.325.24 1.761 1.92.048 2.515-3.252 1.128-67.793.978-69.257.687zM213.468 87.636c-26.857.055-25.657.02-27.178-.068a1.788 1.788 0 01-1.844-1.735 1.793 1.793 0 011.734-1.844c4.428-.497 52.928-1.252 65.833-.322 3.379.246 4.927.38 4.952 1.718.036 2.125-.708 2.166-43.497 2.251zM224.386 72.364c29.751.269 32.822-.166 32.993 1.932.166 2.048-1.596 2.024-27.365 2.176-44.059.262-45.05 1.1-45.204-1.326-.093-1.437 1.051-2.17 2.507-2.228a748.237 748.237 0 0137.069-.554z",
    fill: "#0167FF"
  })), _path19 || (_path19 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M81.232 83.916c-46.128 30.735-14.101 4.768-15.906-15.478-1.09-12.25-.87-34.781-.867-34.813.272-8.386 6.004-7.754 31.442-8.646 22.956-.804 43.916-.745 53.353-.413 6.905.244 11.525-.638 12.448 4.982a225.212 225.212 0 01.983 37.177c-.282 4.629.85 13.897-6.988 14.154-74.48 2.44-72.326 1.612-74.465 3.037zm31.788-56.608c-8.06.12-35.795 1.104-40.846 1.78-3.544.478-3.625 3.316-3.812 7.432-.017.331.176 27.608.653 34.812.401 6.066-4.165 14.5-6.97 19.925-.166.308-.517.7-.193 1.004.325.305.693-.074.987-.277C77.883 81.647 80.865 78.618 86.888 79.44c3.212.44 3.811.068 52.492-1.177 15.057-.384 17.732-.354 18.614-4.036 2.154-8.924.87-35.59.273-43.64-.348-4.57-4.612-3.894-45.247-3.28z",
    fill: "#191919"
  })), _path20 || (_path20 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M107.027 60.383c-.893-6.137 4.874-7.899 8.825-12.362a4.483 4.483 0 001.115-4.38 4.479 4.479 0 00-3.27-3.12 8.068 8.068 0 00-8.362 2.754c-2.098 2.775-4.012.498-2.652-1.934 5.612-9.975 22.704-2.653 16.407 7.864a23.83 23.83 0 01-5.779 5.931c-3.934 3.218-2.086 4.7-3.165 9.018-.54 2.169-3.49 1.797-3.119-3.77zM109.525 73.12c-3.093.049-3.005-3.963.097-4.052a2.033 2.033 0 012.026 1.252 2.026 2.026 0 01-.039 1.647 2.044 2.044 0 01-1.246 1.078 2.035 2.035 0 01-.838.074z",
    fill: "#0167FF"
  })), _path21 || (_path21 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M279.196 275.822a5.924 5.924 0 015.88 5.028c.313 2.345.393 37.279.402 39.774.034 8.288.738 15.191-8.097 18.095-2.406.791-96.38.652-138.211-.097-7-.125-5.908-7.449-5.934-14.076-.053-12.793-.08-25.587-.08-38.382a10.704 10.704 0 0110.606-10.626c.042 0 81.432-.736 135.434.284zm-74.574 59.788c72.703.469 71.715.726 74.445-1.421 5.551-4.368 2.53-7.259 3.226-51.625a3.195 3.195 0 00-.568-2.296 3.197 3.197 0 00-1.994-1.272 16.93 16.93 0 00-4.998-.862c-.048 0-60.256-.187-80.979 0-49.054.451-57.915-3.597-57.706 8.72.251 14.779.321 29.559.209 44.339-.045 7.067-.114 3.974 68.361 4.417h.004z",
    fill: "#191919"
  })), _path22 || (_path22 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M145.604 320.859c.871-10.981 15.763-14.379 25.413-9.071 3.977 2.185 5.759 5.945 6.75 10.154.26 1.102-.592 1.207-1.402 1.207-31.921.009-31.051 1.356-30.761-2.29zm14.182.713c17.2-.051 16.754.497 14.3-3.431-6.871-11.019-26.25-7.12-26.515 2.486-.032 1.409-.052.983 12.215.945zM238.509 287.819a1.092 1.092 0 01.04 2.154c-.875.184-49.915-.227-49.953-.227-.892 0-2.372.28-2.413-1.041-.043-1.379-.045-1.133 26.58-1.133 0 .334 21.68-.108 25.746.247z",
    fill: "#191919"
  })), _path23 || (_path23 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M170.22 299.174c-.12 11.466-15.878 10.515-15.734-.433a7.872 7.872 0 017.623-8.03 8.368 8.368 0 018.111 8.463zm-2.185.257c-.152-8.883-11.748-8.375-11.589-.277.16 8.098 11.725 8.098 11.589.277zM223.581 299.689c2.028 0 2.035 2.214 0 2.236-36.406.367-36.003.056-35.95-1.141.071-1.44 8.694-1.105 35.95-1.095zM267.252 287.907c2.032.027 2.012 2.113.051 2.155-24.518.462-25.073.242-24.976-1.391.088-1.45 1.603-1.064 24.925-.764z",
    fill: "#191919"
  })), _path24 || (_path24 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M194.097 326.004a2.043 2.043 0 110 4.087 2.043 2.043 0 010-4.087zM206.355 326.004a2.043 2.043 0 11-.001 4.085 2.043 2.043 0 01.001-4.085z",
    stroke: "#191919",
    strokeWidth: 2
  })), _path25 || (_path25 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M198.866 313.746h-4.085M186.617 305.57l.361.121c1.797.599 2.696.899 3.21 1.612.514.713.514 1.661.514 3.556v3.564c0 3.853 0 5.779 1.196 6.976 1.197 1.197 3.122 1.197 6.974 1.197h2.723m8.169 0h-2.723",
    stroke: "#191919",
    strokeWidth: 2,
    strokeLinecap: "round"
  })), _path26 || (_path26 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M190.695 309.66h4.085m-3.404 9.534h14.326c1.307 0 1.96 0 2.471-.337.512-.338.769-.938 1.284-2.139l.584-1.362c1.102-2.573 1.653-3.859 1.047-4.777-.605-.919-2.004-.919-4.802-.919h-6.06",
    stroke: "#191919",
    strokeWidth: 2,
    strokeLinecap: "round"
  })), _path27 || (_path27 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M462.404 237.065c-.277-5.203 1.947-10.174 1.452-15.437a1.016 1.016 0 00-1.751-.511 1.024 1.024 0 00-.27.686c.402 5.102-2.077 9.884-1.96 15.001.116 5.116 1.96 8.199 1.364 14.957a1.224 1.224 0 002.4.438c1.453-4.871-.93-10.174-1.177-15.134h-.058zm-16.407 20.001c-3.792-4.172-4.779-6.832-5.331-12.763-.175-1.858-.402-3.719-.45-5.58a.986.986 0 00-.989-.989.988.988 0 00-.988.989c0 4.361-.422 7.268.93 11.846a14.982 14.982 0 005.406 8.402c1.191.784 2.294-.958 1.452-1.919l-.03.014zm9.442-19.462c.904.488 1.453 3.4-7.135.93a27.066 27.066 0 01-16.522-13.464c-.524-.946 1.103-1.833 1.656-.916a27.293 27.293 0 009.538 9.294c6.583 3.939 10.613 3.157 12.475 4.158l-.012-.002zM451.654 209.315c-2.064-2.399-2.66 5.814-8.253 2.733a.958.958 0 00-.844 1.714c4.862 3.097 10.798-2.469 9.097-4.447zm0-18.634c-.298-1.935-3.91-4.26-6.073-4.608-2.164-.348-2.094 1.808-.402 2.355 1.233.378 3.632.725 4.751 2.586.968 1.6 1.856.523 1.724-.333zm-16.958-3.617c-2.227-.471-6.191 3.605-4.578 4.505.567.319 2.224-1.789 3.968-2.297 1.744-.508 1.175-2.09.61-2.208zm-1.643 7.338c-1.217.402-.856 4.667.697 4.261 1.553-.406.862-4.773-.697-4.261zm12.964-.711c-2.066 0-1.105 4.361-.089 4.361 1.455.084 1.905-4.363.085-4.363l.004.002zm-4.018 11.629c.741.231.93 1.773-1.453 1.453-2.382-.319-6-2.18-3.817-3.314 3.283-1.686 2.905-3.866 4.36-3.271 1.454.595-.918 3.43-1.949 4.244 1.975.615 2.664.752 2.865.878l-.006.01z",
    fill: "#191919"
  })), _path28 || (_path28 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M443.021 264.884c0 20.713 8.47 112.885 38.696 105.341 22.349-5.569 37.402-53.784 39.523-73.188 3.676-33.433-11.989-51.243-41.136-62.497-1.903-.727-.804 2.195-6.511 6.947-4.432 3.708-7.877 3.708-7.075 5.38 1.131 2.339 10.171-3.533 14.02-9.71 26.156 11.074 41.895 25.684 38.044 59.117-2.471 21.323-15.157 62.402-35.356 70.874-29.644 12.471-37.302-84.698-38.043-103.043 3.299-4.361 14.691-7.12 20.342-5.725a223.869 223.869 0 0014.533 50.276c1.685 4.114 4.795 12.399 7.264 15.757.494.699 1.906.117 1.585-.697-2.077-5.247-4.36-10.422-6.523-15.626 1.292-.567 6.509-18.89 6.32-23.359 0-.814-1.453-1.206-1.656-.348-2.153 7.078-2.179 11.352-5.624 21.251a309.547 309.547 0 01-13.745-47.518c-1.278-5.735-24.658-.872-24.658 6.768zm59.49 94.409c1.105 5.381 2.061 12.326 3.632 17.684.32 1.075-1.235 1.453-1.758.538-1.808-2.905-4.273-14.535-3.69-17.923.143-.836 1.609-1.302 1.816-.299zm-102.777-21.018a15.109 15.109 0 01-18.966 1.628c-18.081-11.193-29.977-59.903-36.587-82.126 6.292.538 15.65-3.794 20.793-7.838 3.326 8.519 19.835 41.891 26.328 49.16a.993.993 0 001.249.112.986.986 0 00.358-1.201 31.734 31.734 0 00-2.368-4.361c2.79-.117 9.952-31.751 37.709-46.268a59.205 59.205 0 006.428-3.066c1.292-.901 1.453-5.277-12.366 3.691-15.579 10.088-26.504 26.95-32.665 44.174-9.751-15.99-14.532-26.727-22.843-43.724-.772-1.597-2.096-1.452-3.401-.536-6.656 4.853-11.493 7.049-18.221 7.435-2.995.175-3.562 1.031-2.907 3.881 4.608 20.125 19.563 72.675 37.783 83.024 6.77 3.85 15.72 3.501 21.112-2.59.771-.873-.603-2.195-1.452-1.453l.016.058zm19.862-69.438c-19.214 32.4-7.265 71.632-1.453 106.104a.884.884 0 01-1.335.88.883.883 0 01-.394-.516c-8.922-31.819-16.913-79.146 1.349-107.696.772-1.155 2.548.024 1.833 1.228zM365.678 225.072c0-2.211-.131-6.905-1.38-8.722a98.047 98.047 0 00-6.073-7.763c-.603-.697-1.832.161-1.455 1.047a41.198 41.198 0 005.223 7.588c1.236 1.789 1.453 7.269 1.264 9.508-.42 5.958-3.066 11.627-1.452 17.601.305 1.178 2.324.728 2.077-.464-1.308-6.324 1.918-12.515 1.89-18.825l-.094.03zm-8.122-1.831c.902-.378 1.557.9.958 1.453a16.333 16.333 0 00-5.812 14.041c.117 1.324-1.904 1.454-2.063.116-.683-5.809 2.342-13.701 6.917-15.61zm-12.134 28.937c-.858-2.397-6.67-8.896-8.616-11.715-1.947-2.82-2.907-8.722-3.14-12.297 2.907-2.994 6.902 3.111 8.21 4.797 2.907 3.647 3.357.973 3.299.712a23.99 23.99 0 00-6.228-7.603c-2.499-1.607-7.266-1.294-7.497 1.809a28.968 28.968 0 002.833 13.374 107.146 107.146 0 009.642 11.932c.728.48 1.847 0 1.453-1.017l.044.008zm-1.205-30.947c-2.542-1.452-6.365-1.627-8.371.83a1.087 1.087 0 00-.282.774 1.074 1.074 0 001.867.679 5.005 5.005 0 016.35.35c2.469 1.845 4.867 5.611 6.292 6.205 1.046.422 2.193-.711 1.452-1.607a29.594 29.594 0 00-7.308-7.229v-.002zm11.595-7.266c.567.667-.161 2.078-.96 1.686-3.616-1.809-9.241-3.215-13.54 2.906-.846 1.177-2.531-.173-1.774-1.351 4.387-6.746 13.644-6.229 16.272-3.169l.002-.072z",
    fill: "#191919"
  })), _path29 || (_path29 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M420.455 181.173c3.214 5.512 38.42.813 40.425-1.453 2.005-2.267 2.674-23.737-18.178-24.434-20.853-.698-22.858 24.842-22.247 25.887zm34.875 41.718c-6.429 7.602-15.577 3.866-20.067-4.275-4.157-7.499-6.228-21.918-6.642-30.525-.072-1.322-2.149-1.452-2.107 0 0 1.092.088 2.181.147 3.286-6.481 2.994-9.213 6.833-8.719 12.21.494 5.378 6.975 6.513 6.509 11.135-.466 4.622-11.929 4.724-13.673 13.343-1.744 8.619 5.609 6.164 5.507 11.483-.103 5.319-13.354 7.618-10.274 18.04 5.464-7.894 18.498-16.907 29.207-18.752a5.693 5.693 0 01.844-3.46c-5.392-4.156-11.756-15.291-3.096-15.988 7.817 14.535 21.295 11.105 23.932 4.477.336-.83-.93-1.643-1.524-.946l-.044-.028zm9.881-18.649c0-2.05 2.427-1.033 4.693-3.316 3.415-3.43 2.063-10.435.48-12.646-2.812-3.908-5.072 1.005-5.814.684-2.702-1.061-3.545-5.044-3.951-6.278 7.541-3.242 5.348-23.884-10.607-28.23 9.574-4.07 22.711-3.372 30.079 7.371 7.369 10.743 0 14.099 6.204 21.92 6.203 7.821 12.614 4.897 15.49 13.649 2.877 8.751-6.48 11.177-.494 19.229 5.987 8.052 15.141 6.963 17.437 13.562 2.297 6.6-3.24 12.675 1.033 17.63 4.273 4.956 9.705 15.072 2.469 19.481-6.567-19.595-31.474-36.616-51.207-37.177.338 1.269.581 2.561.727 3.866a.915.915 0 01-1.715.553c-2.863-5.661-4.824-24.609-4.824-30.298z",
    fill: "#191919"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTUwIiBoZWlnaHQ9IjM4MiIgdmlld0JveD0iMCAwIDU1MCAzODIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01NDkuOTk1IDI2Ni45MzVDNTQ5Ljg2IDI3MC40MjkgNTQ5LjU0MSAyNzMuOTU4IDU0OS4wMzQgMjc3LjQ4MkM1NDQuOTI5IDMwNi4xMzYgNTI4Ljc1MiAzMzQuNTQzIDUwMy4xMTggMzQ2Ljk3NkM0OTIuMjk0IDM1MS4yNTMgNDgwLjAzNCAzNTUuMjE3IDQ2Ni42NSAzNTguODEzQzQ2MC4wMTggMzYwLjYwMiA0NTMuMTExIDM2Mi4yOTggNDQ1Ljk1NyAzNjMuOTAzQzQ0My40NSAzNjQuNDY5IDQ0MC45MTkgMzY1LjAxNSA0MzguMzU0IDM2NS41NTFDNDM4LjI1MyAzNjUuNTcxIDQzOC4xNTIgMzY1LjU5NSA0MzguMDUgMzY1LjYxNEM0MzcuMTg2IDM2NS43OTMgNDM2LjMyMSAzNjUuOTc3IDQzNS40NTEgMzY2LjE1MUM0MzMuMTkxIDM2Ni42MTUgNDMwLjkxNiAzNjcuMDY5IDQyOC42MTIgMzY3LjUyNEM0MjguNjAyIDM2Ny41MjQgNDI4LjU5MyAzNjcuNTI0IDQyOC41ODMgMzY3LjUyOEM0MjcuNjk5IDM2Ny42OTMgNDI2LjgxIDM2Ny44NjcgNDI1LjkyMSAzNjguMDM2QzQyNS44MzkgMzY4LjA1IDQyNS43NjIgMzY4LjA2NSA0MjUuNjggMzY4LjA4NEM0MjMuOTQxIDM2OC40MDggNDIyLjE5NyAzNjguNzM3IDQyMC40MzkgMzY5LjA1MUM0MTkuNDczIDM2OS4yMjUgNDE4LjQ5NyAzNjkuNDA0IDQxNy41MTcgMzY5LjU3M0M0MTcuNTEyIDM2OS41NzMgNDE3LjUwMiAzNjkuNTczIDQxNy40OTcgMzY5LjU3OEM0MTUuNzU5IDM2OS44ODIgNDE0LjAxNSAzNzAuMTgyIDQxMi4yNTcgMzcwLjQ3N0M0MTEuMjgxIDM3MC42NDEgNDEwLjMwNSAzNzAuODAxIDQwOS4zMiAzNzAuOTY1QzQwNy41NzYgMzcxLjI1NSA0MDUuODMyIDM3MS41MzUgNDA0LjA3NCAzNzEuODA2QzQwMy4wOTkgMzcxLjk2MSA0MDIuMTIzIDM3Mi4xMTEgNDAxLjEzOCAzNzIuMjU2QzM5OS4zOTQgMzcyLjUyNiAzOTcuNjUgMzcyLjc4NyAzOTUuODkyIDM3My4wNDRDMzk0LjkxNiAzNzMuMTg5IDM5My45NCAzNzMuMzI5IDM5Mi45NTUgMzczLjQ2NEMzOTEuMjExIDM3My43MTEgMzg5LjQ2OCAzNzMuOTU3IDM4Ny43MDkgMzc0LjE5NEMzODYuNzM0IDM3NC4zMjUgMzg1Ljc1OCAzNzQuNDUgMzg0Ljc3MyAzNzQuNTgxQzM4NC4wOTYgMzc0LjY3MyAzODMuNDIgMzc0Ljc2IDM4Mi43MzQgMzc0Ljg0N0MzODEuMDM0IDM3NS4wNjkgMzc5LjMyNCAzNzUuMjgyIDM3Ny42MDkgMzc1LjQ4OUMzNjAuNTg4IDM3Ny41NzMgMzQzLjAyIDM3OS4xODcgMzI1LjIyNiAzODAuMjg5QzMyMi4xOTcgMzgwLjQ4MyAzMTkuMTY0IDM4MC42NTIgMzE2LjEyNSAzODAuODA2QzI5OS4yNjMgMzgxLjY4MSAyODIuMjUxIDM4Mi4wODMgMjY1LjM2NSAzODEuOTg2QzI1NS43NjcgMzgxLjkyOCAyNDYuMjA4IDM4MS43MDYgMjM2Ljc1IDM4MS4zMTRDMjMyLjM4NCAzODEuMTQgMjI4LjAzMiAzODAuOTIyIDIyMy43MDkgMzgwLjY2MUMyMTMuMzE5IDM4MC4wNTIgMjAzLjA2OSAzNzkuMjI2IDE5My4wMzcgMzc4LjE3MkMxNzkuNTg1IDM3Ni43NjYgMTY2LjUwOSAzNzQuOTQ4IDE1My45ODQgMzcyLjcwNUMxNTMuMjE2IDM3Mi41NyAxNTIuNDQ0IDM3Mi40MyAxNTEuNjc2IDM3Mi4yODVDMTI4LjQ2NiAzNjguMDEyIDEwNy4xOTQgMzYyLjI0IDg4Ljk1NSAzNTQuODI1QzQ5Ljk2MDYgMzQxLjQ3NSAxOS44NjgyIDMxMy4yMDggNi45MzI4OSAyNzguNTIxQzYuOTIzMjMgMjc4LjQ5NyA2LjkxMzU3IDI3OC40NzMgNi45MDM5MSAyNzguNDUzQzYuNTQxNjQgMjc3LjQ3MiA2LjE4OTA0IDI3Ni40ODYgNS44NTU3NSAyNzUuNUM1LjY2MjU0IDI3NC45MzkgNS40Nzg5OSAyNzQuMzgzIDUuMjk1NDQgMjczLjgxOEM0Ljg0MTQgMjcyLjQwNiA0LjQxMTUxIDI3MC45OSA0LjAxNTQzIDI2OS41NTVDMy44MzY3MSAyNjguOTE3IDMuNjYyODMgMjY4LjI3OCAzLjQ5ODYgMjY3LjYzMUMyLjYxOTUgMjY0LjI2MiAxLjkwNDYyIDI2MC44NDkgMS4zNTg4MSAyNTcuMzg4QzEuMjA5MDcgMjU2LjQ5NCAxLjA3ODY2IDI1NS41OTUgMC45NTc5MDEgMjU0LjY4NkMtMC41ODc3NzIgMjQzLjEzNCAtMC4yOTc5NjEgMjMxLjEzNyAyLjA4MzM0IDIxOC45NTZDMi4yODEzOCAyMTcuOTQxIDIuNTA4NCAyMTYuOTU0IDIuNzQ5OTIgMjE2LjAwMkMyLjc3ODkgMjE1Ljg4NiAyLjgxMjcxIDIxNS43NzUgMi44NDE2OSAyMTUuNjY0QzIuOTM4MjkgMjE1LjI3NyAzLjA0NDU2IDIxNC45IDMuMTU1NjUgMjE0LjUyOEMzLjE3OTggMjE0LjQyMiAzLjIxODQ1IDIxNC4zMSAzLjI1MjI2IDIxNC4yMDRDNC40MDE4NSAyMTAuMzM3IDUuOTM3ODYgMjA2LjkzOSA3LjczOTU0IDIwMy44MTJDOC40MjA2IDIwMi42MjMgOS4xNDUxNCAyMDEuNDcyIDkuODkzODIgMjAwLjM1MUMxMC4yNjU4IDE5OS43OSAxMC42NDczIDE5OS4yNDQgMTEuMDMzOCAxOTguNzAzQzExLjE2OSAxOTguNTA0IDExLjMwOTEgMTk4LjMxNiAxMS40NDkyIDE5OC4xMjJDMTEuNTE2OCAxOTguMDMxIDExLjU4NDQgMTk3LjkzNCAxMS42NTY5IDE5Ny44MzdDMTEuNzgyNCAxOTcuNjY4IDExLjkwMzIgMTk3LjQ5NCAxMi4wMzM2IDE5Ny4zMjVDMTIuNzI5MiAxOTYuMzg3IDEzLjQ0NCAxOTUuNDY0IDE0LjE3MzQgMTk0LjU0NkMxNC41NDUzIDE5NC4wODIgMTQuOTE3MyAxOTMuNjEzIDE1LjI5NCAxOTMuMTUzQzE1LjM4MSAxOTMuMDM3IDE1LjQ3MjcgMTkyLjkyNiAxNS41NjQ1IDE5Mi44MTVDMTYuMDI4MiAxOTIuMjUgMTYuNDkxOSAxOTEuNjg5IDE2Ljk2NTMgMTkxLjEyM0MxNy4zMDgyIDE5MC43MDMgMTcuNjUxMiAxOTAuMjg3IDE4LjAwMzggMTg5Ljg2N0MxOC44MjAxIDE4OC44ODUgMTkuNjQ2MSAxODcuODkgMjAuNDY3MiAxODYuODg5QzIzLjU1MzcgMTgzLjEyOCAyNi42NDUxIDE3OS4xNjUgMjkuNDI3MyAxNzQuNTI5QzMwLjAwNjkgMTczLjU2NyAzMC41NzY5IDE3Mi41NjcgMzEuMTI3NSAxNzEuNTQ3QzMxLjc4NDQgMTcwLjMxNCAzMi40MjIgMTY5LjA0MyAzMy4wMzA2IDE2Ny43MTRDNDMuMTk4MiAxNDYuNzQ1IDQyLjE0MDQgMTE4Ljc2OCAzNy45NDc4IDEwMS40NTRDMjguOTQ5MSA2My41Mjg3IDQyLjAwNTIgMTguNjUyOSA4Ni44NzggNC4zNzkwMkMxNDcuOTcxIC0xNC44ODggMTk1LjcyNyA1Ni44MjQ0IDI3NS4yMzggNDcuODUzMUMzMjEuNTQ1IDQyLjYyNzkgMzMwLjE0OCAyOC45NTgzIDM3OC41MjcgOS40MzAyMkMzNzguOTA0IDkuMjc1NTQgMzc5LjI4NiA5LjEyMDg2IDM3OS42NzcgOC45NzEwMkMzODAuMzEgOC43MTk2NyAzODAuOTQyIDguNDYzNDggMzgxLjU4NSA4LjIxMjEzQzQwMC4wMjIgMC45MjI5NDYgNDMzLjI3MyAtMy4wOTM4NCA0NjEuODEgMi45MjQwOUM0NjIuMTkyIDMuMDA2MjYgNDYyLjU3MyAzLjA4ODQzIDQ2Mi45NiAzLjE3MDYxQzQ4MC45NjIgNy4xNTgzOSA0OTYuOTY0IDE1LjIyMSA1MDUuOTk3IDI5LjA3NDNDNTQwLjE5NSA3OS44NDI0IDQ5NS45NzkgMTA2LjYzNSA0ODkuODQgMTQ5LjY1QzQ5MC45OTkgMTkzLjgyMSA1MzQuNDA0IDIwOC41NDQgNTQ2Ljc1IDI0NS41NjVDNTQ3Ljg3NSAyNDguOTM5IDU0OC43NDQgMjUyLjQ5NyA1NDkuMyAyNTYuMjgxQzU0OS41MTIgMjU3LjcxNyA1NDkuNjc3IDI1OS4xODYgNTQ5Ljc5MyAyNjAuNjk0QzU0OS45NDcgMjYyLjcxIDU1MC4wMiAyNjQuNzg5IDU0OS45OTUgMjY2LjkzNVoiIGZpbGw9IiNFRkVCRkYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNTkuMTQxIDIzMi4xMzFDMTU5LjE0MiAyNDQuOTIyIDE1OS4xNyAyNTcuNzEzIDE1OS4yMjUgMjcwLjUwMUMxNTkuMjI5IDI3MS4zNTEgMTU5LjIxNSAyNzIuMjEzIDE1OS4yMDEgMjczLjA3QzE1OS4xODcgMjczLjkyMSAxNTkuMTc0IDI3NC43NjYgMTU5LjE3NyAyNzUuNTkyQzE2MC4yMSAyNzUuNTgzIDE2MS4yODYgMjc1LjU3MyAxNjIuNDAyIDI3NS41NjNDMTYyLjQ5NSAyNjAuOTM3IDE2Mi40MjIgMjQ2LjMwOSAxNjIuMTgyIDIzMS42ODNDMTYxLjE3MiAyMzEuODYgMTYwLjE1NyAyMzIuMDEgMTU5LjE0MSAyMzIuMTMxWk0zMTAuNzg4IDI4NS40MDVDMzEwLjAwNCAyODUuNjYyIDI5OS45ODUgMjg1LjgyNSAyODUuMjIxIDI4NS45MDRDMjg1LjIyMyAyODQuNzAxIDI4NS4xOTQgMjgzLjUzNSAyODUuMDg1IDI4Mi40NTVDMzA3LjkzMSAyODIuNTQyIDMxMC4yODUgMjgyLjI2NyAzMTEuOTgyIDI4MS4wNjVDMzEyLjE0NCAyODAuOTUxIDMxMi4zMDEgMjgwLjgyNyAzMTIuNDY5IDI4MC42OTRMMzEyLjU0NSAyODAuNjM0QzMxNi4zNjIgMjc3LjYyOSAzMTYuMzE3IDI3NS4yOTMgMzE2LjAzOCAyNjAuOTlDMzE1Ljg5MSAyNTMuNDIxIDMxNS42NzkgMjQyLjUgMzE1LjkzOSAyMjYuMzU1QzMxNS45NzkgMjI2LjA2MiAzMTUuOTggMjI1Ljc2NSAzMTUuOTQ0IDIyNS40NzdDMzE2LjUwMSAyMjUuNDI3IDMxNi45MTUgMjI1LjM3NCAzMTcuMTc3IDIyNS4zMTdDMzE3Ljc2NCAyMjUuMjExIDMxOC4zNCAyMjUuMDc0IDMxOC45MDkgMjI0LjkwNkMzMTkuMTg1IDIyOC45NjMgMzE5LjI3NSAyNTcuNTI3IDMxOS4yOTggMjY0LjgzMVYyNjQuODM4VjI2NC45MjJDMzE5LjMgMjY1LjY0NSAzMTkuMzAxIDI2Ni4xNDYgMzE5LjMwMyAyNjYuMzc5QzMxOS4zMDUgMjY2Ljk2MyAzMTkuMzExIDI2Ny41NDIgMzE5LjMxNiAyNjguMTEyVjI2OC4xMTVWMjY4LjExOEMzMTkuMzkxIDI3Ni4wNTEgMzE5LjQ1MSAyODIuNTU3IDMxMC43ODggMjg1LjQwNVoiIGZpbGw9IiMxOTE5MTkiLz4KPHBhdGggZD0iTTE3Mi4yMjQgMjY2LjYyNUMxNzMuMTM5IDI1NS4wNzUgMTg4Ljc5NiAyNTEuNTAxIDE5OC45NDcgMjU3LjA4M0MyMDMuMTIxIDI1OS4zNzkgMjA1IDI2My4zMzIgMjA2LjA0MSAyNjcuNzZDMjA2LjMxNSAyNjguOTIgMjA1LjQyIDI2OS4wMzIgMjA0LjU2OCAyNjkuMDMyQzE3MS4wMDQgMjY5LjA0MyAxNzEuOTIxIDI3MC40NTkgMTcyLjIyNCAyNjYuNjI1Wk0xODcuMTM5IDI2Ny4zNzJDMjA1LjIyNiAyNjcuMzIxIDIwNC43NTUgMjY3Ljg5OSAyMDIuMTczIDI2My43NkMxOTQuOTQ1IDI1Mi4xNzQgMTc0LjU3OSAyNTYuMjcyIDE3NC4zMDEgMjY2LjM4MUMxNzQuMjU5IDI2Ny44NTMgMTc0LjI0MSAyNjcuNDA5IDE4Ny4xMzkgMjY3LjM3MloiIGZpbGw9IiMxOTE5MTkiLz4KPHBhdGggZD0iTTI2OS45MTMgMjMxLjg3OUMyNzAuMTc5IDIzMS45MjMgMjcwLjQyMSAyMzIuMDU4IDI3MC41OTYgMjMyLjI2MkMyNzAuNzcyIDIzMi40NjQgMjcwLjg3IDIzMi43MjIgMjcwLjg3NSAyMzIuOTkxQzI3MC44OCAyMzMuMjU5IDI3MC43OSAyMzMuNTIxIDI3MC42MjMgMjMzLjczMUMyNzAuNDU0IDIzMy45NCAyNzAuMjE4IDIzNC4wODQgMjY5Ljk1NSAyMzQuMTM3QzI2OS4wMzIgMjM0LjMzMyAyMTcuNDczIDIzMy45IDIxNy40MzMgMjMzLjg5N0MyMTYuNDk3IDIzMy44OTcgMjE0Ljk0NyAyMzQuMTkxIDIxNC44OTQgMjMyLjgwMkMyMTQuODQ4IDIzMS4zNTIgMjE0Ljg0NiAyMzEuNjEyIDI0Mi44NDMgMjMxLjYxMkMyNDIuODQzIDIzMS45OCAyNjUuNjM4IDIzMS41MTYgMjY5LjkxMyAyMzEuODc5WiIgZmlsbD0iIzE5MTkxOSIvPgo8cGF0aCBkPSJNMTk4LjEwOCAyNDMuODI4QzE5Ny45ODIgMjU1Ljg4MiAxODEuNDEzIDI1NC44NzcgMTgxLjU2NCAyNDMuMzczQzE4MS41MiAyNDEuMTkxIDE4Mi4zMzggMjM5LjA4MSAxODMuODQxIDIzNy41MDFDMTg1LjM0MyAyMzUuOTE5IDE4Ny40MDkgMjM0Ljk5NiAxODkuNTg4IDIzNC45M0MxOTEuODkgMjM1LjAwMSAxOTQuMDczIDIzNS45NzQgMTk1LjY2NSAyMzcuNjM4QzE5Ny4yNTggMjM5LjMwMyAxOTguMTM2IDI0MS41MjQgMTk4LjEwOCAyNDMuODI4Wk0xOTUuODEzIDI0NC4wOTVDMTk1LjY0NyAyMzQuNzU3IDE4My40NiAyMzUuMjg4IDE4My42MjYgMjQzLjgwNUMxODMuNzk1IDI1Mi41MjggMTk1Ljk1NCAyNTIuMzE4IDE5NS44MTMgMjQ0LjA5NVoiIGZpbGw9IiMxOTE5MTkiLz4KPHBhdGggZD0iTTI1NC4yMTkgMjQ0LjM2NkMyNTYuMzUyIDI0NC4zNjYgMjU2LjM2MiAyNDYuNjk1IDI1NC4yMjkgMjQ2LjcxNkMyMTUuOTQ3IDI0Ny4wOTIgMjE2LjM3MyAyNDYuNzc4IDIxNi40MjggMjQ1LjUyQzIxNi40OTQgMjQ0LjAwNSAyMjUuNTYxIDI0NC4zNTYgMjU0LjIxOSAyNDQuMzY2WiIgZmlsbD0iIzE5MTkxOSIvPgo8cGF0aCBkPSJNMzAwLjEzOCAyMzEuOTg0QzMwMi4yNzQgMjMyLjAxMiAzMDIuMjU0IDIzNC4yMDMgMzAwLjE5MyAyMzQuMjQzQzI3NC40MTMgMjM0Ljc0IDI3My44MjggMjM0LjQ5NyAyNzMuOTI5IDIzMi43ODNDMjc0LjAyIDIzMS4yNTUgMjc1LjYxNiAyMzEuNjc2IDMwMC4xMzggMjMxLjk4NFoiIGZpbGw9IiMxOTE5MTkiLz4KPHBhdGggZD0iTTIzNi44NDMgMjU5LjY3MUwyMzIuNzcyIDI1OS4wNzlDMjMyLjUwNSAyNTkuMDM5IDIzMi4zNjcgMjU4LjgxNyAyMzEuNTQ1IDI1Ny4wOUMyMzEuMzAyIDI1Ni41NzYgMjMwLjYyMiAyNTUuMTY1IDIzMC42MTEgMjU1LjE0QzIzMC40MzcgMjU0Ljc4NyAyMzAuMTY3IDI1NC40OSAyMjkuODMyIDI1NC4yODNDMjI5LjQ5NyAyNTQuMDc0IDIyOS4xMTEgMjUzLjk2NSAyMjguNzE4IDI1My45NjVDMjI4LjMyNCAyNTMuOTY1IDIyNy45MzkgMjU0LjA3NCAyMjcuNjA1IDI1NC4yODNDMjI3LjI3IDI1NC40OSAyMjcgMjU0Ljc4NyAyMjYuODI2IDI1NS4xNEwyMjUuMDAzIDI1OC44MzRDMjI0LjgxOSAyNTkuMjA4IDIyNC4wMDggMjU5LjE3NyAyMjAuNTg4IDI1OS42NzRDMjIwLjE5OSAyNTkuNzMyIDIxOS44MzQgMjU5Ljg5OCAyMTkuNTM0IDI2MC4xNTNDMjE5LjIzNCAyNjAuNDA4IDIxOS4wMTIgMjYwLjc0MiAyMTguODkxIDI2MS4xMTZDMjE4Ljc3IDI2MS40OTEgMjE4Ljc1NyAyNjEuODkgMjE4Ljg1MSAyNjIuMjczQzIxOC45NDYgMjYyLjY1NSAyMTkuMTQ2IDI2My4wMDMgMjE5LjQyOCAyNjMuMjc2TDIyMi4zNzQgMjY2LjE0OUMyMjIuNjcxIDI2Ni40NDEgMjIyLjM5MSAyNjcuMjEyIDIyMS44MDkgMjcwLjYxQzIyMS43NTggMjcwLjkxNCAyMjEuNzczIDI3MS4yMjQgMjIxLjg1MiAyNzEuNTJDMjIxLjkzNCAyNzEuODE3IDIyMi4wNzggMjcyLjA5MiAyMjIuMjc1IDI3Mi4zMjhDMjIyLjQ3MiAyNzIuNTYzIDIyMi43MTkgMjcyLjc1MiAyMjIuOTk4IDI3Mi44ODFDMjIzLjI3NiAyNzMuMDEyIDIyMy41NzkgMjczLjA4IDIyMy44ODYgMjczLjA4QzIyNC41ODUgMjczLjA4IDIyNC42MSAyNzIuOTQ4IDIyOC41MTMgMjcwLjkyNUMyMjguODgxIDI3MC43MzMgMjI5LjUxNyAyNzEuMjMzIDIzMi41NzkgMjcyLjg0MUMyMzIuOTI3IDI3My4wMjQgMjMzLjMyIDI3My4xMDcgMjMzLjcxMyAyNzMuMDc3QzIzNC4xMDYgMjczLjA0OSAyMzQuNDgyIDI3Mi45MTEgMjM0LjggMjcyLjY3OUMyMzUuMTE4IDI3Mi40NDcgMjM1LjM2NyAyNzIuMTMyIDIzNS41MTQgMjcxLjc2N0MyMzUuNjY0IDI3MS40MDMgMjM1LjcwNyAyNzEuMDAzIDIzNS42NCAyNzAuNjE1TDIzNC45MzQgMjY2LjU0OUMyMzQuODYzIDI2Ni4xMjkgMjM1LjYyNSAyNjUuNjAyIDIzOC4wMTIgMjYzLjI3M0MyMzguMjk0IDI2Mi45OTggMjM4LjQ5NCAyNjIuNjUgMjM4LjU4OSAyNjIuMjY4QzIzOC42ODMgMjYxLjg4NiAyMzguNjY4IDI2MS40ODQgMjM4LjU0NyAyNjEuMTFDMjM4LjQyNCAyNjAuNzM1IDIzOC4yMDEgMjYwLjQwMiAyMzcuOTAxIDI2MC4xNDdDMjM3LjU5OSAyNTkuODkzIDIzNy4yMzMgMjU5LjcyOSAyMzYuODQzIDI1OS42NzFaTTIzNi44NTcgMjYyLjA4NkMyMzQuMDQ4IDI2NC44MjUgMjMzLjA0NSAyNjUuMzY1IDIzMy4zMDIgMjY2LjgyOUMyMzQuMDQ0IDI3MS4xNTkgMjM0LjEzMSAyNzEuMTAxIDIzMy44MTcgMjcxLjMzMUMyMzMuNTM0IDI3MS41MjkgMjMzLjUyNiAyNzEuNDgyIDIzMS40NTEgMjcwLjM1QzIyOS41MTIgMjY5LjI5MiAyMjguNzg4IDI2OC44OTQgMjI3LjczNCAyNjkuNDQ4TDIyNC4wODggMjcxLjM2NkMyMjQuMDEzIDI3MS40MDggMjIzLjkyNyAyNzEuNDI2IDIyMy44NDMgMjcxLjQyMUMyMjMuNzU3IDI3MS40MTQgMjIzLjY3NCAyNzEuMzg0IDIyMy42MDYgMjcxLjMzNUMyMjMuNTM2IDI3MS4yODUgMjIzLjQ4MSAyNzEuMjE1IDIyMy40NSAyNzEuMTM2QzIyMy40MTggMjcxLjA1NiAyMjMuNDEgMjcwLjk3IDIyMy40MjUgMjcwLjg4NUMyMjQuMDg4IDI2Ny4wMDEgMjI0LjU3MiAyNjUuOTkgMjIzLjUxNSAyNjQuOTU5QzIyMC4zNjYgMjYxLjg4NyAyMjAuMzM0IDI2MS45OTIgMjIwLjQ1NCAyNjEuNjJDMjIwLjU3MyAyNjEuMjQ5IDIyMC43NDcgMjYxLjMwNyAyMjIuOTI1IDI2MS4wMjdDMjI1LjEzIDI2MC43NCAyMjUuOTU0IDI2MC42MzQgMjI2LjQ4MSAyNTkuNTYzTDIyOC4zMDQgMjU1Ljg3MUMyMjguMzM5IDI1NS44IDIyOC4zOTMgMjU1LjczNyAyMjguNDYgMjU1LjY5NEMyMjguNTI4IDI1NS42NDkgMjI4LjYwNSAyNTUuNjIzIDIyOC42ODUgMjU1LjYxOUMyMjguNzY2IDI1NS42MTQgMjI4Ljg0NiAyNTUuNjMxIDIyOC45MTcgMjU1LjY2OUMyMjguOTkgMjU1LjcwNSAyMjkuMDUgMjU1Ljc2IDIyOS4wOTMgMjU1LjgyOEMyMzEuMDEgMjU5Ljc4NSAyMzEuMTc2IDI2MC41MjMgMjMyLjUyNiAyNjAuNzJDMjM2Ljg3OCAyNjEuMzUzIDIzNi44NDUgMjYxLjI1MSAyMzYuOTY0IDI2MS42MkMyMzYuOTkzIDI2MS43IDIzNi45OTggMjYxLjc4NiAyMzYuOTc5IDI2MS44NjlDMjM2Ljk1OSAyNjEuOTUyIDIzNi45MTggMjYyLjAyOCAyMzYuODU3IDI2Mi4wODZaIiBmaWxsPSIjMTkxOTE5Ii8+CjxwYXRoIGQ9Ik0yMjUuNzI5IDI2NC40NjZDMjI1LjM4OCAyNjQuNDExIDIyNC45MDEgMjY0LjU0NCAyMjQuNzU4IDI2My45NjlDMjI0LjY0NyAyNjMuNTEzIDIyNC45MzkgMjYzLjMwNiAyMjUuMzA3IDI2My4xNUMyMjYuODEyIDI2Mi41NDMgMjI3LjcxNiAyNjAuNjc4IDIyOC4xNTkgMjYwLjgyOUMyMjkuMTkzIDI2MS4yMiAyMjcuOTYgMjY0LjM3IDIyNS43MjkgMjY0LjQ2NloiIGZpbGw9IiMxOTE5MTkiLz4KPHBhdGggZD0iTTI0OS41NDggMjY5LjU3OEMyNTAuMzQ3IDI2OS41NzggMjUwLjk5NSAyNzAuMjI2IDI1MC45OTUgMjcxLjAyNUMyNTAuOTk1IDI3MS44MjQgMjUwLjM0NyAyNzIuNDcxIDI0OS41NDggMjcyLjQ3MUMyNDguNzQ5IDI3Mi40NzEgMjQ4LjEwMiAyNzEuODI0IDI0OC4xMDIgMjcxLjAyNUMyNDguMTAyIDI3MC4yMjYgMjQ4Ljc0OSAyNjkuNTc4IDI0OS41NDggMjY5LjU3OFoiIHN0cm9rZT0iIzE5MTkxOSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPHBhdGggZD0iTTI1OC4yMjggMjY5LjU3OEMyNTkuMDI3IDI2OS41NzggMjU5LjY3NSAyNzAuMjI2IDI1OS42NzUgMjcxLjAyNUMyNTkuNjc1IDI3MS44MjQgMjU5LjAyNyAyNzIuNDcyIDI1OC4yMjggMjcyLjQ3MkMyNTcuNDI5IDI3Mi40NzIgMjU2Ljc4MSAyNzEuODI0IDI1Ni43ODEgMjcxLjAyNUMyNTYuNzgxIDI3MC4yMjYgMjU3LjQyOSAyNjkuNTc4IDI1OC4yMjggMjY5LjU3OFoiIHN0cm9rZT0iIzE5MTkxOSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPHBhdGggZD0iTTI1Mi45MjUgMjYwLjg5OEgyNTAuMDMxIiBzdHJva2U9IiMxOTE5MTkiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTI0NC4yNDIgMjU1LjEwOUwyNDQuNDk4IDI1NS4xOTVDMjQ1Ljc3MSAyNTUuNjE5IDI0Ni40MDcgMjU1LjgzMSAyNDYuNzcxIDI1Ni4zMzdDMjQ3LjEzNiAyNTYuODQyIDI0Ny4xMzYgMjU3LjUxMyAyNDcuMTM2IDI1OC44NTZWMjYxLjM4QzI0Ny4xMzYgMjY0LjEwOSAyNDcuMTM2IDI2NS40NzQgMjQ3Ljk4MyAyNjYuMzIxQzI0OC44MyAyNjcuMTY5IDI1MC4xOTQgMjY3LjE2OSAyNTIuOTIyIDI2Ny4xNjlIMjU0Ljg1MU0yNjAuNjM4IDI2Ny4xNjlIMjU4LjcwOSIgc3Ryb2tlPSIjMTkxOTE5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNDcuMTMzIDI1OC4wMDRIMjUwLjAyNk0yNDcuNjE1IDI2NC43NTdIMjU3Ljc2M0MyNTguNjg4IDI2NC43NTcgMjU5LjE1MSAyNjQuNzU3IDI1OS41MTMgMjY0LjUxOEMyNTkuODc2IDI2NC4yNzkgMjYwLjA1OCAyNjMuODU0IDI2MC40MjIgMjYzLjAwM0wyNjAuODM2IDI2Mi4wMzhDMjYxLjYxNiAyNjAuMjE2IDI2Mi4wMDcgMjU5LjMwNSAyNjEuNTc4IDI1OC42NTRDMjYxLjE0OSAyNTguMDA0IDI2MC4xNTggMjU4LjAwNCAyNTguMTc2IDI1OC4wMDRIMjUzLjg4NCIgc3Ryb2tlPSIjMTkxOTE5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTkxLjg2IDEzMS43NzlDMjUxLjUxNiAxMzEuNjcyIDMxNy45NzEgMTMyLjAxNiAzMjIuNjUxIDEzMy42NzhDMzI2LjMwMiAxMzQuOTc0IDMyNi4yODkgMTM2LjExNSAzMjYuMTM2IDE0OC41NTJDMzI2LjA4MyAxNTIuNzk3IDMyNi4wMTUgMTU4LjM2IDMyNi4wNzIgMTY1LjY5NEMzMjYuMDczIDE2NS45MDcgMzI2LjA3NyAxNjYuMzExIDMyNi4wODIgMTY2Ljg3N0MzMjYuMTQ4IDE3NC4zMDkgMzI2LjQ2NiAyMDkuNzk4IDMyNi4xNSAyMTEuNDEzQzMyNS43NzIgMjEzLjk4NyAzMjQuNTQ5IDIxNi4zNjMgMzIyLjY3MSAyMTguMTYzQzMyMC43OTMgMjE5Ljk2NSAzMTguMzcxIDIyMS4wODkgMzE1Ljc4NCAyMjEuMzU5QzI5OC4yOTkgMjIyLjg4NiAyMzUuODUzIDIyMS4zMTMgMjM1Ljg3IDIyMS4yNjhDMjM2LjA1NCAyMjAuNzg5IDIxMy41ODQgMjIwLjg1NCAxODYuNTU0IDIyMS4wNTlDMTgzLjgzNyAyMjIuOTcxIDE4MC45NzQgMjI0LjY1NSAxNzguMDA2IDIyNi4wOTJDMjIzLjk5OSAyMjYuMzc5IDI3Mi44MTkgMjI2LjM3NyAzMDguMzczIDIyNS43MTFDMzA4Ljg0MyAyMjUuNzAzIDMwOS4zOTQgMjI1LjcxMyAzMTAuMDA3IDIyNS43MjNDMzE1LjI0MiAyMjUuODE1IDMyNS4wODcgMjI1Ljk5IDMyOS44MTUgMjE1LjQ3QzMzMS4yOTUgMjEyLjE4MSAzMzEuMzc4IDIxMS4xNzYgMzMxLjI4NyAxODUuMTExQzMzMS4yNyAxNzkuNzczIDMzMS4wNDMgMTQzLjU3IDMzMC45MjkgMTM4LjIzMUMzMzAuOTU1IDEzNi45NjUgMzMwLjcyNSAxMzUuNzA3IDMzMC4yNTQgMTM0LjUzM0MzMjkuNzg0IDEzMy4zNTggMzI5LjA4MSAxMzIuMjkgMzI4LjE4OCAxMzEuMzkyQzMyNy4yOTYgMTMwLjQ5NSAzMjYuMjMyIDEyOS43ODcgMzI1LjA2MSAxMjkuMzFDMzIzLjg4NyAxMjguODMzIDMyMi42MzEgMTI4LjU5NyAzMjEuMzY3IDEyOC42MTZMMzIxLjI0NCAxMjguNjE1QzMxNy45MTUgMTI4LjU4IDI0Ny43OTIgMTI3Ljg1NCAxODYuMTg3IDEyNy42NTZDMTg4LjE3MSAxMjguOTEgMTkwLjA2NSAxMzAuMjg4IDE5MS44NiAxMzEuNzc5Wk0xMjQuMzMxIDEyNy43MjJDMTEwLjgxNiAxMjcuODM1IDEwMC42ODggMTI4LjAzOSA5Ni4wNDgyIDEyOC4zNjdDODguMjY3NiAxMjguOTE3IDgwLjkzMTIgMTM0Ljk0MiA4MS4wMzIzIDE0OC4xMDZDODEuMDMyMyAxNDguMTQ2IDgxLjA5MzYgMjA0Ljc0NyA4MS4zNjM3IDIxNS42NTVDODEuMzQwMiAyMTYuODk4IDgxLjU2NDcgMjE4LjEzNSA4Mi4wMjQxIDIxOS4yOTFDODIuNDgzNyAyMjAuNDQ2IDgzLjE2ODkgMjIxLjQ5OSA4NC4wMzk4IDIyMi4zODZDODQuOTEwNiAyMjMuMjc0IDg1Ljk0OTcgMjIzLjk3OSA4Ny4wOTYyIDIyNC40NTlDODguMjQyOCAyMjQuOTQyIDg5LjQ3MzYgMjI1LjE4OSA5MC43MTcgMjI1LjE4OUM5OC41NDEyIDIyNS4zMDUgMTA3LjExMyAyMjUuNDIxIDExNi4yMzcgMjI1LjUzQzExNi41MjQgMjI0LjM2NSAxMTcuMDI0IDIyMy4wNjIgMTE3LjU4IDIyMS42NEMxMDguNDIgMjIxLjY5OCAxMDEuMzMyIDIyMS43MTggOTcuNzYxOCAyMjEuNjY0Qzk0Ljk3NTIgMjIxLjU5MiA5Mi4yMTg4IDIyMS4wNjggODkuNiAyMjAuMTEzQzg1Ljg2MDYgMjE4Ljc5OCA4NS44Nzk0IDIxNy43OTIgODYuMTUxNCAyMDMuMjc0Qzg2LjM0MTEgMTkzLjE0MSA4Ni42NTQyIDE3Ni40MzEgODUuODk5NSAxNDguNDQ0Qzg1LjcyNTUgMTQ2LjQyMSA4NS43OTIzIDE0NC4zODUgODYuMDk4NCAxNDIuMzc4Qzg2LjQ4NzEgMTM5Ljc4MiA4Ny43MzkzIDEzNy4zOTMgODkuNjUyNyAxMzUuNTk3QzkxLjU2NiAxMzMuODAxIDk0LjAyODggMTMyLjcwMiA5Ni42NDMyIDEzMi40NzhDOTcuNDk3NCAxMzIuMzg3IDEwNS41ODYgMTMyLjI2NyAxMTguMjM5IDEzMi4xNTFDMTIwLjE3OCAxMzAuNTU2IDEyMi4yMTQgMTI5LjA3NSAxMjQuMzMxIDEyNy43MjJaIiBmaWxsPSIjMTkxOTE5Ii8+CjxwYXRoIGQ9Ik0yNTUuNjE3IDE0OC42NThDMjU1Ljc0OCAxNDYuMzU4IDI1NC44NzMgMTQ2LjgzNSAyMTcuMzgyIDE0Ni44MzVDMjE3LjM4MiAxNDYuODE1IDIxMC4yMDYgMTQ2Ljc0IDIwMi4zMzYgMTQ2LjcxMUwyMDQuMzAzIDE1MC41MTVDMjU1LjQ3OSAxNTAuNjUxIDI1NS40ODEgMTUxLjA0OCAyNTUuNjE3IDE0OC42NThaIiBmaWxsPSIjMTkxOTE5Ii8+CjxwYXRoIGQ9Ik0yMzIuOTU5IDE2OC4yMzNDMjMzLjAzOSAxNjYuMjE4IDIzMy4wMzYgMTY2LjE5MiAyMDkuMTcyIDE2Ni4yNDhMMjA5LjY5MSAxNzAuMTk1QzIzMi44NzcgMTcwLjMzMiAyMzIuODggMTcwLjIzOCAyMzIuOTU5IDE2OC4yNVYxNjguMjMzWiIgZmlsbD0iIzE5MTkxOSIvPgo8cGF0aCBkPSJNMzAyLjA4NCAxNDcuMjIyQzMwNC41ODMgMTQ3LjQ5MiAzMDQuNDM3IDE1MC4xMDYgMzAyLjE3OCAxNTAuNDExQzMwMC44NTIgMTUwLjU5IDI2My42OTUgMTUwLjY2NSAyNjIuMjkxIDE1MC4zOEMyNjAuMDc0IDE0OS45MyAyNTkuNDkyIDE0Ny4yNjYgMjYyLjQ3MyAxNDYuOTg2QzI2NS4wMjUgMTQ2Ljc0NiAzMDIuMDQ0IDE0Ny4yMTggMzAyLjA4NCAxNDcuMjIyWiIgZmlsbD0iIzE5MTkxOSIvPgo8cGF0aCBkPSJNMjcwLjAzMSAxODkuMzUyQzI3My4zMjUgMTk2LjAyMSAyNzEuNDgxIDE5NC42OSAyNzguODQyIDE5NS43NTlDMjc5LjE0NyAxOTUuODAyIDI3OS40MzUgMTk1LjkzMiAyNzkuNjcyIDE5Ni4xMjlDMjc5LjkwOCAxOTYuMzI4IDI4MC4wODMgMTk2LjU5IDI4MC4xNzkgMTk2Ljg4M0MyODAuMjc0IDE5Ny4xNzYgMjgwLjI4NSAxOTcuNDkxIDI4MC4yMDkgMTk3Ljc5MkMyODAuMTM1IDE5OC4wOSAyNzkuOTc3IDE5OC4zNjMgMjc5Ljc1NSAxOTguNTc3QzI3NC40MjkgMjAzLjc3MSAyNzUuMTMzIDIwMS42MTMgMjc2LjM4OCAyMDguOTQ2QzI3Ni40MzkgMjA5LjI1IDI3Ni40MDYgMjA5LjU2MSAyNzYuMjkgMjA5Ljg0N0MyNzYuMTc0IDIxMC4xMyAyNzUuOTgyIDIxMC4zNzcgMjc1LjczMyAyMTAuNTU4QzI3NS40ODQgMjEwLjczOCAyNzUuMTg5IDIxMC44NDYgMjc0Ljg4MyAyMTAuODY5QzI3NC41NzYgMjEwLjg5MSAyNzQuMjcgMjEwLjgyNiAyNzMuOTk4IDIxMC42ODRDMjY3LjQxNiAyMDcuMjE5IDI2OS42ODkgMjA3LjIyNCAyNjMuMTAyIDIxMC42ODRDMjYyLjgzIDIxMC44MjggMjYyLjUyMyAyMTAuODkzIDI2Mi4yMTcgMjEwLjg3MUMyNjEuOTA5IDIxMC44NDggMjYxLjYxNSAyMTAuNzQgMjYxLjM2NyAyMTAuNTU5QzI2MS4xMTYgMjEwLjM3OSAyNjAuOTI0IDIxMC4xMzIgMjYwLjgwOCAyMDkuODQ3QzI2MC42OTIgMjA5LjU2MSAyNjAuNjU5IDIwOS4yNSAyNjAuNzEyIDIwOC45NDZDMjYxLjk3NSAyMDEuNjE0IDI2Mi42NjggMjAzLjc3MSAyNTcuMzQ1IDE5OC41NzdDMjU3LjEyNiAxOTguMzYyIDI1Ni45NzIgMTk4LjA5IDI1Ni44OTkgMTk3Ljc5QzI1Ni44MjYgMTk3LjQ5MSAyNTYuODM4IDE5Ny4xOCAyNTYuOTMyIDE5Ni44ODZDMjU3LjAyNiAxOTYuNTk1IDI1Ny4yMDIgMTk2LjMzNCAyNTcuNDM2IDE5Ni4xMzVDMjU3LjY2OSAxOTUuOTM2IDI1Ny45NTUgMTk1LjgwNiAyNTguMjU4IDE5NS43NTlDMjY1LjYxNyAxOTQuNjgyIDI2My43ODEgMTk2LjAyMSAyNjcuMDc2IDE4OS4zNTJDMjY3LjIxMiAxODkuMDc3IDI2Ny40MjIgMTg4Ljg0NSAyNjcuNjg0IDE4OC42ODJDMjY3Ljk0NCAxODguNTIgMjY4LjI0NiAxODguNDM0IDI2OC41NTIgMTg4LjQzNEMyNjguODYxIDE4OC40MzQgMjY5LjE2MiAxODguNTIgMjY5LjQyMiAxODguNjgyQzI2OS42ODQgMTg4Ljg0NSAyNjkuODk1IDE4OS4wNzcgMjcwLjAzMSAxODkuMzUyWiIgZmlsbD0iIzAxNjdGRiIvPgo8cGF0aCBkPSJNMjk4Ljc0OCAxODkuMzVDMzAyLjA0MiAxOTYuMDE5IDMwMC4xOTggMTk0LjY4OCAzMDcuNTU5IDE5NS43NTdDMzA3Ljg2NiAxOTUuOCAzMDguMTUyIDE5NS45MjggMzA4LjM4OSAxOTYuMTI3QzMwOC42MjUgMTk2LjMyNSAzMDguOCAxOTYuNTg2IDMwOC44OTYgMTk2Ljg4MUMzMDguOTkxIDE5Ny4xNzQgMzA5LjAwMiAxOTcuNDg5IDMwOC45MjggMTk3Ljc4OUMzMDguODUyIDE5OC4wODggMzA4LjY5NCAxOTguMzYxIDMwOC40NzIgMTk4LjU3NUMzMDMuMTQ4IDIwMy43NjkgMzAzLjg1IDIwMS42MSAzMDUuMTA2IDIwOC45NDRDMzA1LjE1OCAyMDkuMjQ4IDMwNS4xMjUgMjA5LjU1OSAzMDUuMDA5IDIwOS44NDNDMzA0Ljg5MyAyMTAuMTI4IDMwNC43IDIxMC4zNzUgMzA0LjQ1MiAyMTAuNTU1QzMwNC4yMDMgMjEwLjczNiAzMDMuOTA4IDIxMC44NDQgMzAzLjYwMiAyMTAuODY1QzMwMy4yOTUgMjEwLjg4OSAzMDIuOTg4IDIxMC44MjQgMzAyLjcxNyAyMTAuNjgxQzI5Ni4xMzMgMjA3LjIxNyAyOTguNDA4IDIwNy4yMjIgMjkxLjgxOSAyMTAuNjgxQzI5MS41NDcgMjEwLjgyNiAyOTEuMjQxIDIxMC44OSAyOTAuOTM0IDIxMC44NjdDMjkwLjYyNiAyMTAuODQ2IDI5MC4zMzIgMjEwLjczOCAyOTAuMDg0IDIxMC41NTdDMjg5LjgzNCAyMTAuMzc2IDI4OS42NDEgMjEwLjEyOSAyODkuNTI1IDIwOS44NDRDMjg5LjQwOSAyMDkuNTU5IDI4OS4zNzYgMjA5LjI0OCAyODkuNDI5IDIwOC45NDRDMjkwLjY5NCAyMDEuNjEyIDI5MS4zODYgMjAzLjc2OSAyODYuMDYzIDE5OC41NzVDMjg1Ljg0NSAxOTguMzYgMjg1LjY5MSAxOTguMDg2IDI4NS42MTggMTk3Ljc4OEMyODUuNTQ1IDE5Ny40ODkgMjg1LjU1NiAxOTcuMTc4IDI4NS42NTEgMTk2Ljg4NEMyODUuNzQ1IDE5Ni41OTIgMjg1LjkxOSAxOTYuMzMyIDI4Ni4xNTMgMTk2LjEzM0MyODYuMzg3IDE5NS45MzQgMjg2LjY3MiAxOTUuODAzIDI4Ni45NzUgMTk1Ljc1N0MyOTQuMzM2IDE5NC42NzkgMjkyLjUgMTk2LjAxOSAyOTUuNzk1IDE4OS4zNUMyOTUuOTMgMTg5LjA3MyAyOTYuMTQxIDE4OC44NDEgMjk2LjQwMSAxODguNjc4QzI5Ni42NjMgMTg4LjUxNiAyOTYuOTY1IDE4OC40MyAyOTcuMjcxIDE4OC40M0MyOTcuNTc5IDE4OC40MyAyOTcuODc5IDE4OC41MTYgMjk4LjE0MSAxODguNjc4QzI5OC40MDEgMTg4Ljg0MSAyOTguNjEyIDE4OS4wNzMgMjk4Ljc0OCAxODkuMzVaIiBmaWxsPSIjMDE2N0ZGIi8+CjxwYXRoIGQ9Ik0yNDEuMzEgMTg5LjM1QzI0NC42MDUgMTk2LjAxOSAyNDIuNzYgMTk0LjY4OCAyNTAuMTIzIDE5NS43NTdDMjUwLjQyOCAxOTUuOCAyNTAuNzE2IDE5NS45MjkgMjUwLjk1MiAxOTYuMTI3QzI1MS4xODkgMTk2LjMyNSAyNTEuMzY0IDE5Ni41ODcgMjUxLjQ1OSAxOTYuODgxQzI1MS41NTMgMTk3LjE3NCAyNTEuNTY1IDE5Ny40ODkgMjUxLjQ5IDE5Ny43ODlDMjUxLjQxNCAxOTguMDg4IDI1MS4yNTcgMTk4LjM2MSAyNTEuMDM1IDE5OC41NzVDMjQ1LjcxIDIwMy43NjkgMjQ2LjQxNCAyMDEuNjEgMjQ3LjY2OSAyMDguOTQ0QzI0Ny43MiAyMDkuMjQ4IDI0Ny42ODcgMjA5LjU1OSAyNDcuNTcxIDIwOS44NDNDMjQ3LjQ1NSAyMTAuMTI4IDI0Ny4yNjMgMjEwLjM3NSAyNDcuMDE0IDIxMC41NTVDMjQ2Ljc2NiAyMTAuNzM2IDI0Ni40NzEgMjEwLjg0NCAyNDYuMTY0IDIxMC44NjVDMjQ1Ljg1OCAyMTAuODg5IDI0NS41NTEgMjEwLjgyNCAyNDUuMjc5IDIxMC42ODFDMjM4LjY5NyAyMDcuMjE3IDI0MC45NyAyMDcuMjIyIDIzNC4zODEgMjEwLjY4MUMyMzQuMTEgMjEwLjgyNiAyMzMuODAzIDIxMC44OSAyMzMuNDk2IDIxMC44NjdDMjMzLjE4OCAyMTAuODQ2IDIzMi44OTUgMjEwLjczOCAyMzIuNjQ2IDIxMC41NTdDMjMyLjM5NiAyMTAuMzc2IDIzMi4yMDQgMjEwLjEyOSAyMzIuMDg4IDIwOS44NDRDMjMxLjk3MiAyMDkuNTU5IDIzMS45MzkgMjA5LjI0OCAyMzEuOTkyIDIwOC45NDRDMjMzLjI1NiAyMDEuNjEyIDIzMy45NDkgMjAzLjc2OSAyMjguNjI2IDE5OC41NzVDMjI4LjQwNyAxOTguMzYgMjI4LjI1MyAxOTguMDg2IDIyOC4xOCAxOTcuNzg4QzIyOC4xMDcgMTk3LjQ4OSAyMjguMTE5IDE5Ny4xNzYgMjI4LjIxMyAxOTYuODg0QzIyOC4zMDkgMTk2LjU5MiAyMjguNDgzIDE5Ni4zMzIgMjI4LjcxNyAxOTYuMTMzQzIyOC45NTEgMTk1LjkzNCAyMjkuMjM2IDE5NS44MDMgMjI5LjUzOSAxOTUuNzU3QzIzNi44OTkgMTk0LjY3OSAyMzUuMDYyIDE5Ni4wMTkgMjM4LjM1NyAxODkuMzVDMjM4LjQ5MyAxODkuMDczIDIzOC43MDMgMTg4Ljg0MSAyMzguOTY0IDE4OC42NzhDMjM5LjIyNSAxODguNTE2IDIzOS41MjcgMTg4LjQzIDIzOS44MzQgMTg4LjQzQzI0MC4xNDIgMTg4LjQzIDI0MC40NDIgMTg4LjUxNiAyNDAuNzA0IDE4OC42NzhDMjQwLjk2NCAxODguODQxIDI0MS4xNzQgMTg5LjA3MyAyNDEuMzEgMTg5LjM1WiIgZmlsbD0iIzAxNjdGRiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwMy45MDggMjAyLjYxOEMyMDMuOTY4IDIwMi43MzEgMjA0LjAxNiAyMDIuODQyIDIwNC4wNTQgMjAyLjk1OEMyMDQuMzg3IDIwMy45ODQgMjAzLjg5OCAyMDUuMjc5IDIwMy4yNjcgMjA4Ljk0NEMyMDMuMjE0IDIwOS4yNDggMjAzLjI0NyAyMDkuNTU5IDIwMy4zNjMgMjA5Ljg0NEMyMDMuNDc5IDIxMC4xMjkgMjAzLjY3MSAyMTAuMzc2IDIwMy45MjEgMjEwLjU1N0MyMDQuMTcgMjEwLjczOCAyMDQuNDYzIDIxMC44NDYgMjA0Ljc3MiAyMTAuODY3QzIwNS4wNzggMjEwLjg5IDIwNS4zODUgMjEwLjgyNiAyMDUuNjU2IDIxMC42ODFDMjA4Ljk1MyAyMDguOTUxIDIxMC4wMyAyMDguMDg1IDIxMS4xMDkgMjA4LjA4NUMyMTIuMTg2IDIwOC4wODUgMjEzLjI2MyAyMDguOTQ5IDIxNi41NTQgMjEwLjY4MUMyMTYuODI2IDIxMC44MjQgMjE3LjEzMyAyMTAuODg5IDIxNy40MzkgMjEwLjg2NUMyMTcuNzQ2IDIxMC44NDQgMjE4LjA0MSAyMTAuNzM2IDIxOC4yODkgMjEwLjU1NUMyMTguNTM4IDIxMC4zNzUgMjE4LjczIDIxMC4xMjggMjE4Ljg0NiAyMDkuODQzQzIxOC45NjIgMjA5LjU1OSAyMTguOTk1IDIwOS4yNDggMjE4Ljk0NCAyMDguOTQ0QzIxOC4zMTYgMjA1LjI3NyAyMTcuODI1IDIwMy45ODMgMjE4LjE1OCAyMDIuOTU2QzIxOC40OTIgMjAxLjkzIDIxOS42NDggMjAxLjE3MSAyMjIuMzEgMTk4LjU3NUMyMjIuNTMyIDE5OC4zNjEgMjIyLjY4OSAxOTguMDg4IDIyMi43NjQgMTk3Ljc4OUMyMjIuODQgMTk3LjQ4OSAyMjIuODI4IDE5Ny4xNzQgMjIyLjczNCAxOTYuODgxQzIyMi42MzggMTk2LjU4NiAyMjIuNDYyIDE5Ni4zMjUgMjIyLjIyNyAxOTYuMTI3QzIyMS45OSAxOTUuOTI4IDIyMS43MDIgMTk1LjggMjIxLjM5NyAxOTUuNzU3QzIxNy43MTggMTk1LjIyMyAyMTYuMzM3IDE5NS4yODggMjE1LjQ2NyAxOTQuNjU0QzIxNC41OTUgMTk0LjAyIDIxNC4yMzIgMTkyLjY4NSAyMTIuNTg1IDE4OS4zNUMyMTIuNDQ5IDE4OS4wNzMgMjEyLjIzOSAxODguODQxIDIxMS45NzkgMTg4LjY3OEMyMTEuNzE3IDE4OC41MTYgMjExLjQxNSAxODguNDMgMjExLjEwOSAxODguNDNDMjEwLjggMTg4LjQzIDIxMC41IDE4OC41MTYgMjEwLjIzOSAxODguNjc4QzIwOS45NzggMTg4Ljg0MSAyMDkuNzY4IDE4OS4wNzMgMjA5LjYzMiAxODkuMzVDMjA5LjQ0OCAxODkuNzIzIDIwOS4yODEgMTkwLjA2OSAyMDkuMTI1IDE5MC4zOTRDMjA3Ljg1MSAxOTQuNzQxIDIwNi4wODQgMTk4LjgyOSAyMDMuOTA4IDIwMi42MThaIiBmaWxsPSIjMDE2N0ZGIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTY5LjA5MyAxMjAuNjEzQzEyMi42MyAxMDguNjE5IDc2LjM2MDUgMTYxLjMxOSAxMDUuMTYxIDIwNi44NTZDMTA5LjU4MyAyMTMuODQ3IDExMy4zNTEgMjE2LjkxOCAxMTUuNTkxIDIxOC43NDRDMTE3LjI4NSAyMjAuMTI0IDExOC4xMDQgMjIwLjc5MyAxMTcuNjcxIDIyMS45MDVDMTE2LjE3OSAyMjUuNzI2IDExNS4wMjggMjI4LjcwMiAxMTcuMTM2IDIzMC40ODlDMTE3LjQwNSAyMzAuNzE3IDExNy42MSAyMzAuODgyIDExNy43MTQgMjMxLjA5N0MxMTguMjExIDIzMi4xMjIgMTE2LjM3IDIzNC4yODIgMTA4LjAyMSAyNTAuMDhDMTA1LjUzNSAyNTQuNzc2IDg4LjIzODkgMjg3LjU0NSA4NS45NjE5IDI5Mi43NzhDODQuNTg4IDI5NS45NDEgOTEuNjIyOSAzMDMuMTQyIDk5LjM1MDQgMzAwLjk2MUMxMDEuOTc3IDMwMC4yMiAxMzAuOTIyIDI0Mi4zNzYgMTMyLjA1MiAyMzkuODkxQzEzMi41NDUgMjM4LjgwOSAxMzMuMjU1IDIzOC45NTEgMTM0LjE2OSAyMzkuMTM3QzEzNS4zNzkgMjM5LjM4MSAxMzYuOTQ3IDIzOS42OTkgMTM4Ljg0NyAyMzcuMzQ1QzE0MC4xMDcgMjM1Ljc4NSAxNDAuNzA5IDIzNC41MTIgMTQxLjE1NCAyMzMuNTdDMTQxLjg2MiAyMzIuMDcyIDE0Mi4xNzYgMjMxLjQwNyAxNDQuMTE4IDIzMS43NDRDMTc1LjkyNSAyMzcuMjY1IDIxMS42NDEgMjExLjk1MyAyMTEuNDQ2IDE3My43MzFDMjExLjM5NiAxNjQuNjE4IDIwOS4wNTMgMTU1LjY2NCAyMDQuNjMzIDE0Ny42OTZDMjAwLjIxMSAxMzkuNzI3IDE5My44NTYgMTMzLjAwMSAxODYuMTUyIDEyOC4xMzdDMTg1LjQwMSAxMjcuNjU2IDE4NC42NDcgMTI3LjE5NiAxODMuODkyIDEyNi43NTVDMTgyLjkzOSAxMjcuNDI3IDE4MS45MDEgMTI4LjE3MyAxODAuODEzIDEyOC45NThDMTkxLjc2NiAxMzQuNzk0IDIwMC43OCAxNDQuNjg0IDIwNS4zMDkgMTU4LjYxM0MyMTYuNTE1IDE5My4wOTMgMTkwLjE3MiAyMjcuNjU2IDE1NS4wMTMgMjI5LjA5OEgxNTUuMDE4QzExNC44NjQgMjMwLjc0NiA4OC4xNDExIDE5MC45NiAxMDQuNjYyIDE1NC44NzlDMTE2LjU5NiAxMjguODEyIDE0NC4xMzQgMTE4LjU5NiAxNjcuODQ4IDEyNC4xMTNDMTY4LjMyMiAxMjIuODIyIDE2OC43MzUgMTIxLjY2NCAxNjkuMDkzIDEyMC42MTNaTTEwNi4yNzkgMjc4LjIyQzEwNy4xNjcgMjc2LjUwOSAxMDguMjA5IDI3NC40OTcgMTA5LjQ0NiAyNzIuMTIzQzEwOS43OTcgMjcxLjQ0OCAxMTAuMTI3IDI3MC44MTggMTEwLjQzNSAyNzAuMjI2QzExNC4zMjIgMjYyLjc4MSAxMTQuODYzIDI2MS43NDcgMTEzLjY3OSAyNjEuMTZDMTEyLjUwNiAyNjAuNTggMTA5LjUyNiAyNjYuNDIzIDEwNi4wMyAyNzMuMjhDMTAzLjA5NiAyNzkuMDM0IDk5Ljc5NzUgMjg1LjUwMiA5Ni44OTk0IDI4OS40ODFDOTYuMDU4NiAyOTAuNjM2IDk1LjA2NzEgMjkwLjcxOSA5NC4zNTMzIDI5MC43NzdDOTMuNzY2IDI5MC44MjUgOTMuMzY2OCAyOTAuODU4IDkzLjM5NDQgMjkxLjQ2MkM5My40MzcyIDI5Mi4zODQgOTQuODA4IDI5Mi41NDYgOTYuMDgzNCAyOTIuNjk1TDk2LjExNTYgMjkyLjY5OUM5Ny4xNjE2IDI5Mi45MTkgOTcuNjU4MSAyOTIuMTczIDk4LjMzMzEgMjkxLjE1OEM5OC43MTU5IDI5MC41ODMgOTkuMTU2IDI4OS45MjIgOTkuNzg2MyAyODkuMzAyQzEwMS4zMTcgMjg3Ljc5NSAxMDEuOTUzIDI4Ni41NjggMTA2LjI3OSAyNzguMjJaTTEyMC43MzggMjQ5LjY5QzEyMS43NTIgMjQ3LjU4OCAxMjIuOTY2IDI0NS4wNjggMTI0LjQzMSAyNDIuMDU1QzEyNi4yNjggMjM4LjI2NyAxMjQuNDkgMjM2LjkwNCAxMTQuNTQgMjU3LjEzM0MxMTQuNDU5IDI1Ny4yOTkgMTE0LjM0NyAyNTcuNDczIDExNC4yMzIgMjU3LjY1MUMxMTMuNzg4IDI1OC4zNDIgMTEzLjMwMyAyNTkuMDk4IDExNC4zODggMjU5LjY0N0MxMTUuNjM2IDI2MC4yNzcgMTE1LjY3OSAyNjAuMTg5IDEyMC43MzggMjQ5LjY5Wk0xMzcuNTU2IDIzMy4wOUMxMzcuNzAxIDIzMi44MzYgMTM3Ljg1NCAyMzIuNTY5IDEzOC4wMiAyMzIuMjg5SDEzOC4wMTVDMTM4LjkzNyAyMzAuNzI2IDEzOC4yNjMgMjMwLjUzNSAxMzUuOTA5IDIyOS44NjlDMTMzLjQyNCAyMjkuMTY2IDEyOS4wNjkgMjI3LjkzMiAxMjIuNzQ0IDIyMy45OTlDMTIxLjQ3OSAyMjMuMjE1IDEyMC44NTIgMjIyLjgxMyAxMjAuNDE5IDIyMi45NjZDMTE5Ljk4OCAyMjMuMTE4IDExOS43NDkgMjIzLjgyIDExOS4yNjMgMjI1LjI0QzExOC40MjggMjI3LjY4NCAxMTguNzc2IDIyOC43OTggMTIxLjAwOCAyMzAuMDE1QzEzNC45NiAyMzcuNjIyIDEzNS4yOCAyMzcuMDYzIDEzNy41NTYgMjMzLjA5WiIgZmlsbD0iIzAxNjdGRiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE2NS43NjkgMTI5LjM2MkMxNTIuMzc4IDEyNi4zMjIgMTM3LjU4MyAxMjguODExIDEyNS4zNSAxMzcuNjVDOTIuNTYzNCAxNjEuMzU2IDEwMC44NzYgMjA5Ljg2IDEzNy40MDcgMjIxLjQzMUMxNzkuNTggMjM0Ljc4OSAyMTYuNjU4IDE5MS4yODEgMTk3LjU4NCAxNTMuODczQzE5Mi42MjMgMTQ0LjE0MyAxODQuNzYxIDEzNi45OCAxNzUuNTkxIDEzMi43MTRDMTc0LjczNCAxMzMuMzIyIDE3My44NzggMTMzLjkyNCAxNzMuMDM1IDEzNC41MDVDMTkzLjEyMyAxNDMuMzc4IDIwNi4yMTkgMTY2LjI2NCAxOTcuMDM0IDE5MC42OTNDMTgwLjY3NCAyMzQuMjAyIDExNi41MzggMjI5LjQ1NCAxMDguNjQ3IDE4NC41MzNDMTA3LjA5NCAxNzUuODI0IDEwOC4xNDIgMTY2Ljg1MSAxMTEuNjU5IDE1OC43MzRDMTE1LjE3NiAxNTAuNjE4IDEyMS4wMDcgMTQzLjcxOSAxMjguNDIyIDEzOC44OTlDMTQwLjM4OCAxMzAuOTExIDE1My4yMjUgMTI5LjEzNiAxNjQuNjc4IDEzMS43MzZDMTY1LjA0NiAxMzAuOTQ1IDE2NS40MTggMTMwLjE0NSAxNjUuNzY5IDEyOS4zNjJaIiBmaWxsPSIjMDE2N0ZGIi8+CjxwYXRoIGQ9Ik0xMzMuMTIxIDE1Mi4xMDNDMTI5Ljc5MSAxNTUuODYzIDEyNi4yNTIgMTU5LjQzMiAxMjIuNTE5IDE2Mi43OTJDMTIyLjM5IDE2Mi45MDggMTIyLjMwNyAxNjMuMDY3IDEyMi4yODYgMTYzLjI0QzEyMi4yNjYgMTYzLjQxMiAxMjIuMzA4IDE2My41ODYgMTIyLjQwNiAxNjMuNzNDMTI0LjYzNSAxNjYuOTkyIDEyNi4xNCAxNzAuNDk2IDEyNy43MzQgMTc0LjIwM0MxMjcuNzc1IDE3NC4yOTggMTI3LjgzNSAxNzQuMzgzIDEyNy45MTIgMTc0LjQ1MkMxMjcuOTg5IDE3NC41MjIgMTI4LjA4IDE3NC41NzMgMTI4LjE3OCAxNzQuNjA0QzEyOC4yNzcgMTc0LjYzNSAxMjguMzgxIDE3NC42NDQgMTI4LjQ4MyAxNzQuNjMxQzEyOC41ODUgMTc0LjYxOCAxMjguNjg0IDE3NC41ODMgMTI4Ljc3MiAxNzQuNTI5QzEzMS43MzEgMTcyLjY4NCAxMzQuODcxIDE3MC45ODggMTM3Ljg4IDE2OS4xNjdDMTM4LjE4OSAxNzguMjIgMTM3Ljg1MyAxODcuODk1IDEzNi44MDIgMjAwLjMxM0MxMzYuNzg4IDIwMC40OSAxMzYuODM5IDIwMC42NjYgMTM2Ljk0NyAyMDAuODA4QzEzNy4wNTUgMjAwLjk0OSAxMzcuMjExIDIwMS4wNDUgMTM3LjM4NiAyMDEuMDc4QzE0OS42NjUgMjAzLjM3MiAxNjEuNTc4IDIwMy4wOTQgMTczLjgwMyAyMDAuMjEyQzE3My45NTkgMjAwLjE3NiAxNzQuMDk3IDIwMC4wODggMTc0LjE5NyAxOTkuOTYzQzE3NC4yOTggMTk5LjgzOSAxNzQuMzUzIDE5OS42ODUgMTc0LjM1NiAxOTkuNTI1QzE3NC40NjggMTkyLjMyNSAxNzMuNjMzIDE3OC44NzYgMTcxLjc5NyAxNzAuMTMxQzE3My42MzcgMTcxLjg1NSAxNzUuNzg1IDE3My41NTEgMTc4LjIwNyAxNzUuMTkxQzE3OC4zNSAxNzUuMjg4IDE3OC41MjIgMTc1LjMzIDE3OC42OTMgMTc1LjMxQzE3OC44NjQgMTc1LjI5IDE3OS4wMjIgMTc1LjIwOSAxNzkuMTM4IDE3NS4wODJDMTgxLjk0IDE3Mi4wMjQgMTg0LjkyNSAxNjkuMTA3IDE4Ny43NCAxNjYuMDM0QzE4Ny44NDMgMTY1LjkyMiAxODcuOTA3IDE2NS43OCAxODcuOTI0IDE2NS42MjlDMTg3Ljk0MiAxNjUuNDc5IDE4Ny45MSAxNjUuMzI2IDE4Ny44MzUgMTY1LjE5NEMxODUuMjAyIDE2MC41NzQgMTgyLjIyNCAxNTYuMTU4IDE3OC45MjggMTUxLjk4NkMxNzguODggMTUxLjc0MiAxNzguNzA5IDE1MS41MjkgMTc4LjQ1NyAxNTEuNDQzQzE3NC40NTcgMTUwLjA4NiAxNzAuMzEgMTQ5LjIxMyAxNjYuMTAyIDE0OC44NDJDMTY1Ljk3MiAxNDguODMyIDE2NS44NDEgMTQ4Ljg1OCAxNjUuNzIzIDE0OC45MTdDMTY1LjYwNiAxNDguOTc1IDE2NS41MDcgMTQ5LjA2NSAxNjUuNDM3IDE0OS4xNzZDMTU4LjQyNiAxNDkuNTg2IDE1Mi4wNDIgMTQ5LjUyMyAxNDQuOTI4IDE0OS45MjhDMTQ0LjgyNSAxNDkuODc0IDE0NC43MTEgMTQ5Ljg0NiAxNDQuNTk1IDE0OS44NDZDMTQ0LjQ4IDE0OS44NDYgMTQ0LjM2NSAxNDkuODc0IDE0NC4yNjMgMTQ5LjkyOEMxNDQuMTA5IDE0OS44NjcgMTQzLjkzOCAxNDkuODYyIDE0My43ODEgMTQ5LjkxNEMxNDAuNjM1IDE1MC45NjEgMTM3LjM4NCAxNTEuNjYzIDEzNC4wODYgMTUyLjAwN0MxMzMuOTQzIDE1MS44OTkgMTMzLjc2NCAxNTEuODQ5IDEzMy41ODUgMTUxLjg2NkMxMzMuNDA2IDE1MS44ODQgMTMzLjI0IDE1MS45NjggMTMzLjEyMSAxNTIuMTAzWk0xNjUuMDk3IDE1MC42MzFDMTYyLjc2MSAxNTQuNTI5IDE1OS4xNTYgMTU2Ljk2OCAxNTUuNDgyIDE1Ny4wNjVDMTUxLjg4MyAxNTcuMTY1IDE0OC4yODggMTU0Ljk4MiAxNDUuODg4IDE1MS4zMTVDMTUyLjYyNSAxNTAuOTY1IDE1OC40MDggMTUxLjAwNSAxNjUuMDk3IDE1MC42MzFaTTE0NC4xNzYgMTUxLjI5NUwxNDQuMTk3IDE1MS4zMDZDMTQ2LjYxOSAxNTUuNDc1IDE1MC43ODkgMTU4LjYyNSAxNTUuNTIgMTU4LjVDMTYwIDE1OC4zODIgMTY0LjM1MiAxNTUuMjY2IDE2Ni44OSAxNTAuMzY2QzE3MC41NDYgMTUwLjc1MyAxNzQuMTY1IDE1MS41MzUgMTc3LjY2NyAxNTIuNjk2QzE3Ny43NzYgMTUyLjg1MSAxODIuMjU0IDE1OC4zODIgMTg2LjMyOCAxNjUuNDVDMTgzLjc3NCAxNjguMjEyIDE4MS4wODEgMTcwLjg3IDE3OC41MDIgMTczLjY1NEMxNzUuNTUyIDE3MS42MTMgMTczLjA0NiAxNjkuNDk1IDE3MS4wNDcgMTY3LjM1M0MxNzAuNTQgMTY2LjgwOSAxNjkuNjM5IDE2Ny4zMDcgMTY5LjgyOSAxNjguMDI2QzE3MS45ODQgMTc2LjE3MiAxNzIuOTk1IDE5MC45NTUgMTcyLjkyOCAxOTguOTQyQzE2MS4zMTUgMjAxLjYwNiAxNDkuOTcyIDIwMS44ODIgMTM4LjI4NiAxOTkuNzg0QzEzOS4zNDUgMTg3LjA1OSAxMzkuNjQ4IDE3Ny4xOTYgMTM5LjI2NyAxNjcuODg0QzEzOS4yNDQgMTY3LjMzNSAxMzguNjM3IDE2Ny4wMTMgMTM4LjE3MSAxNjcuMzA0QzEzNS4xMTQgMTY5LjIxMSAxMzEuODQ0IDE3MC45NjcgMTI4LjcyMyAxNzIuODczQzEyNy4zMDEgMTY5LjU3MyAxMjUuOTA0IDE2Ni40MzUgMTIzLjkzOSAxNjMuNDQyQzEyNy40MjggMTYwLjI3IDEzMC43NDggMTU2LjkxNiAxMzMuODg1IDE1My4zOTZDMTMzLjk5NSAxNTMuNDM2IDEzNC4wOTcgMTUzLjQ0OSAxMzQuMjA0IDE1My40MzhDMTM3LjU5NiAxNTMuMDg2IDE0MC45MzkgMTUyLjM2NyAxNDQuMTc2IDE1MS4yOTVaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTU0LjQ4OSAxODIuNTkxQzE1Ny44MTQgMTgyLjU5MSAxNjEuMjA4IDE4MS4wNCAxNjMuMTMgMTc4LjM1NUMxNjQuNTc3IDE3Ni4zMzIgMTY1LjE5IDE3My44NDQgMTY0LjgxMSAxNzEuNTI5QzE2My4zMTYgMTYyLjM4NSAxNDguNTk5IDE2MS42MDQgMTQ1LjQyNCAxNzAuMDg5QzE0My40MzEgMTc1LjQxMyAxNDcuMzQ1IDE4Mi41OTEgMTU0LjQ4OSAxODIuNTkxWk0xNTYuNjQ4IDE2OC4yNjdDMTU2LjcyOSAxNjguMiAxNTYuODI0IDE2OC4xNTIgMTU2LjkyNyAxNjguMTI2QzE1Ny4wMjkgMTY4LjEgMTU3LjEzNiAxNjguMDk3IDE1Ny4yNCAxNjguMTE2QzE1Ny4zNDQgMTY4LjEzNSAxNTcuNDQzIDE2OC4xNzYgMTU3LjUyOCAxNjguMjM2QzE1Ny42MTQgMTY4LjI5NyAxNTcuNjg1IDE2OC4zNzUgMTU3LjczNiAxNjguNDY1QzE1OC4zMDcgMTY4LjQzNyAxNTguODQzIDE2OC43OCAxNTkuMDkyIDE2OS4zMzlDMTU5LjU0MyAxNzAuMzU3IDE1OC44NDMgMTcxLjQxOSAxNTcuNjc3IDE3MS40MTlDMTU3LjA5NSAxNzEuNDE5IDE1Ni41NjEgMTcxLjE0OSAxNTYuMjU3IDE3MC43MkMxNTUuNzI3IDE2OS45NzYgMTU1LjkwMiAxNjguODc1IDE1Ni42NDggMTY4LjI2N1pNMTU4LjM4NSAxNzMuOTY2QzE1OC40ODggMTczLjgxNCAxNTguNjQ4IDE3My43MDcgMTU4LjgzMSAxNzMuNjY5QzE1OS4wMTQgMTczLjYzIDE1OS4yMDYgMTczLjY2MyAxNTkuMzY0IDE3My43NjFDMTU5LjUyMyAxNzMuODU4IDE1OS42MzYgMTc0LjAxMSAxNTkuNjc5IDE3NC4xODlDMTU5LjcyMiAxNzQuMzY2IDE1OS42OTIgMTc0LjU1MyAxNTkuNTk1IDE3NC43MDlDMTU3LjY2MyAxNzcuNjg4IDE1My4zODkgMTc4LjE0OSAxNTAuODI3IDE3NS42OTRDMTUwLjcgMTc1LjU2MyAxNTAuNjMxIDE3NS4zODkgMTUwLjYzMyAxNzUuMjA5QzE1MC42MzUgMTc1LjAyOSAxNTAuNzA5IDE3NC44NTcgMTUwLjgzOSAxNzQuNzI5QzE1MC45NjkgMTc0LjYgMTUxLjE0NCAxNzQuNTI2IDE1MS4zMjkgMTc0LjUyMUMxNTEuNTE0IDE3NC41MTYgMTUxLjY5NCAxNzQuNTgxIDE1MS44MzEgMTc0LjcwMkMxNTMuNzM4IDE3Ni41MyAxNTYuOTQyIDE3Ni4xOTEgMTU4LjM4NSAxNzMuOTY2Wk0xNTEuNDU0IDE2OS4zN0MxNTEuNjI4IDE2OS4zMTQgMTUxLjgxOCAxNjkuMzI3IDE1MS45ODMgMTY5LjQwNEMxNTIuNjUgMTY5LjQ2MSAxNTMuMjQxIDE2OS45NDIgMTUzLjMwOCAxNzAuNTk2QzE1My40MjQgMTcxLjcxMSAxNTIuMDEgMTcyLjUxOCAxNTEuMDU5IDE3MS44NjhDMTUwLjEyOSAxNzEuMjMyIDE1MC4zNzggMTY5LjcwOSAxNTEuNDU0IDE2OS4zN1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNjEuMjQyIDU5LjQ2NDhDMjY4LjIwMyA2MC41Mjc1IDI2Ny4xODIgNjIuNjQ5NCAyNjguMTYxIDc5LjQxNzRDMjY4LjY5OCA5MS4xMTI0IDI2OC41MTYgMTAyLjgyOSAyNjcuNjEzIDExNC41MDJDMjY2LjkxMyAxMTguNjEzIDI2NC45NjEgMTIxLjEzMyAyNTkuOTE4IDEyMS4yNzRDMjM2Ljk4NiAxMjEuOTAyIDIwMy4yNDIgMTIzLjcxNCAxODguODgxIDEyMy41NjhDMTg2LjgxNiAxMjMuNTQ4IDE3OS42MjIgMTMwLjcyMyAxNjQuODUxIDEzOS40MTRDMTU1LjM2IDE0NC45OTcgMTcwLjQ4NiAxMjMuOTA4IDE3MC44MjcgMTExLjc2NkMxNzEuMDA0IDEwNS4zODQgMTY5Ljk4IDEwNS44NjcgMTY5Ljk1MiA3OS43OTJDMTY5Ljk0IDY5LjU4ODYgMTY4LjIzNyA2Mi4xMDU2IDE3Ni45NjcgNjEuMjU2OUMyMDIuMTA3IDU4LjgxMzQgMjU2LjkzMiA1OC44MDY3IDI2MS4yNDIgNTkuNDY0OFpNMjI4Ljc0MyA2Mi4wNDFDMjEzLjQ4IDYyLjQwMDcgMTg0LjMwNyA2My40MDY5IDE3OC41NDMgNjQuMDk2NkMxNzUuNzI2IDY0LjQyODEgMTczLjcxMSA2NS4xNDkyIDE3My43OTggNzIuMjM2QzE3NC4zOTMgMTIwLjQ5MyAxNzYuNjAyIDExMi45MTUgMTY3LjM3IDEzMi44NzRDMTY3LjIzNyAxMzMuMTYgMTY2Ljk5NCAxMzMuNTI4IDE2Ny4zMTkgMTMzLjc3NUMxNjcuNjQzIDEzNC4wMjIgMTY3LjkzIDEzMy42OSAxNjguMTg0IDEzMy41MDRDMTkxLjc0MyAxMTYuMTk0IDE4My4zODcgMTIwLjEzOCAxOTguNTg3IDExOS43MDlDMjU3LjkxNSAxMTguMDM2IDI1NS44NjUgMTE4LjA2NCAyNTkuODIyIDExNy4zODhDMjYzLjI1MyAxMTYuNzk4IDI2NC4wMDcgMTE0LjMxOCAyNjQuNDE2IDEwNS45NDlDMjY0LjY4OSAxMDAuMzU4IDI2NC44MjkgODcuNzE0MyAyNjMuNjY5IDY1Ljg5NjlDMjYzLjQ5NSA2Mi42MDEzIDI2NC4wNzggNjEuMjEwNCAyMjguNzQzIDYyLjA0MVoiIGZpbGw9IiMxOTE5MTkiLz4KPHBhdGggZD0iTTE4Ni4xNzkgOTguNzAyNkMxODMuMTgxIDk4LjEwNzUgMTg0LjA0NyA5NS4xNTg0IDE4Ni41MjEgOTUuMDU1NkMxOTYuMTgxIDk0LjYzOTUgMjQ1Ljg3NSA5My43Nzc1IDI1NS4zODggOTUuNTAxNUMyNTYuNzEzIDk1Ljc0MTkgMjU3LjE0OSA5Ny40MjEyIDI1NS40MzYgOTguMDE2M0MyNTIuMTg0IDk5LjE0MzYgMTg3LjY0MyA5OC45OTQ0IDE4Ni4xNzkgOTguNzAyNloiIGZpbGw9IiMwMTY3RkYiLz4KPHBhdGggZD0iTTIxMy40NjggODcuNjM2QzE4Ni42MTEgODcuNjkwNyAxODcuODExIDg3LjY1NTkgMTg2LjI5IDg3LjU2ODFDMTg1LjgxNSA4Ny41ODI1IDE4NS4zNTQgODcuNDA3OSAxODUuMDA5IDg3LjA4MjVDMTg0LjY2MyA4Ni43NTczIDE4NC40NjEgODYuMzA3OCAxODQuNDQ2IDg1LjgzMzJDMTg0LjQzMiA4NS4zNTg2IDE4NC42MDYgODQuODk3NiAxODQuOTMxIDg0LjU1MThDMTg1LjI1NyA4NC4yMDU4IDE4NS43MDYgODQuMDAzNCAxODYuMTggODMuOTg5QzE5MC42MDggODMuNDkxNyAyMzkuMTA4IDgyLjczNzQgMjUyLjAxMyA4My42Njc0QzI1NS4zOTIgODMuOTEyOCAyNTYuOTQgODQuMDQ3IDI1Ni45NjUgODUuMzg0OEMyNTcuMDAxIDg3LjUxIDI1Ni4yNTcgODcuNTUxNSAyMTMuNDY4IDg3LjYzNloiIGZpbGw9IiMwMTY3RkYiLz4KPHBhdGggZD0iTTIyNC4zODYgNzIuMzY0M0MyNTQuMTM3IDcyLjYzMjkgMjU3LjIwOCA3Mi4xOTg1IDI1Ny4zNzkgNzQuMjk1NkMyNTcuNTQ1IDc2LjM0NDUgMjU1Ljc4MyA3Ni4zMTk3IDIzMC4wMTQgNzYuNDcyMkMxODUuOTU1IDc2LjczNDEgMTg0Ljk2NCA3Ny41NzEzIDE4NC44MSA3NS4xNDZDMTg0LjcxNyA3My43MDg3IDE4NS44NjEgNzIuOTc2IDE4Ny4zMTcgNzIuOTE4QzE5OS42NjUgNzIuNDI3MyAyMTIuMDIxIDcyLjI0MjggMjI0LjM4NiA3Mi4zNjQzWiIgZmlsbD0iIzAxNjdGRiIvPgo8cGF0aCBkPSJNODEuMjMxOSA4My45MTYyQzM1LjEwMzYgMTE0LjY1MSA2Ny4xMzA3IDg4LjY4MzkgNjUuMzI2IDY4LjQzNzlDNjQuMjM1NiA1Ni4xODg5IDY0LjQ1NiAzMy42NTcgNjQuNDU5MyAzMy42MjU1QzY0LjczMTEgMjUuMjM5IDcwLjQ2MzMgMjUuODcwNiA5NS45MDE0IDI0Ljk3ODdDMTE4Ljg1NyAyNC4xNzQ3IDEzOS44MTcgMjQuMjM0NCAxNDkuMjU0IDI0LjU2NkMxNTYuMTU5IDI0LjgwOTcgMTYwLjc3OSAyMy45Mjc3IDE2MS43MDIgMjkuNTQ3NUMxNjMuMDU0IDQxLjg5MTggMTYzLjM4MyA1NC4zMjcgMTYyLjY4NSA2Ni43MjU1QzE2Mi40MDMgNzEuMzUzOSAxNjMuNTM1IDgwLjYyMjMgMTU1LjY5NyA4MC44NzkyQzgxLjIxNyA4My4zMTk0IDgzLjM3MTMgODIuNDkwNiA4MS4yMzE5IDgzLjkxNjJaTTExMy4wMiAyNy4zMDc5QzEwNC45NiAyNy40Mjg5IDc3LjIyNDcgMjguNDExOSA3Mi4xNzM2IDI5LjA4ODNDNjguNjMwNSAyOS41NjU3IDY4LjU0OTMgMzIuNDAzNyA2OC4zNjIgMzYuNTE5OUM2OC4zNDU0IDM2Ljg1MTQgNjguNTM3NyA2NC4xMjc4IDY5LjAxNSA3MS4zMzIzQzY5LjQxNiA3Ny4zOTggNjQuODUwNCA4NS44MzI2IDYyLjA0NDcgOTEuMjU2N0M2MS44NzkgOTEuNTY1IDYxLjUyNzcgOTEuOTU2MiA2MS44NTI1IDkyLjI2MTNDNjIuMTc3MyA5Mi41NjYzIDYyLjU0NTIgOTIuMTg2NyA2Mi44Mzg1IDkxLjk4NDRDNzcuODg0MyA4MS42NDY4IDgwLjg2NTYgNzguNjE4MSA4Ni44ODc5IDc5LjQ0MDNDOTAuMDk5NiA3OS44Nzk2IDkwLjY5OTUgNzkuNTA4MyAxMzkuMzggNzguMjYzM0MxNTQuNDM3IDc3Ljg3ODcgMTU3LjExMiA3Ny45MDg2IDE1Ny45OTQgNzQuMjI2N0MxNjAuMTQ4IDY1LjMwMzIgMTU4Ljg2NCAzOC42MzY4IDE1OC4yNjcgMzAuNTg2OUMxNTcuOTE5IDI2LjAxNjUgMTUzLjY1NSAyNi42OTI4IDExMy4wMiAyNy4zMDc5WiIgZmlsbD0iIzE5MTkxOSIvPgo8cGF0aCBkPSJNMTA3LjAyNyA2MC4zODMxQzEwNi4xMzQgNTQuMjQ2MiAxMTEuOTAxIDUyLjQ4NCAxMTUuODUyIDQ4LjAyMTRDMTE2LjQwOSA0Ny40NTU5IDExNi44MDcgNDYuNzUyNCAxMTcuMDAzIDQ1Ljk4MjVDMTE3LjE5OSA0NS4yMTI4IDExNy4xODcgNDQuNDA0NyAxMTYuOTY3IDQzLjY0MTNDMTE2Ljc0OCA0Mi44Nzc3IDExNi4zMjkgNDIuMTg2NSAxMTUuNzU1IDQxLjYzODJDMTE1LjE4IDQxLjA5IDExNC40NyA0MC43MDQ2IDExMy42OTcgNDAuNTIxOEMxMTIuMTg2IDQwLjEyMTkgMTEwLjU5MiA0MC4xNjkzIDEwOS4xMDggNDAuNjU4MkMxMDcuNjIzIDQxLjE0NjkgMTA2LjMxMyA0Mi4wNTYgMTA1LjMzNSA0My4yNzUzQzEwMy4yMzcgNDYuMDUwMyAxMDEuMzIzIDQzLjc3MjYgMTAyLjY4MyA0MS4zNDA3QzEwOC4yOTUgMzEuMzY2MSAxMjUuMzg3IDM4LjY4ODMgMTE5LjA5IDQ5LjIwNUMxMTcuNTI0IDUxLjUwNDQgMTE1LjU2OSA1My41MTE5IDExMy4zMTEgNTUuMTM2NEMxMDkuMzc3IDU4LjM1NCAxMTEuMjI1IDU5LjgzNiAxMTAuMTQ2IDY0LjE1NDRDMTA5LjYwNiA2Ni4zMjI4IDEwNi42NTYgNjUuOTUxNCAxMDcuMDI3IDYwLjM4MzFaIiBmaWxsPSIjMDE2N0ZGIi8+CjxwYXRoIGQ9Ik0xMDkuNTI1IDczLjExOTNDMTA2LjQzMiA3My4xNjkgMTA2LjUyIDY5LjE1NzMgMTA5LjYyMiA2OS4wNjc4QzEwOS45MDUgNjkuMDQ3NCAxMTAuMTg5IDY5LjA4NjUgMTEwLjQ1NiA2OS4xODI1QzExMC43MjMgNjkuMjc4MyAxMTAuOTY3IDY5LjQyOSAxMTEuMTczIDY5LjYyNDlDMTExLjM3OCA2OS44MjA3IDExMS41NCA3MC4wNTczIDExMS42NDggNzAuMzE5NUMxMTEuNzU3IDcwLjU4MTYgMTExLjgxIDcwLjg2MzYgMTExLjgwMyA3MS4xNDc0QzExMS43OTYgNzEuNDMxIDExMS43MyA3MS43MTAyIDExMS42MDkgNzEuOTY2OEMxMTEuNDg4IDcyLjIyMzQgMTExLjMxNCA3Mi40NTE5IDExMS4xIDcyLjYzNzdDMTEwLjg4NSA3Mi44MjM0IDExMC42MzQgNzIuOTYyMSAxMTAuMzYzIDczLjA0NUMxMTAuMDkyIDczLjEyNzkgMTA5LjgwNiA3My4xNTMyIDEwOS41MjUgNzMuMTE5M1oiIGZpbGw9IiMwMTY3RkYiLz4KPHBhdGggZD0iTTI3OS4xOTYgMjc1LjgyMkMyODAuNjE2IDI3NS44MTcgMjgxLjk5IDI3Ni4zMjEgMjgzLjA2OSAyNzcuMjQ0QzI4NC4xNDggMjc4LjE2NiAyODQuODYgMjc5LjQ0NSAyODUuMDc2IDI4MC44NUMyODUuMzg5IDI4My4xOTUgMjg1LjQ2OSAzMTguMTI5IDI4NS40NzggMzIwLjYyNEMyODUuNTEyIDMyOC45MTIgMjg2LjIxNiAzMzUuODE1IDI3Ny4zODEgMzM4LjcxOUMyNzQuOTc1IDMzOS41MSAxODEuMDAxIDMzOS4zNzEgMTM5LjE3IDMzOC42MjJDMTMyLjE3IDMzOC40OTcgMTMzLjI2MiAzMzEuMTczIDEzMy4yMzYgMzI0LjU0NkMxMzMuMTgzIDMxMS43NTMgMTMzLjE1NiAyOTguOTU5IDEzMy4xNTYgMjg2LjE2NEMxMzMuMTc2IDI4My4zNTQgMTM0LjI5OSAyODAuNjY2IDEzNi4yODMgMjc4LjY3OEMxMzguMjY4IDI3Ni42OSAxNDAuOTU0IDI3NS41NjEgMTQzLjc2MiAyNzUuNTM4QzE0My44MDQgMjc1LjUzOCAyMjUuMTk0IDI3NC44MDIgMjc5LjE5NiAyNzUuODIyWk0yMDQuNjIyIDMzNS42MUMyNzcuMzI1IDMzNi4wNzkgMjc2LjMzNyAzMzYuMzM2IDI3OS4wNjcgMzM0LjE4OUMyODQuNjE4IDMyOS44MjEgMjgxLjU5NyAzMjYuOTMgMjgyLjI5MyAyODIuNTY0QzI4Mi40MDQgMjgxLjc1MyAyODIuMjAxIDI4MC45MzIgMjgxLjcyNSAyODAuMjY4QzI4MS4yNDggMjc5LjYwNSAyODAuNTMzIDI3OS4xNDkgMjc5LjczMSAyNzguOTk2QzI3OC4xMTcgMjc4LjQ1OSAyNzYuNDMzIDI3OC4xNjkgMjc0LjczMyAyNzguMTM0QzI3NC42ODUgMjc4LjEzNCAyMTQuNDc3IDI3Ny45NDcgMTkzLjc1NCAyNzguMTM0QzE0NC43IDI3OC41ODUgMTM1LjgzOSAyNzQuNTM3IDEzNi4wNDggMjg2Ljg1NEMxMzYuMjk5IDMwMS42MzMgMTM2LjM2OSAzMTYuNDEzIDEzNi4yNTcgMzMxLjE5M0MxMzYuMjEyIDMzOC4yNiAxMzYuMTQzIDMzNS4xNjcgMjA0LjYxOCAzMzUuNjFIMjA0LjYyMloiIGZpbGw9IiMxOTE5MTkiLz4KPHBhdGggZD0iTTE0NS42MDQgMzIwLjg1OUMxNDYuNDc1IDMwOS44NzggMTYxLjM2NyAzMDYuNDggMTcxLjAxNyAzMTEuNzg4QzE3NC45OTQgMzEzLjk3MyAxNzYuNzc2IDMxNy43MzMgMTc3Ljc2NyAzMjEuOTQyQzE3OC4wMjcgMzIzLjA0NCAxNzcuMTc1IDMyMy4xNDkgMTc2LjM2NSAzMjMuMTQ5QzE0NC40NDQgMzIzLjE1OCAxNDUuMzE0IDMyNC41MDUgMTQ1LjYwNCAzMjAuODU5Wk0xNTkuNzg2IDMyMS41NzJDMTc2Ljk4NiAzMjEuNTIxIDE3Ni41NCAzMjIuMDY5IDE3NC4wODYgMzE4LjE0MUMxNjcuMjE1IDMwNy4xMjIgMTQ3LjgzNiAzMTEuMDIxIDE0Ny41NzEgMzIwLjYyN0MxNDcuNTM5IDMyMi4wMzYgMTQ3LjUxOSAzMjEuNjEgMTU5Ljc4NiAzMjEuNTcyWiIgZmlsbD0iIzE5MTkxOSIvPgo8cGF0aCBkPSJNMjM4LjUwOSAyODcuODE5QzIzOC43NjUgMjg3Ljg1NyAyMzkgMjg3Ljk4MyAyMzkuMTcxIDI4OC4xNzhDMjM5LjM0MSAyODguMzcyIDIzOS40MzcgMjg4LjYyMSAyMzkuNDQyIDI4OC44NzlDMjM5LjQ0NyAyODkuMTM4IDIzOS4zNiAyODkuMzkgMjM5LjE5NSAyODkuNTlDMjM5LjAzMyAyODkuNzkxIDIzOC44MDMgMjg5LjkyNiAyMzguNTQ5IDI4OS45NzNDMjM3LjY3NCAyOTAuMTU3IDE4OC42MzQgMjg5Ljc0NiAxODguNTk2IDI4OS43NDZDMTg3LjcwNCAyODkuNzQ2IDE4Ni4yMjQgMjkwLjAyNiAxODYuMTgzIDI4OC43MDVDMTg2LjE0IDI4Ny4zMjYgMTg2LjEzOCAyODcuNTcyIDIxMi43NjMgMjg3LjU3MkMyMTIuNzYzIDI4Ny45MDYgMjM0LjQ0MyAyODcuNDY0IDIzOC41MDkgMjg3LjgxOVoiIGZpbGw9IiMxOTE5MTkiLz4KPHBhdGggZD0iTTE3MC4yMiAyOTkuMTc0QzE3MC4xIDMxMC42NCAxNTQuMzQyIDMwOS42ODkgMTU0LjQ4NiAyOTguNzQxQzE1NC40NDQgMjk2LjY2OSAxNTUuMjIxIDI5NC42NjMgMTU2LjY0OCAyOTMuMTU5QzE1OC4wNzUgMjkxLjY1NiAxNjAuMDM4IDI5MC43NzYgMTYyLjEwOSAyOTAuNzExQzE2NC4zIDI5MC43NzkgMTY2LjM3NiAyOTEuNzAyIDE2Ny44OTMgMjkzLjI4NUMxNjkuNDA5IDI5NC44NjcgMTcwLjI0NSAyOTYuOTgyIDE3MC4yMiAyOTkuMTc0Wk0xNjguMDM1IDI5OS40MzFDMTY3Ljg4MyAyOTAuNTQ4IDE1Ni4yODcgMjkxLjA1NiAxNTYuNDQ2IDI5OS4xNTRDMTU2LjYwNiAzMDcuMjUyIDE2OC4xNzEgMzA3LjI1MiAxNjguMDM1IDI5OS40MzFaIiBmaWxsPSIjMTkxOTE5Ii8+CjxwYXRoIGQ9Ik0yMjMuNTgxIDI5OS42ODlDMjI1LjYwOSAyOTkuNjg5IDIyNS42MTYgMzAxLjkwMyAyMjMuNTgxIDMwMS45MjVDMTg3LjE3NSAzMDIuMjkyIDE4Ny41NzggMzAxLjk4MSAxODcuNjMxIDMwMC43ODRDMTg3LjcwMiAyOTkuMzQ0IDE5Ni4zMjUgMjk5LjY3OSAyMjMuNTgxIDI5OS42ODlaIiBmaWxsPSIjMTkxOTE5Ii8+CjxwYXRoIGQ9Ik0yNjcuMjUyIDI4Ny45MDdDMjY5LjI4NCAyODcuOTM0IDI2OS4yNjQgMjkwLjAyIDI2Ny4zMDMgMjkwLjA2MkMyNDIuNzg1IDI5MC41MjQgMjQyLjIzIDI5MC4zMDQgMjQyLjMyNyAyODguNjcxQzI0Mi40MTUgMjg3LjIyMSAyNDMuOTMgMjg3LjYwNyAyNjcuMjUyIDI4Ny45MDdaIiBmaWxsPSIjMTkxOTE5Ii8+CjxwYXRoIGQ9Ik0xOTQuMDk3IDMyNi4wMDRDMTk1LjIyNSAzMjYuMDA0IDE5Ni4xNCAzMjYuOTE5IDE5Ni4xNCAzMjguMDQ3QzE5Ni4xNCAzMjkuMTc1IDE5NS4yMjUgMzMwLjA5IDE5NC4wOTcgMzMwLjA5QzE5Mi45NjkgMzMwLjA5IDE5Mi4wNTUgMzI5LjE3NSAxOTIuMDU1IDMyOC4wNDdDMTkyLjA1NSAzMjYuOTE5IDE5Mi45NjkgMzI2LjAwNCAxOTQuMDk3IDMyNi4wMDRaIiBzdHJva2U9IiMxOTE5MTkiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMjA2LjM1NSAzMjYuMDA0QzIwNy40ODMgMzI2LjAwNCAyMDguMzk3IDMyNi45MTkgMjA4LjM5NyAzMjguMDQ3QzIwOC4zOTcgMzI5LjE3NSAyMDcuNDgzIDMzMC4wOSAyMDYuMzU1IDMzMC4wOUMyMDUuMjI3IDMzMC4wOSAyMDQuMzEyIDMyOS4xNzUgMjA0LjMxMiAzMjguMDQ3QzIwNC4zMTIgMzI2LjkxOSAyMDUuMjI3IDMyNi4wMDQgMjA2LjM1NSAzMjYuMDA0WiIgc3Ryb2tlPSIjMTkxOTE5IiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE5OC44NjYgMzEzLjc0NkgxOTQuNzgxIiBzdHJva2U9IiMxOTE5MTkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xODYuNjE3IDMwNS41N0wxODYuOTc4IDMwNS42OTFDMTg4Ljc3NSAzMDYuMjkgMTg5LjY3NCAzMDYuNTkgMTkwLjE4OCAzMDcuMzAzQzE5MC43MDIgMzA4LjAxNiAxOTAuNzAyIDMwOC45NjQgMTkwLjcwMiAzMTAuODU5VjMxNC40MjNDMTkwLjcwMiAzMTguMjc2IDE5MC43MDIgMzIwLjIwMiAxOTEuODk4IDMyMS4zOTlDMTkzLjA5NSAzMjIuNTk2IDE5NS4wMiAzMjIuNTk2IDE5OC44NzIgMzIyLjU5NkgyMDEuNTk1TTIwOS43NjQgMzIyLjU5NkgyMDcuMDQxIiBzdHJva2U9IiMxOTE5MTkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xOTAuNjk1IDMwOS42NkgxOTQuNzhNMTkxLjM3NiAzMTkuMTk0SDIwNS43MDJDMjA3LjAwOSAzMTkuMTk0IDIwNy42NjIgMzE5LjE5NCAyMDguMTczIDMxOC44NTdDMjA4LjY4NSAzMTguNTE5IDIwOC45NDIgMzE3LjkxOSAyMDkuNDU3IDMxNi43MThMMjEwLjA0MSAzMTUuMzU2QzIxMS4xNDMgMzEyLjc4MyAyMTEuNjk0IDMxMS40OTcgMjExLjA4OCAzMTAuNTc5QzIxMC40ODMgMzA5LjY2IDIwOS4wODQgMzA5LjY2IDIwNi4yODYgMzA5LjY2SDIwMC4yMjYiIHN0cm9rZT0iIzE5MTkxOSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTQ2Mi40MDQgMjM3LjA2NUM0NjIuMTI3IDIzMS44NjIgNDY0LjM1MSAyMjYuODkxIDQ2My44NTYgMjIxLjYyOEM0NjMuODEyIDIyMS4zNzggNDYzLjY3NSAyMjEuMTUzIDQ2My40NzMgMjIwLjk5OUM0NjMuMjcxIDIyMC44NDQgNDYzLjAxOSAyMjAuNzcxIDQ2Mi43NjYgMjIwLjc5M0M0NjIuNTEzIDIyMC44MTUgNDYyLjI3NyAyMjAuOTMgNDYyLjEwNSAyMjEuMTE3QzQ2MS45MzMgMjIxLjMwNCA0NjEuODM3IDIyMS41NDggNDYxLjgzNSAyMjEuODAzQzQ2Mi4yMzcgMjI2LjkwNSA0NTkuNzU4IDIzMS42ODcgNDU5Ljg3NSAyMzYuODA0QzQ1OS45OTEgMjQxLjkyIDQ2MS44MzUgMjQ1LjAwMyA0NjEuMjM5IDI1MS43NjFDNDYxLjIwNiAyNTIuMDY4IDQ2MS4yOSAyNTIuMzc2IDQ2MS40NzUgMjUyLjYyNEM0NjEuNjYgMjUyLjg3MiA0NjEuOTMyIDI1My4wNCA0NjIuMjM2IDI1My4wOTZDNDYyLjU0IDI1My4xNTEgNDYyLjg1MyAyNTMuMDg5IDQ2My4xMTQgMjUyLjkyM0M0NjMuMzc0IDI1Mi43NTcgNDYzLjU2MiAyNTIuNDk4IDQ2My42MzkgMjUyLjE5OUM0NjUuMDkyIDI0Ny4zMjggNDYyLjcwOSAyNDIuMDI1IDQ2Mi40NjIgMjM3LjA2NUg0NjIuNDA0Wk00NDUuOTk3IDI1Ny4wNjZDNDQyLjIwNSAyNTIuODk0IDQ0MS4yMTggMjUwLjIzNCA0NDAuNjY2IDI0NC4zMDNDNDQwLjQ5MSAyNDIuNDQ1IDQ0MC4yNjQgMjQwLjU4NCA0NDAuMjE2IDIzOC43MjNDNDQwLjIxNiAyMzguNDYxIDQ0MC4xMTIgMjM4LjIwOSA0MzkuOTI2IDIzOC4wMjRDNDM5Ljc0MSAyMzcuODM4IDQzOS40ODkgMjM3LjczNCA0MzkuMjI3IDIzNy43MzRDNDM4Ljk2NSAyMzcuNzM0IDQzOC43MTQgMjM3LjgzOCA0MzguNTI4IDIzOC4wMjRDNDM4LjM0MyAyMzguMjA5IDQzOC4yMzkgMjM4LjQ2MSA0MzguMjM5IDIzOC43MjNDNDM4LjIzOSAyNDMuMDg0IDQzNy44MTcgMjQ1Ljk5MSA0MzkuMTY5IDI1MC41NjlDNDM5Ljk1NyAyNTMuOTA2IDQ0MS44NjUgMjU2Ljg3MiA0NDQuNTc1IDI1OC45NzFDNDQ1Ljc2NiAyNTkuNzU1IDQ0Ni44NjkgMjU4LjAxMyA0NDYuMDI3IDI1Ny4wNTJMNDQ1Ljk5NyAyNTcuMDY2Wk00NTUuNDM5IDIzNy42MDRDNDU2LjM0MyAyMzguMDkyIDQ1Ni44OTIgMjQxLjAwNCA0NDguMzA0IDIzOC41MzRDNDQ0Ljc4MiAyMzcuNTI0IDQ0MS41MDMgMjM1LjgxMSA0MzguNjYzIDIzMy40OTZDNDM1LjgyMyAyMzEuMTgyIDQzMy40ODIgMjI4LjMxNiA0MzEuNzgyIDIyNS4wN0M0MzEuMjU4IDIyNC4xMjQgNDMyLjg4NSAyMjMuMjM3IDQzMy40MzggMjI0LjE1NEM0MzUuODAxIDIyNy45OTIgNDM5LjA3OCAyMzEuMTg1IDQ0Mi45NzYgMjMzLjQ0OEM0NDkuNTU5IDIzNy4zODcgNDUzLjU4OSAyMzYuNjA1IDQ1NS40NTEgMjM3LjYwNkw0NTUuNDM5IDIzNy42MDRaIiBmaWxsPSIjMTkxOTE5Ii8+CjxwYXRoIGQ9Ik00NTEuNjU0IDIwOS4zMTVDNDQ5LjU5IDIwNi45MTYgNDQ4Ljk5NCAyMTUuMTI5IDQ0My40MDEgMjEyLjA0OEM0NDMuMTc3IDIxMS45NiA0NDIuOTI4IDIxMS45NTkgNDQyLjcwNCAyMTIuMDQ2QzQ0Mi40OCAyMTIuMTMzIDQ0Mi4yOTYgMjEyLjMwMSA0NDIuMTkgMjEyLjUxN0M0NDIuMDg0IDIxMi43MzIgNDQyLjA2MiAyMTIuOTggNDQyLjEzMSAyMTMuMjExQzQ0Mi4xOTkgMjEzLjQ0MiA0NDIuMzUxIDIxMy42MzkgNDQyLjU1NyAyMTMuNzYyQzQ0Ny40MTkgMjE2Ljg1OSA0NTMuMzU1IDIxMS4yOTMgNDUxLjY1NCAyMDkuMzE1Wk00NTEuNjU0IDE5MC42ODFDNDUxLjM1NiAxODguNzQ2IDQ0Ny43NDQgMTg2LjQyMSA0NDUuNTgxIDE4Ni4wNzNDNDQzLjQxNyAxODUuNzI1IDQ0My40ODcgMTg3Ljg4MSA0NDUuMTc5IDE4OC40MjhDNDQ2LjQxMiAxODguODA2IDQ0OC44MTEgMTg5LjE1MyA0NDkuOTMgMTkxLjAxNEM0NTAuODk4IDE5Mi42MTQgNDUxLjc4NiAxOTEuNTM3IDQ1MS42NTQgMTkwLjY4MVpNNDM0LjY5NiAxODcuMDY0QzQzMi40NjkgMTg2LjU5MyA0MjguNTA1IDE5MC42NjkgNDMwLjExOCAxOTEuNTY5QzQzMC42ODUgMTkxLjg4OCA0MzIuMzQyIDE4OS43OCA0MzQuMDg2IDE4OS4yNzJDNDM1LjgzIDE4OC43NjQgNDM1LjI2MSAxODcuMTgyIDQzNC42OTYgMTg3LjA2NFpNNDMzLjA1MyAxOTQuNDAyQzQzMS44MzYgMTk0LjgwNCA0MzIuMTk3IDE5OS4wNjkgNDMzLjc1IDE5OC42NjNDNDM1LjMwMyAxOTguMjU3IDQzNC42MTIgMTkzLjg5IDQzMy4wNTMgMTk0LjQwMlpNNDQ2LjAxNyAxOTMuNjkxQzQ0My45NTEgMTkzLjY5MSA0NDQuOTEyIDE5OC4wNTIgNDQ1LjkyOCAxOTguMDUyQzQ0Ny4zODMgMTk4LjEzNiA0NDcuODMzIDE5My42ODkgNDQ2LjAxMyAxOTMuNjg5TDQ0Ni4wMTcgMTkzLjY5MVpNNDQxLjk5OSAyMDUuMzJDNDQyLjc0IDIwNS41NTEgNDQyLjkyOSAyMDcuMDkzIDQ0MC41NDYgMjA2Ljc3M0M0MzguMTY0IDIwNi40NTQgNDM0LjU0NiAyMDQuNTkzIDQzNi43MjkgMjAzLjQ1OUM0NDAuMDEyIDIwMS43NzMgNDM5LjYzNCAxOTkuNTkzIDQ0MS4wODkgMjAwLjE4OEM0NDIuNTQzIDIwMC43ODMgNDQwLjE3MSAyMDMuNjE4IDQzOS4xNCAyMDQuNDMyQzQ0MS4xMTUgMjA1LjA0NyA0NDEuODA0IDIwNS4xODQgNDQyLjAwNSAyMDUuMzFMNDQxLjk5OSAyMDUuMzJaIiBmaWxsPSIjMTkxOTE5Ii8+CjxwYXRoIGQ9Ik00NDMuMDIxIDI2NC44ODRDNDQzLjAyMSAyODUuNTk3IDQ1MS40OTEgMzc3Ljc2OSA0ODEuNzE3IDM3MC4yMjVDNTA0LjA2NiAzNjQuNjU2IDUxOS4xMTkgMzE2LjQ0MSA1MjEuMjQgMjk3LjAzN0M1MjQuOTE2IDI2My42MDQgNTA5LjI1MSAyNDUuNzk0IDQ4MC4xMDQgMjM0LjU0QzQ3OC4yMDEgMjMzLjgxMyA0NzkuMyAyMzYuNzM1IDQ3My41OTMgMjQxLjQ4N0M0NjkuMTYxIDI0NS4xOTUgNDY1LjcxNiAyNDUuMTk1IDQ2Ni41MTggMjQ2Ljg2N0M0NjcuNjQ5IDI0OS4yMDYgNDc2LjY4OSAyNDMuMzM0IDQ4MC41MzggMjM3LjE1N0M1MDYuNjk0IDI0OC4yMzEgNTIyLjQzMyAyNjIuODQxIDUxOC41ODIgMjk2LjI3NEM1MTYuMTExIDMxNy41OTcgNTAzLjQyNSAzNTguNjc2IDQ4My4yMjYgMzY3LjE0OEM0NTMuNTgyIDM3OS42MTkgNDQ1LjkyNCAyODIuNDUgNDQ1LjE4MyAyNjQuMTA1QzQ0OC40ODIgMjU5Ljc0NCA0NTkuODc0IDI1Ni45ODUgNDY1LjUyNSAyNTguMzhDNDY4LjM4NyAyNzUuNjQ5IDQ3My4yNjUgMjkyLjUyNCA0ODAuMDU4IDMwOC42NTZDNDgxLjc0MyAzMTIuNzcgNDg0Ljg1MyAzMjEuMDU1IDQ4Ny4zMjIgMzI0LjQxM0M0ODcuODE2IDMyNS4xMTIgNDg5LjIyOCAzMjQuNTMgNDg4LjkwNyAzMjMuNzE2QzQ4Ni44MyAzMTguNDY5IDQ4NC41NDcgMzEzLjI5NCA0ODIuMzg0IDMwOC4wOUM0ODMuNjc2IDMwNy41MjMgNDg4Ljg5MyAyODkuMiA0ODguNzA0IDI4NC43MzFDNDg4LjcwNCAyODMuOTE3IDQ4Ny4yNTEgMjgzLjUyNSA0ODcuMDQ4IDI4NC4zODNDNDg0Ljg5NSAyOTEuNDYxIDQ4NC44NjkgMjk1LjczNSA0ODEuNDI0IDMwNS42MzRDNDc1LjU4MiAyOTAuMTg3IDQ3MC45ODYgMjc0LjI5NyA0NjcuNjc5IDI1OC4xMTZDNDY2LjQwMSAyNTIuMzgxIDQ0My4wMjEgMjU3LjI0NCA0NDMuMDIxIDI2NC44ODRaTTUwMi41MTEgMzU5LjI5M0M1MDMuNjE2IDM2NC42NzQgNTA0LjU3MiAzNzEuNjE5IDUwNi4xNDMgMzc2Ljk3N0M1MDYuNDYzIDM3OC4wNTIgNTA0LjkwOCAzNzguNDMgNTA0LjM4NSAzNzcuNTE1QzUwMi41NzcgMzc0LjYxIDUwMC4xMTIgMzYyLjk4IDUwMC42OTUgMzU5LjU5MkM1MDAuODM4IDM1OC43NTYgNTAyLjMwNCAzNTguMjkgNTAyLjUxMSAzNTkuMjkzWk0zOTkuNzM0IDMzOC4yNzVDMzk3LjIzOCAzNDAuNjgxIDM5My45OTIgMzQyLjE1NiAzOTAuNTM5IDM0Mi40NTJDMzg3LjA4NiAzNDIuNzQ5IDM4My42MzYgMzQxLjg0OSAzODAuNzY4IDMzOS45MDNDMzYyLjY4NyAzMjguNzEgMzUwLjc5MSAyODAgMzQ0LjE4MSAyNTcuNzc3QzM1MC40NzMgMjU4LjMxNSAzNTkuODMxIDI1My45ODMgMzY0Ljk3NCAyNDkuOTM5QzM2OC4zIDI1OC40NTggMzg0LjgwOSAyOTEuODMgMzkxLjMwMiAyOTkuMDk5QzM5MS40NjUgMjk5LjI1OSAzOTEuNjc5IDI5OS4zNTcgMzkxLjkwNiAyOTkuMzc4QzM5Mi4xMzQgMjk5LjM5OCAzOTIuMzYyIDI5OS4zNCAzOTIuNTUxIDI5OS4yMTFDMzkyLjc0IDI5OS4wODMgMzkyLjg3OSAyOTguODk0IDM5Mi45NDQgMjk4LjY3NUMzOTMuMDEgMjk4LjQ1NiAzOTIuOTk3IDI5OC4yMjEgMzkyLjkwOSAyOTguMDFDMzkyLjIzNSAyOTYuNDk3IDM5MS40NDMgMjk1LjAzOSAzOTAuNTQxIDI5My42NDlDMzkzLjMzMSAyOTMuNTMyIDQwMC40OTMgMjYxLjg5OCA0MjguMjUgMjQ3LjM4MUM0MzAuNDUyIDI0Ni40ODkgNDMyLjU5OSAyNDUuNDY1IDQzNC42NzggMjQ0LjMxNUM0MzUuOTcgMjQzLjQxNCA0MzYuMTMxIDIzOS4wMzggNDIyLjMxMiAyNDguMDA2QzQwNi43MzMgMjU4LjA5NCAzOTUuODA4IDI3NC45NTYgMzg5LjY0NyAyOTIuMThDMzc5Ljg5NiAyNzYuMTkgMzc1LjExNSAyNjUuNDUzIDM2Ni44MDQgMjQ4LjQ1NkMzNjYuMDMyIDI0Ni44NTkgMzY0LjcwOCAyNDcuMDA0IDM2My40MDMgMjQ3LjkyQzM1Ni43NDcgMjUyLjc3MyAzNTEuOTEgMjU0Ljk2OSAzNDUuMTgyIDI1NS4zNTVDMzQyLjE4NyAyNTUuNTMgMzQxLjYyIDI1Ni4zODYgMzQyLjI3NSAyNTkuMjM2QzM0Ni44ODMgMjc5LjM2MSAzNjEuODM4IDMzMS45MTEgMzgwLjA1OCAzNDIuMjZDMzg2LjgyOCAzNDYuMTEgMzk1Ljc3OCAzNDUuNzYxIDQwMS4xNyAzMzkuNjdDNDAxLjk0MSAzMzguNzk3IDQwMC41NjcgMzM3LjQ3NSAzOTkuNzE4IDMzOC4yMTdMMzk5LjczNCAzMzguMjc1Wk00MTkuNTk2IDI2OC44MzdDNDAwLjM4MiAzMDEuMjM3IDQxMi4zMzEgMzQwLjQ2OSA0MTguMTQzIDM3NC45NDFDNDE4LjE3NCAzNzUuMTYzIDQxOC4xMTkgMzc1LjM4OSA0MTcuOTkgMzc1LjU3MkM0MTcuODYxIDM3NS43NTYgNDE3LjY2NyAzNzUuODgzIDQxNy40NDggMzc1LjkyOUM0MTcuMjI4IDM3NS45NzUgNDE3IDM3NS45MzcgNDE2LjgwOCAzNzUuODIxQzQxNi42MTYgMzc1LjcwNSA0MTYuNDc1IDM3NS41MjEgNDE2LjQxNCAzNzUuMzA1QzQwNy40OTIgMzQzLjQ4NiAzOTkuNTAxIDI5Ni4xNTkgNDE3Ljc2MyAyNjcuNjA5QzQxOC41MzUgMjY2LjQ1NCA0MjAuMzExIDI2Ny42MzMgNDE5LjU5NiAyNjguODM3WiIgZmlsbD0iIzE5MTkxOSIvPgo8cGF0aCBkPSJNMzY1LjY3OCAyMjUuMDcyQzM2NS42NzggMjIyLjg2MSAzNjUuNTQ3IDIxOC4xNjcgMzY0LjI5OCAyMTYuMzVDMzYyLjQwNSAyMTMuNjYyIDM2MC4zNzggMjExLjA3MSAzNTguMjI1IDIwOC41ODdDMzU3LjYyMiAyMDcuODkgMzU2LjM5MyAyMDguNzQ4IDM1Ni43NyAyMDkuNjM0QzM1OC4yMjIgMjEyLjM1MSAzNTkuOTc0IDIxNC44OTYgMzYxLjk5MyAyMTcuMjIyQzM2My4yMjkgMjE5LjAxMSAzNjMuNDQ2IDIyNC40OTEgMzYzLjI1NyAyMjYuNzNDMzYyLjgzNyAyMzIuNjg4IDM2MC4xOTEgMjM4LjM1NyAzNjEuODA1IDI0NC4zMzFDMzYyLjExIDI0NS41MDkgMzY0LjEyOSAyNDUuMDU5IDM2My44ODIgMjQzLjg2N0MzNjIuNTc0IDIzNy41NDMgMzY1LjggMjMxLjM1MiAzNjUuNzcyIDIyNS4wNDJMMzY1LjY3OCAyMjUuMDcyWk0zNTcuNTU2IDIyMy4yNDFDMzU4LjQ1OCAyMjIuODYzIDM1OS4xMTMgMjI0LjE0MSAzNTguNTE0IDIyNC42OTRDMzU2LjQ4MSAyMjYuMzg4IDM1NC44ODkgMjI4LjU1MSAzNTMuODc3IDIzMC45OTdDMzUyLjg2NCAyMzMuNDQzIDM1Mi40NjEgMjM2LjA5OCAzNTIuNzAyIDIzOC43MzVDMzUyLjgxOSAyNDAuMDU5IDM1MC43OTggMjQwLjE4OSAzNTAuNjM5IDIzOC44NTFDMzQ5Ljk1NiAyMzMuMDQyIDM1Mi45ODEgMjI1LjE1IDM1Ny41NTYgMjIzLjI0MVpNMzQ1LjQyMiAyNTIuMTc4QzM0NC41NjQgMjQ5Ljc4MSAzMzguNzUyIDI0My4yODIgMzM2LjgwNiAyNDAuNDYzQzMzNC44NTkgMjM3LjY0MyAzMzMuODk5IDIzMS43NDEgMzMzLjY2NiAyMjguMTY2QzMzNi41NzMgMjI1LjE3MiAzNDAuNTY4IDIzMS4yNzcgMzQxLjg3NiAyMzIuOTYzQzM0NC43ODMgMjM2LjYxIDM0NS4yMzMgMjMzLjkzNiAzNDUuMTc1IDIzMy42NzVDMzQzLjY0NiAyMzAuNzM4IDM0MS41MjUgMjI4LjE0OSAzMzguOTQ3IDIyNi4wNzJDMzM2LjQ0OCAyMjQuNDY1IDMzMS42ODEgMjI0Ljc3OCAzMzEuNDUgMjI3Ljg4MUMzMzEuMzE0IDIzMi41MDEgMzMyLjI4NSAyMzcuMDg3IDMzNC4yODMgMjQxLjI1NUMzMzcuMjA4IDI0NS40NTggMzQwLjQzIDI0OS40NDUgMzQzLjkyNSAyNTMuMTg3QzM0NC42NTMgMjUzLjY2NyAzNDUuNzcyIDI1My4xODcgMzQ1LjM3OCAyNTIuMTdMMzQ1LjQyMiAyNTIuMTc4Wk0zNDQuMjE3IDIyMS4yMzFDMzQxLjY3NSAyMTkuNzc5IDMzNy44NTIgMjE5LjYwNCAzMzUuODQ2IDIyMi4wNjFDMzM1Ljc1IDIyMi4xNjUgMzM1LjY3NiAyMjIuMjg3IDMzNS42MjggMjIyLjQyQzMzNS41OCAyMjIuNTUzIDMzNS41NTggMjIyLjY5NCAzMzUuNTY0IDIyMi44MzVDMzM1LjU3NyAyMjMuMTIgMzM1LjcwMiAyMjMuMzg4IDMzNS45MTIgMjIzLjU4MUMzMzYuMTIyIDIyMy43NzMgMzM2LjQgMjIzLjg3NSAzMzYuNjg1IDIyMy44NjJDMzM2Ljk3IDIyMy44NSAzMzcuMjM4IDIyMy43MjUgMzM3LjQzMSAyMjMuNTE0QzMzOC4zNjYgMjIyLjgyOCAzMzkuNTEgMjIyLjQ4OCAzNDAuNjY4IDIyMi41NTJDMzQxLjgyNiAyMjIuNjE2IDM0Mi45MjYgMjIzLjA3OSAzNDMuNzgxIDIyMy44NjRDMzQ2LjI1IDIyNS43MDkgMzQ4LjY0OCAyMjkuNDc1IDM1MC4wNzMgMjMwLjA2OUMzNTEuMTE5IDIzMC40OTEgMzUyLjI2NiAyMjkuMzU4IDM1MS41MjUgMjI4LjQ2MkMzNDkuNTI5IDIyNS42NDQgMzQ3LjA1NiAyMjMuMTk4IDM0NC4yMTcgMjIxLjIzM1YyMjEuMjMxWk0zNTUuODEyIDIxMy45NjVDMzU2LjM3OSAyMTQuNjMyIDM1NS42NTEgMjE2LjA0MyAzNTQuODUyIDIxNS42NTFDMzUxLjIzNiAyMTMuODQyIDM0NS42MTEgMjEyLjQzNiAzNDEuMzEyIDIxOC41NTdDMzQwLjQ2NiAyMTkuNzM0IDMzOC43ODEgMjE4LjM4NCAzMzkuNTM4IDIxNy4yMDZDMzQzLjkyNSAyMTAuNDYgMzUzLjE4MiAyMTAuOTc3IDM1NS44MSAyMTQuMDM3TDM1NS44MTIgMjEzLjk2NVoiIGZpbGw9IiMxOTE5MTkiLz4KPHBhdGggZD0iTTQyMC40NTUgMTgxLjE3M0M0MjMuNjY5IDE4Ni42ODUgNDU4Ljg3NSAxODEuOTg2IDQ2MC44OCAxNzkuNzJDNDYyLjg4NSAxNzcuNDUzIDQ2My41NTQgMTU1Ljk4MyA0NDIuNzAyIDE1NS4yODZDNDIxLjg0OSAxNTQuNTg4IDQxOS44NDQgMTgwLjEyOCA0MjAuNDU1IDE4MS4xNzNaTTQ1NS4zMyAyMjIuODkxQzQ0OC45MDEgMjMwLjQ5MyA0MzkuNzUzIDIyNi43NTcgNDM1LjI2MyAyMTguNjE2QzQzMS4xMDYgMjExLjExNyA0MjkuMDM1IDE5Ni42OTggNDI4LjYyMSAxODguMDkxQzQyOC41NDkgMTg2Ljc2OSA0MjYuNDcyIDE4Ni42MzkgNDI2LjUxNCAxODguMDkxQzQyNi41MTQgMTg5LjE4MyA0MjYuNjAyIDE5MC4yNzIgNDI2LjY2MSAxOTEuMzc3QzQyMC4xOCAxOTQuMzcxIDQxNy40NDggMTk4LjIxIDQxNy45NDIgMjAzLjU4N0M0MTguNDM2IDIwOC45NjUgNDI0LjkxNyAyMTAuMSA0MjQuNDUxIDIxNC43MjJDNDIzLjk4NSAyMTkuMzQ0IDQxMi41MjIgMjE5LjQ0NiA0MTAuNzc4IDIyOC4wNjVDNDA5LjAzNCAyMzYuNjg0IDQxNi4zODcgMjM0LjIyOSA0MTYuMjg1IDIzOS41NDhDNDE2LjE4MiAyNDQuODY3IDQwMi45MzEgMjQ3LjE2NiA0MDYuMDExIDI1Ny41ODhDNDExLjQ3NSAyNDkuNjk0IDQyNC41MDkgMjQwLjY4MSA0MzUuMjE4IDIzOC44MzZDNDM1LjEyMiAyMzcuNjIyIDQzNS40MTggMjM2LjQwOSA0MzYuMDYyIDIzNS4zNzZDNDMwLjY3IDIzMS4yMiA0MjQuMzA2IDIyMC4wODUgNDMyLjk2NiAyMTkuMzg4QzQ0MC43ODMgMjMzLjkyMyA0NTQuMjYxIDIzMC40OTMgNDU2Ljg5OCAyMjMuODY1QzQ1Ny4yMzQgMjIzLjAzNSA0NTUuOTY4IDIyMi4yMjIgNDU1LjM3NCAyMjIuOTE5TDQ1NS4zMyAyMjIuODkxWk00NjUuMjExIDIwNC4yNDJDNDY1LjIxMSAyMDIuMTkyIDQ2Ny42MzggMjAzLjIwOSA0NjkuOTA0IDIwMC45MjZDNDczLjMxOSAxOTcuNDk2IDQ3MS45NjcgMTkwLjQ5MSA0NzAuMzg0IDE4OC4yOEM0NjcuNTcyIDE4NC4zNzIgNDY1LjMxMiAxODkuMjg1IDQ2NC41NyAxODguOTY0QzQ2MS44NjggMTg3LjkwMyA0NjEuMDI1IDE4My45MiA0NjAuNjE5IDE4Mi42ODZDNDY4LjE2IDE3OS40NDQgNDY1Ljk2NyAxNTguODAyIDQ1MC4wMTIgMTU0LjQ1NkM0NTkuNTg2IDE1MC4zODYgNDcyLjcyMyAxNTEuMDg0IDQ4MC4wOTEgMTYxLjgyN0M0ODcuNDYgMTcyLjU3IDQ4MC4wOTEgMTc1LjkyNiA0ODYuMjk1IDE4My43NDdDNDkyLjQ5OCAxOTEuNTY4IDQ5OC45MDkgMTg4LjY0NCA1MDEuNzg1IDE5Ny4zOTZDNTA0LjY2MiAyMDYuMTQ3IDQ5NS4zMDUgMjA4LjU3MyA1MDEuMjkxIDIxNi42MjVDNTA3LjI3OCAyMjQuNjc3IDUxNi40MzIgMjIzLjU4OCA1MTguNzI4IDIzMC4xODdDNTIxLjAyNSAyMzYuNzg3IDUxNS40ODggMjQyLjg2MiA1MTkuNzYxIDI0Ny44MTdDNTI0LjAzNCAyNTIuNzczIDUyOS40NjYgMjYyLjg4OSA1MjIuMjMgMjY3LjI5OEM1MTUuNjYzIDI0Ny43MDMgNDkwLjc1NiAyMzAuNjgyIDQ3MS4wMjMgMjMwLjEyMUM0NzEuMzYxIDIzMS4zOSA0NzEuNjA0IDIzMi42ODIgNDcxLjc1IDIzMy45ODdDNDcxLjc3OCAyMzQuMiA0NzEuNzMxIDIzNC40MTYgNDcxLjYxNiAyMzQuNTk3QzQ3MS41MDIgMjM0Ljc3OCA0NzEuMzI3IDIzNC45MTQgNDcxLjEyMyAyMzQuOTc5QzQ3MC45MTkgMjM1LjA0NSA0NzAuNjk4IDIzNS4wMzcgNDcwLjQ5OSAyMzQuOTU3QzQ3MC4zIDIzNC44NzcgNDcwLjEzNiAyMzQuNzI5IDQ3MC4wMzUgMjM0LjU0QzQ2Ny4xNzIgMjI4Ljg3OSA0NjUuMjExIDIwOS45MzEgNDY1LjIxMSAyMDQuMjQyWiIgZmlsbD0iIzE5MTkxOSIvPgo8L3N2Zz4K");


/***/ }),

/***/ "./src/assets/images/welcome-store-banner.svg":
/*!****************************************************!*\
  !*** ./src/assets/images/welcome-store-banner.svg ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgWelcomeStoreBanner),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _circle, _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgWelcomeStoreBanner(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 60,
    height: 60,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _circle || (_circle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 30,
    cy: 30,
    r: 30,
    fill: "#0167FF",
    fillOpacity: 0.2
  })), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M44.592 30.714a1.607 1.607 0 01-2.743 1.136l-2.567-2.567-5.794 6.128a3.12 3.12 0 01-4.427.058v.002l-.015-.015-3.671-3.668-6.309 6.31a2.144 2.144 0 01-3.032-3.032l7.142-7.14.015-.015a3.122 3.122 0 014.37 0l.015.015 3.645 3.645 5.029-5.318-2.229-2.229a1.607 1.607 0 011.136-2.743h7.826a1.607 1.607 0 011.607 1.607v7.826h.002z",
    fill: "#0167FF"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiMwMTY3RkYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDQuNTkyMSAzMC43MTQxQzQ0LjU5MTggMzEuMDMxOCA0NC40OTc0IDMxLjM0MjIgNDQuMzIwOCAzMS42MDYyQzQ0LjE0NDIgMzEuODcwMyA0My44OTMzIDMyLjA3NjEgNDMuNTk5OCAzMi4xOTc2QzQzLjMwNjMgMzIuMzE5MSA0Mi45ODM0IDMyLjM1MDkgNDIuNjcxOCAzMi4yODlDNDIuMzYwMiAzMi4yMjcxIDQyLjA3NCAzMi4wNzQzIDQxLjg0OTIgMzEuODQ5OEwzOS4yODIxIDI5LjI4MjdMMzMuNDg3OCAzNS40MTEyQzMzLjIwMTUgMzUuNzA2OCAzMi44NTk2IDM1Ljk0MjggMzIuNDgxOCAzNi4xMDU3QzMyLjEwNCAzNi4yNjg2IDMxLjY5NzcgMzYuMzU1MyAzMS4yODYzIDM2LjM2MDZDMzAuODc0OCAzNi4zNjYgMzAuNDY2NCAzNi4yOSAzMC4wODQ1IDM2LjEzN0MyOS43MDI1IDM1Ljk4NCAyOS4zNTQ2IDM1Ljc1NyAyOS4wNjA3IDM1LjQ2OTFWMzUuNDcxMkwyOS4wNDU3IDM1LjQ1NjJMMjUuMzc0OSAzMS43ODc3TDE5LjA2NjQgMzguMDk4NEMxOC42NjQzIDM4LjUwMDUgMTguMTE4OSAzOC43MjY0IDE3LjU1MDMgMzguNzI2NEMxNi45ODE3IDM4LjcyNjQgMTYuNDM2MyAzOC41MDA1IDE2LjAzNDIgMzguMDk4NEMxNS42MzIxIDM3LjY5NjMgMTUuNDA2MiAzNy4xNTEgMTUuNDA2MiAzNi41ODIzQzE1LjQwNjIgMzYuMDEzNyAxNS42MzIxIDM1LjQ2ODMgMTYuMDM0MiAzNS4wNjYyTDIzLjE3NjQgMjcuOTI2MkwyMy4xOTE0IDI3LjkxMTNDMjMuNzc0OSAyNy4zMzk3IDI0LjU1OTIgMjcuMDE5NiAyNS4zNzYgMjcuMDE5NkMyNi4xOTI4IDI3LjAxOTYgMjYuOTc3MSAyNy4zMzk3IDI3LjU2MDcgMjcuOTExM0wyNy41NzU3IDI3LjkyNjJMMzEuMjIwNyAzMS41NzEyTDM2LjI0OTkgMjYuMjUyN0wzNC4wMjE0IDI0LjAyNDFDMzMuNzk2OSAyMy43OTkzIDMzLjY0NDEgMjMuNTEzMSAzMy41ODIyIDIzLjIwMTVDMzMuNTIwMyAyMi44OSAzMy41NTIxIDIyLjU2NyAzMy42NzM2IDIyLjI3MzZDMzMuNzk1MSAyMS45ODAxIDM0LjAwMDkgMjEuNzI5MiAzNC4yNjQ5IDIxLjU1MjZDMzQuNTI5IDIxLjM3NTkgMzQuODM5NCAyMS4yODE1IDM1LjE1NzEgMjEuMjgxMkg0Mi45ODI4QzQzLjQwOSAyMS4yODEyIDQzLjgxNzggMjEuNDUwNiA0NC4xMTkyIDIxLjc1MkM0NC40MjA2IDIyLjA1MzQgNDQuNTg5OSAyMi40NjIyIDQ0LjU4OTkgMjIuODg4NFYzMC43MTQxSDQ0LjU5MjFaIiBmaWxsPSIjMDE2N0ZGIi8+Cjwvc3ZnPgo=");


/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _Organisms_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Organisms/Header */ "./src/Organisms/Header.js");
/* harmony import */ var _Pages_Elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pages/Elements */ "./src/Pages/Elements.js");
/* harmony import */ var _Pages_Home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pages/Home */ "./src/Pages/Home.js");
/* harmony import */ var _Pages_Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pages/Image */ "./src/Pages/Image.js");
/* harmony import */ var _Pages_NotFound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Pages/NotFound */ "./src/Pages/NotFound.js");
/* harmony import */ var _Pages_Settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Pages/Settings */ "./src/Pages/Settings.js");

/*import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const Home = () => <div>Its Home</div>;
const Settings = () => <div>Its Setting</div>;
const About = () => <div>Its About</div>;

const App = () => (
  <Router basename='/wp-admin/admin.php'>
    <LoadSettingsPages />
    <div>
      <nav>
        <ul>
          <li><Link to="?page=store-banner">Home</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="?page=store-banner" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  </Router>
);

export default App;
*/








// React Router does not have any opinions about
// how you should parse URL query strings.
//
// If you use simple key=value query strings and
// you do not need to support IE 11, you can use
// the browser's built-in URLSearchParams API.
//
// If your query strings contain array or object
// syntax, you'll probably need to bring your own
// query parsing function.

// const Home = () => <div>Its Home</div>;
// const Settings = () => <div>Its Setting</div>;
// const About = () => <div>Its About</div>;
// const NotFound = () => <div>Its 404</div>;

function App() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.BrowserRouter, {
    basename: "/wp-admin/admin.php"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Organisms_Header__WEBPACK_IMPORTED_MODULE_2__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LoadSettingsPages, null));
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const {
    search
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useLocation)();
  return react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(() => new URLSearchParams(search), [search]);
}
function LoadSettingsPages() {
  let query = useQuery();
  if (query.get("path")) {
    if (query.get("path") === 'settings') {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Pages_Settings__WEBPACK_IMPORTED_MODULE_7__["default"], null);
    } else if (query.get("path") === 'elements') {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Pages_Elements__WEBPACK_IMPORTED_MODULE_3__["default"], null);
    } else if (query.get("path") === 'image') {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Pages_Image__WEBPACK_IMPORTED_MODULE_5__["default"], {
        onSelectImage: image => console.log(image)
      });
    } else {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Pages_NotFound__WEBPACK_IMPORTED_MODULE_6__["default"], null);
    }
  } else {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Pages_Home__WEBPACK_IMPORTED_MODULE_4__["default"], null);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.NavLink, {
    to: "?page=store-banner",
    className: ({
      isActive,
      isPending,
      isTransitioning
    }) => [isPending ? "pending" : "", isActive ? "current" : "", isTransitioning ? "transitioning" : ""].join(" ")
  }, "Dashboard")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.NavLink, {
    to: "?page=store-banner&path=settings",
    className: ({
      isActive,
      isPending,
      isTransitioning
    }) => [isPending ? "pending" : "", isActive ? "current" : "", isTransitioning ? "transitioning" : ""].join(" ")
  }, "Setting")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.NavLink, {
    to: "?page=store-banner&path=elements",
    className: ({
      isActive,
      isPending,
      isTransitioning
    }) => [isPending ? "pending" : "", isActive ? "current" : "", isTransitioning ? "transitioning" : ""].join(" ")
  }, "Elements")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.NavLink, {
    to: "?page=store-banner&path=image",
    className: ({
      isActive,
      isPending,
      isTransitioning
    }) => [isPending ? "pending" : "", isActive ? "current" : "", isTransitioning ? "transitioning" : ""].join(" ")
  }, "Image"))));
}

/***/ }),

/***/ "./src/Molecules/Card.js":
/*!*******************************!*\
  !*** ./src/Molecules/Card.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Cta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Cta */ "./src/Molecules/Cta.js");
/* harmony import */ var _Imgbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Imgbox */ "./src/Molecules/Imgbox.js");




function Card(props) {
  // console.log(props);
  const {
    className,
    header,
    body,
    footer
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: ['card-box', className ? className : ''].join(" ")
  }, header && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card-header"
  }, header.imgBox && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Imgbox__WEBPACK_IMPORTED_MODULE_3__["default"], {
    data: header.imgBox
  }), header.cta && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Cta__WEBPACK_IMPORTED_MODULE_2__["default"], {
    data: header.cta
  }), header.html && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: header.html
    }
  })), body && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card-body"
  }, body.imgBox && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Imgbox__WEBPACK_IMPORTED_MODULE_3__["default"], {
    data: body.imgBox
  }), body.cta && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Cta__WEBPACK_IMPORTED_MODULE_2__["default"], {
    data: body.cta
  }), body.html && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: body.html
    }
  })), footer && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card-footer"
  }, footer.imgBox && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Imgbox__WEBPACK_IMPORTED_MODULE_3__["default"], {
    data: footer.imgBox
  }), footer.cta && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Cta__WEBPACK_IMPORTED_MODULE_2__["default"], {
    data: footer.cta
  }), footer.html && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: footer.html
    }
  })));
}

/***/ }),

/***/ "./src/Molecules/Cta.js":
/*!******************************!*\
  !*** ./src/Molecules/Cta.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cta)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Cta(props) {
  // console.log(props);
  const {
    className,
    title,
    content,
    btn
  } = props.data;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: ['cta-box', className ? className : ''].join(" ")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "row align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-lg-6 text-center text-lg-start"
  }, title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "cta-title",
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cta-content",
    dangerouslySetInnerHTML: {
      __html: content
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-lg-6 text-center text-lg-end"
  }, btn && btn.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btn-group"
  }, btn.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: ['theme-button', item.className ? item.className : ''].join(" "),
    key: index,
    href: item.url,
    target: "_blank"
  }, item.title))))));
}

/***/ }),

/***/ "./src/Molecules/Imgbox.js":
/*!*********************************!*\
  !*** ./src/Molecules/Imgbox.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Imgbox)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Image.js");



function Imgbox(props) {
  // console.log(props)
  const {
    className,
    img,
    title,
    content,
    btn
  } = props.data;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: ['img-box', 'd-flex', className ? className : ''].join(" ")
  }, img && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "part-img"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "img-box-image",
    fluid: "fluid",
    src: img
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "part-content"
  }, title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "img-box-title",
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "img-box-content",
    dangerouslySetInnerHTML: {
      __html: content
    }
  }), btn && btn.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "img-box-button-group mt-2"
  }, btn.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: ['img-box-button', item.className ? item.className : ''].join(" "),
    key: index,
    href: item.url,
    target: "_blank"
  }, item.title)))));
}

/***/ }),

/***/ "./src/Organisms/Header.js":
/*!*********************************!*\
  !*** ./src/Organisms/Header.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Container.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Row.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Col.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Image.js");
/* harmony import */ var _assets_images_icon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/images/icon.svg */ "./src/assets/images/icon.svg");
/* harmony import */ var _assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/images/logo.svg */ "./src/assets/images/logo.svg");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data.json */ "./src/data.json");

// import React, { Component, Suspense } from "react";







function Header() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "plugin-starter-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["default"], {
    fluid: "fluid"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "topbar-part bg-dark-blue"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-center"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You\'re Using', 'plugin-starter'), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, _data_json__WEBPACK_IMPORTED_MODULE_5__.name), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "d-inline-block text-lite-blue"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free Version', 'plugin-starter'))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["default"], {
    fluid: "fluid"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "header-part bg-lite-blue"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "col-lg-8 left-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "d-flex flex-column flex-lg-row align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fluid: "fluid",
    src: _assets_images_icon_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
    alt: _data_json__WEBPACK_IMPORTED_MODULE_5__.name + ' - Logo',
    width: "59",
    height: "42"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fluid: "fluid",
    src: _assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
    alt: "Programme-lab-Logo",
    width: "176",
    height: "36"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(HeaderLeftNav, null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "col-lg-4 right-header text-center text-lg-end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "list-inline"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "list-inline-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://www.programmelab.com/",
    className: "leanrmore-link",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Learn More', 'plugin-starter'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "list-inline-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "review-link"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    clipPath: "url(#clip0_3319_11057)"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M10 0C4.48598 0 0 4.48598 0 10C0 15.514 4.48598 20 10 20C15.514 20 20 15.514 20 10C20 4.48598 15.514 0 10 0ZM10 18.75C5.17523 18.75 1.25 14.8248 1.25 10C1.25 5.17523 5.17523 1.25 10 1.25C14.8248 1.25 18.75 5.17523 18.75 10C18.75 14.8248 14.8248 18.75 10 18.75ZM15.2678 13.0469C14.1751 14.9393 12.2059 16.0691 10.0002 16.0691C7.79434 16.0691 5.825 14.9393 4.73223 13.0469C4.55961 12.748 4.66199 12.3657 4.9609 12.1931C5.25988 12.0205 5.64211 12.1229 5.81465 12.4218C6.68148 13.9229 8.24617 14.8191 10.0001 14.8191C11.754 14.8191 13.3186 13.9229 14.1853 12.4218C14.3579 12.1229 14.7402 12.0205 15.0391 12.1931C15.338 12.3657 15.4404 12.7479 15.2678 13.0469ZM4.63586 7.53684C4.63586 6.8473 5.19684 6.28629 5.88641 6.28629C6.57598 6.28629 7.13695 6.84727 7.13695 7.53684C7.13695 8.22641 6.57598 8.78738 5.88641 8.78738C5.19684 8.78738 4.63586 8.22641 4.63586 7.53684ZM15.3642 7.53684C15.3642 8.22637 14.8032 8.78738 14.1136 8.78738C13.4241 8.78738 12.8631 8.22641 12.8631 7.53684C12.8631 6.84727 13.4241 6.28629 14.1136 6.28629C14.8032 6.28633 15.3642 6.8473 15.3642 7.53684Z",
    fill: "white"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("clipPath", {
    id: "clip0_3319_11057"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    width: "20",
    height: "20",
    fill: "white"
  }))))))))))));
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const {
    search
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useLocation)();
  return react__WEBPACK_IMPORTED_MODULE_2___default().useMemo(() => new URLSearchParams(search), [search]);
}
function HeaderLeftNav() {
  let query = useQuery();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "list-inline"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "list-inline-item" /*onClick={(e) => { fn(e, 'welcome') }}*/
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.NavLink, {
    to: "?page=plugin-starter",
    className: ({
      isActive
    }) => ['welcome-link', isActive && query.get("path") === null ? 'active' : ''].join(" ")
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Welcome', 'plugin-starter'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "list-inline-item" /*onClick={(e) => { fn(e, 'settings') }}*/
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.NavLink, {
    to: "?page=plugin-starter&path=settings",
    className: ({
      isActive
    }) => ['settings-link', isActive && query.get("path") === 'settings' ? 'active' : ''].join(" ")
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings', 'plugin-starter'))));
}
const fn = async (e, path) => {
  e.preventDefault();
  e.target.className = 'btn btn-sm btn-light disabled';
  console.log(path);
};

/***/ }),

/***/ "./src/Pages/Elements.js":
/*!*******************************!*\
  !*** ./src/Pages/Elements.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Elements)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Container.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Row.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Col.js");

// import React, { Component, Suspense } from "react";


class Elements extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: "p-3",
      fluid: "fluid"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: "set-row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "col-lg-4"
    }, "Col 1"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"], null, "Col 2"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"], null, "Col 3")));
  }
}

/***/ }),

/***/ "./src/Pages/Home.js":
/*!***************************!*\
  !*** ./src/Pages/Home.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Container.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Row.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Col.js");
/* harmony import */ var _Molecules_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Molecules/Card */ "./src/Molecules/Card.js");
/* harmony import */ var _assets_images_get_5_star_support_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/images/get-5-star-support.svg */ "./src/assets/images/get-5-star-support.svg");
/* harmony import */ var _assets_images_join_the_community_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/images/join-the-community.svg */ "./src/assets/images/join-the-community.svg");
/* harmony import */ var _assets_images_rate_us_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/images/rate-us.svg */ "./src/assets/images/rate-us.svg");
/* harmony import */ var _assets_images_welcome_feature_image_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/images/welcome-feature-image.svg */ "./src/assets/images/welcome-feature-image.svg");
/* harmony import */ var _assets_images_welcome_store_banner_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/images/welcome-store-banner.svg */ "./src/assets/images/welcome-store-banner.svg");










function Home() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "settings-page-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fluid: "fluid"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content-part"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["default"], {
    className: "col-lg-8 left-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Molecules_Card__WEBPACK_IMPORTED_MODULE_3__["default"]
  // className="custom-class"      
  , {
    header: {
      imgBox: {
        className: 'gap-4',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Welcome to Ultimate Quick View for WooCommerce', 'store-banner'),
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('We designed Ultimate Quick View for WooCommerce to be intuitive but we do recommend learning how it works by Checking our comprehensive documentation and watching the video below. Enjoy your time with Spectra!', 'store-banner'),
        img: _assets_images_welcome_store_banner_svg__WEBPACK_IMPORTED_MODULE_8__["default"]
      }
    },
    body: {
      html: `<div class="text-center"><img class="img-fluid" src="${_assets_images_welcome_feature_image_svg__WEBPACK_IMPORTED_MODULE_7__["default"]}" /></div>`
    },
    footer: {
      cta: {
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enjoyed Ultimate Quick View for WooCommerce ? Please leave us a rating. We really appreciate your support!', 'store-banner'),
        btn: [{
          'url': '#',
          'title': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create New Page', 'store-banner'),
          'className': 'theme-button-solid theme-button-solid-blue'
        }, {
          'url': '#',
          'title': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Visit Our Website', 'store-banner')
        }]
      }
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["default"], {
    className: "col-lg-4 right-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Molecules_Card__WEBPACK_IMPORTED_MODULE_3__["default"]
  // className="custom-class"      
  , {
    body: {
      imgBox: {
        className: 'gap-3',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get 5-star Support', 'store-banner'),
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Need some help? Our awesome support team is here to help you with any question you have.', 'store-banner'),
        img: _assets_images_get_5_star_support_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
        btn: [{
          'url': '#',
          'title': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Support', 'store-banner')
        }]
      }
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Molecules_Card__WEBPACK_IMPORTED_MODULE_3__["default"]
  // className="custom-class"      
  , {
    body: {
      imgBox: {
        className: 'gap-3',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Join the Community', 'store-banner'),
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!'),
        img: _assets_images_join_the_community_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
        btn: [{
          'url': '#',
          'title': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Support', 'store-banner')
        }]
      }
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Molecules_Card__WEBPACK_IMPORTED_MODULE_3__["default"]
  // className="custom-class"      
  , {
    body: {
      imgBox: {
        className: 'gap-3',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rate Us', 'store-banner'),
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('We love to hear from you, we would appreciate your every single review.', 'store-banner'),
        img: _assets_images_rate_us_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
        btn: [{
          'url': '#',
          'title': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Support', 'store-banner')
        }]
      }
    }
  }))))));
}
;

/***/ }),

/***/ "./src/Pages/Image.js":
/*!****************************!*\
  !*** ./src/Pages/Image.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const ALLOWED_MEDIA_TYPES = ['image'];
const Image = ({
  onSelectImage
}) => {
  const [mediaId, setMediaId] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  const handleSelect = media => {
    console.log('selected media:', media);
    setMediaId(media.id);
    if (onSelectImage) {
      onSelectImage(media);
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "photo-uploader"
  }, mediaId, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
    onSelect: handleSelect,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    value: mediaId,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: open
    }, "Open Media Library")
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Image);

/***/ }),

/***/ "./src/Pages/NotFound.js":
/*!*******************************!*\
  !*** ./src/Pages/NotFound.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NotFound)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function NotFound() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "512",
    height: "512",
    viewBox: "0 0 1550 1550",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1519 425c-13.3 0-24-10.7-24-24V224c0-19.9-16.1-36-36-36H91c-19.9 0-36 16.1-36 36v177c0 13.3-10.7 24-24 24S7 414.3 7 401V224c0-46.3 37.7-84 84-84h1368c46.3 0 84 37.7 84 84v177c0 13.3-10.7 24-24 24z",
    fill: "#000000",
    opacity: "1",
    dataOriginal: "#000000"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1459 1410H91c-46.3 0-84-37.7-84-84V401c0-13.3 10.7-24 24-24h1488c13.3 0 24 10.7 24 24v925c0 46.3-37.7 84-84 84zM55 425v901c0 19.9 16.1 36 36 36h1368c19.9 0 36-16.1 36-36V425zM218 317.5c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35zM356 317.5c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35zM494 317.5c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35z",
    fill: "#000000",
    opacity: "1",
    dataOriginal: "#000000"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M452.6 1128.7c-13.3 0-24-10.7-24-24v-95.5H235.1c-9 0-17.2-5-21.4-13-4.1-8-3.4-17.6 1.9-25l217.5-302.9c6.1-8.5 16.9-12 26.8-8.8s16.6 12.4 16.6 22.8v278.9h51.8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-51.8v95.5c.1 13.3-10.6 24-23.9 24zM281.9 961.2h146.7V756.9zM1239.1 1128.7c-13.3 0-24-10.7-24-24v-95.5h-193.5c-9 0-17.2-5-21.4-13-4.1-8-3.4-17.6 1.9-25l217.5-302.9c6.1-8.5 16.9-12 26.8-8.8s16.6 12.4 16.6 22.8v278.9h51.8c13.3 0 24 10.7 24 24s-10.7 24-24 24H1263v95.5c.1 13.3-10.7 24-23.9 24zm-170.7-167.5h146.7V756.9zM775 1128.7c-79.5 0-144.1-64.6-144.1-144.1V802.4c0-79.5 64.6-144.1 144.1-144.1s144.1 64.6 144.1 144.1v182.2c0 79.5-64.6 144.1-144.1 144.1zm0-422.4c-53 0-96.1 43.1-96.1 96.1v182.2c0 53 43.1 96.1 96.1 96.1s96.1-43.1 96.1-96.1V802.4c0-53-43.1-96.1-96.1-96.1z",
    fill: "#000000",
    opacity: "1",
    dataOriginal: "#000000"
  }))));
}

/***/ }),

/***/ "./src/Pages/Settings.js":
/*!*******************************!*\
  !*** ./src/Pages/Settings.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Container.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Row.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Col.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Image.js");

// import React, { useEffect, useState } from 'react';
// import { Card, Col, Container, Row } from 'react-bootstrap';
// const useEffect = wp.element.useState;
// const useState = wp.element.useState;
// import Logo from '../assets/images/logo.svg';






const nonce = document.getElementById('nonce-field');
function Settings(props) {
  // const [option1, setOption1] = useState('');
  const [options, setOptions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [success, setSuccess] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [image, setImage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [mediaId, setMediaId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    /**
     * Initialize the options fields with the data received from the REST API
     * endpoint provided by the plugin.
     */
    wp.apiFetch({
      path: '/store_banner/v1/options'
    }).then(data => {
      let options = {};
      //Set the new values of the options in the state
      // setOption1(data['plugin_option_1'])
      // setOption2(data['plugin_option_2'])
      setOptions(data['programmelab_store_banner']);
    });
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (Object.keys(options).length) {
      setLoading(false);
    }
  }, [options]);
  const updateField = (path, value) => {
    const keys = path.split('.');
    let tempData = {
      ...options
    };
    keys.reduce((acc, key, index) => {
      if (index === keys.length - 1) {
        acc[key] = value;
      } else {
        if (!acc[key]) acc[key] = {};
        return acc[key];
      }
    }, tempData);
    setOptions(tempData);
    console.log(options);

    /*wp.apiFetch({
        path: '/store_banner/v1/options',
        method: 'POST',
        data: {
            'programmelab_store_banner': options
        },
    }).then(data => {
        console.log('Options saved successfully!');
    });*/
  };
  const handleSubmit = async event => {
    event.preventDefault();
    // console.log(options);
    wp.apiFetch({
      path: '/store_banner/v1/options',
      method: 'POST',
      data: {
        'programmelab_store_banner': options
      }
    }).then(data => {
      alert('Options saved successfully!');
    });
  };
  const ALLOWED_MEDIA_TYPES = ['image'];
  const handleSelect = (path, media) => {
    //console.log('selected media:', media);
    // setMediaId(media.id);
    // setImage(media);
    updateField(path + '.url', media.url);
    updateField(path + '.thumbnail', media.sizes.thumbnail.url);
    updateField(path + '.id', media.id);
    // setImage('');
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "settings-page-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fluid: "fluid"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content-part"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "justify-content-lg-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "col-lg-8"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settings-box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "d-flex"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nav-area"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "options-menu d-flex flex-column"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "store-banner-nav-tab nav-tab-active"
  }, "Banner"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, "Product Page")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, "Shop Page")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, "Checkout Page")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#"
  }, "Cart Page")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "mt-auto"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "store-banner-nav-tab"
  }, "Settings")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "options-area d-flex flex-column"
  }, loading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "page-loader"
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleSubmit
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "options"
  }, error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    status: "error",
    onRemove: () => setError('')
  }, error), success && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    status: "success",
    onRemove: () => setSuccess('')
  }, success), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "store-banner-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "switch-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Shop', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "description"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose a banner for the shop page that best aligns with your current marketing goals and target audience.', 'store-banner')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative switcher"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "shop_page_enable"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "shop_page_enable",
    type: "checkbox",
    value: "1",
    checked: options?._shop_page?._enable,
    onChange: event => updateField('_shop_page._enable', event.target.checked)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("em", {
    "data-on": "on",
    "data-off": "off"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "store-banner-setting-unit store-banner-setting-sub-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "col-lg-6"
  }, "Image Preview ", mediaId, " ", image?.url, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["default"], {
    src: options._shop_page._banner_internal_image.thumbnail
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
    onSelect: image => handleSelect('_shop_page._banner_internal_image', image)
    // onChange={console.log(image)}
    // onChange = {(image) => handleSelect('_shop_page._banner_internal_image', image)}
    ,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    value: mediaId,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: open
    }, "Open Media Library")
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "col-lg-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Upload from an URL', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    className: "input-control",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add the URL here', 'store-banner'),
    value: options?._shop_page?._banner_external_image?._url,
    onChange: value => updateField('_shop_page._banner_external_image._url', value)
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "col-lg-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Banner Alt Text', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    className: "input-control",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add the Alt text here', 'store-banner'),
    value: options?._shop_page?._banner_external_image?.alt,
    onChange: value => updateField('_shop_page._banner_external_image.alt', value)
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "col-lg-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "select-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select Type', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl
  // label="Size"
  , {
    className: "input-control",
    value: options?._shop_page?._banner_width,
    options: [
    //align-center, align-wide, align-full-width 
    {
      value: 'align-center',
      label: 'None'
    }, {
      value: 'align-wide',
      label: 'Wide Width'
    }, {
      value: 'align-full-width ',
      label: 'Full Width'
    }],
    onChange: value => updateField('_shop_page._banner_width', value),
    __nextHasNoMarginBottom: true
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Banner URL', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    className: "input-control",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add the Alt text here', 'store-banner'),
    value: options?._shop_page?._banner_url,
    onChange: event => updateField('_shop_page._banner_url', event.target.value)
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "store-banner-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "switch-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('All Product', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "description"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose a banner for the products page that best aligns with your current marketing goals and target audience.', 'store-banner')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative switcher"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "all_product_page_enable"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "all_product_page_enable",
    type: "checkbox",
    value: "1",
    checked: options?._all_product_page?._enable,
    onChange: event => updateField('_all_product_page._enable', event.target.checked)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("em", {
    "data-on": "on",
    "data-off": "off"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "store-banner-setting-unit store-banner-setting-sub-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "col-lg-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Upload from an URL', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    className: "input-control",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add the URL here', 'store-banner'),
    value: options?._all_product_page?._banner_external_image?._url,
    onChange: value => updateField('_all_product_page._banner_external_image._url', value)
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "col-lg-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Banner Alt Text', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    className: "input-control",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add the Alt text here', 'store-banner'),
    value: options?._all_product_page?._banner_external_image?.alt,
    onChange: value => updateField('_all_product_page._banner_external_image.alt', value)
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "col-lg-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "select-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select Type', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl
  // label="Size"
  , {
    value: options?._all_product_page?._banner_width,
    className: "input-control",
    options: [
    //align-center, align-wide, align-full-width 
    {
      value: 'align-center',
      label: 'None'
    }, {
      value: 'align-wide',
      label: 'Wide Width'
    }, {
      value: 'align-full-width ',
      label: 'Full Width'
    }],
    onChange: value => updateField('_all_product_page._banner_width', value),
    __nextHasNoMarginBottom: true
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Banner URL', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl
  // label="Size"
  , {
    className: "input-control",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add the Alt text here', 'store-banner'),
    value: options?._all_product_page?._banner_url,
    onChange: value => updateField('_all_product_page._banner_url', value)
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "store-banner-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "switch-setting-unit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Specific Product', 'store-banner')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hints-css hint--bottom",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable banner option for shop page.', 'store-banner')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-editor-help"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "description"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose a specific banner for specific products that best aligns with your current marketing goals and target audience.', 'store-banner')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "position-relative switcher"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "specific_product_enable"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "specific_product_enable",
    type: "checkbox",
    value: "1",
    checked: options?._specific_product?._enable,
    onChange: event => updateField('_specific_product._enable', event.target.checked)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("em", {
    "data-on": "on",
    "data-off": "off"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null)))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "save-button mt-auto"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isPrimary: true,
    type: "submit",
    className: "button button-primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save settings', 'store-banner')))))))))))));
}

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Col.js":
/*!*************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Col.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useCol: () => (/* binding */ useCol)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





function useCol({
  as,
  bsPrefix,
  className,
  ...props
}) {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'col');
  const breakpoints = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapBreakpoints)();
  const minBreakpoint = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapMinBreakpoint)();
  const spans = [];
  const classes = [];
  breakpoints.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let span;
    let offset;
    let order;
    if (typeof propValue === 'object' && propValue != null) {
      ({
        span,
        offset,
        order
      } = propValue);
    } else {
      span = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
    if (span) spans.push(span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`);
    if (order != null) classes.push(`order${infix}-${order}`);
    if (offset != null) classes.push(`offset${infix}-${offset}`);
  });
  return [{
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, ...spans, ...classes)
  }, {
    as,
    bsPrefix,
    spans
  }];
}
const Col = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
(props, ref) => {
  const [{
    className,
    ...colProps
  }, {
    as: Component = 'div',
    bsPrefix,
    spans
  }] = useCol(props);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ...colProps,
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, !spans.length && bsPrefix)
  });
});
Col.displayName = 'Col';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Col);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Container.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Container.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const Container = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  fluid = false,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  const prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'container');
  const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, fluid ? `${prefix}${suffix}` : prefix)
  });
});
Container.displayName = 'Container';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Container);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Image.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Image.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   propTypes: () => (/* binding */ propTypes)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






const propTypes = {
  /**
   * @default 'img'
   */
  bsPrefix: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  /**
   * Sets image as fluid image.
   */
  fluid: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  /**
   * Sets image shape as rounded.
   */
  rounded: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  /**
   * Sets image shape as circle.
   */
  roundedCircle: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool)
};
const Image = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  fluid = false,
  rounded = false,
  roundedCircle = false,
  thumbnail = false,
  ...props
}, ref) => {
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'img');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
    // eslint-disable-line jsx-a11y/alt-text
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, fluid && `${bsPrefix}-fluid`, rounded && `rounded`, roundedCircle && `rounded-circle`, thumbnail && `${bsPrefix}-thumbnail`)
  });
});
Image.displayName = 'Image';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Image);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Row.js":
/*!*************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Row.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";





const Row = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const decoratedBsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapPrefix)(bsPrefix, 'row');
  const breakpoints = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapBreakpoints)();
  const minBreakpoint = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__.useBootstrapMinBreakpoint)();
  const sizePrefix = `${decoratedBsPrefix}-cols`;
  const classes = [];
  breakpoints.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let cols;
    if (propValue != null && typeof propValue === 'object') {
      ({
        cols
      } = propValue);
    } else {
      cols = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
    if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component, {
    ref: ref,
    ...props,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, decoratedBsPrefix, ...classes)
  });
});
Row.displayName = 'Row';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Row);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ThemeProvider.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ThemeProvider.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_BREAKPOINTS: () => (/* binding */ DEFAULT_BREAKPOINTS),
/* harmony export */   DEFAULT_MIN_BREAKPOINT: () => (/* binding */ DEFAULT_MIN_BREAKPOINT),
/* harmony export */   ThemeConsumer: () => (/* binding */ Consumer),
/* harmony export */   createBootstrapComponent: () => (/* binding */ createBootstrapComponent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useBootstrapBreakpoints: () => (/* binding */ useBootstrapBreakpoints),
/* harmony export */   useBootstrapMinBreakpoint: () => (/* binding */ useBootstrapMinBreakpoint),
/* harmony export */   useBootstrapPrefix: () => (/* binding */ useBootstrapPrefix),
/* harmony export */   useIsRTL: () => (/* binding */ useIsRTL)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";




const DEFAULT_BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const DEFAULT_MIN_BREAKPOINT = 'xs';
const ThemeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS,
  minBreakpoint: DEFAULT_MIN_BREAKPOINT
});
const {
  Consumer,
  Provider
} = ThemeContext;
function ThemeProvider({
  prefixes = {},
  breakpoints = DEFAULT_BREAKPOINTS,
  minBreakpoint = DEFAULT_MIN_BREAKPOINT,
  dir,
  children
}) {
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    prefixes: {
      ...prefixes
    },
    breakpoints,
    minBreakpoint,
    dir
  }), [prefixes, breakpoints, minBreakpoint, dir]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Provider, {
    value: contextValue,
    children: children
  });
}
function useBootstrapPrefix(prefix, defaultPrefix) {
  const {
    prefixes
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}
function useBootstrapBreakpoints() {
  const {
    breakpoints
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
  return breakpoints;
}
function useBootstrapMinBreakpoint() {
  const {
    minBreakpoint
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
  return minBreakpoint;
}
function useIsRTL() {
  const {
    dir
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
  return dir === 'rtl';
}
function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const {
    prefix,
    forwardRefAs = isClassy ? 'ref' : 'innerRef'
  } = opts;
  const Wrapped = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
    ...props
  }, ref) => {
    props[forwardRefAs] = ref;
    const bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Component, {
      ...props,
      bsPrefix: bsPrefix
    });
  });
  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeProvider);

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-router-dom/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-router-dom/dist/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbortedDeferredError: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.AbortedDeferredError),
/* harmony export */   Await: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Await),
/* harmony export */   BrowserRouter: () => (/* binding */ BrowserRouter),
/* harmony export */   Form: () => (/* binding */ Form),
/* harmony export */   HashRouter: () => (/* binding */ HashRouter),
/* harmony export */   Link: () => (/* binding */ Link),
/* harmony export */   MemoryRouter: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.MemoryRouter),
/* harmony export */   NavLink: () => (/* binding */ NavLink),
/* harmony export */   Navigate: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Navigate),
/* harmony export */   NavigationType: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Action),
/* harmony export */   Outlet: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Outlet),
/* harmony export */   Route: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Route),
/* harmony export */   Router: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Router),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider),
/* harmony export */   Routes: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Routes),
/* harmony export */   ScrollRestoration: () => (/* binding */ ScrollRestoration),
/* harmony export */   UNSAFE_DataRouterContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterContext),
/* harmony export */   UNSAFE_DataRouterStateContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterStateContext),
/* harmony export */   UNSAFE_ErrorResponseImpl: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_ErrorResponseImpl),
/* harmony export */   UNSAFE_FetchersContext: () => (/* binding */ FetchersContext),
/* harmony export */   UNSAFE_LocationContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_LocationContext),
/* harmony export */   UNSAFE_NavigationContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext),
/* harmony export */   UNSAFE_RouteContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_RouteContext),
/* harmony export */   UNSAFE_ViewTransitionContext: () => (/* binding */ ViewTransitionContext),
/* harmony export */   UNSAFE_useRouteId: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_useRouteId),
/* harmony export */   UNSAFE_useScrollRestoration: () => (/* binding */ useScrollRestoration),
/* harmony export */   createBrowserRouter: () => (/* binding */ createBrowserRouter),
/* harmony export */   createHashRouter: () => (/* binding */ createHashRouter),
/* harmony export */   createMemoryRouter: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.createMemoryRouter),
/* harmony export */   createPath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createPath),
/* harmony export */   createRoutesFromChildren: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.createRoutesFromChildren),
/* harmony export */   createRoutesFromElements: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.createRoutesFromElements),
/* harmony export */   createSearchParams: () => (/* binding */ createSearchParams),
/* harmony export */   defer: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.defer),
/* harmony export */   generatePath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.generatePath),
/* harmony export */   isRouteErrorResponse: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.isRouteErrorResponse),
/* harmony export */   json: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.json),
/* harmony export */   matchPath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.matchPath),
/* harmony export */   matchRoutes: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.matchRoutes),
/* harmony export */   parsePath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.parsePath),
/* harmony export */   redirect: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.redirect),
/* harmony export */   redirectDocument: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.redirectDocument),
/* harmony export */   renderMatches: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.renderMatches),
/* harmony export */   resolvePath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.resolvePath),
/* harmony export */   unstable_HistoryRouter: () => (/* binding */ HistoryRouter),
/* harmony export */   unstable_usePrompt: () => (/* binding */ usePrompt),
/* harmony export */   unstable_useViewTransitionState: () => (/* binding */ useViewTransitionState),
/* harmony export */   useActionData: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useActionData),
/* harmony export */   useAsyncError: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useAsyncError),
/* harmony export */   useAsyncValue: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useAsyncValue),
/* harmony export */   useBeforeUnload: () => (/* binding */ useBeforeUnload),
/* harmony export */   useBlocker: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useBlocker),
/* harmony export */   useFetcher: () => (/* binding */ useFetcher),
/* harmony export */   useFetchers: () => (/* binding */ useFetchers),
/* harmony export */   useFormAction: () => (/* binding */ useFormAction),
/* harmony export */   useHref: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useHref),
/* harmony export */   useInRouterContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useInRouterContext),
/* harmony export */   useLinkClickHandler: () => (/* binding */ useLinkClickHandler),
/* harmony export */   useLoaderData: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useLoaderData),
/* harmony export */   useLocation: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation),
/* harmony export */   useMatch: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useMatch),
/* harmony export */   useMatches: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useMatches),
/* harmony export */   useNavigate: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigate),
/* harmony export */   useNavigation: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigation),
/* harmony export */   useNavigationType: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigationType),
/* harmony export */   useOutlet: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useOutlet),
/* harmony export */   useOutletContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useOutletContext),
/* harmony export */   useParams: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useParams),
/* harmony export */   useResolvedPath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath),
/* harmony export */   useRevalidator: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useRevalidator),
/* harmony export */   useRouteError: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useRouteError),
/* harmony export */   useRouteLoaderData: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useRouteLoaderData),
/* harmony export */   useRoutes: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useRoutes),
/* harmony export */   useSearchParams: () => (/* binding */ useSearchParams),
/* harmony export */   useSubmit: () => (/* binding */ useSubmit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @remix-run/router */ "./node_modules/@remix-run/router/dist/router.js");
/**
 * React Router DOM v6.24.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */







function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && (
  // Ignore everything but left clicks
  !target || target === "_self") &&
  // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event) // Ignore clicks with modifier keys
  ;
}
/**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */
function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }
  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    // Use `defaultSearchParams.forEach(...)` here instead of iterating of
    // `defaultSearchParams.keys()` to work-around a bug in Firefox related to
    // web extensions. Relevant Bugzilla tickets:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1414602
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1023984
    defaultSearchParams.forEach((_, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach(value => {
          searchParams.append(key, value);
        });
      }
    });
  }
  return searchParams;
}
// One-time check for submitter support
let _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(document.createElement("form"),
      // @ts-expect-error if FormData supports the submitter parameter, this will throw
      0);
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
const supportedFormEncTypes = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
     true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(false, "\"" + encType + "\" is not a valid `encType` for `<Form>`/`<fetcher.Form>` " + ("and will default to \"" + defaultEncType + "\"")) : 0;
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    // When grabbing the action from the element, it will have had the basename
    // prefixed to ensure non-JS scenarios work, so strip it since we'll
    // re-prefix in the router
    let attr = target.getAttribute("action");
    action = attr ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
    }
    // <button>/<input type="submit"> may override attributes of <form>
    // When grabbing the action from the element, it will have had the basename
    // prefixed to ensure non-JS scenarios work, so strip it since we'll
    // re-prefix in the router
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    // Build a FormData object populated from a form and submitter
    formData = new FormData(form, target);
    // If this browser doesn't support the `FormData(el, submitter)` format,
    // then tack on the submitter value at the end.  This is a lightweight
    // solution that is not 100% spec compliant.  For complete support in older
    // browsers, consider using the `formdata-submitter-polyfill` package
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0");
        formData.append(prefix + "y", "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error("Cannot submit element that is not <form>, <button>, or " + "<input type=\"submit|image\">");
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  // Send body for <Form encType="text/plain" so we encode it into text
  if (formData && encType === "text/plain") {
    body = formData;
    formData = undefined;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}

const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "unstable_viewTransition"],
  _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "unstable_viewTransition", "children"],
  _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "unstable_viewTransition"];
// HEY YOU! DON'T TOUCH THIS VARIABLE!
//
// It is replaced with the proper version at build time via a babel plugin in
// the rollup config.
//
// Export a global property onto the window for React Router detection by the
// Core Web Vitals Technology Report.  This way they can configure the `wappalyzer`
// to detect and properly classify live websites as being built with React Router:
// https://github.com/HTTPArchive/wappalyzer/blob/main/src/technologies/r.json
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
  // no-op
}
function createBrowserRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createBrowserHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties: react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_mapRouteProperties,
    unstable_dataStrategy: opts == null ? void 0 : opts.unstable_dataStrategy,
    unstable_patchRoutesOnMiss: opts == null ? void 0 : opts.unstable_patchRoutesOnMiss,
    window: opts == null ? void 0 : opts.window
  }).initialize();
}
function createHashRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createHashHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties: react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_mapRouteProperties,
    unstable_dataStrategy: opts == null ? void 0 : opts.unstable_dataStrategy,
    unstable_patchRoutesOnMiss: opts == null ? void 0 : opts.unstable_patchRoutesOnMiss,
    window: opts == null ? void 0 : opts.window
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  if (state && state.errors) {
    state = _extends({}, state, {
      errors: deserializeErrors(state.errors)
    });
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    // Hey you!  If you change this, please change the corresponding logic in
    // serializeErrors in react-router-dom/server.tsx :)
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
    } else if (val && val.__type === "Error") {
      // Attempt to reconstruct the right type of Error (i.e., ReferenceError)
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            // @ts-expect-error
            let error = new ErrorConstructor(val.message);
            // Wipe away the client-side stack trace.  Nothing to fill it in with
            // because we don't serialize SSR stack traces for security reasons
            error.stack = "";
            serialized[key] = error;
          } catch (e) {
            // no-op - fall through and create a normal Error
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        // Wipe away the client-side stack trace.  Nothing to fill it in with
        // because we don't serialize SSR stack traces for security reasons
        error.stack = "";
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
const ViewTransitionContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  isTransitioning: false
});
if (true) {
  ViewTransitionContext.displayName = "ViewTransition";
}
const FetchersContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(new Map());
if (true) {
  FetchersContext.displayName = "Fetchers";
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Components
////////////////////////////////////////////////////////////////////////////////
/**
  Webpack + React 17 fails to compile on any of the following because webpack
  complains that `startTransition` doesn't exist in `React`:
  * import { startTransition } from "react"
  * import * as React from from "react";
    "startTransition" in React ? React.startTransition(() => setState()) : setState()
  * import * as React from from "react";
    "startTransition" in React ? React["startTransition"](() => setState()) : setState()

  Moving it to a constant such as the following solves the Webpack/React 17 issue:
  * import * as React from from "react";
    const START_TRANSITION = "startTransition";
    START_TRANSITION in React ? React[START_TRANSITION](() => setState()) : setState()

  However, that introduces webpack/terser minification issues in production builds
  in React 18 where minification/obfuscation ends up removing the call of
  React.startTransition entirely from the first half of the ternary.  Grabbing
  this exported reference once up front resolves that issue.

  See https://github.com/remix-run/react-router/issues/10579
*/
const START_TRANSITION = "startTransition";
const startTransitionImpl = react__WEBPACK_IMPORTED_MODULE_0__[START_TRANSITION];
const FLUSH_SYNC = "flushSync";
const flushSyncImpl = react_dom__WEBPACK_IMPORTED_MODULE_1__[FLUSH_SYNC];
const USE_ID = "useId";
const useIdImpl = react__WEBPACK_IMPORTED_MODULE_0__[USE_ID];
function startTransitionSafe(cb) {
  if (startTransitionImpl) {
    startTransitionImpl(cb);
  } else {
    cb();
  }
}
function flushSyncSafe(cb) {
  if (flushSyncImpl) {
    flushSyncImpl(cb);
  } else {
    cb();
  }
}
class Deferred {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = value => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = reason => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
}
/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router,
    future
  } = _ref;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(router.state);
  let [pendingState, setPendingState] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [vtContext, setVtContext] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [transition, setTransition] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [interruption, setInterruption] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useRef(new Map());
  let {
    v7_startTransition
  } = future || {};
  let optInStartTransition = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cb => {
    if (v7_startTransition) {
      startTransitionSafe(cb);
    } else {
      cb();
    }
  }, [v7_startTransition]);
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((newState, _ref2) => {
    let {
      deletedFetchers,
      unstable_flushSync: flushSync,
      unstable_viewTransitionOpts: viewTransitionOpts
    } = _ref2;
    deletedFetchers.forEach(key => fetcherData.current.delete(key));
    newState.fetchers.forEach((fetcher, key) => {
      if (fetcher.data !== undefined) {
        fetcherData.current.set(key, fetcher.data);
      }
    });
    let isViewTransitionUnavailable = router.window == null || router.window.document == null || typeof router.window.document.startViewTransition !== "function";
    // If this isn't a view transition or it's not available in this browser,
    // just update and be done with it
    if (!viewTransitionOpts || isViewTransitionUnavailable) {
      if (flushSync) {
        flushSyncSafe(() => setStateImpl(newState));
      } else {
        optInStartTransition(() => setStateImpl(newState));
      }
      return;
    }
    // flushSync + startViewTransition
    if (flushSync) {
      // Flush through the context to mark DOM elements as transition=ing
      flushSyncSafe(() => {
        // Cancel any pending transitions
        if (transition) {
          renderDfd && renderDfd.resolve();
          transition.skipTransition();
        }
        setVtContext({
          isTransitioning: true,
          flushSync: true,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      });
      // Update the DOM
      let t = router.window.document.startViewTransition(() => {
        flushSyncSafe(() => setStateImpl(newState));
      });
      // Clean up after the animation completes
      t.finished.finally(() => {
        flushSyncSafe(() => {
          setRenderDfd(undefined);
          setTransition(undefined);
          setPendingState(undefined);
          setVtContext({
            isTransitioning: false
          });
        });
      });
      flushSyncSafe(() => setTransition(t));
      return;
    }
    // startTransition + startViewTransition
    if (transition) {
      // Interrupting an in-progress transition, cancel and let everything flush
      // out, and then kick off a new transition from the interruption state
      renderDfd && renderDfd.resolve();
      transition.skipTransition();
      setInterruption({
        state: newState,
        currentLocation: viewTransitionOpts.currentLocation,
        nextLocation: viewTransitionOpts.nextLocation
      });
    } else {
      // Completed navigation update with opted-in view transitions, let 'er rip
      setPendingState(newState);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: viewTransitionOpts.currentLocation,
        nextLocation: viewTransitionOpts.nextLocation
      });
    }
  }, [router.window, transition, renderDfd, fetcherData, optInStartTransition]);
  // Need to use a layout effect here so we are subscribed early enough to
  // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  // When we start a view transition, create a Deferred we can use for the
  // eventual "completed" render
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  // Once the deferred is created, kick off startViewTransition() to update the
  // DOM and then wait on the Deferred to resolve (indicating the DOM update has
  // happened)
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && router.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition = router.window.document.startViewTransition(async () => {
        optInStartTransition(() => setStateImpl(newState));
        await renderPromise;
      });
      transition.finished.finally(() => {
        setRenderDfd(undefined);
        setTransition(undefined);
        setPendingState(undefined);
        setVtContext({
          isTransitioning: false
        });
      });
      setTransition(transition);
    }
  }, [optInStartTransition, pendingState, renderDfd, router.window]);
  // When the new location finally renders and is committed to the DOM, this
  // effect will run to resolve the transition
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  // If we get interrupted with a new navigation during a transition, we skip
  // the active transition, let it cleanup, then kick it off again here
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(undefined);
    }
  }, [vtContext.isTransitioning, interruption]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
     true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(fallbackElement == null || !router.future.v7_partialHydration, "`<RouterProvider fallbackElement>` is deprecated when using " + "`v7_partialHydration`, use a `HydrateFallback` component instead") : 0;
    // Only log this once on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let navigator = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: n => router.navigate(n),
      push: (to, state, opts) => router.navigate(to, {
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state, opts) => router.navigate(to, {
        replace: true,
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    router,
    navigator,
    static: false,
    basename
  }), [router, navigator, basename]);
  // The fragment and {null} here are important!  We need them to keep React 18's
  // useId happy when we are server-rendering since we may have a <script> here
  // containing the hydrated server-side staticContext (from StaticRouterProvider).
  // useId relies on the component tree structure to generate deterministic id's
  // so we need to ensure it remains the same on the client even though
  // we don't need the <script> tag
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterContext.Provider, {
    value: dataRouterContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FetchersContext.Provider, {
    value: fetcherData.current
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewTransitionContext.Provider, {
    value: vtContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Router, {
    basename: basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: navigator,
    future: {
      v7_relativeSplatPath: router.future.v7_relativeSplatPath
    }
  }, state.initialized || router.future.v7_partialHydration ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRoutes, {
    routes: router.routes,
    future: router.future,
    state: state
  }) : fallbackElement))))), null);
}
function DataRoutes(_ref3) {
  let {
    routes,
    future,
    state
  } = _ref3;
  return (0,react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_useRoutesImpl)(routes, undefined, state, future);
}
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window
  } = _ref4;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createBrowserHistory)({
      window,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future: future
  });
}
/**
 * A `<Router>` for use in web browsers. Stores the location in the hash
 * portion of the URL so it is not sent to the server.
 */
function HashRouter(_ref5) {
  let {
    basename,
    children,
    future,
    window
  } = _ref5;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createHashHistory)({
      window,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future: future
  });
}
/**
 * A `<Router>` that accepts a pre-instantiated history object. It's important
 * to note that using your own history object is highly discouraged and may add
 * two versions of the history library to your bundles unless you use the same
 * version of the history library that React Router uses internally.
 */
function HistoryRouter(_ref6) {
  let {
    basename,
    children,
    future,
    history
  } = _ref6;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future: future
  });
}
if (true) {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
/**
 * The public API for rendering a history-aware `<a>`.
 */
const Link = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
      onClick,
      relative,
      reloadDocument,
      replace,
      state,
      target,
      to,
      preventScrollReset,
      unstable_viewTransition
    } = _ref7,
    rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  // Rendered into <a href> for absolute URLs
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    // Render the absolute href server- and client-side
    absoluteHref = to;
    // Only check for external origins client-side
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          // Strip the protocol/origin/basename for same-origin absolute URLs
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        // We can't do external URL detection without a valid URL
         true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(false, "<Link to=\"" + to + "\"> contains an invalid URL which will probably break " + "when clicked - please update to a valid URL path.") : 0;
      }
    }
  }
  // Rendered into <a href> for relative URLs
  let href = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useHref)(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative,
    unstable_viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref: ref,
      target: target
    }))
  );
});
if (true) {
  Link.displayName = "Link";
}
/**
 * A `<Link>` wrapper that knows if it's "active" or not.
 */
const NavLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function NavLinkWithRef(_ref8, ref) {
  let {
      "aria-current": ariaCurrentProp = "page",
      caseSensitive = false,
      className: classNameProp = "",
      end = false,
      style: styleProp,
      to,
      unstable_viewTransition,
      children
    } = _ref8,
    rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath)(to, {
    relative: rest.relative
  });
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  let routerState = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterStateContext);
  let {
    navigator,
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  let isTransitioning = routerState != null &&
  // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && unstable_viewTransition === true;
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(nextLocationPathname, basename) || nextLocationPathname;
  }
  // If the `to` has a trailing slash, look at that exact spot.  Otherwise,
  // we're looking for a slash _after_ what's in `to`.  For example:
  //
  // <NavLink to="/users"> and <NavLink to="/users/">
  // both want to look for a / at index 6 to match URL `/users/matt`
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : undefined;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    // If the className prop is not a function, we use a default `active`
    // class for <NavLink />s that are active. In v5 `active` was the default
    // value for `activeClassName`, but we are removing that API and can still
    // use the old default behavior for a cleaner upgrade path and keep the
    // simple styling rules working as they currently do.
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className: className,
    ref: ref,
    style: style,
    to: to,
    unstable_viewTransition: unstable_viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
if (true) {
  NavLink.displayName = "NavLink";
}
/**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */
const Form = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref9, forwardedRef) => {
  let {
      fetcherKey,
      navigate,
      reloadDocument,
      replace,
      state,
      method = defaultMethod,
      action,
      onSubmit,
      relative,
      preventScrollReset,
      unstable_viewTransition
    } = _ref9,
    props = _objectWithoutPropertiesLoose(_ref9, _excluded3);
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let submitHandler = event => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace,
      state,
      relative,
      preventScrollReset,
      unstable_viewTransition
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", _extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
if (true) {
  Form.displayName = "Form";
}
/**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 */
function ScrollRestoration(_ref10) {
  let {
    getKey,
    storageKey
  } = _ref10;
  useScrollRestoration({
    getKey,
    storageKey
  });
  return null;
}
if (true) {
  ScrollRestoration.displayName = "ScrollRestoration";
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Hooks
////////////////////////////////////////////////////////////////////////////////
var DataRouterHook;
(function (DataRouterHook) {
  DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook["UseSubmit"] = "useSubmit";
  DataRouterHook["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook["UseFetcher"] = "useFetcher";
  DataRouterHook["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function (DataRouterStateHook) {
  DataRouterStateHook["UseFetcher"] = "useFetcher";
  DataRouterStateHook["UseFetchers"] = "useFetchers";
  DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
// Internal hooks
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterContext);
  !ctx ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterStateContext);
  !state ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return state;
}
// External hooks
/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    unstable_viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath)(to, {
    relative
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(event => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here unless the replace prop is explicitly set
      let replace = replaceProp !== undefined ? replaceProp : (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createPath)(location) === (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createPath)(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative,
        unstable_viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, unstable_viewTransition]);
}
/**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */
function useSearchParams(defaultInit) {
   true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not " + "support the URLSearchParams API. If you need to support Internet " + "Explorer 11, we recommend you load a polyfill such as " + "https://github.com/ungap/url-search-params\n\n" + "If you're unsure how to load polyfills, we recommend you check out " + "https://polyfill.io/v3/ which provides some recommendations about how " + "to load polyfills only for users that need them, instead of for every " + "user.") : 0;
  let defaultSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  let searchParams = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() =>
  // Only merge in the defaults if we haven't yet called setSearchParams.
  // Once we call that we want those to take precedence, otherwise you can't
  // remove a param with setSearchParams({}) if it has an initial value
  getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
  let setSearchParams = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((nextInit, navigateOptions) => {
    const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = true;
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
function validateClientSideSubmission() {
  if (typeof document === "undefined") {
    throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
  }
}
let fetcherId = 0;
let getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
/**
 * Returns a function that may be used to programmatically submit a form (or
 * some arbitrary data) to the server.
 */
function useSubmit() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseSubmit);
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  let currentRouteId = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_useRouteId)();
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (target, options) {
    if (options === void 0) {
      options = {};
    }
    validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        unstable_flushSync: options.unstable_flushSync
      });
    } else {
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        unstable_flushSync: options.unstable_flushSync,
        unstable_viewTransition: options.unstable_viewTransition
      });
    }
  }, [router, basename, currentRouteId]);
}
// v7: Eventually we should deprecate this entirely in favor of using the
// router method directly?
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  let routeContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_RouteContext);
  !routeContext ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "useFormAction must be used inside a RouteContext") : 0 : void 0;
  let [match] = routeContext.matches.slice(-1);
  // Shallow clone path so we can modify it below, otherwise we modify the
  // object referenced by useMemo inside useResolvedPath
  let path = _extends({}, (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath)(action ? action : ".", {
    relative
  }));
  // If no action was specified, browsers will persist current search params
  // when determining the path, so match that behavior
  // https://github.com/remix-run/remix/issues/927
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  if (action == null) {
    // Safe to write to this directly here since if action was undefined, we
    // would have called useResolvedPath(".") which will never include a search
    path.search = location.search;
    // When grabbing search params from the URL, remove any included ?index param
    // since it might not apply to our contextual route.  We add it back based
    // on match.route.index below
    let params = new URLSearchParams(path.search);
    if (params.has("index") && params.get("index") === "") {
      params.delete("index");
      path.search = params.toString() ? "?" + params.toString() : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  // If we're operating within a basename, prepend it to the pathname prior
  // to creating the form action.  If this is a root navigation, then just use
  // the raw basename which allows the basename to have full control over the
  // presence of a trailing slash on root actions
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : (0,react_router__WEBPACK_IMPORTED_MODULE_2__.joinPaths)([basename, path.pathname]);
  }
  return (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createPath)(path);
}
// TODO: (v7) Change the useFetcher generic default from `any` to `unknown`
/**
 * Interacts with route loaders and actions without causing a navigation. Great
 * for any interaction that stays on the same page.
 */
function useFetcher(_temp3) {
  var _route$matches;
  let {
    key
  } = _temp3 === void 0 ? {} : _temp3;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseFetcher);
  let state = useDataRouterState(DataRouterStateHook.UseFetcher);
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FetchersContext);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_RouteContext);
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  !fetcherData ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "useFetcher must be used inside a FetchersContext") : 0 : void 0;
  !route ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "useFetcher must be used inside a RouteContext") : 0 : void 0;
  !(routeId != null) ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "useFetcher can only be used on routes that contain a unique \"id\"") : 0 : void 0;
  // Fetcher key handling
  // OK to call conditionally to feature detect `useId`
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let defaultKey = useIdImpl ? useIdImpl() : "";
  let [fetcherKey, setFetcherKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(key || defaultKey);
  if (key && key !== fetcherKey) {
    setFetcherKey(key);
  } else if (!fetcherKey) {
    // We will only fall through here when `useId` is not available
    setFetcherKey(getUniqueFetcherId());
  }
  // Registration/cleanup
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    router.getFetcher(fetcherKey);
    return () => {
      // Tell the router we've unmounted - if v7_fetcherPersist is enabled this
      // will not delete immediately but instead queue up a delete after the
      // fetcher returns to an `idle` state
      router.deleteFetcher(fetcherKey);
    };
  }, [router, fetcherKey]);
  // Fetcher additions
  let load = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((href, opts) => {
    !routeId ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "No routeId available for fetcher.load()") : 0 : void 0;
    router.fetch(fetcherKey, routeId, href, opts);
  }, [fetcherKey, routeId, router]);
  let submitImpl = useSubmit();
  let submit = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((target, opts) => {
    submitImpl(target, _extends({}, opts, {
      navigate: false,
      fetcherKey
    }));
  }, [fetcherKey, submitImpl]);
  let FetcherForm = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let FetcherForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Form, _extends({}, props, {
        navigate: false,
        fetcherKey: fetcherKey,
        ref: ref
      }));
    });
    if (true) {
      FetcherForm.displayName = "fetcher.Form";
    }
    return FetcherForm;
  }, [fetcherKey]);
  // Exposed FetcherWithComponents
  let fetcher = state.fetchers.get(fetcherKey) || react_router__WEBPACK_IMPORTED_MODULE_2__.IDLE_FETCHER;
  let data = fetcherData.get(fetcherKey);
  let fetcherWithComponents = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => _extends({
    Form: FetcherForm,
    submit,
    load
  }, fetcher, {
    data
  }), [FetcherForm, submit, load, fetcher, data]);
  return fetcherWithComponents;
}
/**
 * Provides all fetchers currently on the page. Useful for layouts and parent
 * routes that need to provide pending/optimistic UI regarding the fetch.
 */
function useFetchers() {
  let state = useDataRouterState(DataRouterStateHook.UseFetchers);
  return Array.from(state.fetchers.entries()).map(_ref11 => {
    let [key, fetcher] = _ref11;
    return _extends({}, fetcher, {
      key
    });
  });
}
const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
let savedScrollPositions = {};
/**
 * When rendered inside a RouterProvider, will restore scroll positions on navigations
 */
function useScrollRestoration(_temp4) {
  let {
    getKey,
    storageKey
  } = _temp4 === void 0 ? {} : _temp4;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseScrollRestoration);
  let {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  let matches = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useMatches)();
  let navigation = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigation)();
  // Trigger manual scroll restoration while we're active
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  // Save positions on pagehide
  usePageHide(react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    try {
      sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    } catch (error) {
       true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(false, "Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (" + error + ").") : 0;
    }
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches]));
  // Read in any saved scroll locations
  if (typeof document !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
        // no-op, use default empty object
      }
    }, [storageKey]);
    // Enable scroll restoration in the router
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      let getKeyWithoutBasename = getKey && basename !== "/" ? (location, matches) => getKey( // Strip the basename to match useLocation()
      _extends({}, location, {
        pathname: (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(location.pathname, basename) || location.pathname
      }), matches) : getKey;
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename, getKey]);
    // Restore scrolling when state.restoreScrollPosition changes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      // Explicit false means don't do anything (used for submissions)
      if (restoreScrollPosition === false) {
        return;
      }
      // been here before, scroll to it
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      // try to scroll to the hash
      if (location.hash) {
        let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      // Don't reset if this navigation opted out
      if (preventScrollReset === true) {
        return;
      }
      // otherwise go to the top on new locations
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
/**
 * Setup a callback to be fired on the window's `beforeunload` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */
function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Setup a callback to be fired on the window's `pagehide` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.  This event is better supported than beforeunload across browsers.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */
function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Wrapper around useBlocker to show a window.confirm prompt to users instead
 * of building a custom UI with useBlocker.
 *
 * Warning: This has *a lot of rough edges* and behaves very differently (and
 * very incorrectly in some cases) across browsers if user click addition
 * back/forward navigations while the confirm is open.  Use at your own risk.
 */
function usePrompt(_ref12) {
  let {
    when,
    message
  } = _ref12;
  let blocker = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useBlocker)(when);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);
      if (proceed) {
        // This timeout is needed to avoid a weird "race" on POP navigations
        // between the `window.history` revert navigation and the result of
        // `window.confirm`
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
}
/**
 * Return a boolean indicating if there is an active view transition to the
 * given href.  You can use this value to render CSS classes or viewTransitionName
 * styles onto your elements
 *
 * @param href The destination href
 * @param [opts.relative] Relative routing type ("route" | "path")
 */
function useViewTransitionState(to, opts) {
  if (opts === void 0) {
    opts = {};
  }
  let vtContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ViewTransitionContext);
  !(vtContext != null) ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "`unstable_useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  " + "Did you accidentally import `RouterProvider` from `react-router`?") : 0 : void 0;
  let {
    basename
  } = useDataRouterContext(DataRouterHook.useViewTransitionState);
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath)(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  // Transition is active if we're going to or coming from the indicated
  // destination.  This ensures that other PUSH navigations that reverse
  // an indicated transition apply.  I.e., on the list view you have:
  //
  //   <NavLink to="/details/1" unstable_viewTransition>
  //
  // If you click the breadcrumb back to the list view:
  //
  //   <NavLink to="/list" unstable_viewTransition>
  //
  // We should apply the transition because it's indicated as active going
  // from /list -> /details/1 and therefore should be active on the reverse
  // (even though this isn't strictly a POP reverse)
  return (0,react_router__WEBPACK_IMPORTED_MODULE_2__.matchPath)(path.pathname, nextPath) != null || (0,react_router__WEBPACK_IMPORTED_MODULE_2__.matchPath)(path.pathname, currentPath) != null;
}
//#endregion


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/react-router/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/react-router/dist/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbortedDeferredError: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError),
/* harmony export */   Await: () => (/* binding */ Await),
/* harmony export */   MemoryRouter: () => (/* binding */ MemoryRouter),
/* harmony export */   Navigate: () => (/* binding */ Navigate),
/* harmony export */   NavigationType: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action),
/* harmony export */   Outlet: () => (/* binding */ Outlet),
/* harmony export */   Route: () => (/* binding */ Route),
/* harmony export */   Router: () => (/* binding */ Router),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider),
/* harmony export */   Routes: () => (/* binding */ Routes),
/* harmony export */   UNSAFE_DataRouterContext: () => (/* binding */ DataRouterContext),
/* harmony export */   UNSAFE_DataRouterStateContext: () => (/* binding */ DataRouterStateContext),
/* harmony export */   UNSAFE_LocationContext: () => (/* binding */ LocationContext),
/* harmony export */   UNSAFE_NavigationContext: () => (/* binding */ NavigationContext),
/* harmony export */   UNSAFE_RouteContext: () => (/* binding */ RouteContext),
/* harmony export */   UNSAFE_mapRouteProperties: () => (/* binding */ mapRouteProperties),
/* harmony export */   UNSAFE_useRouteId: () => (/* binding */ useRouteId),
/* harmony export */   UNSAFE_useRoutesImpl: () => (/* binding */ useRoutesImpl),
/* harmony export */   createMemoryRouter: () => (/* binding */ createMemoryRouter),
/* harmony export */   createPath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createPath),
/* harmony export */   createRoutesFromChildren: () => (/* binding */ createRoutesFromChildren),
/* harmony export */   createRoutesFromElements: () => (/* binding */ createRoutesFromChildren),
/* harmony export */   defer: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.defer),
/* harmony export */   generatePath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.generatePath),
/* harmony export */   isRouteErrorResponse: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse),
/* harmony export */   json: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.json),
/* harmony export */   matchPath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchPath),
/* harmony export */   matchRoutes: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes),
/* harmony export */   parsePath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath),
/* harmony export */   redirect: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.redirect),
/* harmony export */   redirectDocument: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.redirectDocument),
/* harmony export */   renderMatches: () => (/* binding */ renderMatches),
/* harmony export */   resolvePath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolvePath),
/* harmony export */   useActionData: () => (/* binding */ useActionData),
/* harmony export */   useAsyncError: () => (/* binding */ useAsyncError),
/* harmony export */   useAsyncValue: () => (/* binding */ useAsyncValue),
/* harmony export */   useBlocker: () => (/* binding */ useBlocker),
/* harmony export */   useHref: () => (/* binding */ useHref),
/* harmony export */   useInRouterContext: () => (/* binding */ useInRouterContext),
/* harmony export */   useLoaderData: () => (/* binding */ useLoaderData),
/* harmony export */   useLocation: () => (/* binding */ useLocation),
/* harmony export */   useMatch: () => (/* binding */ useMatch),
/* harmony export */   useMatches: () => (/* binding */ useMatches),
/* harmony export */   useNavigate: () => (/* binding */ useNavigate),
/* harmony export */   useNavigation: () => (/* binding */ useNavigation),
/* harmony export */   useNavigationType: () => (/* binding */ useNavigationType),
/* harmony export */   useOutlet: () => (/* binding */ useOutlet),
/* harmony export */   useOutletContext: () => (/* binding */ useOutletContext),
/* harmony export */   useParams: () => (/* binding */ useParams),
/* harmony export */   useResolvedPath: () => (/* binding */ useResolvedPath),
/* harmony export */   useRevalidator: () => (/* binding */ useRevalidator),
/* harmony export */   useRouteError: () => (/* binding */ useRouteError),
/* harmony export */   useRouteLoaderData: () => (/* binding */ useRouteLoaderData),
/* harmony export */   useRoutes: () => (/* binding */ useRoutes)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _remix_run_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @remix-run/router */ "./node_modules/@remix-run/router/dist/router.js");
/**
 * React Router v6.24.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */




function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// Create react-specific types from the agnostic types in @remix-run/router to
// export from react-router
const DataRouterContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  DataRouterContext.displayName = "DataRouter";
}
const DataRouterStateContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  DataRouterStateContext.displayName = "DataRouterState";
}
const AwaitContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  AwaitContext.displayName = "Await";
}

/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level `<Router>` API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */

const NavigationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  NavigationContext.displayName = "Navigation";
}
const LocationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  LocationContext.displayName = "Location";
}
const RouteContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
if (true) {
  RouteContext.displayName = "Route";
}
const RouteErrorContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  RouteErrorContext.displayName = "RouteError";
}

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/hooks/use-href
 */
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useHref() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    basename,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;

  // If we're operating within a basename, prepend it to the pathname prior
  // to creating the href.  If this is a root navigation, then just use the raw
  // basename which allows the basename to have full control over the presence
  // of a trailing slash on root links
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}

/**
 * Returns true if this component is a descendant of a `<Router>`.
 *
 * @see https://reactrouter.com/hooks/use-in-router-context
 */
function useInRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext) != null;
}

/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/hooks/use-location
 */
function useLocation() {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useLocation() may be used only in the context of a <Router> component.") : 0 : void 0;
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).location;
}

/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/hooks/use-navigation-type
 */
function useNavigationType() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).navigationType;
}

/**
 * Returns a PathMatch object if the given pattern matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * `<NavLink>`.
 *
 * @see https://reactrouter.com/hooks/use-match
 */
function useMatch(pattern) {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useMatch() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    pathname
  } = useLocation();
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchPath)(pattern, pathname), [pathname, pattern]);
}

/**
 * The interface for the navigate() function returned from useNavigate().
 */

const navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when " + "your component is first rendered.";

// Mute warnings for calls to useNavigate in SSR environments
function useIsomorphicLayoutEffect(cb) {
  let isStatic = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext).static;
  if (!isStatic) {
    // We should be able to get rid of this once react 18.3 is released
    // See: https://github.com/facebook/react/pull/26395
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(cb);
  }
}

/**
 * Returns an imperative method for changing the location. Used by `<Link>`s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/hooks/use-navigate
 */
function useNavigate() {
  let {
    isDataRoute
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useNavigate() may be used only in the context of a <Router> component.") : 0 : void 0;
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getResolveToMatches)(matches, future.v7_relativeSplatPath));
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(activeRef.current, navigateEffectWarning) : 0;

    // Short circuit here since if this happens on first render the navigate
    // is useless because we haven't wired up our history listener yet
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");

    // If we're operating within a basename, prepend it to the pathname prior
    // to handing off to history (but only if we're not in a data router,
    // otherwise it'll prepend the basename inside of the router).
    // If this is a root navigation, then we navigate to the raw basename
    // which allows the basename to have full control over the presence of a
    // trailing slash on root links
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
const OutletContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/hooks/use-outlet-context
 */
function useOutletContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(OutletContext);
}

/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by `<Outlet>` to render child routes.
 *
 * @see https://reactrouter.com/hooks/use-outlet
 */
function useOutlet(context) {
  let outlet = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext).outlet;
  if (outlet) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }
  return outlet;
}

/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/hooks/use-params
 */
function useParams() {
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}

/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/hooks/use-resolved-path
 */
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getResolveToMatches)(matches, future.v7_relativeSplatPath));
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}

/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an `<Outlet>` to render their child route's
 * element.
 *
 * @see https://reactrouter.com/hooks/use-routes
 */
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}

// Internal implementation with accept optional param for RouterProvider usage
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useRoutes() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (true) {
    // You won't get a warning about 2 different <Routes> under a <Route>
    // without a trailing *, but this is a best-effort warning anyway since we
    // cannot even give the warning unless they land at the parent route.
    //
    // Example:
    //
    // <Routes>
    //   {/* This route path MUST end with /* because otherwise
    //       it will never match /blog/post/123 */}
    //   <Route path="blog" element={<Blog />} />
    //   <Route path="blog/feed" element={<BlogFeed />} />
    // </Routes>
    //
    // function Blog() {
    //   return (
    //     <Routes>
    //       <Route path="post/:id" element={<Post />} />
    //     </Routes>
    //   );
    // }
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ("\"" + parentPathname + "\" (under <Route path=\"" + parentPath + "\">) but the ") + "parent route path has no trailing \"*\". This means if you navigate " + "deeper, the parent won't match anymore and therefore the child " + "routes will never render.\n\n" + ("Please change the parent <Route path=\"" + parentPath + "\"> to <Route ") + ("path=\"" + (parentPath === "/" ? "*" : parentPath + "/*") + "\">."));
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath)(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, " + "the location pathname must begin with the portion of the URL pathname that was " + ("matched by all parent routes. The current pathname base is \"" + parentPathnameBase + "\" ") + ("but pathname \"" + parsedLocationArg.pathname + "\" was given in the `location` prop.")) : 0 : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    // Determine the remaining pathname by removing the # of URL segments the
    // parentPathnameBase has, instead of removing based on character count.
    // This is because we can't guarantee that incoming/outgoing encodings/
    // decodings will match exactly.
    // We decode paths before matching on a per-segment basis with
    // decodeURIComponent(), but we re-encode pathnames via `new URL()` so they
    // match what `window.location.pathname` would reflect.  Those don't 100%
    // align when it comes to encoded URI characters such as % and &.
    //
    // So we may end up with:
    //   pathname:           "/descendant/a%25b/match"
    //   parentPathnameBase: "/descendant/a%b"
    //
    // And the direct substring removal approach won't work :/
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes)(routes, {
    pathname: remainingPathname
  });
  if (true) {
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(parentRoute || matches != null, "No routes matched location \"" + location.pathname + location.search + location.hash + "\" ") : 0;
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(matches == null || matches[matches.length - 1].route.element !== undefined || matches[matches.length - 1].route.Component !== undefined || matches[matches.length - 1].route.lazy !== undefined, "Matched leaf route at location \"" + location.pathname + location.search + location.hash + "\" " + "does not have an element or Component. This means it will render an <Outlet /> with a " + "null value by default resulting in an \"empty\" page.") : 0;
  }
  let renderedMatches = _renderMatches(matches && matches.map(match => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([parentPathnameBase,
    // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([parentPathnameBase,
    // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
  })), parentMatches, dataRouterState, future);

  // When a user passes in a `locationArg`, the associated routes need to
  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
  // to use the scoped location instead of the global location.
  if (locationArg && renderedMatches) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, {
      value: {
        location: _extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse)(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  if (true) {
    console.error("Error handled by React Router default ErrorBoundary:", error);
    devInfo = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "\uD83D\uDCBF Hey developer \uD83D\uDC4B"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      style: codeStyles
    }, "ErrorBoundary"), " or", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      style: codeStyles
    }, "errorElement"), " prop on your route."));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
const defaultErrorElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error: error
    };
  }
  static getDerivedStateFromProps(props, state) {
    // When we get into an error state, the user will likely click "back" to the
    // previous page that didn't have an error. Because this wraps the entire
    // application, that will have no effect--the error page continues to display.
    // This gives us a mechanism to recover from the error when the location changes.
    //
    // Whether we're in an error state or not, we update the location in state
    // so that when we are in an error state, it gets reset when a new location
    // comes in and the user recovers from the error.
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }

    // If we're not changing locations, preserve the location but still surface
    // any new errors that may come through. We retain the existing error, we do
    // this because the error provided from the app state may be cleared without
    // the location changing.
    return {
      error: props.error !== undefined ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== undefined ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);

  // Track how deep we got in our render pass to emulate SSR componentDidCatch
  // in a DataStaticRouter
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState2;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _dataRouterState;
    if ((_dataRouterState = dataRouterState) != null && _dataRouterState.errors) {
      // Don't bail if we have data router errors so we can render them in the
      // boundary.  Use the pre-matched (or shimmed) matches
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;

  // If we have data errors, trim matches to the highest error boundary
  let errors = (_dataRouterState2 = dataRouterState) == null ? void 0 : _dataRouterState2.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(m => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== undefined);
    !(errorIndex >= 0) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")) : 0 : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }

  // If we're in a partial hydration mode, detect if we need to render down to
  // a given HydrateFallback while we load the rest of the hydration data
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      // Track the deepest fallback up until the first route without data
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === undefined && (!errors || errors[match.route.id] === undefined);
        if (match.route.lazy || needsToRunLoader) {
          // We found the first route that's not ready to render (waiting on
          // lazy, or has a loader that hasn't run yet).  Flag that we need to
          // render a fallback and render up until the appropriate fallback
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    // Only data routers handle errors/fallbacks
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : undefined;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        // Note: This is a de-optimized path since React won't re-use the
        // ReactElement since it's identity changes with each new
        // React.createElement call.  We keep this so folks can use
        // `<Route Component={...}>` in `<Routes>` but generally `Component`
        // usage is only advised in `RouterProvider` when we can convert it to
        // `element` ahead of time.
        children = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderedRoute, {
        match: match,
        routeContext: {
          outlet,
          matches,
          isDataRoute: dataRouterState != null
        },
        children: children
      });
    };
    // Only wrap in an error boundary within data router usages when we have an
    // ErrorBoundary/errorElement on this route.  Otherwise let it bubble up to
    // an ancestor ErrorBoundary/errorElement
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error: error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook = /*#__PURE__*/function (DataRouterHook) {
  DataRouterHook["UseBlocker"] = "useBlocker";
  DataRouterHook["UseRevalidator"] = "useRevalidator";
  DataRouterHook["UseNavigateStable"] = "useNavigate";
  return DataRouterHook;
}(DataRouterHook || {});
var DataRouterStateHook = /*#__PURE__*/function (DataRouterStateHook) {
  DataRouterStateHook["UseBlocker"] = "useBlocker";
  DataRouterStateHook["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook["UseActionData"] = "useActionData";
  DataRouterStateHook["UseRouteError"] = "useRouteError";
  DataRouterStateHook["UseNavigation"] = "useNavigation";
  DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook["UseMatches"] = "useMatches";
  DataRouterStateHook["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook["UseRouteId"] = "useRouteId";
  return DataRouterStateHook;
}(DataRouterStateHook || {});
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  !ctx ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  !state ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  !route ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return route;
}

// Internal version with hookName-aware debugging
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, hookName + " can only be used on routes that contain a unique \"id\"") : 0 : void 0;
  return thisRoute.route.id;
}

/**
 * Returns the ID for the nearest contextual route
 */
function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}

/**
 * Returns the current navigation, defaulting to an "idle" navigation when
 * no navigation is in progress
 */
function useNavigation() {
  let state = useDataRouterState(DataRouterStateHook.UseNavigation);
  return state.navigation;
}

/**
 * Returns a revalidate function for manually triggering revalidation, as well
 * as the current state of any manual revalidations
 */
function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator);
  let state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  }), [dataRouterContext.router.revalidate, state.revalidation]);
}

/**
 * Returns the active route matches, useful for accessing loaderData for
 * parent/child routes or the route "handle" property
 */
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => matches.map(m => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_convertRouteMatchToUiMatch)(m, loaderData)), [matches, loaderData]);
}

/**
 * Returns the loader data for the nearest ancestor Route loader
 */
function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return undefined;
  }
  return state.loaderData[routeId];
}

/**
 * Returns the loaderData for the given routeId
 */
function useRouteLoaderData(routeId) {
  let state = useDataRouterState(DataRouterStateHook.UseRouteLoaderData);
  return state.loaderData[routeId];
}

/**
 * Returns the action data for the nearest ancestor Route action
 */
function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  return state.actionData ? state.actionData[routeId] : undefined;
}

/**
 * Returns the nearest ancestor Route error, which could be a loader/action
 * error or a render error.  This is intended to be called from your
 * ErrorBoundary/errorElement to display a proper error message.
 */
function useRouteError() {
  var _state$errors;
  let error = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);

  // If this was a render error, we put it in a RouteError context inside
  // of RenderErrorBoundary
  if (error !== undefined) {
    return error;
  }

  // Otherwise look for errors from our data router state
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}

/**
 * Returns the happy-path data from the nearest ancestor `<Await />` value
 */
function useAsyncValue() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}

/**
 * Returns the error from the nearest ancestor `<Await />` value
 */
function useAsyncError() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
let blockerId = 0;

/**
 * Allow the application to block navigations within the SPA and present the
 * user a confirmation dialog to confirm the navigation.  Mostly used to avoid
 * using half-filled form data.  This does not handle hard-reloads or
 * cross-origin navigations.
 */
function useBlocker(shouldBlock) {
  let {
    router,
    basename
  } = useDataRouterContext(DataRouterHook.UseBlocker);
  let state = useDataRouterState(DataRouterStateHook.UseBlocker);
  let [blockerKey, setBlockerKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState("");
  let blockerFunction = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(arg => {
    if (typeof shouldBlock !== "function") {
      return !!shouldBlock;
    }
    if (basename === "/") {
      return shouldBlock(arg);
    }

    // If they provided us a function and we've got an active basename, strip
    // it from the locations we expose to the user to match the behavior of
    // useLocation
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = arg;
    return shouldBlock({
      currentLocation: _extends({}, currentLocation, {
        pathname: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(currentLocation.pathname, basename) || currentLocation.pathname
      }),
      nextLocation: _extends({}, nextLocation, {
        pathname: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(nextLocation.pathname, basename) || nextLocation.pathname
      }),
      historyAction
    });
  }, [basename, shouldBlock]);

  // This effect is in charge of blocker key assignment and deletion (which is
  // tightly coupled to the key)
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let key = String(++blockerId);
    setBlockerKey(key);
    return () => router.deleteBlocker(key);
  }, [router]);

  // This effect handles assigning the blockerFunction.  This is to handle
  // unstable blocker function identities, and happens only after the prior
  // effect so we don't get an orphaned blockerFunction in the router with a
  // key of "".  Until then we just have the IDLE_BLOCKER.
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blockerKey !== "") {
      router.getBlocker(blockerKey, blockerFunction);
    }
  }, [router, blockerKey, blockerFunction]);

  // Prefer the blocker from `state` not `router.state` since DataRouterContext
  // is memoized so this ensures we update on blocker state updates
  return blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.IDLE_BLOCKER;
}

/**
 * Stable version of useNavigate that is used when we are in the context of
 * a RouterProvider.
 */
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(activeRef.current, navigateEffectWarning) : 0;

    // Short circuit here since if this happens on first render the navigate
    // is useless because we haven't wired up our router subscriber yet
    if (!activeRef.current) return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
const alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, message) : 0;
  }
}

/**
  Webpack + React 17 fails to compile on any of the following because webpack
  complains that `startTransition` doesn't exist in `React`:
  * import { startTransition } from "react"
  * import * as React from from "react";
    "startTransition" in React ? React.startTransition(() => setState()) : setState()
  * import * as React from from "react";
    "startTransition" in React ? React["startTransition"](() => setState()) : setState()

  Moving it to a constant such as the following solves the Webpack/React 17 issue:
  * import * as React from from "react";
    const START_TRANSITION = "startTransition";
    START_TRANSITION in React ? React[START_TRANSITION](() => setState()) : setState()

  However, that introduces webpack/terser minification issues in production builds
  in React 18 where minification/obfuscation ends up removing the call of
  React.startTransition entirely from the first half of the ternary.  Grabbing
  this exported reference once up front resolves that issue.

  See https://github.com/remix-run/react-router/issues/10579
*/
const START_TRANSITION = "startTransition";
const startTransitionImpl = react__WEBPACK_IMPORTED_MODULE_0__[START_TRANSITION];

/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router,
    future
  } = _ref;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(router.state);
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    if (v7_startTransition && startTransitionImpl) {
      startTransitionImpl(() => setStateImpl(newState));
    } else {
      setStateImpl(newState);
    }
  }, [setStateImpl, v7_startTransition]);

  // Need to use a layout effect here so we are subscribed early enough to
  // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(fallbackElement == null || !router.future.v7_partialHydration, "`<RouterProvider fallbackElement>` is deprecated when using " + "`v7_partialHydration`, use a `HydrateFallback` component instead") : 0;
    // Only log this once on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let navigator = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: n => router.navigate(n),
      push: (to, state, opts) => router.navigate(to, {
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state, opts) => router.navigate(to, {
        replace: true,
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    router,
    navigator,
    static: false,
    basename
  }), [router, navigator, basename]);

  // The fragment and {null} here are important!  We need them to keep React 18's
  // useId happy when we are server-rendering since we may have a <script> here
  // containing the hydrated server-side staticContext (from StaticRouterProvider).
  // useId relies on the component tree structure to generate deterministic id's
  // so we need to ensure it remains the same on the client even though
  // we don't need the <script> tag
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Router, {
    basename: basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: navigator,
    future: {
      v7_relativeSplatPath: router.future.v7_relativeSplatPath
    }
  }, state.initialized || router.future.v7_partialHydration ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRoutes, {
    routes: router.routes,
    future: router.future,
    state: state
  }) : fallbackElement))), null);
}
function DataRoutes(_ref2) {
  let {
    routes,
    future,
    state
  } = _ref2;
  return useRoutesImpl(routes, undefined, state, future);
}
/**
 * A `<Router>` that stores all entries in memory.
 *
 * @see https://reactrouter.com/router-components/memory-router
 */
function MemoryRouter(_ref3) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex,
    future
  } = _ref3;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createMemoryHistory)({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future: future
  });
}
/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/components/navigate
 */
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of
  // the router loaded. We can help them understand how to avoid that.
  "<Navigate> may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    future,
    static: isStatic
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(!isStatic, "<Navigate> must not be used on the initial render in a <StaticRouter>. " + "This is a no-op, but you should modify your code so the <Navigate> is " + "only ever rendered in response to some user interaction or state change.") : 0;
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();

  // Resolve the path outside of the effect so that when effects run twice in
  // StrictMode they navigate to the same place
  let path = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getResolveToMatches)(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]);
  return null;
}
/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/components/outlet
 */
function Outlet(props) {
  return useOutlet(props.context);
}
/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/components/route
 */
function Route(_props) {
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "A <Route> is only ever to be used as the child of <Routes> element, " + "never rendered directly. Please wrap your <Route> in a <Routes>.") : 0 ;
}
/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a `<Router>` directly. Instead, you'll render a
 * router that is more specific to your environment such as a `<BrowserRouter>`
 * in web browsers or a `<StaticRouter>` for server rendering.
 *
 * @see https://reactrouter.com/router-components/router
 */
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action.Pop,
    navigator,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "You cannot render a <Router> inside another <Router>." + " You should never have more than one in your app.") : 0 : void 0;

  // Preserve trailing slashes on basename, so we can let the user control
  // the enforcement of trailing slashes throughout the app
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    basename,
    navigator,
    static: staticProp,
    future: _extends({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath)(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let trailingPathname = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(locationContext != null, "<Router basename=\"" + basename + "\"> is not able to match the URL " + ("\"" + pathname + search + hash + "\" because it does not start with the ") + "basename, so the <Router> won't render anything.") : 0;
  if (locationContext == null) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, {
    children: children,
    value: locationContext
  }));
}
/**
 * A container for a nested tree of `<Route>` elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/components/routes
 */
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
/**
 * Component to use for rendering lazily loaded data from returning defer()
 * in a loader function
 */
function Await(_ref7) {
  let {
    children,
    errorElement,
    resolve
  } = _ref7;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitErrorBoundary, {
    resolve: resolve,
    errorElement: errorElement
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus = /*#__PURE__*/function (AwaitRenderStatus) {
  AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
  AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
  AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
  return AwaitRenderStatus;
}(AwaitRenderStatus || {});
const neverSettledPromise = new Promise(() => {});
class AwaitErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("<Await> caught the following error during render", error, errorInfo);
  }
  render() {
    let {
      children,
      errorElement,
      resolve
    } = this.props;
    let promise = null;
    let status = AwaitRenderStatus.pending;
    if (!(resolve instanceof Promise)) {
      // Didn't get a promise - provide as a resolved promise
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_data", {
        get: () => resolve
      });
    } else if (this.state.error) {
      // Caught a render error, provide it as a rejected promise
      status = AwaitRenderStatus.error;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {}); // Avoid unhandled rejection warnings
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_error", {
        get: () => renderError
      });
    } else if (resolve._tracked) {
      // Already tracked promise - check contents
      promise = resolve;
      status = "_error" in promise ? AwaitRenderStatus.error : "_data" in promise ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
    } else {
      // Raw (untracked) promise - track it
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, "_tracked", {
        get: () => true
      });
      promise = resolve.then(data => Object.defineProperty(resolve, "_data", {
        get: () => data
      }), error => Object.defineProperty(resolve, "_error", {
        get: () => error
      }));
    }
    if (status === AwaitRenderStatus.error && promise._error instanceof _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError) {
      // Freeze the UI by throwing a never resolved promise
      throw neverSettledPromise;
    }
    if (status === AwaitRenderStatus.error && !errorElement) {
      // No errorElement, throw to the nearest route-level error boundary
      throw promise._error;
    }
    if (status === AwaitRenderStatus.error) {
      // Render via our errorElement
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, {
        value: promise,
        children: errorElement
      });
    }
    if (status === AwaitRenderStatus.success) {
      // Render children with resolved value
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, {
        value: promise,
        children: children
      });
    }

    // Throw to the suspense boundary
    throw promise;
  }
}

/**
 * @private
 * Indirection to leverage useAsyncValue for a render-prop API on `<Await>`
 */
function ResolveAwait(_ref8) {
  let {
    children
  } = _ref8;
  let data = useAsyncValue();
  let toRender = typeof children === "function" ? children(data) : children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, toRender);
}

///////////////////////////////////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/utils/create-routes-from-children
 */
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, (element, index) => {
    if (! /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
      // Transparently support React.Fragment and its children.
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : 0 : void 0;
    !(!element.props.index || !element.props.children) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "An index route cannot have child routes.") : 0 : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}

/**
 * Renders the result of `matchRoutes()` into a React element.
 */
function renderMatches(matches) {
  return _renderMatches(matches);
}

function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    if (true) {
      if (route.element) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `Component` and `element` on your route - " + "`Component` will be used.") : 0;
      }
    }
    Object.assign(updates, {
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.Component),
      Component: undefined
    });
  }
  if (route.HydrateFallback) {
    if (true) {
      if (route.hydrateFallbackElement) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - " + "`HydrateFallback` will be used.") : 0;
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.HydrateFallback),
      HydrateFallback: undefined
    });
  }
  if (route.ErrorBoundary) {
    if (true) {
      if (route.errorElement) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - " + "`ErrorBoundary` will be used.") : 0;
      }
    }
    Object.assign(updates, {
      errorElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.ErrorBoundary),
      ErrorBoundary: undefined
    });
  }
  return updates;
}
function createMemoryRouter(routes, opts) {
  return (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createMemoryHistory)({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes,
    mapRouteProperties,
    unstable_dataStrategy: opts == null ? void 0 : opts.unstable_dataStrategy,
    unstable_patchRoutesOnMiss: opts == null ? void 0 : opts.unstable_patchRoutesOnMiss
  }).initialize();
}


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

var didWarnAboutKeySpread = {};
function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    {
      if (hasOwnProperty.call(props, 'key')) {
        var componentName = getComponentNameFromType(type);
        var keys = Object.keys(props).filter(function (k) {
          return k !== 'key';
        });
        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

          didWarnAboutKeySpread[componentName + beforeExample] = true;
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/data.json":
/*!***********************!*\
  !*** ./src/data.json ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"Ultimate Quick View for WooCommerce","version":"1.0.0"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App */ "./src/App.js");

const {
  render
} = wp.element;
// import ReactDOM from 'react-dom';




/*
if (document.getElementById('plugin-starter-settings')) {
  render(<App/>, document.getElementById('plugin-starter-settings'));
}
*/

/*ReactDOM.render(<App />, document.getElementById('plugin-starter-settings'));*/
if (document.getElementById('plugin-starter-settings')) {
  const container = document.getElementById('plugin-starter-settings');
  const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_3__.createRoot)(container);
  root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_App__WEBPACK_IMPORTED_MODULE_4__["default"], null));
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map