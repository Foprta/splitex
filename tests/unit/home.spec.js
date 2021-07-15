import Home from "../../src/views/Home";
import router from "../../src/router";
import store from "../../src/store";
import AddGroup from "../../src/components/AddGroup";
import { shallowMount } from "@vue/test-utils";

describe("Home.vue", () => {
  let wrapper;

  beforeEach(async () => {
    router.push = jest.fn();
    wrapper = shallowMount(Home, { global: { plugins: [router, store] } });
    await router.isReady();
  });

  test("render", () => {
    expect(wrapper).toBeTruthy();
  });

  test("open new group after creating it", async () => {
    const id = "newGroupId";

    wrapper.findComponent(AddGroup).vm.$emit("groupCreated", { id });

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("newGroupId");
  });
});
