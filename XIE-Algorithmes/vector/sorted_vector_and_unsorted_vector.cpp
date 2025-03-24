#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

//TODO:?
//clang++ -std=c++17 -stdlib=libc++ -O3 sorted_vector_and_unsorted_vector.cpp; ./a.out; rm a.out

template <typename T>
void print_all(const T& S)
{
    for(const auto& x : S)
        cout << x << ' ';
    cout << endl;
}

int main()
{
    int key;
    //有序向量
    vector<int> SV {1,2,3,6,6,8,9};
    //查找元素
    cin >> key;
    auto iter = lower_bound(SV.begin(), SV.end(), key);
    cout << iter - SV.begin() << endl;
    iter = upper_bound(SV.begin(), SV.end(), key);
    cout << iter - SV.begin() << endl;
    //insert new one
    key=0;
    SV.insert(upper_bound(SV.begin(), SV.end(), key), key);
    //删除重复元素的最后一个，思考如何删除第一个呢？
    key = 6;
    //if exist, then delete last one
    if(binary_search(SV.begin(), SV.end(), key))
    {
        iter = upper_bound(SV.begin(), SV.end(), key);
        SV.erase(--iter);
    }
    //查找重复key所在的区间range，区间为[range.first, range.second).
    auto range = equal_range(SV.begin(), SV.end(), key);
    //删除整个range区间的元素
    SV.erase(range.first, range.second);
    //打印
    print_all(SV);

    //无序向量
    vector<int> UV{9,6,1,3,8,6};
    //插入新元素。
    key = 0;
    UV.push_back(key);
    //删除重复元素的最后一个，思考：如何删除第一个？
    key = 6;
    //这里需要使用逆向迭代器，而非正向迭代器
    auto riter = find(UV.rbegin(), UV.rend(), key);
    //如果存在则删除
    if(riter != UV.rend())
    {
        *riter = UV.back();
        UV.pop_back();
    }
    //打印
    print_all(UV);

    return 0;
}