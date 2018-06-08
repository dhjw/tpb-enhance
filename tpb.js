// init
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',afterDOMLoaded); else afterDOMLoaded();
function afterDOMLoaded(){
	// listing rows
	var x=document.getElementsByClassName('vertTh');
	var cnt=0;
	for(let i=0;i<x.length;i++){
		// hide porn rows
		if(x[i].innerHTML.indexOf('Porn')!==-1){
			x[i].parentElement.style.display='none';
			cnt++;
		}
		// add google search for movies
		if(x[i].innerHTML.indexOf('Movies')!==-1){
			var txt=x[i].nextSibling.nextSibling.children[0].children[0].innerHTML.replace(/[\W_]+/g,' ').replace(/\s+/,' ').trim()+' ';
			var re=/\s[0-9]{4}\s/g;
			var pos=-1;
			while ((match = re.exec(txt)) != null) pos=match.index;
			if(pos!==-1){
				txt=txt.substr(0,pos+5).trim();
				x[i].nextSibling.nextSibling.children[0].innerHTML+=' (<a target="_blank" class="detLink" href="https://google.com/search?q='+encodeURIComponent(txt+' site:imdb.com OR site:rottentomatoes.com OR site:wikipedia.com')+'">g</a>)';
			}
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