def uo(a):
    s=set()
    r=[]
    for n in a:
        if n not in s:
            r.append(n)
            s.add(n)
    return r
n=int(input())
a=list(map(int,input().split()))
print(*uo(a))
