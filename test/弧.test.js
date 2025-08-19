import 弧 from '../src/弧.js';

describe('弧 類別單元測試', () => {
  let 節點A, 節點B;

  beforeEach(() => {
    節點A = {
      編號: 1,
      名稱: '節點A',
      新增進入弧: jest.fn(),
      刪除進入弧: jest.fn(),
      新增離開弧: jest.fn(),
      刪除離開弧: jest.fn(),
    };

    節點B = {
      編號: 2,
      名稱: '節點B',
      新增進入弧: jest.fn(),
      刪除進入弧: jest.fn(),
      新增離開弧: jest.fn(),
      刪除離開弧: jest.fn(),
    };
  });

  // 測試 1: 验證初始屬性值是否為空
  test('初始屬性值應為空', () => {
    const arc = new 弧();
    expect(arc.名稱).toBeNull();
    expect(arc.編號).toBeNull();
    expect(arc.資料).toBeNull();
    expect(arc.開始節點).toBeNull();
    expect(arc.結束節點).toBeNull();
  });

  // 測試 2: 檢查設定開始節點
  test('設定開始節點應更新正確節點，並呼叫 新增離開弧 方法', () => {
    const arc = new 弧();
    arc.設定開始節點(節點A);

    expect(arc.開始節點).toEqual(節點A);
    expect(節點A.新增離開弧).toHaveBeenCalledWith(arc);
  });

  // 測試 3: 當開始節點已設定，再次設定應刪除舊節點的離開弧
  test('重新設定開始節點應刪除舊開始節點的離開弧', () => {
    const arc = new 弧();
    arc.設定開始節點(節點A); // 設定節點A作為開始節點
    arc.設定開始節點(節點B); // 改為節點B作為開始節點

    expect(arc.開始節點).toEqual(節點B);
    expect(節點A.刪除離開弧).toHaveBeenCalledWith(arc); // 確認刪除舊開始節點的離開弧
    expect(節點B.新增離開弧).toHaveBeenCalledWith(arc);
  });

  // 測試 4: 檢查設定結束節點
  test('設定結束節點應更新正確節點，並呼叫 新增進入弧 方法', () => {
    const arc = new 弧();
    arc.設定結束節點(節點A);

    expect(arc.結束節點).toEqual(節點A);
    expect(節點A.新增進入弧).toHaveBeenCalledWith(arc);
  });

  // 測試 5: 當結束節點已設定，再次設定應刪除舊節點的進入弧
  test('重新設定結束節點應刪除舊結束節點的進入弧', () => {
    const arc = new 弧();
    arc.設定結束節點(節點A); // 設定節點A作為結束節點
    arc.設定結束節點(節點B); // 改為節點B作為結束節點

    expect(arc.結束節點).toEqual(節點B);
    expect(節點A.刪除進入弧).toHaveBeenCalledWith(arc); // 確認刪除舊結束節點的進入弧
    expect(節點B.新增進入弧).toHaveBeenCalledWith(arc);
  });

  // 測試 6: 刪除已設定的開始節點
  test('刪除開始節點應刪除節點的離開弧並清空開始節點', () => {
    const arc = new 弧();
    arc.設定開始節點(節點A);

    arc.刪除開始節點();

    expect(arc.開始節點).toBeNull();
    expect(節點A.刪除離開弧).toHaveBeenCalledWith(arc); // 檢查是否調用刪除方法
  });

  // 測試 7: 刪除已設定的結束節點
  test('刪除結束節點應刪除節點的進入弧並清空結束節點', () => {
    const arc = new 弧();
    arc.設定結束節點(節點A);

    arc.刪除結束節點();

    expect(arc.結束節點).toBeNull();
    expect(節點A.刪除進入弧).toHaveBeenCalledWith(arc); // 檢查是否調用刪除方法
  });

  // 測試 8: 當設定無效節點時應拋出錯誤
  test('設定無效的開始節點應拋出錯誤', () => {
    const arc = new 弧();

    expect(() => {
      arc.設定開始節點({}); // 傳入無效節點
    }).toThrowError(/編號未設定/); // 驗證拋出對應錯誤訊息
  });

  // 測試 9: 當設定空節點時應拋出錯誤
  test('設定空的結束節點應拋出錯誤', () => {
    const arc = new 弧();

    expect(() => {
      arc.設定結束節點(null); // 傳入空節點
    }).toThrowError(/節點為空/); // 驗證拋出對應錯誤訊息
  });
});