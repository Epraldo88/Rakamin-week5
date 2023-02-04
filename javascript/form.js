const arrData = [];

class Person {
	constructor(nama, umur, uang) {
		this.name = nama;
		this.age = umur;
		this.money = uang;
	}
}

const addData = (nameForm, ageForm, moneyForm) => {
	const object = new Person(nameForm, ageForm, moneyForm);
	arrData.push(object);
};

const validator = (nameForm, ageForm, moneyForm, callback) => {
	setTimeout(() => {
		if (
			nameForm.length >= 10 &&
			ageForm >= 25 &&
			moneyForm >= 100000 &&
			moneyForm <= 1000000
		) {
			console.log(arrData);
			callback(nameForm, ageForm, moneyForm);
		} else {
			console.log("data ada yang salah");
			return;
		}
	}, 1000);
};

const triggerTableTab = () => {
	resume();
	document.getElementById("table-tab").disabled = true;
	document.getElementById("form-tab").removeAttribute("disabled");
	const table = document.querySelector("table");
	let tableHeaderTitle = ["No", "Nama", "Umur", "Uang Sangu"];
	generateTableHead(table, tableHeaderTitle);
	generateTableBody(table);
};

const triggerFormTab = () => {
	document.getElementById("table-tab").disabled = false;
	document.querySelector("thead").remove();
	document.querySelector("tbody").remove();
};

const generateTableHead = (table, titles) => {
	let thead = table.createTHead();
	let row = thead.insertRow();
	for (let title of titles) {
		let th = document.createElement("th");
		let text = document.createTextNode(title);
		console.log(title);
		th.appendChild(text);
		row.appendChild(th);
	}
};

const generateTableBody = (table) => {
	let tbody = table.createTBody();
	for (let data of arrData) {
		let row = tbody.insertRow();
		const money = moneyConverter(Number(data.money));
		console.log(`ini money ${money}`);
		const tempObj = {
			nama: data.name,
			umur: data.age,
			uang: money,
		};
		insertIndex(row, data);
		for (element in tempObj) {
			let cell = row.insertCell();
			let text = document.createTextNode(tempObj[element]);
			cell.appendChild(text);
		}
	}
};

const insertIndex = (row, index) => {
	let i = arrData.indexOf(index);
	let cell = row.insertCell();
	let text = document.createTextNode(++i);
	cell.appendChild(text);
};

const moneyConverter = (money) => {
	return money.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

const resume = () => {
	const avgMoney =
		arrData.reduce((a, b) => a + Number(b.money), 0) / arrData.length;
	const avgAge =
		arrData.reduce((a, b) => a + Number(b.age), 0) / arrData.length;
	// const moneyFormatter = avgMoney.toLocaleString(undefined, {
	// 	minimumFractionDigits: 2,
	// 	maximumFractionDigits: 2,
	// });
	document.getElementById(
		"money-avg"
	).innerHTML = `Rata-rata uang Sangu : ${moneyConverter(avgMoney)}`;
	document.getElementById("age-avg").innerHTML = `Rata-rata umur : ${avgAge}`;
};

function createData() {
	const form = document.querySelector("form");
	let nameForm = document.getElementById("fname").value;
	let ageForm = document.getElementById("age").value;
	let moneyForm = document.getElementById("money").value;

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const arrayTemp = [nameForm, ageForm, moneyForm];
		validator(...arrayTemp, addData);

		nameForm = "";
		ageForm = "";
		moneyForm = "";
		document.querySelector("form").reset();
	});
}
