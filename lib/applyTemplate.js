export function applyTemplate(templateElement, data) {
  const element = templateElement.content.cloneNode(true);
  const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, () => NodeFilter.FILTER_ACCEPT);

  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode;
    for (let bindAttr in node.dataset) {
      let isBindableAttr = (bindAttr.indexOf('bind_') == 0) ? true : false;
      if (isBindableAttr) {
        let dataKeyString = node.dataset[bindAttr];
        let dataKeys = dataKeyString.split("|");
        let bindKey = bindAttr.substr(5);
        for (let dataKey of dataKeys) {
          if (dataKey in data && data[dataKey] !== "") {
            node[bindKey] = data[dataKey];
            break;
          }
        }
      }
    }
  }

  return element;
};
