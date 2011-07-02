module("strongJS");

test("1. functions available", function(){
	equals(typeof strongJS.addOption, "function", "staticJS.addOption is a function");

});

test("2. init", function(){

    var testString = "str";
    var testInteger = 1;
    var testFloat = 1.5;

    var obj = {
        fun: function(arg) {
            return arg + 1;
        }
    };

    var tmpF = obj.fun;

    var funInteger = function(arg) {
        return arg + 2;
    };

    var funFloat = function(arg) {
        return arg +  4;
    };

    var funString = function(arg) {
        return arg + "_modified";
    };

    strongJS.addOption(obj, "fun", ["integer"], funInteger);
    strongJS.addOption(obj, "fun", ["float"], funFloat);
    strongJS.addOption(obj, "fun", ["string"], funString);
    notEqual(obj.fun, tmpF, "test function has not changed");

    testInteger = obj.fun(testInteger);
    equal(testInteger, 3, "test integer function returned 3");

    testString = obj.fun(testString);
    equal(testString, "str_modified", "test string function returned str_modified");

    testFloat = obj.fun(testFloat);
    equal(testFloat, 5.5, "test float function returned 5.5");

});

test("3. proper scope", function(){

    var testInteger;

    window.test3fun = function(arg) {
        return arg + 1;
    };

    fun2 = function(arg) {
        return arg + 2;
    };

    var obj = {
        fun: function(arg) {
            return arg + 3;
        }
    };

    var funInteger = function(arg) {
        return arg + 5;
    };

    var funInteger2 = function(arg) {
        return arg + 6;
    };

    var funInteger3 = function(arg) {
        return arg + 7;
    };

    strongJS.addOption(null, "test3fun", ["integer"], funInteger);
    strongJS.addOption(null, "fun2", ["integer"], funInteger2);
    strongJS.addOption(obj, "fun", ["integer"], funInteger3);

    testInteger = test3fun(1);
    equal(testInteger, 6, "window scope: test integer function returned 6");

    testInteger = fun2(1);
    equal(testInteger, 7, "caller scope: test integer function returned 7");

    testInteger = obj.fun(1);
    equal(testInteger, 8, "obj scope: test integer function returned 8");

});

test("4. default function", function(){

    var testString = "str";
    var testInteger = 1;
    var testFloat = 1.5;

    var obj = {
        fun: function(arg) {}
    };

    var funInteger = function(arg) {
        return arg + 2;
    };

    var funFloat = function(arg) {
        return arg +  4;
    };

    strongJS.addOption(obj, "fun", ["integer"], funInteger);
    strongJS.addDefault(obj, "fun", funFloat);

    testInteger = obj.fun(testInteger);
    equal(testInteger, 3, "test integer function returned 3");

    testString = obj.fun(testString);
    equal(testString, "str4", "test default function returned str4");

    testFloat = obj.fun(testFloat);
    equal(testFloat, 5.5, "test default function returned 5.5");

});
