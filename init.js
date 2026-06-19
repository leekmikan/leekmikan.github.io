window.onload = function(){
   document.body.style.display = "block";
   const url = new URL(location.href);
   const params = new URLSearchParams(url.search);
   if(params.get("you") == "idiot"){
      alert("なんでこのリンク踏んだのw　バカなのw");
   }
}