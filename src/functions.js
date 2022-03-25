
  export const createTree2 = (arr) => {
    arr.forEach(el => {
     arr.forEach(el2 => {
      if( el.id === el2.parentId) {
        el.children = el.children ? [...el.children, el2] : [el2];
      }
     })
    })
    return arr;
  }
  