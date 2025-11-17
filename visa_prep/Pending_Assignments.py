x,y,z=map(int,input().split())
timetaken=x*y
time=z*24*60
if timetaken<=time:
    print("YES")
else:
    print("NO")
