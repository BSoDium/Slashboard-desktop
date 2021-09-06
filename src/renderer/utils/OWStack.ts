class OWStack<T> {
  stack: Array<T>;

  startIndex: number;

  length: number;

  /**
   * Creates a new "one way" stack.
   * @param length Fixed length of the stack.
   * @param init Function used to initialize the values of the stack.
   */
  constructor(length: number, init: (index: number) => T) {
    this.stack = new Array<T>(length);
    // initialize stack values
    for (let i = 0; i < length; i += 1) {
      this.stack[i] = init(i);
    }
    this.length = length;
    this.startIndex = 0;

    // bind methods
    this.push = this.push.bind(this);
  }

  /**
   * Appends a new element at the end of the stack, therefore deleting the last one.
   * @param value New element which should be added.
   */
  push(value: T) {
    this.stack.push(value);
    this.startIndex += 1;

    // if more than half of the stack is unused, we can clear its lower end
    if (this.startIndex > this.length) {
      this.stack = this.stack.slice(this.startIndex, this.stack.length);
      this.startIndex = 0;
    }
  }

  toArray(): Array<T> {
    return this.stack.slice(this.startIndex, this.stack.length);
  }
}

export default OWStack;
