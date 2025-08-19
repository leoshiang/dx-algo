import 有向加權圖 from '../../src/有向加權圖.js';
import dijkstra from '../../src/Dijkstra/Dijkstra.js';

describe('Dijkstra 演算法測試', () => {
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

		const 結果 = dijkstra(圖, 'A');

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

		const 結果 = dijkstra(圖, 'A');

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

		const 結果 = dijkstra(圖, 'A');

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

		const 結果 = dijkstra(圖, 'A');

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

	test('應該正確處理環狀路徑的情況', () => {
		const edgesArray = [
			[0, 1, 2],
			[0, 3, 3],
			[0, 6, 4],
			[1, 2, 3],
			[1, 4, 2],
			[3, 4, 5],
			[4, 5, 7],
			[4, 6, 6]
		];

		圖.從陣列建立圖(edgesArray);

		const 結果 = dijkstra(圖, 0);

		// 驗證最短距離
		expect(結果.距離).toEqual({
			'0': 0,
			'1': 2,
			'2': 5,
			'3': 3,
			'4': 4,
			'5': 11,
			'6': 4,
		});

		// 驗證前驅節點
		expect(結果.前驅節點).toEqual({
			'0': null,
			'1': 0,
			'2': 1,
			'3': 0,
			'4': 1,
			'5': 4,
			'6': 0,
		});
	});

	test('應該正確處理較大的圖', () => {
		// 模擬較大的圖
		for (let i = 0; i < 1000; i++) {
			圖.新增邊(`頂點${i}`, `頂點${i + 1}`, i + 1);
		}

		const 結果 = dijkstra(圖, '頂點0');

		// 驗證最遠距離是否符合計算
		expect(結果.距離[`頂點999`]).toBe(500500); // 1 + 2 + ... + 1000 = 500500

		// 驗證最後的前驅節點
		expect(結果.前驅節點[`頂點999`]).toBe('頂點998');
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