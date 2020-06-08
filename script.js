
```var socios, soci, lugares, fechas, meses, semanas, status, socie, modif, numberpass;
$(document).ready(function() {
    $("input").click(function() {
        // Change text of input button 
        $("#butmodif").prop("value", "Prop Click");
    });
});

function showSuccess() {
    jQuery("#success-alert")
        .fadeTo(2000, 500)
        .slideUp(500, function() {
            jQuery("#success-alert").slideUp(500);
        });
}

function stop() {
    document.getElementById("fullbody").disabled = true
}

$(document).ready(function() {
    $("#success-alert").hide();
    $("#butt").show();

    $("#loader").fadeOut();

    $("#telefono").show();
    $("#password").show();
document.getElementById("telefono").disabled = true;
    document.getElementById("password").disabled = true;
});
var x = document.getElementById("demo");
function getLocation() {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(showPosition);
} else {
x.innerHTML = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {
var lat = position.coords.latitude 
                    var lng = position.coords.longitude;
document.getElementById("lat").value =lat
document.getElementById("lng").value = lng
var a = document.getElementById('linkdomicilio');
var b = document.getElementById('linkdomicilio2');
                 

var link = 'https://www.google.com/maps?q='
link = link.concat(lat,",",lng)
a.setAttribute("href", link);
b.setAttribute("href", link);

document.getElementById("flag").value = "B"
editarDatos()
}


function setFocusToTelefono() {
    $("#cuerpo").hide()
    $("#todook").hide()
    $("#refresh").hide()
    $("#loaderdatos").hide()

    // document.getElementById("cuerpo").style.display = "none";

    document.getElementById("telefono").focus();
    var tel = document.getElementById("telefono").value();
    var pass = document.getElementById("password").value();
    cargaTable2 ()
}

function lostFocus2(numero,password) {



    var n = numero.toString();
    var numberpassword = n.concat(password)
    numberpass = numberpassword
    document.getElementById("telefono").disabled = true;
    document.getElementById("password").disabled = true;
    $("#butt").hide()
    $("#loader").show()

    var socio = google.script.run
        .withSuccessHandler(
            function papa(socio) {
                socie = socio
                if (socio == undefined) {

                    document.getElementById("telefono").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("telefono").focus();

                    alert("telefono incorrecto o contraseña incorrecta. Verifique que esté en formato 341xxxxxxx. Si acaba de cambiar la contraseña, actualice la página")
                    document.getElementById("telefono").disabled = false;
                    document.getElementById("password").disabled = false;
                    $("#butt").show()
                    $("#loader").hide()

                } else {
                    $("#cuerpo").show();
                    $("#datospedido").show();
                    $("#meta").hide()
        document.getElementById("nomap").value = socio.nombre
        document.getElementById("tel").value = socio.telefono
        addOption(socio.distnum)
                }
            })
        .validarSocie(numberpassword)
}


function addOption(val) {
var opt = document.createElement("option");
opt.value = "3";
opt.text = "Option: Value 3";

sel.add(opt, null);
//sel.remove(val);
}

function guardar() {
    var select = document.getElementById("dias").value;
    var str = select.substring(0, 2);
    if (str == "No") {
        alert("No tenemos un dia asignado a tu zona. Por ahora, podes ir a retirar a los distritos de Ciudad Futura que figuran en las opciones. Ni bien tengamos un dia asignado a tu zona, te contactaremos por Whatsapp")
        return
    }
    if (select == "") {
        alert("Oprima el botón que dice ver dias de entrega")
        return
    }
    google.script.run
        .withSuccessHandler(showSuccess)
        .formularioPedidos(

            $("#telefono").val(),
            $("#nomap").val(),
            $("#dias").val(),
            $("#cantidad").val(),
            $("#coment").val()
        );
    $("#fullbody").hide();
    $("form").trigger("reset");
    $("#cod").focus();
    $("#todook").show();

}

function guardarDatosPersonales() {

    google.script.run
        .withSuccessHandler(showSuccess)
        .actualizarDatos(

            $("#nomap").val(),
            $("#telefono").val(),
            $("#horario").val(),
            $("#ciudad").val(),
            $("#calle").val(),
            $("#numcalle").val(),
            $("#piso").val(),
            $("#comenv").val(),
            $("#ciudad").val()
        );

}
function cargaTable2 (){
$("#cuerpo").hide()
    $("#todook").hide()
    $("#refresh").hide()
    $("#loaderdatos").hide()

    // document.getElementById("cuerpo").style.display = "none";

   // document.getElementById("telefono").focus();
    //var tel = document.getElementById("telefono").value();
    //var pass = document.getElementById("password").value();
$("#pedidos2").find("tbody").empty();
google.script.run
.withSuccessHandler(function recibirDatos(pedidos) {
var largo = pedidos.length
  for(var e =0; e <largo; e++)  
  {
   agregarFilax(pedidos[e])
   }
   $("#pedidos2")
  .append(
    $("<tr>")
      
      .append(
        $("<td>").text("Total"),
        $("<td>").text("$"),
        $("<td>").text(""),
        $("<td>").text("")
     )
  );
  
})
    .cargarProductos();
    }
       function agregarFilax(pedido) {
$("#pedidos2")
 // .find("tbody")
  .append(
    $("<tr>")
      .data(pedido)
      .append(
    
        $("<td>").text(pedido.nombre),
        $("<td>").text(pedido.precio),
        $("<td> <select class='custom-select custom-select-lg mb-3' id='cantidad'><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select></td>"),
        $("<td></td>")


    )
  );
}
jQuery(document).on('change', 'select', function() {
var total = 0;
$('#pedidos2 tr:not(:first)').each(function(i,item){ 
var tds = $(item).find('td');
var qty = parseFloat($($(tds[2]).find('select')[0]).val()); 

    if($(tds[0]).text() == "Total"){
$(tds[2]).text(total);
}else {
var bankColValue = parseFloat($(tds[1]).text());
var colSubTotal = $(tds[3]);
  var valItem = bankColValue * (isNaN(qty)? 0: qty);
valItem = parseFloat(valItem)
colSubTotal.text(valItem);
total=parseFloat(total)
total += valItem;
}

});
});
function cargaProd(tel,nomap,dias,comen) 
{ 
// var nomap = document.getElementById("nomap").value()

var tot =parseFloat("0")
var tabel = document.getElementById('pedidos2');
var rijen = tabel.rows.length;
var array=[]
for (i = 0; i < rijen; i++){
var inputs = tabel.rows.item(i).getElementsByTagName("select");
var inputslengte = inputs.length;

for(var j = 0; j < inputslengte; j++){
    var inputval = inputs[j].value;                
   array.push(inputval);
   tot=parseFloat(inputval)+tot
}            
}  

if (tot==0)
{
alert("No ha seleccionado ningún producto")
return
}
$("#fullbody").hide();
    $("form").trigger("reset");
    $("#cod").focus();
    $("#todook").show();

google.script.run.cargaProductos(array,nomap,tel,dias,comen)

}```