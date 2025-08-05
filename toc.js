// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> 译者序</a></li><li class="chapter-item expanded affix "><li class="part-title">目录</li><li class="chapter-item expanded "><a href="Foreword.html"><strong aria-hidden="true">2.</strong> 序</a></li><li class="chapter-item expanded "><a href="Introduction.html"><strong aria-hidden="true">3.</strong> 引言</a></li><li class="chapter-item expanded "><a href="I.The_Interview_Process.html"><strong aria-hidden="true">4.</strong> I. 面试过程</a></li><li class="chapter-item expanded "><a href="II.Behind_the_Scenes.html"><strong aria-hidden="true">5.</strong> II. 幕后</a></li><li class="chapter-item expanded "><a href="III.Special_Situations.html"><strong aria-hidden="true">6.</strong> III. 特殊情况</a></li><li class="chapter-item expanded "><a href="IV.Before_the_Interview.html"><strong aria-hidden="true">7.</strong> IV. 面试之前</a></li><li class="chapter-item expanded "><a href="V.Behavioral_Questions.html"><strong aria-hidden="true">8.</strong> V. 行为问题</a></li><li class="chapter-item expanded "><a href="VI.Big_O.html"><strong aria-hidden="true">9.</strong> VI. Big O</a></li><li class="chapter-item expanded "><a href="VII.Technical_Questions.html"><strong aria-hidden="true">10.</strong> VII. 技术问题</a></li><li class="chapter-item expanded "><a href="VIII.The_Offer_and_Beyond.html"><strong aria-hidden="true">11.</strong> VIII. Offer 及其他</a></li><li class="chapter-item expanded "><a href="IX.Interview_Questions.html"><strong aria-hidden="true">12.</strong> IX. 面试问题</a></li><li class="chapter-item expanded affix "><li class="part-title">数据结构</li><li class="chapter-item expanded "><a href="Chapter_1_Arrays_and_Strings.html"><strong aria-hidden="true">13.</strong> Chapter 1 I 数组和字符串</a></li><li class="chapter-item expanded "><a href="Chapter_2_Linked_Lists.html"><strong aria-hidden="true">14.</strong> Chapter 2 I 链表</a></li><li class="chapter-item expanded "><a href="Chapter_3_Stacks_and_Queues.html"><strong aria-hidden="true">15.</strong> Chapter 3 I 栈和队列</a></li><li class="chapter-item expanded "><a href="Chapter_4_Trees_and_Graphs.html"><strong aria-hidden="true">16.</strong> Chapter 4 I 树和图</a></li><li class="chapter-item expanded affix "><li class="part-title">概念和算法</li><li class="chapter-item expanded "><a href="Chapter_5_Bit_Manipulation.html"><strong aria-hidden="true">17.</strong> Chapter 5 I 位操作</a></li><li class="chapter-item expanded "><a href="Chapter_6_Math_and_Logic_Puzzles.html"><strong aria-hidden="true">18.</strong> Chapter 6 I 数学和逻辑难题</a></li><li class="chapter-item expanded "><a href="Chapter_7_Object-Oriented_Design.html"><strong aria-hidden="true">19.</strong> Chapter 7 I 面向对象的设计</a></li><li class="chapter-item expanded "><a href="Chapter_8_Recursion_and_Dynamic_Programming.html"><strong aria-hidden="true">20.</strong> Chapter 8 I 递归和动态规划</a></li><li class="chapter-item expanded "><a href="Chapter_9_System_Design_and_Scalability.html"><strong aria-hidden="true">21.</strong> Chapter 9 I 系统设计和可扩展性</a></li><li class="chapter-item expanded "><a href="Chapter_10_Sorting_and_Searching.html"><strong aria-hidden="true">22.</strong> Chapter 10 I 排序与搜索</a></li><li class="chapter-item expanded "><a href="Chapter_11_Testing.html"><strong aria-hidden="true">23.</strong> Chapter 11 I 测试</a></li><li class="chapter-item expanded affix "><li class="part-title">基础知识</li><li class="chapter-item expanded "><a href="Chapter_12_C_and_C++.html"><strong aria-hidden="true">24.</strong> Chapter 12 I C 和 C++</a></li><li class="chapter-item expanded "><a href="Chapter_13_Java.html"><strong aria-hidden="true">25.</strong> Chapter 13 I Java</a></li><li class="chapter-item expanded "><a href="Chapter_14_Databases.html"><strong aria-hidden="true">26.</strong> Chapter 14 I 数据库</a></li><li class="chapter-item expanded "><a href="Chapter_15_Threads_and_Locks.html"><strong aria-hidden="true">27.</strong> Chapter 15 I 线程和锁</a></li><li class="chapter-item expanded affix "><li class="part-title">附加复习题</li><li class="chapter-item expanded "><a href="Chapter_16_Moderate.html"><strong aria-hidden="true">28.</strong> Chapter 16 I 中等</a></li><li class="chapter-item expanded "><a href="Chapter_17_Hard.html"><strong aria-hidden="true">29.</strong> Chapter 17 I 困难</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="X.Solutions.html"><strong aria-hidden="true">30.</strong> X. 答案</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">31.</strong> XI. 进阶主题</div></li><li class="chapter-item expanded "><a href="XII.Code_Library.html"><strong aria-hidden="true">32.</strong> XII. 代码库</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">33.</strong> XIII. 提示</div></li><li class="chapter-item expanded "><a href="XIV.About_the_Author.html"><strong aria-hidden="true">34.</strong> XIV. 关于作者</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
