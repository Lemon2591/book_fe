import { useEffect, useState } from "react";

const Game = () => {
  const [isModal, setIsModal] = useState(false);

  const buildGridOverlay = () => {
    var size = 4;
    var table: any = document.createElement("DIV");

    table.className += "grid";
    table.id = " ";
    table.dataset.value = 0;

    for (var i = 0; i < size; i++) {
      var tr = document.createElement("DIV");
      table.appendChild(tr);
      tr.id = "row_" + (i + 1);
      tr.className += "grid_row";

      for (var j = 0; j < size; j++) {
        var td = document.createElement("DIV");
        td.id = "" + (i + 1) + (j + 1); //ID with x y
        td.className += "grid_cell";
        tr.appendChild(td);
      }
      const element: any = document.getElementById("game-container");
      element.appendChild(table);
    }

    return table;
  };

  /* RANDOM TILE CREATOR */
  const cellCreator = (c: any, timeOut: any) => {
    /* do 2 times for 2 new tiles */
    for (var i = 0; i < c; i++) {
      var count = 0;
      /* search for an empty cell to create a tile */

      for (var value = 1; value < 2; value++) {
        var randomX: any = Math.floor(Math.random() * 4 + 1);
        var randomY: any = Math.floor(Math.random() * 4 + 1);
        var checker: any = document.getElementById("" + randomX + randomY);
        if (checker.innerHTML != "") {
          value = 0;
        }
      }

      var randomValue = Math.floor(Math.random() * 4 + 1); //create value 1, 2, 3 or 4
      if (randomValue == 3) {
        randomValue = 4;
      } //3 --> 4
      if (randomValue == 1) {
        randomValue = 2;
      } //1 --> 2
      var position: any = document.getElementById("" + randomX + randomY);
      var tile: any = document.createElement("DIV"); //create div at x, y
      position.appendChild(tile); //tile becomes child of grid cell
      tile.innerHTML = "" + randomValue; //tile gets value 2 or 4

      colorSet(randomValue, tile);
      tile.data = "" + randomValue;
      tile.id = "tile_" + randomX + randomY;
      position.className += " active";
      var tileValue = tile.dataset.value;
      tile.dataset.value = "" + randomValue;

      console.info("" + timeOut);
      if (timeOut == 0) {
        tile.className = "tile " + randomValue;
      } else {
        setTimeout(function () {
          tile.className = "tile " + randomValue;
        }, 10);
      }
    }
  };

  const directions = (e?: any) => {
    e.preventDefault();
    e = e || window.event;
    var d = 0;
    // ----- KEY UP ----- //
    if (e?.keyCode == "38") {
      var count = 2;

      for (var x = 2; x > 1; x--) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(x, y, -1, 0, 1, 0);
          console.info("" + x + y);
        }
        if (x == 2) {
          x += count;
          count++;
        }
        if (count > 4) {
          break;
        }
      }
      cellReset();
    }

    // ----- KEY DOWN ----- //
    else if (e?.keyCode == "40") {
      // down
      var count = -2;
      var test = 1;
      for (var x = 3; x < 4; x++) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(x, y, 1, 0, 4, 0);
        }
        if (x == 3) {
          x += count;
          count--;
        }
        if (count < -4) {
          break;
        }
      }
      cellReset();
    }

    // ----- KEY LEFT ----- //
    else if (e?.keyCode == "37") {
      // left

      var count = 2;
      var test = 1;
      for (var x = 2; x > 1; x--) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(y, x, 0, -1, 0, 1);
        }
        if (x == 2) {
          x += count;
          count++;
        }
        if (count > 4) {
          break;
        }
      }
      cellReset();
    }

    // ----- KEY RIGHT ----- //
    else if (e?.keyCode == "39") {
      // right

      var count = -2;
      var noCell = 0;
      var c = 1;
      var d = 0;

      for (var x = 3; x < 4; x++) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(y, x, 0, 1, 0, 4, c, d);
        }
        if (x == 3) {
          x += count;
          count--;
        }
        if (count < -4) {
          break;
        }
      }
      cellReset();
    }
  };

  const moveTilesMain = (
    x?: any,
    y?: any,
    X?: any,
    Y?: any,
    xBorder?: any,
    yBorder?: any,
    c?: any,
    d?: any
  ) => {
    var tile: any = document.getElementById("tile_" + x + y);
    var checker: any = document.getElementById("" + x + y);
    var xAround = x + X;
    var yAround = y + Y;

    if (
      xAround > 0 &&
      xAround < 5 &&
      yAround > 0 &&
      yAround < 5 &&
      checker.className == "grid_cell active"
    ) {
      var around: any = document.getElementById("" + xAround + yAround);

      //________

      if (around.className == "grid_cell active") {
        //catching
        var aroundTile: any = document.getElementById(
          "tile_" + xAround + yAround
        );
        if (aroundTile.innerHTML == tile.innerHTML) {
          //same
          var value = tile.dataset.value * 2;
          aroundTile.dataset.value = "" + value;
          aroundTile.className = "tile " + value;
          aroundTile.innerHTML = "" + value;
          colorSet(value, aroundTile);
          checker.removeChild(tile);
          checker.className = "grid_cell";
          around.className = "grid_cell active merged";
          const id: any = document.getElementsByClassName("grid");
          id.id = "moved";
          const grids: any = document.getElementsByClassName("grid");
          grids.className = "grid " + value;
          var grid: any = document.getElementById(" ");
          var scoreValue = parseInt(grid.dataset.value);
          var newScore = value + scoreValue;

          grid.dataset.value = newScore;
          var score: any = document.getElementById("value");
          score.innerHTML = "" + newScore;
        }
      } else if (around.className == "grid_cell") {
        //not catching
        around.appendChild(tile);
        around.className = "grid_cell active";
        tile.id = "tile_" + xAround + yAround;
        checker.className = "grid_cell";
        const grid: any = document.getElementsByClassName("grid");
        grid.id = "moved";
      }
    }
  };

  const cellReset = () => {
    var count = 0;
    const grid: any = document.getElementsByClassName("grid");
    var a = grid.id;

    for (var x = 1; x < 5; x++) {
      for (var y = 1; y < 5; y++) {
        var resetter: any = document.getElementById("" + x + y);
        if (resetter.innerHTML != "") {
          count++;
        }

        if (resetter.innerHTML == "") {
          resetter.className = "grid_cell";
        }

        if (resetter.className == "grid_cell active merged") {
          resetter.className = "grid_cell active";
        }
      }
    }
    if (count == 16) {
      setIsModal(!isModal);
    } else if (grid.id == "moved") {
      cellCreator(1, 1);
    }
    grid.id = " ";
  };

  const score = () => {
    var grid: any = document.getElementById(" ");
    var value = grid.dataset.value;
    const valueEle: any = document.getElementById("value");
    valueEle.innerHTML = "" + value;
  };
  /* ----- STYLE ----- */
  const colorSet = (value: any, tile: any) => {
    switch (value) {
      case 2:
        tile.style.background = "#FDCFFA";
        tile.style.color = "white";
        break;
      case 4:
        tile.style.background = "#BADFDB";
        tile.style.color = "white";
        break;
      case 8:
        tile.style.background = "#FFA4A4";
        tile.style.color = "white";
        break;
      case 16:
        tile.style.background = "#FFBDBD";
        tile.style.color = "white";
        break;
      case 32:
        tile.style.background = "#f6546a";
        tile.style.color = "white";
        break;
      case 64:
        tile.style.background = "#8b0000";
        tile.style.color = "white";
        break;
      case 128:
        tile.style.background = "#794044";
        tile.style.color = "white";
        tile.style.fontSize = "50px";
        break;
      case 256:
        tile.style.background = "#31698a";
        tile.style.color = "white";
        tile.style.fontSize = "50px";
        break;
      case 512:
        tile.style.background = "#297A76";
        tile.style.color = "white";
        tile.style.fontSize = "50px";
        break;
      case 1024:
        tile.style.background = "#2D8A68";
        tile.style.color = "white";
        tile.style.fontSize = "40px";
        break;
      case 2048:
        tile.style.background = "#1C9F4E";
        tile.style.color = "white";
        tile.style.fontSize = "40px";
        const status: any = document.getElementById("status");
        status.className = "won";
        break;
      case 4096:
        tile.style.background = "#468499";
        tile.style.color = "white";
        tile.style.fontSize = "40px";
        break;
      case 8192:
        tile.style.background = "#0E2F44";
        tile.style.color = "white";
        tile.style.fontSize = "40px";
        break;
    }
  };

  const info = () => {
    setTimeout(function () {
      const description: any = document.getElementById("description");
      description.classList.toggle("show");
    }, 10);
  };

  const reset = () => {
    for (var x = 1; x < 5; x++) {
      for (var y = 1; y < 5; y++) {
        var resetter: any = document.getElementById("" + x + y);
        if (resetter.className == "grid_cell active") {
          var tile = document.getElementById("tile_" + x + y);
          resetter.removeChild(tile);
        }
      }
    }
    const status: any = document.getElementById("status");
    status.className = "";
    const noName: any = document.getElementById(" ");
    noName.dataset.value = 0;
    score();
    cellReset();
    cellCreator(2, 0);
  };

  useEffect(() => {
    // Khởi tạo grid và game khi component mount
    buildGridOverlay();
    cellCreator(2, 0);
    score();

    // Gắn sự kiện phím
    document.addEventListener("keydown", directions);

    // 🧹 Cleanup khi unmount
    return () => {
      document.removeEventListener("keydown", directions);

      // Xóa grid cũ (tránh trùng khi quay lại trang)
      const grid = document.querySelector(".grid");
      if (grid && grid.parentNode) {
        grid.parentNode.removeChild(grid);
      }
    };
  }, []);

  return (
    <>
      <div className={isModal ? "pop-up-open pop-up" : "pop-up-close"}>
        <div>
          <h1>Bạn đã thua mất rồi vui lòng ấn chơi lại !</h1>
          <button
            onClick={() => {
              setIsModal(!isModal);
              reset();
            }}
          >
            Chơi lại
          </button>
        </div>
      </div>
      <div className="game">
        <div className="head">
          <div className="a">
            2048{" "}
            <button className="info" onClick={info}>
              i
            </button>
            <button id="repeat" className="info repeat" onClick={reset}>
              ↻
            </button>
          </div>
          <div className="score">
            Điểm số
            <br />
            <span id="value"></span>
          </div>
        </div>
        <div className="description" id="description">
          <h1>Cách chơi:</h1>
          Sử dụng các phím mũi tên để di chuyển các ô <br />
          Có thể ghép hai ô có cùng giá trị trên một hàng. Mục tiêu là ghép các
          ô lại với nhau và tạo thành ô 2048.
          <div>
            <button className="btn" onClick={info}>
              Đã hiểu
            </button>
          </div>
        </div>
        <div className="field">
          <div className="row">
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
          </div>
          <div className="row">
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
          </div>
          <div className="row">
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
          </div>
          <div className="row">
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
          </div>
        </div>
      </div>
      <div className="" id="status"></div>
    </>
  );
};

export default Game;
