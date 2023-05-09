let productDiv = document.getElementById("products1");
let btns = document.getElementById("btns");
let filter = {}
let query = new URLSearchParams(filter);
let categoryInputs = document.querySelectorAll(".filters input[type=radio][class=cat]")
let brandInputs = document.querySelectorAll(".filters input[type=radio][name=brand]")
let healthConcernInputs = document.querySelectorAll(".filters input[type=radio][name=healthConcern]")
let search = document.getElementById("search");
let fms = document.getElementById("fms");
fms.addEventListener("submit",(e)=>{
    e.preventDefault();
    updateFilters();
    filter.title = search.value;
    query = new URLSearchParams(filter);
    fetchdata(1);
})

categoryInputs.forEach((input) => {
    input.addEventListener("change", () => {
        updateFilters();
        query = new URLSearchParams(filter);
        fetchdata(1);
    })
})
brandInputs.forEach((input) => {
    input.addEventListener("change", () => {
        updateFilters();
        query = new URLSearchParams(filter);
        fetchdata(1);
    })
})
healthConcernInputs.forEach((input) => {
    input.addEventListener("change", () => {
        updateFilters();
        query = new URLSearchParams(filter);
        fetchdata(1);
    })
})

fetchdata(1)
function fetchdata(pageno) {
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/product?${query}&limit=9&page=${pageno}`)
        .then((res) => {
            let totalPost = res.headers.get('x-total-count');
            let totalBtn = Math.ceil(totalPost / 9);
            btns.innerHTML = "";
            for (let i = 1; i <= totalBtn; i++) {
                let a = createBtn(i);
                btns.append(a);
            }
            return res.json()
        })
        .then((data) => {
            console.log(data);
            appendData(data, productDiv);
        })
        .catch((error) => {
            console.log(error);
        })
}
function appendData(deta, whereto) {
    whereto.innerHTML = "";
    for (let i = 0; i < deta.length; i++) {
        let a = createCard(deta[i].title, deta[i].img, deta[i].price, deta[i].discountPrice,deta[i]._id);
        whereto.append(a);
    }
}
function createCard(name, img, ogprice, disprice,id) {
    let card = document.createElement("div");
    card.setAttribute("class", "crd");
    let discount = Math.floor(((ogprice - disprice) / ogprice) * 100);
    if (name.length >= 40) {
        name = name.slice(0, 40) + '...';
    }

    card.innerHTML = ` <div id="pimg">
                <img src="${img}" alt="img">
            </div>
            <div id="pcontent">
                <h2>${name}</h2>
                <p>MRP <span class="pPrice">Rs ${ogprice}</span>  <span id="pdisc">   ${discount}% off</span></p>
                <p id="op">Rs. ${disprice}</p>
            </div>`

    card.addEventListener("click",()=>{
        localStorage.setItem("productDetails",id);
        location.href = "./productDetails.html"
    })
    return card;
}
function createBtn(id) {
    let btn = document.createElement("button");
    btn.setAttribute("data-page-number", id);
    btn.classList.add("pagination-button");
    btn.textContent = id
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        fetchdata(e.target.dataset.pageNumber)
    })
    return btn
}


function updateFilters() {
    let categoryInputs = document.querySelectorAll(".filters input[type=radio][name=category]")
    categoryInputs.forEach((input) => {
        if (input.checked) {
            filter.category = input.value;
        }
    })
    let brandInputs = document.querySelectorAll(".filters input[type=radio][name=brand]")
    brandInputs.forEach((input) => {
        if (input.checked) {
            filter.brand = input.value
        }
    })
    let healthConcernInputs = document.querySelectorAll(".filters input[type=radio][name=healthConcern]")
    healthConcernInputs.forEach((input) => {
        if (input.checked) {
            filter.healthConcerns = input.value;
        }
    })
}
//signup
let token = localStorage.getItem("logintoken");
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