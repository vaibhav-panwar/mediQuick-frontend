let token = localStorage.getItem("logintoken");
let tbill = document.getElementById("tbill");
let discount = document.getElementById("discount");
let shipping = document.getElementById("ship");
let tot = document.getElementById("tot");

let bigcont = document.getElementById("bigcont");
fetchData()
document.querySelector("#bill>button").addEventListener("click",()=>{
    alert("Order Placed Successfully")
})
function fetchData(){
    console.log(123);
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/cart`,{
        headers: {
            'Content-type': 'Application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        let totbill = 0;
        let disbill = 0;
        bigcont.innerHTML = "";
        for(let i=0;i<data.length;i++){
            totbill += data[i].productPrice;
            disbill += data[i].productDiscountPrice;
            let a = createCard(data[i].productTitle, data[i].productImg, data[i].productPrice, data[i].productDiscountPrice, data[i].productBrand,data[i].quantity);
            bigcont.append(a);
        }
        tbill.innerText = `Rs. ${totbill}`;
        discount.innerText = `Rs. ${totbill-disbill}`;
        if(disbill>=500){
            shipping.innerText = `Rs. 89`
            tot.innerText = `Rs. ${disbill+89}`
        }
        else{
            shipping.innerText = `Free Shipping`
            tot.innerText = `Rs. ${disbill}`
        }

    })
    .catch((err)=>console.log(err))
}

function createCard(title, img, ogprice, disprice,brand,quantity) {
    let discount = Math.floor(((ogprice - disprice) / ogprice) * 100);
    let card = document.createElement("div");
    card.innerHTML = `<div class="imgcont">
        <img src="${img}" alt="image">
     </div>
     <div class="content">
        <h1 class="title">${title}</h1>
        <p class="bran">${brand}</p>
        <p class="quan">Quantity:${quantity}</p>
        <p class="prt">Rs.<span class="ogprice">${ogprice}</span>   <span class="discount">${discount}%off</span></p>
        <p class="pr">Rs.<span class="disprice">${disprice}</span></p>
     </div>`
    return card
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