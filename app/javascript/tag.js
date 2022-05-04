document.addEventListener('DOMContentLoaded',() =>{
  const tagNameInput = document.querySelector('#post_form_tag_name'); //#を使用することで指定したidを全て取得することができる
  //tagNameInputに情報があった時の処理
  if (tagNameInput){
    const inputElement= document.getElementById("post_form_tag_name");
    inputElement.addEventListener('input',()=>{
      const keyword = document.getElementById("post_form_tag_name").value; //入力された文字列の値を取得
      const XHR = new XMLHttpRequest(); //XMLHttpRequestオブジェクトを生成
      XHR.open("GET",`/posts/search/?keyword=${keyword}`,true);//openメソッドを使いリクエストを初期化する。具体的な内容は「Javascript本格入門p397」
      XHR.responseType = "json";//応答の方はJSON形式
      XHR.send();//リクエストを送信する
      XHR.onload = () =>{
        const tagName = XHR.response.keyword;//変数にレスポンスでのキーワードを代入
        const searchResult = document.getElementById("search-result");
        searchResult.innerHTML = "";
        // 非同期通信のレスポンスがあった場合
        if (XHR.response){ 
          // 関数tagを使って、保存されているタグ情報の一覧表示をする
          tagName.forEach((tag)=>{
            const childElement = document.createElement("div");
            childElement.setAttribute("class","child");
            childElement.setAttribute("id",tag.id);
            childElement.innerHTML = tag.tag_name;
            searchResult.appendChild(childElement);
            // クリックイベントがあった場合はその文字列をid要素の中に入れ、一覧表示の中から取り除く
            const clickElement = document.getElementById(tag.id);
            clickElement.addEventListener('click',() =>{
              document.getElementById("post_form_tag_name").value = clickElement.textContent;
              clickElement.remove();
            });
          });
        };
      };
    });
  };
})