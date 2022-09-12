//Creacion de equipo.

class jugadoras {
    constructor (nombre, apellido, numero, cuota, asistencias, posicion,goles,mail) {
        this.nombre= nombre;
        this.apellido= apellido;
        this.numero= numero;
        this.cuota= cuota;
        this.asistencias= asistencias;
        this.posicion= posicion; 
        this.goles= goles;
        this.mail=mail;
    }
}

let jugadora1 = new jugadoras ("Pamela","Sosa","15","activa",8, 3,0,"pamela@hotmail.com");
let jugadora2 = new jugadoras ("Florencia","Perez","36","activa",8, 4,0,"florencia@hotmail.com");
let jugadora3 = new jugadoras ("Paula","Montero","20","activa",8,5,0,"paula@hotmail.com");
let jugadora4 = new jugadoras ("Julieta","Lopez","12","activa",8,6,0,"julieta@hotmail.com");
let jugadora5 = new jugadoras ("Malena","Martinez","22","inactiva",8,7,0,"malena@hotmail.com");
let jugadora6 = new jugadoras ("Celeste","Salinas","08","activa",8,8,2,"celeste@hotmail.com");
let jugadora7 = new jugadoras ("Camila","Pecoraro","19","activa",5,9,4,"camila@hotmail.com");
let jugadora8 = new jugadoras ("Betiana","Storto","43","activa",6,10,5,"betiana@hotmail.com"); 

const equipo = []
equipo.push (jugadora1,jugadora2,jugadora3,jugadora4,jugadora5,jugadora6,jugadora7,jugadora8)

//console.log (equipo);

//Agregar al localStorage todas las jugadoras.

sessionStorage.setItem ("jugadora", JSON.stringify(equipo))

let jugadoraRecuperada = JSON.parse (sessionStorage.getItem ("jugadora"))
console.log(jugadoraRecuperada);


//buscador Por SweetAlert.

const btnSA = document.getElementById ("btnSweetAlert");
btnSA.addEventListener ("click", ()=>{

    
    swal.fire ({
        //content: "input",
        title: "Buscar",
        input: "text",
        cancelButtonText: "Cancelar",
        //button: " Buscar"
    });
    let valorBusqueda = document.getElementById ("btnSweetlert").value;
    

    function buscarJugadora (equipo,jugadoras) {
        return equipo.find ((jugadora) => jugadora.nombre.toUpperCase()===jugadoras.toUpperCase());
        
    } 
    buscarJugadora() 
})


//Acomodar en la tabla de posiciones segun marcacion de goles.

equipo.sort((a,b)=> {
    if(a.goles < b.goles){
        return (1);
    }
    else if (a.goles > b.goles){
        return (-1);
    }
    else{
        return 0;
    }  
});
//console.log((equipo));


//Funcion agregar jugadoras al html.

function agregarJugadoraHtml (jugadoras) {
    let ul = document.createElement("ul");

    let li0 = document.createElement ("li");
    li0.innerText= "Nombre: " + jugadoras.nombre;
    
    let li1 = document.createElement ("li");
    li1.innerText= "Apellido: " + jugadoras.apellido;

    let li2 = document.createElement ("li");
    li2.innerText= "Numero: " + jugadoras.numero;

    let li3 = document.createElement ("li");
    li3.innerText= "Posicion: " + jugadoras.posicion;

    let li4 = document.createElement ("li");
    li4.innerText= "Goles: " + jugadoras.goles;

    ul.append (li0,li1, li2, li3, li4);
    contenedor.innerHTML= " ";
    contenedor.append (ul);
}


 //Seleccionar Contenedor
let contenedor = document.getElementById ("contenedor");

//Evento selecciona Jugadora

let select = document.getElementById ("seleccionarJugadora");



//Funcion Nula

let opcionNula = document.createElement ("option");
opcionNula.value = " ",
opcionNula.innerText = " Seleccionar Jugadora",
select.append (opcionNula);


//Recorrer Jugadoras

equipo.forEach((jugadoras)=>{
    //creamos la opcion del select
    let option = document.createElement ("option");
    option.innerText = jugadoras.nombre;
    option.value = jugadoras.numero;
    //Agregar opcion al select.
    select.append (option);
}); 

//Buscar y ver datos de las jugadoras.(Eventos)

function seleccionarJugadoraDatos(){
    const jugadoraSeleccionada = select.value;

    if (jugadoraSeleccionada!==" "){
        const jugadoraEncontrada = equipo.find((equipo)=>{
            return equipo.numero == jugadoraSeleccionada
        });
        agregarJugadoraHtml(jugadoraEncontrada);
    }
    
}

select.addEventListener("change",()=>{
    seleccionarJugadoraDatos();
    
});


//Creacion de funcion para mostrar jugadoras habilitadas a jugar el partido de la semana que cuenten con las asistencias obligatias.

const inhabilitada = equipo.filter ((elemento)=> {return elemento.asistencias < 8});

console.log (inhabilitada);

const contenedorPartido = document.getElementById ("contenedorPartido");

    const boton = document.getElementById ("boton");

        boton.addEventListener("click", ()=>{
            const p = document.getElementById ("listaJugadoraHabilitada");
            const habilitadas = equipo.filter ((elemento)=> {
            return elemento.asistencias >= 8});
    
            p.innerText="";
            for (const jugadora of habilitadas){
                p.innerText += "\n" + jugadora.apellido + "  " + jugadora.nombre + "  "+ jugadora.numero;"\n"
            }
        }); 


//Fetch 

let url= "https://jsonplaceholder.typicode.com/users"
fetch (url)
.then (Response=> Response.json())
.then (data => mostrarData (equipo))
.catch (error => console.log(error)) 

const mostrarData = ()=> {
    //console.log(equipo)
    let body = "";
    for (let i=0; i< equipo.length;i++){
        body += `<tr>
            <td> ${equipo[i].nombre}</td>
            <td> ${equipo[i].apellido}</td>
            <td> ${equipo[i].mail}</td>
            <td> ${equipo[i].numero}</td>
                </tr>`
        }
        document.getElementById ("data").innerHTML= body
} 



//Funcion para agregar nueva integrante al equipo a la base de datos.


const formulario = document.querySelector ("#nuevaJugadora");
//console.log(nuevaJugadora);

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    const  nombre = document.querySelector ("#validationNombre").value
    const  apellido = document.querySelector ("#validationApellido").value
    const  mail = document.querySelector ("#validationEmail").value
    const numero = document.querySelector ("#validationCasaca").value

    
    const nuevaJugadora= {
        nombre: nombre,
        apellido: apellido,
        mail: mail,
        numero: numero,
    }

    console.log(nuevaJugadora)
    equipo.push (nuevaJugadora);
    console.log(equipo)
    mostrarData()
})




























//--------------------------------------IDEAS------------------------------------//
//Ver que jugadora tiene la cuota vencida y enviar mensaje recordatorio por alert.
























