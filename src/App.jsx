import "./App.scss";
import { ChromePicker as Picker } from "react-color";
import { useEffect, useState } from "react";

function App() {
  const [colorData, setColorData] = useState({
    hex: getRandomHex(),
    colorName: "...",
  });
  useEffect(() => {
    const getData = setTimeout(() => {
      handleChangeColorComplete();
    }, 300);

    return () => clearTimeout(getData);
  }, [colorData.hex]);

  function handleChangeColor(color) {
    setColorData((prev) => ({
      ...prev,
      hex: color.hex.slice(1),
    }));
  }

  function handleChangeColorComplete() {
    const url = new URL(`https://www.thecolorapi.com/id?hex=${colorData.hex}`);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setColorData((prev) => {
          return { ...prev, colorName: json.name.value };
        });
      });
  }

  function getRandomHex() {
    var letters = "0123456789ABCDEF".split("");
    var color = "";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function pickTextColor(bgColor, lightColor = "white", darkColor = "black") {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179 ? darkColor : lightColor;
  }

  return (
    <>
      <header>
        <h1>Color Names</h1>
      </header>
      <main>
        <div>
          <div
            className="color-name"
            style={{
              backgroundColor: "#" + colorData.hex,
              color: pickTextColor(colorData.hex),
            }}
          >
            <h2>{colorData.colorName}</h2>
          </div>
          <div className="formfit color-picker">
            <Picker
              color={colorData.hex}
              onChange={handleChangeColor}
              disableAlpha
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
