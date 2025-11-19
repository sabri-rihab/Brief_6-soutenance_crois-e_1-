async function ManageWorkSpace(){
    try{
        const res = await fetch("data.json");
        const data = await res.json();  

        const roles = data.roles;
        const zones = data.zones;
        const employees = data.employees;

        const employees_container = document.querySelector('.employees-section');
        const assignedState = "Not Assigned";
        const assignedP = document.getElementById('assignedState');
        employees.map(empl => {
            // if(empl.isAssigned == true){
            //     assignedState = "Assigned";
            //     assignedP.style.background = 'rgb(75, 156, 75)';
            // }
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
                            <p id="assignedState" >${assignedState}</p>
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
            // backgroungDiv.
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
        // const zoneBtn = document.querySelectorAll('.zone-btn');
        // const zoneEmpl = document.getElementById('zone-employees');
        // let selectedZoneID = "";
        // let SelectedZone = {};
        // zoneReservations = [];
        // localStorage.setItem(zoneReservations); /// set the reservation is the localStorage
        // zoneBtn.forEach((btn) => {
        //     btn.addEventListener('click',(e) => {
        //         e.stopPropagation();
        //         zoneEmpl.innerHTML = "";
        //         zoneEmpl.classList.remove('hidden');
        //         zones.forEach((zone) => {
        //             if(e.target.id === zone.id){
        //                 SelectedZone = zone;
        //                 selectedZoneID = zone.id;
        //             }
        //         })
        //         zoneEmpl.innerHTML += `<p id="zoneName">${SelectedZone.id}</p>`
        //         employees.forEach((empl) => {
        //             SelectedZone.access.forEach((elm) => {
        //                 if(empl.role === elm && empl.isAssigned === false && countCapacity <= SelectedZone.capacity){
        //                     zoneEmpl.innerHTML += `
        //                         <div id="${empl.id}" class="employee-header Szone">
        //                             <div class="photo-circle" style="background-image: url(${empl.imgSRC});" ></div>
        //                             <div class="employee-info">
        //                                 <div class="employee-name">${empl.firstName} ${empl.lastName}</div>
        //                                 <div class="employee-role">${empl.role}</div>
        //                             </div>
        //                         </div>
        //                     `
        //                 }
        //             })
        //         })
        //     })
        // })

        // const AssignedEmplContainer = document.querySelectorAll('.assignedEmpls'); // when the user select an empl to reserve a certain room
        // zoneEmpl.addEventListener('click', (e) => {
        //     const selectedEmpl = e.target.closest('.Szone');
        //     const clickedID = selectedEmpl.id;
        //     localStorage.getItem(zoneReservations);
        //     employees.forEach((empl) => {
        //         if (empl.id === clickedID) {
        //             console.log(empl);
        //             zoneReservations.forEach((reservation) => {
        //                 if(reservation.)
        //             })
        //             AssignedEmplContainer.forEach((container) => {
        //                 if(container.classList.contains(selectedZoneID)){
        //                     empl.isAssigned = true;
        //                     container.innerHTML += `
        //                         <div class="photo-circle selected" style="background-image: url(${empl.imgSRC});" ></div>
        //                     `
        //                 }

        //             })
        //         }
        //     });
        // });
const zoneBtn = document.querySelectorAll('.zone-btn');
const zoneEmpl = document.getElementById('zone-employees');
let selectedZoneID = "";
let SelectedZone = {};
let zoneReservations = []; 

localStorage.setItem("zoneReservations", JSON.stringify(zoneReservations)); 

zoneBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        zoneEmpl.innerHTML = "";
        zoneEmpl.classList.remove('hidden');

        // get selected zone
        zones.forEach((zone) => {
            if (e.target.id === zone.id) {
                SelectedZone = zone;
                selectedZoneID = zone.id;
            }
        });
        // show zone name
        zoneEmpl.innerHTML += `<p id="zoneName">${SelectedZone.id}</p>`;
        employees.forEach((empl) => {
            SelectedZone.access.forEach((elm) => {
                if (empl.role === elm && empl.isAssigned === false ) {

                    zoneEmpl.innerHTML += `
                        <div id="${empl.id}" class="employee-header Szone">
                            <div class="photo-circle" style="background-image: url(${empl.imgSRC});" ></div>
                            <div class="employee-info">
                                <div class="employee-name">${empl.firstName} ${empl.lastName}</div>
                                <div class="employee-role">${empl.role}</div>
                            </div>
                        </div>
                    `;
                }
            })
        })
    });
});


const AssignedEmplContainer = document.querySelectorAll('.assignedEmpls');

// click on employee to reserve
zoneEmpl.addEventListener('click', (e) => {
    const selectedEmpl = e.target.closest('.Szone');
    const clickedID = selectedEmpl.id;
    const detailsEmplContainer = document.querySelector('.details');
    
    // load reservations 
    zoneReservations = JSON.parse(localStorage.getItem("zoneReservations")) || [];
    employees.forEach((empl) => {
        if (empl.id === clickedID) {
            const countCapacity = zoneReservations.filter(r => r.zoneID === selectedZoneID).length;
            if (countCapacity >= SelectedZone.capacity) {
                zoneEmpl.classList.add('hidden');
                alert("This room is already full!");
                return; 
            }
            const newReservation = {
                zoneID: selectedZoneID,
                emplID: empl.id
            };
            zoneReservations.push(newReservation);
            localStorage.setItem("zoneReservations", JSON.stringify(zoneReservations));
            empl.isAssigned = true;
            AssignedEmplContainer.forEach((container) => {
                if (container.classList.contains(selectedZoneID)) {
                    container.innerHTML += `
                    <div id="${empl.id}" class="photo-circle selected" style="background-image: url(${empl.imgSRC});"></div>
                    `;
                }
                const selectedEmpls = document.querySelectorAll('.selected'); // rani khedama hna <= <= <= <= <= <=
                selectedEmpls.forEach((sEmpl) => {
                    console.log(sEmpl);
                    sEmpl.addEventListener('click', () => {
                        detailsEmplContainer.classList.remove('hidden');
                    })
                })
            });
            zoneEmpl.classList.add('hidden');
        }
    });
    console.log(selectedEmpls);
});

        document.addEventListener('click',(e) => { //close the window if we clicked outside it
            if(!zoneEmpl.contains(e.target)){
                zoneEmpl.classList.add('hidden');
            }
        })



        const closeDetails = document.querySelector('.details-close');
        const DetailsEmp = document.querySelector('.details');
        closeDetails.addEventListener('click', () => {
            DetailsEmp.classList.add('hidden');
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
