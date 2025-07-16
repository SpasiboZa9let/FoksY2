export function getChat()      { return document.getElementById("pseudo-chat"); }
export function getReactions() { return document.getElementById("pseudo-reactions"); }
export function scrollToBottom(){ const c=getChat(); if(c) c.scrollTop=c.scrollHeight; }

/* мгновенное сообщение */
export function addMessage(text,isHTML=false,fromUser=false,extra=""){
  const chat=getChat(); if(!chat) return;
  const b=document.createElement("div");
  b.className=`chat-bubble foxy-fade-in ${fromUser?'from-user':'from-foxy'} ${extra}`;
  isHTML?b.innerHTML=text:b.textContent=text;

  if(extra==="welcome-message"){
    chat.insertBefore(b,chat.firstChild);
  }else if(extra==="welcome-secondary"){
    const top=chat.querySelector(".welcome-message");
    top?(top.nextSibling?chat.insertBefore(b,top.nextSibling):chat.appendChild(b))
        :chat.insertBefore(b,chat.firstChild);
  }else chat.appendChild(b);

  scrollToBottom();
}

/* печатающееся сообщение */
export function addTypingMessage(text,delay=500,isHTML=false,fromUser=false,extra=""){
  const chat=getChat(); if(!chat) return;
  const b=document.createElement("div");
  b.className=`chat-bubble foxy-fade-in opacity-50 ${fromUser?'from-user':'from-foxy'} ${extra}`;
  b.textContent="Фокси печатает...";

  setTimeout(()=>{
    isHTML?b.innerHTML=text:b.textContent=text;
    b.classList.remove("opacity-50");

    if(extra==="welcome-message"){
      chat.insertBefore(b,chat.firstChild);
    }else if(extra==="welcome-secondary"){
      const top=chat.querySelector(".welcome-message");
      top?(top.nextSibling?chat.insertBefore(b,top.nextSibling):chat.appendChild(b))
          :chat.insertBefore(b,chat.firstChild);
    }else chat.appendChild(b);

    scrollToBottom();
  },delay);
}

/* утилиты */
export function clearButtons(){const r=getReactions(); if(r) r.innerHTML="";}
export function renderReactions(opts=[]){
  const r=getReactions(); if(!r) return; r.innerHTML="";
  opts.forEach(o=>{const btn=document.createElement("button");
    btn.className="ai-btn"; btn.textContent=o.text; btn.onclick=o.callback; r.appendChild(btn);});
}
export function clearChat(){const c=getChat(); if(c) c.innerHTML="";}
