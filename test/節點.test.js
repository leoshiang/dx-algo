import 節點 from '../src/節點.js';

describe('節點 類別單元測試', () => {
  let 測試弧1, 測試弧2, 測試節點1, 測試節點2;

  beforeEach(() => {
    測試弧1 = { 編號: 1, 名稱: '弧1' };
    測試弧2 = { 編號: 2, 名稱: '弧2' };

    測試節點1 = { 編號: 1, 名稱: '節點1' };
    測試節點2 = { 編號: 2, 名稱: '節點2' };
  });

  // 測試 1: 新增進入弧
  test('新增進入弧 - 應成功新增新弧且不重複', () => {
    const node = new 節點();
    node.新增進入弧(測試弧1).新增進入弧(測試弧2).新增進入弧(測試弧1); // 重複新增弧1

    expect(node.進入弧).toHaveLength(2); // 確保集合中只有弧1和弧2
    expect(node.進入弧).toContain(測試弧1);
    expect(node.進入弧).toContain(測試弧2);
  });

  // 測試 2: 刪除進入弧
  test('刪除進入弧 - 應成功從集合中刪除指定弧', () => {
    const node = new 節點();
    node.新增進入弧(測試弧1).新增進入弧(測試弧2);

    node.刪除進入弧(測試弧1);

    expect(node.進入弧).toHaveLength(1); // 應只剩下弧2
    expect(node.進入弧).not.toContain(測試弧1);
    expect(node.進入弧).toContain(測試弧2);
  });

  // 測試 3: 新增離開弧
  test('新增離開弧 - 應成功新增新弧且不重複', () => {
    const node = new 節點();
    node.新增離開弧(測試弧1).新增離開弧(測試弧2).新增離開弧(測試弧1); // 重複新增弧1

    expect(node.離開弧).toHaveLength(2); // 確保集合中只有弧1和弧2
    expect(node.離開弧).toContain(測試弧1);
    expect(node.離開弧).toContain(測試弧2);
  });

  // 測試 4: 刪除離開弧
  test('刪除離開弧 - 應成功從集合中刪除指定弧', () => {
    const node = new 節點();
    node.新增離開弧(測試弧1).新增離開弧(測試弧2);

    node.刪除離開弧(測試弧1);

    expect(node.離開弧).toHaveLength(1); // 應只剩下弧2
    expect(node.離開弧).not.toContain(測試弧1);
    expect(node.離開弧).toContain(測試弧2);
  });

  // 測試 5: 新增進入節點
  test('新增進入節點 - 應成功新增新節點且不重複', () => {
    const node = new 節點();
    node.新增進入節點(測試節點1).新增進入節點(測試節點2).新增進入節點(測試節點1); // 重複新增節點1

    expect(node.進入節點).toHaveLength(2); // 確保集合中只有節點1和節點2
    expect(node.進入節點).toContain(測試節點1);
    expect(node.進入節點).toContain(測試節點2);
  });

  // 測試 6: 刪除進入節點
  test('刪除進入節點 - 應成功從集合中刪除指定節點', () => {
    const node = new 節點();
    node.新增進入節點(測試節點1).新增進入節點(測試節點2);

    node.刪除進入節點(測試節點1);

    expect(node.進入節點).toHaveLength(1); // 應只剩下節點2
    expect(node.進入節點).not.toContain(測試節點1);
    expect(node.進入節點).toContain(測試節點2);
  });

  // 測試 7: 新增離開節點
  test('新增離開節點 - 應成功新增新節點且不重複', () => {
    const node = new 節點();
    node.新增離開節點(測試節點1).新增離開節點(測試節點2).新增離開節點(測試節點1); // 重複新增節點1

    expect(node.離開節點).toHaveLength(2); // 確保集合中只有節點1和節點2
    expect(node.離開節點).toContain(測試節點1);
    expect(node.離開節點).toContain(測試節點2);
  });

  // 測試 8: 刪除離開節點
  test('刪除離開節點 - 應成功從集合中刪除指定節點', () => {
    const node = new 節點();
    node.新增離開節點(測試節點1).新增離開節點(測試節點2);

    node.刪除離開節點(測試節點1);

    expect(node.離開節點).toHaveLength(1); // 應只剩下節點2
    expect(node.離開節點).not.toContain(測試節點1);
    expect(node.離開節點).toContain(測試節點2);
  });

  // 邊界案例: 空操作
  test('當刪除不存在的項目時，應不影響集合內容', () => {
    const node = new 節點();
    node.新增進入弧(測試弧1);
    node.新增離開節點(測試節點1);

    node.刪除進入弧(測試弧2); // 弧2不存在於集合中
    node.刪除離開節點(測試節點2); // 節點2不存在於集合中

    expect(node.進入弧).toHaveLength(1); // 確保集合內容未受影響
    expect(node.進入弧).toContain(測試弧1);

    expect(node.離開節點).toHaveLength(1);
    expect(node.離開節點).toContain(測試節點1);
  });
});