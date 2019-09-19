# XII. 代码库

在实现本书的代码时出现了某些模式。我们通常试图包含解决方案的完整代码，但在某些情况下它会非常冗余。

本附录提供了几个最有用的代码块的代码。

本书的所有代码都可以从 *CrackingTheCodinglnterview.com* 下载。

### HashMapList<T, E> 

HashMapList 类本质上是 HashMap <T, Arraylist \<E>> 的简写。它允许我们从类型为 T 的项映射到类型为 E 的 Arraylist。

例如，我们可能需要一个从整数映射到字符串列表的数据结构。通常，我们会这样写：

```java
1 	HashMap<Integer, Arraylist<String>> maplist =
2 		new HashMap<Integer, Arraylist<String>>();
3 	for (String s : strings) {
4 		int key = computeValue(s);
5 		if (!maplist.containsKey(key)) {
6 			maplist.put(key, new Arraylist<String>());
7 		}
8 		maplist.get(key).add(s);
9 	}
```

现在，我们可以这样写：

```java
1 	HashMaplist<Integer, String> maplist new HashMapList<Integer, String>();
2 	for (String s : strings) {
3 		int key = computeValue(s);
4 		maplist.put(key, s);
5 	}
```

这不是一个很大的变化，但是它使我们的代码更简单了。

```java
1 	public class HashMapList<T, E> {
2 		private HashMap<T, Arraylist<E>> map= new HashMap<T, Arraylist<E>>();
3
4 		/* Insert item into list at key. */
5 		public void put(T key, E item) {
6 			if (!map.containsKey(key)) {
7 				map.put(key, new Arraylist<E>());
8			}
9 			map.get(key).add(item);
10		}
11
12		/* Insert list of items at key. */
13		public void put(T key, Arraylist<E> items) {
14			map.put(key, items);
15		}
16
17	    /* Get list of items at key. */
18		public Arraylist<E> get(T key) {
19			return map.get(key);
20		}
21
22  	/* Check if hashmaplist contains key. */
23		public boolean containsKey(T key) {
24			return map.containsKey(key);
25		}
26
27		/* Check if list at key contains value. */
28		public boolean containsKeyValue(T key, E value) {
29			Arraylist<E> list = get(key);
30			if (list == null) return false;
31			return list.contains(value);
32		}
33
34		/* Get the list of keys. */
35		public Set<T> keySet() {
36			return map.keySet();
37		}
38
39		@Override
40		public String toString() {
41			return map.toString();
42		}
43	}
```

### TreeNode (Binary Search Tree)

虽然在可能的情况下使用内置的二叉树类非常好，甚至很好，但并不总是可行的。在许多问题中，我们需要访问节点或树类的内部（或需要调整这些内部），因此无法使用内置库。

TreeNode 类支持各种各样的功能，但我们并不一定希望每个问题/解决方案都使用这些功能。例如，TreeNode 类跟踪节点的父节点，尽管我们通常不使用它（或特别禁止使用它）。

为了简单起见，我们将此树实现为存储整型数据。

```java
1 	public class TreeNode {
2 		public int data;
3 		public TreeNode left, right, parent;
4 		private int size = 0;
5
6 		public TreeNode(int d) {
7 			data d;
8 			size = 1;
9		}
10
11		public void insertinOrder(int d) {
12			if (d <= data) {
13				if (left == null) {
14				setLeftChild(new TreeNode(d));
15				} else {
16					left.insertinOrder(d);
17				}
18 			} else {
19				if (right == null) {
20					setRightChild(new TreeNode(d));
21				} else {
22					right.insertlnOrder(d);
23				}
24			}
25			size++;
26 		}
27
28		public int size() {
29			return size;
30 		}
31
32		public TreeNode find(int d) {
33			if (d == data) {
34				return this;
35			} else if (d <= data) {
36				return left != null? left.find(d) : null;
37			} else if (d > data) {
38				return right != null? right.find(d) : null;
39			}
40			return null;
41		}
42
43		public void setLeftChild(TreeNode left) {
44			this.left = left;
45			if (left != null) {
46				left.parent = this;
47			}
48		}
49
50		public void setRightChild(TreeNode right) {
51			this.right = right;
52			if (right != null) {
53				right.parent = this;
54			}
55		}
56
57	}
```

该树被实现为二叉搜索树。但是，你可以将它用于其他目的。你只需要使用 `setLeftChild` / `setRightChild` 方法，或者左右子变量。

因此，我们将这些方法和变量保持为 `public`。我们需要这种方式来解决许多问题。

### LinkedListNode (Linked List)

与 TreeNode 类一样，我们经常需要以内置链表类不支持的方式访问链表的内部。出于这个原因，我们实现了自己的类并将其用于许多问题。

```java
1 	public class LinkedListNode {
2 		public LinkedListNode next, prev, last;
3 		public int data; 
4 		public LinkedlistNode(int d, LinkedlistNode n, LinkedListNode p){
5			data = d;
6			setNext(n);
7			setPrevious(p);
8		}
9
10		public LinkedListNode(int d) {
11			data = d;
12		}
13
14		public LinkedListNode() {}
15
16		public void setNext(LinkedListNode n) {
17			next = n;
18			if (this == last) {
19				last = n;
20			}
21			if (n != null && n.prev != this) {
22				n.setPrevious(this);
23			}
24		}
25
26		public void setPrevious(LinkedListNode p) {
27			prev = p;
28			if (p != null && p.next != this) {
29				p.setNext(this);
30			}
31		}
32
33		public LinkedListNode clone() {
34			LinkedListNode next2 = null;
35			if (next != null) {
36				next2 = next.clone();
37			}
38			LinkedlistNode head2 = new LinkedListNode(data, next2, null);
39			return head2;
40		}
41	}
```

同样，我们将方法和变量保持为 `public`，因为我们经常需要这种访问。这将允许用户“销毁”链表，然而我们实际上需要这种功能来实现我们的目的。

### Trie & TrieNode

在一些问题中使用了 trie 数据结构，以便更容易地在字典（或有效单词列表）中查找单词是否是任何其他单词的前缀。当我们递归地构造单词时，经常使用这种方法，这样当单词无效时，我们就可以短路。

```java
1 	public class Trie {
2 		// The root of this trie.
3 		private TrieNode root;
4
5 		/* Takes a list of strings as an argument, and constructs a trie that stores
6 		 * these strings. */
7 		public Trie(Arraylist<String> list) {
8 			root = new TrieNode();
9 			for (String word : list) {
10 				root.addWord(word);
11			}
12		}
13
14
15 		/* Takes a list of strings as an argument, and constructs a trie that stores
16 		 * these strings. */
17 		public Trie(String[] list) {
18 			root = new TrieNode();
19 			for (String word : list) {
20 				root.addWord(word);
21			}
22		}
23
24 		/* Checks whether this trie contains a string with the prefix passed in as
25 		 * argument. */
26 		public boolean contains(String prefix, boolean exact) {
27 			TrieNode lastNode = root;
28 			int i= 0;
29 			for (i = 0; i < prefix.length(); i++) {
30 				lastNode = lastNode.getChild(prefix.charAt(i));
31 				if (lastNode == null) {
32 					return false;
33				}
34			}
35 			return !exact || lastNode.terminates();
36		}
37
38 		public boolean contains(String prefix) {
39 			return contains(prefix, false);
40		}
41
42		public TrieNode getRoot() {
43 			return root;
44		}
45 	}
```

Trie 类的实现使用了 TrieNode 类，其实现如下。

```java
1 	public class TrieNode {
2 		/* The children of this node in the trie.*/
3 		private HashMap<Character, TrieNode> children;
4 		private boolean terminates = false;
5
6 		/* The character stored in this node as data.*/
7 		private char character;
8
9 		/* Constructs an empty trie node and initializes the list of its children to an
10 		 * empty hash map. Used only to construct the root node of the trie. */
11		public TrieNode() {
12			children= new HashMap<Character, TrieNode>();
13		}
14
15		/* Constructs a trie node and stores this character as the node's value.
16		 * Initializes the list of child nodes of this node to an empty hash map. */
17		public TrieNode(char character) {
18			this();
19			this.character = character;
20		}
21
22		/* Returns the character data stored in this node. */
23		public char getChar() {
24			return character;
25		}
26
27		/* Add this word to the trie, and recursively create the child
28		 * nodes. */
29		public void addWord(String word) {
30			if (word== null || word.isEmpty()) {
31				return;
32			}
33
34			char firstChar word.charAt(0);
35
36			TrieNode child getChild(firstChar);
37			if (child== null) {
38				child= new TrieNode(firstChar);
39				children.put(firstChar, child);
40			}
41
42			if (word.length() > 1) {
43				child.addWord(word.substring(l));
44			} else {
45				child.setTerminates(true);
46			}
47		}
48
49		/* Find a child node of this node that has the char argument as its data. Return
50		 * null if no such child node is present in the trie. */
51		public TrieNode getChild(char c) {
52			return children.get(c);
53		}
54
55		/* Returns whether this node represents the end of a complete word. */
56		public boolean terminates() {
57			return terminates;
58		}
59
60		/* Set whether this node is the end of a complete word.*/
61		public void setTerminates(boolean t) {
62			terminates= t;
63		}
64	}
```

