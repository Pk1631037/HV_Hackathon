import React, { Component } from "react";
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import {  Card,
    CardHeader,
    CardBody,
FormGroup,
Label,
CardTitle,
CardText,
Input,Table,Spinner,Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import axios from 'axios';
const tableTypes = ['hover'];
// const URL = "http://localhost:5555/";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
        spinner:false,
        client_org_password:'',
        client_org_email:'',
        details:false,
        total_population:'',
        city_distance:'',
        competitors:'',
        category:'',
        modal: true
    }
    this.submit = this.submit.bind(this)
}
  componentDidMount(){
    // localStorage.clear();
  
    var key = localStorage.getItem("token");

 
    if(key == null){
      this.props.history.push("/LoginForm");
    }
   
   
   
  }
  async submit(){
    if(this.state.Lat.length == 0 || this.state.Long.length == 0 )

    {
        alert("All fiels are Mandatory");
    }
    else{
      this.setState({spinner:true});
    var category = localStorage.getItem("category");
    this.setState({category:category});
    var key = localStorage.getItem("token");
  // console.log(this.state.Lat,this.state.Long)
  // console.log(typeof this.state.Lat);
  var Latitude = parseFloat(this.state.Lat);
  var Longitude = parseFloat(this.state.Long);
  let body = {
    "Lat": Latitude,
    "Long": Longitude,
    "category": category
  }
  
    await axios.post('https://hyperverge-hack-prob1.herokuapp.com/analysis/latlong',body,
{
  headers: {
    'x-access-token': key,
  }
}
).then(response =>{

console.log(response);
this.setState({total_population:response.data.Neat_By_city_details.total_population});
this.setState({city_distance:response.data.Neat_By_city_details.city_and_distance});
this.setState({competitors:response.data.Competitors});
console.log(this.state.competitors);
console.log(this.state.total_population);
this.setState({spinner:false,details:true});
    // this.setState({spinner:false});
//     if(response.data.msg == "Login success :)")
// {
//   }
}).catch(err =>{
  console.log(err);
})
}
  }
  async handleSubmitval(){}
    render() {
        return (
          <div>
            <div>
            {this.state.details == true ?
           <Container >
           <Row style={{marginTop:'4%'}}>
            <Col xs={12}><h3 class="text-center" >Information</h3>
            </Col>
        </Row>
        <Row style={{marginTop:'4%'}}>
            <Col lg="8" md="12" sm="12" xs="12">
           
      <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Population
                  </Label>
                  <Col sm={10}>
                    <Input
                    disabled={true}
                      placeholder={this.state.total_population}
                    />
                  </Col>
                </FormGroup>
      
              </Col>
              <Col lg="4" md="12" sm="12" xs="12">
      
              {/* <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="with a placeholder"
                    />
                  </Col>
                </FormGroup> */}
         <Button variant="primary" type="submit" onClick={this.handleSubmitval} active>
                        Age Analysis
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>Do Something</Button>{' '}
            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
              </Col>
              </Row>
              {this.state.city_distance.length < 0 ?
    <div>
              <p style={{textAlign:'left',color:'#000',marginTop:'5%',fontSize:26,fontWeight:500}}>Nearby Cities</p>
              <Row>
              {this.state.city_distance.map(
                    ({  city,lat,long,distance_in_km }) => (
      <Col sm="4" style={{marginTop:'2%'}}>
        <Card body>
                    <CardTitle tag="h5">City : {city}</CardTitle>
                    <CardText>Distance (in km) : {distance_in_km}</CardText>
                    <CardText>Latitude : {lat}</CardText>
                    <CardText>Longitude : {long}</CardText>
        </Card>
      </Col>
                    ))}
      
    </Row>
    </div>
    :
    null}
    {this.state.competitors.length < 0 ?
    <div>
    <p style={{textAlign:'left',color:'#000',marginTop:'5%',fontSize:26,fontWeight:500}}>Competitors</p>
              <Row>
              {this.state.competitors.map(
                    ({  name,location }) => (
      <Col sm="4" style={{marginTop:'2%'}}>
        <Card body>
                    <CardTitle tag="h5">Name : {name}</CardTitle>
                    <CardText>Category : {this.state.category}</CardText>
                    <CardText>Latitude : {location.lat}</CardText>
                    <CardText>Longitude : {location.lng}</CardText>
        </Card>
      </Col>
                    ))}
      
    </Row>
    </div>
    :
    null
                    }
   
</Container>
           :
           <div>
          {this.state.spinner == true ?
     <Spinner type="grow" color="primary" style={{margin: 0,
       position: 'absolute',
       top: '50%',
       transform: 'translateY(-50%)',
       transform: 'translateY(-50%)'}}/>    
   :

            <Container >
               <Row style={{marginTop:'4%'}}>
                <Col xs={12}><h3 class="text-center" >Information</h3>
                </Col>
            </Row>
            <Row style={{marginTop:'4%'}}>
            <Col lg="3" md="3" sm="12" xs="12">
         </Col>
            <Col lg="6" md="12" sm="12" xs="12">
            <Card>
            <CardBody style={{backgroundColor:'#343A40'}}>
              <Row>
          <Col xs="6">  <FormGroup>
                <p style={{textAlign:'left',color:'#fff'}}>Latitude</p>
                  <Input
                
                    type="text"
                    name="text"
                    placeholder="Latitude"
                    onChange={(event) => this.setState({Lat: event.target.value})}
                  />
                </FormGroup>
                
                </Col>
        <Col xs="6">  <FormGroup>
                <p style={{textAlign:'left',color:'#fff'}}>Longitude</p>
                  <Input
                
                    type="text"
                    name="text"
                    placeholder="Longitude"
                    onChange={(event) => this.setState({Long: event.target.value})}
                  />
                </FormGroup>
                
                </Col>
      </Row>
      {/* <FormGroup>
      <p style={{textAlign:'left',color:'#fff'}}>Category</p>
                  <Input type="select" name="selectMulti">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup> */}
                {/* <FormGroup>
                <p style={{textAlign:'left',color:'#fff'}}>Radius</p>
                  <Input
                
                    type="password"
                    name="password"
                    placeholder="Radius"
                  />
                </FormGroup> */}
                <FormGroup>
                <Button color="primary" onClick={this.submit}>Submit</Button>
                </FormGroup>
              </CardBody>
              </Card>
          </Col>
          {/* <Col lg="5" md="5" sm="12" xs="12" >
          <Card>
              <CardBody style={{backgroundColor:'#343A40'}}>
              <Row>
        <Col xs="6">  <FormGroup >
        <p style={{textAlign:'left',color:'#fff'}}>Latitude</p>
                  <Input
                   
                    type="password"
                    name="password"
                    placeholder="Latitude"
                  />
                </FormGroup></Col>
        <Col xs="6">  <FormGroup>
                <p style={{textAlign:'left',color:'#fff'}}>Longitude</p>
                  <Input
                
                    type="password"
                    name="password"
                    placeholder="Longitude"
                  />
                </FormGroup>
               
                
                </Col>
              
      </Row>
            
              
              </CardBody>
              <div class="map-responsive" style={{ overflow:'hidden',

paddingBottom:'56.25%',

position:'relative',

height:0}}>

<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7775.407073201788!2d80.242253!3d12.990804!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x85f6f20593a8e65f!2sCurneu+MedTech+Innovations+Private+Limited!5e0!3m2!1sen!2sin!4v1565005950916!5m2!1sen!2sin"  height="650" frameborder="0" style={{left:0,
top:0,
height:'100%',

width:'100%',
border:0,
position:'absolute'}} allowfullscreen></iframe>

</div>
            </Card>
          </Col> */}
            </Row>
            {/* <Row style={{marginTop:'4%'}}>
          
            <Col lg="12" md="12" sm="12" xs="12">
            <Table bordered dark>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
                </Col>
                </Row> */}
            </Container>  
    }
    </div>
    }
     </div>
    </div>  
        );
    }
}

// import React, { Component } from "react"
// import { compose } from "recompose"
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   InfoWindow
// } from "react-google-maps"

// const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

//   return (
//     <GoogleMap defaultZoom={8} defaultCenter={{ lat: 29.5, lng: -95 }}>
//       {props.markers.map(marker => {
//         const onClick = props.onClick.bind(this, marker)
//         return (
//           <Marker
//             key={marker.id}
//             onClick={onClick}
//             position={{ lat: marker.latitude, lng: marker.longitude }}
//           >
//             {props.selectedMarker === marker &&
//               <InfoWindow>
//                 <div>
//                   {marker.shelter}
//                 </div>
//               </InfoWindow>}
//             }
//           </Marker>
//         )
//       })}
//     </GoogleMap>
//   )
// })

// export default class ShelterMap extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       shelters: [],
//       selectedMarker: false
//     }
//   }
//   componentDidMount() {
//     fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
//       .then(r => r.json())
//       .then(data => {
//         this.setState({ shelters: data.shelters })
//       })
//   }
//   handleClick = (marker, event) => {
//     // console.log({ marker })
//     this.setState({ selectedMarker: marker })
//   }
//   render() {
//     return (
//       <MapWithAMarker
//         selectedMarker={this.state.selectedMarker}
//         markers={this.state.shelters}
//         onClick={this.handleClick}
//         googleMapURL="https://maps.googleapis.com/maps/api/AIzaSyCHLrxBP9WfQf-_HcYH44TRHDU5oxSivec/libraries=geometry,drawing,places"
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `400px` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     )
//   }
// }


// import React, { Component } from "react";
// import { withScriptjs, withGoogleMap, GoogleMap, Circle } from "react-google-maps";

// const Map = withScriptjs(
//     withGoogleMap(props => (
//         <GoogleMap
//             defaultZoom={12}
//             defaultCenter={{ lat: -34.397, lng: 150.644 }}
//             onClick={e => props.onMapClick(e)}
//         >
//             {props.marks.map((mark, index) => (
//                 <Circle  
//                     key={index}
//                     center={mark}
//                     radius={1000}
//                     options={{
//                         strokeColor: "#66009a",
//                         strokeOpacity: 0.8,
//                         strokeWeight: 2,
//                         fillColor: `#66009a`,
//                         fillOpacity: 0.35,
//                         zIndex: 1
//                     }}
//                 />
//             ))}
//         </GoogleMap>
//     ))
// );

// class Home extends Component {
//     state = {
//         marks: []
//     };

//     setMark = e => {
//         this.setState({ marks: [...this.state.marks, e.latLng] });
//     };

//     deleteMarkS = () => {
//         this.setState({
//             marks: []
//         });
//     };

//     render() {
//         const { marks } = this.state;
//         return (
//             <div>
//                 <button onClick={this.deleteMark}>DELETE MARKS</button>
//                 <Map
//                     googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyCHLrxBP9WfQf-_HcYH44TRHDU5oxSivec"
//                     loadingElement={<div style={{ height: `100%` }} />}
//                     containerElement={<div style={{ height: `400px` }} />}
//                     mapElement={<div style={{ height: `100%` }} />}
//                     onMapClick={this.setMark}
//                     marks={marks}
//                 />;
//             </div>
//         );
//     }
// }

// export default Home;