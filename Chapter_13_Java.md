# Chapter 13 | Java

虽然在本书中可以找到与 Java 相关的问题，但本章还讨论了有关语言和语法的问题。这类问题在大公司面试中更不常见，因为大公司更看重测试求职者的能力，而不是求职者的知识（而且他们有时间和资源培训求职者使用一种特定的语言）。然而，在其他公司，这些烦人的问题可能相当常见。

### 如何处理

由于这些问题过于关注知识，因此谈论解决这些问题的方法似乎有些愚蠢。毕竟，这不就只是知道正确的答案就可以了吗？

当然，要掌握这些问题，最好的方法是彻底地学习Java。

但是，如果你真的被难住了，你可以试着用下面的方法来解决：

1. 创建一个场景示例，并问自己事情应该如何发展。

2. 问问自己其他语言如何处理这种情况。

3. 考虑一下，如果你是语言设计师，你将如何设计这种情况。每种选择的含义是什么？

如果你能推导出答案而不是机械地记忆答案，那么你的面试官可能会对你的表现留下同样的或更深刻的印象。不过，不要试图虚张声势。你可以告诉面试官：“我不确定我是否能回忆起答案，但让我看看能否弄明白。假设我们有这个代码......”

### 重载 vs 重写

重载（Overloading）是一个术语，用于描述两个方法具有相同的名称，但是参数的类型或数量不同。

```java
1 	public double computeArea(Circle c) { ... }
2 	public double computeArea(Square s) { ... }
```

但是，当方法与其超类中的另一个方法具有相同的名称和函数签名时，就会发生覆盖（Overriding）。

```java
1 	public abstract class Shape {
2 		public void printMe() {
3 			System.out.println("I am a shape.");
4		}
5 		public abstract double computeArea();
6 	}
7
8 	public class Circle extends Shape {
9 		private double rad= 5;
10 		public void printMe() {
11 			System.out.println("I am a circle.");
12		}
13
14 		public double computeArea() {
15 			return rad * rad * 3.15;
16		}
17 	}
18
19 	public class Ambiguous extends Shape {
20 		private double area= 10;
21 		public double computeArea() {
22 			return area;
23		}
24	}
25
26 	public class IntroductionOverriding {
27 		public static void main(String[] args) {
28 			Shape[] shapes = new Shape[2];
29 			Circle circle = new Circle();
30 			Ambiguous ambiguous = new Ambiguous();
31
32			shapes[0] = circle;
33			shapes[l] = ambiguous;
34
35 			for (Shape s : shapes) {
36 				s.printMe();
37 				System.out.println(s.computeArea());
38			}
39		}
40	}
```

上面的代码运行结果打印如下：

```
1 I am a circle.
2 78.75
3 I am a shape.
4 10.0
```

注意，Circle 类中覆盖了 printMe( )，而 Ambiguous 类中则保留了这个方法的原样。

### 集合框架

Java的集合框架非常有用，你将在本书中看到它的使用。以下是一些最有用的几项：
ArrayList：ArrayList 是一个动态调整大小的数组，在插入元素时会增长。

```java
1 	Arraylist<String> myArr = new Arraylist<String>();
2 	myArr.add("one");
3 	myArr.add("two");
4 	System.out.println(myArr.get(0)); /* prints <one> */
```

Vector：Vector 与 Arraylist 非常相似，只是它是同步的（synchronized）。它们的语法也几乎相同。

```java
1 	Vector<String> myVect new Vector<String>();
2 	myVect.add("one");
3 	myVect.add("two") ;
4 	system.out.printin(myVect.get(0));
```


LinkedList：LinkedList 指的就是 Java 的内置 LinkedList 类。虽然很少在面试中出现，但是学习它很有用，因为它演示了迭代器（iterator）的一些语法。

```java
1 	Linkedlist<String> mylinkedlist = new Linkedlist<String>();
2 	mylinkedlist.add("two");
3 	myLinkedList.addFirst("one");
4 	Iterator<String> iter = mylinkedlist.iterator();
5 	while (iter.hasNext()) {
6 		System.out.println(iter.next());
7 	}
```

HashMap：HashMap 集合无论是在面试中，还是在实际工作中都被广泛地使用。我们提供了以下语法的片段。

```java
1 	HashMap<String, String> map= new HashMap<String, String>();
2 	map.put("one", "uno");
3 	map.put("two", "dos");
4 	System.out.println(map.get("one"));
```

在面试之前，确保你对上面的语法非常熟悉。你会需要它。

------

### Interview Questions

------

