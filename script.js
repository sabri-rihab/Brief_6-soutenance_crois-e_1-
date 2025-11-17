async function ManageWorkSpace(){
    try{
        const res = await fetch("data.json");
        const data = await res.json();  

        const roles = data.roles;
        const zones = data.zones;
        const employees = data.employees;

        const employees_container = document.querySelector('.employees-section');

        employees.map(empl => {
            employees_container.innerHTML += `
                <div id="${empl.id}" class="employee-card">
                    <button class="close-btn">
                        <span class="material-icons">close</span>
                    </button>
                    <button class="edit-btn">
                        <span class="material-icons">edit</span>
                    </button>
                    <div class="employee-header">
                        <div class="photo-circle" style="background-image: url(${empl.imgSRC});" ></div>
                        <div class="employee-info">
                            <div class="employee-name">${empl.firstName} ${empl.lastName}</div>
                            <div class="employee-role">${empl.role}</div>
                        </div>
                    </div>
                    <div class="employee-details">
                        <div class="detail-item">
                            <span class="material-icons">location_on</span>
                            <span class="detail-label">Location:</span>
                            <span class="detail-value">${empl.assigned_place}</span>
                        </div>
                    </div>
                </div>


            `
        }).join();

        /* handle employees menu */
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach( tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            })

            switch(tab.id){
                case "all" : 
            }
        })
        
        /*  Add employee Form closing/opening */
        const backgroungDiv = document.querySelector('.backgroungDiv');
        const addBtn_call = document.querySelector('.add-employee-btn');
        const addForm = document.querySelector('.form-container');
        addBtn_call.addEventListener('click', () => {
            backgroungDiv.classList.remove('hidden');
        })

        const closeFormBtn = document.getElementById('form-close-btn');
        console.log(closeFormBtn);
        closeFormBtn.addEventListener('click', () => {
            backgroungDiv.classList.add('hidden');
            console.log("testing");
        })

        /*  form validation */
        
        const selectRole = document.getElementById('selectRole');
        console.log(roles);
        roles.forEach((role) => {
            selectRole.innerHTML += `<option value="${role}"> ${role} </option> `
        })
        
        
        const selectSalle = document.getElementById('selectSalle');
        zones.forEach((zone) => {
            selectSalle.innerHTML += `<option value="${zone.id}"> ${zone.id} </option> `
        })


        console.log(data);
        console.log(zones);
        console.log(employees);
        console.log(roles);
        
        
    }catch(error){
        console.error("Failed to fetch data",error);
    }
}
ManageWorkSpace();

// fetch("data.json")
// .then ((response) => {
//     if (!response.ok) {
//         throw Error ("Error fecth data");
//     }  
//     return response.json();      
// }
// )
// .then ( (employees) => {
//     console.log(employees)
// }
// ).catch((error) => {
//         console.error("Failed to fetch data:", error);
//     });

















// fetch("data.json")
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }  
//         return response.json();      
//     })
//     .then((employees) => {
//         console.log(employees);
//     })
//     .catch((error) => {
//         console.error("Fetch failed:", error);
//         // Handle the error (show message to user, etc.)
//     });



// fetch("data.json")
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }  
//         return response.json();      
//     })
//     .then((data) => {
//         console.log("Employees:", data.employees);
//         console.log("Zones:", data.zones);
//         console.log("Roles:", data.roles);
        
//         // Access individual employees
//         data.employees.forEach(employee => {
//             console.log(`Employee: ${employee.firstName} ${employee.lastName}, ID: ${employee.id}`);
//         });
//     })
//     .catch((error) => {
//         console.error("Failed to fetch data:", error);
//     });