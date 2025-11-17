x,y=map(str,input().split())
if x==y:
    print("NULL")
elif (x=="R" and y=="P") or (x=="P" and y=="S") or (x=="S" and y=="R"):
    print("Charan")
else:
    print("Vignesh")
