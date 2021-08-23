let myLeads = []

const inputElement = document.getElementById('input-el')
const error = document.getElementById("error");
const listElement = document.getElementById("list-element")
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn')
const inputBtn = document.getElementById('input-btn')


let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );

if (leadsFromLocalStorage)
{
    myLeads = leadsFromLocalStorage
    render(myLeads);
}


inputBtn.addEventListener("click", () => {

    myLeads.push(inputElement.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    if (inputElement.value === '')
    {
        myLeads.pop();
        error.textContent = "Field is empty"

    }else
    {
        error.textContent = " "  
    }

    inputElement.value = ''
    render(myLeads)
})


function render(leads)
{
    let listItems = '';
    for (let i = 0; i < leads.length; i++) {
        if(myLeads[i] !== "")
        {
           listItems += `<li class=''>
        <a href='${leads[i]}' target="_blank" class='text-decoration-none text-success'>- ${leads[i]}</a>
        </li>` 
        }
        
    }
    listElement.innerHTML = listItems
 }


 deleteBtn.addEventListener("dblclick",()=>{
     localStorage.clear();
     myLeads = [];
     render(myLeads);
     error.textContent = " "
 })

 deleteBtn.addEventListener("click",()=>{
    error.textContent = "For delete do a double click"
})


 tabBtn.addEventListener("click", () =>
 {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
     
 })


