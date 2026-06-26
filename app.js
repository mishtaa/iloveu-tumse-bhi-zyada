var ANN=new Date('2025-06-26T00:00:00+05:30');
var gd=document.getElementById('gd');
var timerMode='together',lbIdx=0,curSong=-1,curMood='all';
var mpOpen=false,mpPlaying=false,mpCur=0;
var ytPlayer=null,ytReady=false;
var gData=[
  {src:'photos/photo4.jpg',title:'First of Many Garba',note:'June 26 2025 - I still remember how excited you were to go. The world felt smaller, warmer - and us, inevitable.'},
  {src:'photos/photo3.jpg',title:'Home in Each Other',note:'The lazy days, the soft laughter, the warmth of being completely at ease with someone.'},
  {src:'photos/photo5.jpg',title:'The Way She Glows',note:'She does not need the sun - she carries her own light. Every frame of her is a painting.'},
  {src:'photos/photo1.jpg',title:'Every Occasion, Better Together',note:'I wish I danced with you on that day.'},
  {src:'photos/photo2.jpg',title:'Just Us Being Us',note:'No words needed... just us being us. I love those eyes.'},
  {src:'photos/photo6.jpg',title:'Always Us',note:'Iss din bhi ladd le this tuk.'},
  {src:'photos/photo7.jpg',title:'The Night Belonged to Us',note:'I loves today very very much... I waited so long for this.'},
  {src:'photos/photo8.jpg',title:'Rest Your Head Here',note:'That quiet where she leans on you and time slows down - no rush, no worries.'},
  {src:'photos/photo9.jpg',title:'hihihihi',note:'Nothing much to write.... the food was good.'}
];
var mpSongs=[
  {title:'Until I Found You',artist:'Stephen Sanchez',id:'Mu2DRo4hZPM',dur:231},
  {title:'Yeh Fitoor Mera',artist:'Arijit Singh',id:'SRsoxbJhMZM',dur:318}
];
var songs=[
  {n:'Until I Found You',a:'Stephen Sanchez',d:'3:51',m:'romantic',url:'https://www.youtube.com/results?search_query=Until+I+Found+You+Stephen+Sanchez'},
  {n:'Yeh Fitoor Mera',a:'Arijit Singh',d:'5:18',m:'romantic',url:'https://www.youtube.com/results?search_query=Yeh+Fitoor+Mera+Arijit+Singh'},
  {n:'Lag Ja Gale',a:'Lata Mangeshkar',d:'3:28',m:'classic',url:'https://www.youtube.com/results?search_query=Lag+Ja+Gale+Lata+Mangeshkar'},
  {n:'Ajeeb Dastan Hai Yeh',a:'Lata Mangeshkar',d:'4:12',m:'nostalgic',url:'https://www.youtube.com/results?search_query=Ajeeb+Dastan+Hai+Yeh'},
  {n:'Pehla Nasha',a:'Udit Narayan',d:'5:01',m:'romantic',url:'https://www.youtube.com/results?search_query=Pehla+Nasha+film'},
  {n:'Tujh Mein Rab Dikhta Hai',a:'Roop Kumar Rathod',d:'5:15',m:'romantic',url:'https://www.youtube.com/results?search_query=Tujh+Mein+Rab+Dikhta+Hai'},
  {n:'Ae Dil Hai Mushkil',a:'Arijit Singh',d:'4:48',m:'cozy',url:'https://www.youtube.com/results?search_query=Ae+Dil+Hai+Mushkil'},
  {n:'Tere Liye',a:'Atif Aslam',d:'5:22',m:'romantic',url:'https://www.youtube.com/results?search_query=Tere+Liye+Atif+Aslam'},
  {n:'Woh Lamhe',a:'Atif Aslam',d:'4:36',m:'nostalgic',url:'https://www.youtube.com/results?search_query=Woh+Lamhe+Atif+Aslam'},
  {n:'Luka Chhupi',a:'Lata Mangeshkar',d:'4:55',m:'classic',url:'https://www.youtube.com/results?search_query=Luka+Chhupi+Lata+Mangeshkar'},
  {n:'Main Tenu Samjhawan Ki',a:'Shreya Ghoshal',d:'4:20',m:'nostalgic',url:'https://www.youtube.com/results?search_query=Main+Tenu+Samjhawan+Ki'},
  {n:'O Re Piya',a:'Rahat Fateh Ali Khan',d:'5:40',m:'classic',url:'https://www.youtube.com/results?search_query=O+Re+Piya'},
  {n:'Tu Hi Re',a:'Hariharan',d:'5:18',m:'romantic',url:'https://www.youtube.com/results?search_query=Tu+Hi+Re+Bombay'},
  {n:'Tum Se Hi',a:'Mohit Chauhan',d:'4:42',m:'cozy',url:'https://www.youtube.com/results?search_query=Tum+Se+Hi+Jab+We+Met'},
  {n:'Dil Diyan Gallan',a:'Atif Aslam',d:'4:15',m:'romantic',url:'https://www.youtube.com/results?search_query=Dil+Diyan+Gallan'},
  {n:'Kabhi Kabhi Mere Dil Mein',a:'Lata Mangeshkar',d:'6:30',m:'classic',url:'https://www.youtube.com/results?search_query=Kabhi+Kabhi+Mere+Dil+Mein'},
  {n:'Channa Mereya',a:'Arijit Singh',d:'4:49',m:'nostalgic',url:'https://www.youtube.com/results?search_query=Channa+Mereya+Arijit+Singh'}
];

function initSplashParticles(){
  var c=document.getElementById('spParts'),syms=['\u2665','\u2764','\u2661','\u273F','\u2736'];
  for(var i=0;i<28;i++){var e=document.createElement('div');e.className='sp';e.textContent=syms[Math.floor(Math.random()*syms.length)];e.style.cssText='left:'+(Math.random()*100)+'%;font-size:'+(8+Math.random()*16)+'px;color:'+(Math.random()>.6?'#c9647a':'#d4a96a')+';animation-duration:'+(9+Math.random()*13)+'s;animation-delay:'+(Math.random()*12)+'s;';c.appendChild(e);}
}

function dismissSplash(){
  var sp=document.getElementById('splash');
  if(sp.classList.contains('hidden'))return;
  sp.classList.add('hidden');
  launchConfetti();
  setTimeout(function(){
    if(ytReady&&ytPlayer){ytPlayer.setVolume(72);ytPlayer.playVideo();mpPlaying=true;mpUpdateUI();setTimeout(function(){mpOpen=true;document.getElementById('mpPanel').classList.add('open');},800);}
    else{setTimeout(arguments.callee,400);}
  },900);
}
document.getElementById('splash').addEventListener('click',dismissSplash);

function onYouTubeIframeAPIReady(){
  ytPlayer=new YT.Player('yt-player',{
    height:'1',width:'1',videoId:mpSongs[0].id,
    playerVars:{autoplay:0,controls:0,disablekb:1,fs:0,rel:0},
    events:{
      onReady:function(e){ytReady=true;e.target.setVolume(72);},
      onStateChange:function(e){if(e.data===0){mpCur=(mpCur+1)%mpSongs.length;ytPlayer.loadVideoById(mpSongs[mpCur].id);if(mpPlaying)ytPlayer.playVideo();mpUpdateUI();}}
    }
  });
}
(function(){var t=document.createElement('script');t.src='https://www.youtube.com/iframe_api';document.body.appendChild(t);})();

function mpTogglePanel(){mpOpen=!mpOpen;document.getElementById('mpPanel').classList.toggle('open',mpOpen);}
function mpUpdateUI(){
  var s=mpSongs[mpCur];
  document.getElementById('mpTitle').textContent=s.title;
  document.getElementById('mpArtist').textContent=s.artist;
  document.getElementById('mpPB').innerHTML=mpPlaying?'&#9646;&#9646;':'&#9654;';
  document.getElementById('mpPanel').classList.toggle('paused',!mpPlaying);
  var p=document.getElementById('mpProg');
  p.style.animation='none';p.style.width='0';void p.offsetWidth;
  if(mpPlaying){p.style.setProperty('--dur',s.dur+'s');p.className='mp-prog run';}
}
function mpToggle(){if(!ytPlayer||!ytReady)return;if(mpPlaying){ytPlayer.pauseVideo();mpPlaying=false;}else{ytPlayer.playVideo();mpPlaying=true;}mpUpdateUI();}
function mpNext(){mpCur=(mpCur+1)%mpSongs.length;if(ytPlayer&&ytReady){ytPlayer.loadVideoById(mpSongs[mpCur].id);if(mpPlaying)ytPlayer.playVideo();}mpUpdateUI();}
function mpPrev(){mpCur=(mpCur-1+mpSongs.length)%mpSongs.length;if(ytPlayer&&ytReady){ytPlayer.loadVideoById(mpSongs[mpCur].id);if(mpPlaying)ytPlayer.playVideo();}mpUpdateUI();}
function mpVol(v){if(ytPlayer&&ytReady)ytPlayer.setVolume(v);}

document.addEventListener('mousemove',function(e){gd.style.transform='translate('+(e.clientX-140)+'px,'+(e.clientY-140)+'px)';});
var _st=0;
document.addEventListener('mousemove',function(e){
  if(Date.now()-_st<90)return;_st=Date.now();if(Math.random()>.55)return;
  var s=document.createElement('div');s.className='sparkle';
  s.textContent=['\u2736','\u273F','\u2661','\u00B7','\u2726'][Math.floor(Math.random()*5)];
  s.style.cssText='left:'+e.clientX+'px;top:'+e.clientY+'px;color:'+(Math.random()>.5?'#c9647a':'#d4a96a')+';';
  document.body.appendChild(s);setTimeout(function(){s.remove();},900);
});

function launchConfetti(){
  var cols=['#c9647a','#d4a96a','#e8899a','#f5ede4','#e8c898','#b05068'];
  for(var i=0;i<100;i++){(function(i){setTimeout(function(){
    var c=document.createElement('div');c.className='cfp';
    var col=cols[Math.floor(Math.random()*cols.length)];
    var w=5+Math.random()*9,h=w*(Math.random()>.5?.4:1);
    c.style.cssText='left:'+(8+Math.random()*84)+'vw;top:-10px;width:'+w+'px;height:'+h+'px;background:'+col+';animation-duration:'+(2+Math.random()*2.5)+'s;animation-delay:'+(Math.random()*.6)+'s;';
    document.body.appendChild(c);setTimeout(function(){c.remove();},5000);
  },i*20);})(i);}
}

window.addEventListener('scroll',function(){document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);});
function toggleMobile(){document.getElementById('ham').classList.toggle('open');document.getElementById('mmenu').classList.toggle('open');}
function closeMobile(){document.getElementById('ham').classList.remove('open');document.getElementById('mmenu').classList.remove('open');}

function setMode(m){timerMode=m;document.querySelectorAll('.ttab').forEach(function(t,i){t.classList.toggle('active',(i===0&&m==='together')||(i===1&&m==='milestone'));});document.getElementById('tmsg').textContent=m==='together'?'Every second with you has been a gift, Mishtee \uD83C\uDF19':'45 years of us \u2014 the greatest adventure \uD83D\uDC95';}
function updTimer(){
  var now=new Date();
  var diff=timerMode==='together'?now-ANN:(new Date(ANN.getFullYear()+45,ANN.getMonth(),ANN.getDate()))-now;
  if(diff<0)diff=0;var ts=Math.floor(diff/1000);
  var yy=Math.floor(ts/(86400*365)),dd=Math.floor(ts/86400)%365,hh=Math.floor(ts/3600)%24,mm=Math.floor(ts/60)%60;
  function sn(id,v){var el=document.getElementById(id);if(el&&el.textContent!==v){el.textContent=v;el.classList.remove('flip');void el.offsetWidth;el.classList.add('flip');}}
  sn('ty',String(yy).padStart(2,'0'));sn('td2',String(dd).padStart(3,'0'));sn('th',String(hh).padStart(2,'0'));sn('tm',String(mm).padStart(2,'0'));
  var daysTog=Math.floor((now-ANN)/86400000);var sd=document.getElementById('statDays');if(sd)sd.textContent=daysTog;
}
updTimer();setInterval(updTimer,1000);

function openLB(i){lbIdx=i;document.getElementById('lbimg').src=gData[i].src;document.getElementById('lbtitle').textContent=gData[i].title;document.getElementById('lbnote').textContent=gData[i].note;document.getElementById('lb').classList.add('open');document.body.style.overflow='hidden';}
function closeLB(){document.getElementById('lb').classList.remove('open');document.body.style.overflow='';}
function lbBg(e){if(e.target===document.getElementById('lb'))closeLB();}
function lbNav(d){openLB((lbIdx+d+gData.length)%gData.length);}
document.addEventListener('keydown',function(e){if(!document.getElementById('lb').classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')lbNav(-1);if(e.key==='ArrowRight')lbNav(1);});

function getFilt(){return curMood==='all'?songs:songs.filter(function(s){return s.m===curMood;});}
function renderSongs(list){
  var el=document.getElementById('sl');el.innerHTML='';
  list.forEach(function(s,i){
    var d=document.createElement('div');d.className='si'+(curSong===i?' playing':'');d.style.transitionDelay=(i*.04)+'s';
    var eqH=curSong===i?'<div class="eq"><div class="eqb" style="--h:12px;--d:.5s;--dl:0s"></div><div class="eqb" style="--h:16px;--d:.7s;--dl:.1s"></div><div class="eqb" style="--h:10px;--d:.6s;--dl:.2s"></div></div>':'\u25BA';
    d.innerHTML='<div class="snum">'+String(i+1).padStart(2,'0')+'</div><div class="spi">'+eqH+'</div><div class="sinfo"><span class="sname">'+s.n+'</span><span class="sartist">'+s.a+'</span></div><span class="shrt">\u2665</span><span class="sdur">'+s.d+'</span>';
    (function(sg,idx){d.onclick=function(){window.open(sg.url,'_blank');curSong=idx;renderSongs(getFilt());};})(s,i);
    el.appendChild(d);setTimeout(function(){d.classList.add('visible');},40*i);
  });
}
function filter(m,btn){curMood=m;curSong=-1;document.querySelectorAll('.mc').forEach(function(c){c.classList.remove('active');});btn.classList.add('active');renderSongs(getFilt());}
function shuffle(){var list=getFilt().slice();for(var i=list.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=list[i];list[i]=list[j];list[j]=t;}curSong=-1;renderSongs(list);}

var NK='tm_notes_v1';
function getNotes(){try{return JSON.parse(localStorage.getItem(NK)||'[]');}catch(e){return[];}}
function saveNotes(a){localStorage.setItem(NK,JSON.stringify(a));}
function saveNote(){var txt=document.getElementById('noteText').value.trim();var name=document.getElementById('noteName').value.trim()||'Tarun';if(!txt)return;var notes=getNotes();notes.unshift({id:Date.now(),text:txt,from:name,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})});saveNotes(notes);document.getElementById('noteText').value='';renderNotes();}
function deleteNote(id){saveNotes(getNotes().filter(function(n){return n.id!==id;}));renderNotes();}
function renderNotes(){var grid=document.getElementById('notesGrid');var notes=getNotes();if(!notes.length){grid.innerHTML='<div class="notes-empty">No notes yet \u2014 write the first one \u2665</div>';return;}grid.innerHTML='';notes.forEach(function(n){var c=document.createElement('div');c.className='note-card';c.innerHTML='<div class="note-text">'+escHtml(n.text)+'</div><div class="note-meta"><span class="note-from">from '+escHtml(n.from)+'</span><span class="note-date">'+n.date+'</span><button class="note-del" onclick="deleteNote('+n.id+')">&#x2715;</button></div>';grid.appendChild(c);});}
function escHtml(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>');}
document.getElementById('noteText').addEventListener('keydown',function(e){if(e.ctrlKey&&e.key==='Enter')saveNote();});

var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.08,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal,.tli,.gi').forEach(function(el){obs.observe(el);});

(function(){var pf=document.getElementById('pf'),syms=['\u2665','\u2764','\u2661','\u2736','\u273F'];for(var i=0;i<28;i++){var e=document.createElement('div');e.className='hp';e.textContent=syms[Math.floor(Math.random()*syms.length)];e.style.cssText='left:'+(Math.random()*100)+'%;--d:'+(7+Math.random()*11)+'s;--dl:'+(Math.random()*16)+'s;--dx:'+((Math.random()-.5)*90)+'px;--op:'+(0.1+Math.random()*.25)+';--sz:'+(10+Math.random()*15)+'px;color:'+(Math.random()>.6?'#c9647a':'#d4a96a')+';';pf.appendChild(e);}})();

initSplashParticles();
renderSongs(songs);
renderNotes();
