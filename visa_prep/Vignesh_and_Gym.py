X, Y, Z = map(int, input().split())
if Z >= X + Y:
    print(2)
elif Z >= X:
    print(1) 
else:
    print(0)
