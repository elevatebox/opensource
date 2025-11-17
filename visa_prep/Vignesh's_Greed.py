def mt(N,s):
    s.sort(reverse=True)
    for i in range(N-2):
        if s[i]<s[i+1]+s[i+2]:
            return s[i]+s[i+1]+s[i+2]
    return -1
N=int(input())
s=list(map(int,input().split()))
print(mt(N,s))
