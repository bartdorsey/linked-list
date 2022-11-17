import { faker } from '@faker-js/faker';
import { DoublyLinkedList } from '../src/doubly-linked-list';
const {
	createNode,
	createLinkedList,
	addValueToTail,
	addValueToHead,
	removeFromHead,
	removeFromTail,
	findNodeAtIndex,
	insertValueAtIndex
} = DoublyLinkedList;

describe("Doubly Linked List", () => {
	describe("createNode", () => {
		it("Should create a node with a value", () => {
			const value = faker.datatype.number()
			const node = createNode(value)
			expect(node.value).toBe(value)
		})

		it("should create a node with a next value", () => {
			const value = faker.datatype.number()
			const nextNode = createNode(value)
			const node = createNode(faker.datatype.number(), nextNode)
			expect(node.next).toBe(nextNode)
		})

		it("should create a node with a default next value of null", () => {
			const value = faker.datatype.number()
			const node = createNode(value)
			expect(node.next).toBeNull()
		})
	})

	describe("createLinkedList", () => {
		it("should create a linked list with a head of null", () => {
			const list = createLinkedList()
			expect(list.head).toBeNull()
		})

		it("should create a linked list with a tail of null", () => {
			const list = createLinkedList()
			expect(list.tail).toBeNull()
		})

		it("should create a linked list with a length of 0", () => {
			const list = createLinkedList()
			expect(list.length).toBe(0)
		})
	})

	describe("addValueToHead", () => {
		it("should set the head to the new value", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			addValueToHead(list, value)
			expect(list.head?.value).toBe(value)
		})

		it("should add the previous head to the new head", () => {
			const list = createLinkedList()
			const value = faker.datatype.number();
			addValueToHead(list, value);
			const value2 = faker.datatype.number()
			addValueToHead(list, value2)
			expect(list.head?.next?.value).toBe(value)
		})

		it("should update the length of the list by 1 when empty", () => {
			const list = createLinkedList()
			const originalLength = list.length
			addValueToHead(list, faker.datatype.number())
			expect(list.length).toEqual(originalLength + 1)
		})

		it("should update the length of the list by 1 when it has nodes", () => {
			const list = createLinkedList()
			addValueToHead(list, faker.datatype.number())
			const originalLength = list.length
			addValueToHead(list, faker.datatype.number())
			expect(list.length).toEqual(originalLength + 1)
		})

		it("should set the tail when the list has one node", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			addValueToHead(list, value);
			expect(list.tail?.value).toEqual(value);
		})
	})

	describe("addValueToTail", () => {
		it("should add the value to the tail when list is empty", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			addValueToTail(list, value)
			expect(list.tail?.value).toBe(value)
		})

		it("should add the value to the head when list is empty", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			addValueToTail(list, value)
			expect(list.head?.value).toBe(value)
		})

		it("should add the node after the head when there's one node", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			const value2 = faker.datatype.number();
			addValueToHead(list, value);
			addValueToTail(list, value2)
			expect(list.head?.next?.value).toEqual(value2)
		})

		it("should add the tail when there are multiple nodes", () => {
			const list = createLinkedList()
			addValueToHead(list, faker.datatype.number())
			addValueToHead(list, faker.datatype.number())
			const value = faker.datatype.number()
			addValueToTail(list, value)
			expect(list.tail?.value).toBe(value)
		})

		it("should update the length of the list by 1 when empty", () => {
			const list = createLinkedList()
			const originalLength = list.length
			addValueToTail(list, faker.datatype.number())
			expect(list.length).toEqual(originalLength + 1)
		})

		it("should update the length of the list by 1 when it has nodes", () => {
			const list = createLinkedList()
			addValueToHead(list, faker.datatype.number())
			const originalLength = list.length
			addValueToTail(list, faker.datatype.number())
			expect(list.length).toEqual(originalLength + 1)
		})
	})

	describe("removeFromHead", () => {
		it("should return the value", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			addValueToHead(list, value);
			const removedValue = removeFromHead(list)
			expect(removedValue).toBe(value)
		})

		it("should remove the only head and make it null", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			addValueToHead(list, value);
			removeFromHead(list)
			expect(list.head).toBeNull()
		})

		it("should remove the head and leave the second node as head", () => {
			const list = createLinkedList()
			const value1 = faker.datatype.number();
			const value2 = faker.datatype.number();

			addValueToTail(list, value1)
			addValueToTail(list, value2)
			removeFromHead(list);
			expect(list.head?.value).toBe(value2);
		})

		it("should reduce the length of the list by one", () => {
			const list = createLinkedList()
			addValueToHead(list, faker.datatype.number())
			const previousLength = list.length
			removeFromHead(list)
			expect(list.length).toEqual(previousLength - 1)
		})

		it("should reduce the length of the list by one when it has more than one node", () => {
			const list = createLinkedList()
			addValueToHead(list, faker.datatype.number())
			addValueToHead(list, faker.datatype.number())
			const previousLength = list.length
			removeFromHead(list)
			expect(list.length).toEqual(previousLength - 1)
		})
	})

	describe("removeFromTail", () => {

		it("should return null when the list is empty", () => {
			const list = createLinkedList();
			const removedValue = removeFromTail(list);
			expect(removedValue).toBeNull();
		});

		it("should return the value when there's one node", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			addValueToTail(list, value);
			const removedValue = removeFromTail(list)
			expect(removedValue).toBe(value)
		})

		it("should return the value when there's multiple nodes", () => {
			const list = createLinkedList();
			const value = faker.datatype.number();
			const value2 = faker.datatype.number();
			addValueToHead(list, value);
			addValueToHead(list, value2);
			const removedValue = removeFromTail(list);
			expect(removedValue).toEqual(value2);
		})

		it("should remove the head when the list has one node", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			addValueToHead(list, value);
			removeFromTail(list)
			expect(list.head).toBeNull()
		})

		it("should remove the tail when the list has one node", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			addValueToHead(list, value)
			removeFromTail(list)
			expect(list.tail).toBeNull()
		})


		it("should remove the tail when the list has multiple nodes", () => {
			const list = createLinkedList()
			addValueToHead(list, faker.datatype.number())
			addValueToHead(list, faker.datatype.number())
			const previousHead = list.head;
			removeFromTail(list)
			expect(list.head).toBe(previousHead);
		})

		it("should reduce the length of the list by one", () => {
			const list = createLinkedList()
			addValueToHead(list, faker.datatype.number())
			const previousLength = list.length
			removeFromTail(list)
			expect(list.length).toEqual(previousLength - 1)
		})

		it("should reduce the length of the list by one when it has more than one node", () => {
			const list = createLinkedList()
			addValueToHead(list, faker.datatype.number())
			addValueToHead(list, faker.datatype.number())
			const previousLength = list.length
			removeFromTail(list)
			expect(list.length).toEqual(previousLength - 1)
		})
	})

	describe('findNodeAtIndex', () => {
		it('should find a node at index 0', () => {
			const list = createLinkedList();
			addValueToTail(list, faker.datatype.number());
			const node = list.head;
			const foundNode = findNodeAtIndex(list, 0);
			expect(foundNode).toBe(node);
		});

		it('should find a node at index 1', () => {
			const list = createLinkedList();
			// Add a few nodes
			addValueToTail(list, faker.datatype.number());
			addValueToTail(list, faker.datatype.number());
			const node = list.head?.next;
			const foundNode = findNodeAtIndex(list, 1);
			expect(foundNode).toBe(node);
		});

		it('should find a node at index 2', () => {
			const list = createLinkedList()
			const value = faker.datatype.number();
			// Add a couple of nodes
			addValueToTail(list, faker.datatype.number())
			addValueToTail(list, faker.datatype.number())
			// Insert the one we want to look for in the middle at index 2
			addValueToTail(list, value);
			addValueToTail(list, faker.datatype.number())
			const node = findNodeAtIndex(list, 2)
			expect(node?.value).toBe(value);
		})
	});

	describe("insertValueAtIndex", () => {
		it("should insert a value at index 0", () => {
			const list = createLinkedList()
			const value = faker.datatype.number();
			// Add a couple of nodes
			addValueToTail(list, faker.datatype.number())
			addValueToTail(list, faker.datatype.number())
			insertValueAtIndex(list, 0, value);
			expect(list.head?.value).toEqual(value);
		})

		it("should insert a value at the last index", () => {
			const list = createLinkedList()
			const value = faker.datatype.number()
			// Add a couple of nodes
			addValueToTail(list, faker.datatype.number())
			addValueToTail(list, faker.datatype.number())
			insertValueAtIndex(list, list.length - 1, value)
			expect(list.tail?.value).toEqual(value)
		})

		it("should insert a value in the middle", () => {
			const list = createLinkedList();
			const value = faker.datatype.number();
			// Add a couple of nodes
			addValueToTail(list, faker.datatype.number());
			addValueToTail(list, faker.datatype.number());
			// Insert at index 1
			insertValueAtIndex(list, 1, value);
			expect(list.head?.next?.value).toEqual(value);
		})
	})
})
