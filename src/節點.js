class 節點 {
	constructor () {
		this.名稱 = null;
		this.編號 = null;
		this.資料 = null;
		this.進入節點 = [];
		this.離開節點 = [];
		this.進入弧 = [];
		this.離開弧 = [];
	}

	/**
	 * 私有通用刪除方法
	 * @param {Array} 集合 - 要操作的集合
	 * @param {Object} 項目 - 要刪除的項目
	 * @returns {Array} 更新後的集合
	 */
	static #刪除項目 (集合, 項目) {
		return 集合.filter(x => x.編號 !== 項目.編號);
	}

	/**
	 * 私有通用新增方法
	 * @param {Array} 集合 - 要操作的集合
	 * @param {Object} 項目 - 要新增的項目
	 * @returns {Array} 更新後的集合
	 */
	static #新增項目 (集合, 項目) {
		if (!節點.#檢查是否存在(集合, 項目)) {
			集合.push(項目);
		}
		return 集合;
	}

	/**
	 * 私有通用檢查方法
	 * @param {Array} 集合 - 需要檢查的集合
	 * @param {Object} 項目 - 要檢查的項目
	 * @returns {boolean} 是否已存在
	 */
	static #檢查是否存在 (集合, 項目) {
		return 集合.some(x => x.編號 === 項目.編號);
	}

	刪除進入弧 (刪除弧) {
		this.進入弧 = 節點.#刪除項目(this.進入弧, 刪除弧);
		return this;
	}

	刪除進入節點 (刪除節點) {
		this.進入節點 = 節點.#刪除項目(this.進入節點, 刪除節點);
		return this;
	}

	刪除離開弧 (刪除弧) {
		this.離開弧 = 節點.#刪除項目(this.離開弧, 刪除弧);
		return this;
	}

	刪除離開節點 (刪除節點) {
		this.離開節點 = 節點.#刪除項目(this.離開節點, 刪除節點);
		return this;
	}

	新增進入弧 (新弧) {
		this.進入弧 = 節點.#新增項目(this.進入弧, 新弧);
		return this;
	}

	新增進入節點 (新節點) {
		this.進入節點 = 節點.#新增項目(this.進入節點, 新節點);
		return this;
	}

	新增離開弧 (新弧) {
		this.離開弧 = 節點.#新增項目(this.離開弧, 新弧);
		return this;
	}

	新增離開節點 (新節點) {
		this.離開節點 = 節點.#新增項目(this.離開節點, 新節點);
		return this;
	}
}

export default 節點;