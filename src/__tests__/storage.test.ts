import Manager, { COMP_TYPE, Data } from "../model/Manager";

const manager = new Manager();

describe("데이터 처리 테스트", () => {
  test("데이터 생성 테스트", () => {
    const data = new Data();
    data.comp_name = "(주)테스트";
    data.comp_purpose = "";
    data.comp_size = 10;
    data.comp_type = COMP_TYPE.SOL;
    manager.support.insert(data);
    expect(manager.support.findOne(1)).toStrictEqual(data);
  });
});
