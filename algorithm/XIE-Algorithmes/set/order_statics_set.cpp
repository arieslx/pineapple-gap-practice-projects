#include <iostream>
#include <set>
#include <vector>

using namespace std;

// clang++ -std=c++17 -stdlib=libc++ -O3 order_statics_set.cpp; ./a.out; rm a.out

int main(){

    set<int> S {3,2,1,4,5};
    int k;
    cin >> k;
    if(k<1 || k > S.size())
        cout << "超出范围" << endl;
    else
    {
        //method1
        auto iter = S.begin();
        for(int i =0; i< k-1; ++i)
            ++iter;
        cout << *iter << endl;
        //method2
        vector<int>V;
        //预留k-1个元素空间
        V.reserve(k-1);
        //删除前k-1个元素并暂存到V中
        for(int i=0; i<k-1; ++i)
        {
            V.push_back(*S.begin());
            S.erase(S.begin());
        }

        cout << *S.begin() << endl;
        //将k-1个元素放回S中，也可对V使用基于范围的for循环
        //最简单的方法是直接使用
        //S.insert(V.begin(), V.end())
        for(size_t i=0;i<V.size();++i)
            S.insert(V[i]);

    }
     return 0;
}