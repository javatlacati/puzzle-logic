controllersModule.controller("CntrlDashboard",function($scope){

	//utilizar solo 15 numeros
	var arreglo_numeros = new Array();
	var movimientos = 0;
	var contador_s = 0;
	var contador_m = 0;
	var time = "si";
	//cronometro
	var cronometro;
  	


	//funcion para el tiempo
	function tiempo(){
		if(time == "no"){
			contador_m = 0;
			contador_s = 0;
		}


		if(contador_s==59){
			contador_m++;
			contador_s=0;
		}else{
			if(time=="si"){
				contador_s++;
			}else{
				contador_s = 0;
			}
		}

		document.getElementById("segundos").innerText = contador_s;
        document.getElementById("minutos").innerText = contador_m;

		if(time=="si"){
			setTimeout(tiempo,1000);
		}
	}


	//haremos un for en donde colocaremos las tablas de una forma aleatoria
	function generar(){
		//tiempo reiniciar
		contador_s = 0;
		contador_m = 0;
		arreglo_numeros.push(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
		tiempo();
		for(j=1; j<=16; j++){
			

			if(document.getElementById("p"+j).getAttribute("class").indexOf("vacio")>(-1)){
				//no pasa nada
			}else{
				//GENERAR ALEATORIO
				aleatorio =  Math.floor((Math.random() * (arreglo_numeros.length-1)) + 0); 
				num = arreglo_numeros[aleatorio];
				arreglo_numeros.splice(aleatorio,1);
				//colocamos el numero
				document.getElementById("p"+j).innerText = num;
			}
		}
	}
	$scope.nuevo = function(){
		//tiempo reinicia
		contador_s = 0;
		contador_m = 0;
		//tiempo();
		arreglo_numeros.push(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
		for(j=1; j<=16; j++){
			

			if(document.getElementById("p"+j).getAttribute("class").indexOf("vacio")>(-1)){
				//no pasa nada
			}else{
				//GENERAR ALEATORIO
				aleatorio =  Math.floor((Math.random() * (arreglo_numeros.length-1)) + 0); 
				num = arreglo_numeros[aleatorio];
				arreglo_numeros.splice(aleatorio,1);
				//colocamos el numero
				document.getElementById("p"+j).innerText = num;
			}
		}

		//Reiniciamos los movimientos
		movimientos = 0;
		document.getElementById("movimientos").innerText = movimientos;
	}

	generar();




	//---------------trabajando con javascript---------------------------
	 $scope.mensaje = function(e){
		//obtendremos la clases
		posicion = parseInt(e.target.getAttribute("posicion"));
		valor = e.target.innerText;

		//tabla padre
		padre = e.target.parentNode.getAttribute("id");
		valor_tabla_padre = parseInt(e.target.parentNode.getAttribute("id").substring(5,999));
			


		//obtendremos los valores a evaluar
		//mover a la derecha
		if(posicion<3){
			col_derecha = parseInt(posicion+1);
		}

		//mover a la izquierda
		if(posicion>0){
			col_izquierda =  parseInt(posicion-1);
		}

		if((valor_tabla_padre-1) >= 1){
			fil_arriba = parseInt(valor_tabla_padre-1);
		}
		
		if((valor_tabla_padre+1) <= 4){
		 	fil_abajo = parseInt(valor_tabla_padre+1);
		}



		//obtenemos la posicion derecha
		fila_actual = document.getElementById("tabla"+valor_tabla_padre).getElementsByTagName("div")[posicion];
		if(posicion<3){ micol_derecha = document.getElementById("tabla"+valor_tabla_padre).getElementsByTagName("div")[col_derecha];}
		if(posicion>0){ micol_izquierda = document.getElementById("tabla"+valor_tabla_padre).getElementsByTagName("div")[col_izquierda]; }
		
		if((valor_tabla_padre-1) >= 1){ fila_arriba = document.getElementById("tabla"+fil_arriba).getElementsByTagName("div")[posicion]; } 
		if((valor_tabla_padre+1) <= 4){ fila_abajo = document.getElementById("tabla"+fil_abajo).getElementsByTagName("div")[posicion]; }



		//mover a la izquierda
		if(posicion>0){
			if(micol_izquierda.getAttribute("class").indexOf("vacio")>(-1)){
				fila_actual.innerText = "";
				fila_actual.removeAttribute("class");
				fila_actual.setAttribute("class","col vacio");
				//ahora los valores a la fila derecha
				micol_izquierda.removeAttribute("class");
				micol_izquierda.setAttribute("class","col");
				micol_izquierda.innerText = valor;
				
				//hacemos los movimientos
				movimientos++;
				document.getElementById("movimientos").innerText = movimientos;

			}
		}


		//mover a la derecha
		if(posicion<3){
			if(micol_derecha.getAttribute("class").indexOf("vacio")>(-1)){
				fila_actual.innerText = "";
				fila_actual.removeAttribute("class");
				fila_actual.setAttribute("class","col vacio");
				//ahora los valores a la fila derecha
				micol_derecha.removeAttribute("class");
				micol_derecha.setAttribute("class","col");
				micol_derecha.innerText = valor;

				//hacemos los movimientos
				movimientos++;
				document.getElementById("movimientos").innerText = movimientos;
			}
		}

		//mover hacia arriba
		if((valor_tabla_padre-1) >= 1){
			if(fila_arriba.getAttribute("class").indexOf("vacio")>(-1)){
				fila_actual.innerText = "";
				fila_actual.removeAttribute("class");
				fila_actual.setAttribute("class","col vacio");
				//ahora los valores a la fila derecha
				fila_arriba.removeAttribute("class");
				fila_arriba.setAttribute("class","col");
				fila_arriba.innerText = valor;

				//hacemos los movimientos
				movimientos++;
				document.getElementById("movimientos").innerText = movimientos;
			}
		}//cierre de mover hacia arriba
		

		//mover hacia abajo
		if((valor_tabla_padre+1) <= 4){
			if(fila_abajo.getAttribute("class").indexOf("vacio")>(-1)){
				fila_actual.innerText = "";
				fila_actual.removeAttribute("class");
				fila_actual.setAttribute("class","col vacio");
				//ahora los valores a la fila derecha
				fila_abajo.removeAttribute("class");
				fila_abajo.setAttribute("class","col");
				fila_abajo.innerText = valor;

				//hacemos los movimientos
				movimientos++;
				document.getElementById("movimientos").innerText = movimientos;
			}
		}//cierre de mover hacia abajo

		cont_acertados = 0;
		if(document.getElementById("p1").innerText == "1" && document.getElementById("p2").innerText=="2" && document.getElementById("p3").innerText=="3" && document.getElementById("p4").innerText=="4"){
			cont_acertados++;
		}
		if(document.getElementById("p5").innerText == "5" && document.getElementById("p6").innerText=="6" && document.getElementById("p7").innerText=="7" && document.getElementById("p8").innerText=="8"){
			cont_acertados++;
		}
		if(document.getElementById("p9").innerText == "9" && document.getElementById("p10").innerText=="10" && document.getElementById("p11").innerText=="11" && document.getElementById("p12").innerText=="12" ){
			cont_acertados++;
		}
		if(document.getElementById("p13").innerText == "13" && document.getElementById("p14").innerText=="14" && document.getElementById("p15").innerText=="15"){
			cont_acertados++;
		}

		//si fue 4 es por que gano
		if(cont_acertados==4){
			alert("Has ganado el juego");
			alert("Movimiento: "+movimientos);
			alert("Tiempo: "+contador_m+":"+contador_s);
			//inicializamos nuevamente el juego

			generar();

		}

	

	}
	/*----------------------CIERRE DE LA LOGICA DEL JUEGO------------------------------------*/



});
