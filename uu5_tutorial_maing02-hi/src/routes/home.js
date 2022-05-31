//@@viewOn:imports
import { Utils, createVisualComponent } from "uu5g05";
import { Link } from "uu5g05-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import { useSubApp } from "uu_plus4u5g02";
//@@viewOff:imports

//@@viewOn:constants
const lessons = [
  {
    name: "New Project",
    folder: "02-new-project",
  },
  {
    name: "Hello World",
    folder: "03-hello-world",
  },
  {
    name: "Component",
    folder: "04-component",
  },
  {
    name: "Properties",
    folder: "05-properties",
  },
  {
    name: "State",
    folder: "06-state",
  },
  {
    name: "Route",
    folder: "07-route",
  },
  {
    name: "Effect",
    folder: "08-effect",
  },
  {
    name: "Cascading Styles",
    folder: "09-cascading-styles",
  },
  {
    name: "Server Calls",
    folder: "10-server-calls",
  },
  {
    name: "Context",
    folder: "11-context",
  },
  {
    name: "Session",
    folder: "12-session",
  },
  {
    name: "Multilingualism",
    folder: "13-multilingualism",
  },
  {
    name: "Modal",
    folder: "14-modal",
  },
  {
    name: "Forms",
    folder: "15-forms",
  },
  {
    name: "Tiles",
    folder: "16-tiles",
  },
  {
    name: "Responsivity",
    folder: "17-responsivity",
  },
  {
    name: "Dynamic Rendering",
    folder: "18-dynamic-rendering",
  },
];
//@@viewOff:constants

//@@viewOn:css
const Css = {
  list: () => Config.Css.css({ margin: 24 }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { baseUri } = useSubApp();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <div className={Css.list()}>
          <h1>Lessons</h1>
          <ol>
            {lessons.map((lesson, index) => {
              return (
                <li key={index} value={2 + index}>
                  <Link href={baseUri + "/" + lesson.folder + "/index.html"} target="_blank">
                    {lesson.name}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
