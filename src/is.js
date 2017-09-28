import moment from 'moment';
import { toString, slice, hasOwnProperty } from './var.js';

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

var exec = (str) => {
    return (new Function('return ' + str)).call(null);
}
var between = (val, begin, end) => {
    return val > begin && val < end;
}

var checkStringType = (str, checker, defaultResult) => {
    try {
        if (typeof str !== 'string') return checker(str);
        return checker(exec(str));
    } catch (error) {
        return defaultResult || false;
    }
}

export var setRegexp = (name, value) => {
    var oldValue = REG_EXPS[name];
    REG_EXPS[name] = value;
    return oldValue;
}

//type
export var isString = val => typeof val === 'string' || toString.call(val) === '[object String]';

export var isUndefined = val => typeof val === 'undefined';
export var isStringUndefined = val => val === 'undefined';

export var isBoolean = value => value === true || value === false || toString.call(value) === '[object Boolean]';
export var isStringBoolean = (val) => {
    return val === 'true' || val === 'false';
};
export var isUpperCaseBoolean = (val) => {
    return val === 'True' || val === 'False';
};

export var isArray = Array.isArray || (value => toString.call(value) === '[object Array]');
export var isStringArray = val => {
    return isArray(val) || (typeof val === 'string' && val[0] === '[' && val[val.length - 1] === ']' && checkStringType(val, isArray));
};

export var isFunction = val => typeof val === 'function' || toString.call(val) === '[object Function]';

export var isNumber = val => typeof val === 'number' || toString.call(val) === '[object Number]';
export var isStringNumber = val => {
    return isNumber(val) || REG_EXPS.stringNumber.test(val);
}
export var isInt = val => Number.isInteger(val);
export var isStringInt = val => {
    return isInt(val) || REG_EXPS.stringInt.test(val);
}
export var isEven = val => isNumber(val) && val % 2 === 0;
export var isStringEven = val => isStringNumber(val) && parseFloat(val) % 2 === 0;
export var isOdd = val => isNumber(val) && val % 2 !== 0;
export var isStringOdd = val => isStringNumber(val) && parseFloat(val) % 2 !== 0;

export var isObject = val => typeof val === 'object';
export var isStringObject = val => {
    return isObject(val) || (typeof val === 'string' && val[0] === '{' && val[val.length - 1] === '}' && checkStringType(val, isObject));
};

export var isDate = val => val instanceof Date || toString.call(val) === '[object Date]';
export var isStringDate = val => isDate(val) || moment(val).isValid();
export var isTime = val => moment(val, 'HH:mm:SS').isValid() || moment(val, 'HH:mm').isValid();
export var isMonthNumber = val => isInt(val) && between(val, 0, 13);
export var isStringMonthNumber = val => isStringInt(val) && isMonthNumber(val);
export var isDayNumber = val => isInt(val) && between(val, 0, 32);
export var isStringDayNumber = val => isStringInt(val) && isDayNumber(val);

export var isUrl = val => REG_EXPS.url.test(val);
export var isEmail = val => REG_EXPS.email.test(val);
export var isIPv4 = val => REG_EXPS.ipv4.test(val);
export var isIPv6 = val => REG_EXPS.ipv6.test(val);
export var isIP = val => isIPv4(val) || isIPv6(val);
export var isCNMobilePhone = val => REG_EXPS.cnMobilePhone.test(val);
export var isInclude = (str, target) => isString(str) && str.indexOf(target) !== -1;