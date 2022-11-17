export namespace SinglyLinkedList {
	interface Node<T> {
		value: T,
		next: Optional<Node<T>>
	}

	interface LinkedList<T> {
		head: Optional<Node<T>>
		length: number
	}

	// Creates a node object
	export function createNode<T>(value: T, next: Optional<Node<T>> = null): Node<T> {
		return {
			value,
			next
		}
	}

	// Creates a list object
	export function createLinkedList<T>(): LinkedList<T> {
		const list: LinkedList<T> = {
			head: null,
			length: 0
		}
		return list;
	}

	export function findNodeAtIndex<T>(list: LinkedList<T>, index: number): Optional<Node<T>> {
		// We start at the head
		let currentNode = list.head
		// Loop through the node, until we get to index
		for (let currentIndex = 0; currentIndex < index; currentIndex++) {
			// if there's no currentNode.next, return null because
			// we've hit the end of the list
			if (!currentNode?.next) {
				return null
			}
			// Change currentNode to the next node
			currentNode = currentNode.next
		}
		// If we made it here we return the currentNode
		return currentNode
	}

	export function getValueAtIndex<T>(list: LinkedList<T>, index: number): Optional<T> {
		const node = findNodeAtIndex(list, index)
		if (node != null) {
			return node?.value
		}
		else {
			return null
		}
	}


	export function listToArray<T>(list: LinkedList<T>): T[] {
		const arr: T[] = []
		let currentNode = list.head
		while (currentNode) {
			arr.push(currentNode.value)
			currentNode = currentNode.next
		}
		return arr
	}

	export function addValueToHead<T>(list: LinkedList<T>, value: T): void {
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

	export function addValueToTail<T>(list: LinkedList<T>, value: T): null {
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
		return null
	}

	export function removeFromHead<T>(list: LinkedList<T>): Optional<T> {
		// If the list is empty do nothing
		if (list.length === 0) {
			return null
		}
		if (!list.head) {
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
		}
		// Decrement the length
		list.length--
		// Return the value
		return value
	}

	export function removeFromTail<T>(list: LinkedList<T>): Optional<T> {
		// if there's no head, just return null
		if (!list.head) {
			return null;
		}
		let value: Optional<T> = null;
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
			if (nextToLastNode.next) {
				value = nextToLastNode.next.value;
			}
			// Set the next to last node as the new tail
			// by wiping out it's next property
			nextToLastNode.next = null;
		}
		list.length--;
		return value;
	}

	export function insertValueAtIndex<T>(list: LinkedList<T>, index: number, value: T): null {
		// if the list's length is less than the index, just return null
		if (list.length < index) {
			return null
		}
		// If the index is 0,
		// Just use our Head function
		if (index === 0) {
			addValueToHead(list, value)
			return null
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
		return null
	}
}
