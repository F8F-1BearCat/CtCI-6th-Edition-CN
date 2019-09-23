# Chapter 12 | C 和 C++

一个好的面试官不会要求你用自己不懂的语言来写代码。希望，如果你被要求使用 C++ 进行编码，其本身已在你的简历中列出。如果你不记得所有的 APl，不要担心，因为大多数面试官（虽然不是所有）都不太在意。但是，我们建议你学习基本的 C++ 语法，这样你就可以轻松地处理这些问题。

### 类和继承

虽然 C++ 类具有与其他语言类似的特性，但我们将在下面回顾一些语法。

下面的代码演示了带有继承的基本类的实现。

```java
1 	#include <iostream>
2 	using namespace std;
3
4 	#define NAME_SIZE 50 // Defines a macro
5
6 	class Person {
7 		int id; // all members are private by default
8 		char name[NAME_SIZE];
9
10 	 public:
11 		void aboutMe() {
12 			cout << "I am a person.";
13		}
14 	};
15
16 	class Student : public Person {
17 	 public:
18 		void aboutMe() {
19 			cout << "I am a student.";
20		}
21 	};
22
23 	int main() {
24 		Student * p = new Student();
25 		p->aboutMe(); // prints "I am a student."
26 		delete p; // Important! Make sure to delete allocated memory.
27 		return 0;
28 	}
```

在 C++ 中，所有数据成员和方法在默认情况下都是私有的。可以通过引入关键字 public 来对此进行修改。

### 构造函数与析构函数

类的构造函数在对象创建时自动调用。如果没有定义构造函数，编译器将自动生成一个称为默认构造函数的构造函数。或者，我们可以定义自己的构造函数。

如果你只需要初始化基本类型，一个简单的方法是：

```java
1 	Person(int a) {
2 		id = a;
3 	}
```

这适用于基本类型，但你可能想要这样做：

```java
1 	Person(int a) : id(a) {
2 		...
3 	}
```

在创建实际对象之前，以及调用构造函数代码的其余部分之前，分配数据成员 id。当字段是常量或 class 类型时，这种方法是必要的。

析构函数在对象删除时进行清理，并在对象被销毁时自动调用。它不能接受参数，因为我们没有显式地调用析构函数。

```java
1 	~Person() {
2 		delete obj; // free any memory allocated within class
3 	}
```

### 虚函数

在前面的示例中，我们将 p 定义为 Student 类型：

```java
1 	Student * p = new Student();
2 	p->aboutMe();
```

如果像这样将 p 定义为 Person *，会发生什么？

```java
1 	Person * p = new Student();
2 	p->aboutMe();
```

在这种情况下，将改为打印 “I am a person”。这是因为 aboutMe 函数是在编译时通过一种称为静态绑定的机制解析的。

如果要确保调用 Student 的 aboutMe 实现，可以在 Person 类中将aboutMe 定义为 virtual。

```java
1 	class Person {
2		...
3 		virtual void aboutMe() {
4 			cout << "I am a person.";
5		}
6	};
7
8 	class Student : public Person {
9 	 public:
10 		void aboutMe() {
11 			cout << "I am a student.";
12		}
13 	};
```

虚拟函数的另一种用法是当我们不能（或不想）为父类实现方法时。例如，想象一下，我们希望 Student 和 Teacher 从 Person 继承，以便我们可以实现诸如 addCourse(string s) 之类的通用方法。但是，对 Person 调用 addCourse 并没有多大意义，因为实现取决于对象是 Student 还是 Teacher。

在这种情况下，我们可能希望 addCourse 是在 Person 中定义的虚函数，实现留给子类处理。

```java
1 	class Person {
2 		int id;// all members are private by default
3 		char name[NAME_SIZE];
4 	 public:
5 		virtual void aboutMe() {
6 			cout << "I am a person." << endl;
7		}
8 		virtual bool addCourse(string s) = 0;
9	};
10
11 	class Student : public Person {
12 	 public:
13 		void aboutMe() {
14 			cout << "I am a student." << endl;
15		}
16
17 		bool addCourse(string s) {
18 			cout << "Added course " << s << "to student." << endl;
19 			return true;
20		}
21 	};
22
23 	int main() {
24		Person * p = new Student();
25		p->aboutMe(); // prints "I am a student."
26		p->addCourse("History");
27		delete p;
28 	}
```

请注意，通过将 addCourse 定义为”纯虚函数“，Person 现在是抽象类，我们无法实例化它。

### 虚析构函数

虚函数自然会引入“虚析构函数”的概念。假设我们想为 Person 和 Student 实现一个析构函数方法。一个简单的解决方案可能是这样的：

```java
1 	class Person {
2 	 public:
3 		~Person() {
4 			cout << "Deleting a person." << endl;
5		}
6	};
7
8 	class Student public Person {
9 	 public:
10 		~Student() {
11 			cout << "Deleting a student." << endl;
12		}
13	};
14
15 	int main() {
16 		Person * p new Student();
17 		delete p; // prints "Deleting a person."
18 	}
```

与前面的示例一样，由于 p 是一个 Person，所以调用 Person 类的析构函数。这是有问题的，因为可能无法清除 Student 的内存。

要解决这个问题，我们只需将 Person 的析构函数定义为 virtual。

```java
1 	class Person {
2 	 public:
3 		virtual ~Person() {
4 			cout << "Deleting a person." << endl;
5		}
6	};
7
8 	class Student : public Person {
9 	 public:
10 		~Student() {
11 			cout << "Deleting a student." << endl;
12		}
13 	};
14
15 	int main() {
16 		Person * p new Student();
17 		delete p;
18	
```

这将输出以下内容：

```
Deleting a student.
Deleting a person.
```

### 缺省值

函数可以指定默认值，如下所示。请注意，所有默认参数都必须在函数声明的右侧，因为没有其他方法可以指定参数的排列方式。

```java
1 	int func(int a, int b = 3) {
2 		X = a;
3 		y = b;
4 		return a + b;
5 	}
6
7 	w = func(4);
8 	z = func(4, 5);
```

### 运算符重载

运算符重载使我们能够将 `+` 等运算符应用于原本不支持这些运算的对象。例如，如果我们想将两个 BookShelves 合并为一个，可以按如下方式重载 `+` 运算符。

```java
1 Bookshelf BookShelf::operator+(BookShelf &other) { ... }
```

### 指针与引用

指针保存变量的地址，并可用于执行允许直接在变量上执行的任何操作，比如访问和修改变量。

两个指针可以彼此相等，因此更改其中一个指针的值也将更改另一个指针的值（因为它们实际上指向相同的地址）。

```java
1 	int * p new int;
2 	*p = 7;
3 	int * q = p;
4 	*p = 8;
5 	cout << * q; // prints 8
```

请注意，指针的大小根据体系结构而有所不同：32位计算机上为32位，而64位计算机上为64位。请注意这种差异，因为面试官通常会问数据结构到底占多大的空间。

#### 引用

引用是预先存在（pre-existing）的对象的另一个名称（别名），它没有自己的内存。例如：

```java
1 	int a = 5;
2 	int & b = a;
3 	b = 7;
4 	cout << a; // prints 7
```

在上面第 2 行，b 是对 a 的引用，修改 b 也会修改 a。

如果不指定引用在内存中的位置，则无法创建引用。但是，你可以创建如下所示的独立参考：

```java
1	/* allocates memory to store 12 and makes b a reference to this
2 	 * piece of memory.*/
3 	const int & b = 12;
```

与指针不同，引用不能为 null，也不能重新分配给另一块内存。

#### 指针算法

人们经常会看到程序员在指针上执行加法运算，例如下面所示：

```java
1 	int * p = new int[2];
2 	p[0] = 0;
3 	p[1] = 1;
4 	p++;
5 	cout << *p; // Outputs 1
```

执行 p++ 将向前跳过 sizeof(int) 个字节，这样代码输出为 1。如果 p 是不同类型的，它将跳过与数据结构大小相同的字节。

### 模板

模板是一种重用代码的方法，可以将相同的类应用于不同的数据类型。例如，我们可能有一个类似列表的数据结构，我们希望将其用于各种类型的列表。下面的代码使用 Shiftedlist 类实现了这一点。

```java
1 	template <class T>class ShiftedList {
2 		T* array;
3 		int offset, size;
4 	public:
5 		Shiftedlist(int sz) : offset(0), size(sz) {
6 			array= new T[size];
7		}
8
9 		~Shiftedlist() {
10 			delete [] array;
11		}
12
13 		void shiftBy(int n) {
14 			offset = (offset + n) % size;
15		}
16
17 		T getAt(int i) {
18 			return array[convertindex(i)];
19		}
20
21 		void setAt(T item, int i) {
22 			array[convertindex(i)] = item;
23		}
24
25 	private:
26 		int convertlndex(int i) {
27 			int index = (i - offset) % size;
28 			while (index < 0) index += size;
29 			return index;
30		}
31	};
```

------

### Interview Questions

------



