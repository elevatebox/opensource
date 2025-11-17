n=int(input())
A=list(map(int,input().split()))
r=A[1:]+A[:1]
print(" ".join(map(str,r)))
