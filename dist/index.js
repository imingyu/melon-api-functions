(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('moment')) :
	typeof define === 'function' && define.amd ? define(['moment'], factory) :
	(global.MelonApiFunctions = factory(global.moment));
}(this, (function (moment) { 'use strict';

moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

var toString = Object.prototype.toString;

const REG_EXPS = {
    stringNumber: /^(-?\d+)(\.\d+)?$/,
    stringInt: /^(-?\d+)$/,
    stringDate: /^(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/,
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
    url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
    ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
    ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
    cnMobilePhone: /^1(3|4|5|7|8)\d{9}$/,
    cnPhone: /$/
};

var exec = str => {
    return new Function('return ' + str).call(null);
};
var between = (val, begin, end) => {
    return val > begin && val < end;
};

var checkStringType = (str, checker, defaultResult) => {
    try {
        if (typeof str !== 'string') return checker(str);
        return checker(exec(str));
    } catch (error) {
        return defaultResult || false;
    }
};

var setRegexp = (name, value) => {
    var oldValue = REG_EXPS[name];
    REG_EXPS[name] = value;
    return oldValue;
};

//type
var isString = val => typeof val === 'string' || toString.call(val) === '[object String]';

var isUndefined = val => typeof val === 'undefined';
var isStringUndefined = val => val === 'undefined';

var isBoolean = value => value === true || value === false || toString.call(value) === '[object Boolean]';
var isStringBoolean = val => {
    return val === 'true' || val === 'false';
};
var isUpperCaseBoolean = val => {
    return val === 'True' || val === 'False';
};

var isArray = Array.isArray || (value => toString.call(value) === '[object Array]');
var isStringArray = val => {
    return isArray(val) || typeof val === 'string' && val[0] === '[' && val[val.length - 1] === ']' && checkStringType(val, isArray);
};

var isFunction = val => typeof val === 'function' || toString.call(val) === '[object Function]';

var isNumber = val => typeof val === 'number' || toString.call(val) === '[object Number]';
var isStringNumber = val => {
    return isNumber(val) || REG_EXPS.stringNumber.test(val);
};
var isInt = val => Number.isInteger(val);
var isStringInt = val => {
    return isInt(val) || REG_EXPS.stringInt.test(val);
};
var isEven = val => isNumber(val) && val % 2 === 0;
var isStringEven = val => isStringNumber(val) && parseFloat(val) % 2 === 0;
var isOdd = val => isNumber(val) && val % 2 !== 0;
var isStringOdd = val => isStringNumber(val) && parseFloat(val) % 2 !== 0;

var isObject = val => typeof val === 'object';
var isStringObject = val => {
    return isObject(val) || typeof val === 'string' && val[0] === '{' && val[val.length - 1] === '}' && checkStringType(val, isObject);
};

var isDate = val => val instanceof Date || toString.call(val) === '[object Date]';
var isStringDate = val => isDate(val) || moment(val).isValid();
var isTime = val => moment(val, 'HH:mm:SS').isValid() || moment(val, 'HH:mm').isValid();
var isMonthNumber = val => isInt(val) && between(val, 0, 13);
var isStringMonthNumber = val => isStringInt(val) && isMonthNumber(val);
var isDayNumber = val => isInt(val) && between(val, 0, 32);
var isStringDayNumber = val => isStringInt(val) && isDayNumber(val);

var isUrl = val => REG_EXPS.url.test(val);
var isEmail = val => REG_EXPS.email.test(val);
var isIPv4 = val => REG_EXPS.ipv4.test(val);
var isIPv6 = val => REG_EXPS.ipv6.test(val);
var isIP = val => isIPv4(val) || isIPv6(val);
var isCNMobilePhone = val => REG_EXPS.cnMobilePhone.test(val);
var isInclude = (str, target) => isString(str) && str.indexOf(target) !== -1;

var Is = Object.freeze({
	setRegexp: setRegexp,
	isString: isString,
	isUndefined: isUndefined,
	isStringUndefined: isStringUndefined,
	isBoolean: isBoolean,
	isStringBoolean: isStringBoolean,
	isUpperCaseBoolean: isUpperCaseBoolean,
	isArray: isArray,
	isStringArray: isStringArray,
	isFunction: isFunction,
	isNumber: isNumber,
	isStringNumber: isStringNumber,
	isInt: isInt,
	isStringInt: isStringInt,
	isEven: isEven,
	isStringEven: isStringEven,
	isOdd: isOdd,
	isStringOdd: isStringOdd,
	isObject: isObject,
	isStringObject: isStringObject,
	isDate: isDate,
	isStringDate: isStringDate,
	isTime: isTime,
	isMonthNumber: isMonthNumber,
	isStringMonthNumber: isStringMonthNumber,
	isDayNumber: isDayNumber,
	isStringDayNumber: isStringDayNumber,
	isUrl: isUrl,
	isEmail: isEmail,
	isIPv4: isIPv4,
	isIPv6: isIPv6,
	isIP: isIP,
	isCNMobilePhone: isCNMobilePhone,
	isInclude: isInclude
});

var index = {
    Is
};

return index;

})));
//# sourceMappingURL=index.js.map
