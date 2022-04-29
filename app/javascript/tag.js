document.addEventListener('DOMContentLoaded',() =>{
  const tagNameInput = document.querySelector('#post_form_tag_name');
  if (tagNameInput){
    const inputElement= document.getElementById("post_form_tag_name");
    inputElement.addEventListener('input',()=>{
      const keyword = document.getElementById("post_form_tag_name").value;
      const XHR = new XMLHttpRequest();
      XHR.open("GET",`/posts/search/?keyword=${keyword}`,true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () =>{
        const tagName = XHR.response.keyword;
        const searchResult = document.getElementById("search-result");
        searchResult.innerHTML = "";
        if (XHR.response){
          tagName.forEach((tag)=>{
            const childElement = document.createElement("div");
            childElement.setAttribute("class","child");
            childElement.setAttribute("id",tag.id);
            childElement.innerHTML = tag.tag_name;
            searchResult.appendChild(childElement);
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