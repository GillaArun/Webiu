import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import { Col, Row, Container } from "react-bootstrap"
import GitterRoomItem from './GitterRoomItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./style.sass"


export const GitterRoomsList = ({title, groupId, gitterOrganizationName, gitterToken, limit, small}) => {

  const [loading, setLoading] = useState(true)
  const [rooms, setRooms] = useState(null)

  useEffect(() => {
    getRooms()
  }, [])

  const getRooms = () => {
    const fetchUrl = `https://api.gitter.im/v1/groups/${groupId}/rooms?access_token=${gitterToken}`

    setLoading(true)
    fetch(fetchUrl).then((res) => res.json()).then((data) => {
      setRooms(data)
      setLoading(false)
    })
    .catch((err) => {
      throw err
    });
  }

  const renderRoomList = () => (
    rooms.map((item, i) => {
      if (i < limit){
        return (
          <Col md={4} key={item.uri}>
            <GitterRoomItem
              name={item.name}
              avatarUrl={item.avatarUrl}
              roomUrl={`https://gitter.im/${item.url}`}
              userCount={item.userCount}
              visible={item.public}
            />
          </Col>
        )
      }
      return null
    })
  )

  return (
    <div className="gitter-rooms-list-component">
      <Container>
        <Row>
          <Col md={12}>
            {title ? <h1 className={small ? "gitter-rooms-list-title-small" : "gitter-rooms-list-title"}>{title}</h1> : null}
          </Col>
          {loading || !rooms ? <Col md={12}><p>Loading...</p></Col> : renderRoomList()}
        </Row>
        <Row>
        <Col className="view-all-btn-container">
          {loading || !rooms ? null : <a href={`https://gitter.im/${gitterOrganizationName}`} className="gitter-btn" target="_blank" rel="noreferrer">Many More <FontAwesomeIcon icon={faArrowRight}/></a>}
        </Col>
      </Row>
      </Container>
    </div>
  )
}

GitterRoomsList.propTypes = {
  title: PropTypes.string,
  groupId: PropTypes.string,
  gitterOrganizationName: PropTypes.string,
  gitterToken: PropTypes.string,
  small: PropTypes.bool,
  limit: PropTypes.number
}
