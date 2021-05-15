function BarcoComp(varFijas, id, img, anchBarc, altoBarc) {

	var distCajas = varFijas[0];
	var anchCasill = varFijas[1];
	var movTime = varFijas[2];
	var numCasill = varFijas[3];

	var id = id + "_C";

	var maxT = 0;
	var maxR = anchCasill * numCasill;
	var maxB = maxR + distCajas - anchCasill;

	var altoBarc = altoBarc || 1;

	var barcDiv = '<div class="barcoComp" id="' + id + '" style=" height:' + anchCasill * altoBarc + 'px; width:' + anchCasill * anchBarc + 'px; background-image:url(' + img + ')"></div>';
	$('#cont').append(barcDiv);

	var numMax = numCasill - 1;
	posRam(numMax, id, anchBarc, altoBarc, anchCasill)

}

function posRam(numMax, id, anchBarc, altoBarc, anchCasill) {

	var x = numRam(numMax);
	var y = numRam(numMax);

	posBarcos_C[id] = new Array();

	if (anchBarc > altoBarc) {
		if ((x + anchBarc - 1) > numMax || (y + altoBarc - 1) > numMax) {
			posRam(numMax, id, anchBarc, altoBarc, anchCasill);
			return false;

		} else {
			for (var i = 0; i < anchBarc; i++) {
				var pos = (x + i) + "_" + y;
				/**/
				var repite = seRepite(posBarcos_C, pos);

				if (repite) {
					posRam(numMax, id, anchBarc, altoBarc, anchCasill);
					return false;
				} else {
					posBarcos_C[id].push(pos)
					/**/
					if (altoBarc > 1)
						for (var n = 1; n <= altoBarc; n++) {
							var pos2 = (x + i) + "_" + (y + n);
							var repite2 = seRepite(posBarcos_C, pos2);
							if (repite2) {
								posRam(numMax, id, anchBarc, altoBarc, anchCasill);
								return false;
							} else {
								posBarcos_C[id].push(pos2)
							}
						}
					/**/
				}
				/**/
			}
		}
	} else {
		if ((y + altoBarc - 1) > numMax || (x + anchBarc - 1) > numMax) {
			posRam(numMax, id, anchBarc, altoBarc, anchCasill);
			return false;

		} else {
			for (var i = 0; i < altoBarc; i++) {
				var pos = x + "_" + (y + i);
				var repite = seRepite(posBarcos_C, pos);
				if (repite) {
					posRam(numMax, id, anchBarc, altoBarc, anchCasill);
					return false;
				} else {
					posBarcos_C[id].push(pos)
					/**/
					if (anchBarc > 1)
						for (var n = 1; n <= anchBarc - 1; n++) {
							var pos2 = (x + n) + "_" + (y + i);
							var repite2 = seRepite(posBarcos_C, pos2);
							if (repite2) {
								posRam(numMax, id, anchBarc, altoBarc, anchCasill);
								return false;
							} else {
								posBarcos_C[id].push(pos2)
							}
						}
					/**/
				}
				/**/
			}
		}
	}
	/**/
	posB_v[id] = [(y * anchCasill), (x * anchCasill)];
	//$(barco).css({top:(y*anchCasill)+y+'px', left:(x*anchCasill)+x+'px'})
	/**/
}