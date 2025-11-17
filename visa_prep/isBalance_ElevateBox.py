N=int(input())
A=list(map(int,input().split()))
ts=sum(A)
ls=0
ba=[]
for i in range(N):
    rs=ts-ls-A[i]
    b=abs(ls-rs)
    ba.append(b)
    ls+=A[i]
print(" ".join(map(str,ba)))
