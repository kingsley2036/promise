class promise{
  succeed=null
  fail=null
  state='pending'
  resolve(result){
    if(this.state!=='pending') return;
    this.state='fulfilled'
    setTimeout(()=>{
      if(typeof this.succeed==='function'){
        this.succeed.call(undefined,result)
      }
     },0)
  }
  reject(reason){
    if(this.state!=='pending') return;
    this.state='rejected'
    setTimeout(()=>{
      if(typeof this.fail==='function'){
        this.fail.call(undefined,reason)
      }
     },0)
  }
 constructor(fn){
   if(typeof fn !=='function'){
      throw new  Error('必须是函数')
   } 
   fn(this.resolve.bind(this),this.reject.bind(this))
 } 
 then(succeed?,fail?){
   if(typeof succeed ==='function'){
    this.succeed=succeed
   }
   if(typeof fail ==='function'){
    this.fail=fail
   }
 }
}
export default promise