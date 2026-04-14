```
// 2.8.1
Partition(l,h)
{
    do
    {
        i++
    } while(A[i] < pivot);
    do
    {
        j--
    } while(A[i] > pivot);
    if(i < j)
        swap(A[i], A[j])
}
swap(A[l], A[j]);
return j

QuickSort(l, h)
{
    if(l < h)
    {
        j = partition(l,h);
        QuickSort(l,j);
        QuickSort(j+1,h)
    }
}
```