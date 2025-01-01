function MkCard()
{
	$("<a href='#popup' data-rel='dialog'></a>").click();
  var aName = $('._js_name').val();
  var aViewArea = $('._js_view_area').val();
  var aFood = $('._js_food').val();
  var aPlayer = $('._js_player').val();
  var aStaff = $('._js_staff').val();
  var aFun = $('._js_fun').val();
  var aReki = $('._js_reki').val();
  var aHitokoto = $('._js_hitokoto').val();
  var aFunPlayer = $('._js_fun_player').val();
  var aCardImg = $('._js_card_img:checked').val();

    var img = new Image();
	img.src = "https://kyoto-bcardmaker.netlify.app/"+aCardImg;
	var cvs = document.getElementById('srcImg');
    cvs.width = $('._js_none_img').width();
    cvs.height = $('._js_none_img').height();
	var ctxt = cvs.getContext('2d');
    var aScale = cvs.width / img.width;

    var aNewCardFlg = (aCardImg != 'card.jpg');
    if ( aNewCardFlg )
    {
        var img2 = new Image();
        img2.src = "https://kyoto-bcardmaker.netlify.app/"+aCardImg;
        var ctxt2 = cvs.getContext('2d');
        aScale2 = aScale;
        aScale = aScale * 0.74;
        ctxt2.setTransform(aScale2, 0, 0, aScale2*0.9, 0, 0);
        ctxt2.drawImage(img2, 0, 0);
    }

  img.onload = function() {
    
    if ( aNewCardFlg )
    {
        ctxt.setTransform(aScale, 0, 0, aScale*0.95, 0, 0);
    }
    else
    {
        ctxt.setTransform(aScale, 0, 0, aScale, 0, 0);
        ctxt.drawImage(img, 0, 0);
    }
    ctxt.beginPath();

    // 文字列スタート位置
    var aTitleX = 55;
    var aStrX = 70;
    var aStrY = 115;
    // 枠スタート位置
    var aWakuX = 50;
    var aWakuY = 80;

    // タイトル
    ctxt.font= 'bold 60px Century Gothic';
    ctxt.strokeStyle = '#00A3D9';
    ctxt.lineWidth = 6;
    ctxt.lineJoin = 'round';
    ctxt.fillStyle = '#fff';
    // ctxt.fillText('Bリーグ自己紹介カード',400,60);

    // 名前
    drawRect({ ctx:ctxt, x:aWakuX, y:aWakuY, width:1090, height:130, radius: 20, color:"rgba(255, 255, 255, 0.8)"});
    ctxt.font = "30px 'Monotype Corsiva'";
    ctxt.fillStyle = '#000';
    ctxt.fillText('名前',aTitleX,aStrY);
    ctxt.font = "60px 'Monotype Corsiva'";
    aStrX += 0; aStrY += 60;
    ctxt.fillText(aName,aStrX,aStrY);
    
   // ハンナリーズ歴
   aWakuX += 1100; aWakuY += 0;
   drawRect({ ctx:ctxt, x:aWakuX, y:aWakuY, width:200, height:130, radius: 20, color:"rgba(255, 255, 255, 0.8)"});
   ctxt.font = "25px 'Monotype Corsiva'";
   aStrX = aTitleX+1100; aStrY += -60;
   ctxt.fillText('ハンナリーズ歴',aTitleX+1110,aStrY);
   ctxt.font = "60px 'Monotype Corsiva'";
   aStrX += 30; aStrY += 60;
   ctxt.fillText(aReki+"年",aStrX,aStrY);

    // 好きな選手
    aWakuX = 50; aWakuY += 180;
    drawRect({ ctx:ctxt, x:aWakuX, y:aWakuY, width:645, height:130, radius: 20, color:"rgba(255, 255, 255, 0.8)"});
    ctxt.font = "30px 'Monotype Corsiva'";
    aStrX = 70; aStrY += 125;
    ctxt.fillText('好きな選手',aTitleX,aStrY);

    var aPlayerX = aStrX+10; aStrY += 55;
    ctxt.fillText(aPlayer,aPlayerX,aStrY);

    // ハンナリーズで好きな人
    aWakuX += 655; aWakuY += 0;
    drawRect({ ctx:ctxt, x:aWakuX, y:aWakuY, width:645, height:130, radius: 20, color:"rgba(255, 255, 255, 0.8)"});
    ctxt.font = "30px 'Monotype Corsiva'";
    aStrX = aTitleX+655; aStrY += -55;
    ctxt.fillText('ハンナリーズで好きな人',aTitleX+655,aStrY);
    var aStaffX = aStrX+20; aStrY += 55;
    ctxt.fillText(aStaff,aStaffX,aStrY);

    // 好きなアリーナ飯
    aWakuX = 50; aWakuY += 180;
    drawRect({ ctx:ctxt, x:aWakuX, y:aWakuY, width:645, height:130, radius: 20, color:"rgba(255, 255, 255, 0.8)"});
    ctxt.font = "30px 'Monotype Corsiva'";
    aStrX = 70; aStrY += 125;
    ctxt.fillText('好きなアリーナ飯',aTitleX,aStrY);
    var aFoodX = aStrX+10; aStrY += 55;
    ctxt.fillText(aFood,aFoodX,aStrY);

    // すきな座席
    aWakuX += 655; aWakuY += 0;
    drawRect({ ctx:ctxt, x:aWakuX, y:aWakuY, width:645, height:130, radius: 20, color:"rgba(255, 255, 255, 0.8)"});
    ctxt.font = "30px 'Monotype Corsiva'";
    aStrX += aTitleX+655; aStrY += -55;
    ctxt.fillText('好きな座席', aTitleX+655,aStrY);
    var aViewAreaX = aStrX-50; aStrY += 55;
    ctxt.fillText(aViewArea,aViewAreaX,aStrY);
    
    // 京都を好きになったきっかけ
    aWakuX = 50; aWakuY += 180;
    drawRect({ ctx:ctxt, x:aWakuX, y:aWakuY, width:1300, height:200, radius: 20, color:"rgba(255, 255, 255, 0.8)"});
    ctxt.font = "30px 'Monotype Corsiva'";
    aStrX = 70; aStrY += 125;
    ctxt.fillText('京都を好きになったきっかけ',aTitleX,aStrY);

    ctxt.font = "35px 'Monotype Corsiva'";
    var aFunList = MkText( ctxt, aFun, 1250);
    aStrX += 0; aStrY += 40;
    for( var aCnt = 0; aCnt < aFunList.length; aCnt++)
    {
        ctxt.fillText( aFunList[ aCnt ], aStrX, aStrY );
        aStrY += 40;
    }

    // 選手を好きになったきっかけ
    aWakuX += 0; aWakuY += 240;
    drawRect({ ctx:ctxt, x:aWakuX, y:aWakuY, width:1300, height:200, radius: 20, color:"rgba(255, 255, 255, 0.8)"});
    ctxt.font = "30px 'Monotype Corsiva'";
    aStrX = 70; aStrY = aWakuY + 40;
    ctxt.fillText('選手を好きになったきっかけ',aTitleX,aStrY);

    ctxt.font = "35px 'Monotype Corsiva'";
    var aFunPlayerList = MkText( ctxt, aFunPlayer, 1250);
    aStrX += 0; aStrY += 40;
    for( var aCnt = 0; aCnt < aFunPlayerList.length; aCnt++)
    {
        ctxt.fillText( aFunPlayerList[ aCnt ], aStrX, aStrY );
        aStrY += 40;
    }

    // フリースペース
    aWakuX += 0; aWakuY += 240;
    drawRect({ ctx:ctxt, x:aWakuX, y:aWakuY, width:1300, height:200, radius: 20, color:"rgba(255, 255, 255, 0.8)"});
    ctxt.font = "30px 'Monotype Corsiva'";
    aStrX = 70; aStrY = aWakuY + 40;
    ctxt.fillText('フリースペース',aTitleX,aStrY);

    ctxt.font = "35px 'Monotype Corsiva'";
    var aHitokotoList = MkText( ctxt, aHitokoto, 1250);
    aStrX += 0; aStrY += 40;
    for( var aCnt = 0; aCnt < aHitokotoList.length; aCnt++)
    {
        ctxt.fillText( aHitokotoList[ aCnt ], aStrX, aStrY );
        aStrY += 40;
    }
  }
    document.getElementById("dstImg").src = null;
    document.getElementById("dstImg").src = cvs.toDataURL();
}

function drawRect(param) 
{
    var ctx = param.ctx;
    var x = param.x;
    var y =param.y;
    var width = param.width;
    var height = param.height;
    var radius = param.radius || 0;
    var color = param.color;
    
    ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, 0, false);
            ctx.lineTo(x + width, y + height - radius);
            ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5, false);
            ctx.lineTo(x + radius, y + height);
            ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI, false);
            ctx.lineTo(x, y + radius);
            ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false);
        ctx.closePath();
        ctx.fill();
    ctx.restore();
}

function MkText( pCanvas, pStr, pWidth )
{
    var aLen = pStr.length; 
    var aStrList = [];
    var aTmp = "";
 
    if ( aLen < 1 )
    {
        return aStrList;
    }
 
    for ( var aCnt = 0; aCnt < aLen; aCnt++ )
    {
        var aChar = pStr.charAt(aCnt);
        if ( aChar == "\n" )
        {
            aStrList.push( aTmp );
            aTmp = "";
            continue;
        }
 
        if ( pCanvas.measureText( aTmp + aChar ).width <= pWidth )
        {
            aTmp += aChar;
        }
        else
        {
            aStrList.push( aTmp );
            aTmp = aChar;
        }
    }
    if ( aTmp.length > 0 )
    {
        aStrList.push( aTmp );
    }
 
    return aStrList;
}

//Blobを保存
function saveBlob(blob, name)
{
  var aUrl = parent.URL || parent.webkitURL,
  objectUrl = aUrl.createObjectURL(blob),
  e = new Event('click'),
  el = document.createElement('a');
  el.href = objectUrl;
  el.download = name;  
  el.click(e);
};
//dataURL を Blob に変換
/**
 * convert data URL to blob.
 * Thanks to http://stackoverflow.com/questions/12168909/blob-from-dataurl
 */
function dataUrlToBlob(dataUrl) {
  var splitted = dataUrl.split(','),
      byteString = atob(splitted[1]),
      mimeString = splitted[0].split(':')[1].split(';')[0],
      ab = new ArrayBuffer(byteString.length),
      ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}
//呼び出す関数
function saveImage(){
  //canvas を探索
  var cvs = document.getElementById('srcImg');
  //canvas の dataURL を Blob に変換し保存
  saveBlob(dataUrlToBlob(cvs.toDataURL()), 'bleague-card.png');
}
