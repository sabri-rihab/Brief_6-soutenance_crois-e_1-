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
        closeFormBtn.addEventListener('click', () => {
            backgroungDiv.classList.add('hidden');
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


        /*  validation des champs   => Regex */
        const firstN = document.getElementById('firstN'); // calling inputs
        const lastN = document.getElementById('lastN');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        const regexFN = "/^([A-Za-z]{3,50})+\s[A-Za-z]{3,50}]$/";

        /*--------------------------------------    ZONES   -------------------------------------- */
        const zoneBtn = document.querySelectorAll('.zone-btn');
        const zoneEmpl = document.getElementById('zone-employees');
        let SelectedZone = {}
        zoneBtn.forEach((btn) => {
            btn.addEventListener('click',(e) => {
                e.stopPropagation();
                zoneEmpl.innerHTML = "";
                zoneEmpl.classList.remove('hidden');
                zones.forEach((zone) => {
                    if(e.target.id === zone.id){
                        SelectedZone = zone;
                        var selectedZoneID = zone.id;
                    }
                })
                employees.forEach((empl) => {
                    SelectedZone.access.forEach((elm) => {
                        if(empl.role === elm){
                            zoneEmpl.innerHTML += `
                                <div id="${empl.id}" class="employee-header Szone">
                                    <div class="photo-circle" style="background-image: url(${empl.imgSRC});" ></div>
                                    <div class="employee-info">
                                        <div class="employee-name">${empl.firstName} ${empl.lastName}</div>
                                        <div class="employee-role">${empl.role}</div>
                                    </div>
                                </div>
                            `
                        }
                    })
                })
            })
        })
        const SelectedEmployees = document.querySelectorAll('.Szone');
        SelectedEmployees.forEach((sEmpl) => {
            sEmpl.addEventListener('click', (e) => {
                employees.forEach((empl) => {
                    if(e.target.id === empl.id){
                    console.log(empl);

                    }
                })
            })
        })


        document.addEventListener('click',(e) => { //close the window if we clicked outside it
            if(!zoneEmpl.contains(e.target)){
                zoneEmpl.classList.add('hidden');
            }
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
