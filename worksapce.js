// async function loadData() {
//   try {
//     const res = await fetch("data.json");
//     const data = await res.json();

//     const employees = data.employees;
//     const zones = data.zones;
//     const roles = data.roles;

//     let Filtered = employees;
//     let SelectedZone = {};
//     let selectedZoneID = "";
//     let zoneReservations = [];
//     let clickedEmplID;

//     const zoneEmpl = document.getElementById("zone-employees");

//     /*---------------------------    SHOW AVAILABLE EMPLOYEES    --------------------------------- */
//     function showAvailableEmployees() {
//       employees.forEach((empl) => {
//         SelectedZone.access.forEach((elm) => {
//           if (empl.role === elm && empl.isAssigned === false) {
//             zoneEmpl.innerHTML += `
//                     <div id="${empl.id}" class="employee-header Szone">
//                         <div class="photo-circle" style="background-image: url(${empl.imgSRC});" ></div>
//                         <div class="employee-info">
//                             <div class="employee-name">${empl.firstName} ${empl.lastName}</div>
//                             <div class="employee-role">${empl.role}</div>
//                         </div>
//                     </div>
//                 `;
//           }
//         });
//       });
//     }

//     /*-------------------   get selected  employee id   */
//     function SelectedEmployee() {
//       zoneEmpl.addEventListener("click", (e) => {
//         const selecpEmpl = e.target.closest(".Szone");
//         clickedEmplID = selecpEmpl.id;
//       });
//     }
//     /*-------------------------------   SELECT CLICKED ZONE     ------------------------------------------ */
//     const zoneBtn = document.querySelectorAll(".zone-btn");
//     let selectedZoneBtn = "";
//     function getClickedZone() {
//       localStorage.setItem(
//         "zoneReservations",
//         JSON.stringify(zoneReservations)
//       );

//       zoneBtn.forEach((btn) => {
//         btn.addEventListener("click", (e) => {
//           e.stopPropagation();
//           zoneEmpl.innerHTML = "";
//           zoneEmpl.classList.remove("hidden");
//           selectedZoneBtn = btn.id;

//           zones.forEach((zone) => {
//             if (e.target.id === zone.id) {
//               SelectedZone = zone;
//               selectedZoneID = zone.id;
//             }
//           });

//           // show zone name
//           const currentCapacity = checkZoneCapacity();
//           zoneEmpl.innerHTML += `<p id="zoneName">${SelectedZone.id} ${currentCapacity} / ${SelectedZone.capacity}}</p>`; // <= <= <= HNAAAAAAAAAAA
//           showAvailableEmployees();
//           SelectedEmployee();
//         });
//       });
//     }

//     /*=================================     SELECT EMPL , CHECK ROOM CAPACITY, SHOW SELECTED EMPL   =============================== */
//     let countCapacity = 0;
//     /*-------------------------    ZONE CAPACITY   -------------------- */
//     function checkZoneCapacity() {
//       zoneReservations =
//         JSON.parse(localStorage.getItem("zoneReservations")) || [];
//       countCapacity = zoneReservations.filter(
//         (r) => r.zoneID === selectedZoneID
//       ).length;
//       return countCapacity;
//     }

//     /*--------------------------    MAKE RESERVATION    ----------------------- */
//     function makeReservation() {
//       const AssignedEmplContainer = document.querySelectorAll(".assignedEmpls");
//       const zoneReservations =
//         JSON.parse(localStorage.getItem("zoneReservations")) || [];
//       const countCapacity = checkZoneCapacity();

//       if (countCapacity >= SelectedZone.capacity) {
//         document.getElementById(selectedZoneBtn).classList.add("hidden");
//         return;
//       }
//       const newReservation = {
//         zoneID: selectedZoneID,
//         emplID: clickedEmplID,
//       };
//       zoneReservations.push(newReservation);
//       localStorage.setItem(
//         "zoneReservations",
//         JSON.stringify(zoneReservations)
//       );
//       employees.forEach((empl) => {
//         //change the status of the selected employee
//         if (empl.id === clickedEmplID) {
//           empl.isAssigned = true;
//           AssignedEmplContainer.forEach((container) => {
//             if (container.classList.contains(selectedZoneID)) {
//               container.innerHTML += `
//                         <div id="${empl.id}" class="photo-circle selected" style="background-image: url(${empl.imgSRC});"></div>
//                         `;
//             }
//           });
//         }
//       });
//     }
//     /*--------------------------------------    SHOW EMPLOYEE DETAILS (CV)  --------------------------------- */
//     const detailsEmplContainer = document.querySelector(".details");

//     //calling the details spans
//     const imgDetail = document.querySelector(".imageDetails");
//     const nameDetail = document.querySelector(".nameDetails");
//     const roleDetail = document.querySelector(".roleDetails");
//     const emailDetail = document.querySelector(".emailDetails");
//     const phoneDetail = document.querySelector(".phoneDetails");
//     const zoneDetail = document.querySelector(".zoneDetails");

//     function showDetails() {
//       const selectedEmpls = document.querySelectorAll(".selected");

//       selectedEmpls.forEach((sEmpl) => {
//         sEmpl.addEventListener("click", (event) => {
//           const TheEmplID = event.target.closest(".selected").id;
//           const TheEmpl = employees.find((empl) => empl.id === TheEmplID);
//           console.log(TheEmpl);
//           detailsEmplContainer.classList.remove("hidden");
//           imgDetail.style.backgroundImage = `url(${TheEmpl.imgSRC})`;
//           nameDetail.innerHTML = `${TheEmpl.firstName} ${TheEmpl.lastName}`;
//           roleDetail.innerHTML = `${TheEmpl.role}`;
//           emailDetail.innerHTML = `${TheEmpl.id}`;
//           phoneDetail.innerHTML = `${TheEmpl.telephone}`;
//           zoneDetail.innerHTML = `${TheEmpl.assigned_place}`;
//         });
//       });
//     }

//     /*------------------------------------    CLOSE DETAILS WINDOW    ------------------------------------ */
//     function closeDetailsWindow() {
//       const closeDetails = document.querySelector(".details-close");
//       closeDetails.addEventListener("click", () => {
//         detailsEmplContainer.classList.add("hidden");
//       });
//     }

//     /*-----------------------   CLOSE DEATAILS WINDOW   ------------------------------------ */
//     function closeZoneEmployees() {
//       function closeDetailsWindow() {
//         const closeDetails = document.querySelector(".details-close");
//         closeDetails.addEventListener("click", () => {
//           detailsEmplContainer.classList.add("hidden");
//         });
//       }
//     }

//     /*======================================================================================================== */
//     /* -------------------------    DISPLAY EMPLOYEES    ---------------------------- */

//     const employees_container = document.querySelector(".employees-section");
//     function displayEmployees(empls) {
//       employees_container.innerHTML = "";
//       empls.forEach((empl) => {
//         let assignedState = "Not Assigned";
//         let assignedColor = "rgb(242, 89, 89)";

//         if (empl.isAssigned == true) {
//           assignedState = "Assigned";
//           assignedColor = "rgb(75, 156, 75)";
//         }
//         employees_container.innerHTML += `
//                         <div id="${empl.id}" class="employee-card">
//                             <button class="close-btn">
//                                 <span class="material-icons">close</span>
//                             </button>
//                             <button class="edit-btn">
//                                 <span class="material-icons">edit</span>
//                             </button>
//                             <div class="employee-header">
//                                 <div class="photo-circle" style="background-image: url(${empl.imgSRC});" ></div>
//                                 <div class="employee-info">
//                                     <div class="employee-name">${empl.firstName} ${empl.lastName}</div>
//                                     <div class="employee-role">${empl.role}</div>
//                                 </div>
//                             </div>
//                             <div class="employee-details">
//                                 <div class="detail-item">
//                                     <span class="material-icons">location_on</span>
//                                     <span class="detail-label">Location:</span>
//                                     <span class="detail-value">${empl.assigned_place}</span>
//                                 </div>
//                                 <p class="assignedState" style="background: ${assignedColor};">${assignedState}</p>
//                             </div>
//                         </div>
//                     `;
//       });
//     }

//     /* -------------------------    EMPLOYEES MENU    ---------------------------- */

//     function emplMenu() {
//       const tabs = document.querySelectorAll(".tab");
//       tabs.forEach((tab) => {
//         tab.addEventListener("click", () => {
//           tabs.forEach((t) => t.classList.remove("active"));
//           tab.classList.add("active");

//           switch (tab.id) {
//             case "all":
//               Filtered = employees;
//               break;
//             case "assigned":
//               Filtered = employees.filter((empl) => empl.isAssigned === true);
//               break;
//             case "noAssigned":
//               Filtered = employees.filter((empl) => empl.isAssigned === false);
//               break;
//           }
//           displayEmployees(Filtered);
//         });
//       });
//     }

//     /* -------------------------    OPENING/CLOSING ADD FORM    +   DYNAMIQUE SLECT ZONE/ROLE    ---------------------------- */

//     function addForm() {
//       const addBtn_call = document.querySelector(".add-employee-btn");
//       const addForm = document.querySelector(".form-container");
//       addBtn_call.addEventListener("click", () => {
//         backgroungDiv.classList.remove("hidden");
//       });

//       const closeFormBtn = document.getElementById("form-close-btn");
//       closeFormBtn.addEventListener("click", () => {
//         backgroungDiv.classList.add("hidden");
//       });

//       const selectRole = document.getElementById("selectRole");
//       console.log(roles);
//       roles.forEach((role) => {
//         selectRole.innerHTML += `<option value="${role}"> ${role} </option> `;
//       });

//       const selectSalle = document.getElementById("selectSalle");
//       zones.forEach((zone) => {
//         selectSalle.innerHTML += `<option value="${zone.id}"> ${zone.id} </option> `;
//       });
//     }

//     let expCount = 1;
//     let experiences = [];
//     const ExpContainer = document.querySelector(".experience-container");
//     const backgroungDiv = document.querySelector(".backgroungDiv");

//     /* -------------------------    CREATE EXPERIMENT FORM    ---------------------------- */

//     function createExperienceForm() {
//       ExpContainer.insertAdjacentHTML(
//         "beforeend",
//         `
//                                     <div class="experience">
//                                         <p class="expNum">Experience : ${expCount}</p>
//                                         <button class="close-btn">
//                                             <span class="material-icons Delete-Exp-icon">close</span>
//                                         </button>
//                                         <div class="form-group full-width">
//                                             <label class="required">Poste</label>
//                                             <input id="poste${expCount}" class="poste" type="text" placeholder="Post Occupied..." required>
//                                         </div>

//                                         <div class="form-group full-width">
//                                             <label class="required">Company</label>
//                                             <input id="company${expCount}" class="company" type="text" placeholder="Post Occupied..." required>
//                                         </div>

//                                         <div class="form-group">
//                                             <label class="required">From</label>
//                                             <input id="from${expCount}" class="from" type="date" placeholder="Post Occupied..." required>
//                                         </div>

//                                         <div class="form-group">
//                                             <label class="required">To</label>
//                                             <input id="to${expCount}" class="to" type="date" placeholder="Post Occupied..." required>
//                                         </div>
//                                     </div>
//                         `
//       );
//     }

//     /* -------------------------    ADDING/DELETING EXPERIENCE    ---------------------------- */

//     function AddExperiences() {
//       const addExpBtn = document.querySelector(".addExp-btn");
//       addExpBtn.addEventListener("click", () => {
//         ExpContainer.insertAdjacentHTML("beforeend", createExperienceForm());
//         expCount++;
//       });
//     }

//     /*--------------------------    DELET EXPERIENCE    ----------------------------------- */
//     function DeleteExperience() {
//       const deleteExpBtn = document.querySelectorAll(".Delete-Exp-icon");
//       deleteExpBtn.forEach((btn) => {
//         btn.addEventListener("click", () => {
//           const parent = btn.closest(".experience");
//           parent.remove();
//           expCount--;
//         });
//       });
//     }
//     /* -------------------------    HANDLE IMAGE CHANGE    ---------------------------- */

//     function handleImageChange() {
//       const imgInput = document.getElementById("img");
//       const defaultImg = document.querySelector(".default");

//       imgInput.addEventListener("change", (e) => {
//         const value = e.target.value.trim();
//         if (value === "") {
//           defaultImg.style.backgroundImage =
//             "url('https://avatar.iran.liara.run/public/boy')";
//         } else {
//           defaultImg.style.backgroundImage = `url('${value}')`;
//         }
//       });
//     }

//     /* -------------------------    RESET FORM    ---------------------------- */

//     function resetForm() {
//       // clear form inputs
//       document.getElementById("firstN").value = "";
//       document.getElementById("lastN").value = "";
//       document.getElementById("email").value = "";
//       document.getElementById("phone").value = "";
//       document.getElementById("img").value = "";
//       document.getElementById("selectRole").value = "";
//       document.getElementById("selectSalle").value = "";

//       // reset experiences
//       const ExpContainer = document.querySelector(".experience-container");
//       ExpContainer.innerHTML = "";
//       expCount = 1;
//       ExpContainer.insertAdjacentHTML("beforeend", createExperienceForm());

//       // rlear experience inputs
//       document.querySelectorAll(".experience input").forEach((input) => {
//         input.value = "";
//       });
//     }

//     /* -------------------------    GET EXPERIMENTS    ---------------------------- */

//     function getExperiencesValue() {
//       let experiences = [];
//       for (let i = 1; i <= expCount; i++) {
//         const poste = document.getElementById(`poste${i}`);
//         const company = document.getElementById(`company${i}`);
//         const from = document.getElementById(`from${i}`);
//         const to = document.getElementById(`to${i}`);

//         if (poste && company && from && to) {
//           experiences.push({
//             poste: poste.value,
//             company: company.value,
//             from: from.value,
//             to: to.value,
//           });
//         }
//       }
//       return experiences;
//     }

//     /* -------------------------    ADD EMPLOYEE    ---------------------------- */
//     function AddEmployee() {
//       const addEmplBtn = document.querySelector(".submit-btn");
//       const firstName = document.getElementById("firstN");
//       const lastName = document.getElementById("lastN");
//       const email = document.getElementById("email");
//       const phone = document.getElementById("phone");
//       let img = document.getElementById("img");
//       const role = document.getElementById("selectRole");
//       const salle = document.getElementById("selectSalle");

//       let assigned = false;
//       const experiences = getExperiencesValue();

//       if (salle.value !== "") {
//         assigned = true;
//       }
//       const newEmployee = {
//         id: email.value,
//         firstName: firstName.value,
//         lastName: lastName.value,
//         telephone: phone.value,
//         imgSRC: img.value || "https://avatar.iran.liara.run/public/boy",
//         role: role.value,
//         isAssigned: assigned,
//         assigned_place: salle.value,
//         experiences: experiences,
//       };

//       addEmplBtn.addEventListener("click", () => {
//         employees.push(newEmployee);
//         resetForm();
//         backgroungDiv.classList.add("hidden");

//         console.log("new emloyee", newEmployee);
//         console.log("new emloyee experiences", newEmployee.experiences);
//         console.log("all empls", employees);
//       });
//     }

//     /*--------------------------------------------------------------------------------------------------- */
//   } catch (error) {
//     console.error("Failed to load DATA!", error);
//   }
// }
// loadData();
async function loadData() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    const employees = data.employees;
    const zones = data.zones;
    const roles = data.roles;

    let Filtered = employees;
    let SelectedZone = {};
    let selectedZoneID = "";
    let zoneReservations = [];
    let clickedEmplID;

    const zoneEmpl = document.getElementById("zone-employees");

    /*---------------------------    SHOW AVAILABLE EMPLOYEES    --------------------------------- */
    function showAvailableEmployees() {
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
    }

    /*-------------------   get selected  employee id   ----------------------------------------   */
    function SelectedEmployee() {
      zoneEmpl.addEventListener("click", (e) => {
        const selectedEmpl = e.target.closest(".Szone");
        clickedEmplID = selectedEmpl.id;
        makeReservation();
        zoneEmpl.classList.add("hidden");
      });
    }
    /*-------------------------------   SELECT CLICKED ZONE     ------------------------------------------ */
    const zoneBtn = document.querySelectorAll(".zone-btn");
    let selectedZoneBtn = "";
    function getClickedZone() {
      localStorage.setItem(
        "zoneReservations",
        JSON.stringify(zoneReservations)
      );

      zoneBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          zoneEmpl.innerHTML = "";
          zoneEmpl.classList.remove("hidden");
          selectedZoneBtn = btn.id;

          zones.forEach((zone) => {
            if (e.target.id === zone.id) {
              SelectedZone = zone;
              selectedZoneID = zone.id;
            }
          });

          // show zone name
          const currentCapacity = checkZoneCapacity();
          zoneEmpl.innerHTML += `<p id="zoneName">${SelectedZone.id} ${currentCapacity} / ${SelectedZone.capacity}</p>`; // <= <= <= HNAAAAAAAAAAA
          showAvailableEmployees();
          SelectedEmployee();
        });
      });
    }

    let countCapacity = 0;
    /*-------------------------    ZONE CAPACITY   -------------------- */
    function checkZoneCapacity() {
      zoneReservations =
        JSON.parse(localStorage.getItem("zoneReservations")) || [];
      countCapacity = zoneReservations.filter(
        (r) => r.zoneID === selectedZoneID
      ).length;
      return countCapacity;
    }

    /*--------------------------    MAKE RESERVATION    ----------------------- */
    function makeReservation() {
      const AssignedEmplContainer = document.querySelectorAll(".assignedEmpls");
      const zoneReservations =
        JSON.parse(localStorage.getItem("zoneReservations")) || [];
      const countCapacity = checkZoneCapacity();

      if (countCapacity >= SelectedZone.capacity) {
        document.getElementById(selectedZoneBtn).classList.add("hidden");
        return;
      }
      const newReservation = {
        zoneID: selectedZoneID,
        emplID: clickedEmplID,
      };
      zoneReservations.push(newReservation);
      localStorage.setItem(
        "zoneReservations",
        JSON.stringify(zoneReservations)
      );
      employees.forEach((empl) => {
        //change the status of the selected employee
        if (empl.id === clickedEmplID) {
          empl.isAssigned = true;
        }
        AssignedEmplContainer.forEach((container) => {
          if (container.classList.contains(selectedZoneID)) {
            container.innerHTML += `
                        <div id="${empl.id}" class="photo-circle selected" style="background-image: url(${empl.imgSRC});"></div>
                        `;
          }
        });
      });
    }
    /*--------------------------------------    SHOW EMPLOYEE DETAILS (CV)  --------------------------------- */
    const detailsEmplContainer = document.querySelector(".details");

    //calling the details spans
    const imgDetail = document.querySelector(".imageDetails");
    const nameDetail = document.querySelector(".nameDetails");
    const roleDetail = document.querySelector(".roleDetails");
    const emailDetail = document.querySelector(".emailDetails");
    const phoneDetail = document.querySelector(".phoneDetails");
    const zoneDetail = document.querySelector(".zoneDetails");

    function showDetails() {
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
    }

    /*------------------------------------    CLOSE DETAILS WINDOW    ------------------------------------ */
    function closeDetailsWindow() {
      const closeDetails = document.querySelector(".details-close");
      closeDetails.addEventListener("click", () => {
        detailsEmplContainer.classList.add("hidden");
      });
    }

    /*======================================================================================================== */
    /* -------------------------    DISPLAY EMPLOYEES    ---------------------------- */

    const employees_container = document.querySelector(".employees-section");
    function displayEmployees(empls) {
      employees_container.innerHTML = "";
      empls.forEach((empl) => {
        let assignedState = "Not Assigned";
        let assignedColor = "rgb(242, 89, 89)";

        if (empl.isAssigned == true) {
          assignedState = "Assigned";
          assignedColor = "rgb(75, 156, 75)";
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
                                <p class="assignedState" style="background: ${assignedColor};">${assignedState}</p>
                            </div>
                        </div>           
                    `;
      });
    }

    /* -------------------------    EMPLOYEES MENU    ---------------------------- */

    function emplMenu() {
      const tabs = document.querySelectorAll(".tab");
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");

          switch (tab.id) {
            case "all":
              Filtered = employees;
              break;
            case "assigned":
              Filtered = employees.filter((empl) => empl.isAssigned === true);
              break;
            case "noAssigned":
              Filtered = employees.filter((empl) => empl.isAssigned === false);
              break;
          }
          displayEmployees(Filtered);
        });
      });
    }

    /* -------------------------    OPENING/CLOSING ADD FORM    +   DYNAMIQUE SLECT ZONE/ROLE    ---------------------------- */

    function addForm() {
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
    }

    let expCount = 1;
    let experiences = [];
    const ExpContainer = document.querySelector(".experience-container");
    const backgroungDiv = document.querySelector(".backgroungDiv");

    /* -------------------------    CREATE EXPERIMENT FORM    ---------------------------- */

    function createExperienceForm() {
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

    /* -------------------------    ADDING/DELETING EXPERIENCE    ---------------------------- */

    function AddExperiences() {
      const addExpBtn = document.querySelector(".addExp-btn");
      addExpBtn.addEventListener("click", () => {
        ExpContainer.insertAdjacentHTML("beforeend", createExperienceForm());
        expCount++;
      });
    }

    /*--------------------------    DELET EXPERIENCE    ----------------------------------- */
    function DeleteExperience() {
      const deleteExpBtn = document.querySelectorAll(".Delete-Exp-icon");
      deleteExpBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          const parent = btn.closest(".experience");
          parent.remove();
          expCount--;
        });
      });
    }
    /* -------------------------    HANDLE IMAGE CHANGE    ---------------------------- */

    function handleImageChange() {
      const imgInput = document.getElementById("img");
      const defaultImg = document.querySelector(".default");

      imgInput.addEventListener("change", (e) => {
        const value = e.target.value.trim();
        if (value === "") {
          defaultImg.style.backgroundImage =
            "url('https://avatar.iran.liara.run/public/boy')";
        } else {
          defaultImg.style.backgroundImage = `url('${value}')`;
        }
      });
    }

    /* -------------------------    RESET FORM    ---------------------------- */

    function resetForm() {
      // clear form inputs
      document.getElementById("firstN").value = "";
      document.getElementById("lastN").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("img").value = "";
      document.getElementById("selectRole").value = "";
      document.getElementById("selectSalle").value = "";

      // reset experiences
      const ExpContainer = document.querySelector(".experience-container");
      ExpContainer.innerHTML = "";
      expCount = 1;
      ExpContainer.insertAdjacentHTML("beforeend", createExperienceForm());

      // rlear experience inputs
      document.querySelectorAll(".experience input").forEach((input) => {
        input.value = "";
      });
    }

    /* -------------------------    GET EXPERIMENTS    ---------------------------- */

    function getExperiencesValue() {
      let experiences = [];
      for (let i = 1; i <= expCount; i++) {
        const poste = document.getElementById(`poste${i}`);
        const company = document.getElementById(`company${i}`);
        const from = document.getElementById(`from${i}`);
        const to = document.getElementById(`to${i}`);

        if (poste && company && from && to) {
          experiences.push({
            poste: poste.value,
            company: company.value,
            from: from.value,
            to: to.value,
          });
        }
      }
      return experiences;
    }

    /* -------------------------    ADD EMPLOYEE    ---------------------------- */
    function AddEmployee() {
      const addEmplBtn = document.querySelector(".submit-btn");
      const firstName = document.getElementById("firstN");
      const lastName = document.getElementById("lastN");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      let img = document.getElementById("img");
      const role = document.getElementById("selectRole");
      const salle = document.getElementById("selectSalle");

      let assigned = false;
      const experiences = getExperiencesValue();

      if (salle.value !== "") {
        assigned = true;
      }
      const newEmployee = {
        id: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        telephone: phone.value,
        imgSRC: img.value || "assets/profile_10.jpg",
        role: role.value,
        isAssigned: assigned,
        assigned_place: salle.value,
        experiences: experiences,
      };

      addEmplBtn.addEventListener("click", () => {
        employees.push(newEmployee);
        resetForm();
        backgroungDiv.classList.add("hidden");

        console.log("new emloyee", newEmployee);
        console.log("new emloyee experiences", newEmployee.experiences);
        console.log("all empls", employees);
      });
    }

    /*--------------------------------------------------------------------------------------------------- */
    document.addEventListener("click", (e) => {
      //close the window if we clicked outside it
      if (!zoneEmpl.contains(e.target)) {
        zoneEmpl.classList.add("hidden");
      }
    });

    // CALL ALL FUNCTIONS
    displayEmployees(Filtered);
    emplMenu();
    addForm();
    getClickedZone();
    SelectedEmployee();
    closeZoneEmployees();
    closeDetailsWindow();
    showDetails();
    AddExperiences();
    DeleteExperience();
    handleImageChange();
    AddEmployee();
  } catch (error) {
    console.error("Failed to load DATA!", error);
  }
}
loadData();
