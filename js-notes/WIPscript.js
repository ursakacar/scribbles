'use strict';

/***** DATA STRUCTURES, MODERN OPERATORS AND STRINGS *****/

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function (starterIndex = 1, mainIndex = 0, time = '20:00', address) { // also setting default values
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`)
  },

  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(`Ordered pasta with ingredients ${ingredient1}, ${ingredient2}, ${ingredient3}`)
  }, 

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(`Ordered pizza with main ingredient ${mainIngredient}, and ${otherIngredients}`)
  }

};

/*******************************/
/* topic: ARRAY DESCTRUCTURING */
/*******************************/

const [main, secondary] = restaurant.categories; // destructure the first two elts from the category array
const [main1, , secondary1] // skip the element

[main, secondary] = [secondary, main] // reassign values : switching variables

const [starter, main] = restaurant.order(2,0)
console.log(starter, mainCourse) // destructured, return garlic bread and pizza

// nested destructuring
const nested = [2, 3, [4, 5]]
const [a, , b] = nested // nested is the array to take from, result is 2, [4, 5]
const [i, , [k, l]] = nested
console.log(i, j, k) // 2, 4, 5 as separate variables

//default values
const [p, q, r] = [8, 9] // undefined, position[2] does not exist
const [pp=1, qq=1, rr=1] = [8, 9] // rr = 1, default value


/********************************/
/* topic: OBJECT DESCTRUCTURING */
/********************************/

// commonly used for destructuring API calls

const {name, openingHours, categories} = restaurant // 3 new variables

const {name: restaurantName, openingHours: hours, categories: tags} = restaurant // rename created variable

// default values
const {menu = [], starterMenu: starters = []} = restaurant // default value [], otherwise menu would be undefined

// mutating variables
let a = 111
let b = 999
const obj = { a:23, b:7, c:14 }

{a, b} = obj // uncaught syntax error, JS expect a codeblock for lines starting with {
({a, b} = obj) // wrap into parenthesis, we overrode initial a and b

// nested objects
const { fri } = openingHours
const { fri: { open: o, close: c } } = openingHours // desctructure and rename the nested object

restaurant.orderDelivery({ // we pass ONE object into the method (not 4 arguments!!!), so we can destructure it in the method
  time: '22:20',
  address: 'some addres 12',
  mainIndex: 2,
  starterIndex: 2,
})


/********************************/
/* topic: SPREAD OPERATOR  ...  */
/********************************/

// Spread operator work on all iterables: strings, arrays, maps, sets.... but NOT OBJECTS

const arr = [3, 4, 5]
const badNewArr = [1, 2, arr[0], arr[1], arr[2]]
const arrNewArr = [1, 2, arr] // = [1, 2, [3, 4, 5]] -> array within an array
const spreadNewArr = [1, 2, ...arr] // adds individual elements from the arr array to the spreadNewArray

console.log(...spreadNewArr) // logs INDIVIDUALLY elements of the array!

const newMenu = [...restaurant.mainMenu, 'Gnocci'] // creates a completely new array with elemets from main menu

// copy array
const mainMenuCopy = [...restaurant.mainMenu] // shallow copy of the array

// join arrays
const menu = [...restaurant.mainMenu, ...restaurant.sterterMenu]

console.log(`${...arr} text`) // will not work, multiple values separated by a comma are expected when we build a new array or pass args into a function, not in cases like this (template literal)

// ecercise
const ingredients = [prompt("input the first ingredient for pasta"), prompt("input the second ingredient for pasta"), prompt("input the third ingredient for pasta")] //array of 3 ingredients

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]) // old way, before we knew about the spread operator
restaurant.orderPasta(...ingredients)

// Objects
const newRestaurant = (...restaurant, founder: 'Guiseppe', foundedIn: 1990)

const restaurantCopy = {...restaurant}
restaurantCopy.name = 'Ristorante Roma'

console.log(restaurantCopy.name) // ristorante roma
console.log(restaurant.name) // classico italiano
// we made a copy of the restaurant


/**************************************/
/* topic: REST PATTERN AND PARAMETERS */
/**************************************/

// the opposite of spread, it packs elements into an array

// SPREAD, right side of =
const arr = [1, 2, 3, ...[4, 5]]

// REST, left side of =
const [a, b, ...others] = [1, 2, 3, 4, 5] // result is two separate vars, a=1, b=2, and an array [3, 4, 5]


const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu] // we get string pizza, string risotto, and the rest of the array (not pasta, which is on second position!)

// Objects
const { sat, ...weekdays} = retaurant.openingHours // weekdays now only contains fri and thu

// in functions
const add = function(...numbers) { // REST ARGUMENTS, take an array of arbitrary length and unpacks it
  let sum = 0
  for (i=0; i<numbers.length; i++) sum +=numbers[i]
}
add(2, 3)
add(3, 5, 1, 5)
add(4, 6, 7, 0, 9, 3) 

const x = [23, 4, 12]
add(...x)

restaurant.orderPizza('mushroom', 'onion', 'olives', 'cheese') // result of rest arguments, mushroom will be stored in the main ingredient, everything else into an array

/**************************************/
/* topic: SHORT CIRCUITING (&& and ||) */
/**************************************/

// logical operators can use and return any data type and do short circuiting = if the first value is a truthy value, the firs value will be returned
console.log( 3 || 'Ursa') // =3
console.log( '' || 'Ursa') // = 'Ursa'
console.log( true || 0) // = true
console.log( undefined || null) // null, undefined is a falsy value

console.log( 0 && 'Ursa') // = 0
console.log( 7 && 'Ursa') // = Ursa

// examples
numGuests = 15 // ce je 0 je problem, ker je 0 falsy value
const guests = restaurant.numGuests || 10

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach')
}

restaurant.orderPizza && restaurant.orderPizza ('mushrooms', 'spinach')

// || returns the first truthy value, or the last value, if all are falsy
// && returns the first falsy value, or the last value if all are truthy

/**************************************/
/* topic: NULLISH COALESCING OPERATOR ??*/
/**************************************/

numGuests = 0
const guests = restaurant.numGuests ?? 10

// ?? works with nullish values: null and undefined (NOT 0 or '')

/**************************************/
/* topic: FOR OF LOOP                 */
/**************************************/

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
for (const item of menu) console.log(item) // logs all the items from the restaurant menu

for (const item of menu.entries()) console.log(item) // returns an array iterator

