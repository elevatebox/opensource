a = list(map(int,input().split(' ')))
x,y,z = a[0],a[1],a[2]
b = x*y
p = z*24*60
if p>=b:
    print("YES")
else:
    print("NO")
