// Variables
let keyboardContainer = document.getElementById('keyboard');
let scaleArray = [];
let scaleSelectMenu = document.getElementById('scale-select');
let majorminorMenu = document.getElementById('major-minor-select');
let colorPicker = document.getElementById('color-picker');


let baseNote;
let noteColor;
let majorOrMinor;


// Functions

function generateKeyboard(octaveAmount) {

    // Generate Each Octave 
    for (let i = 1; i <= octaveAmount; i++) {

        // Generate Container Div Element for the Octave
        let octaveContainer = document.createElement('div');

        // Assign class to container element
        octaveContainer.classList.add(`octaveContainer`);

        // Generate Keys In The Octave
        for (let i = 1; i <= 12; i++) {

            // Create Key Div Elements
            let keyDiv = document.createElement('div');

            // Assign Classes
            keyDiv.classList.add(`_${i}`);
            keyDiv.classList.add('keys');

            // Add Key Div Elements to octaveConainer
            octaveContainer.appendChild(keyDiv);

        }

        // Add octaveContainer to #keyboard
        keyboardContainer.appendChild(octaveContainer)

    }

    // Add Final C Note
    let finalCNote = document.createElement('div')
    finalCNote.classList.add(`_1`);
    finalCNote.classList.add('finalCNote');
    finalCNote.classList.add(`keys`);
    keyboardContainer.appendChild(finalCNote);
}

// Creates array for selected scale with note numbers
function scaleLogic(noteNumber, majorminor) {
    
    let incrementNumVariable = noteNumber;
    scaleArray = [];
    
    // Add Root Note to List
    scaleArray.push(incrementNumVariable);
    
    // Major Key
    if (majorminor ===  1) {
        
        // Loop 6 times for notes in scale
        for (let i = 1; i <= 6; i++) {
            
                // Half Steps
                if (i == 3) {
                    incrementNumVariable += 1;
                } 
                // Whole Steps
                else {
                    incrementNumVariable += 2;
                } 
                
                // Decrement Relative to Root Note Once Scale Note # Exceeded
                if (incrementNumVariable > 12) {

                    incrementNumVariable = incrementNumVariable - 12;

                }

            // Push noteNumber to scaleArray
            scaleArray.push(incrementNumVariable);
            
        }
    }

    // Minor Key
    else {

        for (let i = 1; i <= 6; i++) {

            // Half Steps
            if (i == 2 || i == 5) {
                incrementNumVariable += 1;
            }
            // Whole Steps
            else {
                incrementNumVariable += 2;
            }

            // Decrement Relative to Root Note Once Scale Note # Exceeded
            if (incrementNumVariable > 12) {

                incrementNumVariable = incrementNumVariable - 12;

            }

        // Push noteNumber to scaleArray
        scaleArray.push(incrementNumVariable);

        }

    }




    console.log(scaleArray);
}

function resetKeyColors() {

    // Get all keys by class
    let keys = document.querySelectorAll('.keys');

    keys.forEach(key => {
        
        // Reset Black Keys
        if (key.classList.contains("_2") || key.classList.contains("_4") || key.classList.contains("_7") || key.classList.contains("_9") || key.classList.contains("_11")) {

            key.style.backgroundColor = "black";

        }
        // Reset White Keys
        else {

            key.style.backgroundColor = "white";
            
        }

    });
}

// Start on C

function implementScale() {

    // Get Scale Root Note From Menu Dropdown
    baseNote = parseInt(scaleSelectMenu.value);
    console.log(`Base note value changed: ${baseNote}`);
    console.log(`This is the base note: ${baseNote}`);

    // Get major (1) or minor (2) from dropdown
    let majMin = parseInt(majorminorMenu.value);

    // Send numeric value over to calculate scaleArray
    scaleLogic(baseNote, majMin);

    // Get color from color picker
    noteColor = `${colorPicker.value}`;

    // Color each note based on its scale
    colorEachNoteInScale();

}

function colorEachNoteInScale() {

    resetKeyColors();

    // Loop through scaleArray to assign background color to each note
    scaleArray.forEach(note => {

        // Get the note from each octave
        noteClasses = document.querySelectorAll(`._${note}`)

        // Color each note from each octave for this instance
        noteClasses.forEach(individNote => {
            
        // Assign background color to note
        individNote.style.backgroundColor = noteColor;
        });

    });
}

// Event Listeners

scaleSelectMenu.addEventListener('change', implementScale);
majorminorMenu.addEventListener('change', implementScale);
colorPicker.addEventListener('change', implementScale);


// Program
document.addEventListener('DOMContentLoaded', event => {
    // Generate Keyboard Based on # of Octaves in Octave Dropdown
    generateKeyboard(2);

    implementScale();
})