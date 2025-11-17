def f(n,m,g):
    r=set()
    c=set()
    for i in range(n):
        for j in range(m):
            if g[i][j]==0:
                r.add(i)
                c.add(j)
    for i in range(n):
        for j in range(m):
            if i in r or j in c:
                g[i][j]=0
    for r in g:
        print(" ".join(map(str,r)))
n,m=map(int,input().split())
g=[list(map(int,input().split())) for _ in range(n)]
f(n,m,g)
