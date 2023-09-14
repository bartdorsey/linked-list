export namespace DoublyLinkedList {
  interface Node<T> {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
  }

  interface LinkedList<T> {
    head?: Node<T>;
    tail?: Node<T>;
    length: number;
  }

  // Creates a node object
  export function createNode<T>(
    value: T,
    next?: Node<T>,
    prev?: Node<T>,
  ): Node<T> {
    return {
      value,
      next,
      prev,
    };
  }

  // Creates a list object
  export function createLinkedList<T>(): LinkedList<T> {
    return {
      length: 0,
    };
  }

  export function findNodeAtIndex<T>(
    list: LinkedList<T>,
    index: number,
  ): Node<T> | undefined {
    // Start at head
    let currentNode = list.head;
    // Loop through the list
    for (let currentIndex = 0; currentIndex < index; currentIndex++) {
      // if there's no currentNode, return undefined because
      // we've hit the end of the list
      if (!currentNode?.next) {
        return;
      }
      // Change currentNode to the next node
      currentNode = currentNode.next;
    }
    // If we made it here we return the currentNode
    return currentNode;
  }

  export function getValueAtIndex<T>(
    list: LinkedList<T>,
    index: number,
  ): T | undefined {
    const node = findNodeAtIndex(list, index);
    if (!node) {
      return;
    }
    return node.value;
  }

  export function listToArray<T>(list: LinkedList<T>): T[] {
    const arr: T[] = [];
    let currentNode = list.head;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return arr;
  }

  export function addValueToHead<T>(list: LinkedList<T>, value: T): void {
    // Create a new node
    const newNode = createNode(value);

    if (list.length === 0) {
      list.head = newNode;
      list.tail = newNode;
    } else {
      // Set newNode's next property to the current head
      newNode.next = list.head;
      if (list.head) {
        // set the current head's previous property to the new node
        list.head.prev = newNode;
      }
      // Set the head to the new node
      list.head = newNode;
      // If there's one node, then the tail will be also set
      if (list.length === 1) {
        list.tail = newNode;
      }
    }
    // Increase the size of the list
    list.length++;
  }

  export function addValueToTail<T>(list: LinkedList<T>, value: T): void {
    // Create a new Node
    const newNode = createNode(value);
    // If the list is empty just set the new node to be both
    // the head and the tail
    if (list.length === 0) {
      list.head = newNode;
      list.tail = newNode;
    } else {
      if (list.tail) {
        // Set the current tail's next property to our new node
        list.tail.next = newNode;
      }
      // Set our new node's previous property to the current tail
      newNode.prev = list.tail;
      // set the tail property to the newNode
      list.tail = newNode;
    }
    // Increase the size of the list
    list.length++;
  }

  export function removeFromHead<T>(list: LinkedList<T>): T | undefined {
    // If the list is empty do nothing
    if (list.length === 0) {
      return;
    }
    if (!list.head) {
      return;
    }
    // grab the value from the current head
    const value = list.head.value;
    // If there's only one node
    if (list.length === 1) {
      // delete the head and tail
      delete list.head;
      delete list.tail;
      // Otherwise we need to make next the new head
    } else {
      // Set the head to be the next node
      list.head = list.head.next;
      if (list.head) {
        // delete the head's prev
        delete list.head.prev;
      }
      if (list.length === 2) {
        list.tail = list.head;
      }
    }
    // Decrement the length
    list.length--;
    // Return the value
    return value;
  }

  export function removeFromTail<T>(list: LinkedList<T>): T | undefined {
    // If the list is empty do nothing
    if (list.length === 0) {
      return;
    }
    // If the list's length is 1, we need to remove the head as well
    if (list.length === 1) {
      delete list.head;
    }
    if (!list.tail) {
      return;
    }
    // Grab the value from the list.tail
    const value = list.tail.value;
    // Set the tail to be the node previous to the current tail
    list.tail = list.tail.prev;
    // Decrement the length
    list.length--;
    return value;
  }

  export function insertValueAtIndex<T>(
    list: LinkedList<T>,
    index: number,
    value: T,
  ): void {
    // if the list's length is less than the index, just return undefined
    if (list.length < index) {
      return;
    }
    // If the index is 0,
    // Just use our Head function
    if (index === 0) {
      addValueToHead(list, value);
      return;
    }
    // If the index is the last index,
    // just use our tail function
    if (index === list.length - 1) {
      addValueToTail(list, value);
    }
    const node = findNodeAtIndex(list, index - 1);
    if (!node) {
      return;
    }
    const newNode = createNode(value);
    newNode.next = node.next;
    node.next = newNode;
    list.length++;
    return;
  }
}
