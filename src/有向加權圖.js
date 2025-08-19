import fs from 'fs';
import readline from 'readline';

/**
 * 有向加權圖類別
 */
class 有向加權圖 {
	/**
	 * 初始化圖。
	 */
	constructor () {
		this.鄰接表 = new Map(); // 圖的鄰接表，使用 Map 儲存
	}

	/**
	 * 刪除一條邊。
	 * @param {string|number} 起點 起始頂點名稱。
	 * @param {string|number} 終點 終止頂點名稱。
	 */
	刪除邊 (起點, 終點) {
		if (this.鄰接表.has(起點)) {
			const 邊集合 = this.鄰接表.get(起點);
			for (const 邊 of 邊集合) {
				const { 終點: 邊終點 } = JSON.parse(邊);
				if (邊終點 === 終點) {
					邊集合.delete(邊);
					break;
				}
			}
		}
	}

	/**
	 * 刪除一個頂點及其相關的所有邊。
	 * @param {string|number} 頂點 頂點名稱。
	 */
	刪除頂點 (頂點) {
		if (this.鄰接表.has(頂點)) {
			this.鄰接表.delete(頂點); // 刪除頂點本身
		}
		// 在鄰接表中刪除所有到該頂點的邊
		for (const [起點, 邊集合] of this.鄰接表) {
			for (const 邊 of 邊集合) {
				const { 終點 } = JSON.parse(邊);
				if (終點 === 頂點) {
					邊集合.delete(邊);
				}
			}
		}
	}

	// 廣度優先搜尋遍歷所有節點
	廣度優先遍歷 (start) {
		const visited = new Set(); // 記錄已訪問過的節點
		const queue = [start]; // 初始化佇列，將起點加入
		const result = []; // 儲存遍歷結果

		while (queue.length > 0) {
			const current = queue.shift();

			if (!visited.has(current)) {
				result.push(current); // 紀錄遍歷順序
				visited.add(current); // 標記已訪問

				// 將當前節點的所有相鄰節點加入佇列
				for (const neighbor of this.鄰接表.get(current)) {
					if (!visited.has(neighbor.target)) {
						queue.push(neighbor.target);
					}
				}
			}
		}

		return result;
	}

	從陣列建立圖 (邊陣列) {
		for (const [起點, 終點, 權重] of 邊陣列) {
			this.新增邊(起點, 終點, 權重);
		}
		return this;
	}

	/**
	 * 新增一條邊。
	 * @param {string|number} 起點 起始頂點名稱。
	 * @param {string|number} 終點 終止頂點名稱。
	 * @param {number|null} 權重 此邊的權重值。
	 */
	新增邊 (起點, 終點, 權重 = null) {
		// 確保起點和終點存在於圖中
		if (!this.鄰接表.has(起點)) {
			this.新增頂點(起點);
		}
		if (!this.鄰接表.has(終點)) {
			this.新增頂點(終點);
		}
		// 在起點的鄰接表新增一條邊（使用 Set）
		this.鄰接表.get(起點).add(JSON.stringify({ 終點, 權重 }));
	}

	/**
	 * 新增一個頂點。
	 * @param {string|number} 頂點 頂點名稱（或編號）。
	 */
	新增頂點 (頂點) {
		if (!this.鄰接表.has(頂點)) {
			this.鄰接表.set(頂點, new Set()); // 初始化使用 Set 儲存鄰接邊
		}
	}

	// 深度優先搜尋遍歷所有節點 (遞迴版)
	深度優先遍歷 (start, visited = new Set()) {
		if (visited.has(start)) {
			return [];
		} // 如果已訪問過該節點，直接跳過
		visited.add(start); // 標記已訪問
		const result = [start];

		for (const neighbor of this.鄰接表.get(start) || []) {
			result.push(...this.深度優先遍歷(neighbor.target, visited)); // 遞迴呼叫
		}

		return result;
	}

	/**
	 * 獲取一個頂點的鄰接清單。
	 * @param {string|number} 頂點 頂點名稱。
	 * @returns {Array<{終點: string|number, 權重: number}>} 鄰接頂點列表。
	 */
	獲取鄰接清單 (頂點) {
		if (this.鄰接表.has(頂點)) {
			return [...this.鄰接表.get(頂點)].map((邊) => JSON.parse(邊));
		}
		return [];
	}

	// 從 CSV 文件讀取數據並新增邊
	async 讀取CSV (filePath, rowParser) {
		const fileStream = fs.createReadStream(filePath);

		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity,
		});

		for await (const line of rl) {
			// 跳過空行或註解行（如果必要）
			if (!line.trim() || line.startsWith('#')) {
				continue;
			}

			// 呼叫者解析每一行數據
			const { source, target, weight } = rowParser(line);

			// 新增邊
			this.新增邊(source, target, weight);
		}
	}

	/**
	 * 判斷兩個頂點是否相鄰。
	 * @param {string|number} 頂點A 第一個頂點。
	 * @param {string|number} 頂點B 第二個頂點。
	 * @returns {boolean} 如果兩個頂點相鄰則返回 true，否則返回 false。
	 */
	頂點是否相鄰 (頂點A, 頂點B) {
		if (this.鄰接表.has(頂點A)) {
			for (const 邊 of this.鄰接表.get(頂點A)) {
				const { 終點 } = JSON.parse(邊);
				if (終點 === 頂點B) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 印出圖的鄰接表結構。
	 */
	顯示圖 () {
		for (const [頂點, 邊集合] of this.鄰接表) {
			const 鄰接關係 = [...邊集合]
				.map((邊) => {
					const { 終點, 權重 } = JSON.parse(邊);
					return `${終點}(${權重})`;
				})
				.join(', ');
			console.log(`${頂點} -> ${鄰接關係}`);
		}
	}

}

export default 有向加權圖;