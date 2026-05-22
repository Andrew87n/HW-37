import { getStud } from "./api/get-stud";
import { postStud } from "./api/post-stud";
import { delStud } from "./api/del-stud";
import { updateStud } from "./api/upd-stud";

const tableBody = document.querySelector("#students-table tbody");
const getBtn = document.querySelector("#get-students-btn");
const form = document.querySelector("#add-student-form");

async function getStudents() {
  const students = await getStud();
  renderStudents(students);
}

function renderStudents(students) {
  const markup = students
    .map(
      ({ id, name, age, course, skills, email, isEnrolled }) => {
        return `
        <tr>
          <td>${id}</td>
          <td>${name}</td>
          <td>${age}</td>
          <td>${course}</td>
          <td>${skills ? skills.join(", ") : ""}</td>
          <td>${email}</td>
          <td>${isEnrolled ? "Так" : "Ні"}</td>
          <td>
            <button data-id="${id}" data-action="delete">Видалити</button>
            <button data-id="${id}" data-action="edit">Редагувати</button>
          </td>
        </tr>
      `;
      }
    )
    .join("");

  tableBody.innerHTML = markup;
}

async function addStudent(e) {
  e.preventDefault();

  const elements = form.elements;

  const newStudent = {
    name: elements.name.value,
    age: Number(elements.age.value),
    course: elements.course.value,
    skills: elements.skills.value.split(",").map((s) => s.trim()),
    email: elements.email.value,
    isEnrolled: elements.isEnrolled.checked,
  };

  await postStud(newStudent);

  const students = await getStud();

  renderStudents(students);

  form.reset();
}

async function updateStudent(id) {
  const students = await getStud();

  const currentStudent = students.find(
    (student) => String(student.id) === String(id)
  );

  const newName = prompt("Нове ім'я:", currentStudent.name);
  const newAge = prompt("Новий вік:", currentStudent.age);
  const newCourse = prompt("Новий курс:", currentStudent.course);
  const newSkills = prompt(
    "Нові навички (через кому):",
    currentStudent.skills.join(", ")
  );
  const newEmail = prompt("Новий email:", currentStudent.email);
  const newIsEnrolled = confirm("Студент записаний?");

  const updatedStudent = {
    id: currentStudent.id,
    name: newName,
    age: Number(newAge),
    course: newCourse,
    skills: newSkills.split(",").map((skill) => skill.trim()),
    email: newEmail,
    isEnrolled: newIsEnrolled,
  };

  await updateStud(id, updatedStudent);

  const updatedStudents = await getStud();

  renderStudents(updatedStudents);
}

async function deleteStudent(id) {
  await delStud(id);
  getStudents();
}

getBtn.addEventListener("click", getStudents);
form.addEventListener("submit", addStudent);

tableBody.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;

  if (!action) return;

  if (action === "delete") {
    deleteStudent(id);
  }

  if (action === "edit") {
    updateStudent(id);
  }
});