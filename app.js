const table = document.querySelector('.table');
const body = document.querySelector('body');
const ULlist = document.querySelector('.list');
idDiv = document.querySelector('.id')
nameDiv = document.querySelector('.name')
lastNameDiv = document.querySelector('.last');
capsuleDiv= document.querySelector('.capsule');
ageDiv = document.querySelector('.age');
cityDiv = document.querySelector('.city');
genderDiv = document.querySelector('.gender');
hobbyDiv = document.querySelector('.hobby');
let sortArr = [];
let changeSortArr = [];
const fetchData = async (url) => {
   try {
      const response = await fetch(url);
      const data = response.json();
      return data
   } 
   catch (err) {
      console.log(err);
   }
}
const getDataOfPpl = async () =>{
   const group2 = await fetchData('https://capsules7.herokuapp.com/api/group/two')
   const group1 = await fetchData('https://capsules7.herokuapp.com/api/group/one')
   const arrOfOfIds = group1.concat(group2);
   arrOfOfIds.sort((a, b) => a.id - b.id)
   const arrOfPromiseOfIds = [];
   for (let item of arrOfOfIds){
      const fetchedIds = fetchData(`https://capsules7.herokuapp.com/api/user/${item.id}`);
      arrOfPromiseOfIds.push(fetchedIds);
   }
   const arrOfPpl = await Promise.all(arrOfPromiseOfIds)
   return arrOfPpl
}
const paintRow =   (arrOfData) => {
   const row = document.createElement('div');
   row.classList.add('row');
   arrOfData.forEach((e) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('contenteditable',false)
      cell.textContent = e;
      row.appendChild(cell);
   });
   if(!arrOfData.includes('Id')){
      const btnEdit = document.createElement('button')
      const btnDel = document.createElement('button')
      btnEdit.setAttribute('class','btns edt')
      btnDel.setAttribute('class','btns del')
      const btns =document.createElement('div');
      btns.appendChild(btnEdit)
      btns.appendChild(btnDel)
      btns.setAttribute('class','btn')
      btnEdit.textContent='EDIT'
      btnDel.textContent='DELETE'
      row.appendChild(btns);
      btnDel.addEventListener('click',()=>{btnDel.parentElement.parentElement.remove()})
      btnEdit.addEventListener('click',()=>{
      const cell = btnEdit.parentElement.parentElement.children
      const a = cell[1].getAttribute('contenteditable')
         if(a==='false'){
            for(let i=1;i<cell.length-1;i++){  
               cell[i].setAttribute('contenteditable',true)
            }
         }else if(a==='true'){
            for(let i=1;i<cell.length-1;i++){  
               cell[i].setAttribute('contenteditable',false)
            }
         }
      })
   }
   table.appendChild(row);
};
const setSpinner = (bool) => {
   if (bool) {
     const spinner = document.createElement('h3');
     spinner.setAttribute('class','spin')
     spinner.style.fontSize='40px'
     spinner.textContent = 'Loading...';
     body.appendChild(spinner);
   } else {
     const spinner = document.querySelector('h3');
     spinner.setAttribute('class','spin')
     body.removeChild(spinner);
   }
};
const paintPage = async (changeSortArr) => {
   table.innerHTML=''
   table.innerHTML='<div class="row1"><div class="cell1 id">Id</div><div class="cell1 name">Name</div><div class="cell1 last">Last Name</div><div class="cell1 capsule">Capsule</div><div class="cell1 age">Age</div><div class="cell1 city">City</div><div class="cell1 gender">Gender</div><div class="cell1 hobby">Hobby</div></div>'
   isLoading = true;
   setSpinner(isLoading);
   changeSortArr = await getDataOfPpl();
   changeSortArr.forEach((char) => {
     const newArr = [char.id, char.firstName, char.lastName, char.capsule, char.age,char.city,char.gender,char.hobby,];
     paintRow(newArr);
   });
   isLoading = false;
   setSpinner(isLoading);
}
const restBtn = document.querySelector('.button-reset');
restBtn.addEventListener('click',()=>{
   table.innerHTML=''
   table.innerHTML='<div class="row1"><div class="cell1 id">Id</div><div class="cell1 name">Name</div><div class="cell1 last">Last Name</div><div class="cell1 capsule">Capsule</div><div class="cell1 age">Age</div><div class="cell1 city">City</div><div class="cell1 gender">Gender</div><div class="cell1 hobby">Hobby</div></div>'
   paintPage()
})

paintPage()








