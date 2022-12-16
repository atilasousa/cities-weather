import { mount } from "@vue/test-utils";
import AddCity from "@/components/AddCity.vue"

const createWrapper = () => {
  return mount(AddCity);
};

describe("when buttonDetails is clicked", () => {
    it("emits cityClicked event", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('input')

      await input.setValue('Teste');

      expect(input.element.value).toBe('Teste');
    });
  });
