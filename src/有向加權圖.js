import fs from 'fs';
import readline from 'readline';

/**
 * 有向加權圖類別
 */
class 有向加權圖 {
	constructor() {
		this.鄰接表 = new Map();
	}

	/**
	 * 新增一個頂點
	 */
	新增頂點(頂點) {
		if (!this.鄰接表.has(頂點)) {
			this.鄰接表.set(頂點, new Set());
		}
	}

	/**
	 * 新增一條邊
	 */
	新增邊(起點, 終點, 權重 = null) {
		this.新增頂點(起點);
		this.新增頂點(終點);

		// 使用更高效的邊表示方式
		const 邊資訊 = { 終點, 權重 };
		this.鄰接表.get(起點).add(JSON.stringify(邊資訊));
	}

	/**
	 * 刪除一條邊
	 */
	刪除邊(起點, 終點) {
		if (!this.鄰接表.has(起點)) return;

		const 邊集合 = this.鄰接表.get(起點);
		// 使用 for...of 和早期退出提高效率
		for (const 邊字串 of 邊集合) {
			const 邊資訊 = JSON.parse(邊字串);
			if (邊資訊.終點 === 終點) {
				邊集合.delete(邊字串);
				break;
			}
		}
	}

	/**
	 * 刪除頂點及其相關邊
	 */
	刪除頂點(頂點) {
		// 刪除頂點本身
		this.鄰接表.delete(頂點);

		// 刪除所有指向該頂點的邊
		for (const [起點, 邊集合] of this.鄰接表) {
			const 要刪除的邊 = [];
			for (const 邊字串 of 邊集合) {
				const 邊資訊 = JSON.parse(邊字串);
				if (邊資訊.終點 === 頂點) {
					要刪除的邊.push(邊字串);
				}
			}
			// 批量刪除避免迭代中修改
			要刪除的邊.forEach(邊 => 邊集合.delete(邊));
		}
	}

	/**
	 * 獲取鄰接清單
	 */
	獲取鄰接清單(頂點) {
		if (!this.鄰接表.has(頂點)) return [];

		return Array.from(this.鄰接表.get(頂點)).map(邊字串 => JSON.parse(邊字串));
	}

	/**
	 * 廣度優先遍歷 - 修正邏輯錯誤
	 */
	廣度優先遍歷(start) {
		if (!this.鄰接表.has(start)) {
			throw new Error(`起始頂點 ${start} 不存在於圖中`);
		}

		const visited = new Set();
		const queue = [start];
		const result = [];

		while (queue.length > 0) {
			const current = queue.shift();

			if (!visited.has(current)) {
				result.push(current);
				visited.add(current);

				// 修正鄰接節點獲取方式
				const 鄰接清單 = this.獲取鄰接清單(current);
				for (const { 終點 } of 鄰接清單) {
					if (!visited.has(終點)) {
						queue.push(終點);
					}
				}
			}
		}

		return result;
	}

	/**
	 * 深度優先遍歷 - 修正邏輯錯誤
	 */
	深度優先遍歷(start, visited = new Set()) {
		if (!this.鄰接表.has(start)) {
			throw new Error(`起始頂點 ${start} 不存在於圖中`);
		}

		if (visited.has(start)) return [];

		visited.add(start);
		const result = [start];

		const 鄰接清單 = this.獲取鄰接清單(start);
		for (const { 終點 } of 鄰接清單) {
			result.push(...this.深度優先遍歷(終點, visited));
		}

		return result;
	}

	/**
	 * 從陣列建立圖
	 */
	從陣列建立圖(邊陣列) {
		if (!Array.isArray(邊陣列)) {
			throw new TypeError('輸入必須是陣列');
		}

		for (const 邊資料 of 邊陣列) {
			if (!Array.isArray(邊資料) || 邊資料.length < 2) {
				throw new Error('邊資料格式錯誤，應為 [起點, 終點, 權重?]');
			}
			const [起點, 終點, 權重 = null] = 邊資料;
			this.新增邊(起點, 終點, 權重);
		}
		return this;
	}

	/**
	 * 從 CSV 讀取資料
	 */
	async 讀取CSV(filePath, rowParser) {
		if (typeof rowParser !== 'function') {
			throw new TypeError('rowParser 必須是一個函數');
		}

		const fileStream = fs.createReadStream(filePath);
		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity,
		});

		try {
			for await (const line of rl) {
				if (!line.trim() || line.startsWith('#')) {
					continue;
				}

				const { source, target, weight } = rowParser(line);
				this.新增邊(source, target, weight);
			}
		} catch (error) {
			throw new Error(`讀取 CSV 檔案時發生錯誤: ${error.message}`);
		}
	}

	/**
	 * 判斷頂點是否相鄰
	 */
	頂點是否相鄰(頂點A, 頂點B) {
		if (!this.鄰接表.has(頂點A)) return false;

		const 鄰接清單 = this.獲取鄰接清單(頂點A);
		return 鄰接清單.some(({ 終點 }) => 終點 === 頂點B);
	}

	/**
	 * 顯示圖結構
	 */
	顯示圖() {
		for (const [頂點, 邊集合] of this.鄰接表) {
			const 鄰接關係 = Array.from(邊集合)
								  .map(邊字串 => {
									  const { 終點, 權重 } = JSON.parse(邊字串);
									  return `${終點}(${權重 ?? 'null'})`;
								  })
								  .join(', ');
			console.log(`${頂點} -> ${鄰接關係 || '無'}`);
		}
	}

	/**
	 * 獲取頂點數量
	 */
	get 頂點數量() {
		return this.鄰接表.size;
	}

	/**
	 * 獲取邊數量
	 */
	get 邊數量() {
		let count = 0;
		for (const 邊集合 of this.鄰接表.values()) {
			count += 邊集合.size;
		}
		return count;
	}
}

export default 有向加權圖;