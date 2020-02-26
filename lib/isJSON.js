function isJSON(arg){
  arg = (typeof arg === "function") ? arg() : arg;
  if (typeof arg !== "string") {
    return false;
  }
  try {
    arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
    return true;
  } catch (e) {
    return false;
  }
}
