import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPasswords, onDelete} = props
  const {id, websiteName, username, password} = passwordDetails

  const initial = websiteName[0].toUpperCase()

  const passwordItem = showPasswords ? (
    <p className="password">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  const onClickDelete = () => {
    onDelete(id)
  }

  return (
    <li className="list-item-container">
      <div className="initial">{initial}</div>
      <div className="details">
        <p className="website-name">{websiteName}</p>
        <p className="username">{username}</p>
        {passwordItem}
      </div>
      <div className="delete-container">
        <button
          type="button"
          testid="delete"
          onClick={onClickDelete}
          className="delete-button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
