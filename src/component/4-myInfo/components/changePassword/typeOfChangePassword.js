import React from 'react'
import { Link } from 'react-router-dom'
import TopNavBar from '../topNavBar'

class TypeOfChangePassword extends React.Component {
	render() {
		return (
			<div className="typeOfChangePassword">
				<TopNavBar title="请选择修改方式" />

				<ul className="typeList">
					<li>
						<Link to="/changePassword/bypassword">
							通过密码修改
						</Link>
					</li>
					<li>
            <Link to="/changePassword/bycode">
							通过验证码修改
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}

export default TypeOfChangePassword
