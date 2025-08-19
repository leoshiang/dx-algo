class 抽象演算法 {
	constructor () {
		if (new.target === 抽象演算法) {
			throw new Error('抽象演算法 是抽象類別，無法直接實例化。');
		}
		this.情境 = null;
	}

	// 主執行方法
	執行 (情境參數) {
		this.情境 = 情境參數;
		this.演算法開始();
		this.初始化();
		this.情境.開始時間 = new Date();

		while (!this.結束條件成立()) {
			this.回合開始();
			this.回合();
			this.更新最佳解();
			this.回合結束();
		}

		this.情境.結束時間 = new Date();
		this.彙總();
		this.演算法結束();
		this.清理();
	}

	// 抽象方法模擬
	回合 () {
		throw new Error('回合 方法需要在派生類別中實作。');
	}

	回合結束 () {
		throw new Error('回合結束 方法需要在派生類別中實作。');
	}

	回合開始 () {
		throw new Error('回合開始 方法需要在派生類別中實作。');
	}

	更新最佳解 () {
		throw new Error('更新最佳解 方法需要在派生類別中實作。');
	}

	初始化 () {
		throw new Error('初始化 方法需要在派生類別中實作。');
	}

	清理 () {
		throw new Error('清理 方法需要在派生類別中實作。');
	}

	結束條件成立 () {
		throw new Error('結束條件成立 方法需要在派生類別中實作。');
	}

	彙總 () {
		throw new Error('彙總 方法需要在派生類別中實作。');
	}

	演算法結束 () {
		throw new Error('演算法結束 方法需要在派生類別中實作。');
	}

	演算法開始 () {
		throw new Error('演算法開始 方法需要在派生類別中實作。');
	}
}

export default 抽象演算法;