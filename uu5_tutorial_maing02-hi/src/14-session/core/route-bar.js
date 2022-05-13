//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute } from "uu5g05";
import { useSubAppData } from "uu_plus4u5g02";
import Plus4U5App from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import LSI from "../config/lsi.js";
//@@viewOff:imports

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();
    const subAppDataObject = useSubAppData();

    const appActionList = [
      { children: <Lsi lsi={LSI.menu.home} />, onClick: () => setRoute("home") },
      { children: <Lsi lsi={LSI.menu.jokes} />, onClick: () => setRoute("jokes") },
      { children: <Lsi lsi={LSI.menu.about} />, onClick: () => setRoute("about"), collapsed: true },
    ];
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Plus4U5App.RouteBar appActionList={appActionList} {...props}>
        <Plus4U5App.RouteHeader title={"Lesson 14 - Session - " + subAppDataObject.data.name} />
      </Plus4U5App.RouteBar>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
