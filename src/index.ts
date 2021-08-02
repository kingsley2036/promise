class promise{
  succeed=null
  fail=null
  resolve(){
    setTimeout(()=>{
      this.succeed()
     },0)
  }
  reject(){
    setTimeout(()=>{
      this.fail()
     },0)
  }
 constructor(fn){
   if(typeof fn !=='function'){
      throw new  Error('必须是函数')
   } 
   fn(this.resolve.bind(this),this.reject.bind(this))
 } 
 then(succeed,fail){
  this.succeed=succeed
  this.fail=fail
 }
}
export default promise