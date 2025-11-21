async function ManageWorkSpace() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    const roles = data.roles;
    const zones = data.zones;
    const employees = data.employees;

    const employees_container = document.querySelector(".employees-section");
    const assignedState = "Not Assigned";
    const assignedP = document.getElementById("assignedState");
    employees.map((empl) => {
        if(empl.isAssigned == true){
            assignedState = "Assigned";
            assignedP.style.background = 'rgb(75, 156, 75)';
        }
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
    
    
                `;
      })
      .join();

    /* handle employees menu */
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });

      switch (tab.id) {
        case "all":
      }
    });

    /*  Add employee Form closing/opening */
    const backgroungDiv = document.querySelector(".backgroungDiv");
    const addBtn_call = document.querySelector(".add-employee-btn");
    const addForm = document.querySelector(".form-container");
    addBtn_call.addEventListener("click", () => {
      backgroungDiv.classList.remove("hidden");
    });

    const closeFormBtn = document.getElementById("form-close-btn");
    closeFormBtn.addEventListener("click", () => {
      backgroungDiv.classList.add("hidden");
    });

    const selectRole = document.getElementById("selectRole");
    console.log(roles);
    roles.forEach((role) => {
      selectRole.innerHTML += `<option value="${role}"> ${role} </option> `;
    });

    const selectSalle = document.getElementById("selectSalle");
    zones.forEach((zone) => {
      selectSalle.innerHTML += `<option value="${zone.id}"> ${zone.id} </option> `;
    });

    /*--------------------------------------    ZONES   -------------------------------------- */
    const zoneBtn = document.querySelectorAll(".zone-btn");
    const zoneEmpl = document.getElementById("zone-employees");
    let selectedZoneID = "";
    let SelectedZone = {};
    let zoneReservations = [];

    localStorage.setItem("zoneReservations", JSON.stringify(zoneReservations));

    zoneBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        zoneEmpl.innerHTML = "";
        zoneEmpl.classList.remove("hidden");

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
            if (empl.role === elm && empl.isAssigned === false) {
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
          });
        });
      });
    });

    const AssignedEmplContainer = document.querySelectorAll(".assignedEmpls");

    //calling the details spans
    const imgDetail = document.querySelector(".imageDetails");
    const nameDetail = document.querySelector(".nameDetails");
    const roleDetail = document.querySelector(".roleDetails");
    const emailDetail = document.querySelector(".emailDetails");
    const phoneDetail = document.querySelector(".phoneDetails");
    const zoneDetail = document.querySelector(".zoneDetails");
    // click on employee to reserve
    zoneEmpl.addEventListener("click", (e) => {
      const selectedEmpl = e.target.closest(".Szone");
      const clickedID = selectedEmpl.id;
      const detailsEmplContainer = document.querySelector(".details");

      // load reservations
      zoneReservations =
        JSON.parse(localStorage.getItem("zoneReservations")) || [];
      employees.forEach((empl) => {
        if (empl.id === clickedID) {
          const countCapacity = zoneReservations.filter(
            (r) => r.zoneID === selectedZoneID
          ).length;
          if (countCapacity >= SelectedZone.capacity) {
            zoneEmpl.classList.add("hidden");
            alert("This room is already full!");
            return;
          }
          const newReservation = {
            zoneID: selectedZoneID,
            emplID: empl.id,
          };
          zoneReservations.push(newReservation);
          localStorage.setItem(
            "zoneReservations",
            JSON.stringify(zoneReservations)
          );
          empl.isAssigned = true;
          console.log(empl.isAssigned)
          AssignedEmplContainer.forEach((container) => {
            if (container.classList.contains(selectedZoneID)) {
              container.innerHTML += `
                    <div id="${empl.id}" class="photo-circle selected" style="background-image: url(${empl.imgSRC});"></div>
                    `;
            }
            // Calling the details container and assigne the correct employee information to it
            const selectedEmpls = document.querySelectorAll(".selected");

            selectedEmpls.forEach((sEmpl) => {
              sEmpl.addEventListener("click", (event) => {
                const TheEmplID = event.target.closest(".selected").id;
                const TheEmpl = employees.find((empl) => empl.id === TheEmplID);
                console.log(TheEmpl);
                detailsEmplContainer.classList.remove("hidden");
                imgDetail.style.backgroundImage = `url(${TheEmpl.imgSRC})`;
                nameDetail.innerHTML = `${TheEmpl.firstName} ${TheEmpl.lastName}`;
                roleDetail.innerHTML = `${TheEmpl.role}`;
                emailDetail.innerHTML = `${TheEmpl.id}`;
                phoneDetail.innerHTML = `${TheEmpl.telephone}`;
                zoneDetail.innerHTML = `${TheEmpl.assigned_place}`;
              });
            });
          });
          zoneEmpl.classList.add("hidden");
          
        }
      });
      console.log(selectedEmpls);
    });

    document.addEventListener("click", (e) => {
      //close the window if we clicked outside it
      if (!zoneEmpl.contains(e.target)) {
        zoneEmpl.classList.add("hidden");
      }
    });

    const closeDetails = document.querySelector(".details-close");
    const DetailsEmp = document.querySelector(".details");
    closeDetails.addEventListener("click", () => {
      DetailsEmp.classList.add("hidden");
    });

    // Add Experience
    function creatExperienceFrom() {
      ExpContainer.insertAdjacentHTML(
        "beforeend",
        `
                                <div class="experience">
                                    <p class="expNum">Experience : ${expCount}</p>
                                    <button class="close-btn">
                                        <span class="material-icons Delete-Exp-icon">close</span>
                                    </button>
                                    <div class="form-group full-width">
                                        <label class="required">Poste</label>
                                        <input id="poste${expCount}" class="poste" type="text" placeholder="Post Occupied..." required>
                                    </div>
            
                                    <div class="form-group full-width">
                                        <label class="required">Company</label>
                                        <input id="company${expCount}" class="company" type="text" placeholder="Post Occupied..." required>
                                    </div>
            
                                    <div class="form-group">
                                        <label class="required">From</label>
                                        <input id="from${expCount}" class="from" type="date" placeholder="Post Occupied..." required>
                                    </div>
            
                                    <div class="form-group">
                                        <label class="required">To</label>
                                        <input id="to${expCount}" class="to" type="date" placeholder="Post Occupied..." required>
                                    </div>                         
                                </div>
                    `
      );
    }
    const addExpBtn = document.querySelector(".addExp-btn");
    const ExpContainer = document.querySelector(".experience-container");
    let expCount = 2;
    addExpBtn.addEventListener("click", () => {
      ExpContainer.insertAdjacentHTML("beforeend", creatExperienceFrom());
      expCount++;

      //delete an experience
      const deleteExpBtn = document.querySelectorAll(".Delete-Exp-icon");
      deleteExpBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          const parent = btn.closest(".experience");
          parent.remove();
          expCount--;
        });
      });
    });
    // add employee
    const addEmplBtn = document.querySelector(".submit-btn");
    addEmplBtn.addEventListener("click", () => {
      const firstName = document.getElementById("firstN");
      const lastName = document.getElementById("lastN");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      let img = document.getElementById("img");
      const role = document.getElementById("selectRole");
      const salle = document.getElementById("selectSalle");
      let defaultImg  = document.querySelector('.default');


      let assigned = false;
      let experiences = [];

      for (let i = 1; i <= expCount; i++) {
        const poste = document.getElementById(`poste` + i);
        const company = document.getElementById(`company` + i);
        const from = document.getElementById(`from` + i);
        const to = document.getElementById(`to` + i);

        console.log(poste);
        if (poste && company && from && to) {
          experiences.push({
            poste: poste.value,
            company: company.value,
            from: from.value,
            to: to.value,
          });
        }
      }


      //CHANGE THE PROFILE IMAGE DEPENDING ON THE VALUE OF THE IMG INPUT
      // })
    document.getElementById("img").addEventListener('change', (e) => {
    //   if (img.value === "") {
    //     img = "https://avatar.iran.liara.run/public/boy";
    //     defaultImg.style.backgroundImage = `url("https://avatar.iran.liara.run/public/boy")`
    //   }else{
    //     defaultImg.style.backgroundImage = `url(${e.target.value})`
    //   }
    // imgInput.addEventListener("change", (e) => {
    const value = e.target.value.trim();

    if (value === "") {
        defaultImg.style.backgroundImage =
            "url('https://avatar.iran.liara.run/public/boy')";
    } else {
        defaultImg.style.backgroundImage =
            `url('${value}')`;
    }
// });

})
      if (salle !== "") {
        assigned = true;
      }

      const new_Empl = {
        id: email,
        firstName: firstName.value,
        lastName: lastName.value,
        telephone: phone.value,
        imgSRC: img.value,
        role: role.value,
        isAssigned: assigned,
        assigned_place: salle.value,
        experiences: experiences,
      };
      employees.push(new_Empl);
      console.log("new emloyee", new_Empl.experiences);
      console.log(employees);

document.getElementById("firstN").value = "";
document.getElementById("lastN").value = "";
document.getElementById("email").value = "";
document.getElementById("phone").value = "";
document.getElementById("img").value = "";
document.getElementById("selectRole").value = "";
document.getElementById("selectSalle").value = "";

ExpContainer.innerHTML = "";
expCount = 1;
creatExperienceFrom();

document.querySelectorAll(".experience input").forEach(input=>{
    input.value = "";
});

      backgroungDiv.classList.add("hidden");
    });

    console.log(data);
    console.log(zones);
    console.log(employees);
    console.log(roles);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
}
ManageWorkSpace();
