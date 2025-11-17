n=int(input())
mat=[list(map(int,input().split())) for _ in range(n)]
def t(mat):
    r=len(mat)
    c=len(mat[0])
    tr=[[mat[j][i] for j in range(r)] for i in range(c)]
    return tr
for r in t(mat):
    print(*r)
