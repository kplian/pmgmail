var Signal = function() {
};

var MeGmail = function() {
};

var Email = function() {
};

var Tools = function() {
};

var Kplian = function() {

	this.myFunction = function() {
		alert('kplian')

	}
};

var Kplian = new Kplian();

//LIBERIA UNDERSCORE

(function() {
	var root = this;
	var previousUnderscore = root._;
	var breaker = {};
	var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	var push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
	var nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
	var _ = function(obj) {
		if ( obj instanceof _)
			return obj;
		if (!(this instanceof _))
			return new _(obj);
		this._wrapped = obj
	};
	root["_underscore"] = _;
	_.VERSION = "1.4.4";
	var each = _.each = _.forEach = function(obj, iterator, context) {
		if (obj == null)
			return;
		if (nativeForEach && obj.forEach === nativeForEach)
			obj.forEach(iterator, context);
		else if (obj.length === +obj.length)
			for (var i = 0, l = obj.length; i < l; i++) {
				if (iterator.call(context, obj[i], i, obj) === breaker)
					return
			}
		else
			for (var key in obj)
			if (_.has(obj, key))
				if (iterator.call(context, obj[key], key, obj) === breaker)
					return
	};
	_.map = _.collect = function(obj, iterator, context) {
		var results = [];
		if (obj == null)
			return results;
		if (nativeMap && obj.map === nativeMap)
			return obj.map(iterator, context);
		each(obj, function(value, index, list) {
			results[results.length] = iterator.call(context, value, index, list)
		});
		return results
	};
	var reduceError = "Reduce of empty array with no initial value";
	_.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
		var initial = arguments.length > 2;
		if (obj == null)
			obj = [];
		if (nativeReduce && obj.reduce === nativeReduce) {
			if (context)
				iterator = _.bind(iterator, context);
			return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator)
		}
		each(obj, function(value, index, list) {
			if (!initial) {
				memo = value;
				initial = true
			} else
				memo = iterator.call(context, memo, value, index, list)
		});
		if (!initial)
			throw new TypeError(reduceError);
		return memo
	};
	_.reduceRight = _.foldr = function(obj, iterator, memo, context) {
		var initial = arguments.length > 2;
		if (obj == null)
			obj = [];
		if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
			if (context)
				iterator = _.bind(iterator, context);
			return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator)
		}
		var length = obj.length;
		if (length !== +length) {
			var keys = _.keys(obj);
			length = keys.length
		}
		each(obj, function(value, index, list) {
			index = keys ? keys[--length] : --length;
			if (!initial) {
				memo = obj[index];
				initial = true
			} else
				memo = iterator.call(context, memo, obj[index], index, list)
		});
		if (!initial)
			throw new TypeError(reduceError);
		return memo
	};
	_.find = _.detect = function(obj, iterator, context) {
		var result;
		any(obj, function(value, index, list) {
			if (iterator.call(context, value, index, list)) {
				result = value;
				return true
			}
		});
		return result
	};
	_.filter = _.select = function(obj, iterator, context) {
		var results = [];
		if (obj == null)
			return results;
		if (nativeFilter && obj.filter === nativeFilter)
			return obj.filter(iterator, context);
		each(obj, function(value, index, list) {
			if (iterator.call(context, value, index, list))
				results[results.length] = value
		});
		return results
	};
	_.reject = function(obj, iterator, context) {
		return _.filter(obj, function(value, index, list) {
			return !iterator.call(context, value, index, list)
		}, context)
	};
	_.every = _.all = function(obj, iterator, context) {
		iterator || ( iterator = _.identity);
		var result = true;
		if (obj == null)
			return result;
		if (nativeEvery && obj.every === nativeEvery)
			return obj.every(iterator, context);
		each(obj, function(value, index, list) {
			if (!( result = result && iterator.call(context, value, index, list)))
				return breaker
		});
		return !!result
	};
	var any = _.some = _.any = function(obj, iterator, context) {
		iterator || ( iterator = _.identity);
		var result = false;
		if (obj == null)
			return result;
		if (nativeSome && obj.some === nativeSome)
			return obj.some(iterator, context);
		each(obj, function(value, index, list) {
			if (result || ( result = iterator.call(context, value, index, list)))
				return breaker
		});
		return !!result
	};
	_.contains = _.include = function(obj, target) {
		if (obj == null)
			return false;
		if (nativeIndexOf && obj.indexOf === nativeIndexOf)
			return obj.indexOf(target) != -1;
		return any(obj, function(value) {
			return value === target
		})
	};
	_.invoke = function(obj, method) {
		var args = slice.call(arguments, 2);
		var isFunc = _.isFunction(method);
		return _.map(obj, function(value) {
			return ( isFunc ? method : value[method]).apply(value, args)
		})
	};
	_.pluck = function(obj, key) {
		return _.map(obj, function(value) {
			return value[key]
		})
	};
	_.where = function(obj, attrs, first) {
		if (_.isEmpty(attrs))
			return first ? null : [];
		return _[first ? "find" : "filter"](obj, function(value) {
			for (var key in attrs)
			if (attrs[key] !== value[key])
				return false;
			return true
		})
	};
	_.findWhere = function(obj, attrs) {
		return _.where(obj, attrs, true)
	};
	_.max = function(obj, iterator, context) {
		if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535)
			return Math.max.apply(Math, obj);
		if (!iterator && _.isEmpty(obj))
			return -Infinity;
		var result = {
			computed : -Infinity,
			value : -Infinity
		};
		each(obj, function(value, index, list) {
			var computed = iterator ? iterator.call(context, value, index, list) : value;
			computed >= result.computed && ( result = {
				value : value,
				computed : computed
			})
		});
		return result.value
	};
	_.min = function(obj, iterator, context) {
		if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535)
			return Math.min.apply(Math, obj);
		if (!iterator && _.isEmpty(obj))
			return Infinity;
		var result = {
			computed : Infinity,
			value : Infinity
		};
		each(obj, function(value, index, list) {
			var computed = iterator ? iterator.call(context, value, index, list) : value;
			computed < result.computed && ( result = {
				value : value,
				computed : computed
			})
		});
		return result.value
	};
	_.shuffle = function(obj) {
		var rand;
		var index = 0;
		var shuffled = [];
		each(obj, function(value) {
			rand = _.random(index++);
			shuffled[index - 1] = shuffled[rand];
			shuffled[rand] = value
		});
		return shuffled
	};
	var lookupIterator = function(value) {
		return _.isFunction(value) ? value : function(obj) {
			return obj[value]
		}
	};
	_.sortBy = function(obj, value, context) {
		var iterator = lookupIterator(value);
		return _.pluck(_.map(obj, function(value, index, list) {
			return {
				value : value,
				index : index,
				criteria : iterator.call(context, value, index, list)
			}
		}).sort(function(left, right) {
			var a = left.criteria;
			var b = right.criteria;
			if (a !== b) {
				if (a > b || a ===
					void 0)
					return 1;
				if (a < b || b ===
					void 0)
					return -1
			}
			return left.index < right.index ? -1 : 1
		}), "value")
	};
	var group = function(obj, value, context, behavior) {
		var result = {};
		var iterator = lookupIterator(value || _.identity);
		each(obj, function(value, index) {
			var key = iterator.call(context, value, index, obj);
			behavior(result, key, value)
		});
		return result
	};
	_.groupBy = function(obj, value, context) {
		return group(obj, value, context, function(result, key, value) {
			(_.has(result, key) ? result[key] : result[key] = []).push(value)
		})
	};
	_.countBy = function(obj, value, context) {
		return group(obj, value, context, function(result, key) {
			if (!_.has(result, key))
				result[key] = 0;
			result[key]++
		})
	};
	_.sortedIndex = function(array, obj, iterator, context) {
		iterator = iterator == null ? _.identity : lookupIterator(iterator);
		var value = iterator.call(context, obj);
		var low = 0, high = array.length;
		while (low < high) {
			var mid = low + high >>> 1;
			iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid
		}
		return low
	};
	_.toArray = function(obj) {
		if (!obj)
			return [];
		if (_.isArray(obj))
			return slice.call(obj);
		if (obj.length === +obj.length)
			return _.map(obj, _.identity);
		return _.values(obj)
	};
	_.size = function(obj) {
		if (obj == null)
			return 0;
		return obj.length === +obj.length ? obj.length : _.keys(obj).length
	};
	_.first = _.head = _.take = function(array, n, guard) {
		if (array == null)
			return
			void 0;
		return n != null && !guard ? slice.call(array, 0, n) : array[0]
	};
	_.initial = function(array, n, guard) {
		return slice.call(array, 0, array.length - (n == null || guard ? 1 : n))
	};
	_.last = function(array, n, guard) {
		if (array == null)
			return
			void 0;
		if (n != null && !guard)
			return slice.call(array, Math.max(array.length - n, 0));
		else
			return array[array.length - 1]
	};
	_.rest = _.tail = _.drop = function(array, n, guard) {
		return slice.call(array, n == null || guard ? 1 : n)
	};
	_.compact = function(array) {
		return _.filter(array, _.identity)
	};
	var flatten = function(input, shallow, output) {
		each(input, function(value) {
			if (_.isArray(value))
				shallow ? push.apply(output, value) : flatten(value, shallow, output);
			else
				output.push(value)
		});
		return output
	};
	_.flatten = function(array, shallow) {
		return flatten(array, shallow, [])
	};
	_.without = function(array) {
		return _.difference(array, slice.call(arguments, 1))
	};
	_.uniq = _.unique = function(array, isSorted, iterator, context) {
		if (_.isFunction(isSorted)) {
			context = iterator;
			iterator = isSorted;
			isSorted = false
		}
		var initial = iterator ? _.map(array, iterator, context) : array;
		var results = [];
		var seen = [];
		each(initial, function(value, index) {
			if ( isSorted ? !index || seen[seen.length - 1] !== value : !_.contains(seen, value)) {
				seen.push(value);
				results.push(array[index])
			}
		});
		return results
	};
	_.union = function() {
		return _.uniq(concat.apply(ArrayProto, arguments))
	};
	_.intersection = function(array) {
		var rest = slice.call(arguments, 1);
		return _.filter(_.uniq(array), function(item) {
			return _.every(rest, function(other) {
				return _.indexOf(other, item) >= 0
			})
		})
	};
	_.difference = function(array) {
		var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
		return _.filter(array, function(value) {
			return !_.contains(rest, value)
		})
	};
	_.zip = function() {
		var args = slice.call(arguments);
		var length = _.max(_.pluck(args, "length"));
		var results = new Array(length);
		for (var i = 0; i < length; i++)
			results[i] = _.pluck(args, "" + i);
		return results
	};
	_.object = function(list, values) {
		if (list == null)
			return {};
		var result = {};
		for (var i = 0, l = list.length; i < l; i++)
			if (values)
				result[list[i]] = values[i];
			else
				result[list[i][0]] = list[i][1];
		return result
	};
	_.indexOf = function(array, item, isSorted) {
		if (array == null)
			return -1;
		var i = 0, l = array.length;
		if (isSorted)
			if ( typeof isSorted == "number")
				i = isSorted < 0 ? Math.max(0, l + isSorted) : isSorted;
			else {
				i = _.sortedIndex(array, item);
				return array[i] === item ? i : -1
			}
		if (nativeIndexOf && array.indexOf === nativeIndexOf)
			return array.indexOf(item, isSorted);
		for (; i < l; i++)
			if (array[i] === item)
				return i;
		return -1
	};
	_.lastIndexOf = function(array, item, from) {
		if (array == null)
			return -1;
		var hasIndex = from != null;
		if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf)
			return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
		var i = hasIndex ? from : array.length;
		while (i--)
		if (array[i] === item)
			return i;
		return -1
	};
	_.range = function(start, stop, step) {
		if (arguments.length <= 1) {
			stop = start || 0;
			start = 0
		}
		step = arguments[2] || 1;
		var len = Math.max(Math.ceil((stop - start) / step), 0);
		var idx = 0;
		var range = new Array(len);
		while (idx < len) {
			range[idx++] = start;
			start += step
		}
		return range
	};
	_.bind = function(func, context) {
		if (func.bind === nativeBind && nativeBind)
			return nativeBind.apply(func, slice.call(arguments, 1));
		var args = slice.call(arguments, 2);
		return function() {
			return func.apply(context, args.concat(slice.call(arguments)))
		}
	};
	_.partial = function(func) {
		var args = slice.call(arguments, 1);
		return function() {
			return func.apply(this, args.concat(slice.call(arguments)))
		}
	};
	_.bindAll = function(obj) {
		var funcs = slice.call(arguments, 1);
		if (funcs.length === 0)
			funcs = _.functions(obj);
		each(funcs, function(f) {
			obj[f] = _.bind(obj[f], obj)
		});
		return obj
	};
	_.memoize = function(func, hasher) {
		var memo = {};
		hasher || ( hasher = _.identity);
		return function() {
			var key = hasher.apply(this, arguments);
			return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments)
		}
	};
	_.delay = function(func, wait) {
		var args = slice.call(arguments, 2);
		return setTimeout(function() {
			return func.apply(null, args)
		}, wait)
	};
	_.defer = function(func) {
		return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)))
	};
	_.throttle = function(func, wait) {
		var context, args, timeout, result;
		var previous = 0;
		var later = function() {
			previous = new Date;
			timeout = null;
			result = func.apply(context, args)
		};
		return function() {
			var now = new Date;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0) {
				clearTimeout(timeout);
				timeout = null;
				previous = now;
				result = func.apply(context, args)
			} else if (!timeout)
				timeout = setTimeout(later, remaining);
			return result
		}
	};
	_.debounce = function(func, wait, immediate) {
		var timeout, result;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate)
					result = func.apply(context, args)
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow)
				result = func.apply(context, args);
			return result
		}
	};
	_.once = function(func) {
		var ran = false, memo;
		return function() {
			if (ran)
				return memo;
			ran = true;
			memo = func.apply(this, arguments);
			func = null;
			return memo
		}
	};
	_.wrap = function(func, wrapper) {
		return function() {
			var args = [func];
			push.apply(args, arguments);
			return wrapper.apply(this, args)
		}
	};
	_.compose = function() {
		var funcs = arguments;
		return function() {
			var args = arguments;
			for (var i = funcs.length - 1; i >= 0; i--)
				args = [funcs[i].apply(this, args)];
			return args[0]
		}
	};
	_.after = function(times, func) {
		if (times <= 0)
			return func();
		return function() {
			if (--times < 1)
				return func.apply(this, arguments)
		}
	};
	_.keys = nativeKeys ||
	function(obj) {
		if (obj !== Object(obj))
			throw new TypeError("Invalid object");
		var keys = [];
		for (var key in obj)
		if (_.has(obj, key))
			keys[keys.length] = key;
		return keys
	};
	_.values = function(obj) {
		var values = [];
		for (var key in obj)
		if (_.has(obj, key))
			values.push(obj[key]);
		return values
	};
	_.pairs = function(obj) {
		var pairs = [];
		for (var key in obj)
		if (_.has(obj, key))
			pairs.push([key, obj[key]]);
		return pairs
	};
	_.invert = function(obj) {
		var result = {};
		for (var key in obj)
		if (_.has(obj, key))
			result[obj[key]] = key;
		return result
	};
	_.functions = _.methods = function(obj) {
		var names = [];
		for (var key in obj)
		if (_.isFunction(obj[key]))
			names.push(key);
		return names.sort()
	};
	_.extend = function(obj) {
		each(slice.call(arguments, 1), function(source) {
			if (source)
				for (var prop in source)
				obj[prop] = source[prop]
		});
		return obj
	};
	_.pick = function(obj) {
		var copy = {};
		var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
		each(keys, function(key) {
			if ( key in obj)
				copy[key] = obj[key]
		});
		return copy
	};
	_.omit = function(obj) {
		var copy = {};
		var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
		for (var key in obj)
		if (!_.contains(keys, key))
			copy[key] = obj[key];
		return copy
	};
	_.defaults = function(obj) {
		each(slice.call(arguments, 1), function(source) {
			if (source)
				for (var prop in source)
				if (obj[prop] == null)
					obj[prop] = source[prop]
		});
		return obj
	};
	_.clone = function(obj) {
		if (!_.isObject(obj))
			return obj;
		return _.isArray(obj) ? obj.slice() : _.extend({}, obj)
	};
	_.tap = function(obj, interceptor) {
		interceptor(obj);
		return obj
	};
	var eq = function(a, b, aStack, bStack) {
		if (a === b)
			return a !== 0 || 1 / a == 1 / b;
		if (a == null || b == null)
			return a === b;
		if ( a instanceof _)
			a = a._wrapped;
		if ( b instanceof _)
			b = b._wrapped;
		var className = toString.call(a);
		if (className != toString.call(b))
			return false;
		switch (className) {
			case "[object String]":
				return a == String(b);
			case "[object Number]":
				return a != +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;
			case "[object Date]":
			case "[object Boolean]":
				return +a == +b;
			case "[object RegExp]":
				return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
		}
		if ( typeof a != "object" || typeof b != "object")
			return false;
		var length = aStack.length;
		while (length--)
		if (aStack[length] == a)
			return bStack[length] == b;
		aStack.push(a);
		bStack.push(b);
		var size = 0, result = true;
		if (className == "[object Array]") {
			size = a.length;
			result = size == b.length;
			if (result)
				while (size--)
				if (!( result = eq(a[size], b[size], aStack, bStack)))
					break
		} else {
			var aCtor = a.constructor, bCtor = b.constructor;
			if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor))
				return false;
			for (var key in a)
			if (_.has(a, key)) {
				size++;
				if (!( result = _.has(b, key) && eq(a[key], b[key], aStack, bStack)))
					break
			}
			if (result) {
				for (key in b)
				if (_.has(b, key) && !size--)
					break;
				result = !size
			}
		}
		aStack.pop();
		bStack.pop();
		return result
	};
	_.isEqual = function(a, b) {
		return eq(a, b, [], [])
	};
	_.isEmpty = function(obj) {
		if (obj == null)
			return true;
		if (_.isArray(obj) || _.isString(obj))
			return obj.length === 0;
		for (var key in obj)
		if (_.has(obj, key))
			return false;
		return true
	};
	_.isElement = function(obj) {
		return !!(obj && obj.nodeType === 1)
	};
	_.isArray = nativeIsArray ||
	function(obj) {
		return toString.call(obj) == "[object Array]"
	};
	_.isObject = function(obj) {
		return obj === Object(obj)
	};
	each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(name) {
		_["is" + name] = function(obj) {
			return toString.call(obj) == "[object " + name + "]"
		}
	});
	if (!_.isArguments(arguments))
		_.isArguments = function(obj) {
			return !!(obj && _.has(obj, "callee"))
		};
	if ( typeof / . / !== "function")
		_.isFunction = function(obj) {
			return typeof obj === "function"
		};
	_.isFinite = function(obj) {
		return isFinite(obj) && !isNaN(parseFloat(obj))
	};
	_.isNaN = function(obj) {
		return _.isNumber(obj) && obj != +obj
	};
	_.isBoolean = function(obj) {
		return obj === true || obj === false || toString.call(obj) == "[object Boolean]"
	};
	_.isNull = function(obj) {
		return obj === null
	};
	_.isUndefined = function(obj) {
		return obj ===
		void 0
	};
	_.has = function(obj, key) {
		return hasOwnProperty.call(obj, key)
	};
	_.noConflict = function() {
		root._ = previousUnderscore;
		return this
	};
	_.identity = function(value) {
		return value
	};
	_.times = function(n, iterator, context) {
		var accum = Array(n);
		for (var i = 0; i < n; i++)
			accum[i] = iterator.call(context, i);
		return accum
	};
	_.random = function(min, max) {
		if (max == null) {
			max = min;
			min = 0
		}
		return min + Math.floor(Math.random() * (max - min + 1))
	};
	var entityMap = {
		escape : {
			"&" : "&amp;",
			"<" : "&lt;",
			">" : "&gt;",
			'"' : "&quot;",
			"'" : "&#x27;",
			"/" : "&#x2F;"
		}
	};
	entityMap.unescape = _.invert(entityMap.escape);
	var entityRegexes = {
		escape : new RegExp("[" + _.keys(entityMap.escape).join("") + "]", "g"),
		unescape : new RegExp("(" + _.keys(entityMap.unescape).join("|") + ")", "g")
	};
	_.each(["escape", "unescape"], function(method) {
		_[method] = function(string) {
			if (string == null)
				return "";
			return ("" + string).replace(entityRegexes[method], function(match) {
				return entityMap[method][match]
			})
		}
	});
	_.result = function(object, property) {
		if (object == null)
			return null;
		var value = object[property];
		return _.isFunction(value) ? value.call(object) : value
	};
	_.mixin = function(obj) {
		each(_.functions(obj), function(name) {
			var func = _[name] = obj[name];
			_.prototype[name] = function() {
				var args = [this._wrapped];
				push.apply(args, arguments);
				return result.call(this, func.apply(_, args))
			}
		})
	};
	var idCounter = 0;
	_.uniqueId = function(prefix) {
		var id = ++idCounter + "";
		return prefix ? prefix + id : id
	};
	_.templateSettings = {
		evaluate : /<%([\s\S]+?)%>/g,
		interpolate : /<%=([\s\S]+?)%>/g,
		escape : /<%-([\s\S]+?)%>/g
	};
	var noMatch = /(.)^/;
	var escapes = {
		"'" : "'",
		"\\" : "\\",
		"\r" : "r",
		"\n" : "n",
		"\t" : "t",
		"\u2028" : "u2028",
		"\u2029" : "u2029"
	};
	var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	_.template = function(text, data, settings) {
		var render;
		settings = _.defaults({}, settings, _.templateSettings);
		var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g");
		var index = 0;
		var source = "__p+='";
		text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
			source += text.slice(index, offset).replace(escaper, function(match) {
				return "\\" + escapes[match]
			});
			if (escape)
				source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
			if (interpolate)
				source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
			if (evaluate)
				source += "';\n" + evaluate + "\n__p+='";
			index = offset + match.length;
			return match
		});
		source += "';\n";
		if (!settings.variable)
			source = "with(obj||{}){\n" + source + "}\n";
		source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
		try {
			render = new Function(settings.variable || "obj", "_", source)
		} catch (e) {
			e.source = source;
			throw e;
		}
		if (data)
			return render(data, _);
		var template = function(data) {
			return render.call(this, data, _)
		};
		template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}";
		return template
	};
	_.chain = function(obj) {
		return _(obj).chain()
	};
	var result = function(obj) {
		return this._chain ? _(obj).chain() : obj
	};
	_.mixin(_);
	each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
		var method = ArrayProto[name];
		_.prototype[name] = function() {
			var obj = this._wrapped;
			method.apply(obj, arguments);
			if ((name == "shift" || name == "splice") && obj.length === 0)
				delete obj[0];
			return result.call(this, obj)
		}
	});
	each(["concat", "join", "slice"], function(name) {
		var method = ArrayProto[name];
		_.prototype[name] = function() {
			return result.call(this, method.apply(this._wrapped, arguments))
		}
	});
	_.extend(_.prototype, {
		chain : function() {
			this._chain = true;
			return this
		},
		value : function() {
			return this._wrapped
		}
	})
}).call(Signal);
Signal._ = Signal._underscore;

//DEPENDENCIAS
(function(Signal) {
	var DependencyManagerClass = function() {
		this._mapOfFinishedFunctionKeys = {};
		this._mapOfFunctionKeysToFunctionQueues = {}
	};
	Signal._.extend(DependencyManagerClass.prototype, {
		addFunction : function(functionParameters) {
			if (this._doesAddingThisFunctionCauseACycle(functionParameters))
				throw new Error("cycle this", functionParameters);
			if (this._shouldRunFunction(functionParameters))
				this._runFunction(functionParameters);
			else
				this._queueFunctionParameters(functionParameters)
		},
		notifyFunctionFinished : function(functionKey) {
			this._mapOfFinishedFunctionKeys[functionKey] = true;
			this._checkDependentFunctions(functionKey)
		},
		_doesAddingThisFunctionCauseACycle : function(functionParameters, currentFunctionKeyGraph) {
			currentFunctionKeyGraph = currentFunctionKeyGraph || [];
			var functionKey = functionParameters.functionKey;
			if (!functionKey)
				return true;
			var dependentFunctionKeys = functionParameters.dependentFunctionKeys;
			if (!dependentFunctionKeys)
				return false;
			var queuedFunctions = this._mapOfFunctionKeysToFunctionQueues[functionKey];
			if (!queuedFunctions || queuedFunctions.length === 0)
				return false;
			if (currentFunctionKeyGraph.indexOf(functionKey) > -1)
				return true;
			currentFunctionKeyGraph.push(functionKey);
			for (var ii = 0; ii < queuedFunctions.length; ii++) {
				var queuedFunction = queuedFunctions[ii];
				if (this._doesAddingThisFunctionCauseACycle(queuedFunction, currentFunctionKeyGraph.slice(0)))
					return true
			}
			return false
		},
		_shouldRunFunction : function(functionParameters) {
			return !this._mapOfFinishedFunctionKeys[functionParameters.functionKey] && this._haveAllDependentFunctionsFinished(functionParameters)
		},
		_haveAllDependentFunctionsFinished : function(functionParameters) {
			var dependentFunctionKeys = functionParameters.dependentFunctionKeys;
			if (!dependentFunctionKeys)
				return true;
			var anyUnfinishedFunctions = false;
			for (var ii = 0; ii < dependentFunctionKeys.length; ii++)
				anyUnfinishedFunctions = anyUnfinishedFunctions || !this._mapOfFinishedFunctionKeys[dependentFunctionKeys[ii]];
			if (anyUnfinishedFunctions)
				return false;
			else
				return true
		},
		_runFunction : function(functionParameters) {
			if (functionParameters.functionReference) {
				this._runFunctionInNewWay(functionParameters);
				return
			}
			var functionToCall = functionParameters.functionToCall;
			var functionKey = functionParameters.functionKey;
			var functionContext = functionParameters.functionContext;
			var self = this;
			if (!functionToCall || !functionKey)
				return;
			try {
				var functionNotCompleteTimeout = setTimeout(function() {
					Streak.BentoBox.logError("function timed out", functionKey)
				}, 60 * 1E3);
				functionToCall.call(functionContext, function() {
					clearTimeout(functionNotCompleteTimeout);
					self._mapOfFinishedFunctionKeys[functionKey] = true;
					self._checkDependentFunctions(functionKey)
				})
			} catch (err) {
				if (functionNotCompleteTimeout)
					clearTimeout(functionNotCompleteTimeout);
				console.error("Dependency Manager. Error in:", functionKey, functionParameters, err.stack);
				Streak.BentoBox.logError("Dependency Manager, error in run function " + functionKey, err)
			}
		},
		_runFunctionInNewWay : function(functionParameters) {
			var self = this;
			var functionReference = functionParameters.functionReference;
			var functionKey = functionParameters.functionKey;
			var functionContext = functionParameters.functionContext;
			if (!functionReference || !functionKey)
				return;
			try {
				var promise = functionReference.call(functionContext);
				if (!promise) {
					this._mapOfFinishedFunctionKeys[functionKey] = true;
					this._checkDependentFunctions(functionKey);
					return
				}
				var functionNotCompleteTimeout = setTimeout(function() {
					Streak.BentoBox.logError("function timed out", functionKey)
				}, 60 * 1E3);
				promise.done(function() {
					clearTimeout(functionNotCompleteTimeout);
					self._mapOfFinishedFunctionKeys[functionKey] = true;
					self._checkDependentFunctions(functionKey)
				})
			} catch (err) {
				console.error("Dependency Manager. Error in:", functionKey, functionParameters, err.stack);
				BB.logError("Dependency Manager, error in run function " + functionKey, err);
				if (functionNotCompleteTimeout)
					clearTimeout(functionNotCompleteTimeout)
			}
		},
		_checkDependentFunctions : function(functionKey) {
			var dependentFunctionParametersQueue = this._mapOfFunctionKeysToFunctionQueues[functionKey];
			if (!dependentFunctionParametersQueue)
				return false;
			for (var ii = 0; ii < dependentFunctionParametersQueue.length; ii++) {
				var functionParameters = dependentFunctionParametersQueue[ii];
				if (this._shouldRunFunction(functionParameters))
					this._runFunction(functionParameters)
			}
		},
		_queueFunctionParameters : function(functionParameters) {
			var dependentFunctionKeys = functionParameters.dependentFunctionKeys;
			if (!dependentFunctionKeys)
				return;
			for (var ii = 0; ii < dependentFunctionKeys.length; ii++) {
				var dependentFunctionKey = dependentFunctionKeys[ii];
				this._addFunctionParametersToRespectiveFunctionQueue(dependentFunctionKey, functionParameters)
			}
		},
		_addFunctionParametersToRespectiveFunctionQueue : function(dependentFunctionKey, functionParameters) {
			var functionParameterQueue = this._mapOfFunctionKeysToFunctionQueues[dependentFunctionKey];
			if (!functionParameterQueue) {
				functionParameterQueue = [];
				this._mapOfFunctionKeysToFunctionQueues[dependentFunctionKey] = functionParameterQueue
			}
			functionParameterQueue.push(functionParameters)
		}
	});
	Signal.DependencyManager = new DependencyManagerClass
})(Signal);

Signal.initLibrary = function() {
	//Libreria par acrear botones

	var $ = window.jQuery, _ = Signal._

	console.log('kp: Jquery loaded...', Signal.$)
	console.log('kp: Underscore loaded...', Signal._)

	var Button = {
		classes : {
			normal : {
				inactive : "T-I-ax7",
				hover : "T-I-JW",
				active : "T-I-Kq"
			},
			blue : {
				inactive : "T-I-atl",
				hover : "T-I-JW",
				active : "T-I-JO"
			},
			red : {
				inactive : "T-I-KE",
				hover : "T-I-JW",
				active : "T-I-JO"
			},
			icon : {
				inactive : "J-Z-I",
				hover : "J-Z-I-JW",
				active : "J-Z-I-KO"
			}
		},
		defaults : {
			button : {
				name : null,
				isRefresh : false,
				isToggle : false,
				enableDepressedState : true,
				onFunc : $.noop,
				offFunc : $.noop,
				color : "normal",
				hasButtonToLeft : false,
				hasButtonToRight : false,
				customButton : null,
				onClass : null,
				hoverClass : null,
				isDropdown : false,
				isOn : false,
				iconClassName : undefined,
				tooltip : undefined,
				tabIndex : 2001
			},
			group : {}
		},
		templates : {
			button : null,
			group : null,
			refresh : null
		},
		init : function(cb) {
			// Button.templates.refresh = HTML.get("refreshButton");
			if (cb)
				cb()
		},
		create : function(options) {
			var o = {};
			_.extend(o, this.defaults.button, options);
			return new this.impl(o)
		},
		createGroup : function(options) {
			var o = {};
			_.extend(o, this.defaults.group, options);
			return new this.groupImpl(o)
		}
	};
	Button.impl = function(o) {
		var options = o, isOn = options.isOn;
		var el = null;
		var innerEl = null;
		var disabled = false;
		if (options.customButton)
			el = $(options.customButton);
		else {
			el = $(document.createElement("div"));
			innerEl = $(document.createElement("div"));
			el.append(innerEl);
			if (options.tooltip)
				el.attr("data-tooltip", options.tooltip);
			if (options.iconClassName) {
				var iconDiv = $("<div class='bbIcon' ></div>");
				iconDiv.addClass(options.iconClassName);
				el.prepend(iconDiv);
				if (options.name) {
					iconDiv.attr("style", "vertical-align: middle; padding-top:2px;padding-right: 4px;");
					innerEl.attr("style", "vertical-align: middle; display: inline-block;")
				} else {
					iconDiv.attr("style", "vertical-align: middle;");
					el[0].setAttribute("style", "min-width: 0px; padding-right: 10px; padding-left: 10px")
				}
			}
			el[0].setAttribute("class", "T-I J-J5-Ji ar7 L3 J-Zh-I bbButton");
			el[0].setAttribute("tabindex", options.tabIndex);
			if (options.isRefresh)
				innerEl[0].innerHTML = Button.templates.refresh();
			else
				innerEl.append(options.name);
			if (options.isDropdown)
				innerEl.append('<div class="downArrow G-asx T-I-J3 J-J5-Ji">&nbsp;</div>')
		}
		var on = function(dontCallback, e) {
			if (disabled)
				return;
			var butName = options.isRefresh ? "refresh" : $.trim(el.text());
			butName = options.overridenTrackingName ? options.overridenTrackingName : butName;
			if (o.isToggle) {
				if (o.enableDepressedState)
					if (options.customButton)
						el.addClass(options.onClass);
					else
						el.addClass("J-Zh-I-Jo").addClass("J-Zh-I-Kq").addClass("bbActive").addClass(Button.classes[options.color].active);
				isOn = true;
				if (options.enableDepressedState)
					el.trigger("hold")
			}
			if (!dontCallback)
				options.onFunc(e)
		}, setOnFunc = function(fxn) {
			options.onFunc = fxn
		}, off = function(dontCallback, e) {
			if (isOn)
				if (!dontCallback)
					options.offFunc(e);
			isOn = false;
			el.trigger("unhold");
			if (o.enableDepressedState)
				if (options.customButton)
					el.removeClass(options.onClass);
				else
					el.removeClass("J-Zh-I-Jo").removeClass("J-Zh-I-Kq").removeClass("bbActive").removeClass(Button.classes[options.color].active)
		};
		if (options.hasButtonToRight)
			el.addClass("T-I-Js-IF");
		if (options.hasButtonToLeft)
			el.addClass("T-I-Js-Gs");
		if (options.customButton) {
			if (options.hoverClass)
				el.easyHoverClass(options.hoverClass)
		} else {
			el.addClass(Button.classes[options.color].inactive);
			// el.easyHoverClass(Button.classes[options.color].hover + " J-Zh-I-JW")
		}
		el.click(function(e) {
			if (isOn)
				off(false, e);
			else
				on(false, e)
		});

		/*
		 BB.Keyboard.bindChordToElement(el, "enter/space", function () {
		 if (isOn) off();
		 else on()
		 }, true, true);*/

		return {
			setOnFunc : setOnFunc,
			el : el,
			innerEl : innerEl,
			on : on,
			off : off,
			getElement : function() {
				return el
			},
			changeIconByClass : function(oldClass, newClass) {
				if (_.isDefined(iconDiv)) {
					iconDiv.removeClass(oldClass);
					iconDiv.addClass(newClass)
				}
			},
			toggleRoundLeft : function() {
				var className = "T-I-Js-Gs";
				if (el && el.hasClass(className))
					el.removeClass(className);
				else if (_.isDefined(el))
					el.addClass(className)
			},
			toggleRoundRight : function() {
				var className = "T-I-Js-IF";
				if (el && el.hasClass(className))
					el.removeClass(className);
				else if (el)
					el.addClass(className)
			},
			disable : function() {
				if (!options.customButton)
					el.addClass("T-I-JE");
				el.trigger("disabled");
				disabled = true
			},
			enable : function() {
				if (!options.customButton)
					el.removeClass("T-I-JE");
				el.trigger("enabled");
				disabled = false
			},
			destroy : function() {
				innerEl.remove();
				el.remove()
			}
		}
	};
	Button.groupImpl = function(o) {
		var options = o, el = $(document.createElement("div"));
		el[0].setAttribute("class", "VP5otc-HT6HAf J-J5-Ji G-Ni bbButtonGroup");
		return {
			el : el,
			destroy : function() {
				el.remove()
			}
		}
	};
	/*
	 Streak.DependencyManager.addFunction({
	 functionKey: "widgets.button.initialized",
	 functionToCall: Button.init,
	 functionContext: Button,
	 dependentFunctionKeys: ["htmlLoaded", "localeLoaded"]
	 });*/
	Signal.Button = Button
}
/////////////////////////////

var getData = function(id) {
	return document.getElementById(id + "_gmailr_data").getAttribute('data-val');
};

var loadScript = function(path) {
        var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = path;
    headID.appendChild(newScript);
};

MeGmail.isPreviewPane = function() {
	var e = $("div[role=main]:first").find("[gh=tl]");
	if (e.length > 0) {
		return e[0].getAttribute("class").indexOf("aia") != -1;
	}
	return false;
};

MeGmail.insideEmail = function() {

	if (window.SignalNS.gmail.get.current_page() != null && !MeGmail.isPreviewPane()) {
		return false;
	}

	var items = $('.ii.gt');
	var ids = [];

	for (var i = 0; i < items.length; i++) {
		var mail_id = items[i].getAttribute('class').split(' ')[2];
		if (mail_id != 'undefined' && mail_id != undefined) {
			if ($(items[i]).is(':visible')) {
				ids.push(items[i]);
			}
		}
	}

	return ids.length > 0;

}
/*

 //create butons
 (function (Streak) {
 var $ = Streak.jQuery,
 _ = Streak._,
 HTML = Streak.HTML,
 Gmail = Streak.Gmail,
 BB = Streak.BentoBox;

 var _defaults = {
 text: "click me",
 clickFunction: $.noop,
 stopPropagation: true,
 preventDefault: true
 };
 var _template = _.template('<span class="streak__linkButton bbButton" tabindex="-1"><%= text %></span>');
 var LinkButton = function (options) {
 this.el = $(_template({
 text: options.text
 }));
 this.el.on("click", function (e) {
 options.clickFunction();
 if (options.preventDefault) e.preventDefault();
 if (options.stopPropagation) e.stopPropagation()
 });
 var self = this;

 BB.Keyboard.bindChordToEl({
 el: this.el,
 chord: "enter/space",
 cb: function () {
 setTimeout(function () {
 self.el.click()
 }, 150)
 },
 noDefault: true,
 noBubble: true,
 useCapture: true
 });
 this.getElement = function () {
 return this.el
 }
 };
 _.extend(LinkButton.prototype, {
 getElement: function () {
 return this.el
 },
 destroy: function () {
 this.el.remove()
 }
 });
 LinkButton.create = function (options) {
 var o = _.extend({}, _defaults, options);
 return new LinkButton(o)
 };
 BB.Widgets.LinkButton = LinkButton
 })(Streak);*/

Signal.bindChordToEl = function(options) {
	var el = options.el, chord = options.chord, cb = options.cb, noBubble = options.noBubble, noDefault = options.noDefault, notOnInput = options.notOnInput, keyEvent = options.keyEvent, useCapture = options.useCapture, delegate = options.delegate;
	if (!keyEvent)
		keyEvent = "keydown";

	//var jfunc = jwerty.event(chord, cb);  parace para manejo de teclado...
	var eventCallbackFunction;
	var bind = function(event) {
		if (useCapture) {
			eventCallbackFunction = checkAndRun;
			el[0].addEventListener(keyEvent, eventCallbackFunction, true)
		} else {
			eventCallbackFunction = function(e) {
				if (!(notOnInput && $(e.target).is("input,textarea,[contentEditable=true],.input")))
					checkAndRun(e)
			};
			el.on(event, options.delegate, null, eventCallbackFunction)
		}
	};
	/*
	 var checkAndRun = function (e) {
	 jfunc(e);
	 if (noBubble && jwerty.is(chord, e))
	 if (useCapture) {
	 e.stopPropagation();
	 e.stopImmediatePropagation()
	 } else e.stopPropagation();
	 if (noDefault && jwerty.is(chord, e)) e.preventDefault()
	 };*/
	if (_.isArray(keyEvent))
		_.each(keyEvent, function(event) {
			bind(event)
		});
	else
		bind(keyEvent);
	return function() {
		if (useCapture)
			el[0].removeEventListener(keyEvent, eventCallbackFunction, true);
		else
			el.off(event, options.delegate, eventCallbackFunction)
	}
}
var LinkButton = function(options) {
	this.el = $(_template({
		text : options.text
	}));
	this.el.on("click", function(e) {
		options.clickFunction();
		if (options.preventDefault)
			e.preventDefault();
		if (options.stopPropagation)
			e.stopPropagation()
	});
	var self = this;

	this.getElement = function() {
		return this.el
	}
};

Signal.createLinkButton = function(options) {

	var _defaults = {
		text : "click me",
		clickFunction : $.noop,
		stopPropagation : true,
		preventDefault : true
	};

	var _template = _.template('<span class="streak__linkButton bbButton" tabindex="-1"><%= text %></span>');

	this.el = $(_template({
		text : options.text
	}));

	this.el.on("click", function(e) {
		options.clickFunction();
		if (options.preventDefault)
			e.preventDefault();
		if (options.stopPropagation)
			e.stopPropagation()
	});

	var self = this;

	_.extend(LinkButton.prototype, {
		getElement : function() {
			return this.el
		},
		destroy : function() {
			this.el.remove()
		}
	});

	var o = _.extend({}, _defaults, options);
	return new LinkButton(o)

}

Signal.createMenu = function() {

	var menuButtonOptions = {
		color : "blue",
		menuInner : ReminderList.templates.menu(),
		closeOnSelect : false,
		css : {
			width : "220px"
		},
		rightAligned : !MeGmail.isXobniInstalled(),
		trackingContext : options.trackingContext,
		fixedPosition : true
	};

}
//My own popup windows
Signal.openPopUp = function() {

	$(document.body).prepend("<span id='black_overlay_kp'></span><span id='kplian_modal'></span>");
	$("#black_overlay_kp").css({
		height : "100%",
		width : "100%",
		"background-color" : "#000",
		opacity : ".4",
		position : "absolute",
		"z-index" : "99"
	});
	$("#kplian_modal").css({
		height : "900px",
		width : "700px",
		position : "absolute",
		margin : "auto",
		"margin-top" : "100px",
		top : "0",
		bottom : "0",
		left : "0",
		right : "0",
		"z-index" : "999"
	});

	//Get path
	url = getData('popupPM')

	$.get(url).success(function(e) {
		$("#kplian_modal").html(e);
	})
}
//funcion personalizada
Signal.addMeOwnButton = function(again) {

	if(!window.SignalNS.token) {
	    console.log('- Inside addButtons, no token present, authenticating');
	    Signal.auth();
	    return;
	  }

	var previewPane = MeGmail.isPreviewPane();
	var insideEmail = MeGmail.insideEmail();

	if ($("#SignalMenuKPLIAN").length != 0) {
		var css = "-webkit-linear-gradient(top," + ((editMode) ? "#ddd,#eee" : "#f5f5f5,#f1f1f1") + ")";
		$("#SignalKPLIAN")[0].innerText = 'Edit ...  my boton...';
		$("#SignalKPLIAN").css({
			"background-image" : css
		});
	}

	var b1 = '<div id="SignalKPLIAN" class="T-I J-J5-Ji lR T-I-ax7 T-I-Js-IF ar7" role="button" tabindex="0" data-tooltip="Edit ... kplian" style="-webkit-user-select: none;">Mi propio boton</div>';
	var t = '<div class="G-Ni J-J5-Ji" id="SignalMenuKPLIAN">' + b1 + '</div>';

	var b2 = '<div id="SignalKPLIAN2" class="T-I J-J5-Ji lR T-I-ax7 T-I-Js-IF ar7" role="button" tabindex="0" data-tooltip="Edit ... kplian" style="-webkit-user-select: none;">Mi propio boton 2</div>';
	var t2 = '<div class="G-Ni J-J5-Ji" id="SignalMenuKPLIAN2">' + b2 + '</div>';

	//
	var menPM = '<div class="aim linkItem"><div class="TO linkItemInner listToggle"><div class="TN aY7xie aze link" style="margin-left:0px;"><div class="TH aih J-J5-Ji expando" role="link" tabindex="0"></div><div class="aio aip" id="kplianMenu"><span class="nU CJ">Process Maker</span><span class="bentoBoxIndicator" style="margin-top:1px;"></span></div><div class="linkItem newPipeline CL" style="" id=kplianPMNewCase><a class="CK" href="#">+ New</a></div></div></div></div>';
	var subMenUno = '<div class="TO linkItemInner"><div class="TN aY7xie aik" style="margin-left: 12px"><div class="TH aih J-J5-Ji expando" role="link" tabindex="0" style="display: none;"></div><div class="aio aip" id="kplianSubMenu1"><span class="nU n1 name"> Inbox </span></div><div class="nL aig menuButtonAnchor"><div class="pM menuButton aj0" style="color: rgb(0, 0, 0); background-color: rgb(255, 173, 71); border-color: rgb(255, 173, 71)" tabindex="0" role="button"><div class="p6" style="background-color: rgb(255, 173, 71)"><div class="p8">▼</div></div></div></div></div></div>';
	var subMenDos = '<div class="TO linkItemInner"><div class="TN aY7xie aik" style="margin-left: 12px"><div class="TH aih J-J5-Ji expando" role="link" tabindex="0" style="display: none;"></div><div class="aio aip" id="kplianSubMenu2"><span class="nU n1 name"> Draft </span></div><div class="nL aig menuButtonAnchor"><div class="pM menuButton aj0" style="color: rgb(0, 0, 0); background-color: rgb(255, 173, 71); border-color: rgb(255, 173, 71)" tabindex="0" role="button"><div class="p6" style="background-color: rgb(255, 173, 71)"><div class="p8">▼</div></div></div></div></div></div>';
	var subMenTres = '<div class="TO linkItemInner"><div class="TN aY7xie aik" style="margin-left: 12px"><div class="TH aih J-J5-Ji expando" role="link" tabindex="0" style="display: none;"></div><div class="aio aip" id="kplianSubMenu3"><span class="nU n1 name"> Participated </span></div><div class="nL aig menuButtonAnchor"><div class="pM menuButton aj0" style="color: rgb(0, 0, 0); background-color: rgb(255, 173, 71); border-color: rgb(255, 173, 71)" tabindex="0" role="button"><div class="p6" style="background-color: rgb(255, 173, 71)"><div class="p8">▼</div></div></div></div></div></div>';
	var subMenCuatro = '<div class="TO linkItemInner"><div class="TN aY7xie aik" style="margin-left: 12px"><div class="TH aih J-J5-Ji expando" role="link" tabindex="0" style="display: none;"></div><div class="aio aip" id="kplianSubMenu4"><span class="nU n1 name"> Unassigned </span></div><div class="nL aig menuButtonAnchor"><div class="pM menuButton aj0" style="color: rgb(0, 0, 0); background-color: rgb(255, 173, 71); border-color: rgb(255, 173, 71)" tabindex="0" role="button"><div class="p6" style="background-color: rgb(255, 173, 71)"><div class="p8">▼</div></div></div></div></div></div>';
	var subMenCinco = '<div class="TO linkItemInner"><div class="TN aY7xie aik" style="margin-left: 12px"><div class="TH aih J-J5-Ji expando" role="link" tabindex="0" style="display: none;"></div><div class="aio aip" id="kplianSubMenu5"><span class="nU n1 name"> Paused </span></div><div class="nL aig menuButtonAnchor"><div class="pM menuButton aj0" style="color: rgb(0, 0, 0); background-color: rgb(255, 173, 71); border-color: rgb(255, 173, 71)" tabindex="0" role="button"><div class="p6" style="background-color: rgb(255, 173, 71)"><div class="p8">▼</div></div></div></div></div></div>';

	//menu principal
	var mp = '<div class="LrBjie bbLinkWrapper"><div class="TK">' + menPM + '</div><div class="TK linkList"><div class="aim linkItem pipeline">' + subMenUno + '</div><div class=" streak__savedViewsHolder" style="display: none;"></div><div class="aim linkItem pipeline">' + subMenDos + '</div><div class=" streak__savedViewsHolder" style="display: none;"></div><div class="aim linkItem pipeline">' + subMenTres + '</div><div class=" streak__savedViewsHolder" style="display: none;"></div><div class="aim linkItem pipeline">' + subMenCuatro + '</div><div class=" streak__savedViewsHolder" style="display: none;"></div><div class="aim linkItem pipeline">' + subMenCinco + '</div><div class=" streak__savedViewsHolder" style="display: none;"></div></div><div class="streak__hiddenPipelinesWrapper"><div class="streak__hiddenPipelines" style="display: none;"><div class="n6"><span role="button" class="J-Ke n4 ah9 aiu" tabindex="0"><span class="CJ">Hidde Process Maker Options</span><span class="ait"><div class="G-asx T-I-J3 J-J5-Ji">&nbsp;</div></span></span></div><div class="TK hiddenLinkList" style="display:none;"></div></div></div></div>';

	if ("0" in $(".iH").children() && $('#SignalMenuKPLIAN').length != 1) {

		// $('[gh=mtb]').children()).append(t);

		//$('[gh=mtb]').children().append(t);
		$("#SignalKPLIAN").off();
		$("#SignalKPLIAN").on('click', function() {
			Signal.addMeOwnButton()
		});

	}
	//$('[class=r9gPwb]').append(t);
	if($("#kplianMenu").lenght>0){
		//Ya existe, no hacer nada
	} else{
		$('[class=n3]').append(mp);
	}

	//$("#SignalKPLIAN").off();
	$("#SignalKPLIAN").on('click', function() {
		Signal.openPopUp();
	});

	//Eventos a los menues
	$("#kplianMenu").on('click', function() {
		Signal.openPopUp();
	});
	$("#kplianPMNewCase").on('click', function() {
		alert('TODO: abrir popup para creacion de Nuevos Casos');
	});
	$("#kplianSubMenu1").on('click', function() {
		alert('TODO: cargar casos Inbox');
	});
	$("#kplianSubMenu2").on('click', function() {
		alert('TODO: cargar casos Draft');
	});
	$("#kplianSubMenu3").on('click', function() {
		alert('TODO: cargar casos Participated');
	});
	$("#kplianSubMenu4").on('click', function() {
		alert('TODO: cargar casos Unassigned');
	});
	$("#kplianSubMenu5").on('click', function() {
		alert('TODO: cargar casos Paused');
	});

	$(".iH").append(t2);
	$("#SignalKPLIAN2").on('click', function() {
	});

	var id = window.SignalNS.gmail.get.email_id();
	window.SignalNS.track.lastID = id;
	//Email.loadData();

}

Signal.loadPreviews = function(force, cached) {
	if (MeGmail.insideEmail() || window.SignalNS.gmail.get.current_page() == null) {
		console.log('inside email');
		if (!force) {
			return;
		}
	}

	if (!window.SignalNS.track.loadPreviewTrigger) {
		console.log('- previews offset off, not loading them');
		if (!force) {
			return;
		}
	}

	if (!cached) {
		var cached = false;
	}

	if (!MeGmail.isPreviewPane()) {
		console.group('Loading Previews');
		var dom = $('[role="main"]').find('.Cp').find('tr');
		var sig = Email.getViewData();

		for (var i = 0; i < dom.length; i++) {
			var fb = sig[i];
			var em = dom[i];
			if (fb != null) {
				console.log('- Found edited email', fb.id, 'index:', i);
				$(em).find('.y6').find('span')[0].innerHTML = $("<div>" + fb.subject + "</div>").text();
				$($(em).find('.y6').find('span')[1]).css("text-overflow", "ellipsis");
				$(em).find('.y6').find('span')[1].innerText = $("<div> - " + fb.body.replace(/\n/g, " ").replace("<br>", " ") + "</div>").text();
			}
		}

		window.SignalNS.track.loadPreviewTrigger = false;
		console.groupEnd();
	} else {
		console.group('Loading Previews');
		var dom = $('[role="main"]').find('.Cp').find('tr');
		var sig = Email.getViewData(cached);

		for (var i = 0; i < dom.length / 3; i++) {
			var fb = sig[i];
			if (fb != null) {
				console.log('- Found edited email', fb.id, 'index:', i);
				$(dom[(i*3)+1]).find('span')[0].innerHTML = $("<div>" + fb.subject + "</div>").text();
				$(dom[(i*3)+2]).find('div').last()[0].innerText = $(fb.body.replace(/\n/g, " ").replace("<br>", " ")).text();
			}
		}

		window.SignalNS.track.loadPreviewTrigger = false;
		window.SignalNS.track.cachedViewData = sig;
		console.groupEnd();
	}
}

Signal.localize = function(s) {
	var self = this;
	return s.replace(/<%%([\s\S]+?)%>/g, function(match, code) {
		return self.getString(code.trim())
	})
}

Signal.initKPLIAN = function() {
	console.group('Signal Init');
	console.log('- jQuery and firebase loaded');
	console.log('- Signal initialized');

	Signal.initLibrary()

	console.log('- Library initialized');

	var userEmail = window.SignalNS.gmail.get.user_email();

	///revisa token
	alert('Kplian - Process Maker for Gmail: ' + userEmail)
	
	 if(!window.SignalNS.token) {
	    Signal.auth();
	    return;
	  }

	console.log(window.SignalNS.token)

	if (!MeGmail.isPreviewPane()) {

		if ('watchdog' in window.SignalNS.gmail.tracker) {
			window.SignalNS.gmail.observe.off();
		}

		Signal.addMeOwnButton();

	} else {
		window.SignalNS.gmail.observe.on('open_email', function(id) {

			Signal.addMeOwnButton(true);
		});

	}

	function updatePreviewCron() {
		console.log('- updating preview cron');

		$('.Cp').off();
		$('[role="main"]').find('.Cp').on('click', function() {
			Signal.loadPreviews(true, true);
		});
	}

	var addButton = Signal.Button.create({
		color : "red",
		name : 'add',
		onFunc : function() {
			self.personPicker.el.find("input").trigger("bbSelect")
		}
	});

	/*ar d = this.loaded.find("#shareStreakModal");
	var s = Signal.localize(d[0].innerHTML.unescapeHTML()).trim();
	if (isElement)
	return $($.parseHTML(s));
	else
	return _.template(s)

	this.modal = $(HTML.get("shareStreakModal")({
	modal_description: this.options.modalDescription
	}));

	this.modal.find(".sharingEnter").append(addButton.el);*/

	//$($(":ht").children()).append(addButton.el);

	//$("[class=r9gPwb]").append(addButton.el);

	//Signal.addMeOwnButton(true);

	updatePreviewCron();

	Signal.loadPreviews();

	console.groupEnd();

}
var checkLoaded = function() {
	if (window.jQuery && window.Firebase) {
		
		loadScript( getData("data_table")  );
		
		$.fn.onAvailable = function(e) {
			var t = this.selector;
			var n = this;
			if (this.length > 0)
				e.call(this);
			else {
				var r = setInterval(function() {
					if ($(t).length > 0) {
						e.call($(t));
						clearInterval(r);
					}
				}, 50);
			}
		};

		Signal.initKPLIAN();

	} else {
		setTimeout(checkLoaded, 100);
	}
}

Tools.utf8_encode = function(e) {
	if (e === null || typeof e === "undefined") {
		return ""
	}
	var t = e + "";
	var n = "", r, i, s = 0;
	r = i = 0;
	s = t.length;
	for (var o = 0; o < s; o++) {
		var u = t.charCodeAt(o);
		var a = null;
		if (u < 128) {
			i++
		} else if (u > 127 && u < 2048) {
			a = String.fromCharCode(u >> 6 | 192, u & 63 | 128)
		} else if (u & 63488 != 55296) {
			a = String.fromCharCode(u >> 12 | 224, u >> 6 & 63 | 128, u & 63 | 128)
		} else {
			if (u & 64512 != 55296) {
				throw new RangeError("Unmatched trail surrogate at " + o)
			}
			var f = t.charCodeAt(++o);
			if (f & 64512 != 56320) {
				throw new RangeError("Unmatched lead surrogate at " + (o - 1))
			}
			u = ((u & 1023) << 10) + (f & 1023) + 65536;
			a = String.fromCharCode(u >> 18 | 240, u >> 12 & 63 | 128, u >> 6 & 63 | 128, u & 63 | 128)
		}
		if (a !== null) {
			if (i > r) {
				n += t.slice(r, i)
			}
			n += a;
			r = i = o + 1
		}
	}
	if (i > r) {
		n += t.slice(r, s)
	}
	return n
}

Tools.md5 = function(e) {
	var t;
	var n = function(e, t) {
		return e << t | e >>> 32 - t
	};
	var r = function(e, t) {
		var n, r, i, s, o;
		i = e & 2147483648;
		s = t & 2147483648;
		n = e & 1073741824;
		r = t & 1073741824;
		o = (e & 1073741823) + (t & 1073741823);
		if (n & r) {
			return o ^ 2147483648 ^ i ^ s
		}
		if (n | r) {
			if (o & 1073741824) {
				return o ^ 3221225472 ^ i ^ s
			} else {
				return o ^ 1073741824 ^ i ^ s
			}
		} else {
			return o ^ i ^ s
		}
	};
	var i = function(e, t, n) {
		return e & t | ~e & n
	};
	var s = function(e, t, n) {
		return e & n | t & ~n
	};
	var o = function(e, t, n) {
		return e ^ t ^ n
	};
	var u = function(e, t, n) {
		return t ^ (e | ~n)
	};
	var a = function(e, t, s, o, u, a, f) {
		e = r(e, r(r(i(t, s, o), u), f));
		return r(n(e, a), t)
	};
	var f = function(e, t, i, o, u, a, f) {
		e = r(e, r(r(s(t, i, o), u), f));
		return r(n(e, a), t)
	};
	var l = function(e, t, i, s, u, a, f) {
		e = r(e, r(r(o(t, i, s), u), f));
		return r(n(e, a), t)
	};
	var c = function(e, t, i, s, o, a, f) {
		e = r(e, r(r(u(t, i, s), o), f));
		return r(n(e, a), t)
	};
	var h = function(e) {
		var t;
		var n = e.length;
		var r = n + 8;
		var i = (r - r % 64) / 64;
		var s = (i + 1) * 16;
		var o = new Array(s - 1);
		var u = 0;
		var a = 0;
		while (a < n) {
			t = (a - a % 4) / 4;
			u = a % 4 * 8;
			o[t] = o[t] | e.charCodeAt(a) << u;
			a++
		}
		t = (a - a % 4) / 4;
		u = a % 4 * 8;
		o[t] = o[t] | 128 << u;
		o[s - 2] = n << 3;
		o[s - 1] = n >>> 29;
		return o
	};
	var p = function(e) {
		var t = "", n = "", r, i;
		for ( i = 0; i <= 3; i++) {
			r = e >>> i * 8 & 255;
			n = "0" + r.toString(16);
			t = t + n.substr(n.length - 2, 2)
		}
		return t
	};
	var d = [], v, m, g, y, b, w, E, S, x, T = 7, N = 12, C = 17, k = 22, L = 5, A = 9, O = 14, M = 20, _ = 4, D = 11, P = 16, H = 23, B = 6, j = 10, F = 15, I = 21;
	e = this.utf8_encode(e);
	d = h(e);
	w = 1732584193;
	E = 4023233417;
	S = 2562383102;
	x = 271733878;
	t = d.length;
	for ( v = 0; v < t; v += 16) {
		m = w;
		g = E;
		y = S;
		b = x;
		w = a(w, E, S, x, d[v + 0], T, 3614090360);
		x = a(x, w, E, S, d[v + 1], N, 3905402710);
		S = a(S, x, w, E, d[v + 2], C, 606105819);
		E = a(E, S, x, w, d[v + 3], k, 3250441966);
		w = a(w, E, S, x, d[v + 4], T, 4118548399);
		x = a(x, w, E, S, d[v + 5], N, 1200080426);
		S = a(S, x, w, E, d[v + 6], C, 2821735955);
		E = a(E, S, x, w, d[v + 7], k, 4249261313);
		w = a(w, E, S, x, d[v + 8], T, 1770035416);
		x = a(x, w, E, S, d[v + 9], N, 2336552879);
		S = a(S, x, w, E, d[v + 10], C, 4294925233);
		E = a(E, S, x, w, d[v + 11], k, 2304563134);
		w = a(w, E, S, x, d[v + 12], T, 1804603682);
		x = a(x, w, E, S, d[v + 13], N, 4254626195);
		S = a(S, x, w, E, d[v + 14], C, 2792965006);
		E = a(E, S, x, w, d[v + 15], k, 1236535329);
		w = f(w, E, S, x, d[v + 1], L, 4129170786);
		x = f(x, w, E, S, d[v + 6], A, 3225465664);
		S = f(S, x, w, E, d[v + 11], O, 643717713);
		E = f(E, S, x, w, d[v + 0], M, 3921069994);
		w = f(w, E, S, x, d[v + 5], L, 3593408605);
		x = f(x, w, E, S, d[v + 10], A, 38016083);
		S = f(S, x, w, E, d[v + 15], O, 3634488961);
		E = f(E, S, x, w, d[v + 4], M, 3889429448);
		w = f(w, E, S, x, d[v + 9], L, 568446438);
		x = f(x, w, E, S, d[v + 14], A, 3275163606);
		S = f(S, x, w, E, d[v + 3], O, 4107603335);
		E = f(E, S, x, w, d[v + 8], M, 1163531501);
		w = f(w, E, S, x, d[v + 13], L, 2850285829);
		x = f(x, w, E, S, d[v + 2], A, 4243563512);
		S = f(S, x, w, E, d[v + 7], O, 1735328473);
		E = f(E, S, x, w, d[v + 12], M, 2368359562);
		w = l(w, E, S, x, d[v + 5], _, 4294588738);
		x = l(x, w, E, S, d[v + 8], D, 2272392833);
		S = l(S, x, w, E, d[v + 11], P, 1839030562);
		E = l(E, S, x, w, d[v + 14], H, 4259657740);
		w = l(w, E, S, x, d[v + 1], _, 2763975236);
		x = l(x, w, E, S, d[v + 4], D, 1272893353);
		S = l(S, x, w, E, d[v + 7], P, 4139469664);
		E = l(E, S, x, w, d[v + 10], H, 3200236656);
		w = l(w, E, S, x, d[v + 13], _, 681279174);
		x = l(x, w, E, S, d[v + 0], D, 3936430074);
		S = l(S, x, w, E, d[v + 3], P, 3572445317);
		E = l(E, S, x, w, d[v + 6], H, 76029189);
		w = l(w, E, S, x, d[v + 9], _, 3654602809);
		x = l(x, w, E, S, d[v + 12], D, 3873151461);
		S = l(S, x, w, E, d[v + 15], P, 530742520);
		E = l(E, S, x, w, d[v + 2], H, 3299628645);
		w = c(w, E, S, x, d[v + 0], B, 4096336452);
		x = c(x, w, E, S, d[v + 7], j, 1126891415);
		S = c(S, x, w, E, d[v + 14], F, 2878612391);
		E = c(E, S, x, w, d[v + 5], I, 4237533241);
		w = c(w, E, S, x, d[v + 12], B, 1700485571);
		x = c(x, w, E, S, d[v + 3], j, 2399980690);
		S = c(S, x, w, E, d[v + 10], F, 4293915773);
		E = c(E, S, x, w, d[v + 1], I, 2240044497);
		w = c(w, E, S, x, d[v + 8], B, 1873313359);
		x = c(x, w, E, S, d[v + 15], j, 4264355552);
		S = c(S, x, w, E, d[v + 6], F, 2734768916);
		E = c(E, S, x, w, d[v + 13], I, 1309151649);
		w = c(w, E, S, x, d[v + 4], B, 4149444226);
		x = c(x, w, E, S, d[v + 11], j, 3174756917);
		S = c(S, x, w, E, d[v + 2], F, 718787259);
		E = c(E, S, x, w, d[v + 9], I, 3951481745);
		w = r(w, m);
		E = r(E, g);
		S = r(S, y);
		x = r(x, b)
	}
	var q = p(w) + p(E) + p(S) + p(x);
	return q.toLowerCase()
}

Tools.make_request = function(url, verb, payload) {
	var met = ( typeof verb == undefined || typeof verb == null) ? "GET" : verb;
	var req = {
		type : met,
		url : encodeURI(url),
		async : false
	};

	if (payload) {
		req.data = payload;
	}

	var get = $.ajax(req);

	return get.responseText;
};

Email.prototype.getViewData = function(cache) {
	var perfStart = performance.now();

	if (cache) {
		console.log('- loadPreviews request time', performance.now() - perfStart);
		return window.SignalNS.track.cachedViewData;
	}

	if (MeGmail.insideEmail() && !MeGmail.isPreviewPane()) {
		return;
	}

	var emailID = Tools.md5(window.SignalNS.gmail.get.user_email());
	var fb = JSON.parse(Tools.make_request('https://signal.firebaseio.com/users/' + emailID + '/edited' + '.json?auth=' + window.SignalNS.token));
	var view = window.SignalNS.gmail.get.visible_emails();
	var offset = (MeGmail.isPreviewPane()) ? 3 : 1;
	var dom = $('[role="main"]').find('.Cp').find('tr');
	var newview = view.slice(0, dom.length / offset);
	var data = [];
	var allids = [];

	for (var i = 0; i < newview.length; i++) {
		var vid = newview[i].id;
		if ( vid in fb) {
			var edata = Tools.make_request('https://signal.firebaseio.com/users/' + emailID + '/emails/' + vid + '.json?auth=' + window.SignalNS.token);
			edata = JSON.parse(edata);

			if (edata != null) {
				edata.id = vid;
			}

			data.push(edata);
		} else {
			data.push(null);
		}
		allids.push(vid);
	}

	window.SignalNS.track.cachedViewDataIDs = allids;
	console.log('- loadPreviews request time', performance.now() - perfStart);

	return data;
}
var Email = new Email();

Signal.auth = function () {

  if(window.SignalNS.token == undefined) {
    window.postMessage({type: "email", email: window.SignalNS.gmail.get.user_email()}, "*");
  }

  function authMessageCheck(t) {
    if(t.data.type && t.data.type == "return_token") {
      console.group('Authentication Handler');
      if(t.data.token == null || t.data.token.length < 20) {
        $(document.body).prepend("<span id='black_overlay'></span><span id='signal_auth_modal'></span>");
        $("#black_overlay").css({height: "100%", width: "100%", "background-color": "#000", opacity: ".4", position: "absolute", "z-index": "99"});
        $("#signal_auth_modal").css({ height: "320px", width: "660px", position: "absolute", margin: "auto", "margin-top": "100px", top: "0", bottom: "0", left: "0", right: "0", "z-index": "999"});
        //kplian: Get path
		url = getData('popupOA')
        $.get(url).success(function (e) {
          $("#signal_auth_modal").html(e);
          $("#black_overlay").on("click", function () {
            if(window.SignalNS.auth_modal_dismissed == false) {
              var e = false;

              if($("#signal-authenticated").length == 1){
                e = true;
              }

              $("#black_overlay").remove();
              $("#signal_auth_modal").remove();
              window.SignalNS.auth_modal_dismissed = true;

              if(e == true) {
               location.reload();
              }
            }
          })
        })
      } else {
        console.log('- Setting auth token', t.data.token);
        window.SignalNS.token = t.data.token;

        if(t.data.set == true) {
          window.postMessage({type: "set_token", email: window.SignalNS.gmail.get.user_email(), token: window.SignalNS.token}, "*");
        }

        $("#signal-authenticate").remove();
        $($("#signal-right")[0]).append('<a href="#" id="signal-authenticated">&#10004; Signal is authenticated</a>');
        window.removeEventListener("message", authMessageCheck, false);
        //Signal.addMeOwnButton(true);
        Signal.initKPLIAN();
      }
      console.groupEnd();
    }
  }

  window.addEventListener("message", authMessageCheck, false);
};

window.SignalNS = {};
window.SignalNS.track = {};
window.SignalNS.check = {};
window.SignalNS.gmail = Gmail();

window.SignalNS.check.started = false;
window.SignalNS.track.originalEmails = {};
window.SignalNS.track.replaceContentTimeout = 100;
window.SignalNS.track.editMode = true;
window.SignalNS.track.loadPreviewTrigger = true;
window.SignalNS.track.cachedViewData = [];

if (window.SignalNS.check.started == false) {
	checkLoaded();
	window.SignalNS.started = true;
}