import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteName: '',
    username: '',
    password: '',
    searchInput: '',
    showPasswords: false,
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteName, username, password} = this.state
    const newItem = {
      id: v4(),
      websiteName,
      username,
      password,
    }

    this.setState(prev => ({
      passwordsList: [...prev.passwordsList, newItem],
      websiteName: '',
      username: '',
      password: '',
    }))
  }

  onChangeWebsiteName = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  updateList = event => {
    this.setState({searchInput: event.target.value})
  }

  isChecked = () => {
    this.setState(previousState => ({
      showPasswords: !previousState.showPasswords,
    }))
  }

  renderEmptyView = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />

      <p className="no-text">No Passwords</p>
    </div>
  )

  onDelete = id => {
    const {passwordsList} = this.state
    const updatedList = passwordsList.filter(each => each.id !== id)

    this.setState({passwordsList: updatedList})
  }

  render() {
    const {
      passwordsList,
      websiteName,
      username,
      password,
      searchInput,
      showPasswords,
    } = this.state
    const updatedList = passwordsList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="password-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="form-container">
          <form className="form-input-container" onSubmit={this.onAddPassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                value={websiteName}
                onChange={this.onChangeWebsiteName}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>
        <div className="passwords-container">
          <div className="your-passwords-container">
            <div className="your-passwords-text">
              <h1 className="heading">Your Passwords</h1>
              <p className="count">{updatedList.length}</p>
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                placeholder="Search"
                className="input"
                onChange={this.updateList}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-password-container">
            <input
              type="checkbox"
              checked={showPasswords}
              id="showPassword"
              onChange={this.isChecked}
            />
            <label htmlFor="showPassword">Show Passwords</label>
          </div>
          {updatedList.length === 0 ? (
            this.renderEmptyView()
          ) : (
            <ul className="list-container">
              {updatedList.map(each => (
                <PasswordItem
                  key={each.id}
                  passwordDetails={each}
                  showPasswords={showPasswords}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
