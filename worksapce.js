async function loadData() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    let employees = data.employees;
    const zones = data.zones;
    const roles = data.roles;

    let Filtered = employees;
    let SelectedZone = {};
    let selectedZoneID = "";
    let zoneReservations = [];
    let clickedEmplID;

    let isValideExp = true;

    const zoneEmpl = document.getElementById("zone-employees");

    /*---------------------------    SHOW AVAILABLE EMPLOYEES    --------------------------------- */
    function showAvailableEmployees() {
      employees.forEach((empl) => {
        if (
          SelectedZone.access.includes(empl.role) &&
          empl.isAssigned === false
        ) {
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
    }

    /*-------------------   get selected  employee id   ----------------------------------------   */
    function SelectedEmployee() {
      zoneEmpl.addEventListener("click", (e) => {
        const selectedEmpl = e.target.closest(".Szone");
        clickedEmplID = selectedEmpl.id;
        makeReservation();
        // showAvailableEmployees();
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
      zoneReservations =
        JSON.parse(localStorage.getItem("zoneReservations")) || [];
      const countCapacity = checkZoneCapacity();

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
          empl.assigned_place = selectedZoneID;
          AssignedEmplContainer.forEach((container) => {
            if (container.classList.contains(selectedZoneID)) {
              container.innerHTML += `
                        <div id="${empl.id}" class="photo-circle selected" style="background-image: url(${empl.imgSRC});"><span class="material-icons deleteEmplfromZone">close</span></div>
                        `;
            }
            showDetails();
            if (countCapacity >= SelectedZone.capacity - 1) {
              document.getElementById(selectedZoneBtn).classList.add("hidden");
              return;
            }
          });
        }
      });
      // console.log("les reservation actuels", zoneReservations);

      deleteEmplFromAZone();
      displayEmployees(Filtered);
      zoneColorChange();  

    }

    /*--------------------------------------  DELETE EMPLOYEE FROM A ZONE ------------------------------------- */
    function deleteEmplFromAZone() {
      const DeleteButtons = document.querySelectorAll(".deleteEmplfromZone");
      DeleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const emplID = btn.closest(".selected").id;
          const emplIconInZone = btn.closest(".selected");
          employees.forEach((empl) => {
            if (empl.id === emplID) {
              empl.isAssigned = false;
              empl.assigned_place = null;
              emplIconInZone.remove();
              displayEmployees(Filtered);
            }
          });
          zoneReservations =
            JSON.parse(localStorage.getItem("zoneReservations")) || [];
          zoneReservations = zoneReservations.filter(
            (r) => r.emplID !== emplID
          );
          localStorage.setItem(
            "zoneReservations",
            JSON.stringify(zoneReservations)
          );

          const currentCapacity = checkZoneCapacity();
          if (currentCapacity < SelectedZone.capacity) {
            document.getElementById(selectedZoneBtn).classList.remove("hidden");
          }
          zoneColorChange()
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
      const expContaine = document.querySelector(".emp_experiencesDetails");

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

          expContaine.innerHTML = "";
          TheEmpl.experiences.forEach((exp) => {
            expContaine.innerHTML += `
              <div class="expBloc">
                <p><b>Poste</b> : ${exp.poste}</p>
                <p><b>Company</b> : ${exp.company}</p>
                <p><b>From</b> : ${exp.from}</p>
                <p><b>To</b> : ${exp.to}</p>
              </div>
            `;
          });
        });
      });
      closeDetailsWindow();
    }

    /*------------------------------------    CLOSE DETAILS WINDOW    ------------------------------------ */
    function closeDetailsWindow() {
      const closeDetails = document.querySelector(".details-close");
      closeDetails.addEventListener("click", () => {
        detailsEmplContainer.classList.add("hidden");
      });
    }

    /* ------------------------------    DISPLAY EMPLOYEES    ------------------------------- */

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
        // <button class="edit-btn">
        //     <span class="material-icons">edit</span>
        // </button>
        employees_container.innerHTML += `
                        <div id="${empl.id}" class="employee-card">
                            <button class="close-btn">
                                <span class="material-icons deleteEmployee">close</span>
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

    const TheFormOfAdd = document.querySelector(".form-container");
    function addForm() {
      const addBtn_call = document.querySelector(".add-employee-btn");
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

    let expCount = 2;
    let experiences = [];
    const ExpContainer = document.querySelector(".experience-container");
    const backgroungDiv = document.querySelector(".backgroungDiv");

    /* -------------------------    CREATE EXPERIMENT FORM    ---------------------------- */

    function createExperienceForm() {
      // ExpContainer.insertAdjacentHTML(
      //   "beforeend",
      return `
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
                        `;
      // );
    }

    /* ==============================    ADDING/DELETING EXPERIENCE   ============================ */
    /*--------------------------    ADD EXPERIENCE    ----------------------------------- */

    function AddExperiences() {
      const addExpBtn = document.querySelector(".addExp-btn");
      addExpBtn.addEventListener("click", () => {
        ExpContainer.insertAdjacentHTML("beforeend", createExperienceForm());
        expCount++;
        DeleteExperience();
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

    const imgInput = document.getElementById("img");
    const defaultImg = document.querySelector(".image");
    console.log("defaultImg");

    imgInput.addEventListener("change", (e) => {
      const value = e.target.value.trim();
      const url = "https://mockmind-api.uifaces.co/content/human/125.jpg";
      if (value === "") {
        defaultImg.setAttribute("src", url);
      } else {
        defaultImg.setAttribute("src", value);
      }
    });

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
    document
      .querySelector(".experience-container")
      .addEventListener("input", experienceInputValidation);

    /*------------------------- Experiences inputs validation ------------------------------ */
    function experienceInputValidation() {
      const experiences = document.querySelectorAll(".experience");
      for (const exp of experiences) {
        const poste = exp.querySelector(".poste");
        const company = exp.querySelector(".company");
        const from = exp.querySelector(".from");
        const to = exp.querySelector(".to");

        if (
          !regex.poste.test(poste.value) ||
          !regex.company.test(company.value) ||
          new Date(from.value) > new Date(to.value)
        ) {
          isValideExp = false;
          document.getElementById("errorMsg").innerHTML =
            "Your informations are incorrect!";
        } else {
          isValideExp = true;
          document.getElementById("errorMsg").innerHTML = "";
        }
      }
    }
    /* -------------------------    FORM VALIDATION    ---------------------------- */

    const regex = {
      // firstN : /^[a-z]{3,25}(\s[a-z]{3,25})?$/i,
      firstN: /^[A-Z]?[a-z]{3,25}(\s[A-Z]?[a-z]{3,25})?$/,
      lastN: /^[a-z]{3,25}(\s[a-z]{3,25})?$/i,
      email: /^[a-z\d.!#$%&'*+-/=?^_]{5,}@[a-z]{4,}.[a-z]{2,}$/i,
      phone: /^0[5-7][0-9]{8}$/,
      poste: /^[a-z]{2,}$/i,
      company: /^[a-z&@^'!\d]{2,}(\s[a-z]+)*$/i,
      img: /^[^\0\s]*$/,
      selectRole: /^[^\0]*$/,
    };

    document.getElementById("form").addEventListener("input", (e) => {
      let input = e.target;
      if (!regex[input.getAttribute("id")].test(input.value)) {
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#dee2e6";
      }
    });

    /* -------------------------    ADD EMPLOYEE    ---------------------------- */
    function AddEmployee() {
      const addEmplBtn = document.querySelector(".submit-btn");
      addEmplBtn.addEventListener("click", () => {
        let isValide = true;
        document.querySelectorAll("#form input").forEach((input) => {
          if (!regex[input.getAttribute("id")].test(input.value)) {
            isValide = false;
          }
        });
        if (isValide && isValideExp) {
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
            imgSRC: img.value || "assets/defaultProfile.jpg",
            role: role.value,
            isAssigned: assigned,
            assigned_place: salle.value,
            experiences: experiences,
          };
          employees.push(newEmployee);
          resetForm();
          backgroungDiv.classList.add("hidden");
          displayEmployees(Filtered);

          console.log("new emloyee", newEmployee);
          console.log("new emloyee experiences", newEmployee.experiences);
          console.log("all empls", employees);
        } else {
          alert("Error: invalid values.");
          return;
        }
      });
    }

    /*---------------------------------------  Forme validation ------------------------------------ */
    // function FormValidation(input, regex) {
    //   if (!regex.test(input)) {
    //     isValide = false;
    //   }
    // }

    /*----------------------------------  Delete Employee ---------------------------------------------- */
    function DeleteNotAssignedEmployee() {
      employees_container.addEventListener("click", (e) => {
        if (e.target.classList.contains("deleteEmployee")) {
          const emplID = e.target.closest(".employee-card").id;
          const emplCard = e.target.closest(".employee-card");
          const empl = employees.find((e) => e.id === emplID);
          if (empl.isAssigned === false) {
            employees = employees.filter((e) => e.id !== emplID);
            emplCard.remove();
          }
        }
      });
    }
    /*--------------------------------- change zone color if not empty  ------------------------ */

     function zoneColorChange(){
      zoneReservations = JSON.parse(localStorage.getItem("zoneReservations")) || [];
      const rooms = ["server_room", "reception", "security_room", "archives"]
      
      zoneReservations.forEach((r) => {
        for(let room of rooms){
          if(r.zoneID === room) {
            document.getElementsByClassName(room)[0].closest('.zone').style.backgroundColor = 'rgba(57, 171, 99, 0.651)';
        }
        else{
          document.getElementsByClassName(room)[0].closest('.zone').style.backgroundColor = 'rgba(182, 69, 69, 0.651)';
        }
        }
      })
         }

    /*--------------------------------------------------------------------------------------------------- */
    document.addEventListener("click", (e) => {
      //close the window if we clicked outside it
      if (!zoneEmpl.contains(e.target)) {
        zoneEmpl.classList.add("hidden");
      }
    });
    
    // CALL ALL FUNCTIONS
    emplMenu();
    addForm();
    getClickedZone();
    SelectedEmployee();
    displayEmployees(Filtered);
    AddExperiences();
    DeleteExperience();
    AddEmployee();
    DeleteNotAssignedEmployee();
    console.log(zoneReservations);
  } catch (error) {
    console.error("Failed to load DATA!", error);
  }
}
loadData();
