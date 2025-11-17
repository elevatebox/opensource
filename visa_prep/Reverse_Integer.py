def reverseint(n):
    min=-2**31
    max=2**31-1
    sign=-1 if n<0 else 1
    n*=sign
    revn=0
    while n>0:
        dig=n%10
        n//=10
        revn=revn*10+dig
    revn*=sign
    if revn<min or revn>max:
        return 0
    return revn
n=int(input().strip())
res=reverseint(n)
print(res)
