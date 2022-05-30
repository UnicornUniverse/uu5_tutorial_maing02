//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, useLanguage } from "uu5g05";
import { Modal, Box, Line, Text, DateTime } from "uu5g05-elements";
import { PersonPhoto } from "uu_plus4u5g02-elements";
import importLsi from "../../lsi/import-lsi.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  content: () =>
    Config.Css.css({
      marginTop: -16,
      marginLeft: -24,
      marginRight: -24,
      marginBottom: -16,
    }),

  image: () =>
    Config.Css.css({
      display: "block",
      maxWidth: "100%",
      margin: "auto",
    }),

  text: () =>
    Config.Css.css({
      display: "block",
      marginLeft: 24,
      marginRight: 24,
      marginTop: 16,
      marginBottom: 16,
    }),

  infoLine: () =>
    Config.Css.css({
      display: "block",
      marginLeft: 24,
      marginTop: 8,
    }),

  footer: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginTop: 8,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
    }),

  photo: () =>
    Config.Css.css({
      marginRight: 8,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
function hasManagePermission(joke, identity, profileList) {
  const isAuthority = profileList.includes("Authorities");
  const isExecutive = profileList.includes("Executives");
  const isOwner = joke.uuIdentity === identity.uuIdentity;
  return isAuthority || (isExecutive && isOwner);
}

function InfoLine({ children }) {
  return (
    <Text
      category="interface"
      segment="content"
      type="medium"
      significance="subdued"
      colorScheme="building"
      className={Css.infoLine()}
    >
      {children}
    </Text>
  );
}

function buildCategoryNames(categoryIdList, categoryList) {
  // for faster lookup
  let categoryIds = new Set(categoryIdList);
  return categoryList
    .reduce((acc, category) => {
      if (categoryIds.has(category.id)) {
        acc.push(category.name);
      }
      return acc;
    }, [])
    .join(", ");
}
//@@viewOff:helpers

const DetailModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    categoryList: PropTypes.array,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
    open: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [language] = useLanguage();
    const lsi = useLsi(importLsi, [DetailModal.uu5Tag]);

    function getRatingCountLsi(ratingCount) {
      const pluralRules = new Intl.PluralRules(language);
      const rule = pluralRules.select(ratingCount);
      return lsi[`${rule}Votes`];
    }

    function getActions() {
      const isActionDisabled = props.jokeDataObject.state === "pending";
      const canManage = hasManagePermission(props.jokeDataObject.data, props.identity, props.profileList);
      let actionList = [];

      if (canManage) {
        actionList.push({
          icon: "mdi-pencil",
          children: lsi.update,
          onClick: () => props.onUpdate(props.jokeDataObject),
          disabled: isActionDisabled,
          primary: true,
        });

        actionList.push({
          icon: "mdi-delete",
          children: lsi.delete,
          onClick: () => props.onDelete(props.jokeDataObject),
          disabled: isActionDisabled,
          collapsed: true,
        });
      }

      return actionList;
    }
    //@@viewOff:private

    //@@viewOn:render
    const joke = props.jokeDataObject.data;

    return (
      <Modal header={joke.name} onClose={props.onClose} open={props.open} actionList={getActions()}>
        <div className={Css.content()}>
          {joke.text && (
            <Text category="interface" segment="content" type="medium" colorScheme="building" className={Css.text()}>
              {joke.text}
            </Text>
          )}

          {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}

          <Line significance="subdued" />

          {joke.categoryIdList?.length > 0 && (
            <InfoLine>{buildCategoryNames(joke.categoryIdList, props.categoryList)}</InfoLine>
          )}

          <InfoLine>
            <DateTime value={joke.sys.cts} dateFormat="short" timeFormat="none" />
          </InfoLine>

          <InfoLine>{Utils.String.format(getRatingCountLsi(joke.ratingCount), joke.ratingCount)}</InfoLine>

          <Box significance="distinct" className={Css.footer()}>
            <span>
              <PersonPhoto uuIdentity={joke.uuIdentity} size="xs" className={Css.photo()} />
              <Text category="interface" segment="content" colorScheme="building" type="medium">
                {joke.uuIdentityName}
              </Text>
            </span>
            <span>{Utils.String.format(lsi.averageRating, joke.averageRating)}</span>
          </Box>
        </div>
      </Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailModal };
export default DetailModal;
//@@viewOff:exports
