import{r as $,P as C,n as t,B as z,V as R,D as et,T as ot,Q as it,U as P}from"./index-C1jPfLpN.js";import{i as U,I as q,b as nt}from"./axios-Dw95He_a.js";import{h as E}from"./moment-C5S46NFB.js";import{D as at}from"./index-sIQuKxt4.js";import{D as st}from"./index-i1TImK2o.js";import{D as Q}from"./index-CoT1Wun7.js";import{T as J}from"./index-CgWa4Pn3.js";import{L as B}from"./index-Du2AQZIq.js";import{T as X,a as L}from"./index-CwpRQ_G_.js";import{M as tt}from"./index-DvjkD5JD.js";import{E as lt,R as V}from"./jspdf.es.min-DhTILFaM.js";import W from"./html2canvas.esm-CBrSDip1.js";import{c as rt}from"./index-yLuTEnO8.js";import{F as M}from"./Table-Bok0pgkv.js";import{D as A}from"./index-CsFHZ6wQ.js";import{R as dt}from"./MoreOutlined-D8YFwLNU.js";import{R as ct}from"./MessageOutlined-DWhFUyka.js";import{R as pt}from"./ScheduleOutlined-Ds4al24B.js";import{R as gt}from"./EditOutlined-o5ZzG4s9.js";import{P as mt}from"./index-CHyb0mE-.js";import{R as xt}from"./DeleteOutlined-kM8dbmbJ.js";import"./context-sBvRoCxi.js";import"./index-B3ETTD5_.js";import"./InfoCircleFilled-iJivFFhw.js";import"./index-DBEWwzXN.js";const{TextArea:ut}=q,{TabPane:O}=J,{Text:G}=X,ht=({visible:l,onClose:g,quotation:a,refreshQuotations:c})=>{const[u,v]=$.useState(""),[x,m]=$.useState(null),[h,p]=$.useState(!1),[n,f]=$.useState([]),[r,y]=$.useState(null);$.useEffect(()=>{l&&(a!=null&&a._id)&&j()},[l,a]);const j=async()=>{try{const i=await U.get(`/api/quotations/${a._id}/followups`);f(i.data||[])}catch(i){console.error("Failed to fetch follow-ups for quotation:",i),C.error("Failed to fetch follow-ups for this quotation.")}},k=()=>{if(!u||!x){C.error("Please fill in both date and note fields.");return}const i=JSON.parse(localStorage.getItem("user")),s=i==null?void 0:i._id;if(!s){C.error("User information not found. Please log in.");return}p(!0);const I={date:x.format("YYYY-MM-DD"),note:u,addedBy:s};(r===null?U.post(`/api/quotations/${a._id}/followups`,I):U.put(`/api/quotations/${a._id}/followups/${r}`,I)).then(()=>{C.success(r===null?"Follow-up added successfully!":"Follow-up updated successfully!"),v(""),m(null),y(null),j(),c()}).catch(Y=>{var _,H;console.error("Error saving follow-up:",Y),C.error(((H=(_=Y==null?void 0:Y.response)==null?void 0:_.data)==null?void 0:H.message)||"Failed to save follow-up.")}).finally(()=>p(!1))},d=i=>{const s=n[i];v(s.note),m(E(s.date)),y(i)},N=i=>{tt.confirm({title:"Delete Follow-up",content:"Are you sure you want to delete this follow-up? This action cannot be undone.",okText:"Yes, Delete",cancelText:"No",okButtonProps:{danger:!0},onOk:()=>{U.delete(`/api/quotations/${a._id}/followups/${i}`).then(()=>{C.success("Follow-up deleted successfully!"),j(),c()}).catch(s=>{var I,F;console.error("Error deleting follow-up:",s),C.error(((F=(I=s==null?void 0:s.response)==null?void 0:I.data)==null?void 0:F.message)||"Failed to delete follow-up.")})}})},D=E().format("YYYY-MM-DD"),T=[...n].sort((i,s)=>new Date(s.date)-new Date(i.date)),b=T.filter(i=>E(i.date).format("YYYY-MM-DD")===D),w=T.filter(i=>E(i.date).isAfter(D,"day")),e=T.filter(i=>E(i.date).isBefore(D,"day")),o=(i,s)=>{var I,F;return t.jsx(B.Item,{actions:[t.jsx(z,{type:"link",onClick:()=>d(s),children:"Edit"},"edit"),t.jsx(z,{type:"link",danger:!0,onClick:()=>N(s),children:"Delete"},"delete")],children:t.jsxs("div",{children:[t.jsx(G,{strong:!0,children:E(i.date).format("DD-MM-YYYY")}),t.jsx("br",{}),i.note,t.jsx("br",{}),t.jsxs(G,{type:"secondary",children:["By ",((I=i.addedBy)==null?void 0:I.name)||((F=i.addedBy)==null?void 0:F.email)||"Unknown User"]})]})})};return t.jsxs(at,{title:`Follow-ups for Quotation: ${(a==null?void 0:a.quotationNumber)||"N/A"}`,open:l,onClose:()=>{y(null),v(""),m(null),g()},width:720,children:[t.jsxs("div",{style:{marginBottom:20},children:[t.jsx(st,{style:{width:"100%",marginBottom:8},format:"DD-MM-YYYY",value:x,onChange:i=>m(i),placeholder:"Select follow-up date"}),t.jsx(ut,{rows:4,placeholder:"Enter follow-up note",value:u,onChange:i=>v(i.target.value)}),t.jsx(z,{type:"primary",block:!0,onClick:k,loading:h,style:{marginTop:10},children:r===null?"Add Follow-up":"Update Follow-up"})]}),t.jsx(Q,{children:"Existing Follow-ups"}),t.jsxs(J,{defaultActiveKey:"today",children:[t.jsx(O,{tab:`Today's (${b.length})`,children:t.jsx(B,{dataSource:b,renderItem:i=>o(i,n.indexOf(i)),locale:{emptyText:"No follow-ups scheduled for today."}})},"today"),t.jsx(O,{tab:`Upcoming (${w.length})`,children:t.jsx(B,{dataSource:w,renderItem:i=>o(i,n.indexOf(i)),locale:{emptyText:"No upcoming follow-ups."}})},"upcoming"),t.jsx(O,{tab:`Past (${e.length})`,children:t.jsx(B,{dataSource:e,renderItem:i=>o(i,n.indexOf(i)),locale:{emptyText:"No past follow-ups."}})},"past")]})]})},K=l=>`₹${(parseFloat(l)||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`,ft=l=>{if(typeof l!="number"||isNaN(l))return"N/A";let g=Math.floor(l),a=Math.round((l-g)*100);const c=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"],u=["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],v=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],x=["","Thousand","Lakh","Crore"],m=r=>r<10?c[r]:r>=10&&r<20?u[r-10]:v[Math.floor(r/10)]+(r%10!==0?" "+c[r%10]:"");let h=[],p=0;if(g===0)h.push("Zero");else{let r=g%1e3;for(r>0&&(r<100?h.push(m(r)):h.push(c[Math.floor(r/100)]+" Hundred"+(r%100!==0?" "+m(r%100):""))),g=Math.floor(g/1e3);g>0;){let y=g%100;y>0?h.push(m(y)+" "+x[++p]):p++,g=Math.floor(g/100)}}const n=h.reverse().filter(Boolean).join(" ").trim();let f=n?n+" Rupees":"Zero Rupees";return a>0&&(f+=` and ${m(a)} Paisa`),f+=" Only",f.replace(/\s+/g," ")},yt=l=>{var n,f,r,y,j,k;const g=((n=l.items)==null?void 0:n.reduce((d,N)=>d+(N.quantity||0)*(N.rate||0),0))||0,c=g*.18,u=g+c,v=`
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
      <div style="display: flex; align-items: center;">
        <div style="display: flex; margin-right: 15px;">
          <div style="width: 25px; height: 60px; background: #ff6600; margin-right: 2px;"></div>
          <div style="width: 25px; height: 60px; background: #ff6600; margin-right: 2px;"></div>
          <div style="width: 25px; height: 60px; background: #ff6600; margin-right: 10px;"></div>
        </div>

        <div>
          <h2 style="margin: 0; font-size: 18px; font-weight: bold; color: #000; margin-bottom: 5px;">ACE AUTOMATION</h2>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">S.F. No. 91, 14B, Padiveedu Thottam,</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">Kalapatty road, Saravanampatti (PO),</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">Coimbatore - 641 035. TN, INDIA.</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">+91 98422 53389</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">aceautomation.cbe@gmail.com</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">www.aceautomation.in</p>
          <p style="margin: 1px 0; font-size: 10px; color: #333;">GST No. : 33AVDPD3093Q1ZD</p>
        </div>
      </div>

      <div style="background: #ff6600; color: white; padding: 12px 20px; font-weight: bold; font-size: 18px; text-align: center;">
        QUOTATION
      </div>
    </div>
    <div style="border-bottom: 1px solid #ccc; margin-bottom: 15px;"></div>
  `,x=`
    <div style="padding: 15px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; border: 2px solid #000;">
      ${v}

      <div style="margin-bottom: 20px; page-break-inside: avoid;">
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; width: 25%; background: #f9f9f9;">Company Name</td>
            <td style="border: 1px solid #ccc; padding: 6px; width: 25%;">: ${l.businessName||"N/A"}</td>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; width: 25%; background: #f9f9f9;">Date</td>
            <td style="border: 1px solid #ccc; padding: 6px; width: 25%;">: ${l.date?new Date(l.date).toLocaleDateString("en-IN"):new Date().toLocaleDateString("en-IN")}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Contact Person</td>
            <td style="border: 1px solid #ccc; padding: 6px;">: ${l.customerName||"N/A"}</td>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Quotation No</td>
            <td style="border: 1px solid #ccc; padding: 6px;">: ${l.quotationNumber||"N/A"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Contact Number</td>
            <td style="border: 1px solid #ccc; padding: 6px;">: ${l.customerPhone||"N/A"}</td>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Customer GST No.</td>
            <td style="border: 1px solid #ccc; padding: 6px;">: ${l.gstin||"N/A"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Contact Email</td>
            <td style="border: 1px solid #ccc; padding: 6px;" colspan="3">: ${l.customerEmail||"N/A"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; background: #f9f9f9;">Address</td>
            <td style="border: 1px solid #ccc; padding: 6px;" colspan="3">: ${((f=l.businessInfo)==null?void 0:f.replace(/\n/g,"<br>"))||"N/A"}</td>
          </tr>
        </table>
      </div>

      ${((r=l.items)==null?void 0:r.length)>0?`
          <div style="margin-top: 20px; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; table-layout: fixed;">
              <colgroup>
                <col style="width: 8%;"> <col style="width: 32%;"> <col style="width: 15%;"> <col style="width: 22.5%;"> <col style="width: 22.5%;"> </colgroup>
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: center;">S.No</th>
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: left;">Description</th>
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: center;">Quantity</th>
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: right;">Unit Price (Rs.)</th>
                  <th style="border: 1px solid #ccc; padding: 8px; font-size: 12px; font-weight: bold; text-align: right;">Total (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                ${(y=l.items)==null?void 0:y.map((d,N)=>`
                    <tr style="page-break-inside: avoid;">
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: center; vertical-align: top;">${N+1}</td>
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: left; vertical-align: top;">${d.description||"N/A"}</td>
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: center; vertical-align: top;">${parseFloat(d.quantity)||0}</td>
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: right; vertical-align: top;">${K(d.rate||0)}</td>
                      <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; vertical-align: top;">
                        ${K((d.quantity||0)*(d.rate||0))}
                      </td>
                    </tr>
                  `).join("")}
              </tbody>
            </table>
          </div>

          <div style="margin-top: 10px; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr style="page-break-inside: avoid;">
                <td style="width: 70%;"></td> <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; width: 15%; background: #f9f9f9;">Total Amount</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; width: 15%;">₹${g.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
              </tr>
              <tr style="page-break-inside: avoid;">
                <td style="width: 70%;"></td> <td style="border: 1px solid #ccc; padding: 8px; text-align: right; width: 15%; background: #f9f9f9;">GST (18%)</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: right; width: 15%;">₹${c.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
              </tr>
              <tr style="background: #e8f5e8; page-break-inside: avoid;">
                <td style="width: 70%;"></td> <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; font-size: 14px; width: 15%;">Bill Amount <br/> (Total Amount + Tax Value)</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: right; font-weight: bold; font-size: 14px; width: 15%;">₹${u.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 15px; border: 1px solid #ccc; padding: 8px; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr>
                <td style="font-weight: bold; padding: 4px; width: 25%;">Total Amount In Words</td>
                <td style="padding: 4px; font-style: italic; width: 75%;">${ft(u)}</td>
              </tr>
            </table>
          </div>
        `:""}

      <div style="margin-top: 15px; font-size: 11px; page-break-inside: avoid;">
        <p style="margin: 5px 0; font-style: italic;">"We hope that you may satisfy with our prices and the specification. We expect your valuable order in this regard."</p>

        <div style="margin: 10px 0;">
          <p style="margin: 3px 0; font-weight: bold;">With Best Regards</p>
          <p style="margin: 3px 0;">For Ace Automation</p>
        </div>
      </div>

      <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 15px; page-break-inside: avoid;">
        <div style="text-align: right;">
          <p style="margin: 5px 0; font-size: 12px; font-weight: bold;">Authorized Signatory</p>
          <div style="margin-top: 40px; border-bottom: 1px solid #000; width: 200px; margin-left: auto;"></div>
        </div>
      </div>
      <p style="text-align: center; font-size: 10px; color: #666; margin-top: 20px;">Page 1/2</p>
    </div>
  `,m=(j=l.items)==null?void 0:j.filter(d=>d.specifications&&d.specifications.length>0).map(d=>{const D=`- ${d.productName||d.description||"Product"}`,T=d.specifications.map(b=>`
          <tr style="page-break-inside: avoid;">
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; width: 40%; background: #f9f9f9; vertical-align: top;">${b.name||""}</td>
            <td style="border: 1px solid #ccc; padding: 6px; vertical-align: top;">${b.value||""}</td>
          </tr>
        `).join("");return`
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <p style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">PRODUCT SPECIFICATIONS ${D}</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tbody>
              ${T}
            </tbody>
          </table>
        </div>
      `}).join(""),h=l.generalTerms?l.generalTerms.map(d=>`
          <tr style="page-break-inside: avoid;">
            <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold; width: 30%; background: #f9f9f9; vertical-align: top;">${d.name||""}</td>
            <td style="border: 1px solid #ccc; padding: 6px; vertical-align: top;">${d.value||""}</td>
          </tr>
        `).join(""):"",p=`
    <div style="padding: 15px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; border: 2px solid #000;">
      ${v}

      ${m}

      ${((k=l.generalTerms)==null?void 0:k.length)>0?`
          <div style="margin-top: 15px; page-break-inside: avoid;">
            <p style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">GENERAL TERMS</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tbody>
                ${h}
              </tbody>
            </table>
          </div>
        `:""}

      <div style="margin-top: 15px; font-size: 11px; page-break-inside: avoid;">
        <p style="margin: 5px 0; font-style: italic;">"We hope that you may satisfy with our prices and the specification. We expect your valuable order in this regard."</p>

        <div style="margin: 10px 0;">
          <p style="margin: 3px 0; font-weight: bold;">With Best Regards</p>
          <p style="margin: 3px 0;">For Ace Automation</p>
        </div>
      </div>

      <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 15px; page-break-inside: avoid;">
        <div style="text-align: right;">
          <p style="margin: 5px 0; font-size: 12px; font-weight: bold;">Authorized Signatory</p>
          <div style="margin-top: 40px; border-bottom: 1px solid #000; width: 200px; margin-left: auto;"></div>
        </div>
      </div>
      <p style="text-align: center; font-size: 10px; color: #666; margin-top: 20px;">Page 2/2</p>
    </div>
  `;return{page1Html:x,page2Html:p}},Z=async l=>{const g=R.loading("Generating PDF...",{position:"top-center"});let a=null,c=null;try{const{page1Html:u,page2Html:v}=yt(l),x=new lt("p","mm","a4"),m=x.internal.pageSize.getWidth(),h=x.internal.pageSize.getHeight(),p=10;a=document.createElement("div"),a.style.position="fixed",a.style.top="-9999px",a.style.left="-9999px",a.style.width=`${m-2*p}mm`,a.style.padding=`${p}mm`,a.style.background="white",a.style.zIndex="-1",a.style.display="block",a.innerHTML=u,document.body.appendChild(a),await new Promise(w=>setTimeout(w,100));const f=(await W(a,{scale:2,useCORS:!0,logging:!1})).toDataURL("image/png"),r=x.getImageProperties(f),y=r.height*(m-2*p)/r.width;x.addImage(f,"PNG",p,p,m-2*p,y),x.addPage(),c=document.createElement("div"),c.style.position="fixed",c.style.top="-9999px",c.style.left="-9999px",c.style.width=`${m-2*p}mm`,c.style.padding=`${p}mm`,c.style.background="white",c.style.zIndex="-1",c.style.display="block",c.innerHTML=v,document.body.appendChild(c),await new Promise(w=>setTimeout(w,100));const j=await W(c,{scale:2,useCORS:!0,logging:!1}),k=j.toDataURL("image/png"),d=x.getImageProperties(k),N=d.height*(m-2*p)/d.width;let D=p,T=h-2*p,b=0;for(;b<N;){D+T>h&&b>0&&(x.addPage(),D=p);let w=Math.min(T,N-b);x.addImage(k,"PNG",p,D,m-2*p,w,void 0,void 0,"FAST",[0,b,j.width,w*(j.width/(m-2*p))]),D+=w,b+=w}x.save(`${l.quotationNumber||"quotation"}.pdf`),R.success("PDF downloaded successfully!",{id:g})}catch(u){console.error("Failed to generate PDF:",u),R.error("Failed to generate PDF. Please try again.",{id:g})}finally{a&&document.body.contains(a)&&document.body.removeChild(a),c&&document.body.contains(c)&&document.body.removeChild(c)}},{Text:S}=X,_t=({quotations:l,onAddNew:g,onEdit:a,onDelete:c,onSearch:u,onViewNotes:v,loading:x,refreshQuotations:m})=>{var T,b,w;const[h,p]=$.useState(!1),[n,f]=$.useState(null),[r,y]=$.useState(!1),j=e=>{f(e),p(!0),R.success("Quotation details loaded.",{duration:1500,position:"top-right"})},k=e=>{f(e),y(!0)},d=e=>`₹${(parseFloat(e)||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`,N=()=>[{title:"S.No",width:60,align:"center",render:(e,o,i)=>i+1},{title:"Description",dataIndex:"description",ellipsis:!0,render:(e,o)=>{var i;if(!e&&((i=o.specifications)==null?void 0:i.length)>0){const s=o.specifications.find(I=>I.name==="SPECIFICATION");return s?s.value:"N/A"}return e||"N/A"}},{title:"HSN/SAC",dataIndex:"hsnSac",width:100,align:"center",render:e=>e||"N/A"},{title:"Qty",dataIndex:"quantity",width:80,align:"center",render:e=>parseFloat(e)||0},{title:"Unit Price (₹)",width:140,align:"right",render:(e,o)=>d(o.rate||0)},{title:"Total (₹)",width:140,align:"right",render:(e,o)=>t.jsx(S,{strong:!0,style:{color:"#52c41a"},children:d((o.quantity||0)*(o.rate||0))})}],D=[{title:"Quotation #",dataIndex:"quotationNumber",render:e=>t.jsx(L,{color:"blue",children:e||"N/A"}),sorter:(e,o)=>(e.quotationNumber||"").localeCompare(o.quotationNumber||"")},{title:"Business",dataIndex:"businessName",sorter:(e,o)=>(e.businessName||"").localeCompare(o.businessName||"")},{title:"Customer",dataIndex:"customerName",render:(e,o)=>t.jsxs("div",{children:[t.jsx("div",{children:e||"N/A"}),o.customerEmail&&t.jsx("div",{style:{fontSize:12,color:"#666"},children:o.customerEmail})]}),sorter:(e,o)=>(e.customerName||"").localeCompare(o.customerName||"")},{title:"Items Count",render:(e,o)=>{var i,s;return t.jsxs(L,{color:"geekblue",children:[((i=o.items)==null?void 0:i.length)||0," item",(((s=o.items)==null?void 0:s.length)||0)!==1?"s":""]})}},{title:"Latest Note",dataIndex:"notes",render:e=>{if(e&&e.length>0){const o=e[e.length-1],i=o.text.length>30?`${o.text.substring(0,30)}...`:o.text;return t.jsx(ot,{title:o.text,children:t.jsx(S,{type:"secondary",children:i})})}return t.jsx(S,{type:"secondary",italic:!0,children:"No notes"})}},{title:"Total (₹)",dataIndex:"total",render:(e,o)=>{var s;const i=parseFloat(e)||((s=o.items)==null?void 0:s.reduce((I,F)=>I+(F.quantity||0)*(F.rate||0),0))||0;return t.jsx(S,{strong:!0,style:{color:"#52c41a"},children:d(i)})},sorter:(e,o)=>{const i=parseFloat(e.total)||0,s=parseFloat(o.total)||0;return i-s}},{title:"Date",dataIndex:"date",render:e=>{if(!e)return"N/A";try{return new Date(e).toLocaleDateString("en-IN")}catch{return e}},sorter:(e,o)=>{const i=new Date(e.date).getTime()||0,s=new Date(o.date).getTime()||0;return i-s}},{title:"Actions",width:80,render:(e,o)=>t.jsx(it,{overlay:t.jsxs(P,{children:[t.jsx(P.Item,{icon:t.jsx(nt,{}),onClick:()=>j(o),children:"View Details"},"view"),t.jsx(P.Item,{icon:t.jsx(V,{}),onClick:()=>Z(o),children:"Download PDF"},"download"),t.jsx(P.Item,{icon:t.jsx(ct,{}),onClick:()=>{v(o),R.success("Opening notes dialog...",{duration:1500})},children:"View/Add Notes"},"notes"),t.jsx(P.Item,{icon:t.jsx(pt,{}),onClick:()=>k(o),children:"Add/View Follow-ups"},"followups"),t.jsx(P.Item,{icon:t.jsx(gt,{}),onClick:()=>{a(o),R.success("Initiating quotation edit...",{duration:1500})},children:"Edit Quotation"},"edit"),t.jsx(P.Item,{children:t.jsxs(mt,{title:"Are you sure you want to delete this account?",onConfirm:()=>c(o._id),okText:"Yes",cancelText:"No",children:[t.jsx(xt,{}),"Delete Quotation"]})})]}),trigger:["click"],children:t.jsx(z,{icon:t.jsx(dt,{})})})}];return t.jsxs(t.Fragment,{children:[t.jsxs(et,{style:{marginBottom:16,justifyContent:"space-between",width:"100%"},children:[t.jsx(q.Search,{placeholder:"Search by quotation number, business, customer, or notes...",onChange:e=>{u(e.target.value)},style:{width:400},prefix:t.jsx(rt,{}),allowClear:!0}),t.jsx(z,{type:"primary",onClick:()=>{g(),R.success("Prepare to create a new quotation.",{duration:1500})},children:"+ New Quotation"})]}),t.jsx(M,{columns:D,dataSource:l,rowKey:"_id",loading:x,pagination:{pageSize:10,showSizeChanger:!0,showQuickJumper:!0,showTotal:(e,o)=>`${o[0]}-${o[1]} of ${e} quotations`},scroll:{x:1200}}),t.jsx(tt,{title:t.jsxs("div",{children:[t.jsx(S,{strong:!0,children:"Quotation Details"}),n&&t.jsx(L,{color:"blue",style:{marginLeft:8},children:n.quotationNumber})]}),open:h,onCancel:()=>p(!1),footer:[t.jsx(z,{icon:t.jsx(V,{}),onClick:()=>Z(n),children:"Download PDF"},"download"),t.jsx(z,{onClick:()=>p(!1),children:"Close"},"close")],width:1e3,children:n&&t.jsxs("div",{id:`quotation-modal-preview-${n._id}`,children:[t.jsxs(A,{column:2,bordered:!0,size:"small",children:[t.jsx(A.Item,{label:"Quotation Number",children:t.jsx(L,{color:"blue",children:n.quotationNumber||"N/A"})}),t.jsx(A.Item,{label:"Date",children:n.date?new Date(n.date).toLocaleDateString("en-IN"):"N/A"}),t.jsx(A.Item,{label:"Business Name",children:n.businessName||"N/A"}),t.jsx(A.Item,{label:"Customer Name",children:n.customerName||"N/A"}),t.jsx(A.Item,{label:"Customer Email",children:n.customerEmail||"N/A"}),t.jsx(A.Item,{label:"GSTIN",children:t.jsx(S,{code:!0,children:n.gstin||"N/A"})}),t.jsx(A.Item,{label:"Business Info",span:2,children:t.jsx(S,{style:{whiteSpace:"pre-wrap"},children:n.businessInfo||"N/A"})}),t.jsx(A.Item,{label:"Total Amount",span:2,children:t.jsx(S,{style:{fontSize:"18px",fontWeight:"bold",color:"#52c41a"},children:d(n.total||((T=n.items)==null?void 0:T.reduce((e,o)=>e+(o.quantity||0)*(o.rate||0),0))||0)})})]}),((b=n.items)==null?void 0:b.length)>0&&t.jsxs(t.Fragment,{children:[t.jsxs(Q,{orientation:"left",children:["Items (",n.items.length,")"]}),t.jsx(M,{dataSource:n.items,columns:N(),pagination:!1,size:"small",rowKey:(e,o)=>`${n._id}-item-${o}`,bordered:!0,expandable:{expandedRowRender:e=>{var o;return t.jsx("div",{style:{margin:0,padding:0},children:((o=e.specifications)==null?void 0:o.length)>0&&t.jsx(A,{column:1,size:"small",children:e.specifications.filter(i=>i.name!=="SPECIFICATION").map((i,s)=>t.jsx(A.Item,{label:i.name,children:i.value},s))})})},rowExpandable:e=>{var o;return((o=e.specifications)==null?void 0:o.length)>0}},summary:e=>{const o=e.reduce((i,s)=>i+(s.quantity||0)*(s.rate||0),0);return t.jsx(M.Summary,{fixed:!0,children:t.jsxs(M.Summary.Row,{children:[t.jsx(M.Summary.Cell,{index:0,colSpan:5,children:t.jsx(S,{strong:!0,children:"Grand Total:"})}),t.jsx(M.Summary.Cell,{index:5,children:t.jsx(S,{strong:!0,style:{color:"#52c41a"},children:d(o)})})]})})}})]}),((w=n.notes)==null?void 0:w.length)>0&&t.jsxs(t.Fragment,{children:[t.jsxs(Q,{orientation:"left",children:["Notes (",n.notes.length,")"]}),n.notes.map((e,o)=>t.jsxs("div",{style:{marginBottom:12,padding:8,background:"#f5f5f5",borderRadius:4},children:[t.jsxs(S,{italic:!0,children:['"',e.text,'"']}),t.jsx("br",{}),t.jsxs(S,{type:"secondary",style:{fontSize:"0.8em"},children:["— ",e.author," on"," ",e.timestamp||new Date(n.createdAt).toLocaleDateString("en-IN")]})]},o))]})]})}),n&&t.jsx(ht,{visible:r,onClose:()=>y(!1),quotation:n,refreshQuotations:m})]})};export{_t as default};
