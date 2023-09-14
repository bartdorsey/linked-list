import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'
import { DoublyLinkedListOOP } from '../src/doubly-linked-list-oop.js'
const { LinkedList } = DoublyLinkedListOOP

describe('Doubly Linked List', () => {
    describe('createLinkedList', () => {
        it('should create a linked list with a head of null', () => {
            const list = new LinkedList()
            expect(list.head).toBeUndefined()
        })

        it('should create a linked list with a tail of null', () => {
            const list = new LinkedList()
            expect(list.tail).toBeUndefined()
        })

        it('should create a linked list with a length of 0', () => {
            const list = new LinkedList()
            expect(list.length).toBe(0)
        })
    })

    describe('addValueToHead', () => {
        it('should set the head to the new value', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToHead(value)
            expect(list.head?.value).toBe(value)
        })

        it('should add the previous head to the new head', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToHead(value)
            const value2 = faker.datatype.number()
            list.addValueToHead(value2)
            expect(list.head?.next?.value).toBe(value)
        })

        it('should update the length of the list by 1 when empty', () => {
            const list = new LinkedList()
            const originalLength = list.length
            list.addValueToHead(faker.datatype.number())
            expect(list.length).toEqual(originalLength + 1)
        })

        it('should update the length of the list by 1 when it has nodes', () => {
            const list = new LinkedList()
            list.addValueToHead(faker.datatype.number())
            const originalLength = list.length
            list.addValueToHead(faker.datatype.number())
            expect(list.length).toEqual(originalLength + 1)
        })

        it('should set the tail when the list has one node', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToHead(value)
            expect(list.tail?.value).toEqual(value)
        })
    })

    describe('addValueToTail', () => {
        it('should add the value to the tail when list is empty', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToTail(value)
            expect(list.tail?.value).toBe(value)
        })

        it('should add the value to the head when list is empty', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToTail(value)
            expect(list.head?.value).toBe(value)
        })

        it("should add the node after the head when there's one node", () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            const value2 = faker.datatype.number()
            list.addValueToHead(value)
            list.addValueToTail(value2)
            expect(list.head?.next?.value).toEqual(value2)
        })

        it('should add the tail when there are multiple nodes', () => {
            const list = new LinkedList()
            list.addValueToHead(faker.datatype.number())
            list.addValueToHead(faker.datatype.number())
            const value = faker.datatype.number()
            list.addValueToTail(value)
            expect(list.tail?.value).toBe(value)
        })

        it('should update the length of the list by 1 when empty', () => {
            const list = new LinkedList()
            const originalLength = list.length
            list.addValueToTail(faker.datatype.number())
            expect(list.length).toEqual(originalLength + 1)
        })

        it('should update the length of the list by 1 when it has nodes', () => {
            const list = new LinkedList()
            list.addValueToHead(faker.datatype.number())
            const originalLength = list.length
            list.addValueToTail(faker.datatype.number())
            expect(list.length).toEqual(originalLength + 1)
        })
    })

    describe('removeFromHead', () => {
        it('should return the value', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToHead(value)
            const removedValue = list.removeFromHead()
            expect(removedValue).toBe(value)
        })

        it('should remove the only head and make it null', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToHead(value)
            list.removeFromHead()
            expect(list.head).toBeUndefined()
        })

        it('should remove the head and leave the second node as head', () => {
            const list = new LinkedList()
            const value1 = faker.datatype.number()
            const value2 = faker.datatype.number()

            list.addValueToTail(value1)
            list.addValueToTail(value2)
            list.removeFromHead()
            expect(list.head?.value).toBe(value2)
        })

        it('should reduce the length of the list by one', () => {
            const list = new LinkedList()
            list.addValueToHead(faker.datatype.number())
            const previousLength = list.length
            list.removeFromHead()
            expect(list.length).toEqual(previousLength - 1)
        })

        it('should reduce the length of the list by one when it has more than one node', () => {
            const list = new LinkedList()
            list.addValueToHead(faker.datatype.number())
            list.addValueToHead(faker.datatype.number())
            const previousLength = list.length
            list.removeFromHead()
            expect(list.length).toEqual(previousLength - 1)
        })
    })

    describe('removeFromTail', () => {
        it('should return null when the list is empty', () => {
            const list = new LinkedList()
            const removedValue = list.removeFromTail()
            expect(removedValue).toBeUndefined()
        })

        it("should return the value when there's one node", () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToTail(value)
            const removedValue = list.removeFromTail()
            expect(removedValue).toBe(value)
        })

        it("should return the value when there's multiple nodes", () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            const value2 = faker.datatype.number()
            list.addValueToHead(value)
            list.addValueToHead(value2)
            const removedValue = list.removeFromTail()
            expect(removedValue).toEqual(value2)
        })

        it('should remove the head when the list has one node', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToHead(value)
            list.removeFromTail()
            expect(list.head).toBeUndefined()
        })

        it('should remove the tail when the list has one node', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            list.addValueToHead(value)
            list.removeFromTail()
            expect(list.tail).toBeUndefined()
        })

        it('should remove the tail when the list has multiple nodes', () => {
            const list = new LinkedList()
            list.addValueToHead(faker.datatype.number())
            list.addValueToHead(faker.datatype.number())
            const previousHead = list.head
            list.removeFromTail()
            expect(list.head).toBe(previousHead)
        })

        it('should reduce the length of the list by one', () => {
            const list = new LinkedList()
            list.addValueToHead(faker.datatype.number())
            const previousLength = list.length
            list.removeFromTail()
            expect(list.length).toEqual(previousLength - 1)
        })

        it('should reduce the length of the list by one when it has more than one node', () => {
            const list = new LinkedList()
            list.addValueToHead(faker.datatype.number())
            list.addValueToHead(faker.datatype.number())
            const previousLength = list.length
            list.removeFromTail()
            expect(list.length).toEqual(previousLength - 1)
        })
    })

    describe('findNodeAtIndex', () => {
        it('should find a node at index 0', () => {
            const list = new LinkedList()
            list.addValueToTail(faker.datatype.number())
            const node = list.head
            const foundNode = list.findNodeAtIndex(0)
            expect(foundNode).toBe(node)
        })

        it('should find a node at index 1', () => {
            const list = new LinkedList()
            // Add a few nodes
            list.addValueToTail(faker.datatype.number())
            list.addValueToTail(faker.datatype.number())
            const node = list.head?.next
            const foundNode = list.findNodeAtIndex(1)
            expect(foundNode).toBe(node)
        })

        it('should find a node at index 2', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            // Add a couple of nodes
            list.addValueToTail(faker.datatype.number())
            list.addValueToTail(faker.datatype.number())
            // Insert the one we want to look for in the middle at index 2
            list.addValueToTail(value)
            list.addValueToTail(faker.datatype.number())
            const node = list.findNodeAtIndex(2)
            expect(node?.value).toBe(value)
        })
    })

    describe('insertValueAtIndex', () => {
        it('should insert a value at index 0', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            // Add a couple of nodes
            list.addValueToTail(faker.datatype.number())
            list.addValueToTail(faker.datatype.number())
            list.insertValueAtIndex(0, value)
            expect(list.head?.value).toEqual(value)
        })

        it('should insert a value at the last index', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            // Add a couple of nodes
            list.addValueToTail(faker.datatype.number())
            list.addValueToTail(faker.datatype.number())
            list.insertValueAtIndex(list.length - 1, value)
            expect(list.tail?.value).toEqual(value)
        })

        it('should insert a value in the middle', () => {
            const list = new LinkedList()
            const value = faker.datatype.number()
            // Add a couple of nodes
            list.addValueToTail(faker.datatype.number())
            list.addValueToTail(faker.datatype.number())
            // Insert at index 1
            list.insertValueAtIndex(1, value)
            expect(list.head?.next?.value).toEqual(value)
        })
    })
})
