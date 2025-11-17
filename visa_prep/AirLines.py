
X, N = map(int, input().split())
c = X * 100
if N > c:
    rp = N - c
    ap = (rp + 99) // 100
else:
    ap = 0
print(ap)
