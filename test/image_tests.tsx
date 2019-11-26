import React from "react";
import assert from "assert";
import { shallow } from "enzyme";
import { ThumborImage } from "../module/image";

import { configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";

configure({ adapter: new ReactSixteenAdapter() });

describe("thumbor image component", () => {
  it("should set height and width when present", () => {
    const wrapper = shallow(
      <ThumborImage src="/my-image" server="localhost" width={20} height={30} />
    );
    assert(wrapper.is("img[width=20]"));
    assert(wrapper.is("img[height=30]"));
  });

  it("should set className when present", () => {
    const wrapper = shallow(
      <ThumborImage
        src="/my-image"
        server="localhost"
        width={20}
        height={30}
        className="some_class"
      />
    );
    assert(wrapper.find("img").hasClass("some_class") == true);
  });

  it("should not set height or width when not present or 0", () => {
    const notPresent = shallow(
      <ThumborImage src="/my-image" server="localhost" />
    );
    assert(!notPresent.props().hasOwnProperty("height"));
    assert(!notPresent.props().hasOwnProperty("width"));

    const isZero = shallow(
      <ThumborImage src="/my-image" server="localhost" width={0} height={0} />
    );
    assert(!isZero.props().hasOwnProperty("height"));
    assert(!isZero.props().hasOwnProperty("width"));
  });

  it("should set height and width even when they are negative, meaning they are flipped", () => {
    const negativeNumbers = shallow(
      <ThumborImage
        src="/my-image"
        server="localhost"
        width={-20}
        height={-30}
      />
    );
    assert(negativeNumbers.is("img[width=20]"));
    assert(negativeNumbers.is("img[height=30]"));
  });
});
