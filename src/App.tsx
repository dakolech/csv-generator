import * as React from "react";
import "./App.css";

import { AppContainerComponent } from "./components/App-Container/App-Container.component";
import { HeaderComponent } from "./components/Header/Header.component";
import { TitleComponent } from "./components/Title/Title.component";
import { darkGrey } from "./config/styles/colors";
import { TablePage } from "./pages/Table/Table.page";

class App extends React.Component {
  public render() {
    return (
      <AppContainerComponent>
        <HeaderComponent>
          <TitleComponent big={true}>CSV</TitleComponent>
          <TitleComponent big={true} color={darkGrey}>
            Generator
          </TitleComponent>
        </HeaderComponent>
        <TablePage />
      </AppContainerComponent>
    );
  }
}

export default App;
