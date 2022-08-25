// cuando hacemos scroll la letra se cambia de color

document.addEventListener('scroll', () =>{
  if (window.scrollY > 450) {
    document.body.classList.add('scroll_cambio');
  } else {
    document.body.classList.remove('scroll_cambio');
  }
})

// Animaciones GSAP las letras se mueven cuando carga la pagina

gsap.to(".titulo", { opacity: 1 ,duration:1});
gsap.to(".subtitulo", { opacity: 1 ,duration: 1});

gsap.to("#logo2", {x:10 , opacity: 1 ,duration: 1});

gsap.to("#logo", {x:10 , opacity: 1 ,duration: 1});
gsap.to(".loginRegis", {x:-10 , opacity: 1 ,duration: 1});

gsap.to(".menu_items", {y:-10 , opacity: 1 ,duration: 1});

// ventana lateral
let login = document.querySelector('#toggleLogin');
let loginSide = document.querySelector('#loginSide');

login.addEventListener('click', (e) => {
  e.preventDefault();
  loginSide.classList.add('active_login');
})

let exitLogin = document.querySelector('#exitLogin');

exitLogin.addEventListener('click', (e) => {
  e.preventDefault(); 
  loginSide.classList.remove('active_login');
})

/// register
let reg = document.querySelector('#toggleReg');
let regSide = document.querySelector('#regSide');

reg.addEventListener('click', (e) => {
  e.preventDefault();
  regSide.classList.add('active_reg');
})

let exitReg = document.querySelector('#exitReg');

exitReg.addEventListener('click', (e) => {
  e.preventDefault(); 
  regSide.classList.remove('active_reg');
})

// validar datos de un array de objetos con los datos introducidos en input

let lista = [
  {
    usuario: "clau",
    pass: 1111
  },
  {
    usuario: "manuel",
    pass: 2222
  },
  {
    usuario: "adrian",
    pass: 3333
  }
];

let rname = document.querySelector('#logo');
let enviar = document.querySelector('#enviar');

//comprobamos cada objeto del array
 lista.forEach((el) => {
 enviar.addEventListener('click', (e) =>{
   e.preventDefault();
uname = document.querySelector('#uname');
pass = document.querySelector('#pass');
 
    if(el.usuario == uname.value && el.pass == pass.value){
      logo.innerHTML = `<h2 class='validado'> Welcome ${uname.value}</h2>`;
      //console.log('El usuario es correcto');
    }
   }); 
 });

 // hacemos la funcionalidad del reloj
let dias = document.querySelector('#dias');
let horas = document.querySelector('#horas');
let minutos = document.querySelector('#minutos');
let segundos = document.querySelector('#segundos');

setInterval(timer,1000);
function timer(){
let endTime = new Date(2022, 8, 10);
let today = new Date();
let dif = endTime - today;

let s = Math.floor(dif / 1000 %60);
let m = Math.floor(dif / (1000 * 60) %60);
let h = Math.floor(dif / (1000 * 60 * 60) %24);
let d = Math.floor(dif / (1000 * 60 * 60 * 24 ));

dias.innerHTML = d;
horas.innerHTML = h;
minutos.innerHTML = m;
segundos.innerHTML = s;
}


fetch('Productos_Json.json')
.then(response => response.json())
.then(data =>{

  // categorias
  let categorias = data.map(elemento => elemento.category)
  let noRepetidos = new Set(categorias);
  let convA = Array.from(noRepetidos);
 // console.log(convA);

  let cat_wrapper = document.querySelector('#cat_wrapper');
  convA.forEach(el => {
    let col = document.createElement('div');
    col.classList.add("col-12", "col-md-4", "d-flex", "justify-content-center");

    col.innerHTML = `
    <div class="card card_categ">
      <a href="./${el}.html" class="text-decoration-none text-reset">  
      <h5 class="card-title m-0 p-0">${el}</h5></a>
    </div>
    `
    //console.log(el);
    cat_wrapper.appendChild(col);
  })


  // manipulacion 4 cards mas barratas
  // poner en cada pestaña una categoria esta echo mas arriba noRepetidos
  // contar todas las repeticiones de las categorias
  let contador = categorias.reduce((acc, cat) =>{
    
    //acc[cat] ? acc[cat] ++ : acc[cat] = 1;
    if(acc[cat]){
      acc[cat] += 1;
    }else{
      acc[cat] = 1;
    }
    // lo mismo de 2 maneras diferentes
    return acc
    
  }, {})
  //console.log(contador);

  // sacar las 3 categorias con mas productos
  // convertir los objetos en arrays
  let cArray = Object.entries(contador);
  let orden = cArray.sort((a,b) => b[1] - a[1])
                    .slice(0,3)
                    .map(el => el[0])

  let tabsM = document.querySelector("#myTab");
  orden.forEach((el, index) =>{
    let li = document.createElement("li");
    li.classList.add("nav-item");
    li.innerHTML = `
    <button class="nav-link ${index == 0 ? "active" : ""} letra_pers" id="${el}-tab" data-bs-toggle="tab" data-bs-target="#${el}-tab-pane" type="button" role="tab" aria-controls="${el}-tab-pane" aria-selected="true">${el}</button>
    `

    tabsM.appendChild(li)

    // filtrar cards por categorias y ordenar de mas barato a mas carro
    let filtrarCat = data.filter(elem => elem.category === el)
                         .sort((a,b) => a.price - b.price)
                         .slice(0,4)
    //console.log(filtrarCat);

    let tabContent = document.querySelector('#myTabContent');
    let contenedor = `<div class="container-fluid">
                      <div class="row">`;
    let cierreDiv =`</div>
                    </div>`;
    let cardsCat = filtrarCat.map(el =>{
      console.log(el.category);
      return `
        <div class="col-12 col-md-3 d-flex justify-content-end">
          <div class="card my-3 border-0 card_barratos" style="width: 15rem;" id="${el}-tab-pane" role="tabpanel" aria-labelledby="${el}-tab" tabindex="0">
            <img src="./img/prod1.png" class="card-img-top rounded-5" alt="...">
            <div class="card-body">
              <h5 class="card a_titulo">${el.name}</h5>
              <h5><p>${el.category}</p></h5>
              <h4 class="card a_subtitulo">${el.price} €</h4>
              <a href="#" class="btn a_btn">Comprar ahora</a>
            </div>
          </div>
        </div>             
      `
    }).join("")
    let div = document.createElement('div');
    div.classList.add('tab-pane', 'fade');
    if (index == 0){
      div.classList.add('show', 'active')
      } 
      div.setAttribute(`id`,`${el}-tab-pane`);
      div.innerHTML= `${contenedor + cardsCat + cierreDiv}`;
      tabContent.appendChild(div);

console.log(tabContent);
 })
})





