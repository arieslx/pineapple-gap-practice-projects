### 2.6.1，2.6.2
阿布老师真的讲得很清晰。15+1， log2(16) = 4

```
int BinSeach(A, n, key){
    l = 1, h = n;
    while(l <= h){
        mid = (l+h)/2;
        if(key == A[mid])
            return mid;
        if(key < A[mid]){
            h = mid -1;
        else 
            l = mid + 1
        }
    }

    return 0;
}
```

```
Algorithm RBinSearch(l,h,key){
    if(l==h){
        if(A[l]==key){
            return l;
        }
        else 
            return 0;
    } else {
        mid = (l+h)/2
        if(key == A[mid]){
            return mid;
        }
        if(key < A[mid]){
            return RBinSearch(l, mid-1, key)
        }
        else 
            return RBinSearch(mid+1, h, key)
    }
}
```