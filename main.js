var locMenu = document.getElementById('dynMenu');
var lst = document.getElementById('options');
variable.onclick = function() {
	var li = document.createElement('LI'), li1 = document.createElement('LI'), li2 = document.createElement('LI'), li3 = document.createElement('LI');
	li.innerHTML = 'Нарисовать';
	lst.appendChild(li);
	li1.innerHTML = 'Присвоить значение';
	lst.appendChild(li1);
	li2.innerHTML = 'Изменить значение';
	lst.appendChild(li2);
	li3.innerHTML = 'Поменять с другой переменной';
	lst.appendChild(li3);
}