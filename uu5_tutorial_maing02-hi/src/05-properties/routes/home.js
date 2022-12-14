//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import ListProvider from "../bricks/joke/list-provider";
import ListView from "../bricks/joke/list-view";
//@@viewOff:imports

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ListProvider>
          {({ jokeList, remove, update }) => <ListView jokeList={jokeList} onDelete={remove} onUpdate={update} />}
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
