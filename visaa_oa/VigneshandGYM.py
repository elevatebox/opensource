a=list(map(int,input().split(' ')))
b=a[0]+a[1]
if a[2]>a[0]:
    if a[2]>=a[0]+a[1]:
        print("2")
    else:
        print("1")
else:
    print("0")
