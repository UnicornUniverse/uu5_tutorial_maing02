//@@viewOn:imports
import { createVisualComponent, Utils, useSession } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";
import Plus4U5App, { SpaPending, Error } from "uu_plus4u5g02-app";
import { Unauthenticated } from "uu_plus4u5g02-elements";

import Config from "./config/config.js";
import Home from "../routes/home.js";
import JokesProvider from "../bricks/jokes/provider.js";
//@@viewOff:imports

//@@viewOn:constants
const Jokes = Utils.Component.lazy(() => import("../routes/jokes.js"));
const About = Utils.Component.lazy(() => import("../routes/about.js"));
const InitAppWorkspace = Utils.Component.lazy(() => import("../routes/init-app-workspace.js"));
const ControlPanel = Utils.Component.lazy(() => import("../routes/control-panel.js"));

const ROUTE_MAP = {
  "": { redirect: "home" },
  home: (props) => <Home {...props} />,
  jokes: (props) => <Jokes {...props} />,
  about: (props) => <About {...props} />,
  "sys/uuAppWorkspace/initUve": (props) => <InitAppWorkspace {...props} />,
  controlPanel: (props) => <ControlPanel {...props} />,
  "*": { redirect: "home" },
};
//@@viewOff:constants

function SessionResolver({ children }) {
  const session = useSession();

  switch (session.state) {
    case "pending":
      return <SpaPending />;
    case "notAuthenticated":
      return <Unauthenticated />;
    case "authenticated":
    default:
      return children;
  }
}

const Spa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Spa",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:render
    return (
      <Plus4U5.SpaProvider initialLanguageList={["en", "cs"]} skipAppWorkspaceProvider>
        <SessionResolver>
          <JokesProvider>
            {(jokesDataObject) => (
              <>
                {jokesDataObject.state === "pendingNoData" && <SpaPending />}
                {jokesDataObject.state === "errorNoData" && <Error error={jokesDataObject.errorData} />}
                {["ready", "pending", "error"].includes(jokesDataObject.state) && (
                  <Plus4U5App.Spa routeMap={ROUTE_MAP} />
                )}
              </>
            )}
          </JokesProvider>
        </SessionResolver>
      </Plus4U5.SpaProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Spa };
export default Spa;
//@@viewOff:exports
