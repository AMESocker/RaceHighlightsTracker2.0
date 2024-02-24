
const deleteTask = (buttonEl)=>{
  const dataArrIndex = saveData.findIndex(
    (item)=>item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.parentElement.remove()
  saveData.splice(dataArrIndex[1]);
  localStorage.setItem('RaceHighlights',JSON.stringify(saveData));
}

const reset = () => {
	dateElement.value = '';
	raceEventElement.value = '';
	raceSession.value = '';

	currentEvent = {};
}

if (saveData.length) {
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


function watched(buttonEl) {
	console.log(buttonEl.parentElement.id)
	const dataArrIndex = saveData.findIndex(
		(item) => item.id === buttonEl.parentElement.id
	);
	currentEvent = saveData[dataArrIndex];
	// console.table(dataArrIndex)
	console.table(currentEvent)

	currentEvent.watched = currentEvent.watched === false ? true : false;
	console.log(currentEvent.watched)
	// for (let i = 0; i < saveData.length; i++) {
	// }
	console.table(saveData)
	localStorage.setItem('RaceHighlights', JSON.stringify(saveData))
	updateRaceEventTable()
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

*/

//----ICS to JSON----
// "author": "Connor Wilson <me@cwlsn.com>",
// "license": "MIT",
// "repository": {
// 	"type": "git",
// 	"url": "https://github.com/cwlsn/ics-to-json.git"
// }
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
/*
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
const convert = async (fileLocation) => {
	const icsRes = await fetch(fileLocation)
	const icsData = await icsRes.text()
	// Convert
	const data = icsToJson(icsData)

	const dataArrIndex = saveData.findIndex((item) => item === currentEvent.id);

	data.forEach((data) => {
		let dataSplit = data.summary.split(' - ');
		let importSeries = dataSplit[0];
		let importEvent = dataSplit[1];
		saveData.session = importEvent
	})
	const raceEventObj = {
		series: '0',
		date: '0',
		year: '0',
		location: importEvent,
		session: '',
		id: '',//`S${seriesName.value}${raceSession.value}D${day}${month}${year}`,
		watched: false
	}
	if (dataArrIndex === -1) {
		saveData.unshift(raceEventObj); //?E
	} else {
		saveData[dataArrIndex] = raceEventObj;
	}
	// console.log(data[0].summary)
	localStorage.setItem('RaceHighlights', JSON.stringify(saveData))
}
convert('./MotorsportCalendar2023.0.ics')
*/
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
//F1, F2, F3, Formula-E, Indycar, WRC, IMSA, Supercars, World Rally Raid Championship, SuperMotocross 



// const addButton = document.getElementById('add')
addPlusBtn.addEventListener('click', plusMinusBtn);

addEvent.addEventListener("submit", (e) => {
	console.log('newAddButton')
	e.preventDefault();
	addOrUpdateRaceEvent();
});
//----Values----

let watchedValue;
