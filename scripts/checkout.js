let token = localStorage.getItem("logintoken");
let bigcont = document.getElementById("bigcont");
let elform = document.querySelector("form");
let address = document.getElementById("address")
let pincode = document.getElementById("pin");
let type = document.getElementById("type");
let sub = document.getElementById("sub");
let cont1 = document.querySelector(".cont1");

sub.addEventListener("click",()=>{
    let obj = {
        address:address.value,
        pincode:pincode.value,
        type:type.value,
    }
    fetch("https://vast-cyan-turtle-wig.cyclic.app/address/add",{
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert(data.msg);
        console.log(data);
    })
    .catch((err)=>{
        alert(err);
        console.log(err);
    })
})
fetchData();


function fetchData(){
    fetch("https://vast-cyan-turtle-wig.cyclic.app/address",{
        headers: {
            'Content-type': 'Application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        cont1.innerHTML="";
        for(let i=0;i<data.length;i++){
            let a = createCard(data[i].address,data[i].pincode,data[i].type);
            cont1.append(a);
        }
    })
    .catch((err)=>console.log(err))
}

function createCard(address,pincode,type){
    let card = document.createElement("div");
    card.setAttribute("class","crd");
    card.innerHTML = `
                    <p>${address}</p>
                    <p>${pincode}</p>
                    <p>${type}</p>
                `
    let btn = document.createElement("button");
    btn.innerText="Place Order";
    btn.addEventListener("click",()=>{
        alert("jmd");
    })
    card.append(btn);
    return card;
}


























//signup
if (token) {
    document.getElementById("login").style.display = "none";
    document.getElementById("sign").style.display = "none";
    let a = document.createElement("a");
    a.innerText = localStorage.getItem("username");
    document.getElementById("signup").append(a);
}
let login = document.getElementById("login");
login.addEventListener("click", () => {
    document.querySelector(".popup").classList.add("active");
})
let closebtn = document.querySelector(".close-btn");
closebtn.addEventListener("click", () => {
    document.querySelector(".popup").classList.remove("active");
})
let signup = document.getElementById("sign");
signup.addEventListener("click", () => {
    document.querySelector(".popup2").classList.add("active");
})
let closebtn2 = document.querySelector(".close-btn2");
closebtn2.addEventListener("click", () => {
    document.querySelector(".popup2").classList.remove("active");
})
let submit2 = document.getElementById("submit2");
let sname = document.getElementById("name2");
let semail = document.getElementById("email2");
let spass = document.getElementById("password2");
submit2.addEventListener("click", () => {
    let obj = {
        name: sname.value,
        email: semail.value,
        password: spass.value
    }
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/user/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.msg);
        })
        .catch((err) => {
            console.log(err);
            alert(err);
        })
})
let submit1 = document.getElementById("submit1");
let lemail = document.getElementById("email");
let lpass = document.getElementById("password");

submit1.addEventListener("click", () => {
    let obj = {
        email: lemail.value,
        password: lpass.value
    }
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/user/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("logintoken", data.token);
            localStorage.setItem("username", data.user);
            document.getElementById("login").style.display = "none";
            document.getElementById("sign").style.display = "none";
            let a = document.createElement("a");
            a.innerText = data.user;
            document.getElementById("signup").append(a);
            alert(data.msg);
        })
        .catch((err) => {
            console.log(err)
            alert(err)
        })
})