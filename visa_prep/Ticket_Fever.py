T=int(input())
for _ in range(T):
    N,M=map(int,input().split())
    st=max(0,N-M)
    print(st)
