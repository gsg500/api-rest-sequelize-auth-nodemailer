module.exports = function genSerial(serial) {
	const aleatorio = Math.random() * serial;
	return aleatorio;
};