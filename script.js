async function ManageWorkSpace(){
    try{
        const res = await fetch("data.json");
        const data = await res.json();
        console.log(data);
        


    }catch(error){
        console.error("Failed to fetch data",error);
    }
}
ManageWorkSpace();