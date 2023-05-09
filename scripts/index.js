// var dropdownBtn = document.getElementsByClassName("dropbtn");

// for(let i=0;i<dropdownBtn.length;i++){
//     dropdownBtn.addEventListener("click", function () {
//         var dropdownContent = this.nextElementSibling;
//         if (dropdownContent[i].style.display === "block") {
//             dropdownContent[i].style.display = "none";
//         } else {
//             dropdownContent[i].style.display = "block";
//         }
//     });
// }

//image slider starts
// imgslide()
// function imgslide(){
//     const slid = document.querySelector('.slid');
//     const imag = document.querySelectorAll('.slid img');
//     const dots = document.querySelectorAll('.dot');

//     let counter = 1;
//     const size = imag[0].clientWidth;

//     slid.style.transform = 'translateX(' + (-size * counter) + 'px)';

//     function nexSlide() {
//         if (counter >= imag.length - 1) return;
//         slid.style.transition = 'transform 0.5s ease-in-out';
//         counter++;
//         slid.style.transform = 'translateX(' + (-size * counter) + 'px)';
//         updateDots();
//     }

//     function preSlide() {
//         if (counter <= 0) return;
//         slid.style.transition = 'transform 0.5s ease-in-out';
//         counter--;
//         slid.style.transform = 'translateX(' + (-size * counter) + 'px)';
//         updateDots();
//     }

//     function updateDots() {
//         dots.forEach(dot => dot.classList.remove('active'));
//         dots[counter - 1].classList.add('active');
//     }

//     dots.forEach((dot, index) => {
//         dot.addEventListener('click', () => {
//             counter = index + 1;
//             slid.style.transition = 'transform 0.5s ease-in-out';
//             slid.style.transform = 'translateX(' + (-size * counter) + 'px)';
//             updateDots();

//         });
//     });

//     const nexBt = document.querySelector('.nex-btn');
//     const preBt = document.querySelector('.pre-btn');

//     nexBt.addEventListener('click', nexSlide);
//     preBt.addEventListener('click', preSlide);
// }

//image slider ends

//card slider
var swiper = new Swiper(".slide-content", {
    slidesPerView: 5,
    spaceBetween: 0,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'false',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        320: {
            slidesPerView: 2,
        },
        550: {
            slidesPerView: 3,
        },
        920: {
            slidesPerView: 4,
        },
        1120: {
            slidesPerView: 5,
        }
    },
});
//card slider ends


//getting products
let productDiv = document.getElementById("products1");
let productDiv2 = document.getElementById("products2");
fetchdata(productDiv,1);
fetchdata(productDiv2,2);
function fetchdata(appendLoc,pageno){
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/product?limit=12&page=${pageno}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        appendData(data, appendLoc);
    })
    .catch((err)=>{
        console.log(err);
    })
}
function appendData(deta,whereto){
    whereto.innerHTML = "";
    for(let i=0;i<deta.length;i++){
        let a = createCard(deta[i].title, deta[i].img, deta[i].price, deta[i].discountPrice,deta[i]._id);
        whereto.append(a);
    }
}
function createCard(name, img, ogprice, disprice,id) {
    let card = document.createElement("div");
    card.setAttribute("class", "crd");
    let discount = Math.floor(((ogprice - disprice) / ogprice) * 100);
    if(name.length>=40){
     name = name.slice(0, 40) + '...';
    }
    
    card.innerHTML = `<div id="pimg">
                <img src="${img}" alt="img">
            </div>
            <div id="pcontent">
                <h2>${name}</h2>
                <p>MRP <span class="pPrice">Rs ${ogprice}</span>  <span id="pdisc">   ${discount}% off</span></p>
            <p id="op">Rs. ${disprice}</p>
    </div>`
    card.addEventListener("click", () => {
        localStorage.setItem("productDetails", id);
        location.href = "./productDetails.html"
    })
    return card;
}
let token = localStorage.getItem("logintoken");
if(token){
    document.getElementById("login").style.display = "none";
    document.getElementById("sign").style.display = "none";
    let a = document.createElement("a");
    a.innerText = localStorage.getItem("username");
    document.getElementById("signup").append(a);
}
let login = document.getElementById("login");
login.addEventListener("click",()=>{
    document.querySelector(".popup").classList.add("active");
})
let closebtn = document.querySelector(".close-btn");
closebtn.addEventListener("click",()=>{
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
submit2.addEventListener("click",()=>{
let obj = {
    name:sname.value,
    email:semail.value,
    password:spass.value
}
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/user/register`,{
        method:'POST',
        headers:{
            'Content-type':'Application/json'
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert(data.msg);
    })
    .catch((err)=>{
        console.log(err);
        alert(err);
    })
})
let submit1= document.getElementById("submit1");
let lemail = document.getElementById("email");
let lpass = document.getElementById("password");

submit1.addEventListener("click",()=>{
    let obj={
        email:lemail.value,
        password:lpass.value
    }
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/user/login`,{
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>{
        localStorage.setItem("logintoken",data.token);
        localStorage.setItem("username",data.user);
        document.getElementById("login").style.display="none";
        document.getElementById("sign").style.display = "none";
        let a = document.createElement("a");
        a.innerText = data.user;
        document.getElementById("signup").append(a);
        alert(data.msg);
    })
    .catch((err)=>{
        console.log(err)
        alert(err)
    })
})