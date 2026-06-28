import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, errorMsg, showError} = this.state

    return (
      <div>
        {/* IMAGE IS REQUIRED FOR TEST CASE */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
        />

        <form onSubmit={this.submitForm}>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={e => this.setState({username: e.target.value})}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => this.setState({password: e.target.value})}
          />
          <button type="submit">Login</button>
          {showError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
