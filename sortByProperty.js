const sortByProperty = (arr, prop, sortOrder) => {
  const dateRegex = /(\d{1,2})\.(\d{1,2})\.(\d{4}) (\d{1,2}):(\d{1,2}):(\d{1,2})/;
  const isDate = arr.some(item => dateRegex.test(item[prop]?.toString()));

  if (isDate) {
    arr.forEach(item => {
      const match = item[prop]?.toString().match(dateRegex);
      if (match) item[prop] = isoDate(match);
    });
  }

  const compareValues = (a, b) => {
    const aValue = a[prop]?.value ?? a[prop];
    const bValue = b[prop]?.value ?? b[prop];

    if (isDate || (!isNaN(aValue) && !isNaN(bValue))) {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  };

  arr.sort(compareValues);

  if (isDate) {
    arr.forEach(item => {
      if (typeof item[prop] === 'string') {
        item[prop] = convertIsoToGermanDate(item[prop]);
      } else {
        item[prop].value = convertIsoToGermanDate(item[prop].value);
      }
    });
  }

  return arr;
};

const filterByProperty = (arr, prop, value) => {
  return arr.filter(item => item[prop]?.value ?? item[prop] === value);
};

const searchByProperty = (arr, prop, query) => {
  const lowerQuery = query.toLowerCase();
  return arr.filter(item => (item[prop]?.value ?? item[prop]).toString().toLowerCase().includes(lowerQuery));
};

const groupByProperty = (arr, prop) => {
  return arr.reduce((groups, item) => {
    const key = item[prop]?.value ?? item[prop];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
};

const averageByProperty = (arr, prop) => {
  const total = arr.reduce((sum, item) => sum + (parseFloat(item[prop]?.value ?? item[prop]) || 0), 0);
  return total / arr.length;
};

const minByProperty = (arr, prop) => {
  return arr.reduce((min, item) => Math.min(min, parseFloat(item[prop]?.value ?? item[prop])), Infinity);
};

const maxByProperty = (arr, prop) => {
  return arr.reduce((max, item) => Math.max(max, parseFloat(item[prop]?.value ?? item[prop])), -Infinity);
};

const reverseArray = (arr) => {
  return arr.reverse();
};

const addElementToArray = (arr, element) => {
  arr.push(element);
  return arr;
};

const removeElementFromArray = (arr, prop, value) => {
  return arr.filter(item => item[prop]?.value ?? item[prop] !== value);
};

const updateElementInArray = (arr, prop, value, newValue) => {
  return arr.map(item => {
    if (item[prop]?.value ?? item[prop] === value) {
      item[prop] = newValue;
    }
    return item;
  });
};

const findElementByProperty = (arr, prop, value) => {
  return arr.find(item => item[prop]?.value ?? item[prop] === value);
};

const sumByProperty = (arr, prop) => {
  return arr.reduce((sum, item) => sum + (parseFloat(item[prop]?.value ?? item[prop]) || 0), 0);
};

const countByProperty = (arr, prop, value) => {
  return arr.filter(item => item[prop]?.value ?? item[prop] === value).length;
};

const getUniqueValuesByProperty = (arr, prop) => {
  const values = arr.map(item => item[prop]?.value ?? item[prop]);
  return [...new Set(values)];
};

const pluckProperty = (arr, prop) => {
  return arr.map(item => item[prop]?.value ?? item[prop]);
};

const convertIsoToGermanDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
};

const isoDate = (match) => {
  const [_, day, month, year, hours, minutes, seconds] = match;
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
