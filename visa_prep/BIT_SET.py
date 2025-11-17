N=int(input())
k=int(input())
if N & (1 << (k - 1)):
    print("true")
else:
    print("false")

