/**
 * 最小堆：用於優先佇列
 */
class 二元堆積 {
	constructor () {
		this.堆積 = [];
	}

	/**
	 * 向上整理堆結構
	 * @param {number} 索引
	 * @private
	 */
	_向上整理 (索引) {
		while (索引 > 0) {
			const 父索引 = Math.floor((索引 - 1) / 2);
			if (this.堆積[索引].距離 >= this.堆積[父索引].距離) {
				break;
			}
			[this.堆積[索引], this.堆積[父索引]] = [this.堆積[父索引], this.堆積[索引]];
			索引 = 父索引;
		}
	}

	/**
	 * 向下整理堆結構
	 * @param {number} 索引
	 * @private
	 */
	_向下整理 (索引) {
		const 長度 = this.堆積.length;
		while (true) {
			let 最小索引 = 索引;
			const 左子索引 = 2 * 索引 + 1;
			const 右子索引 = 2 * 索引 + 2;

			if (左子索引 < 長度 && this.堆積[左子索引].距離 < this.堆積[最小索引].距離) {
				最小索引 = 左子索引;
			}
			if (右子索引 < 長度 && this.堆積[右子索引].距離 < this.堆積[最小索引].距離) {
				最小索引 = 右子索引;
			}
			if (最小索引 === 索引) {
				break;
			}

			[this.堆積[索引], this.堆積[最小索引]] = [this.堆積[最小索引], this.堆積[索引]];
			索引 = 最小索引;
		}
	}

	/**
	 * 向堆內新增元素
	 * @param {Object} 元素 每個元素包含 { 頂點, 距離 }
	 */
	插入 (元素) {
		this.堆積.push(元素);
		this._向上整理(this.堆積.length - 1);
	}

	/**
	 * 堆是否為空
	 * @returns {boolean}
	 */
	是否為空 () {
		return this.堆積.length === 0;
	}

	/**
	 * 移除並返回堆頂元素（最小值）
	 * @returns {Object} 堆頂元素
	 */
	移除最小值 () {
		if (this.堆積.length === 1) {
			return this.堆積.pop();
		}
		const 最小值 = this.堆積[0];
		this.堆積[0] = this.堆積.pop();
		this._向下整理(0);
		return 最小值;
	}
}

export default 二元堆積;