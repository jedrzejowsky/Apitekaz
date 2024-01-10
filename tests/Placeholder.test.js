import { shallow } from "enzyme";
import Placeholder from "../src/components/guideUI/Placeholder";

describe("Placeholder Component", () => {
  it("renders Placeholder component without crashing", () => {
    shallow(<Placeholder />);
  });

  it("checks initial state of dialogOpen", () => {
    const wrapper = shallow(<Placeholder />);
    expect(wrapper.state().dialogOpen).toEqual(false);
  });

  it("checks handleShare function", () => {
    const wrapper = shallow(<Placeholder />);
    wrapper.find('Button[children="Share"]').simulate("click");
    expect(wrapper.state().dialogOpen).toEqual(true);
  });
});
