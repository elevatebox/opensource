N=int(input())
X=list(map(int,input().split()))
if X==sorted(X):
    print("true")
else:
    print("false")
