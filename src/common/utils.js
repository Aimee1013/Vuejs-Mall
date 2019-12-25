
//防抖动操作，封装一个防抖动函数debounce
export function debounce(func, delay) {//防抖动操作，封装一个防抖动函数debounce
      let timer = null

      return function(...args){
        if(timer) clearTimeout(timer)

          timer = setTimeout(() => {
            func.apply(this,args)
          }, delay)
      }
    }