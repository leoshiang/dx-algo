/**
 * 代表一條路線的類別，包含路線節點與相關操作。
 */
class 路線 {
	/**
	 * 建構函數，用於初始化路線。
	 */
	constructor () {
		/** @private @type {number[]} 路線的節點串列（內部使用，避免直接操作）。 */
		this._節點串列 = [];
		/** @type {number} 路線的長度。 */
		this.長度 = 0;
	}

	/**
	 * 獲取目前的節點列表。
	 * @returns {number[]} 回傳節點列表副本。
	 */
	get 節點列表 () {
		return [...this._節點串列];
	}

	/**
	 * 將當前路線轉為字串表示。
	 * @returns {string} 回傳路線的字串格式，如 `(長度)[節點列表]`。
	 */
	toString () {
		const nodeListStr = this._節點串列
			.map(x => x + 1) // 假設節點索引需加 1 顯示
			.join(' ');

		return `(${this.長度})[${nodeListStr || ''}]`;
	}

	/**
	 * 從路線中刪除一個指定的節點。
	 * @param {number} 節點編號 要刪除的節點編號。
	 * @returns {路線} 回傳當前路線物件（允許鏈式調用）。
	 */
	刪除 (節點編號) {
		if (typeof 節點編號 !== 'number') {
			throw new TypeError('節點編號必須是一個數字');
		}

		const index = this._節點串列.indexOf(節點編號);
		if (index !== -1) {
			this._節點串列.splice(index, 1);
		}
		return this;
	}

	/**
	 * 將一個節點加入到路線。
	 * @param {number} 節點編號 要加入的節點編號。
	 * @returns {路線} 回傳當前路線物件（允許鏈式調用）。
	 */
	加入節點 (節點編號) {
		if (typeof 節點編號 !== 'number') {
			throw new TypeError('節點編號必須是一個數字');
		}

		this._節點串列.push(節點編號);
		return this;
	}

	/**
	 * 用來源路線的資料覆蓋當前路線。
	 * @param {路線} 來源 要用於覆蓋的來源路線。
	 * @returns {路線} 回傳當前路線物件（允許鏈式調用）。
	 */
	指派 (來源) {
		if (!(來源 instanceof 路線)) {
			throw new TypeError('來源必須為路線類別的實例');
		}

		this.長度 = 來源.長度;
		this._節點串列 = [...來源._節點串列];
		return this;
	}

	/**
	 * 判斷當前路線中是否包含指定的節點對。
	 * @param {number} 節點編號1 第一個節點。
	 * @param {number} 節點編號2 第二個節點，須與第一個節點成對。
	 * @returns {boolean} 如果有成對節點，回傳 `true`；否則回傳 `false`。
	 */
	有成對的 (節點編號1, 節點編號2) {
		const index = this._節點串列.indexOf(節點編號1);
		return index !== -1 && index !== this._節點串列.length - 1 && this._節點串列[index + 1] === 節點編號2;
	}

	/**
	 * 清空路線中的所有節點。
	 * @returns {路線} 回傳當前路線物件（允許鏈式調用）。
	 */
	清除 () {
		this._節點串列.length = 0; // 更高效的清空數組方式
		this.長度 = 0; // 清除時重置長度
		return this;
	}

	/**
	 * 查找指定節點的索引編號。
	 * @param {number} 節點編號 要查詢的節點編號。
	 * @returns {number} 如果存在，回傳索引；否則回傳 `-1`。
	 */
	節點索引編號 (節點編號) {
		return this._節點串列.indexOf(節點編號);
	}

	/**
	 * 複製當前的路線物件並回傳新路線。
	 * @returns {路線} 回傳新的深複製路線。
	 */
	複製 () {
		return new 路線().指派(this);
	}
}

export default 路線;
