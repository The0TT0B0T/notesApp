// this is the variable that is the div with the class of notes-container, which is the text area where we will be writing our notes in.
const notesContainer = document.querySelector('.notes-container');
// createBtn is where we we press the Create Notes button and the text box will show up after the button is pressed
// createBtn comes from the button element with the class of .btn
const createBtn = document.querySelector('.btn');
// used let to declare notes because it will be a modified variable
// this is where we will be input our notes.
// we used querySelectorAll because we will be selecting all the notes that are created.
let notes = document.querySelectorAll('.input-box');

//function to save notes in the local storage. 
const showNotes = () => {
    notesContainer.innerHTML = localStorage.getItem('notes');
}
showNotes();
const updateStorage = () => {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

// this is where create the functionality for the Create Notes Button.
// has to have an event listener to listen for a click and then the call back arrow fucntion shows what will happen once the button is clicked.
createBtn.addEventListener('click', () => {
    // here we are creating the input field so we can right text 
    let inputBox = document.createElement('p')
    // here is the imaage where we delete the the current note.
    let img =  document.createElement('img')
    // this is where we are adding the class for p element for the in the inputBox element we just created.
    inputBox.className = 'input-box';
    // this is where we verify that we can edit the things inside the input box
    inputBox.setAttribute('contenteditable', 'true');
    // this is where we are adding the image for the img tag specifically for deleteing the note.
    img.src = 'images/delete.png'
    // notesContainer will add the inputBox and img to create a note input field so we can actually write notes.
    notesContainer.appendChild(inputBox).appendChild(img);
})

// here inside the notes container we are adding an event listener to listen when they click the delete img so it can delete the current note input field
// we use e as the parameter to represent the event which is an object that contains information about the event that occurred.
notesContainer.addEventListener('click', (e) => {
// we use an if statement to check if the target is an img tag and if it is we remove the parent element of the img tag. Basically it will be the note the you want to delete.
    if(e.target.tagName === 'IMG') {
        e.target.parentElement.remove()
        // we call the updateStorage function to update the local storage.
        updateStorage();
        // we use the notes variable to select all the notes that are created. which all the notes will have a p tag.
    } else if (e.target.tagName === 'P') {

        notes = document.querySelectorAll('.input-box');
        notes.forEach(note => {
            note.onkeyup = () => {
                updateStorage();
            }
        })
    }
})

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        document.execCommand('insertLineBreak')
        e.preventDefault();
    }
})