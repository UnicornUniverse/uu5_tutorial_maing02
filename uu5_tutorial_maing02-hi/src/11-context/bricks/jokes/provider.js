//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import Calls from "calls";
import Config from "./config/config";
import Context from "./context";
//@@viewOff:imports

export const Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const jokesDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
      },
    });

    async function handleLoad() {
      return Calls.Jokes.load();
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Context.Provider value={jokesDataObject}>
        {typeof props.children === "function" ? props.children(jokesDataObject) : props.children}
      </Context.Provider>
    );
    //@@viewOff:render
  },
});

export default Provider;
