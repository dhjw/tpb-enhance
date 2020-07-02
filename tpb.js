// init
var gicon='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADAklEQVR42kyST4hVZRiHn++cc/86fxyb0nJ0nMhiUGGIagSVMaJFIZTEEEQuDJo2QrSQoE1URBBMuchooHTRqmW4KRJpjGQGCya7qYyKOnP1OnOvc+89c86955zvO9/b4l6jxcO7en4/ePkpEdkLHP/hUjP/+WxD4lbEN69tYf8T/bQWF1l75VUeatTJKYUCUiABFVmbBrXaDCJyejXQMnG6IiPTd6X3g0V5/ssrEiWpiIg0p7+QdRDbRYOEIFWQW3DOAaj4mtWmAWvIu4rfb7T445YPQH5yEtPfT9ptf4DtXOsA0pd1SKOIIEhIYk0SGi4thwA4G4roQhHzP9EAuoN4ANsGsoz0WK4tRzgIRBrPAYD0r6sk91aoF1zaRRe0kPP1f//w0tTiug7vTQxybmERHRp27chxaOwRbNji/OxXXP3wcZZGH2bVcwjaKZk7EU/N1Xj2/CrqwEd/nvp4cuTowdEBLt70uVEJeWH3Jgq5NjPzn3DNXsAb6CUMLc3IUk8stRRqGjJLwVnvt8t1Dk03eWa4yNTBx3jjwDYAZha+5efmL2zfOEjaMGgjpFoQLbixJZcIKxszOH1OAC2f2Qs3OfljiVinAOweHKOgtnAvaNFIhHUttIwQpUJiIbFAIjh90Qrjmw1TL27l5bFH8dsuAPuG9vHp+Al62UElbOHrTkj4IMgI2gpqvrR8as/OoaMFrwrRbdqNBYyO2TD0Fo5b4HazzNSv71KO7yJ4tIwQGsFPIDHmrPPcriGkcoLg4tPEl1/CW3obdf0Y9+dfR0drDPcP8ebOI1RbmkZi8bXgJ0KSCgg4YXWOsPQ+2aiM076PTTwcClA5Q/PKSQBGNz1J22RZi21XBgSwCs+sl5W0hdjtQQARhaQeGTIYvwxAtd0kiBPwMp11dWUMyitu3k+UG8cEJdxMHqVcnFSRmCKF7YcR4Lt/zoDRoLyu3J2hUY4Skb1x/fpx/++v8+nqnChA5bfSs+cYxeEJvi/9xDuzn5HLZDuyKLBKkUq6HgYz/w4AlnS3rRyc0nEAAAAASUVORK5CYII=';
var tpbicon='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAADtSURBVBjTTcxNKwRxAMfx739maCdPO9ZDopTYckDK2tzIyV1xUXLgwmVeggNvgrwAB+LkILX2YA/KYdVcXPY0alPTommbmZ+DTT4v4GMEiA4DDgR+bAEg9rdAuuTPpuSAA12pl7bI1A0WwNzzzkVt7+oUgQPCLbSPcslhnQyQzmAAoM9mua3fP5rsoRinfIH16ic25VKelbLHiJOah7Xj3lHvM5Fcy1q6qdrjjwQfdml1YX7su1E5cc3dbf3g5bw5NBPG0xPvYWoUzuanhvuLWS0oLF6v76LWoB9JkqLKNk9CyX1THY2NNxnxjww/JKpkevLIms0AAAAASUVORK5CYII=';

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',afterDOMLoaded); else afterDOMLoaded();
function afterDOMLoaded(){
	// auto-reload on maintenance
	if(document.body.innerHTML.indexOf('Database maintenance, please check back in 10 minutes')!==-1) location.reload();
	// auto-reload on cloudflare error
	if(document.querySelector('#cf-error-details')) location.reload();
	// listing rows
	var x=document.getElementsByClassName('list-entry');
	var cnt=0;
	for(let i=0;i<x.length;i++){
		// hide porn rows
		var t=x[i].getElementsByClassName('item-type')[0].innerHTML;
		if(t.indexOf('Porn')!==-1){
			x[i].style.display='none';
			cnt++;
			continue;
		}
		// add google search for movies & tv
		if(t.indexOf('Movies')!==-1) var movie=1; else var movie='';
		if(t.indexOf('TV shows')!==-1) var tv=1; else var tv='';
		if(movie||tv){
			if(movie) x[i].style.background="#dedeff";
			var n=x[i].getElementsByClassName('item-name')[0].getElementsByTagName('a')[0].innerHTML;
			if(n.indexOf('18+ ')===0) n=n.substr(4); // for rDX torrents
			n=n.replace(/[\W_]+/g,' ').replace(/\s+/,' ').trim()+' ';
			var tv=0, m=/(.*)(?:\s|\.)(?:S[0-9]{1,3}.?E[0-9]{1,3}|[0-9]{4}.?[0-9]{2}.?[0-9]{2})(?:\s|\.)/ig.exec(n); // S01E01 or 2019.01.02
			if(m && m[1]) tv=1; else var m=/(.*(?:\s|\.)[0-9]{4})(?:\s|\.)/g.exec(n); // movie
			if(m && m[1]) m[1]=m[1].replace(/\./g,' '); else continue;
			var el=document.createElement('span');
			el.innerHTML='&nbsp;<a target="_blank" title="Search Google" href="https://google.com/search?q='+encodeURIComponent(m[1]+(tv?' TV':'')+' site:imdb.com OR site:rottentomatoes.com OR site:wikipedia.com')+'"><img style="margin:0" height="12" width="12" src="'+gicon+'" /></a>';
			el.innerHTML+='&nbsp;<a title="Search TPB" href="/search/'+encodeURIComponent(m[1])+'/0/99/0"><img style="margin:0" height="13" width="13" src="'+tpbicon+'" /></a>';
			x[i].getElementsByClassName('item-icons')[0].appendChild(el);
		}
	}
	// hide porn search option
	if(document.getElementById('porn')) document.getElementById('porn').parentElement.remove();
	// hide porn browse and top categories
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
