'use strict';

/**************************************/
/* topic: ENHANCED OBJECT LITERAL     */
/**************************************/

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    // we can now compute property names, not only values
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0,
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // es6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    // istead of  order: function (starterIndex, mainIndex) {}
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery(starterIndex = 1, mainIndex = 0, time = '20:00', address) {
    // also setting default values
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ingredient1, ingredient2, ingredient3) {
    console.log(
      `Ordered pasta with ingredients ${ingredient1}, ${ingredient2}, ${ingredient3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(
      `Ordered pizza with main ingredient ${mainIngredient}, and ${otherIngredients}`
    );
  },
};

/**************************************/
/* topic: OPTIONAL CHAINING           */
/**************************************/

console.log(restaurant.openingHours.mon.open); // do opening hours exist? do they exist for monday? do they exist for open property?
// error is returned, as restaurant.openingHours.mon is undefined, and undefined.open cannot be read

// optional chaining to the rescue
console.log(restaurant.openingHours?.mon?.open); //undefined

// example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed'; // bracket notation if we want to use a variable name as the property name, if not ?? closed, then we will get undefined values for when it's not opened
  console.log(`On day ${day}, we open at ${open}`);
}

// methods
console.log(restaurant.order?.(0,1) ?? 'Method does not exist' // logs foaccia and pasta
console.log(restaurant.orderRisotto?.(0,1) ?? 'Method does not exist' // logs method does not exist

// arrays
const users = [{ name: 'Ursa', email: 'hello@ursa.com'}]
console.log(users[0]?.name ?? 'User array empty')

/**************************************/
/* topic: LOOPING OBJECTS             */
/**************************************/

// property names
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// propery values
const values = Object.values(restaurant.openingHours)

// entire object
const entries = Object.entries(restaurant.openingHours)

for(const [key, {open, close}] of entries) { // destructuring objects, value is in itself an object, so we have to destructure
    console.log(`On ${key} we open at ${open} and close at ${close}`)
}