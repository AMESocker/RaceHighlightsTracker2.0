const updateRaceEventTable = () => {
	listElement.innerHTML = '';
	saveData.forEach(
		({ series, date, year, location, session, id, watched }) => {
			(listElement.innerHTML += `
				<tr>
						<td><img src="${logo[series].image}">
						</td>
						<td>${date}</td>
						<td>${year}</td>
						<td>${location}</td>
						<td>${session}</td>
						<td  id=${id}><input type="button" value=" " class="watched-${watched}"  onclick="watched(this)"></td>
						<td><input type="button" onclick='deleteTask(this)' value="Delete"></td>
				</tr>
			`);
		}
	)
	// console.table(saveData)
	reset()
};