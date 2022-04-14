

export const createTree2 = (arr) => {
  arr.forEach((el) => {
    arr.forEach((el2) => {
      if (el.id === el2.parentId) {
        el.children = el.children ? [...el.children, el2] : [el2];
      }
    });
  });
  return arr;
};

export const createMassivFunc = (arr) => {
  let obj = {};
  if (arr && arr.length) {
    arr.forEach((el) => {
      obj.hasOwnProperty(el.itemId)
        ? obj[el.itemId].push({ val: el.value, id: el.id })
        : (obj[el.itemId] = [{ val: el.value, id: el.id }]);
    });
  }
  return obj;
};

export const childValueFunc = async (id, res, arr) => {
 const el = await arr.find(a => a.id === id);
 console.log(el);
 console.log(res);

 const parent = await arr.find(p => p.id === el.parentId);

 console.log(parent);

 if (parent) {
  //  setArr([...arr.map(ar => ar.id === parent.id
  //   ? {...ar, children: [...ar.children.map(chil => chil.id === el.id
  //     ? {...chil, value: res}
  //     : {...chil}
  //     )]}
  //   : {...ar}
  //   )])

 await arr.forEach( ar => {
    if(ar.id === parent.id) {
      ar.children.forEach(chil => {
        if(chil.id === el.id) {
          chil.value = res;
        }
      })
    }
  })
 }
 return arr;
};
