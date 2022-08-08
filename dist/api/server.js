

define(['jquery'], function($){


  function getIndexBanner(){
    return $.ajax('/api/mock/banner.json');
  }

  return {
    getIndexBanner
  }

})