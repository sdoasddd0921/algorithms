# 腾讯实习面试算法题——数字统计

**描述：** 统计1到400万中整数中出现的数字1。比如112有2个1，321123有2个1……

**思路：** 按数位来统计，统计这400万个数中所有数字个位上出现的1的数量，十位、百位、千位等各个数位上出现的1的数量。这样的好处是各个数位上出现的1的数量至于“400万”这个终值有关而与旁边的数位无关，为什么呢？

先来看个位：0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2……

再来看十位：0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3……

有没有发现什么特别明显的规律呢？如果没看出来的话，我们再来看一个数电的时钟频率吧：

clk0： 0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1……

clk1： 0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0……

clk2： 0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0……

如果光看数字也不太明显的话，我们用高低电平来表示看看：

```
clk0: _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
clk1: __--__--__--__--__--__--__--__--__--__--__--__
clk2: ____----____----____----____----____----____--
```

根据这个电平我们可以知道，这些电平在长度为无限的情况下占空比为1/2，电平clk1是clk0经过1个二分频器得到的，同样，clk2是clk1经过1个二分频。

回过头来看这个题目，我们先看个位的，如果把我们需要的数字1当做高电平，其他的数字当做低电平，那么：

```
个位： -_________-_________-_________-_________-_________……
十位： _________----------_______________________________……
百位： __________________________________________________……
```

是不是有点眼熟了？为了方便，我们再稍微修改下题目，变为统计0~3999999这400万个数中出现的1:，那么：

```
个位： _-_________-_________-_________-_________-________……
十位： __________----------______________________________……
百位： __________________________________________________……
```

稍微说明一下为啥要从0开始统计而不是1。如果从1统计的话，个位是看不出啥影响的，都是1~9的循环，而十位就开始变了，先是9个0，再是10个1,10个2,10个3……而百位则是99个0,100个1,100个2……

经过简单的说明，可能你也知道了，十位相当于是个位经过1个10分频器得到的，百位相当于十位经过1个10分频器得到的……

再说的直接点，对于个位来说，每连续的10个数字[0,1,2,3,4,5,6,7,8,9]中必定有1个我们需要的数字，那么400万一共有40万个连续的0~9，那么个位总共就有40万个1；

对于十位来说，每连续的100个数字[10个0，10个1，10个2，10个3，10个4，10个5，10个6，10个7，10个8，10个9，]中必定有10个我们需要的数字，那么400万一共有4万个这么连续的100个数，那么十位上总共有10*4万=40万个1；

同理，百位、千位、万位、十万位上分别有40万个1。

那么对于最高位百万位来说，它的组成是100万个0,100万个1,100万个2,100万个3，注意这里我们统计的是0~3999999。那么百万位上没有1千万个数字构成的一个完整的“0到9”，但是因为**剩下的数字都是很有规律的，每个数字都是连续出现的**，所以我们可以很容易的得到百万位上的400万个数字里有100万个数字1，这一点很重要！

那么把各个数位上的数字加起来就得到了340万。
