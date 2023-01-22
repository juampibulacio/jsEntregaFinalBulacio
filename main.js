class Libro {
    constructor(nombre, id, paginas, autor, precio, genero,imagen) {
        this.nombre = nombre;
        this.id = id;
        this.paginas = paginas;
        this.autor = autor; 
        this.precio = precio;
        this.genero = genero;
        this.imagen = imagen;
        this.cantidad = 1; 
    }
}

//arrays 
const libros = [];

libros.push(new Libro("Los suicidas del fin del mundo", 1, 274, "Leila Guerriero", 3000, "Crónica", "imagenesLibros/suicidas.jpg"));
libros.push(new Libro("Las viejas travestís y otras infamias", 2, 150, "Copi", 2500, "Teatro", "imagenesLibros/copi.jpg"));
libros.push(new Libro("Facundo", 3, 262, "Domingo F Sarmiento", 1000, "Ensayo", "imagenesLibros/facundo.jpg"));
libros.push(new Libro("Mimesis", 4, 560, "Erich Auerbach", 3500, "Teoría Literaria", "imagenesLibros/Mimesis.jpg"));
libros.push(new Libro("Don Quijote de la Mancha", 5, 435, "Miguel de Cervantes Saavedra", 1300, "Novela", "imagenesLibros/Quijote.jpg"));

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


const contenedorLibros = document.getElementById("contenedorLibros");

const mostrarLibros = () => {
    libros.forEach( Libro => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
              <img src= "${Libro.imagen}" class="card-img-top imagenLibros">
              <div class= "card-body">
                    <h2>${Libro.nombre}</h2>
                    <h3>$${Libro.precio}</h3>
                    <h4>${Libro.autor}</h4>
                    <p>${Libro.genero}</p>
                    <button class="btn bg-secondary text-light" id="boton ${Libro.id}"> Agregar al carrito </button>
                </div>
            </div>
                    `

    contenedorLibros.appendChild(card);

    const botonAgregar = document.getElementById(`boton ${Libro.id}`);
    
    botonAgregar.addEventListener("click", () => {
        agregarAlCarrito(Libro.id);
        Toastify( {
            text: "Producto agregado al carrito",   
            position: "left", 
            gravity: "bottom",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
            
        }).showToast();
        mostrarCarrito();
    })
         
    })
}


mostrarLibros();


const agregarAlCarrito = (id) => {
    const LibroenCarrito = carrito.find(Libro => Libro.id === id);
    const Libro = libros.find(Libro => Libro.id === id);
    LibroenCarrito ? LibroenCarrito.cantidad++ : carrito.push(Libro);

        localStorage.setItem("carrito", JSON.stringify(carrito));
        calcularTotal();
    
}



const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "",

    carrito.forEach(Libro => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12")
        card.innerHTML = `
                <div class="card">
                  <img src="${Libro.imagen}" class="card-img-top imagenLibros">
                  <div class="card-body">
                        <h2>${Libro.nombre}</h2>
                        <h3>${Libro.precio}</h3>
                        <h4>${Libro.autor}</h4>
                        <h2>${Libro.cantidad}</h2>
                        <button class="btn bg-secondary text-light" id="menosUno${Libro.id}"> Eliminar Uno </button>
                        <button class="btn bg-secondary text-light mt-2" id="eliminar${Libro.id}"> Eliminar Todos </button>
                        
                    </div>
                </div>
                    `

        contenedorCarrito.appendChild(card);
       

        const boton = document.getElementById(`eliminar${Libro.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(Libro.id);
            Toastify( {
                text: "Vaciaste el carrito",
                duration: 2000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }
            }).showToast();
            
        })

        
        const botonDisminuir = document.getElementById(`menosUno${Libro.id}`);
        botonDisminuir.addEventListener("click", () => {
            eliminarUno(Libro.id);
            Toastify( {
                text: "Producto eliminado del carrito",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }
            }).showToast();
        })


    })
    calcularTotal();
}




const eliminarDelCarrito = (id) => {
    const Libro = carrito.find(Libro => Libro.id === id);
    const indice = carrito.indexOf(Libro);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const eliminarUno = (id) => {
    const LibroenCarrito = carrito.find(Libro => Libro.id === id);
    LibroenCarrito.cantidad > 1 ? LibroenCarrito.cantidad-- : eliminarDelCarrito(LibroenCarrito.id);
    mostrarCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener ("click", () => {
    eliminarTodoElCarrito();
    Toastify( {
        text: "Vaciaste el carrito",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }
    }).showToast();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const total = document.getElementById("total"); 

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(Libro => {
        totalCompra = totalCompra + Libro.precio * Libro.cantidad;
    })
    total.innerHTML = ` $${totalCompra}`;
}

const criptoYa = "https://criptoya.com/api/dolar";

const divDolar = document.getElementById("divDolar");

setInterval( () => {
    fetch(criptoYa)
        .then( response => response.json())
        .then(({blue, ccb, ccl, mep, oficial, solidario}) => {
            divDolar.innerHTML = `
            <h6 class="text-warning">Las compras en dólares se abonan al valor oficial (1 dólar = ${oficial} pesos argentinos) </h6>
            `
        }
        )
        .catch(error => console.error(error))
    }, 5000)