/* eslint-disable testing-library/await-async-utils */

describe('Forecast view', () => {
  context('when first visiting the site', () => {
    beforeEach(() => {
      cy.interceptWeatherForecastRequest();
      cy.visit('/');
    });

    it('shows a loading spinner at the beginning', () => {
      cy.get('.fa-spinner').should('be.visible');
      cy.wait('@getWeatherForecast');
    });

    it('removes the loading spinner after the API request is done', () => {
      cy.wait('@getWeatherForecast');
      cy.get('.fa-spinner').should('not.exist');
    });
  });

  context('when the API throws an error', () => {
    beforeEach(() => {
      cy.interceptWeatherForecastRequestWithError();
      cy.visit('/');
      cy.wait('@getWeatherForecastWithError');
    });

    it('shows an error message', () => {
      cy.get('h1').should('contain', 'Oops');
    });
  });

  context('when the API responds successfully', () => {
    beforeEach(() => {
      cy.interceptWeatherForecastRequest();
      cy.visit('/');
      cy.wait('@getWeatherForecast');
      cy.get('[class^=cardsContainer]').as('cardsContainer');
      cy.get('@cardsContainer').within(() => {
        cy.get('[class^=card-]').as('cardItems');
      });
    });

    describe('result', () => {
      beforeEach(() => {
        cy.get('@cardItems').eq(0).as('firstCard');
      });

      it('shows a list of forecast items', () => {
        cy.get('@cardsContainer').should('be.visible');
        cy.get('@cardsContainer').within(() => {
          cy.get('@cardItems').should('have.length.of.at.least', 1);
        });
      });

      it('shows the first forecast items with an active state', () => {
        cy.get('@firstCard')
          .invoke('attr', 'class')
          .should('contain', 'active');
      });

      it('shows a main box with the detailed information of the first forecast item', () => {
        cy.get('section[class^=selection]')
          .as('selectionSection')
          .should('be.visible');
        cy.get('@firstCard')
          .find('h3')
          .then(($h3) => {
            cy.get('@selectionSection').within(() => {
              cy.get('[class^=summary-] h1').should('have.text', $h3.text());
            });
          });
      });
    });

    describe('interactions', () => {
      beforeEach(() => {
        cy.get('@cardItems').eq(0).as('firstCard');
        cy.get('@cardItems').eq(1).as('secondCard');
      });

      context('when clicking on second forecast item', () => {
        beforeEach(() => {
          cy.get('@secondCard').click();
        });

        it('removes active style from the first forecast item', () => {
          cy.get('@firstCard')
            .invoke('attr', 'class')
            .should('not.contain', 'active');
        });

        it('changes style of the second forecast item indicating the active state', () => {
          cy.get('@secondCard')
            .invoke('attr', 'class')
            .should('contain', 'active');
        });

        it('shows the information of the second forecast item in the main box', () => {
          cy.get('section[class^=selection]').as('selectionSection');
          cy.get('@secondCard')
            .find('h3')
            .then(($h3) => {
              cy.get('@selectionSection').within(() => {
                cy.get('[class^=summary-] h1').should('have.text', $h3.text());
              });
            });
        });
      });

      context(
        'when clicking on first forecast item after clicking on second one',
        () => {
          beforeEach(() => {
            cy.get('@secondCard').click();
            cy.get('@firstCard').click();
          });

          it('removes active style from the second forecast item', () => {
            cy.get('@secondCard')
              .invoke('attr', 'class')
              .should('not.contain', 'active');
          });

          it('changes style of the first forecast item indicating the active state', () => {
            cy.get('@firstCard')
              .invoke('attr', 'class')
              .should('contain', 'active');
          });

          it('shows the information of the first forecast item in the main box', () => {
            cy.get('section[class^=selection]').as('selectionSection');
            cy.get('@firstCard')
              .find('h3')
              .then(($h3) => {
                cy.get('@selectionSection').within(() => {
                  cy.get('[class^=summary-] h1').should(
                    'have.text',
                    $h3.text()
                  );
                });
              });
          });
        }
      );
    });
  });
});
