export namespace DoublyLinkedListOOP {
    interface Node<T> {
        value: T
        next?: Node<T>
        prev?: Node<T>
    }

    interface LinkedListInterface<T> {
        head?: Node<T>
        tail?: Node<T>
        length: number
    }

    export class LinkedList<T> implements LinkedListInterface<T> {
        head?: Node<T>
        tail?: Node<T>
        length: number = 0

        findNodeAtIndex(index: number): Node<T> | undefined {
            // Start at head
            let currentNode = this.head
            // Loop through the list
            for (let currentIndex = 0; currentIndex < index; currentIndex++) {
                // if there's no currentNode, return undefined because
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

        getValueAtIndex(index: number): T | undefined {
            const node = this.findNodeAtIndex(index)
            if (!node) {
                return
            }
            return node.value
        }

        toArray(): T[] {
            const arr: T[] = []
            let currentNode = this.head
            while (currentNode) {
                arr.push(currentNode.value)
                currentNode = currentNode.next
            }
            return arr
        }

        addValueToHead(value: T): void {
            // Create a new node
            const newNode: Node<T> = {
                value,
            }

            if (this.length === 0) {
                this.head = newNode
                this.tail = newNode
            } else {
                // Set newNode's next property to the current head
                newNode.next = this.head
                if (this.head) {
                    // set the current head's previous property to the new node
                    this.head.prev = newNode
                }
                // Set the head to the new node
                this.head = newNode
                // If there's one node, then the tail will be also set
                if (this.length === 1) {
                    this.tail = newNode
                }
            }
            // Increase the size of the list
            this.length++
        }
        addValueToTail(value: T): void {
            // Create a new Node
            const newNode: Node<T> = {
                value,
            }
            // If the list is empty just set the new node to be both
            // the head and the tail
            if (this.length === 0) {
                this.head = newNode
                this.tail = newNode
            } else {
                if (this.tail) {
                    // Set the current tail's next property to our new node
                    this.tail.next = newNode
                }
                // Set our new node's previous property to the current tail
                newNode.prev = this.tail
                // set the tail property to the newNode
                this.tail = newNode
            }
            // Increase the size of the list
            this.length++
        }

        removeFromHead(): T | undefined {
            // If the list is empty do nothing
            if (this.length === 0) {
                return
            }
            if (!this.head) {
                return
            }
            // grab the value from the current head
            const value = this.head.value
            // If there's only one node
            if (this.length === 1) {
                // delete the head and tail
                delete this.head
                delete this.tail
                // Otherwise we need to make next the new head
            } else {
                // Set the head to be the next node
                this.head = this.head.next
                if (this.head) {
                    // delete the head's prev
                    delete this.head.prev
                }
                if (this.length === 2) {
                    this.tail = this.head
                }
            }
            // Decrement the length
            this.length--
            // Return the value
            return value
        }

        removeFromTail(): T | undefined {
            // If the list is empty do nothing
            if (this.length === 0) {
                return
            }
            // If the list's length is 1, we need to remove the head as well
            if (this.length === 1) {
                delete this.head
            }
            if (!this.tail) {
                return
            }
            // Grab the value from the this.tail
            const value = this.tail.value
            // Set the tail to be the node previous to the current tail
            this.tail = this.tail.prev
            // Decrement the length
            this.length--
            return value
        }

        insertValueAtIndex(index: number, value: T): void {
            // if the list's length is less than the index, just return undefined
            if (this.length < index) {
                return
            }
            // If the index is 0,
            // Just use our Head function
            if (index === 0) {
                this.addValueToHead(value)
                return
            }
            // If the index is the last index,
            // just use our tail function
            if (index === this.length - 1) {
                this.addValueToTail(value)
            }
            const node = this.findNodeAtIndex(index - 1)
            if (!node) {
                return
            }
            const newNode: Node<T> = {
                value,
            }
            newNode.next = node.next
            node.next = newNode
            this.length++
            return
        }
    }
}
