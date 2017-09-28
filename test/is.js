var MelonApiFunctions = require('../dist/index.js');
var Is = MelonApiFunctions.Is;

var assert = require('chai').assert;
describe('module: Is', () => {
    describe('category: Type', () => {
        describe('isArray', () => {
            it('[] is valid', () => {
                assert.isTrue(Is.isArray(new Array()));
                assert.isTrue(Is.isArray([]));
                assert.isFalse(Is.isArray({ length: 2 }));
                assert.isFalse(Is.isArray({}));
                assert.isFalse(Is.isArray(() => { }));
                assert.isFalse(Is.isArray(2));
                assert.isFalse(Is.isArray(''));
                assert.isFalse(Is.isArray(null));
            });
            it('"[]" is valid', () => {
                assert.isTrue(Is.isStringArray('[]'));
                assert.isTrue(Is.isStringArray('[2,1]'));
                assert.isTrue(Is.isStringArray('["1","sd"]'));
                assert.isFalse(Is.isStringArray('new Array()'));

                assert.isFalse(Is.isStringArray({ length: 2 }));
                assert.isFalse(Is.isStringArray({}));
                assert.isFalse(Is.isStringArray(() => { }));
                assert.isFalse(Is.isStringArray(2));
                assert.isFalse(Is.isStringArray(''));
                assert.isFalse(Is.isStringArray(null));
            })
        })

        describe('isBoolean', () => {
            it('true|false is valid', () => {
                assert.isTrue(Is.isBoolean(true));
                assert.isTrue(Is.isBoolean(false));
                assert.isTrue(Is.isBoolean(!!2));
                assert.isFalse(Is.isBoolean({ length: 2 }));
                assert.isFalse(Is.isBoolean({}));
                assert.isFalse(Is.isBoolean(() => { }));
                assert.isFalse(Is.isBoolean(2));
                assert.isFalse(Is.isBoolean(''));

                assert.isTrue(Is.isStringBoolean('true'));
                assert.isTrue(Is.isStringBoolean('false'));
                assert.isFalse(Is.isStringBoolean('!!2'));
            });
            it('"True|False" is valid', () => {
                assert.isTrue(Is.isUpperCaseBoolean('True'));
                assert.isTrue(Is.isUpperCaseBoolean('False'));
                assert.isFalse(Is.isUpperCaseBoolean('!!22'));
                assert.isFalse(Is.isUpperCaseBoolean({ length: 2 }));
                assert.isFalse(Is.isUpperCaseBoolean({}));
                assert.isFalse(Is.isUpperCaseBoolean(() => { }));
                assert.isFalse(Is.isUpperCaseBoolean(2));
                assert.isFalse(Is.isUpperCaseBoolean(''));
            })
        })
    })
});