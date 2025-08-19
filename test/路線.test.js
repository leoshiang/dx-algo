import 路線 from '../src/路線.js';

describe('路線 類別測試', () => {
	let route;

	// 初始化測試實例
	beforeEach(() => {
		route = new 路線();
	});

	describe('建構函數與屬性', () => {
		it('建構路線實例時，節點串列應為空，並且長度為0', () => {
			expect(route.節點列表).toEqual([]);
			expect(route.長度).toBe(0);
		});
	});

	describe('getter 節點列表', () => {
		it('節點列表應回傳節點串列的副本', () => {
			route.加入節點(1).加入節點(2);
			const nodes = route.節點列表;
			expect(nodes).toEqual([1, 2]);

			// 確保返回的是副本，修改副本不影響原始資料
			nodes.push(3);
			expect(route.節點列表).toEqual([1, 2]);
		});
	});

	describe('toString 方法', () => {
		it('當節點串列為空時，應回傳 (0)[]', () => {
			expect(route.toString()).toBe('(0)[]');
		});

		it('當有節點時，應回傳正確格式的字串', () => {
			route.長度 = 10;
			route.加入節點(0).加入節點(1).加入節點(2);
			expect(route.toString()).toBe('(10)[1 2 3]');
		});
	});

	describe('刪除 方法', () => {
		it('應能正確刪除存在的節點', () => {
			route.加入節點(1).加入節點(2).加入節點(3);
			route.刪除(2);
			expect(route.節點列表).toEqual([1, 3]);
		});

		it('當刪除不存在的節點時，節點串列應保持不變', () => {
			route.加入節點(1).加入節點(2);
			route.刪除(3);
			expect(route.節點列表).toEqual([1, 2]);
		});

		it('當輸入非數字時，應拋出錯誤', () => {
			expect(() => route.刪除('not a number')).toThrowError('節點編號必須是一個數字');
		});
	});

	describe('加入節點 方法', () => {
		it('應正確加入新的節點至節點串列末尾', () => {
			route.加入節點(1).加入節點(2);
			expect(route.節點列表).toEqual([1, 2]);
		});

		it('當輸入非數字時，應拋出錯誤', () => {
			expect(() => route.加入節點('not a number')).toThrowError('節點編號必須是一個數字');
		});
	});

	describe('指派 方法', () => {
		it('應能正確指派來源路線的值至當前路線', () => {
			const newRoute = new 路線();
			newRoute.長度 = 5;
			newRoute.加入節點(1).加入節點(2);

			route.指派(newRoute);
			expect(route.長度).toBe(5);
			expect(route.節點列表).toEqual([1, 2]);
		});

		it('當輸入不是路線實例時，應拋出錯誤', () => {
			expect(() => route.指派({})).toThrowError('來源必須為路線類別的實例');
		});
	});

	describe('有成對的 方法', () => {
		it('當節點對存在時，應回傳 true', () => {
			route.加入節點(1).加入節點(2).加入節點(3);
			expect(route.有成對的(1, 2)).toBe(true);
		});

		it('當節點對不存在時，應回傳 false', () => {
			route.加入節點(1).加入節點(3);
			expect(route.有成對的(1, 2)).toBe(false);
		});

		it('當節點對中第一個節點在末尾時，應回傳 false', () => {
			route.加入節點(1).加入節點(2);
			expect(route.有成對的(2, 3)).toBe(false);
		});
	});

	describe('清除 方法', () => {
		it('應能清除路線中的所有節點，且長度重置為 0', () => {
			route.加入節點(1).加入節點(2).長度 = 8;
			route.清除();
			expect(route.節點列表).toEqual([]);
			expect(route.長度).toBe(0);
		});
	});

	describe('節點索引編號 方法', () => {
		it('當節點存在時，應回傳該節點的索引', () => {
			route.加入節點(1).加入節點(2).加入節點(3);
			expect(route.節點索引編號(2)).toBe(1);
		});

		it('當節點不存在時，應回傳 -1', () => {
			route.加入節點(1).加入節點(3);
			expect(route.節點索引編號(2)).toBe(-1);
		});
	});

	describe('複製 方法', () => {
		it('應返回一個新路線實例，且內容與當前路線相同', () => {
			route.加入節點(1).加入節點(2).長度 = 5;

			const copiedRoute = route.複製();
			expect(copiedRoute).not.toBe(route); // 應為不同實例
			expect(copiedRoute.節點列表).toEqual(route.節點列表);
			expect(copiedRoute.長度).toBe(route.長度);
		});
	});
});
