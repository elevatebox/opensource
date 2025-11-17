def ps(arr,k):
    s=set()
    for number in arr:
        com=k-number
        if com in s:
            return True
        s.add(number)
    return False
N=int(input().strip())
arr=list(map(int,input().strip().split()))
k=int(input().strip())
if ps(arr,k):
    print("true")
else:
    print("false")
