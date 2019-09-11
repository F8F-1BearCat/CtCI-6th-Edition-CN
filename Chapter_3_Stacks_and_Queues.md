# Chapter 3 I 栈和队列

如果您熟悉数据结构的细节，那么有关堆栈和队列的问题将更容易处理。不过，这些问题可能相当棘手。有些问题可能仅仅是对原始数据结构的轻微修改，但是其他问题则将面临更复杂的挑战。

### 实现一个栈

堆栈数据结构正如它听起来的样子：一堆数据。在某些类型的问题中，将数据存储在堆栈中可能比存储在数组中更好。

堆栈使用 LIFO（后进先出）的顺序。也就是说，就像在一堆餐盘中一样，添加到堆栈中的最新项是要删除的第一个项。
它使用以下操作：

- pop () : Remove the top item from the stack.
- push (item) : Add an item to the top of the stack.
- peek () : Return the top of the stack.
- isEmpty () : Return true if and only if the stack is empty.

与数组不同，堆栈不提供对第 i 项的固定时间（constant-time）访问。但是，它允许固定时间的添加和删除，因为它不需要移动元素。

我们提供了实现堆栈的简单示例代码。注意，如果数据项是从同一侧添加和删除的，也可以使用链表实现堆栈。

```java
1 	public class MyStack<T> {
2 		private static class StackNode<T> {
3 			private T data;
4 			private StackNode<T> next;
5
6 			public StackNode(T data) {
7 				this.data = data;
8 			}
9 		}
10
11 		private StackNode<T> top;
12
13 		public T pop() {
14 			if (top == null) throw new EmptystackException();
15 			T item = top.data;
16 			top = top.next;
17 			return item;
18 		}
19
20 		public void push(T item) {
21 			StackNode<T> t = new StackNode<T>(item);
22 			t.next = top;
23 			top= t;
24 		}
25
26 		public T peek() {
27 			if (top == null) throw new EmptyStackException();
28 			return top.data;
29 		}
30
31 		public boolean isEmpty() {
32 			return top == null;
33 		}
34 	}
```

经常有用到堆栈一种情况是在某些递归算法中。有时候，你需要在递归时将临时数据 push 到堆栈中，然后在回溯（backtrack）时删除它们（例如，因为递归检查失败）。堆栈提供了一种直观的方法来实现。

堆栈还可以用于迭代地实现递归算法。（这是一个很好的练习！采用简单的递归算法并迭代实现。）

### 实现一个队列

A queue implements FIFO (first-in first-out) ordering. As in a line or queue at a ticket stand, items are removed from the data structure in the same order that they are added.
It uses the operations:

队列使用 FIFO（先进先出）的顺序。就像在售票亭排队一样，数据项将按照添加它们的顺序从数据结构中删除。

它使用以下操作：

- add (item) : Add an item to the end of the list.
- remove () : Remove the first item in the list.
- peek () : Return the top of the queue.
- isEmpty () : Return true if and only if the queue is empty.

队列也可以用链表实现。事实上，它们本质上是一样的，它们本质上是一样的。

```java
1 	public class MyQueue<T> {
2 		private static class QueueNode<T> {
3 			private T data;
4 			private QueueNode<T> next;
5
6 			public QueueNode(T data) {
7 				this.data = data;
8 			}
9 		}
10
11 		private QueueNode<T> first;
12 		private QueueNode<T> last;
13
14 		public void add(T item) {
15 			QueueNode<T> t = new QueueNode<T>(item);
16 			if (last != null) {
17 				last.next= t;
18 			}
19 			last = t;
20 			if (first== null) {
21 				first= last;
22 			}
23 		}
24
25 		public T remove() {
26 			if (first== null) throw new NoSuchElementException();
27 			T data= first.data;
28 			first= first.next;
29 			if (first == null) {
30 				last = null;
31 			}
32 			return data;
33 		}
34
35 		public T peek() {
36 			if (first== null) throw new NoSuchElementException();
37 			return first.data;
38 		}
39
40 		public boolean isEmpty() {
41 			return first== null;
42 		}
43 	}
```

更新队列中的第一个和最后一个节点尤其容易出错。一定要仔细检查一下。

经常使用队列的地方是广度优先搜索（breadth-first search）或实现一个缓存（cache）。

例如，在广度优先搜索中，我们使用队列来存储我们需要处理的节点列表。每次处理节点时，都将其相邻节点添加到队列的后面。这允许我们按照查看顺序处理节点。

------

### Interview Questions

------



