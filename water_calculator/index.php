<?php
header ("Content-Type: text/html; charset=utf-8");
echo "Hello world";
echo "
<!DOCTYPE html>
<html>
	<head>
		<meta charset='UTF-8'/>
		<title>My first page!</title>
		<link rel='stylesheet' href='bootstrap.css'>
		<link rel='stylesheet' href='main.css'>
		<script type='text/javascript' src='jquery-3.3.1.min.js'></script>
		<script type='text/javascript' src='script.js'></script>
	</head>

	<body>
	<br/>
	<div class='container'>
		<div class='row'>
		  <div class='col-md-7 centered'>
				<canvas id='Canvas' class='img-responsive' width='600' height='550' style='border:3px solid #0000FF;'>
				<!img-responsive - из bootstrap'a запрет картинке выходить за пределы колонки>
				</canvas>
			</div>
		  <div class='col-md-5 lefted'>
				<h4>Введите числа от 1 до 10.</h4>
				<p>Результат будет здесь:</p>
				<button class='result_button'>Calculate</button><br/><br/>
				<button class='randomize_button'>Randomize</button><br/><br/>
				<input type='number' class='my_input' autofocus /><br/><br/>
				<input type='number' class='my_input'/><br/><br/>
				<input type='number' class='my_input'/><br/><br/>
				<input type='number' class='my_input'/><br/><br/>
				<input type='number' class='my_input'/><br/><br/>
				<input type='number' class='my_input'/><br/><br/>
				<input type='number' class='my_input'/><br/><br/>
				<input type='number' class='my_input'/><br/><br/>
				<input type='number' class='my_input'/><br/><br/>
				<input type='number' class='my_input'/><br/>

			</div>
		</div>
	</div>

	</body>

</html>
";
?>
