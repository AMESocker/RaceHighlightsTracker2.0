const saveData = JSON.parse(localStorage.getItem("RaceHighlights")) || [];
let currentEvent = {}
let show = 0
console.table(saveData)

const addOrUpdateRaceEvent = () => {
	const dataArrIndex = saveData.findIndex((item) => item === currentEvent.id);
	//----Date Value-----
	let vArr = dateElement.value.split('-');
	let monthWord = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let m = vArr[1] - 1;
	let day = vArr[2]
	let month = vArr[1]
	let date = `${monthWord[m]}${vArr[2]}` ;
	let year = vArr[0]
	

	const raceEventObj = {
		series: seriesName.value,
		date: `${date}`,
		year: year,
		location: raceEventElement.value,
		session: raceSession.value,
		id: `S${seriesName.value}${raceSession.value}D${date}`,
		watched: false
	}
	console.log(raceEventObj)
	if (dataArrIndex === -1) {
		saveData.unshift(raceEventObj); //?E
	} else {
		saveData[dataArrIndex] = raceEventObj;
	}
	localStorage.setItem('RaceHighlights', JSON.stringify(saveData))
	updateRaceEventTable()
	plusMinusBtn()
	addEvent.classList.toggle('hidden');
}
