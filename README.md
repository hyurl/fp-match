# Match-Case

**A pattern matching tool.**

## Example

```javascript
import match from "match-case";

var target = { foo: "Hello", bar: "World" };

match(target)
    .case({ foo: "hello" }, () => {
        console.log("match case 1");
    })
    .case({ foo: "Hello", bar: "world" }, () => {
        console.lo("match case 2");
    })
    .case({ foo: "hello", bar: "World" }, () => {
        console.log("match case 3")
    })
    .case({ foo: "Hello" }, () => { // this case wll be matched instead
        console.log("match case 4");
    })
    .case({ foo: "Hello", bar: "World" }, () => {
        console.log("match case 5");
    });
```

## API

- `match(target: any): MatchContext` Creates a match context.
- `MatchContext.prototype.case(value: any, callback: (value: any) => void): this`
    Tries to test a value and call the corresponding callback function. Many
    cases may be set, but only the first matched one will be called.
    - `value` If the input `target` is a primitive value, will check if the 
        input value strictly equals the target. Also, the value could be
        a function that returns a boolean value indicates whether pass the check.
        If the input `target` is an object value, will check if the input value 
        partially matches the target. However, if a function is passed, other 
        than returning boolean, it can return an object that partially matches 
        the input target as well. In either case. the function accepts an 
        argument, which is the input target.
    - `callback` If check passed, the callback function will be called and 
        the input target will be passed as the argument.
- `MatchContext.prototype.default(callback: (value: any) => void): void`
    If none of the cases is matched, the default callback will be called.
- `MatchContext.prototype.test(value: any): boolean` Tests if the given 
    value matches the input target.

## Matches Any Value

This module exports a special symbol `any` indicates matching any value of the 
input target (except `undefined`).

```javascript
import { match, any } from "match-case";

var target = { foo: "Hello", bar: "World" };

match(target)
    .case({ foo: "Hello", bar: any }, () => {
        // ...
    });
```

For more examples, see [test](./test.js).