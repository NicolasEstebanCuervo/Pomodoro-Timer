//Nicolas Cuervo

const $tiempoRestante = document.querySelector("#tiempoRestante"),
	$botonIniciar = document.querySelector("#botonIniciar"),
	$botonPausar = document.querySelector("#botonPausar"),
	$botonDetener = document.querySelector("#botonDetener"),
	$minutos = document.querySelector("#minutos"),
	$segundos = document.querySelector("#segundos"),
	$contenedorInputs = document.querySelector(".contenedorInputs");

let idInterval = null, 
	diferenciaTemporal = 0,
	fechaFuturo = null;

const cargarSonido = function (fuente) {

	const sonido = document.createElement("audio");
	sonido.src = fuente;
	sonido.setAttribute("preload", "auto");
	sonido.setAttribute("controls", "none");
	sonido.style.display = "none"; // <-- oculto
	document.body.appendChild(sonido);
	return sonido;

};

const sonido = cargarSonido("../Sonido/timer.wav");

function ocultarElemento (elemento) {
		
	elemento.style.display = "none";

}

function mostrarElemento (elemento) {

	elemento.style.display = "";

}

function agregarCeroSiEsNecesario (valor) {

	if (valor < 10) {

		return "0" + valor;

	} else {

		return "" + valor;

	}
}

function milisegundosAMinutosYSegundos (milisegundos) {

	const minutos = parseInt(milisegundos / 1000 / 60);
	milisegundos -= minutos * 60 * 1000;
	segundos = (milisegundos / 1000);
	return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(0))}`;

};

function init () {

	$minutos.value = "00";
	$segundos.value = "00";
	mostrarElemento($contenedorInputs);
	mostrarElemento($botonIniciar);
	ocultarElemento($botonPausar);
	ocultarElemento($botonDetener);

};

function pausarTemporizador () {

	ocultarElemento($botonPausar);
	mostrarElemento($botonIniciar);
	mostrarElemento($botonDetener);
	diferenciaTemporal = fechaFuturo.getTime() - new Date().getTime();
	clearInterval(idInterval);

};

function detenerTemporizador () {
	
	clearInterval(idInterval);
	fechaFuturo = null;
	diferenciaTemporal = 0;

	init()

	$tiempoRestante.textContent ="00:00";

};

function iniciarTemporizador (minutos, segundos) {

	mostrarElemento($contenedorInputs);
	ocultarElemento($botonPausar);
	mostrarElemento($botonIniciar);
	ocultarElemento($botonDetener);

	if (fechaFuturo) {

		fechaFuturo = new Date(new Date().getTime() + diferenciaTemporal);
		diferenciaTemporal = 0;

	} else {

		const milisegundos = (segundos + (minutos * 60)) * 1000;
		fechaFuturo = new Date(new Date().getTime() + milisegundos);

	}

	clearInterval(idInterval);

	idInterval = setInterval(() => {

		const tiempoRestante = fechaFuturo.getTime() - new Date().getTime();

		if (tiempoRestante <= 0) {
			
			sonido.play()
			cambiarModo()
			mostrarElemento($botonIniciar)
			ocultarElemento($botonPausar)
			detenerTemporizador()			

		}  else {

			$tiempoRestante.textContent = milisegundosAMinutosYSegundos(tiempoRestante);

		}

	}, 50);

};

function iniciar (){

	const minutos = parseInt($minutos.value);
	const segundos = parseInt($segundos.value);
	
	if (isNaN(minutos) || isNaN(segundos) || (segundos == 0 && minutos == 0)) {
	
		return;
			
	}
		
	init()	
	iniciarTemporizador(minutos, segundos);
	ocultarElemento($contenedorInputs);
	ocultarElemento($botonIniciar);
	mostrarElemento($botonPausar);
	ocultarElemento($botonDetener);
	
};

init();	

// Funciones para los estilos de el temporizador.

const $TituloDescanso = document.querySelector(".TituloDescanso"),
	$TituloTrabajo = document.querySelector(".TituloTrabajo"),
	$Body = document.querySelector(".Body"),
	$ContenedorSecundario = document.querySelector(".ContenedorSecundario"),
	$BotonTrabajo = document.querySelector(".BotonTrabajo"),
	$BotonDescanso = document.querySelector(".BotonDescanso"),
	$TituloDescansoDiv = document.querySelector(".TituloDescansoDiv"),
	$TituloTrabajoDiv = document.querySelector(".TituloTrabajoDiv"),
	$InputMinutos = document.querySelector(".InputMinutos"),
	$InputSegundos = document.querySelector(".InputSegundos")

function cambiarModo(){
 
	$Body.classList.toggle("BackgroundNumeroUno")
	$ContenedorSecundario.classList.toggle("BackgroundNumeroDos")
	$TituloDescanso.toggleAttribute("hidden")
	$TituloTrabajo.toggleAttribute("hidden")
	$BotonTrabajo.classList.toggle("BackgroundNumeroUno")
	$BotonTrabajo.classList.toggle("BackgroundNumeroDos")
	$BotonDescanso.classList.toggle("BackgroundNumeroDos")
	$BotonTrabajo.classList.toggle("BackgroundNumeroUno") 
	$TituloDescansoDiv.toggleAttribute("hidden")
	$TituloTrabajoDiv.toggleAttribute("hidden")

}

function cambiarModoEstudio(){

	$Body.classList.remove("BackgroundNumeroUno")
	$ContenedorSecundario.classList.remove("BackgroundNumeroDos")
	$TituloDescanso.setAttribute("hidden" , "")
	$TituloTrabajo.removeAttribute("hidden")
	$BotonTrabajo.classList.add("BackgroundNumeroUno")
	$BotonTrabajo.classList.remove("BackgroundNumeroDos")
	$BotonDescanso.classList.remove("BackgroundNumeroDos")
	$BotonTrabajo.classList.add("BackgroundNumeroUno")
	$TituloDescansoDiv.setAttribute("hidden", "")
	$TituloTrabajoDiv.removeAttribute("hidden")

}

function cambiarModoDescanso(){

	$Body.classList.add("BackgroundNumeroUno")
	$ContenedorSecundario.classList.add("BackgroundNumeroDos")
	$TituloDescanso.removeAttribute("hidden")
	$TituloTrabajo.setAttribute("hidden" , "")
	$BotonTrabajo.classList.remove("BackgroundNumeroUno")
	$BotonTrabajo.classList.add("BackgroundNumeroDos")
	$BotonDescanso.classList.add("BackgroundNumeroDos")
	$BotonTrabajo.classList.remove("BackgroundNumeroUno")
	$TituloDescansoDiv.removeAttribute("hidden")
	$TituloTrabajoDiv.setAttribute("hidden", "")

}

$InputMinutos.oninput = function () {

    if (this.value.length > 2) {
        this.value = this.value.slice(0,2); 
    }
}

$InputSegundos.oninput = function () {
    if (this.value.length > 2) {
        this.value = this.value.slice(0,2); 
    }
}