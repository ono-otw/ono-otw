import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = {
      paddingTop: '15px',
      paddingBottom: '15px',
      color: '#184470',
    };
    const footerColor = {
      backgroundColor: '#9ABFFF',
    };

    return (
        <footer style={footerColor}>
          <div style={divStyle} className="ui center aligned container">
            <hr />
            Ono On-The-Way <br />
            University of Hawaii<br />
           <a href="https://ono-otw.github.io/">Check Out Our Github Homepage!</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
