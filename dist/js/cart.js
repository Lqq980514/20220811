requirejs.config({
    paths: {
      'jquery': '/lib/jquery-3.4.1.min'
    }
  });

  

  define(['jquery', '/js/modules/cartStorage.js'], function($, { getCartStorage, setCartStorage }){

    let $cart_list = $('.cart_list');
    let $cart_computed_all = $('.cart_computed_all');
    let $cart_computed_num = $('.cart_computed_num');
    let $cart_title_selectAll = $('.cart_title_selectAll');
  
    initCart();
    bindCart();
  
    function initCart(){
      let cartList = getCartStorage();
  
      let html = cartList.map((v)=>{
        return `
          <li>
            <div>${ v.isChecked ? '<input class="cart_list_cb" checked type="checkbox">' : '<input class="cart_list_cb" type="checkbox">' }</div>
            <div>${v.goodsName} ( ${v.goodsType} )</div>
            <div>¥ ${v.goodsPrice}.00</div>
            <div>
                <span class="cart_list_remove">-</span>
                <input class="cart_list_text" type="text" value="${v.goodsNumber}">
                <span class="cart_list_add">+</span>
            </div>
            <div>¥ ${ v.goodsPrice * v.goodsNumber }.00</div>
            <div class="cart_list_del">删除</div>
          </li>
        `
      }).join('')
  
      $cart_list.html(html);
  
  
      let tmpNum = 0;
      let tmpAll = 0;
      for(let i=0;i<cartList.length;i++){
        if( cartList[i].isChecked === true ){
          tmpNum += cartList[i].goodsNumber;
          tmpAll += cartList[i].goodsNumber * cartList[i].goodsPrice;
        }
      }
  
      $cart_computed_num.html(tmpNum);
      $cart_computed_all.html(tmpAll);
  
    }
  
    function bindCart(){
      let cartList = getCartStorage();
  
      $cart_list.on('click', '.cart_list_add', function(){
        let index = $(this).closest('li').index();
        cartList[index].goodsNumber++;
        setCartStorage(cartList);
        initCart();
      });
  
      $cart_list.on('click', '.cart_list_remove', function(){
        let index = $(this).closest('li').index();
        if( cartList[index].goodsNumber > 1 ){
          cartList[index].goodsNumber--;
          setCartStorage(cartList);
          initCart();
        }
      });
  
      $cart_list.on('input', '.cart_list_text', function(){
        let val = Number($(this).val());
        let index = $(this).closest('li').index();
        if( isNaN(val) ){
          $(this).val( cartList[index].goodsNumber );
        }
        else{
          cartList[index].goodsNumber = val;
          setCartStorage(cartList);
          initCart();
        }
      });
  
      $cart_list.on('click', '.cart_list_del', function(){
  
        let index = $(this).closest('li').index();
  
        cartList.splice(index, 1);
  
        setCartStorage(cartList);
        initCart();
  
      });
  
      $cart_list.on('click', '.cart_list_cb', function(){
  
        let index = $(this).closest('li').index();
  
        cartList[index].isChecked = this.checked;
  
        setCartStorage(cartList);
        initCart();
  
        let allCheck = cartList.every((v) => v.isChecked);
  
        //prop() -> attr()
        $cart_title_selectAll.prop('checked', allCheck);
  
      });
  
  
      //完成全选功能
  
      $cart_title_selectAll.on('click', function(){
        
        for(let i=0;i<cartList.length;i++){
          cartList[i].isChecked = this.checked;
        }
        setCartStorage(cartList);
        initCart();
  
      });
  
  
    }
  
  });