#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

using namespace std;
// clang++ -std=c++17 -stdlib=libc++ -O3 sort.cpp; ./a.out; rm a.out

int main()
{
    const int n = 5;
    int A[n] = {2,5,3,1,4};

    //small->large
    sort(A, A+n);
    for(int i=0;i<n;++i)
        cout << A[i] << " ";
    cout << endl;

    //large->small, 逆序
    sort(A, A+n, greater<int>());
    for(int i=0;i<n;++i)
        cout << A[i] << " ";
    cout << endl;

    //string
    string B[n] = {"www","algorithm","racer","text","wait"};
    sort(B, B+n);
    for(int i=0;i<n;++i)
        cout << B[i] << endl;
    sort(B, B+n, greater<string>());
    for(int i=0;i<n;++i)
        cout << B[i] << endl;

    //vector
    vector<string> V {"www","algorithm","racer","text","wait"};
    //small->large
    sort(V.begin(),V.end());
    for (auto iter = V.begin(); iter != V.end(); ++iter)
    cout << *iter << endl;

    sort(V.begin(),V.end(), greater<string>());
    for (auto iter = V.begin(); iter != V.end(); ++iter)
    cout << *iter << endl;

    sort(V.rbegin(),V.rend());
    for (const string& x : V)
    cout << x << endl;
    return 0;

}