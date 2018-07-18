const log = console.log;
const pow = Math.pow;

const countNum = (start, end) => {
	let finalResult = {};
	// 处理传入参数，只传1个为统计0~N，传2个统计x~y（包含0和x）
	if (arguments.length === 1) {
		if (typeof start !== 'number') {
			log('data error.');
			return 0;
		}
		end = start;
		start = 0;
	} else {
		if (start >= end || typeof start !== 'number' || typeof end !== 'number') {
			log('data error.');
			return 0;
		}
	}

	const count = (number = end) => {
		// 需要统计的数的最高数位
		let digital = number.toString().length;
		const result = {};

		// 统计某个数位上所有出现的数字，NUM为要统计的数字
		const countOnDigital = (total = 0, currDigital = 0, NUM = 0) => {
			let count = 0;
			const N = total + 1;
			const p = pow(10, currDigital - 1);
			count = Math.floor(N / pow(10, currDigital)) * p;
			const over = N % pow(10, currDigital);
			if (over) {
				if (over >= (NUM + 1) * p) {
					count += p;
				} else if (over <= NUM * p) {
					count += 0;
				} else {
					count += over - NUM * p;
				}
			}
			// 统计0的时候要做特殊处理
			if (currDigital !== 1 && NUM === 0) {
				count -= p;
			}
			return count;
		};

		// 统计某个数字出现的总次数
		const countByNum = (total, num) => {
			let sum = 0;
			for (let i = 0; i < digital; i++) {
				sum += countOnDigital(total, i + 1, num);
			}
			return sum;
		};

		// 统计0到9
		for (let num = 0; num <= 9; num++) {
			result[num] = countByNum(number, num);
		}

		return result;
	};

	finalResult = count();
	if (start !== 0) {
		const cut = count(start - 1);
		for (let i = 0; i <= 9; i++) {
			finalResult[i] -= cut[i];
		}
	}
	log(`From ${start} to ${end}, the numbers are:`);
	log(finalResult);
};

countNum(123456, 654321);
