const scan = (num, x) => {
	let sum = 0;
	num.toString().split('').forEach(i => {
		if(i===x.toString()) sum++
	})
	return sum;
}

const getNum = (start, end, x) => {
	let rs = 0;
	for (let i = start; i<= end; i++) {
		rs += scan(i, x);
	}
	return rs;
}

const find = (start, end) => {
	const result = {};
	for (let i = 0; i <= 9; i++) {
		result[i] = getNum(start, end, i)
	}
	console.log(result)
}

find(123456,654321)
