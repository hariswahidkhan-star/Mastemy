import { createRequire } from "node:module";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* #__PURE__ */ (() => createRequire(import.meta.url))();
//#endregion
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result, thenable = ctor();
			thenable.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			});
			-1 === payload._status && (payload._status = 0, payload._result = thenable);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	function startTransition(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		currentTransition.types = null !== prevTransition ? prevTransition.types : null;
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	}
	function addTransitionType(type) {
		var transition = ReactSharedInternals.T;
		if (null !== transition) {
			var transitionTypes = transition.types;
			null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
		} else startTransition(addTransitionType.bind(null, type));
	}
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.addTransitionType = addTransitionType;
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = startTransition;
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.3.0";
}));
//#endregion
//#region node_modules/react/cjs/react.development.js
/**
* @license React
* react.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_development = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	"production" !== process.env.NODE_ENV && (function() {
		function defineDeprecationWarning(methodName, info) {
			Object.defineProperty(Component.prototype, methodName, { get: function() {
				console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
			} });
		}
		function getIteratorFn(maybeIterable) {
			if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
			maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
			return "function" === typeof maybeIterable ? maybeIterable : null;
		}
		function warnNoop(publicInstance, callerName) {
			publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
			var warningKey = publicInstance + "." + callerName;
			didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = !0);
		}
		function Component(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		function ComponentDummy() {}
		function PureComponent(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		function noop() {}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			try {
				testStringCoercion(value);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			if (JSCompiler_inline_result) {
				JSCompiler_inline_result = console;
				var JSCompiler_temp_const = JSCompiler_inline_result.error;
				var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
				JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
				return testStringCoercion(value);
			}
		}
		function getComponentNameFromType(type) {
			if (null == type) return null;
			if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
			if ("string" === typeof type) return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
				case REACT_ACTIVITY_TYPE: return "Activity";
				case REACT_VIEW_TRANSITION_TYPE: return "ViewTransition";
			}
			if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_CONTEXT_TYPE: return type.displayName || "Context";
				case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
				case REACT_FORWARD_REF_TYPE:
					var innerType = type.render;
					type = type.displayName;
					type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
					return type;
				case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					innerType = type._payload;
					type = type._init;
					try {
						return getComponentNameFromType(type(innerType));
					} catch (x) {}
			}
			return null;
		}
		function getTaskName(type) {
			if (type === REACT_FRAGMENT_TYPE) return "<>";
			if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
			try {
				var name = getComponentNameFromType(type);
				return name ? "<" + name + ">" : "<...>";
			} catch (x) {
				return "<...>";
			}
		}
		function getOwner() {
			var dispatcher = ReactSharedInternals.A;
			return null === dispatcher ? null : dispatcher.getOwner();
		}
		function UnknownOwner() {
			return Error("react-stack-top-frame");
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return !1;
			}
			return void 0 !== config.key;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			function warnAboutAccessingKey() {
				specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
			}
			warnAboutAccessingKey.isReactWarning = !0;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: !0
			});
		}
		function elementRefGetterWithDeprecationWarning() {
			var componentName = getComponentNameFromType(this.type);
			didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
			componentName = this.props.ref;
			return void 0 !== componentName ? componentName : null;
		}
		function ReactElement(type, key, props, owner, debugStack, debugTask) {
			var refProp = props.ref;
			type = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				props,
				_owner: owner
			};
			null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
				enumerable: !1,
				get: elementRefGetterWithDeprecationWarning
			}) : Object.defineProperty(type, "ref", {
				enumerable: !1,
				value: null
			});
			type._store = {};
			Object.defineProperty(type._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			});
			Object.defineProperty(type, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			});
			Object.defineProperty(type, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugStack
			});
			Object.defineProperty(type, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugTask
			});
			Object.freeze && (Object.freeze(type.props), Object.freeze(type));
			return type;
		}
		function cloneAndReplaceKey(oldElement, newKey) {
			newKey = ReactElement(oldElement.type, newKey, oldElement.props, oldElement._owner, oldElement._debugStack, oldElement._debugTask);
			oldElement._store && (newKey._store.validated = oldElement._store.validated);
			return newKey;
		}
		function validateChildKeys(node) {
			isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
		}
		function isValidElement(object) {
			return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		function escape(key) {
			var escaperLookup = {
				"=": "=0",
				":": "=2"
			};
			return "$" + key.replace(/[=:]/g, function(match) {
				return escaperLookup[match];
			});
		}
		function getElementKey(element, index) {
			return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
		}
		function resolveThenable(thenable) {
			switch (thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
				default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
					"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
				}, function(error) {
					"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
				})), thenable.status) {
					case "fulfilled": return thenable.value;
					case "rejected": throw thenable.reason;
				}
			}
			throw thenable;
		}
		function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
			var type = typeof children;
			if ("undefined" === type || "boolean" === type) children = null;
			var invokeCallback = !1;
			if (null === children) invokeCallback = !0;
			else switch (type) {
				case "bigint":
				case "string":
				case "number":
					invokeCallback = !0;
					break;
				case "object": switch (children.$$typeof) {
					case REACT_ELEMENT_TYPE:
					case REACT_PORTAL_TYPE:
						invokeCallback = !0;
						break;
					case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
				}
			}
			if (invokeCallback) {
				invokeCallback = children;
				callback = callback(invokeCallback);
				var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
				isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
					return c;
				})) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
				return 1;
			}
			invokeCallback = 0;
			childKey = "" === nameSoFar ? "." : nameSoFar + ":";
			if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
			else if (i = getIteratorFn(children), "function" === typeof i) for (i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0), children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
			else if ("object" === type) {
				if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
				array = String(children);
				throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
			}
			return invokeCallback;
		}
		function mapChildren(children, func, context) {
			if (null == children) return children;
			var result = [], count = 0;
			mapIntoArray(children, result, "", "", function(child) {
				return func.call(context, child, count++);
			});
			return result;
		}
		function lazyInitializer(payload) {
			if (-1 === payload._status) {
				var resolveDebugValue = null, rejectDebugValue = null, ioInfo = payload._ioInfo;
				null != ioInfo && (ioInfo.start = ioInfo.end = performance.now(), ioInfo.value = new Promise(function(resolve, reject) {
					resolveDebugValue = resolve;
					rejectDebugValue = reject;
				}));
				ioInfo = payload._result;
				var thenable = ioInfo();
				thenable.then(function(moduleObject) {
					if (0 === payload._status || -1 === payload._status) {
						payload._status = 1;
						payload._result = moduleObject;
						var _ioInfo = payload._ioInfo;
						if (null != _ioInfo) {
							_ioInfo.end = performance.now();
							var debugValue = null == moduleObject ? void 0 : moduleObject.default;
							resolveDebugValue(debugValue);
							_ioInfo.value.status = "fulfilled";
							_ioInfo.value.value = debugValue;
						}
						void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
					}
				}, function(error) {
					if (0 === payload._status || -1 === payload._status) {
						payload._status = 2;
						payload._result = error;
						var _ioInfo2 = payload._ioInfo;
						null != _ioInfo2 && (_ioInfo2.end = performance.now(), _ioInfo2.value.then(noop, noop), rejectDebugValue(error), _ioInfo2.value.status = "rejected", _ioInfo2.value.reason = error);
						void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
					}
				});
				ioInfo = payload._ioInfo;
				if (null != ioInfo) {
					var displayName = thenable.displayName;
					"string" === typeof displayName && (ioInfo.name = displayName);
				}
				-1 === payload._status && (payload._status = 0, payload._result = thenable);
			}
			if (1 === payload._status) return ioInfo = payload._result, void 0 === ioInfo && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ioInfo), "default" in ioInfo || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ioInfo), ioInfo.default;
			throw payload._result;
		}
		function resolveDispatcher() {
			var dispatcher = ReactSharedInternals.H;
			null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
			return dispatcher;
		}
		function releaseAsyncTransition() {
			ReactSharedInternals.asyncTransitions--;
		}
		function startTransition(scope) {
			var prevTransition = ReactSharedInternals.T, currentTransition = {};
			currentTransition.types = null !== prevTransition ? prevTransition.types : null;
			currentTransition._updatedFibers = /* @__PURE__ */ new Set();
			ReactSharedInternals.T = currentTransition;
			try {
				var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
				null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
				"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
			} catch (error) {
				reportGlobalError(error);
			} finally {
				null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
			}
		}
		function addTransitionType(type) {
			var transition = ReactSharedInternals.T;
			if (null !== transition) {
				var transitionTypes = transition.types;
				null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
			} else 0 === ReactSharedInternals.asyncTransitions && console.error("addTransitionType can only be called inside a `startTransition()` callback. It must be associated with a specific Transition."), startTransition(addTransitionType.bind(null, type));
		}
		function enqueueTask(task) {
			if (null === enqueueTaskImpl) try {
				var requireString = ("require" + Math.random()).slice(0, 7);
				enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
			} catch (_err) {
				enqueueTaskImpl = function(callback) {
					!1 === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = !0, "undefined" === typeof MessageChannel && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var channel = new MessageChannel();
					channel.port1.onmessage = callback;
					channel.port2.postMessage(void 0);
				};
			}
			return enqueueTaskImpl(task);
		}
		function aggregateErrors(errors) {
			return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
		}
		function popActScope(prevActQueue, prevActScopeDepth) {
			prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
			actScopeDepth = prevActScopeDepth;
		}
		function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
			var queue = ReactSharedInternals.actQueue;
			if (null !== queue) if (0 !== queue.length) try {
				flushActQueue(queue);
				enqueueTask(function() {
					return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
				});
				return;
			} catch (error) {
				ReactSharedInternals.thrownErrors.push(error);
			}
			else ReactSharedInternals.actQueue = null;
			0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
		}
		function flushActQueue(queue) {
			if (!isFlushing) {
				isFlushing = !0;
				var i = 0;
				try {
					for (; i < queue.length; i++) {
						var callback = queue[i];
						do {
							ReactSharedInternals.didUsePromise = !1;
							var continuation = callback(!1);
							if (null !== continuation) {
								if (ReactSharedInternals.didUsePromise) {
									queue[i] = callback;
									queue.splice(0, i);
									return;
								}
								callback = continuation;
							} else break;
						} while (1);
					}
					queue.length = 0;
				} catch (error) {
					queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
				} finally {
					isFlushing = !1;
				}
			}
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function(publicInstance) {
				warnNoop(publicInstance, "forceUpdate");
			},
			enqueueReplaceState: function(publicInstance) {
				warnNoop(publicInstance, "replaceState");
			},
			enqueueSetState: function(publicInstance) {
				warnNoop(publicInstance, "setState");
			}
		}, assign = Object.assign, emptyObject = {};
		Object.freeze(emptyObject);
		Component.prototype.isReactComponent = {};
		Component.prototype.setState = function(partialState, callback) {
			if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, partialState, callback, "setState");
		};
		Component.prototype.forceUpdate = function(callback) {
			this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
		};
		var deprecatedAPIs = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		for (fnName in deprecatedAPIs) deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		ComponentDummy.prototype = Component.prototype;
		deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
		deprecatedAPIs.constructor = PureComponent;
		assign(deprecatedAPIs, Component.prototype);
		deprecatedAPIs.isPureReactComponent = !0;
		var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
			H: null,
			A: null,
			T: null,
			S: null,
			actQueue: null,
			asyncTransitions: 0,
			isBatchingLegacy: !1,
			didScheduleLegacyUpdate: !1,
			didUsePromise: !1,
			thrownErrors: [],
			getCurrentStack: null,
			recentlyCreatedOwnerStacks: 0
		}, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
			return null;
		};
		deprecatedAPIs = { react_stack_bottom_frame: function(callStackForError) {
			return callStackForError();
		} };
		var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
		var didWarnAboutElementRef = {};
		var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(deprecatedAPIs, UnknownOwner)();
		var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
		var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
			if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
				var event = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
					error
				});
				if (!window.dispatchEvent(event)) return;
			} else if ("object" === typeof process && "function" === typeof process.emit) {
				process.emit("uncaughtException", error);
				return;
			}
			console.error(error);
		}, didWarnAboutMessageChannel = !1, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = !1, isFlushing = !1, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
			queueMicrotask(function() {
				return queueMicrotask(callback);
			});
		} : enqueueTask;
		deprecatedAPIs = Object.freeze({
			__proto__: null,
			c: function(size) {
				return resolveDispatcher().useMemoCache(size);
			}
		});
		var fnName = {
			map: mapChildren,
			forEach: function(children, forEachFunc, forEachContext) {
				mapChildren(children, function() {
					forEachFunc.apply(this, arguments);
				}, forEachContext);
			},
			count: function(children) {
				var n = 0;
				mapChildren(children, function() {
					n++;
				});
				return n;
			},
			toArray: function(children) {
				return mapChildren(children, function(child) {
					return child;
				}) || [];
			},
			only: function(children) {
				if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
				return children;
			}
		};
		exports.Activity = REACT_ACTIVITY_TYPE;
		exports.Children = fnName;
		exports.Component = Component;
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.Profiler = REACT_PROFILER_TYPE;
		exports.PureComponent = PureComponent;
		exports.StrictMode = REACT_STRICT_MODE_TYPE;
		exports.Suspense = REACT_SUSPENSE_TYPE;
		exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
		exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
		exports.__COMPILER_RUNTIME = deprecatedAPIs;
		exports.act = function(callback) {
			var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
			actScopeDepth++;
			var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = !1;
			try {
				var result = callback();
			} catch (error) {
				ReactSharedInternals.thrownErrors.push(error);
			}
			if (0 < ReactSharedInternals.thrownErrors.length) throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
			if (null !== result && "object" === typeof result && "function" === typeof result.then) {
				var thenable = result;
				queueSeveralMicrotasks(function() {
					didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				});
				return { then: function(resolve, reject) {
					didAwaitActCall = !0;
					thenable.then(function(returnValue) {
						popActScope(prevActQueue, prevActScopeDepth);
						if (0 === prevActScopeDepth) {
							try {
								flushActQueue(queue), enqueueTask(function() {
									return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
								});
							} catch (error$0) {
								ReactSharedInternals.thrownErrors.push(error$0);
							}
							if (0 < ReactSharedInternals.thrownErrors.length) {
								var _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors);
								ReactSharedInternals.thrownErrors.length = 0;
								reject(_thrownError);
							}
						} else resolve(returnValue);
					}, function(error) {
						popActScope(prevActQueue, prevActScopeDepth);
						0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
					});
				} };
			}
			var returnValue$jscomp$0 = result;
			popActScope(prevActQueue, prevActScopeDepth);
			0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
				didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), ReactSharedInternals.actQueue = null);
			if (0 < ReactSharedInternals.thrownErrors.length) throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
			return { then: function(resolve, reject) {
				didAwaitActCall = !0;
				0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
					return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject);
				})) : resolve(returnValue$jscomp$0);
			} };
		};
		exports.addTransitionType = addTransitionType;
		exports.cache = function(fn) {
			return function() {
				return fn.apply(null, arguments);
			};
		};
		exports.cacheSignal = function() {
			return null;
		};
		exports.captureOwnerStack = function() {
			var getCurrentStack = ReactSharedInternals.getCurrentStack;
			return null === getCurrentStack ? null : getCurrentStack();
		};
		exports.cloneElement = function(element, config, children) {
			if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
			var props = assign({}, element.props), key = element.key, owner = element._owner;
			if (null != config) {
				var JSCompiler_inline_result;
				a: {
					if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
						JSCompiler_inline_result = !1;
						break a;
					}
					JSCompiler_inline_result = void 0 !== config.ref;
				}
				JSCompiler_inline_result && (owner = getOwner());
				hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
				for (propName in config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
			}
			var propName = arguments.length - 2;
			if (1 === propName) props.children = children;
			else if (1 < propName) {
				JSCompiler_inline_result = Array(propName);
				for (var i = 0; i < propName; i++) JSCompiler_inline_result[i] = arguments[i + 2];
				props.children = JSCompiler_inline_result;
			}
			props = ReactElement(element.type, key, props, owner, element._debugStack, element._debugTask);
			for (key = 2; key < arguments.length; key++) validateChildKeys(arguments[key]);
			return props;
		};
		exports.createContext = function(defaultValue) {
			defaultValue = {
				$$typeof: REACT_CONTEXT_TYPE,
				_currentValue: defaultValue,
				_currentValue2: defaultValue,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			};
			defaultValue.Provider = defaultValue;
			defaultValue.Consumer = {
				$$typeof: REACT_CONSUMER_TYPE,
				_context: defaultValue
			};
			defaultValue._currentRenderer = null;
			defaultValue._currentRenderer2 = null;
			return defaultValue;
		};
		exports.createElement = function(type, config, children) {
			for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i]);
			var propName;
			i = {};
			var key = null;
			if (null != config) for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
			var childrenLength = arguments.length - 2;
			if (1 === childrenLength) i.children = children;
			else if (1 < childrenLength) {
				for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++) childArray[_i] = arguments[_i + 2];
				Object.freeze && Object.freeze(childArray);
				i.children = childArray;
			}
			if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === i[propName] && (i[propName] = childrenLength[propName]);
			key && defineKeyPropWarningGetter(i, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
			(propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++) ? (childArray = Error.stackTraceLimit, Error.stackTraceLimit = 10, childrenLength = Error("react-stack-top-frame"), Error.stackTraceLimit = childArray) : childrenLength = unknownOwnerDebugStack;
			return ReactElement(type, key, i, getOwner(), childrenLength, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
		exports.createRef = function() {
			var refObject = { current: null };
			Object.seal(refObject);
			return refObject;
		};
		exports.forwardRef = function(render) {
			null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeof render ? console.error("forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render) : 0 !== render.length && 2 !== render.length && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
			null != render && null != render.defaultProps && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
			var elementType = {
				$$typeof: REACT_FORWARD_REF_TYPE,
				render
			}, ownName;
			Object.defineProperty(elementType, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
				}
			});
			return elementType;
		};
		exports.isValidElement = isValidElement;
		exports.lazy = function(ctor) {
			ctor = {
				_status: -1,
				_result: ctor
			};
			var lazyType = {
				$$typeof: REACT_LAZY_TYPE,
				_payload: ctor,
				_init: lazyInitializer
			}, ioInfo = {
				name: "lazy",
				start: -1,
				end: -1,
				value: null,
				owner: null,
				debugStack: Error("react-stack-top-frame"),
				debugTask: console.createTask ? console.createTask("lazy()") : null
			};
			ctor._ioInfo = ioInfo;
			lazyType._debugInfo = [{ awaited: ioInfo }];
			return lazyType;
		};
		exports.memo = function(type, compare) {
			type ?? console.error("memo: The first argument must be a component. Instead received: %s", null === type ? "null" : typeof type);
			compare = {
				$$typeof: REACT_MEMO_TYPE,
				type,
				compare: void 0 === compare ? null : compare
			};
			var ownName;
			Object.defineProperty(compare, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
				}
			});
			return compare;
		};
		exports.startTransition = startTransition;
		exports.unstable_useCacheRefresh = function() {
			return resolveDispatcher().useCacheRefresh();
		};
		exports.use = function(usable) {
			return resolveDispatcher().use(usable);
		};
		exports.useActionState = function(action, initialState, permalink) {
			return resolveDispatcher().useActionState(action, initialState, permalink);
		};
		exports.useCallback = function(callback, deps) {
			return resolveDispatcher().useCallback(callback, deps);
		};
		exports.useContext = function(Context) {
			var dispatcher = resolveDispatcher();
			Context.$$typeof === REACT_CONSUMER_TYPE && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
			return dispatcher.useContext(Context);
		};
		exports.useDebugValue = function(value, formatterFn) {
			return resolveDispatcher().useDebugValue(value, formatterFn);
		};
		exports.useDeferredValue = function(value, initialValue) {
			return resolveDispatcher().useDeferredValue(value, initialValue);
		};
		exports.useEffect = function(create, deps) {
			create ?? console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");
			return resolveDispatcher().useEffect(create, deps);
		};
		exports.useEffectEvent = function(callback) {
			return resolveDispatcher().useEffectEvent(callback);
		};
		exports.useId = function() {
			return resolveDispatcher().useId();
		};
		exports.useImperativeHandle = function(ref, create, deps) {
			return resolveDispatcher().useImperativeHandle(ref, create, deps);
		};
		exports.useInsertionEffect = function(create, deps) {
			create ?? console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?");
			return resolveDispatcher().useInsertionEffect(create, deps);
		};
		exports.useLayoutEffect = function(create, deps) {
			create ?? console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?");
			return resolveDispatcher().useLayoutEffect(create, deps);
		};
		exports.useMemo = function(create, deps) {
			return resolveDispatcher().useMemo(create, deps);
		};
		exports.useOptimistic = function(passthrough, reducer) {
			return resolveDispatcher().useOptimistic(passthrough, reducer);
		};
		exports.useReducer = function(reducer, initialArg, init) {
			return resolveDispatcher().useReducer(reducer, initialArg, init);
		};
		exports.useRef = function(initialValue) {
			return resolveDispatcher().useRef(initialValue);
		};
		exports.useState = function(initialState) {
			return resolveDispatcher().useState(initialState);
		};
		exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
			return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
		};
		exports.useTransition = function() {
			return resolveDispatcher().useTransition();
		};
		exports.version = "19.3.0";
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_react_production();
	else module.exports = require_react_development();
}));
//#endregion
//#region node_modules/react-router/dist/development/chunk-OB3PAWPO.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* react-router v7.18.4
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i;
var PROTOCOL_RELATIVE_URL_REGEX = /^[\\/]{2}/;
function normalizeProtocolRelativeUrl(url, protocol) {
	return protocol + url.replace(/\\/g, "/");
}
function invariant(value, message) {
	if (value === false || value === null || typeof value === "undefined") throw new Error(message);
}
function warning(cond, message) {
	if (!cond) {
		if (typeof console !== "undefined") console.warn(message);
		try {
			throw new Error(message);
		} catch (e) {}
	}
}
function createPath({ pathname = "/", search = "", hash = "" }) {
	if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
	if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
	return pathname;
}
function parsePath(path) {
	let parsedPath = {};
	if (path) {
		let hashIndex = path.indexOf("#");
		if (hashIndex >= 0) {
			parsedPath.hash = path.substring(hashIndex);
			path = path.substring(0, hashIndex);
		}
		let searchIndex = path.indexOf("?");
		if (searchIndex >= 0) {
			parsedPath.search = path.substring(searchIndex);
			path = path.substring(0, searchIndex);
		}
		if (path) parsedPath.pathname = path;
	}
	return parsedPath;
}
function matchRoutes(routes, locationArg, basename = "/") {
	return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial, precomputedBranches) {
	let pathname = stripBasename((typeof locationArg === "string" ? parsePath(locationArg) : locationArg).pathname || "/", basename);
	if (pathname == null) return null;
	let branches = precomputedBranches ?? flattenAndRankRoutes(routes);
	let matches = null;
	let decoded = decodePath(pathname);
	for (let i = 0; matches == null && i < branches.length; ++i) matches = matchRouteBranch(branches[i], decoded, allowPartial);
	return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
	let { route, pathname, params } = match;
	return {
		id: route.id,
		pathname,
		params,
		data: loaderData[route.id],
		loaderData: loaderData[route.id],
		handle: route.handle
	};
}
function flattenAndRankRoutes(routes) {
	let branches = flattenRoutes(routes);
	rankRouteBranches(branches);
	return branches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
	let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
		let meta = {
			relativePath: relativePath === void 0 ? route.path || "" : relativePath,
			caseSensitive: route.caseSensitive === true,
			childrenIndex: index,
			route
		};
		if (meta.relativePath.startsWith("/")) {
			if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) return;
			invariant(meta.relativePath.startsWith(parentPath), `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`);
			meta.relativePath = meta.relativePath.slice(parentPath.length);
		}
		let path = joinPaths([parentPath, meta.relativePath]);
		let routesMeta = parentsMeta.concat(meta);
		if (route.children && route.children.length > 0) {
			invariant(route.index !== true, `Index routes must not have child routes. Please remove all child routes from route path "${path}".`);
			flattenRoutes(route.children, branches, routesMeta, path, hasParentOptionalSegments);
		}
		if (route.path == null && !route.index) return;
		branches.push({
			path,
			score: computeScore(path, route.index),
			routesMeta: routesMeta.map((meta2, i) => {
				let [matcher, params] = compilePath(meta2.relativePath, meta2.caseSensitive, i === routesMeta.length - 1);
				return {
					...meta2,
					matcher,
					compiledParams: params
				};
			})
		});
	};
	routes.forEach((route, index) => {
		if (route.path === "" || !route.path?.includes("?")) flattenRoute(route, index);
		else for (let exploded of explodeOptionalSegments(route.path)) flattenRoute(route, index, true, exploded);
	});
	return branches;
}
function explodeOptionalSegments(path) {
	let segments = path.split("/");
	if (segments.length === 0) return [];
	let [first, ...rest] = segments;
	let isOptional = first.endsWith("?");
	let required = first.replace(/\?$/, "");
	if (rest.length === 0) return isOptional ? [required, ""] : [required];
	let restExploded = explodeOptionalSegments(rest.join("/"));
	let result = [];
	result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
	if (isOptional) result.push(...restExploded);
	return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
	branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
	let segments = path.split("/");
	let initialScore = segments.length;
	if (segments.some(isSplat)) initialScore += splatPenalty;
	if (index) initialScore += indexRouteValue;
	return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
	return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
	let { routesMeta } = branch;
	let matchedParams = {};
	let matchedPathname = "/";
	let matches = [];
	for (let i = 0; i < routesMeta.length; ++i) {
		let meta = routesMeta[i];
		let end = i === routesMeta.length - 1;
		let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
		let pattern = {
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end
		};
		let match = meta.matcher && meta.compiledParams ? matchPathImpl(pattern, remainingPathname, meta.matcher, meta.compiledParams) : matchPath(pattern, remainingPathname);
		let route = meta.route;
		if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) match = matchPath({
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end: false
		}, remainingPathname);
		if (!match) return null;
		Object.assign(matchedParams, match.params);
		matches.push({
			params: matchedParams,
			pathname: joinPaths([matchedPathname, match.pathname]),
			pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
			route
		});
		if (match.pathnameBase !== "/") matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
	}
	return matches;
}
function matchPath(pattern, pathname) {
	if (typeof pattern === "string") pattern = {
		path: pattern,
		caseSensitive: false,
		end: true
	};
	let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
	return matchPathImpl(pattern, pathname, matcher, compiledParams);
}
function matchPathImpl(pattern, pathname, matcher, compiledParams) {
	let match = pathname.match(matcher);
	if (!match) return null;
	let matchedPathname = match[0];
	let pathnameBase = removeTrailingSlash(matchedPathname, 1);
	let captureGroups = match.slice(1);
	return {
		params: compiledParams.reduce((memo2, { paramName, isOptional }, index) => {
			if (paramName === "*") {
				let splatValue = captureGroups[index] || "";
				pathnameBase = removeTrailingSlash(matchedPathname.slice(0, matchedPathname.length - splatValue.length), 1);
			}
			const value = captureGroups[index];
			if (isOptional && !value) memo2[paramName] = void 0;
			else memo2[paramName] = (value || "").replace(/%2F/g, "/");
			return memo2;
		}, {}),
		pathname: matchedPathname,
		pathnameBase,
		pattern
	};
}
function compilePath(path, caseSensitive = false, end = true) {
	warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`);
	let params = [];
	let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (match, paramName, isOptional, index, str) => {
		params.push({
			paramName,
			isOptional: isOptional != null
		});
		if (isOptional) {
			let nextChar = str.charAt(index + match.length);
			if (nextChar && nextChar !== "/") return "/([^\\/]*)";
			return "(?:/([^\\/]*))?";
		}
		return "/([^\\/]+)";
	}).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
	if (path.endsWith("*")) {
		params.push({ paramName: "*" });
		regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
	} else if (end) regexpSource += "\\/*$";
	else if (path !== "" && path !== "/") regexpSource += "(?:(?=\\/|$))";
	return [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), params];
}
function decodePath(value) {
	try {
		return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
	} catch (error) {
		warning(false, `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`);
		return value;
	}
}
function stripBasename(pathname, basename) {
	if (basename === "/") return pathname;
	if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) return null;
	let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
	let nextChar = pathname.charAt(startIndex);
	if (nextChar && nextChar !== "/") return null;
	return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname = "/") {
	let { pathname: toPathname, search = "", hash = "" } = typeof to === "string" ? parsePath(to) : to;
	let pathname;
	if (toPathname) {
		toPathname = removeDoubleSlashes(toPathname);
		if (toPathname.startsWith("/") || toPathname.startsWith("\\")) pathname = resolvePathname(toPathname.substring(1), "/");
		else pathname = resolvePathname(toPathname, fromPathname);
	} else pathname = fromPathname;
	return {
		pathname,
		search: normalizeSearch(search),
		hash: normalizeHash(hash)
	};
}
function resolvePathname(relativePath, fromPathname) {
	let segments = removeTrailingSlash(fromPathname).split("/");
	relativePath.split("/").forEach((segment) => {
		if (segment === "..") {
			if (segments.length > 1) segments.pop();
		} else if (segment !== ".") segments.push(segment);
	});
	return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
	return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(path)}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
	return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches) {
	let pathMatches = getPathContributingMatches(matches);
	return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
	let to;
	if (typeof toArg === "string") to = parsePath(toArg);
	else {
		to = { ...toArg };
		invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
		invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
		invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
	}
	let isEmptyPath = toArg === "" || to.pathname === "";
	let toPathname = isEmptyPath ? "/" : to.pathname;
	let from;
	if (toPathname == null) from = locationPathname;
	else {
		let routePathnameIndex = routePathnames.length - 1;
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
	let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
	let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
	if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) path.pathname += "/";
	return path;
}
var removeDoubleSlashes = (path) => path.replace(/[\\/]{2,}/g, "/");
var joinPaths = (paths) => removeDoubleSlashes(paths.join("/"));
function removeTrailingSlash(path, minLength = 0) {
	let end = path.length;
	while (end > minLength && path.charCodeAt(end - 1) === 47) end--;
	return end === path.length ? path : path.slice(0, end);
}
var normalizePathname = (pathname) => removeTrailingSlash(pathname).replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var ErrorResponseImpl = class {
	constructor(status, statusText, data2, internal = false) {
		this.status = status;
		this.statusText = statusText || "";
		this.internal = internal;
		if (data2 instanceof Error) {
			this.data = data2.toString();
			this.error = data2;
		} else this.data = data2;
	}
};
function isRouteErrorResponse(error) {
	return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
	return joinPaths(matches.map((m) => m.route.path).filter(Boolean)) || "/";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename) {
	let to = _to;
	if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) return {
		absoluteURL: void 0,
		isExternal: false,
		to
	};
	let absoluteURL = to;
	let isExternal = false;
	if (isBrowser) try {
		let currentUrl = new URL(window.location.href);
		let targetUrl = PROTOCOL_RELATIVE_URL_REGEX.test(to) ? new URL(normalizeProtocolRelativeUrl(to, currentUrl.protocol)) : new URL(to);
		let path = stripBasename(targetUrl.pathname, basename);
		if (targetUrl.origin === currentUrl.origin && path != null) to = path + targetUrl.search + targetUrl.hash;
		else isExternal = true;
	} catch (e) {
		warning(false, `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`);
	}
	return {
		absoluteURL,
		isExternal,
		to
	};
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var DEFAULT_NAVIGATION_URL = new URL("http://localhost");
function getNavigatorCurrentUrl(navigator) {
	if (navigator.createURL) return navigator.createURL("/");
	try {
		return new URL(navigator.createHref("/"), DEFAULT_NAVIGATION_URL);
	} catch {
		return DEFAULT_NAVIGATION_URL;
	}
}
function isSameOrigin(a, b) {
	return a.origin === b.origin && (a.origin !== "null" || a.protocol === b.protocol && a.host === b.host);
}
function isExplicitUrl(destination, target) {
	if (destination.startsWith("//")) return true;
	let protocol = target.protocol.toLowerCase();
	if (!destination.toLowerCase().startsWith(protocol)) return false;
	return target.host === "" || destination.slice(protocol.length).startsWith("//");
}
function validateNavigationTarget(original, resolved, currentUrl, externalPolicy) {
	let originalUrl = null;
	try {
		originalUrl = original == null ? null : new URL(original, currentUrl);
	} catch {}
	let resolvedUrl = new URL(resolved, currentUrl);
	let originalIsExternal = originalUrl != null && !isSameOrigin(originalUrl, currentUrl);
	let resolvedIsExternal = !isSameOrigin(resolvedUrl, currentUrl);
	if (externalPolicy === "reject") {
		if (originalIsExternal || resolvedIsExternal) throw new Error("External navigation is not allowed");
	} else if (resolvedIsExternal) {
		if (originalUrl == null || !isExplicitUrl(original, originalUrl) || !isSameOrigin(originalUrl, resolvedUrl)) throw new Error("External navigation is not allowed");
	}
}
var validMutationMethodsArr = [
	"POST",
	"PUT",
	"PATCH",
	"DELETE"
];
new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["GET", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
var invalidProtocols = [
	"about:",
	"blob:",
	"chrome:",
	"chrome-untrusted:",
	"content:",
	"data:",
	"devtools:",
	"file:",
	"filesystem:",
	"javascript:"
];
function hasInvalidProtocol(location) {
	try {
		return invalidProtocols.includes(new URL(location).protocol);
	} catch {
		return false;
	}
}
var DataRouterContext = import_react.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = import_react.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = import_react.createContext(false);
function useIsRSCRouterContext() {
	return import_react.useContext(RSCRouterContext);
}
var ViewTransitionContext = import_react.createContext({ isTransitioning: false });
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = import_react.createContext(/* @__PURE__ */ new Map());
FetchersContext.displayName = "Fetchers";
var AwaitContext = import_react.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = import_react.createContext(null);
NavigationContext.displayName = "Navigation";
var LocationContext = import_react.createContext(null);
LocationContext.displayName = "Location";
var RouteContext = import_react.createContext({
	outlet: null,
	matches: [],
	isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = import_react.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
	if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) try {
		let parsed = JSON.parse(digest.slice(28));
		if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") return parsed;
	} catch {}
}
function decodeRouteErrorResponseDigest(digest) {
	if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`)) try {
		let parsed = JSON.parse(digest.slice(40));
		if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") return new ErrorResponseImpl(parsed.status, parsed.statusText, parsed.data);
	} catch {}
}
function useHref(to, { relative } = {}) {
	invariant(useInRouterContext(), `useHref() may be used only in the context of a <Router> component.`);
	let { basename, navigator } = import_react.useContext(NavigationContext);
	let { hash, pathname, search } = useResolvedPath(to, { relative });
	let joinedPathname = pathname;
	if (basename !== "/") joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
	return navigator.createHref({
		pathname: joinedPathname,
		search,
		hash
	});
}
function useInRouterContext() {
	return import_react.useContext(LocationContext) != null;
}
function useLocation() {
	invariant(useInRouterContext(), `useLocation() may be used only in the context of a <Router> component.`);
	return import_react.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
	if (!import_react.useContext(NavigationContext).static) import_react.useLayoutEffect(cb);
}
function useNavigate() {
	let { isDataRoute } = import_react.useContext(RouteContext);
	return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
	invariant(useInRouterContext(), `useNavigate() may be used only in the context of a <Router> component.`);
	let dataRouterContext = import_react.useContext(DataRouterContext);
	let { basename, navigator } = import_react.useContext(NavigationContext);
	let { matches } = import_react.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
	let activeRef = import_react.useRef(false);
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true;
	});
	return import_react.useCallback((to, options = {}) => {
		warning(activeRef.current, navigateEffectWarning);
		if (!activeRef.current) return;
		if (typeof to === "number") {
			navigator.go(to);
			return;
		}
		let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
		if (dataRouterContext == null && basename !== "/") path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
		validateNavigationTarget(typeof to === "string" ? to : createPath(to), navigator.createHref(path), getNavigatorCurrentUrl(navigator), "reject");
		(!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
	}, [
		basename,
		navigator,
		routePathnamesJson,
		locationPathname,
		dataRouterContext
	]);
}
var OutletContext = import_react.createContext(null);
function useOutlet(context) {
	let outlet = import_react.useContext(RouteContext).outlet;
	return import_react.useMemo(() => outlet && /* @__PURE__ */ import_react.createElement(OutletContext.Provider, { value: context }, outlet), [outlet, context]);
}
function useParams() {
	let { matches } = import_react.useContext(RouteContext);
	return matches[matches.length - 1]?.params ?? {};
}
function useResolvedPath(to, { relative } = {}) {
	let { matches } = import_react.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
	return import_react.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [
		to,
		routePathnamesJson,
		locationPathname,
		relative
	]);
}
function useRoutes(routes, locationArg) {
	return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
	invariant(useInRouterContext(), `useRoutes() may be used only in the context of a <Router> component.`);
	let { navigator } = import_react.useContext(NavigationContext);
	let { matches: parentMatches } = import_react.useContext(RouteContext);
	let routeMatch = parentMatches[parentMatches.length - 1];
	let parentParams = routeMatch ? routeMatch.params : {};
	let parentPathname = routeMatch ? routeMatch.pathname : "/";
	let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
	let parentRoute = routeMatch && routeMatch.route;
	{
		let parentPath = parentRoute && parentRoute.path || "";
		warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`);
	}
	let locationFromContext = useLocation();
	let location;
	if (locationArg) {
		let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
		invariant(parentPathnameBase === "/" || parsedLocationArg.pathname?.startsWith(parentPathnameBase), `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`);
		location = parsedLocationArg;
	} else location = locationFromContext;
	let pathname = location.pathname || "/";
	let remainingPathname = pathname;
	if (parentPathnameBase !== "/") {
		let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
		remainingPathname = "/" + pathname.replace(/^\//, "").split("/").slice(parentSegments.length).join("/");
	}
	let matches = dataRouterOpts && dataRouterOpts.state.matches.length ? dataRouterOpts.state.matches.map((m) => Object.assign(m, { route: dataRouterOpts.manifest[m.route.id] || m.route })) : matchRoutes(routes, { pathname: remainingPathname });
	warning(parentRoute || matches != null, `No routes matched location "${location.pathname}${location.search}${location.hash}" `);
	warning(matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0, `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
	let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
		params: Object.assign({}, parentParams, match.params),
		pathname: joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : match.pathname]),
		pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : match.pathnameBase])
	})), parentMatches, dataRouterOpts);
	if (locationArg && renderedMatches) return /* @__PURE__ */ import_react.createElement(LocationContext.Provider, { value: {
		location: {
			pathname: "/",
			search: "",
			hash: "",
			state: null,
			key: "default",
			mask: void 0,
			...location
		},
		navigationType: "POP"
	} }, renderedMatches);
	return renderedMatches;
}
function DefaultErrorComponent() {
	let error = useRouteError();
	let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
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
	console.error("Error handled by React Router default ErrorBoundary:", error);
	devInfo = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ import_react.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ import_react.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ import_react.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ import_react.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ import_react.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ import_react.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: props.location,
			revalidation: props.revalidation,
			error: props.error
		};
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	static getDerivedStateFromProps(props, state) {
		if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") return {
			error: props.error,
			location: props.location,
			revalidation: props.revalidation
		};
		return {
			error: props.error !== void 0 ? props.error : state.error,
			location: state.location,
			revalidation: props.revalidation || state.revalidation
		};
	}
	componentDidCatch(error, errorInfo) {
		if (this.props.onError) this.props.onError(error, errorInfo);
		else console.error("React Router caught the following error during render", error);
	}
	render() {
		let error = this.state.error;
		if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
			const decoded = decodeRouteErrorResponseDigest(error.digest);
			if (decoded) error = decoded;
		}
		let result = error !== void 0 ? /* @__PURE__ */ import_react.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ import_react.createElement(RouteErrorContext.Provider, {
			value: error,
			children: this.props.component
		})) : this.props.children;
		if (this.context) return /* @__PURE__ */ import_react.createElement(RSCErrorHandler, { error }, result);
		return result;
	}
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({ children, error }) {
	let { basename, navigator } = import_react.useContext(NavigationContext);
	if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
		let redirect2 = decodeRedirectErrorDigest(error.digest);
		if (redirect2) {
			let existingRedirect = errorRedirectHandledMap.get(error);
			if (existingRedirect) throw existingRedirect;
			let parsed = parseToInfo(redirect2.location, basename);
			let target = parsed.absoluteURL || parsed.to;
			validateNavigationTarget(redirect2.location, target, getNavigatorCurrentUrl(navigator), "allow-explicit");
			if (hasInvalidProtocol(target)) throw new Error("Invalid redirect location");
			if (isBrowser && !errorRedirectHandledMap.get(error)) {
				if (parsed.isExternal || redirect2.reloadDocument) window.location.href = target;
				else {
					const redirectPromise = Promise.resolve().then(() => window.__reactRouterDataRouter.navigate(parsed.to, { replace: redirect2.replace }));
					errorRedirectHandledMap.set(error, redirectPromise);
					throw redirectPromise;
				}
			}
			return /* @__PURE__ */ import_react.createElement("meta", {
				httpEquiv: "refresh",
				content: `0;url=${target}`
			});
		}
	}
	return children;
}
function RenderedRoute({ routeContext, match, children }) {
	let dataRouterContext = import_react.useContext(DataRouterContext);
	if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
	return /* @__PURE__ */ import_react.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
	let dataRouterState = dataRouterOpts?.state;
	if (matches == null) {
		if (!dataRouterState) return null;
		if (dataRouterState.errors) matches = dataRouterState.matches;
		else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) matches = dataRouterState.matches;
		else return null;
	}
	let renderedMatches = matches;
	let errors = dataRouterState?.errors;
	if (errors != null) {
		let errorIndex = renderedMatches.findIndex((m) => m.route.id && errors?.[m.route.id] !== void 0);
		invariant(errorIndex >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(errors).join(",")}`);
		renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
	}
	let renderFallback = false;
	let fallbackIndex = -1;
	if (dataRouterOpts && dataRouterState) {
		renderFallback = dataRouterState.renderFallback;
		for (let i = 0; i < renderedMatches.length; i++) {
			let match = renderedMatches[i];
			if (match.route.HydrateFallback || match.route.hydrateFallbackElement) fallbackIndex = i;
			if (match.route.id) {
				let { loaderData, errors: errors2 } = dataRouterState;
				let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
				if (match.route.lazy || needsToRunLoader) {
					if (dataRouterOpts.isStatic) renderFallback = true;
					if (fallbackIndex >= 0) renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
					else renderedMatches = [renderedMatches[0]];
					break;
				}
			}
		}
	}
	let onErrorHandler = dataRouterOpts?.onError;
	let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
		onErrorHandler(error, {
			location: dataRouterState.location,
			params: dataRouterState.matches?.[0]?.params ?? {},
			pattern: getRoutePattern(dataRouterState.matches),
			errorInfo
		});
	} : void 0;
	return renderedMatches.reduceRight((outlet, match, index) => {
		let error;
		let shouldRenderHydrateFallback = false;
		let errorElement = null;
		let hydrateFallbackElement = null;
		if (dataRouterState) {
			error = errors && match.route.id ? errors[match.route.id] : void 0;
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
		let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
		let getChildren = () => {
			let children;
			if (error) children = errorElement;
			else if (shouldRenderHydrateFallback) children = hydrateFallbackElement;
			else if (match.route.Component) children = /* @__PURE__ */ import_react.createElement(match.route.Component, null);
			else if (match.route.element) children = match.route.element;
			else children = outlet;
			return /* @__PURE__ */ import_react.createElement(RenderedRoute, {
				match,
				routeContext: {
					outlet,
					matches: matches2,
					isDataRoute: dataRouterState != null
				},
				children
			});
		};
		return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ import_react.createElement(RenderErrorBoundary, {
			location: dataRouterState.location,
			revalidation: dataRouterState.revalidation,
			component: errorElement,
			error,
			children: getChildren(),
			routeContext: {
				outlet: null,
				matches: matches2,
				isDataRoute: true
			},
			onError
		}) : getChildren();
	}, null);
}
function getDataRouterConsoleError(hookName) {
	return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
	let ctx = import_react.useContext(DataRouterContext);
	invariant(ctx, getDataRouterConsoleError(hookName));
	return ctx;
}
function useDataRouterState(hookName) {
	let state = import_react.useContext(DataRouterStateContext);
	invariant(state, getDataRouterConsoleError(hookName));
	return state;
}
function useRouteContext(hookName) {
	let route = import_react.useContext(RouteContext);
	invariant(route, getDataRouterConsoleError(hookName));
	return route;
}
function useCurrentRouteId(hookName) {
	let route = useRouteContext(hookName);
	let thisRoute = route.matches[route.matches.length - 1];
	invariant(thisRoute.route.id, `${hookName} can only be used on routes that contain a unique "id"`);
	return thisRoute.route.id;
}
function useRouteId() {
	return useCurrentRouteId("useRouteId");
}
function useNavigation() {
	let state = useDataRouterState("useNavigation");
	return import_react.useMemo(() => {
		let { matches, historyAction, ...rest } = state.navigation;
		return rest;
	}, [state.navigation]);
}
function useMatches() {
	let { matches, loaderData } = useDataRouterState("useMatches");
	return import_react.useMemo(() => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)), [matches, loaderData]);
}
function useRouteError() {
	let error = import_react.useContext(RouteErrorContext);
	let state = useDataRouterState("useRouteError");
	let routeId = useCurrentRouteId("useRouteError");
	if (error !== void 0) return error;
	return state.errors?.[routeId];
}
function useNavigateStable() {
	let { router } = useDataRouterContext("useNavigate");
	let id = useCurrentRouteId("useNavigate");
	let activeRef = import_react.useRef(false);
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true;
	});
	return import_react.useCallback(async (to, options = {}) => {
		warning(activeRef.current, navigateEffectWarning);
		if (!activeRef.current) return;
		if (typeof to === "number") await router.navigate(to);
		else await router.navigate(to, {
			fromRouteId: id,
			...options
		});
	}, [router, id]);
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
	if (!cond && !alreadyWarned[key]) {
		alreadyWarned[key] = true;
		warning(false, message);
	}
}
import_react.memo(DataRoutes2);
function DataRoutes2({ routes, manifest, future, state, isStatic, onError }) {
	return useRoutesImpl(routes, void 0, {
		manifest,
		state,
		isStatic,
		onError,
		future
	});
}
function Navigate({ to, replace: replace2, state, relative }) {
	invariant(useInRouterContext(), `<Navigate> may be used only in the context of a <Router> component.`);
	let { static: isStatic, navigator } = import_react.useContext(NavigationContext);
	warning(!isStatic, `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);
	let { matches } = import_react.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let navigate = useNavigate();
	let path = resolveTo(to, getResolveToMatches(matches), locationPathname, relative === "path");
	validateNavigationTarget(typeof to === "string" ? to : createPath(to), navigator.createHref(path), getNavigatorCurrentUrl(navigator), "reject");
	let jsonPath = JSON.stringify(path);
	import_react.useEffect(() => {
		navigate(JSON.parse(jsonPath), {
			replace: replace2,
			state,
			relative
		});
	}, [
		navigate,
		jsonPath,
		relative,
		replace2,
		state
	]);
	return null;
}
function Outlet(props) {
	return useOutlet(props.context);
}
function Route(props) {
	invariant(false, `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`);
}
function Router({ basename: basenameProp = "/", children = null, location: locationProp, navigationType = "POP", navigator, static: staticProp = false, useTransitions }) {
	invariant(!useInRouterContext(), `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);
	let basename = basenameProp.replace(/^\/*/, "/");
	let navigationContext = import_react.useMemo(() => ({
		basename,
		navigator,
		static: staticProp,
		useTransitions,
		future: {}
	}), [
		basename,
		navigator,
		staticProp,
		useTransitions
	]);
	if (typeof locationProp === "string") locationProp = parsePath(locationProp);
	let { pathname = "/", search = "", hash = "", state = null, key = "default", mask } = locationProp;
	let locationContext = import_react.useMemo(() => {
		let trailingPathname = stripBasename(pathname, basename);
		if (trailingPathname == null) return null;
		return {
			location: {
				pathname: trailingPathname,
				search,
				hash,
				state,
				key,
				mask
			},
			navigationType
		};
	}, [
		basename,
		pathname,
		search,
		hash,
		state,
		key,
		navigationType,
		mask
	]);
	warning(locationContext != null, `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`);
	if (locationContext == null) return null;
	return /* @__PURE__ */ import_react.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ import_react.createElement(LocationContext.Provider, {
		children,
		value: locationContext
	}));
}
function Routes({ children, location }) {
	return useRoutes(createRoutesFromChildren(children), location);
}
import_react.Component;
function createRoutesFromChildren(children, parentPath = []) {
	let routes = [];
	import_react.Children.forEach(children, (element, index) => {
		if (!import_react.isValidElement(element)) return;
		let treePath = [...parentPath, index];
		if (element.type === import_react.Fragment) {
			routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
			return;
		}
		invariant(element.type === Route, `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`);
		invariant(!element.props.index || !element.props.children, "An index route cannot have child routes.");
		let route = {
			id: element.props.id || treePath.join("-"),
			caseSensitive: element.props.caseSensitive,
			element: element.props.element,
			Component: element.props.Component,
			index: element.props.index,
			path: element.props.path,
			middleware: element.props.middleware,
			loader: element.props.loader,
			action: element.props.action,
			hydrateFallbackElement: element.props.hydrateFallbackElement,
			HydrateFallback: element.props.HydrateFallback,
			errorElement: element.props.errorElement,
			ErrorBoundary: element.props.ErrorBoundary,
			hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
			shouldRevalidate: element.props.shouldRevalidate,
			handle: element.props.handle,
			lazy: element.props.lazy
		};
		if (element.props.children) route.children = createRoutesFromChildren(element.props.children, treePath);
		routes.push(route);
	});
	return routes;
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
	return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
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
	return event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event);
}
function createSearchParams(init = "") {
	return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo2, key) => {
		let value = init[key];
		return memo2.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
	}, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
	let searchParams = createSearchParams(locationSearch);
	if (defaultSearchParams) defaultSearchParams.forEach((_, key) => {
		if (!searchParams.has(key)) defaultSearchParams.getAll(key).forEach((value) => {
			searchParams.append(key, value);
		});
	});
	return searchParams;
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
	if (_formDataSupportsSubmitter === null) try {
		new FormData(document.createElement("form"), 0);
		_formDataSupportsSubmitter = false;
	} catch (e) {
		_formDataSupportsSubmitter = true;
	}
	return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
]);
function getFormEncType(encType) {
	if (encType != null && !supportedFormEncTypes.has(encType)) {
		warning(false, `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`);
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
		let attr = target.getAttribute("action");
		action = attr ? stripBasename(attr, basename) : null;
		method = target.getAttribute("method") || defaultMethod;
		encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
		formData = new FormData(target);
	} else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
		let form = target.form;
		if (form == null) throw new Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);
		let attr = target.getAttribute("formaction") || form.getAttribute("action");
		action = attr ? stripBasename(attr, basename) : null;
		method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
		encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
		formData = new FormData(form, target);
		if (!isFormDataSubmitterSupported()) {
			let { name, type, value } = target;
			if (type === "image") {
				let prefix = name ? `${name}.` : "";
				formData.append(`${prefix}x`, "0");
				formData.append(`${prefix}y`, "0");
			} else if (name) formData.append(name, value);
		}
	} else if (isHtmlElement(target)) throw new Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);
	else {
		method = defaultMethod;
		action = null;
		encType = defaultEncType;
		body = target;
	}
	if (formData && encType === "text/plain") {
		body = formData;
		formData = void 0;
	}
	return {
		action,
		method: method.toLowerCase(),
		encType,
		formData,
		body
	};
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var ESCAPE_LOOKUP = {
	"&": "\\u0026",
	">": "\\u003e",
	"<": "\\u003c",
	"\u2028": "\\u2028",
	"\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
	return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function invariant2(value, message) {
	if (value === false || value === null || typeof value === "undefined") throw new Error(message);
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
	let url = typeof reqUrl === "string" ? new URL(reqUrl, typeof window === "undefined" ? "server://singlefetch/" : window.location.origin) : reqUrl;
	if (trailingSlashAware) {
		if (url.pathname.endsWith("/")) url.pathname = `${url.pathname}_.${extension}`;
		else url.pathname = `${url.pathname}.${extension}`;
	} else if (url.pathname === "/") url.pathname = `_root.${extension}`;
	else if (basename && stripBasename(url.pathname, basename) === "/") url.pathname = `${removeTrailingSlash(basename)}/_root.${extension}`;
	else url.pathname = `${removeTrailingSlash(url.pathname)}.${extension}`;
	return url;
}
async function loadRouteModule(route, routeModulesCache) {
	if (route.id in routeModulesCache) return routeModulesCache[route.id];
	try {
		let routeModule = await import(
			/* @vite-ignore */
			/* webpackIgnore: true */
			route.module
);
		routeModulesCache[route.id] = routeModule;
		return routeModule;
	} catch (error) {
		console.error(`Error loading route module \`${route.module}\`, reloading page...`);
		console.error(error);
		if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && void 0);
		window.location.reload();
		return new Promise(() => {});
	}
}
function isPageLinkDescriptor(object) {
	return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
	if (object == null) return false;
	if (object.href == null) return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
	return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
	return dedupeLinkDescriptors((await Promise.all(matches.map(async (match) => {
		let route = manifest.routes[match.route.id];
		if (route) {
			let mod = await loadRouteModule(route, routeModules);
			return mod.links ? mod.links() : [];
		}
		return [];
	}))).flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "stylesheet" ? {
		...link,
		rel: "prefetch",
		as: "style"
	} : {
		...link,
		rel: "prefetch"
	}));
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
	let isNew = (match, index) => {
		if (!currentMatches[index]) return true;
		return match.route.id !== currentMatches[index].route.id;
	};
	let matchPathChanged = (match, index) => {
		return currentMatches[index].pathname !== match.pathname || currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"];
	};
	if (mode === "assets") return nextMatches.filter((match, index) => isNew(match, index) || matchPathChanged(match, index));
	if (mode === "data") return nextMatches.filter((match, index) => {
		let manifestRoute = manifest.routes[match.route.id];
		if (!manifestRoute || !manifestRoute.hasLoader) return false;
		if (isNew(match, index) || matchPathChanged(match, index)) return true;
		if (match.route.shouldRevalidate) {
			let routeChoice = match.route.shouldRevalidate({
				currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
				currentParams: currentMatches[0]?.params || {},
				nextUrl: new URL(page, window.origin),
				nextParams: match.params,
				defaultShouldRevalidate: true
			});
			if (typeof routeChoice === "boolean") return routeChoice;
		}
		return true;
	});
	return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
	return dedupeHrefs(matches.map((match) => {
		let route = manifest.routes[match.route.id];
		if (!route) return [];
		let hrefs = [route.module];
		if (route.clientActionModule) hrefs = hrefs.concat(route.clientActionModule);
		if (route.clientLoaderModule) hrefs = hrefs.concat(route.clientLoaderModule);
		if (includeHydrateFallback && route.hydrateFallbackModule) hrefs = hrefs.concat(route.hydrateFallbackModule);
		if (route.imports) hrefs = hrefs.concat(route.imports);
		return hrefs;
	}).flat(1));
}
function dedupeHrefs(hrefs) {
	return [...new Set(hrefs)];
}
function sortKeys(obj) {
	let sorted = {};
	let keys = Object.keys(obj).sort();
	for (let key of keys) sorted[key] = obj[key];
	return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
	let set = /* @__PURE__ */ new Set();
	let preloadsSet = new Set(preloads);
	return descriptors.reduce((deduped, descriptor) => {
		if (preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href)) return deduped;
		let key = JSON.stringify(sortKeys(descriptor));
		if (!set.has(key)) {
			set.add(key);
			deduped.push({
				key,
				link: descriptor
			});
		}
		return deduped;
	}, []);
}
function useDataRouterContext2() {
	let context = import_react.useContext(DataRouterContext);
	invariant2(context, "You must render this element inside a <DataRouterContext.Provider> element");
	return context;
}
function useDataRouterStateContext() {
	let context = import_react.useContext(DataRouterStateContext);
	invariant2(context, "You must render this element inside a <DataRouterStateContext.Provider> element");
	return context;
}
var FrameworkContext = import_react.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
	let context = import_react.useContext(FrameworkContext);
	invariant2(context, "You must render this element inside a <HydratedRouter> element");
	return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
	let frameworkContext = import_react.useContext(FrameworkContext);
	let [maybePrefetch, setMaybePrefetch] = import_react.useState(false);
	let [shouldPrefetch, setShouldPrefetch] = import_react.useState(false);
	let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
	let ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (prefetch === "render") setShouldPrefetch(true);
		if (prefetch === "viewport") {
			let callback = (entries) => {
				entries.forEach((entry) => {
					setShouldPrefetch(entry.isIntersecting);
				});
			};
			let observer = new IntersectionObserver(callback, { threshold: .5 });
			if (ref.current) observer.observe(ref.current);
			return () => {
				observer.disconnect();
			};
		}
	}, [prefetch]);
	import_react.useEffect(() => {
		if (maybePrefetch) {
			let id = setTimeout(() => {
				setShouldPrefetch(true);
			}, 100);
			return () => {
				clearTimeout(id);
			};
		}
	}, [maybePrefetch]);
	let setIntent = () => {
		setMaybePrefetch(true);
	};
	let cancelIntent = () => {
		setMaybePrefetch(false);
		setShouldPrefetch(false);
	};
	if (!frameworkContext) return [
		false,
		ref,
		{}
	];
	if (prefetch !== "intent") return [
		shouldPrefetch,
		ref,
		{}
	];
	return [
		shouldPrefetch,
		ref,
		{
			onFocus: composeEventHandlers(onFocus, setIntent),
			onBlur: composeEventHandlers(onBlur, cancelIntent),
			onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
			onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
			onTouchStart: composeEventHandlers(onTouchStart, setIntent)
		}
	];
}
function composeEventHandlers(theirHandler, ourHandler) {
	return (event) => {
		theirHandler && theirHandler(event);
		if (!event.defaultPrevented) ourHandler(event);
	};
}
function PrefetchPageLinks({ page, ...linkProps }) {
	let rsc = useIsRSCRouterContext();
	let { nonce: contextNonce } = useFrameworkContext();
	let { router } = useDataRouterContext2();
	let matches = import_react.useMemo(() => matchRoutes(router.routes, page, router.basename), [
		router.routes,
		page,
		router.basename
	]);
	if (!matches) return null;
	if (linkProps.nonce == null && contextNonce) linkProps = {
		...linkProps,
		nonce: contextNonce
	};
	if (rsc) return /* @__PURE__ */ import_react.createElement(RSCPrefetchPageLinksImpl, {
		page,
		matches,
		...linkProps
	});
	return /* @__PURE__ */ import_react.createElement(PrefetchPageLinksImpl, {
		page,
		matches,
		...linkProps
	});
}
function useKeyedPrefetchLinks(matches) {
	let { manifest, routeModules } = useFrameworkContext();
	let [keyedPrefetchLinks, setKeyedPrefetchLinks] = import_react.useState([]);
	import_react.useEffect(() => {
		let interrupted = false;
		getKeyedPrefetchLinks(matches, manifest, routeModules).then((links) => {
			if (!interrupted) setKeyedPrefetchLinks(links);
		});
		return () => {
			interrupted = true;
		};
	}, [
		matches,
		manifest,
		routeModules
	]);
	return keyedPrefetchLinks;
}
function RSCPrefetchPageLinksImpl({ page, matches: nextMatches, ...linkProps }) {
	let location = useLocation();
	let { future } = useFrameworkContext();
	let { basename } = useDataRouterContext2();
	let dataHrefs = import_react.useMemo(() => {
		if (page === location.pathname + location.search + location.hash) return [];
		let url = singleFetchUrl(page, basename, future.v8_trailingSlashAwareDataRequests, "rsc");
		let hasSomeRoutesWithShouldRevalidate = false;
		let targetRoutes = [];
		for (let match of nextMatches) if (typeof match.route.shouldRevalidate === "function") hasSomeRoutesWithShouldRevalidate = true;
		else targetRoutes.push(match.route.id);
		if (hasSomeRoutesWithShouldRevalidate && targetRoutes.length > 0) url.searchParams.set("_routes", targetRoutes.join(","));
		return [url.pathname + url.search];
	}, [
		basename,
		future.v8_trailingSlashAwareDataRequests,
		page,
		location,
		nextMatches
	]);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ import_react.createElement("link", {
		key: href,
		rel: "prefetch",
		as: "fetch",
		href,
		...linkProps
	})));
}
function PrefetchPageLinksImpl({ page, matches: nextMatches, ...linkProps }) {
	let location = useLocation();
	let { future, manifest, routeModules } = useFrameworkContext();
	let { basename } = useDataRouterContext2();
	let { loaderData, matches } = useDataRouterStateContext();
	let newMatchesForData = import_react.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [
		page,
		nextMatches,
		matches,
		manifest,
		location
	]);
	let newMatchesForAssets = import_react.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [
		page,
		nextMatches,
		matches,
		manifest,
		location
	]);
	let dataHrefs = import_react.useMemo(() => {
		if (page === location.pathname + location.search + location.hash) return [];
		let routesParams = /* @__PURE__ */ new Set();
		let foundOptOutRoute = false;
		nextMatches.forEach((m) => {
			let manifestRoute = manifest.routes[m.route.id];
			if (!manifestRoute || !manifestRoute.hasLoader) return;
			if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) foundOptOutRoute = true;
			else if (manifestRoute.hasClientLoader) foundOptOutRoute = true;
			else routesParams.add(m.route.id);
		});
		if (routesParams.size === 0) return [];
		let url = singleFetchUrl(page, basename, future.v8_trailingSlashAwareDataRequests, "data");
		if (foundOptOutRoute && routesParams.size > 0) url.searchParams.set("_routes", nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(","));
		return [url.pathname + url.search];
	}, [
		basename,
		future.v8_trailingSlashAwareDataRequests,
		loaderData,
		location,
		manifest,
		newMatchesForData,
		nextMatches,
		page,
		routeModules
	]);
	let moduleHrefs = import_react.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]);
	let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ import_react.createElement("link", {
		key: href,
		rel: "prefetch",
		as: "fetch",
		href,
		...linkProps
	})), moduleHrefs.map((href) => /* @__PURE__ */ import_react.createElement("link", {
		key: href,
		rel: "modulepreload",
		href,
		...linkProps
	})), keyedPrefetchLinks.map(({ key, link }) => /* @__PURE__ */ import_react.createElement("link", {
		key,
		nonce: linkProps.nonce,
		...link,
		crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
	})));
}
function mergeRefs(...refs) {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") ref(value);
			else if (ref != null) ref.current = value;
		});
	};
}
import_react.Component;
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
	if (isBrowser2) window.__reactRouterVersion = "7.18.4";
} catch (e) {}
function HistoryRouter({ basename, children, history, useTransitions }) {
	let [state, setStateImpl] = import_react.useState({
		action: history.action,
		location: history.location
	});
	let setState = import_react.useCallback((newState) => {
		if (useTransitions === false) setStateImpl(newState);
		else import_react.startTransition(() => setStateImpl(newState));
	}, [useTransitions]);
	import_react.useLayoutEffect(() => history.listen(setState), [history, setState]);
	return /* @__PURE__ */ import_react.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		useTransitions
	});
}
HistoryRouter.displayName = "unstable_HistoryRouter";
var Link = import_react.forwardRef(function LinkWithRef({ onClick, discover = "render", prefetch = "none", relative, reloadDocument, replace: replace2, mask, state, target, to, preventScrollReset, viewTransition, defaultShouldRevalidate, ...rest }, forwardedRef) {
	let { basename, navigator, useTransitions } = import_react.useContext(NavigationContext);
	let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
	let parsed = parseToInfo(to, basename);
	to = parsed.to;
	let href = useHref(to, { relative });
	let location = useLocation();
	let maskedHref = null;
	if (mask) {
		let resolved = resolveTo(mask, [], location.mask ? location.mask.pathname : "/", true);
		if (basename !== "/") resolved.pathname = resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname]);
		maskedHref = navigator.createHref(resolved);
	}
	let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(prefetch, rest);
	let internalOnClick = useLinkClickHandler(to, {
		replace: replace2,
		mask,
		state,
		target,
		preventScrollReset,
		relative,
		viewTransition,
		defaultShouldRevalidate,
		useTransitions
	});
	function handleClick(event) {
		if (onClick) onClick(event);
		if (!event.defaultPrevented) internalOnClick(event);
	}
	let isSpaLink = !(parsed.isExternal || reloadDocument);
	let link = /* @__PURE__ */ import_react.createElement("a", {
		...rest,
		...prefetchHandlers,
		href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
		onClick: isSpaLink ? handleClick : onClick,
		ref: mergeRefs(forwardedRef, prefetchRef),
		target,
		"data-discover": !isAbsolute && discover === "render" ? "true" : void 0
	});
	return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, link, /* @__PURE__ */ import_react.createElement(PrefetchPageLinks, { page: href })) : link;
});
Link.displayName = "Link";
var NavLink = import_react.forwardRef(function NavLinkWithRef({ "aria-current": ariaCurrentProp = "page", caseSensitive = false, className: classNameProp = "", end = false, style: styleProp, to, viewTransition, children, ...rest }, ref) {
	let path = useResolvedPath(to, { relative: rest.relative });
	let location = useLocation();
	let routerState = import_react.useContext(DataRouterStateContext);
	let { navigator, basename } = import_react.useContext(NavigationContext);
	let isTransitioning = routerState != null && useViewTransitionState(path) && viewTransition === true;
	let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
	let locationPathname = location.pathname;
	let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
	if (!caseSensitive) {
		locationPathname = locationPathname.toLowerCase();
		nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
		toPathname = toPathname.toLowerCase();
	}
	if (nextLocationPathname && basename) nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
	const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
	let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
	let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
	let renderProps = {
		isActive,
		isPending,
		isTransitioning
	};
	let ariaCurrent = isActive ? ariaCurrentProp : void 0;
	let className;
	if (typeof classNameProp === "function") className = classNameProp(renderProps);
	else className = [
		classNameProp,
		isActive ? "active" : null,
		isPending ? "pending" : null,
		isTransitioning ? "transitioning" : null
	].filter(Boolean).join(" ");
	let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
	return /* @__PURE__ */ import_react.createElement(Link, {
		...rest,
		"aria-current": ariaCurrent,
		className,
		ref,
		style,
		to,
		viewTransition
	}, typeof children === "function" ? children(renderProps) : children);
});
NavLink.displayName = "NavLink";
var Form = import_react.forwardRef(({ discover = "render", fetcherKey, navigate, reloadDocument, replace: replace2, state, method = defaultMethod, action, onSubmit, relative, preventScrollReset, viewTransition, defaultShouldRevalidate, ...props }, forwardedRef) => {
	let { useTransitions } = import_react.useContext(NavigationContext);
	let submit = useSubmit();
	let formAction = useFormAction(action, { relative });
	let formMethod = method.toLowerCase() === "get" ? "get" : "post";
	let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX.test(action);
	let submitHandler = (event) => {
		onSubmit && onSubmit(event);
		if (event.defaultPrevented) return;
		event.preventDefault();
		let submitter = event.nativeEvent.submitter;
		let submitMethod = submitter?.getAttribute("formmethod") || method;
		let doSubmit = () => submit(submitter || event.currentTarget, {
			fetcherKey,
			method: submitMethod,
			navigate,
			replace: replace2,
			state,
			relative,
			preventScrollReset,
			viewTransition,
			defaultShouldRevalidate
		});
		if (useTransitions && navigate !== false) import_react.startTransition(() => doSubmit());
		else doSubmit();
	};
	return /* @__PURE__ */ import_react.createElement("form", {
		ref: forwardedRef,
		method: formMethod,
		action: formAction,
		onSubmit: reloadDocument ? onSubmit : submitHandler,
		...props,
		"data-discover": !isAbsolute && discover === "render" ? "true" : void 0
	});
});
Form.displayName = "Form";
function ScrollRestoration({ getKey, storageKey, ...props }) {
	let remixContext = import_react.useContext(FrameworkContext);
	let { basename } = import_react.useContext(NavigationContext);
	let location = useLocation();
	let matches = useMatches();
	useScrollRestoration({
		getKey,
		storageKey
	});
	let ssrKey = import_react.useMemo(() => {
		if (!remixContext || !getKey) return null;
		let userKey = getScrollRestorationKey(location, matches, basename, getKey);
		return userKey !== location.key ? userKey : null;
	}, []);
	if (!remixContext || remixContext.isSpaMode) return null;
	let restoreScroll = ((storageKey2, restoreKey) => {
		if (!window.history.state || !window.history.state.key) {
			let key = Math.random().toString(32).slice(2);
			window.history.replaceState({ key }, "");
		}
		try {
			let storedY = JSON.parse(sessionStorage.getItem(storageKey2) || "{}")[restoreKey || window.history.state.key];
			if (typeof storedY === "number") window.scrollTo(0, storedY);
		} catch (error) {
			console.error(error);
			sessionStorage.removeItem(storageKey2);
		}
	}).toString();
	if (props.nonce == null && remixContext?.nonce) props.nonce = remixContext.nonce;
	return /* @__PURE__ */ import_react.createElement("script", {
		...props,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: `(${restoreScroll})(${escapeHtml(JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY))}, ${escapeHtml(JSON.stringify(ssrKey))})` }
	});
}
ScrollRestoration.displayName = "ScrollRestoration";
function getDataRouterConsoleError2(hookName) {
	return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
	let ctx = import_react.useContext(DataRouterContext);
	invariant(ctx, getDataRouterConsoleError2(hookName));
	return ctx;
}
function useDataRouterState2(hookName) {
	let state = import_react.useContext(DataRouterStateContext);
	invariant(state, getDataRouterConsoleError2(hookName));
	return state;
}
function useLinkClickHandler(to, { target, replace: replaceProp, mask, state, preventScrollReset, relative, viewTransition, defaultShouldRevalidate, useTransitions } = {}) {
	let navigate = useNavigate();
	let location = useLocation();
	let path = useResolvedPath(to, { relative });
	return import_react.useCallback((event) => {
		if (shouldProcessLinkClick(event, target)) {
			event.preventDefault();
			let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
			let doNavigate = () => navigate(to, {
				replace: replace2,
				mask,
				state,
				preventScrollReset,
				relative,
				viewTransition,
				defaultShouldRevalidate
			});
			if (useTransitions) import_react.startTransition(() => doNavigate());
			else doNavigate();
		}
	}, [
		location,
		navigate,
		path,
		replaceProp,
		mask,
		state,
		target,
		to,
		preventScrollReset,
		relative,
		viewTransition,
		defaultShouldRevalidate,
		useTransitions
	]);
}
function useSearchParams(defaultInit) {
	warning(typeof URLSearchParams !== "undefined", `You cannot use the \`useSearchParams\` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.`);
	let defaultSearchParamsRef = import_react.useRef(createSearchParams(defaultInit));
	let hasSetSearchParamsRef = import_react.useRef(false);
	let location = useLocation();
	let searchParams = import_react.useMemo(() => getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
	let navigate = useNavigate();
	return [searchParams, import_react.useCallback((nextInit, navigateOptions) => {
		const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(new URLSearchParams(searchParams)) : nextInit);
		hasSetSearchParamsRef.current = true;
		navigate("?" + newSearchParams, navigateOptions);
	}, [navigate, searchParams])];
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
	let { router } = useDataRouterContext3("useSubmit");
	let { basename } = import_react.useContext(NavigationContext);
	let currentRouteId = useRouteId();
	let routerFetch = router.fetch;
	let routerNavigate = router.navigate;
	return import_react.useCallback(async (target, options = {}) => {
		let { action, method, encType, formData, body } = getFormSubmissionInfo(target, basename);
		if (options.navigate === false) {
			let key = options.fetcherKey || getUniqueFetcherId();
			await routerFetch(key, currentRouteId, options.action || action, {
				defaultShouldRevalidate: options.defaultShouldRevalidate,
				preventScrollReset: options.preventScrollReset,
				formData,
				body,
				formMethod: options.method || method,
				formEncType: options.encType || encType,
				flushSync: options.flushSync
			});
		} else await routerNavigate(options.action || action, {
			defaultShouldRevalidate: options.defaultShouldRevalidate,
			preventScrollReset: options.preventScrollReset,
			formData,
			body,
			formMethod: options.method || method,
			formEncType: options.encType || encType,
			replace: options.replace,
			state: options.state,
			fromRouteId: currentRouteId,
			flushSync: options.flushSync,
			viewTransition: options.viewTransition
		});
	}, [
		routerFetch,
		routerNavigate,
		basename,
		currentRouteId
	]);
}
function useFormAction(action, { relative } = {}) {
	let { basename } = import_react.useContext(NavigationContext);
	let routeContext = import_react.useContext(RouteContext);
	invariant(routeContext, "useFormAction must be used inside a RouteContext");
	let [match] = routeContext.matches.slice(-1);
	let path = { ...useResolvedPath(action ? action : ".", { relative }) };
	let location = useLocation();
	if (action == null) {
		path.search = location.search;
		let params = new URLSearchParams(path.search);
		let indexValues = params.getAll("index");
		if (indexValues.some((v) => v === "")) {
			params.delete("index");
			indexValues.filter((v) => v).forEach((v) => params.append("index", v));
			let qs = params.toString();
			path.search = qs ? `?${qs}` : "";
		}
	}
	if ((!action || action === ".") && match.route.index) path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
	if (basename !== "/") path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
	return createPath(path);
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function getScrollRestorationKey(location, matches, basename, getKey) {
	let key = null;
	if (getKey) {
		if (basename !== "/") key = getKey({
			...location,
			pathname: stripBasename(location.pathname, basename) || location.pathname
		}, matches);
		else key = getKey(location, matches);
	}
	if (key == null) key = location.key;
	return key;
}
function useScrollRestoration({ getKey, storageKey } = {}) {
	let { router } = useDataRouterContext3("useScrollRestoration");
	let { restoreScrollPosition, preventScrollReset } = useDataRouterState2("useScrollRestoration");
	let { basename } = import_react.useContext(NavigationContext);
	let location = useLocation();
	let matches = useMatches();
	let navigation = useNavigation();
	import_react.useEffect(() => {
		window.history.scrollRestoration = "manual";
		return () => {
			window.history.scrollRestoration = "auto";
		};
	}, []);
	usePageHide(import_react.useCallback(() => {
		if (navigation.state === "idle") {
			let key = getScrollRestorationKey(location, matches, basename, getKey);
			savedScrollPositions[key] = window.scrollY;
		}
		try {
			sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
		} catch (error) {
			warning(false, `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`);
		}
		window.history.scrollRestoration = "auto";
	}, [
		navigation.state,
		getKey,
		basename,
		location,
		matches,
		storageKey
	]));
	if (typeof document !== "undefined") {
		import_react.useLayoutEffect(() => {
			try {
				let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
				if (sessionPositions) savedScrollPositions = JSON.parse(sessionPositions);
			} catch (e) {}
		}, [storageKey]);
		import_react.useLayoutEffect(() => {
			let disableScrollRestoration = router?.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey) : void 0);
			return () => disableScrollRestoration && disableScrollRestoration();
		}, [
			router,
			basename,
			getKey
		]);
		import_react.useLayoutEffect(() => {
			if (restoreScrollPosition === false) return;
			if (typeof restoreScrollPosition === "number") {
				window.scrollTo(0, restoreScrollPosition);
				return;
			}
			try {
				if (location.hash) {
					let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
					if (el) {
						el.scrollIntoView();
						return;
					}
				}
			} catch {
				warning(false, `"${location.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`);
			}
			if (preventScrollReset === true) return;
			window.scrollTo(0, 0);
		}, [
			location,
			restoreScrollPosition,
			preventScrollReset
		]);
	}
}
function usePageHide(callback, options) {
	let { capture } = options || {};
	import_react.useEffect(() => {
		let opts = capture != null ? { capture } : void 0;
		window.addEventListener("pagehide", callback, opts);
		return () => {
			window.removeEventListener("pagehide", callback, opts);
		};
	}, [callback, capture]);
}
function useViewTransitionState(to, { relative } = {}) {
	let vtContext = import_react.useContext(ViewTransitionContext);
	invariant(vtContext != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
	let { basename } = useDataRouterContext3("useViewTransitionState");
	let path = useResolvedPath(to, { relative });
	if (!vtContext.isTransitioning) return false;
	let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
	let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
	return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
function StaticRouter({ basename, children, location: locationProp = "/" }) {
	if (typeof locationProp === "string") locationProp = parsePath(locationProp);
	let action = "POP";
	let location = {
		pathname: locationProp.pathname || "/",
		search: locationProp.search || "",
		hash: locationProp.hash || "",
		state: locationProp.state != null ? locationProp.state : null,
		key: locationProp.key || "default",
		mask: void 0
	};
	let staticNavigator = getStatelessNavigator();
	return /* @__PURE__ */ import_react.createElement(Router, {
		basename,
		children,
		location,
		navigationType: action,
		navigator: staticNavigator,
		static: true,
		useTransitions: false
	});
}
function getStatelessNavigator() {
	return {
		createHref,
		encodeLocation,
		push(to) {
			throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
		},
		replace(to) {
			throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
		},
		go(delta) {
			throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
		},
		back() {
			throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
		},
		forward() {
			throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
		}
	};
}
function createHref(to) {
	return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
	let href = typeof to === "string" ? to : createPath(to);
	href = href.replace(/ $/, "%20");
	let encoded = ABSOLUTE_URL_REGEX.test(href) ? new URL(href) : new URL(href, "http://localhost");
	return {
		pathname: encoded.pathname,
		search: encoded.search,
		hash: encoded.hash
	};
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.development.js
/**
* @license React
* react-jsx-runtime.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	"production" !== process.env.NODE_ENV && (function() {
		function getComponentNameFromType(type) {
			if (null == type) return null;
			if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
			if ("string" === typeof type) return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
				case REACT_ACTIVITY_TYPE: return "Activity";
				case REACT_VIEW_TRANSITION_TYPE: return "ViewTransition";
			}
			if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_CONTEXT_TYPE: return type.displayName || "Context";
				case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
				case REACT_FORWARD_REF_TYPE:
					var innerType = type.render;
					type = type.displayName;
					type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
					return type;
				case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					innerType = type._payload;
					type = type._init;
					try {
						return getComponentNameFromType(type(innerType));
					} catch (x) {}
			}
			return null;
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			try {
				testStringCoercion(value);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			if (JSCompiler_inline_result) {
				JSCompiler_inline_result = console;
				var JSCompiler_temp_const = JSCompiler_inline_result.error;
				var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
				JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
				return testStringCoercion(value);
			}
		}
		function getTaskName(type) {
			if (type === REACT_FRAGMENT_TYPE) return "<>";
			if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
			try {
				var name = getComponentNameFromType(type);
				return name ? "<" + name + ">" : "<...>";
			} catch (x) {
				return "<...>";
			}
		}
		function getOwner() {
			var dispatcher = ReactSharedInternals.A;
			return null === dispatcher ? null : dispatcher.getOwner();
		}
		function UnknownOwner() {
			return Error("react-stack-top-frame");
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return !1;
			}
			return void 0 !== config.key;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			function warnAboutAccessingKey() {
				specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
			}
			warnAboutAccessingKey.isReactWarning = !0;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: !0
			});
		}
		function elementRefGetterWithDeprecationWarning() {
			var componentName = getComponentNameFromType(this.type);
			didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
			componentName = this.props.ref;
			return void 0 !== componentName ? componentName : null;
		}
		function ReactElement(type, key, props, owner, debugStack, debugTask) {
			var refProp = props.ref;
			type = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				props,
				_owner: owner
			};
			null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
				enumerable: !1,
				get: elementRefGetterWithDeprecationWarning
			}) : Object.defineProperty(type, "ref", {
				enumerable: !1,
				value: null
			});
			type._store = {};
			Object.defineProperty(type._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			});
			Object.defineProperty(type, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			});
			Object.defineProperty(type, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugStack
			});
			Object.defineProperty(type, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugTask
			});
			Object.freeze && (Object.freeze(type.props), Object.freeze(type));
			return type;
		}
		function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
			var children = config.children;
			if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
				for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++) validateChildKeys(children[isStaticChildren]);
				Object.freeze && Object.freeze(children);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else validateChildKeys(children);
			if (hasOwnProperty.call(config, "key")) {
				children = getComponentNameFromType(type);
				var keys = Object.keys(config).filter(function(k) {
					return "key" !== k;
				});
				isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
				didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
			}
			children = null;
			void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
			hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
			if ("key" in config) {
				maybeKey = {};
				for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
			} else maybeKey = config;
			children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
			return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
		}
		function validateChildKeys(node) {
			isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
		}
		function isValidElement(object) {
			return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
			return null;
		};
		React = { react_stack_bottom_frame: function(callStackForError) {
			return callStackForError();
		} };
		var specialPropKeyWarningShown;
		var didWarnAboutElementRef = {};
		var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
		var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
		var didWarnAboutKeySpread = {};
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.jsx = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			if (trackActualOwner) {
				var previousStackTraceLimit = Error.stackTraceLimit;
				Error.stackTraceLimit = 10;
				var debugStackDEV = Error("react-stack-top-frame");
				Error.stackTraceLimit = previousStackTraceLimit;
			} else debugStackDEV = unknownOwnerDebugStack;
			return jsxDEVImpl(type, config, maybeKey, !1, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
		exports.jsxs = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			if (trackActualOwner) {
				var previousStackTraceLimit = Error.stackTraceLimit;
				Error.stackTraceLimit = 10;
				var debugStackDEV = Error("react-stack-top-frame");
				Error.stackTraceLimit = previousStackTraceLimit;
			} else debugStackDEV = unknownOwnerDebugStack;
			return jsxDEVImpl(type, config, maybeKey, !0, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
	})();
}));
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_react_jsx_runtime_production();
	else module.exports = require_react_jsx_runtime_development();
}));
var en_default = {
	common: {
		"actions": "Actions",
		"back": "Back",
		"breadcrumb": "Breadcrumb",
		"cancel": "Cancel",
		"close": "Close",
		"continue": "Continue",
		"delete": "Delete",
		"dismiss": "Dismiss notification",
		"edit": "Edit",
		"loading": "Loading…",
		"next": "Next",
		"no": "No",
		"yes": "Yes",
		"pageOf": "Page {page} of {pages}",
		"pagination": "Pagination",
		"previous": "Previous",
		"remove": "Remove",
		"retry": "Try again",
		"save": "Save",
		"saved": "Changes saved."
	},
	nav: {
		"about": "About",
		"admin": "Admin",
		"contact": "Contact",
		"courses": "All courses",
		"darkMode": "Switch to dark mode",
		"lightMode": "Switch to light mode",
		"dashboard": "My learning",
		"freeLessons": "Free video lessons",
		"help": "Help",
		"home": "Go to home",
		"login": "Log in",
		"logout": "Log out",
		"menu": "Menu",
		"primary": "Primary",
		"register": "Create account",
		"skip": "Skip to main content",
		"studio": "Instructor studio",
		"switchLanguage": "العربية: switch language to Arabic",
		"teach": "Teach on Mastemy",
		"verify": "Verify a certificate"
	},
	footer: {
		"nav": "Footer",
		"tagline": "Video courses that stay free to watch, with original study services built around them.",
		"youtubeNotice": "Lesson videos play through YouTube's official embedded player and remain subject to YouTube's terms. Mastemy does not control advertisements or recommendations shown by YouTube."
	},
	errors: {
		"title": "Something went wrong",
		"generic": "An unexpected error occurred. Please try again.",
		"network": "We could not reach the Mastemy server. Check your connection and try again.",
		"unauthorized": "Your session has ended. Please log in again.",
		"forbidden": "You do not have permission to do this.",
		"notFound": "We could not find what you were looking for.",
		"rateLimited": "Too many requests. Please wait a moment and try again.",
		"server": "The server could not complete the request. Please try again later."
	},
	validation: {
		"email": "Enter a valid email address.",
		"minChars": "Enter at least {n} characters.",
		"percent": "Enter a percentage between 1 and 100.",
		"positive": "Enter a number greater than zero.",
		"positiveInt": "Enter a whole number greater than zero.",
		"required": "This field is required.",
		"youtubeUrl": "Enter a YouTube link (youtube.com or youtu.be)."
	},
	format: {
		"hoursMinutes": "{h} h {m} min",
		"minutes": "{m} min"
	},
	language: {
		"en": "English",
		"ar": "Arabic"
	},
	level: {
		"Beginner": "Beginner",
		"Intermediate": "Intermediate",
		"Advanced": "Advanced",
		"Executive": "Executive"
	},
	auth: {
		"confirmPassword": "Confirm password",
		"displayName": "Display name",
		"email": "Email",
		"password": "Password",
		"forbiddenTitle": "Access restricted",
		"forbiddenBody": "Your account does not have the role needed for this area. If you think this is a mistake, contact a Mastemy administrator.",
		"haveAccount": "Already have an account?",
		"noAccount": "New to Mastemy?",
		"loginButton": "Log in",
		"loginTitle": "Log in",
		"passwordMismatch": "Passwords do not match.",
		"passwordRule": "At least 12 characters, including a letter and a number.",
		"preferredLanguage": "Preferred language",
		"registerButton": "Create account",
		"registerTitle": "Create your account",
		"registerNote": "An account lets you save notes, track progress, take MCQ assessments and earn certificates. Watching video lessons never requires an account.",
		"loginDescription": "Sign in to Mastemy to continue your free video courses, study notes, MCQ practice and certificates.",
		"registerDescription": "Create a free Mastemy account to track video lessons, take MCQ practice and earn knowledge-assessment certificates."
	},
	home: {
		"metaTitle": "Free video courses with study services",
		"metaDescription": "Learn from free YouTube video lessons, then deepen your understanding with original notes, MCQ practice and knowledge-assessment certificates.",
		"heroTitle": "Learn from free video lessons. Prove it with real practice.",
		"heroBody": "Every Mastemy lesson video is free to watch on YouTube. Optional study packages add original notes, MCQ banks and mock exams written and reviewed for each course.",
		"searchPlaceholder": "Search courses, skills or topics",
		"ctaFree": "Browse free video lessons",
		"howTitle": "How Mastemy works",
		"pillar": {
			"video": {
				"title": "Free video lessons",
				"body": "Lessons stream from YouTube's official player. No payment or account is needed to watch."
			},
			"notes": {
				"title": "Original study notes",
				"body": "Instructors write structured notes for each lesson. Premium notes are a separate, optional service."
			},
			"mcq": {
				"title": "MCQ practice and exams",
				"body": "Single-answer and clearly labelled multiple-answer questions with explanations for every option."
			},
			"cert": {
				"title": "Verifiable certificates",
				"body": "Pass an approved MCQ assessment to receive a knowledge-assessment certificate anyone can verify."
			}
		},
		"new": "New courses",
		"updated": "Recently updated",
		"academy": "AI Academy",
		"seeAll": "See all",
		"emptyCollection": "No courses here yet",
		"emptyCollectionBody": "Courses appear here once they pass review and are published.",
		"academyEmpty": "AI Academy courses will appear here once the first ones are published."
	},
	courses: {
		"title": "All courses",
		"subtitle": "Every course is built on free YouTube video lessons. Filter by topic, level and language.",
		"metaDescription": "Browse published Mastemy courses by category, level and language.",
		"search": "Search",
		"searchButton": "Search",
		"category": "Category",
		"allCategories": "All categories",
		"level": "Level",
		"allLevels": "All levels",
		"language": "Language",
		"allLanguages": "All languages",
		"sort": "Sort by",
		"sort_newest": "Newest",
		"sort_updated": "Recently updated",
		"sort_title": "Title (A–Z)",
		"noResults": "No courses match your filters",
		"noResultsBody": "Try removing a filter or searching for a broader term.",
		"resultCount": "{n} courses found",
		"resultsHeading": "Course results"
	},
	category: {
		"notFound": "Category not found",
		"subtitle": "{n} published courses",
		"sub": "Subcategories",
		"metaDescription": "Mastemy courses in {name}: free video lessons with optional study services."
	},
	course: {
		"freeNoticeTitle": "Video lessons are free",
		"freeNotice": "All video lessons are free to watch on YouTube; paid packages cover Mastemy study services only.",
		"videoCount": "{n} videos",
		"mcqCount": "{n} MCQs",
		"rating": "{avg} average from {n} learner reviews",
		"videos": "Video lessons",
		"mcqs": "MCQs",
		"duration": "Duration",
		"language": "Language",
		"reviewed": "Last reviewed",
		"notReviewed": "Not yet reviewed",
		"credential": "Credential",
		"defaultCredential": "Knowledge assessment certificate",
		"about": "About this course",
		"audience": "Who this course is for",
		"prerequisites": "Prerequisites",
		"noPrerequisites": "No prerequisites.",
		"outcomes": "What you will learn",
		"notSpecified": "Not provided yet.",
		"curriculum": "Curriculum",
		"curriculumSummary": "{modules} modules · {lessons} lessons",
		"noCurriculum": "The curriculum has not been published yet.",
		"lessonCount": "{n} lessons",
		"preview": "Preview",
		"previewLessons": "Preview lessons",
		"instructors": "Instructors",
		"studyOptions": "Study options",
		"watchFree": "Watch for free",
		"watchFreeBody": "Start any video lesson now. An account is only needed to save notes and progress.",
		"startWatching": "Start watching",
		"noVideosYet": "Video lessons are being prepared.",
		"enrollFree": "Enroll for free",
		"enrolled": "You are enrolled. Your progress will be saved.",
		"packages": "Study packages",
		"noPackages": "This course has no paid packages. Everything available is free.",
		"packageIncludes": "Includes:",
		"packageNotVideo": "Does not include video access, which is always free.",
		"accessTerm": "Access for {days} days",
		"buyPackage": "Buy package",
		"paymentsUnavailable": "Purchasing is not available yet because payments have not been configured on this Mastemy deployment. No charge was made.",
		"refundTerms": "Refund terms",
		"defaultRefundTerms": "You can request a refund from My learning. Approved refunds remove only the purchased study services; free video lessons and your notes remain available.",
		"notFound": "Course not found"
	},
	reviews: {
		"title": "Learner reviews",
		"none": "No reviews yet.",
		"stars": "{n} / 5",
		"learner": "Learner",
		"verified": "Verified purchase",
		"instructorReply": "Instructor reply:",
		"write": "Write or update your review",
		"eligibility": "One review per learner. You must be enrolled in the course.",
		"rating": "Rating",
		"body": "Your review",
		"submit": "Submit review",
		"saved": "Your review was saved.",
		"tooShort": "Please write at least 10 characters."
	},
	free: {
		"title": "Free video lessons",
		"subtitle": "Every published course's video lessons are free to watch. Pick a course to start.",
		"empty": "No published courses yet",
		"emptyBody": "Free video lessons appear here as soon as the first courses are published.",
		"listHeading": "Courses with free lessons"
	},
	verify: {
		"title": "Verify a certificate",
		"subtitle": "Check that a Mastemy knowledge-assessment certificate is genuine and still valid.",
		"code": "Certificate code",
		"codeHint": "The code is printed on the certificate.",
		"submit": "Verify",
		"checking": "Checking certificate…",
		"notFoundTitle": "No certificate found",
		"notFoundBody": "No certificate matches the code {code}. Check the code for typing mistakes.",
		"valid": "Valid certificate",
		"validBody": "This certificate was issued by Mastemy and has not been revoked.",
		"revoked": "Revoked certificate",
		"revokedBody": "This certificate has been revoked and is no longer valid.",
		"recipient": "Recipient",
		"course": "Course",
		"issued": "Issued",
		"criteria": "Assessment criteria",
		"disclaimer": "A Mastemy certificate confirms the holder passed an MCQ knowledge assessment. It does not verify practical professional competence or any external certification."
	},
	teach: {
		"title": "Teach on Mastemy",
		"subtitle": "Build video courses with free YouTube lessons and original study services. Applications are reviewed by Mastemy staff.",
		"point": {
			"model": {
				"title": "Free video, paid services",
				"body": "Your lesson videos stay free on YouTube. You earn from approved study packages such as premium notes and MCQ banks."
			},
			"channel": {
				"title": "Channel options",
				"body": "Publish to an authorised Mastemy channel, or to your own channel once instructor-owned channels are enabled. You never receive channel credentials."
			},
			"review": {
				"title": "Quality review",
				"body": "Every course is reviewed before publication, including videos, notes, questions and packages."
			},
			"earn": {
				"title": "Transparent earnings",
				"body": "Sales, refunds and commission are recorded in a ledger you can review in your studio."
			}
		},
		"pausedTitle": "Applications are paused",
		"pausedBody": "New instructor applications are temporarily paused. Existing instructors are not affected. Please check back later.",
		"closedTitle": "Applications are not open",
		"closedBody": "Mastemy is currently producing courses with internal and invited instructors. Public applications will open later.",
		"inviteTitle": "Invitation required",
		"inviteBody": "Applications are currently by invitation. Enter the invitation code you received by email.",
		"openTitle": "Applications are open",
		"openBody": "Tell us about your expertise and share a short test video.",
		"loginToApply": "Log in or create an account to apply.",
		"formTitle": "Instructor application",
		"headline": "Professional headline",
		"bio": "Biography",
		"bioHint": "Your background, teaching experience and the subjects you want to teach.",
		"evidence": "Expertise evidence",
		"evidenceHint": "Qualifications, certifications, publications or work history a reviewer can check.",
		"testVideo": "Test video link",
		"testVideoHint": "A short YouTube video (public or unlisted) showing how you teach.",
		"invitationCode": "Invitation code",
		"invitationRequired": "Enter your invitation code.",
		"agreement": "I accept the Mastemy instructor agreement, including the free-video model and content licensing terms.",
		"agreementRequired": "You must accept the agreement to apply.",
		"submit": "Submit application",
		"submitted": "Application submitted. We will email you when it has been reviewed.",
		"yourApplication": "Your application",
		"reviewerNotes": "Reviewer notes",
		"appStatus": {
			"Submitted": "Your application has been received and is waiting for a reviewer.",
			"InReview": "A reviewer is assessing your application.",
			"ChangesRequested": "The reviewer asked for changes. See the notes below.",
			"Approved": "Approved. You can now create courses in the instructor studio.",
			"Rejected": "Your application was not approved this time."
		},
		"pointsHeading": "How teaching on Mastemy works"
	},
	help: {
		"title": "Help centre",
		"subtitle": "Answers to common questions about learning on Mastemy.",
		"more": "Still need help?",
		"q": {
			"free": "Do I need to pay to watch video lessons?",
			"packages": "What does a study package include?",
			"notes": "Who can see my personal notes?",
			"mcq": "How are multiple-answer questions marked?",
			"exam": "Why can't I see answers during an exam?",
			"cert": "How do I earn a certificate?",
			"progress": "Why did my video progress not save?",
			"refund": "How do refunds work?",
			"unavailable": "A video says it is unavailable. What can I do?",
			"access": "Is Mastemy accessible?"
		},
		"a": {
			"free": "No. Every lesson video plays from YouTube and is free to watch, with or without an account. Paid packages only add Mastemy study services.",
			"packages": "Each package lists its exact contents on the course page, such as premium notes, advanced MCQ banks or mock exams, together with its price and access period.",
			"notes": "Only you. Instructors cannot read learners' private notes. You can search and export your notes from My learning.",
			"mcq": "Multiple-answer questions always say \"Select all that apply\". Each assessment states before you start whether it uses all-or-nothing or partial credit.",
			"exam": "Exam-mode assessments withhold answers until you submit. Practice mode can show explanations as you go.",
			"cert": "Pass an assessment that counts toward the course certificate. Certificates are based on MCQ results, never on watch time.",
			"progress": "Progress is saved when you are logged in, every 15 seconds while playing and when you pause. It is best-effort and never affects your access.",
			"refund": "Request a refund from your orders. An approved refund removes only the purchased services; free videos and your notes stay available.",
			"unavailable": "Some videos cannot play inside other sites or in your region. Use the \"Watch on YouTube\" link. Mastemy staff are notified of broken videos through regular checks.",
			"access": "We design for keyboard navigation, screen readers, sufficient contrast and right-to-left Arabic. If something blocks you, please tell us."
		}
	},
	about: {
		"title": "About Mastemy",
		"subtitle": "A learning platform built on free video lessons and honest, independently valuable study services.",
		"mission": {
			"title": "Our mission",
			"body": "Make high-quality video teaching freely watchable and pair it with rigorous practice that helps learners check what they really know."
		},
		"model": {
			"title": "How the model works",
			"body": "Lesson videos are hosted on YouTube and are always free. Mastemy charges only for original services it creates, such as premium notes, MCQ banks and mock exams. Paying never unlocks video playback."
		},
		"quality": {
			"title": "Quality and review",
			"body": "Courses, questions and packages are reviewed before publication. Questions carry explanations for every option, and published questions are versioned so results stay auditable."
		},
		"certs": {
			"title": "Certificates",
			"body": "Certificates confirm a passed MCQ knowledge assessment. They are verifiable online and do not claim to certify practical competence."
		},
		"privacy": {
			"title": "Privacy",
			"body": "Personal notes and attempt history are private to each learner. Video playback events are treated as best-effort progress information, not proof of attention."
		}
	},
	contact: {
		"title": "Contact",
		"subtitle": "How to reach the right people at Mastemy.",
		"emailTitle": "Support email",
		"emailHint": "Include your account email and, for course issues, the course link.",
		"noEmailTitle": "Support address not yet published",
		"noEmailBody": "The operator of this Mastemy deployment has not published a support address yet. In the meantime, the help centre answers the most common questions.",
		"learners": {
			"title": "Learners",
			"body": "Questions about lessons, notes, assessments or certificates."
		},
		"instructors": {
			"title": "Instructors",
			"body": "Interested in teaching? Check the current application status."
		},
		"employers": {
			"title": "Employers and verifiers",
			"body": "Confirm a certificate is genuine using its code."
		},
		"rights": {
			"title": "Rights and content concerns",
			"body": "Report a copyright, rights or content concern with the course and lesson link so it can be reviewed."
		}
	},
	notFound: {
		"title": "Page not found",
		"body": "The page you requested does not exist or has moved."
	},
	learn: {
		"title": "Learning",
		"curriculum": "Course curriculum",
		"lesson": "Lesson",
		"completed": "Completed",
		"completedOf": "{done} of {total} lessons completed",
		"noLessons": "This course has no lessons yet",
		"previous": "Previous lesson",
		"next": "Next lesson",
		"resumed": "Resuming from {time}.",
		"tabsLabel": "Lesson resources",
		"overview": "Overview",
		"studyNotes": "Study notes",
		"premiumNotes": "Premium notes",
		"myNotes": "My notes",
		"practice": "Practice",
		"objective": "Lesson objective",
		"telemetryNote": "Progress is saved as a convenience while you watch; it is not a record of attention and never affects certificates.",
		"noNotes": "The instructor has not added study notes for this lesson yet.",
		"noPremiumNotes": "There are no premium notes for this lesson.",
		"premiumLockedTitle": "Premium notes are part of a study package",
		"premiumLockedBody": "The video and free study notes remain available. Premium notes are an optional paid Mastemy service.",
		"seePackages": "See study packages",
		"loginForNotes": "Log in to keep private, timestamped notes for this lesson."
	},
	player: {
		"label": "YouTube video player: {title}",
		"errorTitle": "This video cannot play here",
		"error2": "The video link is invalid. The instructor has been asked to check it.",
		"error5": "Your browser could not play this video in the embedded player.",
		"error100": "This video was removed or made private on YouTube.",
		"error150": "The video owner does not allow playback on other websites.",
		"error153": "YouTube could not identify this site. Try opening the video on YouTube.",
		"errorUnknown": "The player reported an unexpected error.",
		"watchOnYouTube": "Watch on YouTube",
		"noVideo": "This lesson does not have a video yet.",
		"basicEmbed": "The interactive player could not load, so a basic YouTube embed is shown; your watch position is not saved."
	},
	notes: {
		"addAtTime": "Add at current time",
		"at": "At",
		"clearTime": "Remove timestamp",
		"body": "Note",
		"tags": "Tags",
		"tagsHint": "Separate tags with commas.",
		"save": "Save note",
		"saved": "Note saved.",
		"empty": "You have no notes yet.",
		"seekTo": "Jump to {time}",
		"deleteTitle": "Delete note?",
		"deleteBody": "This note will be permanently deleted.",
		"pageTitle": "My notes",
		"pageSubtitle": "Your private notes across all lessons. Only you can see them.",
		"export": "Export as Markdown",
		"search": "Search notes",
		"noMatches": "No notes match your search"
	},
	practice: { "none": "No practice assessments are attached to this lesson." },
	assessment: {
		"mode": {
			"Practice": "Practice",
			"Exam": "Exam"
		},
		"premium": "Package",
		"summary": "{n} questions · pass mark {pass}%.",
		"timeLimit": "Time limit: {m} minutes.",
		"untimed": "Untimed.",
		"maxAttempts": "Up to {n} attempts.",
		"scoring": {
			"AllOrNothing": "Multiple-answer questions score only when every correct option and no incorrect option is selected.",
			"PartialCredit": "Multiple-answer questions earn partial credit as defined in the assessment rules."
		},
		"start": "Start",
		"loginToStart": "Log in to start",
		"kind": {
			"LessonPractice": "Lesson practice",
			"ModuleTest": "Module test",
			"FinalAssessment": "Final assessment",
			"MockExam": "Mock exam",
			"Diagnostic": "Diagnostic"
		}
	},
	attempt: {
		"title": "Assessment",
		"questionOf": "Question {n} of {total}",
		"multiple": "Multiple answers",
		"single": "Single answer",
		"selectAll": "Select all that apply.",
		"flag": "Flag for review",
		"unflag": "Remove flag",
		"check": "Check answer",
		"checkCorrect": "Correct.",
		"checkIncorrect": "Not quite. Review the explanations above.",
		"timeLeft": "Time remaining",
		"saving": "Saving…",
		"saved": "All answers saved.",
		"saveError": "Could not save. Your answer will be retried when you change it.",
		"autosave": "Answers save automatically.",
		"navigator": "Question navigator",
		"navItem": "Question {n}: {state}",
		"answered": "answered",
		"unanswered": "unanswered",
		"flagged": "flagged",
		"submit": "Submit assessment",
		"confirmTitle": "Submit your answers?",
		"confirmAllAnswered": "You have answered every question. You cannot change answers after submitting.",
		"confirmUnanswered": "{n} questions are unanswered and will be marked incorrect.",
		"unansweredList": "Unanswered questions",
		"qn": "Q{n}",
		"noItems": "This attempt has no questions.",
		"closed": "This attempt is closed. Results are available from My learning."
	},
	result: {
		"title": "Results",
		"score": "Score",
		"passed": "Passed",
		"notPassed": "Not passed",
		"meter": "Score {score}% against a pass mark of {pass}%",
		"passThreshold": "Pass mark: {pass}%",
		"correct": "Correct",
		"incorrect": "Incorrect",
		"unanswered": "Unanswered",
		"certificateTitle": "Certificate issued",
		"viewCertificate": "View and verify your certificate",
		"disclaimer": "Results reflect this MCQ assessment only and are not a prediction of any external exam outcome.",
		"topics": "Topic breakdown",
		"topic": "Topic",
		"percent": "Percent",
		"review": "Answer review",
		"itemCorrect": "Correct",
		"itemIncorrect": "Incorrect",
		"yourAnswer": "Your answer",
		"correctAnswer": "Correct answer",
		"reviewWithheld": "Answer review is not available for this assessment."
	},
	dashboard: {
		"title": "My learning",
		"myNotes": "My notes",
		"continue": "Continue learning",
		"noEnrollments": "You have not started a course yet",
		"noEnrollmentsBody": "Find a course and start any free video lesson.",
		"progress": "Progress in {title}",
		"percent": "{n}% of lessons completed",
		"resume": "Resume",
		"entitlements": "Study packages",
		"entitlementsNote": "Purchased packages give premium study services. Video lessons are free for everyone.",
		"noEntitlements": "You have no active study packages.",
		"package": "Study package",
		"until": "until {date}",
		"noExpiry": "no expiry",
		"freeEnrollments": "Free enrollments",
		"freeEnrollmentsBody": "You are enrolled in {n} courses for free. Free enrollment saves progress and notes; it is not a purchase.",
		"certificates": "Certificates",
		"noCertificates": "No certificates yet.",
		"attempts": "Recent assessments",
		"noAttempts": "No assessment attempts yet.",
		"assessment": "Assessment",
		"status": "Status",
		"date": "Date"
	},
	entitlement: {
		"Purchase": "Purchased",
		"Organization": "Organisation",
		"Grant": "Granted",
		"Subscription": "Subscription"
	},
	studio: {
		"nav": "Studio",
		"courses": "My courses",
		"newCourse": "New course",
		"earnings": "Earnings",
		"coursesSubtitle": "Courses you own or co-teach.",
		"noCourses": "No courses yet",
		"noCoursesBody": "Create your first course with the guided wizard.",
		"courseTitle": "Course",
		"modules": "Modules",
		"updated": "Updated",
		"earningsSubtitle": "Commission ledger entries for your courses.",
		"outcomesRule": "List at least three outcomes, one per line.",
		"editorTabs": "Course editor sections",
		"viewPublic": "View public page",
		"tab": {
			"details": "Details",
			"curriculum": "Curriculum",
			"questions": "Question bank",
			"import": "Bulk import",
			"assessments": "Assessments",
			"packages": "Packages",
			"review": "Checks & review",
			"resources": "Resources",
			"engagement": "Engagement",
			"publication": "Publication"
		},
		"checklist": "Validation checklist",
		"checklistOk": "All publication checks pass.",
		"checklistIssues": "{n} issues to resolve",
		"checklistNote": "Every lesson needs a Ready video and the course needs at least one module before it can be submitted.",
		"submitForReview": "Submit for review",
		"submit": "Submit",
		"submitConfirm": "Reviewers will check the course, videos, notes, questions and packages. You cannot approve your own course.",
		"submitted": "Course submitted for review.",
		"startUpdate": "Start an update",
		"updateStarted": "Update started. The published version stays live while you edit.",
		"statusHelp": {
			"Draft": "Draft.",
			"InReview": "This course is with reviewers.",
			"ChangesRequested": "Changes requested.",
			"Approved": "Approved and waiting for an administrator to publish it.",
			"Published": "Published.",
			"Updating": "Updating.",
			"Archived": "This course is archived."
		}
	},
	earnings: {
		"gross": "Gross",
		"instructor": "Your share",
		"platform": "Platform share",
		"kind": "Type",
		"grossAmount": "Gross",
		"instructorAmount": "Your share",
		"platformAmount": "Platform share",
		"pending": "Pending payout",
		"paid": "Paid out",
		"kind_Sale": "Sale",
		"kind_RefundReversal": "Refund reversal",
		"none": "No earnings yet",
		"noneBody": "Entries appear here when learners buy an approved package for one of your courses."
	},
	wizard: {
		"subtitle": "Answer a few questions to create a draft. You can change everything later.",
		"step": {
			"goals": "Goals & audience",
			"placement": "Category & level",
			"pitch": "Title & description",
			"learning": "Prerequisites & outcomes",
			"review": "Review"
		},
		"goals": "Course goals",
		"goalsHint": "What problem does this course solve for learners?",
		"audienceHint": "Describe the learners this course is designed for.",
		"chooseCategory": "Choose a category",
		"languageHint": "The language of the videos, notes and questions.",
		"titleHint": "Specific and descriptive; avoid hype.",
		"subtitleLabel": "Subtitle",
		"description": "Description",
		"linesHint": "One item per line.",
		"afterCreate": "After creating the draft you will add modules, lessons, YouTube videos, notes and questions.",
		"create": "Create draft course"
	},
	curriculum: {
		"help": "Drag modules and lessons to reorder them, or use the arrow buttons. Lessons are reordered within their module.",
		"saving": "Saving order…",
		"empty": "No modules yet",
		"emptyBody": "Add a module, then add lessons to it, or import a YouTube playlist.",
		"dragHint": "Drag to reorder",
		"moveUp": "Move {title} up",
		"moveDown": "Move {title} down",
		"rename": "Rename",
		"noLessons": "No lessons in this module yet.",
		"noVideo": "No video",
		"addLesson": "Add lesson",
		"addLessonTo": "Add a lesson to {module}",
		"newModule": "New module title",
		"addModule": "Add module",
		"lessonTitle": "Lesson title",
		"titleLabel": "Title",
		"deleteTitle": "Delete {title}?",
		"deleteModuleBody": "The module and all its lessons will be deleted. Linked YouTube videos are not deleted from YouTube.",
		"deleteLessonBody": "The lesson and its notes will be deleted. The linked YouTube video is not deleted from YouTube."
	},
	playlist: {
		"title": "Import a YouTube playlist",
		"help": "Creates a reviewable draft. Edit titles and choose which videos to include before anything is added.",
		"url": "Playlist link",
		"preview": "Preview playlist",
		"empty": "The playlist has no importable videos.",
		"include": "Include",
		"includeRow": "Include video {n}",
		"lessonTitle": "Lesson title",
		"titleRow": "Lesson title for video {n}",
		"videoId": "Video ID",
		"moduleTitle": "New module title",
		"commit": "Add {n} lessons",
		"committed": "Playlist lessons added."
	},
	editor: {
		"lesson": "Lesson",
		"notFound": "Lesson not found",
		"tabs": "Lesson editor sections",
		"details": "Details",
		"notes": "Notes",
		"video": "YouTube link",
		"upload": "Upload via Mastemy",
		"write": "Write",
		"preview": "Preview",
		"nothing": "Nothing to preview yet.",
		"objectiveHint": "One sentence describing what the learner will be able to do.",
		"isPreview": "Mark as preview lesson",
		"isPreviewHint": "Highlighted on the course page. All videos are free regardless.",
		"notesHint": "Free study notes in Markdown. Supports headings, tables, code and links.",
		"premiumHint": "Only learners with a study package can read these.",
		"saveNotes": "Save notes",
		"notesSaved": "Notes saved.",
		"noVideo": "No video linked. Lessons need a Ready video before the course can be submitted."
	},
	video: {
		"title": "Video",
		"url": "YouTube link or video ID",
		"urlHint": "watch, youtu.be, shorts and embed links are accepted.",
		"channel": "YouTube channel",
		"channelHint": "The channel the video was uploaded to. It is checked against the actual video.",
		"chooseChannel": "Choose a channel",
		"channelRequired": "Choose the channel that owns this video.",
		"noChannels": "No channels are authorised for you yet. Ask an administrator to add one.",
		"linkHelp": "Upload the video in YouTube Studio first, then paste its link here. Mastemy checks the channel, visibility and embedding.",
		"manualMetadata": "Enter title and duration manually",
		"manualHint": "Used only when YouTube metadata cannot be retrieved automatically.",
		"manualTitle": "Title",
		"manualDuration": "Duration (minutes)",
		"rightsText": "I confirm I own or am licensed to publish this video on Mastemy and on the selected channel.",
		"rightsRequired": "You must confirm your rights to this video.",
		"link": "Link video",
		"replace": "Replace video",
		"linked": "Video linked. Status: {status}.",
		"statusReason": "Status details",
		"privacy": "Visibility",
		"embeddable": "Embeddable",
		"lastChecked": "Last checked",
		"recheck": "Re-check on YouTube",
		"rechecked": "Video re-checked."
	},
	channelMode: {
		"MastemyManaged": "Mastemy channel",
		"InstructorOwned": "Your channel"
	},
	upload: {
		"explain": "Your file is sent from this device in 8 MiB chunks and relayed straight to YouTube. Mastemy does not store video files. Keep this page open during transfer.",
		"disabledTitle": "Integrated upload is disabled",
		"disabled": "Integrated upload is disabled; upload in YouTube Studio and paste the link.",
		"file": "Video file",
		"fileHint": "The file stays on your device until you start the transfer.",
		"ytTitle": "YouTube title",
		"ytDescription": "YouTube description",
		"privacy": "Visibility",
		"privacyHint": "Learners can only play public or unlisted videos.",
		"privacy_unlisted": "Unlisted",
		"privacy_public": "Public",
		"privacy_private": "Private",
		"notify": "Notify channel subscribers",
		"synthetic": "This video contains realistic altered or synthetic content",
		"syntheticHint": "Required disclosure for YouTube.",
		"request": "Request upload approval",
		"session": "Upload session",
		"awaitingApproval": "An administrator must approve the channel, title, description and visibility before transfer.",
		"expired": "The upload session expired. Cancel it and request a new upload.",
		"reselect": "Select the same file again ({name}) to continue.",
		"selectToStart": "Select the video file to start the transfer.",
		"start": "Start transfer",
		"resume": "Resume transfer",
		"refresh": "Refresh status",
		"cancel": "Cancel upload",
		"cancelTitle": "Cancel this upload?",
		"cancelBody": "The upload session will be cancelled. Your original file is not affected.",
		"transferring": "Transferring to YouTube",
		"percent": "{n}% sent",
		"keepOpen": "Do not close this page until the transfer finishes.",
		"transferred": "Transfer finished. YouTube is now processing the video.",
		"doneBody": "Transfer complete. Processing on YouTube is tracked separately on the video status.",
		"wrongFile": "That is not the same file. Select {name} to resume."
	},
	question: {
		"new": "New question",
		"edit": "Edit question",
		"none": "No questions yet",
		"noneBody": "Write questions here or use bulk import.",
		"externalId": "External ID",
		"type": "Type",
		"SingleChoice": "Single answer",
		"MultipleSelect": "Multiple answers",
		"difficulty": "Difficulty",
		"Easy": "Easy",
		"Medium": "Medium",
		"Hard": "Hard",
		"stem": "Question",
		"options": "Options",
		"optionN": "Option {n}",
		"optionText": "Option text",
		"isCorrect": "Correct answer",
		"rationale": "Rationale",
		"rationaleHint": "Explain why this option is right or wrong.",
		"rationaleRule": "Write a meaningful rationale (at least 10 characters).",
		"addOption": "Add option",
		"minOptions": "Provide at least two options.",
		"maxOptions": "Provide at most six options.",
		"singleRule": "Single-answer questions need exactly one correct option.",
		"multiRule": "Multiple-answer questions need at least two correct options.",
		"duplicateOptions": "Options must be distinct.",
		"explanation": "Overall explanation",
		"skillCode": "Skill code",
		"certObjective": "Certification objective",
		"source": "Source / rights reference",
		"sourceHint": "Where this question comes from and confirmation it is original or licensed.",
		"sourceRequired": "State the source or rights for this question.",
		"module": "Module",
		"lesson": "Lesson",
		"anyModule": "Course-wide",
		"anyLesson": "Any lesson in module",
		"allowShuffle": "Allow option shuffling",
		"allowShuffleHint": "Turn off when options refer to each other, e.g. \"All of the above\".",
		"created": "Question created as a draft.",
		"versionSaved": "A new version was saved.",
		"versionNote": "Saving creates version {v}. Published versions are never changed.",
		"state": "State",
		"allStates": "All states",
		"stateChanged": "Question state updated.",
		"export": "Export CSV",
		"to": {
			"Reviewed": "Mark reviewed",
			"Approved": "Approve",
			"Active": "Activate",
			"Retired": "Retire",
			"Draft": "Return to draft"
		}
	},
	"import": {
		"help": "Upload a CSV or JSON file using the Mastemy template. Nothing is imported until every row is valid and you confirm.",
		"template": "Download CSV template",
		"file": "Import file",
		"fileHint": "CSV or JSON, UTF-8 encoded.",
		"mode": "Mode",
		"modeCreate": "Create new questions",
		"modeUpdate": "Update existing (new versions by External ID)",
		"modeHint": {
			"create": "Rows with an existing External ID are rejected.",
			"update": "Each row creates a new version of the question with the same External ID."
		},
		"preview": "Upload and preview",
		"previewTitle": "Import preview",
		"valid": "{n} valid",
		"errors": "{n} with errors",
		"fixErrors": "Fix the errors in your file and upload it again. Import is all-or-nothing.",
		"row": "Row",
		"result": "Result",
		"problems": "Problems",
		"ok": "OK",
		"error": "Error",
		"commit": "Import {n} questions",
		"downloadErrors": "Download error report",
		"committed": "{n} questions imported as drafts.",
		"codesTitle": "Codes for your import file",
		"courseCode": "CourseCode"
	},
	assessmentForm: {
		"new": "New assessment",
		"edit": "Edit assessment",
		"none": "No assessments yet",
		"help": "Assessments draw from your question bank. Only MCQs are scored.",
		"title": "Title",
		"kind": "Kind",
		"mode": "Mode",
		"modeHint": "Practice can reveal explanations immediately; Exam withholds answers until submission.",
		"timeLimit": "Time limit (minutes)",
		"maxAttempts": "Maximum attempts",
		"blankUnlimited": "Leave blank for no limit.",
		"passPercent": "Pass mark (%)",
		"questionCount": "Questions per attempt",
		"scoring": "Multiple-answer scoring",
		"premium": "Part of a study package",
		"premiumHint": "Only learners with a package can start it.",
		"certificate": "Counts toward the course certificate",
		"questions": "Question pool",
		"questionsHint": "Only questions in the Active state are used for learners.",
		"pickQuestions": "Select at least one question.",
		"countRule": "At least one question per attempt.",
		"countTooHigh": "Cannot exceed the number of selected questions.",
		"deleteTitle": "Delete assessment?",
		"deleteBody": "{title} will be deleted. Existing attempts keep their records."
	},
	packages: {
		"policyTitle": "Packages sell study services, never video access",
		"policy": "Describe exactly what learners receive, such as premium notes, advanced MCQ banks or mock exams. Videos are always free. Reviewers check the actual contents before approval.",
		"propose": "Propose a package",
		"title": "Package name",
		"contents": "Included services",
		"contentsHint": "One service per line, e.g. \"240 advanced MCQs with explanations\".",
		"contentsRule": "List at least one included service.",
		"noVideoRule": "Packages cannot sell or unlock video lessons.",
		"price": "Price",
		"currency": "Currency",
		"accessDays": "Access period (days)",
		"submit": "Submit proposal",
		"proposed": "Package proposed. An administrator will review it."
	},
	admin: {
		"nav": "Administration",
		"section": {
			"review": "Review queue",
			"applications": "Instructor applications",
			"videos": "YouTube videos",
			"packages": "Package approvals",
			"refunds": "Refunds",
			"users": "Users & roles",
			"settings": "Platform settings",
			"audit": "Audit log",
			"orgs": "Organizations"
		}
	},
	review: {
		"subtitle": "Assess courses before publication. Leave timestamped comments and record a decision.",
		"empty": "No courses in this state",
		"open": "Open",
		"owner": "Owner",
		"independence": "You cannot approve a course you authored. Decisions are recorded in the audit log.",
		"approve": "Approve",
		"requestChanges": "Request changes",
		"publish": "Publish",
		"archive": "Archive",
		"publishBody": "Publishing requires an approved course and every video Ready. Learners will see it immediately.",
		"archiveBody": "The course will be hidden from the catalogue. Enrolled learners keep their notes and records. YouTube videos are not deleted.",
		"published": "Course published.",
		"archived": "Course archived.",
		"comments": "Review comments",
		"noComments": "No comments yet.",
		"commentsUnavailable": "Reviewer comments are not available.",
		"reviewer": "Reviewer",
		"wholeCourse": "Whole course",
		"timestamp": "Video time",
		"timestampHint": "Optional, e.g. 4:05 or 1:02:30.",
		"timestampInvalid": "Use minutes:seconds, e.g. 4:05.",
		"comment": "Comment",
		"addComment": "Add comment",
		"notes": "Decision notes",
		"notesRequired": "Notes are required for this decision.",
		"recordDecision": "Record decision",
		"decided": "Decision recorded.",
		"questions": "Question review",
		"questionsHelp": "Questions move Draft → Reviewed → Approved → Active. Approval must come from a different reviewer than the one who reviewed the version, and never from the author."
	},
	settings: {
		"subtitle": "Feature flags controlling instructor onboarding and YouTube integration. Changes are audited.",
		"readOnly": "Only a SuperAdmin can change platform settings.",
		"none": "No settings returned.",
		"enable": "Enable",
		"disable": "Disable",
		"enableFlag": "Enable {key}",
		"disableFlag": "Disable {key}",
		"confirmTitle": "Change {key}?",
		"confirmEnable": "Enabling this setting changes what users can do immediately.",
		"confirmDisable": "Disabling this setting stops new actions that depend on it. Existing approved content and permissions are not changed.",
		"audited": "This change will be recorded in the audit log with your account.",
		"saved": "Setting updated.",
		"on": "On",
		"off": "Off"
	},
	flags: {
		"unknown": "Platform setting.",
		"ExternalInstructorRegistrationEnabled": "Opens instructor applications to the public. When off, onboarding is limited to internal or invited instructors.",
		"InstructorApplicationsInviteOnly": "Requires a valid invitation code to submit an instructor application.",
		"InstructorApplicationsPaused": "Temporarily stops new instructor applications without affecting approved instructors.",
		"InstructorOwnedChannelsEnabled": "Allows approved instructors to connect and publish to their own YouTube channels.",
		"YouTubeApiUploadsEnabled": "Enables the integrated YouTube uploader in the studio. Keep off until OAuth, quota and transfer tests are verified."
	},
	users: {
		"subtitle": "Search accounts and manage roles. Privileged roles can only be assigned by a SuperAdmin.",
		"search": "Search by name or email",
		"none": "No users found",
		"roles": "Roles",
		"editRoles": "Edit roles",
		"editRolesFor": "Roles for {name}",
		"lockedRole": "Requires SuperAdmin, or cannot be removed from your own account.",
		"rolesSaved": "Roles updated.",
		"suspend": "Suspend",
		"unsuspend": "Reactivate",
		"suspendBody": "{name} will be signed out and unable to log in until reactivated.",
		"unsuspendBody": "{name} will be able to log in again."
	},
	role: {
		"Student": "Student",
		"Instructor": "Instructor",
		"Reviewer": "Reviewer",
		"Moderator": "Moderator",
		"Support": "Support",
		"Finance": "Finance",
		"Admin": "Admin",
		"SuperAdmin": "SuperAdmin"
	},
	applications: {
		"subtitle": "Review instructor applications and send invitations.",
		"inviteTitle": "Invite an instructor",
		"invite": "Create invitation",
		"codeTitle": "Invitation code",
		"codeOnce": "Copy this code now. It is shown only once.",
		"none": "No applications in this state",
		"decision": "Decision",
		"approve": "Approve",
		"reject": "Reject"
	},
	packagesAdmin: {
		"subtitle": "Approve package proposals after checking the actual services offered.",
		"checklist": "Approve only packages that sell original Mastemy services. Reject any package that charges for, unlocks or implies paid access to YouTube videos.",
		"none": "No package proposals waiting",
		"confirm": "Record a decision for {title}."
	},
	refunds: {
		"subtitle": "Refund decisions revoke only the purchase entitlement and reverse the related commission.",
		"none": "No refund requests",
		"order": "Order",
		"amount": "Amount",
		"reason": "Reason",
		"approveTitle": "Approve refund?",
		"approveBody": "The payment will be refunded, the package entitlement revoked and the instructor commission reversed. Free video access is unaffected.",
		"rejectTitle": "Reject refund?",
		"rejectBody": "The learner keeps the package and no refund is issued."
	},
	videos: {
		"subtitle": "Every linked video with its latest YouTube check. Unavailable videos need repair before publication.",
		"all": "All statuses",
		"none": "No videos in this state",
		"confirm": "Confirm ready",
		"confirmFor": "Confirm {title} is public or unlisted, embeddable and on the right channel",
		"rejectTitle": "Reject video"
	},
	audit: {
		"subtitle": "Security-relevant and financial actions, newest first.",
		"entityType": "Entity type",
		"filter": "Filter",
		"none": "No audit entries",
		"when": "When",
		"action": "Action",
		"entity": "Entity",
		"actor": "Actor",
		"details": "Details"
	},
	status: {
		"Draft": "Draft",
		"InReview": "In review",
		"ChangesRequested": "Changes requested",
		"Approved": "Approved",
		"Published": "Published",
		"Updating": "Updating",
		"Archived": "Archived",
		"AwaitingApproval": "Awaiting approval",
		"AwaitingSourceFile": "Awaiting source file",
		"Uploading": "Uploading",
		"Processing": "Processing on YouTube",
		"InContentReview": "In content review",
		"Ready": "Ready",
		"Restricted": "Restricted",
		"Failed": "Failed",
		"Completed": "Completed",
		"Cancelled": "Cancelled",
		"Expired": "Expired",
		"Reviewed": "Reviewed",
		"Active": "Active",
		"Retired": "Retired",
		"InProgress": "In progress",
		"Submitted": "Submitted",
		"Rejected": "Rejected",
		"Valid": "Valid",
		"Revoked": "Revoked",
		"Proposed": "Proposed",
		"Requested": "Requested",
		"Paid": "Paid",
		"Pending": "Pending",
		"Refunded": "Refunded",
		"PartiallyRefunded": "Partially refunded"
	},
	channels: {
		"title": "YouTube channels",
		"help": "Register the Mastemy-managed channel(s) instructors may link lessons from. Videos stay on YouTube; nothing is uploaded here.",
		"none": "No channels registered yet.",
		"channelId": "YouTube channel id",
		"channelIdHint": "Starts with UC, 24 characters.",
		"name": "Channel name",
		"add": "Add channel",
		"created": "Channel registered"
	},
	orders: {
		"title": "Orders and refunds",
		"none": "No orders yet.",
		"items": "Package",
		"total": "Total",
		"refund": "Refund: {status}",
		"requestRefund": "Request refund",
		"reason": "Reason",
		"submitRefund": "Send request",
		"refundRequested": "Refund requested. Finance will review it.",
		"checkoutSuccessTitle": "Payment submitted",
		"checkoutSuccess": "Your package becomes active as soon as the payment provider confirms the payment. This can take a moment.",
		"checkoutCancelled": "Checkout was cancelled. No charge was made."
	},
	wishlist: {
		"title": "Wishlist",
		"subtitle": "Courses you saved to look at later.",
		"save": "Save",
		"saved": "Saved",
		"addNamed": "Save {title} to your wishlist",
		"removeNamed": "Remove {title} from your wishlist",
		"loginToSave": "Log in to save {title} to your wishlist",
		"added": "Added to your wishlist.",
		"removed": "Removed from your wishlist.",
		"addedOn": "Saved {date}",
		"empty": "Your wishlist is empty",
		"emptyBody": "Use “Save” on any course to keep it here."
	},
	compare: {
		"title": "Compare courses",
		"subtitle": "Side by side: content, assessment and study packages.",
		"add": "Compare",
		"selected": "Comparing",
		"addNamed": "Compare {title}",
		"removeNamed": "Comparing {title}: remove from comparison",
		"full": "You can compare at most {n} courses. Remove one first.",
		"tray": "Courses selected for comparison",
		"trayTitle": "Compare ({n}/{max})",
		"needMore": "Select at least 2 courses.",
		"clear": "Clear",
		"go": "Compare now",
		"needTitle": "Choose courses to compare",
		"needBody": "Select between {min} and {max} courses with “Compare” on the course cards.",
		"attribute": "Course",
		"lessons": "Lessons",
		"rating": "Rating",
		"noRatings": "No ratings yet"
	},
	discovery: {
		"recent": "Recently viewed",
		"related": "Related courses",
		"noRelated": "No related courses yet.",
		"fromPrice": "Study packages from {price}",
		"freeOnly": "Free video lessons"
	},
	qa: {
		"tab": "Q&A",
		"title": "Questions & answers",
		"search": "Search questions",
		"filter": "Show",
		"filterAll": "All questions",
		"filterUnresolved": "Unresolved",
		"filterResolved": "Resolved",
		"thisLessonOnly": "Only questions about this lesson",
		"none": "No questions yet. Be the first to ask.",
		"noMatches": "No questions match your search.",
		"resolved": "Resolved",
		"open": "Open",
		"hidden": "Hidden",
		"byline": "{name} · {date}",
		"replies": "{n} replies",
		"ask": "Ask a question",
		"threadTitle": "Title",
		"threadBody": "Details",
		"plainText": "Plain text only; HTML is not allowed.",
		"post": "Post question",
		"posted": "Question posted.",
		"titleTooShort": "The title needs at least 3 characters.",
		"bodyRequired": "Add some details to your question.",
		"enrollToAsk": "Enroll in this course (free) to ask questions and reply. Everyone can read the discussion.",
		"loginToAsk": "Log in and enroll (free) to ask questions.",
		"loginToReply": "Log in to reply",
		"instructor": "Instructor",
		"noReplies": "No replies yet.",
		"yourReply": "Your reply",
		"reply": "Post reply",
		"replyPosted": "Reply posted.",
		"markResolved": "Mark resolved",
		"reopen": "Reopen",
		"markedResolved": "Marked as resolved.",
		"markedOpen": "Question reopened.",
		"hide": "Hide",
		"unhide": "Unhide",
		"hideTitle": "Hide this post",
		"unhideTitle": "Show this post again",
		"hideBody": "Hidden posts are visible only to moderators. The reason is recorded in the audit log.",
		"unhideBody": "The post becomes visible to everyone again.",
		"hideReason": "Reason",
		"hideReasonRequired": "A reason is required to hide a post.",
		"hiddenDone": "Post hidden.",
		"unhidden": "Post visible again.",
		"notFound": "This discussion does not exist or has been hidden.",
		"backToCourse": "Back to course",
		"inbox": "Q&A inbox",
		"inboxNotLive": "Learners can ask questions once the course is published."
	},
	announcements: {
		"title": "Announcements",
		"none": "No announcements yet.",
		"enrollToSee": "Announcements are visible to enrolled learners.",
		"compose": "New announcement",
		"composeHint": "Sent to every enrolled learner as an in-app notification (and by email to those who opted in). At most 3 per course per 24 hours.",
		"titleLabel": "Title",
		"bodyLabel": "Message",
		"send": "Send announcement",
		"sent": "Announcement sent to {n} learners.",
		"sentList": "Sent announcements",
		"notLive": "Announcements can only be sent for a published course.",
		"rateLimited": "Limit reached: at most 3 announcements per course in 24 hours. Try again later.",
		"duplicate": "This announcement was already sent; nothing new was delivered."
	},
	notifications: {
		"title": "Notifications",
		"bell": "Notifications",
		"bellUnread": "Notifications, {n} unread",
		"unread": "Unread:",
		"readAll": "Mark all read",
		"allRead": "All notifications marked as read.",
		"seeAll": "See all notifications",
		"empty": "No notifications yet.",
		"noneUnread": "No unread notifications.",
		"unreadOnly": "Unread only",
		"unreadCount": "{n} unread",
		"markRead": "Mark read",
		"markReadNamed": "Mark “{title}” as read",
		"settings": "Notification settings",
		"settingsTitle": "Notification settings",
		"settingsSubtitle": "Choose what reaches you in the app and by email.",
		"kindHeader": "Notification",
		"inApp": "In app",
		"email": "Email",
		"inAppFor": "In-app notifications for {kind}",
		"emailFor": "Email notifications for {kind}",
		"emailUnavailableTitle": "Email delivery is not configured",
		"emailUnavailable": "This Mastemy installation cannot send email yet, so you will only receive in-app notifications.",
		"emailStoredNote": "Your email choices are saved and will apply once email delivery is configured.",
		"prefsSaved": "Notification settings saved.",
		"kind": {
			"announcement": "Course announcements",
			"reply": "Replies to your questions",
			"review_reply": "Replies to your reviews",
			"course_updated": "Course updates",
			"certificate": "Certificates",
			"issue_reported": "Reported issues (instructors)"
		}
	},
	issues: {
		"report": "Report an issue",
		"intro": "Tell the course team about a broken video, a mistake in the content or a question error.",
		"category": "Category",
		"body": "Description",
		"bodyTooShort": "Describe the issue in at least 5 characters.",
		"send": "Send report",
		"sent": "Thank you. The course team has been notified.",
		"inbox": "Reported issues",
		"none": "No issues reported",
		"noneBody": "Learner reports about this course appear here.",
		"reporter": "Reported by",
		"cat": {
			"VideoUnavailable": "Video unavailable",
			"ContentError": "Content error",
			"QuestionError": "Question error",
			"Other": "Other"
		}
	},
	resources: {
		"tab": "Resources",
		"none": "No downloadable resources for this lesson.",
		"premium": "Premium",
		"locked": "Part of a study package",
		"lockedTitle": "Some resources are part of a study package",
		"lockedBody": "Premium resources unlock with a study package for this course. Videos stay free.",
		"download": "Download",
		"downloadNamed": "Download {name}",
		"version": "version {n}",
		"premiumRequired": "This resource is part of a study package.",
		"intro": "Supporting files (PDF, Office documents, CSV, text, images) and caption files. Videos are never uploaded here; they live on YouTube.",
		"quota": "Storage used by this course",
		"usage": "{used} of {quota} used · up to {max} per file",
		"notEditable": "Resources can be changed while the course is a draft, has changes requested, or is being updated.",
		"uploadTitle": "Upload a file",
		"kind": "Type",
		"kindResource": "Resource",
		"kindCaption": "Caption track",
		"lesson": "Lesson",
		"wholeCourse": "Whole course",
		"unknownLesson": "Removed lesson",
		"file": "File",
		"fileHint": "PDF, DOCX, PPTX, XLSX, CSV, TXT, MD, PNG, JPG or WEBP. No video, audio or archives.",
		"captionHint": "WebVTT (.vtt) or SubRip (.srt).",
		"language": "Caption language",
		"languageHint": "A language tag such as en, ar or en-GB.",
		"premiumUpload": "Premium (study package holders only)",
		"premiumHint": "Free resources can be downloaded by anyone who can open the lesson.",
		"captionNeedsLesson": "Caption tracks belong to a lesson: choose one.",
		"captionsFree": "Captions are always free",
		"upload": "Upload",
		"uploading": "Upload progress",
		"uploaded": "{name} uploaded.",
		"uploadFailed": "Upload failed",
		"replace": "Replace",
		"replaceNamed": "Replace {name}",
		"replaced": "File replaced.",
		"deleteTitle": "Delete resource?",
		"deleteBody": "{name} will be removed for all learners.",
		"deleted": "Resource deleted.",
		"filter": "Show resources for",
		"filterAll": "All lessons",
		"noneStudio": "No resources uploaded yet",
		"access": "Access",
		"captionLang": "Caption · {lang}",
		"err": {
			"video_not_allowed": "Video and audio files cannot be uploaded to Mastemy. Upload the video to YouTube and link it to the lesson instead.",
			"archive_not_allowed": "Archives (ZIP, RAR, 7z…) are not allowed. Upload the individual files.",
			"file_type_not_allowed": "This file type is not allowed. Use PDF, DOCX, PPTX, XLSX, CSV, TXT, MD, PNG, JPG, WEBP, VTT or SRT.",
			"file_content_mismatch": "The file content does not match its extension.",
			"duplicate_resource": "This exact file is already uploaded to the course.",
			"file_too_large": "The file is larger than the per-file limit.",
			"file_too_large_max": "The file is larger than the per-file limit of {max}.",
			"quota_exceeded": "The course storage quota would be exceeded. Delete or replace files first.",
			"course_not_editable": "The course is not editable right now. Start an update first.",
			"invalid_language": "Enter a valid language tag, for example en or ar.",
			"invalid_caption_file": "The caption file could not be read: check the cue timings and format.",
			"captions_must_be_free": "Caption tracks cannot be premium.",
			"multipart_required": "The upload was not sent as a file. Try again.",
			"file_required": "Choose a file to upload."
		}
	},
	transcript: {
		"title": "Transcript",
		"none": "No captions are available for this lesson.",
		"empty": "The caption track has no cues.",
		"language": "Caption language",
		"languageIs": "Language: {lang}",
		"search": "Search the transcript",
		"searchHint": "At least 2 characters.",
		"noMatches": "No matching lines.",
		"results": "Matching lines",
		"seek": "Jump to {time}: {text}"
	},
	certificates: {
		"downloadPdf": "Download PDF",
		"public": "Public",
		"private": "Private",
		"publicToggle": "Publicly verifiable",
		"publicHint": "When off, only you can open the certificate and its PDF.",
		"nowPublic": "Certificate is now publicly verifiable.",
		"nowPrivate": "Certificate is now private.",
		"revokedPdf": "This certificate has been revoked; no PDF is available."
	},
	diff: {
		"title": "Changes since the last publication",
		"neverPublished": "Never published: everything is new.",
		"againstVersion": "Compared with published version {v}.",
		"noChanges": "No changes compared with the published version.",
		"countCourse": "{n} course fields",
		"countAdded": "{n} added",
		"countRemoved": "{n} removed",
		"countChanged": "{n} changed",
		"courseFields": "Course details",
		"modulesAdded": "Modules added",
		"modulesRemoved": "Modules removed",
		"modulesChanged": "Modules changed",
		"lessonsAdded": "Lessons added",
		"lessonsRemoved": "Lessons removed",
		"lessonsChanged": "Lessons changed",
		"before": "Before",
		"after": "After",
		"empty": "(empty)",
		"field": {
			"title": "Title",
			"subtitle": "Subtitle",
			"description": "Description",
			"audience": "Audience",
			"prerequisites": "Prerequisites",
			"outcomes": "Outcomes",
			"language": "Language",
			"level": "Level",
			"credentialType": "Credential",
			"passThresholdPercent": "Pass threshold (%)",
			"promoVideoId": "Promo video",
			"categories": "Categories",
			"moduleId": "Module",
			"objective": "Objective",
			"sortOrder": "Position",
			"isPreview": "Preview lesson",
			"videoAssetId": "Video",
			"youtubeVideoId": "YouTube video",
			"notesMarkdown": "Study notes",
			"premiumNotesMarkdown": "Premium notes"
		}
	},
	published: {
		"title": "Published preview",
		"never": "This course has not been published yet.",
		"version": "Version {v}, published {date}. This is exactly what learners see.",
		"noVideo": "no video"
	},
	youtube: {
		"publishing": "YouTube publishing",
		"publishingIntro": "Keep the course playlist, thumbnails and captions on YouTube in sync. Only channels you are allowed to manage are used.",
		"noPublishableChannel": "You have no authorized YouTube channel you can publish to.",
		"playlist": "Course playlist",
		"playlistHint": "Creates or updates the playlist “Mastemy: <course code>” so it matches the lesson order.",
		"privacy": "Privacy for a new playlist",
		"privacyOpt": {
			"unlisted": "Unlisted",
			"private": "Private",
			"public": "Public"
		},
		"syncPlaylist": "Sync playlist",
		"synced": "Playlist synchronized.",
		"syncResult": "{n} videos in the playlist: {inserted} added, {moved} moved, {removed} removed, {skipped} lessons skipped.",
		"videos": "Lesson videos",
		"noOwnVideos": "No lesson videos are on a channel you manage.",
		"uploadThumbnail": "Upload thumbnail (JPEG/PNG, max 2 MB)",
		"thumbnailSet": "Thumbnail updated on YouTube.",
		"captionFile": "Caption file",
		"chooseCaption": "Choose a caption file",
		"pushCaption": "Send to YouTube",
		"captionPushed": "Caption ({lang}) sent to YouTube.",
		"noCaptions": "Upload a caption file under Resources to send it to YouTube.",
		"reconnect": "Reconnect channel",
		"reconnectHint": "Reconnect the YouTube channel and grant the requested permissions, then try again.",
		"err": {
			"channel_not_authorized": "The YouTube channel is not authorized (or access was revoked).",
			"youtube_scope_missing": "The channel authorization lacks the permission needed to manage playlists and captions.",
			"course_channel_missing": "The course has no YouTube channel yet.",
			"youtube_quota_exhausted": "The YouTube API quota is used up for today. Try again tomorrow.",
			"youtube_upstream_error": "YouTube reported an error. Try again later.",
			"invalid_thumbnail": "Thumbnails must be JPEG or PNG images up to 2 MB.",
			"not_a_caption": "That file is not a caption track.",
			"invalid_caption_language": "The caption file has no valid language.",
			"caption_course_mismatch": "That caption file belongs to a different course or lesson.",
			"resource_missing": "The caption file is missing from storage. Upload it again.",
			"resource_integrity": "The stored caption file failed its integrity check. Upload it again."
		}
	},
	orgs: {
		"title": "Organizations",
		"subtitle": "Organizations you administer or manage.",
		"adminAll": "All organizations",
		"noneManaged": "You do not manage any organization",
		"noneManagedBody": "Organization admins and managers see their workspaces here. Assigned courses appear on your dashboard.",
		"assignmentCount": "{n} assigned courses",
		"assignedTitle": "Assigned by your organization",
		"manage": "Manage organization",
		"noAssignments": "No courses assigned yet.",
		"premiumIncluded": "Study package included",
		"overdue": "Overdue",
		"dueOn": "Due {date}",
		"noDue": "No due date",
		"role": {
			"Member": "Member",
			"Manager": "Manager",
			"Admin": "Admin"
		},
		"tabs": "Organization sections",
		"members": "Members",
		"assignments": "Assignments",
		"report": "Progress report",
		"seats": "{used} of {limit} seats used",
		"addMember": "Invite a member",
		"addMemberHint": "An invitation link is created for the email address. The person accepts it while signed in to the Mastemy account with that email.",
		"roleLabel": "Role",
		"department": "Department",
		"add": "Create invitation",
		"invitationSent": "Invitation created.",
		"member": "Member",
		"joined": "Joined",
		"noMembers": "No members yet",
		"roleFor": "Role for {name}",
		"departmentFor": "Department for {name}",
		"removeTitle": "Remove member?",
		"removeBody": "{name} loses this organization's assignments and any study package access it granted.",
		"memberRemoved": "Member removed.",
		"pendingInvitations": "Pending invitations",
		"noInvitations": "No pending invitations.",
		"expires": "expires {date}",
		"revokeInvitation": "Revoke",
		"invitationRevoked": "Invitation revoked.",
		"bulkTitle": "Add members in bulk",
		"bulkHint": "One email per line (first column of a CSV; an “email” header is optional). Up to 1000 rows. One invitation per row is created when you commit.",
		"csvFile": "CSV file",
		"csvText": "Emails",
		"bulkDepartmentHint": "Optional department for everyone in this batch.",
		"bulkPreview": "Preview",
		"bulkValid": "{n} valid",
		"bulkErrors": "{n} with errors",
		"bulkSeats": "{n} seats available",
		"bulkFixFirst": "Fix the rows with errors (or free seats) before committing.",
		"bulkCommit": "Invite {n} people",
		"bulkDone": "{n} invitations created.",
		"line": "Line",
		"rowOk": "Ready",
		"assignCourse": "Assign a course",
		"findCourse": "Find a published course",
		"course": "Course",
		"chooseCourse": "Choose a course",
		"scope": "Assign to",
		"scopeOpt": {
			"Organization": "Whole organization",
			"Department": "Department",
			"User": "One member"
		},
		"chooseMember": "Choose a member",
		"dueDate": "Due date",
		"dueHint": "Optional; must be in the future.",
		"grantPremium": "Include the study package (premium notes, resources and exams)",
		"grantPremiumHint": "Covered members get premium access while the assignment exists.",
		"grantPremiumAdminOnly": "Only organization admins can include study packages.",
		"assign": "Assign course",
		"assigned": "Course assigned.",
		"premium": "Study package",
		"unassignTitle": "Remove assignment?",
		"unassignBody": "{title} will no longer be assigned; premium access it granted is revoked.",
		"reportHint": "One row per member per assigned course. Learner notes are never included.",
		"downloadCsv": "Download CSV",
		"reportEmpty": "No assigned courses to report on yet",
		"progress": "Progress",
		"bestScore": "Best score",
		"lessonsDone": "{done}/{total} lessons ({pct}%)",
		"inProgress": "In progress",
		"notFound": "Organization not available",
		"notFoundBody": "It does not exist, is inactive, or you are not one of its admins or managers.",
		"inactive": "Inactive",
		"active": "Active",
		"adminTitle": "Organizations",
		"adminSubtitle": "Enterprise workspaces: create, edit, deactivate and reactivate.",
		"create": "Create organization",
		"created": "{name} created.",
		"name": "Name",
		"slug": "Slug",
		"slugHint": "Lowercase letters, digits and hyphens.",
		"slugInvalid": "Use 1-64 lowercase letters, digits or hyphens.",
		"seatLimit": "Seats",
		"seatsInvalid": "Enter a whole number between 1 and 100000.",
		"noneYet": "No organizations yet",
		"editTitle": "Edit organization",
		"deactivate": "Deactivate",
		"reactivate": "Reactivate",
		"deactivateTitle": "Deactivate organization?",
		"deactivateBody": "Members lose access granted by the organization and managers can no longer open it.",
		"reactivateTitle": "Reactivate organization?",
		"reactivateBody": "Premium access is granted again from the current assignments.",
		"deactivated": "Organization deactivated.",
		"reactivated": "Organization reactivated.",
		"acceptTitle": "Join organization",
		"acceptBody": "Accept the invitation to join this organization. It must have been sent to {email}, the email of the account you are signed in with.",
		"accept": "Accept invitation",
		"acceptDone": "You joined {name}.",
		"acceptNoToken": "This invitation link is incomplete.",
		"err": {
			"last_admin": "The last admin cannot be removed or demoted. Make someone else an admin first.",
			"already_member": "That person is already a member.",
			"seat_limit_reached": "Not enough seats. Ask Mastemy staff to raise the seat limit.",
			"seat_limit_below_usage": "The seat limit cannot be lower than the seats in use.",
			"slug_taken": "That slug is already used by another organization.",
			"duplicate_assignment": "This course is already assigned to that scope.",
			"invalid_rows": "Some rows are invalid or exceed the available seats. Preview again and fix them.",
			"invalid_due_date": "The due date must be in the future.",
			"invalid_email": "Enter a valid email address.",
			"invitation_used": "This invitation has already been used.",
			"invitation_expired": "This invitation has expired. Ask for a new one.",
			"org_inactive": "This organization is not active.",
			"premium_scope_requires_admin": "Only an organization admin can make a change that grants or removes study package access."
		},
		"emailHidden": "Email visible to organization admins",
		"invitationLinksTitle": "Invitation links",
		"invitationShareManually": "No invitation email could be sent from this installation. Share each link with the person directly; it expires in 14 days.",
		"invitationEmailed": "An invitation email is on its way. You can also share the link directly.",
		"invitationLinkFor": "Invitation link for {email}",
		"copyLink": "Copy link",
		"copied": "Link copied.",
		"copyFailed": "Copying is not available here; select the link and copy it.",
		"revokeFor": "Revoke the invitation for {email}",
		"acceptedAs": "Your role: {role}. Assigned courses now appear on your dashboard.",
		"acceptNotFound": "This invitation is not valid for {email}. It may have been revoked, or it was sent to a different email address."
	}
};
//#endregion
//#region src/i18n/I18nProvider.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Only the core English dictionary (en.json) ships in the main bundle. The English area namespaces
* (`<area>.en.json`) and the whole Arabic dictionary are separate chunks that `ensureLang` loads before
* the first render (the browser entry and the SSR renderer await it; it is fetched in parallel with the
* route chunk). English is also the fallback for keys missing in Arabic.
*/
var DICTS = { en: en_default };
var loaded = {};
var loading = {};
function loadEnglishAreas() {
	loading.en ??= import("./enAreas-C6wGvuOz.js").then((m) => {
		DICTS.en = Object.assign({}, en_default, m.EN_AREAS);
		loaded.en = true;
	});
	return loading.en;
}
/** Load a language's dictionary (no-op when already loaded). Await it before rendering in that language. */
function ensureLang(lang) {
	if (loaded[lang]) return Promise.resolve();
	if (lang === "en") return loadEnglishAreas();
	loading.ar ??= Promise.all([loadEnglishAreas(), import("./ar-Ds2nJX8G.js")]).then(([, m]) => {
		DICTS.ar = m.AR_DICT;
		loaded.ar = true;
	});
	return loading.ar;
}
var STORAGE_KEY = "mastemy.lang";
function lookup(dict, key) {
	let node = dict;
	for (const part of key.split(".")) {
		if (node === void 0 || typeof node === "string") return void 0;
		node = node[part];
	}
	return typeof node === "string" ? node : void 0;
}
function translate(lang, key, vars) {
	const dict = DICTS[lang];
	const template = (dict && lookup(dict, key)) ?? lookup(DICTS.en, key) ?? key;
	if (!vars) return template;
	return template.replace(/\{(\w+)\}/g, (m, name) => vars[name] !== void 0 ? String(vars[name]) : m);
}
function dirFor(lang) {
	return lang === "ar" ? "rtl" : "ltr";
}
/** `?lang=ar|en` (the hreflang alternate URLs) wins over the stored preference. */
function readUrlLang() {
	try {
		const v = new URLSearchParams(window.location.search).get("lang");
		return v === "ar" || v === "en" ? v : null;
	} catch {
		return null;
	}
}
function readStoredLang() {
	const fromUrl = readUrlLang();
	if (fromUrl) return fromUrl;
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		if (v === "ar" || v === "en") return v;
	} catch {}
	return "en";
}
var I18nContext = (0, import_react.createContext)(null);
function I18nProvider({ children, initialLang }) {
	const [lang, setLangState] = (0, import_react.useState)(() => initialLang ?? readStoredLang());
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.lang = lang;
		root.dir = dirFor(lang);
	}, [lang]);
	const setLang = (0, import_react.useCallback)((next) => {
		ensureLang(next).then(() => setLangState(next));
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {}
	}, []);
	const value = (0, import_react.useMemo)(() => {
		const locale = lang === "ar" ? "ar" : "en";
		return {
			lang,
			dir: dirFor(lang),
			setLang,
			t: (key, vars) => translate(lang, key, vars),
			fmtNumber: (n) => new Intl.NumberFormat(locale).format(n),
			fmtDate: (iso) => {
				if (!iso) return "";
				const d = new Date(iso);
				return Number.isNaN(d.getTime()) ? "" : new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);
			},
			fmtMoney: (amount, currency) => {
				try {
					return new Intl.NumberFormat(locale, {
						style: "currency",
						currency
					}).format(amount);
				} catch {
					return `${amount.toFixed(2)} ${currency}`;
				}
			}
		};
	}, [lang, setLang]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nContext.Provider, {
		value,
		children
	});
}
function useI18n() {
	const ctx = (0, import_react.useContext)(I18nContext);
	if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
	return ctx;
}
//#endregion
export { require_react as _, Link as a, __toESM as b, Outlet as c, StaticRouter as d, matchPath as f, useSearchParams as g, useParams as h, require_jsx_runtime as i, Route as l, useNavigate as m, ensureLang as n, NavLink as o, useLocation as p, useI18n as r, Navigate as s, I18nProvider as t, Routes as u, __commonJSMin as v, __require as y };

//# sourceMappingURL=I18nProvider-Cc4FX485.js.map