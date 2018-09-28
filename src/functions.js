// Returns whatever value is passed as the argument.
//
// EX: identity(6) --> 6
let identity = (val) => {
  return val;
};

// Return an array of the first n elements of an array. If n is undefined,
// return just the first element.
//
// EX: first([1, 2, 3, 4, 5, 6], 2) --> [1, 2]
// EX: first([10, 34, 68, 19]) --> 10
let first = (array, n) => {
  return !n ? array[0] : array.slice(0,n);
};

// Like first, but for the last elements. If n is undefined, return just the
// last element.
//
// EX: last([1, 2, 3, 4, 5], 2) --> [4, 5]
// EX: last([10, 34, 68, 19]) --> 19
let last = (array, n) => {
  const len = array.length;
  return !n ? array[len-1] : array.slice((len - n), len);
};

// Call iterator(value, key, collection) for each element of collection.
// Accepts both arrays and objects.
//
// each() does not have a return value, but rather simply runs the
// iterator function over each item in the input collection.
let each = (collection, iterator) => {
  // loop for objects
  if(typeof collection == "object" && !Array.isArray(collection)){
    for(var x in collection){
      iterator(x, collection[x], collection);
    }
  }
  // loop for arrays
  if(Array.isArray(collection)){
    for(var x = 0; x < collection.length; x++){
      iterator(x, collection[x], collection)
    }
  }
};
each([1,2,3], (index, value, collection)=> console.log(index, value, collection))

// Returns the index at which value can be found in the array, or -1 if value
// is not present in the array.
// TIP: You can use a standard for loop, or you can reuse the each function from above as a helper function.
//
// EX: indexOf([1, 2, 3], 2) --> 1
// EX: indexOf([10, 20, 30], 5) --> 0
let indexOf = (array, target) => {
  //return !array.includes(target) ? -1 : array.indexOf(target)
  //return array.indexOf(target) == -1 ? -1 : array.indexOf(target)
  for(var x = 0; x < array.length; x++){
    if(array[x] === target){
      return x;
    }
  }
  return -1;
};

// Return all elements of an array that pass a truth test.
//
// filter([1, 2, 3], (val) => {
//    val > 2 // does this need a 'return'?
// }) --> 3

// Filters odd values
let filter = (collection, test) => {
    // loop for objects
  if(typeof collection == "object" && !Array.isArray(collection)){
    let newObj = collection;
    for(var x in newObj){
      if(!test(newObj[x])){newObj[x] = "filter"};
    }
    for(var x in newObj){
      if(newObj[x] == "filter"){
        delete newObj[x];
      }
    }
    return newObj;
  }
  // loop for arrays
  if(Array.isArray(collection)){
    let newArr = [];
    for(var x = 0; x < collection.length; x++){
      if(test(collection[x])){
        newArr.push(collection[x])
        }
    }
    return newArr;
  }
};
filter({"I":1, "really": 2, "like": 4, "JS": 4}, (value)=> value % 2==0)
// Return all elements of an array that don't pass a truth test.
//
// reject([1, 2, 3, 4, 5], () => {
//    val < 3
// }) --> 4, 5

// rejects (ie. returns) odd values
let reject = (collection, test) => {
      // loop for objects
  if(typeof collection == "object" && !Array.isArray(collection)){
    let newObj = collection;
    for(var x in newObj){
      if(test(newObj[x])){newObj[x] = "reject"};
    }
    for(var x in newObj){
      if(newObj[x] == "reject"){
        delete newObj[x];
      }
    }
    return newObj;
  }
  // loop for arrays
  if(Array.isArray(collection)){
    let newArr = [];
    for(var x = 0; x < collection.length; x++){
      if(!test(collection[x])){
        newArr.push(collection[x])
        }
    }
    return newArr;
  }
};
reject([1,2,3,4,5,6,7,8], (value)=> value % 2==0)

// Produce a duplicate-free version of the array.
//
// EX: uniq([1, 1, 2, 2, 3, 4, 5]) --> [1, 2, 3, 4, 5]
let uniq = (array) => {
  //return array.filter((each, i) => array.indexOf(each) >= i);
  let newArr = [];
  for(var x=0;x<array.length;x++){
    if(array.indexOf(array[x]) === array.lastIndexOf(array[x])){
      newArr.push(array[x])
    }
  }
  return newArr;
};


// Return the results of applying an iterator to each element.
// map() works a lot like each(), but in addition to running the operation on all
// the members, it also maintains an array of results.
//
// map({firstName: 'Kayla', lastName: 'Handy', age: 29}, (item) => {
//    return item[key]
// }) --> ['Kayla', 'Handy', 29]
let mapArray = [];
let map = (collection, iterator) => {

if(typeof collection == "object" && !Array.isArray(collection)){
  for(var x in collection){
    iterator(x + " = " + collection[x])
  }
}
if(Array.isArray(collection)){
  for(var x=0;x<collection.length;x++){
    iterator(collection[x]);
  }
}
return mapArray;
};
map({"I":1, "really": 2, "like": 3, "JS": 3}, (value)=> mapArray.push(value))

// Reduces an array or object to a single value by repetitively calling
// iterator(accumulator, item) for each item. accumulator should be
// the return value of the previous iterator call.
//
// You can pass in a starting value for the accumulator as the third argument
// to reduce. If no starting value is passed, the first element is used as
// the accumulator, and is never passed to the iterator. In other words, in
// the case where a starting value is not passed, the iterator is not invoked
// until the second element, with the first element as it's second argument.
//
// EX:
//   var numbers = [1,2,3];
//   var sum = reduce(numbers, function(total, number){
//     return total + number;
//   }, 0); // should be 6
let reduce = (collection, iterator, accumulator) => {
  let final = accumulator;
   // loop for arrays
   if(Array.isArray(collection)){
    for(var x=0;x<collection.length;x++){
      final = iterator(collection[x], final)
    }
   }

   // loop for objects
  if(typeof collection == "object" && !Array.isArray(collection)){
   for(var x in collection){
     final = iterator(collection[x], final)
   }
  }
   return final;
};
reduce([1,2,3,4,5,6,7,8], (a,b)=>a+b, 0)

// Determine if the array or object contains a given value (using `===`).
//
// contains([1, 2, 3, 4], 3) --> true
let contains = (collection, target) => {
  if(typeof collection == "object" && !Array.isArray(collection)){
    for(var x in collection){
      if(collection[x]===target){
        return "Yup, this object contains key: " + x + ", with value: " + collection[x]
      }
    }
  }
  if(Array.isArray(collection)){
    for(var x=0;x<collection.length;x++){
      if(collection[x]===target){
        return "Yup, this array contains: " + collection[x]
      }
    }
  }
  return "Nope, ain't there.";
};


let every = (collection, iterator) => {

  if(typeof collection == "object" && !Array.isArray(collection)){
    for(var x in collection){
      if(!iterator(collection[x])){return false}
    }
  }

  if(Array.isArray(collection)){
    for(var x=0;x<collection.length;x++){
      if(!iterator(collection[x])){return false}
    }
  }

  return true;
};
every({"I":1, "really": 2, "like": 3, "JS": 3}, (value)=> value < 5)

// Determine whether any of the elements pass a truth test.
//
// EX: some([1, 2, 3], (item) => {
//    item < 2    // needs a return
// }) --> true
let some = (collection, iterator) => {
  if(typeof collection == "object" && !Array.isArray(collection)){
    for(var x in collection){
      if(iterator(collection[x])){return true}
    }
  }

  if(Array.isArray(collection)){
    for(var x=0;x<collection.length;x++){
      if(iterator(collection[x])){return true}
    }
  }

  return false;
};
some({"I":1, "really": 2, "like": 300, "JS": 3}, (value)=> value > 100)
