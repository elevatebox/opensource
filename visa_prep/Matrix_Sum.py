def smat(N,mat):
    rs=[sum(mat[i]) for i in range(N)]
    cs=[sum(mat[i][j] for i in range(N)) for j in range(N)]
    res=[rs[i]+cs[i] for i in range(N)]
    return res
N=int(input())
mat=[list(map(int,input().split())) for _ in range(N)]
res=smat(N,mat)
print(" ".join(map(s
