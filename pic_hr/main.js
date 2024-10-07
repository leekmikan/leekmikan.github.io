var titles = document.getElementsByTagName("h1");
document.getElementById("sum").innerText = document.getElementsByTagName("img").length;
titles[1].innerText += "　(" + document.querySelectorAll('#yk img').length + "枚)";