let t=()=>fetch("https://6a0f54171736097c360b7f0b.mockapi.io/students").then(t=>t.json()),e=document.querySelector("#students-table tbody"),a=document.querySelector("#get-students-btn"),n=document.querySelector("#add-student-form");async function i(){d(await t())}function d(t){e.innerHTML=t.map(({id:t,name:e,age:a,course:n,skills:i,email:d,isEnrolled:s})=>`
        <tr>
          <td>${t}</td>
          <td>${e}</td>
          <td>${a}</td>
          <td>${n}</td>
          <td>${i?i.join(", "):""}</td>
          <td>${d}</td>
          <td>${s?"Так":"Ні"}</td>
          <td>
            <button data-id="${t}" data-action="delete">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
            <button data-id="${t}" data-action="edit">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
          </td>
        </tr>
      `).join("")}async function s(e){e.preventDefault();let a=n.elements,i={name:a.name.value,age:Number(a.age.value),course:a.course.value,skills:a.skills.value.split(",").map(t=>t.trim()),email:a.email.value,isEnrolled:a.isEnrolled.checked};await fetch("https://6a0f54171736097c360b7f0b.mockapi.io/students",{method:"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json()),d(await t()),n.reset()}async function o(e){let a=(await t()).find(t=>String(t.id)===String(e)),n=prompt("Нове ім'я:",a.name),i=prompt("Новий вік:",a.age),s=prompt("Новий курс:",a.course),o=prompt("Нові навички (через кому):",a.skills.join(", ")),u=prompt("Новий email:",a.email),l=confirm("Студент записаний?"),c={id:a.id,name:n,age:Number(i),course:s,skills:o.split(",").map(t=>t.trim()),email:u,isEnrolled:l};await fetch(`https://6a0f54171736097c360b7f0b.mockapi.io/students/${e}`,{method:"PUT",body:JSON.stringify(c),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json()),d(await t())}async function u(t){await fetch(`https://6a0f54171736097c360b7f0b.mockapi.io/students/${t}`,{method:"DELETE"}).then(t=>t.json()),i()}a.addEventListener("click",i),n.addEventListener("submit",s),e.addEventListener("click",t=>{let e=t.target.dataset.action,a=t.target.dataset.id;e&&("delete"===e&&u(a),"edit"===e&&o(a))});
//# sourceMappingURL=HW-37.eb5890ff.js.map
