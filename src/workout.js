const isPrime = (element,index,array) => {
   let start = 2;
   while(start <= Math.sqrt(element)){
   	if(element % start++ < 1){
   		return false;
   	}
   }
   return true;
}


console.log([1,2,3,4,5,6].find(isPrime))