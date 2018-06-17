import React, { Component } from 'react';
import autoBind from 'react-autobind';

import logo from '../assets/collateral/GoSon_Logo_Primary.png';

import Button from '../styled/Button';
import Backdrop from '../Backdrop/Backdrop';

import './Home.css';

export default class Home extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }


  determineNumSplashImages() {
    const { windowWidth } = this.props;
    if (windowWidth < 600) return 10;
    if (windowWidth >= 600 && windowWidth < 800) return 16;
    if (windowWidth >= 800 && windowWidth < 1100) return 20;
    if (windowWidth >= 1100 && windowWidth < 1800) return 40;
    return 48;
  }


  render() {
    return (
      <div>

        <Backdrop numImages={ this.determineNumSplashImages() } />
        {/* <div className="scrim" /> */}

        <img className="hero_logo" src={ logo } alt="Go Son Logo" />

        <div className="mission_statement_container">
          <svg id="mission_statement" width="80%" height="100%" viewBox="0 0 434 244" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"1.41421"}}><g><text x="20.424px" y="55.985px" style={{ fontFamily:'Ranger',fontSize:"76.274px",fill:"#fff"}}>Community</text><text x="-0.807px" y="243.203px" style={{ fontFamily:'Ranger',fontSize:"63.056px",fill:"#fff"}}>in connection</text><text x="193.399px" y="89.286px" style={{fontFamily:'Ranger',fontSize:"39.328px",fill:"#fff"}}>B<tspan x="216.41px 239.581px 262.593px 282.499px 299.977px 322.671px 345.842px 367.022px 385.694px 408.865px " y="89.286px 89.286px 89.286px 89.286px 89.286px 89.286px 89.286px 89.286px 89.286px 89.286px ">EST SELVES</tspan></text><text x="-0.078px" y="192.328px" style={{ fontFamily:'Ranger',fontSize:"97.007px",fill:"#fff" }}>Strength</text><text x="193.374px" y="116.979px" style={{fontFamily:'Ranger',fontSize:"30.915px",fill:"#fff"}}>And Aspiring to</text><text x="-0.02px" y="55.985px" style={{fontFamily:'Ranger',fontSize:"26.514px",fill:"#fff"}}>A</text><text x="406.435px" y="55.985px" style={{ fontFamily:'Ranger',fontSize:"26.514px",fill:"#fff" }}>o<tspan x="420.778px " y="55.985px ">f</tspan></text><text x="67.321px" y="78.912px" style={{ fontFamily:'Ranger',fontSize:"24.823px",fill:"#fff" }}>E<tspan x="81.215px 95.396px 109.409px 117.239px 131.038px 138.868px 150.804px 158.634px 172.958px " y="78.912px 78.912px 78.912px 78.912px 78.912px 78.912px 78.912px 78.912px 78.912px ">xhibiting</tspan></text><text x="-0.023px" y="116.979px" style={{ fontFamily:'Ranger',fontSize:"29.799px",fill:"#fff" }}>M<tspan x="21.299px 37.978px " y="116.979px 116.979px ">en</tspan></text><text x="67.35px" y="116.979px" style={{ fontFamily:'Ranger',fontSize:"47.61px",fill:"#fff" }}>T<tspan x="90.244px 117.121px 143.77px 158.788px " y="116.979px 116.979px 116.979px 116.979px ">heir</tspan></text><text x="0px" y="90.672px" style={{ fontFamily:'Ranger',fontSize:"40.607px",fill:"#fff" }}>G<tspan x="22.455px 45.34px " y="90.672px 90.672px ">ay</tspan></text></g></svg>
        </div>


        {/* <div className="call_to_action_buttons">
          <Button callToAction >I'm In</Button>
        </div> */}

      </div>
    );
  }
}