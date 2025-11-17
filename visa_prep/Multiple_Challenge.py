def cd(N):
    c3=N//3
    c5=N//5
    c15=N//15
    c=c3+c5-c15
    return c
N=int(input().strip())
res=cd(N)
