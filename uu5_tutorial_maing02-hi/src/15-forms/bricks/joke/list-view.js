//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useRef, useLsi, useState } from "uu5g05";
import { Button, Pending, useAlertBus } from "uu5g05-elements";
import Tile from "./tile";
import Config from "./config/config.js";
import DetailModal from "./detail-modal";
import UpdateModal from "./update-modal";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  tile: () => Config.Css.css({ marginBottom: 24 }),
  buttonArea: () => Config.Css.css({ textAlign: "center", marginBottom: 24 }),
};
//@@viewOff:css

//@@viewOn:helpers
function getJokeDataObject(jokeDataList, id) {
  // HINT: We need to also check newData where are newly created items
  // that don't meet filtering, sorting or paging criteria.
  const item =
    jokeDataList.newData?.find((item) => item?.data.id === id) ||
    jokeDataList.data.find((item) => item?.data.id === id);

  return item;
}
//@@viewOff:helpers

const ListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataList: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired,
    categoryList: PropTypes.array,
    profileList: PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
    profileList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { addAlert } = useAlertBus();
    const nextPageIndexRef = useRef(1);
    const lsi = useLsi(importLsi, [ListView.uu5Tag]);
    const [detailData, setDetailData] = useState({ open: false, id: undefined });
    const [updateData, setUpdateData] = useState({ open: false, id: undefined });

    const activeDataObjectId = detailData.id || updateData.id;
    let activeDataObject;

    if (activeDataObjectId) {
      activeDataObject = getJokeDataObject(props.jokeDataList, activeDataObjectId);
    }

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    async function handleDelete(jokeDataObject) {
      try {
        await jokeDataObject.handlerMap.delete();
      } catch (error) {
        ListView.logger.error("Error deleting joke", error);
        showError(error, lsi.deleteFail);
        return;
      }

      addAlert({
        message: Utils.String.format(lsi.deleteDone, jokeDataObject.data.name),
        priority: "success",
        durationMs: 2000,
      });
    }

    async function handleUpdate(jokeDataObject) {
      setUpdateData({ open: true, id: jokeDataObject.data.id });
    }

    async function handleUpdateSubmit(jokeDataObject, values) {
      try {
        await jokeDataObject.handlerMap.update(values);
      } catch (error) {
        ListView.logger.error("Error updating joke", error);
        showError(error, lsi.updateFail, error);
        return;
      }

      setUpdateData({ open: false });
    }

    function handleUpdateCancel() {
      setUpdateData({ open: false });
    }

    async function handleLoadNext() {
      try {
        await props.jokeDataList.handlerMap.loadNext({ pageInfo: { pageIndex: nextPageIndexRef.current } });
        nextPageIndexRef.current++;
      } catch (error) {
        ListView.logger.error("Error loading next page", error);
        showError(error, lsi.pageLoadFail);
      }
    }

    const handleItemDetailOpen = (jokeDataObject) => setDetailData({ open: true, id: jokeDataObject.data.id });
    const handleItemDetailClose = () => setDetailData({ open: false });
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const jokeList = props.jokeDataList.data.filter((item) => item !== undefined);

    return (
      <div {...attrs}>
        {jokeList.map((item) => (
          <Tile
            key={item.data.id}
            jokeDataObject={item}
            profileList={props.profileList}
            identity={props.identity}
            onDetail={handleItemDetailOpen}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            className={Css.tile()}
            categoryList={props.categoryList}
          />
        ))}
        <div className={Css.buttonArea()}>
          {props.jokeDataList.state !== "pending" && (
            <Button colorScheme="primary" onClick={handleLoadNext}>
              {lsi.loadNext}
            </Button>
          )}
          {props.jokeDataList.state === "pending" && <Pending />}
        </div>
        {detailData.open && activeDataObject && (
          <DetailModal
            jokeDataObject={activeDataObject}
            profileList={props.profileList}
            identity={props.identity}
            categoryList={props.categoryList}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onClose={handleItemDetailClose}
            open
          />
        )}
        {updateData.open && (
          <UpdateModal
            jokeDataObject={activeDataObject}
            categoryList={props.categoryList}
            onSubmit={handleUpdateSubmit}
            onCancel={handleUpdateCancel}
            open
          />
        )}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports
