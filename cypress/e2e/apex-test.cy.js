


describe('Emmanuel WorkSpace Testing', () => {
    beforeEach(() => {
      cy.visit('https://apex.oracle.com/pls/apex/r/emmanuel_okoye/qa-application/login?session=11468514285056')
    })


    it('Verify table data is updated and chart is updated where quantity of order is equal to 20', () => {

        cy.fixture('testdata').then( (data)=>{

            cy.get('#P9999_USERNAME').type(data.email);
            cy.get('#P9999_PASSWORD').type(data.password);
            cy.get('#B63920456196445773411').click()

            cy.scrollTo('bottom');

            cy.get('[data-page="1"] > .a-GV-pageButton').click()
            
            cy.get('[data-id="10"] > .u-tE').dblclick()

            cy.get('[data-id="10"] > .u-tE').type(`${data.quantityamount}{enter}`);

            cy.get('#B63921625210721899367 > .t-Button-label').click()

            // cy.wait(2000);

            cy.scrollTo('bottom');

            cy.get('[data-page="1"] > .a-GV-pageButton').should('be.visible').click()


            let expectedNum = 20;

            cy.get('[data-id="10"] > .u-tE').then((x)=>{

                let actualNum = x.text()

                assert.equal(actualNum,expectedNum)
            })

            let expChartNum = 20

            cy.get('#R63921622180687899337 > .t-Region-bodyWrap > .t-Region-body').then((y)=>{

                let actChartNum = y.text()

                assert.equal(actChartNum,expChartNum)
            })

        })        
       
      })



      it.only('Verify table data is updated and chart is updated where location of order 10 is equal to Deli', () => {

        cy.fixture('testdata').then( (data)=>{

            cy.get('#P9999_USERNAME').type(data.email);
            cy.get('#P9999_PASSWORD').type(data.password);
            cy.get('#B63920456196445773411').click()

            cy.scrollTo('bottom');

            cy.get('[data-page="1"] > .a-GV-pageButton').click()
            
            cy.get('[data-id="10"] > :nth-child(6)').dblclick()

            cy.get('.a-Icon.icon-popup-lov').click()

            cy.get('.a-PopupLOV-search').type(`${data.locationupdate}{enter}`);

            cy.get('.a-PopupLOV-searchBar > .a-Button').click()

            cy.get('[data-id="1"]').click()

            //cy.wait(9000);

            cy.scrollTo('bottom');


            const expectedName = "Deli";

            cy.contains('Deli').then((x)=>{

                const actualName = x.text()

                expect(actualName).to.equal(expectedName)
                //assert.equal(actualName,expectedName)
            })

            let expChartName = "Deli"

            cy.get("td[class='a-GV-cell u-tS']").eq(3).then((y)=>{

                let actChartName = y.text()

                assert.equal(actChartName,expChartName)
            })

            cy.get("svg[width='100%']").should('exist')
            .find('g g g g g g[fill="rgba(0,0,0,0)"] path')
            .eq(4).click({force:true})

            cy.get('[id*="_dvtActiveElement"]').invoke('attr', 'aria-label').then(value=>{
                expect(value).to.include('Series: Deli; Group: Grapes; Value: 42')
            })

        })
       

      })

 })