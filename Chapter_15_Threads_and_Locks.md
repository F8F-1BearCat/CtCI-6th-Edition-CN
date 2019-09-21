# Chapter 15 | 线程和锁

在 Microsoft、Google 或 Amazon 的面试中，被要求使用线程实现算法并不是非常普遍（除非你在一个团队中，对该团队来说这是一项特别重要的技术）。但是，对任何公司的面试官来说，评估你对线程的总体理解，尤其是对死锁的理解，都是是相对常见的。

本章将介绍该主题。

### Java中的线程

Java 中的每个线程都是由 `java.lang.Thread` 类的唯一对象创建和控制的。运行独立应用程序时，会自动创建一个用户线程来执行 main() 方法。该线程称为主线程。

在 Java 中，我们可以通过以下两种方式之一实现线程：

- 通过实现 `java.lang.Runnable` 接口

- 通过扩展 `java.lang.Thread` 类

我们将在下面介绍这两个方面。

#### 实现 Runnable 接口

Runnable 接口具有以下非常简单的结构。

```java
1 	public interface Runnable {
2 		void run();
3 	}
```

要使用这个接口创建和使用线程，我们需要执行以下操作：

1. 创建一个实现 Runnable 接口的类。该类的对象是一个 Runnable 对象。

2. 通过将 Runnable 对象作为参数传递给 Thread 构造函数，创建 Thread 类型的对象。Thread 对象现在有一个 Runnable 对象，它实现了 run() 方法。

3. 在上一步中创建的 Thread 对象上调用 start() 方法。

例如：

```java
1 	public class RunnableThreadExample implements Runnable {
2 		public int count = 0;
3
4 		public void run() {
5 		System.out.println("RunnableThread starting.");
6 			try {
7 				while (count< 5) {
8 					Thread.sleep(500);
9 					count++;
10				}
11 			} catch (InterruptedException exc) {
12 				System.out.println("RunnableThread interrupted.");
13			}
14 			system.out.println("RunnableThread terminating.");
15		}
16 	}
17
18 	public static void main(String[] args) {
19 		RunnableThreadExample instance = new RunnableThreadExample();
20 		Thread thread = new Thread(instance);
21 		thread.start();
22
23 		/* waits until above thread counts to 5 (slowly) */
24 		while (instance.count != 5) {
25 			try {
26 				Thread.sleep(250);
27			} catch (InterruptedException exc) {
28 				exc.printStackTrace();
29 			}
30		}
31 	}
```

在上面的代码中，可以看到我们真正需要做的是让类实现 run() 方法（第4行）。然后另一种方法可以将类的实例传递给新的 new Thread(obj) （第19 - 20行)，并在线程上调用 start() （第21行）。

#### 继承 Thread 类

或者，我们可以通过继承 Thread 类来创建一个线程。 这几乎总是意味着我们需要重写 run() 方法，并且子类也可以在其构造函数中显式调用线程构造函数。

以下代码提供了一个示例。

```java
1 	public class ThreadExample extends Thread {
2 		int count = 0;
3
4 		public void run() {
5 			System.out.println("Thread starting.");
6 			try {
7 				while (count < 5) {
8 					Thread.sleep(500);
9 					System.out.println("In Thread, count is " + count);
10					count++;
11				}
12 			} catch (InterruptedException exc) {
13 				System.out.println("Thread interrupted.");
14			}
15 			System.out.println("Thread terminating.");
16		}
17 	}
18
19 	public class ExampleB {
20 		public static void main(String args[]) {
21 			ThreadExample instance = new ThreadExample();
22 			instance.start();
23
24 			while (instance.count != 5) {
25 				try {
26 					Thread.sleep(250);
27 				} catch (InterruptedException exc) {
28 					exc.printStackTrace();
29				}
30			}
31		}
32	}
```

这段代码与第一种方法非常相似。不同之处在于，由于我们正在继承 Thread 类，而不是仅仅实现一个接口，所以我们可以在类本身的实例上调用 start() 方法。

#### 继承 Thread 类 vs. 实现 Runnable 接口

在创建线程时，实现 Runnable 接口可能比扩展 Thread 类更好，有两个原因可以解释：

- Java 不支持多重继承。因此，继承 Thread 类意味着子类不能继承任何其他类。实现 Runnable 接口的类将能够继承另一个类。

- 一个类可能只对可运行（runnable）感兴趣，因此，继承 Thread 类的全部开销将是过度的。

### Synchronization 和 Lock

给定进程中的线程共享同一内存空间，这既有正面影响也有负面的。它使线程能够共享数据，这可能很有价值。但是，当两个线程同时修改一个资源时，它也会产生问题。Java 提供同步，以便控制对共享资源的访问。

关键字 `synchronized` 和 `lock` 构成了实现代码同步执行的基础。

#### Synchronized 方法

最常见的是，我们通过使用 synchronized 关键字来限制对共享资源的访问。它可以应用于方法和代码块，并限制多个线程在同一对象上同时执行代码。

为澄清最后一点，请思考以下代码：

```java
1 	public class MyClass extends Thread {
2 		private String name;
3 		private MyObject myObj;
4
5 		public MyClass(MyObject obj, String n) {
6 			name = n;
7 			myObj = obj;
8		}
9
10 		public void run() {
11 			myObj.foo(name);
12 		}
13	}
14
15	public class MyObject {
16		public synchronized void foo(String name) {
17			try {
18				System.out.println("Thread " + name + ".foo(): starting");
19				Thread.sleep(3000);
20				System.out.println("Thread " + name + ".foo(): ending");
21			} catch (InterruptedException exc) {
22				System.out.println("Thread " + name + ": interrupted.");
23 			}
24 		}
25	}
```

两个 MyClass 实例可以同时调用 foo 吗？视情况而定。如果他们有相同的MyObject 实例，那么不可以。但是，如果他们有不同的引用，那么是可以的。

```java
1 	/* Difference references - both threads can call MyObject.foo() */
2 	MyObject obj1 = new MyObject();
3 	MyObject obj2 = new MyObject();
4 	MyClass thread1 = new MyClass(obj1, "1");
5 	MyClass thread2 = new MyClass(obj2, "2");
6 	thread1.start();
7 	thread2.start();
8
9 	/* Same reference to obj. Only one will be allowed to call foo,
10 	 * and the other will be forced to wait. */
11 	MyObject obj = new MyObject();
12 	MyClass thread1 = new MyClass(obj, "1");
13 	MyClass thread2 = new MyClass(obj, "2");
14 	thread1.start();
15 	thread2.start();
```

静态方法在 *class lock* 上同步。 上面的两个线程不能同时在同一个类上执行同步静态方法，即使一个调用 foo，而另一个调用 bar。

```java
1 	public class MyClass extends Thread {
2
3 		public void run() {
4 			if (name.equals("!")) MyObject.foo(name);
5 			else if (name.equals("2")) MyObject.bar(name);
6 		}
7 	}
8
9 	public class MyObject {
10 		public static synchronized void foo(String name) {/* same as before */}
11 		public static synchronized void bar(String name) {/* same as foo */}
12 	}
```

如果运行这段代码，你会看到以下打印：

```
Thread 1.foo(): starting
Thread 1.foo(): ending
Thread 2.bar(): starting
Thread 2.bar(): ending
```

#### Synchronized 块

类似地，一段代码可以被同步。这与同步方法的操作非常相似。

```java
1 	public class MyClass extends Thread {
2		...
3 		public void run() {
4 			myObj.foo(name);
5		}
6	}
7 	public class MyObject {
8 		public void foo(String name) {
9 			synchronized(this) {
10			...
11			}
12		}
13	}
```

与同步方法一样，每个MyObject实例只有一个线程可以执行 synchronized 块中的代码。这意味着如果 thread1 和 thread2 具有相同的 MyObject 实例，则一次只允许执行一个代码块。

### Locks


为了更细粒度的控制，我们可以使用锁。锁（或 monitor）用于通过将资源与锁相关联来同步对共享资源的访问。线程首先获取与资源关联的锁，从而获得对共享资源的访问权。在任何给定时间，最多一个线程可以持有锁，因此，只有一个线程可以访问共享资源。

锁的一个常见使用从场景是，从多个位置访问资源，但是一次只能由一个线程访问。下面的代码演示了这种情况。

```java
1 	public class LockedATM {
2 		private Lock lock;
3 		private int balance = 100;
4
5 		public LockedATM() {
6 			lock = new Reentrantlock();
7		}
8
9 		public int withdraw(int value) {
10 			lock.lock();
11 			int temp = balance;
12 			try {
13 				Thread.sleep(100);
14 				temp = temp - value;
15 				Thread.sleep(100);
16 				balance = temp;
17			} catch (InterruptedException){		}
18 			lock.unlock();
19			return temp;
20		}
21
22 		public int deposit(int value) {
23 			lock.lock();
24 			int temp = balance;
25 			try {
26 				Thread.sleep(100);
27				temp = temp + value;
28				Thread.sleep(300);
29				balance = temp;
30			} catch (InterruptedException e) {		}
31			lock.unlock();
32			return temp;
33		}
34 	}
```

当然，我们添加了一些代码来故意放慢 `withdraw` 和 `deposit` 的执行速度，因为这有助于说明可能发生的潜在问题。你可能不会像这样编写完全相同的代码，但是它所反映的情况是非常非常真实的。使用锁将有助于保护共享资源不被意外地修改。

### 死锁和死锁的预防

死锁是这样一种情况：一个线程正在等待另一个线程持有的对象锁，而第二个线程正在等待第一个线程持有的对象锁（或者具有多个线程的等效情况）。因为每个线程都在等待另一个线程释放一个锁，因此它们都会一直等待。这些线程被称为死锁。

若要发生死锁，必须满足以下四个条件:

1. *互斥*：在给定的时间内，只有一个进程可以访问资源。（或者，更准确地说，对资源的访问是有限的。如果资源的数量有限，也可能发生死锁。）

2. *持有和等待*：已经拥有资源的进程可以请求其他资源，而不会放弃其当前资源。

3. *无抢占*：一个进程不能强制删除另一个进程的资源。

4. *循环等待*：两个或多个进程组成一个循环链，其中每个进程正在等待链中的另一个资源。

死锁预防需要删除上面的任何条件，但是由于其中许多条件难以满足，所以它变得很棘手。例如，删除#1很困难，因为很多资源一次只能由一个进程使用(例如打印机)。大多数死锁预防算法都侧重于避免条件#4:循环等待。

死锁预防需要消除上述的任何条件，但是由于其中许多条件难以满足，所以这变得很棘手。例如，删除 ＃1 是困难的，因为许多资源一次只能由一个进程使用（例如，打印机）。大多数死锁预防算法专注于避免条件 ＃4：循环等待。

---

### Interview Questions

------

