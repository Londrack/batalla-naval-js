//VARIABLE GLOBALES
posBarcos = new Object();
posBarcos_C = new Object();
posB_v = new Object();

contBarc_C = 0;
contBarc = 0;

danoUser = new Array();

var lenU = 0;
var len = 0;

var timeMov = 900;

//

function numRam(maxNum, minNum) {
	var minNum = minNum || 0;
	var maxNum = maxNum || 1;

	return Math.round(Math.random() * (maxNum - minNum + 1)) + minNum;
}
//
function finJuego() {
	var r = confirm("GRACIAS POR JUGAR!\n Quieres dejar tu opinión?")
	if (r) {
		$('#cont').css({
			display: 'none'
		});
		$('#form').css({
			display: 'block'
		});
	} else {
		var dir = window.location.href
		window.location.href = dir;
	}
}

////JUEGO///
function cambiaTurno(turnUser) {
	if (turnUser) {
		$(window).unbind('scroll');
		$("html, body").animate({
			scrollTop: 0
		}, timeMov);
		$('#comp .casilla').bind('click', atacaUsua);
	} else {
		$('#comp .casilla').unbind('click');
		$(window).unbind('scroll');
		$("html, body").animate({
			scrollTop: $(document).height()
		}, timeMov);

		////////////////////ATAQUE COMP////////////////
		var pos;
		var numMax = Math.sqrt($('#user .casilla').length) - 1;

		function generaPos() {
			var x = numRam(numMax - 1);
			var y = numRam(numMax - 1);
			pos = x + '_' + y;

			if (danoUser.indexOf(pos) !== -1) {
				generaPos();
				return false
			} else {
				danoUser.push(pos)
			}
		}
		generaPos();

		var leDio = seRepite(posBarcos, pos);
		var barcH;

		if (leDio) {
			for (var o in posBarcos) {
				if (posBarcos[o].indexOf(pos) !== -1)
					barcH = o;
			}
		}


		setTimeout(function () {
			if (leDio) {
				$('#user #' + pos).addClass('golp');
				$('#user #' + pos + ' .golpe').css({
					opacity: '1'
				});
				$('#' + barcH).css({
					opacity: '-=0.2'
				})

				var indice = posBarcos[barcH].indexOf(pos);
				posBarcos[barcH].splice(indice, 1);

				if (posBarcos[barcH].length == 0) {
					alert('Te han undido a ' + barcH);
					contBarc++;
					if (contBarc === lenU) {
						alert('¡Perdiste el juego!');
						finJuego();
					}
				}


			} else {
				$('#user #' + pos).addClass('falla');
			}

			cambiaTurno(true);
		}, 1100)
	}
}

function atacaUsua() {
	/***/
	if ($(this).hasClass('golp') || $(this).hasClass('falla')) {
		return false;
	}
	/*Cambia Turno*/
	setTimeout(function () {
		cambiaTurno(false);
	}, 200)
	/**/

	var pos = $(this).attr('id');
	var repite = seRepite(posBarcos_C, pos);
	if (repite) {
		//alert('Le diste');
		$(this).addClass('golp')
		$('.golpe', this).css({
			opacity: '1'
		});;

		for (var o in posBarcos_C) {

			if (posBarcos_C[o].indexOf(pos) !== -1) {
				var indice = posBarcos_C[o].indexOf(pos);
				posBarcos_C[o].splice(indice, 1);

				if (posBarcos_C[o].length == 0) {
					alert('Undiste a ' + o);
					$('#' + o).css({
						opacity: '0.6',
						display: 'block',
						top: posB_v[o][0],
						left: posB_v[o][1]
					});

					contBarc_C++;
					if (contBarc_C === len) {
						alert('¡Ganaste el juego!');
						finJuego();
					}
				}
			}
		}

	} else {
		//alert('fallaste');
		$(this).addClass('falla')
	}

}

function jugar(ini, difComp) {

	$('.barco').draggable("disable");

	///MENSAJE
	var msn = (ini > 0) ? 'Empiezas tu' : 'El malvado Computador comienza';
	var turnUser = (ini > 0) ? true : false;
	var msnLvl = (difComp > 0) ? '\nNivel: DIFICIL' : '\nNivel: NORMAL';
	alert(msn + msnLvl);

	cambiaTurno(turnUser);

	//cuenta barcos
	for (var o in posBarcos_C) {
		len++;
	}
	for (var o in posBarcos) {
		lenU++;
	}

	/////////////////ATAQUE JUGADOR//////////////

	$('#comp .casilla').click(atacaUsua);
	//
}

//
function seRepite(obj, val) {
	var count = 0;
	var result = false;


	for (var o in obj) {
		if (obj[o].indexOf(val) !== -1) {
			result = true;
		}
	}

	return result;

}