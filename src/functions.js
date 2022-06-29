// export const createTree2 = (arr) => {
//   arr.forEach((el) => {
//     arr.forEach((el2) => {
//       if (el.id === el2.parentId) {
//          el.children = el.children ? [...el.children, el2] : [el2];
//       }
//     });
//   });
//   return arr;
// };

export const createTree2 = (arr) => {
  arr.forEach((el) => {
    const child = arr.find(p => p.parentId === el.id);
    if (child) {
      el.children = el.children ? [...el.children, child] : [child];
    }
  });
  return arr;
};

export const createMassivFunc = (arr) => {
  let obj = {};
  if (arr && arr.length) {
    arr.forEach((el) => {
      obj.hasOwnProperty(el.itemId)
        ? obj[el.itemId].push({ val: el.value, id: el.id, name: el.name })
        : (obj[el.itemId] = [{ val: el.value, id: el.id, name: el.name }]);
    });
  }
  return obj;
};

export const convertDate = (date) => {
  const newDate = new Date(date);

  return (
    newDate.getDate() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getFullYear() +
    " " +
    newDate.getHours() +
    ":" +
    newDate.getMinutes() +
    ":" +
    newDate.getSeconds()
  )
};

export const createObjSelect = (arr) => {

  const obj = {};

  arr.forEach(el => {
    if(obj.hasOwnProperty(el.select_namesId)) {
        obj[el.select_namesId] = obj[el.select_namesId] + 1;
    } else {
      obj[el.select_namesId] = 1;
    }
})

return obj;
}