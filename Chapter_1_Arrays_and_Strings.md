# Chapter 1 | 数组和字符串

希望本书的所有读者都熟悉数组和字符串，这样我们将不会再用这些细节来烦你。相反，我们将专注于这些数据结构的一些更常见的技术和问题。

请注意，数组问题和字符串问题通常是可以互换的。也就是说，本书使用数组陈述的一个问题可以作为字符串问题来询问，反之亦然。

### Hash Tables

Hash table是一种通过键值映射以实现高效查找的数据结构。有很多方法可以实现这一点。在这里，我们将介绍一种简单但常见的实现。

在这个简单的实现中，我们使用一个链表数组和一个 hash code 方法。要插入 key（可以是字符串，也可以是其他任何数据类型）和 value，我们需要执行以下操作：

1. 首先，计算 key 的hash code，它通常是 int 或 long 类型的。注意，两个不同的 key 可能具有相同的 hash code，因为能存在无限数量的 key，而 int 类型的个数却是有限的。
2. 然后，将 hash code 映射到数组中的一个 index。这可以通过 `hash（key） % array_length` 之类的东西来完成。当然，两个不同的 hash code 可以映射到同一个 index。
3. 在这个 index 处，有一个 key 和 value 的链表。将 key 和 value 存储在此 index 处。我们必须使用链表，是因为存在以下的冲突：我们可能遇到两个不同的 key 共用相同 hash code，或者两个不同的 hash code 映射到同一个 index。

若要按其 key 来检索对应的 value，你需要重复这个过程。计算 key 的 hash code，再根据 hash code 计算 index。然后，使用这个 key 在链表中搜索 value。

如果冲突的数量非常高，最坏的情况运行时间是 O(N)，其中 N 是 key 的数量。但是，我们通常假设一个好的实现可以将冲突保持在最小，在这种情况下查找时间为 O(1)。

<div align=center><img src="img/ch1_1.png"/></div>

或者，我们可以使用平衡二叉搜索树来实现 hash table。这种方法的查找时间为 O(log N) 。这样做的好处是可能占用更少的空间，因为我们不再分配大型数组。我们还可以按顺序遍历 key，这有时很有用。

### ArrayList & 可扩容数组

在某些语言中，数组（在本例中通常称为list）是可自动调整大小的。数组或 list 将随着添加数据项而增长。在其他语言中，如 Java，数组是固定长度的。需要创建数组时就定义其大小。

当你需要一个可以动态调整大小的数组类型数据结构时，通常可以选择 Arraylist。Arraylist 是一个根据需要调整自身大小的数组，同时仍然提供 O(1) 访问。一个典型的实现是，当数组已满时，数组的大小会加倍。每次加倍需要 O(n) 时间，但是这种情况很少发生，所以它的平摊插入时间（amortized insertion runtime）仍然是 O(1)。

```java
1 	Arraylist<String> merge(String[] words, String[] more) {
2 		Arraylist<String> sentence = new Arraylist<String>();
3 		for (String w : words) sentence.add(w);
4 		for (String w : more) sentence.add(w);
5 		return sentence;
6 	}
```

这是面试中必不可少的数据结构。确保你能够适应将要使用的任何语言中的动态调整大小的数组 / list。注意，数据结构的名称以及“调整因子（resizing factor）”（Java中为2）在不同语言中可能会有所不同。

*为什么平摊插入运行时间是 O(1)?*

假设你有一个大小为 N 的数组。我们可以倒推计算出每次扩容时需要复制的元素数量。可以看到，当我们将数组增加到 K 个元素时，该数组之前的大小就是这个数字的一半。因此，我们需要复制 K/2 个元素。

```markdown
最后一次扩容： n/2 elements to copy
前一次扩容  : n/4 elements to copy
前一次扩容  : n/8 elements to copy
前一次扩容  : n/16 elements to copy
...
第二次扩容  ： 2 elements to copy
第一次扩容  ： 1 element to copy
```

因此，插入N个元素的复制总数大致为 N/2 + N/4 + N/8 + ... + 2 + 1，刚好小于 N。

> 如果这个数列的总和对你来说不是很直观，那么想象一下：假设您要走一公里的路去商店。你步行 0.5 公里，然后 0.25 公里，然后 0.125 公里，以此类推。你永远不会超过一公里（尽管你会非常接近它）。

因此，插入N个元素总共的时间复杂度是 O(N)。这样平均每次插入是 O(1)，即便在最坏的情况下某些插入需要 O(N) 时间。

### StringBuilder

假设你正在拼接一个字符串列表，如下所示。这段代码的运行时间是多少？为简单起见，假设所有字符串都是相同的长度（即长为 x），且字符串的个数为 n。

```java
1 	String joinWords(String[] words) {
2 		String sentence = "";
3 		for (String w : words) {
4 			sentence = sentence + w;
5		}
6 		return sentence;
7 	}
```

在每次拼接时，都会创建一个新的字符串副本，并逐个字符地复制这两个字符串。第一次迭代需要复制 x 个字符。第二次迭代需要复制 2x 个字符。第三次迭代需要 3x，以此类推。因此总时间是 O(x + 2x + … + nx)。可以简化成 O(xn^2)。

> 为什么是 O(xn^2)？因为 1 + 2 + ... + n 等于 n(n+1)/2，或写为 O(n^2)。

StringBuilder 可以帮你避免这个问题。StringBuilde r只是创建一个包含所有字符串的可调整大小的数组，只有在必要时才将它们复制回字符串。

```java
1 	String joinWords(String[] words) {
2 		StringBuilder sentence = new StringBuilder();
3 		for (String w : words) {
4 			sentence.append(w);
5		}
6 		return sentence.toString();
7 	}
```

学习字符串、数组和通用数据结构的一个很好的练习是实现自己版本的 StringBuilder、HashTable 和 ArrayList。

**附加阅读**：Hash Table Collision Resolution (pg 636), Rabin-Karp Substring Search (pg 636).

---

### Interview Questions

---

