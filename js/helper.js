{
  function test() {
    console.log(1);
  }
  exportVars({ testfunc: test }).from("helper");
}
