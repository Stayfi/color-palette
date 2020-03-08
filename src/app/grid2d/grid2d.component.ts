import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grid2d",
  templateUrl: "./grid2d.component.html",
  styleUrls: ["./grid2d.component.scss"]
})
export class Grid2dComponent implements OnInit {
  topLeftColor = "#ffffff";
  bottomRightColor = "#000000";
  defaultcolorGrid = "#CCCCCC";

  colorGridLen = 10;
  colorsGrid = new Array();

  constructor() {}

  ngOnInit(): void {
    this.initColorsGrid();
    this.setCellColor(0, this.colorGridLen - 1, "#000000");
    this.setCellColor(this.colorGridLen - 1, 0, "#FFFFFF");
  }

  initColorsGrid() {
    for (let i = 0; i < this.colorGridLen; i++) {
      for (let j = 0; j < this.colorGridLen; j++) {
        if (!this.colorsGrid[i]) {
          this.colorsGrid[i] = new Array();
        }
        this.colorsGrid[i][j] = this.defaultcolorGrid;
      }
    }
  }

  setCellColor(row: number, col: number, cellColor: string) {
    this.colorsGrid[row][col] = cellColor;
  }

  drawGradientBackground() {
    this.setCellColor(0, 0, this.topLeftColor);
    this.setCellColor(
      this.colorGridLen - 1,
      this.colorGridLen - 1,
      this.bottomRightColor
    );

    const gradientStep = this.getGradientStepFromCells(
      this.colorsGrid[0][0],
      this.colorsGrid[0][this.colorGridLen - 1]
    );
    for (let i = 1; i < this.colorGridLen; i++) {
      // this.colorsGrid[0][i] = '#'+
      //   this.intToHex(this.hexToInt(this.colorsGrid[0][i - 1]) + gradientStep.red)
      //   this.intToHex(this.hexToInt(this.colorsGrid[0][i - 1]) + gradientStep.green)
      //   this.intToHex(this.hexToInt(this.colorsGrid[0][i - 1]) + gradientStep.blue)
      // );
    }
  }

  getGradientStepFromCells(cellStart: string, cellEnd: string) {
    const startColor = this.getIntColorFromCSS(cellStart);
    const endColor = this.getIntColorFromCSS(cellEnd);
    const gradientSteps = {
      red: Math.abs(endColor.red - startColor.blue) / this.colorGridLen,
      green: Math.abs(endColor.green - startColor.green) / this.colorGridLen,
      blue: Math.abs(endColor.red - startColor.blue) / this.colorGridLen
    };
    return gradientSteps;
  }

  getIntColorFromCSS(cssColor: string) {
    const colorRGB = {
      red: this.hexToInt(cssColor.substr("1", "2")),
      green: this.hexToInt(cssColor.substr("3", "2")),
      blue: this.hexToInt(cssColor.substr("5", "2"))
    };
    return colorRGB;
  }

  hexToInt(hexValue) {
    return parseInt(hexValue, 16);
  }

  intToHex(intValue) {
    return Number(intValue).toString(16);
  }
}
