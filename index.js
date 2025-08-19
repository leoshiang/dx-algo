import 路線 from './src/路線.js';
import 距離矩陣 from './src/距離矩陣.js';
import 節點 from './src/節點.js';
import 有向加權圖 from './src/有向加權圖.js';
import 抽象演算法 from './src/抽象演算法.js';
import 弧 from './src/弧.js';
import 二元堆積 from './src/二元堆積.js';
import Dijkstra from './src/Dijkstra/Dijkstra.js';
import Dijkstra二元堆積 from './src/Dijkstra/Dijkstra二元堆積.js';

// 統一匯出所有模組
const DxAlgo = {
	路線,
	距離矩陣,
	節點,
	有向加權圖,
	抽象演算法,
	弧,
	二元堆積,
	Dijkstra,
	Dijkstra二元堆積
};

// 支援 CommonJS 和 ES Module 兩種匯入方式
export default DxAlgo;
export {
	路線,
	距離矩陣,
	節點,
	有向加權圖,
	抽象演算法,
	弧,
	二元堆積,
	Dijkstra,
	Dijkstra二元堆積
};