function validform() {
    var x = document.forms['myform']['in2'].value;
    if (x == '') {
        alert('discriptin input must be filled');
        return false;
    }
}

const form = document.getElementById('myform');
const in1 = document.getElementById('in1');
const in2 = document.getElementById('in2');
const in3 = document.getElementById('in3');
const d2 = document.getElementById('d2');

let notes = []
window.onload = function () {
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'))
        rendernotes();
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const title = in1.value;
    const discriptin = in2.value;
    const date = in3.value;

    notes.push({ title, discriptin, date });
    localStorage.setItem('notes', JSON.stringify(notes));
    rendernotes();
    clearinputs();
})

function rendernotes() {
    d2.innerHTML = '<b> Node List </b>';
    d2.style.textAlign = 'center'
    d2.style.fontSize = '22px';

    notes.forEach(function (note, index) {
        const newNote = document.createElement('div');
        newNote.innerHTML = `<b> Title : </b> ${note.title} <br> <b> Discription  : </b> ${note.discriptin} <br> <b> Date :</b> ${note.date} <br>`;
        newNote.id = 'div'

        const editbutton = document.createElement('button');
        editbutton.textContent = 'Edit';
        editbutton.id = 'b1'
        editbutton.style.margin = '7px'
        editbutton.style.marginLeft = '2px'
        editbutton.style.backgroundColor = 'rgb(75, 241, 75)'
        editbutton.style.padding = '3px 8px'
        editbutton.style.borderRadius = '8px'
        editbutton.style.border = '1px solid rgb(75, 241, 75)'
        editbutton.style.color = 'white'

        editbutton.addEventListener('click', function () {
            var CTitle = prompt('enter the new title', notes[index].title)
            var CDiscription = prompt('enter the new discription', notes[index].discriptin)
            var CDate = prompt('enter the new date', notes[index].date)

            if (CDiscription == "") {
                alert('can not be emty')
            }
            else {

                if (CTitle == null || CDiscription == null || CDate == null) {
                    notes[index].title;
                    notes[index].discriptin;
                    notes[index].date;
                } else {
                    notes[index].title = CTitle;
                    notes[index].discriptin = CDiscription;
                    notes[index].date = CDate;

                    localStorage.setItem('notes', JSON.stringify(notes));

                    rendernotes();
                }
            }
        })

        const deletebutton = document.createElement('button');
        deletebutton.textContent = 'Delete';
        deletebutton.style.backgroundColor = 'red'
        deletebutton.style.marginRight = '10px'
        deletebutton.style.padding = '3px 5px'
        deletebutton.style.borderRadius = '8px'
        deletebutton.style.border = '1px solid red'
        deletebutton.style.color = 'white';
        deletebutton.id = 'b2'
        deletebutton.addEventListener('click', function () {
            var x = confirm('do you want delete this item')
            if (x) {
                notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                rendernotes();
            }
        });


        let checkbox1 = document.createElement('input');
        checkbox1.type = 'checkbox';
        checkbox1.id = 'check'

        checkbox1.addEventListener('change', function () {
            const parent = document.getElementById('div');
            parent.style.backgroundColor = checkbox1.checked ? 'yellow' : 'initial';
        })

        newNote.appendChild(editbutton);
        newNote.appendChild(deletebutton);
        newNote.appendChild(checkbox1);
        d2.appendChild(newNote);
    })
}

function clearinputs() {
    in1.value = '';
    in2.value = '';
    in3.value = '';
}