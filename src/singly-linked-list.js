// Creates a node object
const createNode = (value, next = null) => {
  return {
    value,
    next
  }
}

// Creates a list object
const createLinkedList = () => {
  const list = {
    head: null,
    length: 0
  }
  return list;
}

const findNodeAtIndex = (list, index) => {
  // We start at the head
  let currentNode = list.head
  // Loop through the node, until we get to index
  for (let currentIndex = 0; currentIndex < index; currentIndex++) {
    // Change currentNode to the next node
    currentNode = currentNode.next
    // if there's no currentNode, return null because
    // we've hit the end of the list
    if (!currentNode) {
      return null
    }
  }
  // If we made it here we return the currentNode
  return currentNode
}

const getValueAtIndex = (list, index) => {
  const node = findNodeAtIndex(list, index)
  return node.value
}


const listToArray = (list) => {
  const arr = []
  let currentNode = list.head
  while (currentNode) {
    arr.push(currentNode.value)
    currentNode = currentNode.next
  }
  return arr
}

const addValueToHead = (list, value) => {
  // Create a new node
  const newNode = createNode(value)

  if (list.length === 0) {
    list.head = newNode
  } else {
    // Set newNode's next property to the current head
    newNode.next = list.head
    // Set the head to the new node
    list.head = newNode
  }
  // Increase the size of the list
  list.length++
}

const addValueToTail = (list, value) => {
  const newNode = createNode(value);
  // if the list is empty set the node
  // to be the head
  if (list.length === 0) {
    list.head = newNode;
  } else {
    // We have to look for the last node.
    // We can use our find function for this.
    const tail = findNodeAtIndex(list, list.length - 1)
    // If there's no tail, just return null
    if (!tail) return null
    tail.next = newNode
  }
  list.length++;
}

const removeFromHead = (list) => {
  // If the list is empty do nothing
  if (list.length === 0) {
    return null
  }
  // grab the value from the current head
  const value = list.head.value
  // If there's only one node
  if (list.length === 1) {
    // set head  to null
    list.head = null
    // Otherwise we need to make next the new head
  } else {
    // Set the head to be the next node
    list.head = list.head.next
    // Set the new head's prev to null
    list.head.prev = null
  }
  // Decrement the length
  list.length--
  // Return the value
  return value
}

const removeFromTail = (list) => {
  // if there's no head, just return null
  if (!list.head) {
    return null;
  }
  let value = null;
  // If there's no next node
  // We are removing the only node
  if (!list.head.next) {
    // grab the value from the head
    value = list.head.value;
    // and set head to null
    list.head = null
    // Otherwise we need to iterate to find the tail
  } else {
    // We can use our findNodeAtIndex here
    // To look for the next to last node
    const nextToLastNode = findNodeAtIndex(list, list.length - 2);
    if (!nextToLastNode) {
      return null
    }
    // Grab the value from the tail
    value = nextToLastNode.next.value;
    // Set the next to last node as the new tail
    // by wiping out it's next property
    nextToLastNode.next = null;
  }
  list.length--;
  return value;
}

const insertValueAtIndex = (list, index, value) => {
  // if the list's length is less than the index, just return null
  if (list.length < index) {
    return null
  }
  // If the index is 0,
  // Just use our Head function
  if (index === 0) {
    addValueToHead(list, value)
    return
  }
  // If the index is the last index,
  // just use our tail function
  if (index === list.length - 1) {
    addValueToTail(list, value)
  }
  const node = findNodeAtIndex(list, index - 1)
  if (!node) {
    return null;
  }
  const newNode = createNode(value)
  newNode.next = node.next
  node.next = newNode
  list.length++
}



module.exports = {
  createNode,
  createLinkedList,
  addValueToHead,
  addValueToTail,
  removeFromHead,
  removeFromTail,
  findNodeAtIndex,
  insertValueAtIndex,
  getValueAtIndex,
  listToArray
}

