let createButtonEl = document.getElementById('create')

//--- function appending the cards of task to the page ---
function appendCards(data) {
    data.forEach(element => {
        console.log(element)
        let exsistingCards = document.getElementById(`${element.id}`)
        if (exsistingCards) {
            exsistingCards.remove();
        }
        let cardEl = document.createElement('div')
        cardEl.setAttribute('id', `${element.id}`)
        cardEl.classList.add('card')
        cardEl.innerHTML += (makeCard(element))
        document.body.append(cardEl)
    });
}

//--- adding the event listener and function to create button ---
createButtonEl.addEventListener('click', function () {
    let taskname = document.getElementById("name text").value
    let taskpriority = document.getElementById('priority text').value
    const response = fetch(`api/task`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'name': taskname, 'priority': taskpriority }),
    })
    .then(response => response.text())
    .then(getTask())
})

//--- function getting all of the task ---
function getTask(){
    fetch('/api/task')
    .then(res => res.json())
    .then(data => appendCards(data))
}


//--- function creating the cards that have the task info ---
function makeCard(element) {
    return ` <h1>${element.name}</h1>
    <h2>Priority: ${element.priority}</h2>
    <h2>Completed? ${element.completed}</h2>
    <button onclick = "(deleteTask(${element.id}))" classid = "${element.id}">Delete task</button>
    <button onclick = "(completeTask(${element.id}))" classid = "${element.id}">Mark as complete</button>`
}
//--- function deleting a task---
function deleteTask(id){
    let deletedCard = document.getElementById(id)
    deletedCard.remove();
    fetch(`/api/task/${id}`, { method: 'DELETE' })
}
//---function that updates the completed status of task---
function completeTask(id) {
    const response = fetch(`api/task/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'completed': true, }),
    })
    .then(response => response.text())
    .then(getTask())
}