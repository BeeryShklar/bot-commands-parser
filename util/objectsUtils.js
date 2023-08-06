export const getCommonIdentifier = (
	o,
	parallelContainers,
	referenceContainer
) => {
	let identifier = null
	if (referenceContainer instanceof Array) {
		let idx = -1
		for (let [_, container] of Object.entries(parallelContainers)) {
			if (!(container instanceof Array)) continue
			const i = container.indexOf(o)
			if (i > idx) idx = i
		}
		identifier = referenceContainer[idx]
	} else if (referenceContainer instanceof Object) {
		// return key of translation
		// find key of translations, which is the identifier for the specific option
		for (let [_, container] of Object.entries(parallelContainers)) {
			const k = Object.keys(container).find(key => container[key] === o)
			if (k) return k
		}
	} else identifier = referenceContainer // o is a primitive, return the reference

	return identifier
}

export const flattenFull = array =>
	array
		.flatMap((x, y, z) => {
			if (x instanceof Object) return Object.values(x) // flatten objects
			return x
		})
		.flat()

export const getContainerKey = (object, possibleContainers) => {
	for (let [key, container] of Object.entries(possibleContainers)) {
		let i = -1
		if (container instanceof Array || typeof container === 'string')
			i = container.indexOf(object)
		else if (container instanceof Object)
			for (let [_, o] of Object.entries(container)) {
				if (o === object) return key
			}
		if (i !== undefined && i !== -1) return key
	}
}

export const recursiveMap = (obj, callback) => {
	if (obj instanceof Array) return obj.map(o => recursiveMap(o))
	else if (typeof obj === 'object')
		Object.entries(obj).forEach(([key, val]) => {
			if (typeof val === 'object') {
				obj[key] = recursiveMap(val, callback)
			} else {
				obj[key] = callback(val)
			}
		})
	else return callback(obj)
	return obj
}

export const everythingMap = (obj, callback) => {
	if (obj instanceof Array) return obj.map(o => callback(o))
	else if (typeof obj === 'object')
		Object.entries(obj).forEach(([key, val]) => {
			if (typeof val === 'object') {
				obj[key] = callback(val, callback)
			} else {
				obj[key] = callback(val)
			}
		})
	else return callback(obj)
	return obj
}

/**
 *
 * @param {any} value value to search for in object
 * @param {Object | Array} object object to search in
 * @returns {string | number} identifier of value in object
 */
export const getIdentifierInObject = (value, object) => {
	if (object instanceof Array || typeof object === 'string')
		return object.indexOf(value)
	else if (object instanceof Object)
		return Object.entries(object)
			.filter(([key, val]) => val === value)
			.map(([k, _]) => k)[0]
	return null
}
