import{r as A,P as C,n as e,B as P,V as z,Q as te,D as oe,T as ie,U as re,W as F}from"./index-oy8H7GhK.js";import{i as O,c as ne}from"./axios-BiOpeFGb.js";import{h as R}from"./moment-C5S46NFB.js";import{D as ae}from"./index-3-7Akoh_.js";import{D as se}from"./index-DpE6QBp4.js";import{I as J,b as le}from"./index-Bkpz4I_k.js";import{D as Q}from"./index-BzVPwHj-.js";import{T as q}from"./index-BGnynlHZ.js";import{L}from"./index-C3FlEFpF.js";import{T as X,a as Y}from"./index-DWKoXI_S.js";import{M as ee}from"./index-CMS7sgU5.js";import{E as de,R as W}from"./jspdf.es.min-DoQ0mABm.js";import G from"./html2canvas.esm-CBrSDip1.js";import{F as E}from"./Table-DLetv4hn.js";import{D as I}from"./index-C8i9XLQD.js";import{R as pe}from"./MoreOutlined-BhnvODNW.js";import{R as ce}from"./MessageOutlined-D4SPUo8E.js";import{R as ge}from"./ScheduleOutlined-XOMqEgwi.js";import{R as xe}from"./EditOutlined-fa2CxQZe.js";import{P as ue}from"./index-NHDmPbT4.js";import{R as me}from"./DeleteOutlined-CgFrUMoj.js";import"./context-CT2fN7CI.js";import"./index-D9k2VRo4.js";import"./InfoCircleFilled-DqLvjjp1.js";import"./index-DHoVrESs.js";const{TextArea:fe}=J,{TabPane:B}=q,{Text:K}=X,he=({visible:n,onClose:g,quotation:a,refreshQuotations:d})=>{const[m,y]=A.useState(""),[u,x]=A.useState(null),[b,c]=A.useState(!1),[r,h]=A.useState([]),[l,f]=A.useState(null);A.useEffect(()=>{n&&(a!=null&&a._id)&&S()},[n,a]);const S=async()=>{try{const i=await O.get(`/api/quotations/${a._id}/followups`);h(i.data||[])}catch(i){console.error("Failed to fetch follow-ups for quotation:",i),C.error("Failed to fetch follow-ups for this quotation.")}},D=()=>{if(!m||!u){C.error("Please fill in both date and note fields.");return}const i=JSON.parse(localStorage.getItem("user")),s=i==null?void 0:i._id;if(!s){C.error("User information not found. Please log in.");return}c(!0);const v={date:u.format("YYYY-MM-DD"),note:m,addedBy:s};(l===null?O.post(`/api/quotations/${a._id}/followups`,v):O.put(`/api/quotations/${a._id}/followups/${l}`,v)).then(()=>{C.success(l===null?"Follow-up added successfully!":"Follow-up updated successfully!"),y(""),x(null),f(null),S(),d()}).catch(_=>{var H,V;console.error("Error saving follow-up:",_),C.error(((V=(H=_==null?void 0:_.response)==null?void 0:H.data)==null?void 0:V.message)||"Failed to save follow-up.")}).finally(()=>c(!1))},p=i=>{const s=r[i];y(s.note),x(R(s.date)),f(i)},w=i=>{ee.confirm({title:"Delete Follow-up",content:"Are you sure you want to delete this follow-up? This action cannot be undone.",okText:"Yes, Delete",cancelText:"No",okButtonProps:{danger:!0},onOk:()=>{O.delete(`/api/quotations/${a._id}/followups/${i}`).then(()=>{C.success("Follow-up deleted successfully!"),S(),d()}).catch(s=>{var v,T;console.error("Error deleting follow-up:",s),C.error(((T=(v=s==null?void 0:s.response)==null?void 0:v.data)==null?void 0:T.message)||"Failed to delete follow-up.")})}})},N=R().format("YYYY-MM-DD"),$=[...r].sort((i,s)=>new Date(s.date)-new Date(i.date)),k=$.filter(i=>R(i.date).format("YYYY-MM-DD")===N),U=$.filter(i=>R(i.date).isAfter(N,"day")),t=$.filter(i=>R(i.date).isBefore(N,"day")),o=(i,s)=>{var v,T;return e.jsx(L.Item,{actions:[e.jsx(P,{type:"link",onClick:()=>p(s),children:"Edit"},"edit"),e.jsx(P,{type:"link",danger:!0,onClick:()=>w(s),children:"Delete"},"delete")],children:e.jsxs("div",{children:[e.jsx(K,{strong:!0,children:R(i.date).format("DD-MM-YYYY")}),e.jsx("br",{}),i.note,e.jsx("br",{}),e.jsxs(K,{type:"secondary",children:["By ",((v=i.addedBy)==null?void 0:v.name)||((T=i.addedBy)==null?void 0:T.email)||"Unknown User"]})]})})};return e.jsxs(ae,{title:`Follow-ups for Quotation: ${(a==null?void 0:a.quotationNumber)||"N/A"}`,open:n,onClose:()=>{f(null),y(""),x(null),g()},width:720,children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx(se,{style:{width:"100%",marginBottom:8},format:"DD-MM-YYYY",value:u,onChange:i=>x(i),placeholder:"Select follow-up date"}),e.jsx(fe,{rows:4,placeholder:"Enter follow-up note",value:m,onChange:i=>y(i.target.value)}),e.jsx(P,{type:"primary",block:!0,onClick:D,loading:b,style:{marginTop:10},children:l===null?"Add Follow-up":"Update Follow-up"})]}),e.jsx(Q,{children:"Existing Follow-ups"}),e.jsxs(q,{defaultActiveKey:"today",children:[e.jsx(B,{tab:`Today's (${k.length})`,children:e.jsx(L,{dataSource:k,renderItem:i=>o(i,r.indexOf(i)),locale:{emptyText:"No follow-ups scheduled for today."}})},"today"),e.jsx(B,{tab:`Upcoming (${U.length})`,children:e.jsx(L,{dataSource:U,renderItem:i=>o(i,r.indexOf(i)),locale:{emptyText:"No upcoming follow-ups."}})},"upcoming"),e.jsx(B,{tab:`Past (${t.length})`,children:e.jsx(L,{dataSource:t,renderItem:i=>o(i,r.indexOf(i)),locale:{emptyText:"No past follow-ups."}})},"past")]})]})},M=n=>`₹${(parseFloat(n)||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`,ye=n=>{if(typeof n!="number"||isNaN(n))return"N/A";let g=Math.floor(n),a=Math.round((n-g)*100);const d=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"],m=["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],y=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],u=["","Thousand","Lakh","Crore"],x=l=>l<10?d[l]:l>=10&&l<20?m[l-10]:y[Math.floor(l/10)]+(l%10!==0?" "+d[l%10]:"");let b=[],c=0;if(g===0)b.push("Zero");else{let l=g%1e3;for(l>0&&(l<100?b.push(x(l)):b.push(d[Math.floor(l/100)]+" Hundred"+(l%100!==0?" "+x(l%100):""))),g=Math.floor(g/1e3);g>0;){let f=g%100;f>0?b.push(x(f)+" "+u[++c]):c++,g=Math.floor(g/100)}}const r=b.reverse().filter(Boolean).join(" ").trim();let h=r?r+" Rupees":"Zero Rupees";return a>0&&(h+=` and ${x(a)} Paisa`),h+=" Only",h.replace(/\s+/g," ")},be=n=>{var l,f,S,D;const g=((l=n.items)==null?void 0:l.reduce((p,w)=>p+(w.quantity||0)*(w.rate||0),0))||0,d=g*.18,m=g+d,y=te,u="YOUR_SIGNATURE_IMAGE_BASE64_DATA_URL_HERE",x=`
    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <div style="display: flex; align-items: center;">
          <img src="${y}" alt="Company Logo" style="height: 70px; margin-right: 15px;">
          <div>
            <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #2c3e50; margin-bottom: 5px;">ACE AUTOMATION</h2>
            <p style="margin: 2px 0; font-size: 10px; color: #555;">S.F. No. 91, 14B, Padiveedu Thottam,</p>
            <p style="margin: 2px 0; font-size: 10px; color: #555;">Kalapatty road, Saravanampatti (PO),</p>
            <p style="margin: 2px 0; font-size: 10px; color: #555;">Coimbatore - 641 035. TN, INDIA.</p>
            <p style="margin: 2px 0; font-size: 10px; color: #555;">+91 98422 53389 | aceautomation.cbe@gmail.com</p>
            <p style="margin: 2px 0; font-size: 10px; color: #555;">www.aceautomation.in | GST No. : 33AVDPD3093Q1ZD</p>
          </div>
        </div>

        <div style="background: linear-gradient(135deg, #ff6600, #ff8c00); color: white; padding: 15px 25px; font-weight: 600; font-size: 20px; text-align: center; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          QUOTATION
        </div>
      </div>
      <div style="border-bottom: 2px solid #eee; margin-bottom: 15px;"></div>
    </div>
  `,b=`
    <div style="padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); background: white;">
      ${x}

      <div style="margin-bottom: 25px; background: #f9fafb; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; width: 25%; background: #f0f2f5;">Company Name</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; width: 25%;">${n.businessName||"N/A"}</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; width: 25%; background: #f0f2f5;">Date</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; width: 25%;">${n.date?new Date(n.date).toLocaleDateString("en-IN"):new Date().toLocaleDateString("en-IN")}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; background: #f0f2f5;">Contact Person</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px;">${n.customerName||"N/A"}</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; background: #f0f2f5;">Quotation No</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px;">${n.quotationNumber||"N/A"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; background: #f0f2f5;">Contact Number</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px;">${n.customerPhone||"N/A"}</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; background: #f0f2f5;">Customer GST No.</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px;">${n.gstin||"N/A"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; background: #f0f2f5;">Contact Email</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px;" colspan="3">${n.customerEmail||"N/A"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; background: #f0f2f5;">Address</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px;" colspan="3">${((f=n.businessInfo)==null?void 0:f.replace(/\n/g,"<br>"))||"N/A"}</td>
          </tr>
        </table>
      </div>

      ${((S=n.items)==null?void 0:S.length)>0?`
          <div style="margin-top: 25px; overflow: hidden; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; table-layout: fixed; font-size: 12px;">
              <colgroup>
                <col style="width: 8%;"> <col style="width: 32%;"> <col style="width: 15%;"> <col style="width: 22.5%;"> <col style="width: 22.5%;"> </colgroup>
              <thead>
                <tr style="background: linear-gradient(135deg, #2c3e50, #34495e); color: white;">
                  <th style="border: 1px solid #2c3e50; padding: 10px; text-align: center;">S.No</th>
                  <th style="border: 1px solid #2c3e50; padding: 10px; text-align: left;">Description</th>
                  <th style="border: 1px solid #2c3e50; padding: 10px; text-align: center;">Quantity</th>
                  <th style="border: 1px solid #2c3e50; padding: 10px; text-align: right;">Unit Price (₹)</th>
                  <th style="border: 1px solid #2c3e50; padding: 10px; text-align: right;">Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${n.items.map((p,w)=>`
                    <tr style="${w%2===0?"background: #fff;":"background: #f9fafb;"}">
                      <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: center; vertical-align: top;">${w+1}</td>
                      <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: left; vertical-align: top;">${p.description||"N/A"}</td>
                      <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: center; vertical-align: top;">${parseFloat(p.quantity)||0}</td>
                      <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: right; vertical-align: top;">${M(p.rate||0)}</td>
                      <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: right; font-weight: 600; vertical-align: top;">
                        ${M((p.quantity||0)*(p.rate||0))}
                      </td>
                    </tr>
                  `).join("")}
              </tbody>
            </table>
          </div>

          <div style="margin-top: 15px; background: #f9fafb; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr>
                <td style="width: 70%;"></td>
                <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: right; font-weight: 600; width: 15%; background: #f0f2f5;">Sub Total</td>
                <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: right; font-weight: 600; width: 15%;">${M(g)}</td>
              </tr>
              <tr>
                <td style="width: 70%;"></td>
                <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: right; width: 15%; background: #f0f2f5;">GST (18%)</td>
                <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: right; width: 15%;">${M(d)}</td>
              </tr>
              <tr style="background: #e8f5e9;">
                <td style="width: 70%;"></td>
                <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: right; font-weight: 600; font-size: 13px; width: 15%;">Total Amount</td>
                <td style="border: 1px solid #e0e0e0; padding: 10px; text-align: right; font-weight: 600; font-size: 13px; width: 15%;">${M(m)}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 15px; background: #f5f5f5; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr>
                <td style="font-weight: 600; padding: 4px; width: 25%; color: #555;">Amount In Words</td>
                <td style="padding: 4px; font-style: italic; width: 75%;">${ye(m)}</td>
              </tr>
            </table>
          </div>
        `:""}

      <div style="margin-top: 20px; font-size: 12px; color: #555;">
        <p style="margin: 5px 0; font-style: italic; color: #666;">"We appreciate your business inquiry and look forward to serving you with our quality products and services."</p>

        <div style="margin: 15px 0;">
          <p style="margin: 5px 0; font-weight: 600; color: #2c3e50;">With Best Regards</p>
          <p style="margin: 5px 0; color: #555;">For Ace Automation</p>
        </div>
      </div>

      <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        <div style="text-align: right;">
          <img src="${u}" alt="Authorized Signature" style="height: 60px; display: block; margin-left: auto; margin-bottom: 5px;">
          <p style="margin: 5px 0; font-size: 12px; font-weight: 600; color: #2c3e50;">Authorized Signatory</p>
        </div>
      </div>
      <p style="text-align: center; font-size: 10px; color: #999; margin-top: 20px;">Page 1/2</p>
    </div>
  `,c=(D=n.items)==null?void 0:D.filter(p=>p.specifications&&p.specifications.length>0).map(p=>{const N=`- ${p.productName||p.description||"Product"}`,$=p.specifications.map(k=>`
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; width: 40%; background: #f9f9f9; vertical-align: top;">${k.name||""}</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; vertical-align: top;">${k.value||""}</td>
          </tr>
        `).join("");return`
        <div style="margin-bottom: 20px; background: #f9fafb; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #2c3e50, #34495e); color: white; padding: 8px 12px; font-weight: 600; font-size: 13px;">
            PRODUCT SPECIFICATIONS ${N}
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tbody>
              ${$}
            </tbody>
          </table>
        </div>
      `}).join(""),r=`
    <div style="margin-top: 20px; background: #f9fafb; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div style="background: linear-gradient(135deg, #2c3e50, #34495e); color: white; padding: 8px 12px; font-weight: 600; font-size: 13px;">
        GENERAL TERMS & CONDITIONS
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
        <tbody>
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; width: 30%; background: #f0f2f5; vertical-align: top;">Payment Terms</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; vertical-align: top;">${n.Payment||"50% advance, 50% on delivery"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; width: 30%; background: #f0f2f5; vertical-align: top;">Delivery Period</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; vertical-align: top;">${n.Delivery?`${n.Delivery} days`:"Within 15 working days after advance"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; width: 30%; background: #f0f2f5; vertical-align: top;">Warranty</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; vertical-align: top;">${n.Warranty?`${n.Warranty} year(s)`:"1 year from the date of invoice"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; width: 30%; background: #f0f2f5; vertical-align: top;">Freight</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; vertical-align: top;">${n.Freight||"Extra as per actual"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e0e0e0; padding: 8px; font-weight: 600; width: 30%; background: #f0f2f5; vertical-align: top;">Validity</td>
            <td style="border: 1px solid #e0e0e0; padding: 8px; vertical-align: top;">${n.Validity||"30 days from the date of quotation"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,h=`
    <div style="padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); background: white;">
      ${x}

      ${c}

      ${r}

      <div style="margin-top: 20px; font-size: 12px; color: #555;">
        <p style="margin: 5px 0; font-style: italic; color: #666;">"Thank you for considering our proposal. We assure you of our best services and support at all times."</p>

        <div style="margin: 15px 0;">
          <p style="margin: 5px 0; font-weight: 600; color: #2c3e50;">With Best Regards</p>
          <p style="margin: 5px 0; color: #555;">For Ace Automation</p>
        </div>
      </div>

      <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        <div style="text-align: right;">
          <img src="${u}" alt="Authorized Signature" style="height: 60px; display: block; margin-left: auto; margin-bottom: 5px;">
          <p style="margin: 5px 0; font-size: 12px; font-weight: 600; color: #2c3e50;">Authorized Signatory</p>
        </div>
      </div>
      <p style="text-align: center; font-size: 10px; color: #999; margin-top: 20px;">Page 2/2</p>
    </div>
  `;return{page1Html:b,page2Html:h}},Z=async n=>{const g=z.loading("Generating PDF...",{position:"top-center"});let a=null,d=null;try{const{page1Html:m,page2Html:y}=be(n),u=new de({orientation:"portrait",unit:"mm",format:"a4",hotfixes:["px_scaling"]}),x=u.internal.pageSize.getWidth(),b=u.internal.pageSize.getHeight(),c=10;a=document.createElement("div"),a.style.position="fixed",a.style.top="-9999px",a.style.left="-9999px",a.style.width=`${x-2*c}mm`,a.style.padding=`${c}mm`,a.style.background="white",a.style.zIndex="-1",a.style.display="block",a.innerHTML=m,document.body.appendChild(a),await new Promise(N=>setTimeout(N,200));const h=(await G(a,{scale:3,useCORS:!0,logging:!1,allowTaint:!0,letterRendering:!0,backgroundColor:"#ffffff"})).toDataURL("image/png",1),l=u.getImageProperties(h),f=l.height*(x-2*c)/l.width;u.addImage(h,"PNG",c,c,x-2*c,f),u.addPage(),d=document.createElement("div"),d.style.position="fixed",d.style.top="-9999px",d.style.left="-9999px",d.style.width=`${x-2*c}mm`,d.style.padding=`${c}mm`,d.style.background="white",d.style.zIndex="-1",d.style.display="block",d.innerHTML=y,document.body.appendChild(d),await new Promise(N=>setTimeout(N,200));const D=(await G(d,{scale:3,useCORS:!0,logging:!1,allowTaint:!0,letterRendering:!0,backgroundColor:"#ffffff"})).toDataURL("image/png",1),p=u.getImageProperties(D),w=p.height*(x-2*c)/p.width;u.addImage(D,"PNG",c,c,x-2*c,w),u.save(`${n.quotationNumber||"quotation"}_${new Date().toISOString().slice(0,10)}.pdf`),z.success("PDF downloaded successfully!",{id:g})}catch(m){console.error("Failed to generate PDF:",m),z.error("Failed to generate PDF. Please try again.",{id:g})}finally{a&&document.body.contains(a)&&document.body.removeChild(a),d&&document.body.contains(d)&&document.body.removeChild(d)}},{Text:j}=X,He=({quotations:n,onAddNew:g,onEdit:a,onDelete:d,onSearch:m,onViewNotes:y,loading:u,refreshQuotations:x})=>{var $,k,U;const[b,c]=A.useState(!1),[r,h]=A.useState(null),[l,f]=A.useState(!1),S=t=>{h(t),c(!0),z.success("Quotation details loaded.",{duration:1500,position:"top-right"})},D=t=>{h(t),f(!0)},p=t=>`₹${(parseFloat(t)||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`,w=()=>[{title:"S.No",width:60,align:"center",render:(t,o,i)=>i+1},{title:"Description",dataIndex:"description",ellipsis:!0,render:(t,o)=>{var i;if(!t&&((i=o.specifications)==null?void 0:i.length)>0){const s=o.specifications.find(v=>v.name==="SPECIFICATION");return s?s.value:"N/A"}return t||"N/A"}},{title:"HSN/SAC",dataIndex:"hsnSac",width:100,align:"center",render:t=>t||"N/A"},{title:"Qty",dataIndex:"quantity",width:80,align:"center",render:t=>parseFloat(t)||0},{title:"Unit Price (₹)",width:140,align:"right",render:(t,o)=>p(o.rate||0)},{title:"Total (₹)",width:140,align:"right",render:(t,o)=>e.jsx(j,{strong:!0,style:{color:"#52c41a"},children:p((o.quantity||0)*(o.rate||0))})}],N=[{title:"Quotation #",dataIndex:"quotationNumber",render:t=>e.jsx(Y,{color:"blue",children:t||"N/A"}),sorter:(t,o)=>(t.quotationNumber||"").localeCompare(o.quotationNumber||"")},{title:"Business",dataIndex:"businessName",sorter:(t,o)=>(t.businessName||"").localeCompare(o.businessName||"")},{title:"Customer",dataIndex:"customerName",render:(t,o)=>e.jsxs("div",{children:[e.jsx("div",{children:t||"N/A"}),o.customerEmail&&e.jsx("div",{style:{fontSize:12,color:"#666"},children:o.customerEmail})]}),sorter:(t,o)=>(t.customerName||"").localeCompare(o.customerName||"")},{title:"Items Count",render:(t,o)=>{var i,s;return e.jsxs(Y,{color:"geekblue",children:[((i=o.items)==null?void 0:i.length)||0," item",(((s=o.items)==null?void 0:s.length)||0)!==1?"s":""]})}},{title:"Latest Note",dataIndex:"notes",render:t=>{if(t&&t.length>0){const o=t[t.length-1],i=o.text.length>30?`${o.text.substring(0,30)}...`:o.text;return e.jsx(ie,{title:o.text,children:e.jsx(j,{type:"secondary",children:i})})}return e.jsx(j,{type:"secondary",italic:!0,children:"No notes"})}},{title:"Total (₹)",dataIndex:"total",render:(t,o)=>{var s;const i=parseFloat(t)||((s=o.items)==null?void 0:s.reduce((v,T)=>v+(T.quantity||0)*(T.rate||0),0))||0;return e.jsx(j,{strong:!0,style:{color:"#52c41a"},children:p(i)})},sorter:(t,o)=>{const i=parseFloat(t.total)||0,s=parseFloat(o.total)||0;return i-s}},{title:"Date",dataIndex:"date",render:t=>{if(!t)return"N/A";try{return new Date(t).toLocaleDateString("en-IN")}catch{return t}},sorter:(t,o)=>{const i=new Date(t.date).getTime()||0,s=new Date(o.date).getTime()||0;return i-s}},{title:"Actions",width:80,render:(t,o)=>e.jsx(re,{overlay:e.jsxs(F,{children:[e.jsx(F.Item,{icon:e.jsx(le,{}),onClick:()=>S(o),children:"View Details"},"view"),e.jsx(F.Item,{icon:e.jsx(W,{}),onClick:()=>Z(o),children:"Download PDF"},"download"),e.jsx(F.Item,{icon:e.jsx(ce,{}),onClick:()=>{y(o),z.success("Opening notes dialog...",{duration:1500})},children:"View/Add Notes"},"notes"),e.jsx(F.Item,{icon:e.jsx(ge,{}),onClick:()=>D(o),children:"Add/View Follow-ups"},"followups"),e.jsx(F.Item,{icon:e.jsx(xe,{}),onClick:()=>{a(o),z.success("Initiating quotation edit...",{duration:1500})},children:"Edit Quotation"},"edit"),e.jsx(F.Item,{children:e.jsxs(ue,{title:"Are you sure you want to delete this account?",onConfirm:()=>d(o._id),okText:"Yes",cancelText:"No",children:[e.jsx(me,{}),"Delete Quotation"]})})]}),trigger:["click"],children:e.jsx(P,{icon:e.jsx(pe,{})})})}];return e.jsxs(e.Fragment,{children:[e.jsxs(oe,{style:{marginBottom:16,justifyContent:"space-between",width:"100%"},children:[e.jsx(J.Search,{placeholder:"Search by quotation number, business, customer, or notes...",onChange:t=>{m(t.target.value)},style:{width:400},prefix:e.jsx(ne,{}),allowClear:!0}),e.jsx(P,{type:"primary",onClick:()=>{g(),z.success("Prepare to create a new quotation.",{duration:1500})},children:"+ New Quotation"})]}),e.jsx(E,{columns:N,dataSource:n,rowKey:"_id",loading:u,pagination:{pageSize:10,showSizeChanger:!0,showQuickJumper:!0,showTotal:(t,o)=>`${o[0]}-${o[1]} of ${t} quotations`},scroll:{x:1200}}),e.jsx(ee,{title:e.jsxs("div",{children:[e.jsx(j,{strong:!0,children:"Quotation Details"}),r&&e.jsx(Y,{color:"blue",style:{marginLeft:8},children:r.quotationNumber})]}),open:b,onCancel:()=>c(!1),footer:[e.jsx(P,{icon:e.jsx(W,{}),onClick:()=>Z(r),children:"Download PDF"},"download"),e.jsx(P,{onClick:()=>c(!1),children:"Close"},"close")],width:1e3,children:r&&e.jsxs("div",{id:`quotation-modal-preview-${r._id}`,children:[e.jsxs(I,{column:2,bordered:!0,size:"small",children:[e.jsx(I.Item,{label:"Quotation Number",children:e.jsx(Y,{color:"blue",children:r.quotationNumber||"N/A"})}),e.jsx(I.Item,{label:"Date",children:r.date?new Date(r.date).toLocaleDateString("en-IN"):"N/A"}),e.jsx(I.Item,{label:"Business Name",children:r.businessName||"N/A"}),e.jsx(I.Item,{label:"Customer Name",children:r.customerName||"N/A"}),e.jsx(I.Item,{label:"Customer Email",children:r.customerEmail||"N/A"}),e.jsx(I.Item,{label:"GSTIN",children:e.jsx(j,{code:!0,children:r.gstin||"N/A"})}),e.jsx(I.Item,{label:"Business Info",span:2,children:e.jsx(j,{style:{whiteSpace:"pre-wrap"},children:r.businessInfo||"N/A"})}),e.jsx(I.Item,{label:"Total Amount",span:2,children:e.jsx(j,{style:{fontSize:"18px",fontWeight:"bold",color:"#52c41a"},children:p(r.total||(($=r.items)==null?void 0:$.reduce((t,o)=>t+(o.quantity||0)*(o.rate||0),0))||0)})})]}),((k=r.items)==null?void 0:k.length)>0&&e.jsxs(e.Fragment,{children:[e.jsxs(Q,{orientation:"left",children:["Items (",r.items.length,")"]}),e.jsx(E,{dataSource:r.items,columns:w(),pagination:!1,size:"small",rowKey:(t,o)=>`${r._id}-item-${o}`,bordered:!0,expandable:{expandedRowRender:t=>{var o;return e.jsx("div",{style:{margin:0,padding:0},children:((o=t.specifications)==null?void 0:o.length)>0&&e.jsx(I,{column:1,size:"small",children:t.specifications.filter(i=>i.name!=="SPECIFICATION").map((i,s)=>e.jsx(I.Item,{label:i.name,children:i.value},s))})})},rowExpandable:t=>{var o;return((o=t.specifications)==null?void 0:o.length)>0}},summary:t=>{const o=t.reduce((i,s)=>i+(s.quantity||0)*(s.rate||0),0);return e.jsx(E.Summary,{fixed:!0,children:e.jsxs(E.Summary.Row,{children:[e.jsx(E.Summary.Cell,{index:0,colSpan:5,children:e.jsx(j,{strong:!0,children:"Grand Total:"})}),e.jsx(E.Summary.Cell,{index:5,children:e.jsx(j,{strong:!0,style:{color:"#52c41a"},children:p(o)})})]})})}})]}),((U=r.notes)==null?void 0:U.length)>0&&e.jsxs(e.Fragment,{children:[e.jsxs(Q,{orientation:"left",children:["Notes (",r.notes.length,")"]}),r.notes.map((t,o)=>e.jsxs("div",{style:{marginBottom:12,padding:8,background:"#f5f5f5",borderRadius:4},children:[e.jsxs(j,{italic:!0,children:['"',t.text,'"']}),e.jsx("br",{}),e.jsxs(j,{type:"secondary",style:{fontSize:"0.8em"},children:["— ",t.author," on"," ",t.timestamp||new Date(r.createdAt).toLocaleDateString("en-IN")]})]},o))]})]})}),r&&e.jsx(he,{visible:l,onClose:()=>f(!1),quotation:r,refreshQuotations:x})]})};export{He as default};
