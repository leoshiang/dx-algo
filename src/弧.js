class 弧 {
	constructor () {
		this.名稱 = null;
		this.編號 = null;
		this.資料 = null;
		this.開始節點 = null;
		this.結束節點 = null;
	}

	/**
	 * 驗證節點是否有效
	 * @param {Object} 節點 - 要檢查的節點
	 * @throws {Error} 當節點無效時
	 */
	static #檢查節點有效性 (節點) {
		if (!節點) {
			throw new Error('節點為空。');
		}
		const 錯誤訊息 = [];
		if (!節點.編號) {
			錯誤訊息.push('節點的編號未設定。');
		}
		if (!節點.名稱) {
			錯誤訊息.push('節點的名稱未設定。');
		}
		if (錯誤訊息.length > 0) {
			throw new Error(錯誤訊息.join('\n'));
		}
	}

	/**
	 * 刪除關聯節點的方法
	 * @param {string} 節點類型 - "開始節點" 或 "結束節點"
	 */
	#刪除節點 (節點類型) {
		if (this[節點類型]) {
			const 操作方法 = 節點類型 === '開始節點' ? '刪除離開弧' : '刪除進入弧';
			this[節點類型][操作方法](this); // 呼叫節點的對應方法
			this[節點類型] = null; // 清除關聯節點
		}
	}

	/**
	 * 設定關聯節點的方法
	 * @param {Object} 節點 - 要設定的節點
	 * @param {string} 節點類型 - "開始節點" 或 "結束節點"
	 */
	#設定節點 (節點, 節點類型) {
		弧.#檢查節點有效性(節點);
		this.#刪除節點(節點類型); // 清除舊節點
		this[節點類型] = 節點;
		const 操作方法 = 節點類型 === '開始節點' ? '新增離開弧' : '新增進入弧';
		this[節點類型][操作方法](this); // 新增關聯
		return this; // 支援鏈式操作
	}

	刪除結束節點 () {
		this.#刪除節點('結束節點');
		return this; // 支援鏈式操作
	}

	刪除開始節點 () {
		this.#刪除節點('開始節點');
		return this; // 支援鏈式操作
	}

	設定結束節點 (節點) {
		return this.#設定節點(節點, '結束節點');
	}

	設定開始節點 (節點) {
		return this.#設定節點(節點, '開始節點');
	}
}

export default 弧;