import React, { useState } from "react";
import { VictoryLabel, VictoryPie } from "victory";
import "./shadow.css";

const Chart = () => {
  const [pieData, setPieData] = useState([]);
  const [sum, setSum] = useState(0);
  const [showFilter, setshowFilter] = useState(false);
  const [filterOn, setFilterOn] = useState(false);

  const [msgData, setMsgData] = useState([]);
  const [rendermsgData, setRenderMsgData] = useState([]);

  const [filterDataByEmotion, setFilterDataByEmotion] = useState([]);
  const [filterDataBySentiment, setFilterDataBySentiment] = useState([]);
  const [sclick, setsClick] = useState(-1);
  const [eclick, setsElick] = useState(-1);

  const myFilter = (item) => {
    fetch(`http://0.0.0.0:5000/filter?platform=${item}`)
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        // console.log(r);
        // console.log(r[0].Emotion);
        setMsgData(r);
        setRenderMsgData(r);
        // let stt=new Set
        var emotion = [...new Set(msgData.map((item) => item.Emotion))];
        setFilterDataByEmotion(emotion);

        var sentiment = [...new Set(msgData.map((item) => item.Sentiment))];
        setFilterDataBySentiment(sentiment);
        // console.log(sentiment);

        // console.log(msgData);

        // console.log(emotion);
      })
      .catch((e) => console.log(e));
  };

  fetch("http://0.0.0.0:5000/count")
    .then((r) => {
      return r.json();
    })
    .then((r) => {
      setPieData(r);
      var tmp = 0;
      for (let i = 0; i < r.length; i++) {
        tmp += r[i].count;
      }
      setSum(tmp);
      //   console.log(r);
      //   console.log(pieData);
    })
    .catch((e) => console.log(e));
  return (
    <div id="shadow" style={{ background: "#F9F3EE", borderRadius: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#000",
          borderBottomStyle: "solid",
        }}
      >
        <p>Message Count By Source</p>
      </div>
      <div
        style={{
          height: 300,
          width: 300,
          background: "#F9F3EE",
          borderRadius: 20,
        }}
      >
        <svg viewBox="0 0 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            // data={[
            //   { x: 1, y: 50 },
            //   { x: 2, y: 40 },
            //   { x: 3, y: 10 },
            // ]}
            data={pieData}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          console.log(
                            "click",
                            props.data[props.index].platform
                          );
                          alert(props.data[props.index].platform);
                          // return props.text === "clicked"
                          //   ? null
                          //   : { text: "clicked" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            innerRadius={100}
            labelRadius={100}
            colorScale={[
              "#3BACB6",
              "#00acee",
              "#405DE6",
              "#FF4949",
              "#FF8D29",
              "#FFCD38",
            ]}
            style={{
              //   data:{},
              labels: { fontSize: 20, fill: "#fff" },
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 20 }}
            x={200}
            y={200}
            // text="Pie!"
            text={
              sum +
              `
          messagess`
            }
          />
        </svg>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: 10,
          }}
        >
          {pieData.map((item) => {
            return (
              item.id <= pieData.length / 2 + 1 && (
                <div
                  onClick={() => {
                    // alert(item.platform);
                    console.log(item.platform);
                    myFilter(item.platform);

                    setshowFilter(true);
                  }}
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "lightgray",
                    borderRadius: 25,
                    height: 40,
                    width: "33%",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 100,
                      background: item.color,
                      marginRight: 5,
                    }}
                  ></div>
                  <p style={{ flexWrap: "wrap" }}>{item.platform}</p>
                </div>
              )
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: 10,
          }}
        >
          {pieData.map((item) => {
            return (
              item.id >= pieData.length / 2 + 1 && (
                <div
                  onClick={() => {
                    // alert(item.platform);
                    myFilter(item.platform);
                    setshowFilter(true);
                  }}
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "lightgray",
                    borderRadius: 25,
                    height: 40,
                    width: "33%",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 100,
                      background: item.color,
                      marginRight: 5,
                    }}
                  ></div>
                  <p style={{ flexWrap: "wrap" }}>{item.platform}</p>
                </div>
              )
            );
          })}
        </div>
      </div>
      {showFilter && (
        <div
          className="model"
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            //   background: "red",
            zIndex: 10,
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="modelShadow"
            style={{
              background: "#EFEFEF",
              height: 600,
              width: 600,
              borderRadius: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <select
                onChange={(item) => {
                  // alert(item.platform);

                  console.log(item.target.value);
                  myFilter(item.target.value);

                  setshowFilter(true);
                }}
                id="dropdown"
              >
                {pieData.map((item) => {
                  return (
                    <option>{item.platform}</option>

                    // <div
                    //   onClick={() => {
                    //     // alert(item.platform);
                    //     myFilter(item.platform);
                    //     setshowFilter(true);
                    //   }}
                    //   // key={item.id}
                    //   // style={{
                    //   //   display: "flex",
                    //   //   alignItems: "center",
                    //   //   background: "lightgray",
                    //   //   borderRadius: 25,
                    //   //   height: 40,
                    //   //   width: "33%",
                    //   //   justifyContent: "center",
                    //   // }}
                    // >
                    //   <div
                    //     style={{
                    //       height: 15,
                    //       width: 15,
                    //       borderRadius: 100,
                    //       background: item.color,
                    //       marginRight: 5,
                    //     }}
                    //   ></div>
                    //   <p style={{ flexWrap: "wrap" }}>{item.platform}</p>
                    // </div>
                  );
                })}
              </select>

              <select
                onChange={(index) => {
                  console.log(index.target.value);
                  setsClick(-1);
                  // setsElick(index);
                  var data = msgData.filter(
                    ({ Emotion }) => Emotion == index.target.value
                  );
                  console.log(data);
                  setRenderMsgData(data);
                }}
                id="dropdown"
              >
                {/* <option value="N/A">N/A</option> */}
                {filterDataByEmotion.map((item, index) => {
                  return (
                    <option

                    // style={{
                    //   display: "flex",
                    //   alignItems: "center",
                    //   background: eclick == index ? "#36AE7C" : "lightgray",
                    //   borderRadius: 10,
                    //   margin: 2,
                    //   height: 25,
                    //   width: 120,
                    //   // width: "33%",
                    //   justifyContent: "center",
                    // }}
                    >
                      {item}
                    </option>
                  );
                })}
                {/* <option value="1">1</option> */}
              </select>
              {/* </div> */}
              {/* <div style={{ position: "absolute", left: 10 }}> */}
              <select
                onChange={(index) => {
                  // console.log(index.target.value);
                  // setsClick(-1);
                  // // setsElick(index);
                  // var data = msgData.filter(
                  //   ({ Emotion }) => Emotion == index.target.value
                  // );
                  // console.log(data);
                  // setRenderMsgData(data);

                  setsClick(index);
                  setsElick(-1);
                  var data = msgData.filter(
                    ({ Sentiment }) => Sentiment == index.target.value
                  );
                  // console.log(data);
                  setRenderMsgData(data);
                }}
                id="dropdown"
              >
                {filterDataBySentiment.map((item, index) => {
                  return <option>{item}</option>;
                })}
              </select>
            </div>
            <div
              style={{
                position: "absolute",
                height: 20,
                width: 20,
                background: "red",
                top: 30,
                right: 30,
                display: "flex",
                justifyContent: "center",
                borderRadius: 100,
                color: "#fff",
                flexDirection: "row",
              }}
              onClick={() => {
                setshowFilter(false);
                setsClick(-1);
                setsElick(-1);
              }}
            >
              X
            </div>
            {/* <div
              style={{
                // flexDirection: "column",
                display: "flex",
                justifyContent: "space-evenly",
                // background: "red",
                width: "100%",
              }}
            >
              emotions :-
              <div style={{ display: "flex", flexDirection: "column" }}>
                {filterDataByEmotion.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        console.log(index);
                        setsClick(-1);
                        setsElick(index);
                        var data = msgData.filter(
                          ({ Emotion }) => Emotion == item
                        );
                        // console.log(data);
                        setRenderMsgData(data);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: eclick == index ? "#36AE7C" : "lightgray",
                        borderRadius: 10,
                        margin: 2,
                        height: 25,
                        width: 120,
                        // width: "33%",
                        justifyContent: "center",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              Sentiment :-
              <div style={{ display: "flex", flexDirection: "column" }}>
                {filterDataBySentiment.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        setsClick(index);
                        setsElick(-1);
                        var data = msgData.filter(
                          ({ Sentiment }) => Sentiment == item
                        );
                        // console.log(data);
                        setRenderMsgData(data);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: sclick == index ? "#36AE7C" : "lightgray",
                        borderRadius: 10,
                        margin: 5,
                        height: 25,
                        width: 120,
                        // width: "33%",
                        justifyContent: "center",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div> */}
            <div
              style={{
                height: 420,
                width: 420,
                overflow: "scroll",
                padding: 20,
                margin: 10,
                textAlign: "center",
                overflowX: "hidden",
              }}
            >
              {rendermsgData.map((item) => {
                // console.log(item);
                return (
                  <div
                    style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
                  >
                    <p>{item.Message}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
