def ra(n,arr,k):
    k=k%n
    r=arr[-k:]+arr[:-k]
    print(" ".join(map(str,r)))
n=int(input())
arr=list(map(int,input().split()))
k=int(input())
ra(n,arr,k)
