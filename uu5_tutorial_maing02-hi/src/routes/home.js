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
    folder: "03-new-project",
  },
  {
    name: "Hello World",
    folder: "04-hello-world",
  },
  {
    name: "Component",
    folder: "05-component",
  },
  {
    name: "Properties",
    folder: "06-properties",
  },
  {
    name: "State",
    folder: "07-state",
  },
  {
    name: "Route",
    folder: "08-route",
  },
  {
    name: "Effect",
    folder: "09-effect",
  },
  {
    name: "Responsivity",
    folder: "10-responsivity",
  },
  {
    name: "Cascading Styles",
    folder: "11-cascading-styles",
  },
  {
    name: "Server Calls",
    folder: "12-server-calls",
  },
  {
    name: "Context",
    folder: "13-context",
  },
  {
    name: "Session",
    folder: "14-session",
  },
  {
    name: "Multilingualism",
    folder: "15-multilingualism",
  },
  {
    name: "Modal",
    folder: "16-modal",
  },
  {
    name: "Forms",
    folder: "17-forms",
  },
  {
    name: "Tiles",
    folder: "18-tiles",
  },
  {
    name: "Dynamic Rendering",
    folder: "19-dynamic-rendering",
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
                <li key={index} value={3 + index}>
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
