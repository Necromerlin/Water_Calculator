jQuery('document').ready(function(){

	function drawGrid() { //разлинуем сеточкой для удобства визуального подсчета
		var canvas = document.getElementById("Canvas");
		if (canvas.getContext){
			var w=canvas.width;
					h=canvas.height;
			var grid = canvas.getContext("2d");
			grid.lineWidth = 1;
			grid.strokeStyle = "#d2d2d2";
			for (x=0; x<=w;x+=w/12) { //здесь и далее оставляем в рисуемом поле отступы слева, справа (w/12) и сверху (h/11)
        for (y=0; y<=h;y+=h/11) {//чтобы стена рисовалась в области 10*10 частей
            grid.moveTo(x, 0);
            grid.lineTo(x, h);
            grid.stroke();
            grid.moveTo(0, y);
            grid.lineTo(w, y);
            grid.stroke();
        }
    	}
		}
		else return alert("Canvas не поддерживается вашим браузером!");
		return;
	}

	function clear_img(){
		var canvas = document.getElementById("Canvas");
		if (canvas.getContext){
			var wall = canvas.getContext("2d");
			wall.clearRect(0, 0, canvas.width, canvas.height);
		}
		else return alert("Canvas не поддерживается вашим браузером!");
	}

	function drawWall(arr) { //рисуем нашу стену с привязкой к ширине и высоте
		var canvas = document.getElementById("Canvas");
		if (canvas.getContext){
			var wall = canvas.getContext("2d");
			var w=canvas.width,
					h=canvas.height,
					w12=w/12,
					h11=h/11;
			wall.lineWidth = 3;
			wall.strokeStyle = "#000000";
			wall.beginPath();
			wall.moveTo(w/12,h);												// оставляем отступ справа
			for (i=0;i<12;i++){
				wall.lineTo(w12+w12*i,h-h11*arr[i]);			// рисуем вертикальную линию, в соответствии с заданной высотой стены
				wall.lineTo(w12+w12*(i+1),h-h11*arr[i]);	// рисуем горизонтальную линию до следующего блока
			}
			wall.lineTo(w-w12,h);
			wall.closePath();
			wall.stroke();
		}
		else return alert("Canvas не поддерживается вашим браузером!");
	}

	function drawWater(count,pos,value) { //рисование воды с аргументами: кол-во блоков воды в высоту, позиция в нашей стене, высота стены на этой позиции
		var canvas = document.getElementById("Canvas");
		if (canvas.getContext){
			var water = canvas.getContext("2d");
			var w12=canvas.width/12,
					h11=canvas.height/11;
			water.fillStyle = "#6495ED";
			water.fillRect(w12*(pos+1),canvas.height-h11*(value+count),w12,h11*count);
		}
		else return alert("Canvas не поддерживается вашим браузером!");
	}


	function Calculate(arr){ // функция подсчета объема воды
		var value;
		var leftMax = 0;
		var rightMax = 0;
		var left = 0;
		var right = arr.length - 1;
		var result = 0;
		while(left < right) { 								// ищем глобальные максимумы
			if(arr[left] > leftMax) {
				leftMax = arr[left];							// при изменении переменной left ищем максимум слева
			}
			if(arr[right] > rightMax) {
				rightMax = arr[right];						// при изменении переменной right ищем максимум справа
			}
			if(leftMax >= rightMax) {						// если слева выше или равно, значит высота невыплескивания ограничена rightMax'ом
				result += rightMax - arr[right];	// если стена по высоте равна rightMax'у, то ничего не будет
				if ((rightMax - arr[right])>0 ){	// иначе рисуем воду на нужное кол-во блоков
					drawWater(rightMax - arr[right], right, arr[right])
				}
				right--;
			} else {
				result += leftMax - arr[left];	// иначе, высота невыплескивания ограничена leftMax'ом
				if ((leftMax - arr[left])>0 ){	// рисуем воду, если она есть
					drawWater(leftMax - arr[left], left, arr[left])
				}
				left++;
			}
		}
		return result;
	}

	jQuery('button.result_button').on('click',function(){
		var array_of_digit = [1,2,3,4,5,6,7,8,9,10];
		var arr = [];
		var d = document,
    inp = d.getElementsByClassName('my_input');
		for (var i = 0; i < inp.length; i++) {
			arr.push(parseFloat(inp[i].value));
		}
	  for (var i = 0; i < inp.length; i++) {
			//if ( Number.isInteger(parseFloat(inp[i].value)) ){
			if ( Number.isInteger(arr[i]) ){
				//arr.push(parseInt(inp[i].value));
				arr[i]=parseInt(arr[i]);
			}
			else if (arr.length==0 || arr.length != inp.length)  {
				return alert("Вы ввели не все данные либо ничего не ввели!");
			}
			else if (arr.indexOf('.',',',"+","-") <0){
				return alert("Неправильный ввод!");
			}
	  }
		for (var i=0; i<array_of_digit.length;i++){
				if(array_of_digit.indexOf(arr[i]) < 0  ) {
					return alert("Ввод не соответствует условию!");

				}
		}
		clear_img(); 		// почистим поле для рисования
		drawGrid();	 		// разлинуем сеточкой
		$('p').text('Результат будет здесь: '+ Calculate(arr)); // в абзац будем выводить результат
		drawWall(arr);	// в конце рисуем стену, чтобы вода не налезала на края стены

	});

	jQuery('button.randomize_button').on('click',function(){
		$('.my_input').val(function(index,val) {
		  return  Math.floor(Math.random() * 10) + 1;
		})
	});


});
