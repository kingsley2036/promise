class promise{
 constructor(fn){
   if(typeof fn !=='function'){
      throw new  Error('必须是函数')
   }
 } 
}
export default promise