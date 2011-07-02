I was so annoyed by lack of overloading in JS, that I decided to fix it.
This library lets you define types of input arguments and function to be called.
It is designed to be quite transparent, once function is properly initialised user can call it in usual way, library will do the rest.

Usage:

    var obj = { // create some object
        fun: function(arg) {
            // function may be empty
        }
    };

    strongJS.addOption(obj, "fun", ["integer"], function(arg) {
        return arg + 2;
    });
    strongJS.addOption(obj, "fun", ["float"], function(arg) {
        return arg +  4.0;
    });
    strongJS.addOption(obj, "fun", ["string"], function(arg) {
        return arg + "_modified";
    });

    console.log(obj.fun(1)); // 3
    console.log(obj.fun(1.5)); // 5.5
    console.log(obj.fun("str")); // "str_modified"

With default function:

    var obj = { // create some object
        fun: function(arg) {
            // function may be empty
        }
    };

    strongJS.addOption(obj, "fun", ["integer"], function(arg) {
        return arg + 2;
    });
    strongJS.addDefault(obj, "fun", function(arg) {
        return arg +  4;
    });

    console.log(obj.fun(1)); // 3
    console.log(obj.fun(1.5)); // 5.5
    console.log(obj.fun("str")); // "str4"

