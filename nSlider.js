/*  Kullanım:

// divID, width, height, liste[[pic,link],[pic,link] ...]
var liste = [ ["resimadresi","bağlantı"], ["resimadresi","bağlantı"], ]
var yenislider = new nSlider("sliderbox1","auto",457,liste);

*/

/*  CSS
  |-nSlider
  |-|-- nSlider-nav
  |-|--|-- nSlider-nav-item
 */

// divID, width, height, liste[[pic,link],[pic,link] ...]
export class nSlider{
  constructor(id,width,height, liste){
    var self = this;
    this.liste = liste;
    this.activeNo = 0;
    this.onfocus = false;
    this.onfocusbg = "rgba(0,0,0,1)";
    this.unfocusbg = "rgba(50,50,50,0.3)";
    var oran = height/width;
    console.log( );
    // Büyük box özellikleri
    this.self = document.getElementById(id);
    this.className = "nSlider";
    this.self.baba = this;
    this.self.style.width = width+"px";
    this.self.style.height = height+"px";
    this.self.style.background = "url("+liste[0][0]+")";
    //this.self.style.backgroundRepeat = "no-repeat";
    this.self.style.backgroundSize = "100% 100%";
    this.self.addEventListener("click", this.event_href);
    this.self.addEventListener("touchstart", this.event_touch);

    // Bar
    this.bar = document.createElement("div");
    this.bar.className="nSlider-nav";
    this.bar.style.width = this.liste.length*24 + "px";
    this.bar.style.height = "14px";
    this.bar.style.margin = "0 auto";
    this.self.appendChild(this.bar);
    for(let i=0; i<this.liste.length; i++){
      let x = document.createElement("div");
      x.className="nSlider-nav-item";
      x.no = i;
      x.baba = this;
      x.style.width = "12px";
      x.style.height = "12px";
      x.style.border = "1px solid rgba(200,200,200,0.4)";
      x.style.borderRadius = "14px";
      x.style.background = "rgba(50,50,50,0.3)";
      x.style.float = "left";
      x.style.margin = "0 5px";
      this.bar.appendChild(x);
      x.addEventListener("mouseover", this.event_focus);
      x.addEventListener("mouseout", this.event_unfocus);
      x.addEventListener("click", this.event_href);
    }

    setInterval(function(){ if(!self.onfocus){ self.safe_focus(1);} },4000);
  }

  event_focus(){
    this.baba.activeNo = this.no;
    this.baba.onfocus = true;
    this.baba.focus();
  }

  event_unfocus(){  this.baba.onfocus = false; }

  safe_focus(o){
    this.activeNo += o;
    if(this.activeNo>=this.liste.length){ this.activeNo = 0; } 
    else if(0>this.activeNo){             this.activeNo = this.liste.length-1 }
    this.focus();
  }
  focus(){
    for(let i in this.bar.children){
      if(isNaN(i)){continue;}
      if(this.activeNo == i){
        this.bar.children[i].style.background = this.onfocusbg;
        this.self.style.background = "url("+ this.liste[this.activeNo][0] + ")";
        this.self.style.backgroundSize = "100% 100%";
      }else{
        this.bar.children[i].style.background = this.unfocusbg;
      }
    }
  }

  event_href(){
    window.location.href=this.baba.liste[this.baba.activeNo][1];
  }

  event_touch(e){
    var posX = e.touches[0].clientX;
    var self = this.baba;
    self.onfocus = true;
    window.addEventListener("touchend",event_touchend);
    function event_touchend(e){
      if(!self.onfocus){return}
      self.onfocus = false;
      //setTimeout(function(){},500);
      
      let u = posX - e.changedTouches[0].clientX;
      console.log(u);
      if(u>50){ self.safe_focus(+1); }
      else if(u<-50){ self.safe_focus(-1); }
    }
  }
}
