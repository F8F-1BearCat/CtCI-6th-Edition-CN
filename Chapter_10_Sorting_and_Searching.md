# Chapter 10 | 排序与搜索

理解常见的排序和搜索算法是非常有价值的，因为许多排序和搜索问题都是对经典算法的细微调整。因此，在处理排序相关的问题时，一个好的方法是运行不同的排序算法，看看是否有一个特别适用。

例如，假设你被问到以下问题：给定一个非常大的 Person 对象数组，按年龄递增的顺序对人进行排序。

在这种场景下我们默认有两个很有趣的条件：

1. 这是一个很大的数组，所以效率非常重要。
2. 因为根据年龄排序的，所以我们知道值在一个小范围内。

通过浏览各种排序算法，我们可能会注意到桶排序（或基数排序）是这个问题的完美候选方案。实际上，我们可以将桶变小（每个桶仅1年），这样运行时间即为 O(n)。

### 常见的排序算法

学习（或重新学习）常见的排序算法是提高能力的好方法。下面介绍的五种算法中，归并排序（Merge Sort）、快速排序（Quick Sort）和桶排序（Bucket Sort）是面试中最常用的算法。

#### 冒泡排序 | 运行时：平均和最坏情况均为 O(n^2)。内存：O(1)。
在冒泡排序中，我们从数组的开头开始，如果第一个元素大于第二个元素，则交换前两个元素。然后，我们转到下一对，以此类推，不断扫描数组，直到数组完全排序。在这样做时，较小的项会慢慢“冒泡”到列表的开头。

#### 选择排序 | 运行时：平均和最坏情况均为 O(n^2)。内存：O(1)。

选择排序是孩子的算法（child's algorithm）：简单，但效率低下。使用线性扫描找到最小元素并将其移动到前面（与前面的元素交换）。然后，找到第二个最小的并移动它，再次进行线性扫描。继续这样做，直到所有的元素都就位。

#### 归并排序 | 运行时：平均和最坏情况均为 O(n log(n))。内存：视情况而定。

归并排序将数组分成两半，对每一半进行排序，然后将它们重新合并在一起。每一半都使用了相同的排序算法。最后，只合并两个元素数组。繁重的工作都是在“归并（merge）”阶段完成。

merge 方法会将目标数组段中的所有元素复制到辅助（helper）数组中，跟踪左半部分和右半部分的起始位置（helperLeft 和 helperRight）。

然后我们对 helper 进行迭代，将每一半的较小元素复制到数组中。最后，将所有剩余的元素复制到目标数组中。

```java
1 	void mergesort(int[] array) {
2 		int[] helper = new int[array.length];
3 		mergesort(array, helper, 0, array.length - 1);
4 	}
5 
6 	void mergesort(int[] array, int[] helper, int low, int high) {
7 		if (low < high) {
8 			int middle = (low + high)/ 2;
9 			mergesort(array, helper, low, middle); // Sort left half
10 			mergesort(array, helper, middle+l, high); // Sort right half
11 			merge(array, helper, low, middle, high); // Merge them
12 		}
13 	}
14
15 	void merge(int[] array, int[] helper, int low, int middle, int high) {
16 		/* Copy both halves into a helper array*/
17 		for (int i = low; i <= high; i++) {
18 			helper[i] = array[i];
19 		}
20
21 		int helperleft = low;
22 		int helperRight = middle + l;
23 		int current = low;
24
25 		/* Iterate through helper array. Compare the left and right half, copying back
26  	 * the smaller element from the two halves into the original array. */
27 		while (helperLeft <= middle && helperRight <= high) {
28 			if (helper[helperleft] <= helper[helperRight]) {
29 				array[current] = helper[helperleft];
30 				helperleft++;
31 			} else {//If right element is smaller than left element
32 				array[current] = helper[helperRight];
33 				helperRight++;
34 			}
35 			current++;
36 		}
37
38 		/* Copy the rest of the left side of the array into the target array*/
39 		int remaining = middle - helperleft;
40 		for (int i= 0; i <= remaining; i++) {
41 			array[current + i] = helper[helperleft + i];
42 		}
43 	}
```

你可能会注意到，只有 helper 数组左半部分中的剩余元素被复制到目标数组中。为什么不是右半部分呢？右半部分不需要复制，是因为它已经在那里了。

例如，考虑一个像 [1、4、5 || 2、8、9] 这样的数组（“11”表示分区点）。在合并这两部分之前，helper 数组和目标数组段都以 [8, 9] 结尾。一旦我们将四个元素（1, 4, 5 和 2）复制到目标数组中，[8,9] 仍然在两个数组中都存在。没有必要复制它们。

归并排序的空间复杂度为 O(n)，这部分是用于归并数组部分的辅助空间。

#### 快速排序 | 运行时：平均情况为 O(n log(n))，最坏情况均为 O(n^2)。内存：O(n log(n))。

在快速排序中，我们选择一个随机元素并对数组进行分区（partition ），这样所有小于分区元素的数都在大于分区元素的数之前。可以通过一系列交换（见下文）有效地执行分区。

如果我们围绕一个元素反复地对数组（及其子数组）进行分区，那么该数组最终将被排序。但是，由于分区元素不能保证是中位数（或接近中位数的任何位置），我们的排序可能会非常慢。这是最坏情况运行时为 O(n^2) 的原因。

```java
1 	void quickSort(int[] arr, int left, int right) {
2 		int index = partition(arr, left, right);
3 		if (left < index - 1) { // Sort left half
4 			quickSort(arr, left, index - 1);
5 		}
6 		if (index < right) { // Sort right half
7 			quickSort(arr, index, right);
8 		}
9 	}
10
11 	int partition(int[] arr, int left, int right) {
12 		int pivot = arr[(left + right) / 2]; // Pick pivot point
13 		while (left <= right) {
14 			// Find element on left that should be on right
15 			while (arr[left] < pivot) left++;
16
17 			// Find element on right that should be on left
18 			while (arr[right] > pivot) right--;
19
20 			// Swap elements, and move left and right indices
21 			if (left <= right) {
22 				swap(arr, left, right); // swaps elements
23 				left++;
24 				right--;
25 			}
26 		}
27 		return left;
28 	}
```

#### 基数排序 | 运行时：O(kn)（见下文）

基数排序是整数（和一些其他数据类型）的排序算法，它利用了整数具有有限位数的事实。在基数排序中，我们从低到高遍历数字的每一位，按每一位对数字进行排序。例如，如果我们有一个整数数组，我们可能首先根据数字的第一位（译者注，即个位）进行排序，这样 0 就被分组在一起了。然后，我们根据下一位对每个分组进行排序。我们重复这个过程，根据每个后续的位进行排序，直到最后整个数组被排序。

与比较排序算法不同，比较排序算法在平均情况下的运行时间为 O(n log(n)) ，而基数排序的运行时间为 O(kn)，其中 n 是元素的数量，k 是该算法中排序的执行次数（the number of passes）。

### 搜索算法

当我们考虑搜索算法时，我们通常会想到二分搜索（binary search）。事实上，这是一个非常有用的算法。

在二分搜索中，我们通过首先将 x 的数值与数组的中点值进行比较，以查找排序数组中的元素 x。

如果 x 小于中点，那么我们搜索数组的左半部分。如果 x 大于中点，那么我们搜索数组的右半部分。然后我们重复这个过程，将左右两半作为子数组处理。再次，我们将 x 与这个子数组的中点进行比较，然后搜索该中点左侧或右侧。重复这个过程，直到 x 被找到或子数组的大小变为 0。

注意，尽管这个概念相当简单，但是要正确处理所有细节要比你想象的困难得多。在学习下面的代码时，请注意加号和减号。

```java
1 	int binarySearch(int[] a, int x) {
2 		int low = 0;
3 		int high = a.length - 1;
4 		int mid;
5
6 		while (low <= high) {
7 			mid = (low + high) / 2;
8 			if (a[mid] < x) {
9 				low = mid + 1;
10 			} else if (a[mid] > x) {
11 				high = mid - 1;
12 			} else {
13 				return mid;
14 			}
15 		}
16 		return -1; // Error
17 	}
18
19 	int binarySearchRecursive(int[] a, int x, int low, int high) {
20 		if (low > high) return - 1; // Error
21
22 		int mid (low + high)/ 2;
23 		if (a[mid] < x) {
24 			return binarySearchRecursive(a, x, mid + 1, high);
25 		} else if (a[mid] > x) {
26 			return binarySearchRecursive(a, x, low, mid - 1);
27 		} else {
28 			return mid;
29 		}
30 	}
```

搜索数据结构的潜在方法可以扩展到二分搜索之外，最好不要将自己局限于此选项。例如，你可以使用二叉树或 hash table 来搜索节点。Think beyond binary search!

------

### Interview Questions

------

