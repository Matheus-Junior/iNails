$(document).ready(function () {
	$("input").keypress(function( event ){
		if ( event.keyCode === 13 ){
			event.preventDefault();
				$(this).blur();
		}
	});
    // Máscara p/ o CPF
		$('#cpf').inputmask('999.999.999-99');
    // Validação do CPF
    $("#cpf").blur(function( event ){
		let cpfStr = $(event.target).val().trim();
		if (cpfStr.trim().replace(".","").replace(".","").replace("-", "").match(/^[\d]{11}$/g)){
			num_igual = 0;
			cpfStr = cpfStr.replace("-",".").split(".");
			for (let index = 0; index != cpfStr.length; index++) {
				if (index < 3) {
					if (cpfStr[index][0] == cpfStr[index][1] && cpfStr[index][1] == cpfStr[index][2]) {
						num_igual++;
					}
				}
				else{
					if (cpfStr[index][0] == cpfStr[index][1]) {
						num_igual++;
					}
				}
			}
			if (num_igual == 0) {
				let cpf = cpfStr.join('');
				dig_verif1 = 0;
				dig_verif2 = 0;
				let index = 0;
				for(let mult = 10; mult > 1; mult--){
					dig_verif1 += mult * cpf[index];
					index++;
				}
				dig_verif1 = dig_verif1 % 11;
				if (dig_verif1 != 0 && dig_verif1 != 1) {
					dig_verif1 = Math.abs(11 - dig_verif1);
					if (dig_verif1 <= 9 && dig_verif1 == cpf[9]) {
						index = 1;
						for(let mult = 10; mult > 1; mult--){
							dig_verif2 += mult * cpf[index];
							index++;
						}
						dig_verif2 = dig_verif2 % 11;
						if (dig_verif2 != 0 && dig_verif2 != 1) {
							dig_verif2 = Math.abs(11 - dig_verif2);
							if (dig_verif2 <= 9 && dig_verif2 == cpf[10]) {
								$(event.target).css("color", "black");
								$("#cpf").css("border-color", "");		
		    					$("#msgCpf").hide();
							}
							else{
								$(event.target).css("color", "red");
								$(event.target).focus();
								$("#msgCpf").html("<p>Seu CPF está incorreto!</p>").css("color", "red");
								$("#cpf").css("border-color", "red");
								$("#msgCpf").show();
							}
						}	
						else{
							if (dig_verif2 <= 9 && dig_verif2 == cpf[10]) {
								$(event.target).css("color", "black");
								$("#cpf").css("border-color", "");		
		    					$("#msgCpf").hide();
							}
							else{
								$(event.target).css("color", "red");
								$(event.target).focus();
								$("#msgCpf").html("<p>Seu CPF está incorreto!</p>").css("color", "red");
								$("#cpf").css("border-color", "red");
								$("#msgCpf").show();					
							}
						}
					}
					else{
						$(event.target).css("color", "red");
						$(event.target).focus();
						$("#msgCpf").html("<p>Seu CPF está incorreto!</p>").css("color", "red");
						$("#cpf").css("border-color", "red");
						$("#msgCpf").show();
					}
				}
				else{
					if (dig_verif1 <= 9 && dig_verif1 == cpf[9]) {
						index = 1;
						for(let mult = 10; mult > 2; mult--){
							dig_verif2 += mult * cpf[index];
							index++;
						}
						dig_verif2 = Math.abs((dig_verif2 + dig_verif1 * 3) % 11);
						if (dig_verif2 != 0 && dig_verif2 != 1) {
							dig_verif2 = 11 - dig_verif2;
							if (dig_verif2 <= 9 && dig_verif2 == cpf[10]) {
								$(event.target).css("color", "black");	
								$("#cpf").css("border-color", "");	 
		    					$("#msgCpf").hide();
							}
							else{
								$(event.target).css("color", "red");
								$(event.target).focus();
								$("#msgCpf").html("<p>Seu CPF está incorreto!</p>").css("color", "red");
								$("#cpf").css("border-color", "red");
								$("#msgCpf").show();
							}
						}
						else{
							if (dig_verif2 <= 9 && dig_verif2 == cpf[10]) {
								$(event.target).css("color", "black");
								$("#cpf").css("border-color", "");		
	    						$("#msgCpf").hide();
							}
							else{
								$(event.target).css("color", "red");
								$(event.target).focus();
								$("#msgCpf").html("<p>Seu CPF está incorreto!</p>").css("color", "red");
								$("#cpf").css("border-color", "red");
								$("#msgCpf").show();				
							}
						}
					}
					else{
						$(event.target).css("color", "red");
						$(event.target).focus();
						$("#msgCpf").html("<p>Seu CPF está incorreto!</p>").css("color", "red");
						$("#cpf").css("border-color", "red");
						$("#msgCpf").show();			
					}
				}
			}
			else{
				$(event.target).css("color", "red");
				$(event.target).focus();
				$("#msgCpf").html("<p>Seu CPF está incorreto!</p>").css("color", "red");
				$("#cpf").css("border-color", "red");
				$("#msgCpf").show();
			}
		}
		else{
			$(event.target).css("color", "red");
			$(event.target).focus();
			$("#msgCpf").html("<p>Seu CPF está incorreto!</p>").css("color", "red");
			$("#cpf").css("border-color", "red");
			$("#msgCpf").show();
		}
	});
	// Validação do Email
	$("#email").blur(function( event ){
		let emailStr = $(event.target).val().trim();
		if (emailStr.includes("@") && emailStr.match(/@/g).length == 1){
			emailStr = emailStr.split("@");
			nome_usuario = emailStr[0].trim(); 
			dominio = emailStr[1].trim();
			placar_erro = 0;
			char_especial = ["!","#","$","%","&","*","+","-","/","=","?","^","_","`","{","|","}","~",".","'"]
			if(0 != nome_usuario.length && nome_usuario.length <= 64){
				for (let char = 0; char != nome_usuario.length; char++) {
					if (char_especial.some(el => nome_usuario.includes(el))) {
						if (nome_usuario[char] == "."){
							if (char == 0 || char == nome_usuario.length-1) {
								placar_erro++;  
							}
						}
						if (nome_usuario[char] == nome_usuario[char-1]) {
							placar_erro++;
						}
					}
					else if (nome_usuario[char].match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
						placar_erro++;
					}	
				}
				if (placar_erro == 0) {
					if (0 != dominio.length && dominio.length <= 253) {
						if (dominio.includes(".") && dominio.match(/./g).length > 0) {
							for (let char = 0; char != dominio.length; char++) {
								if (dominio[char] == ".") {
									if (dominio[char] == dominio[char-1]) {
										placar_erro++;
									}
								}
							}
							dominio = dominio.split(".");
							for (let char = 0; char != dominio.length; char++){
								if ((char%2) == 0) {
									if (0 >= (dominio[char] + dominio[char+1]).length  || (dominio[char] + dominio[char+1]).length > 63 || dominio[char].length <= 0 || dominio[char+1].length <= 0) {
										placar_erro++;
									}
								}
								if (placar_erro == 0) {
									for (let index = 0; index != dominio.length; index++) {
										if (dominio[index].match(/^\d+$/g)) {
											placar_erro++;
										}
										for (let char = 0; char != dominio[index].length; char++) {
											if (dominio[index][char] == "-") {
												if (char == 0 || char == (dominio[index].length-1)) {
													placar_erro++;
												}
												if (dominio[index][char] == dominio[index][char-1]) {
													placar_erro++;
												}
											}
											else if (dominio[index][char].match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
												placar_erro++;
											}	
										}
									}
									if (placar_erro == 0) {
										$(event.target).css("color", "black");
										$("#email").css("border-color", "");
										$("#msgEmail").hide();
									}
									else{
										$(event.target).css("color", "red");
										$(event.target).focus();
										$("#msgEmail").html("<p>Seu e-mail está incorreto!</p>").css("color", "red");
										$("#email").css("border-color", "red");
										$("#msgEmail").show();
									}
								}
								else{
									$(event.target).css("color", "red");
									$(event.target).focus();
									$("#msgEmail").html("<p>Seu e-mail está incorreto</p>").css("color", "red");
									$("#email").css("border-color", "red");
									$("#msgEmail").show();
								}	
							}
						}
						else{
							$(event.target).css("color", "red");
							$(event.target).focus();
							$("#msgEmail").html("<p>Seu e-mail está incorreto!</p>").css("color", "red");
							$("#email").css("border-color", "red");
							$("#msgEmail").show();
						}
					}
					else{
						$(event.target).css("color", "red");
						$(event.target).focus();
						$("#msgEmail").html("<p>Seu e-mail está incorreto!</p>").css("color", "red");
						$("#msgEmail").show();
					}
				}
				else{
					$(event.target).css("color", "red");
					$(event.target).focus();
					$("#msgEmail").html("<p>Seu e-mail está incorreto!</p>").css("color", "red");
					$("#email").css("border-color", "red");
					$("#msgEmail").show();
				}
			}
			else{
				$(event.target).css("color", "red");
				$(event.target).focus();
				$("#msgEmail").html("<p>Seu e-mail está incorreto!</p>").css("color", "red");
				$("#email").css("border-color", "red");
				$("#msgEmail").show();
			}
		}
		else{
			$(event.target).css("color", "red");
			$(event.target).focus();
			$("#msgEmail").html("<p>Seu e-mail está incorreto!</p>").css("color", "red");
			$("#email").css("border-color", "red");
			$("#msgEmail").show();
		}
	});
});