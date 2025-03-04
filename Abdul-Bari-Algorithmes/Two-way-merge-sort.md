``` 伪代码
Algorithm Merge(A,B,m,n)
{
    i=1, j=1, k=1

    while(i<=m, j<=n) 
    {
    if(A[i]<B[j])
        c[k++] = A[i++];
    else
        c[k++] = B[j++];
    }
    for(; i<=m;i++)
        c[k++] = A[i];
    for(; j<=n;j++)
        c[k++] = B[j]; 
}

Algorithm Merge(l, h)
{
    if(l<h)
    {
        mid = (l+h)/2
        mergeSort(l,mid);
        MergeSort(mid+1, h);
        merge(l,mid,h)
    }
}

Insertion sort is stable, quick sort, merge sort & Bubble sort ...

```