// init
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',afterDOMLoaded); else afterDOMLoaded();
function afterDOMLoaded(){
	// listing rows
	var x=document.getElementsByClassName('vertTh');
	var cnt=0;
	for(let i=0;i<x.length;i++){
		if(x[i].innerHTML.indexOf('Porn')!==-1){
			x[i].parentElement.style.display='none';
			cnt++;
		}
	}
	// search option
	if(document.getElementById('porn')) document.getElementById('porn').parentElement.remove();
	// browse and top categories
	var x=document.getElementsByClassName('categoriesContainer');
	for(let i=0;i<x.length;i++){
		var c=x[i].children[0];
		for(let j=0;j<c.children.length;j++){
			if(c.children[j].innerHTML.indexOf('Porn')!==-1){
				c.children[j].nextElementSibling.remove();
				c.children[j].remove();
			}
		}
	}
}