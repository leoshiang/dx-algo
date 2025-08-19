import { 矩陣 } from 'dx-core';

class 距離矩陣 extends 矩陣 {

	// 計算路線長度
	static 計算路線長度 (節點序列) {
		if (節點序列 instanceof 路線) {
			throw new TypeError('節點序列必須為路線');
		}
		if (節點序列.length < 2) {
			return 0; // 當節點數量少於 2 時，不計算長度
		}

		let result = 0.0;
		for (let i = 0; i < 節點序列.length - 1; i++) {
			const fromNode = 節點序列[i];
			const toNode = 節點序列[i + 1];
			const value = this[fromNode][toNode];
			if (typeof value !== 'number') {
				throw new Error('距離矩陣的資料不完整或格式不正確');
			}
			result += value;
		}
		return result;
	}

	// // 貪心法計算最短距離
	// static 貪心法計算最短距離 (matrix, startIndex) {
	// 	if (!(matrix instanceof 矩陣)) {
	// 		throw new TypeError('輸入必須為 矩陣 類型');
	// 	}
	// 	if (typeof startIndex !== 'number') {
	// 		throw new TypeError('起始索引必須是一個數字');
	// 	}
	// 	if (matrix.行數 === 0 || startIndex < 0 || startIndex >= matrix.行數) {
	// 		throw new RangeError('起始索引超出矩陣有效範圍');
	// 	}
	//
	// 	const 路線 = [];
	// 	const 排除的節點 = new Array(matrix.行數).fill(false);
	// 	let 距離 = 0.0;
	// 	let 起點 = startIndex;
	//
	// 	路線.push(起點);
	//
	// 	for (let i = 1; i < matrix.行數; i++) {
	// 		const row = matrix.取得橫列(起點); // 使用 矩陣 提供的取得橫列方法
	// 		const [最小索引, _] = 距離矩陣.最小值排除(row, 排除的節點);
	// 		if (最小索引 === -1) {
	// 			throw new Error('無法找到下一個節點，可能矩陣中有無效資料');
	// 		}
	//
	// 		路線.push(最小索引);
	// 		距離 += matrix.取得元素(起點, 最小索引);
	// 		排除的節點[起點] = true;
	// 		起點 = 最小索引;
	// 	}
	//
	// 	return { 距離, 路線 };
	// }
	//
	// // 找到排除某些節點後的最小值
	// static 最小值排除 (row, 排除的節點) {
	// 	if (!Array.isArray(row) || !Array.isArray(排除的節點)) {
	// 		throw new TypeError('輸入必須為陣列');
	// 	}
	//
	// 	let minIndex = -1;
	// 	let minValue = Infinity;
	//
	// 	for (let i = 0; i < row.length; i++) {
	// 		if (!排除的節點[i] && row[i] < minValue) {
	// 			minValue = row[i];
	// 			minIndex = i;
	// 		}
	// 	}
	//
	// 	return [minIndex, minValue];
	// }
}

export default 距離矩陣;