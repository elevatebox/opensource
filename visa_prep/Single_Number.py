def fn(arr):
    res=0
    for num in arr:
        res^=num
    return res
N=int(input().strip())
arr=list(map(int,input().strip().split()))
sn=fn(arr)
print(sn)
