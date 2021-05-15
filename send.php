<?php
error_reporting(0);
$nombre = $_POST['nombre'];
$mail= $_POST['email'];
$opinion=$_POST['opinion'];
$header = 'From: ' . $mail . "\n";

$mensaje = "Este mensaje fue enviado por " . $nombre . " \r\n";
$mensaje .= "Su e-mail es: " . $mail . " \r\n";
$mensaje .="Opino que: ".$_POST['opinion'] . " \r\n";
$mensaje .= "Enviado el " . date('d/m/Y', time());

$para = 'alespacial@gmail.com';
$asunto = 'COMENTARIO JUEGO PRUEBA 1';

mail($para, $asunto, $mensaje, $header);

header( 'Location: http://www.alespacial.com/juego/test1.html' ) ;

?>