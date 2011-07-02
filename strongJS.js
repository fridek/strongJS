/**
 * strongJS.js - library for strong typed variables and morph functions in JS
 *
 * @author fridek
 * @date 01.07.11
 * @version $
 */

var strongJS = {};

(function(strongJS) {
    var id = 0;
    var uniqueId = function (obj) {
        if ( typeof obj.__uniqueid == "undefined" ) {
            obj.__uniqueid = ++id;
        }
        return obj.__uniqueid;
    };

    /**
     * order DOES matter!
     */
    var tests = {
        integer: function (v) {
            return !isNaN(v) && (parseInt(v)==v);
        },
        float: function(v) {
            return !isNaN(parseFloat(v)) && isFinite(v);
        },
        string: function(v) {
            return typeof(v) == 'string';
        }
    };

    var functions = {};

    var getType = function (v) {
        for(var i in tests) {
            if(tests[i](v)) return i;
        }
        return "unknownType";
    };

    var getArgumentTypes = function(args) {
        var result = [];

        for(var i = 0; i<args.length; i++) {
            result[i] = getType(args[i]);
        }
        return result;
    };

    var getFunction = function(objectID, baseFunction, args) {
        var types = getArgumentTypes(args),
            count,i,
            arr = functions[objectID][baseFunction];
        for(i = 0; i < arr.length; i++) {
            count = 0;
            for(var j = 0; j < types.length; j++)
            {
                if(arr[i].types[j] == types[j]) count++;
            }
            if(count == types.length) return arr[i].fun;
        }

        for(i = 0; i < arr.length; i++) {
            if(arr[i].types[0] == 'default') return arr[i].fun;
        }

        return false;
    };


    var addOptionObj = function(obj, baseFunction, types, optionFunction) {

        if(obj === null || obj === undefined) {
            if(window[baseFunction]) obj = window;
            else obj = addOptionObj.caller;
        }  // change to overloading
        if(!(obj instanceof Object)) {throw TypeError("invalid obj type"); }  // change to overloading
        
        if(obj[baseFunction] === undefined) {throw TypeError("invalid function scope - method not accessible"); }

        var objectID = uniqueId(obj);

        if(!functions[objectID]) functions[objectID] = {};
        if(!functions[objectID][baseFunction]) functions[objectID][baseFunction] = [];

        functions[objectID][baseFunction].push({
            types: types,
            fun: optionFunction,
            original: obj[baseFunction]
        });

        obj[baseFunction] = function () {
            var selected = getFunction(objectID, baseFunction, arguments);
            if(selected === false) {throw TypeError("no match for arguments and default function not specified"); }
            return selected.apply(obj, arguments);
        };
    };

    strongJS.addOption = addOptionObj; // change to overloading for null object

    strongJS.addDefault = function(obj, baseFunction, optionFunction) {
        addOptionObj(obj, baseFunction, ['default'], optionFunction);
    }

}(strongJS));