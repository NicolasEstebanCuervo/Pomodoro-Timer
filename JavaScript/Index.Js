document.addEventListener("DOMContentLoaded", () => {
	const $tiempoRestante = document.querySelector(".tiempoRestante"),
		$btnIniciar = document.querySelector(".btnIniciar"),
		$btnPausar = document.querySelector(".btnPausar"),
		$btnDetener = document.querySelector(".btnDetener"),
		$minutos = document.querySelector("#minutos"),
		$segundos = document.querySelector("#segundos"),
		$contenedorInputs = document.querySelector(".contenedorInputs");
	let idInterval = null, diferenciaTemporal = 0,
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
	const ocultarElemento = elemento => {
		elemento.style.display = "none";
	}

	const mostrarElemento = elemento => {
		elemento.style.display = "";
	}

	const iniciarTemporizador = (minutos, segundos) => {
		ocultarElemento($contenedorInputs);
		mostrarElemento($btnPausar);
		ocultarElemento($btnIniciar);
		ocultarElemento($btnDetener);
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
				clearInterval(idInterval);
				sonido.play();
				cambiarModoDescanso()
				mostrarElemento($contenedorInputs);
				mostrarElemento($btnIniciar);
				$minutos.value = "00";
				$segundos.value = "00";

			} else {
				$tiempoRestante.textContent = milisegundosAMinutosYSegundos(tiempoRestante);
			}
		}, 50);
	};

	const pausarTemporizador = () => {
		ocultarElemento($btnPausar);
		mostrarElemento($btnIniciar);
		mostrarElemento($btnDetener);
		diferenciaTemporal = fechaFuturo.getTime() - new Date().getTime();
		clearInterval(idInterval);
	};

	const detenerTemporizador = () => {
		clearInterval(idInterval);
		fechaFuturo = null;
		diferenciaTemporal = 0;
		sonido.currentTime = 0;
		init();

	};

	const agregarCeroSiEsNecesario = valor => {
		if (valor < 10) {
			return "0" + valor;
		} else {
			return "" + valor;
		}
	}
	const milisegundosAMinutosYSegundos = (milisegundos) => {
		const minutos = parseInt(milisegundos / 1000 / 60);
		milisegundos -= minutos * 60 * 1000;
		segundos = (milisegundos / 1000);
		return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`;
	};
	const init = () => {
		$minutos.value = "00";
		$segundos.value = "00";
		mostrarElemento($contenedorInputs);
		mostrarElemento($btnIniciar);
		ocultarElemento($btnPausar);
		ocultarElemento($btnDetener);
	};


	$btnIniciar.onclick = () => {
		const minutos = parseInt($minutos.value);
		const segundos = parseInt($segundos.value);
		if (isNaN(minutos) || isNaN(segundos) || (segundos <= 0 && minutos <= 0)) {
			return;
		}
		iniciarTemporizador(minutos, segundos);
	};
	init();	
	$btnPausar.onclick = pausarTemporizador;
	$btnDetener.onclick = detenerTemporizador;
});

let TituloDescanso = document.querySelector(".TituloDescanso") 
let TituloTrabajo = document.querySelector(".TituloTrabajo") 
let Body = document.querySelector(".Body")
let ContenedorSecundario = document.querySelector(".ContenedorSecundario")
let BotonTrabajo = document.querySelector(".BotonTrabajo")
let BotonDescanso = document.querySelector(".BotonDescanso")	

function cambiarModoEstudio(){

	Body.classList.remove("Background")
	ContenedorSecundario.classList.remove("BackgroundDiv")
	TituloDescanso.setAttribute("hidden" , "")
	TituloTrabajo.removeAttribute("hidden")
	BotonTrabajo.classList.add("Background")
	BotonTrabajo.classList.remove("BackgroundDiv")
	BotonDescanso.classList.remove("BackgroundDiv")
	BotonTrabajo.classList.add("Background")

}

function cambiarModoDescanso(){

	Body.classList.add("Background")
	ContenedorSecundario.classList.add("BackgroundDiv")
	TituloDescanso.removeAttribute("hidden")
	TituloTrabajo.setAttribute("hidden" , "")
	BotonTrabajo.classList.remove("Background")
	BotonTrabajo.classList.add("BackgroundDiv")
	BotonDescanso.classList.add("BackgroundDiv")
	BotonTrabajo.classList.remove("Background")
	
}