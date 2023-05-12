let token = localStorage.getItem("logintoken");
let tbill = document.getElementById("tbill");
let discount = document.getElementById("discount");
let shipping = document.getElementById("ship");
let tot = document.getElementById("tot");

let bigcont = document.getElementById("bigcont");
fetchData();

function fetchData() {
    fetch(`https://vast-cyan-turtle-wig.cyclic.app/cart`, {
        headers: {
            'Content-type': 'Application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => {
            let totbill = 0;
            let disbill = 0;
            bigcont.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                totbill += data[i].productPrice*data[i].quantity;
                disbill += data[i].productDiscountPrice * data[i].quantity;
                let a = createCard(data[i].productTitle, data[i].productImg, data[i].productPrice, data[i].productDiscountPrice, data[i].productBrand, data[i].quantity, data[i]._id);
                bigcont.append(a);
            }
            tbill.innerText = `Rs. ${totbill}`;
            discount.innerText = `Rs. ${totbill - disbill}`;
            if (disbill >= 500) {
                shipping.innerText = `Free Shipping`
                tot.innerText = `Rs. ${disbill}`
            }
            else {
                shipping.innerText = `Rs. 89`
                tot.innerText = `Rs. ${disbill + 89}`
            }
            document.querySelector("#bill>button").addEventListener("click", () => {
                localStorage.setItem("orderData", JSON.stringify(data))
                location.href = "./checkout.html"

            })

        })
        .catch((err) => console.log(err))
}

function createCard(title, img, ogprice, disprice, brand, quantity, id) {
    let discount = Math.floor(((ogprice - disprice) / ogprice) * 100);
    let card = document.createElement("div");
    let imgcont = document.createElement("div");
    imgcont.setAttribute("class","imgcont");
    let imgc = document.createElement("img");
    imgc.setAttribute("src",img);
    imgcont.append(imgc);
    let content =document.createElement("div");
    content.setAttribute("class","content");
    let h1 = document.createElement("h1");
    h1.setAttribute("class","title");
    h1.innerText= title;
    let p1 = document.createElement("p");
    p1.setAttribute("class","bran");
    p1.innerText = brand;
    let p2 = document.createElement("p");
    p2.setAttribute("class","prt");
    p2.innerHTML = `Rs.<span class="ogprice">${ogprice}</span>   <span class="discount">${discount}%off</span>`;
    let p3 = document.createElement("p");
    p3.setAttribute("class","pr");
    p3.innerHTML = `Rs.<span class="disprice">${disprice}</span>`;
    let up = document.createElement("div");
    up.setAttribute("class","up");
    let bt1 = document.createElement("button");
    let bt2 = document.createElement("button");
    let p4 = document.createElement("p");
    p4.innerText = quantity;
    bt1.innerText = "-";
    bt2.innerText = "+";
    bt1.addEventListener("click", () => {
        if (quantity > 0) {
            quantity = quantity - 1;
            p4.innerText = quantity;
            let obj = {
                quantity
            }
            fetch(`https://vast-cyan-turtle-wig.cyclic.app/cart/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'Application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(obj)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    window.location.reload()
                })
                .catch((err) => {
                    alert(err);
                    console.log(err);
                })
        }
    })
    bt2.addEventListener("click", () => {
        quantity = quantity + 1;
        p4.innerText = quantity;
        let obj = {
            quantity
        }
        fetch(`https://vast-cyan-turtle-wig.cyclic.app/cart/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'Application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                window.location.reload()
            })
            .catch((err) => {
                alert(err);
                console.log(err);
            })

    })
    up.append(bt1,p4,bt2);
    let a1 = document.createElement("a");
    a1.setAttribute("href","#");
    a1.innerText = "Remove";
    a1.addEventListener("click",(e)=>{
        e.preventDefault();
        fetch(`https://vast-cyan-turtle-wig.cyclic.app/cart/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'Application/json',
                'authorization': `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                window.location.reload()
            })
            .catch((err) => {
                alert(err);
                console.log(err);
            })

    })
    content.append(h1,p1,p2,p3,up,a1);
    card.append(imgcont,content);
    return card
}


//signup

if (token) {
    document.getElementById("login").style.display = "none";
    document.getElementById("sign").style.display = "none";
    let a1 = document.createElement("a");
    a1.setAttribute("href", "./orders.html");
    a1.innerText = localStorage.getItem("username");
    let a2 = document.createElement("a");
    a2.innerText = "Log Out";
    a2.setAttribute("href", "#");
    a2.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("username", "");
        localStorage.setItem("logintoken", "");
        window.location.reload()
    })
    document.getElementById("signup").append(a1, a2);
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