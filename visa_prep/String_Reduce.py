def reduce_string(s):
    res = []
    c = 1
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            c += 1
        else:
            res.append(s[i-1] + str(c))
            c= 1
    res.append(s[-1] + str(c))
    return ''.join(res)
input= input().strip()
print(reduce_string(input))
