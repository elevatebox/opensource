n = list(map(int,input().split(' ')))
x,y,z = n[0],n[1],n[2]
if z%y==0 and z//y<=x:
    print("YES")
else:
    print("NO")
