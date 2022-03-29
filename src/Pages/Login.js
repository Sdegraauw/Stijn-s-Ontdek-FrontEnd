import React, {useState} from 'react'

export default function Login({Login, error}) {
  const [details, setDetails] = useState({name: "", password: ""});

  const submitHandler = e => {
    e.preventDefault();

    Login(details);
  }

  return (
    <div className='container'>
      <div className="d-flex justify-content-center h-100 card-margin">
        <div className="card">
          <div className="card-header">
            <h3>Inloggen</h3>
          </div>
          <div className="card-body">          
            <form onSubmit={submitHandler}>
                <div>{(error != "") ? (<div className='error'>{error}</div>) : ""}</div>
              <div className="input-group form-group login-boxes-margin">
                <input type="email" className="form-control" placeholder="gebruikersnaam" onChange={e => setDetails({...details, name: e.target.value})} value= {details.name} />
              </div>
              <div className="input-group form-group login-boxes-margin">
                <input type="password" className="form-control" placeholder="wachtwoord" onChange={e => setDetails({...details, password: e.target.value})} value= {details.password}/>
              </div>
              <div className="form-group center login-button-margin">
                <input type="submit" value="Login" className="btn btn-info login_btn" />
              </div>
            </form>        
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Nog geen account?<a href="#">Registreer</a>
            </div>
            <div className="d-flex justify-content-center">
              <a href="#">Wachtwoord vergeten?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
