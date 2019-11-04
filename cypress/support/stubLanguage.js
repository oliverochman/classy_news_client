const stubLanguage = language => ({
  onBeforeLoad(win) {
    const stubLanguage = language
    };
    cy.stub(win.navigator.__defineGetter__, "language").callsFake(
      callback => {
        return callback(stubLanguage);
      }
    );
  }
});

export default stubLanguage;