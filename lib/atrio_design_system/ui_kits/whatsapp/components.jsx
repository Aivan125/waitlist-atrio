/* global React */
const { useState, useEffect, useRef } = React;

/* ---------- Tiny inline icon helpers (Lucide-style line icons) ---------- */
const Icon = ({ d, size = 20, stroke = 1.75, className = "", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
       className={className}>{d}</svg>
);
const IconBack = (p) => <Icon d={<><polyline points="15 18 9 12 15 6"/></>} {...p} />;
const IconVideo = (p) => <Icon d={<><path d="M15 10 L19 8 V16 L15 14"/><rect x="3" y="6" width="12" height="12" rx="2"/></>} {...p} />;
const IconPhone = (p) => <Icon d={<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></>} {...p} />;
const IconPaperclip = (p) => <Icon d={<path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>} {...p} />;
const IconCamera = (p) => <Icon d={<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>} {...p} />;
const IconMic = (p) => <Icon d={<><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="18" x2="12" y2="22"/></>} {...p} />;
const IconSend = (p) => <Icon d={<path d="M4 12 L20 4 L14 20 L12 13 Z"/>} {...p} fill="currentColor" />;
const IconSmile = (p) => <Icon d={<><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>} {...p} />;
const IconSignal = (p) => (
  <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor">
    <rect x="0" y="7" width="3" height="4" rx="0.5"/>
    <rect x="5" y="5" width="3" height="6" rx="0.5"/>
    <rect x="10" y="2.5" width="3" height="8.5" rx="0.5"/>
    <rect x="15" y="0" width="3" height="11" rx="0.5"/>
  </svg>
);
const IconWifi = (p) => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
    <path d="M8.5 11.5 a1.5 1.5 0 1 0 0-3 a1.5 1.5 0 0 0 0 3z"/>
    <path d="M4 7 a6 6 0 0 1 9 0 l-1.4 1.4 a4 4 0 0 0-6.2 0z"/>
    <path d="M1 4 a10 10 0 0 1 15 0 l-1.4 1.4 a8 8 0 0 0-12.2 0z"/>
  </svg>
);
const IconBattery = () => (
  <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
    <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="currentColor" opacity="0.4"/>
    <rect x="2" y="2" width="16" height="8" rx="1.2" fill="currentColor"/>
    <rect x="23.5" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.4"/>
  </svg>
);
const IconTicks = ({ read }) => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke={read ? "#53BDEB" : "#8696A0"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 6 L4 9 L10 2"/>
    <path d="M6 6 L9 9 L15 2"/>
  </svg>
);

/* ---------- Status bar ---------- */
function StatusBar({ time = "10:42" }) {
  return (
    <div className="status">
      <div className="status__time">{time}</div>
      <div className="status__notch"/>
      <div className="status__right">
        <IconSignal/>
        <IconWifi/>
        <IconBattery/>
      </div>
    </div>
  );
}

/* ---------- Chat header ---------- */
function ChatHeader({ presence = "en línea" }) {
  return (
    <div className="chat-header">
      <button className="chat-header__back" style={{background:"transparent", border:0, padding:"4px 2px", cursor:"pointer"}}>
        <IconBack size={22} stroke={2}/>
        <span style={{marginLeft:2}}>12</span>
      </button>
      <div className="chat-header__avatar">
        <img src="../../assets/atrio-isotipo-negro.png" alt="atrio"/>
      </div>
      <div className="chat-header__info">
        <div className="chat-header__name">Atrio</div>
        <div className="chat-header__status">{presence}</div>
      </div>
      <div className="chat-header__actions">
        <IconVideo size={22} stroke={1.5}/>
        <IconPhone size={20} stroke={1.5}/>
      </div>
    </div>
  );
}

/* ---------- Day separator ---------- */
function DaySeparator({ children }) {
  return <div className="day-sep">{children}</div>;
}

/* ---------- System note (yellow centered) ---------- */
function SystemNote({ children }) {
  return <div className="sysnote">{children}</div>;
}

/* ---------- Message bubble ---------- */
function MessageBubble({ from = "in", time, read = true, children, stacked = false }) {
  return (
    <div className={`bubble bubble--${from} ${stacked ? "bubble__stacked" : ""}`}>
      <div className="bubble__body">{children}</div>
      <div className="bubble__meta">
        <span>{time}</span>
        {from === "out" && <IconTicks read={read}/>}
      </div>
      <div style={{clear:"both"}}/>
    </div>
  );
}

/* ---------- Typing dots ---------- */
function TypingDots() {
  return <div className="typing"><span/><span/><span/></div>;
}

/* ---------- Property card ---------- */
function PropertyCard({ kicker, title, meta, price, time }) {
  return (
    <div className="bubble bubble--in" style={{padding:4, width:260}}>
      <div className="propcard">
        <div className="propcard__media">LUZ · SOMBRA · MATERIAL</div>
        <div className="propcard__body">
          <div className="propcard__kicker">{kicker}</div>
          <div className="propcard__title">{title}</div>
          <div className="propcard__meta">{meta}</div>
          <div className="propcard__price">{price}</div>
        </div>
      </div>
      <div className="bubble__meta" style={{paddingRight:6}}>
        <span>{time}</span>
      </div>
      <div style={{clear:"both"}}/>
    </div>
  );
}

/* ---------- Attachment preview (inside outgoing bubble) ---------- */
function AttachmentBubble({ name, meta, time, read = true }) {
  return (
    <div className="bubble bubble--out">
      <div className="attach">
        <div className="attach__icon">PDF</div>
        <div>
          <div className="attach__name">{name}</div>
          <div className="attach__meta">{meta}</div>
        </div>
      </div>
      <div className="bubble__meta">
        <span>{time}</span>
        <IconTicks read={read}/>
      </div>
      <div style={{clear:"both"}}/>
    </div>
  );
}

/* ---------- Composer ---------- */
function Composer({ value, onChange, onSend, placeholder = "Mensaje" }) {
  const hasText = value && value.trim().length > 0;
  return (
    <div className="composer">
      <button className="composer__btn"><IconPaperclip size={22} stroke={1.6}/></button>
      <div className="composer__input">
        <IconSmile size={20} stroke={1.5} className="" />
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && hasText) onSend(); }}
          placeholder={placeholder}
        />
        {!hasText && <IconCamera size={20} stroke={1.5}/>}
      </div>
      {hasText
        ? <button className="composer__send" onClick={onSend}><IconSend size={18}/></button>
        : <button className="composer__send" disabled><IconMic size={22} stroke={1.6}/></button>}
    </div>
  );
}

/* ---------- Phone frame ---------- */
function PhoneFrame({ children, time = "10:42" }) {
  return (
    <div className="phone">
      <div className="phone__screen">
        <StatusBar time={time}/>
        {children}
        <div className="home-ind"/>
      </div>
    </div>
  );
}

Object.assign(window, {
  Icon, IconBack, IconVideo, IconPhone, IconPaperclip, IconCamera, IconMic, IconSend, IconSmile, IconSignal, IconWifi, IconBattery, IconTicks,
  StatusBar, ChatHeader, DaySeparator, SystemNote, MessageBubble, TypingDots, PropertyCard, AttachmentBubble, Composer, PhoneFrame
});
