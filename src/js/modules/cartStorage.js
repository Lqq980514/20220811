 
// 设置本地存储

/* [
  { goodsName: xxx, goodsType: xxx, goodsPrice: xxx, goodsNumber: xxx, isChecked: false }
] */

define(['jquery'], function($){

  // 判断要存储的数据，本地存储中是否已经存储，存在就累加，不存在就新增

  let key = 'cartList';

  function addCartStorage(data){

    let cartList = getCartStorage();
    let flag = true;
    let index = -1;
    for(let i=0;i<cartList.length;i++){
      if( cartList[i].goodsName === data.goodsName && cartList[i].goodsType === data.goodsType ){
        flag = false;
        index = i;
      } 
    }

    if(flag){  // 新增
      cartList.unshift(data);
    }
    else{  // 累加
      cartList[index].goodsNumber += data.goodsNumber;
    }

    setCartStorage(cartList);

    alert('添加成功');

  }

  function setCartStorage(cartList){
    localStorage.setItem(key, JSON.stringify(cartList));
  }

  function getCartStorage(){
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  return {
    addCartStorage,
    setCartStorage,
    getCartStorage
  }

});