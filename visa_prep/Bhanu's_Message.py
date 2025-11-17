def valid(m):
    if len(m)<10 or len(m)>20:
        return False
    if m[0]=='+':
        m=m[1:]
    if not all(c.isdigit() or c==' ' for c in m):
        return False
    n=m.split()
    if len(n)==2:
        code,ph=n[0],n[1]
        if not(len(code)==2 and code.isdigit()):
            return False
    elif len(n)==1:
        ph=n[0]
    else:
        return False
    if len(ph)!=10 or not ph.isdigit():
        return False
    s=sum(int(digit) for digit in ph)
    return s>0
if __name__=="__main__":
    m=input().strip()
    if valid(m):
        print("Correct")
    else:
        print('Incorrect')
