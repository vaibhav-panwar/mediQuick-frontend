let bigcont = document.getElementById("bigcont");
let id = localStorage.getItem("productDetails");
let count = 0;
let pcount = document.getElementById("count");
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let token = localStorage.getItem("logintoken");
if (token) {
    document.getElementById("login").style.display = "none";
    document.getElementById("sign").style.display = "none";
    let a = document.createElement("a");
    a.innerText = localStorage.getItem("username");
    document.getElementById("signup").append(a);
}
let addtocart = document.getElementById("atoc");

pcount.innerText = count;
plus.addEventListener("click",()=>{
    count++;
    pcount.innerText = count;
})
minus.addEventListener("click", () => {
    if(count>0){
        count = count - 1;
        pcount.innerText = count;
    }
})
fetchData()
let proData = JSON.parse(localStorage.getItem("cdata"));
addtocart.addEventListener("click",()=>{
    let obj = {
        productId:proData._id,
        productTitle:proData.title,
        productImg:proData.img,
        productPrice:proData.price,
        productDiscountPrice:proData.discountPrice,
        productBrand:proData.brand,
        quantity:count
    }
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/cart/add`,{
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'authorization':`Bearer ${token}`
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert(data.msg)
        console.log(data);
    })
    .catch((err)=>{
        alert(err)
        console.log(err);
    })
})
function fetchData(){
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/product/${id}`)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        localStorage.setItem("cdata",JSON.stringify(data));
        bigcont.innerHTML="";
        let a = createCard(data.title,data.img,data.price,data.discountPrice,data.description);
        bigcont.append(a);
    })
    .catch((error)=>{
        console.log(error)
    })
}

function createCard(title,img,ogprice,disprice,desc){
    desc = desc.split("\n");
    let discount = Math.floor(((ogprice-disprice)/ogprice)*100);
    let card = document.createElement("div");
    card.innerHTML =`<div class="imgcont">
        <img src="${img}" alt="image">
     </div>
     <div class="content">
        <h1 class="title">${title}</h1>
        <p class="desc"><span class="head">${desc[0]}</span>${desc[1]}</p>
        <p class="prt">Rs.<span class="ogprice">${ogprice}</span>   <span class="discount">${discount}%off</span></p>
        <p class="pr">Rs.<span class="disprice">${disprice}</span></p>
     </div>`
     return card
}

//signup
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