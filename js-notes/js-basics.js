
/***** JS BASICS REFFRESHER *******/
/* a messy collection of JS notes */
/**********************************/

// ternary operator
var x = number >= 100 ? 'more or equal 100' : 'less than 100'

// case
var job = 'designer'
switch (job) {
	case 'teacher' : 
	case 'instructor' : // multiple statements
		console.log('teaches')
		break
	case 'designer' : 
		console.log('designs')
		break
	case 'driver' : 
		console.log('drives')
		break
	default : 'unemployed'
}

/* 
FALSY VALUES (will be evaluated as false in boolean): undefined, null, 0, '', NaN
*/

// type coercion & strict equality
var height = 20
height == '20' ? console.log('yes, == does type coercion')
height === '20' ? console.log('no, === strict equality')

// FUNCTIONS
// function declaration
function whatDoYouDo(job, firstName) {}

// function expression
// return exites the function 
var whatDoYouDo = function(job, firstName) {
	switch(job) {
		case 'teacher' : 
		case 'instructor' : // multiple statements
			return console.log('teaches')
		case 'designer' : 
			return console.log('designs')
		case 'driver' : 
			return console.log('drives')
		default : 'unemployed'
	}
}

whatDoYouDo('teacher', 'John')

// arrow functions, is still a function expression, return is implicit in one liner functions
// arrow functions do not get the this keyword!!
const calcAge = birthYear => 2037 - birthYear
const age = calcAge(1991)

const yearsUntilRetirement = (birthYear, firstName) => {
	const age = 2037 - birthYear
	const retirement = 65 - age
	return `$(firstName) retires in $(retirement) years`
}
console.log(yearsUntilRetirement)(1991, "John")

// ARRAYS (arrays are also objects, they can have methods)
var names = ['John', 'Mark', 'Jane']
var years = new Array(1990, 1989, 1959)

console.log(names)
console.log(names.length)

names[1] = 'Ben' // Mark will be replaced
names[5] = 'Mary' // position 4 will be empty
names[names.length] = 'Ted' // adds at the end

var john = ['John', 'Smith', 1988, 'teacher']
john.push('blue') // method push, adds to the array
john.unshift('Mr') // adds at the beginning of the array
john.pop() // removes elt from the end
john.shift() // removes elt from start
john.indexOf(1988) // which position 1988 appears in the array
john.includes('teacher') // check if the array includes 'teacher', used to write conditionals

// -1 index means not exist
var isDesigner = john.indexOd('designer') === -1 ? 'NOT a desigher' : 'a designer'
console.log(isDesigner)

// OBJECTS
// order does not matter in objects, as in arrays

var obj = {} // {} object literal

var jane = new Object() // new object syntax, just a different way of defining objects
jane.name = 'Jane'
jane.age = 44
jane['lastName'] = 'Smith'

var john = {
	firstName: 'John', // firstName is propery of the john object
	lastName: 'Black',
	age: 32,
	job: 'designer',
	family: ['Jane', 'Mark', 'Emily'],
	isMarried: false
}

console.log(john.firstName) // dot notation
console.log(john['lastName']) // brackets notation, when we have to compute the property name
var x = 'age'
console.log(john[x])

const interestedIn = prompt('What do you want to know about John? Options: firstName, lastName, age, joh, family, isMarried?')
console.log(jonas[interestedIn])

// mutating objects
john.job = 'driver'
john['isMarried'] = true // just two different ways of accessing properties


// we can attach functions to objects, they are called methods
// method is a function that is property of an object

var john = {
	firstName: 'John', // firstName is propery of the john object
	lastName: 'Black',
	birthYear: 1982,
	job: 'designer',
	family: ['Jane' 'Mark', 'Emily'],
    isMarried: false,
    calcAge: function() { // value here is a function expression
        this.age = 2020 - this.birthYear // this mean this john, present, current object
    } 
    // calcAge is not a method of john
}

// accesing the method
console.log(john.calcAge())

// only objects have methods

//store in the objects, because the function has this.age = for setting and adding the age to the object
john.calcAge()

// LOOP
var john = ['John', 'Smith', 1988, 'teacher', false]
for (var i = 0; i < john.length; i++ ){
    console.log(john[i])
}
for (var i = 0; i < john.length; i++ ){
    if (typeof john[i] !== 'string') continue // bo slo dalje ce ni string, recimo za stevilke- izpisal se bojo sami stringi, trenutna iteracija se zakljuci in gremo takoj v naslednjo
    console.log(john[i])
}
for (var i = 0; i < john.length; i++ ){
    if (typeof john[i] !== 'string') break // break exits loop if the condition not met
    console.log(john[i])
}

/*
Function declaration: (hoisted)
function doStuff() {};

Function expression: (not hoisted)
const doStuff = function() {}
*/

mike.calculateAge = john.calculateAge // borrowing  the method from john object
mike.calculateAge() // this is now tied to mike, as it's assigned when an object calls the method

/********** OBJECTS **********
* everything is an object. 
* in JS, we have primitives: numbers, strings, booleans, undefined, null, symbol, bitInt && everything else is an object: arrays, functions, objects, dates, wrappers,...
* primitives are called primitive types, objects are called reference types, because of the way they are stored in the memory
* constructor for an object is a blueprint for creating instances
* inheritance: on object is based on another one, it gets access to another object's properties and methods
* js is prototype based language, each js object has a prototype property, inheritance is made possible thorugh that property
* the prototype property of an object is where we put methods and properties that we want other objects to inherit
* bigger constructor: Object object. Each object that we create, is an instance of an Object constructor, that has a lot of methods in the prototype property
* when the property is called, search starts in the object itself, if can not be found, moves on to the objects' prototype, this continues until the method is found (protptype chain)
*/

// object literal for creating objects
var john = {
	name: 'John',
	yearOfBirth: 1990,
	job: 'teacher'
}

// function constructor, with capital letter
var Person = function(name, yearOfBirth, job) {
	// we attach these vars to the .this variable of the function's execution's context
	this.name = name
	this.yearOfBirth = yearOfBirth
	this.job = job
	this.calcAge = function() {
		console.log(2020 - this.yearOfBirth)
	}
}

// objects created from Person constructor can now use this function, have access to it, because it its in their prototype
// method is not in the constructor, but we can use it, because it's in the prototype property of our function constructor
Person.prototype.calculateAge = 
function() {
	console.log(2020 - this.yearOfBirth)

// we can use this constructor to create john object
var john = new Person('John', 1990, 'teacher') // create new object using the construction function, instantiation
john.calcAge();
john.calculateAge();

/* new operator creates a new empty object, then construction object (Person), is called with specified arguments
* calling a function creates a new execution context, that has a this variable
* in regular function call, this points to global object
* new operator makes it so that the this var of the fja points to the empty object that was created in the beginning by the new operator
* so new operator makes it that the this points to the new empty object, instead of the global object
* empty object we have defined it has empty properties we defined
*/

var jane = new Person ('Jane', 1988, 'designer')
var mark = new Person ('Mark', 1970, 'retired')

// we can also attach properties to constructor, but it's not common
Person.prototype.lastName = 'Smith' // all persons now have last name of Smith, it's not directly in the OBJECT! we have access to it because it's in the prototype property of the function construction

console.log(john.lastName)
console.log(jane.lastName)

/*********** DEV TOOLS ******************
* write the object name
* ___proto___ is the prototype of the Object, for john that is calculateAge and lastName
* 1 level lower, we have prototype of the Object constructor
* write Object.prototype
*/

john.__proto__ === Person.prototype // true
john.hasOwnPropert('job') // true, he has property called job
john.hasOwnPropert('lastName') // false, it's not his own property, it is inherited
john instanceof Person // operator, true

/* array object has array function construction, built in in JS, it has for example methods pop, push, etc, that's why we can just use them */
var x = [2, 4, 6]
x // prints [2,4,6]
console.info(x) // now we can look at the array as an object

/************ OBJECT.CREATE ******************
* we first create an object that will act as a prototype and then create an object from the prototype
* created objects inherits from the object we passed in as an argument

difference between Object.create and the function construction pattern: 
* Object.create builds an object that inherits directly from the one we passed into the first argument
* function construction (more popular), the newly created object inherits from the constructors prototype property
*/

var personProto = {
	calaAge: function() {
		console.log(2020-this.yearOfBirth)
	}
}

// one way of creating objects
var john = Object.create(personProto)
john.name = 'John'
john.yearOfBirth = 1990
john.job = 'teacher'

// better way of creating objects
var jane = Object.create(personProto, 
	{
		name: {value: 'jane'},
		yearOfBirth: {value: 1989},
		job: {value: 'designer'}
	})

/********** PRIMITIVES AND OBJECTS ******************
* primitives: strings, numbers, booleans, null, undefined

* variables holding primitives actually hold that data in themselves
* vars associated with objects contain a reference to the place in memory where that object is stored, it does not have a copy of the object
*/


// PRIMITIVES
var a = 12
var b = a
a = 54

console.log(a) // 23
console.log(b) // 54, a and b actually hold the values


// OBJECTS
var obj1 = {
	name: 'John'
	age: '26'
}
var obj2 = obj1
obj1.age = 30

console.log(obj1.age) // 30
console.log(obj2.age) // 30, obj2 only points to obj1, we did not create a new object but only a new reference

// FUNCTIONS
var age = 54
var obj = {
	name: 'Jonas',
	city: 'Lisbon'
}

// when we pass a primitive into a function, a new copy is created
function change(a, b) {
	a = 30
	b.city = 'Ljubljana'
}

change(age, obj)

console.log(age) // 30, outside of the function is still 30
console.log(obj.city) // Ljubljana

/****** FUNCTIONS = OBJECTS ******************
* function is an instance of the Object type
* we can store fjs in variable, or pass them as args to another function, or return a fj from a fj
* == first class functions
*/

var years = [1990, 1087, 1987, 1789, 1879]

function arrayCalc(arr, fn){
	var arrResult = []
	for (var i = 0; i < years.length; i++){
		arrResult.push(fn(arr[i])
		)
	}
	return arrResults
}

// callback functions: function that we pass into functions and are called later
function calcAge(el) {
	return 2020 - el
}

function isFullAge(el){
	return el >=18
}

function maxHeartRate(el) {
	if (el >= 18 && el <= 81) {
		return Math.round(206.9 - (0.67 * el))
	} else {
		return -1
	}
}

var ages = arrayCalc(years, calcAge) // finally call the function calcAge() -> calling the function immediately, without () is callback
var isFullAges = arrayCalc(ages, isFullAge)
var rates = arrayCalc(ages, maxHeartRate)

console.log(ages)
console.log(isFullAges)
console.log(rates)
}
// FUNCTIONS RETURNING FUNCTIONS
// it returns a function, that we can use later. it actually returns an object. possible because fns are first class functions
functions interviewQuestion(job) {
	if (job === 'designer') {
		return function(name) { // anon function
			console.log(name + ' , can you please explan what your UX design it?')
		}
 	}
	else if (job === 'teacher') {
		return function(name) { // anon function
			console.log(name + ' , what subject do you teach?')
		}
 	} else {
		 return function(name) {
			 console.log('What do you do ' + name)
		 }
	 }
	}
	 
	var teacherQuestion = interviewQuestion('teacher') // teacherQuestion var will be the function that is returned from the interviewQuestion when we pass 'teacher', like when we store a fn expression into a variable
	var designerQuesion = interviewQuestion('designer')
	
	teacherQuestion('John')
	designerQuestion('John')

	interviewQuestion('teacher')('Mark') // interwiev Q gets called, returns a fn, and then that fn gets called with 'Mark' param

	// IIFFE immediately invoked function expressions, can only call it once
	// we do it to create a new scope that has vars not visible to the outside, data privacy
	function game() {
		var score = Math.random() * 10
		console.log(score >= 5)
	}
	game()

	(function () { // wrap in () to trick the parser into treating it as an expression, not as declaration
		var score = Math.random() * 10
		console.log(score >= 5)
	})()

	(function (goodLuck) { // with parameters
		var score = Math.random() * 10
		console.log(score >= 5 - goodLuck)
	})(5)

	/* CLOSURE
	* an inner fn has always acces to the vars and params of its outer fn, even after the outer fn has returned
	*/

	function retirement(retirementAge) {
		var a = ' years left until retirement'
		return function(yearOfBirth) { // closure: this is able to use retirement fn and var a even after the outer fn has returned
			var age = 2016 - yearOfBirth
			console.log((retirementAge - age) + a)
		}
	}

	var retirementUS = retirement(66)
	retirementUS(1990)

	retirement(66)(1990)

	var retirementGermany = retirement(65)
	retirementGermany(1990)

	// rewrite interview Q to use closures
	function interviewQuestion(job) { // we will return only one function
		return function(name) {
			if (job === 'designer') { 
				console.log(name + ' , can you please explan what your UX design it?')
			}
			else if (job === 'teacher') {
				console.log(name + ' , what subject do you teach?')
			 } else {
				console.log('What do you do ' + name)
		
			 }
		}
	}
	interviewQuestion('teacher')('John')

// BIND, CALL, APPLY
var john = {
	name: 'John',
	age: 26,
	job: 'teacher',
	presentation: function(style, timeOfDay) {
		if (style === 'formal') {
			console.log('Good ' + timeOfDay + ' , ladies and gents! I\'m ' + this.name + ' , I am a  ' + this.job + 'and I am ' + this.age)
		}else if (style === 'friendly') {
			console.log('Hey, what\'s ip! I\'m ' + this.name + ' , I am a  ' + this.job + 'and I am ' + this.age + ' Have a nice ' + timeOfDay)}}}

var emma = {
	name: 'Emma',
	age: 36,
	job: 'designer',} // we can use the call method to use presentation function with emma

john.presentation('formal', 'morning')
john.presentation.call(emily, 'friendly', 'afternoon') // call enables us to set the this variable to emily, as in the first args// apply method, similar, but it accepts args as array
john.presentation.apply(emily, ['friendly', 'afternoon']) //this won't work because john object does not accept arrays, just as an example

// bind is similar to call method, allows us to set this var explicitly. bind doesnt immediately call the function, generates a copy of the fn, so we can store it somewhere. we can use it for creating fn with preset args

// bind method returns a function, we have to store it in varvar johnFriendly = john.presentation.bind(john, 'friendly') // friendly is the first args of the presentation function

johnFriendly('morning') // friendly is already set, now we just need one more args
// currying when we create a function based on some other function, but with some preset params
var emilyFormal = john.presentation.bind(emily, 'formal')
emilyFormal('afternoon')

//created a function when we used a callback function to determine if someone is of full age
var years = [1990, 1989, 1987, 1978]
function arrayCalc(arr, fn) {
	var arrRes = []
	for (var i = 0; i < arr.length; i++) {
		arrRes.push(fn(arr[i]))
	}
	return arrRes}

function calculateAge(el) {
	return 2016-el 
}

function isFullAge(limit, el) {
	return el >= limit 
}

var ages = arrayCalc(years,calculateAge)
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20))

console.log(ages)
console.log(fullJapan)
