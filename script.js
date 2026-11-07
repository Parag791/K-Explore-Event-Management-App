const events = [
 {id:1,title:"Future of AI Summit",category:"Technology",date:"2026-11-18",time:"10:00 AM",venue:"KIIT Convention Centre",city:"Bhubaneswar",price:"Free",emoji:"🤖",gradient:"linear-gradient(135deg,#33206d,#9677ef)",description:"Explore the ideas shaping tomorrow. Hear from student innovators, developers and technology enthusiasts about artificial intelligence and its real-world possibilities."},
 {id:2,title:"Indie Music Evening",category:"Music",date:"2026-11-22",time:"6:30 PM",venue:"Ekamra Haat",city:"Bhubaneswar",price:"₹199",emoji:"🎸",gradient:"linear-gradient(135deg,#a83d70,#f09b75)",description:"An evening of independent music, fresh sounds and a welcoming crowd. Come enjoy live performances from emerging local artists."},
 {id:3,title:"Creative Design Lab",category:"Workshop",date:"2026-11-25",time:"11:00 AM",venue:"Campus Studio, KIIT",city:"Bhubaneswar",price:"Free",emoji:"🎨",gradient:"linear-gradient(135deg,#176c76,#69c5b0)",description:"A hands-on beginner-friendly workshop exploring visual design, colour, layout and creative thinking. Bring your curiosity and ideas."},
 {id:4,title:"Startup & Innovation Meet",category:"Technology",date:"2026-12-02",time:"2:00 PM",venue:"Innovation Hub",city:"Bhubaneswar",price:"₹99",emoji:"🚀",gradient:"linear-gradient(135deg,#174c91,#65a8e8)",description:"Meet curious builders, exchange ideas and learn how early-stage projects grow. Includes short talks, networking and an open idea-sharing session."},
 {id:5,title:"Stories Through Photography",category:"Art",date:"2026-12-06",time:"4:00 PM",venue:"Regional Art Centre",city:"Bhubaneswar",price:"Free",emoji:"📷",gradient:"linear-gradient(135deg,#a15c2d,#e7b76b)",description:"Discover the art of visual storytelling through a small photography showcase and friendly discussion. All experience levels are welcome."},
 {id:6,title:"Web Development Bootcamp",category:"Workshop",date:"2026-12-12",time:"9:30 AM",venue:"Computer Lab 3",city:"KIIT, Bhubaneswar",price:"₹149",emoji:"💻",gradient:"linear-gradient(135deg,#263d62,#7298c9)",description:"Build a responsive mini website while learning the foundations of HTML, CSS and JavaScript. Designed for students who want to learn by doing."}
];
let activeCategory="All";
const grid=document.getElementById("eventGrid");
const count=document.getElementById("eventCount");
const search=document.getElementById("searchInput");
const modal=document.getElementById("eventModal");
const modalContent=document.getElementById("modalContent");
const toast=document.getElementById("toast");
const monthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function dateParts(date){const d=new Date(date+"T00:00:00");return {day:d.getDate(),month:monthNames[d.getMonth()],full:d.toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})};}
function renderEvents(){
 const term=search.value.trim().toLowerCase();
 const filtered=events.filter(e=>(activeCategory==="All"||e.category===activeCategory)&&`${e.title} ${e.category} ${e.venue} ${e.city}`.toLowerCase().includes(term));
 count.textContent=filtered.length;
 document.getElementById("emptyState").classList.toggle("hidden",filtered.length!==0);
 grid.innerHTML=filtered.map(e=>{const d=dateParts(e.date);return `<article class="event-card" tabindex="0" role="button" aria-label="View ${e.title}" data-id="${e.id}">
  <div class="event-image" style="background:${e.gradient}"><span class="date-tag"><b>${d.day}</b>${d.month.toUpperCase()}</span><span class="emoji">${e.emoji}</span></div>
  <div class="event-body"><span class="category-label">${e.category}</span><h3>${e.title}</h3><p>${e.description}</p>
  <div class="event-meta"><span>⌖ ${e.city}</span><strong>${e.price}</strong></div></div></article>`}).join("");
}
function showToast(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2800);}
function openEvent(id){
 const e=events.find(item=>item.id===Number(id));if(!e)return;const d=dateParts(e.date);
 modalContent.innerHTML=`<span class="category-label">${e.category} · UPCOMING EVENT</span><h2 id="modalTitle">${e.title}</h2><p>${e.description}</p><div class="modal-info"><span>📅 ${d.full}</span><span>🕒 ${e.time}</span><span>📍 ${e.venue}</span><span>🎟 ${e.price}</span></div>
 <h3 style="font:700 16px Manrope">Register your interest</h3>
 <form id="registrationForm" novalidate><div class="form-grid">
 <div class="form-field"><label for="name">Full name *</label><input id="name" name="name" placeholder="Your name" required><small class="form-error" id="nameError"></small></div>
 <div class="form-field"><label for="email">Email address *</label><input id="email" name="email" type="email" placeholder="you@example.com" required><small class="form-error" id="emailError"></small></div>
 <div class="form-field"><label for="phone">Phone number *</label><input id="phone" name="phone" type="tel" placeholder="10-digit number" required><small class="form-error" id="phoneError"></small></div>
 <div class="form-field"><label for="tickets">Number of seats</label><select id="tickets" name="tickets"><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
 <div class="form-field full"><label><input type="checkbox" id="consent" style="width:auto"> I confirm that the information above is correct.</label><small class="form-error" id="consentError"></small></div>
 </div><button class="primary-btn submit-btn" type="submit">Submit registration <span>↗</span></button></form>`;
 modal.classList.remove("hidden");document.body.style.overflow="hidden";
 document.getElementById("registrationForm").addEventListener("submit",ev=>submitRegistration(ev,e));
}
function closeModal(){modal.classList.add("hidden");document.body.style.overflow="";}
function submitRegistration(ev,event){
 ev.preventDefault();const form=ev.currentTarget;const name=form.name.value.trim(),email=form.email.value.trim(),phone=form.phone.value.trim();
 const emailOK=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),phoneOK=/^[0-9+\-\s]{10,15}$/.test(phone);
 document.getElementById("nameError").textContent=name?"":"Please enter your name.";
 document.getElementById("emailError").textContent=emailOK?"":"Enter a valid email address.";
 document.getElementById("phoneError").textContent=phoneOK?"":"Enter a valid phone number.";
 document.getElementById("consentError").textContent=document.getElementById("consent").checked?"":"Please confirm your information.";
 if(!name||!emailOK||!phoneOK||!document.getElementById("consent").checked)return;
 const registration={name,email,phone,seats:form.tickets.value,event:event.title,registeredAt:new Date().toISOString()};
 const saved=JSON.parse(localStorage.getItem("eventraRegistrations")||"[]");saved.push(registration);localStorage.setItem("eventraRegistrations",JSON.stringify(saved));
 closeModal();showToast(`Thanks, ${name.split(" ")[0]}! Your registration for ${event.title} is saved.`);
}
document.getElementById("categoryFilters").addEventListener("click",ev=>{const btn=ev.target.closest("button[data-category]");if(!btn)return;activeCategory=btn.dataset.category;document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("active",c===btn));renderEvents();});
search.addEventListener("input",renderEvents);
grid.addEventListener("click",ev=>{const card=ev.target.closest(".event-card");if(card)openEvent(card.dataset.id);});
grid.addEventListener("keydown",ev=>{if((ev.key==="Enter"||ev.key===" ")&&ev.target.classList.contains("event-card")){ev.preventDefault();openEvent(ev.target.dataset.id);}});
document.getElementById("closeModal").addEventListener("click",closeModal);
modal.addEventListener("click",ev=>{if(ev.target===modal)closeModal();});
document.addEventListener("keydown",ev=>{if(ev.key==="Escape")closeModal();});
document.getElementById("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");document.getElementById("themeToggle").textContent=document.body.classList.contains("dark")?"☀":"☾";});
document.getElementById("year").textContent=new Date().getFullYear();
renderEvents();
