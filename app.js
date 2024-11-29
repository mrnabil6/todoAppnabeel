

const firebaseConfig = {
    apiKey: "AIzaSyD5RvUaP0j2-aYz1yZu-YY3XZgY6BdU5eM",
    authDomain: "todoapp-85646.firebaseapp.com",
    projectId: "todoapp-85646",
    storageBucket: "todoapp-85646.firebasestorage.app",
    messagingSenderId: "663502652841",
    appId: "1:663502652841:web:b54ebfd57e6ea52a3e30b8"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore()


var todoValue = document.getElementById('todo')
var userId = localStorage.getItem("userId")

var listContainer = document.getElementById('listContainer')

function post() {
    var todoValue = document.getElementById('todo')
    var newTodo = document.createElement('div');
    var todo = document.createElement('h6')
    var todoText = document.createTextNode(todoValue.value)
    todo.appendChild(todoText)
    newTodo.appendChild(todo)
    listContainer.appendChild(newTodo)
    newTodo.setAttribute('class', 'todoContainer')

    var dltBtn = document.createElement('button');
    var dltText = document.createTextNode('Remove');
    dltBtn.setAttribute('class', 'btn btn-danger')
    dltBtn.setAttribute('onclick', 'removeTodo()')
    dltBtn.appendChild(dltText)
    newTodo.appendChild(dltBtn)

    var editBtn = document.createElement('button');
    var editText = document.createTextNode('Edit');
    editBtn.setAttribute('class', 'btn btn-secondary')
    editBtn.setAttribute('onclick', 'editTodo()')
    editBtn.appendChild(editText)
    newTodo.appendChild(editBtn)
    var updateBtn = document.createElement('button');
    var updateText = document.createTextNode('Update');
    updateBtn.setAttribute('class', 'btn btn-success hide')
    updateBtn.setAttribute('onclick', 'updateTodo()')
    updateBtn.appendChild(updateText)
    newTodo.appendChild(updateBtn)
    todoValue.value = " "
}

function removeTodo() {
    var btn = event.target;
    btn.parentNode.remove()
    db.collection("todos").doc(btn.parentNode.id).delete().then(() => {
        console.log("Document successfully deleted!");
        btn.parentNode.remove()
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}


function editTodo() {
    alert('Kindly Click on text to edit')
    var btn = event.target;
    btn.style.display = 'none';
    btn.parentNode.lastChild.style.display = 'inline-block'
    btn.parentNode.firstChild.contentEditable = "true"

}

function updateTodo(e) {
    var todoContainer = e.parentNode;
    var updatedTodoText = todoContainer.firstChild.textContent.trim();
    console.log("updatedTodoText", updatedTodoText)
    if (!updatedTodoText) {
        alert("Todo cannot be empty");
        return;
    }
    var todoId = todoContainer.id;
    db.collection("todos").doc(todoId).update({
        todo: updatedTodoText,
        userId: userId
    }).then(() => {
        console.log("Todo successfully updated!");
        todoContainer.firstChild.textContent = updatedTodoText;
        todoContainer.querySelector('.btn-success').style.display = 'none';
        todoContainer.querySelector('.btn-secondary').style.display = 'inline-block';
        todoContainer.firstChild.contentEditable = 'false';
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}



function RemoveAll() {
    db.collection("todos")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
            listContainer.innerHTML = "";
        })
        .catch((error) => {
            alert("Error removing documents: " + error.message);
        });
}

function GetData() {

    db.collection('todos').where("userId", "==", userId).get().then((e) => {
        // console.log(e.data, "response")\
        listContainer.innerHTML = ""
        e.forEach((data) => {
            console.log(data.data())

            var newTodo = document.createElement('div');
            newTodo.setAttribute('id', data.id)
            var todo = document.createElement('h6')
            var todoText = document.createTextNode(data.data().todo)
            todo.appendChild(todoText)
            newTodo.appendChild(todo)
            listContainer.appendChild(newTodo)
            newTodo.setAttribute('class', 'todoContainer')

            var dltBtn = document.createElement('button');
            var dltText = document.createTextNode('Remove');
            dltBtn.setAttribute('class', 'btn btn-danger')
            dltBtn.setAttribute('onclick', 'removeTodo()')
            dltBtn.appendChild(dltText)
            newTodo.appendChild(dltBtn)

            var editBtn = document.createElement('button');
            var editText = document.createTextNode('Edit');
            editBtn.setAttribute('class', 'btn btn-secondary')
            editBtn.setAttribute('onclick', 'editTodo()')
            editBtn.appendChild(editText)
            newTodo.appendChild(editBtn)
            var updateBtn = document.createElement('button');
            var updateText = document.createTextNode('Update');
            updateBtn.setAttribute('class', 'btn btn-success hide')
            updateBtn.setAttribute('onclick', 'updateTodo(this)')
            updateBtn.appendChild(updateText)
            newTodo.appendChild(updateBtn)
            todoValue.value = " "
        })
    }).catch((e) => {
        console.log(e)
    })
}

function postAdd() {
    db.collection("todos").add({
        todo: todoValue.value,
        userId: userId
    }).then((docRef) => {
        console.log(docRef)
        GetData()
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}
GetData()