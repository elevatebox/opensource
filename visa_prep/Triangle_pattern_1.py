N=int(input())
cn=1
for i in range(1,N+1):
    rn=[]
    for j in range(i):
        rn.append(cn)
        cn+=1
    print(" ".join(map(str,rn)))
