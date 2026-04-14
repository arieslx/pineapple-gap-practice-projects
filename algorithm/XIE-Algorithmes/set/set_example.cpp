#include <iostream>
#include <set>

using namespace std;

// clang++ -std=c++17 -stdlib=libc++ -O3 hello_world.cpp; ./a.out; rm a.out

int main(){

    set<int> S {3,2,1,4,5};

    S.insert(1);
    S.insert(7);

    //search & del

    auto iter = S.find(0);
    if(iter != S.end())
        S.erase(iter);
    iter = S.find(5);
    if(iter != S.end())
        S.erase(iter);
    S.erase(5);

    //how to change item?
    iter = S.find(2);
    if(iter != S.end()){
        S.erase(iter);
        S.insert(6);
    }
      
    //迭代器位置
    iter = S.begin();
    cout << *iter << endl;
    ++iter;
    cout << *iter << endl;
    --iter;
    cout << *iter << endl;

    //遍历集合，为简化这里不讨论常量迭代器
    for(auto iter = S.begin(); iter != S.end(); ++iter)
        cout << *iter << " ";
    cout << endl;
    for(auto riter = S.rbegin(); riter != S.rend(); ++riter)
        cout << *riter << " ";
    cout << endl;
    for(const auto& x : S)
        cout << x << " ";
    cout << endl;
    return 0;
}