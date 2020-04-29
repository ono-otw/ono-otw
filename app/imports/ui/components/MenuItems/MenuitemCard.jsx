import React from 'react';
import { Card, Grid, Image, Modal, Header, Button, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MenuitemCard extends React.Component {

  render() {

    const cardHeader = {
      padding: '10px',
      fontSize: '15px',
      fontWeight: 'bold',
    };

    const cardPadding = {
      padding: '30px',
    };

    const sizeOptions = [
      {
        key: 'Tall (12 oz)',
        text: 'Tall (12 oz)',
        value: 'Tall (12 oz)',
      },
      {
        key: 'Grande (16 oz)',
        text: 'Grande (16 oz)',
        value: 'Grande (16 oz)',
      },
      {
        key: 'Venti (24 oz)',
        text: 'Venti (24 oz)',
        value: 'Venti (24 oz)',
      },
    ];

    return (
        <div style={cardPadding} className='itemcard_text'>
          {/* --------------------ALTERNATIVE CARD FORMAT------------------------------*/}
          {/* <Card className='card-bg'> */}
          {/*  <Grid columns={2}> */}
          {/*    <Grid.Column> */}
          {/*      <Image */}
          {/*          rounded */}
          {/*          floated='left' */}
          {/*          size='medium' */}
          {/*          src={this.props.menuitem.image} */}
          {/*      /> */}
          {/*    </Grid.Column> */}
          {/*    <Grid.Column> */}
          {/*      <Card.Header style={cardHeader}>{this.props.menuitem.name}</Card.Header> */}
          {/*      <Card.Description> */}
          {/*        240 Cal<br/> */}
          {/*        16 oz<br/> */}
          {/*        $4.45<br/> */}
          {/*      </Card.Description> */}

          {/*    </Grid.Column> */}
          {/*  </Grid> */}
          {/* </Card> */}

          {/* ----------------------MODAL--------------------------- */}
          {/* the modal is triggered by pressing on the card, which is why I encased the entire card in the trigger */}
          {/* function */}

          <Modal size='mini' className='item_modal' closeIcon trigger={
            <Card raised className='itemcard_text'>
              <Card.Content>
                <Grid columns={2}>
                  <Grid.Column>
                    <Image
                        rounded
                        floated='left'
                        size='medium'
                        src={this.props.menuitem.image}
                    />
                  </Grid.Column>
                  <Grid.Column >
                    <Card.Header style={cardHeader}>{this.props.menuitem.name}</Card.Header>
                    <Card.Description>
                      {/* {this.props.menuitem.calories} Cal<br/> */}
                      {/* {this.props.menuitem.size} oz<br/> */}
                      {/* ${this.props.menuitem.price}<br/> */}
                    </Card.Description>
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          }>
            <Modal.Content>
              <Image rounded size='medium' centered src={this.props.menuitem.image}/>

              <Header textAlign='center' as='h1' inverted>{this.props.menuitem.name}</Header>
              <Header inverted>Size</Header>
              <hr/>
              <Dropdown fluid placeholder='Select Size' selection options={sizeOptions}></Dropdown>
              <Header inverted>Milk</Header>
              <hr/>
              <Dropdown fluid placeholder='Select Size' selection options={sizeOptions}></Dropdown>
              <Header inverted>Expresso</Header>
              <hr/>
              <Dropdown fluid placeholder='Select Size' selection options={sizeOptions}></Dropdown>

              <div align='center' style={{ marginTop: '100px' }}>
                <Button className='dark-blue-button'>Add to Cart</Button>
              </div>
            </Modal.Content>
          </Modal>

        </div>
    );
  }
}

MenuitemCard.propTypes = {
  menuitem: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MenuitemCard);
