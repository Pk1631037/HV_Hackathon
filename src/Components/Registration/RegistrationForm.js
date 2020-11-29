import React, { Component } from "react";
import { Form, Button, Col, Row, Container, h1 } from 'react-bootstrap';
import {FormGroup,Label,Input,Card,CardBody,Spinner} from 'reactstrap';
import axios from 'axios';
export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client_org_name:'',
            client_org_email:'',
            client_org_password:'',
            cleint_org_category_name:[],
            client_main_branch_name:[],
            cleint_org_category:[],
            client_main_branch:[],
            client_org_phone:'',
            branch:[],
            category:[],
            spinner:false
        }
        this.handleSubmitval = this.handleSubmitval.bind(this)
    }
    async componentDidMount(){
        this.setState({spinner:true});
        await axios.get('http://localhost:5555/start/branches').then(response =>{
            const json = response.data.data;
  
    // console.log(json)
    this.setState({ branch: json });
    // console.log(this.state.branch);
                      }).catch(err =>{
                        console.log(err);
                      });
                      await axios.get(' http://localhost:5555/start/categories').then(response =>{
                        const json = response.data.data;
              
                // console.log(json)
                this.setState({ category: json });
                console.log(this.state.category);
                this.setState({spinner:false});
                                  }).catch(err =>{
                                    console.log(err);
                                  })
                     
    }
   async handleSubmitval(){
        if(this.state.client_org_name.length == 0 || this.state.client_org_email.length == 0 || this.state.client_org_password.length == 0 || this.state.client_org_phone.length == 0)

        {
            alert("All fiels are Mandatory");
        }
        else if(this.state.client_main_branch_name.length == 0)
        {
            alert("Select Branch Name");
            
        }
       
        // else if(this.state.client_org_category_name.length == 0)
        // {
        //    console.log('notct');
        // }
        else{
        var client_main_branch,cleint_org_category;
        // console.log(this.state.client_org_name);
        // console.log(this.state.client_org_email);
        // console.log(this.state.client_org_password,this.state.client_org_phone,this.state.client_org_category_name,this.state.client_main_branch_name);
   for(var i=0;i<this.state.branch.length;i++){
    if(this.state.client_main_branch_name == this.state.branch[i].branch_name)
    {
        // console.log('loop',i)
        client_main_branch=this.state.branch[i].branch_id;
// console.log(client_main_branch);
// this.setState({client_main_branch:this.state.branch[i].branch_id})
// console.log(this.state.client_main_branch);
    }
}
     for(var i=0;i<this.state.category.length;i++){
    if(this.state.client_org_category_name == this.state.category[i].category_name)
    {
        // console.log('loop',i)
        cleint_org_category=this.state.category[i].category_id;
// console.log(cleint_org_category);
// this.setState({client_main_branch:this.state.branch[i].branch_id})
// console.log(this.state.client_main_branch);
    }
   }
   console.log(this.state.client_org_name);
   console.log(this.state.client_org_email);
   console.log(this.state.client_org_password,this.state.client_org_phone,cleint_org_category,client_main_branch);
this.setState({spinner:true});
//    this.props.history.push('/LoginForm');
  await axios.post('http://localhost:5555/auth/register', {
    "client_org_name":this.state.client_org_name,
    "client_org_email":this.state.client_org_email,
    "client_org_password":this.state.client_org_password,
    "client_org_phone":this.state.client_org_phone,
    "cleint_org_category":cleint_org_category,
    "client_main_branch":client_main_branch
    
        // "client_org_name":"Valli Vilas",
        // "client_org_email":"premviiiel@gmail.com",
        // "client_org_password":"8754918843",
        // "cleint_org_category":"deu4mm",
        // "client_org_phone":"8754918843",
        // "client_main_branch":"vk84za"
    
  }).then(response =>{
 
console.log(response);
if(response.data.msg == "User registered successfully")
{
    this.setState({spinner:false});
this.props.history.push('/LoginForm');

}
else if(response.data.msg == "Email already exists"){
    this.setState({spinner:false});
    alert("Email Id already exists");
    window.location.reload(false);
}
else if(response.data.msg == "Email badly formatted"){
    this.setState({spinner:false});
    alert("Enter correct Email Id");
    window.location.reload(false);
}
else if(response.data.msg == "Internal error / Bad payload"){
    this.setState({spinner:false});
    alert("Something went wrong, please try another time ");
    window.location.reload(false);
}

              }).catch(err =>{
                console.log(err);
              })
}    
    }
    render() {

        return (
            <div>
                   {this.state.spinner == true ?
              <Spinner type="grow" color="primary" style={{margin: 0,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                transform: 'translateY(-50%)'}}/>    
            :
         
            <Container>
             
            <Row>
                <Col xs={12}><h3 class="text-center" style={{marginTop:'4%'}} >Registration Form </h3>
                </Col>
            </Row>
     
            <Row style={{marginTop:'4%'}}>
            <Col lg="3" md="3" sm="12" xs="12">
                </Col>
             <Col lg="6" md="6" sm="12" xs="12">
           <Card>
             <CardBody style={{backgroundColor:'#fff'}}>
                    <FormGroup>
                  <p style={{textAlign:'left'}} for="exampletitle">Organization Name</p>
                  <Input
                    type="text"
                    name="namae"
                    placeholder="Organization Name"
                    // value={this.state.title}
                
                    onChange={(event) => this.setState({client_org_name: event.target.value})}
                  />
                </FormGroup>
                    {/* <Form.Group controlId="formBasicEmail">
                        <Form.Label>Organization Email</Form.Label>
                        <Form.Control type="email" placeholder="Organization Email" />
                    
                    </Form.Group> */}
                    <FormGroup>
                  <p style={{textAlign:'left'}} for="exampletitle">Organization Email</p>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Organization Email"
                    // value={this.state.title}
                
                    onChange={(event) => this.setState({client_org_email: event.target.value})}
                  />
                </FormGroup>
                    {/* <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        <Form.Text className="text-muted">
                        Password should contain atleast 8 characters
                        </Form.Text>
                    </Form.Group> */}
                    {/* <FormGroup> */}
                    <FormGroup>
                  <p style={{textAlign:'left'}} for="exampletitle">Password</p>
                  <Input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    // value={this.state.title}
                
                    onChange={(event) => this.setState({client_org_password: event.target.value})}
                  />
                   <Form.Text className="text-muted" style={{textAlign:'left'}}>
                        Password should contain atleast 8 characters
                        </Form.Text>
                </FormGroup>
                <FormGroup>

                  <p style={{textAlign:'left'}} for="examplecategory">Main Branch</p>
                
              
                    <Input type="select" name="branch" onChange={(event) => this.setState({client_main_branch_name: event.target.value})}>
                    <option>Select</option>
                    {this.state.branch.map(
                    ({  branch_id,branch_name }) => (
                  <option>{branch_name}</option>
                  ),
                  )}
                    </Input>

                    
                     {/* <Col md="12" sm="12" xs="12">
                    <Button onClick={this.name.bind(this,title,images,location,tags,entryfee,fee,Category,event_type,attendees,_id,address,description,seatAvailable,event_date,created_at,updated_at )} style={{background:'white',color:'black',width:'100%'}}>
                   
                 </Button> 
                  </Col> */}
             
              
                 
                </FormGroup>
                    
                <FormGroup>
                  <p style={{textAlign:'left'}} for="exampletitle">Phone Number</p>
                  <Input
                    type="text"
                    name="mobilenumber"
                    placeholder="Phone Number"
                    // value={this.state.title}
                
                    onChange={(event) => this.setState({client_org_phone: event.target.value})}
                  />
                </FormGroup>
                <FormGroup>

                  <p style={{textAlign:'left'}} for="examplecategory">Category</p>
                
              
                    <Input type="select" name="category" onChange={(event) => this.setState({client_org_category_name: event.target.value})}>
                    <option>Select</option>
                    {this.state.category.map(
                    ({  category_name,category_id }) => (
                  <option>{category_name}</option>
                  ),
                  )}
                    </Input>
                    </FormGroup>
                    {/* <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group> */}

                    {/* <Form.Group controlId="formBasicOrganisation">
                        <Form.Label>Organisation</Form.Label>
                        <Form.Control type="text" placeholder="Organisation Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCategoryType">
                        <Form.Label>Category Type</Form.Label>
                        <Form.Control type="text" placeholder="Category Type" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit" onClick={this.handleSubmitval} active>
                        Submit
                    </Button>
                  </CardBody>
                  </Card>
                </Col>
             
            </Row>
    
            </Container>
    }
               </div>
        );
    }
}