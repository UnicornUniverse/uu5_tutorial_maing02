//@@viewOn:imports
import { Utils, createVisualComponent, Content, useSession, Environment, DynamicLibraryComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  container: () => Config.Css.css({ padding: 16 }),
};
//@@viewOff:css

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
    const { identity } = useSession();

    const data = [
      {
        label: "Jan",
        value: 4000,
        value2: 3000,
        value3: 1000,
      },
      {
        label: "Feb",
        value: 3000,
        value2: 1000,
        value3: 2000,
      },
      {
        label: "Mar",
        value: 2000,
        value2: 1400,
        value3: 3000,
      },
      {
        label: "Apr",
        value: 2780,
        value2: 2000,
        value3: 4000,
      },
      {
        label: "May",
        value: 1890,
        value2: 2900,
        value3: 1400,
      },
      {
        label: "Jun",
        value: 2390,
        value2: 5000,
        value3: 1600,
      },
      {
        label: "Jul",
        value: 3490,
        value2: 1000,
        value3: 1900,
      },
      {
        label: "Aug",
        value: 500,
        value2: 3200,
        value3: 1500,
      },
      {
        label: "Sep",
        value: 1500,
        value2: 1100,
        value3: 2300,
      },
      {
        label: "Oct",
        value: 3400,
        value2: 4300,
        value3: 2100,
      },
      {
        label: "Nov",
        value: 2895,
        value2: 3100,
        value3: 2900,
      },
      {
        label: "Dec",
        value: 4400,
        value2: 2200,
        value3: 3000,
      },
    ];

    const series = [
      {
        valueKey: "value",
        name: "First chart",
        colorSchema: "red",
      },
      {
        valueKey: "value2",
        name: "Second chart",
        colorSchema: "blue",
      },
      {
        valueKey: "value3",
        name: "Third chart",
      },
    ];

    Environment.uu5DataMap = { data, series };
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        <RouteBar />
        <div className={Css.container()}>
          <Content>
            {`
            <uu5string/>
            <UuContentKit.Bricks.BlockInfo icon="mdi-format-paint" content="Dynamic Rendering" />
            <UuSpecialistWtm.Bricks.WorkerOverviewByTime panelHeader="${identity.name} overview by time" groupByCategory="true" />
            <UuContentKit.Bricks.BlockSuccess content="It is working!" />
          `}
          </Content>
          <Content>
            {`
              <uu5string/>
              <UU5.SimpleChart.AreaChart
                data='<uu5json/>[
                    {
                      "label": "Jan",
                      "value": 4000,
                      "value2": 3000,
                      "value3": 1000
                    },
                    {
                      "label": "Feb",
                      "value": 3000,
                      "value2": 1000,
                      "value3": 2000
                    },
                    {
                      "label": "Mar",
                      "value": 2000,
                      "value2": 1400,
                      "value3": 3000
                    },
                    {
                      "label": "Apr",
                      "value": 2780,
                      "value2": 2000,
                      "value3": 4000
                    },
                    {
                      "label": "May",
                      "value": 1890,
                      "value2": 2900,
                      "value3": 1400
                    },
                    {
                      "label": "Jun",
                      "value": 2390,
                      "value2": 5000,
                      "value3": 1600
                    },
                    {
                      "label": "Jul",
                      "value": 3490,
                      "value2": 1000,
                      "value3": 1900
                    },
                    {
                      "label": "Aug",
                      "value": 500,
                      "value2": 3200,
                      "value3": 1500
                    },
                    {
                      "label": "Sep",
                      "value": 1500,
                      "value2": 1100,
                      "value3": 2300
                    },
                    {
                      "label": "Oct",
                      "value": 3400,
                      "value2": 4300,
                      "value3": 2100
                    },
                    {
                      "label": "Nov",
                      "value": 2895,
                      "value2": 3100,
                      "value3": 2900
                    },
                    {
                      "label": "Dec",
                      "value": 4400,
                      "value2": 2200,
                      "value3": 3000
                    }
                    ]'
                series='<uu5json/>[
                    {
                      "valueKey": "value",
                      "name": "First chart",
                      "colorSchema": "red"
                    },
                    {
                      "valueKey": "value2",
                      "name": "Second chart",
                      "colorSchema": "blue"
                    },
                    {
                      "valueKey": "value3",
                      "name": "Third chart"
                    }
                  ]'
                labelKey="label"
                chartType="monotone"
                colorSchema="default"
                stacked=true
                displayCartesianGrid=false
                responsive
                isAnimationActive
                displayTooltip
                gradient
              />
            `}
          </Content>
          <Content>
            {`
            <uu5string/>
            <UU5.SimpleChart.AreaChart
              data='<uu5data/>data'
              series='<uu5data/>series'
            />
            <UU5.SimpleChart.BarChart
              data='<uu5data/>data'
              series='<uu5data/>series'
            />
          `}
          </Content>
          <DynamicLibraryComponent
            uu5Tag="UuMyTerritoryDw.Record.Calendar"
            header="My calendar"
            calendarView="week"
            contextType="none"
          />
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
