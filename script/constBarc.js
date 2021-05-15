function Barco(varFijas, id, img, anchBarc, altoBarc) {

    var distCajas = varFijas[0];
    var anchCasill = varFijas[1];
    var movTime = varFijas[2];
    var numCasill = varFijas[3];

    var maxT = (anchCasill * numCasill) + distCajas;
    var maxR = anchCasill * numCasill;
    var maxB = (maxR * 2) + distCajas - anchCasill;

    var altoBarc = altoBarc || 1;

    var barcDiv = '<div class="barco" id="' + id + '" style=" height:' + anchCasill * altoBarc + 'px; width:' + anchCasill * anchBarc + 'px; top:' + (maxB - (altoBarc * anchCasill)) + 'px; background-image:url(' + img + ')">' + id + '</div>';

    $('#cont').append(barcDiv);

    var barco = $("#" + id);
    posBarcos[id] = new Array();

    var numMax = numCasill - 1;
    posRamUs(numMax, id, anchBarc, altoBarc, anchCasill, maxT);

    /**********MOVIMIENTO****************/
    $(barco).draggable({
        start: function (event, ui) {
            posBarcos[id].length = 0;
            $(this).removeClass('noValid');

        },
        stop: function (event, ui) {

            var top = ui.position.top;
            var left = ui.position.left;

            var casL = Math.round(left / anchCasill);
            if (casL < 0)
                casL = 0;
            else if (casL > (numCasill - anchBarc))
                casL = numCasill - anchBarc;

            var casT = Math.round(top / anchCasill);
            if (casT < numCasill)
                casT = numCasill;
            else if (casT > ((numCasill * 2) - 1))
                casT = (numCasill * 2) - altoBarc;

            /***/
            if (anchBarc > altoBarc)
                for (var i = 0; i < anchBarc; i++) {
                    var pos = (casL + i) + "_" + (casT - numCasill);
                    posBarcos[id].push(pos);

                    if (altoBarc > 1) {
                        for (var n = 1; n <= altoBarc - 1; n++) {
                            var pos2 = (casL + i) + "_" + ((casT - numCasill) + n);
                            posBarcos[id].push(pos2);
                        }
                    }
                    /**/
                    var repite = false;
                    var count = 0;
                    for (var o in posBarcos) {
                        if (posBarcos[o].indexOf(pos) !== -1) {
                            ++count;
                        }
                    }
                    if (count > 1)
                        repite = true;
                    /**/
                    var repite2 = false;
                    var count2 = 0;
                    for (var o in posBarcos) {
                        if (posBarcos[o].indexOf(pos2) !== -1) {
                            ++count2;
                        }
                    }
                    if (count > 1)
                        repite2 = true;
                    /**/
                    if (repite || repite2) {
                        $(this).addClass('noValid');
                    }

                }
            else
                for (var i = 0; i < altoBarc; i++) {
                    var pos = (casL) + "_" + ((casT - numCasill) + i);
                    posBarcos[id].push(pos);

                    if (anchBarc > 1) {
                        for (var n = 1; n <= altoBarc - 1; n++) {
                            var pos2 = (casL + n) + "_" + ((casT - numCasill) + i);
                            posBarcos[id].push(pos2);
                        }
                    }
                    /**/
                    var repite = false;
                    var count = 0;
                    for (var o in posBarcos) {
                        if (posBarcos[o].indexOf(pos) !== -1) {
                            ++count;
                        }
                    }
                    if (count > 1)
                        repite = true;
                    /**/
                    var repite2 = false;
                    var count2 = 0;
                    for (var o in posBarcos) {
                        if (posBarcos[o].indexOf(pos2) !== -1) {
                            ++count2;
                        }
                    }
                    if (count2 > 1)
                        repite2 = true;
                    /**/
                    if (repite || repite2) {
                        $(this).addClass('noValid');
                    }

                }
            /**/
            var count = 0;
            var arr = new Array;
            for (var o in posBarcos) {
                for (var v in posBarcos[o]) {
                    var val = posBarcos[o][v];
                    if (arr.indexOf(val) == -1)
                        arr.push(val);
                    else
                        count++;
                }
            }
            if (count === 0)
                $('.noValid').removeClass('noValid');
            /**/

            /*********MOVIMIENTO************/
            //esq Sup Izq
            if (top < maxT && left < 0)
                $(this).animate({
                    top: maxT + 'px',
                    left: '1px'
                }, movTime)
            //esquina Sup Der
            else if (top < maxT && left + (anchBarc * anchCasill) > maxR)
                $(this).animate({
                    top: maxT + 'px',
                    left: maxR - (anchBarc * anchCasill) + 'px'
                }, movTime)
            //esquina Inf Der
            else if (top > maxB && left + (anchBarc * anchCasill) > maxR)
                $(this).animate({
                    top: maxB - (anchCasill * (altoBarc - 1)) + 'px',
                    left: maxR - (anchBarc * anchCasill) + 'px'
                }, movTime)
            //esq Inf Izq
            else if (top > maxB && left < 0)
                $(this).animate({
                    top: maxB + 'px',
                    left: '1px'
                }, movTime)
            //
            else if (top < maxT)
                $(this).animate({
                    top: maxT + 'px',
                    left: casL * anchCasill + 'px'
                }, movTime)

            else if (left < 0)
                $(this).animate({
                    top: casT * anchCasill + distCajas + 'px',
                    left: '1px'
                }, movTime)

            else if (left + (anchBarc * anchCasill) > maxR)
                $(this).animate({
                    top: casT * anchCasill + distCajas + 'px',
                    left: maxR - (anchBarc * anchCasill) + 'px'
                }, movTime, function () {
                    var topR = parseInt($(this).css('top')) + (anchCasill * (altoBarc - 1));
                    if (topR > maxB)
                        $(this).animate({
                            top: maxB - (anchCasill * (altoBarc - 1)) + 'px'
                        }, movTime)
                });

            else if (top + (altoBarc * anchCasill) > maxB)
                $(this).animate({
                    top: maxB - (anchCasill * (altoBarc - 1)) + 'px',
                    left: casL * anchCasill + 'px'
                });

            else if (left + (anchBarc * anchCasill) > maxR)
                $(this).animate({
                    top: casT * anchCasill + distCajas + 'px',
                    left: maxR - (anchBarc * anchCasill) + 'px'
                }, movTime)

            else
                $(this).animate({
                    left: casL * anchCasill + 'px',
                    top: casT * anchCasill + distCajas + 'px'
                }, movTime)
        }
    });
}

//////////////////////////POSICION ALEATORIA DE USUARIO


function posRamUs(numMax, id, anchBarc, altoBarc, anchCasill, maxT) {

    var x = numRam(numMax);
    var y = numRam(numMax);

    posBarcos[id] = new Array();

    if (anchBarc > altoBarc) {
        if ((x + anchBarc - 1) > numMax || (y + altoBarc - 1) > numMax) {
            posRamUs(numMax, id, anchBarc, altoBarc, anchCasill, maxT);
            return false;

        } else {
            for (var i = 0; i < anchBarc; i++) {
                var pos = (x + i) + "_" + y;
                /**/
                var repite = seRepite(posBarcos, pos);

                if (repite) {
                    posRamUs(numMax, id, anchBarc, altoBarc, anchCasill, maxT);
                    return false;
                } else {
                    posBarcos[id].push(pos)
                    /**/
                    if (altoBarc > 1)
                        for (var n = 1; n <= altoBarc - 1; n++) {
                            var pos2 = (x + i) + "_" + (y + n);
                            var seRepite2 = seRepite(posBarcos, pos2);
                            if (seRepite2) {
                                posRamUs(numMax, id, anchBarc, altoBarc, anchCasill, maxT);
                                return false;
                            } else {
                                posBarcos[id].push(pos2)
                            }
                        }
                    /**/
                }
                /**/
            }
        }
    } else {
        if ((y + altoBarc - 1) > numMax || (x + anchBarc - 1) > numMax) {
            posRamUs(numMax, id, anchBarc, altoBarc, anchCasill, maxT);
            return false;

        } else {
            for (var i = 0; i < altoBarc; i++) {
                var pos = x + "_" + (y + i);
                var repite = seRepite(posBarcos, pos);
                if (repite) {
                    posRamUs(numMax, id, anchBarc, altoBarc, anchCasill, maxT);
                    return false;
                } else {
                    posBarcos[id].push(pos)
                    /**/
                    if (anchBarc > 1)
                        for (var n = 1; n <= anchBarc - 1; n++) {
                            var pos2 = (x + n) + "_" + (y + i);
                            var seRepite2 = seRepite(posBarcos, pos2);
                            if (seRepite2) {
                                posRamUs(numMax, id, anchBarc, altoBarc, anchCasill, maxT);
                                return false;
                            } else {
                                posBarcos[id].push(pos2)
                            }
                        }
                    /**/
                }
                /**/
            }
        }
    }
    var barco = $('#' + id);
    $(barco).css({
        top: (y * anchCasill) + (maxT) + 'px',
        left: (x * anchCasill) + 'px'
    })
}