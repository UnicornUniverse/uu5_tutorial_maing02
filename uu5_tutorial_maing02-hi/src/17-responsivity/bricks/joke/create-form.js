//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useLsi, ContentSizeProvider } from "uu5g05";
import { Grid } from "uu5g05-elements";
import { Form, FormText, FormSelect, FormFile, FormTextArea, SubmitButton, CancelButton } from "uu5g05-forms";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  controls: () =>
    Config.Css.css({
      display: "flex",
      gap: 8,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
function getCategoryItemList(categoryList) {
  return categoryList.map((category) => {
    return { value: category.id, children: category.name };
  });
}
//@@viewOff:helpers

const CreateForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    categoryList: PropTypes.array,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [CreateForm.uu5Tag]);

    function handleValidate(event) {
      const { text, image } = event.data.value;

      if (!text && !image) {
        return {
          message: lsi.textOrImage,
        };
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <ContentSizeProvider>
        <Form {...elementProps} onSubmit={props.onSubmit} onValidate={handleValidate}>
          <Grid
            templateAreas={{
              xs: "name, categoryIdList, image, text, controls",
              m: "name name, categoryIdList image, text text, controls controls",
            }}
            templateColumns={{ m: "1fr 1fr" }}
            gap={8}
          >
            <Grid.Item gridArea="name">
              <FormText label={lsi.name} name="name" maxLength={255} required autoFocus />
            </Grid.Item>

            <Grid.Item gridArea="categoryIdList">
              <FormSelect
                label={lsi.category}
                name="categoryIdList"
                itemList={getCategoryItemList(props.categoryList)}
                multiple
              />
            </Grid.Item>

            <Grid.Item gridArea="image">
              <FormFile label={lsi.image} name="image" accept="image/*" />
            </Grid.Item>

            <Grid.Item gridArea="text">
              <FormTextArea label={lsi.text} name="text" maxLength={4000} rows={10} autoResize />
            </Grid.Item>

            <Grid.Item gridArea="controls" justifySelf="flex-end" className={Css.controls()}>
              <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
              <SubmitButton>{lsi.submit}</SubmitButton>
            </Grid.Item>
          </Grid>
        </Form>
      </ContentSizeProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateForm };
export default CreateForm;
//@@viewOff:exports
