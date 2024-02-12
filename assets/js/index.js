const nuevaTareaInput = document.querySelector("#nuevaTarea");
const tbody = document.querySelector("tbody");
const btn = document.querySelector("#agregarTarea");
const tareas= [
];
btn.addEventListener ("click", () => {
    const {value: nuevaTarea} = nuevaTareaInput
    if (nuevaTarea) {
        addTask(nuevaTarea);
        console.log("Paso la tarea de agregar");
        refresh();
    } else {
        alert("Debe escribir una descripcion de la tarea");
    }
});

const addTask = (nuevaTarea) => {
    const id = Math.floor(Math.random() *99);

    const tarea = {
        id,
        tarea: nuevaTarea,
        check : false,
    };
    tareas.push(tarea);
    nuevaTareaInput.value ="";
};

const fillTableRow = ({id, tarea, check}) => {
  const row =   `<tr>
    <td>${id}</td>
    <td>${tarea}</td>
    <td class = "x-delete">
    <input onchange = "checkInput (${id})" ${
        check ? "checked" : ""
} type = "checkbox"/>
    <span onclick = "editTask (${id})">✏</span>
    <span onclick= "deleteTask (${id})">✖</span>
    </tr>
    `;
    return row;
};

const fillTable = () => {
    let rowsTesting = `
    <tr>
<td>33</td>
<td>testing</td>
</tr>;
`;

try {
    let rows = tareas.map ((e) => fillTableRow(e));
if (!rows){
    rows = rowsTesting;
}
tbody.innerHTML = rows;
} catch (error) {
    console.error (error);
}
};

const editTask = (id) => {
    const tarea = tareas.find(e => e.id === id);
    const {tarea: tareaDescripcion} = tarea;
    const nuevaDescripcion = prompt("Editar tarea:", tareaDescripcion);
    tarea.tarea= nuevaDescripcion;
    refresh ();
};

const deleteTask = (id) => {
    const decision = confirm ("¿Estas seguro de borrar la tarea?");
    console.log("decision", decision);
    if (decision) {
        const index = tareas.findIndex((e) => e.id === id)
        tareas.splice(index, 1);
        refresh();
    }
}

const refresh = () => {
    fillTable();
};
