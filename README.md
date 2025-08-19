<div align="center">
  <h1>DX 演算法</h1>
  <p><strong>一個使用繁體中文命名的圖論演算法函式庫</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-18.0+-339933?style=flat-square&logo=nodedotjs" alt="Node.js 18.0+">
    <img src="https://img.shields.io/badge/Language-JavaScript_ES6+-F7DF1E?style=flat-square&logo=javascript" alt="JavaScript ES6+">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License">
    <img src="https://img.shields.io/badge/Platform-Cross--Platform-lightgrey?style=flat-square" alt="Cross Platform">
    <img src="https://img.shields.io/badge/Test-Jest-C21325?style=flat-square&logo=jest" alt="Jest Testing">
  </p>
</div>

## 簡介

DX 演算法是一個專為圖論演算法設計的 JavaScript 函式庫，採用直觀的繁體中文命名方式，讓開發者能夠更容易理解和使用各種經典演算法。

## 特色

- **繁體中文 API**：使用直覺的中文命名，降低學習門檻
- **圖論演算法**：包含 Dijkstra 最短路徑等經典演算法
- **模組化設計**：每個元件都可以獨立使用
- **完整測試**：提供完整的單元測試覆蓋
- **JSDoc 文件**：詳細的程式碼文件
- **串聯操作**：支援方法串聯呼叫

## 文件

[api](docs/api.md)


## 安裝

```bash
npm install dx-algo
```
## 快速開始
``` javascript
import { 路線, 節點, 弧 } from 'dx-algo';

// 建立新路線
const route = new 路線();
route.加入節點(1)
     .加入節點(2)
     .加入節點(3);

console.log(route.toString()); // (0)[2 3 4]

// 建立節點和弧
const node1 = new 節點();
node1.編號 = 1;
node1.名稱 = "起點";

const arc = new 弧();
arc.編號 = 1;
arc.設定開始節點(node1);
```
## 核心元件
### 路線 (Route)
路線管理和操作的核心類別。
### 節點 (Node)
圖論中的頂點，支援進入和離開的節點與弧管理。
### 弧 (Arc)
圖論中的邊，連接兩個節點並管理關聯關係。
### 距離矩陣 (Distance Matrix)
處理節點間距離計算的矩陣類別。
詳細的 API 說明請參考 [API.md](API.md)。
## 開發
### 環境需求
- Node.js 18+
- npm 或 yarn

## 專案結構
``` 
dx-algo/
├── src/                    # 原始碼目錄
│   ├── 路線.js            # 路線類別
│   ├── 節點.js            # 節點類別
│   ├── 弧.js              # 弧類別
│   ├── 距離矩陣.js        # 距離矩陣
│   ├── 有向加權圖.js      # 有向加權圖
│   ├── 二元堆積.js        # 二元堆資料結構
│   ├── 抽象演算法.js      # 演算法基底類別
│   └── Dijkstra/          # Dijkstra 演算法
├── test/                   # 測試檔案
├── lib/                    # 建置輸出
├── docs/                   # 文件
├── API.md                  # API 文件
└── package.json
```
## 測試
本專案使用 Jest 進行單元測試：
``` bash
npm test
```

## 授權
此專案採用 MIT 授權條款。
