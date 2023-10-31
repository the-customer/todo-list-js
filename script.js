//Un tableau qui sauvegarde toutes les taches
let myList = [
    {description:"Une premiere tache", checked: true},
    {description:"Une deuxieme tache", checked: false},
];

const dat = new Date();
console.dir(dat)
const APP_TITLE = 'The Title';
//
const btnAdd = document.getElementById('addNew');
const output = document.querySelector('.output');
const newItem = document.getElementById('addItem');
//Functions

function build(){
    output.innerHTML = "";
    newItem.value = "";
    // Afficher le titre
    const h1 = document.createElement('h1'); //1 - Creer le balise
    h1.innerText = APP_TITLE; //2 - mettre le contenu, le style,ajout d'events...
    output.appendChild(h1);//3 -  ajouter la balise quelque part dans le document
    //Activer le champ de saisie
    newItem.focus();
    //-----------------Afficher les item du tableau myList
    //Creation du tableau html <table></table>
    const table = document.createElement('table'); // => <table></table>
    
    for (let i = 0; i < myList.length; i++) {
        //Creation des <tr></tr>
       const tr = document.createElement('tr')// => <tr></tr>
       //Creation de td
       const td1 = document.createElement('td');
       td1.innerHTML = myList[i].description;
       if(myList[i].checked){
           td1.innerHTML = `<strike>${myList[i].description}</strike>`;
       }
      
       //Ajouter un event au td1
       td1.addEventListener('click',function(){
        myList[i].checked = !myList[i].checked;
        build();
       });
       const td2 = document.createElement('td');
    //    td2.innerHTML = '<span>Delete</span> <span>Edit</span>';
        const span1 = document.createElement('span');
        span1.innerText='Edit';
        span1.addEventListener('click',function(){
            td1.innerHTML = "";
            tr.style.backgroundColor = '#F78357';
            const oldDescription = myList[i].description;
            //
            const textArea = document.createElement('textarea');
            textArea.setAttribute('cols',30);
            textArea.value = oldDescription;
            //
            textArea.addEventListener('blur',function(){
                if(textArea.value.trim() !== ''){
                    myList[i].description = textArea.value
                }
                build();
            });
            //
            td1.appendChild(textArea);
            textArea.focus();
        });
        const span2 = document.createElement('span');
        span2.innerText='Delete';
        //ajouter un event au bouton delete
        span2.addEventListener('click',function(){
            const reponse = confirm("Voulez-vous vraiment supprimer cette tache?");
            if(reponse){
                const deletedTodo = myList.splice(i,1);
                build();
            }
        });
        //Ajouter les spans dans le td2
        td2.append(span1,span2);
        //Ajouter des td dans le tr
       tr.append(td1,td2);
        //Ajouter du tr dans le table
       table.appendChild(tr)
    }

    //Ajouter le table dans le document
    output.append(table);
}

// .appendChild : permet d'ajouter un seul element
// .append : permet d'ajout plusieurs

//Evens
btnAdd.addEventListener('click',function(){
    //Tester si le champs n.est pas vide
    if(newItem.value.trim() === ''){
        return;
    }
    const newTodo = {description:newItem.value, checked: false};
    //Ajouter le nveau todo a myList : push()
    myList.push(newTodo);
    //Raflechir le html (le DOM)
    build();
});

//
window.onload = build;




{/* <h1>MY LIST</h1>
        <table>
            <tr>
                <td>1ere tache a faire</td>
                <td>
                    <span>delete</span>
                    <span>edit</span>
                </td>
            </tr>
        </table> */}
