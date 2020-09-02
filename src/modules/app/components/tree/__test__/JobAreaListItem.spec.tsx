import React from "react";
import { shallow } from "enzyme";
import JobAreaListItem from "../JobAreaListItem";

import { JobArea } from "../../../types";
import { employees } from "../../../../../test-data";
import { Employee } from "../../../../employees/types";

const createItem = (data: Employee[]) => ({
  areaId: "Area #1",
  name: "Area 1",
  employees: data,
});

describe("app/tree/JobAreaListItem", () => {
  it("should render properly a job area without employees", () => {
    const item: JobArea = createItem([]);
    const wrapper = shallow(<JobAreaListItem item={item} />);
    expect(wrapper).toMatchInlineSnapshot(`ShallowWrapper {}`);
  });

  it("should render properly a job area with employees", () => {
    const item: JobArea = createItem(employees);
    const wrapper = shallow(<JobAreaListItem item={item} />);
    expect(wrapper).toMatchInlineSnapshot(`ShallowWrapper {}`);
  });
});
