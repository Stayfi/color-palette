import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Grid2dComponent } from "./grid2d/grid2d.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, Grid2dComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
