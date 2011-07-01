module("strongJS");

test("1. functions available", function(){
	equals(typeof strongJS.addOption, "function", "staticJS.addOption is a function");

});

test("1. init", function(){

    var testString = "str";
    var testInteger = 1;
    var testFloat = 1.5;

    // window on purpose
    fun = function(arg) {
        return arg + 1;
    };

    var tmpF = fun;

    var funInteger = function(arg) {
        return arg + 2;
    };

    var funFloat = function(arg) {
        return arg +  4;
    };

    var funString = function(arg) {
        return arg + "_modified";
    };

    strongJS.addOption(window, "fun", ["integer"], funInteger);
    strongJS.addOption(window, "fun", ["float"], funFloat);
    strongJS.addOption(window, "fun", ["string"], funString);
    notEqual(fun, tmpF, "test function has not changed");

    testInteger = fun(testInteger);
    equal(testInteger, 3, "test integer function returned 3");

    testString = fun(testString);
    equal(testString, "str_modified", "test string function returned str_modified");

    testFloat = fun(testFloat);
    equal(testFloat, 5.5, "test float function returned 5.5");

});
