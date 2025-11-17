T = int(input())
for _ in range(T):
    X, N = map(int, input().split())
    p = X // 10
    res = p* N
    print(res)
