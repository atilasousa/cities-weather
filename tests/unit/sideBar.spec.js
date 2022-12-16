import {mount} from "@vue/test-utils";
import CityItem from "@/components/CityItem.vue";

const createWrapper = () => {
  return mount(CityItem,{
    props:{
      cityMetaInfo:{
        name:"Luanda",
        country:"AO"
      },
      cityLastFiveDaysTemp:[
        {
          dt:"1670972947",
          temp:"27"
        },
        {
          dt:"1670972947",
          temp:"25"
        },
        {
          dt:"1670972947",
          temp:"24"
        },
        {
          dt:"1670972947",
          temp:"22"
        },
        {
          dt:"1670972947",
          temp:"21"
        },
      ]
    }
  });
};

it("expect all texts to be rendered", () => {
  const wrapper = createWrapper();

  expect(wrapper.text()).toContain("Luanda");
  expect(wrapper.text()).toContain("AO");
  expect(wrapper.text()).toContain("13/12/2022");
});

describe("when buttonDetails is clicked", () => {
    it("emits cityClicked event", async () => {
      const wrapper = createWrapper();
      const buttonDetails = wrapper.find(".side-bar__close-button");
      await buttonDetails.trigger("click");

      expect(wrapper.emitted("closeSideBar")).toBeTruthy();
    });
  });
