class PersonDataAccessObject {
  constructor(database) {
    this.database = database
  }

  saveToDatabase(person) {
    this.database.save(person)
  }
}

describe('the PersonDataAccessObject', () => {
  test('calls the function that would save Ada Lovelace to the database', () => {
    /* Arrange */

    // create "save-like" mock method of pushing something to database. mockSaveMethod will be inside database though.

    const mockSaveMethod = jest.fn((arg) => personDataAccessObject.database.database.push(arg) );

    // create "database-like" mock database that will house a fake database that can be pushed to, as well as a "save" key inside that refers to the mockSaveMethod written below.
    // when this.database.save is referenced inside the personDataAccessObject, mockSaveMethod will be called, take in the person argument, and push to the fake database.

    const mockDatabase = jest.fn();
    let database = { database: [], save: mockSaveMethod };
    const bound = mockDatabase.bind(database);
    bound();

    // pull usable database from mock function, feed into new personDataAccessObject

    let dbFromMock = mockDatabase.mock.contexts[0];

    const personDataAccessObject = new PersonDataAccessObject(dbFromMock);
    const expectedArgument = {firstName: 'Ada', lastName: 'Lovelace'}



    /* Act */
    personDataAccessObject.saveToDatabase(expectedArgument);

    /* Assert */
    expect(mockSaveMethod).toHaveBeenCalledWith(expectedArgument);
  })

  test('mockDatabase currently returns a string', () => {
    /* Arrange */
    //const mockSaveMethod = undefined;
    const filler = { test: function() { return "cake" } };
    const mockDatabase = jest.fn(() => filler);
    mockDatabase(filler);
    const testJest = jest.fn();
    const bound = testJest.bind(filler);
    bound();
    const personDataAccessObject = new PersonDataAccessObject(mockDatabase);
    console.log(personDataAccessObject)
    mockDatabase.bind(filler);
    console.log(mockDatabase.mock.contexts)
    console.log(testJest.mock.contexts)
    console.log(testJest.mock.contexts[0].test)
    const expectedArgument = {firstName: 'Ada', lastName: 'Lovelace'};

    /* Act */
    //personDataAccessObject.saveToDatabase(expectedArgument);

    /* Assert */
    expect(mockDatabase).toHaveReturnedWith({ test: "value" })
    //expect(mockSaveMethod).toHaveBeenCalledWith(expectedArgument);
  })
});
