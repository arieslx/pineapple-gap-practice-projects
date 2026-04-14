#include <iostream>

using std::cout;
using std::endl;

int main()
{
    const int n = 64;
    int x = 4;
    int y = 2;
    int M[n][n];

    //M1
    for(int i = 0; i < n; ++i)
        for(int j=0;j<n;++j)
            if(i == j)
                M[i][j] = x;
            else
                M[i][j] = y;

    //M2
    for(int i=0;i<n;++i)
        for(int j =0; j<n; ++j)
            M[i][j] = y;
    for(int k=0; k<n; ++k)
        M[k][k] = x;

    //M3
    for(int i=0; i<n; ++i)
    {
        for(int j=0;j<i;++j)
            M[i][j] = y;
        M[i][i] = x;
        for(int j=i+1; j<n;++j)
            M[i][j] = y;
    }

    // print
    for(int i=0;i<n;++i)
    {
        for(int j=0; j<n;++j)
            cout << M[i][j];
        cout << endl;
    }
    return 0;
}

