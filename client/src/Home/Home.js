import React, { Component } from 'react';
import autoBind from 'react-autobind';

import { post } from '../helpers/http';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Button from '../styled/Button';
import Section from '../styled/Section';
import CenteredText from '../styled/CenteredText';
import Text from '../styled/Text';
import Header from '../styled/Header';
import Textarea from '../styled/Textarea';
import Input from '../styled/Input';
import Label from '../styled/Label';
import FileInput from '../styled/FileInput';

import Backdrop from '../Backdrop/Backdrop';
import Group from '../components/Group';

import logo from '../assets/collateral/GoSon_Logo_Primary.png';
import james from '../assets/collateral/james.png';
import jeff from '../assets/collateral/jeff.png';
import './Home.css';

export default class Home extends Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      zipcode: '',
      story: '',
      age: '',
      email: '',
      insta: '',
      image: '',

      formSubmitted: false
    }

    this.fileInputKey = new Date();

  }

  componentDidMount() {
    if (window.localStorage.getItem('formSubmitted')) {
      this.setState({ formSubmitted: true });
    }
  }

  determineNumSplashImages() {
    const { windowWidth } = this.props;
    if (windowWidth < 600) return 10;
    if (windowWidth >= 600 && windowWidth < 800) return 16;
    if (windowWidth >= 800 && windowWidth < 1100) return 20;
    if (windowWidth >= 1100 && windowWidth < 1800) return 40;
    return 48;
  }

  preventInvalidKeys(event, callee) {
    const key = event.which;
    if (key === 101 || key === 69 || key === 43 || key === 45) {
      event.preventDefault();
    }
    if (callee === 'ZIPCODE' && this.state.zipcode.length >= 5) {
      event.preventDefault();
    }
    if (callee === 'AGE' && this.state.age.length >= 2) {
      event.preventDefault();
    }
  }

  updateInput(event) {
    this.setState({ [event.target.name]: event.target.value }, () => console.log(this.state));
  }

  updateImage(files) {
    return this.setState({ image: files[0] });
  }

  validateInputs() {
    const { zipcode, image } = this.state;
    if (zipcode && zipcode.length !== 5) return false;
    console.log(image);
    if (!image || typeof(image) !== 'object') return false;
    return true;
  }

  submitForm = (event) => {
    event.preventDefault();

    if (this.validateInputs()) {
      const { image, ...rest } = this.state;
      const payload = new FormData();

      for (let key in rest) {
        payload.append(key, rest[key]);
      }
      payload.append('image', image);

      window.localStorage.setItem('formSubmitted', true);
      this.setState({ formSubmitted: true });

      return post('/email', payload)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    } else {
      alert('Not all fields are valid. Please check the form and try again.');
    }
    
  }

  checkIfSentAndRenderContent() {
    if (!this.state.formSubmitted) {
      return (
        <form onSubmit={ (e) => this.submitForm(e) } style={{ display: 'block', margin: '10px auto 50px auto', width: '100%' }}>

          <div style={ styles.formGroup }>

            <div style={ styles.inputGroup }>
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="Email (optional)"
                id="email" value={ this.state.email || ''} name="email"
                onChange={ (e) => this.updateInput(e) }
              />
            </div>

            <div style={ styles.inputGroup }>
              <Label htmlFor="age" right>Age</Label>
              <Input type="number" placeholder="Age (optional)"
                id="age" right value={ this.state.age || ''} name="age"
                onKeyPress={ (e) => this.preventInvalidKeys(e, 'AGE') }
                onChange={ (e) => this.updateInput(e) }
              />
            </div>

          </div>

          <div style={ styles.formGroup }>

            <div style={ styles.inputGroup }>
              <Label htmlFor="insta">Instagram Handle</Label>
              <Input type="text" style={{ paddingLeft: '40px'}} placeholder="Instagram Handle (optional)"
                id="insta" value={ this.state.insta || ''} name="insta"
                onChange={ (e) => this.updateInput(e) }
              />
              <span style={{ color: '#fff', position: 'absolute', top: '46px', left: '15px', fontSize: '1.3em' }}>@</span>

            </div>

            <div style={ styles.inputGroup }>
              <Label htmlFor="zipcode" right>Zipcode</Label>
              <Input type="number" placeholder="Zip Code (optional)"
                id="zipcode" right value={ this.state.zipcode || ''} name="zipcode"
                onKeyPress={ (e) => this.preventInvalidKeys(e, 'ZIPCODE') }
                onChange={ (e) => this.updateInput(e) }
              />
            </div>
            
          </div>

          <div style={{ margin: 'auto', width: '80%' }}>
            <label htmlFor="story">Your Story</label>
            <Textarea id="story" value={ this.state.story || ''}
              required placeholder="Tell us your story" name="story"
              onChange={ (e) => this.updateInput(e) }
            ></Textarea>
          </div>

          <div style={{ margin: 'auto', width: '80%' }}>
            <label htmlFor="story">Your Proudest Moment (A landscape-oriented .png or .jpg&mdash;we'll take care of the "I'm In" brand for you!)</label>
            <FileInput accept="image/*" required
              onChange={ (e) => this.updateImage(e.target.files) } key={ this.fileInputKey }
            />
          </div>

          <Text id="agreement" style={{ color:"#fff", margin: '0 auto', width: '100%' }}>By pressing "I'm In", you pledge to stand for the advancement of healthful connection between gay men.</Text>

          <Button type="submit" callToAction>I'm In</Button>
        </form>
      )
    } else {
      return (
        <div style={{ width: '100%', position: 'relative' }}>
          <Header id="thank_you" color="#fff">Thank you for your support</Header>
          <CenteredText id="photo_review" color="#fff">We are now reviewing and editing your photo.</CenteredText>
          <svg id="envelope_illustration" width="100%" height="100%" viewBox="0 0 404 261" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinecap:'square',strokeLinejoin:'round',strokeMiterlimit:'1.5'}}><g><g><path d="M0.566,260.13l0,-259.564" style={{fill:'none',stroke:'#fff',strokeWidth:'0.8px'}}/><path d="M247.041,118.028l155.436,142.102l-401.911,0l155.413,-141.996" style={{fill:'none',stroke:'#fff',strokeWidth:'0.8px'}}/><path d="M235.066,126.938l167.411,-126.372l-401.911,0l155.477,117.364l11.985,9.048" style={{fill:'none',stroke:'#fff',strokeWidth:'0.8px'}}/><path d="M201.521,165.827l3.23,-3.894l3.969,3.137l2.349,-4.479l4.535,2.244l1.366,-4.87l4.902,1.252l0.324,-5.047l5.056,0.206l-0.734,-5.004l4.988,-0.849l-1.759,-4.742l4.703,-1.867l-2.707,-4.274l4.212,-2.803l-3.536,-3.618l3.536,-3.617l-4.212,-2.803l2.707,-4.274l-4.703,-1.867l1.759,-4.742l-4.988,-0.849l0.734,-5.004l-5.056,0.206l-0.324,-5.048l-4.902,1.253l-1.366,-4.87l-4.535,2.244l-2.349,-4.48l-3.969,3.138l-3.23,-3.894l-3.23,3.894l-3.969,-3.138l-2.349,4.48l-4.535,-2.244l-1.366,4.87l-4.902,-1.253l-0.323,5.048l-5.056,-0.206l0.734,5.004l-4.989,0.849l1.759,4.742l-4.703,1.867l2.707,4.274l-4.212,2.803l3.537,3.617l-3.537,3.618l4.212,2.803l-2.707,4.274l4.703,1.867l-1.759,4.742l4.989,0.849l-0.734,5.004l5.056,-0.206l0.323,5.047l4.902,-1.252l1.366,4.87l4.535,-2.244l2.349,4.479l3.969,-3.137l3.23,3.894Z" style={{fill:'none',stroke:'#fff',strokeWidth:'0.8px'}}/><g><path d="M204.594,116.619c0.478,0.606 0.661,1.419 0.55,2.439l-0.192,1.434c-0.016,0.144 -0.071,0.239 -0.167,0.287c-0.096,0.048 -0.175,0.08 -0.239,0.096l-2.893,0c-0.064,-0.016 -0.132,-0.04 -0.203,-0.072c-0.072,-0.032 -0.124,-0.104 -0.156,-0.215l0,-0.12l0.12,-0.86c0.016,-0.128 -0.008,-0.239 -0.072,-0.335c-0.048,-0.048 -0.119,-0.088 -0.215,-0.12c-0.048,-0.016 -0.088,-0.024 -0.12,-0.024l-2.319,0c-0.016,0 -0.103,0.024 -0.263,0.072c-0.159,0.048 -0.255,0.191 -0.287,0.431l-1.171,9.515c-0.032,0.144 -0.008,0.255 0.071,0.335c0.032,0.048 0.104,0.088 0.216,0.12c0.047,0.016 0.087,0.024 0.119,0.024l2.319,0c0.096,0.016 0.176,0 0.239,-0.048c0.16,-0.064 0.263,-0.207 0.311,-0.431l0.12,-1.052l-1.339,0c-0.144,-0.031 -0.239,-0.091 -0.287,-0.179c-0.048,-0.088 -0.072,-0.171 -0.072,-0.251l0.359,-2.893c0.016,-0.08 0.052,-0.163 0.108,-0.251c0.055,-0.088 0.163,-0.116 0.322,-0.084l4.639,-0.024c0.063,0 0.135,0.02 0.215,0.06c0.08,0.04 0.119,0.124 0.119,0.251c0.016,0.016 0.016,0.048 0,0.096c-0.031,0.175 -0.067,0.426 -0.107,0.753c-0.04,0.327 -0.084,0.697 -0.132,1.112c-0.047,0.414 -0.099,0.856 -0.155,1.327c-0.056,0.47 -0.116,0.936 -0.179,1.398c-0.144,1.084 -0.287,2.256 -0.431,3.515c-0.032,0.143 -0.091,0.239 -0.179,0.287c-0.088,0.048 -0.171,0.072 -0.251,0.072l-6.623,0l-0.239,0c-0.128,-0.016 -0.287,-0.044 -0.478,-0.084c-0.192,-0.04 -0.395,-0.1 -0.61,-0.179c-0.215,-0.08 -0.434,-0.192 -0.657,-0.335c-0.224,-0.144 -0.423,-0.327 -0.598,-0.55c-0.494,-0.59 -0.678,-1.395 -0.55,-2.415l0.239,-2.176c0.064,-0.414 0.008,-0.741 -0.167,-0.98c-0.096,-0.095 -0.192,-0.159 -0.287,-0.191c-0.064,-0.016 -0.112,-0.024 -0.144,-0.024l0,-0.191c0,0 0.04,-0.008 0.12,-0.024c0.08,-0.016 0.171,-0.056 0.275,-0.12c0.103,-0.063 0.203,-0.167 0.299,-0.311c0.095,-0.143 0.167,-0.342 0.215,-0.597l0.072,-0.55c0.127,-1.068 0.247,-2.032 0.358,-2.893c0.048,-0.367 0.092,-0.725 0.132,-1.076c0.04,-0.351 0.079,-0.666 0.119,-0.945c0.04,-0.278 0.072,-0.506 0.096,-0.681c0.024,-0.175 0.036,-0.271 0.036,-0.287c0.127,-0.669 0.358,-1.207 0.693,-1.614c0.335,-0.406 0.693,-0.725 1.076,-0.956c0.383,-0.231 0.753,-0.387 1.112,-0.466c0.358,-0.08 0.625,-0.128 0.801,-0.144l0.024,0c0.032,0 0.059,-0.004 0.083,-0.012c0.024,-0.008 0.052,-0.012 0.084,-0.012l3.61,0c0.032,0 0.06,0.004 0.084,0.012c0.024,0.008 0.052,0.012 0.084,0.012c0.111,0 0.263,0.02 0.454,0.06c0.191,0.04 0.398,0.1 0.622,0.179c0.223,0.08 0.446,0.192 0.669,0.335c0.223,0.144 0.422,0.327 0.598,0.55Z" style={{fill:'#fff',fillRule:'nonzero'}}/><path d="M210.087,129.562c0.064,0.063 0.088,0.159 0.072,0.286l-0.358,2.893c-0.032,0.144 -0.092,0.24 -0.18,0.287c-0.087,0.048 -0.171,0.072 -0.251,0.072l-4.901,0c-0.239,0 -0.458,0.008 -0.658,0.024c-0.199,0.016 -0.378,0.076 -0.538,0.179c-0.159,0.104 -0.298,0.271 -0.418,0.502c-0.12,0.232 -0.203,0.554 -0.251,0.969l-0.215,1.745c-0.064,0.558 0.008,0.964 0.215,1.22c0.175,0.191 0.422,0.302 0.741,0.334c0.319,0.032 0.646,0.048 0.98,0.048l1.77,0c0.016,0 0.091,0.004 0.227,0.012c0.135,0.008 0.299,0.04 0.49,0.096c0.191,0.055 0.398,0.143 0.622,0.263c0.223,0.119 0.43,0.291 0.621,0.514c0.558,0.637 0.765,1.53 0.622,2.678l-0.215,1.745c-0.112,0.877 -0.379,1.554 -0.801,2.032c-0.423,0.478 -0.869,0.829 -1.339,1.052c-0.47,0.223 -0.893,0.355 -1.267,0.395c-0.375,0.04 -0.57,0.059 -0.586,0.059l-6.647,0c-0.016,0 -0.056,-0.004 -0.119,-0.012c-0.064,-0.007 -0.12,-0.043 -0.168,-0.107c-0.064,-0.064 -0.088,-0.152 -0.072,-0.263l0.359,-2.893c0.032,-0.144 0.092,-0.243 0.179,-0.299c0.088,-0.056 0.172,-0.084 0.251,-0.084l5.763,0c0,0 0.043,-0.004 0.131,-0.012c0.088,-0.008 0.183,-0.035 0.287,-0.083c0.104,-0.048 0.199,-0.128 0.287,-0.239c0.088,-0.112 0.147,-0.263 0.179,-0.455c0.032,-0.239 -0.008,-0.414 -0.119,-0.526c-0.096,-0.095 -0.216,-0.159 -0.359,-0.191c-0.064,-0.016 -0.128,-0.024 -0.191,-0.024l-2.559,0c-0.015,0 -0.083,-0.004 -0.203,-0.012c-0.119,-0.008 -0.275,-0.032 -0.466,-0.072c-0.191,-0.039 -0.402,-0.099 -0.634,-0.179c-0.231,-0.08 -0.458,-0.191 -0.681,-0.335c-0.972,-0.637 -1.363,-1.633 -1.172,-2.988l0.67,-5.189c0.064,-0.589 0.207,-1.083 0.43,-1.482c0.223,-0.398 0.482,-0.733 0.777,-1.004c0.295,-0.271 0.602,-0.478 0.921,-0.622c0.319,-0.143 0.613,-0.247 0.884,-0.311c0.271,-0.063 0.499,-0.103 0.682,-0.119c0.183,-0.016 0.275,-0.024 0.275,-0.024l6.647,0c0.016,0 0.055,0.004 0.119,0.012c0.064,0.008 0.12,0.044 0.167,0.108Z" style={{fill:'#fff',fillRule:'nonzero'}}/></g></g><path d="M402.477,260.13l0,-259.564" style={{fill:'none',stroke:'#fff',strokeWidth:'0.8px'}}/></g></svg>
        </div>
      );
    }
  }


  render() {
    const { windowWidth } = this.props;
    return (
      <div>

        <Backdrop numImages={ this.determineNumSplashImages() } />

        <img className="hero_logo" src={ logo } alt="Go Son Logo" />

        <div className="mission_statement_container">
          <svg id="mission_statement" width="80%" height="100%" viewBox="0 0 434 244" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"1.41421"}}><g><text x="20.424px" y="55.985px" style={{ fontFamily:'Ranger',fontSize:"76.274px",fill:"#fff"}}>Community</text><text x="-0.807px" y="243.203px" style={{ fontFamily:'Ranger',fontSize:"63.056px",fill:"#fff"}}>in connection</text><text x="193.399px" y="89.286px" style={{fontFamily:'Ranger',fontSize:"39.328px",fill:"#fff"}}>B<tspan x="216.41px 239.581px 262.593px 282.499px 299.977px 322.671px 345.842px 367.022px 385.694px 408.865px " y="89.286px 89.286px 89.286px 89.286px 89.286px 89.286px 89.286px 89.286px 89.286px 89.286px ">EST SELVES</tspan></text><text x="-0.078px" y="192.328px" style={{ fontFamily:'Ranger',fontSize:"97.007px",fill:"#fff" }}>Strength</text><text x="193.374px" y="116.979px" style={{fontFamily:'Ranger',fontSize:"30.915px",fill:"#fff"}}>And Aspiring to</text><text x="-0.02px" y="55.985px" style={{fontFamily:'Ranger',fontSize:"26.514px",fill:"#fff"}}>A</text><text x="406.435px" y="55.985px" style={{ fontFamily:'Ranger',fontSize:"26.514px",fill:"#fff" }}>o<tspan x="420.778px " y="55.985px ">f</tspan></text><text x="67.321px" y="78.912px" style={{ fontFamily:'Ranger',fontSize:"24.823px",fill:"#fff" }}>E<tspan x="81.215px 95.396px 109.409px 117.239px 131.038px 138.868px 150.804px 158.634px 172.958px " y="78.912px 78.912px 78.912px 78.912px 78.912px 78.912px 78.912px 78.912px 78.912px ">xhibiting</tspan></text><text x="-0.023px" y="116.979px" style={{ fontFamily:'Ranger',fontSize:"29.799px",fill:"#fff" }}>M<tspan x="21.299px 37.978px " y="116.979px 116.979px ">en</tspan></text><text x="67.35px" y="116.979px" style={{ fontFamily:'Ranger',fontSize:"47.61px",fill:"#fff" }}>T<tspan x="90.244px 117.121px 143.77px 158.788px " y="116.979px 116.979px 116.979px 116.979px ">heir</tspan></text><text x="0px" y="90.672px" style={{ fontFamily:'Ranger',fontSize:"40.607px",fill:"#fff" }}>G<tspan x="22.455px 45.34px " y="90.672px 90.672px ">ay</tspan></text></g></svg>
        </div>

        <Section bgColor="#fff">

          <Group top="50" left="80">
            <Header justify="right" >Mission<span style={{ fontFamily: 'Karla, sans-serif' }}>:</span></Header>
            <Text>
              <span style={{ textTransform: 'none', fontWeight: '700', fontSize: '1em', fontStyle: 'normal' }}>
                Go Son 
              </span> builds media, travel, work, and night-life
              structures in philanthropic and creative capacities
              for gay men who desire healthful, connected lives.
            </Text>
          </Group>

          <Group bottom="100" right={ windowWidth < 700 ? "" : "80" } left={ windowWidth < 700 ? "80" : "" } justify="right">
            <Header justify="right" >This Summer<span style={{ fontFamily: 'Karla, sans-serif' }}>:</span></Header>
            <Text justify="right">
              <span style={{ textTransform: 'none', fontWeight: '700', fontSize: '1em', fontStyle: 'normal' }}>Go Son</span> is developing a documentary series that explores
              the unique, diverse identities of the largely segregated
              Gay male American population.
            </Text>
          </Group>


        </Section>

        <Section bgColor="#000" style={{ overflow: 'hidden', padding: '50px 0', boxSizing: 'border-box' }}>

          <h1 id="story" style={{width: '90%', margin: '0 auto'}} color="#fff">Go Son wants your story</h1>

          <Container fluid={ true }>
            <Row style={{ padding: '80px 0' }}>

              <Col xs="12" lg="6" style={styles.row}>
                <svg id="james_illustration" viewBox="0 0 174 197" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{ height: '350px', display: 'block',margin: '0 auto',fillRule:'evenodd',clipRule:'evenodd',strokeLinecap:'round',strokeLinejoin:'round',strokeMiterlimit:'1.5'}}><g><path d="M139.816,115.167l5.237,39.031l8.002,12.051" style={{fill:'none',stroke:'#fff',strokeWidth:'1px'}}/><path d="M121.504,107.083l-1.075,0.994l-2.481,1.327l-3.087,2.658l-1.865,5.872l-1.51,2.978l-3.427,0l-2.035,1.038l-1.16,6.615l-2.567,0l-2.905,6.846l-13.865,5.832l-2.625,-9.132l-4.577,-5.339l-5.165,-2.208l-5.425,0l-5.874,-1.077l-6.206,1.077l-6.725,0l-3.419,2.208l-2.941,3.168l-2.13,3.708l-0.503,1.763" style={{fill:'none',stroke:'#fff',strokeWidth:'1px'}}/><path d="M153.003,65.166l-2.721,21.475l2.721,5.77l0,6.694l-8.784,13.919l-6.897,3.192l-3.784,2.99l-2.703,4.061l-3.752,2.562l-1.779,5.648l-0.823,2.373l1.805,0l0.797,1.111l-2.602,2.09l-0.786,1.515l2.591,0.982l-3.276,1.695l0.685,0.913l0,3.219l-1.829,0l0,1.273l-3.274,3.442l1.574,2.367l-1.574,2.213l-6.11,2.689l-1.979,3.491l-3.62,2.578l-1.609,2.192l-0.769,1.192l-2.511,0.675l0,1.209l-3.026,3.518l-3.464,3.129l-1.037,1.943l-6.97,0l-2.268,3.763l-3.246,0l-1.46,2.751l-2.932,0l-3.393,2.542l-9.556,-1.139l-3.758,-1.403l-3.6,1.403l-6.215,-4.154l-1.285,-1.672l-1.961,0l-1.349,-2.091l-5.665,-7.263l-0.678,-4.403l-1.675,0l1.675,-6.273l0,-1.988l-1.675,-0.915l0,-2.676l3.149,0l1.986,-3.678l-5.135,-20.593l0,-6.23l1.675,-12.64c-8.325,-3.428 -13.059,-10.544 -13.912,-21.648l-1.776,0l0,-6.956l14.013,-0.917l1.675,-6.217l7.692,-31.498l0,-3.395l3.246,0l-3.246,-5.973l-1.349,0l2.141,-3.353l5.369,0.874l-2.915,-3.333l0,-2.536l-4.595,-2.231l5.628,0l1.882,-1.713l-1.882,-1.225l-3.487,-2.137l5.369,0l0,-3.678l5.873,-4.422l3.743,1.544l4.001,-1.544l4.218,0l2.379,-2.433l1.538,0.993l0.938,-2.798l2.491,0l0,1.805l4.587,-1.805l0,-2.157l4.873,0l-1.128,-2.118l1.128,-1.256l1.51,0l1.568,2.27l0.817,2.38l1.947,0l2.144,-2.38l3.795,3.261l3.382,2.798l0,-2.798l8.694,4.238l0,2.91l2.379,0l0,-2.91l5.305,4.422l6.917,0l1.371,1.051l2.381,0l0,2.627l2.703,2.137l4.706,-2.137l3.528,3.362l-1.453,0.872l-2.075,-0.872l0,4.825l8.836,0l3.202,4.114l0,6.093l2.721,6.628l0,21.775Z" style={{fill:'none',stroke:'#fff',strokeWidth:'1px'}}/><path d="M60.435,196.016l3.53,-10.999" style={{fill:'none',stroke:'#fff',strokeWidth:'1px'}}/><path d="M52.982,138.566l4.302,2.677l7.318,0l10.725,-5.323l2.998,-1.134l-4.082,-2.675l-5.559,0l-3.245,0l-2.523,1.476l-2.342,0l-4.086,-1.476l-2.218,0l-2.07,3.809l0.782,2.646Z" style={{fill:'none',stroke:'#fff',strokeWidth:'1px'}}/><path d="M51.187,40.016l9.387,3.325l20.191,-8.87l2.838,2.168l9.453,-7.601l2.407,3.32l8.199,2.113l8.589,2.168l3.69,4.009l0,2.693l1.658,7.938l5.281,4.998l2.889,0.906l3.014,0l3.041,3.08l0,8.677" style={{fill:'none',stroke:'#fff',strokeWidth:'1px'}}/><path d="M170.641,64.596c-0.033,-0.514 -0.476,-0.904 -0.99,-0.871l-168.278,10.758c-0.514,0.033 -0.904,0.477 -0.871,0.991l2.471,38.657c0.033,0.513 0.477,0.904 0.991,0.871l168.278,-10.759c0.513,-0.033 0.904,-0.477 0.871,-0.99l-2.472,-38.657Z" style={{stroke:'#fff',strokeWidth:'1px'}}/><g transform="matrix(0.569404,-0.0348703,0.0348703,0.569404,-505.506,-96.8373)"><text x="961.571px" y="403.228px" style={{fontFamily:'Ranger',fontSize:'39.299px',fill:'#fff',stroke:'#fff',strokeWidth:'1.75px',strokeLinecap:'butt',strokeMiterlimit:'1.41421'}}>I</text><text x="974.461px" y="403.228px" style={{fontFamily:'LucidaGrande,Lucida Grande, sansSerif',fontWeight:'500',fontSize:'39.299px',fill:'#fff',stroke:'#fff',strokeWidth:'1.75px',strokeLinecap:'butt',strokeMiterlimit:'1.41421'}}>&apos;</text><text x="983.46px" y="403.228px" style={{fontFamily:'Ranger',fontSize:'39.299px',fill:'#fff',stroke:'#fff',strokeWidth:'1.75px',strokeLinecap:'butt',strokeMiterlimit:'1.41421'}}>m In</text></g></g></svg>
                <CenteredText color="#fff">
                  The Go Son campaign is a collection of gay men's proudest moments.
                  We are creating this collection of stories to share our best selves with the public, on this website and on our Instagram campaign.
                  We ask you to share more details about yourself, but it is not required.
                </CenteredText>
              </Col>

              <Col xs="12" lg="6" style={styles.row}>

                { this.checkIfSentAndRenderContent() }

              </Col>
            </Row>
          </Container>

        </Section>

        <Section id="team" bgColor="#fff" style={{ overflow: 'hidden', boxSizing: 'border-box' }}>
          <Header className="section_header" color="#000">Team</Header>

          <Container fluid={ true }>
            <Row>

              <Col xs="12" lg="6" className="team_member james">
                <div className="info">
                  <Header color="#000">James Markel</Header>
                  <CenteredText>Founder</CenteredText>
                  <p className="description">
                    GoSon O.G. and visionary, James Markel is amazeballs, and I'm gonna let him write this, but I think he'd do well to make "GoSon O.G." his job
                    title.
                  </p>
                </div>
              </Col>

              <Col xs="12" lg="6" className="team_member jeff">
                <div className="info">
                  <Header color="#000">Jeff Reynolds</Header>
                  <CenteredText>Web Developer</CenteredText>
                  <p className="description">
                    Jeff is psyched to be a part of the GoSon community. He is a full-stack JavaScript developer and web designer from Denver, CO.
                    He's passionate about scaling design systems, and specializes in React, Node.js, GraphQL, and cross-platform Electron app development.
                  </p>
                </div>
              </Col>

            </Row>
          </Container>


        </Section>



        {/* <div className="call_to_action_buttons">
          <Button callToAction >I'm In</Button>
        </div> */}

      </div>
    );
  }
}

const styles = {

  row: { 
    height: '700px', 
    display: 'flex', 
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  formGroup: {
    margin: '0 auto 15px auto',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between'
  },

  inputGroup: {
    width: '50%',
    position: 'relative'
  }

}

