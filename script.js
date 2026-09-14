const nav=document.querySelector(".nav");
const menu=document.querySelector(".menu-btn");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));

const filters=document.querySelectorAll(".filter");
const projects=document.querySelectorAll(".project");
filters.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const category=btn.dataset.filter;
    projects.forEach(p=>{
      p.style.display=(category==="all"||p.dataset.category===category)?"block":"none";
    });
  });
});
