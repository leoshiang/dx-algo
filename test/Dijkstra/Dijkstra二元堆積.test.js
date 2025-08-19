import 有向加權圖 from '../../src/有向加權圖.js';
import 二元堆積 from '../../src/二元堆積.js';
import Dijkstra二元堆積 from '../../src/Dijkstra/Dijkstra二元堆積.js';
import dijkstra from '../../src/Dijkstra/Dijkstra.js';

// 測試二元堆積功能
describe('二元堆積測試', () => {
	let 堆;

	beforeEach(() => {
		堆 = new 二元堆積();
	});

	test('應該能插入元素並保持堆的結構', () => {
		堆.插入({ 頂點: 'A', 距離: 5 });
		堆.插入({ 頂點: 'B', 距離: 2 });
		堆.插入({ 頂點: 'C', 距離: 8 });

		expect(堆.移除最小值()).toEqual({ 頂點: 'B', 距離: 2 }); // 最小值應為"距離: 2"
		expect(堆.移除最小值()).toEqual({ 頂點: 'A', 距離: 5 }); // 次小值應為"距離: 5"
		expect(堆.移除最小值()).toEqual({ 頂點: 'C', 距離: 8 }); // 最後剩下的是距離 8
	});

	test('應該能正確返回並移除堆內的最小值', () => {
		堆.插入({ 頂點: 'X', 距離: 1 });
		堆.插入({ 頂點: 'Y', 距離: 3 });

		expect(堆.移除最小值()).toEqual({ 頂點: 'X', 距離: 1 }); // 最小值是 1
		expect(堆.移除最小值()).toEqual({ 頂點: 'Y', 距離: 3 });
	});

	test('當堆為空時，應該返回空值', () => {
		expect(堆.是否為空()).toBe(true); // 堆初始為空
		堆.插入({ 頂點: 'A', 距離: 5 });
		expect(堆.是否為空()).toBe(false); // 插入後不再為空
		堆.移除最小值();
		expect(堆.是否為空()).toBe(true); // 移除所有元素後再次變空
	});
});

// 測試 Dijkstra二元堆積 演算法
describe('Dijkstra二元堆積 演算法測試', () => {
	let 圖;

	beforeEach(() => {
		圖 = new 有向加權圖();
	});

	test('應該正確計算從起點到其他頂點的最短距離', () => {
		圖.新增邊('A', 'B', 4);
		圖.新增邊('A', 'C', 2);
		圖.新增邊('B', 'C', 5);
		圖.新增邊('B', 'D', 10);
		圖.新增邊('C', 'E', 3);
		圖.新增邊('E', 'D', 4);
		圖.新增邊('D', 'F', 11);

		const 結果 = Dijkstra二元堆積(圖, 'A');

		// 驗證最短距離
		expect(結果.距離).toEqual({
			A: 0,
			B: 4,
			C: 2,
			E: 5,
			D: 9,
			F: 20,
		});

		// 驗證前驅節點
		expect(結果.前驅節點).toEqual({
			A: null,
			B: 'A',
			C: 'A',
			E: 'C',
			D: 'E',
			F: 'D',
		});
	});

	test('應該在有孤立頂點時正確處理', () => {
		圖.新增邊('A', 'B', 1);
		圖.新增頂點('Z'); // 'Z' 是孤立的頂點

		const 結果 = Dijkstra二元堆積(圖, 'A');

		// 驗證最短距離：孤立頂點應保留距離 = Infinity
		expect(結果.距離).toEqual({
			A: 0,
			B: 1,
			Z: Infinity,
		});

		// 驗證前驅節點：孤立頂點應沒有前驅節點
		expect(結果.前驅節點).toEqual({
			A: null,
			B: 'A',
			Z: null,
		});
	});

	test('應該正確處理沒有邊的情況', () => {
		圖.新增頂點('A');
		圖.新增頂點('B');

		const 結果 = Dijkstra二元堆積(圖, 'A');

		// 驗證最短距離：只會到達起點，其他點為 Infinity
		expect(結果.距離).toEqual({
			A: 0,
			B: Infinity,
		});

		// 驗證前驅節點
		expect(結果.前驅節點).toEqual({
			A: null,
			B: null,
		});
	});

	test('應該正確處理環狀路徑的情況', () => {
		圖.新增邊('A', 'B', 1);
		圖.新增邊('B', 'C', 2);
		圖.新增邊('C', 'A', 3); // 環狀結構 A -> B -> C -> A

		const 結果 = Dijkstra二元堆積(圖, 'A');

		// 驗證最短距離
		expect(結果.距離).toEqual({
			A: 0,
			B: 1,
			C: 3,
		});

		// 驗證前驅節點
		expect(結果.前驅節點).toEqual({
			A: null,
			B: 'A',
			C: 'B',
		});
	});

	test('Bitcoin OTC trust weighted signed network', async () => {
		const rowParser = (line) => {
			const [SOURCE, TARGET, RATING, TIME] = line.split(',');
			return {
				source: SOURCE,
				target: TARGET,
				weight: parseFloat(TIME),
			};
		};

		await 圖.讀取CSV('./test/Dijkstra/soc-sign-bitcoinotc.csv', rowParser);

		const 結果 = dijkstra(圖, '6');

		// 驗證最遠距離是否符合計算
		expect(結果.距離[`1128`]).toBe(2630132542.0572596);

		// 驗證最後的前驅節點
		expect(結果.前驅節點[`5994`]).toBe('4205');
	});
});