import React from 'react';
import { Image, Row, Tab, Tabs } from 'react-bootstrap';
import CreatedTab from '../components/CreatedTab';
import FavouritesTab from '../components/FavouritesTab';
import { useCurrentUser } from '../components/CurrentUserContext';

const Profile = () => {
  const currentUser = useCurrentUser();

  return (
    <>
      <Row>
        <Image
          src="https://via.placeholder.com/150"
          style={{ width: '10rem', height: '10rem', display: 'block', margin: '0 auto' }}
          roundedCircle
        />
        <h1>{currentUser?.username}</h1>
      </Row>
      <Row>
        <Tabs defaultActiveKey="created" id="fill-tab-example" className="mb-3" fill>
          <Tab eventKey="created" title="Created">
            <CreatedTab username={currentUser?.username} />
          </Tab>
          <Tab eventKey="favourites" title="Favourites">
            <FavouritesTab />
          </Tab>
        </Tabs>
      </Row>
    </>
  );
};

export default Profile;
