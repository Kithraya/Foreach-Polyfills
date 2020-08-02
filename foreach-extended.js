foreach.version = "1.2.3";
foreach.maxIterations = null;

function foreach(array, callback, dynamiclength, callscope) { 

	if (!array) { return } // Return `undefined` if falsy. It's not necessarily an array, but it does need to be iterable in some form. 
	// At present, `undefined`, `false`, `0`, `null`, `NaN`, and `''` do not make sense being iterable values.
	if (typeof callback !== 'function') { throw new TypeError(callback + ' is not a function!'); }
	
	var i=0,j=0;
	var len = (array === true) ? 1 : array.length || 0; // iterator
	var str, value, scope, x, num;

	if (typeof array === 'number') { dynamiclength = false; len = array; num = true } else
	if (typeof array === 'string') { array = array.split(''); str = true; } // add unicode values
	if (typeof dynamiclength === 'object') {  } // isArrayLike

	scope = (callscope === x) ? array : callscope;
	
	// MDN forEach syntax: arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
	// add another parameter 'iterations'?
	for (; i < (dynamiclength ? array.length : len); i++,j++) {
							
		 value = callback.call(scope, (num ? i : array[i]), i, array, j); // changing `array[i]` to `(num ? i : array[i])` strangely makes iteration ~6x faster for numbers

		 if (value === false) {break} else
		 if (value === true) {continue} else
		 if (typeof value === 'number') {
			 i+= value;
		 } else
		 if (typeof value === 'object') {	
		 } else
		 if (typeof value === 'string') {
			 // return "wait 1000"
		 }

	}
	return (str) ? array.join('') : array;
}
