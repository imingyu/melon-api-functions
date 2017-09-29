// 数据矫正
import { valueOf, types } from './var';
import Is from './is';

var setOptions = (func, ops) => {
    func.options = ops;
}

var moduleDefine = {}

types.filter(t => t != 'Any' && t != 'Enum').forEach(type => {
    moduleDefine[`to${type}`] = (target, options) => {
        var checker = Is[`is${type}`];
        if (Is.isFunction(checker) && checker(target)) {
            return target;
        }
        if (type === 'Undefined' && typeof target === 'undefined') {
            return target;
        }
    }
});
export default moduleDefine;

export var toInt = (target, options) => {

    valueOf.call(target)
}
setOptions(toInt, {
    args: {
        target: {
            type: 'Any',
            label: '需要矫正的对象'
        },
        options: {
            type: 'Object',
            label: '矫正配置'
        }
    },
    result: {
        type: 'Int'
    }
});


var model = {
    name: 'Tom',
    age: '20'
};

var modelDefine = {
    fields: {
        age: {
            type: 'Int',
        }
    }
};
