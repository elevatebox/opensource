import java.util.*;
class Factorial{
	public static void main(String args[]){
		int n,i,fact=1;
		Scanner s=new Scanner(System.in);
		System.out.println("enter the number");
		n=s.nextInt();
		for(i=1;i<=n;i++){
			fact=fact*i;
		}
		System.out.println(fact);
	}
}