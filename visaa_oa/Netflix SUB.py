n = list(map(int,input().split(' ')))
x,y,z,n = n[0],n[1],n[2],n[3]
if x+y>=n or y+z>=n or x+z>=n:
    print("YES")
else:
    print("NO")
