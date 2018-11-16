export const validateNameLength = (name) => {
  if (name.length >= 15){
    return true;
  }
  return;
}
export const validateNameContent = (name) => {
  // disallow ; < > { } ( )$ % ^ * [ ] | / \
  return name.replace(/\W\D\S/gi,'');
  // return name.replace(/;|<|>|{|}|(|)$|%|^|*|[|]|\||/|\/gi,'');
}
export const validatePdfForUpload = () => {}