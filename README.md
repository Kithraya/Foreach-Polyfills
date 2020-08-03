# foreach
Helper function `foreach` with extended functionality.

### Syntax: 
```javascript
foreach( MULTI array or iterable value, FUNCTION callback(value [, index, [, self [, iterations]]]){} , BOOLEAN use_dynamic_length, MULTI modify_this_scope);

as in: foreach(array, callback([value [, index [, self [, iterations]]]]), [dynamiclength], [thisArg]);
```

```javascript
// example

foreach(['X','Y','Z'], function(value, index, self, iterations) { 
   console.log(value, index, self, iterations, this);
});

// 'X', 0, ['X','Y','Z'], 0, ['X','Y','Z']
// 'Y', 1, ['X','Y','Z'], 1, ['X','Y','Z']
// 'Z', 2, ['X','Y','Z'], 2, ['x','Y','Z']


// assuming there are only 2 'div's on the page:
foreach ( document.querySelectorAll('div'), function(value,index,self,count) {
   console.log(value, index, self, count, this);
});

// <div></div>, 0, NodeList(2), 0, NodeList(2)
// <div></div>, 1, NodeList(2), 1, NodeList(2)
```
Note that all the callback parameters are optional.
```javascript
foreach([1,2,3], function() {
   console.log(this); // [1,2,3], [1,2,3], [1,2,3]
});

```
Sometimes you want to iterate over an array while conditionally modifying the array itself. By default, the array length is stored on initialization, but you can set `dynamiclength` to `true` to continually check the array length. But be careful, you can create infinite loops if you do not return `false`, or if `foreach.maxIterations` is not set.

```javascript
// example with stored length. This is the default functionality.
var k = foreach([1,2,3], function(v,i) {
   this.push( String(i) );
});
console.log(k); // [1,2,3,"0","1","2"]

// example with dynamic length

var k = foreach([1,2,3], function(v,i) {
   this.push( String(i) );
   if (i > 4) { return false } // [1,2,3,'0','1','2','3','4','5']
}, true);
```

##### foreach() also loops through numbers and strings:

```javascript

foreach ( 40 , function(value, index, self, count) { console.log(value,index,self,count,this); });

// 0, 0, 40, 0, 40
// 1, 1, 40, 1, 40
// 2, 2, 40, 2, 40
// ...
// 38, 38, 40, 38, 40
// 39, 39, 40, 39, 40

```
For numbers, `value` is always the same as `index`. 

You can instantly break out of any `foreach` loop at any time by returning `false` within your callback function.

```javascript
foreach ( 40 , function ( v, i, s, count ) {
  if (i === 20) { return false }
  console.log(v,i,s,count); 
});

// 0, 0, 40, 0
// 1, 1, 40, 1
// ...
// 18, 18, 40, 18
// 19, 19, 40, 19
```

 You can return other values besides `false`. Returning `true` or the string `'continue'` is equivalent to calling the `continue` statement.
 
 ```javascript
 
 foreach (7, function(v,i,s,count) { 
     if (i === 2) { return true } 
     if (i === 5) { return }
     console.log(v,i,s,count);
  });
 
 // 0, 0, 7, 0
 // 1, 1, 7, 1
 // 3, 3, 7, 2
 // 4, 4, 7, 3
 // 6, 6, 7, 5
 ```
Note that `count` is not updated whenever you return `'continue'` or `true`, as `foreach` will assume that you skipped over executing your function. If you simply return without specifying a value, `count` is updated as well.
