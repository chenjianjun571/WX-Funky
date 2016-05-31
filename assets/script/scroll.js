/**
 * Created by chenjianjun on 16/5/31.
 */
function centerActivate(){
  var toOffsetLeft = $(".list-season .item-list .item.activate").attr("data-left") ;
  var time =   (Math.abs($(".list-season").scrollLeft() - toOffsetLeft)/300)*500;
  $(".list-season").animate({scrollLeft:toOffsetLeft},time)
}

$(document).ready(function(){
  var $allItem=$(".list-season .item-list .item");
  var $season=$(".list-season");
  var $firstItem=$(".list-season .item-list .item:first");

  if ($($allItem).length > 0){
    var space=$($firstItem).offset().left;
    $allItem.map(function(){
      $(this).attr("data-left",$(this).offset().left - space );
      console.log($(this).offset().left);
    });
    $($firstItem).addClass("activate");
  }

  $season.scroll(function(){
    if ($($allItem).length > 0){
      var $item = $firstItem;
      var  seasonCenter=$season.scrollLeft()  + $season.width() / 2 - $($firstItem).width() - 10;
      var itemCenter =Math.abs(seasonCenter - ( $($firstItem).offset().left + $($firstItem).width() / 2));
      $allItem.map(function(){
        var left = Math.abs(( $(this).offset().left - $(this).width()  ));
        if (itemCenter>left){
          $item=this;
          itemCenter = left;
        }
      });
      $($allItem).removeClass("activate");
      $($item).addClass("activate");
    }
  });
});
