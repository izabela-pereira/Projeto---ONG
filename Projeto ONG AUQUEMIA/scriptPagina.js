

$("#fecha").hide();
$('.btnAbre').click(function() {
  $('.sidebar').toggleClass('mostra');
 // document.getElementById("fecha").style.display='none';
$("#abre").hide();
$("#fecha").show();
});


$('.btnFecha').click(function(){
  $('.sidebar').toggleClass('mostra');
  $("#fecha").hide();
  $("#abre").show();
});
