import 有向加權圖 from '../src/有向加權圖.js';

describe('有向加權圖 類別測試', () => {
	let 圖;

	// 每次測試前初始化一個新的圖
	beforeEach(() => {
		圖 = new 有向加權圖();
	});

	test('應該能新增一個頂點', () => {
		圖.新增頂點('A');
		const 鄰接清單 = 圖.獲取鄰接清單('A');
		expect(鄰接清單).toEqual([]); // 新增的頂點應該沒有鄰接邊
	});

	test('應該能新增一條邊', () => {
		圖.新增邊('A', 'B', 5);
		const 鄰接清單 = 圖.獲取鄰接清單('A');
		expect(鄰接清單).toEqual([{ 終點: 'B', 權重: 5 }]); // 新邊應加入到起點的鄰接清單中
	});

	test('如果頂點不存在，新增邊時應自動建立頂點', () => {
		圖.新增邊('X', 'Y', 3);
		expect(圖.獲取鄰接清單('X')).toEqual([{ 終點: 'Y', 權重: 3 }]); // 自動建立的起點
		expect(圖.獲取鄰接清單('Y')).toEqual([]); // 自動建立的終點
	});

	test('應該能刪除一個頂點與其相關的所有邊', () => {
		圖.新增邊('A', 'B', 5);
		圖.新增邊('B', 'C', 3);
		圖.刪除頂點('B');
		expect(圖.獲取鄰接清單('B')).toEqual([]); // 頂點B應被刪除
		expect(圖.獲取鄰接清單('A')).toEqual([]); // A到B的邊應被刪除
		expect(圖.獲取鄰接清單('C')).toEqual([]); // C不受影響
	});

	test('應該能刪除一條邊，不刪除頂點', () => {
		圖.新增邊('A', 'B', 5);
		圖.新增邊('A', 'C', 2);
		圖.刪除邊('A', 'B');
		expect(圖.獲取鄰接清單('A')).toEqual([{ 終點: 'C', 權重: 2 }]); // A到B的邊應被刪除
		expect(圖.獲取鄰接清單('B')).toEqual([]); // 頂點B仍然存在
	});

	test('應該能正確查詢某頂點的鄰接清單', () => {
		圖.新增邊('A', 'B', 5);
		圖.新增邊('A', 'C', 2);
		expect(圖.獲取鄰接清單('A')).toEqual([
			{ 終點: 'B', 權重: 5 },
			{ 終點: 'C', 權重: 2 },
		]);
	});

	test('如果頂點不存在，獲取鄰接清單應返回空陣列', () => {
		expect(圖.獲取鄰接清單('未知頂點')).toEqual([]);
	});

	test('應該能正確判斷兩個頂點是否相鄰', () => {
		圖.新增邊('A', 'B', 5);
		expect(圖.頂點是否相鄰('A', 'B')).toBe(true); // A到B相鄰
		expect(圖.頂點是否相鄰('B', 'A')).toBe(false); // B到A不相鄰
		expect(圖.頂點是否相鄰('A', 'C')).toBe(false); // A到C不相鄰
	});

	test('應該能正確顯示圖的結構', () => {
		console.log = jest.fn(); // Mock console.log
		圖.新增邊('A', 'B', 5);
		圖.新增邊('A', 'C', 2);
		圖.顯示圖();
		expect(console.log).toHaveBeenCalledWith('A -> B(5), C(2)');
		expect(console.log).toHaveBeenCalledWith('B -> ');
		expect(console.log).toHaveBeenCalledWith('C -> ');
	});
});