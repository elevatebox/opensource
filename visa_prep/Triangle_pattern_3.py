n=int(input())
for i in range(1,n+1):
    f=''.join(str(x) for x in range(1,i+1))
    s=''.join(str(x) for x in range(i,0,-1))
    sp=' '*(2*(n-i))
    if i==n:
        print(f+s)
    else:
        print(f+sp+s)
