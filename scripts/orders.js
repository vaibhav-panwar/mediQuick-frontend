let token = localStorage.getItem("logintoken");
let bigcont = document.getElementById("bigcont");
fetchData()
function fetchData(){
    fetch("https://vast-cyan-turtle-wig.cyclic.app/order", {
        headers: {
            'Content-type': 'Application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        bigcont.innerHTML = "";
        data.forEach((stat)=>{
            let a = createCard(stat.items,stat.bill,stat.address,stat.status,stat.Date,stat._id);
            bigcont.append(a);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}
function createCard(items,bill,address,status,date,id){
    let datee = convertintodate(date);
    let card = document.createElement("div");
    card.setAttribute("class","crd");
    let imgcont = document.createElement("div");
    imgcont.setAttribute("class","imgcont");
    for(let i=0;i<items.length;i++){
        let img = document.createElement("img");
        img.setAttribute("src", `${items[i].productImg}`);
        imgcont.append(img);
    }
    let content  = document.createElement("div");
    content.setAttribute("class","content");
    let p3 = document.createElement("p");
    p3.innerText = `Order ID : ${id}`
    let p1 = document.createElement("p");
    p1.innerText = `Bill: Rs. ${bill} `;
    let p2 = document.createElement("p");
    p2.innerText = `Address : ${address}`;
    let p4 = document.createElement("p");
    p4.innerText = `Status :${status}`;
    let p5 = document.createElement("p");
    p5.innerText = `Order Date: ${datee}`
    let b1 = document.createElement("button");
    b1.setAttribute("class","cancel");
    b1.innerText = "Cancel Order";
    b1.addEventListener("click",()=>{
        fetch(`https://vast-cyan-turtle-wig.cyclic.app/order/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'Application/json',
                'authorization': `Bearer ${token}`
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            alert(data.msg);
            window.location.reload()
        })
        .catch((err)=>{
            alert(err);
            console.log(err);
        })
    })
    content.append(p3,p1,p2,p4,p5,b1);
    card.append(imgcont,content);
    return card
}
function convertintodate(value) {
    if (value == "") {
        return ""
    }
    let timestamp = value
    let date = new Date(timestamp);
    let string = date.toDateString();
    return string;
}

//signup
if (token) {
    document.getElementById("login").style.display = "none";
    document.getElementById("sign").style.display = "none";
    let a1 = document.createElement("a");
    a1.setAttribute("href","./orders.html");
    a1.innerText = localStorage.getItem("username");
    let a2 = document.createElement("a");
    a2.innerText = "Log Out";
    a2.setAttribute("href","#");
    a2.addEventListener("click",(e)=>{
        e.preventDefault();
        localStorage.setItem("username","");
        localStorage.setItem("logintoken","");
        window.location.reload()
    })
    document.getElementById("signup").append(a1,a2);
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
            window.location.reload();
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
            window.location.reload()
        })
        .catch((err) => {
            console.log(err)
            alert(err)
        })
})