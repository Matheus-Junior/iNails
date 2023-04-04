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
});