import { Component } from "react";
import { Form } from "./components/Form";
import { Contacts } from "./components/Contacts";
import { Filter } from "./components/Filter";
import { CrashProtector } from "./components/CrashProtector";
import { nanoid } from "nanoid";
import styled from "styled-components";

const Title = styled.h2`
  margin-bottom: 20px;
  margin-top: 0;
`;

const Div = styled.div`
  margin: 0 auto;
  width: 650px;
  background-color: #fff1ec;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
    name: "",
    number: "",
  };

  inputData = (name, number) => {
    const nameUpper = name.toUpperCase();
    const numberUpper = number;

    const nameExist = this.state.contacts.some((contact) => {
      return contact.name.toUpperCase() === nameUpper;
    });

    const numberExist = this.state.contacts.some((contact) => {
      return contact.number === numberUpper;
    });

    if (nameExist) {
      alert(`${name} is already in contacts!`);
      return;
    }

    if (numberExist) {
      alert(`${numberUpper} is already exist!`);
      return;
    }

    const objectValue = {
      name: name,
      number: number,
      id: nanoid(),
    };

    const strData = JSON.stringify(objectValue);
    console.log("strData", strData);

    this.setState(
      (prevState) => ({
        contacts: [...prevState.contacts, objectValue],
      }),
      () => {
        console.log(this.state);
      }
    );
    // console.log(this.state);
  };

  deleteData = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  filterData = (value) => {
    this.setState({
      filter: value,
    });
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    this.setState({ contacts: savedContacts });
    console.log("mount", this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
    // const updatesContacts = JSON.stringify(localStorage.setItem('contacts')) ----
  }

  render() {
    return (
      <Div className="App">
        <CrashProtector>
          <Title>
            Phonebook |{" "}
            <span style={{ backgroundColor: "pink", borderRadius: "10px" }}>
              Зроблено з любов'ю!
            </span>
          </Title>
        </CrashProtector>
        <CrashProtector>
          <Form inputData={this.inputData} telData={this.telData} />
        </CrashProtector>
        <CrashProtector>
          <Filter filterData={this.filterData} />
        </CrashProtector>
        <CrashProtector>
          <Contacts listData={this.state} deleteData={this.deleteData} />
        </CrashProtector>
      </Div>
    );
  }
}

export default App;
