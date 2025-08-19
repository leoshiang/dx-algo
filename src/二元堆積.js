/**
 * 最小堆：用於優先佇列
 */
class 二元堆積 {
	constructor() {
		this.堆積 = [];
	}

	/**
	 * 向上整理堆結構
	 */
	_向上整理(索引) {
		while (索引 > 0) {
			const 父索引 = Math.floor((索引 - 1) / 2);
			if (this.堆積[索引].距離 >= this.堆積[父索引].距離) {
				break;
			}
			this._交換(索引, 父索引);
			索引 = 父索引;
		}
	}

	/**
	 * 向下整理堆結構
	 */
	_向下整理(索引) {
		const 長度 = this.堆積.length;
		while (true) {
			let 最小索引 = 索引;
			const 左子索引 = 2 * 索引 + 1;
			const 右子索引 = 2 * 索引 + 2;

			if (左子索引 < 長度 &&
				this.堆積[左子索引].距離 < this.堆積[最小索引].距離) {
				最小索引 = 左子索引;
			}
			if (右子索引 < 長度 &&
				this.堆積[右子索引].距離 < this.堆積[最小索引].距離) {
				最小索引 = 右子索引;
			}
			if (最小索引 === 索引) {
				break;
			}

			this._交換(索引, 最小索引);
			索引 = 最小索引;
		}
	}

	/**
	 * 交換兩個元素
	 */
	_交換(i, j) {
		[this.堆積[i], this.堆積[j]] = [this.堆積[j], this.堆積[i]];
	}

	/**
	 * 插入元素
	 */
	插入(元素) {
		if (!元素 || typeof 元素.距離 !== 'number') {
			throw new TypeError('元素必須包含有效的距離屬性');
		}
		this.堆積.push(元素);
		this._向上整理(this.堆積.length - 1);
	}

	/**
	 * 檢查是否為空
	 */
	是否為空() {
		return this.堆積.length === 0;
	}

	/**
	 * 移除最小值
	 */
	移除最小值() {
		if (this.是否為空()) {
			throw new Error('堆積為空，無法移除元素');
		}

		if (this.堆積.length === 1) {
			return this.堆積.pop();
		}

		const 最小值 = this.堆積[0];
		this.堆積[0] = this.堆積.pop();
		this._向下整理(0);
		return 最小值;
	}

	/**
	 * 查看最小值但不移除
	 */
	查看最小值() {
		if (this.是否為空()) {
			throw new Error('堆積為空');
		}
		return this.堆積[0];
	}

	/**
	 * 獲取堆積大小
	 */
	get 大小() {
		return this.堆積.length;
	}

	/**
	 * 清空堆積
	 */
	清空() {
		this.堆積.length = 0;
	}
}

export default 二元堆積;