const newAddButton = document.getElementById('new');
const dateElement = document.getElementById('date');
const raceEventElement = document.getElementById('rEvent')
const raceSession = document.getElementById('rSession');
const seriesName = document.getElementById('select');
const listElement = document.getElementById('list-data');
const addEvent = document.getElementById('addEvent')
const modeButton = document.getElementById('dark');
const addEventBox = document.getElementById('add-event-box')
const addPlusBtn = document.getElementById('add')

//----Radio Button Value----
const saveData = JSON.parse(localStorage.getItem("RaceHighlights")) || [];
let currentEvent = {}
let show = 0

const addOrUpdateRaceEvent = () => {
	const dataArrIndex = saveData.findIndex((item) => item === currentEvent.id);
	//----Date Value-----
	let vArr = dateElement.value.split('-');
	let monthWord = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let m = vArr[1] - 1;
	date = monthWord[m] + ' ' + vArr[2]
	year = vArr[0];

	const raceEventObj = {
		series: seriesName.value,
		date: date,
		year: year,
		location: raceEventElement.value,
		session: raceSession.value,
		id: 0,
		watched: false
	}
	console.log(raceEventObj)
	if (dataArrIndex === -1) {
    saveData.unshift(raceEventObj); //?E
  }else{
    saveData[dataArrIndex] = raceEventObj;
  }
	localStorage.setItem('RaceHighlights',JSON.stringify(saveData))
	updateRaceEventTable()
	plusMinusBtn()
	addEvent.classList.toggle('hidden');
}

const updateRaceEventTable = () => {
	listElement.innerHTML = '';
	saveData.forEach(
		({ series, date, year, location, session, wv }) => {
			(listElement.innerHTML += `
    <tr>
        <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/420px-F1.svg.png">
        </td>
        <td>${date}</td>
        <td>${year}</td>
        <td>${location}</td>
        <td>${session}</td>
        <td><input type="checkbox" class="checkbox" id="0May07MiamiRace" onclick="watched()"></td>
        <td><button type="button" onclick='editTask(this)'>Edit</button></td>
    </tr>
 `);
		}
	)
	reset()


};

/*
//----Event Value----


		console.log(seriesName.value, date, year, raceEventValue, sessionEventValue)

		if (jsonDataAll.length !== 0) {

				for (let j = 0; j < jsonData.length; j++) {
						console.log(jsonData[j])

						jsonData = {
								series: value[i].id,
								date: date,
								location: rEvent,
								session: sEvent,
								id: j + 1,
								watched: false
						}
						jsonDataAll.push(jsonData)

						console.log(jsonData)
				}
		} else {

				jsonData = {
						series: seriesName.value,
						date: date,
						year: year,
						location: raceEventValue,
						session: sessionEventValue,
						id: 0,
						watched: false
				}
		}

		console.log(jsonData)
		saveData = JSON.stringify(jsonData)
		jsonDataAll.push(saveData)
		console.log(saveData)
		localStorage.setItem("JSON Race Event", saveData)

		raceEvent(seriesName.value, date, year, raceEventValue, sessionEventValue)
		addButton.innerHTML = '+'
*/

const reset = () => {
	dateElement.value = '';
	raceEventElement.value = '';
	raceSession.value = '';

	currentEvent = {};
}
if(saveData.length){
  updateRaceEventTable()
}

function plusMinusBtn() {
	if (show == 0) {
		show = 1
		addPlusBtn.innerHTML = '&ndash;'
	} else if (show == 1) {
		show = 0
		addPlusBtn.textContent = '+'
	}
	console.log('ModalLabels')
}

addPlusBtn.addEventListener('click', () => addEvent.classList.toggle('hidden'))

// value.addEventListener('click', () => {
//     addOrUpdateRaceEvent();
//     addEventBox.showModal();
// });

//----Add new row with input info----


//----Dark Mode----

/*
const darkMode = () => {
		let element = document.body;
		element.classList.toggle("dark-mode");

		if (modeButton.innerHTML == 'Light') {
				modeButton.innerHTML = 'Dark'
				modeButton.setAttribute('style', 'color:white')
		} else {
				modeButton.innerHTML = 'Light'
				modeButton.setAttribute('style', 'color:black;background-color: white');
		}

}
modeButton.addEventListener('click', darkMode)

//----ICS to JSON----
/*

"author": "Connor Wilson <me@cwlsn.com>",
"license": "MIT",
"repository": {
	"type": "git",
	"url": "https://github.com/cwlsn/ics-to-json.git"
}
const NEW_LINE = /\r\n|\n|\r/;

const EVENT = "VEVENT";
const EVENT_START = "BEGIN";
const EVENT_END = "END";
const START_DATE = "DTSTART";
const END_DATE = "DTEND";
const DESCRIPTION = "DESCRIPTION";
const SUMMARY = "SUMMARY";
const LOCATION = "LOCATION";
const ALARM = "VALARM";

const keyMap = {
	[START_DATE]: "startDate",
	[END_DATE]: "endDate",
	[DESCRIPTION]: "description",
	[SUMMARY]: "summary",
	[LOCATION]: "location"
};

const clean = string => unescape(string).trim();

const icsToJson = icsData => {
	const array = [];
	let currentObj = {};
	let lastKey = "";

	const lines = icsData.split(NEW_LINE);

	let isAlarm = false;
	for (let i = 0, iLen = lines.length; i < iLen; ++i) {
		const line = lines[i];
		const lineData = line.split(":");

		let key = lineData[0];
		const value = lineData[1];

		if (key.indexOf(";") !== -1) {
			const keyParts = key.split(";");
			key = keyParts[0];
			// Maybe do something with that second part later
		}

		if (lineData.length < 2) {
			if (key.startsWith(" ") && lastKey !== undefined && lastKey.length) {
				currentObj[lastKey] += clean(line.substr(1));
			}
			continue;
		} else {
			lastKey = keyMap[key];
		}

		switch (key) {
			case EVENT_START:
				if (value === EVENT) {
					currentObj = {};
				} else if (value === ALARM) {
					isAlarm = true;
				}
				break;
			case EVENT_END:
				isAlarm = false;
				if (value === EVENT) array.push(currentObj);
				break;
			case START_DATE:
				currentObj[keyMap[START_DATE]] = value;
				break;
			case END_DATE:
				currentObj[keyMap[END_DATE]] = value;
				break;
			case DESCRIPTION:
				if (!isAlarm) currentObj[keyMap[DESCRIPTION]] = clean(value);
				break;
			case SUMMARY:
				currentObj[keyMap[SUMMARY]] = clean(value);
				break;
			case LOCATION:
				currentObj[keyMap[LOCATION]] = clean(value);
			default:
				continue;
		}
	}
	return array;
};

// // export default icsToJson;
// let cal = './MotorsportCalendar2023.0.ics'

// const convert = async (fileLocation) => {
// 	const icsRes = await fetch(fileLocation)
// 	const icsData = await icsRes.text()
// 	// Convert
// 	const data = icsToJson(icsData)
//     // console.table(data)
// 	return data
// }

// convert(cal)
*/
//F1, F2, F3, Formula-E, Indycar, WRC, IMSA, Supercars, World Rally Raid Championship, SuperMotocross 

let logo = [
	{
		series: 'Formula 1',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/420px-F1.svg.png'
	}, {
		series: 'F2',
		image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Formula_2_logo.svg/330px-Formula_2_logo.svg.png'
	}, {
		series: 'F3',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/FIA_F3_Championship_logo.png/330px-FIA_F3_Championship_logo.png'
	}, {
		series: 'Formula-E',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Formula-e-logo-championship_2023.svg/390px-Formula-e-logo-championship_2023.svg.png'
	}, {
		series: 'IndyCar',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/IndyCar_Series_textlogo.svg/659px-IndyCar_Series_textlogo.svg.png?20210511055910'
	}, {
		series: 'WRC',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/WRC.svg/405px-WRC.svg.png'
	}, {
		series: 'IMSA',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/International_Motor_Sports_Association_logo_%282014-present%29.svg/300px-International_Motor_Sports_Association_logo_%282014-present%29.svg.png'
	}, {
		series: 'SuperCars',
		image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Supercars_Championship_Logo_2021.png/270px-Supercars_Championship_Logo_2021.png'
	},
	// {
	//     series: 'W2RC',
	//     image: 'https://upload.wikimedia.org/wikipedia/en/d/d2/World_Rally-Raid_Championship_logo.png'
	// }, 
	// {
	//     series: 'SuperMotoCross',
	//     image: 'https://www.supermotocross.com/wp-content/uploads/2023/01/SMX-League-Logo.png'
	// }
]
//----Dynamic Add Series----
/*
const addEvent = document.getElementById('addEvent');
const d = document.createElement('br');
const selectEle = document.createElement('select')
const brEle = document.createElement('br');
//----Series Selection----
for (let i = 0; i < logo.length; i++) {
		// todo: Add select and child option elements
		// const inputEle = document.createElement('input');
		const labelEle = document.createElement('option');
		labelEle.name = 'new'
		labelEle.id = [i]
		labelEle.value = [i]
		labelEle.innerText = logo[i].series
		addEvent.appendChild(selectEle);
		selectEle.appendChild(labelEle);
		selectEle.setAttribute('id','select')
		labelEle.setAttribute('for', logo[i].series)
		addEvent.appendChild(brEle);
}
addEvent.appendChild(d);

//----add date----
const dateSelect = document.createElement('input');
addEvent.appendChild(dateSelect);
dateSelect.setAttribute('type', 'date');
dateSelect.setAttribute('id', 'date');
addEvent.appendChild(document.createElement('br'));

//----add Event----
const eventForm = document.createElement('input');
addEvent.appendChild(eventForm);
eventForm.setAttribute('type','text')
eventForm.setAttribute('id','rEvent')
eventForm.setAttribute('placeholder','Event')
addEvent.appendChild(d)

//----add Session----
const sessionForm = document.createElement('input');
addEvent.appendChild(sessionForm);
sessionForm.setAttribute('type','text')
sessionForm.setAttribute('id','rSession')
sessionForm.setAttribute('placeholder','Session')
addEvent.appendChild(d)

//----add button----
const e = document.createElement('div');
addEvent.appendChild(e)
e.setAttribute('class', 'btn')
e.setAttribute('id', 'new')
e.innerHTML = 'Add'
*/
// const addButton = document.getElementById('add')
addPlusBtn.addEventListener('click', plusMinusBtn);

addEvent.addEventListener("submit", (e) => {
	console.log('newAddButton')
	e.preventDefault();
	addOrUpdateRaceEvent();
});
//----Values----

let watchedValue;






//----Delete Event----

function deleteEvent() {
	let deleteElement;
	console.log(this.id)
}

//----Dynamic Add Row--------



//----Load Saved Data----

let savedJsonData = [];

let savedData = localStorage.getItem("JSON Race Event", saveData)
let savedJSONData = localStorage.getItem("JSON Race Event", saveData);
// console.log(savedJSONData)


let jDGS = [...savedJsonData]
// console.log(jDGS)

if (savedJSONData) {
	let parsedJsonData = JSON.parse(savedJSONData)
	// console.log(parsedJsonData)
	jsonDataG = parsedJsonData
	for (let i = 0; i < parsedJsonData.length; i++) {
		console.log(parsedJsonData[i])

		raceEvent(parsedJsonData[i].series, parsedJsonData[i].date, parsedJsonData[i].year, parsedJsonData[i].location, parsedJsonData[i].session, parsedJsonData[i].watched)
	}
}
/*
if (savedData) {
		let splitSavedData = savedData.split(',');
		saveData = splitSavedData
		// console.log(splitSavedData)
		for (let i = 0; i < splitSavedData.length; i++) {
				let f = splitSavedData[i].split('-');
				// console.log(f)
				// console.log(splitSavedData[i])
				let jsonData =
				{
						series:f[0],
						date:f[1],
						location:f[2],
						session:f[3],
						id:i,
						watched:false
				}
				jsonDataG.push( jsonData)
				// console.log(jsonData)
				// raceEvent(f[0], f[1],f[2],f[3])
		}
console.log(jDGS);

}
*/
//----Load JSON Saved Data----



function watched() {
	const l = document.getElementsByClassName('checkbox');
	//     let thisRow = saveData.splice(this.id, 1);
	//     // console.log(saveData.split('-'))
	for (let i = 0; i < jsonDataG.length; i++) {
		jsonDataG[i].watched = l[i].checked
		eWatched[i] = l[i].checked
		// console.log(l[i].checked)

		// saveData = saveData[i]+ '-' +eWatched[i];
	}
	// console.table(JSON.stringify(jsonDataG))
	saveData = JSON.stringify(jsonDataG)
	console.log(saveData)
	localStorage.setItem("JSON Race Event", saveData)
}
/*
let seriesSelector = document.getElementById('series').addEventListener('click', () => { sortSeries() })
console.log(savedJSONData)
console.log(saveData)

function sortSeries() {
		console.log('Sort')
		let pSJData = JSON.parse(savedJSONData).sort(
				(a, b) => a.series - b.series)
		console.log(pSJData)
		jsonDataG = pSJData
		saveData = JSON.stringify(jsonDataG)
		console.log(saveData)
		localStorage.setItem("JSON Race Event", saveData)
}
*/
/*
function buttonSeries() {
		let value = document.getElementsByName('new');
		for (let i = 0; i < value.length; i++) {
				if (value[i].checked) {
						//----Date Value-----
						let v = document.getElementById('date');
						let vArr = v.value.split('-')
						date = vArr[1] + ' ' + vArr[2]

						//----Event Value----
						let ev = document.getElementById('rEvent')
						raceEventValue = ev.value

						//----Session Value----
						let sv = document.getElementById('rSession');
						sessionEventValue = sv.value

						raceEvent(value[i].id, date, raceEventValue, sessionEventValue)

						//value of radio box
						let seriesNum = value[i].id;

						//change values to a string
						let serStr = seriesNum.toString()
						let datStr = date.toString()

						//combine data
						let strSav = serStr + '-' + datStr + '-' + raceEventValue + '-' + sessionEventValue + '-' + eWatched;

						//save data
						saveData.push(strSav)
						localStorage.setItem("Race Event", saveData)
				}
		}
		a.setAttribute('style', 'display:none')
		// console.log(saveData)
		// console.log(localStorage)
}
*/