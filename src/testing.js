class Animal {
  constructor(myArray) {
    this._array = myArray;
  }
  get array() {
    return this._array;
  }
  add(newElement) {
    this._array.push(newElement);
  }
}

const myAnimal = new Animal(['Lion', 'Cat', 'Dog']);
//console.log(myAnimal.array);
console.log(myAnimal.array[2]);
//onsole.log('ABC');
