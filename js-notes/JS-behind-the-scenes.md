# Javascript behind the scenes

From [Jonas Schmedtmann's The Complete JavaScript Course 2020](https://www.udemy.com/course/the-complete-javascript-course/)

## JS is:

#### High level language

Automatically allocates hardware resources (memory, CPU), as opposed to low level languages, where these resources have to be manually managed (C). JS is easier to use, but it will never be as fast as C.

#### Garbage collected

Algorithm in the JS engine that automatically removes old, unused object from the computer memory.

#### Interpreted / just-in-time compiled

Computers only understand machine code. All human-readably code we write has to be compiled/interpreted into machine code at some point.

**Compilation vs interpretation:** compiling is converting the entire code into machine code at once, and then writing it to a portable file. Two separate steps, compilation and execution. The execution can happen after compilation. In interpretation, interpreter runs thorugh the code and executes it line by line. It is read and executed line by line.

Interpreted languages are a lot slower than compiled. As this is unacceptable to modern JS due to the complexity of today's apps, it uses the just-in-time (JIT) compilation, where the entire code is converted into machine code at once, then executed right away. We still have the 'ahead of time' compilation step, but there is no portable file to execute, and execution happends immediately after compilation.

#### Multi-paradigm

Paradigm is an approach/mindset of structuring code, which will direct out coding style.

Popular paradigms are

- procedural programming (organizing the code in the linear way with some fn's in between)
- object-oriented programming (OOP)
- functional programming (FP)

Some languages are only OOP, some only procedural, JS does it all.

#### Prototype-based object-oriented

Almost everything in JS is an object, except for the primitive values.

Objects are created from the object blueprint- prototype, that already contain a bunch of methods. The newly created object inherits all of the methods from the prototype.

#### First class functions

Functions are treated as variables. We can pass functions into functions, and return them from functions.

#### Dynamic

Or, dynamically-typed. We don't assign data types to variables. The type of variable is automatically changed if/when we reassign value.

Most other languages are strongly typed (C, Java, Ruby, Typescript)

#### Single-threaded & Non-blocking event loop

JS runs in a single thread, can only do one thing at a time. To prevent a long-running task blocking the execution, the event loop is used, which takes tasks, executes them in the background and returns them to the main thread.

## JS Engine and runtime

Every browser has its own JS engine, the most known is google's V8, which powers chrome and also node.

JS engine contains a call stack and a heap. Code is executed in the call stack, using execution contexts. The heap is an unstructured memory pool, stores all the objects that our app needs.

Piece of JS code enters the engine -> parsing the code, code is parsed into AST (abstract syntax tree) -> compilation takes generated AST and compiles it into machine code -> machine code gets executed right away

Modern JS engines have cool optimisation strategies- they first create an unoptimized version of machine code, so it can start executing ASAP. Then in the background, the code is being optimised and recompiled during execution. This can happen multiple times, each loop the unoptimized code is swapped with the optimized one, without ever stopping execution.

Parsing, compilation, optimization, happen in special threads, that we can't access from our code, separate from the main thread that is running in the call stack.

### JS runtime in browser

Runtime consists of: JS engine, web API's and Callback queue

Without an engine, there is no runtime. :) But it's not enough. We also need access to the web API's (dom, timers, fetch api...), those are functionalities provided to the engine, accessible on window object, but not part of the JS itself. JS only gets access to those API's thorugh the global window object. But they are still part of the runtime.

Then there is the callback queue. This is a data structure, containing all the callback functions, that are ready to be executed (for example: callback function from the DOM event listener). When the event happens (for example click), the callback function is called. The so called event loop (the one responsible for nonblocking concurrency model) puts it into the callback queue and when the call stack is empty, puts into the call stack, so it can be executed.

JS runtime in node.js, we don't have web API's, but instead we have C++ bindings & the thread pool.

## Execution contexts and the call stack

After compilation, the global execution context for top level code (only the code outside the functions) will be created. Execution context is an environment in which a piece of JS is executed, stores all info for some code to run.

In every JS project, there is **only one global execution context (EC)**

Once the top level code finishes executing, executions of functions and waiting for callbacks begins. A new execution context is created for each funciton, all together they form a call stack.

### Inside the execution context:

1. **Variable environment:** let, const, var declarations, functions, arguments object (arguments passed into the function)
1. **Scope chain:** references to variables that are outside of the current function
1. **this keyword:**

Content of the execution context is generated in the creation phase.

**!in arrow functions!** the execution context does not get the this keyword and artuments object

Callstack, together with the memory heap, makes up the JS engine. Execution contexts get stacked on top of each other in the callstack, to keep track of where we are in the execution.

## Scope and the scope chain

**Scoping** controls how our program's variables are organized an accessed by the JS engine. JS has lexical scoping, which means scoping is controlled by placement of functions and blocks in the code. A function in a function has access to parent's function's vars, but !not! the other way around: a scope never has access to vars of an inner scope.

**Scope** is space or environment in which a certain variable is declared (for functions that is the variable environment). We have global, function and block scope.

**Scope of a variable** is from where in our code a variable can be accessed.

When a variable is not in the current scope, the engine does a variable lookup: looks up in the scope chain until it finds the variable.

### Global scope

- for top level code
- declared outside of functions or blocks
- accessible everywhere

### Function scope

- each function creates a scope
- vars accessible only inside the function
- also called local scope

### Block scope

- ES6 feature
- block is everything in between { } (if block, for loop block,...) object literals are !not! blocks
- let and const vars are blocked scoped, accessible only inside block (var isn't!, it's function scoped as it's 'old' naming)
- functions are also block scoped in strict mode

## Variable environment: hoisting and the TDZ

**Hoisting** makes some types of variables accessible in the code before they are actually declared. In the creating phase of the execution context, the code is scanned for variable declarations, a new property in the variable environment object is created for each variable.

|                                | hoisted | initial value                       | scope                          |
| ------------------------------ | ------- | ----------------------------------- | ------------------------------ |
| function declaration           | yes     | actual value                        | block scoped (in strict mode!) |
| var vars                       | yes     | undefined                           | function                       |
| let and const vars             | no      | <uninitialized>, temporal dead zone | block                          |
| function expression and arrows | /       | depends if using var or let/const   | /                              |

- We can use function declarations before they are actually declared in the code, as they are stored in the variable environment object before code starts executing

**TDZ** is the region of the scope, from the beginning, in which a variable can not be used. It can be used after the line that defines it. TDZ was added to ES6, because it makes it easier to avoid and catch errors. Accessing variables before declaration is bad practice.

**! cool example; TIL !**

```
console.log(fnExpr(2, 3))

var fnExpr = function (a, b) {
    return a + b
}
```

throws error 'fnExpr is not a functions', because fnExpr is a var and therefore set to undefined. Undefined is not a function.

!! var variables create a property on the global window object, let and const do not.

## this keyword

**this** keyword/variable is created for every execution context (every function). It takes the value of the 'owner' of the funciton (points to it). Value of the this keyword is not statis, it depends on how the function is called, and it's only assigned when the function is called. In the global scope, this keyword is the window object.

- For methods, this keyword points to the object that is calling the method.
- For simple function calls, this keyword points to undefined in strict mode, and to global (window) object otherwise, which can be problematic
- For arrow functions do not get their own this keyword, this will point to the this of the surrounding function (lexical this). Because of that, never use an arrow function as a method
- For event listeners, this will point to the DOM element that the handler is attached to

this will never point to the function itself, and also not to its variable environment.

## Primitives vs Objects (primitive vs reference types)

Objects (=reference types) are stored in the memory heap.

Primitives (=primitive types) are stored in the call stack; in the execution context in which they are declared.

`let age = 30`

In the callstack, age identifier points to the memory address, !NOT! the actual value! The value at a certain address is immutable. So when we change the value of the variable, a new piece of memory is allocated, and the variable points to the new address.

The object in the callstack also points to the memory address, with the value of the address of the object in the heap. An object variable has an identifier, that points to the piece of memory in the stack, which in turn points to the piece of memory in the heap, where the objects are actually stored. That is because objects might be too large to be stored in the call stack.

Const variables are immutable only for primitive types, that are stored in the call stack, but not for reference types, as they are stored in the heap. In the callstack, their value will always remain the same, pointing to the object in the heap that mcan be changed.
