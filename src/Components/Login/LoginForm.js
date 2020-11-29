import React, { Component } from "react";
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import {FormGroup,Label,Input,Card,CardBody,Spinner} from 'reactstrap';
import axios from 'axios';
export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            spinner:false,
            client_org_password:'',
            client_org_email:'',
        }
        this.handleSubmitval = this.handleSubmitval.bind(this)
    }
    componentDidMount(){
        // localStorage.clear();
        // this.setState({spinner:false})
        // var key = localStorage.getItem("token");
    
     
        // if(key == null){
        
        // }
        // else{
        
        //   this.props.history.push("/");
        // }
       
      }
    async handleSubmitval(){
        if(this.state.client_org_email.length == 0 || this.state.client_org_password.length == 0 )

        {
            alert("All fiels are Mandatory");
        }
        else if(this.state.client_org_password.length < 8)
        {
            alert("Password must atleast 8 characters");   
        }
        else{
            this.setState({spinner:true});
            await axios.post('http://localhost:5555/auth/login/', {
                          "client_org_email":this.state.client_org_email,
                "client_org_password":this.state.client_org_password
        }).then(response =>{

            this.setState({spinner:false});
            if(response.data.msg == "Login success :)")
{
 
    console.log(response.data.data.name);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("name", response.data.data.name);
    localStorage.setItem("phno", response.data.data.phno);
    localStorage.setItem("email", response.data.data.email);
    localStorage.setItem("category", response.data.data.category);
    this.setState({spinner:false});
        // var key = localStorage.getItem("token");
this.props.history.push('/Home');

}
else if(response.data.msg == "Bad payload")
{
    this.setState({spinner:false});
    alert("Something went wrong, please complete the form ");
    window.location.reload(false);
}
else if(response.data.msg == "Internal error / Bad payload")
{
    this.setState({spinner:false});
    alert("Something went wrong, please complete the form ");
    window.location.reload(false);
}
else if(response.data.msg == "No user found with the given creds")
{
    this.setState({spinner:false});
    alert("You have not yet registered, Please register to proceed");
    this.props.history.push('/RegistrationForm');
}
else if(response.data.msg == "Invalid creds"){
    this.setState({spinner:false});
    alert("Invalid Credentials, try again");
    window.location.reload(false);
}
else if(response.data.msg == "Account not verified")
{
    this.setState({spinner:false});
    alert("You have not yet registered, Please register to proceed");
    this.props.history.push('/RegistrationForm');
}
            
            console.log(response);}).catch(err =>{
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
         <Col xs={12}><h3 class="text-center" style={{marginTop:'4%'}} >Login Form </h3>
         </Col>
     </Row>

     <Row style={{marginTop:'4%'}}>
     <Col lg="3" md="3" sm="12" xs="12">
         </Col>
      <Col lg="6" md="6" sm="12" xs="12">
    <Card>
      <CardBody style={{backgroundColor:'#fff'}}>
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
         <FormGroup>
                  <p style={{textAlign:'left'}} for="exampletitle">Password</p>
                  <Input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    // value={this.state.title}
                
                    onChange={(event) => this.setState({client_org_password: event.target.value})}
                  />
                  </FormGroup>
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