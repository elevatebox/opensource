n,x,y=map(int,input().split())
marks=n*x
if 0<=y<=marks and y%x==0:
    print("YES")
else:
    print("NO")
