import {v4 as uuid } from 'uuid'
export const mapMainMenuItems = (menuItems) =>{

    const items = menuItems.map((menuItem) => ({
      id: uuid(),
      label: menuItem.menuItem?.label,
      destination: menuItem.menuItem.destination?.uri,
      submenuItems: (menuItem?.submenuitems || []).map(
        (submenuItem) => ({
          id: uuid(),
          destination: submenuItem.submenudestination?.uri,
          label: submenuItem.submenulabel,
        })
      ),
    }));

console.log("MENU ITEM ____ ->", JSON.stringify(items));
return items;
}