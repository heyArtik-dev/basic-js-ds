const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null; // The front of the queue
    this.tail = null; // The end of the queue
  }

  // Adds an element to the end of the queue
  enqueue(value) {
    const newNode = new ListNode(value); // Create a new node with the given value

    if (!this.head) {
      // If the queue is empty, set both head and tail to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // If the queue is not empty, append the new node to the end and update the tail
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // Removes and returns the front element of the queue
  dequeue() {
    if (!this.head) {
      return undefined; // If the queue is empty, return undefined
    }

    const dequeuedValue = this.head.value; // Get the value of the front node
    this.head = this.head.next; // Move the head pointer to the next node

    if (!this.head) {
      // If the queue is now empty, set tail to null
      this.tail = null;
    }

    return dequeuedValue; // Return the value of the dequeued node
  }

  // Returns the underlying linked list representation of the queue
  getUnderlyingList() {
    return this.head; // Return the head of the linked list
  }
}

module.exports = {
  Queue
};
