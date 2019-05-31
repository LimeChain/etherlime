const getReadableTime = (timeStamp) => {
	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	// Full date from timestamp
	let fullDate = new Date(timeStamp);

	// Current month:
	let month = monthNames[fullDate.getMonth()]

	// Current day of the month
	let date = fullDate.getDate();

	// Hours part from the timestamp
	let hours = fullDate.getHours();

	// Minutes part from the timestamp
	let minutes = "0" + fullDate.getMinutes();

	// Seconds part from the timestamp
	let seconds = "0" + fullDate.getSeconds();

	let formattedTime = `${date} ${month}, ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
	return formattedTime
}

module.exports = { getReadableTime }