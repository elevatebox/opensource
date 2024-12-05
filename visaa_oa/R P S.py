a = list(input().split(' '))
x,y = a[0],a[1]
if x=='S' and y=='P':
    print("Vignesh")
elif x=='S' and y=='R':
    print("Charan")
elif x=='P' and y=='S':
    print("Charan")
elif x=='P' and y=='R':
    print("Vignesh")
elif x=='R' and y=='P':
    print("Charan")
elif x=='R' and y=='S':
    print("Vignesh")
else:
    print("NULL")
