import RegisterStation from "../../src/Components/RegisterStation";

describe('Register station page tests', () => {
  
it("Should POST the correct json WITHOUT public check", () => {
  const userId = 1;
  const Stationname = "Piet";
  const Address = "Teststraat 123";
  const Height = "20";
  const Longitude = "20.222";
  const Latitude = "20.1234";
  const IsPublic = false;

  cy.intercept("POST", "http://localhost:8082/api/Station", {}).as(
    "addStation"
  );
  cy.visit("/register");

  cy.get("[placeholder=Name]").type(Stationname);
  cy.get("[placeholder=Adress]").type(Address);
  cy.get(":nth-child(5) > .form-control").type(Height);
  cy.get(":nth-child(6) > .form-control").type(Longitude);
  cy.get(":nth-child(7) > .form-control").type(Latitude);

  cy.get(".btn").click();

  cy.wait("@addStation").then((interception) => {
    const expectedValue = {
      userId: userId, 
      stationname: Stationname,
      address: Address,
      height: Height,
      longitude: Longitude,
      latitude: Latitude,
      ispublic: IsPublic,
    };
    expect(JSON.stringify(interception.request.body)).equal(
      JSON.stringify(expectedValue)
    );
  });
});

it("Should POST the correct json WITH public check", () => {
  const userId = 1;
  const Stationname = "Piet";
  const Address = "Teststraat 123";
  const Height = "20";
  const Longitude = "20.222";
  const Latitude = "20.1234";
  const IsPublic = true;

  cy.intercept("POST", "http://localhost:8082/api/Station", {}).as(
    "addStation"
  );
  cy.visit("/register");

  cy.get("[placeholder=Name]").type(Stationname);
  cy.get("[placeholder=Adress]").type(Address);
  cy.get(":nth-child(5) > .form-control").type(Height);
  cy.get(":nth-child(6) > .form-control").type(Longitude);
  cy.get(":nth-child(7) > .form-control").type(Latitude);
  cy.get(':nth-child(8) > input').click();

  cy.get(".btn").click();

  cy.wait("@addStation").then((interception) => {
    const expectedValue = {
      userId: userId, 
      stationname: Stationname,
      address: Address,
      height: Height,
      longitude: Longitude,
      latitude: Latitude,
      ispublic: IsPublic,
    };
    expect(JSON.stringify(interception.request.body)).equal(
      JSON.stringify(expectedValue)
      );
  });
  
      })


