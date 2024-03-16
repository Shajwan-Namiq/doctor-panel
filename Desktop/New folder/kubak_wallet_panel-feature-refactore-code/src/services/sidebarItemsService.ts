export default class SidebarItemsService {
  async getSidebarItems() {
    return fetch("/data/sidebarItems/sidebarItems.json")
      .then((res) => res.json())
      .then((data) => {
        return data.data;
      });
  }
}
