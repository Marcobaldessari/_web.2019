function extend(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function createDOMEl(e,t,n){var r=document.createElement(e);return r.className=t||"",r.innerHTML=n||"",r}function RevealFx(e,t){this.el=e,this.options=extend({},this.options),extend(this.options,t),this._init()}document.documentElement.className="js",function(){function e(){document.body.classList.remove("loading"),new RevealFx(document.querySelector("#rev-1"),{revealSettings:{backgroundColor:"#004DC6",onCover:function(e,t){e.style.opacity=1}}}).reveal(),new RevealFx(document.querySelector("#rev-2"),{revealSettings:{backgroundColor:"#004DC6",delay:.25,onCover:function(e,t){e.style.opacity=1}}}).reveal(),new RevealFx(document.querySelector("#rev-3"),{revealSettings:{backgroundColor:"#004DC6",delay:.5,onCover:function(e,t){e.style.opacity=1}}}).reveal(),new RevealFx(document.querySelector("#rev-4"),{revealSettings:{backgroundColor:"#004DC6",delay:.75,onCover:function(e,t){e.style.opacity=1}}}).reveal()}setTimeout(e,1e3)}(),RevealFx.prototype.options={isContentHidden:!0,revealSettings:{direction:"lr",backgroundColor:"#f0f0f0",duration:.5,easing:"Quint.easeInOut",coverArea:0,onCover:function(e,t){return!1},onStart:function(e,t){return!1},onComplete:function(e,t){return!1}}},RevealFx.prototype._init=function(){this._layout()},RevealFx.prototype._layout=function(){this.content=createDOMEl("div","block-revealer__content",this.el.innerHTML),this.options.isContentHidden&&(this.content.style.opacity=0),this.revealer=createDOMEl("div","block-revealer__element"),this.el.classList.add("block-revealer"),this.el.innerHTML="",this.el.appendChild(this.content),this.el.appendChild(this.revealer)},RevealFx.prototype._getTransformSettings=function(e){var t,n,r;switch(e){case"lr":t="scale3d(0,1,1)",n="0 50%",r="100% 50%";break;case"rl":t="scale3d(0,1,1)",n="100% 50%",r="0 50%";break;case"tb":t="scale3d(1,0,1)",n="50% 0",r="50% 100%";break;case"bt":t="scale3d(1,0,1)",n="50% 100%",r="50% 0";break;default:t="scale3d(0,1,1)",n="0 50%",r="100% 50%";break}return{val:t,origin:{initial:n,halfway:r}}},RevealFx.prototype.reveal=function(e){if(this.isAnimating)return!1;this.isAnimating=!0;var t={duration:.5,easing:"Quint.easeInOut",delay:0,backgroundColor:"#f0f0f0",direction:"lr",coverArea:0},e=e||this.options.revealSettings,n=e.direction||t.direction,r=this._getTransformSettings(n);this.revealer.style.WebkitTransform=this.revealer.style.transform=r.val,this.revealer.style.WebkitTransformOrigin=this.revealer.style.transformOrigin=r.origin.initial,this.revealer.style.backgroundColor=e.backgroundColor||t.backgroundColor,this.revealer.style.opacity=1;var o=this,a=e.duration||t.duration,i=this.revealer,l={},s={},c={delay:e.delay||t.delay,ease:e.easing||t.easing,onComplete:function(){o.revealer.style.WebkitTransformOrigin=o.revealer.style.transformOrigin=r.origin.halfway,"function"==typeof e.onCover&&e.onCover(o.content,o.revealer),TweenMax.fromTo(i,a,s,v)}},v={ease:e.easing||t.easing,onComplete:function(){o.isAnimating=!1,"function"==typeof e.onComplete&&e.onComplete(o.content,o.revealer)}},u=e.coverArea||t.coverArea;"lr"===n||"rl"===n?(l.scaleX=0,c.scaleX=1,s.scaleX=1,v.scaleX=u/100):(l.scaleY=0,c.scaleY=1,s.scaleY=1,v.scaleY=u/100),"function"==typeof e.onStart&&e.onStart(o.content,o.revealer),TweenMax.fromTo(i,a,l,c)},window.RevealFx=RevealFx;