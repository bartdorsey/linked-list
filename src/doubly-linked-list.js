// Creates a node object
const createNode = (value, next = null, prev = null) => {
  return {
    value,
    next,
    prev,
  }
}

// Creates a list object
const createLinkedList = () => {
  const list = {
    head: null,
    tail: null,
    length: 0,
  }
  return list
}

const findNodeAtIndex = (list, index) => {
  // Start at head
  let currentNode = list.head
  // Loop through the list
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
    list.tail = newNode
  } else {
    // Set newNode's next property to the current head
    newNode.next = list.head
    // set the current head's previous property to the new node
    list.head.prev = newNode
    // Set the head to the new node
    list.head = newNode
    // If there's one node, then the tail will be also set
    if (list.length === 1) {
      list.tail = newNode
    }
  }
  // Increase the size of the list
  list.length++
}

const addValueToTail = (list, value) => {
  // Create a new Node
  const newNode = createNode(value)
  // If the list is empty just set the new node to be both
  // the head and the tail
  if (list.length === 0) {
    list.head = newNode
    list.tail = newNode
  } else {
    // Set the current tail's next property to our new node
    list.tail.next = newNode
    // Set our new node's previous property to the current tail
    newNode.prev = list.tail
    // set the tail property to the newNode
    list.tail = newNode
  }
  // Increase the size of the list
  list.length++
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
    // set head and tail to null
    list.head = null
    list.tail = null
    // Otherwise we need to make next the new head
  } else {
    // Set the head to be the next node
    list.head = list.head.next
    // Set the new head's prev to null
    list.head.prev = null
    if (list.length === 2) {
      list.tail = list.head
    }
  }
  // Decrement the length
  list.length--
  // Return the value
  return value
}

const removeFromTail = (list) => {
  // If the list is empty do nothing
  if (list.length === 0) {
    return null
  }
  // If the list's length is 1, we need to remove the head as well
  if (list.length === 1) {
    list.head = null
  }
  // Grab the value from the list.tail
  const value = list.tail.value
  // Set the tail to be the node previous to the current tail
  list.tail = list.tail.prev
  // Decrement the length
  list.length--
  return value
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
  listToArray,
}
