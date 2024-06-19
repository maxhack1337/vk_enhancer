let exportVars, importVarsFrom; // the only line NOT within curly braces
{
  const modules = {};
  exportVars = (varsObj) => ({
    from(nameSpace) {
      modules[nameSpace] || (modules[nameSpace] = {});
      for (let [k, v] of Object.entries(varsObj)) {
        modules[nameSpace][k] = v;
      }
    },
  });
  importVarsFrom = (nameSpace) => modules[nameSpace];
}
