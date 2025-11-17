def cd(N,m,arr):
    n1=0
    n2=0
    for number in arr:
        if number%m==0:
            n2+=number
        else:
            n1+=number
    return n2-n1
N,m=map(int,input().strip().split())
arr=list(map(int,input().strip().split()))
res=cd(N,m,arr)
print(res)
