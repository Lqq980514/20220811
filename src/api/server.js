

define(['jquery'], function($){


  function getIndexBanner(){
    return $.ajax('/api/mock/banner.json');
  }

  function getDetailBanner(){
    return $.ajax('/api/mock/banner2.json');
  }

  function getPhpData(){
    //return $.ajax('http://localhost/api2/users.php');
    //return $.getJSON('http://localhost/api2/users.php?callback=?');
    return $.ajax('/api2/users.php');
  }

  function getGoodsData(type){
    return $.ajax(`/api/mock/${type}.json`)
  }

  function getDetailData(type, id){
    return $.ajax(`/api/mock/${type}.json`).then((data)=>{
      return data.goods_list.find((v) => v.goodsId === id);
    });
  }

  return {
    getIndexBanner,
    getDetailBanner,
    getPhpData,
    getGoodsData,
    getDetailData
  }

})