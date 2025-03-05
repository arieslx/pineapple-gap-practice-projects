#include <iostream>

using namespace std;
// clang++ -std=c++17 -stdlib=libc++ -O3 binary_search_array.cpp; ./a.out; rm a.out
//input: key - (search value); data: 有序数组，n - array length
//output：index


template <typename T>
int binary_search_array(const T& key, const T data[], int n)
{
    if(n <=0)
    return -1;

    int low = 0;
    int high = n -1;
    while(low <= high)
    {
        int mid = low + (high-low) / 2;
        if(key < data[mid])
            high = mid-1;
        else if(data[mid] < key)
            low = mid+1;
        else
            return mid;
    }
    return -1;
}

int main()
{
    int A[5] = {1,2,3,4,5};
    cout << binary_search_array(2, A, 5) << endl;
    cout << binary_search_array(0, A, 5) << endl;
    cout << binary_search_array(2, A, 0) << endl;
    cout << binary_search_array(2, A+2, 3) << endl;
    return 0;

}