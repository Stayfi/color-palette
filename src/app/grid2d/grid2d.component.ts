import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grid2d",
  templateUrl: "./grid2d.component.html",
  styleUrls: ["./grid2d.component.scss"]
})
export class Grid2dComponent implements OnInit {
  topLeftColor = "#FF9900";
  topRightColor = "#000000";
  bottomLeftColor = "#FFFFFF";
  bottomRightColor = "#0099FF";
  defaultcolorGrid = "#CCCCCC";

  colorGridLen = 10;
  colorsGrid = new Array();

  constructor() {}

  ngOnInit(): void {
    this.initColorsGrid();
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
    this.setCellColor(0, this.colorGridLen - 1, this.topRightColor);
    this.setCellColor(this.colorGridLen - 1, 0, this.bottomLeftColor);
    this.setCellColor(
      this.colorGridLen - 1,
      this.colorGridLen - 1,
      this.bottomRightColor
    );

    this.setGradientToCol(0);
    this.setGradientToCol(this.colorGridLen - 1);

    this.setGradientAllRow();
  }

  setGradientToCol(idCol) {
    const gradientStep = this.getGradientStepFromCells(
      this.colorsGrid[0][idCol],
      this.colorsGrid[this.colorGridLen - 1][idCol]
    );
  for (let i = 1; i < this.colorGridLen - 1; i++) {
      const prevRGBColor = this.getIntColorFromCSS(this.colorsGrid[i - 1][idCol]);
      this.colorsGrid[i][idCol] = '#' +
        this.intToHex(prevRGBColor.red + gradientStep.red) +
        this.intToHex(prevRGBColor.green + gradientStep.green) +
        this.intToHex(prevRGBColor.blue + gradientStep.blue)
      ;
    }
  }

  setGradientAllRow() {
    for(let i = 0; i < this.colorGridLen; i++) {
      const gradientStep = this.getGradientStepFromCells(
        this.colorsGrid[i][0],
        this.colorsGrid[i][this.colorGridLen - 1]
      );
      for (let j = 1; j < this.colorGridLen - 1; j++) {
          const prevRGBColor = this.getIntColorFromCSS(this.colorsGrid[i][j - 1]);
          this.colorsGrid[i][j] = '#' +
            this.intToHex(prevRGBColor.red + gradientStep.red) +
            this.intToHex(prevRGBColor.green + gradientStep.green) +
            this.intToHex(prevRGBColor.blue + gradientStep.blue)
          ;
        }
     }
  }

  getGradientStepFromCells(cellStart: string, cellEnd: string) {
    const startColor = this.getIntColorFromCSS(cellStart);
    const endColor = this.getIntColorFromCSS(cellEnd);
    const gradientSteps = {
      red: (endColor.red - startColor.red) / this.colorGridLen,
      green: (endColor.green - startColor.green) / this.colorGridLen,
      blue: (endColor.blue - startColor.blue) / this.colorGridLen
    };
    return gradientSteps;
  }

  getIntColorFromCSS(cssColor: string) {
    const colorRGB = {
      red: this.hexToInt(cssColor.substr(1, 2)),
      green: this.hexToInt(cssColor.substr(3, 2)),
      blue: this.hexToInt(cssColor.substr(5, 2))
    };
    return colorRGB;
  }

  hexToInt(hexValue) {
    return parseInt(hexValue, 16);
  }

  intToHex(intValue) {
    const hexValue = ('0'+(Number(Math.round(intValue)).toString(16))).slice(-2).toUpperCase();
    return hexValue;
  }
}
