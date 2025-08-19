import { 矩陣 } from 'dx-core';
import 路線 from './路線.js';

class 距離矩陣 extends 矩陣 {
	// 計算路線長度
	static 計算路線長度(節點序列) {
		// 修正錯誤的類型檢查邏輯
		if (!(節點序列 instanceof 路線)) {
			throw new TypeError('節點序列必須為路線');
		}

		const 節點列表 = 節點序列.節點列表;
		if (節點列表.length < 2) {
			return 0;
		}

		let result = 0.0;
		for (let i = 0; i < 節點列表.length - 1; i++) {
			const fromNode = 節點列表[i];
			const toNode = 節點列表[i + 1];

			// 確保矩陣實例方法的正確調用
			const value = this.取得元素(fromNode, toNode);
			if (typeof value !== 'number' || !isFinite(value)) {
				throw new Error(`距離矩陣在位置 (${fromNode}, ${toNode}) 的資料不完整或格式不正確`);
			}
			result += value;
		}
		return result;
	}
}

export default 距離矩陣;