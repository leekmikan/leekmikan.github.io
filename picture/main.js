var titles = document.getElementsByTagName("h1");
document.getElementById("sum").innerText = document.getElementsByTagName("img").length;
titles[1].innerText += "　(" + document.querySelectorAll('#ed img').length + ")";
titles[2].innerText += "　(" + document.querySelectorAll('#line img').length + ")";
titles[3].innerText += "　(" + document.querySelectorAll('#ame img').length + ")";
titles[4].innerText += "　(" + document.querySelectorAll('#sec img').length + ")";