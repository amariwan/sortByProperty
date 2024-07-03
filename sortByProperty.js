		const sortByProperty = (arr, prop, sortOrder) => {
			const dateRegex = /(\d{1,2})\.(\d{1,2})\.(\d{4}) (\d{1,2}):(\d{1,2}):(\d{1,2})/;
			let isDate = false;
			let resultsArray = [];
			// convert date format in object array to ISO format
			if (typeof arr[0][prop] === 'string') {
				// if (isNaN(arr[0][prop])) {
				if (arr[0] && arr[0][prop] && arr[0][prop].match(dateRegex)) {
					arr.forEach((e) => {
						var match = e[prop].match(dateRegex);
						if (match) {
							e[prop] = isoDate(match);
							isDate = true;
						}
					});
				}
				// }
			} else {
				// if (isNaN(arr[0][prop].value)) {
				if (arr[0] && arr[0][prop].value && arr[0][prop].value.match(dateRegex)) {
					arr.forEach((e) => {
						var match = e[prop].value.match(dateRegex);
						if (match) {
							e[prop].value = isoDate(match);
							isDate = true;
						}
					});
				}
				// }
			}
			// sort array
			if (sortOrder === 'asc') {
				resultsArray = arr.sort((a, b) => {
					if ((typeof a[prop] === 'number' && typeof b[prop] === 'number') || (isNaN(a[prop]) === false && isNaN(b[prop]) === false) || isDate) {
						return a[prop] - b[prop];
					} else if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
						return a[prop].localeCompare(b[prop]);
					} else {
						return a[prop].value.localeCompare(b[prop].value);
					}
				});
			} else if (sortOrder === 'desc') {
				resultsArray = arr.sort((a, b) => {
					if ((typeof a[prop] === 'number' && typeof b[prop] === 'number') || (isNaN(a[prop]) === false && isNaN(b[prop]) === false) || isDate) {
						return b[prop] - a[prop];
					} else if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
						return b[prop].localeCompare(a[prop]);
					} else {
						return b[prop].value.localeCompare(a[prop].value);
					}
				});
			}
			if (isDate) {
				resultsArray.forEach((e) => {
					if (typeof e[prop] === 'string') {
						e[prop] = convertIsoToGermanDate(e[prop]);
					} else {
						e[prop].value = convertIsoToGermanDate(e[prop].value);
					}
				});
			}
			return resultsArray;
		};

		// This code converts an ISO date to a German date.
		// The function name is convertIsoToGermanDate.
		// The parameter name is isoDate.
		// The variable names are date, day, month, year, hours, minutes, and seconds.
		// The code is used to display dates in the user's locale.
		const convertIsoToGermanDate = (isoDate) => {
			const date = new Date(isoDate);
			const day = date.getDate().toString().padStart(2, '0');
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const year = date.getFullYear().toString();
			const hours = date.getHours().toString().padStart(2, '0');
			const minutes = date.getMinutes().toString().padStart(2, '0');
			const seconds = date.getSeconds().toString().padStart(2, '0');
			return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
		};

		const isoDate = (match) => {
			const year = match[3];
			const month = match[2];
			const day = match[1];
			const hours = match[4];
			const minutes = match[5];
			const seconds = match[6];
			const isoDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
			return isoDate;
		};
