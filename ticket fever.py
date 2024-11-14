t=int(input())
for i in range(0,t):
    n,m = map(int,input().split())
    if n>m:
        print(n-m)
    else:
        print(0)
