def mirr(mat):
    mm=[]
    for row in mat:
        mm.append(row[::-1])
    return mm
N=int(input().strip())
mat=[]
for _ in range(N):
    row=list(map(int,input().strip().split()))
    mat.append(row)
mm=mirr(mat)
for row in mm:
    print(" ".join(map(str,row)))
