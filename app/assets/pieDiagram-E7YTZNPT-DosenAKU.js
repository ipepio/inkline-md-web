import{p as at}from"./chunk-JWPE2WC7-DR4cKWDE.js";import{g as rt,s as it,a as nt,b as st,q as ot,p as lt,_ as l,l as R,c as ct,D as dt,G as gt,H as pt,I as q,d as ht,r as ft,J as ut,E as mt}from"./mermaid.core-BV3pNG7E.js";import{p as vt}from"./cynefin-OW5HDTMX-Bhor9YUi.js";import{o as xt}from"./d3-scale-dt9J1MbY.js";import"./index-CNSmQH59.js";var St=mt.pie,H={sections:new Map,showData:!1},b=H.sections,L=H.showData,wt=structuredClone(St),$t=l(()=>structuredClone(wt),"getConfig"),Ct=l(()=>{b=new Map,L=H.showData,ft()},"clear"),Dt=l(({label:t,value:r})=>{if(r<0)throw new Error(`"${t}" has invalid value: ${r}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);b.has(t)||(b.set(t,r),R.debug(`added new section: ${t}, with value: ${r}`))},"addSection"),yt=l(()=>b,"getSections"),Tt=l(t=>{L=t},"setShowData"),bt=l(()=>L,"getShowData"),J={getConfig:$t,clear:Ct,setDiagramTitle:lt,getDiagramTitle:ot,setAccTitle:st,getAccTitle:nt,setAccDescription:it,getAccDescription:rt,addSection:Dt,getSections:yt,setShowData:Tt,getShowData:bt},At=l((t,r)=>{at(t,r),r.setShowData(t.showData),t.sections.map(r.addSection)},"populateDb"),_t={parse:l(async t=>{const r=await vt("pie",t);R.debug(r),At(r,J)},"parse")},kt=l(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),Et=kt,zt=l(t=>{const r=[...t.values()].reduce((s,m)=>s+m,0),F=[...t.entries()].map(([s,m])=>({label:s,value:m})).filter(s=>s.value/r*100>=1);return ut().value(s=>s.value).sort(null)(F)},"createPieArcs"),Rt=l((t,r,F,G)=>{var N,U;R.debug(`rendering pie chart
`+t);const s=G.db,m=ct(),h=dt(s.getConfig(),m.pie),M=40,i=18,c=4,$=450,x=$,A=gt(r),C=A.append("g");C.attr("transform","translate("+x/2+","+$/2+")");const{themeVariables:n}=m;let[D]=pt(n.pieOuterStrokeWidth);D!=null||(D=2);const V=h.legendPosition,O=h.textPosition,X=h.donutHole>0&&h.donutHole<=.9?h.donutHole:0,f=Math.min(x,$)/2-M,Z=q().innerRadius(X*f).outerRadius(f),j=q().innerRadius(f*O).outerRadius(f*O),S=C.append("g");S.append("circle").attr("cx",0).attr("cy",0).attr("r",f+D/2).attr("class","pieOuterCircle");const y=s.getSections(),K=zt(y),Q=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12];let _=0;y.forEach(e=>{_+=e});const P=K.filter(e=>(e.data.value/_*100).toFixed(0)!=="0"),k=xt(Q).domain([...y.keys()]);S.selectAll("mySlices").data(P).enter().append("path").attr("d",Z).attr("fill",e=>k(e.data.label)).attr("class",e=>{let a="pieCircle";return h.highlightSlice==="hover"?a+=" highlightedOnHover":h.highlightSlice===e.data.label&&(a+=" highlighted"),a}),S.selectAll("mySlices").data(P).enter().append("text").text(e=>(e.data.value/_*100).toFixed(0)+"%").attr("transform",e=>"translate("+j.centroid(e)+")").style("text-anchor","middle").attr("class","slice");const Y=C.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),w=[...y.entries()].map(([e,a])=>({label:e,value:a})),u=C.selectAll(".legend").data(w).enter().append("g").attr("class","legend");u.append("rect").attr("width",i).attr("height",i).style("fill",e=>k(e.label)).style("stroke",e=>k(e.label)),u.append("text").attr("x",i+c).attr("y",i-c).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);const v=Math.max(...u.selectAll("text").nodes().map(e=>{var a;return(a=e==null?void 0:e.getBoundingClientRect().width)!=null?a:0}));let T=$,E=x+M;const o=i+c,z=w.length*o;switch(V){case"center":u.attr("transform",(e,a)=>{const d=o*w.length/2,g=-v/2-(i+c),p=a*o-d;return"translate("+g+","+p+")"});break;case"top":T+=z,u.attr("transform",(e,a)=>{const d=f,g=-v/2-(i+c),p=a*o-d;return`translate(${g}, ${p})`}),S.attr("transform",()=>`translate(0, ${z+o})`);break;case"bottom":T+=z,u.attr("transform",(e,a)=>{const d=-f-o,g=-v/2-(i+c),p=a*o-d;return"translate("+g+","+p+")"});break;case"left":E+=i+c+v,u.attr("transform",(e,a)=>{const d=o*w.length/2,g=-f-(i+c),p=a*o-d;return"translate("+g+","+p+")"}),S.attr("transform",()=>`translate(${v+i+c}, 0)`);break;case"right":default:E+=i+c+v,u.attr("transform",(e,a)=>{const d=o*w.length/2,g=12*i,p=a*o-d;return"translate("+g+","+p+")"});break}const W=(U=(N=Y.node())==null?void 0:N.getBoundingClientRect().width)!=null?U:0,tt=x/2-W/2,et=x/2+W/2,B=Math.min(0,tt),I=Math.max(E,et)-B;A.attr("viewBox",`${B} 0 ${I} ${T}`),ht(A,T,I,h.useMaxWidth)},"draw"),Ht={draw:Rt},Wt={parser:_t,db:J,renderer:Ht,styles:Et};export{Wt as diagram};
