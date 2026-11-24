import{p as I}from"./chunk-JWPE2WC7-DR4cKWDE.js";import{s as _,g as E,q as D,p as F,a as G,b as P,_ as c,G as z,r as B,D as C,A as b,E as W,l as A,K as V,d as H}from"./mermaid.core-BV3pNG7E.js";import{p as j}from"./cynefin-OW5HDTMX-Bhor9YUi.js";import"./index-CNSmQH59.js";var h={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},y=32,M={axes:[],curves:[],options:h},m=structuredClone(M),K=W.radar,U=c(()=>C({...K,...b().radar}),"getConfig"),L=c(()=>m.axes,"getAxes"),X=c(()=>m.curves,"getCurves"),q=c(()=>m.options,"getOptions"),N=c(a=>{m.axes=a.map(t=>{var e;return{name:t.name,label:(e=t.label)!=null?e:t.name}})},"setAxes"),Y=c(a=>{m.curves=a.map(t=>{var e;return{name:t.name,label:(e=t.label)!=null?e:t.name,entries:Z(t.entries)}})},"setCurves"),Z=c(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=L();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(s=>{var n;return((n=s.axis)==null?void 0:n.$refText)===e.name});if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),J=c(a=>{var e,r,s,n,l,o,i,d,p,u;const t=a.reduce((g,x)=>(g[x.name]=x,g),{});m.options={showLegend:(r=(e=t.showLegend)==null?void 0:e.value)!=null?r:h.showLegend,ticks:(n=(s=t.ticks)==null?void 0:s.value)!=null?n:h.ticks,max:(o=(l=t.max)==null?void 0:l.value)!=null?o:h.max,min:(d=(i=t.min)==null?void 0:i.value)!=null?d:h.min,graticule:(u=(p=t.graticule)==null?void 0:p.value)!=null?u:h.graticule},m.options.ticks>y&&(A.warn(`Radar diagram ticks (${m.options.ticks}) exceeds maximum allowed (${y}). Using ${y} instead.`),m.options.ticks=y)},"setOptions"),Q=c(()=>{B(),m=structuredClone(M)},"clear"),f={getAxes:L,getCurves:X,getOptions:q,setAxes:N,setCurves:Y,setOptions:J,getConfig:U,clear:Q,setAccTitle:P,getAccTitle:G,setDiagramTitle:F,getDiagramTitle:D,getAccDescription:E,setAccDescription:_},tt=c(a=>{I(a,f);const{axes:t,curves:e,options:r}=a;f.setAxes(t),f.setCurves(e),f.setOptions(r)},"populate"),et={parse:c(async a=>{const t=await j("radar",a);A.debug(t),tt(t)},"parse")},at=c((a,t,e,r)=>{var $;const s=r.db,n=s.getAxes(),l=s.getCurves(),o=s.getOptions(),i=s.getConfig(),d=s.getDiagramTitle(),p=z(t),u=rt(p,i),g=($=o.max)!=null?$:Math.max(...l.map(w=>Math.max(...w.entries))),x=o.min,v=Math.min(i.width,i.height)/2;st(u,n,v,o.ticks,o.graticule),nt(u,n,v,i),T(u,n,l,x,g,o.graticule,i),O(u,l,o.showLegend,i),u.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-i.height/2-i.marginTop)},"draw"),rt=c((a,t)=>{var n;const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,s={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return H(a,r,e,(n=t.useMaxWidth)!=null?n:!0),a.attr("viewBox",`0 0 ${e} ${r}`).attr("overflow","visible"),a.append("g").attr("transform",`translate(${s.x}, ${s.y})`)},"drawFrame"),st=c((a,t,e,r,s)=>{if(s==="circle")for(let n=0;n<r;n++){const l=e*(n+1)/r;a.append("circle").attr("r",l).attr("class","radarGraticule")}else if(s==="polygon"){const n=t.length;for(let l=0;l<r;l++){const o=e*(l+1)/r,i=t.map((d,p)=>{const u=2*p*Math.PI/n-Math.PI/2,g=o*Math.cos(u),x=o*Math.sin(u);return`${g},${x}`}).join(" ");a.append("polygon").attr("points",i).attr("class","radarGraticule")}}},"drawGraticule"),nt=c((a,t,e,r)=>{const s=t.length;for(let n=0;n<s;n++){const l=t[n].label,o=2*n*Math.PI/s-Math.PI/2,i=Math.cos(o),d=Math.sin(o);a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*i).attr("y2",e*r.axisScaleFactor*d).attr("class","radarAxisLine");const p=i>.01?"start":i<-.01?"end":"middle",u=d>.01?"hanging":d<-.01?"auto":"central",g=4;a.append("text").text(l).attr("x",e*r.axisLabelFactor*i+g*i).attr("y",e*r.axisLabelFactor*d+g*d).attr("text-anchor",p).attr("dominant-baseline",u).attr("class","radarAxisLabel")}},"drawAxes");function T(a,t,e,r,s,n,l){const o=t.length,i=Math.min(l.width,l.height)/2;e.forEach((d,p)=>{if(d.entries.length!==o)return;const u=d.entries.map((g,x)=>{const v=2*Math.PI*x/o-Math.PI/2,$=S(g,r,s,i),w=$*Math.cos(v),R=$*Math.sin(v);return{x:w,y:R}});n==="circle"?a.append("path").attr("d",k(u,l.curveTension)).attr("class",`radarCurve-${p}`):n==="polygon"&&a.append("polygon").attr("points",u.map(g=>`${g.x},${g.y}`).join(" ")).attr("class",`radarCurve-${p}`)})}c(T,"drawCurves");function S(a,t,e,r){const s=Math.min(Math.max(a,t),e);return r*(s-t)/(e-t)}c(S,"relativeRadius");function k(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let s=0;s<e;s++){const n=a[(s-1+e)%e],l=a[s],o=a[(s+1)%e],i=a[(s+2)%e],d={x:l.x+(o.x-n.x)*t,y:l.y+(o.y-n.y)*t},p={x:o.x-(i.x-l.x)*t,y:o.y-(i.y-l.y)*t};r+=` C${d.x},${d.y} ${p.x},${p.y} ${o.x},${o.y}`}return`${r} Z`}c(k,"closedRoundCurve");function O(a,t,e,r){if(!e)return;const s=(r.width/2+r.marginRight)*3/4,n=-(r.height/2+r.marginTop)*3/4,l=20;t.forEach((o,i)=>{const d=a.append("g").attr("transform",`translate(${s}, ${n+i*l})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${i}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(o.label)})}c(O,"drawLegend");var ot={draw:at},it=c((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const s=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${s};
			fill: ${s};
			fill-opacity: ${t.curveOpacity};
			stroke: ${s};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${s};
			fill-opacity: ${t.curveOpacity};
			stroke: ${s};
		}
		`}return e},"genIndexStyles"),lt=c(a=>{const t=V(),e=b(),r=C(t,e.themeVariables),s=C(r.radar,a);return{themeVariables:r,radarOptions:s}},"buildRadarStyleOptions"),ct=c(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=lt(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${it(t,e)}
	`},"styles"),mt={parser:et,db:f,renderer:ot,styles:ct};export{mt as diagram};
