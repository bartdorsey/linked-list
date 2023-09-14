export var SinglyLinkedList
;(function (SinglyLinkedList) {
    // Creates a node object
    function createNode(value, next) {
        return {
            value,
            next,
        }
    }
    SinglyLinkedList.createNode = createNode
    // Creates a list object
    function createLinkedList() {
        const list = {
            length: 0,
        }
        return list
    }
    SinglyLinkedList.createLinkedList = createLinkedList
    function findNodeAtIndex(list, index) {
        // We start at the head
        let currentNode = list.head
        // Loop through the node, until we get to index
        for (let currentIndex = 0; currentIndex < index; currentIndex++) {
            // if there's no currentNode.next, return null because
            // we've hit the end of the list
            if (!currentNode?.next) {
                return
            }
            // Change currentNode to the next node
            currentNode = currentNode.next
        }
        // If we made it here we return the currentNode
        return currentNode
    }
    SinglyLinkedList.findNodeAtIndex = findNodeAtIndex
    function getValueAtIndex(list, index) {
        const node = findNodeAtIndex(list, index)
        if (node != undefined) {
            return node.value
        } else {
            return
        }
    }
    SinglyLinkedList.getValueAtIndex = getValueAtIndex
    function listToArray(list) {
        const arr = []
        let currentNode = list.head
        while (currentNode) {
            arr.push(currentNode.value)
            currentNode = currentNode.next
        }
        return arr
    }
    SinglyLinkedList.listToArray = listToArray
    function addValueToHead(list, value) {
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
    SinglyLinkedList.addValueToHead = addValueToHead
    function addValueToTail(list, value) {
        const newNode = createNode(value)
        // if the list is empty set the node
        // to be the head
        if (list.length === 0) {
            list.head = newNode
        } else {
            // We have to look for the last node.
            // We can use our find function for this.
            const tail = findNodeAtIndex(list, list.length - 1)
            // If there's no tail, just return undefined
            if (!tail) return
            tail.next = newNode
        }
        list.length++
        return
    }
    SinglyLinkedList.addValueToTail = addValueToTail
    function removeFromHead(list) {
        // If the list is empty do nothing
        if (list.length === 0) {
            return
        }
        if (!list.head) {
            return
        }
        // grab the value from the current head
        const value = list.head.value
        // If there's only one node
        if (list.length === 1) {
            // delete the head
            delete list.head
            // Otherwise we need to make next the new head
        } else {
            // Set the head to be the next node
            list.head = list.head.next
        }
        // Decrement the length
        list.length--
        // Return the value
        return value
    }
    SinglyLinkedList.removeFromHead = removeFromHead
    function removeFromTail(list) {
        // if there's no head, just return undefinded
        if (!list.head) {
            return
        }
        let value = undefined
        // If there's no next node
        // We are removing the only node
        if (!list.head.next) {
            // grab the value from the head
            value = list.head.value
            // and delete the head
            delete list.head
            // Otherwise we need to iterate to find the tail
        } else {
            // We can use our findNodeAtIndex here
            // To look for the next to last node
            const nextToLastNode = findNodeAtIndex(list, list.length - 2)
            if (!nextToLastNode) {
                return
            }
            // Grab the value from the tail
            if (nextToLastNode.next) {
                value = nextToLastNode.next.value
            }
            // Set the next to last node as the new tail
            // by wiping out it's next property
            delete nextToLastNode.next
        }
        list.length--
        return value
    }
    SinglyLinkedList.removeFromTail = removeFromTail
    function insertValueAtIndex(list, index, value) {
        // if the list's length is less than the index, just return undefined
        if (list.length < index) {
            return
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
            return
        }
        const newNode = createNode(value)
        newNode.next = node.next
        node.next = newNode
        list.length++
        return
    }
    SinglyLinkedList.insertValueAtIndex = insertValueAtIndex
})((SinglyLinkedList = SinglyLinkedList || (SinglyLinkedList = {})))
