

// 这是一个轮播图模块
define(['jquery'], function($){

  let $bannerList = $('.banner-list');

  function initBanner(data){
    // data -> 后端给我们的数据
    let html = `
            <ul>
              ${
                data.banner_list.map((v, i)=>{
                  return `
                    <li class="${i===0? 'show': ''}"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>
                  `;
                }).join('')
              }
            </ul>
            <ol>
              ${
                data.banner_list.map((v, i)=>{
                  return `
                    <li class="${i===0? 'active': ''}"></li>
                  `;
                }).join('')
              } 
            </ol>
    `;
    $bannerList.html(html);
    bindBanner();
  }

  function bindBanner(){

    let $ulLis = $bannerList.find('ul li');
    let $olLis = $bannerList.find('ol li');
    let now = 0;
    $olLis.on('mouseover', function(){
      $(this).addClass('active').siblings().removeClass('active');
      $ulLis.eq( $(this).index() ).addClass('show').siblings().removeClass('show');
    });

    setInterval(()=>{
      if(now === $ulLis.length-1){
        now = 0;
      }
      else{
        now++;
      }
      $olLis.eq(now).addClass('active').siblings().removeClass('active');
      $ulLis.eq(now).addClass('show').siblings().removeClass('show');
    }, 3000)

  }

  return initBanner;

})