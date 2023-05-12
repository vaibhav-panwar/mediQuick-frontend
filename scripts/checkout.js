let token = localStorage.getItem("logintoken");
let orderData = JSON.parse(localStorage.getItem("orderData"));
let bigcont = document.getElementById("bigcont");
let elform = document.querySelector("form");
let addre = document.getElementById("address")
let pin = document.getElementById("pin");
let typ = document.getElementById("type");
let sub = document.getElementById("sub");
let cont1 = document.querySelector(".cont1");
let cont2 = document.querySelector(".cont2");


sub.addEventListener("click", () => {
    let obj = {
        address: addre.value,
        pincode: pin.value,
        type: typ.value
    }
    fetch("https://vast-cyan-turtle-wig.cyclic.app/address/add", {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.msg);
            console.log(data);
            window.location.reload();
        })
        .catch((err) => {
            alert(err);
            console.log(err);
        })
})
fetchData();


function fetchData() {
    fetch("https://vast-cyan-turtle-wig.cyclic.app/address", {
        headers: {
            'Content-type': 'Application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => {
            cont1.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                let a = createCard(data[i].address, data[i].pincode, data[i].type, data[i]._id);
                cont1.append(a);
            }
        })
        .catch((err) => console.log(err))
}

function createCard(address, pincode, type, id) {
    let card = document.createElement("div");
    card.setAttribute("class", "crd");
    card.innerHTML = `
                    <p id="tp">${type}</p>
                    <p id="ad">Addres: ${address}</p>
                    <p id="pi">Pincode: ${pincode}</p>
                   
                `
    let btn = document.createElement("button");
    btn.innerText = "Place Order";
    btn.setAttribute("id", "po");
    btn.addEventListener("click", () => {
        let disbill = 0;
        let bill;
        let arr = [];
        for (let i = 0; i < orderData.length; i++) {
            disbill += orderData[i].productDiscountPrice * orderData[i].quantity;
            let obj = {
                productId: orderData[i].productId,
                productTitle: orderData[i].productTitle,
                productImg: orderData[i].productImg,
                productPrice: orderData[i].productPrice,
                productDiscountPrice: orderData[i].productDiscountPrice,
                productBrand: orderData[i].productBrand,
                quantity: orderData[i].quantity
            }
            arr.push(obj);
        }
        if (disbill >= 500) {
            bill = disbill;
        }
        else {
            bill = disbill + 89;
        }
        let obj = {
            items:arr,
            bill,
            address:`${address} , ${pincode}`
        }
        fetch("https://vast-cyan-turtle-wig.cyclic.app/order/add",{
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
            location.href = "./orders.html"
        })
        .catch((err)=>{
            alert(err)
        })
    })
    card.append(btn);
    let reup = document.createElement("div");
    reup.setAttribute("id", "reup");
    let a1 = document.createElement("a");
    a1.setAttribute("href", "#");
    a1.innerText = "Remove";
    a1.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(`https://vast-cyan-turtle-wig.cyclic.app/address/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'Application/json',
                'authorization': `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.msg)
                window.location.reload();
            })
            .catch((err) => {
                alert(err);
                console.log(err);
            })
    })
    let a2 = document.createElement("a");
    a2.setAttribute("href", "#");
    a2.innerText = "Update";
    a2.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("cv").innerHTML = "";
        let nsub = document.createElement("button");
        nsub.setAttribute("id", "nsub");
        nsub.innerText = "Update";
        document.getElementById("cv").append(nsub);
        addre.value = address;
        pin.value = pincode;
        typ.value = type;
        cont2.style.visibility = "visible"
        nsub.addEventListener("click", () => {
            let obj = {
                address: addre.value,
                pincode: pin.value,
                type: typ.value
            }
            fetch(`https://vast-cyan-turtle-wig.cyclic.app/address/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'Application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(obj)
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.msg)
                    window.location.reload();
                })
                .catch((err) => {
                    alert(err);
                    console.log(err);
                })
        })

    })
    reup.append(a1, a2);
    card.append(reup);
    return card;
}
document.getElementById("subo").addEventListener("click", () => {
    cont2.style.visibility = "visible"
})

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