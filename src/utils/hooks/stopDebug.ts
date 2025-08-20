
export const useStopDebug= (): any => {
  // 通过递归反复构造匿名函数利用debugger断点阻止调试
const check = function () {
  function doCheck(a: any) {
    if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
      (function () { }['constructor']('debugger')());
    } else {
      (function () { }['constructor']('debugger')());
    }
    doCheck(++a);
  }
  try {
    doCheck(0);
  } catch (e) {
    console.log('You are being debugged!');
  }
};
check();
// 同时利用定时器定期产生debugger断点
setInterval(function () {
  check();
}, 2000);
}